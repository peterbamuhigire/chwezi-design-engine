Parent skill: [chwezi-reporting-and-dashboards-standard](../SKILL.md)

# Worked review: daily sales close (fictional)

All names, figures and branches are fictional. The product is a Chwezi POS app; the surface is the
owner's "Daily sales and closeout" screen and its A4 PDF (blueprint B03).

## Report contract (abridged)

| Field | Value |
|---|---|
| Decision | Can today be closed, and is any cashier's money short? |
| Users | Owner; branch supervisor (own branch only) |
| Output contract | Fixed report (PDF, signed) built from an operational dashboard |
| Questions | What sold; why it differs from yesterday; what is at risk (cash variance, unsynced sales); what to do (count, chase, close); how confident (sync and reconciliation status) |
| Headline measures | `sales.net_sales` v1.2, `cash.collections` v1.0, `cash.variance` v1.0, `sales.refunds_voids` v1.1 |
| Scope | Tenant, branch, business day 3 Nov 2026 07:00-22:00 EAT, UGX |
| Exports | A4 portrait PDF; XLSX register |

## Findings

| # | Finding | Rule | Gate | Evidence | Fix |
|---|---|---|---|---|---|
| 1 | Home tile "Sales 4.82M" and the PDF "Net sales 4,700,000" differ by 120,000 | RPT-RECON-003 | RPT-GATE-01 | RECON | Both read `sales.net_sales`; the tile had used payment date |
| 2 | "Items sold: 3,120" adds kilograms of sugar, pieces and litres | RPT-METRIC-003 | | UIT | Show items per unit; headline uses value |
| 3 | Kireka branch had not synced since 11:40, but totals showed no mark | RPT-STATE-001 | RPT-GATE-08 | SHOT | "Partial: Kireka not synced since 11:40" chip and PDF note |
| 4 | Comparison "Up 18% on yesterday" compared 07:00-14:00 today with all of yesterday | RPT-PERIOD-001 | RPT-GATE-03 | UIT | "Today to 14:00 vs yesterday to 14:00: up 6.2%" |
| 5 | PDF page 2 lost the column headings; the grand total sat alone on page 3 | RPT-PRINT-003 | RPT-GATE-06 | PRINT | Repeat headings; keep total with the last lines |
| 6 | XLSX customer phone `0772123456` became `772123456` | RPT-EXPORT-003 | RPT-GATE-05 | EXPORT | Write identifiers as text |
| 7 | A customer name `=HYPERLINK(...)` exported live | RPT-EXPORT-002 | RPT-GATE-05 | EXPORT | Prefix a single quote on text cells starting with a trigger |
| 8 | Supervisor login could export all branches through the export endpoint | RPT-SEC-001 | RPT-GATE-04 | UIT, NET | Branch scope applied in the export query |
| 9 | Cash variance shown in red for a surplus of UGX 5,000 | RPT-PERIOD-003, RPT-VIEW-003 | | SHOT | "Over by 5,000 (count again)"; status by rule, with a word |
| 10 | AI summary said "Sales fell because of rain" | RPT-NARR-002 | RPT-GATE-07 | REVIEW | "Observed: sales fell 30% after 16:00. Cause not verified." |

## Verdict

Before fixes: BLOCKED (RPT-GATE-01, 03, 04, 05, 06, 07, 08 open). After fixes, with reconciliation,
print, export and permission tests re-run as `MEASURED` evidence and an independent reviewer plus
the finance lead signing: eligible for scoring under the Product Excellence scorecard.
