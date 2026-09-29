// T07 waiver format.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cli } from './helpers.mjs';

const W = 'tests/fixtures/slop-waivers';

test('a valid inline waiver moves the finding to waived[]', () => {
  const r = cli(['--json', `${W}/inline-valid`]);
  assert.equal(r.code, 0);
  assert.equal(r.json.findings.filter((f) => f.rule === 'gradient-text').length, 0);
  const w = r.json.waived.find((f) => f.rule === 'gradient-text');
  assert.ok(w);
  assert.equal(w.waiver.source, 'inline');
  assert.match(w.waiver.reason, /^Peter Bamuhigire: /);
});

test('an inline waiver without a conforming "<who>: <evidence>" reason exits 1', () => {
  const r = cli(['--json', `${W}/bad-reason`]);
  assert.equal(r.code, 1);
  assert.match(r.json.errors.join('\n'), /reason must read/);
});

test('an agent waiver with scope "file" exits 1', () => {
  const r = cli(['--json', `${W}/config-agent-file`]);
  assert.equal(r.code, 1);
  assert.match(r.json.errors.join('\n'), /agents may grant value-scope waivers only/);
});

test('a config waiver with a non-conforming reason exits 1', () => {
  const r = cli(['--json', `${W}/config-bad-reason`]);
  assert.equal(r.code, 1);
});

test('a valid agent value waiver moves the finding to waived[]', () => {
  const r = cli(['--json', `${W}/config-value`]);
  assert.equal(r.code, 0);
  assert.equal(r.json.findings.filter((f) => f.rule === 'ai-beige-ground').length, 0);
  const w = r.json.waived.find((f) => f.rule === 'ai-beige-ground');
  assert.equal(w.waiver.source, 'config');
  assert.equal(w.waiver.scope, 'value');
  assert.equal(w.waiver.granted_by, 'agent');
});

test('disable/enable blocks waive only the enclosed lines', () => {
  const r = cli(['--json', '--rule', 'neon-glow', `${W}/block`]);
  assert.equal(r.json.waived.length, 2);
  assert.equal(r.json.findings.length, 1);
  assert.equal(r.code, 2);
});

test('--no-waivers reports waived findings and skips waiver validation', () => {
  const r = cli(['--json', '--no-waivers', `${W}/inline-valid`, `${W}/bad-reason`]);
  assert.equal(r.json.waived.length, 0);
  assert.equal(r.json.findings.filter((f) => f.rule === 'gradient-text').length, 2);
  assert.equal(r.code, 2);
});
