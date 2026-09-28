---
name: xlsx-and-financial-model-presentation
description: Use when presenting an XLSX financial model, KPI sheet, or analytical exhibit through number formats, styles, conditional encoding, charts, and print layout. Use accounting or engineering skills for formulas, pivots, macros, calculation logic, and financial correctness.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# XLSX And Financial-Model Presentation
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- A spreadsheet — financial model summary, KPI dashboard sheet, schedule, sensitivity table,
  budget-vs-actual, cohort/ageing table — must be **presented** as a considered, institutional
  exhibit rather than a default Calibri grey-grid worksheet.
- The sheet needs **exhibit-grade number formatting** (custom masks, three-part
  `positive;negative;zero`, accounting parentheses + red negatives, the `$`-on-top-row-and-totals
  convention, units in the format, consistent decimals) so the numbers read as authored.
- You want **conditional formatting used as deliberate visual encoding** — data bars, icon sets,
  colour scales / heatmaps — chosen to match magnitude vs threshold vs category, used with
  restraint, paired with a legend and a **non-colour cue**.
- The model needs the **blue-input / black-formula** readability convention, a named **table &
  cell-style system**, gridlines off, never-hide-rows discipline, and `Center Across Selection`
  instead of merged cells.
- An embedded **chart** must be styled for integrity (zero baseline, no 3-D, no stacked-line-as-
  trend, actual-vs-projected colour with a second cue), or the workbook must be laid out for
  **print as a hand-out exhibit** (print area, fit-to-page floor, centre-on-page, header/footer,
  tab colour-coding).
- The deliverable is an `.xlsx` (or a printed/PDF exhibit *from* one) — not a slide, not a Word
  report, not a web dashboard.

## Do Not Use When

- **The work is formula / calculation / pivot / macro / model MECHANICS** — building the model
  logic, writing formulas, structuring pivots, dynamic arrays, XLOOKUP, Power Query, data
  validation, what-if/Solver/Goal-Seek, scenario engines, VBA/Office-Scripts automation, or the
  *accounting correctness* of the numbers. **This skill owns only how the model is dressed and
  presented; it explicitly defers all calculation and modelling mechanics** to the finance engine
  (`C:\wamp64\www\chwezi-accounting-doctrine`, for IFRS/IAS statement structure, statutory and
  bookkeeping correctness) and to the engineering catalog (`~/.claude/skills`) for spreadsheet
  engineering / automation. If the request is "build/fix the model", route there first; return
  here only to present the result.
- The file must be **created or programmatically read/written** as a build task (open, parse, emit
  `.xlsx`/`.csv` via a library) — use the `xlsx` document skill for the tooling; come here for the
  *design* settings it should apply.
- The **chart's encoding choice itself** (which chart, perceptual ranking, dashboard page
  composition) is the question — that is `12-data-viz-and-dashboards/data-visualization` (the
  individual chart) and `dashboard-and-data-product-design` (the page). This skill applies those
  rules *inside Excel*; it does not restate the chart-choice theory.
- The deliverable is a **Word report** (`docx-report-and-document-formatting`), a **slide deck**
  (`deck-system`), or a **branded PDF proposal** (`pdf-proposal-and-bankable-document-design`).
- **No typeface / palette has been chosen** — state it first via `font-selection-and-pairing`
  (group 01) and the doctrine charter, then return here.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Validated workbook and calculation-owner sign-off | Finance or analytical owner | yes | Controlled workbook and review status |
| Audience, key decisions, outputs, and print needs | Sponsor | yes | Exhibit brief |
| Input/formula/output conventions and brand rules | Model and design owners | yes | Style contract |

- The sheet's purpose, audience, and medium (on-screen review vs printed board hand-out vs PDF
  exhibit) — this sets decimals, density, and whether a print layout is warranted.
- The data's structure: which cells are **hard-coded inputs/assumptions** vs **formula outputs**
  vs **totals** (needed to apply the blue/black convention and the `$`-row convention), and the
  units/scale (actuals, thousands, millions, %, ratios, days).
- A stated type + palette choice per the charter: a **04 Technical / Data** face for the numeric
  body (tabular/lining figures), an accent colour for emphasis, and a colour-blind-safe scale for
  any conditional encoding — never a banned default, never red+green as the only signal.
- For charts/print: the comparison the chart must make, and the trim/orientation for the exhibit.

## Workflow

1. **State the type, palette, and encoding intent first.** Per the Anti-Slop Charter
   (`doctrine/design-doctrine.md` §2), name the numeric face (a **04 Technical / Data** family with
   **tabular lining figures** so columns align — e.g. JetBrains Mono for figure columns with Public Sans for headers, or
   a workhorse with tabular figures from `doctrine/references/font-groups-and-usage.md`), the single
   accent colour, and — if you will encode with conditional formatting — *which* signal (magnitude /
   threshold / category) and the colour-blind-safe scale, **before** touching the sheet. Scan
   `fonts/04-technical-data-code/` for a purchased family and prefer it when it improves the result.
   Never default to Calibri/Aptos (the slop signal of an unconsidered workbook).
