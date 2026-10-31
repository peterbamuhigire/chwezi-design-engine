#!/usr/bin/env node
'use strict';
/**
 * check-rendered-fonts.js: the font gate for RENDERED output.
 *
 * The banned-font hook and the chwezi-slop detector read source files. A finished PDF can
 * still carry a banned face (from an imported figure, a template, a fallback) or only
 * fallback faces (the intended font failed to load). This script reads the fonts a
 * rendered file actually embeds and applies the same doctrine sidecar.
 *
 *   node scripts/check-rendered-fonts.js [options] <file.pdf>...
 *
 *   --names a,b,c              classify these font names (for DOCX/PPTX/SVG names you extracted)
 *   --pdffonts-output <file>   classify the saved text of `pdffonts` (use - for stdin)
 *   --waive "Family=who: why"  accept one family with a recorded reason (who: evidence, 10+ chars of evidence)
 *   --json                     print the result as JSON
 *
 * For a .pdf argument the script runs `pdffonts <file>` (poppler). If `pdffonts` is not
 * installed the result is NOT_ASSESSED and the exit code is 1; it is never a pass.
 *
 * Exit codes: 0 pass; 1 operational failure or NOT_ASSESSED; 2 a banned family is present;
 * 3 only system or fallback faces were found; 4 a font is not embedded. When several apply
 * the lowest of 2, 3 and 4 is returned. Faces that need a person (family-root matches,
 * conditional Source Sans, Type 3 outlines) are listed as notes and do not fail the run.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { classifyRenderedName, parsePdffonts, stripSubsetTag } = require(path.join('..', 'hooks', 'lib', 'rendered-font-names'));
const { buildLists, loadDoctrine } = require(path.join('..', 'hooks', 'lib', 'font-matcher'));

const WAIVER = /^[^:\n]{2,80}: \S.{9,}$/;

function parseArgs(argv) {
  const o = { names: [], pdffontsOutputs: [], files: [], waive: [], json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    const next = () => {
      if (i + 1 >= argv.length) throw new Error(`${a} needs a value`);
      i += 1;
      return argv[i];
    };
    if (a === '--names') o.names.push(...next().split(',').map((s) => s.trim()).filter(Boolean));
    else if (a === '--pdffonts-output') o.pdffontsOutputs.push(next());
    else if (a === '--waive') o.waive.push(next());
    else if (a === '--json') o.json = true;
    else if (a.startsWith('--')) throw new Error(`unknown option ${a}`);
    else o.files.push(a);
  }
  return o;
}

function parseWaivers(list) {
  const waivers = new Map();
  for (const w of list) {
    const eq = w.indexOf('=');
    const family = eq > 0 ? w.slice(0, eq).trim().toLowerCase() : '';
    const reason = eq > 0 ? w.slice(eq + 1).trim() : '';
    if (!family || !WAIVER.test(reason)) throw new Error(`invalid waiver "${w}": use Family=who: evidence (evidence of at least 10 characters)`);
    waivers.set(family, reason);
  }
  return waivers;
}

function readPdffonts(file) {
  try {
    return { text: execFileSync('pdffonts', [file], { encoding: 'utf8' }) };
  } catch (e) {
    if (e.code === 'ENOENT') return { notAssessed: 'pdffonts (poppler) is not installed; install it or pass --pdffonts-output / --names' };
    return { error: `pdffonts failed on ${file}: ${String(e.stderr || e.message).trim().split('\n')[0]}` };
  }
}

function run(o) {
  const lists = buildLists(loadDoctrine());
  const waivers = parseWaivers(o.waive);
  const sources = [];
  const problems = [];
  const notAssessed = [];
  for (const file of o.files) {
    if (!fs.existsSync(file)) { problems.push(`file not found: ${file}`); continue; }
    const r = readPdffonts(file);
    if (r.notAssessed) notAssessed.push(r.notAssessed);
    else if (r.error) problems.push(r.error);
    else sources.push({ source: file, rows: parsePdffonts(r.text) });
  }
  for (const file of o.pdffontsOutputs) {
    try {
      sources.push({ source: file, rows: parsePdffonts(fs.readFileSync(file === '-' ? 0 : file, 'utf8')) });
    } catch (e) { problems.push(`cannot read ${file}: ${e.message}`); }
  }
  if (o.names.length) sources.push({ source: '--names', rows: o.names.map((name) => ({ name, type: '', embedded: null })) });

  const result = { sources: [], banned: [], review: [], system: [], notEmbedded: [], type3: [], waived: [], ok: [], problems, notAssessed };
  for (const src of sources) {
    const faces = src.rows.map((row) => ({ row, c: classifyRenderedName(row.name, lists) }));
    if (src.rows.length === 0) problems.push(`${src.source}: no fonts found (no text, or the table could not be read)`);
    result.sources.push({ source: src.source, fonts: src.rows.length });
    for (const { row, c } of faces) {
      const entry = { source: src.source, name: row.name, family: c.family || stripSubsetTag(row.name), kind: c.kind, reason: c.reason, note: c.note };
      const waiver = c.family ? waivers.get(String(c.family).toLowerCase()) : undefined;
      if ((c.status === 'banned' || c.status === 'review') && waiver) result.waived.push({ ...entry, waiver });
      else if (c.status === 'banned') result.banned.push(entry);
      else if (c.status === 'review') result.review.push(entry);
      else if (c.status === 'system') result.system.push(entry);
      else result.ok.push(entry);
      if (row.embedded === false) result.notEmbedded.push(entry);
      if (/^Type 3\b/i.test(row.type || '')) result.type3.push(entry);
    }
    // Only fallback faces, nothing else of substance: the intended font did not load.
    const nonSystem = faces.filter(({ c }) => c.status !== 'system');
    if (faces.length > 0 && nonSystem.length === 0) result.onlyFallback = (result.onlyFallback || []).concat(src.source);
  }
  for (const key of ['banned', 'review', 'system', 'notEmbedded', 'type3', 'waived']) {
    const seen = new Set();
    result[key] = result[key].filter((e) => {
      const id = `${e.source}|${e.name.replace(/^[A-Z]{6}\+/, '')}`;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }
  let code = 0;
  if (problems.length || notAssessed.length) code = 1;
  else if (result.banned.length) code = 2;
  else if (result.onlyFallback) code = 3;
  else if (result.notEmbedded.length) code = 4;
  result.exit = code;
  return result;
}

function print(result) {
  const line = (e) => `  ${e.name}${e.family && e.family !== e.name ? ` (family ${e.family})` : ''}${e.kind ? ` [${e.kind}]` : ''}${e.note ? `: ${e.note}` : ''}`;
  console.log('rendered-font-gate:');
  for (const s of result.sources) console.log(`- ${s.source}: ${s.fonts} font entries`);
  for (const p of result.problems) console.log(`[ERROR] ${p}`);
  for (const p of result.notAssessed) console.log(`[NOT_ASSESSED] ${p}`);
  for (const e of result.banned) console.log(`[BANNED] ${line(e)}`.replace('[BANNED]   ', '[BANNED] '));
  for (const s of result.onlyFallback || []) console.log(`[FALLBACK-ONLY] ${s}: every face is a system or fallback face; the intended font probably did not load`);
  for (const e of result.notEmbedded) console.log(`[NOT-EMBEDDED] ${e.name}`);
  for (const e of result.review) console.log(`[REVIEW] ${line(e).trim()}`);
  for (const e of result.waived) console.log(`[WAIVED] ${e.name}: ${e.waiver}`);
  if (result.type3.length) console.log(`[NOTE] ${result.type3.length} Type 3 font entr${result.type3.length === 1 ? 'y' : 'ies'} (glyphs written as outlines; common for variable fonts exported from a browser). Confirm with the print bureau or preflight tool.`);
  console.log(result.exit === 0 ? 'PASS: no banned family, fallback-only output or unembedded font in the inspected names' : `FAIL: exit ${result.exit}`);
}

function main(argv) {
  let o;
  try { o = parseArgs(argv); } catch (e) { console.error(`check-rendered-fonts: ${e.message}`); return 1; }
  if (!o.files.length && !o.names.length && !o.pdffontsOutputs.length) {
    console.error('check-rendered-fonts: give a PDF, --names or --pdffonts-output (see the header of this file)');
    return 1;
  }
  let result;
  try { result = run(o); } catch (e) { console.error(`check-rendered-fonts: ${e.message}`); return 1; }
  if (o.json) console.log(JSON.stringify(result, null, 2)); else print(result);
  return result.exit;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { run, main, parseArgs };
