# 03 — Existing Groups Audit

All scores **judged**. Every group is scored from the full inventory (SKILL line counts, reference and
example counts, fan-in, byte warnings, collision scan) plus the sampled reading below. Fan-in is
**measured** (`skill_fanin.py`, 16 zero-inbound skills).

## A. Per-group scores

| Group | Skills | Score | Justification |
|---|---:|---:|---|
| 00 Cross-cutting ops, QA, a11y | 16 | **58** | Deepest accessibility material in the engine (`accessibility-wcag-2-2-compliance`, numbered SCs, audit sheet). Eight review/audit skills overlap (`design-audit`, `product-design-audit`, `visual-product-slop-audit`, `design-qa-and-pre-launch-review`, `plan-canvas-design-review`, `click-path-audit`, `design-critique-and-review-facilitation`, `ux-remediation-and-redesign`); four are zero-inbound; three have no references; `design-audit` is over budget. |
| 01 Typography and fonts | 7 | **62** | Strongest doctrine tie-in; catalogue query contract; enforced by the font gate and detector. Three skills have no `references/`; `fluid-responsive-typography` is zero-inbound. |
| 02 Colour, brand, identity | 7 | **57** | Good OKLCH and contrast practice. `accessible-color-and-contrast` ↔ `color-system-and-palette` collide at 0.768; `brand-style-guide` and `color-selection` still route to `legacy-guidance.md`. |
| 03 Layout, grid, composition | 4 | **58** | Four substantial skills (223–287 lines) with references. Small group; no dedicated print-grid or data-dense layout treatment beyond references. Not sampled in depth. |
| 04 Web and UI | 10 | **60** | Broad and deep; `distinctive-by-design`, `form-ux-design`, `ai-agent-ux` have strong examples. `webapp-gui-design` over budget; `distinctive-by-design` has no references; `interface-craft-micro-details` zero-inbound with a 16-line example. |
| 05 UX process, research, psychology | 7 | **52** | `ux-psychology` retains a generic four-step workflow and legacy parking; `enterprise-ux-process` routes to `legacy-guidance.md`; `journey-mapping-and-service-design` is 109 lines. |
| 06 Sector and domain UX | 7 | **48** | `healthcare-ui-design` is rich (15 references). But `sector-strategies` and `legal-sector-ui-ux` keep generic workflows; `sector-strategies`' example is a fintech strategy that its own Do-Not-Use excludes; `hospitality-hotel-restaurant` and `pos-and-retail-operations` have no references and zero inbound; hospitality is a mirrored pack across five engines. |
| 07 Mobile | 5 | **56** | Current Apple and Material records with dated evidence; RN readiness gate. SKILL bodies are short (114–161 lines); no device evidence; `app-store-presence-and-aso` zero-inbound. |
| 08 Motion and interaction | 3 | **57** | `motion-design` is the owning motion law; micro-interactions defers to it cleanly (ζ ≥ 0.7 no-bounce rule). Only three skills; `motion-react-implementation` zero-inbound; no native (SwiftUI/Compose) motion implementation skill. |
| 09 Design systems, tokens, theming | 5 | **58** | Tiered token method, OKLCH primitives, per-theme contrast invariant, token-file gate. Token format edition unnamed; two zero-inbound skills. |
| 10 Content design, UX writing | 3 | **56** | Three solid skills (197–266 lines). Small; content owned partly by the marketing engine, so the thin group is partly by design. |
| 11 Imagery and art direction | 6 | **54** | Advertising handoff contract is a strength. Four skills have one reference each; `iconography-system-design` is 105 lines. |
| 12 Data viz and dashboards | 4 | **60** | `dashboard-and-data-product-design` has a real decision-first workflow with interaction and staleness states. `data-visualization` is 29 KB; infographic skill zero-inbound. |
| 13 Presentations and documents | 7 | **57** | DOCX skill is production-grade in its specification; P18 pack gives real files. Three zero-inbound skills (storytelling, email, XLSX); email over budget; no diagram skill. |
| 14 Conversion and web page patterns | 5 | **56** | Credible, dark-pattern-aware checklists. Landing workflow is five one-line steps; trust and onboarding each have one reference. |
| 15 Game visual experience | 5 | **45** | Coherent scopes and safety rules for ads and children. Every SKILL is 93–96 lines, every reference 19–28 lines, every example 11–15 lines; "Evidence level: documented example only". |
| **Mean** | 101 | **55.9** | |