2. **Set exhibit-grade number formats.** Apply the custom-mask system in
   `references/xlsx-design-system.md`: required-vs-optional digits (`0` vs `#`), thousands
   separators, the **three-part `positive;negative;zero`** mask, **accounting parentheses + red for
   negatives**, the **`$` (or currency) on the top data row and on totals only** (blank or aligned
   elsewhere to cut noise), units in the format (`0.0 "x"`, `0 "days"`, `0.0%%` for points), date
   masks (`mmm yyyy`), and one consistent decimal count per column. Consistency is the
   professionalism signal — do not let a column mix 2-dp and 0-dp.
3. **Apply the table & cell-style system.** Per `references/xlsx-design-system.md`: define named
   **cell styles** (Input, Formula/Calc, Total, Header, Note) carrying the **blue font = hard-coded
   input/assumption, black = formula** convention; use **`Center Across Selection`** (not Merge) for
   spanning titles so navigation/copy/sort stay intact; turn **gridlines off** and use deliberate
   hairline rules and banded shading instead; align numbers right with consistent padding; **never
   hide rows** to make an exhibit (group/collapse instead — the Lehman/Barclays cautionary tale).
4. **Use conditional formatting AS visual encoding — with restraint and a non-colour cue.** Per
   `references/xlsx-design-system.md`: pick the mechanism by signal — **data bars** for in-cell
   magnitude (a sorted-bar surrogate; show the number too, set a sensible max), **colour scales /
   heatmaps** for a continuous field across a matrix (single-hue ramp, not rainbow; tinted
   endpoints), **icon sets** for threshold/RAG status (always pair the icon with text/number — a
   shape is itself the non-colour cue). One encoding per table; add a legend; honour WCAG 1.4.1
   (never colour-alone) and the 3:1 / 4.5:1 contrast floors (`doctrine/references/wcag-2.2-criteria.md`).
   Use **blue + orange** (or tint + sign), never red+green as the sole distinction.
5. **Style any embedded chart for integrity.** Apply `references/xlsx-design-system.md` chart rules
   (which inherit `12-data-viz-and-dashboards/data-visualization`): **zero baseline on bars**, **no
   3-D**, **no stacked-line-as-trend**, distinct **actual-vs-projected** treatment carrying a second
   cue (solid vs dashed, not colour alone), direct labels over distant legends, thin light gridlines
   or none, grey base + one accent, an **action title**. Defer the *choice* of chart and the
   perceptual ranking to that sibling; here you only apply it in Excel.
6. **Lay out for print / PDF exhibit (when it will be handed out).** Per
   `references/exhibit-and-print-layout.md`: set an explicit **print area** (and named multi-block
   areas), use **Page Break Preview**, scale to fit **with a legibility floor** (never shrink below
   ~8 pt effective — split the exhibit instead), **centre on page**, set repeating header rows
   (`Print Titles`), a header/footer (title, source/as-of date, page x of y, confidentiality),
   margins trimmed, and **colour-code worksheet tabs** for navigation. Set a print **palette that
   survives greyscale** (the non-colour cue earns its keep here).
7. **Accessibility & QA pass.** Verify: no colour-only encoding (every CF distinction has a
   shape/sign/label); text and data-mark contrast meet 4.5:1 / 3:1; numeric face has tabular
   figures so columns align; tables have a real header row and simple non-merged structure;
   workbook/sheet titles and a descriptive document title set; alt text on charts/images; one
   consistent decimal and currency convention throughout; gridlines-off exhibit still reads via
   deliberate rules. Then sanity-check that you have **not** strayed into calculation logic — if you
   changed a formula or a number's meaning, stop and route to the finance engine.

## Decision Rules
| Condition | Workbook presentation choice | Wrong-choice failure |
|---|---|---|
| Cell is user input | Distinct named input style plus validation | Colour alone or inconsistency causes accidental edits |
| Variance needs attention | Direction-aware format plus non-colour cue | Red/green alone excludes users and misstates favourable direction |
| Sheet is an executive exhibit | Curate outputs and print area | Exposing calculation sprawl obscures the decision |

## Capability Contract
Read, edit, recalculate, and render are required for workbook production. Analysis of formulas remains read-only unless explicitly authorised. External links, macros, financial logic, and distribution require separate authority and domain review.

## Degraded Mode
Without spreadsheet recalculation or rendering, produce a style and print specification marked unverified. Stop release when formulas show errors, links are stale, print pages clip, or financial-owner approval is absent.

## Anti-Patterns

