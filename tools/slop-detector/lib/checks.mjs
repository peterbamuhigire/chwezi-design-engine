// Static-tier check functions, keyed by the registry's `check.name`.
// Each check: (doc, params, ctx) -> [{ line, message }]. Rule ideas and several
// numeric thresholds are adapted in paraphrase from Impeccable (Apache-2.0,
// https://github.com/pbakaus/impeccable, commit 114ea1d); no source was copied.
// Chwezi thresholds (leading 1.5-1.9, heading tracking 0.04em, type ratio 1.25)
// come from governance/design-quality-gate.md and website slop-rules §11.
import fs from 'node:fs';
import path from 'node:path';
import {
  toPx, toEm, toMs, splitTopLevel, splitSpaces, isHeadingSelector, isBodySelector, isGroundSelector,
  isChromeSelector, isHeroSelector, isStateSelector, selectorParts, STATUS_TOKEN_RE,
} from './util.mjs';
import { coloursIn, parseColour, toHsl, chroma, toLab } from './colour.mjs';
import { declValue } from './parse-css.mjs';
import { nextElementSibling, ancestors, descendants, deepText, attrText } from './parse-html.mjs';
import { splitClass, has, find, hasVariant, textSizePx, CHROMATIC_FAMILIES, NEUTRAL_FAMILIES } from './tailwind.mjs';
import { matcher } from './document.mjs';

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const BODY_TAGS = new Set(['p', 'li', 'article', 'blockquote', 'dd', 'main', 'body']);

function* decls(doc, props) {
  const set = props ? new Set([].concat(props)) : null;
  for (const b of doc.blocks) {
    for (const d of b.decls) if (!set || set.has(d.prop)) yield { b, d };
  }
}

function blockFontPx(b) {
  const fs = declValue(b, 'font-size');
  return fs ? toPx(fs) : null;
}

function isUppercaseBlock(b) {
  return /uppercase|small-caps/i.test(declValue(b, 'text-transform') || '') || /small-caps|all-small-caps/i.test(declValue(b, 'font-variant') || '') || /small-caps|all-small-caps/i.test(declValue(b, 'font-variant-caps') || '');
}

function elClassText(el) {
  return `${el.classes.join(' ')} ${el.attrs.id || ''} ${Object.keys(el.attrs).filter((k) => k.startsWith('data-')).map((k) => `${k} ${el.attrs[k]}`).join(' ')}`;
}

function isHeroEl(el) {
  return [el, ...ancestors(el)].some((a) => /hero|landing|masthead|splash|jumbotron/i.test(`${a.classes.join(' ')} ${a.attrs.id || ''}`));
}

// ---------------------------------------------------------------- typography

function bannedPrimaryFont(doc, params, ctx) {
  const out = [];
  for (const s of doc.fontStacks) {
    const hit = matcher.classifyStack(s.families, ctx.fontLists, { selector: s.selector, prop: s.prop });
    if (hit && hit.rule === params.matcher_rule) {
      const what = hit.kind === 'system' ? 'bare system stack with no deliberate face' : `${hit.family} [${hit.reason}]`;
      out.push({ line: s.line, message: `${s.prop}: primary family is ${what}` });
    }
  }
  if (params.matcher_rule === 'banned-primary-font') {
    for (const u of doc.pyUnits) {
      for (const h of matcher.findBannedQuotedLiterals(u.content, ctx.fontLists)) {
        out.push({ line: doc.lineAt(u.base + h.index), message: `document-generator font assignment ${h.context}` });
      }
    }
  }
  return out;
}

function flatTypeHierarchy(doc, params) {
  const out = [];
  const min = params.min_ratio ?? 1.25;
  const sizes = {};
  for (const { b, d } of decls(doc, 'font-size')) {
    const px = toPx(d.value);
    if (px === null) continue;
    for (const p of selectorParts(b.selector)) {
      const m = /^(?:\.)?h([1-6])$/.exec(p);
      if (m && !(m[1] in sizes) && !b.atRules.some((a) => /@media/i.test(a))) sizes[m[1]] = { px, line: d.line };
    }
  }
  const check = (map, label) => {
    const levels = Object.keys(map).map(Number).sort((a, c) => a - c);
    if (levels.length < 2) return;
    const ratios = [];
    for (let i = 0; i < levels.length - 1; i++) ratios.push(map[levels[i]].px / map[levels[i + 1]].px);
    if (ratios.every((r) => r < min - 0.005)) {
      out.push({ line: map[levels[0]].line, message: `${label}: every step between declared heading sizes is below ${min} (${ratios.map((r) => r.toFixed(2)).join(', ')})` });
    }
  };
  check(sizes, 'CSS heading scale');
  for (const { root } of doc.htmlRoots) {
    const map = {};
    const walk = (e) => {
      for (const c of e.children) {
        if (HEADING_TAGS.has(c.tag)) {
          const lvl = Number(c.tag[1]);
          const px = textSizePx(c.classes);
          if (px && !(lvl in map)) map[lvl] = { px, line: c.line };
        }
        walk(c);
      }
    };
    walk(root);
    check(map, 'Tailwind heading scale');
  }
  return out;
}

