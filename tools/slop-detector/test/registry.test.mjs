import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { loadRegistry, validateRegistry, checkExists, REGISTRY_PATH } from '../lib/registry.mjs';
import { cli } from './helpers.mjs';

const registry = loadRegistry();

test('--validate-registry exits 0', () => {
  const r = cli(['--validate-registry']);
  assert.equal(r.code, 0, r.stdout);
});

test('at least 30 rules; every rule has as_overlay, a non-empty authority and an implemented check', () => {
  assert.ok(registry.rules.length >= 30);
  for (const r of registry.rules) {
    assert.match(r.as_overlay, /^AS[1-7]$/);
    assert.ok(r.authority.human_authority.length > 0, `${r.id} has no human_authority entry`);
    assert.ok(checkExists(r), `${r.id} check not implemented`);
  }
});

test('severity ladder: block rules cite a standard, doctrine line or house ruling', () => {
  for (const r of registry.rules.filter((x) => x.severity === 'block')) {
    const ok = (r.authority.human_authority && r.authority.human_authority !== 'NOT_ASSESSED') || r.authority.house_ruling;
    assert.ok(ok, `${r.id} is block without authority`);
  }
  const bad = JSON.parse(JSON.stringify(registry));
  bad.rules[0].severity = 'block';
  bad.rules[0].authority = { human_authority: 'NOT_ASSESSED', house_ruling: '', ban_evidence: ['x'] };
  assert.ok(validateRegistry(bad).length > 0, 'schema accepted a block rule with no authority');
});

test('schema rejects duplicate ids, unknown fields and a missing fixture', () => {
  const dup = JSON.parse(JSON.stringify(registry));
  dup.rules.push(dup.rules[0]);
  assert.ok(validateRegistry(dup).some((e) => /duplicate/.test(e)));
  const extra = JSON.parse(JSON.stringify(registry));
  extra.rules[0].colour = 'x';
  assert.ok(validateRegistry(extra).length > 0);
  const nofix = JSON.parse(JSON.stringify(registry));
  nofix.rules[0].fixtures.flag = 'tests/fixtures/slop/nope.flag.css';
  assert.ok(validateRegistry(nofix).some((e) => /fixture missing/.test(e)));
});

test('every rule citing Impeccable evidence carries the pinned commit 114ea1d', () => {
  for (const r of registry.rules) {
    const cites = r.authority.ban_evidence.some((e) => /impeccable/i.test(e)) || /impeccable/i.test(r.provenance);
    if (cites) assert.match(JSON.stringify(r), /114ea1d/, r.id);
  }
});

test('AS coverage: AS1-AS5 and AS7 have executable rules; AS6 (copy) is owned by DRE packs', () => {
  const as = new Set(registry.rules.map((r) => r.as_overlay));
  for (const id of ['AS1', 'AS2', 'AS3', 'AS4', 'AS5', 'AS7']) assert.ok(as.has(id), `${id} has no rule`);
  assert.ok(!as.has('AS6'), 'AS6 copy rules load as an --extra-rules data pack (DRE/website ownership)');
});

test('data-only rule packs load, and named checks are refused', () => {
  const tmp = `${REGISTRY_PATH}.pack-test.json`;
  const pack = { schema: 1, tool: 'chwezi-slop', rules: [{ id: 'pack-buzzword', category: 'slop', as_overlay: 'AS6', severity: 'advisory', tier: 'deep', engines: ['text'], modes: ['persuade'], doctrine_ref: 'doctrine/references/ai-slop-taxonomy.md#impeccable-derived-as-overlay', authority: { human_authority: 'NOT_ASSESSED', house_ruling: '', ban_evidence: [] }, provenance: 'test pack', check: { kind: 'phrase-list', name: 'buzz', params: { phrases: ['Linear-style'] } }, exceptions: [], fixtures: { flag: 'n/a', pass: 'n/a' } }] };
  fs.writeFileSync(tmp, JSON.stringify(pack));
  try {
    const r = cli(['--json', '--extra-rules', tmp, '--rule', 'pack-buzzword', 'tests/fixtures/slop']);
    assert.equal(r.code, 0);
    pack.rules[0].check = { kind: 'named', name: 'gradientText' };
    fs.writeFileSync(tmp, JSON.stringify(pack));
    const bad = cli(['--json', '--extra-rules', tmp, 'tests/fixtures/slop']);
    assert.equal(bad.code, 1);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
});