## B. Sampled skills (15 read; drawn from 12 of the 16 groups, plus router, doctrine and governance)

| Skill | Group | Score | Refs | Example | Doctrine cited | Note |
|---|---|---:|:-:|:-:|:-:|---|
| `font-selection-and-pairing` | 01 | 64 | 2 | yes | yes | Clear eight-step workflow, licence and family-completeness checks, catalogue query with abstention rule |
| `design-tokens-and-naming` | 09 | 64 | 2 | 2 | yes | Three-tier model, OKLCH, WCAG pair invariant, Apple-material aliasing; format edition unnamed |
| `accessibility-wcag-2-2-compliance` | 00 | 64 | 3 | yes | yes | Build and audit branches with SC numbers; no EN 301 549 mapping |
| `docx-report-and-document-formatting` | 13 | 63 | 4 | 2 | yes | Named styles, sections, embedding, tagging, typesetting QA; no build script, relies on external docx skill |
| `dashboard-and-data-product-design` | 12 | 62 | 2 | yes | yes | KPI tiers, cross-filter, freshness/staleness states, SC-referenced a11y floor |
| `ios-ui-ux-design` | 07 | 60 | 4 (+dirs) | yes | yes | Dated iOS 27 record; Liquid Glass chrome-only rule; body short, no device evidence |
| `micro-interactions-and-feedback` | 08 | 60 | 1 | yes | yes | Anatomy, optimistic/rollback contract, no-bounce spring band |
| `android-ui-ux-design` | 07 | 58 | 3 (+dir) | yes | yes | M3 Expressive levers, predictive back, Roboto caveat; foldable posture thin |
| `brand-visual-identity` | 02 | 58 | 3 | yes | yes | Strategy-first, no AI-generated marks; no rendered identity sheet |
| `landing-page-and-conversion-design` | 14 | 57 | 3 | yes | yes | Strong 11-point checklist; workflow is five one-line steps |
| `cross-platform-design-parity` | 07 | 56 | 3 | yes | yes | Unify/diverge sheet and RN readiness; Flutter thin |
| `deck-system` | 13 | 55 | 4 | 8 | yes | Eight variant blueprints; no PPTX mechanics; carries a book-derived delivery reference correctly cited |
| `game-ui-hud-and-diegetic-interfaces` | 15 | 50 | 1 | yes | yes | Sound decision rules; 25-line reference and a 13-line example |
| `ux-psychology` | 05 | 42 | 4 | yes | partly | Generic four-step workflow; depth parked in legacy guidance |
| `sector-strategies` | 06 | 40 | 1 | yes | yes | Generic workflow, legacy parking, boilerplate "Quality Standards", example contradicts scope |

Sampled mean: 853 ÷ 15 = 56.9. Also read in full or in part: `AGENTS.md`, `CLAUDE.md`, `README.md`,
`doctrine/design-doctrine.md`, `governance/standards-source-register.md`,
`doctrine/references/web-performance-budgets-2026.md`, `.../ios-ui-ux-design/references/hig-liquid-glass.md`
(head and evidence section) and the iOS worked example.

## C. Zero-inbound skills (measured)

`click-path-audit`, `design-engine-and-product-improvement`, `plan-canvas-design-review`, `ui-demo`,
`fluid-responsive-typography`, `interface-craft-micro-details`, `hospitality-hotel-restaurant`,
`pos-and-retail-operations`, `app-store-presence-and-aso`, `motion-react-implementation`,
`figma-and-tooling-workflow`, `measured-style-pack`, `data-illustration-and-infographics`,
`design-storytelling-and-case-studies`, `email-and-newsletter-design`,
`xlsx-and-financial-model-presentation`.
