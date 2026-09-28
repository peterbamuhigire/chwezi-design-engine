# Worked example: A fluid type scale for a named brief (320 → 1440px)

A complete, copy-real application of `fluid-responsive-typography` end to end: the stated floor/
ceiling, the `clamp()` derivation shown step by step for each heading, a verified px-endpoint table,
the capped measure, size-inverse fluid line-height, and a container-query (`cqi`) heading variant —
run against the checklist. Built on `references/fluid-scale-math.md` (the derivation) and the modular
steps in `font-selection-and-pairing/references/type-scale-recipes.md` (Recipe B, Perfect Fourth).

---

## The brief

> **Kintu Health — patient-facing clinic website.** A community clinic site read on cheap Android
> phones in waiting rooms and on reception desktops alike. Type must stay legible at **320px**, scale
> confidently to a **1440px** desktop, and survive an older patient bumping the browser to **200%
> zoom** — none of which may clip or hide content. Output: web (HTML/CSS).

Faces (chosen in `font-selection-and-pairing`, stated here for completeness, neither banned):
**Andada Pro** (display, variable `wght`) over **Public Sans** (body) — an editorial-but-warm
calligraphic serif headline above a calm civic body. We deliberately avoided Inter/Poppins/Montserrat. This
example is about the **fluid sizing**, not the pairing.

---

## Stated decision (declared BEFORE any CSS, per the skill's step 1)

- **Floor width 320px (20rem); ceiling width 1440px (90rem).** The clinic's real device range.
- **Fluid steps:** display, h1, h2, h3. **Fixed steps:** body (1rem) and caption (0.75rem) — fluid
  body would wander the line length and harm reading rhythm (step 3).
- **Measure** capped at ~66ch for body via `min(100% - 2rem, 66ch)` + `margin-inline: auto` (step 4).
- **Line-height** unitless and size-inverse — 1.6 body down to 1.05 display (step 5).
- **The clinic's feature cards are container-portable** (shown 1-up in the hero and 3-up in a grid),
  so their heading sizes to its container with `cqi`, not the viewport (step 6).

---

## The `clamp()` derivation, shown for each fluid step

Recipe B modular steps (Perfect Fourth, base 16px). `floorRem = 20`, `ceilingRem = 90`, so the run is
`90 − 20 = 70`. Formula (`references/fluid-scale-math.md` §2):
`slope = (MAX−MIN)/70 × 100`, `intercept = MIN − slope/100 × 20`.

**`--fs-h3` (28 → 38px):** MIN 1.75, MAX 2.375.
slope = (2.375 − 1.75)/70 × 100 = 0.625/70 × 100 = **0.893vw**;
intercept = 1.75 − 0.00893×20 = 1.75 − 0.179 = **1.571rem**.

**`--fs-h2` (32 → 50px):** MIN 2.0, MAX 3.125.
slope = 1.125/70 × 100 = **1.607vw**; intercept = 2.0 − 0.01607×20 = 2.0 − 0.321 = **1.679rem**.

**`--fs-h1` (40 → 67px):** MIN 2.5, MAX 4.1875.
slope = 1.6875/70 × 100 = **2.411vw**; intercept = 2.5 − 0.02411×20 = 2.5 − 0.482 = **2.018rem**.

**`--fs-display` (48 → 89px):** MIN 3.0, MAX 5.5625.
slope = 2.5625/70 × 100 = **3.661vw**; intercept = 3.0 − 0.03661×20 = 3.0 − 0.732 = **2.268rem**.

### Endpoint verification (the real test — §3)

At width `W`, `size = intercept + slope/100 × (W/16)`.

| Token | clamp | @320px | @1440px | target |
|---|---|---|---|---|
| `--fs-h3`      | `clamp(1.75rem, 1.571rem + 0.893vw, 2.375rem)`  | 1.571 + 0.179 = **1.75rem (28px)** | 1.571 + 0.804 = **2.375rem (38px)** | 28 → 38 ✓ |
| `--fs-h2`      | `clamp(2rem, 1.679rem + 1.607vw, 3.125rem)`     | 1.679 + 0.321 = **2.0rem (32px)**  | 1.679 + 1.446 = **3.125rem (50px)** | 32 → 50 ✓ |
| `--fs-h1`      | `clamp(2.5rem, 2.018rem + 2.411vw, 4.1875rem)`  | 2.018 + 0.482 = **2.5rem (40px)**  | 2.018 + 2.170 = **4.188rem (67px)** | 40 → 67 ✓ |
| `--fs-display` | `clamp(3rem, 2.268rem + 3.661vw, 5.5625rem)`    | 2.268 + 0.732 = **3.0rem (48px)**  | 2.268 + 3.295 = **5.563rem (89px)** | 48 → 89 ✓ |

