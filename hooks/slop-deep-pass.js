#!/usr/bin/env node
/**
 * slop-deep-pass.js — Stop hook (timeout 30 s). M10-09-T06.
 * Runs every static chwezi-slop rule over the files edited this session (from
 * the ledger written by slop-immediate.js), drops findings the per-edit hook
 * already surfaced (rule + file + line), and blocks the stop at most ONCE per
 * session when new block- or warning-severity findings remain, so the model can
 * address them. Advisory findings never block.
 *
 * Loop protection: returns at once when the payload has stop_hook_active: true,
 * and the ledger's deep_blocks counter caps blocking at one per session.
 * Fails open (exit 0 plus a stderr note) on a malformed payload, a missing
 * detector, a detector error or a timeout. Controls as slop-immediate.js.
 */
'use strict';

const fs = require('fs');
const c = require('./lib/slop-hook-common');

const TIMEOUT_MS = Number(process.env.CHWEZI_SLOP_DEEP_TIMEOUT_MS || 25000);
const MAX_BLOCKS = 1;

async function main() {
  if (!c.hooksEnabled()) return 0;
  const payload = c.readPayload();
  if (!payload) {
    process.stderr.write('[chwezi:slop-deep-pass] unreadable hook payload; allowing (fail-open).\n');
    return 0;
  }
  if (payload.stop_hook_active === true) return 0;
  const sessionId = payload.session_id || payload.sessionId || 'no-session';
  const ledger = c.readLedger(sessionId);
  if ((ledger.deep_blocks || 0) >= MAX_BLOCKS) return 0;
  const files = (ledger.files || []).filter((f) => fs.existsSync(f));
  if (files.length === 0) return 0;

  const detector = await c.loadDetector();
  if (!detector) {
    process.stderr.write('[chwezi:slop-deep-pass] detector not found; allowing (fail-open).\n');
    return 0;
  }
  const cwd = payload.cwd || process.cwd();
  const result = await c.withTimeout(detector.runDetector({ paths: files, tier: 'deep', cwd }), TIMEOUT_MS);
  if (result.timedOut) {
    process.stderr.write(`[chwezi:slop-deep-pass] detector exceeded ${TIMEOUT_MS} ms; allowing (fail-open).\n`);
    return 0;
  }
  const { report } = result;
  if (report.errors && report.errors.length) {
    process.stderr.write(`[chwezi:slop-deep-pass] detector could not assess the session's files (${report.errors[0]}); allowing (fail-open).\n`);
    return 0;
  }
  const already = new Set(ledger.reported || []);
  const fresh = report.findings.filter((f) => f.severity !== 'advisory' && !already.has(c.findingKey(f)));
  if (fresh.length === 0) return 0;
  ledger.deep_blocks = (ledger.deep_blocks || 0) + 1;
  for (const f of fresh) ledger.reported.push(c.findingKey(f));
  c.writeLedger(ledger);
  process.stderr.write(
    `chwezi-slop deep pass: ${fresh.length} design finding(s) in files edited this session. ` +
    'Fix them, or record a waiver with a "<who>: <evidence>" reason, then finish. This pass blocks once per session.\n' +
    `${c.summarise(fresh)}\n`
  );
  return 2;
}

main().then((code) => process.exit(code), (e) => {
  process.stderr.write(`[chwezi:slop-deep-pass] internal error (${e.message}); allowing (fail-open).\n`);
  process.exit(0);
});
