---
name: chwezi-infographics-standard
description: "Use when a Chwezi infographic (process, cycle, timeline, comparison, hierarchy, journey, cutaway, safety poster, social card, A2 poster) is released: provenance register, real text at computed sizes, honest encodings, checked diagram structure, no synthetic photorealism, eight INFO gates. Infographic craft: data-illustration-and-infographics."
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Chwezi Infographics Design and Production Quality Standard

Applies the Chwezi Infographics Design and Production Quality Standard (full edition, 1.0.0), the
fourth child standard of the Chwezi Product Excellence Standard, and decides whether an infographic
may be released. Adopted into the engines on 8 November 2026 on the instruction of Lead Developer
Peter Bamuhigire. Binding text:
[doctrine/infographics-standard.md](../../../doctrine/infographics-standard.md). Everything needed to
brief, structure, build, check and release an infographic is in this engine, including a
standard-library checker; no other engine is required.

## Use When

- A Chwezi infographic is planned, built, reviewed or released, for web, a SaaS report, social media,
  slides, DOCX, PDF or print up to A2.
- A process, cycle, hierarchy or journey diagram must be checked for duplicate, orphan or misordered
  steps.
- Someone asks how big poster text must be, what resolution an image needs, or whether a chart
  exaggerates.
- An AI tool is used to illustrate or lay out an infographic and its output must be controlled.

## Do Not Use When

- The work is general infographic craft for a non-Chwezi client: use
  `data-illustration-and-infographics`; one analytical chart goes to `data-visualization`.
- The output is a whole deck (`chwezi-presentation-standard`), a whole document
  (`chwezi-document-publishing-standard`) or a product report screen
  (`chwezi-reporting-and-dashboards-standard`); apply this standard to infographics inside them.
- The work is a live app screen: use `chwezi-product-excellence-standard`.

## Required Inputs

| Input | Supplied by | If missing |
|---|---|---|
| Audience, decision, takeaway, encounter context | Requester | Stop and ask; the structure depends on them |
| Reading distances and output sizes per rendition | Requester, printer | Assume 1 m for posters and a 360 px phone slot; record the assumption |
| Verified facts with sources | Content owner | Build the provenance register; block any claim without a source |
| Process or hierarchy as nodes and edges | Content owner, expert | Draft it from the brief and have the expert confirm it before layout |
| Brand tokens, licences, printer profile | Brand pack, printer | House tokens; leave unlicensed assets out; ask the printer |
| Approvers (content, design, technical, subject matter) | Owner | Release stays blocked until named |

## Workflow

1. **Brief** the audience, takeaway, renditions and approvers
   ([agent-workflow-and-qa.md](references/agent-workflow-and-qa.md)).
2. **Verify** every fact into the provenance register; flag illustrative numbers.
3. **Choose the archetype** from what the reader must understand
   ([archetypes-and-blueprints.md](references/archetypes-and-blueprints.md)).
4. **Structure as data**: write process and hierarchy diagrams as nodes and edges and run
   `python scripts/check_infographic.py graph diagram.json`; generate the long text equivalent with
   `describe`.
5. **Compute** type sizes per reading distance, image resolution, canvas text scale, ring and
   timeline geometry, and the lie factor of every encoding
   ([mathematics-and-algorithms.md](references/mathematics-and-algorithms.md)).
6. **Build** with real text, tokens and illustration on separate layers
   ([production-and-export.md](references/production-and-export.md)).
7. **Review** with the subject-matter expert, then accessibility.
8. **Export and proof** every rendition at actual size; run lint and visual regression.
9. **Score and release**: all gates measured, score at least 85, signed declaration, archive. Recover
   from a failed check by fixing it and re-running, never by downgrading its evidence.

## Decision Rules