function leading(doc, params) {
  const out = [];
  const { min, max } = params;
  for (const { b, d } of decls(doc, 'line-height')) {
    if (!isBodySelector(b.selector)) continue;
    // Inverse line-height rule: lead and display-size text (>= 19px) may run tighter than body text.
    if (min !== undefined && (blockFontPx(b) ?? 0) >= 19) continue;
    let ratio = null;
    const v = d.value.trim();
    if (/^\d*\.?\d+$/.test(v)) ratio = parseFloat(v);
    else if (/%$/.test(v)) ratio = parseFloat(v) / 100;
    else if (/em$/.test(v) && !/rem$/.test(v)) ratio = parseFloat(v);
    else {
      const px = toPx(v); const f = blockFontPx(b);
      if (px !== null && f) ratio = px / f;
    }
    if (ratio === null || ratio === 0) continue;
    if (min !== undefined && ratio < min) out.push({ line: d.line, message: `body line-height ${v} (${ratio.toFixed(2)}) is below ${min}` });
    if (max !== undefined && ratio > max) out.push({ line: d.line, message: `body line-height ${v} (${ratio.toFixed(2)}) is above ${max}` });
  }
  const TW = { none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2 };
  for (const cl of doc.classLists) {
    if (!BODY_TAGS.has(cl.el.tag)) continue;
    if (min !== undefined && (textSizePx(cl.classes) ?? 0) >= 19) continue; // display-size figures and leads
    for (const c of cl.classes) {
      const { base } = splitClass(c);
      const m = /^leading-(none|tight|snug|normal|relaxed|loose|\[(\d*\.?\d+)\])$/.exec(base);
      if (!m) continue;
      const ratio = m[2] ? parseFloat(m[2]) : TW[m[1]];
      if (min !== undefined && ratio < min) out.push({ line: cl.line, message: `${c} (${ratio}) on <${cl.el.tag}> is below ${min}` });
      if (max !== undefined && ratio > max) out.push({ line: cl.line, message: `${c} (${ratio}) on <${cl.el.tag}> is above ${max}` });
    }
  }
  return out;
}

const TRACKING_EM = { tighter: -0.05, tight: -0.025, normal: 0, wide: 0.025, wider: 0.05, widest: 0.1 };

function tracking(doc, params) {
  const out = [];
  const scope = params.scope; // heading | body | any
  const inScopeSel = (sel) => (scope === 'heading' ? isHeadingSelector(sel) : scope === 'body' ? isBodySelector(sel) : true);
  const inScopeTag = (tag) => (scope === 'heading' ? HEADING_TAGS.has(tag) : scope === 'body' ? BODY_TAGS.has(tag) : true);
  const test = (em) => (params.max !== undefined ? em > params.max + 1e-9 : em < params.min - 1e-9);
  for (const { b, d } of decls(doc, 'letter-spacing')) {
    if (!inScopeSel(b.selector)) continue;
    if (params.max !== undefined && isUppercaseBlock(b)) continue;
    const em = toEm(d.value, blockFontPx(b));
    if (em === null) continue;
    if (test(em)) out.push({ line: d.line, message: `letter-spacing ${d.value} on ${scope} selector ${b.selector.slice(0, 60)}` });
  }
  for (const cl of doc.classLists) {
    if (!inScopeTag(cl.el.tag)) continue;
    if (params.max !== undefined && has(cl.classes, /^(uppercase|small-caps)$/)) continue;
    // Text typed in capitals needs added tracking just as text-transform: uppercase does.
    const caps = deepText(cl.el).replace(/[^A-Za-z]/g, '');
    if (params.max !== undefined && caps.length >= 4 && caps === caps.toUpperCase()) continue;
    for (const c of cl.classes) {
      const { base } = splitClass(c);
      const m = /^tracking-(tighter|tight|normal|wide|wider|widest|\[(-?\d*\.?\d+)em\])$/.exec(base);
      if (!m) continue;
      const em = m[2] !== undefined ? parseFloat(m[2]) : TRACKING_EM[m[1]];
      if (test(em)) out.push({ line: cl.line, message: `${c} on <${cl.el.tag}>` });
    }
  }
  return out;
}

function justifiedText(doc) {
  const out = [];
  for (const { d } of decls(doc, 'text-align')) if (/justify/i.test(d.value)) out.push({ line: d.line, message: 'text-align: justify (WCAG 1.4.8 advises against justified text)' });
  for (const cl of doc.classLists) if (has(cl.classes, /^text-justify$/)) out.push({ line: cl.line, message: 'text-justify class' });
  return out;
}

function tinyText(doc, params) {
  const out = [];
  const min = params.min_px ?? 12;
  for (const { b, d } of decls(doc, 'font-size')) {
    if (/\b(sup|sub)\b/i.test(b.selector)) continue;
    const px = toPx(d.value);
    // Sizes of 2px or less are hiding techniques (email preheaders, whitespace hacks), not text meant to be read.
    if (px !== null && px > 2 && px < min) out.push({ line: d.line, message: `font-size ${d.value} (${px.toFixed(1)}px) is below ${min}px` });
  }
  for (const cl of doc.classLists) {
    for (const c of cl.classes) {
      const m = /^text-\[(\d*\.?\d+)(px|rem)\]$/.exec(splitClass(c).base);
      if (!m) continue;
      const px = m[2] === 'rem' ? parseFloat(m[1]) * 16 : parseFloat(m[1]);
      if (px > 2 && px < min) out.push({ line: cl.line, message: `${c} (${px}px) is below ${min}px` });
    }
  }
  return out;
}

function allCapsBody(doc, params) {
  const out = [];
  for (const { b, d } of decls(doc, 'text-transform')) {
    if (b.inline && b.el && deepText(b.el).length < (params.min_chars ?? 60)) continue; // short label, not running text
    if (/uppercase/i.test(d.value) && isBodySelector(b.selector)) out.push({ line: d.line, message: `text-transform: uppercase on body selector ${b.selector.slice(0, 60)}` });
  }
  for (const cl of doc.classLists) {
    if (BODY_TAGS.has(cl.el.tag) && has(cl.classes, /^uppercase$/) && deepText(cl.el).length > (params.min_chars ?? 60)) out.push({ line: cl.line, message: `uppercase on long <${cl.el.tag}> text` });
  }
  return out;
}

function lineLength(doc, params) {
  const out = [];
  const [lo, hi] = [params.min_ch ?? 45, params.max_ch ?? 80];
  for (const { b, d } of decls(doc, ['max-width', 'width', 'max-inline-size', 'inline-size'])) {
    if (!isBodySelector(b.selector)) continue;
    const m = /^(\d*\.?\d+)ch$/.exec(d.value.trim());
    if (m && (parseFloat(m[1]) < lo || parseFloat(m[1]) > hi)) out.push({ line: d.line, message: `${d.prop}: ${d.value} measure outside ${lo}-${hi}ch` });
  }
  for (const cl of doc.classLists) {
    for (const c of cl.classes) {
      const m = /^max-w-\[(\d*\.?\d+)ch\]$/.exec(splitClass(c).base);
      if (m && (parseFloat(m[1]) < lo || parseFloat(m[1]) > hi)) out.push({ line: cl.line, message: `${c} measure outside ${lo}-${hi}ch` });
    }
  }
  return out;
}

