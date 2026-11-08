# Worked example: monthly summary for a hardware shop

Parent skill: [money-figures-and-statement-display](../SKILL.md)

A fictional case. "Kiwanuka Hardware" in Masaka closes September 2026. Figures are invented.
Every amount is classed F (full), C (compact) or A (axis).

## Page, top to bottom

| Card | Content | Amounts |
|---|---|---|
| Top bar | "Monthly summary" with refresh | - |
| Period navigator | < [calendar] September 2026 v > ; next disabled (newest closed month) | - |
| Hero | calendar glyph, "1 Sep to 30 Sep 2026"; "Sales this month"; `48` + `.62M` | C |
| Hero mini tiles | `412` Invoices; `118.01K` Average sale; `2.34M` Still owed | count, C, C |
| What the month left you | Came in `41.90M`; Went out `33.15M`; Profit `8.75M` (money-up, word "Profit"); bar at 21%; "You kept 21% of what came in." | C |
| Highlights | Best day `Sat, 26 Sep` `3.12M` on the accent container; "Sold on 29 of 30 days"; "Busiest weekday: Saturday" | C |
| Day by day | 30 bars, all tinted, 26 Sep in brand colour; axis 0, 1M, 2M, 3M | A |
| Top customers | 1 Ssekandi Builders `6.40M`; 2 Masaka Diocese Works `4.18M`; 3 Nalubega Construction `2.95M` | C |
| Top products | 1 Cement 50 kg `12.30M`; 2 Iron sheets 28 g `9.84M`; 3 Wire nails 4 in `2.11M` | C |
| Top staff | 1 Okello Simon `20.02M`; 2 Namata Grace `16.77M`; 3 Mugisha Paul `11.83M` | C |

No hotel, restaurant or pharmacy block: the shop runs none of those modules.

## What was removed from the first draft

- The card title "September 2026" in the hero (the navigator already says it).
- "You kept 0%" for a test month with profit 3.18K: now "less than 1%".
- A "Run 4be1c0" footer under the money card.
- A red "Went out" figure: spending is not an error; it stays ink, with its word.

## Screen-reader text

- Hero: "Sales this month, 48,620,000 Uganda shillings".
- Profit: "Profit, 8,750,000 Uganda shillings. You kept 21% of what came in."
- Top customers row 1: "First, Ssekandi Builders, 6,400,000 Uganda shillings".

## Checks

| Check | Status |
|---|---|
| 360 dp at 100% and 200% text, light and dark | `NOT_ASSESSED` (spec only) |
| Compact totals equal the full sums within rounding | Pass on the invented figures |
| Reduced motion: no count-up, reveal or grow-in | `NOT_ASSESSED` |
