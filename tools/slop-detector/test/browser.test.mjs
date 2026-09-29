// T08 browser tier. Without a locked Playwright in the consuming project every
// browser rule is NOT_ASSESSED (exit unaffected). With CHWEZI_SLOP_PLAYWRIGHT_PROJECT
// pointing at a project whose Playwright passes the lock rule, the acceptance
// fixtures run for real; otherwise that test is skipped (never counted as a pass).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { cli, FIX } from './helpers.mjs';
import { lockedPlaywright, expandTargets } from '../lib/browser.mjs';

const BROWSER_RULES = ['clipped-positioned-child', 'content-hidden-at-rest', 'first-viewport-column-overflow', 'horizontal-overflow', 'low-contrast-computed', 'script-error', 'text-occlusion'];

test('Playwright absent: all seven browser rules are NOT_ASSESSED and exit is 0', () => {
  const empty = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-slop-empty-'));
  try {
    const r = cli(['--json', '--tier', 'browser', path.join(FIX, 'slop-browser', 'clean.html')], { cwd: empty });
    assert.equal(r.code, 0, r.stdout + r.stderr);
    assert.deepEqual(r.json.not_assessed.map((n) => n.rule).sort(), BROWSER_RULES);
    assert.equal(r.json.findings.length, 0);
    assert.match(r.json.not_assessed[0].reason, /NOT_ASSESSED/);
  } finally {
    fs.rmSync(empty, { recursive: true, force: true });
  }
});

test('lock rule: a range or a lockfile mismatch is refused', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-slop-lock-'));
  try {
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ devDependencies: { playwright: '^1.61.1' } }));
    fs.writeFileSync(path.join(dir, 'package-lock.json'), JSON.stringify({ packages: { '': { devDependencies: { playwright: '^1.61.1' } } } }));
    assert.equal(lockedPlaywright(dir).ok, false);
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ devDependencies: { playwright: '1.61.1' } }));
    fs.writeFileSync(path.join(dir, 'package-lock.json'), JSON.stringify({ packages: { '': { devDependencies: { playwright: '1.60.0' } } } }));
    assert.match(lockedPlaywright(dir).reason, /not recorded/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('remote targets are refused unless --allow-remote', () => {
  assert.throws(() => expandTargets(['https://example.com/'], false), /refusing remote target/);
  assert.equal(expandTargets(['http://localhost:8080/'], false).length, 1);
});

const project = process.env.CHWEZI_SLOP_PLAYWRIGHT_PROJECT;
test('acceptance fixtures with a locked Playwright', { skip: !project && 'CHWEZI_SLOP_PLAYWRIGHT_PROJECT not set (browser tier NOT_ASSESSED here)', timeout: 120000 }, () => {
  const fail = cli(['--json', '--tier', 'browser', path.join(FIX, 'slop-browser', 'failed-reveal-and-clipped-tooltip.html')], { cwd: project });
  const rules = new Set(fail.json.findings.map((f) => f.rule));
  assert.ok(rules.has('content-hidden-at-rest'), JSON.stringify(fail.json, null, 1));
  assert.ok(rules.has('clipped-positioned-child'));
  const clean = cli(['--json', '--tier', 'browser', path.join(FIX, 'slop-browser', 'clean.html')], { cwd: project });
  assert.equal(clean.json.findings.length, 0, JSON.stringify(clean.json.findings, null, 1));
  assert.equal(clean.json.not_assessed.length, 0);
  const pairs = cli(['--json', '--tier', 'browser', path.join(FIX, 'slop-browser')], { cwd: project });
  for (const id of BROWSER_RULES) {
    const flagFile = pairs.json.findings.filter((f) => f.rule === id && f.file.endsWith(`${id}.flag.html`));
    const passFile = pairs.json.findings.filter((f) => f.rule === id && f.file.endsWith(`${id}.pass.html`));
    assert.ok(flagFile.length > 0, `${id} flag fixture did not flag`);
    assert.equal(passFile.length, 0, `${id} pass fixture flagged`);
  }
});
