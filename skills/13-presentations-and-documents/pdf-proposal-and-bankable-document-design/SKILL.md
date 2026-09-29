---
name: pdf-proposal-and-bankable-document-design
description: Use when designing a print-ready fixed-layout PDF proposal, report, feasibility study, business case, tender, lender document or invoice, including its typeface and type scale, covers, dividers, exhibits, running furniture and verified font embedding. Use docx-report-and-document-formatting for editable Word source and deck-system for slides.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# PDF Proposal & Bankable Document Design
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When
- The deliverable is a **designed, print-ready PDF**: a consulting proposal, technical/feasibility
  report, business case, bankable document (for a lender/credit committee/IC), tender or EOI
  response, whitepaper, or board paper.
- You need a **cover system**, **section dividers**, **exhibit/figure pages**, running
  **headers/footers**, page numbering, a table of contents, and **guaranteed font embedding** so the
  file renders identically on every machine and at the print bureau.
- The document must read as **authored and credit-grade** — defensible enough to sit in front of an
  investment committee — not as a default Word/Google Docs export.

## Do Not Use When
- The deliverable is a **slide deck / pitch** (PPTX, Slides, Canva) → use `deck-system`.
- You need the **editable DOCX source** (styles, TOC field, tracked changes) → use
  `docx-report-and-document-formatting`; come here to design the *rendered PDF* of it.
- You only need the **type or colour system itself** → use groups 01 / 02 (this skill *applies* them).
- It is a **spreadsheet** deliverable → XLSX cannot embed fonts; render exhibits to PDF and place
  them here (`doctrine/references/embedding-by-format.md`, §XLSX).

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Approved content, audience, decision, and section hierarchy | Document owner | yes | Controlled source and brief |
| Brand assets, fonts, licences, page and print constraints | Brand and production owners | yes | Asset register |
| Required exhibits, citations, navigation, and accessibility | Content and compliance owners | yes | Exhibit/source checklist |
- **Purpose & audience** of the document (proposal vs. report vs. bankable case) and the single
  decision you want from the reader (award the contract / approve the facility / fund the project).
- **Content** — the narrative, the numbers, and every exhibit (tables, charts, schedules) that must
  appear, plus their source notes.
- **Trim size & output target**: A4 or US Letter; screen-only PDF vs. printed/bound; mono or colour
  printing; bleed required (full-bleed covers) or not.
- **Brand** — or an explicit, stated type + colour choice (group 01 Editorial by default).

## Workflow
1. **State the type + colour first** (anti-slop charter, `doctrine/design-doctrine.md` §2). Pick a
   **group 01 Editorial** pairing — a distinctive serif display over a refined body (e.g. *Andada Pro →
   Source Serif 4*, or *Libre Caslon Text → Public Sans* for a quieter body). Name the faces, the palette
   intent, and why they fit a bankable document **before** laying out a single page. Never a banned
   font (`doctrine/references/ai-slop-banned-fonts.md`); scan `fonts/01-formal-institutional/` for a
   licensed premium family first (`premium-font-scan`).
2. **Set the page grid & margins.** Choose trim (A4 = 210×297 mm), a column grid (single-column body
   with a wide outer/marginalia column is the bankable default), and asymmetric margins for a binding
   gutter. See `references/proposal-section-architecture.md` §Grid.
3. **Design the cover system** (`references/cover-and-divider-systems.md`): a single strong
   typographic idea, the document title at hero scale, client + author marks, date/version/confidence
   line, and an optional full-bleed image with a contrast overlay. Build the worked spec from
   `examples/proposal-cover-spec.md`.
4. **Architect the sections** (`references/proposal-section-architecture.md`): front matter →
   executive summary → the argument → exhibits/appendices, each opening on a **section divider** and
   carrying numbered headings (H1–H4 with real size/weight extremes per
   `doctrine/references/type-scale-and-spacing.md`).
5. **Lay out exhibit pages** (`examples/exhibit-page-layout.md`): figure/table number, caption,
   source note, and a consistent exhibit frame — the IC reads the exhibits first, so they must be
   self-explanatory.
