// T13 --doctrine-consistency: baseline/ban conflicts fail; banned font folders are report-only.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { doctrineConsistency } from '../lib/doctrine-consistency.mjs';
import { ROOT, cli } from './helpers.mjs';

function tempRoot(fontGroups, extraFolders = []) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'chwezi-slop-consistency-'));
  fs.mkdirSync(path.join(dir, 'doctrine', 'references'), { recursive: true });
  fs.copyFileSync(path.join(ROOT, 'doctrine/references/ai-slop-banned-fonts.json'), path.join(dir, 'doctrine/references/ai-slop-banned-fonts.json'));
  fs.writeFileSync(path.join(dir, 'doctrine/references/font-groups-and-usage.md'), fontGroups);
  for (const f of extraFolders) fs.mkdirSync(path.join(dir, 'fonts', f), { recursive: true });
  return dir;
}

test('the engine tree is consistent (exit 0)', () => {
  const r = cli(['--doctrine-consistency']);
  assert.equal(r.code, 0, r.stdout);
});

test('a banned family listed as a baseline is a conflict; prefix bans count', () => {
  const dir = tempRoot('## 01 - Formal\n\n**Baseline faces:** Source Serif 4, Inter, IBM Plex Serif.\n\n## Quick chooser by artifact\n\n| Artifact | Default | Header -> Body |\n|---|---|---|\n| Report | 01 | Geist Mono -> Public Sans |\n');
  try {
    const res = doctrineConsistency(dir);
    assert.equal(res.ok, false);
    const fams = res.conflicts.map((c) => c.family.toLowerCase());
    assert.ok(fams.includes('inter'));
    assert.ok(fams.some((f) => f.startsWith('ibm plex')));
    assert.ok(fams.some((f) => f.startsWith('geist')));
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});

test('Source Sans body-only and guardrail prose are not conflicts; banned folders are reported, not failed', () => {
  const dir = tempRoot('## 08 - Body\n\n**Baseline faces:** Public Sans, Source Sans 3 body-only.\n\n## Guardrails\n\n- Never use Inter.\n', ['02-editorial-literary/fraunces', '02-editorial-literary/andada']);
  try {
    const res = doctrineConsistency(dir);
    assert.equal(res.ok, true, JSON.stringify(res.conflicts));
    assert.deepEqual(res.folders.map((f) => f.folder), ['fonts/02-editorial-literary/fraunces/']);
    assert.match(res.folders[0].action, /REPORT ONLY/);
    assert.ok(fs.existsSync(path.join(dir, 'fonts/02-editorial-literary/fraunces')), 'the check must never delete a folder');
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
});
