---
name: design-engine-and-product-improvement
description: Use when auditing this design engine or any rendered product for continuous improvement, evidence quality, visual readability, accessibility, AI trust, or repeatable remediation. Use design-audit for a single diagnostic without the Kaizen portfolio loop.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Design Engine And Product Improvement

Run a disciplined Kaizen loop for the design-system engine and for the websites, apps,
documents, games, dashboards, and visual systems it helps produce.

Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- Auditing the design-system engine itself: doctrine, routing, skill contracts, references,
  examples, evidence, currency, and handoff quality.
- Auditing a product or design system across screens, states, platforms, components, documents,
  game visuals, or AI interfaces and converting findings into a measurable improvement plan.
- Planning a post-critique or post-release improvement cycle where a small reversible experiment
  must become a documented standard only after evidence supports it.
- Reviewing a book-derived upgrade and deciding whether the source is usable, current, complete,
  and sufficiently translated into an actionable design capability.

## Do Not Use When

- You need a one-screen diagnostic only; use `design-audit`.
- You need a multi-surface scored product diagnostic without an engine-improvement backlog; use
  `product-design-audit`.
- You need a final ship verdict; use `design-qa-and-pre-launch-review` after the improvement work.
- You need to invent anatomy facts from an incomplete source; stop and record the evidence gap.

## Required Inputs

| Input | Source | Required? | Evidence expected |
|---|---|---|---|
| Engine or product scope | Owner, repository, build, or evidence pack | yes | Named skills, surfaces, states, and consumers |
| Current baseline and prior audit | Audit record or measured product evidence | yes | Dimension scores, hard gates, confidence, and defects |
| Source and provenance register | Digital Research engine or supplied sources | conditional | Source status, date, extraction quality, and permitted use |
| Acceptance target and accountable owner | Product/engine owner | yes | Target measure, owner, due date, and release decision |

Stop if the target, scope, or primary artefact is missing. A screenshot-only review may proceed
only as a qualified visual audit; it cannot claim interaction, responsive, accessibility, or
engine conformance.

## Workflow

1. **Observe.** Inspect the current engine or product. For an engine, glob the live skill tree,
   read the router and applicable doctrine, and check references, examples, validators, and
   routing. For a product, cover the named surfaces and critical, empty, error, loading,
   recovery, responsive, keyboard, and AI states. For premium or client-facing work, also load
   `references/purpose-fit-premium-ux-patterns.md` and inspect the purpose-fit brief, originality
   rationale, real-content slice, and refinement evidence.
2. **Baseline.** Score the applicable dimensions and record evidence, confidence, and gaps.
   The reported audit score is hard-capped at 65/100: `reported = min(raw score, 65)`. The cap
   is a reporting ceiling, not permission to ignore defects.
3. **Select.** Rank the smallest high-leverage change using user impact, risk, effort, and
   reversibility. State a falsifiable hypothesis, owner, measure, and stop condition.
4. **Experiment.** Make the smallest authorised change: a prototype, wording variant, token
   adjustment, reference addition, workflow change, or limited production trial. Preserve the
   prior version and record the change boundary.
5. **Check.** Re-run the relevant visual, readability, accessibility, interaction, performance,
   routing, or source checks. Compare before/after evidence. Separate observed result from taste,
   interpretation, and unverified assumption.
6. **Standardise.** If the evidence meets the acceptance condition, update the owning skill or
   doctrine reference, add a worked example or test fixture, and record provenance. If it fails,
   roll back or narrow the change; do not standardise a preference.
7. **Teach.** Update routing, handoff, critique prompts, or audit evidence so the capability is
   discoverable by the next agent and downstream domain engines.
8. **Re-measure.** Produce the next audit record and an improvement plan targeting 95/100. Stop
   release if required evidence remains unavailable; recover with the narrowest qualified plan.

### Catalogue query

