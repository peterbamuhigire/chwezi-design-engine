---
name: premium-ui-ux-design
description: Use when a web, SaaS, dashboard, iOS, or Android product must communicate premium value through trust, clarity, restraint, sensory polish, and service detail. Do not use as a substitute for the platform, accessibility, or design-system implementation skill.
metadata:
  portable: true
  category: 04-web-and-ui-design
  compatible_with:
  - claude-code
  - codex
---

# Premium UI/UX Design
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- Designing or reviewing a website, SaaS app, dashboard, Android app, or iOS app where perceived quality, trust, usability, and commercial value matter.
- A product must feel premium, beautiful, calm, efficient, and worth paying serious money for.
- Existing UI work looks generic, cluttered, one-note, hard to scan, or visually cheap.
- Creating a design system, visual QA report, UX specification, or screen-by-screen implementation plan.
- Writing or reviewing an SRS, acceptance criteria, traceability matrix, or design handoff requirements where premium UI/UX must be specified as testable, non-taste-based requirements.

## Do Not Use When

- The request is copy-only, backend-only, or not user-facing.
- A platform-specific companion skill owns the implementation detail and already loaded this premium layer.

## Required Inputs

| Input | Source | Evidence |
|---|---|---|
| Buyer/user expectations and value proposition | Research and commercial brief | Trust drivers, anxieties, and premium proof points |
| Critical journeys and failure costs | Product/service owner | Priority flows, service promises, and recovery expectations |
| Brand assets and platform constraints | Brand/system owners | Approved type, imagery, tokens, licences, and native rules |

- Product goal, target users, business model, brand position, platform, and primary user tasks.
- Existing screenshots, designs, or product screens when available.
- Domain constraints: data density, performance budget, accessibility needs, device classes, and revenue-critical flows.

## Workflow

1. Define the business promise: what the user must understand, trust, and accomplish quickly.
2. Choose a visual voice: restrained enterprise, editorial premium, operational dense, consumer polished, luxury minimal, or another defensible direction.
3. Build hierarchy before style: one primary action, obvious navigation, clear content priority, and explicit next steps.
4. Create a tokenized visual system: color, type, spacing, radius, elevation, motion, icons, charts, and image treatment.
5. Design every state: loading, empty, error, success, disabled, offline, slow network, permissions denied, and destructive confirmation.
6. Apply platform conventions: web, Android, and iOS must feel native to their medium, not like resized versions of one another.
7. Run the premium UI/UX gate before calling the work done.
8. Produce evidence: screenshots, score, defects, and concrete improvements.
9. When operating in SRS mode, translate the above into testable non-functional requirements linked to SRS IDs and verification methods (see `premium-ui-ux-specification-rules.md`).

## Premium promise to observable craft (Kaizen adoption)

Treat premium as a delivery claim with visible proof, not as a visual mood (synthesis). For each
promise, record the user job, service or product behaviour, evidence artifact, owner, and review
status. The proof loop is:

1. State the promise in the user's language and name the critical task it should improve.
2. Record the authored design decisions that make the work purpose-fit, with the reason each one
   serves the audience, context, or business outcome.
3. Show real or representative content in the critical flow, including loading, empty, error,
   recovery, responsive, and accessible alternatives.
4. Run the relevant task, accessibility, and responsive checks; link the result to the promise and
   mark missing render, user, or device evidence `NOT_ASSESSED`.
5. If the promise fails, correct the highest-cost comprehension or trust defect and rerun the
   affected check before adding polish.

Use the [design quality gate](../../../governance/design-quality-gate.md) for the final evidence
record. The [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/) is a normative accessibility
reference (accessed 2026-09-22); it does not by itself prove that a particular artifact conforms.

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Trust depends on high-stakes decisions | Prioritise clarity, proof, and calm recovery | Decorative luxury cues feel evasive or manipulative |
| Product is used frequently by experts | Reward speed, density control, and continuity | Showy transitions and excess whitespace slow real work |
| Brand lacks distinctive assets | Invest in authored type/layout/content detail | Generic gradients and glass imitate premium without substance |

## Capability Contract

- Must inspect real journeys, brand assets, and platform behaviour; critique is read-only unless remediation is requested.
- May create in-scope concepts, but may not purchase assets, change pricing/service claims, or publish without authority and evidence.

## Degraded Mode

