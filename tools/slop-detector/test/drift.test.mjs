// T09 drift rules.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cli } from './helpers.mjs';
import { parseColour, deltaE2000, deltaE2000Lab } from '../lib/colour.mjs';

test('slop-drift fixture yields exactly one advisory (colour) and one blocking (font) finding', () => {
  const r = cli(['--json', 'tests/fixtures/slop-drift']);
  assert.deepEqual(r.json.errors, []);
  assert.equal(r.json.findings.length, 2, JSON.stringify(r.json.findings, null, 1));
  const adv = r.json.findings.filter((f) => f.severity === 'advisory');
  const blk = r.json.findings.filter((f) => f.severity === 'block');
  assert.equal(adv.length, 1);
  assert.equal(adv[0].rule, 'design-system-color');
  assert.equal(blk.length, 1);
  assert.equal(blk[0].rule, 'design-system-font');
  assert.equal(r.code, 2);
});

test('--tokens overrides discovery; no token source reports drift rules as NOT_ASSESSED', () => {
  const none = cli(['--json', 'tests/fixtures/slop/tiny-text.pass.css']);
  const na = none.json.not_assessed.map((n) => n.rule).sort();
  assert.deepEqual(na, ['design-system-color', 'design-system-font', 'design-system-font-size', 'design-system-radius']);
  const withTokens = cli(['--json', '--tokens', 'tests/fixtures/slop-drift/design-tokens.json', 'tests/fixtures/slop/italic-serif-display.pass.css']);
  assert.ok(withTokens.json.findings.some((f) => f.rule === 'design-system-font'));
});

test('CIEDE2000: OKLCH/hex round-trips stay under 2.0; distinct colours exceed it', () => {
  // #0b5d4b expressed in OKLCH (rounded as a designer would write it).
  const hex = parseColour('#0b5d4b');
  const ok = parseColour('oklch(0.4254 0.0754 172.1)');
  assert.ok(deltaE2000(hex, ok) < 2.0, `dE ${deltaE2000(hex, ok)}`);
  assert.ok(deltaE2000(parseColour('#0b5d4b'), parseColour('#b3261e')) > 20);
  assert.ok(Math.abs(deltaE2000(parseColour('#0b5d4b'), parseColour('#0b5d4b'))) < 1e-9);
});

test('CIEDE2000 matches the Sharma, Wu & Dalal (2005) test data', () => {
  // Pairs 1, 7 and 19 of the published CIEDE2000 test data set.
  const cases = [
    [{ L: 50, a: 2.6772, b: -79.7751 }, { L: 50, a: 0, b: -82.7485 }, 2.0425],
    [{ L: 50, a: 0, b: 0 }, { L: 50, a: -1, b: 2 }, 2.3669],
    [{ L: 50, a: 2.5, b: 0 }, { L: 56, a: -27, b: -3 }, 31.9030],
  ];
  for (const [a, b, expected] of cases) assert.ok(Math.abs(deltaE2000Lab(a, b) - expected) < 1e-3, `${deltaE2000Lab(a, b)} vs ${expected}`);
});
