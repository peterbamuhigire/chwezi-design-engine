---
name: money-figures-and-statement-display
description: "Use when a business app shows money on screen: K/M/B compact amounts, hero figures, Due/Paid/Balance statement rows, trial balance, profit or loss, financial position, monthly or daily summaries, top-three tables. Money-moving screens go to fintech-and-financial-product-ui; analytics dashboards to dashboard-and-data-product-design."
metadata:
  portable: true
  category: 12-data-viz-and-dashboards
  compatible_with:
  - claude-code
  - codex
---

# Money Figures and Statement Display

Decides how amounts are written, sized, coloured and laid out when a business app shows money:
which form an amount takes, how a statement row reads, how a trial balance fits a phone, and how a
month or a day is summarised for an owner who is not an accountant.

The rules come from the Maduuka app's November 2026 finance work, kept after the audit in
`docs/kaizen/2026-11-app-house-style/README.md`. They pair with
`09-design-systems-tokens-and-theming/chwezi-business-app-house-style`, which supplies colour,
type and the shared cards.

<!-- dual-compat-start -->
## Use When

- Deciding whether an amount shows in full ("32,450,000.00") or compact ("32.45M").
- Laying out a customer or supplier statement, a trial balance, a profit or loss, a financial
  position or a cash-flow summary on a phone or a narrow web column.
- Designing a monthly, daily or shift summary for an owner: hero figure, money in and out, best
  day, top three customers, products, staff or days.
- Reviewing a finance screen for misaligned figures, colour-only signals or misleading rounding.

## Do Not Use When

- The screen moves money between parties: use
  `06-sector-and-domain-ux/fintech-and-financial-product-ui`.
- The work is an analytical dashboard with charts and filters but no statements:
  `12-data-viz-and-dashboards/dashboard-and-data-product-design` and
  `12-data-viz-and-dashboards/chart-selection-and-encoding`.
- The accounting meaning of a line (classification, IFRS presentation, what counts as profit):
  the finance engine `chwezi-accounting-doctrine`, consulted through the workspace map.
- Printed or PDF statements: `13-presentations-and-documents/*`; documents always use full amounts.

## Required Inputs

| Input | Source | Required? | Why |
|---|---|---|---|
| The figures and their meaning (sales, receipts, balance, debit, credit) | Finance engine, API contract | yes | A label must say what the amount is |
| Currency handling (one currency, symbol policy, decimals) | Product owner | yes | Multi-currency apps show no symbol; decimals are fixed |
| Which amounts are legally or contractually exact (closing balances, invoice totals) | Owner, finance | yes | Those never abbreviate |
| Screen widths and text sizes to support | Product scope | yes | Decides compact columns and wrapping |
| Plain or formal wording preference | Owner | default plain | Formal statement words become a per-device setting |

## Workflow

1. **Classify every amount** with [references/compact-amount-ladder.md](references/compact-amount-ladder.md):
   exact (full), summary (compact), or chart axis (compact, fewer digits). Write the class next to
   each figure in the spec.
2. **Label every amount.** Each figure has a word beside or above it ("Owes", "Closing balance",
   "Came in"). A bare number is not allowed, not even in a hero.
3. **Choose the layout** from [references/statement-and-summary-layouts.md](references/statement-and-summary-layouts.md):
   statement rows, trial balance groups, financial position bands, profit or loss, monthly or daily
   summary.
4. **Set the figure styles.** Tabular figures for every amount; right-align amounts in a column;
   dense columns use the 12 sp compact style; the single hero figure softens its decimals and unit.
5. **Apply colour by meaning, with words.** Due and loss in the money-down role, paid and profit in
   money-up, balance and neutral totals in ink. Each coloured amount also carries its word or sign.
6. **Check the arithmetic shown.** Percentages never round a non-zero value to 0% ("less than 1%");
   totals shown compact still equal the sum in full; a negative uses one convention per screen.
