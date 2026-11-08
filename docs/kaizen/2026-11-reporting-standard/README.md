# Kaizen record: Chwezi Reporting and Dashboards Standard (8 November 2026)

**Owner instruction.** Peter Bamuhigire asked for the Chwezi reporting and dashboards design bible
(Edition 1.0, November 2026, written for the Chwezi Product Excellence Standard) to be studied in
three reading passes and built into the writing, dev, development and design engines, followed by
a Kaizen review of the changes. Each private engine must work on its own and carry the full
capability (owner instruction, same day).

## Observe and baseline

The design engine already held the Product Excellence data-trust rules (KPI cards, time series,
tables, money, zero versus unavailable, freshness, accessible charts) and the dashboard, chart and
money skills. It had no metric contract, no reconciliation rule across screen, PDF and export, no
period-comparison or variance convention, no A4 report page system, no export safety or export-job
rules, no report lifecycle and no narrative governance.

The source bible: about 35,000 words, of which roughly 60% repeats one paragraph per domain,
blueprint or component. Distinctive content: the output contracts and five questions, the metric
contract, reconciliation, variance and period rules, freshness, AI narrative governance, security,
the A4 page system, PDF and export rules, 24 component contracts, 28 screen blueprints, the agent
protocol and the checklists. It called itself "proposed, subject to product-specific validation".

## Decisions

| # | Decision | Reason |
|---|---|---|
| K1 | A companion standard with its own `RPT-` IDs and eight gates, not new MUST rules inside the Product Excellence standard | Adding MUST rules to Product Excellence is a major version under its change control; a companion keeps that standard's checks unchanged (it moves to 1.0.1 for a cross-reference only) |
| K2 | Conflicts resolved by the existing ladder: Product Excellence width classes and house-style radius, spacing and type win over the bible's numbers | The bible's values were starting hypotheses; the house style is measured and adopted |
| K3 | The repeated per-domain and per-component paragraphs condensed into tables (blueprints, component contracts) | Same content, about a fifth of the length; no information dropped |
| K4 | Owner rules from earlier work carried in: no cross-unit quantity sums, ISO 4217 minor-unit decimals, readable dates and labelled amounts, contiguous document numbers | These were already binding for Chwezi products and recur in reports |
| K5 | Thresholds marked as Chwezi values (type floor, margins, freshness window, 3-5 headline measures) | They are internal choices, not external facts |
| K6 | PDF/UA-2, PDF/A-4 and formula-injection facts verified against primary sources and recorded with access date; the unsettled injection mitigation recorded as such and a Chwezi rule chosen | Currentness gate |
| K7 | Each sibling engine carries a full local copy of the doctrine and rules with identical IDs | Owner instruction: private engines work independently |
| K8 | Corrections found by the engine agents and the review (gate mappings, RPT-PRINT-002 gates, RPT-EXPORT-002 triggers and CSV/XLSX handling, change-record wording) kept inside 1.0.0 | The standard had not been released, so they belong to the first release rather than a new version |
| K9 | This engine gained `engineering-and-verification.md`; the other engines received the remaining references verbatim | Owner instruction that every engine has all the abilities |

## Changes in this engine

- New doctrine `doctrine/reporting-and-dashboards-standard.md` (1.0.0).
- New skill `skills/00-cross-cutting-ops-qa-a11y/chwezi-reporting-and-dashboards-standard/` with
  six references (rules and gates, metric contract and reconciliation, screen composition and
  components, print export and lifecycle, report blueprints, currentness register) and a worked
  review of a daily sales close.
- Wiring: AGENTS hard rule, design-doctrine map row, design-quality-gate section, Product
  Excellence doctrine pointer (version 1.0.1, no check changed), Product Excellence skill and
  data-trust reference pointers, one reference line in six neighbour skills, two routing fixtures
  with one owned negative, README section and task row, skill catalogue row, counts 105 to 106,
  quality baseline and test pins.

## Check

Results of the engine validator, routing smoke test, fixture lint, plugin-manifest check and test
suite are recorded in the CHANGELOG entry for 2026-11-08. Cross-engine review on 2026-11-08: the
rules catalogue in all four engines holds the same 61 rules with identical levels and gates; no
changed file cites an unknown RPT ID, adds a machine path or links outside its own engine.

## Not assessed

- No product report has yet been built or reviewed against this standard; every product gate is
  `NOT_ASSESSED` until a product team runs the reconciliation, print and export checks.
- Owner confirmation is pending for the Chwezi values (print type floor, margins, freshness
  window) and for the single-quote rule for spreadsheet injection.
- ISO 14289-1 current edition date and the PDF/A-4 revision status are `NOT_ASSESSED`.

## Re-measure

Re-read RP1-RP3 by their review dates; re-run this record's checks when the first Chwezi product
report is reviewed against the standard, and record the findings here.