- If premium promise or target buyer is unclear, stop aesthetic direction and return the strategic questions.
- Without rendering/user evidence, provide a provisional experience standard and mark sensory/trust claims unverified. Recover weak results by correcting the highest-cost trust or task defect before adding polish.

## Quality Standards

- Beauty must serve comprehension, trust, efficiency, and conversion. Decoration that does not improve these outcomes is removed.
- The interface has a clear visual path. Size, weight, color, spacing, placement, and grouping agree about what matters.
- Color has a job: brand recognition, hierarchy, grouping, status, warning, emotion, or navigation. It is never random garnish.
- Text remains readable at all breakpoints and in dark/light modes. Contrast, line length, line height, and hierarchy are verified.
- Dashboards and charts prioritize perceptual accuracy, direct labels, context, comparisons, and actionability.
- Mobile UI uses platform-native ergonomics, navigation, gestures, touch targets, accessibility, and motion expectations.
- Implementation must be production-ready: responsive, fast, accessible, documented, tokenized, and screenshot-verified.

## Anti-Patterns

- Generic AI aesthetic: oversized cards, vague gradients, decorative blobs, one-color palettes, weak typography, and stock-like imagery.
- Pretty but slow, inaccessible, or hard to use.
- Dashboard decoration: gauges, 3D effects, unnecessary shadows, loud colors, disconnected legends, and chart junk.
- Native apps that look like squeezed websites.
- Design systems that define colors and fonts but omit component states, usage rules, ownership, and quality gates.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Premium experience direction | Product, brand, and design | Trust, clarity, craft, service, and platform choices are explicit |
| Premium quality review | Commercial owner and QA | Critical journeys show proof, accessibility, responsiveness, and graceful recovery |

- Premium UI/UX brief, visual direction, token plan, component/pattern guidance, dashboard guidance, mobile guidance, or review findings.
- A premium UI/UX score with specific remediation items when reviewing finished work.
- Source notes for any book-derived reasoning used in the decision.

## Examples

- `examples/premium-direction-worked.md` - a full worked premium UI/UX direction for one SaaS screen (the Collections workspace): visual voice, dominant/subordinate/accent colour logic, typography roles, imagery rules, data/proof presentation, component states, and the "why this reads premium not templated" rationale.

## References

- `doctrine/design-doctrine.md` — the Mission ("the moat is looking human-made") and the Anti-Slop Charter (state the choice first; the sourcing-authority asymmetry rule). Premium is the engine's core promise.
- `doctrine/references/ai-slop-taxonomy.md` — the convergent-default tells ("generic AI aesthetic") this skill exists to push away from.
- `doctrine/references/pairing-principles.md` and `doctrine/references/type-scale-and-spacing.md` — typographic craft underpinning perceived value.
- Sibling skills in this engine: `04-web-and-ui-design/distinctive-by-design` (the pre-flight that commits one distinctive idea), `02-color-brand-and-visual-identity/color-system-and-palette` (colour roles + WCAG gate), `12-data-viz-and-dashboards/data-visualization` (dashboard/chart rules). (The former cross-engine companion `premium-software-product-execution` lives in `chwezi-sdlc-documentation`; consult it there when the UI/UX work must connect to premium offer architecture, buyer psychology, high-ticket pricing, or service design.)
- `references/premium-visual-principles.md` - hierarchy, layout, typography, perceived value, and pleasantness.
- `references/color-emotion-brand-systems.md` - color choice, palette systems, emotion, hierarchy, and accessibility.
- `references/data-visualization-dashboard-ux.md` - chart, table, KPI, and dashboard rules.
- `references/production-quality-handoff.md` - production polish, asset quality, handoff, and implementation QA.
- `references/mobile-android-ios-premium-ux.md` - platform-specific Android and iOS UX guidance.
- `references/mobile-dashboard-ux-patterns.md` - mobile navigation, onboarding, dashboard, and mobile app quality patterns.
- `references/saas-ux-scope-costing.md` - SaaS UX scope, Uganda-calibrated fee bands, cost drivers, and SRS handoff requirements.
- `references/premium-ui-ux-gate.md` - scoring rubric and blocking checks.
- `references/premium-ui-ux-specification-rules.md` - SRS/UX-specification rules: how to translate premium UI/UX into testable, traceable requirements and acceptance criteria.
- `references/source-register.md` - local book sources dissected for this skill.
<!-- dual-compat-end -->
