# Statement and summary layouts

Parent skill: [money-figures-and-statement-display](../SKILL.md)

Phone-first layouts for the finance screens of a business app. Each is one column at 360 dp and
survives 200% text. Cards, colours and type come from
`09-design-systems-tokens-and-theming/chwezi-business-app-house-style`.

## Customer or supplier statement

**Head card ("What this customer owes").** Two-column label-over-value grid: Owes, Advances held,
Closing balance, all in full. One primary money action ("Take deposit") as a full-width button.
Below a divider, each open invoice as its number and "Open 144,000" (UGX, no decimals).

**Rows.** One row per statement line, 10 to a page.

| Left | Right (stacked, right-aligned, compact) |
|---|---|
| Date ("25 Oct 2026") on one line, never wrapped | `Due 160.00K` in money-down |
| Type ("Invoice", "Payment", "Deposit") | `Paid 16.00K` in money-up |
| | `Balance 144.00K` in ink |

A line with only a charge shows Due and Balance; with only a payment, Paid and Balance. Where the
server nets a charge and its payments into one line, both Due and Paid show.

## Trial balance

- A balance status tile first ("Books balance" on a success container, with the range).
- Then one collapsible card per account type (Assets, Liabilities, Equity, Income, Expenses), open
  by default. Header: type name in the primary colour, "10 accounts", the group's `Dr` and `Cr`
  totals, a collapse chevron.
- Account rows inside: the code in the muted colour, the name, then `Dr 812.10M` left and
  `Cr 3.25M` right-aligned on the line below, compact style.
- A footer pinned above the navigation bar: `Closing Dr 42.15B` left, `Closing Cr 42.15B` right.
- Options as outlined chips: "Show zero rows", "Compare last period".

## Financial position

- "As at 6 Nov 2026" picker; one sentence of what the statement is ("What you own, what you owe,
  and your share of the business").
- One card per section (Assets, Liabilities, Owner's equity): the section name and its total on
  the header line in full, then account rows with the name left and the amount right on one line
  where it fits, wrapping the name rather than the figure.
- No run ids, no repeated "As at" labels, no alternating grey bands.
- Status in words: "Not yet checked against the bank" rather than "reconciliation not confirmed".

## Profit or loss

The period picker, then three figures: Income, Expenses and the result labelled "Profit" or
"Loss" in its money colour with its word. Account detail is behind a single eye-icon toggle so the
page opens decluttered.

## Monthly or daily summary

The order that read best in the reference app, top to bottom:

1. Period navigator (names the period).
2. Hero card: range, "Sales this month", hero figure, three mini tiles (invoices, average sale,
   still owed).
3. Money card "What the month left you": Came in, Went out, Profit (money-up), a progress bar and
   "You kept 24% of what came in."
4. Highlights: the best day on the accent container, then plain facts ("Sold on 31 of 31 days",
   "Busiest weekday: Saturday", "Your best customer bought 16% of all sales").
5. Day-by-day bars: all bars a soft tint, the best day in the brand colour, labelled.
6. Top-three tables: staff, customers, products, days. Rank badge, name, compact amount
   right-aligned; days read "Sun, 25 Oct".
7. Module figures (rooms, tables, prescriptions) only when the business runs that module.

Only closed periods open a summary. A month list shows the 12 most recent, a day list the 7 most
recent, each with its total; older periods come from the navigator's picker.

## Lists of invoices on sales pages

Collapsed by default; when opened, one bullet per item sold ("Jollof Rice x 2"); no batch numbers
on sales pages.

## Evidence/currentness

Layouts observed in the reference app's screenshots of 5 and 6 November 2026 and the owner's
rulings of the same days. The accounting presentation of each statement must still be checked
against the finance engine for the jurisdiction in question; that check is `NOT_ASSESSED` here.