7. **Name the period once.** The navigator or top bar names it; cards show the range.
8. **Give screen readers the full amount** and the label in one phrase ("Profit, 24,260,000.00").
9. **Prove it** at 360 dp and 200% text with the largest real figure (a billion-scale balance) and
   a zero, a negative and a single-digit value. Missing captures stay `NOT_ASSESSED`.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Amount is a closing balance, invoice total, payment input or document line | Full amount, grouped, two decimals | A compact closing balance hides the exact debt and invites disputes |
| Amount is in a tile, list row, summary or a column beside another amount | Compact K/M/B with two decimals | Full figures wrap or truncate at 12 sp on a phone |
| Value below 1,000 | Whole number, no unit | "0.85K" reads as an error |
| Share is non-zero but rounds to 0% | Write "less than 1%" | "You kept 0%" beside a positive profit contradicts itself |
| One line carries both a charge and its payments | Show Due and Paid on separate labelled lines, then Balance | A netted single figure hides what was paid |
| Trial balance on a phone | Collapsible groups with group debit and credit totals and a pinned closing footer | A six-column table scrolls sideways and loses its headers |
| A debt figure is shown | Make it tappable only when something is owed, and open that customer's unpaid invoices | Tapping zero, or landing on the business-wide ageing page, wastes a step |
| Statement wording | Formal or plain by a per-device setting; never a toggle link on the page | A link on every statement clutters and gets tapped by mistake |

## Capability Contract

- Read the finance contract, screens and formatter code; review is read-only by default.
- Edit formatter, layout and test files when implementation is requested; use synthetic figures.
- Never change what a figure means, how it is computed or posted; that belongs to the finance owner.

## Degraded Mode

- Meaning of a figure unknown: stop before choosing its colour or label; show it in full with its
  server label, mark the layout a draft and ask the finance owner.
- Block release of a screen where a closing balance, invoice total or payment input is shown in
  compact form.
- No real data at billion scale: test with synthetic extremes (0, 7, 999, 1,000, 999,995,
  1,234,567,890.55, a negative) and record the results.
- No device: deliver the layout spec and formatter tests; screenshots stay `NOT_ASSESSED`.

## Anti-Patterns

- **Bare figures.** "144,000.00" with no word. Correction: "Owes 144,000.00".
- **Colour-only money.** A red number with no "Due" or minus sign. Correction: word or sign plus
  colour.
- **Proportional digits.** Amounts that do not line up. Correction: tabular figures, right aligned.
- **Compact where exact is owed.** "144.00K" as a closing balance. Correction: full amount.
- **"1000.00K".** Rounding that stays in the wrong unit. Correction: promote to "1.00M".
- **Machine text.** "Run 9f3773fa", "As at: As at 6 Nov". Correction: remove ids; label once.
- **Zebra bands as decoration.** Alternating greys that look like a selection. Correction: one
  band per group, dividers inside.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Amount classification table | Engineers, reviewers | Every figure on the screen classed full, compact or axis |
| Layout spec for each finance screen | Engineers | Labels, alignment, colours with words, period named once |
| Formatter tests | CI | Ladder boundaries, promotion, negatives, below-1,000 and full-amount screen-reader text pass |
| Screenshot set | Owner | 360 dp and 200% text with extreme figures; missing shots `NOT_ASSESSED` |

## Examples

- [examples/monthly-summary-spec.md](examples/monthly-summary-spec.md): a full monthly summary page
  for a fictional hardware shop, card by card, with every amount classed.

## References

- [references/compact-amount-ladder.md](references/compact-amount-ladder.md)
- [references/statement-and-summary-layouts.md](references/statement-and-summary-layouts.md)
- `docs/kaizen/2026-11-app-house-style/README.md`
- `doctrine/references/wcag-2.2-criteria.md` (1.4.1 use of colour, 1.4.3 contrast, 1.3.1 info and
  relationships)
- Related: `09-design-systems-tokens-and-theming/chwezi-business-app-house-style`,
  `06-sector-and-domain-ux/fintech-and-financial-product-ui`.
<!-- dual-compat-end -->
