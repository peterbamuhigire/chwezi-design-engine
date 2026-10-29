# 01 — Frozen baseline scorecard

**Date:** 2026-10-29  
**Baseline:** clean design-engine checkout at `c9b334d`, before any content edit  
**Scoring:** dimension scores below are fresh October judgments from the named evidence, not copied from the 29 September score. All judgments are provisional to the stated evidence limits.

| Standard dimension | Raw | Evidence and deficiency |
|---|---:|---|
| Doctrine | 60 | The charter has distinctive authored-design and anti-slop rules, but its header remains v0.2.0 after the recorded 29 September ban changes and its promised `doctrine/examples/` directory is absent. (Observed files; score is judgment.) |
| Taxonomy and routing | 60 | 101 active skills; route test reports p@1 94%, p@3 100%, 21/21 local owned negatives, but fixture coverage is 0/101 under the Standard’s three-positive/two-owned-negative measure. There is no diagram-owning route. (Measured; absence confirmed by inventory and task routing.) |
| Skill depth | 58 | 101/101 active skills satisfy the mechanical contract; two checked sector skills still contain the generic “read relevant inputs” workflow, and six skills route detail through five legacy-guidance references. The contract validator does not establish task-specific completeness. (Measured plus file review.) |
| Worked examples and applied proof | 45 | Each active skill has an examples directory with at least one file, but worked depth is uneven: per-skill example text has a 45-word minimum and a 1,142-word median; 11 skills have under 250 words. Fixture coverage is 0/101. Delivery-evidence fixture is `CONDITIONAL`, with accessibility, generation, render, reopen and visual QA all `NOT ASSESSED`. (Measured.) |
| Standards currency | 48 | The local register has five source rows and one malformed ISO URL. It does not name EN 301 549 or the European Accessibility Act, and the token skill does not specify a Design Tokens format edition. External currentness was not yet freshly verified at baseline. (Observed; current status `NOT_ASSESSED`.) |
| Output readiness | 54 | The prior output-type rubric identifies diagrams as lowest readiness (42/100); current diagram work still routes to a document reference. Three disposable task runs reveal nonfunctional sorting/state behavior and incomplete rendered-font proof. (Prior measured rubric plus current observed specimens; score is judgment.) |
| Accessibility and inclusion | 60 | The engine has dedicated WCAG 2.2 and inclusive-design guidance. The disposable screen audit measured a 4.48:1 normal-text contrast ratio, 20×20 CSS-pixel controls, a positive-tabindex order, and missing visible button focus. No production assistive-technology run is held. (Measured on synthetic specimen only; score is judgment.) |
| Production and handoff | 55 | The PDF and diagram can be rendered in an isolated browser, but the intended Source Serif 4 and Public Sans faces did not load in the initial environment; PDF font embedding is unverified. The repository delivery fixture remains `CONDITIONAL`. (Observed and measured.) |
| Hygiene | 50 | The local route-existence check passes. The cross-engine route validator reports six unavailable sibling targets. The standards register has one malformed URL; 11 active router/skill/reference files still contain the machine-specific machine-specific Windows webroot root. (Measured; not all historical audit text is current policy.) |
| Safety and integrity | 63 | Native installation succeeded and the offline Codex debug prompt resolves 101/101 manifest paths. Claude native details report 102 skill components and the listed inventory includes `_TEMPLATE`; the reason for the one-entry difference from the offline manifest is not independently assessed. Installer implementation and live Claude hook behavior were not independently reviewed, so those checks remain `NOT_ASSESSED`. (Observed inventory; interpretation qualified.) |

## Measured inputs

- `python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json`: exit 0; 101 active skills fully compliant, 49 slop rules, 98 detector fixtures; six report-only skill-size warnings.
- `python -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures`: exit 0; 68 positive cases, p@1 94%, p@3 100%, 21/21 local owned negatives, one cross-engine `NOT_ASSESSED`; fixture lint has zero findings. The lexical result is not live/model-executed routing.
- Fixture-coverage count from `tests/routing-fixtures.yml`: 68 positive rows, 22 owned-negative rows including one foreign-owner row; no active skill reaches three positives and two locally owned negatives, so coverage is 0/101. (The routing runner’s denominator is 21 local negatives.)
- Worked examples: all 101 active skills have at least one example file; total per-skill corpus word count ranges 45–29,506, median 1,142; 11 skills are below 250 words. This count is a coarse example-depth proxy, not a quality score.
- `python -X utf8 scripts/validate_route_existence.py`: exit 0, zero findings.
- `python -X utf8 scripts/validate_cross_engine_routes.py --workspace-root <workspace>`: exit 1, six declared routes unresolved because the expected sibling checkouts are absent. Those six are `NOT_ASSESSED`, not broken in the target repositories.
- `python -X utf8 tests/eval_catalog_relevance.py`: exit 0; held-out p@1 1.000, MRR@3 1.000, nDCG@3 0.968, negative abstention 1.000, typo recovery@3 1.000 (n=16). The relevance benchmark does not measure live router quality.
- `python -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json`: exit 0, valid manifest, `CONDITIONAL`; five delivery stages `NOT_ASSESSED`.
- `python -X utf8 scripts/validate_token_example.py skills/09-design-systems-tokens-and-theming/design-tokens-and-naming/examples/tokens.json`: exit 0, zero findings.
- Source register: five records; their next-review dates are 11 November 2026, not yet past on this score date. This does not verify that the claims or links are current. One ISO URL is malformed. Fresh research is a release gate.
- Current repository-visible machine-specific path count: 11 files under active router/skills/doctrine/governance/integration/scripts contain a machine-specific Windows webroot reference; 17 more are in historical docs. The 11 operational files are enumerated in the backlog/experiment record.

## Raw and capped scores

The overall calculation preserves the engine’s documented weighted buckets: output readiness 30%; skill depth and worked examples 25%; standards currency 15%; taxonomy 10%; doctrine 10%; hygiene 10%, with hygiene the mean of hygiene, routing and safety. Fresh inputs:

- output readiness: 54 × 0.30 = 16.20;
- depth/examples: ((58 + 45) ÷ 2) × 0.25 = 12.875;
- standards: 48 × 0.15 = 7.20;
- taxonomy: 60 × 0.10 = 6.00;
- doctrine: 60 × 0.10 = 6.00;
- hygiene: ((50 + 59.4 + 63) ÷ 3) × 0.10 = 5.747;
- **raw = 54.022, reported to one decimal = 54.0/100**.

Portfolio Standard cap: `min(54.0, 65) = 54.0/100`. The user’s stricter initial cap: `min(54.0, 45) = 45.0/100` published for this cycle. The 45 cap does not alter raw dimension or raw total scores. Improvement plan target: 95/100; the score cap is not a target.

## Blockers and open evidence

No safety/legal/privacy release blocker was found in the inspected baseline evidence. Current standards verification, real supplied-screen review, selected-font rendering/embedding, device and assistive-technology checks, Tier 3 model evaluation, and missing sibling-engine target checks remain `NOT_ASSESSED`. No canonical doctrine changes are authorized by this task.
