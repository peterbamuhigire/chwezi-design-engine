// Browser-tier rule probes (M10-09-T08). Pure functions evaluated inside the
// page by lib/browser.mjs; this module itself loads no browser and makes no
// network call. Rule ideas adapted in paraphrase from Impeccable's rendering
// rules (Apache-2.0, https://github.com/pbakaus/impeccable, commit 114ea1d).

export const BROWSER_CHECK_NAMES = [
  'horizontalOverflow', 'clippedPositionedChild', 'textOcclusion', 'contentHiddenAtRest',
  'scriptError', 'lowContrastComputed', 'firstViewportColumnOverflow',
];

/**
 * Runs in the page. Returns { horizontalOverflow: [...], ... } where each entry
 * is { selector, message }. Kept self-contained (no closures) for page.evaluate.
 */
export function pageProbe() {
  const out = {
    horizontalOverflow: [], clippedPositionedChild: [], textOcclusion: [], contentHiddenAtRest: [],
    lowContrastComputed: [], firstViewportColumnOverflow: [],
  };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const path = (el) => {
    const parts = [];
    for (let e = el; e && e.nodeType === 1 && parts.length < 4; e = e.parentElement) {
      let p = e.tagName.toLowerCase();
      if (e.id) { p += `#${e.id}`; parts.unshift(p); break; }
      if (e.classList.length) p += `.${[...e.classList].slice(0, 2).join('.')}`;
      parts.unshift(p);
    }
    return parts.join(' > ');
  };
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').replace(/\s+/g, ' ').trim();
  const isSrOnly = (el, cs) => (cs.position === 'absolute' && (parseFloat(cs.width) <= 1 || parseFloat(cs.height) <= 1)) || /rect\(0|inset\(50%/.test(cs.clip + cs.clipPath);
  const hiddenByAttr = (el) => el.closest('[hidden], [aria-hidden="true"], template, details:not([open]) > :not(summary), dialog:not([open]), noscript');

  const doc = document.documentElement;
  if (doc.scrollWidth > vw + 1) out.horizontalOverflow.push({ selector: 'html', message: `page scrollWidth ${doc.scrollWidth}px exceeds viewport ${vw}px` });

  const textEls = [...document.body.querySelectorAll('*')].filter((el) => ownText(el).length > 0 && !['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'OPTION'].includes(el.tagName));

  const parseRgb = (s) => {
    const m = /rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/.exec(s || '');
    if (!m) return null;
    let a = m[4] === undefined ? 1 : parseFloat(m[4]);
    if (m[4] && m[4].endsWith('%')) a = parseFloat(m[4]) / 100;
    return { r: +m[1], g: +m[2], b: +m[3], a };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const effectiveBg = (el) => {
    const layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null; // cannot compute under images/gradients
      const c = parseRgb(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let bg = { r: 255, g: 255, b: 255, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) bg = blend(layers[i], bg);
    return bg;
  };

  for (const el of textEls) {
    const cs = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    if (cs.display === 'none' || rect.width === 0 || rect.height === 0 || hiddenByAttr(el) || isSrOnly(el, cs)) continue;
    const text = ownText(el).slice(0, 40);

    // content-hidden-at-rest: effective opacity near zero or visibility hidden on real content.
    let opacity = 1;
    for (let e = el; e; e = e.parentElement) opacity *= parseFloat(getComputedStyle(e).opacity);
    if ((opacity < 0.05 || cs.visibility === 'hidden') && ownText(el).length >= 12) {
      out.contentHiddenAtRest.push({ selector: path(el), message: `"${text}" is invisible at rest (opacity ${opacity.toFixed(2)}, visibility ${cs.visibility})` });
      continue;
    }

    // clipped-positioned-child: absolutely/fixed positioned text clipped by an overflow ancestor.
    if (cs.position === 'absolute' || cs.position === 'fixed') {
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        const acs = getComputedStyle(a);
        if (/(hidden|clip)/.test(acs.overflow + acs.overflowX + acs.overflowY)) {
          const ar = a.getBoundingClientRect();
          const w = Math.max(0, Math.min(rect.right, ar.right) - Math.max(rect.left, ar.left));
          const h = Math.max(0, Math.min(rect.bottom, ar.bottom) - Math.max(rect.top, ar.top));
          if (w * h < 0.9 * rect.width * rect.height) out.clippedPositionedChild.push({ selector: path(el), message: `"${text}" is clipped by overflow on ${path(a)}` });
          break;
        }
        if (acs.position !== 'static' && cs.position === 'absolute') break;
      }
    }

    // text-occlusion: the element's centre point is covered by an unrelated element.
    const cx = rect.left + Math.min(rect.width, 40) / 2;
    const cy = rect.top + rect.height / 2;
    if (cx >= 0 && cy >= 0 && cx < vw && cy < vh) {
      const top = document.elementFromPoint(cx, cy);
      if (top && top !== el && !el.contains(top) && !top.contains(el)) {
        const tcs = getComputedStyle(top);
        if (tcs.pointerEvents !== 'none' && parseFloat(tcs.opacity) > 0.1) out.textOcclusion.push({ selector: path(el), message: `"${text}" is covered by ${path(top)}` });
      }
    }

    // first-viewport-column-overflow: first-viewport text running past the viewport edge.
    if (rect.top < vh && (rect.right > vw + 1 || rect.left < -1)) {
      let scroller = false;
      for (let a = el.parentElement; a; a = a.parentElement) { if (/(auto|scroll)/.test(getComputedStyle(a).overflowX)) { scroller = true; break; } }
      if (!scroller) out.firstViewportColumnOverflow.push({ selector: path(el), message: `"${text}" extends past the ${vw}px viewport (${Math.round(rect.left)}-${Math.round(rect.right)})` });
    }

    // low-contrast-computed: WCAG 1.4.3 on the computed colours.
    const fg = parseRgb(cs.color);
    const bg = effectiveBg(el);
    if (fg && bg) {
      const col = fg.a < 1 ? blend(fg, bg) : fg;
      const L1 = lum(col); const L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && parseInt(cs.fontWeight, 10) >= 700);
      const min = large ? 3 : 4.5;
      if (ratio < min) out.lowContrastComputed.push({ selector: path(el), message: `"${text}" contrast ${ratio.toFixed(2)}:1 is below ${min}:1` });
    }
  }
  return out;
}
