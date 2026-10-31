# Worked Example: Semantic Mapping Across Light, Dark, and a Second Brand

The same system as `tokens.json`, read as a role-mapping table — the artefact you hand to
engineering. It shows the one fact that makes a token system worth building: **components reference
semantic role names; only the semantic→primitive aliases move across themes.** Brand "Maduuka"
(indigo-leaning-blue, hue ~255); second brand "KesiLex" (green, hue ~150).

The component column never changes. The light/dark/KesiLex columns are the *only* thing a theme
re-points. Primitives are authored once; components are authored once.

---

## Colour role map

| Semantic role | Light (default) | Dark | KesiLex (brand) | Notes |
|---|---|---|---|---|
| `surface.default` | `neutral.50` `oklch(0.985 0.004 255)` | `neutral.950` `oklch(0.17 0.010 255)` | = Maduuka | dark is near-dark grey carrying the hue, **not** `#000` |
| `surface.raised` | `neutral.0` (lightest) | `neutral.800` (**lighter** than page) | = Maduuka | in dark, "raised" reads as a lighter surface, not a deeper shadow |
| `text.default` | `neutral.900` | `neutral.50` | = Maduuka | role name identical; alias flips |
| `text.muted` | `neutral.600` | `neutral.400` | = Maduuka | |
| `text.on-action` | `neutral.0` | `neutral.950` | `neutral.0` | foreground on the primary action |
| `text.link` | `brand.700` (255) | `brand.300` (255) | `green.700` (150) | only KesiLex changes the hue |
| `border.focus` | `brand.600` | `brand.400` | `green.500` | must clear 3:1 vs adjacent surface in **every** column |
| `action.primary.bg` | `brand.600` `oklch(0.55 0.17 255)` | `brand.400` `oklch(0.67 0.14 255)` | `green.700` `oklch(0.48 0.12 150)` | dark accent **lightened + desaturated**; KesiLex re-hued and darkened so the white label clears 4.5:1 (`green.500` gives 3.4:1) |
| `feedback.error.fg` | `red.700` | `red.700` | = Maduuka | status hues are brand-independent here |

**What didn't change:** every component token (`button.primary.bg → action.primary.bg`,
`card.padding → space.inset-lg`, …). One button definition serves light, dark, and both brands.

---

## The contrast gate, re-verified per theme (not assumed)

Light passing does **not** imply dark passing — each pairing is re-checked. (Floors:
body/small ≥ 4.5:1; large text & UI/icons/focus ≥ 3:1 — `doctrine/references/wcag-2.2-criteria.md`.)

| Pairing | Light | Dark | KesiLex (light) | Verdict |
|---|---|---|---|---|
| `text.default` on `surface.default` | 16.9:1 | 18.2:1 | 16.9:1 | PASS AAA |
| `text.muted` on `surface.default` | 7.1:1 | 7.2:1 | 7.1:1 | PASS AAA |
| `text.on-action` on `action.primary.bg` | 4.8:1 | 6.3:1 | 6.0:1 | PASS AA |
| `text.link` on `surface.default` | 6.6:1 | 9.5:1 | 5.9:1 | PASS AA |
| `border.focus` ring on `surface.default` | 4.7:1 | 6.3:1 | 3.3:1 | PASS (≥3:1 UI) |

Every cell ≥ its floor in every theme. A token set that *can* produce a failing cell is a bug, not
a style choice — the dark accent was lightened from `brand.600`→`brand.400` precisely to keep the
`text.on-action` pairing above 4.5:1 once the surface went dark. The light-theme label has the
least headroom (4.8:1). The figures are computed from the `hex` fallbacks in `tokens.json`, and
`scripts/validate_token_example.py --check-contrast-claims` recomputes them, so a changed colour
that breaks a claim fails the check instead of leaving a stale number behind.

---

## How a theme switches at runtime (CSS)

Only semantic vars are emitted; the attribute selector re-points them. Components read the vars.

```css
:root                      { --color-action-primary-bg: oklch(0.55 0.17 255); }  /* light */
[data-theme="dark"]        { --color-action-primary-bg: oklch(0.67 0.14 255); }  /* re-point */
[data-brand="kesilex"]     { --color-action-primary-bg: oklch(0.62 0.15 150); }  /* re-point */

.button-primary { background: var(--color-action-primary-bg); }  /* never edited */
```

Set `data-theme` / `data-brand` on `<html>` (or any subtree) and the whole system re-skins with no
component changes and no second stylesheet. That is the entire payoff of the three-tier model.
