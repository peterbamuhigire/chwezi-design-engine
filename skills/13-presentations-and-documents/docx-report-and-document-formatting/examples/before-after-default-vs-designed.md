# Example: Before / After — Default Word vs Designed DOCX

The same first content page of the Maduuka FY2026 report, shown as the reflexive Word default and
as the styled, tagged version this skill produces. Use it to see exactly which decisions move a
document off the AI/template mean.

---

## BEFORE — the default (what you get if you do nothing)

```
[ Calibri/Aptos 11 pt everywhere ]

Market Entry Report                      <- typed, bold, 16 pt manual run
                                            (no Title style, no outline level)

Introduction                             <- bold 13 pt manual run, not Heading 1
Maduuka is planning to enter the FMCG distribution market. This report covers the
opportunity, the competitive landscape, the financials and the risks. ...

Market Size                              <- bold 12 pt manual run, not Heading 2
The market is large. See the table below.

Table 1                                  <- typed plain text "Table 1", bold
+----------+----------+----------+        <- full box borders, vertical + horizontal
| Quarter  | Revenue  | Growth   |        <- header NOT a real header row
+----------+----------+----------+        <- numbers left-aligned, inconsistent decimals
| Q1       | 1200000  | -        |
| Q2       | 1,350,000| 12.5     |
+----------+----------+----------+

Page typed as "Page 1" by hand in the footer.
No TOC (or one typed by hand). No letterhead. Fonts not embedded.
```

### Why this is slop (the tells)
- **Calibri/Aptos** default = the unmistakable "no one thought about this" signature.
- **Manual bold runs**, not named styles -> no TOC, no accessibility tree, no restyle.
- **One font, one size** doing all the work -> monotype slop signal (charter section 3).
- **Boxed table**, left-aligned numbers, mixed decimals -> reads as a raw spreadsheet paste.
- **Typed "Table 1"** and **typed "Page 1"** -> never renumber; break on edit.
- **No embedding** -> renders in a substitute font on the recipient's machine.
- **No language, no alt text, no header row** -> fails Word's Accessibility Checker.

---

## AFTER — the designed, tagged version

```
[ Andada Pro headings + Source Serif 4 body, embedded + subset ]

--- Letterhead band: Maduuka logo + identity block, 1pt green rule ---

Market Entry Report                      <- Title style, Andada Pro 32/36, 600
FY2026 opportunity, landscape and risk   <- Subtitle, Source Serif 4 15 italic, Muted

1  Introduction                          <- Heading 1, Andada Pro 20, green #0B3D2E, OUTLINE L1
Maduuka is entering FMCG distribution.   <- Lead, Source Serif 4 12.5/18
This report covers the opportunity, ...  <- Body Text, Source Serif 4 11/1.15

1.1  Market size                         <- Heading 2, Andada Pro 15, OUTLINE L2

Table 1. Revenue build-up by quarter     <- Caption style (SEQ field), 9 pt Muted, above table
+------------------------------------+
| Quarter   Revenue (UGX)   Growth   |   <- real header row, green 12% tint, REPEATS across pages
|------------------------------------|   <- hairline horizontal rules only, no verticals
| Q1          1,200,000        -     |   <- numbers RIGHT-aligned, tabular figures, 0 decimals
| Q2          1,350,000     +12.5%   |   <- even-row zebra #F7F7F7
+------------------------------------+

Running header: "Maduuka — FY2026 Market Entry Report"  |  Introduction (STYLEREF)
Footer: Confidential — prepared for [Bank]   |   Page { PAGE } of { NUMPAGES }
```

### What changed, line by line
| # | Before | After | Source rule |
|---|---|---|---|
| 1 | Calibri/Aptos default | Andada Pro + Source Serif 4, stated & justified | charter section 2; font-groups-and-usage.md |
| 2 | Bold 16 pt run | **Title** style 32/36 | docx-style-system.md |
| 3 | Bold heading runs | **Heading 1-4** bound to outline levels | docx-style-system.md |
| 4 | No TOC | TOC auto-generated from Heading 1-3 | SKILL workflow step 5 |
| 5 | Typed "Page 1" | `PAGE`/`NUMPAGES` fields, "Page X of Y" | workflow step 4 |
| 6 | No letterhead | Letterhead band + STYLEREF running header | workflow step 4 |
| 7 | Boxed table, left nums | Hairline rules, real header row, right-aligned tabular nums | tables-and-figures.md |
| 8 | Typed "Table 1" | **Caption** SEQ field "Table 1." | tables-and-figures.md |
| 9 | Fonts not embedded | Embedded + subset (~+180 KB) | embedding-by-format.md |
| 10 | No a11y | Language set, alt text, header row, AA contrast — 0 Checker errors | accessible-docx-tags.md; wcag-2.2-criteria.md |

---

## The one-line difference

Before, every choice was a default. After, every choice is *stated, sized, tagged, and
defensible* — the document now looks like skilled human hands made it, which is the entire moat
the doctrine exists to protect.
