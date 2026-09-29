#!/usr/bin/env node
/**
 * test-slop-deep-pass.js — unit test of slop-deep-pass.js (Stop hook), using
 * slop-immediate.js to build the session ledger first.
 * Run: node hooks/test-slop-deep-pass.js
 */
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const IMMEDIATE = path.join(__dirname, 'slop-immediate.js');
const DEEP = path.join(__dirname, 'slop-deep-pass.js');
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-slop-deep-'));
fs.mkdirSync(path.join(work, '.git'));
const ledgerDir = path.join(work, 'ledger');

function file(name, content) {
  const p = path.join(work, name);
  fs.writeFileSync(p, content);
  return p;
}

function run(hook, payload, env = {}, raw = null) {
  const r = spawnSync(process.execPath, [hook], {
    input: raw !== null ? raw : JSON.stringify(payload),
    encoding: 'utf8',
    env: { ...process.env, CHWEZI_SLOP_LEDGER_DIR: ledgerDir, CHWEZI_SLOP_HOOKS: '', CLAUDE_PLUGIN_OPTION_HOOKS_ENABLED: '', ...env },
  });
  return { code: r.status, stderr: r.stderr };
}

const edit = (p, session) => ({ session_id: session, cwd: work, hook_event_name: 'PostToolUse', tool_name: 'Edit', tool_input: { file_path: p, new_string: '' } });
const stop = (session, active = false) => ({ session_id: session, cwd: work, hook_event_name: 'Stop', stop_hook_active: active });

const clean = file('clean.css', 'body { font-family: "Public Sans", sans-serif; line-height: 1.6; color: #1f2328; }\n');
const tiny = file('tiny.css', '.caption { font-size: 10px; }\n');
const glowOnly = file('glow.css', '.headline { background: linear-gradient(90deg, #0b5d4b, #1f6f8b); background-clip: text; color: transparent; }\n');

const results = [];
function check(name, got, expect, stderr = '', includes = null) {
  const ok = got === expect && (!includes || stderr.includes(includes));
  results.push(ok);
  console.log(`${ok ? 'PASS' : 'FAIL'} — ${name} (expected ${expect}, got ${got})`);
  if (!ok) console.log(`       stderr: ${stderr.split('\n').slice(0, 3).join(' | ')}`);
}

// Clean session: nothing to report.
run(IMMEDIATE, edit(clean, 's-clean'));
let r = run(DEEP, stop('s-clean'));
check('clean session — ALLOW stop', r.code, 0, r.stderr);

// Warning finding left by the per-edit tier is raised once at Stop.
run(IMMEDIATE, edit(tiny, 's-warn'));
r = run(DEEP, stop('s-warn'));
check('new warning finding — BLOCK stop once (exit 2)', r.code, 2, r.stderr, 'tiny-text');
r = run(DEEP, stop('s-warn'));
check('second Stop in the same session — ALLOW (blocks at most once)', r.code, 0, r.stderr);

// stop_hook_active short-circuits before any work.
run(IMMEDIATE, edit(tiny, 's-active'));
r = run(DEEP, stop('s-active', true));
check('stop_hook_active: true — ALLOW', r.code, 0, r.stderr);

// De-duplication: the block finding already surfaced per edit is not raised again.
const imm = run(IMMEDIATE, edit(glowOnly, 's-dedupe'));
check('per-edit tier surfaced the block finding', imm.code, 2, imm.stderr, 'gradient-text');
r = run(DEEP, stop('s-dedupe'));
check('same rule+file+line at Stop — de-duplicated, ALLOW', r.code, 0, r.stderr);

// Fail-open and disable paths.
r = run(DEEP, null, {}, '{{ not json');
check('malformed payload — fail open', r.code, 0, r.stderr, 'fail-open');
run(IMMEDIATE, edit(tiny, 's-off'));
r = run(DEEP, stop('s-off'), { CLAUDE_PLUGIN_OPTION_HOOKS_ENABLED: 'false' });
check('plugin setting disabled — ALLOW', r.code, 0, r.stderr);
r = run(DEEP, stop('s-off'), { CHWEZI_SLOP_HOOKS: 'off' });
check('CHWEZI_SLOP_HOOKS=off — ALLOW', r.code, 0, r.stderr);
r = run(DEEP, stop('s-never-edited'));
check('no ledger for the session — ALLOW', r.code, 0, r.stderr);

fs.rmSync(work, { recursive: true, force: true });
const passed = results.filter(Boolean).length;
console.log(`\n${passed}/${results.length} passed`);
process.exit(passed === results.length ? 0 : 1);
