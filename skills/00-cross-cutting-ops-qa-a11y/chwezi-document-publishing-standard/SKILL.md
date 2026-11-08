---
name: chwezi-document-publishing-standard
description: "Use when a Chwezi report or formal document must agree across browser reading mode, A4 PDF, DOCX and print, or a proposal, profile, annual report, manual or letter is published: document identity, one canonical model, every page inspected, eight PUB gates. Report data: chwezi-reporting-and-dashboards-standard."
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Chwezi Document Reporting and Publishing Standard

Applies the Chwezi Document Reporting and Publishing Standard (full edition, 1.0.0) to reports and
formal documents and decides whether they may be published. Adopted into the engines on 8 November
2026 on the instruction of Lead Developer Peter Bamuhigire, as the publishing companion to the
Product Excellence and Reporting standards. Binding text:
[doctrine/document-publishing-standard.md](../../../doctrine/document-publishing-standard.md).
Everything needed to classify, compose, render, test and release a document is in this engine; no
other engine is required.

## Use When

- A product report needs a browser reading workspace, a print preview, an A4 PDF or a DOCX.
- A renderer pipeline (HTML and print CSS, PDF, DOCX, data export) is designed or changed.
- A proposal (technical or sponsorship), company profile, annual report, board or executive report,
  training manual, handbook, policy, newsletter or formal letter is produced or reviewed.
- Outputs of one report disagree, a page breaks badly, or a published document must be corrected.

## Do Not Use When

- The question is the report's data: metric contracts, reconciliation across screen and export,
  period rules, export safety and A4 floors belong to `chwezi-reporting-and-dashboards-standard`
  (apply both when a report is published).
- The work is a live app screen with no publication output: use `chwezi-product-excellence-standard`.
- Only Word mechanics are needed for a non-Chwezi document: use `docx-report-and-document-formatting`;
  final fixed-layout PDF craft goes to `pdf-proposal-and-bankable-document-design`.

## Required Inputs

| Input | Supplied by | If missing |
|---|---|---|
| Family, audience and purpose | Requester | Stop and ask; the archetype and blueprint depend on it |
| Entity, period, currency, classification, output formats, brand | Owner | Ask; never invent a status, owner or classification |
| Validated dataset or approved content with sources | Data owner or author | Stop; nothing is drafted from unverified figures |
| Brand tokens | Product brand pack | Use the handbook neutrals and house style; record it |
| Permissions for logos, testimonials, imagery, signatures | Owner | Leave them out until permission or approval is recorded |

## Workflow

1. **Classify** the archetype and family; take the blueprint and the narrative ladder
   ([families-and-blueprints.md](references/families-and-blueprints.md)).
2. **Validate** the inputs and lineage ([agent-contract-and-qa.md](references/agent-contract-and-qa.md));
   stop if totals mismatch or required data is missing.
3. **Plan**: outline, map each visual to a reader question, choose components and the page sheet.
4. **Build** the semantic model; set tokens, page geometry and the reader; implement the HTML, PDF
   and DOCX mappings ([page-and-render-pipeline.md](references/page-and-render-pipeline.md)); derive
   the type scale, measure, baseline grid and page breaks by computation
   ([mathematics-and-algorithms.md](references/mathematics-and-algorithms.md)).
5. **Render** every output from the one model; never compute a figure from displayed text.
6. **Kaizen, four passes**: simplify; improve hierarchy and clarity; verify truth; improve
   consistency and performance.
7. **Test**: financial cases, the edge-case library, every PDF and DOCX page at 100% and in
   greyscale, the DOCX round trip in Word and LibreOffice, and the acceptance viewports.
8. **Correct** and repeat steps 5-7. Recover from a failed check by fixing it and re-running, never
   by downgrading its evidence.
9. **Release** with the QA manifest, the human approval for controlled documents, and a new version
   for any correction. Any open PUB gate blocks publication.

## Decision Rules

