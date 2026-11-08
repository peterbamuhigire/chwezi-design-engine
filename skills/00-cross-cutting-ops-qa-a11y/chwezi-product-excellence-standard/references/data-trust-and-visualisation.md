# Data trust and visualisation

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Use this reference when a screen shows figures people act on: KPI cards, charts, tables, alerts,
timelines, money. The aim is that every number is correct, labelled, current or visibly stale,
and readable without colour or sight. Rule IDs are in [rules-catalogue.md](rules-catalogue.md);
facts cite [currentness-register.md](currentness-register.md).

This file sets the product-quality contract. For how amounts are written and laid out on finance
screens (compact ladder, statement rows, trial balance) use
[money-figures-and-statement-display](../../../12-data-viz-and-dashboards/money-figures-and-statement-display/SKILL.md);
for chart choice use `12-data-viz-and-dashboards/chart-selection-and-encoding`; for dashboard
composition use `12-data-viz-and-dashboards/dashboard-and-data-product-design`. Metric contracts,
reconciliation across screen, PDF and export, period rules, A4 print and exports are in the companion
[chwezi-reporting-and-dashboards-standard](../../chwezi-reporting-and-dashboards-standard/SKILL.md). The one place this
standard overrides the money skill is decimals, in Task 7.

## Task 1: decide whether an element earns its place

Before designing any dashboard element, write down the user question or decision it serves
(PX-DATA-007). Keep a widget register per dashboard:

| Widget | Role(s) | Question it answers | Action it leads to | Usage evidence |
|---|---|---|---|---|
| Sales today | Owner, branch manager | "Are we on track today?" | Open today's sales list | Opened 41 times last week (example) |

Remove or demote elements with no named question, or with no use over an agreed number of
releases. Checkout and other transaction screens carry no decorative chart and are never placed
behind dashboard widgets (PX-DATA-008). Production builds contain no illustrative or fixture data;
demo data is labelled as demo and cannot mix with live records (PX-DATA-001).

## Task 2: build a KPI card

The component is `KpiCard` in code and "KPI card" in prose; the house style's "KPI tile" maps to
it (owner default, 2026-11-07).

Required parts (PX-DATA-002, MUST; make them required parameters, not optional):

| Part | Rule | Example |
|---|---|---|
| Label | Says what the figure is, in business words | "Sales" |
| Value | Tabular figures; compact form allowed (see Task 7) | "4.82M" |
| Unit | Currency code, count unit or %; once, in the label or beside the value | "UGX" |
| Period | The range the value covers | "Today, 08:00-14:00" |
| Freshness | When the data was last updated, where it can be stale | "Updated 14:02" |
| Drill-down | Tap opens the records that make up the value, with the same filter | Opens today's sales list |
| Delta (optional) | Direction by word or sign and arrow, never colour alone; names the comparison | "Up 12.5% on last Monday" |

Checks: tapping the card opens a report whose total equals the card value exactly; a card without
period or unit fails review; the screen reader reads label, full value, unit, period and delta in
one phrase.

## Task 3: draw a time series

Rules (PX-VIZ-001, PX-VIZ-005, MUST):

- Label the time zone where more than one is in scope (for example EAT, UTC+3), the granularity
  (hourly, daily, monthly) and the axis units.
- Show missing periods as gaps with a note ("No data 12-14 Oct: device offline"), never as
  zeros and never by joining the line across the gap.
- Smoothing, moving averages and downsampling never hide a meaningful spike. Downsample with a
  method that keeps extremes (for example min-max per bucket), and state it.
- Start a bar chart's value axis at zero. A line chart may use a non-zero baseline only when it is
  labelled.
