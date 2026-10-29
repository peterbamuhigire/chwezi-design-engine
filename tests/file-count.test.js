'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { assertWithinLimit, countEntries } = require('../scripts/file-count');

test('checkout count accepts exactly 5,000 file entries', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-file-count-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (let i = 0; i < 5000; i += 1) fs.writeFileSync(path.join(root, String(i)), 'x');
  assert.equal(countEntries(root, 'checkout'), 5000);
  assert.doesNotThrow(() => assertWithinLimit(root));
});

test('checkout count rejects 5,001 file entries', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-file-count-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (let i = 0; i < 5001; i += 1) fs.writeFileSync(path.join(root, String(i)), 'x');
  assert.equal(countEntries(root, 'checkout'), 5001);
  assert.throws(() => assertWithinLimit(root), /checkout has 5001 entries/);
});

test('package mode ignores declared transient directories only', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-file-count-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  fs.writeFileSync(path.join(root, 'kept.txt'), 'x');
  fs.mkdirSync(path.join(root, '.git'));
  fs.writeFileSync(path.join(root, '.git', 'object'), 'x');
  fs.mkdirSync(path.join(root, 'tests'));
  fs.writeFileSync(path.join(root, 'tests', 'fixture'), 'x');
  assert.equal(countEntries(root, 'package'), 2);
});

test('installer and manifest generator refuse an over-limit source before writing', (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-file-count-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (let i = 0; i < 5001; i += 1) fs.writeFileSync(path.join(root, String(i)), 'x');
  const repo = path.resolve(__dirname, '..');
  const manifest = spawnSync(process.execPath, [path.join(repo, 'scripts/generate-plugin-manifest.js'), '--engine', root], { encoding: 'utf8' });
  assert.equal(manifest.status, 1);
  assert.match(manifest.stderr, /Refusing manifest generation: source checkout has 5001 entries/);
  assert.equal(fs.existsSync(path.join(root, '.claude-plugin', 'plugin.json')), false);
  const installer = spawnSync(process.execPath, [path.join(repo, 'scripts/install-engine.js'), 'install', '--engine', root, '--scope', 'project', '--dry-run'], { encoding: 'utf8' });
  assert.equal(installer.status, 1);
  assert.match(installer.stderr, /Refusing install: source checkout has 5001 entries/);
});
