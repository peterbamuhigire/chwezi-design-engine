// Minimal CSS/SCSS/LESS parser: rule blocks with selectors, at-rule context,
// declarations with original line numbers, and @keyframes bodies. Comments are
// blanked (not removed) so offsets map back to the original file.
import { blankCssComments } from './util.mjs';

function resolveSelector(parent, prelude) {
  if (!parent) return prelude;
  const parents = parent.split(',').map((s) => s.trim());
  return prelude.split(',').map((child) => {
    const c = child.trim();
    return parents.map((p) => (c.includes('&') ? c.replace(/&/g, p) : `${p} ${c}`)).join(', ');
  }).join(', ');
}

/** Parses "prop: value" declarations (for style="" attributes). */
export function parseDeclarations(text, base, lineAt) {
  const decls = [];
  let start = 0;
  let quote = null;
  let depth = 0;
  const flush = (end) => {
    const seg = text.slice(start, end);
    const colon = seg.indexOf(':');
    if (colon > 0) {
      const prop = seg.slice(0, colon).trim().toLowerCase();
      let value = seg.slice(colon + 1).trim();
      const important = /!important\s*$/i.test(value);
      value = value.replace(/!important\s*$/i, '').trim();
      if (/^(--)?[a-z-]+$/i.test(prop) && value) {
        const lead = seg.length - seg.trimStart().length;
        decls.push({ prop, value, important, line: lineAt(base + start + lead), index: base + start + lead });
      }
    }
  };
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) { if (ch === quote && text[i - 1] !== '\\') quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (ch === ';' && depth <= 0) { flush(i); start = i + 1; }
  }
  flush(text.length);
  return decls;
}

/**
 * parseCss(text, base, lineAt) -> { blocks, keyframes, text }
 *   blocks:    [{ selector, decls[], line, index, atRules[] }]
 *   keyframes: [{ name, body, line }]
 */
export function parseCss(rawText, base, lineAt) {
  const text = blankCssComments(rawText);
  const blocks = [];
  const keyframes = [];
  const stack = []; // { prelude, selector, atRules, decls, start, isKeyframes, kfName, line, index }
  let segStart = 0;
  let quote = null;
  let paren = 0;

  const currentRule = () => {
    for (let i = stack.length - 1; i >= 0; i--) if (!stack[i].prelude.startsWith('@')) return stack[i];
    return null;
  };

  const addDecls = (from, to) => {
    const ctx = stack[stack.length - 1];
    if (!ctx) return;
    const seg = text.slice(from, to);
    if (!seg.trim()) return;
    const found = parseDeclarations(seg, base + from, lineAt);
    const target = ctx.prelude.startsWith('@') && !ctx.inKeyframes ? currentRule() || ctx : ctx;
    target.decls.push(...found.map((d) => ({ ...d, atRules: stack.filter((s) => s.prelude.startsWith('@')).map((s) => s.prelude) })));
  };

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) { if (ch === quote && text[i - 1] !== '\\') quote = null; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '(') { paren++; continue; }
    if (ch === ')') { paren = Math.max(0, paren - 1); continue; }
    if (paren > 0) continue;
    if (ch === '{') {
      // Interpolation #{...} in SCSS: skip to the closing brace.
      if (text[i - 1] === '#') {
        const close = text.indexOf('}', i);
        if (close > 0) { i = close; continue; }
      }
      const pre = text.slice(segStart, i);
      // Declarations before a nested block (SCSS) end at the last ';'.
      const lastSemi = pre.lastIndexOf(';');
      if (lastSemi >= 0) addDecls(segStart, segStart + lastSemi + 1);
      const preludeRaw = lastSemi >= 0 ? pre.slice(lastSemi + 1) : pre;
      const prelude = preludeRaw.trim().replace(/\s+/g, ' ');
      const lead = preludeRaw.length - preludeRaw.trimStart().length;
      const preludeIndex = segStart + (lastSemi >= 0 ? lastSemi + 1 : 0) + lead;
      const parentRule = currentRule();
      const isKf = /^@(-webkit-|-moz-)?keyframes\b/i.test(prelude);
      const inKeyframes = stack.some((s) => s.isKeyframes);
      const selector = prelude.startsWith('@') || inKeyframes ? (parentRule ? parentRule.selector : '') : resolveSelector(parentRule ? parentRule.selector : '', prelude);
      stack.push({
        prelude, selector, decls: [], isKeyframes: isKf, inKeyframes, kfName: isKf ? prelude.split(/\s+/)[1] : null,
        line: lineAt(base + preludeIndex), index: base + preludeIndex, bodyStart: i + 1,
      });
      segStart = i + 1;
      continue;
    }
    if (ch === '}') {
      addDecls(segStart, i);
      const ctx = stack.pop();
      if (ctx) {
        if (ctx.isKeyframes) keyframes.push({ name: ctx.kfName, body: rawText.slice(ctx.bodyStart, i), line: ctx.line });
        if (!ctx.prelude.startsWith('@') && ctx.decls.length && !ctx.inKeyframes) {
          blocks.push({ selector: ctx.selector, decls: ctx.decls, line: ctx.line, index: ctx.index, atRules: stack.filter((s) => s.prelude.startsWith('@')).map((s) => s.prelude) });
        } else if (ctx.prelude.startsWith('@') && ctx.decls.length && !ctx.isKeyframes && !ctx.inKeyframes && !currentRule()) {
          // Declarations directly inside an at-rule with no rule (e.g. @font-face, @page).
          blocks.push({ selector: ctx.prelude, decls: ctx.decls, line: ctx.line, index: ctx.index, atRules: [ctx.prelude] });
        }
      }
      segStart = i + 1;
      continue;
    }
    if (ch === ';' && stack.length === 0) segStart = i + 1;
  }
  return { blocks, keyframes, text };
}

/** First declaration value for a property in a block (last one wins, as in CSS). */
export function declValue(block, prop) {
  let v = null;
  for (const d of block.decls) if (d.prop === prop) v = d.value;
  return v;
}

export function declsOf(block, props) {
  const set = new Set([].concat(props));
  return block.decls.filter((d) => set.has(d.prop));
}
