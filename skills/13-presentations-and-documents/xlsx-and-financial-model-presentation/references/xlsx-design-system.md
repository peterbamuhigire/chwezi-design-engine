# Reference: XLSX Design System — number formats, cell/table styles, conditional-format-as-encoding

The exhibit-grade design layer for a spreadsheet. **Presentation only** — number-format syntax,
named styles, the model-readability colour convention, and conditional formatting used as a
deliberate visual encoding. **Formula, pivot, macro, and accounting-correctness mechanics are out
of scope** and defer to the finance engine (`C:\wamp64\www\chwezi-accounting-doctrine`) and the
engineering catalog (`~/.claude/skills`). Authority is `doctrine/design-doctrine.md` and
`doctrine/references/wcag-2.2-criteria.md`; the number-format and model-convention seam is sourced
from *Advanced Excel for Productivity* (2016), supplemented with current data-bar/icon-set guidance
the book lacks.

---

## 1. Exhibit-grade number formatting

Number formatting is the single loudest professionalism signal in a model. **Consistency is the
rule** — one currency convention, one decimal count per column, one negative style throughout. A
column that mixes `1,234.5` and `1235` reads as unconsidered.

### 1.1 Custom-format grammar (the four sections)

A custom format has up to four `;`-separated sections:

```
positive ; negative ; zero ; text
```

If you supply one section it applies to all numbers; two = positive/zero then negative; three =
positive ; negative ; zero. Core tokens:

| Token | Meaning |
|---|---|
| `0` | **Required** digit — shows even as a leading/trailing zero (use for decimals you always want) |
| `#` | **Optional** digit — shows only if significant (use for thousands so small numbers stay clean) |
| `,` | Thousands separator (after the last `#`/`0`); a trailing `,` **scales by 1000** (`#,##0,` shows thousands) |
| `.` | Decimal point |
| `%` | Multiply by 100 and append `%` |
| `"text"` | Literal text — e.g. units `0.0 "x"`, `0 "days"`, `#,##0 "k"` |
| `_)` | Insert a space the width of `)` — aligns positives with parenthesised negatives |
| `*` | Repeat next char to fill the cell (e.g. `$* #,##0` pushes `$` left, number right — the accounting look) |
| `[Red]`, `[Blue]` | Colour the section (one of 8 named colours, or `[Color56]`) |

### 1.2 The exhibit conventions (apply these by default)

- **Accounting negatives — parentheses, not minus, and red:** the standard exhibit mask is

  ```
  #,##0.0_);[Red](#,##0.0)
  ```

  Negatives render as `(1,234.5)` in red; the `_)` on the positive section reserves a `)`-width
  space so the digits line up vertically. (Red is the colour *cue*; the parentheses are the
  **non-colour cue** — both carry the sign, so a colour-blind or greyscale reader still sees it.)
- **`$` (or currency) on the top data row and on totals only.** Repeating the currency symbol on
  every interior row is visual noise. Format the first row of a block and every total/subtotal with
  a currency mask (`$* #,##0.0_);[Red]$* (#,##0.0)`); format the interior rows with the plain
  comma mask. The reader infers the column is money from the top and the rule.
- **Units live in the format, not in a separate column or the cell text:**
  `0.0 "x"` (multiples), `0 "days"` (DSO/ageing), `0.0%` (ratios as %), `#,##0 "units"`,
  `#,##0,, "m"` (scale to millions with an `m` suffix). The cell still holds the raw number, so it
  sorts and feeds formulas.
- **One decimal count per column.** Pick the precision the audience needs (0 dp for headline
  revenue, 1 dp for margins, 2 dp for per-share) and hold it down the whole column.
- **Zero as a dash** to quiet empty cells: the third section `-` or `"–"` →
  `#,##0.0_);[Red](#,##0.0);"–"_)`. The em/en dash reads cleaner than `0.0` for a true blank.
- **Dates as words, not slashes,** for exhibits: `mmm yyyy` → `Jun 2026`; `d mmm yyyy` →
  `21 Jun 2026`. Avoid locale-ambiguous `mm/dd/yy`.
- **Leading-zero IDs / zip / phone:** use a format mask (`00000`, `000-000-0000`), never a leading
  apostrophe text hack, so the value stays numeric where it must.

### 1.3 Worked masks (copyable)

