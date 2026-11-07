# Compact amount ladder

Parent skill: [money-figures-and-statement-display](../SKILL.md)

## The three forms

| Form | Example | Where |
|---|---|---|
| Full | `32,450,000.00` | Closing balances, invoice and receipt totals, payment inputs and confirmations, documents and PDFs, the amount a screen reader speaks |
| Compact | `32.45M` | KPI tiles, hero figures, list and statement rows, summary cards, top-three tables, dense columns |
| Axis | `32.5M` or `32M` | Chart axes and bar labels only |

Default to full when unsure. Compact is a display convenience; it never replaces the exact figure
where someone may rely on it.

## Compact rules

1. Absolute value below 1,000: the whole number, rounded half up, no unit (`7`, `999`).
2. Otherwise pick the largest unit the value reaches: K (thousand), M (million), B (billion).
3. Divide and round half up to exactly two decimals; group the whole part (`1,250.00B` is allowed
   only above a trillion, which most apps never reach).
4. If rounding reaches 1,000 of the unit, promote: `999,995` is `1.00M`, never `1000.00K`.
5. Keep the sign in front: `-123.46K`. Use one negative convention per screen (minus sign, or
   parentheses on formal statements), never both.
6. No currency symbol in multi-currency or currency-neutral apps. A single-currency app may put
   its code in the label ("Sales (UGX)"), not on every figure.
7. The units are the letters K, M and B in every language, unless a translator rules otherwise for
   a locale; record any such ruling.

## Boundary tests

Every formatter ships with these cases.

| Input | Compact | Full |
|---|---|---|
| 0 | `0` | `0.00` |
| 7 | `7` | `7.00` |
| 999.4 | `999` | `999.40` |
| 999.5 | `1.00K` | `999.50` |
| 1,000 | `1.00K` | `1,000.00` |
| 403,380 | `403.38K` | `403,380.00` |
| 999,995 | `1.00M` | `999,995.00` |
| 114,960,000 | `114.96M` | `114,960,000.00` |
| 42,150,000,000 | `42.15B` | `42,150,000,000.00` |
| -123,456 | `-123.46K` | `-123,456.00` |

## Hero figure

The one large figure on a summary splits into two runs: the whole part in ink and bold, the
decimal point, decimals and unit in the muted colour at regular weight (`114` + `.96M`). It
counts up once on open, except under reduced motion. Its accessible text is the label and the
full amount.

## Percentages

- One decimal for changes (`Up 15.7%`), whole numbers for shares in sentences (`You kept 24%`).
- A non-zero value that rounds to zero is written "less than 1%"; a true zero is "0%".
- A change from zero has no percentage; say "New this period".
- A change chip always carries an arrow and a word as well as its colour.

## Evidence/currentness

Rules are house style ruled by the owner (October and November 2026) and observed in the
reference app's formatter tests. WCAG 1.4.1 (colour not the only means) via
`doctrine/references/wcag-2.2-criteria.md`.
