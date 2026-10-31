'use strict';
/**
 * rendered-font-names.js: classifies the font names found inside a RENDERED file
 * (the name column of `pdffonts`, a DOCX font table, an SVG export) against the
 * banned-font doctrine sidecar.
 *
 * Why a second module: the shared matcher (font-matcher.js) reads CSS family
 * names, written with spaces, as in the IBM Plex Sans family. A rendered file
 * carries PostScript names such as ABCDEF+IBMPlexSans-Regular, ArialMT or
 * InterVariable. Those never equal a CSS name, so the CSS matcher passes every one
 * of them. This module turns a PostScript-style name back into the words of a
 * family name and checks the same sidecar lists. font-matcher.js is not changed
 * (other engines vendor it).
 *
 * Statuses:
 *   banned       the family is on the hard, prefix, monospace or secondary list
 *   review       the family root matches a banned family but the name carries extra
 *                words (RobotoSlab), or it is a conditional family (Source Sans,
 *                permitted as a paired body face only): a person decides
 *   system       a platform or fallback face (Liberation, DejaVu, Helvetica, Times,
 *                Courier, and the sidecar's bare-system list): evidence of a fallback
 *   ok           no match
 *
 * CommonJS, no dependencies, no I/O beyond reading the sidecar.
 */

const { buildLists, loadDoctrine } = require('./font-matcher');

// Weight, slant and vendor suffix words that follow a family name inside a PostScript name.
const STYLE_WORDS = new Set([
  'regular', 'bold', 'italic', 'oblique', 'light', 'thin', 'extralight', 'ultralight', 'medium',
  'semibold', 'demibold', 'extrabold', 'ultrabold', 'black', 'heavy', 'book', 'roman', 'variable',
  'vf', 'mt', 'ps', 'std', 'condensed', 'narrow', 'italicmt', 'boldmt',
]);
// Optical-size words that name a cut of the same family (Inter Display, Inter Text).
const OPTICAL_WORDS = new Set(['display', 'text', 'caption', 'subhead', 'opticals']);
// Platform and fallback faces seen in rendered output when the intended face failed to load.
const FALLBACK_FACES = new Set([
  'liberation sans', 'liberation serif', 'liberation mono', 'dejavu sans', 'dejavu serif', 'dejavu sans mono',
  'helvetica', 'helvetica neue', 'times', 'times new roman', 'timesnewromanps', 'courier', 'courier new',
  'noto sans', 'noto serif', 'droid sans', 'droid serif', 'segoe ui', 'sf pro text', 'sf pro display',
  'lucida grande', 'tahoma', 'verdana', 'cantarell', 'ubuntu', 'oxygen', 'fira sans',
]);

function stripSubsetTag(name) {
  return String(name || '').trim().replace(/^[A-Z]{6}\+/, '');
}

/** Splits a PostScript-style head into lower-case words: IBMPlexSansKR gives ibm plex sans kr; Fraunces9pt gives fraunces 9pt. */
function words(head) {
  const out = [];
  for (const piece of String(head).split(/[\s_]+/)) {
    const found = piece.match(/[A-Z]+(?![a-z])|[A-Z]?[a-z]+|\d+[a-z]*/g);
    if (found) out.push(...found.map((w) => w.toLowerCase()));
  }
  return out;
}

function headOf(name) {
  // Arial-BoldMT, Arial,Bold, TimesNewRomanPS-BoldMT: the family is before the first hyphen or comma.
  return stripSubsetTag(name).split(/[-,]/)[0];
}

function trimTrailing(ws, set) {
  const copy = ws.slice();
  while (copy.length > 1 && (set.has(copy[copy.length - 1]) || /^\d+pt$/.test(copy[copy.length - 1]))) copy.pop();
  return copy;
}

function exactEntry(ws, lists) {
  const key = ws.join(' ');
  const squashed = ws.join('');
  for (const [kind, map] of [['hard', lists.hard], ['secondary', lists.secondary], ['mono', lists.mono]]) {
    for (const [name, entry] of map) {
      if (name === key || name.replace(/\s+/g, '') === squashed) return { kind, family: entry.family, reason: entry.reason };
    }
  }
  return null;
}

