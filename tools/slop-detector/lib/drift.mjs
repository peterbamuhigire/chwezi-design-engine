// Design-system drift rules (M10-09-T09): values that fall outside the project's
// own token artefact. Token source order: --tokens <path>; .chwezi/slop.json
// "tokens"; the nearest design-tokens.json (website artefact shape
// {"artifact":"design-tokens","tokens":{...}}); the nearest DTCG file
// (tokens.json or *.tokens.json with $value/$type).
import fs from 'node:fs';
import path from 'node:path';
import { coloursIn, parseColour, deltaE2000 } from './colour.mjs';
import { toPx, splitSpaces } from './util.mjs';
import { splitClass } from './tailwind.mjs';
import { matcher } from './document.mjs';

const GENERIC = matcher.GENERIC;

function flatten(obj, prefix = '', inheritedType = null, out = []) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) return out;
  const groupType = obj.$type || inheritedType;
  if ('$value' in obj) {
    out.push({ path: prefix, value: obj.$value, type: groupType });
    return out;
  }
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    const p = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) flatten(v, p, groupType, out);
    else out.push({ path: p, value: v, type: groupType });
  }
  return out;
}

export function parseTokenFile(file) {
  const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
  const body = raw && raw.artifact === 'design-tokens' && raw.tokens ? raw.tokens : raw;
  const entries = flatten(body);
  const tokens = { source: file, fonts: new Set(), colours: [], radii: [], sizes: [] };
  for (const e of entries) {
    const p = e.path.toLowerCase();
    const type = (e.type || '').toLowerCase();
    const values = Array.isArray(e.value) ? e.value : [e.value];
    if (type === 'fontfamily' || (!type && /(^|\.)(font|fonts|typeface|family|fontfamily|font-family)(\.|$)/.test(p) && !/size|weight|leading|line|tracking|spacing/.test(p))) {
      for (const v of values) {
        if (typeof v !== 'string' || /^\d/.test(v)) continue;
        for (const f of matcher.stackFamilies(v)) if (!GENERIC.has(matcher.norm(f))) tokens.fonts.add(matcher.norm(f));
      }
      continue;
    }
    for (const v of values) {
      if (typeof v !== 'string' && typeof v !== 'number') continue;
      const s = String(v);
      const colour = parseColour(s);
      if (type === 'color' || (colour && !/^\d/.test(s))) { if (colour) tokens.colours.push(colour); continue; }
      const px = toPx(s);
      if (px === null) continue;
      if (/radius|rounded/.test(p) || type === 'borderradius') tokens.radii.push(px);
      else if (/size|font-size|fontsize|(^|\.)text\./.test(p) || type === 'fontsize') tokens.sizes.push(px);
    }
  }
  return tokens;
}

function isStop(dir) {
  return fs.existsSync(path.join(dir, '.git'));
}

