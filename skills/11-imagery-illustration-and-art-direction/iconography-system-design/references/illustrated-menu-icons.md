# Illustrated menu icons

Parent skill: [iconography-system-design](../SKILL.md)

Multicolour, flat illustrated icons on hub menu cards made the reference business app (Maduuka,
November 2026) easier to scan and more pleasant to open. This file sets when they are used, how
they are drawn and what must be recorded before they ship. The card itself is specified in
`09-design-systems-tokens-and-theming/chwezi-business-app-house-style`.

## Where they belong, and where they do not

| Surface | Icon type |
|---|---|
| Hub pages that list destinations (Tools, Money Reports, Sales reports, Legal documents, module homes) | Illustrated, 44 dp |
| Home shortcut cards (one or two per page) | Illustrated, 44 to 64 dp |
| Day or status tiles on a module home (arrivals, in house, collections) | Illustrated, 32 to 40 dp |
| Bottom navigation, top-bar actions, buttons, form fields, list rows, task screens (POS, cashier, kitchen) | Line icons from one family, tinted by role |
| Status and alerts | Line icons with a status tone and a word |

An illustrated icon marks a place to go. A line icon marks an action or a state. Mixing them on one
row looks unfinished.

## One family per app

- Choose one illustration family: the same outline weight (or none), the same corner rounding, the
  same light direction and the same palette depth. Two families on one page read as clip art.
- Limit each icon to two to four flat colours from the app's illustration hues, with an optional
  dark outline. No gradients, glows, 3D or photographic texture.
- Each icon carries one idea that matches the card title: a calendar with a chart for Monthly
  reports, a ledger with a coin for Trial balance, scales for Financial position.
- Avoid symbols that read differently by culture; the currency sign is a known problem in a
  currency-neutral app. Prefer a coin or note without a symbol when the app shows no symbol.

## Drawing rules

- Draw the icon as it is. Never tint it with the primary colour, never place it on a coloured disc
  or gradient. The reference app removed its discs on 6 November 2026 because they dulled the
  colours.
- Keep the visual weight even across a hub: compare the icons side by side at 44 dp and enlarge or
  reduce any that look heavier or lighter.
- Check each icon on light and dark surfaces. Where an icon disappears on dark, add a light
  outline variant rather than a background plate.
- Icons are decorative when the card title says the same thing: give them an empty accessible
  name so screen readers read the title once.

## File formats

| Platform | Format |
|---|---|
| Android | Vector drawable when the source is a clean SVG; otherwise WebP at 3x in a density-independent folder, with the source SVG kept in the design repository |
| Web | Inline SVG or an SVG sprite; PNG or WebP only for raster sources, at 2x |

Keep a register file per app: icon name, card it serves, source, author, licence, attribution
text, date added.

## Licence and attribution (blocking)

Free icon marketplaces usually allow free use only with visible attribution, and paid plans remove
that duty. Before an icon ships:

1. Record its source page, author and licence in the register.
2. If attribution is required, put it on the app's About or Legal page in the form the licence asks
   for, or buy the licence that removes the duty.
3. If the source or licence is unknown, the icon does not ship; use a line icon until it is
   resolved.

The reference app's own illustrated icons have no recorded licence as of 7 November 2026; that is
an open item in `docs/kaizen/2026-11-app-house-style/README.md` (R11), not an example to follow.

## Evidence/currentness

Licence terms differ by marketplace and change over time; read the current terms of the exact
source on the day an icon is added. General marketplace terms were not re-read for this file and
are `NOT_ASSESSED`.
