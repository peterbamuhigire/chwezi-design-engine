# Reference: DOCX Named Style System (real pt sizes)

The canonical named-style set for a premium 01 Formal / Institutional Word document.
Every value is a *real* setting you enter in Word's style editor. Define these as **named
paragraph styles** (and a few character styles), bind the heading styles to Word's built-in
**outline levels** so the TOC and the accessibility tag tree read them. Never format headings
with manual bold/size runs.

> Default pairing (baseline, always available): **Andada Pro** (display serif) for Title/Headings,
> **Source Serif 4** for body — or **Public Sans** body for a quieter sans counterpoint. Scan
> `fonts/01-formal-institutional/` for a purchased premium family and prefer it when it
> improves the result. Never Calibri, Aptos, Inter, or Times New Roman as a reflex.

---

## Page setup

| Property | Letter (US) | A4 (intl) |
|---|---|---|
| Trim | 8.5 × 11 in | 210 × 297 mm |
| Margins (T/B/L/R) | 1.0 / 1.0 / 1.25 / 1.0 in | 25.4 / 25.4 / 31.7 / 25.4 mm |
| Gutter | 0 (single-sided) · 0.25 in (bound, with mirror margins — see below) | 0 · 6 mm |
| Body measure | ~6.25 in (≈ 90–95 chars at 11 pt) | ~152 mm |
| Header / footer from edge | 0.5 in | 12.7 mm |
| Baseline grid | 14 pt leading lattice (body line height) | same |

Front matter (title page, TOC) = its own section, page numbers in **lowercase roman (i, ii)** or
suppressed. Body = a new section restarting at **arabic 1**.

### Two-sided / bound documents (mirror margins + Even/Odd sections)

For documents that print **double-sided** or are **bound** (perfect-bound report, tabbed manual,
thesis), switch from fixed L/R margins to a symmetric, binding-aware layout:

- **Mirror margins.** Set Page Setup → Margins → *Multiple pages: Mirror margins*. The inner
  (binding-side) margin and outer (page-edge) margin then swap on left/right pages so the wider
  edge always faces the spine. Inner = the bound margin; outer = the trimmed edge.
- **Binding gutter.** Add a **gutter** of `0.25 in` (`6 mm`) — extra space reserved for the
  binding/punch holes — *on top of* the inner margin, set to the **inside** position so it lands
  at the spine. Single-sided documents keep gutter `0`.
- **Even/Odd-page section breaks.** Use a **Section Break (Odd Page)** before each chapter/major
  Heading 1 so chapters always open on a **right-hand (recto)** page, matching print convention
  (Word inserts a blank verso where needed). Then enable Page Setup → Layout →
  *Different odd and even pages* so you can compose **distinct left- and right-page headers/
  footers** — e.g. document title (verso) vs. section title (recto), with the page number on the
  **outer** edge of each (left on even, right on odd). Use **Even Page** breaks where the next
  section must open on a left-hand page instead.

---

## The named style hierarchy

Font = heading face (H) = Andada Pro; body face (B) = Source Serif 4. Colour `Ink` = `#1A1A1A`
(near-black, never pure `#000`), `Accent` = brand hex, `Muted` = `#5A5A5A`.

