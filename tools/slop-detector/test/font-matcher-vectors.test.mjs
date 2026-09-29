// M10-10-T01: the shared banned-font vectors. The Python catalogue lint
// (engine/design_engine/catalog.py FontDoctrine) consumes the same file in
// tests/test_design_engine_runtime.py, so the two matchers cannot drift apart silently.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { ROOT } from './helpers.mjs';

const require = createRequire(import.meta.url);
const matcher = require(path.join(ROOT, 'hooks', 'lib', 'font-matcher.js'));
const vectors = JSON.parse(fs.readFileSync(path.join(ROOT, 'tests', 'fixtures', 'font-matcher-vectors.json'), 'utf8')).vectors;
const lists = matcher.buildLists(matcher.loadDoctrine());

test('shared font-matcher vectors: banned kind', () => {
  for (const v of vectors) {
    const hit = matcher.bannedEntry(v.family, lists);
    assert.equal(hit ? hit.kind : null, v.expect, `bannedEntry(${JSON.stringify(v.family)})`);
  }
});

test('shared font-matcher vectors: conditional Source Sans by context', () => {
  for (const v of vectors.filter((row) => row.context)) {
    const selector = v.context === 'heading' ? 'h1' : 'body';
    const hit = matcher.classifyStack([v.family], lists, { selector, prop: 'font-family' });
    assert.equal(hit ? hit.kind : null, v.context_expect, `${v.family} in ${v.context}`);
  }
});
