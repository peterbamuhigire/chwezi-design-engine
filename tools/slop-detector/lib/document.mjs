// Builds the analysable "document" for one file: CSS blocks, HTML/JSX elements,
// Tailwind class lists, font stacks and asset URLs, all with original lines.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { lineMapper } from './util.mjs';
import { parseCss, parseDeclarations } from './parse-css.mjs';
import { parseHtml } from './parse-html.mjs';

const require = createRequire(import.meta.url);
export const matcher = require('../../../hooks/lib/font-matcher.js');

export const EXT_ENGINE = {
  '.css': 'css', '.scss': 'css', '.less': 'css', '.pcss': 'css', '.postcss': 'css',
  '.html': 'html', '.htm': 'html', '.xhtml': 'html', '.vue': 'html', '.svelte': 'html', '.astro': 'html',
  '.js': 'script', '.jsx': 'script', '.ts': 'script', '.tsx': 'script', '.mjs': 'script', '.cjs': 'script',
  '.py': 'py',
  '.md': 'md', '.mdx': 'md',
};

const FENCE_ENGINE = {
  css: 'css', scss: 'css', less: 'css', postcss: 'css',
  html: 'html', htm: 'html', xhtml: 'html', vue: 'html', svelte: 'html', astro: 'html',
  jsx: 'script', tsx: 'script', js: 'script', ts: 'script', javascript: 'script', typescript: 'script', mjs: 'script', cjs: 'script',
  python: 'py', py: 'py',
};

