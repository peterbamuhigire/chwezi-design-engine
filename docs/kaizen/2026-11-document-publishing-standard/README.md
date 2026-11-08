# Kaizen record: Chwezi Document Reporting and Publishing Standard (8 November 2026)

**Owner instructions (8 November 2026).** Build the Chwezi Document Reporting and Publishing Standard
into the writing, dev, development and design engines, each working on its own; then review the work
against the full edition of the handbook; and apply the best scientific formulas, algorithms and
mathematics wherever they give the engines an edge.

## Sources

- Concise edition (Version 1.0, 8 November 2026): read in three passes; used for the first draft.
- Full edition, "Chwezi Document Reporting and Publishing Standard" (Version 1.0, 8 November 2026,
  Chwezi Core Systems Limited Design System Series; sections 1-15 and annexes A-O, stated to be
  normative): read in three passes; the draft was reviewed and rebuilt against it.

## Review of the first draft against the full edition

| # | Finding | Change |
|---|---|---|
| K1 | The draft followed the concise edition and missed most of the full edition's normative annexes | Rebuilt the rules (76, then 87 with mathematics) and references around sections 1-15 and annexes A-O |
| K2 | Margins, type scale and leading in the draft came from the concise edition | Replaced with the full edition's values: margins 16-22 mm from 18 mm, safe zones 8-12 mm, cover 26-36, H1 17-22, H2 12-16, body 9.5-11, notes 8-9 pt, leading 1.15-1.4 |
| K3 | No status vocabulary, as-of cutoff or transaction-versus-posting date | Added to PUB-IDENT-001/002 and to gate 03 |
| K4 | No rule against overwriting a published document | Gate 08 now covers silent overwrite; corrections are new versions (PUB-AUDIT-002), matching the owner's voided-never-deleted rule |
| K5 | Renderer contracts were thin | Full CSS and HTML, PDF and DOCX contracts, including determinism, metadata hygiene and the Word and LibreOffice round trip |
| K6 | The handbook's "rule" colour #D9E2E8 measures 1.31:1 on white | Kept as decorative only; any meaningful line (subtotal and total rules, table structure) uses ink (13.19:1) |
| K7 | The handbook allows a dash for missing values by policy; Chwezi policy forbids a bare dash | "Not available" with a reason (PUB-FIN-006) |
| K8 | The handbook allows 3-6 measures; the Reporting standard sets 3-5 on reporting surfaces | The stricter rule applies on reporting surfaces (PUB-ARCH-004) |
| K9 | The concise edition's rule that machine-written insight is labelled AI-assisted is only implicit in the full edition | Kept as PUB-CONTENT-006 under gate 02 |
| K10 | The concise edition cited CSS Fragmentation Level 4, which is a Working Draft; Level 3 is the Candidate Recommendation | Recorded in the currentness register (PB2) |

## Mathematics added (owner instruction)

New reference `mathematics-and-algorithms.md` and rules PUB-MATH-001 to 011. Computed on 2026-11-08:

- Modular type scale, body 10.5 pt x 1.25^n: notes 8.4, H2 13.1, H1 20.5, cover 32.0 pt, all inside the
  handbook ranges.
- Measure: a single 174 mm A4 column at 10.5 pt gives 85-104 characters per line, beyond the 45-75
  range; running prose therefore takes a 110-135 mm text block or two columns.
- Lines per page: 50 at 10.5/13.65 pt on 241 mm of text height.
- Largest-remainder rounding: three equal shares print 34%, 33%, 33% (naive rounding gives 99%).
- Nice axis ticks, banking to 45 degrees, page breaking by minimum total cost, exact arithmetic,
  WCAG luminance, perceptual colour spaces, image resolution, content hashing and perceptual
  visual regression.

## Routing

Descriptions of the reporting, publishing and Product Excellence skills were tuned against the
fixtures (the shared words "Chwezi" and "standard" had pulled a Product Excellence prompt to the
reporting skill). Result: 102 fixtures, precision@1 95% (93% before this work), precision@3 100%,
owned negatives 53/53.

## Adoption checklist

Tracked in `references/agent-contract-and-qa.md`, Task 7. Only "approved and version-controlled" is
done; golden templates, data contracts, export preservation, office-printer inspection, browser
reading on every device, security, accessibility and performance gates, and named template owners
are `NOT_ASSESSED`.

## Not assessed

No Chwezi document has yet been produced or reviewed against this standard. The methods in the
mathematics reference are specified, not yet implemented in a renderer.
