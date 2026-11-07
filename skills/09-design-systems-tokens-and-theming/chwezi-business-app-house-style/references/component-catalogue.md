# Component catalogue

Parent skill: [chwezi-business-app-house-style](../SKILL.md)

One component per concept. Each entry gives its anatomy, the rules that made it work in the
reference app, and the mistake to avoid. Values refer to the scales in
[style-roles-and-tokens.md](style-roles-and-tokens.md). Money-specific layouts (statement rows,
trial balance groups, top-three tables, the compact-amount ladder) are in
`12-data-viz-and-dashboards/money-figures-and-statement-display`.

## Page frame

**Top bar.** Back arrow, page title in sentence case, at most two icon actions (refresh, download)
or one text action with an icon ("+ Apply payment"). Surface colour, no elevation.

**Context strip** (hub, report and summary pages). A row under the top bar: a date chip with a
calendar glyph on the left ("6 Nov"), a "Switch" text button with a shop glyph on the right, and
the place name ("Pearl - Mengo Branch") centred on a slightly darker band below. It answers "which
business, which day" without opening anything.
- Task screens (POS, cashier, kitchen) fold the strip into the title line to save height: the place
  name becomes a chevron button that opens a small sheet.
- Show each place once; a shop that is both branch and outlet is listed once.

**Bottom navigation.** Four or five destinations, line icons at 24 dp, labels always visible at
every text size, a primary-container pill behind the selected icon, selected label in the primary
or money-green role. Never hide labels to save space.

## Hub menu card

For destination lists: Tools, Money Reports, Sales reports, Settings groups.

| Part | Rule |
|---|---|
| Container | Whole card tappable with a button role; min height 88; padding 16; surface fill; 1 dp hairline; radius 20; no shadow |
| Icon | Illustrated multicolour icon at 44, drawn as it is: no tint, no disc. Material line icon on a pale disc only when no illustration exists yet |
| Title | Sentence case, 1 to 4 words, title style, semibold |
| Description | One plain sentence of what is inside, muted, up to three lines, never truncated mid-word on a 360 dp phone |
| Trailing | Chevron in the muted colour |

One card per row on phones; two per row from 600 dp. Order by how often each is used, not by the
alphabet. Group long hubs under small section titles in the primary colour ("Front desk").

Avoid: icon-only grids, cards that hold buttons, a description that repeats the title.

## KPI tile

For a handful of headline figures on Home or a module home (two columns on phones).

- A 28 line icon tinted with one illustration hue, the label ("Sales (30 days)"), the figure in a
  display or `amountLarge` style, compact form ("67.87M").
- Optional change chip: arrow, word and colour together ("Up 15.7%" in money green with an up
  arrow). Down uses the money-down role. Never colour alone.
- Counts are plain numbers ("3"); amounts are compact; the full amount goes to the screen reader.
- Four tiles at most per group. A tile with nothing to compare shows no chip rather than "0%".

## Hero summary card

One per page, at the top of a summary (a month, a day, a stay).

- Radius 28; a soft vertical gradient from the primary container to the surface; padding 24.
- A small illustrated glyph (calendar) beside the period range ("1 Oct to 31 Oct 2026"). The period
  name itself is already in the navigator or the top bar; do not repeat it.
- A label ("Sales this month") and the figure in the largest display style: the whole part bold in
  ink, the decimals and unit softened to the muted colour and a regular weight ("114" + ".96M").
  The figure counts up once.
- Up to three mini tiles in a row below (radius 16, translucent surface): count, average, still
  owed. Each tile is value above label.

## Soft section card

The building block of summary pages. Surface, radius 20, hairline, padding 16 to 24, a section
title in the primary colour and title-small weight ("What the month left you", "Highlights").
Content inside is rows, a three-column stat row, a bar, or a top-three table. Cards follow each
other with 12 between them and reveal in order.

## Highlight tile

The single best item of a section ("Best day  Sun, 25 Oct  7.99M") on the accent container, radius
16, label above value on the left, amount right. One per card. Supporting facts follow as plain
sentences below it ("Sold on 31 of 31 days").

## Insight line

One sentence that turns a figure into a next step, with a lightbulb glyph on the left and a text
action on the right: "3 unpaid invoices worth 179,200.00." then "Customers". Surface-container
background, no border. Show at most one per page and only when there is something to act on.

## Period navigator

Previous chevron, a primary-container pill with a calendar glyph, the period name and a dropdown
arrow, next chevron. The pill opens a picker of recent periods (the last 12 months or 7 days).
The next chevron is disabled, not hidden, at the newest available period.

## Buttons

| Emphasis | Use | Style |
|---|---|---|
| Accent | The one next step on a screen | Warm accent fill, ink text, radius 16, min height 48, optional leading icon |
| Primary | Other main actions, money actions inside a card ("Take deposit") | Primary fill, white text; money actions may carry a leading icon on a light translucent disc |
| Tonal or outlined | Secondary actions ("Open night audit", "Show zero rows") | Outline role border or primary-container fill |
| Destructive exit | Sign out, cancel bill | Outlined with the error role for border, icon and text; confirm before acting |
| Text | Top-bar and inline actions ("Switch", "Apply payment") | Primary text with a leading icon |

Labels name the action ("Take deposit", "Create bill"), never "OK" or "Submit". The accent is never
used for a status, a tab or a decorative badge.

## Status and chips

Status chips use a tone (success, warning, danger, neutral), a word and an icon, title case for
the status word only ("Part paid"). Filter chips are outlined, selected chips use the secondary
container with a check. Rank badges: first place on the accent container, second and third on a
neutral container, number centred.

## Empty, loading and error states

Empty: a heading saying what will appear here and one action to start. Loading: static skeleton
rows (no shimmer loop) or keep the old content while refreshing. Error: a dialog or inline block
that says what happened and what to do; never raw server text. Pull to refresh on every report.

## Evidence/currentness

Component rules were observed in the reference app's screenshots of 5 and 6 November 2026 and its
component code; device and screen-reader checks come from its October 2026 records and are
`NOT_ASSESSED` for a new app until repeated there.
