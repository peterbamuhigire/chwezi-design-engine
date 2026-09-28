---
name: editorial-and-long-form-layout
description: Use when an article, essay, documentation page, case study, or web report needs sustained-reading measure, rhythm, landmarks, notes, figures, or captions. Do not use for editable DOCX or print-PDF production; route those artefacts to the document skills.
metadata:
  portable: true
  category: 03-layout-grid-and-composition
  compatible_with:
  - claude-code
  - codex
---

# Editorial And Long-Form Layout
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- Composing a **web reading experience** whose primary job is sustained reading: an article,
  essay, blog post, long report or whitepaper rendered as a page, documentation, a case study, or
  a knowledge-base entry.
- You must decide the **measure** (line length), the **reading rhythm** (body size, leading,
  paragraph spacing, baseline grid), and where text-flow furniture goes — drop caps, pull-quotes,
  footnotes vs. sidenotes, figures and their captions.
- The text is long enough that **scannability** matters: the reader needs a lead, subheads, a
  table of contents, and visual landmarks to navigate and re-enter.
- You are deciding whether content is genuinely **multi-column** (and at what breakpoint that
  helps versus hurts) on the web.

## Do Not Use When

- The deliverable is an editable **Word `.docx`** report — use
  `13-presentations-and-documents/docx-report-and-document-formatting`. That skill owns named
  styles, the auto-TOC field, page numbering, and DOCX accessibility tags. **Pair, don't
  duplicate:** this skill owns the *web* reading layout; the DOCX skill owns the *document* one.
- The deliverable is a **print-ready/branded PDF** with covers and dividers — use
  `13-presentations-and-documents/pdf-proposal-and-bankable-document-design`.
- The page is a **UI screen, dashboard, or landing page** dominated by components and CTAs rather
  than prose — use `layout-grid-and-spacing` (this same group) for the page grid.
- You only need the **page-level grid / spacing unit / focal point** decision in general — that is
  the sibling `layout-grid-and-spacing`. Start there for the column structure the article sits in;
  return here for the reading column's internal craft.
- **No typeface has been chosen** — run `01-typography-and-fonts/font-selection-and-pairing` first
  (the editorial register usually wants the **02 Editorial / Literary** group), then lay it out
  here.

## Required Inputs

| Input | Source | Required evidence |
|---|---|---|
| Full text or representative section and length class | Editor, author, or approved content source | Word count, heading structure, and stable sample content |
| Type pairing and spacing basis | Typography skill or design system | Named families, licence status, body size, leading, and spacing unit |
| Figures, tables, notes, quotes, and asides | Content inventory | Count, captions, source/alt text, and editorial priority |
| Reading contexts | Delivery brief or analytics-supported targets | Target widths, devices, and print-style requirement |

- The full text (or a representative section) and its **length class** — short read (<800 words),
  feature (800–3000), or long report (3000+). Length sets whether you need a TOC, sidenotes, and
  multi-column.
- The chosen type pairing and the **type scale + spacing unit** already set per
  `doctrine/references/type-scale-and-spacing.md` — this skill builds the reading rhythm on those
  numbers, it does not reinvent them.
- The content inventory of **non-body elements**: figures, tables, code blocks, quotes worth
  pulling, references/notes, and asides — each needs a placement decision.
- Target reading contexts (desktop wide column, tablet, phone) and whether a print stylesheet is
  also required.

## Workflow

1. **Set the measure first — 45–75 characters per line.** The measure is the single most important
   reading-layout decision. Aim for **~66ch** as the target, **45ch** floor, **75ch** ceiling
   (Bringhurst's classic range; the lower 50–60ch band suits the wider leading of screens). Set it
   with `max-width` in **`ch`** units (or `~38rem`) on the reading column, *not* on the viewport —
   a full-bleed paragraph that runs 120 characters wide is the most common long-form failure, the
   eye loses the line return. Tables, figures, and code may break **out** of the measure
   deliberately; running prose never exceeds it.

2. **Build the reading rhythm on the doctrine numbers.** Per
   `doctrine/references/type-scale-and-spacing.md`: body **16–20px** (long-form reads larger than
   UI — 18–20px is editorial-comfortable), **line-height ≈ 1.5–1.6** for body (the reference's
   ≥1.6 for small text), tightening toward **1.3–1.1** as headings grow past 32px. Separate
   paragraphs by **either** a blank line (one spacing-unit of space-after) **or** a first-line
   indent — *never both*, and never both absent. Indent is the book convention; spaced blocks are
   the web convention; pick one per artifact and hold it.

3. **Snap to a baseline rhythm.** Establish one vertical unit (tie it to the body line-height, e.g.
   an 8pt or line-height-derived grid per the spacing-rhythm rule) and make body leading, space
   above/below headings, figure margins, and block quotes all **multiples** of it, so text across
   the page sits on a shared baseline. Uneven, arbitrary vertical gaps are the "assembled, not
   typeset" tell. Headings get **more space above than below** (they belong to the section they
   open) — this grouping is what makes structure legible at a glance.

