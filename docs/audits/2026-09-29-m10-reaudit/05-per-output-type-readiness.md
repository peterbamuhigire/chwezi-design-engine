# 05 — Per-Output-Type Readiness

Question per type: guided only by this engine at HEAD `25ce1e6`, could an agent produce work at the
top-0.1 % bar, end to end, with evidence? All scores are **judged**; no output type has render, device or
behavioural evidence in the engine that a validator marks as passed, so none clears 65.

## Ranked table

| Rank | Output type | Score | Owning skills (principal) | Two or three biggest gaps | Move that lifts it |
|---:|---|---:|---|---|---|
| 1 | Web application UI | **62** | `webapp-gui-design`, `component-states-and-interaction-fidelity`, `form-ux-design`, `interaction-design-patterns`, `ai-agent-ux` | `webapp-gui-design` is 24 KB (over budget) and mixes stack-specific packs; no rendered reference screens; detector browser tier unexercised | Split the skill; add one rendered, state-complete reference app screen with detector and axe output |
| 2 | Marketing website / landing page | **60** | `landing-page-and-conversion-design`, `distinctive-by-design`, `trust-credibility-and-social-proof`, slop detector | Workflow is five terse lines (depth sits in the checklist); retrieval catalogue has one landing record; performance budgets undated | Deepen the workflow; date and source the budgets; a rendered before/after page run through `chwezi-slop` |
| 3 | Data products, dashboards, data-viz | **60** | `data-visualization`, `dashboard-and-data-product-design`, `chart-selection-and-encoding`, `data-illustration-and-infographics` | `data-visualization` at 29 KB is the largest skill; one chart record in the catalogue; infographic skill has zero inbound references | Split `data-visualization`; add rendered dashboard evidence to the P18 pack pattern |
| 4 | Documents (DOCX/PDF) | **58** | `docx-report-and-document-formatting`, `print-production-and-finishing`, `fine-typesetting-and-typesetting-qa` | Delivery fixture stages all `NOT ASSESSED`; PDF/UA only in the register; no in-engine build procedure (depends on external docx/pdf skills) | Promote the P18 DOCX/PDF to a validated delivery record; add a PDF/UA-2 checklist |
| 4 | Design handoff (tokens/specs) | **58** | `design-tokens-and-naming`, `design-handoff-and-dev-spec`, `component-library-architecture`, `figma-and-tooling-workflow`, `measured-style-pack` | Token format version not named; `figma-and-tooling-workflow` and `measured-style-pack` have zero inbound references; token drift rules need a token source to run | Pin the token format edition in the register; add routing fixtures and cross-links |
| 6 | iOS | **55** | `ios-ui-ux-design`, `touch-gesture-and-haptics`, `app-store-presence-and-aso` | Current records (iOS 27, accessed 24 Sep 2026) but no simulator or device evidence; the SKILL body is 119 lines with depth in references; widgets and App Intents surfaces have no dedicated reference, and Live Activities / Dynamic Island appear in no file | Add a size-class/state render matrix produced on a simulator; a widgets/Live Activities reference |
| 6 | Presentations / decks | **55** | `deck-system` (8 variant blueprints), `design-storytelling-and-case-studies` | No PPTX build mechanics in the engine; variants are text blueprints; 0.597 overlap with business-plan `pitch-deck` undeclared | Add a PPTX layout/master specification and a rendered deck pair; declare the pitch-deck boundary |
| 6 | Brand / visual identity | **55** | `brand-visual-identity`, `logo-and-wordmark-design`, `brand-style-guide`, `color-system-and-palette` | `brand-style-guide` still parks depth in `legacy-guidance.md`; no rendered identity sheet; colour-skill collision (0.768) | Retire the legacy parking; one rendered identity mini-guide with lock-ups at minimum size |
| 9 | Android | **54** | `android-ui-ux-design`, `touch-gesture-and-haptics` | No emulator evidence; foldable posture (hinge, tabletop) guidance is thin in the SKILL body, which relies on `WindowSizeClass` and panes; Roboto caveat handled well but no branded-type worked example on Compose | Emulator window-class matrix; Compose type-token example |
| 9 | Proposals | **54** | `pdf-proposal-and-bankable-document-design`, `deck-system`, `docx-report-and-document-formatting` | SKILL is 131 lines; its cross-engine negative against srs `02-business-case` is `NOT_ASSESSED` locally; no rendered proposal in the engine besides the P18 internal proposal | Add a rendered bankable proposal with delivery evidence |
| 11 | Cross-platform mobile | **50** | `cross-platform-design-parity` (with RN readiness and RN/Flutter mapping) | Flutter appears in 5 files only; Compose Multiplatform absent; no shared-component token pipeline example | Add Flutter adaptive and KMP/CMP mapping references with one worked parity build |
| 12 | Diagrams | **42** | none; `docx-report-and-document-formatting/references/diagram-visual-standards.md`, Mermaid/SVG font gate in `hooks/banned-font-gate.js` | No owning skill, no routing fixture, no worked diagram; standards live under a document skill so slide, web and handoff diagrams are unrouted | Create a `diagram-and-technical-illustration` skill with fixtures and a rendered example set |

**Overall output readiness: mean 663 ÷ 12 = 55.25 → 55 / 100.**

## Movement against the 21 June baseline

| Type | 21 Jun | Now |
|---|---:|---:|
| Web application | 70 | 62 |
| Marketing / landing | 66 | 60 |
| Data products | 64 | 60 |
| Documents | 30 | 58 |
| Handoff | 34 | 58 |
| iOS | 57 | 55 |
| Decks / proposals (combined then) | 62 | 55 / 54 |
| Brand | 58 | 55 |
| Android | 58 | 54 |
| Cross-platform | 22 | 50 |
| Diagrams | not scored | 42 |

The large rises (documents, handoff, cross-platform) are real: skills now exist. The small falls on the
strongest types are a matter of strictness, not regression: this audit refuses credit for any output type
without rendered or validated evidence, which the baseline did not require.
