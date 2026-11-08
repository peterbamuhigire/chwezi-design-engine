---
name: chwezi-reporting-and-dashboards-standard
description: "Use when a Chwezi report, owner dashboard, financial statement, closeout, scheduled report, A4 PDF or CSV/XLSX export is specified or reviewed: metric contracts, reconciled totals, period comparisons, print and export gates. Single charts: chart-selection-and-encoding; app UI: the Product Excellence skill."
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Chwezi Reporting and Dashboards Standard

Applies the Chwezi Reporting and Dashboards Standard to every reporting surface and decides
whether it may ship. Adopted into the engines on 8 November 2026 on the instruction of Lead
Developer Peter Bamuhigire as the reporting companion to the Product Excellence Standard. Binding
text: [doctrine/reporting-and-dashboards-standard.md](../../../doctrine/reporting-and-dashboards-standard.md).
This skill is the procedure; the doctrine is the law; the rules catalogue is the checkable detail.
Everything needed to design, build, verify and release a reporting surface is in this engine; no
other engine is required.

## Use When

- A dashboard, owner home, KPI card set, analytical screen or report centre is planned, built or
  reviewed for a Chwezi product.
- A register with totals, a financial statement, a closeout, a night audit, a stock count or any
  other fixed report is produced on screen, in A4 print or as a PDF.
- A CSV or XLSX export, a scheduled report, a share link or an export job is added or changed.
- A written or AI-generated insight, management report or board pack is built from product data.
- Someone asks why two screens, a PDF and a spreadsheet show different totals.

## Do Not Use When

- The work is a general app screen with no reporting content: use
  `chwezi-product-excellence-standard` (it still applies alongside this skill when there is).
- Only the chart type is in question: use `chart-selection-and-encoding`; single-chart craft goes
  to `data-visualization`; dashboard information architecture beyond Chwezi products goes to
  `dashboard-and-data-product-design`.
- Only the layout of money figures is in question: use `money-figures-and-statement-display`
  (decimals follow the ISO 4217 minor unit per the Product Excellence standard).
- The document is a narrative report with no product data (a research or policy paper): use the
  document skills in `13-presentations-and-documents`.

## Required Inputs

| Input | Supplied by | If missing |
|---|---|---|
| Decision the report supports and its users and roles | Product owner or requester | Stop and ask; a report without a decision cannot be scoped |
| Output contract (operational dashboard, analytical workspace, fixed report, executive narrative) | Product owner | Propose one from the request; mark it PROPOSED |
| Metric contracts for every headline and exported measure | Metric owner, metrics layer | Draft from the template; the measure stays blocked (RPT-GATE-02) until approved |
| Data access: the running product, a staging tenant or representative fixtures | Engineering | Design only; every data gate stays NOT_ASSESSED |
| Permission map (view, export, print, schedule) | Web permission map, product | Stop before any export work |
| Target devices, widths, languages and print targets | Product profile | Use the Product Excellence defaults; record the assumption |

## Workflow

1. **Inspect.** Read the existing reports, metric definitions, permission map and export
   services. Baseline what the screen, PDF and spreadsheet show today for one scope.
2. **Define.** Write the report contract: decision, users, output contract, the five questions,
   headline measures (3-5) with metric contracts, grain, period and comparison, filters and their
   scope, the reporting states, export targets and acceptance tests
   ([metric-contract-and-reconciliation.md](references/metric-contract-and-reconciliation.md),
   [report-blueprints.md](references/report-blueprints.md)). Stop if any headline measure lacks a
   contract.
3. **Prototype.** Lay out the screen for each width class and, separately, the A4 composition
   ([screen-composition-and-components.md](references/screen-composition-and-components.md),
   [print-export-and-lifecycle.md](references/print-export-and-lifecycle.md)).
4. **Build.** Shared components with house-style tokens; calculations on the server from the one
   metrics layer; presentation components carry no arithmetic; generation records and export
   jobs as in [engineering-and-verification.md](references/engineering-and-verification.md).
5. **Verify data.** Reconcile headline, detail, ledger, PDF and spreadsheet with the five fixture
   cases; test date boundaries, currency, timezones, back-dated postings and restricted roles.
6. **Verify the interface.** Every reporting state, keyboard and screen reader, contrast and
   greyscale, 200% text, longest language and RTL, long tables, empty and error.
7. **Verify exports.** Render every A4 page at 100% and in greyscale; open each spreadsheet;
   check page numbers, identity, headings, totals, injection and leading zeros.
8. **Review.** An independent verifier, plus a human domain reviewer for financial, clinical or
   regulatory reports. Recover from a failed check by fixing and re-running it; never by
   downgrading the evidence class.
9. **Release.** Record the verdict, open DDRs, known limits and rollback; RPT and PX gates both
   apply; any open gate blocks release.
10. **Measure.** Track task completion, misreadings, report failures and feedback for the next
    Kaizen cycle (RPT-QA-003).

## Decision Rules