4. **Build the scannability layer — the reader must navigate without reading.** Long-form is read
   in two modes: scan, then read. Provide landmarks: a **lead/standfirst** (larger, often a
   distinct weight, summarising the piece), **subheads** every few hundred words (real `<h2>`/`<h3>`
   in the heading scale, ≥1.25 ratio jumps), and for long reports an **in-page table of contents**
   (sticky or top-anchored, jump links). Subheads carry meaning — write them to be skimmed in
   sequence as an outline. Front-load: the first sentence of each section should let a skimmer
   decide whether to slow down.

5. **Place the drop cap as a deliberate entry, not decoration.** A drop cap marks the *start of the
   read* — use it once, at the opening paragraph (or section openings in a very long piece), never
   sprinkled. Set it to **2–4 lines deep**, optically aligned: the cap's cap-height sits flush to
   the first body baseline and its left edge **hangs to the text margin** (a glyph beside the
   measure looks indented if set mathematically flush — overshoot it, per the optical-alignment
   rule in `layout-grid-and-spacing`). Use `initial-letter` where supported with a float fallback.
   Pair the cap with **small-caps for the first few words** for a classic editorial open, or skip
   the cap entirely — but make it a stated choice, not a reflex.

6. **Pull-quotes amplify, they don't repeat.** A pull-quote lifts a *striking* line to create a
   visual rest and a re-entry point for skimmers — it must **not** be the first appearance of that
   text in the flow it sits beside (a pull-quote duplicating the adjacent sentence is a slop tell).
   Set it larger (a real scale jump), in the heading or a contrasting face/weight, break it **out of
   the measure** (full-width, or into the margin), and give it generous asymmetric space. One every
   ~400–600 words at most; more turns rhythm into noise.

7. **Choose footnotes vs. sidenotes deliberately.** Asides and citations have two web treatments:
   **footnotes** (numbered, collected at the article end, anchor-linked both ways — robust, works
   at every width) or **sidenotes/marginal notes** (set in the outer margin beside their reference,
   Tufte-style — superb on wide screens, but they **must collapse to inline/expandable footnotes
   below the measure on narrow viewports**, never overlap the text column). Decide by available
   width and density: dense scholarly citation → footnotes; a few rich asides on a wide editorial
   page → sidenotes with the narrow-viewport fallback. Every note reference is a real two-way link
   (superscript marker ⇄ note), keyboard-focusable.

8. **Handle figures as first-class blocks with real captions.** A figure is image/table/chart **+**
   a numbered caption — never a bare floating image. Decide each figure's width band: **inset**
   (within the measure), **breakout** (wider than the measure, centred), or **full-bleed** (edge to
   edge) — vary them so the page has rhythm rather than a column of identical inset images. Caption
   sits **below** the figure, set smaller (caption step in the scale) in a quieter colour/face,
   numbered ("Figure 1."), and is the alt-text's complement, not its substitute. Keep figure and
   caption together across any column or page break; never orphan a caption.

9. **Use multi-column only where it earns its place.** True newspaper-style multi-column on the web
   is usually a **mistake** for a single article — it forces the reader's eye to travel up and back
   down a tall viewport, and `column-count` with no fixed page height creates exactly that scroll
   trap. Prefer a **single well-measured column** for continuous reading. Reserve multi-column for
   content that is genuinely **parallel and short-segment** (a glossary, a reference card, link
   indexes, a footnote block) where each item is shorter than the viewport — use CSS `columns` with
   `column-width` (intrinsic, reflows by available width) and `break-inside: avoid` on items. State
   why multi-column helps *this* content before using it.