- Shipping the **default Calibri grey-grid**: visible gridlines as the only structure, no number
  formatting, currency repeated on every interior row, mixed decimals down a column — the
  recognisable signature of an unconsidered workbook.
- **Conditional formatting as decoration**: rainbow colour scales, three different CF rules stacked
  on one table, data bars with no number, icon sets carrying RAG status **by colour alone** (fails
  WCAG 1.4.1), traffic-light red+green with no shape or label.
- **Merged cells** for titles/spanning (breaks sort, copy, navigation, and the accessibility tree) —
  use `Center Across Selection`.
- **Hiding rows/columns** to manufacture an exhibit (the Lehman/Barclays footnote) — group/collapse
  or build a dedicated summary sheet instead.
- Losing the **blue-input/black-formula** tell, so a reader cannot see what is an assumption vs a
  result; or hard-coding a number on top of a formula in black.
- **Chart-integrity violations** carried into Excel: non-zero bar baseline, 3-D, stacked-line-as-
  trend, secondary axis used as a puzzle, actual-vs-forecast distinguished by hue alone.
- **Straying into mechanics**: "improving" the model by rewriting formulas, pivots, or the
  accounting — that is the finance/engineering engine's job, not this skill's.
- Fit-to-page shrinking the exhibit into illegibility instead of splitting it.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Styled workbook and exhibit sheets | Analysts and decision-makers | Inputs, formulas, outputs, units, and hierarchy are distinguishable |
| Named style, format, chart, and print specification | Workbook maintainers | Rules are reusable without manual cell-by-cell formatting |
| Recalculation and rendered-page evidence | Finance owner and QA | Errors, links, charts, conditional formats, and print pages pass |

- An `.xlsx` (and/or a print/PDF exhibit from it) with **exhibit-grade number formats** applied
  consistently (custom masks, accounting negatives, `$`-on-top-and-totals, units, one decimal per
  column).
- A **named table & cell-style system** carrying the **blue-input/black-formula** convention,
  gridlines-off with deliberate rules, `Center Across Selection` titles, never-hidden rows.
- **Conditional formatting used as deliberate encoding** (data bars / icon sets / colour scale)
  chosen to match the signal, restrained, legended, and carrying a **non-colour cue** at AA contrast.
- **Integrity-styled charts** (zero baseline, no 3-D, actual-vs-projected with a second cue, action
  title) and, where handed out, a **print-ready exhibit layout** (print area, fit-floor, centre,
  repeating headers, footer, greyscale-safe palette, tab colour-coding).
- A one-paragraph **choice rationale** (numeric face, accent, and the encoding-signal mapping), per
  the charter — and an explicit note that calculation/model mechanics were deferred to the finance
  engine.

## Examples

- `examples/kpi-model-summary-exhibit.md` — a fully worked exhibit spec for a real **FY model
  summary / KPI sheet**: every column's number-format mask, the input/formula/total cell-style map,
  a data-bar + icon-set + heatmap encoding (each with its non-colour cue and legend), a
  budget-vs-actual combo chart styled for integrity, and the print layout — copy the settings
  directly. Never lorem.

## References

- `doctrine/design-doctrine.md` — the Mission and Anti-Slop Charter; state the choice, prefer the
  authored exhibit over the default grid, sourcing-authority asymmetry.
- `doctrine/references/ai-slop-taxonomy.md` — the chart-junk / dashboard-decoration tells (3-D,
  rainbow scales, gauges) this skill rejects.
- `doctrine/references/wcag-2.2-criteria.md` — the accessibility floor: contrast 4.5:1 / 3:1, and
  never colour-alone (1.4.1) — the basis for the non-colour-cue rule on all conditional encoding.
- `doctrine/references/font-groups-and-usage.md` — the **04 Technical / Data** baseline faces with
  tabular lining figures for aligned numeric columns.
- `references/xlsx-design-system.md` — the number-format mask system, named cell/table styles, the
  blue-input/black-formula convention, and conditional-formatting-as-encoding (data bars / icon
  sets / colour scales) with non-colour cues.
- `references/exhibit-and-print-layout.md` — print area, fit-to-page legibility floor, centre-on-
  page, repeating headers, header/footer, greyscale-safe palette, tab colour-coding.
- **Sibling — `12-data-viz-and-dashboards/data-visualization`** owns the chart-choice + perceptual
  ranking + accessible-chart floor this skill *applies* inside Excel; defer encoding theory to it.
- **Defer to — finance engine** `C:\wamp64\www\chwezi-accounting-doctrine` (IFRS/IAS, statement
  structure, statutory/bookkeeping correctness) and the **engineering catalog** `~/.claude/skills`
  (spreadsheet engineering/automation) for **all formula / pivot / macro / model-calculation
  mechanics** — this skill is presentation-only.
<!-- dual-compat-end -->
