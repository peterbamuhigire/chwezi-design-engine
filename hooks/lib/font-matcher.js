'use strict';
/**
 * font-matcher.js — the single banned-font matcher shared by
 * hooks/banned-font-gate.js (PreToolUse gate) and the chwezi-slop detector
 * (tools/slop-detector, rules `banned-primary-font` and
 * `conditional-source-sans-primary`). M10-09-T03.
 *
 * It reads doctrine/references/ai-slop-banned-fonts.json (the machine sidecar
 * of ai-slop-banned-fonts.md) and classifies a font stack. It checks all five
 * categories the sidecar declares:
 *   hardBan + hardBanFamilyPrefixes, secondaryBan, conditionalPrimaryOnly
 *   (heading/display context only), monospaceBanned, bareSystemStackAlone.
 *
 * CommonJS so the hooks can require() it; the ESM detector loads it through
 * createRequire. No dependencies, no I/O beyond reading the sidecar.
 */

const fs = require('fs');
const path = require('path');

const DEFAULT_DOCTRINE_PATH = path.join(__dirname, '..', '..', 'doctrine', 'references', 'ai-slop-banned-fonts.json');

// CSS generic families and keywords: never a deliberate face.
const GENERIC = new Set([
  'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'math', 'emoji', 'fangsong',
  'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded',
  'inherit', 'initial', 'unset', 'revert', 'revert-layer', 'none',
]);

// Pre-installed platform faces that make up the usual "system stack". A stack
// made only of these (plus generics) is a bare system stack.
const SYSTEM_FACES = new Set([
  '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'system-ui', 'helvetica neue', 'helvetica',
  'arial', 'roboto', 'ubuntu', 'cantarell', 'oxygen', 'oxygen-sans', 'noto sans', 'fira sans',
  'droid sans', 'apple color emoji', 'segoe ui emoji', 'segoe ui symbol', 'noto color emoji',
  'sf pro text', 'sf pro display', 'lucida grande', 'tahoma', 'verdana', 'liberation sans',
]);

const HEADING_SELECTOR = /(^|[^\w-])h[1-6]\b|heading|display|title|hero|headline|masthead/i;
const HEADING_PROP = /^--font-(display|heading|head|title|headline|hero)\b/i;
const NON_FAMILY_FONT_PROP = /^--font-.*(size|weight|leading|line|tracking|spacing|feature|variation|style|stretch|kerning|optical|synthesis|smoothing|scale|step|width)/i;

function loadDoctrine(doctrinePath = DEFAULT_DOCTRINE_PATH) {
  return JSON.parse(fs.readFileSync(doctrinePath, 'utf8'));
}

