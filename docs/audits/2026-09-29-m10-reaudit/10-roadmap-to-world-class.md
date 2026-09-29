# 10 — Roadmap to World-Class

Starting point: raw 57.1, measured-constrained 57.1, published 57.1; Readiness 59.4. Targets below are
computed with the same weighting as `09-master-scorecard.md`.

## P0 — Hygiene and routing coverage (one to two weeks, no spend)

| Move | Named files | Dimension moved |
|---|---|---|
| Replace the generic four-step workflows with real, task-specific procedures | `skills/06-sector-and-domain-ux/sector-strategies/SKILL.md`, `skills/06-sector-and-domain-ux/legal-sector-ui-ux/SKILL.md`, `skills/05-ux-process-research-and-psychology/ux-psychology/SKILL.md` | Depth, redundancy |
| Retire `references/legacy-guidance.md` parking by moving live content into task-organised references | `brand-style-guide`, `color-selection`, `enterprise-ux-process`, `ux-psychology`, `legal-sector-ui-ux`, `sector-strategies` | Depth, redundancy |
| Fix the scope contradiction: give `sector-strategies` an example for a sector it owns (tour and travel, NGO or education) | `skills/06-…/sector-strategies/examples/sector-strategy-worked.md` | Redundancy |
| Bring doctrine into line with itself: bump the version for the 29 Sep 2026 ban changes, populate or remove the `doctrine/examples/` promise, align the entry-point wording with `AGENTS.md` | `doctrine/design-doctrine.md`, `doctrine/examples/` | Doctrine |
| Correct the malformed ISO 14289-2 link | `governance/standards-source-register.md` | Standards, hygiene |
| Raise fixture coverage: at least 3 positives and 2 owned negatives for 40 skills, starting with the 16 zero-inbound skills and the 44 with no positive fixture | `tests/routing-fixtures.yml` | Routing (T2_cov 0 → 0.40) |
| Declare the full validator set so T1 guards what the engine ships | `chwezi-engine-agents/catalog/engines.yaml` (owner: engine-agents) | Routing (T1 robustness) |

**Target after P0:** Readiness ≈ 63.4 (T2 mean (0.941 + 1 + 0.40 + 1) ÷ 4 = 0.835); redundancy 60,
depth 60, taxonomy 61, doctrine 69 → overall ≈ **58** (16.50 + 13.50 + 8.70 + 6.10 + 6.90 + 6.25).

## P1 — Applied proof and the missing output type (four to six weeks, no spend)

| Move | Named files | Dimension moved |
|---|---|---|
| New skill for diagrams with routing fixtures and a rendered example set (architecture, sequence, Gantt, journey) | `skills/13-presentations-and-documents/diagram-and-technical-illustration/` (move `diagram-visual-standards.md` into it) | Output (diagrams 42 → 58), taxonomy |
| Promote real renders into validated delivery records for six output types (web app screen, landing page, dashboard, DOCX, deck, identity sheet) | `tests/fixtures/design-delivery/`, `examples/` using the P18 pack pattern | Examples, production, output |
| Run the detector's browser tier on the example pages and record the result | `tools/slop-detector/`, `examples/kraal-code-bilingual-spec/` | Production |
| Expand the source register to cover Apple HIG, Material 3, Core Web Vitals, the design-token format edition, EN 301 549 / European accessibility law and PDF/UA-2, each with access and review dates | `governance/standards-source-register.md`, `doctrine/references/web-performance-budgets-2026.md`, `design-tokens-and-naming/references/token-export-formats.md` | Standards, accessibility |
| Deepen group 15 or fold it into one orchestration skill; add native motion implementation (SwiftUI/Compose) | `skills/15-game-visual-experience/`, `skills/08-motion-and-interaction/` | Depth, taxonomy |
| Split the two largest skills | `data-visualization`, `webapp-gui-design` | Depth, hygiene |
| Complete fixture coverage for all 101 skills | `tests/routing-fixtures.yml` | Routing (T2_cov → 1.0) |

**Target after P1:** Readiness ≈ 69.4 (the Tier-3-less ceiling is 70); output 62, depth & examples 60,
standards 64, taxonomy 64, doctrine 69, hygiene 65.5 → overall ≈ **63** (18.60 + 15.00 + 9.60 + 6.40 +
6.90 + 6.55).

## P2 — Behavioural evidence and the craft standard (requires authorised spend and human reviewers)

| Move | Evidence produced | Dimension moved |
|---|---|---|
| Execute the Tier-3 behavioural cases on a pinned model and CLI, with validated `grading.json` files | `chwezi-engine-agents/evals/behavioural/results/**` | Readiness T3 (0 → e.g. 0.8 = +24 points) |
| Obtain the portfolio craft-standard acceptance evidence (human design review of rendered artefacts) | Acceptance records per output type | Removes the 65 publication cap |
| Device and simulator matrices for iOS and Android; screen-reader runs on web and DOCX/PDF | Render and AT logs linked from delivery records | Output, accessibility |

**Target after P2:** Readiness ≈ 93; output 68, depth & examples 66, standards 66, taxonomy 66, doctrine
72, hygiene ≈ 76 → overall ≈ **68 raw**. Published stays at **65** until the craft-standard acceptance
evidence exists; any dimension proposed at 70+ at that point will need its own extraordinary
justification.
