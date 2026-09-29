---
name: data-visualization
description: Use when crafting or reviewing an individual chart, analytical exhibit, or data story for perceptual accuracy, decluttering, annotation, accessibility, and narrative focus. Use chart-selection-and-encoding to choose the chart type and dashboard-and-data-product-design for page-level systems.
metadata:
  portable: true
  category: 12-data-viz-and-dashboards
  compatible_with:
  - claude-code
  - codex
---

# Data Visualization -- Storytelling with Data
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- Choosing or reviewing an **individual chart's encoding** — picking the chart type, mapping the key quantity to the most accurately decoded channel (Cleveland–McGill: position > length > angle > area > colour), enforcing zero baselines, sorting bars by value.
- Killing chart-junk on a specific exhibit: a pie/donut/3-D chart, a secondary y-axis, a spaghetti line graph, a rainbow scale, a legend stranded from its data, or diagonal axis labels.
- Making a chart **colour-blind-safe and WCAG-compliant** — replacing red/green with blue+orange plus a non-colour cue, hitting the 3:1 mark / 4.5:1 text contrast floor, adding captions/alt text and keyboard-reachable points.
- Turning a number or table into a **decision-ready exhibit**: applying Knaflic's context → visual → declutter → focus → design → story arc, writing an action title, and annotating the one insight that drives the call to action.
- Hand-building a custom chart in SVG/D3/CSS/JS, or adapting a chart to narrow mobile viewports.

## Do Not Use When

- The work is **page-level** dashboard composition — zone sequence, layout archetypes, KPI tiering, drill-down, cross-filtering, real-time UX. Use sibling `12-data-viz-and-dashboards/dashboard-and-data-product-design`; this skill owns the single chart inside a tile.
- You need the categorical/sequential **colour scales themselves** or the WCAG contrast tooling — those live in `02-color-brand-and-visual-identity/color-system-and-palette`; this skill only consumes them.
- The task is the **grid, alignment, or spacing rhythm** the exhibit sits on — defer to `03-layout-grid-and-composition/layout-grid-and-spacing`.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Decision question, audience, and key message | Analyst or decision owner | yes | One-sentence takeaway |
| Validated data, definitions, units, and uncertainty | Data owner | yes | Source and quality notes |
| Chosen chart type and delivery medium | `chart-selection-and-encoding` and publisher | yes | Selection record and size constraints |

- The **data and its types** (quantitative / ordinal / categorical, number of series, time vs. category x-axis) and the **single message** the chart must carry.
- The **audience and the decision/action** the exhibit should drive (who, what they must do) — the seed for the action title.
- The **medium**: live presentation vs. circulated document vs. mobile/320px, since it changes annotation, animation, and detail density.
- Brand colour constraints and the target contrast/accessibility bar (or confirmation to default to grey-base + blue accent, Okabe–Ito palette).

## Workflow
1. Confirm the decision, audience, data provenance, and single intended message.
2. Verify the chosen chart and encoding before styling.
3. Remove non-data ink, establish visual hierarchy, and annotate the evidence that matters.
4. Add uncertainty, source, unit, accessibility, and responsive behaviour.
5. Render at target sizes and test the stated takeaway. Stop release when source, scale, accessibility, or render evidence is unavailable; recover with a labelled table or conditional draft.

## Quality Standards
- Preserve denominators, baselines, missingness, uncertainty, and units.
- Prefer position and length over area, angle, volume, or decorative effects.
- Never rely on colour alone; include direct labels, patterns, shapes, or text alternatives.

## Decision Rules
| Condition | Craft choice | Wrong-choice failure |
|---|---|---|
| One series carries the message | Emphasise it and mute context | Equal visual weight obscures the takeaway |
| Exact lookup matters more than pattern | Add a table or direct values | A chart forces imprecise reading |
| Uncertainty affects the decision | Encode interval/range and explain it | Point estimates imply false certainty |
| Narrow viewport | Recompose, simplify, or provide scroll/table alternative | Mechanical shrinking destroys legibility |

## Capability Contract
Read and search are required for data, definitions, sources, and medium constraints. Editing is allowed only for requested production. Calculation and rendering are required for accuracy, accessibility, and responsive claims; publication requires separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without validated data, deliver a labelled specification or placeholder, not a factual chart. Without rendering, provide chart source and exact checks, mark the result unverified, and block publication where distortion or accessibility risk is material.

