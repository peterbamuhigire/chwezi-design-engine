// Shared helpers for the chwezi-slop static tier. No dependencies, no I/O.

/** Returns a function mapping a character offset in `text` to a 1-based line number. */
export function lineMapper(text) {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text.charCodeAt(i) === 10) starts.push(i + 1);
  return (index) => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (starts[mid] <= index) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  };
}

/** Replaces /* *\/ comments with spaces (newlines kept) so offsets and lines survive. */
export function blankCssComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
}

/** Parses a CSS length into px (rem/em at 16px). Returns null when not a length. */
export function toPx(value, base = 16) {
  const m = String(value).trim().match(/^(-?\d*\.?\d+)(px|rem|em|pt)?$/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  const unit = (m[2] || '').toLowerCase();
  if (unit === 'px') return n;
  if (unit === 'rem' || unit === 'em') return n * base;
  if (unit === 'pt') return (n * 96) / 72;
  if (unit === '' && n === 0) return 0;
  return null;
}

/** Parses a letter-spacing value into em (px converted when the font size is known). */
export function toEm(value, fontPx = null) {
  const m = String(value).trim().match(/^(-?\d*\.?\d+)(em|rem|px)?$/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  const unit = (m[2] || '').toLowerCase();
  if (unit === 'em' || unit === 'rem') return n;
  if (unit === 'px') return fontPx ? n / fontPx : null;
  if (unit === '' && n === 0) return 0;
  return null;
}

/** Duration token (e.g. 300ms, .4s) to milliseconds, or null. */
export function toMs(token) {
  const m = String(token).trim().match(/^(\d*\.?\d+)(ms|s)$/i);
  if (!m) return null;
  return m[2].toLowerCase() === 's' ? parseFloat(m[1]) * 1000 : parseFloat(m[1]);
}

/** Splits on commas that are not inside parentheses or quotes. */
export function splitTopLevel(value, sep = ',') {
  const out = [];
  let depth = 0;
  let quote = null;
  let cur = '';
  for (const ch of String(value)) {
    if (quote) {
      cur += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === sep && depth === 0) { out.push(cur.trim()); cur = ''; continue; }
    cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

/** Splits on whitespace outside parentheses. */
export function splitSpaces(value) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of String(value)) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (/\s/.test(ch) && depth === 0) {
      if (cur) out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out;
}

// ---- selector classification ------------------------------------------------

/** Last compound selector of each comma-separated part, lower-cased. */
export function selectorParts(selector) {
  return splitTopLevel(String(selector || '').toLowerCase())
    .map((part) => {
      const pieces = part.trim().split(/\s*[\s>+~]\s*/).filter(Boolean);
      return pieces[pieces.length - 1] || '';
    });
}

const HEADING_RE = /^(h[1-6])\b|^\.(h[1-6]|heading|headline|title|display|hero-title|page-title|section-title)\b|(^|[.\-_])(heading|headline|display-title|hero-title)\b/;
const BODY_RE = /^(html|body|p|li|dd|blockquote|article|main|td|:root)\b|^\.(prose|body|copy|content|article|lead|text-body|body-text|entry-content|post-content)\b/;

export function isHeadingSelector(selector) {
  return selectorParts(selector).some((p) => HEADING_RE.test(p));
}

export function isBodySelector(selector) {
  // Pseudo-elements (::first-letter drop caps, ::before labels, ::marker) are not running text.
  const parts = selectorParts(selector).filter((p) => !p.includes('::') && !/:(first-letter|first-line)\b/.test(p));
  return parts.length > 0 && parts.some((p) => BODY_RE.test(p)) && !isHeadingSelector(selector);
}

export function isGroundSelector(selector) {
  return selectorParts(selector).some((p) => /^(html|body|:root|main)\b|^\.(page|site|app|layout|wrapper)\b|^#(app|root|__next)\b/.test(p));
}

export function isChromeSelector(selector) {
  return /(^|[\s.#_-])(nav|navbar|header|site-header|toolbar|app-bar|appbar|topbar|top-bar|tab-bar|tabbar|menubar|sticky-header)\b|::backdrop|backdrop|overlay|scrim/i.test(String(selector || ''));
}

export function isHeroSelector(selector) {
  return /hero|landing|masthead|splash|headline|jumbotron|banner|typewriter|tagline/i.test(String(selector || ''));
}

export function isStateSelector(selector) {
  return /:hover|:focus|:active|\.active\b|\.is-active\b|\.selected\b|\.is-selected\b|\[aria-current|\[aria-selected|\.current\b/i.test(String(selector || ''));
}

export const STATUS_TOKEN_RE = /(^|[\s"'_-])(status|alert-(danger|warning|success|info)|is-(normal|high|low|critical))([\s"'_-]|$)/i;

export function snippetOf(lines, line) {
  const raw = lines[line - 1] ?? '';
  return raw.trim().slice(0, 160);
}