function skippedHeading(doc) {
  const out = [];
  for (const { root } of doc.htmlRoots) {
    let prev = null;
    const walk = (e) => {
      for (const c of e.children) {
        if (HEADING_TAGS.has(c.tag)) {
          const lvl = Number(c.tag[1]);
          if (prev !== null && lvl > prev + 1) out.push({ line: c.line, message: `<${c.tag}> follows <h${prev}>: heading level skipped (WCAG 1.3.1)` });
          prev = lvl;
        }
        walk(c);
      }
    };
    walk(root);
  }
  return out;
}

function italicSerifDisplay(doc) {
  const out = [];
  for (const b of doc.blocks) {
    if (!isHeadingSelector(b.selector)) continue;
    const style = declValue(b, 'font-style');
    const fam = declValue(b, 'font-family') || '';
    if (style && /italic/i.test(style) && /(^|,)\s*serif\s*$/i.test(fam)) out.push({ line: b.line, message: `italic serif display on ${b.selector.slice(0, 60)}` });
  }
  for (const cl of doc.classLists) {
    if (['h1', 'h2'].includes(cl.el.tag) && has(cl.classes, /^italic$/) && has(cl.classes, /^font-serif$/)) out.push({ line: cl.line, message: `italic font-serif on <${cl.el.tag}>` });
  }
  return out;
}

// ---------------------------------------------------------- colour and surface