6. **Set running headers/footers & pagination**: section name + page number, front matter in roman
   numerals, body in arabic, no header/footer on cover or dividers.
7. **Embed & preflight** (`references/print-ready-pdf-checklist.md`): confirm **all fonts embedded
   and subsetted**, colour space correct (sRGB for screen / CMYK for print), images ≥300 dpi, PDF/A
   or PDF/X where required, accessible tags + reading order, and bleed/crop marks if printing.
8. **Typeset and hand to print.** Run the `fine-typesetting-and-typesetting-qa` pass on the
   rendered pages. For commercial litho, special finishes, folding or binding, hand the job to
   `print-production-and-finishing` for the printer specification, ink limits, proofs and press
   check; the checklist here covers screen and office-print PDFs.

## Decision Rules
| Condition | PDF choice | Wrong-choice failure |
|---|---|---|
| Document must remain editable | Produce DOCX source first | PDF-only workflow blocks maintenance |
| Lender/evaluator scans quickly | Strong section architecture and exhibit hierarchy | Decorative layouts hide bankability evidence |
| Print and screen both matter | Test crop, margins, links, bookmarks, and contrast | One-medium optimisation fails the other |
| Job goes to a commercial printer | Route to `print-production-and-finishing` and use the printer's own specification | Book-era ink or bleed numbers cause a failed run |

## Capability Contract
Read, edit, PDF generation, inspection, and page rendering are required for production. Execution is required for font, link, bookmark, accessibility, and preflight claims. Submission or publication requires separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without PDF rendering or preflight, deliver source and a conditional proof only. Stop release when font embedding, page integrity, citations, links, print constraints, or accessibility cannot be inspected.

## Anti-Patterns
- A **default Word/Docs export** as the "design": Calibri/Times, 1-inch margins, no cover system, no
  divider rhythm — the single biggest tell that no one designed the document.
- Fonts **referenced not embedded** → the bureau substitutes Arial and the layout reflows. Always
  preflight (`embedding-by-format.md` §PDF: "confirm the library embeds, not references").
- **Exhibits without numbers, captions, or source notes** — a bankable document is only as
  trustworthy as its sourced exhibits.
- A **stock blue-gradient cover** with centered everything; banned fonts; timid type steps (hero and
  body almost the same size).
- RGB images sent to a **CMYK** print job; sub-150-dpi screenshots blown up; missing bleed on a
  full-bleed cover.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Print-ready and screen-ready PDF | Evaluator, lender, or client | Page architecture and exhibits support rapid evidence retrieval |
| Source, font, licence, and citation register | Maintainer and compliance owner | Every embedded asset and claim is traceable |
| Render and preflight evidence | Release owner | Pages, fonts, links, bookmarks, metadata, and print bounds pass |
- A complete **PDF design spec**: stated type + colour, page grid & margins, a cover spec, the
  section architecture with the divider system, exhibit-page templates, header/footer + pagination
  rules, and a passed print-ready preflight checklist — ready to build in the generating tool
  (InDesign, LaTeX, Typst, HTML-to-PDF, or a designed DOCX→PDF export).

## Examples
- `examples/proposal-cover-spec.md` — a fully dimensioned A4 cover (real mm/pt values, grid, type
  sizes, colour).
- `examples/exhibit-page-layout.md` — a worked exhibit/figure page with frame, caption, and source
  note dimensions.

## References
- `references/proposal-section-architecture.md` — section order, the page grid, heading scale, TOC.
- `references/cover-and-divider-systems.md` — cover patterns + the section-divider system.
- `references/print-ready-pdf-checklist.md` — the embed + preflight gate before you ship.
- `doctrine/design-doctrine.md` (Mission, anti-slop charter), `doctrine/references/embedding-by-format.md`
  (PDF embedding), `font-groups-and-usage.md` (group 01 Editorial), `ai-slop-banned-fonts.md`,
  `type-scale-and-spacing.md`, `wcag-2.2-criteria.md` (tagged-PDF accessibility, contrast).
<!-- dual-compat-end -->
