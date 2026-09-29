# Design System Full Kaizen Operation Prompt

Paste this prompt at the root of a design system or rendered-product project, including a website, app, document, dashboard, presentation, game, or AI interface.

## Configuration

```text
Product, surfaces, and platforms: [DISCOVER]
Audience, tasks, context, and brand: [DISCOVER]
Design source and runnable/renderable artefacts: [DISCOVER]
Target devices, viewports, locales, and accessibility level: [DISCOVER]
Known critique, usability evidence, or visual defects: [NONE OR LIST]
Cycle ID: [YYYY-MM-DD-short-name]
Improvement authority: project-local reversible design/code edits are authorised; production publishing is not
```

## Prompt

Run a full design Kaizen operation on this product. Judge the real rendered experience across states, not screenshots in isolation or personal taste. Freeze a capped evidence baseline, select the smallest high-leverage design root cause, run controlled revisions, validate accessibility and task outcomes, standardise supported learning, and leave a next-cycle handoff.

### Routes and authority

Read project instructions. Resolve Chwezi Design Engine and read `AGENTS.md`, `README.md`, `doctrine/design-doctrine.md`, glob the live `skills/**/SKILL.md` catalogue, then read only the matched design skills plus `skills/00-cross-cutting-ops-qa-a11y/design-engine-and-product-improvement/SKILL.md` and its Kaizen audit contract. Route content/structure to the owning domain engine and current claims to Digital Research.

Before producing visual changes, state the chosen primary typeface and the product-specific reason. Do not use a banned AI-slop primary font: Inter, Geist, Roboto, Arial, Open Sans, Lato, Space Grotesk, or a bare system stack.

This prompt authorises reversible project-local design, token, component, style, prototype, and test edits. It does not authorise production publishing, destructive asset replacement, licence infringement, user research contact, brand approval, or canonical engine edits. Preserve the prior version. If the primary artefact, scope, target, render path, rights, or rollback is absent, perform a qualified audit only. A screenshot-only review cannot certify interaction, responsive behaviour, accessibility, or implementation conformance.

### Evidence pack and observation

Create `docs/kaizen/<cycle-id>/` with `00-scope-and-evidence.md`, `01-baseline-scorecard.md`, `02-improvement-backlog.md`, `03-experiment-log.md`, `04-validation-record.md`, `05-final-report.md`, and `06-next-cycle.md`. Inventory audience/tasks, brand sources, content hierarchy, design files, tokens, components, assets/licences, fonts, icons, charts, code, viewports, platforms, locales, interaction patterns, analytics/research, prior critiques, accessibility tests, performance evidence, and handoff contracts.

Render and inspect representative surfaces and critical, loading, empty, error, validation, success, recovery, disabled, hover, focus, keyboard, reduced-motion, high-zoom, long-content, localisation, mobile, tablet, and desktop states. Capture evidence consistently so before/after comparison is possible.

### Capped baseline

Score ten equal dimensions with render/file/test evidence, confidence, deficiency, and status:

1. User task, audience, context, product value, and brand intent.
2. Information hierarchy, narrative/task flow, navigation, density, and comprehension.
3. Typography choice, hierarchy, measure, rhythm, readability, loading, and language coverage.
4. Colour system, contrast, meaning, states, dark/high-contrast modes, and print/export behaviour.
5. Layout, grid, spacing, composition, responsive adaptation, zoom, and content stress.
6. Components, tokens, variants, consistency, reuse, empty/error/loading states, and edge cases.
7. Interaction, affordance, feedback, keyboard/focus, motion, touch targets, and recovery.
8. Accessibility, inclusion, localisation, AI disclosure/control, trust, and ethical behaviour.
9. Visual distinctiveness, brand coherence, asset quality/rights, anti-slop finish, and performance cost.
10. Implementation fidelity, cross-platform/render quality, documentation, handoff, governance, and maintainability.

Calculate raw overall and publish `min(raw_overall, 65)`. Freeze before edits. Accessibility blockers, unusable critical paths, deceptive controls, missing rights, broken responsive states, or unverified required platforms remain blockers independent of score.

### Improve toward 95

Create a P0/P1/P2 backlog. Each item states surface/state/location, evidence, severity/confidence, root cause, owner skill/file/token/component, falsifiable hypothesis, user measure, accessibility/performance/trust guardrails, smallest reversible change, rollback, stop rule, acceptance proof, target contribution, and re-audit date. Separate requirements and observed user evidence from taste.

Run one experiment at a time: prototype or implement the minimum authorised token, type, content-presentation, component, state, or workflow change. Preserve the control render. Re-test the full affected state set, keyboard and zoom, responsive widths, content extremes, accessibility, and performance. Compare before/after task evidence and counter-metrics. Roll back changes that merely look fashionable, homogenise the brand, weaken comprehension, or breach a guardrail.

### Strict anti-AI-slop gate

Apply the design anti-AI-slop doctrine during every change, audit after each major visual iteration, and run the final pre-launch gate. Grade F blocks release. Reject generic bento grids, interchangeable dashboards, default three-card rows, gratuitous gradients/glows/orbs, excessive pills, random icon badges, fake charts/data, ornamental glass effects, trend-led typography, template spacing, inconsistent AI imagery, malformed anatomy/text/logos, impossible product scenes, excessive motion, inaccessible decoration, and visual polish that lacks an authored brand or task rationale.

Inspect similarity across screens and against common templates. Require each type, colour, spacing, layout, image, icon, motion, and component decision to serve hierarchy, task, audience, brand, accessibility, or performance. Record intentional exceptions. Do not standardise taste as research, and do not let a new screenshot baseline legitimise regression or genericness.

### Validate, standardise, and re-measure

Run applicable design audit, visual regression, contrast, axe/accessibility, keyboard/screen-reader smoke, responsive/content-stress, asset/font/licence, performance, cross-platform render, anti-slop, and pre-launch review gates. Do not approve newly generated visual baselines without independent inspection. Record commands, tools, viewport/state matrix, renders, measurements, reviewer evidence, failures, and unavailable checks.

Promote accepted learning into the project token, component, pattern, example, fixture, test, design decision, accessibility note, asset manifest, handoff spec, or quality gate. Re-score using only new evidence and state the uncapped final result. Write the final report with before/after render links, accepted and rejected experiments, task/accessibility/performance results, residual risks, release verdict, and next experiment.

Return the score summary, chosen typeface and reason, completed changes, validation matrix, blockers, `NOT ASSESSED` states, evidence-pack path, and re-audit date. Do not claim 95 or launch readiness beyond the rendered and tested evidence.