function gradientText(doc) {
  const out = [];
  for (const b of doc.blocks) {
    const clip = b.decls.find((d) => /^(-webkit-)?background-clip$/.test(d.prop) && /text/i.test(d.value));
    const bg = b.decls.find((d) => /^background(-image)?$/.test(d.prop) && /gradient\(/i.test(d.value));
    if (clip && bg) out.push({ line: clip.line, message: 'background-clip: text over a gradient (gradient text)' });
  }
  for (const cl of doc.classLists) {
    if (has(cl.classes, /^bg-clip-text$/) && has(cl.classes, /^(bg-gradient-to-|bg-linear-|bg-radial|bg-conic|from-|via-|to-)/)) out.push({ line: cl.line, message: 'bg-clip-text with a gradient' });
  }
  return out;
}

function hueBand(c) {
  const { h, s, l } = toHsl(c);
  if (s < 30 || l < 15 || l > 85 || chroma(c) < 20) return null;
  if (h >= 235 && h < 300) return 'purple';
  if (h >= 180 && h < 235) return 'blue';
  if (h >= 300 && h < 345) return 'pink';
  return null;
}

function purpleBlueGradient(doc) {
  const out = [];
  for (const { d } of decls(doc)) {
    if (!/gradient\(/i.test(d.value)) continue;
    const stops = coloursIn(d.value).map((x) => x.colour).filter((c) => c.a > 0.2);
    const bands = stops.map(hueBand);
    const purple = stops.filter((c, i) => bands[i] === 'purple');
    const others = stops.filter((c, i) => bands[i] && Math.abs(toHsl(c).h - toHsl(purple[0] || c).h) >= 15);
    if (purple.length && others.length) out.push({ line: d.line, message: 'purple/violet gradient paired with blue, cyan or pink stops' });
  }
  const PURPLE = /^(violet|purple|indigo)$/;
  const PARTNER = /^(blue|sky|cyan|pink|fuchsia|violet|purple|indigo)$/;
  for (const cl of doc.classLists) {
    const fams = new Set();
    for (const c of cl.classes) {
      const m = /^(from|via|to)-([a-z]+)-\d{2,3}(\/\d+)?$/.exec(splitClass(c).base);
      if (m) fams.add(m[2]);
    }
    const list = [...fams];
    if (list.some((f) => PURPLE.test(f)) && list.filter((f) => PARTNER.test(f)).length >= 2) out.push({ line: cl.line, message: `gradient stops ${list.join(' -> ')}` });
  }
  return out;
}

function parseShadow(value) {
  return splitTopLevel(value).map((layer) => {
    const tokens = splitSpaces(layer);
    const inset = tokens.includes('inset');
    const lengths = tokens.filter((t) => toPx(t) !== null).map((t) => toPx(t));
    const colourTok = tokens.find((t) => parseColour(t));
    return { inset, x: lengths[0] ?? null, y: lengths[1] ?? null, blur: lengths[2] ?? 0, spread: lengths[3] ?? 0, colour: colourTok ? parseColour(colourTok) : null };
  });
}

function neonGlow(doc, params) {
  const out = [];
  const minBlur = params.min_blur_px ?? 8;
  for (const { d } of decls(doc, ['box-shadow', 'text-shadow', 'filter'])) {
    let layers = [];
    if (d.prop === 'filter') {
      const re = /drop-shadow\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g;
      let m;
      while ((m = re.exec(d.value))) layers.push(...parseShadow(m[1]));
    } else layers = parseShadow(d.value);
    for (const s of layers) {
      if (s.inset || s.x !== 0 || s.y !== 0 || s.blur < minBlur || !s.colour || s.colour.a < 0.2) continue;
      if (chroma(s.colour) >= 30) { out.push({ line: d.line, message: `${d.prop}: zero-offset chromatic glow (blur ${s.blur}px)` }); break; }
    }
  }
  for (const cl of doc.classLists) {
    for (const c of cl.classes) {
      const m = /^(shadow|drop-shadow)-\[0_0_(\d+)px_([^\]]+)\]$/.exec(splitClass(c).base);
      if (m && Number(m[2]) >= minBlur) {
        const col = parseColour(m[3].replace(/_/g, ' '));
        if (!col || chroma(col) >= 30) out.push({ line: cl.line, message: `${c}: zero-offset glow` });
      }
    }
  }
  return out;
}

function glassmorphism(doc) {
  const out = [];
  for (const b of doc.blocks) {
    const bf = b.decls.find((d) => /^(-webkit-)?backdrop-filter$/.test(d.prop) && /blur\(\s*[1-9]/.test(d.value));
    if (!bf || isChromeSelector(b.selector)) continue;
    const bg = b.decls.find((d) => /^background(-color)?$/.test(d.prop));
    const translucent = bg && (/transparent|color-mix/i.test(bg.value) || coloursIn(bg.value).some((x) => x.colour.a < 0.9));
    if (translucent) out.push({ line: bf.line, message: `backdrop blur over a translucent background on ${b.selector.slice(0, 60)}` });
  }
  for (const cl of doc.classLists) {
    if (['nav', 'header'].includes(cl.el.tag) || /nav|header|toolbar|overlay|backdrop|scrim/i.test(cl.classes.join(' '))) continue;
    if (has(cl.classes, /^backdrop-blur/) && has(cl.classes, /^bg-(.+)\/(\d+)$|^bg-transparent$|^bg-opacity-/)) out.push({ line: cl.line, message: 'backdrop-blur on a translucent background' });
  }
  return out;
}

function isBeige(c) {
  const { h, s, l } = toHsl(c);
  return h >= 25 && h <= 60 && s >= 25 && l >= 88 && l <= 97;
}

function aiBeigeGround(doc) {
  const out = [];
  for (const { b, d } of decls(doc)) {
    const groundProp = /^background(-color)?$/.test(d.prop) && isGroundSelector(b.selector);
    const groundToken = /^--(color-)?(bg|background|surface|canvas|paper|ground|base|page)(-[\w-]+)?$/.test(d.prop) && /:root|html|body/.test(b.selector);
    if (!groundProp && !groundToken) continue;
    if (coloursIn(d.value).some((x) => x.colour.a > 0.9 && isBeige(x.colour))) out.push({ line: d.line, message: `cream/beige page ground ${d.value}` });
  }
  for (const cl of doc.classLists) {
    if (!['body', 'html', 'main'].includes(cl.el.tag)) continue;
    for (const c of cl.classes) {
      const base = splitClass(c).base;
      const arb = /^bg-\[(#[0-9a-fA-F]{3,8})\]$/.exec(base);
      if (/^bg-(amber|orange|yellow)-50$/.test(base) || (arb && isBeige(parseColour(arb[1])))) out.push({ line: cl.line, message: `${c} page ground` });
    }
  }
  return out;
}

function radialHalo(doc) {
  const out = [];
  for (const { d } of decls(doc, ['background', 'background-image'])) {
    const re = /radial-gradient\(([^()]*(?:\([^()]*\)[^()]*)*)\)/gi;
    let m;
    while ((m = re.exec(d.value))) {
      const cols = coloursIn(m[1]);
      if (cols.some((x) => x.colour.a > 0.05 && chroma(x.colour) >= 25) && cols.some((x) => x.colour.a === 0 || x.token.toLowerCase() === 'transparent')) {
        out.push({ line: d.line, message: 'radial chromatic halo fading to transparent' });
        break;
      }
    }
  }
  return out;
}

function isPureBlack(value) {
  return coloursIn(value).some((x) => x.colour.a > 0.99 && x.colour.r === 0 && x.colour.g === 0 && x.colour.b === 0);
}

function pureBlackBodyText(doc) {
  const out = [];
  for (const { b, d } of decls(doc)) {
    const textProp = d.prop === 'color' && isBodySelector(b.selector);
    const token = /^--(color-)?(text|foreground|fg|body|ink)(-[\w-]+)?$/.test(d.prop) && /:root|html|body/.test(b.selector);
    if ((textProp || token) && isPureBlack(d.value)) out.push({ line: d.line, message: `pure black body text ${d.value}` });
  }
  for (const cl of doc.classLists) {
    if (['body', 'main', 'p', 'article'].includes(cl.el.tag) && has(cl.classes, /^text-black$/)) out.push({ line: cl.line, message: `text-black on <${cl.el.tag}>` });
  }
  return out;
}

function grayOnColor(doc) {
  const out = [];
  for (const b of doc.blocks) {
    const col = b.decls.find((d) => d.prop === 'color');
    const bg = b.decls.find((d) => /^background(-color)?$/.test(d.prop));
    if (!col || !bg || /gradient\(/.test(bg.value)) continue;
    const fg = coloursIn(col.value)[0]?.colour;
    const ground = coloursIn(bg.value)[0]?.colour;
    if (!fg || !ground || ground.a < 0.9) continue;
    const Lf = toLab(fg).L; const Lg = toLab(ground).L;
    if (chroma(fg) < 8 && Lf > 30 && Lf < 75 && chroma(ground) >= 35 && Lg > 25 && Lg < 75) out.push({ line: col.line, message: `grey text ${col.value} on chromatic ground ${bg.value}` });
  }
  const NEU = new RegExp(`^text-(${NEUTRAL_FAMILIES.join('|')})-(300|400|500|600)$`);
  const CHR = new RegExp(`^bg-(${CHROMATIC_FAMILIES.join('|')})-(400|500|600|700|800)$`);
  for (const cl of doc.classLists) {
    const plain = cl.classes.filter((c) => splitClass(c).variants.length === 0);
    if (has(plain, NEU) && has(plain, CHR)) out.push({ line: cl.line, message: `${find(plain, NEU)[0]} on ${find(plain, CHR)[0]}` });
  }
  return out;
}

function stripesOrGrid(doc) {
  const out = [];
  for (const b of doc.blocks) {
    if (/debug|baseline|grid-overlay|overlay-grid/i.test(b.selector)) continue; // functional layout overlays
    for (const d of b.decls) {
      if (!/^background(-image)?$/.test(d.prop)) continue;
      if (/repeating-(linear|radial|conic)-gradient\(/i.test(d.value)) out.push({ line: d.line, message: 'repeating gradient stripes' });
      else if ((d.value.match(/linear-gradient\(/gi) || []).length >= 2 && /\b1px\b/.test(d.value) && declValue(b, 'background-size')) out.push({ line: d.line, message: 'hairline grid background' });
    }
  }
  for (const cl of doc.classLists) if (has(cl.classes, /^bg-grid(-|$)|^bg-dot(s)?(-|$)|^bg-\[repeating-/)) out.push({ line: cl.line, message: 'grid, dot or stripe background utility' });
  return out;
}

// ------------------------------------------------------------ layout scaffolds

function sideWidthPx(value) {
  for (const t of splitSpaces(value)) {
    if (t === 'thin') return 1;
    if (t === 'medium') return 3;
    if (t === 'thick') return 5;
    const px = toPx(t);
    if (px !== null) return px;
  }
  return null;
}

function decorativeSideStripe(doc, params) {
  const out = [];
  const minPx = params.min_px ?? 2;
  const SIDE = /^border-(left|right|inline-start|inline-end)(-width)?$/;
  for (const b of doc.blocks) {
    if (/blockquote|pull-?quote|\bquote\b/i.test(b.selector) || isStateSelector(b.selector)) continue;
    for (const d of b.decls) {
      if (!SIDE.test(d.prop)) continue;
      if (/\b(none|hidden)\b|transparent/i.test(d.value)) continue;
      // The ruling covers COLOURED stripes: a neutral grey rule (tree guide, divider) is out of scope.
      const cols = coloursIn(d.value);
      if (cols.length && cols.every((x) => chroma(x.colour) < 8)) continue;
      const px = sideWidthPx(d.value);
      if (px !== null && px >= minPx) {
        if (b.inline && b.el && statusExempt(b.el)) continue;
        out.push({ line: d.line, message: `${d.prop}: ${d.value} side stripe on ${b.selector.slice(0, 60)}` });
      }
    }
  }
  for (const cl of doc.classLists) {
    if (cl.el.tag === 'blockquote') continue;
    const hits = cl.classes.filter((c) => {
      const { variants, base } = splitClass(c);
      if (variants.some((v) => /hover|focus|active|aria-|data-\[state|selected|current/.test(v))) return false;
      const m = /^border-(l|r|s|e)-(\d+|\[(\d+)px\])$/.exec(base);
      return m && Number(m[3] ?? m[2]) >= minPx;
    });
    const borderColours = cl.classes.map((c) => splitClass(c).base).filter((b) => /^border-(?!l-|r-|s-|e-|t-|b-|x-|y-|\d|\[)[a-z]/.test(b));
    const neutral = borderColours.length > 0 && borderColours.every((b) => new RegExp(`^border-(${NEUTRAL_FAMILIES.join('|')})-\\d+|^border-(black|white)$`).test(b));
    if (hits.length && !neutral && !statusExempt(cl.el)) out.push({ line: cl.line, message: `${hits.join(' ')} side stripe on <${cl.el.tag}>` });
  }
  return out;
}

/** Status encoding exemption: status token on the element AND a text marker in it or beside it. */
function statusExempt(el) {
  const tokens = `${el.classes.join(' ')} ${Object.entries(el.attrs).filter(([k]) => k.startsWith('data-') || k === 'role').map(([k, v]) => `${k} ${v}`).join(' ')}`;
  if (!STATUS_TOKEN_RE.test(` ${tokens} `) && !('data-status' in el.attrs)) return false;
  const next = nextElementSibling(el);
  return deepText(el).length > 0 || (next && deepText(next).length > 0);
}

const CARD_CLASS = /^(card|panel|tile)(--[a-z0-9-]+)?$|[a-z0-9][-_](card|panel|tile)(--[a-z0-9-]+)?$/; // card parts (card-header, card__body) are not cards

function isCard(el) {
  if (['i', 'svg', 'img', 'span', 'use', 'path', 'a', 'button', 'input', 'label'].includes(el.tag)) return false;
  if (el.classes.some((c) => /^(bi|fa|fas|far|fab|mdi|ti|icon|ph)(-|$)/.test(c))) return false;
  if (el.classes.some((c) => CARD_CLASS.test(splitClass(c).base))) return true;
  const plain = el.classes.filter((c) => splitClass(c).variants.length === 0);
  return has(plain, /^rounded(-(sm|md|lg|xl|2xl|3xl))?$/) && has(plain, /^(shadow(-(sm|md|lg|xl|2xl))?|border)$/) && has(plain, /^bg-/);
}

function nestedCards(doc) {
  const out = [];
  for (const el of doc.elements) {
    if (!isCard(el)) continue;
    if (ancestors(el).some(isCard)) out.push({ line: el.line, message: `card <${el.tag} class="${el.classes.join(' ').slice(0, 60)}"> nested inside another card` });
  }
  return out;
}

function isChipLike(el) {
  const plain = el.classes.map((c) => splitClass(c).base);
  if (plain.some((c) => /(^|-)(badge|chip|pill|tag)(-|$)/.test(c))) return true;
  return plain.includes('rounded-full') && plain.some((c) => /^(px|py|p)-/.test(c)) && plain.some((c) => /^text-(xs|sm)$/.test(c));
}

function heroEyebrowChip(doc) {
  const out = [];
  for (const el of doc.elements) {
    const next = nextElementSibling(el);
    if (!next || next.tag !== 'h1') continue;
    const chip = isChipLike(el) || (el.children.length === 1 && isChipLike(el.children[0]));
    if (chip) out.push({ line: el.line, message: 'badge/chip immediately above the h1' });
  }
  return out;
}

function kickerAboveHeading(doc) {
  const out = [];
  for (const el of doc.elements) {
    if (!['p', 'span', 'div', 'small', 'strong', 'em'].includes(el.tag)) continue;
    const next = nextElementSibling(el);
    if (!next || !['h1', 'h2'].includes(next.tag) || isChipLike(el)) continue;
    const plain = el.classes.map((c) => splitClass(c).base);
    const named = plain.some((c) => /(^|-)(kicker|eyebrow|overline|pretitle|pre-title|preheading|supertitle)(-|$)/.test(c));
    const styled = plain.includes('uppercase') && plain.some((c) => /^tracking-(wide|wider|widest|\[)/.test(c));
    const text = deepText(el);
    if ((named || styled) && text.length > 0 && text.length <= 48) out.push({ line: el.line, message: `kicker "${text.slice(0, 40)}" above <${next.tag}>` });
  }
  return out;
}

const NUMBER_LABEL = /^(\/\s*)?(0\d|§\s*\d{1,2}|no\.\s*\d{1,2})(\s*[.\/:—–-])?$/i;

function numberedSectionLabels(doc, params) {
  const hits = [];
  for (const el of doc.elements) {
    const next = nextElementSibling(el);
    const t = deepText(el);
    if (next && ['h2', 'h3'].includes(next.tag) && NUMBER_LABEL.test(t)) hits.push({ line: el.line, message: `section number "${t}" above <${next.tag}>` });
    if (['h2', 'h3'].includes(el.tag)) {
      const first = el.children[0];
      if (first && NUMBER_LABEL.test(deepText(first))) hits.push({ line: el.line, message: `section number "${deepText(first)}" inside <${el.tag}>` });
      else if (/^0\d[\s.:—–\/-]/.test(t)) hits.push({ line: el.line, message: `heading starts with section number "${t.slice(0, 4)}"` });
    }
  }
  return hits.length >= (params.min_count ?? 2) ? hits : [];
}

function hasIcon(el) {
  return descendants(el).some((d) => d.tag === 'svg' || d.tag === 'i' || d.tag === 'img' || d.classes.some((c) => /icon/i.test(c)) || d.component && /icon/i.test(d.tag));
}

function identicalThreeColumnGrid(doc) {
  const out = [];
  for (const el of doc.elements) {
    const kids = el.children;
    if (![3, 6, 9].includes(kids.length)) continue;
    const sig = (k) => `${k.tag}|${k.classes.join(' ')}`;
    if (!kids.every((k) => sig(k) === sig(kids[0]))) continue;
    const gridCols3 = has(el.classes, /^grid-cols-3$/) || /cols-3|three|features?-grid/.test(el.classes.join(' '));
    if (kids.length !== 3 && !gridCols3) continue;
    const featureLike = kids.every((k) => hasIcon(k) && descendants(k).some((d) => /^h[2-6]$/.test(d.tag) || d.tag === 'strong') && descendants(k).some((d) => d.tag === 'p'));
    if (featureLike) out.push({ line: el.line, message: `${kids.length} identical icon + heading + text feature columns` });
  }
  return out;
}

function thinBorderWideShadow(doc, params) {
  const out = [];
  const minBlur = params.min_blur_px ?? 24;
  for (const b of doc.blocks) {
    const border = b.decls.find((d) => (d.prop === 'border' || d.prop === 'border-width') && sideWidthPx(d.value) === 1);
    const shadow = b.decls.find((d) => d.prop === 'box-shadow');
    if (!border || !shadow) continue;
    if (parseShadow(shadow.value).some((s) => !s.inset && s.blur >= minBlur)) out.push({ line: shadow.line, message: `1px border with a ${minBlur}px+ soft shadow` });
  }
  for (const cl of doc.classLists) {
    const plain = cl.classes.filter((c) => splitClass(c).variants.length === 0);
    if (has(plain, /^border$/) && has(plain, /^shadow-(xl|2xl)$/)) out.push({ line: cl.line, message: 'border with shadow-xl/2xl' });
  }
  return out;
}

// ----------------------------------------------------------------------- motion

function bounceEasing(doc) {
  const out = [];
  const EASE_PROPS = ['transition', 'transition-timing-function', 'animation', 'animation-timing-function', 'animation-name'];
  for (const { d } of decls(doc)) {
    const isEase = EASE_PROPS.includes(d.prop) || /^--(ease|easing|motion|transition)/.test(d.prop);
    if (!isEase) continue;
    const re = /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/gi;
    let m;
    let hit = false;
    while ((m = re.exec(d.value))) {
      const y1 = parseFloat(m[2]); const y2 = parseFloat(m[4]);
      if (y1 < 0 || y1 > 1 || y2 < 0 || y2 > 1) { hit = true; out.push({ line: d.line, message: `overshooting ${m[0]}` }); }
    }
    if (!hit && /^(animation|animation-name)$/.test(d.prop) && /\b(bounce|elastic|wobble|jello|rubber-?band|boing)\w*/i.test(d.value)) out.push({ line: d.line, message: `bounce/elastic animation ${d.value}` });
    else if (!hit && /\bease-(in|out|in-out)-back\b/i.test(d.value)) out.push({ line: d.line, message: 'back-overshoot easing keyword' });
  }
  for (const cl of doc.classLists) {
    if (has(cl.classes, /^animate-(bounce|elastic|wobble|jello)/)) out.push({ line: cl.line, message: find(cl.classes, /^animate-(bounce|elastic|wobble|jello)/).join(' ') });
    for (const c of cl.classes) {
      const m = /^ease-\[cubic-bezier\(([-\d.]+),([-\d.]+),([-\d.]+),([-\d.]+)\)\]$/.exec(splitClass(c).base);
      if (m && [m[2], m[4]].some((y) => parseFloat(y) < 0 || parseFloat(y) > 1)) out.push({ line: cl.line, message: `${c} overshoots` });
    }
  }
  for (const s of doc.scripts) {
    const re = /\bease\s*:\s*["'`](back|bounce|elastic)[\w.()]*["'`]/gi;
    let m;
    while ((m = re.exec(s.content))) out.push({ line: doc.lineAt(s.base + m.index), message: `JS animation ease "${m[0]}"` });
  }
  return out;
}

const STATUS_CONTEXT = /status|live|online|offline|recording|busy|presence|connected|indicator|notification|unread/i;

function pulsingDot(doc) {
  const out = [];
  for (const cl of doc.classLists) {
    const plain = cl.classes.map((c) => splitClass(c).base);
    if (!plain.some((c) => /^animate-(ping|pulse)$/.test(c)) || !plain.includes('rounded-full')) continue;
    const small = plain.some((c) => /^(h|w|size)-(1|1\.5|2|2\.5|3)$/.test(c) || /^(h|w|size)-\[(\d+)px\]$/.test(c) && Number(/\[(\d+)px\]/.exec(c)[1]) <= 12);
    if (!small) continue;
    const ctxText = [cl.el, ...ancestors(cl.el).slice(0, 3)].map((e) => `${elClassText(e)} ${e.attrs['aria-label'] || ''} ${e.attrs.role || ''}`).join(' ');
    if (STATUS_CONTEXT.test(ctxText)) continue;
    out.push({ line: cl.line, message: 'decorative pulsing dot with no status context' });
  }
  for (const b of doc.blocks) {
    const anim = declValue(b, 'animation') || declValue(b, 'animation-name') || '';
    const radius = declValue(b, 'border-radius') || '';
    if (/\b(pulse|ping|beacon)\w*/i.test(anim) && /50%|9999px|999px|100%/.test(radius) && /dot|pulse|ping|beacon/i.test(b.selector) && !STATUS_CONTEXT.test(b.selector)) {
      out.push({ line: b.line, message: `pulsing dot ${b.selector.slice(0, 60)}` });
    }
  }
  return out;
}

function blinkingCursor(doc) {
  const out = [];
  for (const b of doc.blocks) {
    const anim = declValue(b, 'animation') || declValue(b, 'animation-name') || '';
    if (!/\b(blink|caret|cursor)\w*/i.test(anim)) continue;
    if (!isHeroSelector(b.selector)) continue;
    out.push({ line: b.line, message: `blinking cursor in hero/landing context ${b.selector.slice(0, 60)}` });
  }
  for (const cl of doc.classLists) {
    const plain = cl.classes.map((c) => splitClass(c).base);
    if (plain.some((c) => /^animate-(blink|caret|cursor)/.test(c) || /typewriter/.test(c)) && isHeroEl(cl.el)) out.push({ line: cl.line, message: 'blinking cursor / typewriter in hero' });
  }
  return out;
}

function marquee(doc) {
  const out = [];
  for (const el of doc.elements) if (el.tag === 'marquee') out.push({ line: el.line, message: '<marquee> element' });
  const kfNames = new Set(doc.keyframes.filter((k) => /translateX\(\s*-?(50|100)%|translate3d\(\s*-?(50|100)%/.test(k.body)).map((k) => k.name));
  for (const b of doc.blocks) {
    const anim = declValue(b, 'animation') || '';
    const name = declValue(b, 'animation-name') || '';
    const infinite = /infinite/.test(anim) || /infinite/.test(declValue(b, 'animation-iteration-count') || '');
    if (!infinite) continue;
    const usesScroll = [...kfNames].some((k) => new RegExp(`\\b${k.replace(/[-]/g, '\\-')}\\b`).test(`${anim} ${name}`));
    if (usesScroll || /marquee|ticker|logo-?(scroll|strip|carousel|wall)|infinite-scroll/i.test(b.selector)) out.push({ line: b.line, message: `infinite scrolling strip ${b.selector.slice(0, 60)}` });
  }
  for (const cl of doc.classLists) if (has(cl.classes, /^animate-(marquee|scroll|infinite-scroll|ticker)/)) out.push({ line: cl.line, message: find(cl.classes, /^animate-(marquee|scroll|infinite-scroll|ticker)/).join(' ') });
  return out;
}

function missingReducedMotion(doc, params) {
  const threshold = params.min_ms ?? 200;
  const all = `${doc.text}\n${doc.linkedCssText}`;
  if (/prefers-reduced-motion/i.test(all)) return [];
  let first = null;
  const NON_MOTION = /^(color|background-color|background|border-color|opacity|box-shadow|fill|stroke|outline-color|text-decoration-color|filter|visibility)$/;
  for (const { b, d } of decls(doc, ['transition', 'transition-duration', 'animation', 'animation-duration'])) {
    // Colour and opacity transitions are not motion (WCAG 2.3.3 concerns movement).
    const tprop = d.prop === 'transition' ? splitTopLevel(d.value).map((l) => splitSpaces(l)[0]) : d.prop === 'transition-duration' ? splitTopLevel(declValue(b, 'transition-property') || 'all') : null;
    if (tprop && tprop.every((p) => NON_MOTION.test(p))) continue;
    const ms = splitSpaces(d.value.replace(/,/g, ' ')).map(toMs).filter((x) => x !== null);
    const dur = d.prop === 'animation' && /infinite/.test(d.value) ? Math.max(threshold + 1, ...ms) : Math.max(0, ...ms);
    if (dur > threshold) { first = { line: d.line, message: `${d.prop}: ${d.value} with no prefers-reduced-motion block in the stylesheet` }; break; }
  }
  if (!first) {
    const anyVariant = doc.classLists.some((cl) => hasVariant(cl.classes, /^motion-(safe|reduce)$/));
    if (!anyVariant) {
      for (const cl of doc.classLists) {
        const hit = cl.classes.find((c) => { const b = splitClass(c).base; if (/^animate-(?!none|pulse|on-)/.test(b)) return true; // animate-on-* are JS hook classes, not utilities
          const movement = cl.classes.some((x) => /^(transition|transition-all|transition-transform)$/.test(splitClass(x).base));
          return movement && /^duration-(\d+)$/.test(b) && Number(/\d+/.exec(b)[0]) > threshold; });
        if (hit) { first = { line: cl.line, message: `${hit} with no motion-safe/motion-reduce variant or prefers-reduced-motion block` }; break; }
      }
    }
  }
  return first ? [first] : [];
}

function focusIndicatorRemoved(doc) {
  const out = [];
  const all = `${doc.cssTexts.map((c) => c.content).join('\n')}\n${doc.linkedCssText}`;
  const replacement = /:focus-visible[^{]*\{[^}]*(outline\s*:\s*(?!none|0\b)[^;}]+|outline-(style|width|color)\s*:|box-shadow\s*:|border(-[a-z-]+)?\s*:)/i.test(all);
  if (!replacement) {
    for (const { b, d } of decls(doc, ['outline', 'outline-style', 'outline-width'])) {
      if (/:focus-visible/.test(b.selector)) continue;
      // Resets on elements that never take focus (img, table, body text) do not remove a focus indicator.
      const NON_FOCUSABLE = /^(img|picture|svg|table|thead|tbody|tr|td|th|body|html|p|div|span|ul|ol|li|h[1-6]|section|main|article|header|footer|figure|hr|fieldset|legend)$/;
      if (!/:focus/.test(b.selector) && selectorParts(b.selector).every((p) => NON_FOCUSABLE.test(p.replace(/[.#[:].*$/, '')))) continue;
      // A replacement indicator in the same :focus block (box-shadow ring or border change) counts.
      if (/:focus/.test(b.selector) && b.decls.some((x) => (x.prop === 'box-shadow' && !/^none$/i.test(x.value.trim())) || /^border(-[a-z-]+)?$/.test(x.prop))) continue;
      const v = d.value.trim().toLowerCase();
      const removed = (d.prop === 'outline' && /^(none|0|0px)(\s|$)/.test(v)) || (d.prop === 'outline-style' && v === 'none') || (d.prop === 'outline-width' && /^0(px)?$/.test(v));
      if (removed) out.push({ line: d.line, message: `${d.prop}: ${d.value} with no :focus-visible replacement in the stylesheet (WCAG 2.4.7)` });
    }
  }
  for (const cl of doc.classLists) {
    const removed = cl.classes.some((c) => /^outline-none$|^outline-0$/.test(splitClass(c).base));
    if (!removed) continue;
    const replaced = cl.classes.some((c) => {
      const { variants, base } = splitClass(c);
      return variants.some((v) => /^focus(-visible|-within)?$/.test(v)) && /^(ring|outline(?!-none)|border|shadow)/.test(base);
    });
    if (!replaced) out.push({ line: cl.line, message: 'outline removed with no focus/focus-visible ring, outline or border replacement' });
  }
  return out;
}

// --------------------------------------------------------- imagery and assets

function brokenLocalImage(doc) {
  const out = [];
  for (const u of doc.urls) {
    if (u.embedded) continue;
    const url = u.url.trim();
    if (!url || /^(https?:|data:|blob:|mailto:|tel:|#|\/\/)/i.test(url) || /[{}$<>%]/.test(url) || url.startsWith('/')) continue;
    const clean = decodeURI(url.split(/[?#]/)[0]);
    if (!/\.(png|jpe?g|gif|webp|avif|svg|ico|bmp)$/i.test(clean)) continue;
    const target = path.resolve(path.dirname(doc.file), clean);
    if (!fs.existsSync(target)) out.push({ line: u.line, message: `local image not found: ${url}` });
  }
  return out;
}

const PLACEHOLDER_HOSTS = /(picsum\.photos|(via\.)?placeholder\.com|placehold\.(co|it)|dummyimage\.com|source\.unsplash\.com|loremflickr\.com|fakeimg\.pl|placekitten\.com|placebear\.com|baconmockup\.com)/i;

function placeholderImageHost(doc) {
  const out = [];
  for (const u of doc.urls) if (PLACEHOLDER_HOSTS.test(u.url)) out.push({ line: u.line, message: `placeholder image host ${u.url.slice(0, 80)}` });
  for (const s of doc.scripts) {
    const re = /["'`](https?:\/\/[^"'`\s]+)["'`]/g;
    let m;
    while ((m = re.exec(s.content))) {
      if (PLACEHOLDER_HOSTS.test(m[1]) && !doc.urls.some((u) => u.url === m[1])) out.push({ line: doc.lineAt(s.base + m.index), message: `placeholder image host ${m[1].slice(0, 80)}` });
    }
  }
  return out;
}

// ------------------------------------------------------ data-pack checks

function regexCheck(doc, params) {
  const out = [];
  const re = new RegExp(params.pattern, (params.flags || 'i').replace('g', '') + 'g');
  const target = params.target || 'text';
  if (target === 'class') {
    for (const cl of doc.classLists) if (cl.classes.some((c) => new RegExp(params.pattern, params.flags || 'i').test(c))) out.push({ line: cl.line, message: params.message || `class matches ${params.pattern}` });
    return out;
  }
  if (target === 'css-value') {
    for (const { d } of decls(doc)) if (new RegExp(params.pattern, params.flags || 'i').test(d.value)) out.push({ line: d.line, message: params.message || `${d.prop} matches ${params.pattern}` });
    return out;
  }
  let m;
  while ((m = re.exec(doc.text))) {
    out.push({ line: doc.lineAt(m.index), message: params.message || `matches ${params.pattern}` });
    if (m[0].length === 0) re.lastIndex++;
  }
  return out;
}

function phraseList(doc, params) {
  const out = [];
  const texts = doc.elements.length ? doc.elements.filter((e) => e.text).map((e) => ({ text: e.text, line: e.line })) : doc.lines.map((t, i) => ({ text: t, line: i + 1 }));
  for (const phrase of params.phrases || []) {
    const re = new RegExp(`\\b${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    for (const t of texts) if (re.test(t.text)) out.push({ line: t.line, message: params.message ? `${params.message}: "${phrase}"` : `phrase "${phrase}"` });
  }
  return out;
}

export const CHECKS = {
  bannedPrimaryFont,
  flatTypeHierarchy,
  leading,
  tracking,
  justifiedText,
  tinyText,
  allCapsBody,
  lineLength,
  skippedHeading,
  italicSerifDisplay,
  gradientText,
  purpleBlueGradient,
  neonGlow,
  glassmorphism,
  aiBeigeGround,
  radialHalo,
  pureBlackBodyText,
  grayOnColor,
  stripesOrGrid,
  decorativeSideStripe,
  nestedCards,
  heroEyebrowChip,
  kickerAboveHeading,
  numberedSectionLabels,
  identicalThreeColumnGrid,
  thinBorderWideShadow,
  bounceEasing,
  pulsingDot,
  blinkingCursor,
  marquee,
  missingReducedMotion,
  focusIndicatorRemoved,
  brokenLocalImage,
  placeholderImageHost,
};

/** Checks a data-only rule pack (--extra-rules) may use. */
export const PACK_CHECKS = { regex: regexCheck, 'phrase-list': phraseList };
