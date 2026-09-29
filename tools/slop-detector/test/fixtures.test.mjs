// Every static rule's .flag fixture reports that rule; no .pass fixture reports its rule.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cli } from './helpers.mjs';
import { loadRegistry } from '../lib/registry.mjs';

const registry = loadRegistry();
const staticRules = registry.rules.filter((r) => r.tier !== 'browser');
const run = cli(['--json', 'tests/fixtures/slop']);

test('fixture run is a clean JSON report with the frozen shape', () => {
  assert.ok(run.json, `CLI did not print JSON: ${run.stderr}`);
  for (const key of ['tool', 'version', 'registry_sha256', 'findings', 'not_assessed', 'waived']) assert.ok(key in run.json, `missing ${key}`);
  assert.equal(run.json.tool, 'chwezi-slop');
  assert.deepEqual(run.json.errors, []);
  assert.equal(run.code, 2, 'block findings in flag fixtures must exit 2');
  for (const f of run.json.findings) {
    for (const key of ['rule', 'as_overlay', 'severity', 'evidence_mode', 'file', 'line', 'snippet']) assert.ok(key in f, `finding missing ${key}`);
    assert.equal(f.evidence_mode, 'cli');
  }
});

for (const rule of staticRules) {
  test(`${rule.id}: flag fixture flags, pass fixture passes`, () => {
    const inFile = (file) => run.json.findings.filter((f) => f.file === file && f.rule === rule.id);
    assert.ok(inFile(rule.fixtures.flag).length > 0, `${rule.fixtures.flag} did not report ${rule.id}`);
    assert.equal(inFile(rule.fixtures.pass).length, 0, `${rule.fixtures.pass} reported ${rule.id}`);
  });
}

test('advisory findings never fail the run; warning fails only with --fail-on warning', () => {
  const adv = cli(['--json', '--rule', 'radial-halo', 'tests/fixtures/slop/radial-halo.flag.css']);
  assert.equal(adv.json.findings.length, 1);
  assert.equal(adv.code, 0);
  const warn = cli(['--json', '--rule', 'tiny-text', 'tests/fixtures/slop/tiny-text.flag.css']);
  assert.equal(warn.code, 0);
  const warnFail = cli(['--json', '--rule', 'tiny-text', '--fail-on', 'warning', 'tests/fixtures/slop/tiny-text.flag.css']);
  assert.equal(warnFail.code, 2);
});

test('operational failure exits 1 and takes precedence', () => {
  const r = cli(['--json', '--rule', 'no-such-rule', 'tests/fixtures/slop']);
  assert.equal(r.code, 1);
  const missing = cli(['--json', 'tests/fixtures/does-not-exist']);
  assert.equal(missing.code, 1);
});

test('--mode filters rules by the four visitor modes', () => {
  const r = cli(['--json', '--mode', 'operate', 'tests/fixtures/slop/gradient-text.flag.css']);
  assert.equal(r.json.options.mode, 'operate');
  const bad = cli(['--json', '--mode', 'dashboard', 'tests/fixtures/slop']);
  assert.equal(bad.code, 1);
});
