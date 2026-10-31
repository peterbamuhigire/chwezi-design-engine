#!/usr/bin/env node
/**
 * test-rendered-font-names.js: unit and command-line tests for the rendered-output font gate
 * (hooks/lib/rendered-font-names.js and scripts/check-rendered-fonts.js).
 * Run: node hooks/test-rendered-font-names.js
 *
 * Vectors for banned families are generated from the doctrine sidecar so the test follows the
 * list when it changes and never carries a banned family name as a literal in this file.
 * Fixtures under tests/fixtures/rendered-fonts are captures of real `pdffonts` output, except
 * unembedded.constructed.pdffonts.txt, which is a real capture edited so that emb reads no
 * (no real PDF with an unembedded font was available).
 */

'use strict';

const path = require('path');
const { spawnSync } = require('child_process');
const { classifyRenderedName, parsePdffonts } = require('./lib/rendered-font-names');
const { buildLists, loadDoctrine, bannedEntry } = require('./lib/font-matcher');

const ROOT = path.join(__dirname, '..');
const CLI = path.join(ROOT, 'scripts', 'check-rendered-fonts.js');
const FIX = path.join(ROOT, 'tests', 'fixtures', 'rendered-fonts');
const doctrine = loadDoctrine();
const lists = buildLists(doctrine);

let passed = 0;
let failed = 0;
function check(name, ok, detail) {
  if (ok) { passed += 1; console.log(`PASS - ${name}`); } else { failed += 1; console.log(`FAIL - ${name}${detail ? ` (${detail})` : ''}`); }
}
const status = (n) => classifyRenderedName(n, lists).status;
const cli = (args) => {
  const r = spawnSync(process.execPath, [CLI, ...args], { encoding: 'utf8' });
  return { code: r.status, out: `${r.stdout}${r.stderr}` };
};

// 1. Every banned family, written the way a PDF writes it, is banned; the CSS matcher misses most of them.
const families = [...doctrine.hardBan, ...doctrine.secondaryBan, ...doctrine.monospaceBanned].map((f) => f.family);
let cssMisses = 0;
for (const fam of families) {
  const squashed = fam.replace(/\s+/g, '');
  const variants = [`${squashed}-Regular`, `${squashed}-Bold`, `ABCDEF+${squashed}-Italic`, squashed];
  const bad = variants.filter((v) => status(v) !== 'banned');
  check(`banned family in PostScript form: ${fam}`, bad.length === 0, `not banned: ${bad.join(', ')}`);
  if (!bannedEntry(`${squashed}-Regular`, lists)) cssMisses += 1;
}
check('the CSS matcher alone misses PostScript-form names (the gap this module closes)', cssMisses >= families.length - 4, `css missed ${cssMisses} of ${families.length}`);

// 2. Prefix families: a future cut of a banned superfamily is caught by word prefix, not by substring.
const singleWordPrefix = doctrine.hardBanFamilyPrefixes.find((p) => !/\s/.test(p.prefix)).prefix;
check('single-word prefix family cut is banned (mono cut)', status(`${singleWordPrefix}Mono-Regular`) === 'banned');
check('unlisted future cut of the multi-word prefix superfamily is banned', status('IBMPlexSansNewCut-Regular') === 'banned');
check('a different family that starts with the same letters is not banned (Interstate)', status('Interstate-Regular') === 'ok');

// 3. Optical-size and variable suffixes stay banned; extra words go to review.
check('variable and optical-size cuts of a banned family are banned', status('InterVariable') === 'banned' && status('InterDisplay-Bold') === 'banned');
check('optical size marker is ignored (Fraunces9pt-SoftLight)', status('Fraunces9pt-SoftLight') === 'banned');
check('family-root match with extra words goes to review, not ban (RobotoSlab-Bold)', status('RobotoSlab-Bold') === 'review');
check('family-root match with extra words goes to review (InterTight-Regular)', status('InterTight-Regular') === 'review');
check('conditional Source Sans goes to review', status('SourceSans3-Regular') === 'review' && status('SourceSansPro-Bold') === 'review');