- Show the source period and an interpretation line ("Sales rose every day this week except
  Sunday").
- Render a bounded number of points (PX-PERF-006); no constant animation (PX-MOTION-003).
- RTL: keep the time axis running in the reading direction the product has verified with native
  readers; legends, labels and surrounding controls follow the interface direction. Whether time
  axes mirror is NOT_ASSESSED against a platform source (R4), so this is a SHOULD with a
  native-reader review prompt.

## Task 4: use a donut or gauge only when it fits

Use a donut for a few categories that make up a whole: at most five slices, otherwise a sorted bar
chart. Use a gauge only for progress against a known bound, such as a budget or a target (PX-VIZ-002,
MUST). Always show exact figures and a readable legend next to the marks, not only on hover. Colours
follow the house-style hue set (named by hue, never by status meaning), and every mark has a
label.

## Task 5: build data tables

| Rule | Level | ID |
|---|---|---|
| Numbers right-aligned with tabular figures; units in the header, not in every cell | MUST | PX-TABLE-002 |
| Row identifiers stable across sort, filter and refresh; keys deterministic | MUST | PX-TABLE-002 |
| Sort, filter, search, column management, pagination or virtualisation, row actions, bulk selection, and export where the role is authorised | SHOULD (virtualise any table that can exceed 200 rows: MUST) | PX-TABLE-001 |
| Sort state announced to screen readers; keyboard grid navigation on desktop and web | MUST | PX-A11Y-003 |
| Bulk selection shows the count and, for money, the selected total | SHOULD | PX-TABLE-001 |
| Compact width: more than four columns become a row list or collapsible groups, never a sideways scroll that loses its headers | MUST | PX-LAYOUT-001 |
| Export obeys the same role permissions as the screen, enforced on the server | MUST | PX-PRIV-001 |

## Task 6: design alerts, timelines and pipelines

### Operational alerts (PX-VIZ-004, MUST)

- Order by severity, then due time; show owner and required action.
- Each alert deep-links to the affected record (PX-NAV-005) and can be acknowledged or resolved;
  acknowledgement is attributed (who, when).
- Severity is a label ("Critical", "Due today") plus icon plus colour, never colour alone.
  "Critical" is a severity label; the colour role is `danger`.
- No alert without operational value; no marketing alerts in worker apps (PX-NOTIFY-001).

### Timelines and pipelines (PX-VIZ-003, MUST)

Each stage shows its name; its state (completed, current, blocked, skipped) as a word and icon,
never a coloured dot alone; the timestamp; the responsible actor; and any exception with its
reason. A blocked stage says what unblocks it.

## Task 7: display money

### Store and compute

- Store amounts as integers in the currency's minor unit, using the ISO 4217 exponent of that
  currency (PX-DATA-011). Never floating point.
- ISO 4217 minor units (C1): **UGX 0, RWF 0**, KES 2, TZS 2, USD 2. CLDR display digits agree for
  UGX and RWF (0); TZS has 2 digits with cash digits 0 (C2).
- Never hard-code two decimals anywhere: formatter, input mask, receipt template, export.

### The decimals rule (overrides the money skill)

The money skill's decision table says full amounts show "two decimals". This standard overrides
that line (owner default, 2026-11-07): **the number of decimals in a full amount is the currency's
minor unit.**

| Currency | Full amount | Never |
|---|---|---|
| UGX | `1,234,567` | `1,234,567.00` |
| RWF | `85,000` | `85,000.00` |
| KES | `12,450.50` | `12,450.5` |
| USD | `310.00` | `310` in a document or payment |

Zero-minor-unit currencies accept no decimal entry (PX-INTERACT-016). Rounding rules for cash
(where the smallest coin is larger than the minor unit) are applied once, shown as their own line,
and reconcile (PX-DATA-012).

### Abbreviation

Use the money skill's compact ladder (K, M, B with two decimals of the unit, promotion at 1,000 of
a unit, values below 1,000 as whole numbers). The two decimals in "4.82M" are digits of the
abbreviation, not minor units, so they apply to UGX too. Rules:

- Exact amounts are never abbreviated: closing balances, invoice and receipt totals, payment
  inputs and confirmations, document lines, anything a person may rely on or dispute.
- A compact figure offers the full amount on tap, long-press or focus, and screen readers always
  get the full amount ("Sales, 4,823,500 Uganda shillings").
- A compact total still equals the sum of its parts in full; show the full total where the parts
  are shown.

### Currency labels and multiple currencies

- Single-currency apps put the code in the label ("Sales (UGX)"), not on every figure. CLDR gives
  `USh` as the UGX symbol in en_UG and sw_UG (C3); the ISO code `UGX` is unambiguous and preferred
  wherever more than one currency is in scope.
