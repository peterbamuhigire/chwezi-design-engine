#!/usr/bin/env node
/**
 * slop-immediate.js — PostToolUse hook (matcher Write|Edit|MultiEdit, timeout 5 s).
 * M10-09-T06. Runs the chwezi-slop detector's `immediate` tier (block-severity,
 * mechanical rules only) on the file just written, and records the file in the
 * session ledger for the Stop deep pass.
 *
 * Contract: the write has already happened, so exit 2 returns stderr to the
 * model as feedback and it can repair the file in the same turn. Exit 0 when
 * clean. Fails open (exit 0 plus a stderr note) on a malformed payload, a
 * missing detector, a detector error or a timeout. The PreToolUse
 * banned-font gate stays first and blocking; this hook does not replace it.
 *
 * Controls: CLAUDE_PLUGIN_OPTION_HOOKS_ENABLED=false (plugin setting) or
 * CHWEZI_SLOP_HOOKS=off disable it. Codex and other runners have no hook
 * runtime: they run `node tools/slop-detector/cli.mjs` from the skills'
 * verification steps instead (degraded mode).
 */
'use strict';

const fs = require('fs');
const path = require('path');
const c = require('./lib/slop-hook-common');

const TIMEOUT_MS = Number(process.env.CHWEZI_SLOP_IMMEDIATE_TIMEOUT_MS || 4000);
const EXTENSIONS = new Set(['.css', '.scss', '.less', '.pcss', '.postcss', '.html', '.htm', '.xhtml', '.vue', '.svelte', '.astro', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.py', '.md', '.mdx']);

async function main() {
  if (!c.hooksEnabled()) return 0;
  const payload = c.readPayload();
  if (!payload) {
    process.stderr.write('[chwezi:slop-immediate] unreadable hook payload; allowing (fail-open).\n');
    return 0;
  }
  const input = payload.tool_input || payload.toolInput || payload.input || {};
  const target = input.file_path || input.path || input.filePath || '';
  if (!target) return 0;
  const cwd = payload.cwd || process.cwd();
  const file = path.resolve(cwd, target);
  if (!EXTENSIONS.has(path.extname(file).toLowerCase()) || !fs.existsSync(file)) return 0;

  const sessionId = payload.session_id || payload.sessionId || 'no-session';
  const ledger = c.readLedger(sessionId);
  if (!ledger.files.includes(file)) ledger.files.push(file);
  // Markdown code fences are often quoted counter-examples: record the file for the
  // Stop deep pass, but never interrupt a documentation edit per keystroke.
  if (/\.mdx?$/i.test(file)) {
    c.writeLedger(ledger);
    return 0;
  }

  const detector = await c.loadDetector();
  if (!detector) {
    c.writeLedger(ledger);
    process.stderr.write('[chwezi:slop-immediate] detector not found; allowing (fail-open).\n');
    return 0;
  }
  const result = await c.withTimeout(detector.runDetector({ paths: [file], tier: 'immediate', severity: ['block'], cwd }), TIMEOUT_MS);
  if (result.timedOut) {
    c.writeLedger(ledger);
    process.stderr.write(`[chwezi:slop-immediate] detector exceeded ${TIMEOUT_MS} ms; allowing (fail-open).\n`);
    return 0;
  }
  const { report } = result;
  if (report.errors && report.errors.length) {
    c.writeLedger(ledger);
    process.stderr.write(`[chwezi:slop-immediate] detector could not assess ${target} (${report.errors[0]}); allowing (fail-open).\n`);
    return 0;
  }
  const findings = report.findings.filter((f) => f.severity === 'block');
  for (const f of findings) {
    const k = c.findingKey(f);
    if (!ledger.reported.includes(k)) ledger.reported.push(k);
  }
  c.writeLedger(ledger);
  if (findings.length === 0) return 0;
  process.stderr.write(
    `chwezi-slop: ${findings.length} blocking design finding(s) in ${target}. Fix them now, or record a waiver with a "<who>: <evidence>" reason (see tools/slop-detector/README.md):\n` +
    `${c.summarise(findings)}\n` +
    'Doctrine: doctrine/references/ai-slop-taxonomy.md (AS1-AS7) and ai-slop-banned-fonts.md. Disable for this session only with CHWEZI_SLOP_HOOKS=off.\n'
  );
  return 2;
}

main().then((code) => process.exit(code), (e) => {
  process.stderr.write(`[chwezi:slop-immediate] internal error (${e.message}); allowing (fail-open).\n`);
  process.exit(0);
});
