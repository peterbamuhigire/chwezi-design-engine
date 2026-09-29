// Minimal tag-and-attribute scanner for HTML, Vue/Svelte templates and JSX/TSX.
// No DOM library. Builds a loose element tree (document order), collects
// <style> blocks and style="" attributes, and keeps direct text per element.

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const RAW = new Set(['script', 'style', 'textarea', 'title']);

function stringLiterals(expr) {
  const out = [];
  const re = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'|`((?:\\.|[^`\\])*)`/g;
  let m;
  while ((m = re.exec(expr))) out.push((m[1] ?? m[2] ?? m[3] ?? '').replace(/\$\{[^}]*\}/g, ' '));
  return out.join(' ');
}

function readAttrs(text, i) {
  const attrs = {};
  const n = text.length;
  while (i < n) {
    while (i < n && /\s/.test(text[i])) i++;
    if (text[i] === '>') return { attrs, end: i + 1, selfClose: false };
    if (text[i] === '/' && text[i + 1] === '>') return { attrs, end: i + 2, selfClose: true };
    if (i >= n) break;
    if (text[i] === '{') {
      // JSX spread {...props}
      let depth = 0;
      for (; i < n; i++) {
        if (text[i] === '{') depth++;
        else if (text[i] === '}') { depth--; if (depth === 0) { i++; break; } }
      }
      continue;
    }
    const nm = /^[^\s=/>]+/.exec(text.slice(i, i + 200));
    if (!nm) return null;
    const name = nm[0].toLowerCase();
    i += nm[0].length;
    while (i < n && /\s/.test(text[i])) i++;
    if (text[i] !== '=') { attrs[name] = ''; continue; }
    i++;
    while (i < n && /\s/.test(text[i])) i++;
    const q = text[i];
    if (q === '"' || q === "'") {
      const close = text.indexOf(q, i + 1);
      if (close < 0) return null;
      attrs[name] = text.slice(i + 1, close);
      i = close + 1;
    } else if (q === '{') {
      let depth = 0;
      let j = i;
      let quote = null;
      for (; j < n; j++) {
        const ch = text[j];
        if (quote) { if (ch === quote && text[j - 1] !== '\\') quote = null; continue; }
        if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') { depth--; if (depth === 0) break; }
      }
      const expr = text.slice(i + 1, j);
      attrs[name] = stringLiterals(expr);
      attrs[`${name}:expr`] = expr;
      i = j + 1;
    } else {
      const uq = /^[^\s>]+/.exec(text.slice(i));
      attrs[name] = uq ? uq[0] : '';
      i += uq ? uq[0].length : 0;
    }
    if (i - 0 > n) break;
  }
  return null;
}

/**
 * parseHtml(text, base, lineAt, { jsx }) ->
 *   { root, elements[], styles: [{content, base}], styleAttrs: [{el, content, base}] }
 * Element: { tag, attrs, classes[], line, index, parent, children[], text, textParts[] }
 */
export function parseHtml(text, base, lineAt, opts = {}) {
  const root = { tag: '#root', attrs: {}, classes: [], children: [], parent: null, text: '', line: lineAt(base), index: base };
  const elements = [];
  const styles = [];
  const styleAttrs = [];
  const stack = [root];
  let i = 0;
  const n = text.length;
  const addText = (s) => {
    const cleaned = opts.jsx ? s.replace(/\{[^{}]*\}/g, ' ') : s;
    const t = cleaned.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    if (t) stack[stack.length - 1].text += (stack[stack.length - 1].text ? ' ' : '') + t;
  };
  let textStart = 0;
  while (i < n) {
    const lt = text.indexOf('<', i);
    if (lt < 0) break;
    if (text.startsWith('<!--', lt)) {
      addText(text.slice(textStart, lt));
      const close = text.indexOf('-->', lt + 4);
      i = close < 0 ? n : close + 3;
      textStart = i;
      continue;
    }
    const close = /^<\/([A-Za-z][\w.:-]*)\s*>/.exec(text.slice(lt, lt + 120));
    if (close) {
      addText(text.slice(textStart, lt));
      const tag = close[1].toLowerCase();
      for (let s = stack.length - 1; s > 0; s--) {
        if (stack[s].tag === tag) { stack.length = s; break; }
      }
      i = lt + close[0].length;
      textStart = i;
      continue;
    }
    if (text[lt + 1] === '>' && opts.jsx) { i = lt + 2; continue; } // <> fragment
    const open = /^<([A-Za-z][\w.:-]*)(?=[\s/>])/.exec(text.slice(lt, lt + 80));
    if (!open) { i = lt + 1; continue; }
    const read = readAttrs(text, lt + open[0].length);
    if (!read) { i = lt + 1; continue; }
    addText(text.slice(textStart, lt));
    const tagRaw = open[1];
    const tag = tagRaw.toLowerCase();
    const parent = stack[stack.length - 1];
    const cls = (read.attrs.class || '') + ' ' + (read.attrs.classname || '');
    const el = {
      tag, component: /^[A-Z]/.test(tagRaw), attrs: read.attrs, classes: cls.split(/\s+/).filter(Boolean),
      line: lineAt(base + lt), index: base + lt, parent, children: [], text: '',
    };
    parent.children.push(el);
    elements.push(el);
    if (typeof read.attrs.style === 'string' && read.attrs.style && !read.attrs['style:expr']) {
      const off = text.indexOf(read.attrs.style, lt);
      styleAttrs.push({ el, content: read.attrs.style, base: base + (off >= 0 ? off : lt) });
    }
    i = read.end;
    if (RAW.has(tag) && !read.selfClose) {
      const endRe = new RegExp(`</${tag}\\s*>`, 'i');
      const m = endRe.exec(text.slice(i));
      const endIdx = m ? i + m.index : n;
      if (tag === 'style') styles.push({ content: text.slice(i, endIdx), base: base + i });
      else if (tag === 'title' || tag === 'textarea') el.text = text.slice(i, endIdx).trim();
      i = m ? endIdx + m[0].length : n;
      textStart = i;
      continue;
    }
    if (!read.selfClose && !VOID.has(tag)) stack.push(el);
    textStart = i;
  }
  addText(text.slice(textStart));
  return { root, elements, styles, styleAttrs };
}

export function nextElementSibling(el) {
  if (!el.parent) return null;
  const sibs = el.parent.children;
  const idx = sibs.indexOf(el);
  return idx >= 0 && idx < sibs.length - 1 ? sibs[idx + 1] : null;
}

export function previousElementSibling(el) {
  if (!el.parent) return null;
  const sibs = el.parent.children;
  const idx = sibs.indexOf(el);
  return idx > 0 ? sibs[idx - 1] : null;
}

export function ancestors(el) {
  const out = [];
  for (let p = el.parent; p && p.tag !== '#root'; p = p.parent) out.push(p);
  return out;
}

export function descendants(el) {
  const out = [];
  const walk = (e) => { for (const c of e.children) { out.push(c); walk(c); } };
  walk(el);
  return out;
}

/** Visible text of an element and its descendants. */
export function deepText(el) {
  let t = el.text || '';
  for (const c of el.children) {
    const ct = deepText(c);
    if (ct) t += (t ? ' ' : '') + ct;
  }
  return t.trim();
}

export function attrText(el) {
  return Object.entries(el.attrs)
    .filter(([k]) => !k.endsWith(':expr'))
    .map(([k, v]) => `${k}=${v}`)
    .join(' ');
}