| Use | Mask |
|---|---|
| Currency, top row / totals | `$* #,##0_);[Red]$* (#,##0)` |
| Currency, interior rows | `#,##0_);[Red](#,##0)` |
| Currency in thousands | `$* #,##0,_);[Red]$* (#,##0,)` (note trailing `,` scales /1000) |
| Margin / ratio % | `0.0%_);[Red](0.0%)` |
| Multiple (e.g. EV/EBITDA) | `0.0 "x"` |
| Days (DSO, ageing) | `#,##0 "days"` |
| Variance with sign cue | `+0.0%;[Red]-0.0%;"–"` (the `+`/`-` is the non-colour cue) |
| Zero shown as dash | `#,##0.0_);[Red](#,##0.0);"–"_)` |
| Month axis | `mmm yyyy` |

---

## 2. The model-readability colour convention (blue input / black formula)

The near-universal financial-modelling tell, and a genuine accessibility aid (it lets a reviewer
see *what is an assumption* without clicking each cell):

| Cell role | Font colour | Cell style name |
|---|---|---|
| **Hard-coded input / assumption** (a number typed by a human) | **Blue** (`#1F4E78` / a strong blue) | `Input` |
| **Formula / calculated output** | **Black** (`#1A1A1A`, a tinted near-black, not pure `#000`) | `Calc` / `Formula` |
| **Link to another sheet** | Green (optional, `#1E7A46`) | `Link` |
| **Total / subtotal** | Black, **bold**, top hairline rule | `Total` |
| **Note / caveat** | Grey italic (`#6A6A6A`) | `Note` |

Rules: blue is **only** for typed inputs; the instant a cell becomes a formula it goes black.
Because blue-vs-black also differs in **weight context and position** (inputs cluster in assumption
blocks), the convention is not colour-alone, but for full WCAG 1.4.1 safety in a shared model,
shade input cells with a faint tint (`#EAF1FA`) as the second cue. Define these as **named cell
styles** so they apply in one click and restyle globally.

---

## 3. Table & cell-style system

- **Use named cell styles, never ad-hoc formatting.** Header, Input, Calc, Total, Note, Section —
  defined once, applied everywhere, restyle in one place (the spreadsheet analogue of the DOCX
  named-style rule).
- **Excel Tables (Ctrl+T) for tabular data:** gives a styled header row, banded shading, and a
  consistent style token. Pick a **restrained banded style** (faint tint band, no heavy borders) or
  build your own table style — not the loud default blue.
- **`Center Across Selection`, never Merge Cells**, for spanning titles and group headers. Merging
  breaks sort, copy/paste, fill, navigation (arrow keys), and the accessibility tree;
  `Center Across Selection` (Format Cells → Alignment → Horizontal) gives the same centred look with
  none of the damage.
- **Gridlines off** for any exhibit (View → uncheck Gridlines). Default gridlines are screen
  scaffolding, not design; replace them with **deliberate hairline rules** only where they aid
  reading — a rule above totals, a light band between sections. Less ink, more signal (Tufte data-
  ink; see `data-visualization`).
- **Never hide rows or columns** to make a summary look clean — a hidden row is a trap (the
  Lehman/Barclays acquisition footnote, where hidden rows were unintentionally included). **Group &
  collapse** (outline) instead, or build a dedicated summary sheet that *references* the detail.
- **Alignment & whitespace:** numbers right-aligned, text left, headers matching their column;
  generous row height (≥ 18 px) and column padding; indent sub-items one level under their parent.
- **Tabular figures:** choose a numeric face whose digits are **tabular/lining** (equal-width) so
  decimal points and digits stack vertically down a column — JetBrains Mono, Fira Code and most 04
  Technical/Data faces qualify; proportional-figure faces make columns ragged.

---

## 4. Conditional formatting AS visual encoding (the core idea)

