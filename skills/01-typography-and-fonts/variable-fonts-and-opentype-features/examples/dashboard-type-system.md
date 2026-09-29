# Worked Example: Variable + OpenType type system for an analytics/finance dashboard

A real, applied type-mechanics spec for a single product. The faces are already chosen (this skill
runs *after* `font-selection-and-pairing`); here we wire the variable axes, optical sizing,
numerals, and OpenType features, with the full CSS.

---

## Brief

**Product:** "Ledger" — a treasury & cash-flow analytics dashboard (web app) for a finance team.
Dense data tables, KPI tiles with currency, sparklines with timestamps, and a short editorial
"insights" panel with narrative prose. Dark-mode is first-class.

**Stated pairing (carried in from `font-selection-and-pairing`, category 04 Technical/Data/Code):**

- **Display + UI + data:** **Recursive** — variable (`wght`, `slnt`, `MONO`, `CASL`), ships
  tabular numerals and a usable mono axis for the data layer. Chosen over a static grotesque
  because one file gives the weight extremes *and* a mono mode for figures/IDs.
- **Insights prose body:** **Source Serif 4** (Frank Grießhammer, Adobe) — variable (`opsz`, `wght`,
  with a separate variable italic file), ships old-style numerals and a real italic, so narrative
  numbers blend into lowercase text.
- Both are approved baselines, neither on `ai-slop-banned-fonts.md`. See
  `doctrine/references/font-groups-and-usage.md` (category 04 + editorial body).

## Axis plan

| Element | Face | Driven axis → property | Value |
|---|---|---|---|
| KPI numbers / table headers | Recursive | `wght` → `font-weight` | 760 (display contrast) |
| Table body / labels | Recursive | `wght` → `font-weight` | 420 |
| Mono figures (IDs, raw amounts) | Recursive | `MONO` → `font-variation-settings` | 1 |
| Insights H | Source Serif 4 | `wght` + `opsz` (auto) | 700, opsz←size |
| Insights body | Source Serif 4 | `wght` + `opsz` (auto) | 400, opsz←size |
| Any text, dark mode | Recursive | `GRAD` → `font-variation-settings` | +40 (no reflow) |

Optical sizing is wired to size globally (`font-optical-sizing: auto`); Source Serif 4 gets refined at
heading size and sturdier at caption size automatically.

## Numeral policy (the load-bearing decision)

- **Tables, KPI tiles, prices, timestamps, code/IDs:** `tabular-nums lining-nums` — columns align,
  digits sit at cap height next to capitals and currency symbols.
- **Insights prose:** `proportional-nums oldstyle-nums` — narrative figures blend into lowercase
  running text.
- Rationale per `references/opentype-features.md`: tabular is the correctness default for the data
  layer; old-style only inside lowercase prose, never in UI chrome.

## OpenType feature set

- **Standard ligatures:** on everywhere except the mono figures, where `font-variant-ligatures:
  none` keeps each glyph discrete.
- **Contextual alternates (`calt`):** asserted on the body — kept on.
- **One stylistic set:** Recursive `ss01` (single-storey `a`, simplified `l`) adopted as the UI
  signature — a stated, single choice, not all sets flipped on.
- **Small caps:** real `smcp` on column-group labels and acronyms (Recursive ships them). No faux.
- **Fractions:** `diagonal-fractions` on the "allocation" cells that show `1/4`, `3/8` of budget.

## The CSS

```css
/* one variable file per face — the performance lever */
@font-face {
  font-family: "Recursive";
  src: url("/fonts/recursive.woff2") format("woff2-variations");
  font-weight: 300 1000;
  font-display: swap;
}
@font-face {
  font-family: "Source Serif 4";
  src: url("/fonts/source-serif-4.woff2") format("woff2-variations");
  font-weight: 200 900;
  font-display: swap;
}

:root {
  --font-data: "Recursive", ui-monospace, "Public Sans", system-ui, sans-serif;
  --font-prose: "Source Serif 4", Georgia, serif;
  font-optical-sizing: auto;                 /* opsz ← font-size, both faces */
}

/* ---- data layer (Recursive) ---- */
.app { font-family: var(--font-data); font-weight: 420;
       font-feature-settings: "ss01" 1; }    /* one stylistic set = our signature */

.kpi__value,
.table th     { font-weight: 760; }          /* weight extreme via property, one file */

.table td,
.kpi__value,
.timestamp,
.code, .id    { font-variant-numeric: tabular-nums lining-nums; }  /* aligned, cap-height */

.id, .amount--raw {
  font-variation-settings: "MONO" 1;         /* custom axis: mono figures (no property exists) */
  font-variant-ligatures: none;              /* discrete glyphs for IDs */
}

.col-group-label,
.acronym      { font-variant-caps: small-caps; }      /* real smcp, not faux */
.alloc-cell   { font-variant-numeric: diagonal-fractions tabular-nums lining-nums; } /* 1/4, 3/8 */

/* ---- insights prose (Source Serif 4) ---- */
.insights        { font-family: var(--font-prose); font-weight: 400;
                   font-variant-numeric: proportional-nums oldstyle-nums; }
.insights h2     { font-weight: 700; }                /* opsz auto-refines at this size */
.insights em     { font-style: italic; }              /* real italic via ital, not slant */

/* ---- dark mode: grade up without reflow ---- */
.dark .app       { font-variation-settings: "ss01" 1, "GRAD" 40; }  /* list every non-default axis */
```

Notes tied to the references:

- `.dark .app` restates `"ss01" 1` alongside `"GRAD" 40` because `font-variation-settings` is
  all-or-nothing per element — omitting `ss01` there would reset it (`references/variable-axes.md`).
- `font-weight` drives `wght`; we never also write `"wght"` for the same element. `MONO` and `GRAD`
  have no CSS property, so they live in `font-variation-settings` only.
- Numerals are set explicitly in every data context — the default (proportional lining) would make
  the tables jitter.

## Performance result

- 2 requests (2 variable woff2) instead of ~8 static weight files; the weight range `300 1000`
  comes from one Recursive file. Per `doctrine/references/embedding-by-format.md`, prefer woff2 +
  one variable file + `font-display: swap`.
- If this also shipped as a PDF board pack, the *concepts* carry but the controls change — embed
  and **subset while preserving the `smcp`, `ss01`, `tnum`, `frac` feature tables** (subsetting can
  strip them; see `references/opentype-features.md` and `embedding-by-format.md`).

## Checklist run

1. Faces named with reason, both variable, neither banned. ✓
2. Axis plan stated; `font-weight`/`opsz` via properties, `MONO`/`GRAD` via `font-variation-settings`. ✓
3. Numeral policy stated per context (tabular-lining data; proportional-oldstyle prose). ✓
4. One stylistic set (`ss01`) adopted with a reason; real small caps; fractions where needed. ✓
5. One variable woff2 per face, range registered, `font-display: swap`. ✓
6. Subsetting note keeps the relied-on feature tables. ✓
