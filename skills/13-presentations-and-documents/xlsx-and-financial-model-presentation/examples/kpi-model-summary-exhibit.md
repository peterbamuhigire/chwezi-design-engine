# Example: Worked Exhibit Spec — "Maduuka FY2026 KPI & Model Summary"

A full, concrete application of `references/xlsx-design-system.md` and
`references/exhibit-and-print-layout.md` to a real sheet: a **one-page board exhibit** summarising
Maduuka's FY2026 operating model — a budget-vs-actual KPI block, a 12-month revenue trend, and a
2-way price/volume sensitivity grid — handed out in the board pack (A4 landscape, also circulated as
PDF). This is what "state the choice, then apply real settings" produces; copy the settings directly.

**Scope note (read first):** everything below is **presentation**. The model's formulas, the
budget logic, the sensitivity calculation, and the accounting treatment of the numbers were built
and signed off in the finance engine (`C:\wamp64\www\chwezi-accounting-doctrine`); this exhibit only
dresses the signed-off result. Nothing here changes a number's meaning.

---

## 0. Type, palette & encoding intent (stated first, per the charter)

> **Numeric body & headers:** Public Sans (headers/labels) + JetBrains Mono for the figure columns —
> Excel does not expose OpenType `tnum`, so the mono face supplies **equal-width lining figures**
> and columns stack cleanly; both chosen from `04-technical-data-code`. **Accent:** Maduuka green `#0B3D2E` for one
> emphasis only; **negative cue:** `[Red]` + parentheses. **Conditional-encoding palette:** a single-hue green tint ramp for
> the sensitivity heatmap (light `#EAF4EE` → `#0B3D2E`), data-bar accent `#2E7D55`, icon set = the
> 3-**shape** flag set (▲ ► ▼), never coloured dots. All colour-blind-safe (green-only ramp + shape
> + number); greyscale-tested for the printed pack. Rejected: Calibri/Aptos (Excel default = slop),
> rainbow 3-colour scale (chart-junk), red+green RAG by colour alone (fails WCAG 1.4.1).

Premium scan: `fonts/04-technical-data-code/` held no purchased family for this job, so the Public
Sans + JetBrains Mono baseline stands.

---

## 1. Block A — Budget-vs-Actual KPI table (number formats + cell styles)

Layout: rows = KPI, columns = `Budget | Actual | Var | Var % | Status`. The header row is
`Center Across Selection` over the table title; gridlines off; one hairline rule above the totals.

| KPI | Column | Number-format mask | Cell style (colour) |
|---|---|---|---|
| Revenue (UGX m) | Budget | `$* #,##0,,_);[Red]$* (#,##0,,)` — `$` on this top row, scaled to millions | `Input` (blue `#1F4E78`, tint `#EAF1FA`) — budget is a typed assumption |
| Revenue | Actual | `#,##0,,_);[Red](#,##0,,)` — no `$` on interior, scaled to m | `Calc` (black `#1A1A1A`) — links from the ledger |
| Revenue | Var | `#,##0,,_);[Red](#,##0,,)` | `Calc` |
| Revenue | Var % | `+0.0%;[Red]-0.0%;"–"` — the **`+`/`−` sign is the non-colour cue** | `Calc` |
| Gross margin | Var % | `+0.0%;[Red]-0.0%;"–"` | `Calc` |
| DSO | Actual | `#,##0 "days"` | `Calc` |
| EV/EBITDA | Actual | `0.0 "x"` | `Calc` |
| **Total opex** | (row) | `$* #,##0,,_);[Red]$* (#,##0,,)` — `$` returns on the **total** row | `Total` (black bold, top hairline `#0B3D2E` 0.75 pt) |

Conventions applied: `$` only on the **first data row and the total**; **one decimal per column**
(revenue 0 dp at millions, margins 1 dp); negatives **parenthesised + red** (two cues); units
(`days`, `x`) in the mask; zero variance shows as `–`. Budget inputs are **blue + faint tint**;
everything computed is **black** — a reader sees the assumptions at a glance.

### Status column — icon set AS threshold encoding

- Mechanism: **3-icon SHAPE set** ▲ (on/above target) ► (within 5%) ▼ (below) — shapes differ, so
  the cue is **not colour-alone**; the green/amber/red tint is secondary.
- Thresholds set **explicitly** on Var %: ▲ if `≥ 0`, ► if `≥ −0.05`, else ▼ (not the percentile
  default).
- The Var % number stays visible beside the icon (third cue). Inline legend in the footer:
  "▲ on/above budget · ► within 5% · ▼ below".