Conditional formatting is not decoration — it is a **second visual channel** layered onto the
numbers. Choose the mechanism by **what the number means**, use **one encoding per table**, always
**pair it with a legend and a non-colour cue**, and keep it restrained (the doctrine "grey base +
one signal" rule, `ai-slop-taxonomy.md`).

### 4.1 Pick the mechanism by signal

| You want to show… | Mechanism | How to set it well | Non-colour cue (mandatory, WCAG 1.4.1) |
|---|---|---|---|
| **Magnitude of each value in a list** (a sorted-bar surrogate in-cell) | **Data bars** | Show the **number too** (bar + value); set a sensible Max (not auto if outliers distort); single accent hue; solid fill, thin or no border; use the **gradient-off** solid style for cleaner reading | The bar **length** *is* the cue; for +/− use the two-colour axis with the axis at zero |
| **A field across a whole matrix** (sensitivity table, cohort grid, heatmap) | **Colour scale** | **Two-colour single-hue ramp** (light→accent) or a diverging tint with a neutral mid — **never the default red-yellow-green rainbow**; tinted endpoints, not saturated | Add the **number** in each cell; optionally a sparse contour/label on the extremes |
| **Threshold / RAG status** (on/off target, pass/warn/fail) | **Icon sets** | Use a **3-icon shape set whose shapes differ** (e.g. ▲ ► ▼ or circle/triangle/diamond), not three coloured dots; set explicit thresholds (don't trust percentile defaults) | The **shape itself** is the non-colour cue; still show the value beside it |
| **A single rule fires** (top-N, duplicates, breaches) | **Highlight rule** | One subtle fill or a bold weight + a marker glyph | A glyph/asterisk or bold, not fill-colour alone |

### 4.2 Encoding rules (every time)

- **Match channel to data type** (inherited from `data-visualization`): **length/position**
  (data bars) for quantitative magnitude; **intensity** (colour scale) for ordinal/continuous;
  **shape** (icon set) for categorical/threshold. Never use hue to carry magnitude (no rainbow for
  order — use a single-hue ramp).
- **Never colour-alone (WCAG 1.4.1).** ~8% of men have red-green CVD; print and projectors mangle
  hue. Every CF distinction carries a second cue — the **bar length**, the **shape**, the **number
  in the cell**, or a **+/−/▲▼ sign**. Use **blue + orange** (or tint + sign), never red+green as
  the sole signal.
- **Contrast (`wcag-2.2-criteria.md`):** the fill behind text must keep the text at **≥ 4.5:1**;
  data marks/bars **≥ 3:1** vs background and vs adjacent cells. Tinted fills (light) keep dark text
  legible; saturated fills do not — pick tints. Design with APCA, certify with the WCAG ratio.
- **Legend it.** A conditional encoding with no key is a guess. Add a small inline legend
  (the icon meanings, the scale endpoints, the bar max) near the table or in the footer.
- **Restraint:** one encoding per table; do not stack data bars + colour scale + icon set on the
  same range. The doctrine "one strong intentional choice beats five hedged ones."
- **Colour-blind-safe scales:** source the actual ramps from `color-system-and-palette` /
  Okabe-Ito / ColorBrewer "colorblind-safe"; test in a CVD simulator and in greyscale before
  shipping (greyscale matters because exhibits get printed B&W).

---

## 5. Chart styling inside Excel (apply, don't re-derive)

Charts in a model exhibit follow `12-data-viz-and-dashboards/data-visualization` — this section is
only the Excel-specific application:

- **Zero baseline on bar/column charts** (Format Axis → Minimum = 0); a non-zero base is a false
  comparison. Line charts may use a non-zero base if made obvious.
- **No 3-D**, ever (Excel's 3-D adds floor/side chart-junk and skews perception); no
  **stacked-line-as-trend** (misleading); avoid the **secondary axis** as a puzzle — label the
  second series directly or split into a second chart sharing the x-axis.
- **Actual vs projected:** distinguish with a **second cue** — solid line/fill for actual, **dashed
  or hollow** for forecast — not colour alone; shade the forecast region faintly.
- **Combo charts** (column + line) for two related measures (e.g. revenue bars + margin line) when
  the comparison genuinely needs it.
- **Declutter:** remove the chart border and background fill, thin/light or no gridlines, direct
  labels instead of a distant legend, grey base + one accent, an **action title** ("Q3 revenue beat
  budget by 12%", not "Revenue"). **Copy formatting across a chart set** (paste special → formats)
  so a series of exhibits is visually consistent.
- **Sparklines** (in-cell mini line/column/win-loss) for a trend column beside the numbers — a
  compact small-multiple; keep one accent, mark the last point.

---

## 6. QA checklist (presentation only)

- [ ] One currency convention; `$` on top row + totals only; one decimal per column.
- [ ] Negatives in **parentheses + red** (both cues), zeros as dash where appropriate.
- [ ] Units in the format mask; dates as `mmm yyyy`, not ambiguous slashes.
- [ ] Inputs **blue (+ faint tint)**, formulas **black**, totals bold with a rule — via named styles.
- [ ] `Center Across Selection` used for titles; **no merged cells**.
- [ ] **Gridlines off**; deliberate hairline rules only; **no hidden rows** (group/collapse instead).
- [ ] Numeric face has **tabular figures**; numbers right-aligned and stacked.
- [ ] Exactly **one** conditional encoding per table, chosen by signal, **legended**, with a
      **non-colour cue**, single-hue/diverging (no rainbow), AA contrast, greyscale-safe.
- [ ] Charts: zero baseline, no 3-D, no stacked-line-as-trend, actual-vs-projected second cue,
      action title, decluttered, consistent across the set.
- [ ] No calculation/formula/accounting logic was altered — if it was, route to the finance engine.