- Never sum different currencies. A converted figure shows rate, source and timestamp.
- Format numbers by locale, but keep ASCII digits for machine strings, SQL and exports (C4).
  Digit shape in Arabic locales (Western or Arabic-Indic) follows a tenant setting, applied
  consistently (PX-L10N-008).

### Tabular numerals

Every figure, including one inside a sentence, uses tabular figures; columns right-align on the
last digit (PX-TYPE-004, PX-GEOM-007). The house-style figure styles supply this.

## Task 8: label percentage changes correctly

Never mix percentage and percentage-point changes (PX-DATA-003, MUST).

| Situation | Correct | Wrong |
|---|---|---|
| Margin moves from 20% to 25% | "Margin up 5 percentage points (to 25%)" | "Margin up 5%" |
| Same change as a relative change | "Margin up 25% relative (20% to 25%)" | "Margin up 25%" with no base |
| Sales move from 4,000,000 to 4,500,000 | "Up 12.5% on last week" | "Up 0.5M (12.5 points)" |
| A change from zero | "New this period" | "Up infinity%" or "Up 100%" |
| A non-zero share that rounds to zero | "Less than 1%" | "0%" |

Use "pp" only where space forces it and the screen defines it once. Shares in sentences use whole
numbers; changes use one decimal (money skill ladder).

## Task 9: tell zero from unavailable

A zero is a measured fact; "unavailable" is the absence of a measurement. Mixing them causes wrong
decisions (a stock count of 0 triggers a reorder; "not counted" should not).

| Case | Display | Screen reader |
|---|---|---|
| Measured zero | `0` with its unit ("0 sold") | "Zero sold" |
| Not yet synced | "Not synced yet" plus last-sync time | Same words |
| Not available (source down, no permission, not recorded) | "Not available" plus the reason | Same words |
| Not applicable | "Not applicable" or omit the field with a reason in the contract | Same words |
| Estimated | Value with "Estimate" label and basis | Includes "estimate" |

A dash alone never stands for "unavailable", because it reads as zero to some users and as nothing
to screen readers. Charts show unavailable periods as gaps with a note (Task 3).

## Task 10: show freshness and provenance

- **Freshness.** Any figure that can be older than its decision window shows its age. Default
  window (owner to confirm; SHOULD): any cached or offline data, and any operational dashboard
  figure older than 15 minutes, shows a "Stale" chip with the time (PX-OFFLINE-004).
- **"Live" means push-fed.** Never label a figure "live" or "real-time" unless it updates by
  push. Stale clinical values are never shown as current (PX-BLACKLIST-002).
- **Provenance.** Figures that drive decisions name their source and as-of time on the screen or
  one tap away (PX-DATA-009): "From sales ledger, as of 14:02", "Lab result, entered by J. Okello
  at 09:40" (fictional).
- **Reconciliation.** Money, tax, stock and clinical values reconcile with the authoritative source
  and report definitions; rounding and offline reconciliation are tested (PX-DATA-004).

## Task 11: make charts accessible

- Every chart has a text summary that states the main finding, and a data table or list
  alternative reachable in one step (PX-A11Y-005).
- Summaries are written from the data, not generic ("Sales by day chart"). Pattern:
  "<Measure> <direction> from <start> to <end> over <period>; highest <value> on <day>; <notable
  exception>."
- Marks keep 3:1 contrast against their background and neighbours (WCAG 1.4.11, A4); each series
  has a label, pattern or direct annotation as well as colour (PX-COLOUR-002).
- Interactive charts are keyboard-operable; tooltip content is dismissible and persistent (WCAG
  1.4.13).
- Do not rely on hover alone on touch devices.

Worked summary (fictional data): "Sales rose from 3.9M on Monday to 5.2M on Saturday, the highest
day this week. Sunday fell to 1.1M because the shop opened at 14:00."

## Evidence/currentness

ISO 4217 and CLDR values: C1-C4 in [currentness-register.md](currentness-register.md), accessed
2026-11-07 (CLDR read from the main branch; tie it to a CLDR release before shipping). WCAG
criteria: A3, A4, W5. RTL chart direction: R4, NOT_ASSESSED. The donut slice limit (five), the
200-row virtualisation threshold and the 15-minute stale window are Chwezi proposals, not external
facts. The decimals override is an owner default of 2026-11-07 and needs a matching edit to the
money skill's decision table.