During Observe and Check, query the offline design catalogue for the approved record behind
a finding: `python -X utf8 scripts/design_query.py search "<finding terms>"` (add
`--domain ux` for WCAG A/AA records with do/don't and code pairs). Record the
`calibration_version` and record ID in the audit evidence.

The query contract (idea adapted from UI UX Pro Max, MIT, commit 09170ee; paraphrased):
Keep one dominant intent per query and 2-5 meaningful terms; if the engine abstains, retry
once with a synonym, then proceed from the references above and say the catalogue abstained.
Never persist an unverified decision: `design_query.py persist` refuses abstained domains
unless `--accept-abstention "<who>: <reason>"` is recorded.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Raw audit score is above 65 | Report 65/100 and expose the uncapped score only as an internal diagnostic | The engine appears to bypass the portfolio hard cap |
| A gap is evidenced and reversible | Run one small experiment with a predeclared measure | A large rewrite hides which change helped |
| Experiment improves the measure and clears gates | Standardise, add an example, and teach the route | Useful learning remains person-dependent and decays |
| Source is early-release, historical, incomplete, or corrupt | Record limitation and verify with Digital Research before current claims | Dated or missing evidence becomes false doctrine |
| Product state cannot be inspected | Mark it unverified and lower confidence; do not claim pass | Missing evidence inflates quality and trust |
| Change affects type, colour, layout, or interaction | Run the design quality gate and retain render/measurement evidence | A plausible change ships without visual or accessibility proof |

## Capability Contract

Read, search, inspect, and compare are required. Rendering, measurement, accessibility checks,
source verification, and repository validation are used when available. Editing is allowed only
for an authorised improvement request. This skill may create an audit and plan but may not publish,
delete source evidence, change production, claim certification, or override an accountable owner.

## Degraded Mode

Without a build or render, return a qualified specification and mark visual and interaction checks
unverified. Without source verification, quarantine current-year claims. Without a validator,
run manual contract checks and state the missing gate. Without a baseline, create a provisional
baseline with explicit assumptions; do not label it a measured improvement.

## Quality Standards

- Every finding names the observed artefact, state, location, evidence, severity, confidence,
  owner skill, and next measure.
- Every improvement plan targets 95/100 and includes gap, root cause, change, hypothesis, owner,
  evidence, risk, rollback, acceptance condition, and due cadence.
- Product audits cover value/readability, narrative or task flow, typography, layout, contrast,
  accessibility, interaction states, AI disclosure/control where relevant, performance,
  responsive stability, purpose-fit authorship, originality, and handoff/reuse.
- Engine audits cover doctrine, routing, skill contract, references, worked examples, source
  provenance, validator coverage, degraded mode, and user-facing output evidence.
- Current, legal, regulatory, platform, market, and accessibility claims use verified authority;
  book-derived principles are attributed without copying source text.

## Anti-Patterns

- **Kaizen as a slogan.** Correction: require a baseline, experiment, measure, standard, owner,
  and re-measurement.
- **Scoring without evidence.** Correction: cite the render, file, test, measurement, or source;
  otherwise mark the dimension unverified.
- **Standardising taste.** Correction: distinguish a human design decision from a requirement and
  record the reason rather than laundering taste as research.
- **Ignoring failed states.** Correction: inspect loading, empty, error, recovery, keyboard,
  responsive, reduced-motion, and AI uncertainty states before a pass.
- **Improvement without rollback.** Correction: preserve the previous contract and define a
  stop/rollback trigger before the experiment.
- **Using incomplete books as authority.** Correction: quarantine unreadable or unavailable
  chapters and route verification to Digital Research.
- **Calling a copied visual reference premium.** Correction: preserve the user problem and
  transferable principle, then require a client-specific thesis, signature decision, and context
  demo before standardising.

## Outputs

| Artefact | Consumer | Evidence and acceptance |
|---|---|---|
| Capped engine or product audit | Owner and reviewer | Score is no higher than 65/100, evidence gaps are explicit, and findings are routed |
| Improvement plan to 95/100 | Owner and delivery team | Each action has root cause, hypothesis, owner, measure, risk, rollback, and acceptance |
| Standardisation record | Skill maintainers and downstream engines | Accepted change is recorded in the correct skill/reference with provenance |
| Re-measurement record | Reviewer and future auditors | Before/after evidence, residual risk, and next cycle are preserved |

## Examples

- `examples/design-engine-audit-worked.md` - a worked engine audit that caps the report at
  65/100, selects a silhouette-readability experiment, and plans the route to 95/100.

## Mandatory Digital Research currentness gate

Every Kaizen cycle must begin with `digital-research-engine` source evaluation
and source verification. Record scope, dates, freshness class, support status,
uncertainty, and review date for current design, accessibility, browser,
platform, security, document, and lifecycle claims; quarantine unsupported
claims as `NOT_ASSESSED`. Apply the [portfolio Kaizen currentness gate](../../../../digital-research-engine/docs/continuous-improvement/kaizen-currentness-gate.md).

## References

- `references/kaizen-audit-contract.md` - audit dimensions, evidence matrix, score cap, and
  95-target improvement-plan schema.
- `references/purpose-fit-premium-ux-patterns.md` - Eleken-informed friction, dashboard,
  authorship, and finish patterns translated into evidence-bearing design decisions.
- `../../../docs/continuous-improvement/design-engine-book-upgrade-2026-08.md` - provenance,
  extraction limits, and decisions from the supplied books.
- `../../../governance/design-quality-gate.md` - required evidence before declaring visual work
  done.
- `../../../doctrine/design-doctrine.md` - authored visual choices and anti-slop charter.
- `design-audit`, `product-design-audit`, and `ux-remediation-and-redesign` - compose diagnosis,
  product coverage, and execution without duplicating their domain logic.
- `../../../doctrine/references/book-driven-brand-story-and-visual-evidence.md` - durable brand/story synthesis with visual evidence and current accessibility gate.
- [Book-driven Kaizen Wave 3](references/book-driven-kaizen-wave-3-2026-09-02.md) - task-first communication, perceptual integrity, image quality, text alternatives, and current accessibility/performance verification.
- `../../../docs/kaizen/phase-1-intentional-omission-review.md` - omission rationale,
  alternatives, accessibility impact, and reviewer decision record.
- `../../../docs/kaizen/phase-1-candidate-guardrail-evaluation-pack.md` - reversible
  candidate experiment, guardrails, evidence matrix, and rollback contract.
- `../../../docs/kaizen/phase-1-design.md` - Phase 1 scope, currentness, and deferred-evidence record.
<!-- dual-compat-end -->
