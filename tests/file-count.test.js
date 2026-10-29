'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
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
