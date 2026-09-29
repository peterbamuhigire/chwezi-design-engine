// Colour parsing and comparison (sRGB, HSL, CIELAB, CIEDE2000, OKLCH input).
// Formulas: CIE 15:2004 (Lab, D65); Sharma, Wu & Dalal (2005) for CIEDE2000;
// Ottosson (2020) for OKLab/OKLCH. No dependencies.

const NAMED = {
  black: '#000000', white: '#ffffff', red: '#ff0000', green: '#008000', blue: '#0000ff',
  purple: '#800080', violet: '#ee82ee', indigo: '#4b0082', cyan: '#00ffff', aqua: '#00ffff',
  magenta: '#ff00ff', fuchsia: '#ff00ff', pink: '#ffc0cb', orange: '#ffa500', yellow: '#ffff00',
  gray: '#808080', grey: '#808080', silver: '#c0c0c0', navy: '#000080', teal: '#008080',
  lime: '#00ff00', maroon: '#800000', olive: '#808000', beige: '#f5f5dc', ivory: '#fffff0',
  linen: '#faf0e6', cornsilk: '#fff8dc', oldlace: '#fdf5e6', floralwhite: '#fffaf0',
  antiquewhite: '#faebd7', wheat: '#f5deb3', blueviolet: '#8a2be2', darkviolet: '#9400d3',
  mediumpurple: '#9370db', rebeccapurple: '#663399', slateblue: '#6a5acd', deeppink: '#ff1493',
  hotpink: '#ff69b4', gold: '#ffd700', whitesmoke: '#f5f5f5', gainsboro: '#dcdcdc',
  lightgray: '#d3d3d3', lightgrey: '#d3d3d3', darkgray: '#a9a9a9', darkgrey: '#a9a9a9', dimgray: '#696969',
};

export const COLOUR_TOKEN_RE = /#[0-9a-f]{3,8}\b|(?:rgba?|hsla?|oklch)\([^()]*\)|\b(?:transparent|black|white|red|green|blue|purple|violet|indigo|cyan|aqua|magenta|fuchsia|pink|orange|yellow|gray|grey|silver|navy|teal|lime|maroon|olive|beige|ivory|linen|cornsilk|oldlace|floralwhite|antiquewhite|wheat|blueviolet|darkviolet|mediumpurple|rebeccapurple|slateblue|deeppink|hotpink|gold|whitesmoke|gainsboro|lightgr[ae]y|darkgr[ae]y|dimgray)\b/gi;

function clamp(n, lo, hi) { return Math.min(hi, Math.max(lo, n)); }

function num(token, scale = 1) {
  const t = String(token).trim();
  if (t.endsWith('%')) return (parseFloat(t) / 100) * scale;
  return parseFloat(t);
}

function parseHex(hex) {
  let h = hex.slice(1);
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('');
  if (h.length !== 6 && h.length !== 8) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
  return { r, g, b, a };
}

function hslToRgb(h, s, l) {
  h = ((h % 360) + 360) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) };
}

function oklchToRgb(L, C, H) {
  const hr = (H * Math.PI) / 180;
  const a = C * Math.cos(hr);
  const b = C * Math.sin(hr);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const l = l_ ** 3; const m = m_ ** 3; const s = s_ ** 3;
  const lin = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ];
  const enc = (v) => {
    const c = clamp(v, 0, 1);
    return Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055));
  };
  return { r: enc(lin[0]), g: enc(lin[1]), b: enc(lin[2]) };
}

/** Parses one CSS colour token. Returns {r,g,b,a} (0-255, alpha 0-1) or null. */
export function parseColour(token) {
  if (!token) return null;
  const t = String(token).trim().toLowerCase();
  if (t === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  if (NAMED[t]) return parseHex(NAMED[t]);
  if (t.startsWith('#')) return parseHex(t);
  const fn = t.match(/^(rgba?|hsla?|oklch)\((.*)\)$/);
  if (!fn) return null;
  const parts = fn[2].replace(/\//g, ' / ').split(/[\s,]+/).filter(Boolean);
  const slash = parts.indexOf('/');
  let alpha = 1;
  let vals = parts;
  if (slash >= 0) { alpha = num(parts[slash + 1]); vals = parts.slice(0, slash); } else if (parts.length === 4) { alpha = num(parts[3]); vals = parts.slice(0, 3); }
  if (vals.length < 3 || vals.some((v) => Number.isNaN(parseFloat(v)))) return null;
  if (Number.isNaN(alpha)) alpha = 1;
  if (fn[1].startsWith('rgb')) {
    return { r: clamp(Math.round(num(vals[0], 255)), 0, 255), g: clamp(Math.round(num(vals[1], 255)), 0, 255), b: clamp(Math.round(num(vals[2], 255)), 0, 255), a: alpha };
  }
  if (fn[1].startsWith('hsl')) {
    const rgb = hslToRgb(parseFloat(vals[0]), num(vals[1], 1) > 1 ? num(vals[1]) / 100 : num(vals[1], 1), num(vals[2], 1) > 1 ? num(vals[2]) / 100 : num(vals[2], 1));
    return { ...rgb, a: alpha };
  }
  const L = vals[0].endsWith('%') ? parseFloat(vals[0]) / 100 : parseFloat(vals[0]);
  const C = vals[1].endsWith('%') ? (parseFloat(vals[1]) / 100) * 0.4 : parseFloat(vals[1]);
  return { ...oklchToRgb(L, C, parseFloat(vals[2])), a: alpha };
}

/** All colour tokens in a CSS value, with parsed colours. */
export function coloursIn(value) {
  const out = [];
  const re = new RegExp(COLOUR_TOKEN_RE.source, 'gi');
  let m;
  while ((m = re.exec(String(value)))) {
    const c = parseColour(m[0]);
    if (c) out.push({ token: m[0], colour: c });
  }
  return out;
}

export function toHsl({ r, g, b }) {
  const rn = r / 255; const gn = g / 255; const bn = b / 255;
  const max = Math.max(rn, gn, bn); const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0; let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) * 60;
    else if (max === gn) h = ((bn - rn) / d + 2) * 60;
    else h = ((rn - gn) / d + 4) * 60;
  }
  return { h, s: s * 100, l: l * 100 };
}

