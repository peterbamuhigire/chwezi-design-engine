# Worked Example: A4 Proposal Cover Spec

A fully dimensioned cover for a bankable infrastructure-financing proposal. Real values, ready to
build in InDesign / Typst / LaTeX / HTML-to-PDF. Pattern used: **typographic / editorial** (pattern 1
in `references/cover-and-divider-systems.md`), with a thin left accent band as the recurring thread.

---

## Brief (stated first, per the anti-slop charter)

- **Document:** "Kabaale Solar IPP — Project Finance Proposal", prepared for a development-finance
  lender's investment committee.
- **Type (group 01 Editorial):** **Andada Pro** (display, headline) over **Source Serif 4** (body /
  marks). Reason: Andada Pro's sturdy, calligraphic semi-slab cut reads as institutional and authored
  — the opposite of a Calibri export — while Source Serif 4 keeps the body credible and quiet. Both
  are OFL, safe to embed (`font-groups-and-usage.md`). Scanned `fonts/01-formal-institutional/`
  first; no licensed premium family present, so baseline used.
- **Colour:** ground **warm off-white `#FAF8F4`**; ink **near-black `#1A1A1A`**; single accent
  **deep teal `#0F4C4A`** (the recurring thread). No gradient.
- **Output:** A4, bound left edge, colour print at bureau → **CMYK**, 3 mm bleed on the accent band.

---

## Page & grid

| Property | Value |
|---|---|
| Trim | 210 × 297 mm (A4 portrait) |
| Bleed | 3 mm all edges (band bleeds left + top + bottom) |
| Margins | inside (left/gutter) 22 mm · outside (right) 18 mm · top 24 mm · bottom 22 mm |
| Left accent band | solid `#0F4C4A`, width **14 mm**, full height, bleeds 3 mm off left/top/bottom |
| Type column | left edge at 32 mm from trim (band 14 + 18 breathing), right edge at 192 mm |
| Header/footer/page number | **none** (cover rule) |

All vertical positions snap to the 12 pt baseline grid.

---

## Content blocks (top → bottom)

| Block | Y (from trim top) | Type | Size / leading | Weight / colour | Tracking |
|---|---|---|---|---|---|
| **Eyebrow** — "PROJECT FINANCE PROPOSAL" | 40 mm | Source Serif 4 | 9 / 12 pt | 600, `#0F4C4A`, UPPERCASE | +0.06em |
| **Title** — "Kabaale Solar IPP" | 96 mm | Andada Pro | **64 / 64 pt** | 600, `#1A1A1A` | -0.01em |
| **Title line 2** — "40 MW · Hoima District" | (next baseline) | Andada Pro | 64 / 64 pt | 600, `#1A1A1A` | -0.01em |
| **Subtitle** — "Senior Debt Facility — Information Memorandum" | +14 mm below title | Source Serif 4 | 14 / 20 pt | 400 italic, `#1A1A1A` | 0 |
| **Thin rule** | +12 mm | — | 0.75 pt rule, `#0F4C4A`, 90 mm wide | — | — |
| **Prepared for** — "Prepared for: [Lender] Investment Committee" | 244 mm | Source Serif 4 | 10 / 14 pt | 400, `#1A1A1A` | 0 |
| **Prepared by** — org name + logo | 252 mm | Source Serif 4 | 10 / 14 pt | 600, `#1A1A1A` | 0 |
| **Meta line** — "Strictly Private & Confidential · v3.0 · June 2026 · Ref KSL-IM-026" | 270 mm | Source Serif 4 | 8.5 / 12 pt | 400, `#1A1A1A` at 80% | 0 |

> **Hero-to-body jump:** 64 pt title vs 10 pt body = **6.4×** — an unmistakably real step, not a timid
> one (`type-scale-and-spacing.md`).

---

## Why this passes the gate

- **Authored, not exported:** one strong typographic idea (giant Andada Pro title, left teal band),
  top-aligned to the grid, no centered-on-gradient cliché.
- **No banned font;** display face carries the cover; real size extreme.
- **Recurring thread:** the teal band + teal eyebrow + teal rule reappear on every divider and exhibit
  frame, making the document one object.
- **Bankable signals:** confidentiality line, version, and reference number all present.
- **Print-ready:** CMYK, 3 mm bleed on the band, fonts embed+subset on export — run
  `references/print-ready-pdf-checklist.md` before shipping.