| Situation | Choose | Risk if wrong |
|---|---|---|
| A figure appears on screen but nowhere else | Still needs a metric contract if it is a headline | Two screens disagree and trust fails |
| Screen and PDF need different layouts | Two compositions from one dataset | A screenshot PDF breaks pagination and accessibility |
| Totals differ between outputs | Show a reconciliation warning; fix the source | Hidden differences reach the owner, auditor or tax office |
| Comparison periods differ in length | Compare like for like, or label the difference | A false "up 18%" drives a wrong decision |
| Quantities in several units | Totals per unit, or convert to value | A meaningless "3,120 items" total |
| Source missing or not synced | Partial state with the reason | An incomplete total read as complete |
| User lacks rights to some rows | Filter in the query and export service | Data leak through the export endpoint |
| AI insight suggests a cause | State the observation; mark the cause unverified | A confident false explanation |

## Capability Contract

- Read: product code, report definitions, metric catalogue, permission map, exported files.
- Search: code and documents for duplicate measure logic and export endpoints.
- Execute: tests, renders, PDF and spreadsheet checks where available.
- Edit: only on an implementation or remediation request; reviews are read-only.
- No publication, data deletion or production change without separate authority.

## Degraded Mode

- No data access: deliver the report contract and layouts; every data gate stays NOT_ASSESSED.
- No renderer or printer: deliver the A4 specification; RPT-GATE-06 stays open and NOT_ASSESSED.
- No spreadsheet program: verify exports with a script that reads the file; record the method.
- No metric owner: draft contracts marked PROPOSED; the measures stay blocked until approved.
- In every degraded case the verdict is at best CONDITIONAL and usually BLOCKED, never PASS.

## Anti-Patterns

- Copying a mockup's figures into a product. Correction: build from the metrics layer and
  synthetic, reconciled fixtures labelled as such.
- Exporting the dashboard as a screenshot PDF. Correction: a dedicated A4 template with repeated
  headings, page numbers and identity on every page.
- Ten equal panels on one screen. Correction: 3-5 headline measures, one dominant analysis,
  exceptions, then records.
- Red for every negative number. Correction: favourable or adverse from the metric's direction
  rule, shown as a word as well as a colour.
- Hiding a column in the interface to protect it. Correction: authorise in the query and the export
  service.
- A dismissable "totals may differ" toast. Correction: a persistent reconciliation warning with
  the amount, cause and retry.

## Outputs

| Output | Consumer | Accepted when |
|---|---|---|
| Report contract | Product owner, engineers, reviewers | Decision, users, output contract, measures with contracts, scope, states, exports and tests are all present |
| Screen and A4 layouts | Engineers | Every width class and print page type in scope is specified |
| Reconciliation record | Finance or domain reviewer | Five fixture cases pass across screen, PDF and spreadsheet |
| Gate and evidence table | Release approver | Every applicable RPT and PX gate is closed on MEASURED evidence or the verdict is BLOCKED |
| Verdict | Lead Developer, product owner | PASS, CONDITIONAL or BLOCKED per the Product Excellence rules |

## Examples

- [Worked review: daily sales close (fictional)](examples/worked-review-daily-sales-close.md):
  ten findings mapped to rules and gates, from BLOCKED to ready for scoring.

## References

- [rules-and-gates.md](references/rules-and-gates.md): every RPT rule and the eight gates.
- [metric-contract-and-reconciliation.md](references/metric-contract-and-reconciliation.md):
  metric contract template, one measures layer, unlike units, reconciliation, variance, periods.
- [screen-composition-and-components.md](references/screen-composition-and-components.md): page
  order, width classes, filters and dates, reporting states, chart choice, 24 component contracts.
- [print-export-and-lifecycle.md](references/print-export-and-lifecycle.md): A4 page system and
  eight page types, PDF accessibility, CSV and XLSX safety, export jobs, generation records,
  security, narrative governance.
- [report-blueprints.md](references/report-blueprints.md): 28 screen blueprints by product family
  and the domain data notes.
- [engineering-and-verification.md](references/engineering-and-verification.md): build layers,
  generation record, export jobs, test fixtures, performance, observability, tenant isolation.
- [currentness-register.md](references/currentness-register.md): PDF/UA, PDF/A and spreadsheet
  injection facts.
- Mathematical methods shared with the publishing standard (exact arithmetic, largest-remainder
  rounding of shares, nice axis ticks, banking to 45 degrees, computed contrast):
  [mathematics-and-algorithms.md](../chwezi-document-publishing-standard/references/mathematics-and-algorithms.md).
- Publishing companion (identity, one specification for HTML, PDF and DOCX, output parity, every
  page inspected): [chwezi-document-publishing-standard](../chwezi-document-publishing-standard/SKILL.md).
- Companion standard: [chwezi-product-excellence-standard](../chwezi-product-excellence-standard/SKILL.md),
  especially its data-trust and visualisation reference.

## Evidence and currentness

External facts are recorded in the currentness register (RP1-RP3, accessed 2026-11-08) and in the
Product Excellence register for WCAG and platform facts. Thresholds in this skill are Chwezi
values. Following this standard does not make a report or PDF conformant with WCAG, PDF/UA or
PDF/A; that needs validation.