function findUp(startDir, test) {
  let dir = path.resolve(startDir);
  for (;;) {
    const hit = test(dir);
    if (hit) return hit;
    if (isStop(dir)) return null;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

export function findTokenFile(startDir) {
  const website = findUp(startDir, (d) => {
    const f = path.join(d, 'design-tokens.json');
    return fs.existsSync(f) ? f : null;
  });
  if (website) return website;
  return findUp(startDir, (d) => {
    let names = [];
    try { names = fs.readdirSync(d); } catch { return null; }
    const cand = names.filter((n) => n === 'tokens.json' || n.endsWith('.tokens.json'));
    for (const n of cand) {
      const f = path.join(d, n);
      try { if (fs.readFileSync(f, 'utf8').includes('"$value"')) return f; } catch { /* unreadable */ }
    }
    return null;
  });
}

const cache = new Map();

/** Resolves the token set for a file, or null. `opts.tokens` and `opts.config` take precedence. */
export function resolveTokens(file, opts = {}) {
  let source = null;
  if (opts.tokens) source = path.resolve(opts.tokens);
  else if (opts.config && opts.config.data && opts.config.data.tokens) source = path.resolve(path.dirname(path.dirname(opts.config.path)), opts.config.data.tokens);
  else source = findTokenFile(path.dirname(file));
  if (!source) return null;
  if (!cache.has(source)) cache.set(source, parseTokenFile(source));
  return cache.get(source);
}

export function clearTokenCache() { cache.clear(); }

const COLOUR_PROPS = /^(color|background|background-color|border|border-(top|right|bottom|left|inline-start|inline-end)(-color)?|border-color|outline(-color)?|fill|stroke|box-shadow|text-shadow|text-decoration-color|caret-color|accent-color|column-rule-color)$|^--(color|colour)/;

function designSystemFont(doc, params, ctx) {
  const t = ctx.tokens;
  if (!t || t.fonts.size === 0) return [];
  const out = [];
  for (const s of doc.fontStacks) {
    const first = s.families[0];
    const n = matcher.norm(first);
    if (!n || GENERIC.has(n) || /^var\(/.test(n) || /^\d/.test(n) || /^(inherit|initial)$/.test(n)) continue;
    if (!t.fonts.has(n)) out.push({ line: s.line, message: `${s.prop}: "${first}" is not a token font (${path.basename(t.source)})` });
  }
  return out;
}

function designSystemColor(doc, params, ctx) {
  const t = ctx.tokens;
  if (!t || t.colours.length === 0) return [];
  const tol = params.delta_e ?? 2.0;
  const out = [];
  const offToken = (c) => c.a > 0 && Math.min(...t.colours.map((tc) => deltaE2000(c, tc))) > tol;
  for (const b of doc.blocks) {
    for (const d of b.decls) {
      if (!COLOUR_PROPS.test(d.prop)) continue;
      for (const x of coloursIn(d.value)) {
        if (x.token.toLowerCase() === 'transparent') continue;
        if (offToken(x.colour)) { out.push({ line: d.line, message: `${d.prop}: ${x.token} is outside the token palette (dE2000 > ${tol})` }); break; }
      }
    }
  }
  for (const cl of doc.classLists) {
    for (const c of cl.classes) {
      const m = /^(bg|text|border|ring|fill|stroke|from|via|to)-\[(#[0-9a-fA-F]{3,8}|rgba?\([^\]]+\)|hsla?\([^\]]+\)|oklch\([^\]]+\))\]$/.exec(splitClass(c).base);
      if (!m) continue;
      const col = parseColour(m[2].replace(/_/g, ' '));
      if (col && offToken(col)) out.push({ line: cl.line, message: `${c} is outside the token palette` });
    }
  }
  return out;
}

function designSystemRadius(doc, params, ctx) {
  const t = ctx.tokens;
  if (!t || t.radii.length === 0) return [];
  const out = [];
  for (const b of doc.blocks) {
    for (const d of b.decls) {
      if (!/^border(-[a-z]+)*-radius$/.test(d.prop)) continue;
      for (const tok of splitSpaces(d.value.replace('/', ' '))) {
        const px = toPx(tok);
        if (px === null || px === 0 || px >= 999) continue;
        if (!t.radii.some((r) => Math.abs(r - px) < 0.5)) { out.push({ line: d.line, message: `${d.prop}: ${d.value} is not a token radius` }); break; }
      }
    }
  }
  return out;
}

function designSystemFontSize(doc, params, ctx) {
  const t = ctx.tokens;
  if (!t || t.sizes.length === 0) return [];
  const out = [];
  for (const b of doc.blocks) {
    for (const d of b.decls) {
      if (d.prop !== 'font-size') continue;
      const px = toPx(d.value);
      if (px === null || px === 0) continue;
      if (!t.sizes.some((s) => Math.abs(s - px) < 0.5)) out.push({ line: d.line, message: `font-size ${d.value} is not a token size` });
    }
  }
  return out;
}

export const DRIFT_CHECKS = { designSystemFont, designSystemColor, designSystemRadius, designSystemFontSize };
