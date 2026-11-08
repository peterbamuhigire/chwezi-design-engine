---
name: chart-selection-and-encoding
description: Use when choosing a chart type and honest encoding for comparison, trend, distribution, relationship, part-to-whole, or geography. Use data-visualization for decluttering and storytelling after selection, and dashboard-and-data-product-design for multi-chart products.
metadata:
  portable: true
  category: 12-data-viz-and-dashboards
  compatible_with:
  - claude-code
  - codex
---

# Chart Selection & Encoding — Pick the Right Chart, Then Encode It Honestly

Before any decluttering or colour craft, one decision dominates everything downstream:
**which chart type does this data and this message actually call for?** A beautifully
decluttered pie chart is still the wrong chart. This skill routes **data-type × message** to a
concrete chart type, then verifies the encoding is honest (zero baselines, no dual-axis
fabrication) and accessible (non-colour cues, contrast, text alternatives). It is the *upstream*
selection decision; the sibling `data-visualization` owns the *downstream* craft of drawing the
chart you picked.

<!-- dual-compat-start -->
## Use When

- You must **choose a chart type** for a dataset and a message — and the message is one of:
  **comparison, trend over time, distribution, part-to-whole, relationship/correlation, or
  geographic**.
- You are **reviewing or fixing** a chart whose *type* is wrong for its job (pie for ranking,
  dual-axis combo, 3-D bars, gauge, rainbow heatmap) and need the correct replacement.
- You need to confirm the **encoding is honest**: zero baseline on length encodings, no
  secondary y-axis, scale not clipped to manufacture a story.
- You need the **accessibility gate** for the chosen chart: non-colour cues, contrast floors,
  text alternative / data table.

## Do Not Use When

- The chart **type is already settled** and you need the *craft* of drawing it well —
  decluttering (data-ink ratio, gridline/border removal), the grey-base + one-accent colour
  rule, preattentive hierarchy, annotation phrasing, or Knaflic's storytelling lessons. Use the
  sibling **`data-visualization`** (it owns the six lessons, the Cleveland–McGill perceptual
  ranking in `references/chart-encoding.md`, and the per-chart checklist).
- The question is **page-level**: which KPIs earn the top row, dashboard zoning, drill-down,
  cross-filter, or real-time/streaming UX → use **`dashboard-and-data-product-design`**.
- It is a generic **grid/spacing/layout** question (not chart-specific) → use the layout-grid
  skill; or a **colour-ramp construction** question → use `color-system-and-palette`.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Decision question, audience, and intended comparison | Analyst or decision owner | yes | One-sentence message |
| Data types, grain, units, ranges, and uncertainty | Validated dataset | yes | Field profile and quality notes |
| Medium and accessibility constraints | Delivery owner | yes | Size, interaction, colour, and assistive requirements |

- The **data type(s)** of the variables to show: quantitative (amount), ordinal (ranked),
  categorical/nominal (identity), temporal (time), or geographic.
- The **message in one sentence** — what must the reader *see or do*? ("Region A outsells B,"
  "revenue is trending up," "these two variables move together," "spending is over budget.")
- The **number of series / categories**, and whether values share **one common scale**.
- The **medium** (live presentation vs circulated PDF vs interactive) and **viewport** — these
  change whether you label directly, split, or re-encode.

## Workflow

1. **Name the message-type first.** Classify the message as one of the six:
   **comparison · trend · distribution · part-to-whole · relationship · geographic**. The
   message — not the data shape alone — drives the chart. Per `doctrine/design-doctrine.md` §2,
   state the chosen chart and *why it fits this message* before drawing anything.
2. **Route data-type × message → chart type.** Load `references/chart-fit-decision.md` and use
   its routing table to land on a concrete chart (e.g. ranked comparison of categories →
   **sorted horizontal bar**; trend of one continuous series → **line**; part-to-whole →
   **100% stacked bar or sorted bar**, never pie). The table also lists the **banned defaults**
   and their correct replacements.