/** Fenced code blocks in Markdown: [{lang, content, base}] (base = offset of content). */
export function markdownFences(text) {
  const out = [];
  const re = /^([ \t]*)(`{3,}|~{3,})[ \t]*([\w+-]*)[^\n]*\n/gm;
  let m;
  while ((m = re.exec(text))) {
    const fence = m[2];
    const lang = (m[3] || '').toLowerCase();
    const start = m.index + m[0].length;
    const closeRe = new RegExp(`^[ \\t]*${fence[0] === '`' ? '`' : '~'}{${fence.length},}[ \\t]*$`, 'm');
    const rest = text.slice(start);
    const c = closeRe.exec(rest);
    const end = c ? start + c.index : text.length;
    out.push({ lang, content: text.slice(start, end), base: start });
    re.lastIndex = c ? start + c.index + c[0].length : text.length;
  }
  return out;
}

function fontShorthandFamilies(value) {
  // font: [style] [weight] size[/line-height] family-list
  const m = /(?:^|\s)[\d.]+(?:px|rem|em|pt|%|vw|vh)(?:\s*\/\s*[\w.%-]+)?\s+(.+)$/i.exec(value);
  return m ? matcher.stackFamilies(m[1]) : null;
}

export function buildDocument(file, text, opts = {}) {
  const ext = path.extname(file).toLowerCase();
  const engine = EXT_ENGINE[ext];
  const lineAt = lineMapper(text);
  const doc = {
    file, ext, engine, text, lines: text.split(/\r?\n/), lineAt,
    blocks: [], keyframes: [], elements: [], htmlRoots: [], classLists: [], fontStacks: [], urls: [],
    scripts: [], pyUnits: [], cssTexts: [], linkedCssText: '', embeddedOnly: engine === 'md',
  };

  const addCss = (content, base, embedded) => {
    const parsed = parseCss(content, base, lineAt);
    for (const b of parsed.blocks) { b.embedded = embedded; doc.blocks.push(b); }
    for (const k of parsed.keyframes) doc.keyframes.push(k);
    doc.cssTexts.push({ content, base, embedded });
  };

  const addHtml = (content, base, embedded, jsx) => {
    const parsed = parseHtml(content, base, lineAt, { jsx });
    doc.htmlRoots.push({ root: parsed.root, embedded });
    for (const el of parsed.elements) {
      el.embedded = embedded;
      doc.elements.push(el);
      if (el.classes.length) doc.classLists.push({ el, classes: el.classes, line: el.line, embedded });
      for (const attr of ['src', 'poster', 'data-src']) {
        if (el.attrs[attr]) doc.urls.push({ url: el.attrs[attr], line: el.line, kind: el.tag === 'img' || attr !== 'src' ? 'img' : el.tag, embedded });
      }
      if (el.attrs.srcset) {
        for (const part of el.attrs.srcset.split(',')) {
          const u = part.trim().split(/\s+/)[0];
          if (u) doc.urls.push({ url: u, line: el.line, kind: 'img', embedded });
        }
      }
      if (el.tag === 'link' && el.attrs.href && /stylesheet/i.test(el.attrs.rel || '') && !embedded && opts.readLinked !== false) {
        const href = el.attrs.href;
        if (!/^(https?:)?\/\//i.test(href) && !href.startsWith('data:')) {
          try { doc.linkedCssText += '\n' + fs.readFileSync(path.resolve(path.dirname(file), href.split(/[?#]/)[0]), 'utf8'); } catch { /* missing stylesheet is not this rule's concern */ }
        }
      }
    }
    for (const s of parsed.styles) addCss(s.content, s.base, embedded);
    for (const sa of parsed.styleAttrs) {
      const decls = parseDeclarations(sa.content, sa.base, lineAt);
      if (decls.length) {
        const selector = `${sa.el.tag}${sa.el.classes.map((c) => '.' + c).join('')}`;
        doc.blocks.push({ selector, decls, line: sa.el.line, index: sa.base, atRules: [], inline: true, el: sa.el, embedded });
      }
    }
  };

  const addScript = (content, base, embedded) => {
    doc.scripts.push({ content, base, embedded });
    addHtml(content, base, embedded, true);
    const styled = /(?:styled(?:\.[\w$]+|\([^()]*\))(?:\.attrs\([^()]*\))?|css|createGlobalStyle|injectGlobal|keyframes)\s*`([^`]*)`/g;
    let m;
    while ((m = styled.exec(content))) {
      const inner = m[1];
      const innerBase = base + m.index + m[0].indexOf('`') + 1;
      const hasSelector = /\{/.test(inner);
      if (hasSelector) addCss(inner.replace(/\$\{[^}]*\}/g, (x) => ' '.repeat(x.length)), innerBase, embedded);
      else {
        const decls = parseDeclarations(inner.replace(/\$\{[^}]*\}/g, (x) => ' '.repeat(x.length)), innerBase, lineAt);
        if (decls.length) doc.blocks.push({ selector: '&', decls, line: lineAt(innerBase), index: innerBase, atRules: [], embedded });
      }
    }
    for (const s of matcher.findScriptFontStacks(content)) {
      doc.fontStacks.push({ families: s.families, selector: s.selector, prop: s.prop, line: lineAt(base + s.index), embedded, value: s.value });
    }
  };

  const addUnit = (unitEngine, content, base, embedded) => {
    if (unitEngine === 'css') addCss(content, base, embedded);
    else if (unitEngine === 'html') addHtml(content, base, embedded, false);
    else if (unitEngine === 'script') addScript(content, base, embedded);
    else if (unitEngine === 'py') doc.pyUnits.push({ content, base, embedded });
  };

  if (engine === 'md') {
    doc.fenceLines = new Set();
    for (const f of markdownFences(text)) {
      const from = lineAt(f.base); const to = lineAt(f.base + f.content.length);
      for (let l = from; l <= to; l++) doc.fenceLines.add(l);
      const e = FENCE_ENGINE[f.lang];
      if (e) addUnit(e, f.content, f.base, true);
    }
  } else if (engine) {
    addUnit(engine, text, 0, false);
  }

  // Font stacks from CSS declarations.
  for (const b of doc.blocks) {
    for (const d of b.decls) {
      let families = null;
      if (d.prop === 'font-family') families = matcher.stackFamilies(d.value);
      else if (d.prop === 'font') families = fontShorthandFamilies(d.value);
      else if (/^--font-/.test(d.prop) && !/size|weight|leading|line|tracking|spacing|feature|variation|style|stretch|kerning|optical|synthesis|smoothing|scale|step|width/.test(d.prop)) families = matcher.stackFamilies(d.value);
      if (families && families.length) doc.fontStacks.push({ families, selector: b.selector, prop: d.prop, line: d.line, embedded: b.embedded, value: d.value });
      const urlRe = /url\(\s*["']?([^"')]+)["']?\s*\)/g;
      let u;
      while ((u = urlRe.exec(d.value))) {
        if (d.prop === 'src' && /@font-face/i.test(b.selector)) continue;
        doc.urls.push({ url: u[1], line: d.line, kind: 'css', embedded: b.embedded });
      }
    }
  }
  return doc;
}

export function readDocument(file, opts) {
  const text = fs.readFileSync(file, 'utf8');
  return buildDocument(file, text, opts);
}
