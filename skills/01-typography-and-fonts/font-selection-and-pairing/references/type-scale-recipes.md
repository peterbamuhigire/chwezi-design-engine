# Reference: Type-Scale Recipes (concrete px/rem scales + fluid `clamp()` + variable axes)

Ready-to-paste scales, not theory. Each recipe is a real, named modular scale with px **and**
rem values, a matching line-height and weight plan, and a `clamp()` fluid version. Builds on
`doctrine/references/type-scale-and-spacing.md` (the principles: ratio ≥1.25, real jumps,
inverse line-height, weight extremes) — this file turns those principles into numbers you can ship.

**2026 standards injected here:** **fluid `clamp()` scales** (one value spans phone→desktop, no
breakpoints) and **variable-font axes** (`wght`, `opsz`, `slnt`/`ital`, `GRAD`) so one file
carries the whole hierarchy. Cite this file from the skill's step 6.

---

## How to read a recipe

A modular scale multiplies the base by a **ratio** for each step up, divides for each step down.
`step(n) = base × ratio^n`. Round to whole px for UI; keep rem at 3 decimals. All rem assume the
browser root of **16px** (`1rem = 16px`) — never override the root font-size (breaks user zoom).

---

## Recipe A — Editorial, Major Third (1.250), base 18px

For long-form documents/reports where the body wants to be a touch larger than UI. Confident but
not theatrical.

| Token | Step | px | rem | line-height | weight |
|---|---|---|---|---|---|
| `--fs-caption` | −1 | 14 | 0.875 | 1.6 | 400 |
| `--fs-body`    |  0 | 18 | 1.125 | 1.6 (≈29px) | 400 |
| `--fs-h5`      |  1 | 22 | 1.375 | 1.45 | 600 |
| `--fs-h4`      |  2 | 28 | 1.750 | 1.35 | 600 |
| `--fs-h3`      |  3 | 35 | 2.188 | 1.25 | 700 |
| `--fs-h2`      |  4 | 44 | 2.750 | 1.15 | 700 |
| `--fs-h1`      |  5 | 55 | 3.438 | 1.10 | 800 |
| `--fs-display` |  6 | 69 | 4.313 | 1.05 | 900 |

Hero(69)÷body(18) ≈ **3.8×** — a real jump, not timid. Tracking: −0.01em on h1/display, 0 on body.

---

## Recipe B — Product/SaaS, Perfect Fourth (1.333), base 16px

For landing pages and product UI that need a strong, contemporary hierarchy.

| Token | Step | px | rem | line-height | weight |
|---|---|---|---|---|---|
| `--fs-caption` | −1 | 12 | 0.750 | 1.5 | 500 |
| `--fs-body`    |  0 | 16 | 1.000 | 1.6 (≈26px) | 400 |
| `--fs-h5`      |  1 | 21 | 1.333 | 1.4 | 600 |
| `--fs-h4`      |  2 | 28 | 1.777 | 1.3 | 600 |
| `--fs-h3`      |  3 | 38 | 2.369 | 1.2 | 700 |
| `--fs-h2`      |  4 | 50 | 3.157 | 1.1 | 800 |
| `--fs-h1`      |  5 | 67 | 4.209 | 1.05 | 800 |
| `--fs-display` |  6 | 89 | 5.610 | 1.0 | 900 |

Hero(89)÷body(16) ≈ **5.6×** — deliberately dramatic for a hero headline. Cap ~3 sizes per section.

---

## Recipe C — Dense UI / Dashboard, Minor Third (1.200), base 14px

For data-dense admin/developer surfaces where vertical room is scarce. The minimum acceptable
ratio (1.20) keeps steps distinguishable without wasting space. Never go below 12px.

| Token | Step | px | rem | line-height | weight |
|---|---|---|---|---|---|
| `--fs-micro`   | −1 | 12 | 0.750 | 1.4 | 500 |
| `--fs-body`    |  0 | 14 | 0.875 | 1.55 | 400 |
| `--fs-label`   |  1 | 17 | 1.050 | 1.4 | 600 |
| `--fs-h4`      |  2 | 20 | 1.260 | 1.3 | 600 |
| `--fs-h3`      |  3 | 24 | 1.512 | 1.25 | 700 |
| `--fs-h2`      |  4 | 29 | 1.814 | 1.2 | 700 |
| `--fs-h1`      |  5 | 35 | 2.177 | 1.15 | 800 |

Smaller ratio is correct here: a dashboard with a 5.6× jump wastes the fold. Pair weight extremes
(800 h1 vs 400 body) to keep hierarchy obvious even with small size gaps.