function norm(name) {
  return String(name || '').replace(/\\/g, '').replace(/["'`]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

/** Builds lookup tables from the doctrine sidecar. */
function buildLists(doctrine) {
  const byName = (arr) => new Map((arr || []).map((f) => [norm(f.family), f]));
  return {
    hard: byName(doctrine.hardBan),
    secondary: byName(doctrine.secondaryBan),
    conditional: byName(doctrine.conditionalPrimaryOnly),
    mono: byName(doctrine.monospaceBanned),
    prefixes: (doctrine.hardBanFamilyPrefixes || []).filter((p) => p && p.prefix),
    bareSystem: new Set((doctrine.bareSystemStackAlone || []).map(norm)),
  };
}

function listsOf(doctrineOrLists) {
  return doctrineOrLists && doctrineOrLists.hard instanceof Map ? doctrineOrLists : buildLists(doctrineOrLists || {});
}

/** Splits a font-family value into family names, honouring quotes. */
function stackFamilies(value) {
  const out = [];
  let cur = '';
  let quote = null;
  for (const ch of String(value || '')) {
    if (quote) {
      if (ch === quote) quote = null; else cur += ch;
    } else if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
    } else if (ch === ',') {
      out.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out
    .map((f) => f.replace(/\\/g, '').replace(/!important/i, '').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function isHeadingContext(selector, prop) {
  return HEADING_PROP.test(prop || '') || HEADING_SELECTOR.test(selector || '');
}

/** Exact or prefix ban (hard + secondary + monospace), excluding the conditional list. */
function bannedEntry(family, lists) {
  const l = listsOf(lists);
  const low = norm(family);
  if (l.hard.has(low)) return { kind: 'hard', family: l.hard.get(low).family, reason: l.hard.get(low).reason };
  for (const p of l.prefixes) {
    if (low.startsWith(norm(p.prefix))) return { kind: 'prefix', family, reason: p.reason, prefix: p.prefix };
  }
  if (l.secondary.has(low)) return { kind: 'secondary', family: l.secondary.get(low).family, reason: l.secondary.get(low).reason };
  if (l.mono.has(low)) return { kind: 'mono', family: l.mono.get(low).family, reason: l.mono.get(low).reason };
  return null;
}

function isBannedFamily(family, lists) {
  return bannedEntry(family, lists) !== null;
}

/**
 * Classifies a font stack by its PRIMARY (first) family.
 * opts.selector / opts.prop give the declaration context (heading or display
 * context turns on the Source Sans conditional ban).
 * Returns null (clean) or { kind, family, reason, rule } where rule is the
 * detector rule id the hit belongs to.
 */
function classifyStack(families, lists, opts = {}) {
  const l = listsOf(lists);
  if (!families || families.length === 0) return null;
  const first = families[0];
  const low = norm(first);
  if (!low || /^var\(/.test(low) || /^\d/.test(low) || /^\$|^@|^\{/.test(low)) return null;
  const banned = bannedEntry(first, l);
  if (banned) return { ...banned, rule: 'banned-primary-font' };
  if (l.conditional.has(low)) {
    if (isHeadingContext(opts.selector, opts.prop)) {
      return { kind: 'conditional', family: l.conditional.get(low).family, reason: l.conditional.get(low).reason, rule: 'conditional-source-sans-primary' };
    }
    return null;
  }
  // A token explicitly named as the system fallback (--font-system, --font-fallback)
  // is the "deliberate, documented system-font fallback chain" the doctrine allows.
  if (l.bareSystem.has(low) && !/^--font-(system|fallback|native|os)\b/i.test(opts.prop || '')) {
    const deliberate = families.some((f) => {
      const n = norm(f);
      return !GENERIC.has(n) && !SYSTEM_FACES.has(n) && !l.bareSystem.has(n) && !/^var\(/.test(n);
    });
    if (!deliberate) return { kind: 'system', family: first, reason: 'SYS', rule: 'banned-primary-font' };
  }
  return null;
}

function lineOf(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) if (text.charCodeAt(i) === 10) line++;
  return line;
}

/** Selector governing the declaration at `index` in CSS-shaped text (best effort). */
function selectorAt(text, index) {
  let depth = 0;
  for (let i = index - 1; i >= 0; i--) {
    const ch = text[i];
    if (ch === '}') depth++;
    else if (ch === '{') {
      if (depth === 0) {
        let j = i - 1;
        while (j >= 0 && text[j] !== '}' && text[j] !== '{' && text[j] !== ';') j--;
        return text.slice(j + 1, i).replace(/\/\*[\s\S]*?\*\//g, '').trim();
      }
      depth--;
    }
  }
  return '';
}

/**
 * Finds CSS font stacks in raw text: `font-family:` declarations and
 * `--font-*` custom properties that hold a family (size/weight tokens are
 * skipped). Handles quoted names. Returns [{prop, value, families, selector, index, line}].
 */
function findCssFontDeclarations(text) {
  const out = [];
  const re = /(font-family|--font-[a-z0-9-]+)\s*:\s*((?:"[^"\n]*"|'[^'\n]*'|[^;}{"'<>\n])+)/gi;
  let m;
  while ((m = re.exec(text))) {
    const prop = m[1];
    if (/^--/.test(prop) && NON_FAMILY_FONT_PROP.test(prop)) continue;
    const value = m[2].trim();
    if (!value) continue;
    out.push({
      prop, value, families: stackFamilies(value), selector: selectorAt(text, m.index), index: m.index, line: lineOf(text, m.index),
    });
  }
  return out;
}

/**
 * Finds font stacks in JS/TS/JSON/Tailwind configs:
 *   fontFamily: "Face, sans-serif"   fontFamily: 'Face'   "fontFamily": "…"
 *   fontFamily: { sans: ['Face', 'sans-serif'], display: ['"Andada Pro"', 'serif'] }
 * Returns [{prop, value, families, selector, index, line}] with selector set to
 * the Tailwind key (so `display`/`heading` keys count as heading context).
 */
function findScriptFontStacks(text) {
  const out = [];
  const scalar = /(["']?)fontFamily\1\s*:\s*(?:"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`([^`]*)`)/g;
  let m;
  while ((m = scalar.exec(text))) {
    const value = m[2] ?? m[3] ?? m[4] ?? '';
    out.push({ prop: 'fontFamily', value, families: stackFamilies(value), selector: '', index: m.index, line: lineOf(text, m.index) });
  }
  const objRe = /(["']?)fontFamily\1\s*:\s*\{/g;
  while ((m = objRe.exec(text))) {
    let depth = 1;
    let i = m.index + m[0].length;
    const start = i;
    while (i < text.length && depth > 0) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') depth--;
      i++;
    }
    const body = text.slice(start, i - 1);
    const entry = /(["']?)([\w-]+)\1\s*:\s*(\[[^\]]*\]|"[^"]*"|'[^']*')/g;
    let e;
    while ((e = entry.exec(body))) {
      const raw = e[3];
      let families;
      if (raw.startsWith('[')) {
        families = [];
        const lit = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g;
        let s;
        while ((s = lit.exec(raw))) families.push(...stackFamilies(s[1] ?? s[2]));
      } else {
        families = stackFamilies(raw);
      }
      const index = start + e.index;
      out.push({ prop: `fontFamily.${e[2]}`, value: raw, families, selector: e[2], index, line: lineOf(text, index) });
    }
  }
  return out;
}

// ---- font-assignment context (DG6) -------------------------------------------
// A quoted banned name counts only when it is used as a font. Several family
// names are ordinary words or terms of art (a model-adaptation tag, a product
// category), so a bare quoted literal proves nothing by itself. The contexts
// that do count, each shown with a placeholder name X:
//   A. the value of a font-named key, property or constant on the same line:
//      run.font.name = "X"   HEADING_FONT = "X"   {"font_name": "X"}
//      fontFace: "X"   font: 700 2rem "X"   ctx.font = '16px "X"'
//   B. a literal inside a font-named call, object or list (the nearest named
//      bracket), whatever its keyword: Font(name="X")   font: { name: 'X' }
//      setFont("X")   registerFont(TTFont("X", f))   font_stack = [\n "X" ]
//      and the plotting form rc("font", family="X")
//   C. a WordprocessingML run-font attribute: w:ascii="X"   qn("w:eastAsia"), "X"
//   D. the face attribute of an HTML font tag.
// Anything else is not font use and is left to the stack-aware matchers.
const FONT_NAMED = /font|typeface/i;
const SAME_LINE_WINDOW = 300; // bounded so a minified one-line file cannot slow the hook
const ENCLOSING_WINDOW = 600;
// After the operator of context A: brackets, commas, bare words, numbers and
// complete quoted strings, then optionally the unfinished string that holds the
// literal. No second ':' or '=' may appear, so a later key does not inherit the
// font-named key at the start of the line. Every alternative consumes one
// character class, so the pattern cannot backtrack catastrophically.
const VALUE_TAIL = '(?:[\\s,\\[({\\w.%#+/-]|"[^"\\n]*"|\'[^\'\\n]*\'|`[^`\\n]*`)*(?:["\'`][^"\'`\\n]*)?$';
// The font-named token may sit anywhere left of the operator, so a subscript or
// call in the target still counts (a font table indexed by key, a run-font
// attribute map). The lazy gap cannot cross '=', ':' or ';', and '==' is not an
// assignment, so a comparison or a second statement does not inherit it.
const FONT_VALUE_AFTER_KEY = new RegExp(
  '(?:^|[^\\w$.-])[\\w$.-]*(?:font|typeface)[^=:;\\n]*?(?::|=(?!=))' + VALUE_TAIL, 'i');
const RUN_FONT_ATTRIBUTE = /\bw:(?:ascii|hAnsi|eastAsia|cs)\s*(?:=\s*|["']\s*\)\s*,\s*)$/;
const HTML_FONT_FACE = /<font\b[^>]*\bface\s*=\s*$/i;

/**
 * Name directly before an opening bracket: the call name in a call, the key in a
 * key-and-object pair, with the keyword that receives a nested call kept
 * (a font-named keyword before a nested dict call is part of the head).
 */
function headBefore(text, openIndex) {
  const m = /((?:[\w$.-]+["'\]]*\s*[:=]\s*)?[\w$.-]+)["'\]]*\s*(?:[:=]\s*)?$/.exec(text.slice(Math.max(0, openIndex - 80), openIndex));
  return m ? m[1] : '';
}

/** Up to three unmatched opening brackets before `index`, nearest first, each with its head name. */
function enclosingOpeners(text, index) {
  const closer = { '(': ')', '[': ']', '{': '}' };
  const depth = { ')': 0, ']': 0, '}': 0 };
  const heads = [];
  for (let i = index - 1; i >= 0 && index - i <= ENCLOSING_WINDOW; i--) {
    const ch = text[i];
    if (ch === ')' || ch === ']' || ch === '}') {
      depth[ch]++;
    } else if (ch === '(' || ch === '[' || ch === '{') {
      if (depth[closer[ch]] > 0) depth[closer[ch]]--;
      else {
        heads.push({ open: ch, at: i, head: headBefore(text, i) });
        if (heads.length === 3) break;
      }
    }
  }
  return heads;
}

/** Key or keyword directly before the literal (the name in name=X, the key in a key-and-value pair), else null. */
function keyBefore(text, index) {
  const before = text.slice(Math.max(0, index - 120), index).replace(/\s+$/, '');
  const m = /([\w$.-]+)["'\]]*\s*(?::|=(?!=))$/.exec(before);
  return m ? m[1] : null;
}

/** True when the quoted literal that starts at `index` is used as a font (contexts A to D above). */
function isFontAssignmentContext(text, index) {
  // Bounded: a minified file is one line, so never search back to the start of the text.
  const window = text.slice(Math.max(0, index - SAME_LINE_WINDOW), index);
  const lineBreak = window.lastIndexOf('\n');
  const sameLine = lineBreak === -1 ? window : window.slice(lineBreak + 1);
  if (FONT_VALUE_AFTER_KEY.test(sameLine)) return true; // A
  if (RUN_FONT_ATTRIBUTE.test(sameLine) || HTML_FONT_FACE.test(sameLine)) return true; // C, D
  const key = keyBefore(text, index);
  if (key !== null && FONT_NAMED.test(key)) return true; // font-named key reached across a line break
  // B: the nearest named bracket owns the literal; anonymous grouping brackets are skipped.
  const owner = enclosingOpeners(text, index).find((h) => h.head !== '');
  if (!owner) return false;
  if (FONT_NAMED.test(owner.head)) return true;
  return /^\s*["'`]font["'`]\s*[,)]/.test(text.slice(owner.at + 1, owner.at + 24)); // rc("font", family="X")
}

/**
 * Document-generation assignments (python-docx / python-pptx / openpyxl, JS
 * font-name setters): a banned family inside a quoted literal that is used as
 * a font (see isFontAssignmentContext). The conditional (Source Sans) list is
 * excluded: it is legal as a paired body face, so a bare literal cannot prove
 * misuse (M10-09-T03 c). A literal outside a font-assignment context is not
 * reported (DG6): the model-adaptation term LoRA, quoted in a script, is not a
 * typeface.
 */
function findBannedQuotedLiterals(text, lists) {
  const l = listsOf(lists);
  const names = [...l.hard.values(), ...l.secondary.values(), ...l.mono.values()].map((f) => f.family);
  const hits = [];
  const add = (family, index) => {
    if (isFontAssignmentContext(text, index)) {
      hits.push({ family, index, line: lineOf(text, index), context: `quoted literal "${family}"` });
    }
  };
  for (const name of names) {
    const re = new RegExp(`["'\`]${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'\`]`, 'gi');
    let m;
    while ((m = re.exec(text))) add(name, m.index);
  }
  for (const p of l.prefixes) {
    const escaped = p.prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`["'\`](${escaped}[^"'\`\\n]{0,40})["'\`]`, 'gi');
    let m;
    while ((m = re.exec(text))) add(m[1], m.index);
  }
  return hits;
}

module.exports = {
  DEFAULT_DOCTRINE_PATH,
  GENERIC,
  SYSTEM_FACES,
  loadDoctrine,
  buildLists,
  stackFamilies,
  isHeadingContext,
  bannedEntry,
  isBannedFamily,
  classifyStack,
  findCssFontDeclarations,
  findScriptFontStacks,
  findBannedQuotedLiterals,
  selectorAt,
  lineOf,
  norm,
};
