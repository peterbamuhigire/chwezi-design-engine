---
name: diagram-design-and-handoff
description: Use when designing or reviewing a conceptual, process, architecture, sequence, state, or relationship diagram and preparing its source, visual checks, and implementation handoff. Use data-visualization for charts that encode measured data, and dashboard-and-data-product-design for dashboard page systems.
metadata:
  portable: true
  category: 12-data-viz-and-dashboards
  compatible_with:
  - claude-code
  - codex
---

# Diagram Design and Handoff

<!-- dual-compat-start -->
## Use When

- The work explains entities, steps, decisions, states, dependencies, or system boundaries through a diagram.
- A diagram needs to be created or reviewed across a document, presentation, web page, or product interface.
- The deliverable needs an editable source, accessible alternative, and engineering or publication handoff.

## Do Not Use When

- The visual encodes quantitative observations or comparisons; use `data-visualization` and `chart-selection-and-encoding`.
- The task is a page-level dashboard structure; use `dashboard-and-data-product-design`.
- The task is only a document's general figure placement and captioning; use `docx-report-and-document-formatting` or the relevant output-format skill.

## Required Inputs

| Input | Source | Required? | Evidence |
|---|---|---|---|
| Intended reader question and takeaway | Requester or decision owner | yes | One-sentence purpose |
| Nodes, relationships, sequence, or state rules | Domain owner or approved source | yes | Traceable list or model |
| Output medium, size, and editing needs | Publisher or implementation owner | yes | Named target and source format |
| Brand tokens and accessibility requirements | Design system or applicable standard | when available | Token/source references and checks |

## Workflow

1. Write the reader's question and the one claim the diagram should make. Verify every entity and relationship against its owner-provided source; mark unresolved relations as gaps.
2. Choose the diagram grammar that matches the relationship: ordered flow for sequence, state transitions for behavior, layered or grouped layout for architecture, and a matrix or table when crossings make a network hard to read.
3. Set a reading direction and hierarchy. Label groups and edges directly where practical; avoid crossings, unexplained abbreviations, decorative icons, and colour-only meaning.
4. Use design tokens for colour, type, spacing, and emphasis. Keep node count and label density within the output size; split or simplify before shrinking text below the medium's legibility requirement.
5. Provide editable source and a rendered output. Include a concise text equivalent that names the important nodes and relationships.
6. Render at the target size and medium. Check labels, contrast, focus/order when interactive, narrow-screen behavior, clipping, font loading, and export integrity. Record unrun checks as `NOT ASSESSED`.
7. Handoff the source format, renderer/version where relevant, dependencies, owner, intended insertion point, and acceptance checks. Stop production handoff if source ownership or a material relationship remains unresolved; do not claim readiness from source inspection alone.

## Quality Standards

- Every node and relationship has a source or is explicitly marked as an assumption or gap.
- Geometry and direction make the relationship legible without relying on colour alone.
- Captions and text alternatives describe the intended takeaway and meaningful relationships.
- Labels remain readable in the final rendered medium; visual polish does not replace a render check.

## Decision Rules

| Condition | Craft choice | Failure to avoid |
|---|---|---|
| One direction or sequence matters | Use a consistent reading path with numbered or directional cues | Ambiguous order or reversing arrows |
| Many relationships cross | Group, layer, filter, or replace with a matrix/table | Dense hairball that hides the structure |
| Nodes have distinct roles | Label roles and use a limited token-based visual distinction | Colour without labels or redundant meaning |
| Target medium is narrow or fixed-page | Recompose or split the diagram and test at final size | Shrinking the same desktop diagram until unreadable |
| Facts or links are incomplete | Mark gaps and request owner verification | Filling diagram edges with plausible but unsupported claims |

## Capability Contract

Read and search are required for supplied requirements, data, and source files. Editing is allowed for requested diagram production. Rendering and output inspection are required for claims about layout, legibility, or export. Publication and changes to authoritative domain models require their owner.

## Degraded Mode

Without an authoritative node/relationship source, deliver a labeled structure draft and list its gaps. Without the target renderer or medium, provide editable source and mark visual QA `NOT ASSESSED`; do not describe the diagram as production-ready.

## Examples

- `examples/relationship-diagram-spec.md` — a clearly labeled illustrative process diagram specification and handoff checklist.

## Anti-Patterns

- **Decorative connectors:** every line or arrow must express a stated relation.
- **Unexplained visual coding:** name node roles and give non-colour cues.
- **False precision:** do not imply sequence, causality, ownership, or dependency without source evidence.
- **Tiny labels:** simplify, split, or choose another representation before reducing legibility.
- **Unrendered handoff:** source that has not been rendered is not visual proof.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Diagram specification and source | Designer or engineer | Node/edge rules and source are reviewable |
| Rendered diagram and text equivalent | Reader and accessibility reviewer | Target-size render checked; meaningful relation is described |
| Handoff record | Implementer or publisher | Medium, dependencies, owner, insertion point, and acceptance checks are named |

## References

- `../data-visualization/references/relationship-diagrams-that-teach.md` — relationship layout and alternatives for complex graphs.
- `../../13-presentations-and-documents/docx-report-and-document-formatting/references/diagram-visual-standards.md` — diagram type, colour, export, and figure checks for formal documents.
- `../../09-design-systems-tokens-and-theming/design-tokens-and-naming` — token names and theme semantics.
- `../../00-cross-cutting-ops-qa-a11y/accessibility-wcag-2-2-compliance` — interface accessibility criteria where the diagram is interactive.
<!-- dual-compat-end -->
