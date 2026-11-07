# Worked example: bringing an agro-supply web app onto the house style

Parent skill: [chwezi-business-app-house-style](../SKILL.md)

A fictional case. "Mavuno Agro Supply" is a web app for a farm-input dealer with three shops in
Mbale: sales, stock, supplier payments and a monthly owner summary. The owner's logo green is
`#3FA34D`.

## 1. Colour roles

| Check | Value | Result |
|---|---|---|
| Logo green with white text | `#3FA34D` | 3.20:1, fails 4.5:1 |
| Darkened in the same hue | `#2E7A3A` | 5.30:1 with white; 4.74:1 on the ground; passes |
| Ground (pale tint of the hue) | `#EAF5EC` | ink 13.35:1 |
| Primary container / on-container | `#D3ECD7` / `#0F3D1A` | 9.84:1 |
| Accent | `#F8B020` with ink `#1B2430` | 8.36:1 (unchanged) |

Decision: the logo keeps `#3FA34D` for the mark only; `#2E7A3A` becomes the brand primary.

**Conflict found.** The brand is now green and so is money-up (`#2E7D32`, 4.96:1). A green
"Record payment" button next to a green profit figure would read as one thing. Resolution, in
order of preference:

1. Section titles and selected states use the brand; money figures use the money role and always
   carry a word or arrow ("Profit 2.40M", "Up 8.1%").
2. Primary buttons that are not the next step become outlined, so the only filled colours on a
   summary page are the accent and the money roles.
3. If confusion remains in a hallway test with two shop staff, shift money-up toward teal
   (`#00695C`) and record the change as a theme decision.

## 2. Type

Atkinson Hyperlegible for body and labels, Public Sans with tabular figures for headings and money.
Reason: staff read on shared, cheap phones in bright shops; amounts must align in stock and
payment tables. Neither face is on the banned list.

## 3. Screens mapped to the catalogue

| Screen | Components | Accent |
|---|---|---|
| Home | Context strip, greeting, four KPI tiles (Sales today, Sales 30 days, Unpaid, Low stock), one insight line | None (a hub page) |
| Reports | Hub menu cards with illustrated icons: Monthly summary, Stock value, Supplier balances, Sales by shop | None |
| New sale | Line icons only, product list, cart bar | "Charge" |
| Supplier payment | Form, review block | "Pay supplier" |
| Monthly summary | Period navigator, hero card, money card, highlights, top-three tables | None |

## 4. Guardrails for an existing code base

First measurement on the current templates: 212 hex literals outside `tokens.css`, 9 pages with
two or more amber buttons, 141 arbitrary Tailwind spacing values. These become the baselines. The
first release lowers the accent count to 0 pages with two (a ban); the hex and spacing ratchets
fall as each page is touched.

## 5. Evidence plan

Screenshots of the five screens at 100% and 200% browser zoom, light and dark, at 360 px and
1280 px; the contrast table above recomputed from the token file; a reduced-motion run of the
monthly summary. Until captured, each is `NOT_ASSESSED`.