| Style name | Based on / font | Size (pt) | Line spacing | Space before / after | Weight & case | Colour | Outline level | Notes |
|---|---|---:|---|---|---|---|---|---|
| **Title** | (none) · H | 32 | Exact 36 pt | 0 / 18 pt | 600, sentence case | Ink | — | Cover/first page only |
| **Subtitle** | Title · B | 15 | 20 pt | 0 / 24 pt | 400 italic | Muted | — | Tagline under title |
| **Heading 1** | (none) · H | 20 | Exact 24 pt | 24 / 8 pt | 600 | Accent | **Level 1** | Page/section break before optional |
| **Heading 2** | H1 · H | 15 | 20 pt | 18 / 6 pt | 600 | Ink | **Level 2** | |
| **Heading 3** | H2 · B | 12.5 | 16 pt | 14 / 4 pt | 600 | Ink | **Level 3** | |
| **Heading 4** | H3 · B | 11 | 15 pt | 12 / 3 pt | 600 italic | Muted | **Level 4** | Run-in feel; not in TOC |
| **Body Text** | (Normal) · B | 11 | 1.15 (≈14 pt) | 0 / 8 pt | 400 | Ink | Body | Default reading style |
| **Lead** | Body · B | 12.5 | 18 pt | 0 / 12 pt | 400 | Ink | Body | First/intro paragraph |
| **Quote** | Body · B | 11 | 16 pt | 8 / 8 pt | 400 italic, 0.4 in indent L+R | Muted | Body | Left rule in Accent |
| **List Bullet** | Body · B | 11 | 1.15 | 0 / 4 pt | 400 | Ink | Body | Hanging 0.25 in |
| **List Number** | Body · B | 11 | 1.15 | 0 / 4 pt | 400 | Ink | Body | Hanging 0.25 in |
| **Caption** | (none) · B | 9 | 12 pt | 4 / 10 pt | 500, "Table N." / "Figure N." run-in | Muted | — | Above tables / below figures |
| **Table Text** | Body · B | 10 | Single | 2 / 2 pt | 400 | Ink | — | Tighter than body |
| **Table Header** | Table Text · B | 10 | Single | 2 / 2 pt | 600 | Ink on Accent-tint | — | Repeats as header row |
| **Code** | (none) · JetBrains Mono | 9.5 | 13 pt | 6 / 6 pt | 400 | Ink on `#F4F4F4` | — | Inline accents allowed |
| **Footer Text** | (none) · B | 8.5 | Single | 0 / 0 | 400 | Muted | — | Page numbering, ref line |
| **Header Text** | (none) · B | 8.5 | Single | 0 / 0 | 400 letter-spaced caps | Muted | — | Running section title |

---

## Type scale rationale

The body anchor is **11 pt**. The heading ramp is a ~**1.25 modular scale** rounded to clean
Word values: 11 → 12.5 → 15 → 20 → 32 (Title). Caption steps **down** to 9 pt so figure metadata
never competes with body. This is a *real* scale with five distinguishable steps — the antidote
to the single-size monotype slop signal (charter §3).

- **One** display face (headings) + **one** body face. Code uses JetBrains Mono only where data/
  code appears. Three families maximum.
- Use weight (400 vs 600) and case, not extra fonts, to differentiate within a level.

---

## Colour & contrast guardrails

- Body `Ink #1A1A1A` on white = **17.4:1** — far above the 4.5:1 AA floor.
- `Muted #5A5A5A` on white = **7.0:1** — safe for captions/footers (small text).
- Any `Accent` used for Heading 1 text must be verified **≥ 4.5:1** on white (≥ 3:1 if ≥ 18.66 pt
  bold), per `doctrine/references/wcag-2.2-criteria.md`. If a brand accent fails, darken it for
  text use and keep the bright value for rules/fills only.
- Never use colour as the *only* signal for a heading level — size/weight/space carry it too.

---

## Implementation notes (library-agnostic)

- **Word UI:** Home → Styles pane → New Style for each row; set "Style based on" and "Style for
  following paragraph"; under Format → Paragraph set Outline Level for H1–H4.
- **python-docx:** create/modify `document.styles`; set `style.font.size = Pt(20)`,
  `paragraph_format.space_before/after = Pt(...)`, `line_spacing`, and
  `style.paragraph_format.outline_level` (via XML `w:outlineLvl`) so the TOC/tags pick them up.
- **Embed + subset** after styling (`doctrine/references/embedding-by-format.md`): File →
  Options → Save → "Embed fonts in the file" + "Embed only the characters used in the document".
- **Mirror margins / gutter / Even-Odd:** in Word, Layout → Margins → *Mirror margins*, set the
  **Gutter** and *Gutter position: Inside*, and Layout → *Different odd and even pages*; insert
  **Section Break (Odd Page)** before each chapter. In **python-docx**, set
  `section.gutter`, `section.different_first_page_header_footer`, and write `<w:mirrorMargins/>`
  plus `<w:evenAndOddHeaders/>` into `settings.xml`; use `WD_SECTION_START.ODD_PAGE` /
  `EVEN_PAGE` for `section.start_type`, and `section.even_page_header` / `odd_page` for the
  distinct headers/footers.
- **Reusable components (Building Blocks / Quick Parts):** save a finished **cover page**,
  **letterhead block**, or **exhibit/figure caption frame** as a reusable Building Block
  (Insert → Quick Parts → Save Selection to Quick Part Gallery; or the Cover Page / Header /
  Footer galleries) stored in a shared `.dotx` template, so identity components are inserted
  consistently rather than rebuilt by hand. (Template-level governance of these blocks belongs to
  `template-and-master-system-design`.)