| Situation | Choose | Risk if wrong |
|---|---|---|
| A table is too wide for A4 portrait | Landscape page or appendix with a note | Silent truncation hides figures |
| A dashboard must become a report | Apply the transformation rules: conclusions first, reflowed charts, appended tables | A shrunken dashboard nobody can read |
| A value is missing | "Not available" with a reason | A missing value read as zero |
| A line separates subtotals or totals | Draw it in ink, not the pale rule colour | The structure disappears in print and fails non-text contrast |
| A published document needs correcting | Issue a revised version with history | A silent overwrite destroys the audit trail |
| An insight was machine-written | Label it AI-assisted with figures and comparison scope | A confident claim nobody verified |
| A logo, testimonial, image or signature lacks permission or approval | Leave it out | Misrepresentation and legal exposure |
| A mobile reader opens a long A4 report | Reflow reading mode | Pinch-zooming prose; unreadable output |
| Body prose set across the full A4 width | A 110-135 mm text block or two columns, computed from the font | 85-104 characters per line; readers lose their place |
| Shares or allocations are rounded for display | Largest-remainder rounding | Parts that add to 99% or 101% undermine trust in every figure |

## Capability Contract

- Read: report models, dataset snapshots, tokens, templates, rendered PDF and DOCX files.
- Execute: renderers, page-image comparison, reconciliation, accessibility and round-trip checks
  where available.
- Edit: only on an implementation or remediation request; reviews are read-only.
- No sending, publication or signature without separate authority.

## Degraded Mode

- No renderer: deliver the model, blueprint and page plan; PUB-GATE-04 and 06 stay NOT_ASSESSED.
- No dataset access: deliver the structure with placeholders marked as placeholders; PUB-GATE-01
  stays open.
- No Word or LibreOffice: render the DOCX with another engine and record the method; the round
  trip stays NOT_ASSESSED.
- In every degraded case publication is blocked until the gates are measured.

## Anti-Patterns

- Shrinking a desktop dashboard onto A4. Correction: recompose with one headline finding, a trend
  and 2-4 measures.
- Exporting screenshots as the PDF or DOCX. Correction: true text, native tables, vector charts.
- Parsing totals out of formatted strings. Correction: every renderer reads the validated model.
- Overwriting last month's published pack. Correction: a revised version with correction history.
- Showing a signature before approval. Correction: render signatures from the approval record only.
- Sending a pack after opening page one. Correction: inspect every page and record it.

## Outputs

| Output | Consumer | Accepted when |
|---|---|---|
| Semantic document model | Engineers, writers | Archetype, family, identity, sections, claims with evidence and approvals present |
| Rendered outputs (reader, PDF, DOCX, data) | Readers | Every page and viewport inspected; facts and totals agree |
| QA manifest | Approver | The nine-dimension matrix passes and all eight PUB gates are MEASURED |
| Release record | Auditors | Report ID, version, generation ID, renderer and template versions, snapshot, actor, parameter hash, approval and retention recorded |

## Examples

- [Worked review: monthly finance pack (fictional)](examples/worked-review-monthly-finance-pack.md):
  ten findings mapped to rules and gates.

## References

- [rules-and-gates.md](references/rules-and-gates.md): 87 PUB rules and the eight gates.
- [families-and-blueprints.md](references/families-and-blueprints.md): three archetypes, twelve
  blueprints, component catalogue, twelve page specification sheets, visual recipes, reference
  lessons.
- [page-and-render-pipeline.md](references/page-and-render-pipeline.md): tokens and themes with
  measured contrast, page geometry and type, screen-to-publication rules, reading workspace, HTML,
  PDF and DOCX contracts, accessibility, localisation, performance, security, financial outputs.
- [agent-contract-and-qa.md](references/agent-contract-and-qa.md): inputs, plan, build, four Kaizen
  passes, stop conditions, example brief, financial tests, edge cases, acceptance matrix, QA
  manifest, adoption checklist.
- [mathematics-and-algorithms.md](references/mathematics-and-algorithms.md): modular type scale,
  measure, baseline grid, line and page breaking by cost minimisation, largest-remainder rounding,
  exact arithmetic, nice axis ticks, banking to 45 degrees, computed colour, image resolution,
  content hashing and visual regression.
- [currentness-register.md](references/currentness-register.md): CSS paged media, PDF/UA, WCAG, ISO
  32000 and further-reading status.
- Companion standards: [chwezi-reporting-and-dashboards-standard](../chwezi-reporting-and-dashboards-standard/SKILL.md)
  and [chwezi-product-excellence-standard](../chwezi-product-excellence-standard/SKILL.md).

## Evidence and currentness

Standards facts are recorded in the currentness register (PB1-PB8). Type sizes, margins, page counts
and proportions are Chwezi values from the handbook; palette contrast was measured on 2026-11-08.
Following this standard does not make a document conformant with WCAG or PDF/UA; that needs
validation.
