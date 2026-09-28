# Example: Applied Style Spec — "Maduuka FY2026 Market Entry Report"

A full, concrete application of `references/docx-style-system.md` to a real document: a
28-page market-entry report for Maduuka (Letter trim, externally distributed to a bank). This is
what "state the choice, then apply real values" produces — copy these settings directly.

---

## 0. Type choice (stated first, per the charter)

> **Headings:** Andada Pro (variable serif, Huerta Tipográfica) — its sturdy, calligraphic,
> semi-slab letterforms read as authored and institutional, right for a bankable report.
> **Body:** Source Serif 4 — a calm, screen-and-print legible serif that holds at 11 pt over 28
> pages. **Data/code:** JetBrains Mono, only in the financial appendix. Three families, all OFL,
> all licence-clear to embed and subset. Rejected: Calibri/Aptos (Word default = slop signal),
> Times New Roman (dated reflex), Inter (the AI mean).

Premium scan: `fonts/01-formal-institutional/` held no purchased family for this job, so the
baseline pairing stands.

---

## 1. Page setup (applied)

- Trim **8.5 x 11 in**; margins **T 1.0 / B 1.0 / L 1.25 / R 1.0 in**; body measure **6.25 in**.
- Header/footer **0.5 in** from edge.
- **Section 1** (cover + TOC): page numbers suppressed on cover, **roman i, ii** on TOC.
- **Section 2** (body): restarts at **arabic 1**, "Different first page" off.

---

## 2. Named styles as applied (exact values)

| Style | Font | Size | Line | Before/After | Weight/Case | Colour | Outline |
|---|---|---:|---|---|---|---|---|
| Title | Andada Pro | 32 | Exact 36 | 0 / 18 | 600 sentence | `#1A1A1A` | — |
| Subtitle | Source Serif 4 | 15 | 20 | 0 / 24 | 400 italic | `#5A5A5A` | — |
| Heading 1 | Andada Pro | 20 | Exact 24 | 24 / 8 | 600 | `#0B3D2E` (Maduuka green) | L1 |
| Heading 2 | Andada Pro | 15 | 20 | 18 / 6 | 600 | `#1A1A1A` | L2 |
| Heading 3 | Source Serif 4 | 12.5 | 16 | 14 / 4 | 600 | `#1A1A1A` | L3 |
| Heading 4 | Source Serif 4 | 11 | 15 | 12 / 3 | 600 italic | `#5A5A5A` | L4 |
| Body Text | Source Serif 4 | 11 | 1.15 | 0 / 8 | 400 | `#1A1A1A` | body |
| Lead | Source Serif 4 | 12.5 | 18 | 0 / 12 | 400 | `#1A1A1A` | body |
| Quote | Source Serif 4 | 11 | 16 | 8 / 8 | 400 italic, 0.4 in indent, green left rule | `#5A5A5A` | body |
| Caption | Source Serif 4 | 9 | 12 | 4 / 10 | 500 ("Table N."/"Figure N." run-in) | `#5A5A5A` | — |
| Table Header | Source Serif 4 | 10 | single | 2 / 2 | 600, on `#0B3D2E` 12% tint | `#1A1A1A` | — |
| Table Text | Source Serif 4 | 10 | single | 2 / 2 | 400 | `#1A1A1A` | — |
| Code | JetBrains Mono | 9.5 | 13 | 6 / 6 | 400 on `#F4F4F4` | `#1A1A1A` | — |
| Header Text | Source Serif 4 | 8.5 | single | 0 / 0 | 400 caps, +6% tracking | `#5A5A5A` | — |
| Footer Text | Source Serif 4 | 8.5 | single | 0 / 0 | 400 | `#5A5A5A` | — |

Scale check: 11 -> 12.5 -> 15 -> 20 -> 32. Five clean steps, ~1.25 ratio. No monotype.

---

## 3. Contrast verification (the accent is the only risk)

| Pair | Ratio | Verdict |
|---|---|---|
| Body `#1A1A1A` on white | 17.4:1 | AAA |
| Caption `#5A5A5A` on white | 7.0:1 | AAA small text |
| H1 `#0B3D2E` on white | **9.8:1** | passes AA (>= 4.5:1) for text — keep |
| Table header text `#1A1A1A` on `#0B3D2E` 12% tint (`#E6EDEB`) | 15.3:1 | AAA |

The Maduuka green at full strength clears 4.5:1, so it can carry H1 *text*; no darkening needed.
(If it had failed, we'd reserve the bright green for rules/fills and darken it for text.)

---

## 4. Letterhead, headers, footers, numbering (applied)

- **Cover/letterhead (first page, Section 1):** Maduuka logo (vector EMF) top-left at 1.4 in
  wide; identity block right-aligned (registered name, Plot/Street, Kampala, phone, domain) in
  Footer Text style; a 1 pt green rule under the band.
- **Running header (Section 2):** left = "Maduuka — FY2026 Market Entry Report"; right = current
  Heading 1 via a `STYLEREF` field, in Header Text caps. Hairline rule below.
- **Footer (Section 2):** left = "Confidential — prepared for [Bank]"; centre = nothing; right =
  `Page { PAGE } of { NUMPAGES }` fields. Statutory line ("Maduuka Ltd, Co. Reg. ...") 8 pt below.

---

## 5. TOC (applied)

References -> Table of Contents -> custom: **Heading 1-3**, dotted tab leader, right-aligned page
numbers, hyperlinked. Placed in Section 1, set to **update on open**. H4 excluded (run-in level).

---

## 6. Tables and figures (applied)

- Single named table style "Maduuka Report Table": hairline horizontals only, header row green
  12% tint, header repeats across pages, numeric columns right-aligned with 0 decimals (UGX) and
  tabular figures, 0.06/0.10 in padding, even-row zebra `#F7F7F7`.
- Captions via `SEQ` fields: **Table N.** above, **Figure N.** below, "Keep with next" on.
  Cross-refs ("see Table 4") inserted as cross-reference fields, not typed.

---

## 7. Embed and subset (applied)

File -> Options -> Save -> [x] "Embed fonts in the file" + [x] "Embed only the characters used".
Result: Andada Pro + Source Serif 4 + JetBrains Mono subset ~ **+180 KB** total on a 2.1 MB document —
negligible, and it renders identically on the bank's machines.

---

## 8. Accessibility pass (applied result)

Language = English (Uganda); heading tree H1->H3 unbroken; all 9 charts have alt text, 2 decorative
rules marked decorative; every table has a repeating header row and no merged cells; title set in
properties; links use descriptive text. **Word Accessibility Checker: 0 errors, 0 warnings.**
Exported PDF carries structure tags and embedded fonts.

---

## What this proves

Not one setting here is a Word default. Every value traces to `docx-style-system.md`, every
contrast pair is verified against `wcag-2.2-criteria.md`, and the type choice is stated and
justified. That is the difference between a generated `.docx` and an authored one.