3. **Check the encoding is on the right channel.** Confirm the *most important comparison* sits
   on the highest-accuracy channel available — position > length > angle > area > intensity >
   hue. This is the Cleveland–McGill ranking; the full treatment lives in the sibling
   `data-visualization/references/chart-encoding.md` §1 — cite it, don't restate it. If your
   chosen type pushes the key comparison onto angle/area (pie, donut, 3-D), re-route in step 2.
4. **Apply axis/scale honesty (Mackinlay expressiveness).**
   - **Length encodings (bars) require a zero baseline.** A non-zero baseline expresses a false
     ratio (the Fox-News 460%-vs-13% case). No exceptions for bars.
   - **Line/dot (position) charts may use a clipped scale** *if labelled clearly and not
     over-zoomed* — position encodes change truthfully without a zero baseline.
   - **Dual-axis ban.** Never put two series on a primary + secondary y-axis: it lets you
     manufacture any crossover by choosing the scales (non-expressive). Replace with **two
     panels sharing one x-axis** (small multiples) or **direct-label** the second series.
5. **Annotate the takeaway.** Give the chart an **action title** stating the so-what ("Q3
   revenue exceeded target by 12%," not "Q3 Revenue"), title every axis, and call out the one
   key point directly on the chart. A chart that needs a paragraph to interpret is the wrong
   chart or is under-annotated.
6. **Run the accessibility gate** (`doctrine/references/wcag-2.2-criteria.md`, and the chart a11y
   floor in `data-visualization/references/chart-encoding.md` §5):
   - **Never colour-alone (WCAG 1.4.1).** Back every colour distinction with a non-colour cue —
     direct label, dash pattern, marker shape, texture, or +/− sign. Use **blue (positive) +
     orange (negative)**, never red+green, plus a sign/arrow.
   - **Contrast:** data marks ≥ **3:1** vs background *and* vs adjacent marks (1.4.11); chart
     text ≥ **4.5:1** (≥3:1 for ≥24px / ≥18.66px-bold) (1.4.3). Design with APCA, certify with
     the WCAG ratio.
   - **Colour-blind-safe palette** (Okabe–Ito / ColorBrewer "colorblind-safe"); ordered data
     uses a single-hue ramp, never rainbow. Test in a CVD simulator.
   - **Text alternative:** informative `alt`/caption (the action title seeds it) + ideally a
     backing data table (1.1.1); interactive points keyboard-reachable, name/role/value (4.1.2),
     targets ≥ **24×24px** (2.5.8); honour `prefers-reduced-motion`; usable at 320px / 200% zoom.

## Decision Rules
| Condition | Encoding choice | Wrong-choice failure |
|---|---|---|
| A series of related charts shows the same measure (districts, quarters, products) | Lock the same axis maximum and scale across the whole series | Auto-scaled axes make unequal values look equal and mislead readers |
| Pictograms or icons stand for quantities | Size or count symbols to the true values, never by area guesswork | Symbol area exaggerates differences |
| Compare magnitudes | Common-baseline position or sorted bars | Area/angle impairs comparison |
| Show change over ordered time | Line or aligned small multiples | Categories imply false continuity |
| Show distribution | Histogram, box, violin, or dot plot | Averages hide spread and outliers |
| Scales or units differ | Separate aligned panels | Dual axes manufacture correlation |

## Capability Contract
Read and search are required for data definitions and delivery constraints. Editing is allowed only when chart production is requested. Execution is required for calculations and rendering claims; publication requires separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without validated data, produce a conditional chart recommendation using a labelled schema. Stop before final encoding when units, grain, or decision question are unknown; mark all unrendered accessibility and scale checks unverified.

## Anti-Patterns

- **Picking the chart from the data shape alone**, ignoring the message — the same table is a
  bar (comparison) or a line (trend) depending on what you want the reader to see.
- **Pie / donut for a comparison or ranking** — forces the key comparison onto angle/area (the
  worst-decoded channels). Replace with a sorted horizontal bar.
- **Dual-axis combo chart** — two scales chosen to fake a correlation. Split into panels or
  label directly.
- **3-D bars/pies, gauges, speedometers, rainbow heatmaps** — chart-junk that degrades the
  encoding (doctrine `ai-slop-taxonomy.md` "dashboard decoration").
- **Non-zero bar baseline** — visually inflates differences; a truthfulness failure, not a style
  choice.
- **Too many series on one chart** ("spaghetti") — re-route to small multiples or emphasise one
  line; that re-routing is *this* skill's job, the line-styling craft is the sibling's.
- **Meaning carried by colour alone** — fails CVD readers and greyscale print.
- **Descriptive title with no annotation** — "Revenue by Region" instead of the takeaway.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Chart-selection decision record | Analyst and designer | Message, data relationship, chosen chart, and rejected alternatives are explicit |
| Encoding and scale specification | Chart implementer | Channels, axes, units, uncertainty, and accessibility cues are defined |
| Integrity check record | Reviewer | Baselines, denominators, missingness, colour, and labels pass or are flagged |

- A **chart-selection decision**: the message-type, the chosen chart type with the data-type ×
  message reason, the named encoding channel for the key comparison, the axis/scale honesty
  ruling (zero baseline / clipped-OK / dual-axis split), the annotation plan (action title +
  callout), and the WCAG 2.2 a11y gate result. Hand the chosen type to `data-visualization` for
  the drawing craft.

## Examples

- `examples/chart-selection-cases.md` — six worked good/bad selection cases, one per message-type
  (ranking pie→sorted bar; trend dual-axis→split panels; distribution stacked-bar→histogram/box;
  part-to-whole pie→100% stacked bar; relationship grouped-bar→scatter; geographic 3-D map→
  choropleth), each routed through the data-type × message logic with the honesty and a11y
  reasoning. Copy the *reasoning pattern*, never the numbers. Never lorem.

## References


- [chwezi-reporting-and-dashboards-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-reporting-and-dashboards-standard/SKILL.md) (binding for Chwezi reporting surfaces: chart choice by question, greyscale-legible print charts, data-table alternative, no 3D).
- `skills/09-design-systems-tokens-and-theming/component-library-architecture/references/design-system-operating-model.md` §7 (after Knaflic, *Storytelling with Data*) — audience/action framing, Big Idea, decluttering, direct labelling, and text-alternative requirements.

- `doctrine/design-doctrine.md` — the Mission (authored, human-made charts) and the Anti-Slop
  Charter; the chart type is a *stated, defensible* choice, never a reflexive default.
- `doctrine/references/wcag-2.2-criteria.md` — the accessibility floor (contrast, 1.4.1 use of
  colour, target size, reflow, reduced-motion) every chosen chart must clear.
- `doctrine/references/ai-slop-taxonomy.md` — the chart-junk / "dashboard decoration" tells (3-D,
  gauges, rainbow, donut) this skill routes away from.
- **Sibling — `12-data-viz-and-dashboards/data-visualization`** — owns the **single-chart craft**:
  the Cleveland–McGill perceptual ranking (`references/chart-encoding.md`), decluttering, the
  grey-base + one-accent colour rule, preattentive hierarchy, annotation craft, and Knaflic's six
  lessons. **This skill owns the chart-TYPE selection that comes first**; cite that ranking,
  don't restate it, and hand off the chosen type for drawing.
- **Sibling — `12-data-viz-and-dashboards/dashboard-and-data-product-design`** — owns page-level
  composition (KPI tiers, zoning, drill-down, cross-filter, real-time UX) above the single chart.
- `references/chart-fit-decision.md` — the data-type × message → chart-type routing table, the
  banned-default → replacement map, and the selection decision checklist.
<!-- dual-compat-end -->