## Anti-Patterns
- **Decorative 3D:** use position or length on a flat common scale.
- **Rainbow categories:** use restrained colour plus direct labels or shapes.
- **Truncated quantitative axis without disclosure:** restore zero or explicitly justify the bounded range.
- **Unlabelled uncertainty:** show intervals, ranges, or caveats beside the estimate.
- **Chart junk and redundant legends:** remove decoration and label the evidence directly.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Decision-ready chart or analytical exhibit | Decision audience | Intended takeaway is accurate and identifiable without narration |
| Source, definition, annotation, and accessibility package | Publisher and reviewer | Units, provenance, uncertainty, text alternative, and colour-independent cues are present |
| Render and integrity evidence | QA and release owner | Target-size, responsive, contrast, and scale checks pass or are marked unverified |

- A **data visualisation review** applying the Knaflic framework, perceptual encoding rules, and
  accessible-chart floor to the dashboard, report, or chart under review.
- A chart spec, implementation guidance, review findings, templates, or generated artifacts when the task is creation rather than review.

## References

- `doctrine/design-doctrine.md` — the Mission and Anti-Slop Charter; charts must be authored and clutter-free, never decorative chart-junk.
- `doctrine/references/ai-slop-taxonomy.md` — the "dashboard decoration" / chart-junk tells (3D, gauges, rainbow palettes) this skill rejects.
- **Sibling — `03-layout-grid-and-composition/layout-grid-and-spacing`** for the grid, alignment, and spacing rhythm that exhibits sit on (this skill's alignment and white-space rules inherit from it).
- Sibling — `02-color-brand-and-visual-identity/color-system-and-palette` for the categorical/sequential colour scales and the WCAG contrast gate the "grey base + one accent" rule depends on.
- The deep references in this folder: `references/chart-encoding.md` (the perceptual-accuracy ranking + the accessible-chart floor — load whenever choosing or reviewing an encoding), `references/dashboard-patterns.md` (per-chart behaviour inside a dashboard tile; page-level layout/drill/real-time is the sibling `dashboard-and-data-product-design`), `references/analytics-dashboard-decision-story.md`, `references/responsive-mobile-charts.md`, `references/svg-css-js-implementation.md`. The book sources are listed in the References block below.
- **Sibling — `12-data-viz-and-dashboards/dashboard-and-data-product-design`** owns **page-level** dashboard design (zone sequence, layout archetypes, KPI tiering, drill-down, cross-filtering, real-time UX). This skill owns the **individual chart**; defer page composition to it.
<!-- dual-compat-end -->
> Source: *Storytelling with Data* by Cole Nussbaumer Knaflic (Wiley, 2015)

## The 6-Lesson Framework

1. **Understand the context** — Who, What, How before any visual
2. **Choose an appropriate visual** — Match chart type to data + message
3. **Eliminate clutter** — Remove everything that does not add informative value
4. **Focus attention** — Use preattentive attributes to direct the eye
5. **Think like a designer** — Affordances, accessibility, aesthetics, acceptance
6. **Tell a story** — Beginning (plot), middle (twists), end (call to action)

---

## 2026 Standards — Perceptual Encoding & Accessible Charts (apply on every chart)

These two standards sit *underneath* Knaflic's lessons and make them non-negotiable. Full
treatment + checklists in `references/chart-encoding.md`.

### Perceptual encoding (the *why* behind chart choice)
Encode the most important quantity in the **most accurately decoded channel available**. Ranked
most → least accurate: **position on a common scale → length → angle/slope → area → 3-D volume →
colour intensity → colour hue.** Operational rules:
- The more precisely a quantity must be compared, the higher up that list its encoding must sit.
  (This is the reason pies/donuts/3-D are banned — they push the key comparison onto angle/area;
  a sorted horizontal bar puts it back on *position*.)
- **Hue is categorical, intensity is ordinal, length/position are quantitative.** Match the channel
  to the data type; never use hue to carry magnitude or rainbow to carry order (use a single-hue
  ramp). Length encodings **require a zero baseline** (expressiveness).

### Accessible charts (the measurable a11y floor — `doctrine/references/wcag-2.2-criteria.md`)
- **Never colour-alone (WCAG 1.4.1).** ~8% of men have red–green CVD. Every colour distinction
  carries a **second, non-colour cue** — direct labels, dash/marker/shape, pattern, or a +/− sign.
  Use **blue (positive) + orange (negative)**, never red+green, and add a sign/arrow.
- **Contrast, concretely:** data marks & key points **≥ 3:1** vs background *and* vs adjacent marks
  (1.4.11); chart text/labels **≥ 4.5:1** (≥3:1 for ≥24px / ≥18.66px-bold) (1.4.3). **Design with
  APCA, certify with the WCAG ratio.**
- **Colour-blind-safe palettes** (Okabe–Ito / ColorBrewer "colorblind-safe"); test in a CVD
  simulator before shipping. Source the actual scales from `color-system-and-palette`.
- **Text alternative + targets:** every chart has an informative caption/`alt` (the action title is
  its seed) and ideally a backing data table (1.1.1); interactive points are keyboard-reachable
  with name/role/value (4.1.2) and ≥ **24×24px** (2.5.8); animation honours `prefers-reduced-motion`
  and never flashes >3×/s; usable at **320px / 200% zoom**.

---

## Lesson 1: Context First

### The Exploratory vs Explanatory Distinction

- **Exploratory** = hunting for pearls in oysters (100 hypotheses, maybe 2 findings)
- **Explanatory** = presenting the pearls (the specific story you want to tell)
- NEVER show exploratory analysis to stakeholders — concentrate on the pearls

### Who, What, How (in this order)

| Question | Detail |
|----------|--------|
| **Who** | Specific audience + your relationship with them. Narrow the audience — avoid "internal and external stakeholders." Identify the decision maker. |
| **What** | What must they know or DO? Always recommend an action. Even if uncertain, suggest possible next steps — gives audience something to react to. |
| **How** | Only AFTER who + what: what data supports your case? Data = supporting evidence. |

### Communication Mechanism Continuum

- **Live presentation** (left) — you control pacing, less detail needed on slides
- **Written document** (right) — audience controls, more detail needed
- **Slideument** — hybrid serving both; poses challenges for both needs

### Key Tools

- **3-minute story**: If you had 3 minutes, what would you say? Forces clarity.
- **Big Idea** (Duarte): A single sentence that (1) articulates your unique POV, (2) conveys what is at stake, (3) is a complete sentence.
- **Storyboarding**: Use Post-it notes or whiteboard BEFORE opening software. Easier to rearrange and discard without attachment.

### Context Questions Checklist

- What background information is relevant or essential?
- Who is the audience/decision maker? What do we know about them?
- What biases might make them supportive or resistant?
- What data strengthens our case? Is it familiar or new to them?
- Where are the risks that could weaken our case?
- What would a successful outcome look like?
- If you had one sentence, what would you say?

---

## Lesson 2: Choosing the Right Visual

### Decision Tree — When to Use What

| Visual Type | Use When |
|-------------|----------|
| **Simple text** | 1-2 numbers to communicate. Make the number BIG with supporting words. Do NOT put 1-2 numbers in a chart. |
| **Table** | Mixed audience seeking their own row; multiple units of measure. AVOID in live presentations. |
| **Heatmap** | Table + visual cues via colour saturation. Always include a legend. |
| **Line graph** | Continuous data (usually time). Single, two, or multiple series. Consistent intervals on x-axis are mandatory. |
| **Slopegraph** | Two time periods or comparison points. Shows absolute values + rate of change intuitively. |
| **Vertical bar** | Categorical data, single/two/multiple series. More series = harder to read. |
| **Stacked vertical bar** | Compare totals + subcomponents. Hard to compare non-bottom series. Use sparingly. |
| **Waterfall chart** | Starting point — increases — decreases — ending point. |
| **Horizontal bar** | **Go-to for categorical data.** Easy to read: labels left-to-right, eyes hit category names before data (z-pattern). |
| **Stacked horizontal bar** | Parts of whole, negative-to-positive scale (e.g., Likert survey data). |
| **100% stacked bar** | Proportions summing to 100%. Consider also showing absolute totals. |
| **Square area graph** | Only for numbers of vastly different magnitudes. Avoid all other area graphs. |
| **Scatterplot** | Relationship between two variables. Encode data on x and y simultaneously. |

### Visuals to AVOID

| Avoid | Why |
|-------|-----|
| **Pie charts** | Humans cannot accurately compare angles/areas. Even with labels, not worth the space. Replace with horizontal bar chart sorted by value. |
| **Donut charts** | Even worse — comparing arc lengths is harder than angles. |
| **3D charts** | NEVER use 3D. Skews perception, adds chart junk (side/floor panels). Only exception: actually plotting a third dimension. |
| **Secondary y-axis** | Confusing — audience must figure out which data maps to which axis. Alternatives: (1) label second series directly, (2) pull into separate graph sharing the same x-axis. |

### Critical Rules

- **Bar charts MUST have a zero baseline** — violating this creates false visual comparison (Fox News example: 460% visual increase vs 13% actual)
- **Line graphs CAN have nonzero baselines** — but make it clear and don't overzoom
- **Bar width** should be wider than white space between bars, but not so wide audience compares areas
- **Consistent time intervals** on x-axis for line graphs — never mix decades with years
- **Logical category ordering**: natural order if it exists; otherwise biggest-first or smallest-first depending on emphasis

---

## Lesson 3: Eliminate Clutter

### Cognitive Load Principle

- Every element on the page costs the audience brain power
- **Perceived** cognitive load matters most — if it LOOKS hard, audience gives up
- Maximise the **data-ink ratio** (Tufte): larger share of ink devoted to data = better
- Maximise **signal-to-noise ratio** (Duarte): signal = message, noise = clutter

### The 6 Gestalt Principles (Applied to Charts)

| Principle | Rule | Chart Application |
|-----------|------|-------------------|
| **Proximity** | Close objects = same group | Use spacing in tables to guide eyes to rows or columns |
| **Similarity** | Same colour/shape/size = related | Colour rows to guide reading direction; no borders needed |
| **Enclosure** | Objects in same area = group | Light background shading to separate forecast from actual |
| **Closure** | Brain fills in gaps | Remove chart borders and background — graph still reads as cohesive |
| **Continuity** | Eyes seek smoothest path | Remove y-axis line — consistent white space still aligns bars |
| **Connection** | Connected objects = group | Line graphs leverage this — lines create order in data |

### Decluttering Step-by-Step (the 6 Moves)

1. **Remove chart border** — use white space instead (closure principle)
2. **Remove gridlines** — if kept, make thin and light grey; never compete with data
3. **Remove data markers** — only use with purpose, not as default
4. **Clean up axis labels** — remove trailing zeros, abbreviate months to fit horizontally, eliminate diagonal text
5. **Label data directly** — eliminate legend; leverage proximity principle
6. **Use consistent colour** — label text same colour as its data series (similarity principle)

### Alignment Rules

- **Left-justify text** (avoid centre-aligned — creates no clean lines)
- **Upper-left-most justify** titles, axis titles, legends — audience sees how to read before reaching data
- Avoid **diagonal elements** — diagonal text is 52% slower to read (45—) and 205% slower at 90—
- Create clean vertical and horizontal lines of elements and white space

### White Space Rules

- Margins must remain free of text and visuals
- Do NOT stretch visuals to fill available space
- NEVER add data just to fill space
- White space = dramatic pause in a presentation — strategically powerful
- If one thing is really important, make it the ONLY thing on the page

### Contrast Rule

- "Easy to spot a hawk in a sky full of pigeons, but as variety of birds increases, the hawk becomes harder to find" (Ware)
- The more things we make different, the less any single thing stands out
- Make the ONE important thing very different from everything else

### Keep These Redundant Details

- Dollar signs ($), percent signs (%), commas in large numbers — always retain with data
- These ease interpretation even if title already states the unit

---

## Lesson 4: Focus Attention — Preattentive Attributes

### How Vision Works

- **Iconic memory**: fraction-of-a-second processing, tuned to preattentive attributes
- **Short-term memory**: holds ~4 chunks — legend with 10 colours = cognitive overload
- **Long-term memory**: visual + verbal combined trigger strongest recall

### The Preattentive Attributes (Adapted from Few)

Orientation | Shape | Line length | Line width | Size | Curvature | Added marks | Enclosure | Hue | Intensity | Spatial position

### Quantitative vs Categorical

- **Quantitative encoding**: line length, spatial position, line width, size, intensity (longer = greater)
- **Categorical encoding**: colour hue, shape — NOT quantitative (red is not "more" than blue)

### Two Strategic Uses

1. **Direct attention** — make the audience see what you want BEFORE they consciously think
2. **Create visual hierarchy** — establish implicit order for processing information

### The "Where Are Your Eyes Drawn?" Test

- Create your visual — close eyes — look back — note where eyes land first
- Better: show colleague and have them narrate what they see and in what order

### Rules for Using Preattentive Attributes

- **3-8 seconds**: studies show we have this window before audience decides to engage or move on
- Use preattentive attributes so that even in 3 seconds, the gist comes through
- **Push everything to background first** (grey), then make explicit choices about what to bring forward
- Data labels: use sparingly as "look here" signals, not on every data point

### Size

- Relative size = relative importance
- If 3 things are equally important, size them the same
- If one thing is most important, make it BIG
- Don't let layout accidents (e.g., placeholder sizing) signal false importance

### Colour — The Most Powerful Attribute

**Core approach**: Design in shades of grey, pick ONE bold colour to draw attention.

| Rule | Detail |
|------|--------|
| **Base colour = grey, not black** | Grey allows greater contrast when bold colour appears |
| **Default highlight = blue** | (1) No colourblindness issues, (2) prints well in B&W, (3) versatile |
| **Use sparingly** | Too many colours = rainbow land = nothing stands out |
| **Use consistently** | Same colour = same meaning throughout. A change in colour signals change in topic/tone. |
| **Colourblind safe** | ~8% of men are red-green colourblind. Avoid red+green together. Use blue (positive) + orange (negative). Add bold/plus/minus signs as backup cues. |
| **Tone-appropriate** | Bold black for clinical/serious; muted blue for friendly; peppy colours for lighthearted content |
| **Brand colours** | Use 1-2 brand colours as "look here" cues; keep rest muted grey. If brand colour lacks contrast, use a different standout colour. |
| **Heatmap over rainbow** | Single-colour saturation scale (heatmap) beats rainbow — carries quantitative connotation |
| **Dark backgrounds** | Reverse the logic: grey baseline, white stands out. Yellow pops against black. Generally avoid dark backgrounds. |

### Position on Page

- Audience starts **top-left**, scans in **z-pattern** zigzags
- Put the most important thing at the **top**
- On slides: action title at top = main takeaway
- In data: consider whether reordering data to put key insight at top makes sense
- Never make audience read bottom-right to top-left

---

## Lesson 5: Think Like a Designer

### Four Design Principles

#### 1. Affordances (from product design)

- Visual cues that indicate how to interact with the visualisation
- Three sub-rules: **highlight important stuff**, **eliminate distractions**, **create clear hierarchy**
- **10% rule**: highlight at most 10% of the visual design (Lidwell et al.)

**Highlighting techniques ranked:**
- **Bold** — preferred: minimal noise, clearly highlights
- *Italics* — minimal noise but less standout, less legible
- Underline — adds noise, compromises legibility, use sparingly
- UPPERCASE — works for titles/labels/keywords (short sequences)
- **Colour** — effective when used sparingly, best combined with bold
- **Size** — signals importance
- **Inversing** — effective but noisy, use sparingly
- Layering multiple attributes (large + coloured + bold) for highest-priority items

#### 2. Accessibility

- "If it's hard to read, it's hard to do" (Song & Schwarz, 2008) — fussy fonts made students judge exercise routines as harder
- **Make it legible**: consistent, easy-to-read font
- **Keep it clean**: leverage visual affordances
- **Straightforward language**: simple > complex, fewer words > more, spell out acronyms
- **Remove unnecessary complexity**: when choosing between simple and complicated, favour simple
- **Text is your friend**: every chart needs a title, every axis needs a title (exceptions are extremely rare)
- **Action titles** on slides: "Estimated 2015 spending is above budget" beats "2015 Budget"
- **Annotations**: few choice words on a graph dramatically accelerate understanding

#### 3. Aesthetics

- More aesthetic designs are perceived as easier to use (whether they are or not)
- Aesthetic designs promote creative thinking, foster positive relationships, increase tolerance of problems
- Three aesthetic priorities: **smart colour**, **proper alignment**, **leveraged white space**

#### 4. Acceptance

- Strategies for resistant audiences:
  - Articulate benefits of the new approach
  - Show side-by-side comparison (old vs new)
  - Provide multiple options and seek input
  - Get a vocal audience member on board first

---

## Lesson 6: Tell A Story

Use [`references/data-storytelling-and-case-patterns.md`](references/data-storytelling-and-case-patterns.md)
for narrative structures, spoken-versus-written choices, story-clarity tests, spaghetti-graph
repairs, pie-chart alternatives, animation strategy, and stable ordering.


## Model Visual Checklist

Apply this checklist to every data visualisation before sharing:

- [ ] **Context**: Can I state in one sentence who this is for and what they should do?
- [ ] **Visual type**: Is this the easiest-to-read chart type for this data and message?
- [ ] **Zero baseline**: If bar chart, does y-axis start at zero?
- [ ] **No 3D**: Is the chart free of 3D effects?
- [ ] **No pie/donut**: Have I avoided pie and donut charts (or justified their use)?
- [ ] **Chart border removed**: No unnecessary box around the chart?
- [ ] **Gridlines**: Removed or made thin light grey?
- [ ] **Data markers**: Only present with purpose, not by default?
- [ ] **Axis labels**: Clean (no trailing zeros, no diagonal text)?
- [ ] **Direct labels**: Data series labelled directly (no distant legend)?
- [ ] **Colour strategy**: Grey base + one bold colour for emphasis?
- [ ] **Colourblind safe**: Avoided red+green together? Added backup cues?
- [ ] **Alignment**: Left-justified text, upper-left titles, clean vertical/horizontal lines?
- [ ] **White space**: Margins preserved, visuals appropriately sized?
- [ ] **Titles**: Graph title and all axis titles present?
- [ ] **Action title**: Title states the "so what," not just a description?
- [ ] **Annotations**: Key insights called out directly on the visual?
- [ ] **Visual hierarchy**: "Where are your eyes drawn?" test passed?
- [ ] **Story**: Does this visual support a clear beginning-middle-end narrative?
- [ ] **Call to action**: Is it obvious what the audience should know or do?

---

## Anti-Patterns Summary

| Anti-Pattern | Fix |
|-------------|-----|
| Showing all 100 oysters (exploratory dump) | Show only the 2 pearls (explanatory) |
| Pie/donut chart | Horizontal bar chart or simple text |
| 3D anything | Flat 2D always |
| Rainbow colours | Grey + one accent colour; heatmap for scales |
| Legend far from data | Label data directly |
| Centre-aligned text | Left-justify |
| Diagonal axis labels | Abbreviate or switch to horizontal bar |
| Every data point labelled | Label only the points that matter |
| No chart/axis titles | Always title the chart and every axis |
| Descriptive title ("Q3 Revenue") | Action title ("Q3 revenue exceeded target by 12%") |
| No call to action | Always end with what audience should do |
| Secondary y-axis | Label directly or split into two graphs |
| Dark/coloured background | White background (unless brand requires otherwise) |
| Filling every pixel of space | Preserve white space — it is strategic |
| Same visual for presentation + report | Build progressively for live; annotate fully for circulation |

---

## References

- Knaflic, Cole Nussbaumer. *Storytelling with Data.* Wiley, 2015.
- Tufte, Edward. *The Visual Display of Quantitative Information.* Graphics Press, 2001.
- Few, Stephen. *Show Me the Numbers.* Analytics Press, 2004.
- Duarte, Nancy. *Resonate.* Wiley, 2010.
- Lidwell, Holden, Butler. *Universal Principles of Design.* Rockport, 2010.
- Ware, Colin. *Information Visualization: Perception for Design.* Morgan Kaufmann, 2004.
- Atkinson, Cliff. *Beyond Bullet Points.* Microsoft Press, 2011.
- `references/relationship-diagrams-that-teach.md` — layered before force layouts, node caps, cluster captions, matrix alternatives for dependency and architecture graphs.
---

## Responsive charts on narrow viewports

When charts must work at 360 px or similar mobile widths, load
`references/responsive-mobile-charts.md`. It covers chart-type switching, aggregation,
sparkline/headline patterns, horizontal-scroll safeguards, touch targets, and mobile
anti-patterns.

---

## Beyond Knaflic: building custom visualisations

When hand-building charts in HTML/SVG/CSS/JS, load `references/svg-css-js-implementation.md` for SVG, D3, responsive, accessibility, and runnable skeleton patterns.

---

When the visual carries a management decision, KPI review, forecast, risk score, or analytics output, load `references/analytics-dashboard-decision-story.md`.

---

For data-product lineage, freshness, uncertainty, and decision drilldown, load
[data-foundation to decision visualisation](references/data-foundation-to-decision-visualisation.md).

## Examples

- `examples/chart-worked-examples.md` — five real **good vs bad** chart encodings (pie→sorted bar,
  dual-axis→split panels, red/green→colour+non-colour cue, rainbow→single-hue ramp, gauge→bullet
  graph), each with the perceptual + accessibility reasoning. Use it as the reasoning pattern when
  choosing or reviewing an encoding.