| Situation | Choose | Risk if wrong |
|---|---|---|
| Content will not fit at the computed text size | Split into a series; never shrink critical text | Unreadable poster or card |
| A number has no source | Remove it or mark it illustrative on the graphic | A fabricated figure in public |
| The image generator garbles labels | Redraw the layout with real text over clean illustration | Pseudo-text released under the Chwezi name |
| A realistic photo of people is wanted | Use a real licensed photograph, or illustration | Synthetic imagery presented as evidence |
| The checker reports a numbering clash | Renumber to the true order, or redraw the flow | Readers follow steps in the wrong order |
| A loop exists only as rework | Draw it as a labelled return path, not a cycle | A "cycle" that misteaches the process |
| Safety, medical or financial content | Name the qualified reviewer before drafting | Harmful instruction |

## Capability Contract

- Read: briefs, source data, registers, diagram data, design files and exports.
- Execute: the bundled checker; rendering, contrast and preflight tools where available.
- Edit: only on a build or remediation request; reviews are read-only.
- No publishing, printing or posting on someone's behalf without authority.

## Degraded Mode

- No renderer or printer proof: deliver the brief, register, checked diagram data and specifications;
  INFO-GATE-02, 07 and 08 stay NOT_ASSESSED.
- No subject-matter reviewer: draft only; INFO-GATE-06 stays open.
- No Python: apply the formulas by hand from the mathematics reference and record the working.
- In every degraded case release is blocked until the gates are measured.

## Anti-Patterns

- Decorating before the structure is verified. Correction: structure and facts first, then style.
- Letting an image model draw text or "realistic" people. Correction: real type, illustration only.
- Shrinking type to fit. Correction: compute the minimum from the reading distance; split the story.
- Circles for linear processes. Correction: a cycle only for a genuine recurrence.
- Bubbles scaled by radius. Correction: area proportional to value; check the lie factor.
- Approving from a desktop preview. Correction: proof every rendition at actual size, phone and
  print included.

## Outputs

| Output | Consumer | Accepted when |
|---|---|---|
| Brief, register and checked diagram data | Content approver | Every fact sourced; structure check passes |
| Renditions (SVG master, web, social, slide, DOCX, PDFs) | Publishers, printer | Rendered and inspected at actual size |
| Long text equivalent and alt text | Readers using assistive technology | Generated from the validated data; reviewed |
| QA findings, score, declaration, archive | Release approvers | All gates MEASURED; score at least 85; signed |

## Examples

- [Worked review: A2 safety process poster (fictional)](examples/worked-review-a2-process-poster.md):
  nine findings, including a checker run, a print-size calculation and a lie-factor fix.

## References

- [rules-and-gates.md](references/rules-and-gates.md): every INFO rule and the eight gates.
- [archetypes-and-blueprints.md](references/archetypes-and-blueprints.md): what reference images
  teach, choosing the archetype, archetype contracts, the eight worked cases.
- [mathematics-and-algorithms.md](references/mathematics-and-algorithms.md): type size by distance,
  print resolution, phone canvas text, lie factor, graph checks, ring and timeline geometry, colour
  separation and ink, translation space, score, visual regression.
- [production-and-export.md](references/production-and-export.md): token sheets, illustration
  commissioning, every delivery format, print handoff, export matrix, performance and privacy.
- [agent-workflow-and-qa.md](references/agent-workflow-and-qa.md): stages, brief, provenance
  register, agent contract, automated checks, severity, accessibility, release declaration,
  repository.
- [currentness-register.md](references/currentness-register.md): WCAG, ISO 216, W3C complex images
  and translation, colour-vision simulation, ink limits, platform sizes, lie factor.
- [scripts/check_infographic.py](scripts/check_infographic.py): the standard-library checker.
- Companion standards: [chwezi-presentation-standard](../chwezi-presentation-standard/SKILL.md),
  [chwezi-document-publishing-standard](../chwezi-document-publishing-standard/SKILL.md) and
  [chwezi-reporting-and-dashboards-standard](../chwezi-reporting-and-dashboards-standard/SKILL.md);
  parent [chwezi-product-excellence-standard](../chwezi-product-excellence-standard/SKILL.md).

## Evidence and currentness

Standards facts are recorded in the currentness register (IF1-IF9). Type, spacing and score values are
Chwezi values from the handbook; legibility, resolution, scale and geometry figures were computed on
2026-11-08. Following this standard is not a claim of WCAG conformance for print.
