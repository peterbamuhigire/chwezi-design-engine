// Tailwind class-token helpers. Variants (md:, hover:, dark:) are stripped for
// matching; the raw class is kept for evidence.

/** Splits "md:hover:bg-[#fff]" into { variants: ['md','hover'], base: 'bg-[#fff]' }. */
export function splitClass(cls) {
  const parts = [];
  let depth = 0;
  let cur = '';
  for (const ch of cls) {
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    if (ch === ':' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += ch;
  }
  parts.push(cur);
  const base = parts.pop().replace(/^!/, '').replace(/!$/, '');
  return { variants: parts, base };
}

export function bases(classes) {
  return classes.map((c) => splitClass(c).base);
}

export function has(classes, re) {
  return classes.some((c) => re.test(splitClass(c).base));
}

export function find(classes, re) {
  return classes.filter((c) => re.test(splitClass(c).base));
}

export function hasVariant(classes, variantRe, baseRe = /./) {
  return classes.some((c) => {
    const { variants, base } = splitClass(c);
    return variants.some((v) => variantRe.test(v)) && baseRe.test(base);
  });
}

export const TEXT_SIZE_PX = { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 30, '4xl': 36, '5xl': 48, '6xl': 60, '7xl': 72, '8xl': 96, '9xl': 128 };

export const CHROMATIC_FAMILIES = ['red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
export const NEUTRAL_FAMILIES = ['gray', 'slate', 'zinc', 'neutral', 'stone'];

/** Base text size in px from an element's classes (unprefixed class wins; else smallest breakpoint). */
export function textSizePx(classes) {
  let px = null;
  for (const c of classes) {
    const { variants, base } = splitClass(c);
    const m = /^text-(xs|sm|base|lg|xl|[2-9]xl)$/.exec(base);
    if (m && variants.length === 0) return TEXT_SIZE_PX[m[1]];
    const arb = /^text-\[(\d*\.?\d+)(px|rem)\]$/.exec(base);
    if (arb && variants.length === 0) return arb[2] === 'rem' ? parseFloat(arb[1]) * 16 : parseFloat(arb[1]);
    if (m && px === null) px = TEXT_SIZE_PX[m[1]];
  }
  return px;
}
