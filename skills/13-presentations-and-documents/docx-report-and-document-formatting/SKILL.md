---
name: docx-report-and-document-formatting
description: Use when producing or formatting an editable DOCX report, proposal, plan, specification, memo, or letter with named styles, contents, headers, footers, tables, figures, pagination, embedded fonts, and accessibility. Use pdf-proposal-and-bankable-document-design for final fixed-layout PDF craft.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# DOCX Report And Document Formatting
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- Producing or reformatting a long-form Word document — report, proposal, business plan,
  SRS/BRD, whitepaper, memo, letter, policy, or template — that must read as a considered,
  institutional, human-authored artifact rather than a default Word file.
- A document needs a real **named-style hierarchy** (not ad-hoc bold runs), a **table of
  contents** that updates from heading styles, branded **headers/footers** and **letterhead**,
  designed **tables**, numbered **figure/table captions**, correct **page numbering**, **font
  embedding with subsetting**, and **accessible document tags** (real Heading styles, alt text,
  table header rows, language, reading order).
- The deliverable must be a `.docx` (editable, track-changeable by the client) — not a PDF or a
  web page.

## Do Not Use When

- The deliverable is a **print-ready/branded PDF** proposal with cover and divider systems —
  use `pdf-proposal-and-bankable-document-design` (group 13).
- The artifact is a **slide deck** — use `deck-system`.
- A **spreadsheet** is the primary output — use the `xlsx` document skill.
- You only need to **load/embed a font**, with no document structure work — use
  `font-embedding-and-licensing` (group 01).
- **No typeface has been chosen yet** — run `font-selection-and-pairing` (group 01) first, then
  return here to apply it.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Final or controlled content and hierarchy | Document owner | yes | Approved source and section map |
| Brand, fonts, licence, page, and accessibility requirements | Brand and delivery owners | yes | Asset and format specification |
| Editing and export targets | Consumer | yes | Word version, PDF need, and print constraints |

- The document's purpose, audience, and length class (memo vs multi-section report) — this sets
  how many heading levels and whether a TOC is warranted.
- The chosen **01 Formal / Institutional** pairing — a distinctive serif for headings
  plus a refined body face — stated and justified per the doctrine charter, with its licence
  basis confirmed for embedding. Never a banned default (Calibri/Aptos/Inter/Times New Roman as
  a reflex).
- Brand assets if a letterhead is required: logo (vector or ≥300 ppi), brand colour hex values,
  registered name / address / contact block, and any statutory footer text.
- Trim size and margins (default Letter or A4; see the style system reference).

## Workflow

1. **Pick the 01 Formal / Institutional type and state it.** Per the Anti-Slop Charter
   (`doctrine/design-doctrine.md` §2), name the heading face, the body face, and *why they fit
   this document* **before** formatting. Default baseline pairing: **Source Serif 4 -> Public Sans**
   for formal institutional documents, or **Andada Pro -> Source Serif 4** when the brief calls for
   a more editorial/literary register. Confirm against
   `doctrine/references/font-groups-and-usage.md`; scan `fonts/01-formal-institutional/` for a
   purchased premium family and prefer it when it improves the result. Never use a banned font
   (`doctrine/references/ai-slop-banned-fonts.md`) — and never silently fall back to Calibri.
2. **Build the named style set with real pt sizes.** Define Word *named paragraph and character
   styles* — Title, Heading 1–4, Body Text, Lead, Caption, Quote, List styles, Code — with the
   exact point sizes, line spacing, space-before/after, and colour given in
   `references/docx-style-system.md`. Bind H1–H4 to Word's built-in **Heading 1–4** outline
   levels so the TOC and accessibility tree read them. Never style headings with manual
   bold/size runs — that breaks the TOC and the tag tree.
3. **Set the page grid, margins, and baseline.** Apply the trim, margins, gutter, and a
   consistent vertical rhythm (line grid) from `references/docx-style-system.md`. Define the
   letterhead/first-page-different section and the body section. For **double-sided or bound**
   output, switch to **mirror margins + a binding gutter** and open chapters with **Section Break
   (Odd Page)** so they fall on a recto (see the two-sided/bound note in the style reference).
4. **Compose headers, footers, letterhead, and page numbering.** First-page letterhead (logo +
   identity block) distinct from running headers; running header with document/section title;
   footer with page numbering (`Page X of Y`), document reference, and any statutory line. Use
   section breaks so front-matter is unnumbered or roman-numbered and the body is arabic. For
   bound documents, enable **Different odd and even pages** for distinct left/right headers-footers
   (page number on the outer edge). Save the cover/letterhead as a **Building Block / Quick Part**
   in the template so it is reused, not rebuilt.
5. **Insert and update the Table of Contents.** Generate the TOC from Heading 1–3 styles (not
   typed by hand), with tab leaders and right-aligned page numbers; mark it to update on open.
6. **Format tables and figures.** Apply the table style system in
   `references/tables-and-figures.md`: a real header row (repeated across pages, tagged as a
   header), zebra or hairline rules, consistent cell padding, numeric right-alignment, and a
   numbered **caption style** above tables / below figures ("Table 1.", "Figure 1."). For
   architecture, sequence, state, data-flow and ER diagrams, also apply
   `references/diagram-visual-standards.md` (Public Sans labels, token colours, font-substitution
   check, 300 ppi PNG plus SVG).
