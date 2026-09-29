#!/usr/bin/env node
/**
 * test-slop-immediate.js — unit test of slop-immediate.js (PostToolUse).
 * Runs the hook as a child process with a synthesized stdin payload and checks
 * the exit code (0 allow, 2 feedback to the model). Run: node hooks/test-slop-immediate.js
 */
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const HOOK = path.join(__dirname, 'slop-immediate.js');
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-slop-immediate-'));
fs.mkdirSync(path.join(work, '.git')); // stop token/waiver discovery at the temp project
const ledgerDir = path.join(work, 'ledger');

function file(name, content) {
  const p = path.join(work, name);
  fs.writeFileSync(p, content);
  return p;
}

function run(payload, env = {}, raw = null) {
  const r = spawnSync(process.execPath, [HOOK], {
    input: raw !== null ? raw : JSON.stringify(payload),
    encoding: 'utf8',
    env: { ...process.env, CHWEZI_SLOP_LEDGER_DIR: ledgerDir, CHWEZI_SLOP_HOOKS: '', CLAUDE_PLUGIN_OPTION_HOOKS_ENABLED: '', ...env },
  });
  return { code: r.status, stderr: r.stderr };
}

const clean = file('clean.css', 'h1 { font-family: "Andada Pro", serif; }\nbody { font-family: "Public Sans", sans-serif; line-height: 1.6; color: #1f2328; }\n');
const glow = file('glow.css', '.headline { background: linear-gradient(90deg, #0b5d4b, #1f6f8b); background-clip: text; color: transparent; }\n');
const tiny = file('tiny.css', '.caption { font-size: 10px; }\n');
const notes = file('notes.txt', 'background-clip: text');
const doc = file('guide.md', '# Guide\n\n```css\n.headline { background: linear-gradient(90deg, #0b5d4b, #1f6f8b); background-clip: text; color: transparent; }\n```\n');
const big = file('big.css', Array.from({ length: 500 }, (_, i) => `.c${i} { color: #1f2328; padding: ${i % 7}px; line-height: 1.6; }`).join('\n'));

const payload = (p, session = 'immediate-test') => ({ session_id: session, cwd: work, hook_event_name: 'PostToolUse', tool_name: 'Write', tool_input: { file_path: p, content: '' } });

const cases = [
  { name: 'clean file — ALLOW (exit 0)', payload: payload(clean), expect: 0 },
  { name: 'gradient text (block, immediate tier) — FEEDBACK (exit 2)', payload: payload(glow), expect: 2, stderrIncludes: 'gradient-text' },
  { name: 'warning-only finding (tiny-text) is left for the deep pass — ALLOW', payload: payload(tiny), expect: 0 },
  { name: 'non-design extension — ALLOW', payload: payload(notes), expect: 0 },
  { name: 'Markdown with a slop code fence — ALLOW per edit (left to the Stop deep pass)', payload: payload(doc), expect: 0 },
  { name: 'malformed payload — fail open (exit 0)', raw: 'not json {{', expect: 0, stderrIncludes: 'fail-open' },
  { name: 'plugin setting CLAUDE_PLUGIN_OPTION_HOOKS_ENABLED=false — ALLOW despite finding', payload: payload(glow), env: { CLAUDE_PLUGIN_OPTION_HOOKS_ENABLED: 'false' }, expect: 0 },
  { name: 'CHWEZI_SLOP_HOOKS=off — ALLOW despite finding', payload: payload(glow), env: { CHWEZI_SLOP_HOOKS: 'off' }, expect: 0 },
  { name: 'missing detector — fail open (exit 0)', payload: payload(glow, 'immediate-missing'), env: { CHWEZI_SLOP_DETECTOR: path.join(work, 'nope', 'detector.mjs') }, expect: 0, stderrIncludes: 'detector not found' },
  { name: 'relative file_path resolved against payload cwd — FEEDBACK', payload: payload('glow.css', 'immediate-rel'), expect: 2 },
];

let failures = 0;
for (const c of cases) {
  const r = run(c.payload, c.env, c.raw ?? null);
  const pass = r.code === c.expect && (!c.stderrIncludes || (r.stderr || '').includes(c.stderrIncludes));
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${c.name} (expected ${c.expect}, got ${r.code})`);
  if (!pass) { failures++; console.log(`       stderr: ${(r.stderr || '').split('\n').slice(0, 3).join(' | ')}`); }
}

// Ledger records every edited design file and the findings already surfaced.
const ledger = JSON.parse(fs.readFileSync(path.join(ledgerDir, 'immediate-test.json'), 'utf8'));
const ledgerOk = ledger.files.includes(doc) && ledger.files.includes(clean) && ledger.files.includes(glow) && ledger.files.includes(tiny) && ledger.reported.some((k) => k.startsWith('gradient-text|'));
console.log(`${ledgerOk ? 'PASS' : 'FAIL'} — session ledger records edited files and surfaced findings`);
if (!ledgerOk) failures++;

// Runtime on a 500-line stylesheet (phase value measure: median <= 1 s).
const times = [];
for (let i = 0; i < 3; i++) {
  const t = process.hrtime.bigint();
  run(payload(big, 'immediate-timing'));
  times.push(Number(process.hrtime.bigint() - t) / 1e6);
}
times.sort((a, b) => a - b);
const median = times[1];
const fast = median <= 3000;
console.log(`${fast ? 'PASS' : 'FAIL'} — immediate hook on a 500-line CSS file: median ${median.toFixed(0)} ms (process start included; target <= 1000 ms, test ceiling 3000 ms)`);
if (!fast) failures++;

fs.rmSync(work, { recursive: true, force: true });
const total = cases.length + 2;
console.log(`\n${total - failures}/${total} passed`);
process.exit(failures ? 1 : 0);