// 4. Approved and unrelated faces pass; fallback faces are labelled system.
for (const ok of ['PublicSans-Thin', 'SourceSerif4Variable-Roman', 'Spectral-Regular', 'JetBrainsMono-Regular', 'AAAAAA+PublicSans-Thin', '']) {
  check(`approved or empty name passes: ${ok || '(empty)'}`, status(ok) === 'ok');
}
for (const sys of ['LiberationSans', 'Helvetica', 'TimesNewRomanPS-BoldMT', 'DejaVuSans']) {
  check(`fallback face is labelled system: ${sys}`, status(sys) === 'system');
}

// 5. pdffonts parsing keeps multi-word type names and the embedded flag.
const sample = [
  'name                                 type              encoding         emb sub uni object ID',
  '------------------------------------ ----------------- ---------------- --- --- --- ---------',
  'AAAAAA+LiberationSans                CID TrueType      Identity-H       yes yes yes      5  0',
  'Helvetica                            Type 1            Custom           no  no  no       9  0',
].join('\n');
const rows = parsePdffonts(sample);
check('parsePdffonts reads two rows', rows.length === 2);
check('parsePdffonts keeps the multi-word type', rows[0] && rows[0].type === 'CID TrueType');
check('parsePdffonts reads the embedded flag', rows[0].embedded === true && rows[1].embedded === false);
check('parsePdffonts returns nothing for text without a table', parsePdffonts('no table here').length === 0);

// 6. Command line: exit codes against real captures.
const fx = (n) => path.join(FIX, n);
let r = cli(['--pdffonts-output', fx('clean.pdffonts.txt')]);
check('clean capture exits 0', r.code === 0, `exit ${r.code}`);
check('clean capture notes Type 3 without failing', /Type 3/.test(r.out));
r = cli(['--pdffonts-output', fx('banned.pdffonts.txt')]);
check('capture with a secondary-ban family exits 2', r.code === 2 && /\[BANNED\].*Montserrat/.test(r.out), `exit ${r.code}`);
r = cli(['--pdffonts-output', fx('fallback-only.pdffonts.txt')]);
check('fallback-only capture exits 3', r.code === 3 && /FALLBACK-ONLY/.test(r.out), `exit ${r.code}`);
r = cli(['--pdffonts-output', fx('unembedded.constructed.pdffonts.txt')]);
check('unembedded font exits 4', r.code === 4 && /NOT-EMBEDDED/.test(r.out), `exit ${r.code}`);
r = cli(['--names', 'RobotoSlab-Bold,Spectral-Regular']);
check('review-only names exit 0 and are listed', r.code === 0 && /\[REVIEW\]/.test(r.out), `exit ${r.code}`);
r = cli(['--waive', 'Montserrat=Client brand owner: guideline version 3 requires it', '--pdffonts-output', fx('banned.pdffonts.txt')]);
check('a waiver with who and evidence turns the ban into a recorded waiver', r.code === 0 && /\[WAIVED\]/.test(r.out), `exit ${r.code}`);
r = cli(['--waive', 'Montserrat=because', '--pdffonts-output', fx('banned.pdffonts.txt')]);
check('a waiver without who: evidence is refused (exit 1)', r.code === 1 && /invalid waiver/.test(r.out), `exit ${r.code}`);
r = cli([]);
check('no input exits 1', r.code === 1);
r = cli([path.join(FIX, 'does-not-exist.pdf')]);
check('missing file exits 1, never a pass', r.code === 1 && /file not found/.test(r.out), `exit ${r.code}`);
r = cli(['--pdffonts-output', path.join(FIX, 'does-not-exist.txt')]);
check('unreadable pdffonts output exits 1', r.code === 1);
r = cli(['--json', '--pdffonts-output', fx('banned.pdffonts.txt')]);
let parsed = null;
try { parsed = JSON.parse(r.out); } catch (e) { parsed = null; }
check('--json prints a parseable result with the banned entry', parsed && parsed.exit === 2 && parsed.banned.length === 1, `exit ${r.code}`);

console.log(`\n${passed}/${passed + failed} passed`);
process.exit(failed === 0 ? 0 : 1);