---

## 2. Block B — Revenue magnitude column (data bars AS magnitude encoding)

A `Revenue by region` mini-table beside Block A, 6 rows. Encoding choice: **data bars** — an in-cell
sorted-bar surrogate for "which region is biggest".

- **Solid** fill `#2E7D55` (gradient off, cleaner), thin border off, **Max set explicitly** to the
  largest region (auto would distort if one region is an outlier).
- **The number stays in the cell** (bar + value) — bar **length** is the non-colour cue; greyscale-
  safe because length survives B&W.
- Rows **sorted descending** so the bars read top-to-bottom like a horizontal bar chart.
- One encoding only on this range — no colour scale or icon set stacked on top.

---

## 3. Block C — Price × Volume sensitivity grid (colour scale AS heatmap)

A 2-way data table: rows = price change (−10%…+10%), columns = volume change (−10%…+10%), cells =
resulting EBITDA. Encoding: **colour scale / heatmap** for a continuous field across a matrix.

- **Two-colour single-hue ramp** light `#EAF4EE` → accent `#0B3D2E` (low→high EBITDA) — **not** the
  default red-yellow-green rainbow; tinted endpoints keep the cell numbers at **≥ 4.5:1** contrast.
- **EBITDA number shown in every cell** (`#,##0,,"m"`) — the value is the non-colour cue; the centre
  (base case) cell carries a bold ring/border so the reader anchors there.
- Legend below the grid: "Lighter = lower EBITDA, darker green = higher; base case outlined."
- Greyscale check: the single-hue ramp degrades to a clean light→dark grey gradient — still reads.

---

## 4. Embedded chart — 12-month revenue: budget vs actual (styled for integrity)

A **combo column+line** chart (actual revenue columns + cumulative-vs-budget line), applying
`12-data-viz-and-dashboards/data-visualization` inside Excel:

- **Zero baseline** on the columns (Axis min = 0) — no false comparison.
- **No 3-D, no stacked-line-as-trend, no secondary-axis puzzle** — the cumulative line is labelled
  directly at its end point.
- **Actual vs forecast second cue:** actual months = **solid** `#0B3D2E` columns; the remaining
  forecast months = **hollow/outlined** columns in the same hue (cue = fill, not colour) with the
  forecast region faintly shaded.
- **Decluttered:** chart border and background removed, gridlines thin light grey, **direct end-
  labels** instead of a legend, grey base + the one green accent.
- **Action title:** "Actual revenue tracked 4% ahead of budget through May" (the "so what", not
  "Revenue 2026").
- Formatting **pasted across** the companion charts so the exhibit set is consistent.

---

## 5. Print / exhibit layout (applied)

- Trim **A4 landscape**; one idea per page — this is a single board exhibit.
- **Print area** set explicitly over Blocks A–C + the chart; manual page break excludes the working
  detail sheet.
- **Scale:** fit **width = 1 page**, height automatic; effective body text **8.5 pt** (above the
  legibility floor — not shrunk further).
- **Centred horizontally**; margins 0.6 in; **gridlines off** in print (hairline rules carry
  structure).
- **Header:** "Exhibit 3 — Maduuka FY2026 KPI & Model Summary". **Footer:** "Source: Management
  accounts; as of 31 May 2026 · Private & Confidential — Board Draft · Page &[Page] of &[Pages]".
- **Greyscale pass:** icon shapes, data-bar lengths, parenthesised negatives, dashed/hollow forecast
  columns, and the single-hue heatmap all survive B&W. Verified in Print Preview → greyscale.
- **Tabs:** `Cover` (green) → `Exhibit` (green tint) → `Detail/Working` (muted grey), named and
  ordered; cover sheet lists the exhibits and the as-of date.

---

## 6. One-paragraph rationale (per the charter)

> Public Sans labels with JetBrains Mono figures on a near-black/Maduuka-green palette, with a single green accent,
> presents the signed-off FY2026 model as a board-grade exhibit. Each conditional encoding is matched
> to its signal — **data bars** for regional magnitude, a **single-hue heatmap** for the sensitivity
> matrix, a **shape-based icon set** for budget status — every one paired with the number and a
> non-colour cue, AA-contrast and greyscale-safe. Negatives are parenthesised and red; `$` appears
> only on top rows and totals; inputs are blue, formulas black. **All calculation, budget, and
> accounting logic was built and approved in the finance engine; this exhibit changed presentation
> only.** Rejected the Excel Calibri default, rainbow scales, and colour-only RAG.