7. **Embed and subset the fonts.** Per `doctrine/references/embedding-by-format.md`: embed the
   chosen faces and enable **"Embed only the characters used"** (subsetting) so the document
   renders as designed on machines that lack the font, at minimal size. Embed only licence-
   permitted faces (`doctrine/references/licensing-and-embedding.md`).
8. **Apply accessible document tags** per `references/accessible-docx-tags.md` and
   `doctrine/references/wcag-2.2-criteria.md`: set document **language**; use real Heading
   styles for the tag tree; add **alt text** to every meaningful image (mark decoratives
   decorative); give every table a **header row** and a simple, non-merged structure; verify
   text/background **contrast ≥ 4.5:1** (≥ 3:1 for large headings); ensure logical reading order;
   add a descriptive **title** in document properties.
9. **Export check.** Run Word's **Accessibility Checker** (resolve all errors), confirm the TOC
   updates, fields (page numbers, cross-refs) resolve, fonts are embedded+subset (check file
   size), and — if a fixed-fidelity copy is needed — export a PDF whose fonts are embedded.


**Typesetting QA pass (required before release):** run `fine-typesetting-and-typesetting-qa` on the
rendered document: one change per heading level, rag and hyphenation, widows and orphans,
figures, quotes, dashes and the UK/East African house-style sheet. Build tables as real table
objects with styles and tabular figures, never tab-spaced text.
## Decision Rules
| Condition | DOCX choice | Wrong-choice failure |
|---|---|---|
| Repeated formatting role | Named style, never manual formatting | Direct formatting drifts and breaks navigation |
| Wide exhibit exceeds portrait page | Landscape section or redesigned exhibit | Shrinking makes evidence unreadable |
| Font embedding is prohibited | Approved fallback or PDF-only delivery | Unlicensed embedding creates legal exposure |

## Capability Contract
Read, edit, and DOCX rendering are required for production. Execution is required to claim styles, fields, embedding, pagination, or accessibility. Sending or publishing the document requires separate authority.

## Degraded Mode
Without Word-compatible rendering, deliver the DOCX marked unverified plus a style map. Stop release when fonts, licences, page renders, fields, or accessibility checks are missing; recover with an approved fallback and explicit caveats.

## Anti-Patterns

- Opening in **Calibri/Aptos** (Word defaults) or reflexively in Times New Roman / Inter —
  the recognisable signature of an unconsidered document.
- **Manual formatting instead of named styles** (bold + size by hand). It breaks the TOC, the
  accessibility tag tree, and any later restyle; it is the #1 tell of a non-designed DOCX.
- A **single font / single size step** for everything — monotype is itself a slop signal
  (charter §3). Headings, body, and captions must form a real scale.
- Shipping **without embedding/subsetting** (recipient sees a substitute, or the file is bloated).
- A TOC **typed by hand**, page numbers typed as literals, or captions as plain bold lines —
  none of which update or tag.
- **Inaccessible tables:** merged/nested cells, no header row, colour as the only differentiator,
  images with no alt text, no document language set.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Editable DOCX with semantic style system | Authors and client | Heading, body, table, caption, and list roles use named styles |
| Style/font/layout specification | Maintainers | Type, spacing, sections, and fallback rules are documented |
| Rendered page and accessibility evidence | QA and release owner | TOC, fields, pagination, overflow, embedding, and reading order pass |

- A `.docx` with a complete **named style hierarchy** (Title, H1–H4, Body, Lead, Caption, Quote,
  lists, code) at real pt sizes bound to outline levels.
- Auto-generated **TOC**, branded **letterhead + headers/footers**, correct **page numbering**.
- Designed **tables** and numbered **table/figure captions**.
- **Embedded + subset** fonts (licence-verified) so it renders as designed everywhere.
- **WCAG-tagged** document: language set, heading tree, alt text, table headers, AA contrast,
  logical reading order — passing Word's Accessibility Checker with zero errors.
- A one-paragraph **type-choice rationale** (which 01 Formal / Institutional pairing and why), per the charter.

## Examples

- `examples/report-style-table.md` — a full applied style spec for a multi-section report
  (every style with real pt sizes, spacing, colour, and outline binding).
- `examples/before-after-default-vs-designed.md` — the same report page as a default Calibri
  Word file vs the designed, styled, tagged version, with the specific changes annotated.

## References

- `doctrine/design-doctrine.md` — Anti-Slop Charter, the asymmetry rule, state-the-choice.
- `doctrine/references/font-groups-and-usage.md` — 01 Formal / Institutional and 02 Editorial / Literary baseline pairings.
- `doctrine/references/embedding-by-format.md` — DOCX embed + subset rules.
- `doctrine/references/licensing-and-embedding.md` — licence check before embedding.
- `doctrine/references/ai-slop-banned-fonts.md` — the fonts never to use.
- `doctrine/references/wcag-2.2-criteria.md` — the accessibility floor (AA), tagging rules.
- `references/docx-style-system.md` — the named-style table with pt sizes.
- `references/tables-and-figures.md` — table style system + caption rules.
- `references/diagram-visual-standards.md` — diagram typography, colour, export and the per-figure checklist.
- `references/accessible-docx-tags.md` — DOCX accessibility tagging checklist.
<!-- dual-compat-end -->
