# 02 — Coverage and Taxonomy

**Taxonomy & structure: 60 / 100 (judged).** Baseline 21 June 2026: 48.

## What is sound

- Sixteen numbered groups with a stated scope each in `doctrine/design-doctrine.md` §3; the filesystem is
  the index (fresh glob every time), so there is no stale registry to drift.
- Group 00 is explicitly cross-cutting and co-activates with every other group, which matches how
  accessibility and QA work in practice.
- The June defects are closed: the deck-only "document" group, the 16-skill web grab-bag and the missing
  homes for accessibility, tokens, motion, content and imagery.
- Zero-debt contract: `validate_engine.py` reports 101/101 fully compliant.

## Named deficiencies

| # | Deficiency | Evidence | Effect |
|---|---|---|---|
| T1 | **Diagrams have no home.** A declared output type is served only by `13-…/docx-report-and-document-formatting/references/diagram-visual-standards.md` | No SKILL, no routing fixture mentioning diagrams (grep of `tests/routing-fixtures.yml`: 0) | Slide, web, SRS and handoff diagrams route nowhere; the font gate covers `.mmd`/`.svg` but no skill teaches the craft |
| T2 | **Audit/review sprawl in group 00** | Eight overlapping review skills (listed in `03-existing-groups-audit.md`) plus `heuristic-evaluation-and-design-critique` in group 05 | Routing ambiguity; four of these are zero-inbound |
| T3 | **Small groups** | 08 motion (3), 10 content (3), 03 layout (4), 12 data viz (4) | Motion has no native (SwiftUI/Compose) implementation skill; data viz concentrates in one 29 KB skill |
| T4 | **Thin group 15** | Five skills of 93–96 lines, 19–28-line references, 11–15-line examples | A group exists in name ahead of its depth |
| T5 | **Generic sector router** | `sector-strategies` keeps generic workflow and legacy parking; its example (fintech) contradicts its Do-Not-Use | The group's routing boundary is unclear |
| T6 | **Mirrored domain pack** | `hospitality-hotel-restaurant` mirrored in five engines (declared) with no references here | Declared, but the design copy carries no design-specific depth |
| T7 | **Colour/contrast overlap** | 0.768 cosine between `accessible-color-and-contrast` and `color-system-and-palette` | Within-engine collision reported by the union scan |

## Proposed adjustments (no restructure needed)

1. Add `13-presentations-and-documents/diagram-and-technical-illustration` (or a new group-12 sibling),
   moving `diagram-visual-standards.md` into it and linking back from the DOCX skill.
2. Consolidate group 00's review family behind one router skill (`design-audit`) with the others as
   named modes or references; keep `accessibility-wcag-2-2-compliance` and `visual-product-slop-audit`
   separate.
3. Split `data-visualization` into encoding/perception and production/implementation halves.
4. Give group 08 a native motion implementation skill (SwiftUI and Compose) to pair with
   `motion-react-implementation`.
5. Either deepen group 15 to the engine's median depth or fold it into a single orchestration skill with
   references until real game work justifies five skills.