---

## The fluid `clamp()` scale (2026 default for web)

A fluid step is `clamp(MIN, PREFERRED, MAX)`:
- **MIN** = the size at the smallest viewport (use `rem` so zoom works).
- **MAX** = the size at the largest viewport (use `rem`).
- **PREFERRED** = a `rem + vw` line that interpolates between them.

Derive PREFERRED so the type hits MIN at 360px (22.5rem) and MAX at 1240px (77.5rem):

```
slope (vw coeff) = (MAX − MIN) / (77.5 − 22.5) × 100
intercept (rem)  = MIN − slope/100 × 22.5
PREFERRED        = {intercept}rem + {slope}vw
```

Fluid version of **Recipe B** (h1 16→67px, h2 fluid, body fixed). Worked numbers:

```css
:root {
  /* body stays fixed — fluid body text harms reading rhythm */
  --fs-body:   1rem;                                   /* 16px */
  --fs-h3:     clamp(1.75rem, 1.477rem + 1.21vw, 2.369rem);   /* 28 → 38px */
  --fs-h2:     clamp(2rem,    1.341rem + 2.93vw, 3.157rem);   /* 32 → 50px */
  --fs-h1:     clamp(2.5rem,  1.466rem + 4.6vw,  4.209rem);   /* 40 → 67px */
  --fs-display:clamp(3rem,    1.6rem  + 6.2vw,  5.61rem);     /* 48 → 89px */
}
h1 { font-size: var(--fs-h1); line-height: 1.05; }
```

Rules that keep `clamp()` honest:
1. **rem floor AND ceiling** — never a bare `vw` bound, or 200% zoom breaks (WCAG 1.4.4).
2. **Don't fluid-scale body copy** — keep `--fs-body` a fixed `rem`; fluid body harms line length.
3. **Test the two extremes**, not just one viewport — read at 360px and at 1240px+.
4. Generate, don't guess: [utopia.fyi](https://utopia.fyi) emits this math; verify the px endpoints.

---

## Variable-font axes (one file, the whole hierarchy)

A variable font carries many instances in one file via axes. Drive them from CSS so the scale
above needs only **one** `@font-face`, cutting requests and enabling smooth weight contrast.

| Axis | Tag | What it does | Typical use |
|---|---|---|---|
| Weight | `wght` | 1–1000 stroke thickness | the primary contrast lever — 300 body vs 800 display |
| Optical size | `opsz` | tunes shapes for size | bind to font-size so large = tighter, small = sturdier |
| Slant | `slnt` | mechanical oblique (degrees) | subtle emphasis without a second file |
| Italic | `ital` | true italic 0/1 | real italic for editorial body |
| Grade | `GRAD` | weight w/o reflow | dark-mode optical fix; don't shift layout |
| Width | `wdth` | condensed↔expanded | tighten dense labels without size change |

```css
@font-face {
  font-family: "Recursive";
  src: url("recursive.woff2") format("woff2-variations");
  font-weight: 300 900;            /* register the supported range */
  font-display: swap;
}
:root { font-optical-sizing: auto; }                 /* browser ties opsz to size */
h1 { font-variation-settings: "wght" 820, "opsz" 36; }/* heavy + large-optical */
body { font-variation-settings: "wght" 380; }         /* light body → weight contrast */
.dark h1 { font-variation-settings: "GRAD" 50; }      /* +grade in dark mode, no reflow */
```

Notes:
- Prefer the high-level properties (`font-weight`, `font-optical-sizing`) when they exist; reserve
  `font-variation-settings` for axes with no CSS property (`GRAD`, custom). Don't set both for the
  same axis — `font-variation-settings` wins and resets the others.
- A variable font enables the **weight extremes** the doctrine demands (300 vs 800) from one file —
  use that, don't ship five static weights.
- Approved variable faces among the baselines: Source Serif 4 (`opsz`,`wght`), Recursive, Public Sans, Hanken Grotesk, Bricolage Grotesque, Andada Pro
  (`wght`). None are on `ai-slop-banned-fonts.md`.

---

## References

- `doctrine/references/type-scale-and-spacing.md` (the principles these recipes implement).
- `doctrine/references/pairing-principles.md` (which faces carry which step).
- `skills/01-typography-and-fonts/font-selection-and-pairing/references/pairing-catalog.md`.
- `skills/01-typography-and-fonts/font-selection-and-pairing/examples/applied-type-scale.md`.
- `doctrine/references/ai-slop-banned-fonts.md` (verify no step uses a banned face).
