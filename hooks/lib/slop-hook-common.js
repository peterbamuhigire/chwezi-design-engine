'use strict';
/**
 * Shared plumbing for the chwezi-slop hooks (M10-09-T06): enablement, payload
 * parsing, the per-session ledger and a fail-open detector loader.
 *
 * Ledger: <CHWEZI_SLOP_LEDGER_DIR or os.tmpdir()/chwezi-slop>/<session_id>.json
 *   { session_id, files: [abs paths edited this session],
 *     reported: ["rule|file|line", ...]   findings already surfaced per edit,
 *     deep_blocks: <number of Stop blocks issued> }
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { isEnabled } = require('../plugin-hook-config');

// CHWEZI_SLOP_DETECTOR overrides the detector location (tests use it for the missing-detector case).
const DETECTOR = process.env.CHWEZI_SLOP_DETECTOR || path.join(__dirname, '..', '..', 'tools', 'slop-detector', 'lib', 'detector.mjs');
const DISABLED = new Set(['off', '0', 'false', 'no', 'disabled', 'disable']);

function hooksEnabled(env = process.env) {
  if (!isEnabled(env)) return false;
  return !DISABLED.has(String(env.CHWEZI_SLOP_HOOKS || '').trim().toLowerCase());
}

function readPayload() {
  let raw = '';
  try { raw = fs.readFileSync(0, 'utf8'); } catch (e) { return null; }
  try {
    const p = JSON.parse(raw);
    return p && typeof p === 'object' ? p : null;
  } catch (e) {
    return null;
  }
}

function ledgerPath(sessionId, env = process.env) {
  const dir = env.CHWEZI_SLOP_LEDGER_DIR || path.join(os.tmpdir(), 'chwezi-slop');
  const safe = String(sessionId || 'no-session').replace(/[^A-Za-z0-9._-]/g, '_');
  return path.join(dir, `${safe}.json`);
}

function readLedger(sessionId) {
  try {
    const l = JSON.parse(fs.readFileSync(ledgerPath(sessionId), 'utf8'));
    return { session_id: sessionId, files: [], reported: [], deep_blocks: 0, ...l };
  } catch (e) {
    return { session_id: sessionId, files: [], reported: [], deep_blocks: 0 };
  }
}

function writeLedger(ledger) {
  try {
    const p = ledgerPath(ledger.session_id);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, JSON.stringify(ledger, null, 2));
  } catch (e) {
    process.stderr.write(`[chwezi:slop] could not write session ledger (${e.message}); continuing.\n`);
  }
}

async function loadDetector() {
  if (!fs.existsSync(DETECTOR)) return null;
  try {
    return await import(pathToFileURL(DETECTOR).href);
  } catch (e) {
    return null;
  }
}

function withTimeout(promise, ms) {
  let t;
  const timer = new Promise((resolve) => { t = setTimeout(() => resolve({ timedOut: true }), ms); });
  return Promise.race([promise.then((v) => { clearTimeout(t); return v; }), timer]);
}

function findingKey(f) {
  return `${f.rule}|${f.file}|${f.line}`;
}

function summarise(findings, limit = 12) {
  const lines = findings.slice(0, limit).map((f) => `  ${f.file}:${f.line}  ${f.severity} ${f.rule} [${f.as_overlay}] ${f.message}`);
  if (findings.length > limit) lines.push(`  ... and ${findings.length - limit} more`);
  return lines.join('\n');
}

module.exports = { hooksEnabled, readPayload, ledgerPath, readLedger, writeLedger, loadDetector, withTimeout, findingKey, summarise, DETECTOR };