10. **Define the responsive and print behaviour.** The measure is set in `ch`/`rem`, so it survives
    most widths automatically; below it, the column simply gets side padding (don't let text touch
    the screen edge — keep a gutter). Sidenotes fold to footnotes, breakout figures become full
    width, the TOC moves from sticky-rail to a collapsible top block. The sibling
    `responsive-and-adaptive-layout` owns the depth (`clamp()` fluid type, container queries); name
    the transitions here. If a **print stylesheet** is needed, restore footnotes, expand link URLs,
    and re-tighten leading for paper.

11. **Run the scannability + reading checklist** (below). Fix any failure before shipping.

## The Long-Form Reading Checklist (run every time)

1. Running prose held to **45–75ch** (target ~66ch), set on the column in `ch`/`rem` — never
   viewport-wide.
2. Body **16–20px** at **line-height ~1.5–1.6**; paragraphs separated by space **or** indent, not
   both, not neither.
3. Vertical rhythm on a **baseline grid**; headings get more space **above** than below.
4. A scannability layer exists: **lead + subheads** (and a **TOC** for long reports), readable as an
   outline.
5. Drop cap (if used) is **once, optically hung**, 2–4 lines — not decorative sprinkling.
6. Pull-quotes **amplify a striking line** (not duplicate adjacent text), break out of the measure,
   spaced asymmetrically.
7. Notes are **two-way linked**; sidenotes **fall back to footnotes** below the measure on narrow
   screens.
8. Figures are **block + numbered caption**, width bands varied (inset/breakout/full-bleed),
   caption never orphaned.
9. Multi-column used **only** for parallel short-segment content, with a stated reason — single
   measured column for continuous reading.
10. Contrast and reading order pass `doctrine/references/wcag-2.2-criteria.md`; performance budget
    respected per `doctrine/references/web-performance-budgets-2026.md`.

## Decision Rules

| Condition | Choose | Wrong-choice failure |
|---|---|---|
| Continuous prose is the primary task | A 45–75ch single reading column | Viewport-wide lines cause lost line returns and fatigue |
| Notes are short and wide screens have stable margin space | Sidenotes with numbered footnote fallback | Sidenotes on narrow screens collide with prose or disappear |
| Figures need detail beyond the prose measure | Controlled breakout with caption anchored to the figure | Forcing detail into the measure makes labels illegible |
| Text is short or sequential | Omit the TOC and preserve uninterrupted flow | A ceremonial TOC adds navigation noise without benefit |
| Parallel snippets are independently readable | Multi-column only above a proven width | Newspaper columns for continuous web prose create disruptive jumps |

## Capability Contract

- Must read stable content and inspect rendered output at representative widths; may measure line length, overflow, landmarks, and contrast.
- Review defaults to read-only. Edit content or templates only under an explicit implementation/remediation request and preserve editorial meaning.
- Network access is optional for cited source verification; never fabricate captions, citations, alt text, or reading-test evidence.

## Degraded Mode

- If stable text is unavailable, use labelled representative copy and return a provisional layout; stop before final pagination or landmark claims.
- If rendering is unavailable, provide CSS/token specifications and a verification matrix marked pending.
- If a font licence or source is unresolved, use the named OFL baseline and record the substitution.
- Recover from overflow, orphaned furniture, or poor measure by fixing the smallest governing rule, rerendering all target widths, and recording the retest.

## Quality Standards

- Running prose stays within the chosen measure and maintains a coherent baseline rhythm at every target width.
- Headings, links, notes, figures, tables, and code remain navigable, legible, and semantically associated.
- Release evidence includes rendered widths, measured line length, overflow/accessibility findings, and unresolved editorial risks.

## Anti-Patterns

- **The full-bleed paragraph:** running text at 100–120ch because the body width was never
  constrained — the single biggest readability failure.
- **No measure, no rhythm:** arbitrary leading and paragraph gaps, text on no baseline, paragraphs
  separated by *both* indent and blank line.
- **Decorative drop caps:** a drop cap on every paragraph, or one set mathematically flush so it
  looks indented; ornament mistaken for craft.
- **Redundant pull-quotes:** a "pull-quote" that just repeats the sentence right next to it — visual
  noise, not a re-entry point.
- **Web newspaper columns:** `column-count: 3` on a long article, forcing up-and-down scroll
  reading. Multi-column without a reason.
- **Orphaned captions / bare images:** a floating image with no numbered caption, or a caption split
  from its figure across a break.