function conditionalEntry(ws, lists) {
  const squashed = ws.join('');
  for (const [name, entry] of lists.conditional) {
    if (name.replace(/\s+/g, '') === squashed) return { family: entry.family, reason: entry.reason };
  }
  return null;
}

function prefixEntry(ws, lists) {
  for (const p of lists.prefixes) {
    const pw = words(p.prefix);
    if (pw.length <= ws.length && pw.every((w, i) => ws[i] === w)) return { kind: 'prefix', family: p.prefix, reason: p.reason };
  }
  return null;
}

/**
 * Classifies one name from a rendered file.
 * Returns { name, status, family?, kind?, reason?, note? }.
 */
function classifyRenderedName(name, doctrineOrLists) {
  const lists = doctrineOrLists && doctrineOrLists.hard instanceof Map ? doctrineOrLists : buildLists(doctrineOrLists || loadDoctrine());
  const raw = String(name || '').trim();
  const base = { name: raw };
  if (!raw) return { ...base, status: 'ok' };
  const all = words(headOf(raw));
  if (all.length === 0) return { ...base, status: 'ok' };
  const core = trimTrailing(all, STYLE_WORDS);
  const noOptical = trimTrailing(core, OPTICAL_WORDS);

  for (const ws of [core, noOptical]) {
    const hit = exactEntry(ws, lists) || prefixEntry(ws, lists);
    if (hit) return { ...base, status: 'banned', ...hit };
  }
  for (const ws of [core, noOptical]) {
    const cond = conditionalEntry(ws, lists);
    if (cond) return { ...base, status: 'review', kind: 'conditional', family: cond.family, reason: cond.reason, note: 'permitted as a paired body face only; confirm it is not used for headings or display' };
  }
  // Family root matches a banned family, but the name carries further words (RobotoSlab, InterTight).
  for (let k = noOptical.length - 1; k >= 1; k -= 1) {
    const hit = exactEntry(noOptical.slice(0, k), lists);
    if (hit) return { ...base, status: 'review', kind: hit.kind, family: hit.family, reason: hit.reason, note: `family root matches ${hit.family}; remaining words "${noOptical.slice(k).join(' ')}" may name a different family` };
  }
  const spaced = noOptical.join(' ');
  // Check the trimmed words and the untrimmed head: Times New Roman ends in a style word (roman).
  const squashedForms = new Set([noOptical.join(''), all.join('')]);
  const known = [...FALLBACK_FACES, ...lists.bareSystem].map((f) => String(f).toLowerCase().replace(/\s+/g, ''));
  if (known.some((f) => squashedForms.has(f))) {
    return { ...base, status: 'system', family: spaced, note: 'platform or fallback face' };
  }
  return { ...base, status: 'ok' };
}

/**
 * Parses the table printed by poppler's `pdffonts`. Column positions come from the dashed
 * rule under the header, so multi-word type names (CID TrueType) stay in one column.
 * Returns [{ name, type, encoding, embedded, subset, unicode }].
 */
function parsePdffonts(text) {
  const lines = String(text || '').split(/\r?\n/);
  const ruleIndex = lines.findIndex((l) => /^-+( +-+)+\s*$/.test(l));
  if (ruleIndex < 1) return [];
  const spans = [];
  const re = /-+/g;
  let m;
  while ((m = re.exec(lines[ruleIndex])) !== null) spans.push([m.index, m.index + m[0].length]);
  const cut = (line, i) => line.slice(spans[i][0], i === spans.length - 1 ? undefined : spans[i + 1][0]).trim();
  const rows = [];
  for (const line of lines.slice(ruleIndex + 1)) {
    if (!line.trim()) continue;
    rows.push({
      name: cut(line, 0),
      type: spans.length > 1 ? cut(line, 1) : '',
      encoding: spans.length > 2 ? cut(line, 2) : '',
      embedded: spans.length > 3 ? cut(line, 3) === 'yes' : null,
      subset: spans.length > 4 ? cut(line, 4) === 'yes' : null,
      unicode: spans.length > 5 ? cut(line, 5) === 'yes' : null,
    });
  }
  return rows;
}

module.exports = { classifyRenderedName, parsePdffonts, words, headOf, stripSubsetTag, STYLE_WORDS, OPTICAL_WORDS, FALLBACK_FACES };