export function toLab({ r, g, b }) {
  const lin = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  const R = lin(r); const G = lin(g); const B = lin(b);
  const X = (R * 0.4124564 + G * 0.3575761 + B * 0.1804375) / 0.95047;
  const Y = (R * 0.2126729 + G * 0.7151522 + B * 0.0721750) / 1.0;
  const Z = (R * 0.0193339 + G * 0.1191920 + B * 0.9503041) / 1.08883;
  const f = (t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const fx = f(X); const fy = f(Y); const fz = f(Z);
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

export function chroma(colour) {
  const { a, b } = toLab(colour);
  return Math.sqrt(a * a + b * b);
}

/** CIEDE2000 colour difference (kL = kC = kH = 1). */
export function deltaE2000(c1, c2) {
  return deltaE2000Lab(toLab(c1), toLab(c2));
}

/** CIEDE2000 on CIELAB inputs {L, a, b}. */
export function deltaE2000Lab(l1, l2) {
  const rad = Math.PI / 180;
  const C1 = Math.hypot(l1.a, l1.b); const C2 = Math.hypot(l2.a, l2.b);
  const Cm = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)));
  const a1 = (1 + G) * l1.a; const a2 = (1 + G) * l2.a;
  const C1p = Math.hypot(a1, l1.b); const C2p = Math.hypot(a2, l2.b);
  const h = (a, b) => { if (a === 0 && b === 0) return 0; const v = Math.atan2(b, a) / rad; return v < 0 ? v + 360 : v; };
  const h1 = h(a1, l1.b); const h2 = h(a2, l2.b);
  const dL = l2.L - l1.L; const dC = C2p - C1p;
  let dh = 0;
  if (C1p * C2p !== 0) { dh = h2 - h1; if (dh > 180) dh -= 360; else if (dh < -180) dh += 360; }
  const dH = 2 * Math.sqrt(C1p * C2p) * Math.sin((dh / 2) * rad);
  const Lm = (l1.L + l2.L) / 2; const Cmp = (C1p + C2p) / 2;
  let hm = h1 + h2;
  if (C1p * C2p !== 0) { hm = Math.abs(h1 - h2) > 180 ? (h1 + h2 + (h1 + h2 < 360 ? 360 : -360)) / 2 : (h1 + h2) / 2; }
  const T = 1 - 0.17 * Math.cos((hm - 30) * rad) + 0.24 * Math.cos(2 * hm * rad) + 0.32 * Math.cos((3 * hm + 6) * rad) - 0.20 * Math.cos((4 * hm - 63) * rad);
  const dTheta = 30 * Math.exp(-(((hm - 275) / 25) ** 2));
  const Rc = 2 * Math.sqrt(Cmp ** 7 / (Cmp ** 7 + 25 ** 7));
  const Sl = 1 + (0.015 * (Lm - 50) ** 2) / Math.sqrt(20 + (Lm - 50) ** 2);
  const Sc = 1 + 0.045 * Cmp; const Sh = 1 + 0.015 * Cmp * T;
  const Rt = -Math.sin(2 * dTheta * rad) * Rc;
  return Math.sqrt((dL / Sl) ** 2 + (dC / Sc) ** 2 + (dH / Sh) ** 2 + Rt * (dC / Sc) * (dH / Sh));
}

/** WCAG 2.x relative luminance and contrast ratio. */
export function luminance({ r, g, b }) {
  const lin = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function contrastRatio(c1, c2) {
  const a = luminance(c1); const b = luminance(c2);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}