- **A wall with no landmarks:** thousands of words with no lead, no subheads, no TOC — unscannable,
  so the reader bounces.
- **Sidenotes that break on mobile:** marginal notes that overlap or shove the measure on narrow
  viewports because no footnote fallback was built.
- **Pure-black body on white:** `#000` body text (eye strain) — use a near-black per the type-scale
  reference's colour rule.

## Sourcing authority (the asymmetry rule)

Grounds **only** in human design authority, never an AI tool's layout suggestion, per
`doctrine/design-doctrine.md` §2. Canonical sources for this skill:

- **Robert Bringhurst — *The Elements of Typographic Style*** — the 45–75-character measure, the
  reading rhythm, drop caps and the page as a reading instrument.
- **Ellen Lupton — *Thinking with Type*** — measure, leading, hierarchy, and optical alignment of
  drop caps and hanging elements.
- **Jan Tschichold** — the harmonious text block and the discipline of the reading page.
- **Edward Tufte** — sidenotes/marginal notes and figure-with-caption integration.
- **Matthew Butterick — *Practical Typography*** — body measure, line spacing, and the case against
  decorative multi-column on screens.

When an AI tool proposes a viewport-wide body or three-column article, treat it as the convergent
mean to *avoid*, not as endorsement.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Editorial layout specification | Designer and frontend implementer | Measure, rhythm, hierarchy, furniture, and breakpoint rules are explicit |
| Annotated representative renders | Editor and accessibility reviewer | Desktop and narrow layouts show readable prose with no hidden overflow |
| Reading-layout gate | Approver | Checklist records tested content, widths, failures, corrections, and residual risks |

- A stated reading-layout decision: the **measure** (in ch/rem), the **body size + leading +
  baseline unit**, the paragraph-separation convention, the drop-cap decision, the pull-quote
  cadence, the **footnote-vs-sidenote** choice with its narrow-viewport fallback, the figure width
  bands, and the multi-column decision (with reason) — declared **before** markup/CSS.
- A completed long-form reading checklist.
- A reading layout that holds the measure, scans cleanly, and reads as typeset rather than
  assembled — consistent with the Mission in `doctrine/design-doctrine.md` §0.

## Examples

- `examples/long-form-article-layout-spec.md` — a fully worked spec for a ~2,400-word web feature:
  the stated decisions (66ch measure, 19px/1.6 body on an 8pt baseline, one hung drop cap, two
  breakout pull-quotes, sidenotes with footnote fallback, three figure bands, single column),
  copy-ready CSS for the reading column and its furniture, the responsive + print transitions, and
  the checklist run against it.

## References

- `references/editorial-layout-patterns.md` — the operational catalog: the measure table, the
  reading-rhythm numbers, drop-cap/small-cap recipes, the pull-quote and breakout patterns,
  footnote-vs-sidenote decision and CSS, figure width bands, and the when-to-multi-column rule, each
  with copy-ready CSS.
- `doctrine/design-doctrine.md` — §0 Mission ("the moat is looking human-made"); §2 the Anti-Slop
  Charter and the sourcing-authority asymmetry rule.
- `doctrine/references/type-scale-and-spacing.md` — the body size, line-height-by-size, weight
  extremes, spacing unit, and near-black text colour this reading rhythm is built on.
- `doctrine/references/font-groups-and-usage.md` — the **02 Editorial / Literary** baseline pairing
  (Andada Pro / Newsreader / Source Serif 4) the long-form register usually wants.
- `doctrine/references/wcag-2.2-criteria.md` — contrast floor (AA), reading order, focusable note
  links.
- `doctrine/references/web-performance-budgets-2026.md` — keep webfont and image weight within
  budget so the reading page loads fast.
- `03-layout-grid-and-composition/layout-grid-and-spacing` — sibling; owns the page-level grid,
  spacing unit, and focal point the article column sits inside (start there, return here for the
  column's reading craft).
- `03-layout-grid-and-composition/responsive-and-adaptive-layout` — sibling; owns the depth of
  fluid `clamp()` type, container queries, and breakpoint strategy this skill names.
- `13-presentations-and-documents/docx-report-and-document-formatting` /
  `pdf-proposal-and-bankable-document-design` — the **document** counterparts; pair with them when
  the deliverable is an editable Word file or a print PDF rather than a web page.
<!-- dual-compat-end -->