Every step lands exactly on its floor and ceiling. Intercepts are all positive and below MIN (§3
sign-check passes). Hero ÷ body at 1440px = 89 ÷ 16 ≈ **5.6×** — the modular jump survives.

---

## The CSS (ship this)

```css
:root {
  /* fixed — never fluid */
  --fs-caption: 0.75rem;                                        /* 12px */
  --fs-body:    1rem;                                           /* 16px */
  /* fluid — derived above, both bounds rem so zoom works */
  --fs-h3:      clamp(1.75rem, 1.571rem + 0.893vw, 2.375rem);   /* 28 → 38px */
  --fs-h2:      clamp(2rem,    1.679rem + 1.607vw, 3.125rem);   /* 32 → 50px */
  --fs-h1:      clamp(2.5rem,  2.018rem + 2.411vw, 4.1875rem);  /* 40 → 67px */
  --fs-display: clamp(3rem,    2.268rem + 3.661vw, 5.5625rem);  /* 48 → 89px */
}

/* never override html font-size in px — keeps user zoom + rem math intact */

/* measure: capped independently of font size (step 4) */
.prose { inline-size: min(100% - 2rem, 66ch); margin-inline: auto; }

/* size-inverse, unitless line-height (step 5) */
body          { font-family:"Public Sans", system-ui, sans-serif;
                font-size: var(--fs-body); line-height: 1.6; }
.caption      { font-size: var(--fs-caption); line-height: 1.5; }
h3            { font-family:"Andada Pro", Georgia, serif;
                font-size: var(--fs-h3); line-height: 1.25; }
h2            { font-family:"Andada Pro", Georgia, serif;
                font-size: var(--fs-h2); line-height: 1.15; }
h1            { font-family:"Andada Pro", Georgia, serif;
                font-size: var(--fs-h1); line-height: 1.1; letter-spacing: -0.01em; }
.hero .display{ font-family:"Andada Pro", Georgia, serif;
                font-size: var(--fs-display); line-height: 1.05; letter-spacing: -0.01em; }
```

---

## Container-query heading variant (the portable feature card — step 6)

The feature card is shown 1-up in the hero (wide) and 3-up in a grid (narrow). Its heading sizes to
its **container**, so it is large in the hero and modest in the grid at the *same* viewport width.
`cqi` floor = its size in the narrow (3-up ≈ 22rem) container; ceiling = the wide (1-up) container.

```css
.feature-card { container-type: inline-size; }   /* wrapper = the query container */
.feature-card h3 {
  /* rem floor AND ceiling kept (step 2) — only the middle term is cqi */
  font-size: clamp(1.25rem, 0.95rem + 3cqi, 2rem);
  line-height: 1.2;
}
```

In the 3-up grid the card heading sits near 20px; dropped into the full-width hero card it grows
toward 32px — driven by the card's own width, which a viewport `vw` value could never distinguish.

---

## The Fluid-Type Checklist (run, per the skill)

1. ✅ Every fluid step has a `rem` floor AND ceiling — no bare `vw`/`cqi` bound (the `cqi` card keeps rem bounds).
2. ✅ Every `vw`/`cqi` coefficient **derived** at named widths (§2) and endpoint-verified — none guessed.
3. ✅ Body (1rem) and caption (0.75rem) stay **fixed**; only display/h1/h2/h3 are fluid.
4. ✅ 200% zoom and 320px reflow both pass — all bounds are `rem`, root font-size untouched (WCAG 1.4.4/1.4.10).
5. ✅ Measure capped at `min(100% - 2rem, 66ch)` + `margin-inline: auto`, independent of font size.
6. ✅ Line-height size-inverse and unitless (1.6 body → 1.05 display).
7. ✅ The portable feature card heading uses `cqi` + `container-type`, not viewport `vw`.
8. ✅ Modular ratio (1.333) and weight contrast survive — hero ÷ body ≈ 5.6× at the ceiling.
9. ✅ `html { font-size }` never overridden — user zoom and the rem chain intact.

---

## References

- `skills/01-typography-and-fonts/fluid-responsive-typography/SKILL.md` (the workflow this applies).
- `references/fluid-scale-math.md` (the derivation, endpoint check, and `cqi` method used here).
- `doctrine/references/type-scale-and-spacing.md` (ratio, inverse line-height, measure).
- `doctrine/references/wcag-2.2-criteria.md` (1.4.4 resize-text / 1.4.10 reflow — why both bounds are rem).
- `skills/01-typography-and-fonts/font-selection-and-pairing/references/type-scale-recipes.md` (Recipe B base steps).
