# Style roles and tokens

Parent skill: [chwezi-business-app-house-style](../SKILL.md)

Use this table to set up a new app's theme. Only the brand primary and the colours derived from
its hue change between apps. Every other role keeps its job, and usually its value.

## Colour roles (light)

Reference values are the Maduuka app's. Contrast was recomputed on 7 November 2026 from these
values with WCAG relative luminance; the token pack in `../examples/house-style-tokens.json`
carries the same claims and is checked by `scripts/validate_token_example.py`.

| Role | Job | Reference | Measured contrast | Rule |
|---|---|---|---|---|
| Brand primary | Links, filled buttons, selected states, section titles | `#1A6DB3` | 5.41:1 with white; 4.74:1 on the ground | Must reach 4.5:1 both ways; darken in the same hue if not |
| On primary | Text and icons on primary | `#FFFFFF` | 5.41:1 | |
| Ground | Page background behind cards | `#E8F1FC` | ink 13.10:1 | A pale tint of the primary's hue, never pure white or beige |
| Surface | Cards, sheets, top bar | `#F9FCFF` (cards may be `#FFFFFF`) | ink 14.51:1 | Near-white with a trace of the hue |
| Ink | Body text, figures | `#1D273B` | 14.51:1 on surface | Never pure black |
| Muted | Secondary lines, labels, softened decimals | `#565E6C` | 6.35:1 on surface; 5.73:1 on ground | Still body-text contrast |
| Hairline | Card border, row dividers | `#C3D0E1` | 1.52:1 (decorative) | Never the only sign that something is tappable |
| Outline | Field and outlined-button borders | `#7A8291` | 3.76:1 | Meets 3:1 for component boundaries |
| Primary container | Selected nav pill, period navigator, hero gradient top | `#D6E8FA` | on-container `#0B3566` 9.78:1 | Text here uses on-container only: primary measured 4.32:1, money green 4.10:1 |
| Accent (warm) | The one next-step button | `#F8B020` | ink `#1B2430` 8.36:1 | One per screen; never for status or decoration |
| Accent container | Highlight tile, first rank badge | `#FFE9B8` | `#3D2A00` 11.51:1 | |
| Money up / success | Profit, paid, positive change | `#2E7D32` | 4.98:1 on surface | Always with a word or arrow |
| Money down / error | Due, loss, negative change, destructive buttons | `#B42323` | 6.36:1 on surface | Always with a word or sign |
| Brand sky (logo) | Logo and large brand marks only | `#38A0F8` | 2.78:1 with white | Never small text; ink on it 5.37:1 |

## Semantic status roles

Owner default, 2026-11-07, from the Chwezi Product Excellence Standard
(`doctrine/product-excellence-standard.md`): the house style carries five status roles whose
meaning no product brand or theme may change. Token names are `success`, `warning`, `danger`,
`info` and `neutral`, each with `on-<role>`, `<role>-container` and `on-<role>-container`.
`danger` is the token name for the money-down / error role above; "critical" is a severity label
shown in words, not a colour role. `success` is the money-up role above. Status colour is always
paired with a word, sign or icon, and the warning role never reuses the amber next-step accent.

The warning, info and neutral values below are **proposed (owner to confirm)**. Contrast was
computed on 2026-11-08 with the engine's WCAG relative-luminance function
(`engine.design_engine.catalog.contrast_ratio`); they are not yet in the token pack, so
`validate_token_example.py` does not cover them, and rendered-device contrast is `NOT_ASSESSED`.

| Role | Light value | Light contrast | Light container / on-container | Dark value | Dark contrast | Dark container / on-container |
|---|---|---|---|---|---|---|
| `success` | `#2E7D32` (money up) | 4.98:1 on surface | `NOT_ASSESSED` (to measure) | `NOT_ASSESSED` | `NOT_ASSESSED` | `NOT_ASSESSED` |
| `danger` | `#B42323` (money down) | 6.36:1 on surface | `NOT_ASSESSED` (to measure) | `NOT_ASSESSED` | `NOT_ASSESSED` | `NOT_ASSESSED` |
| `warning` | `#9A4F00` | 5.84:1 on surface; 5.27:1 on ground; white on it 6.01:1 | `#FFEBD2` / `#5A2E00` 9.90:1 | `#F5B26B` | 8.33:1 on dark surface | `#4A2A00` / `#FFDDB8` 10.04:1 |
| `info` | `#0B6E84` | 5.70:1 on surface; 5.15:1 on ground; white on it 5.87:1 | `#DCF1F6` / `#063F4C` 9.85:1 | `#7FCDDF` | 8.50:1 on dark surface | `#0A3B46` / `#C2ECF6` 9.63:1 |
| `neutral` | `#565E6C` (same as muted) | 6.35:1 on surface; 5.73:1 on ground; white on it 6.54:1 | `#E8EBF0` / `#2B3240` 10.76:1 | `#B4BAC5` | 7.82:1 on dark surface | `#2E3744` / `#DDE2EA` 9.24:1 |

Containers sit about 1.1:1 against the surface: they are fills, never the only boundary or the
only sign of state. Warning text and the amber accent differ by 3.21:1 and by role: warning is a
label with a word, the accent is the one next-step button.

## Colour roles (dark)

| Role | Reference | Measured |
|---|---|---|
| Ground | `#161C24` | |
| Surface | `#1E2631` | text `#E6E7E9` 12.33:1; muted `#B4BAC5` 7.82:1 |
| Brand primary | `#8DBBF2` | 7.64:1 on surface |
| Accent | `#F8B020` with ink `#1B2430` | 8.36:1 (unchanged) |

Dark theme is remapped, never inverted. Cards keep their hairline; shadows stay off.

## Illustration and chart hues

At most eight named hues outside the roles, named by hue (never by meaning, so a chart bar does not
look like a status): blue, sky, green, amber, orange, red, purple, teal. Use them for chart series,
illustration accents and category tints. Pair every colour mark with a label or icon. A ninth hue
is a theme change and needs the owner's decision.

## Type

| Role | Reference face | Size and weight | Notes |
|---|---|---|---|
| Body, labels | Atkinson Hyperlegible (OFL) | 14 to 16 sp regular | Distinct letter shapes for shared phones and second-language readers |
| Headings, titles | Public Sans (OFL) | 20 to 28 sp semibold to bold | Sturdy, neutral, not a banned face |
| Money and figures | Public Sans with tabular figures (`tnum`) | Named amount styles below | Every amount, including one inside a sentence |
| Codes and references | the body face | regular | A slashed zero is acceptable in codes, never mixed into amounts |

Named figure styles, all with tabular figures: the display roles (36, 40 and 45 sp bold) for the
one hero figure and KPI tile figures; `amountLarge` (24 sp bold) for totals; `amountMedium` (16 sp
semibold) for emphasised rows; `amountSmall` (14 sp medium) for rows; `amountCompact` (12 sp
medium) for dense columns, so "888.88B" fits beside another figure. Text floor is 12 sp. No
literal font sizes in screen code.

Another pair is allowed when it passes `01-typography-and-fonts/ai-slop-typography-audit`, has a
licence that permits bundling, and has true tabular figures. State the pair and the reason first.

## Scales

| Scale | Values | Use |
|---|---|---|
| Spacing | 2, 4, 8, 12, 16, 24, 32, 48 | Page gutter 16; card padding 16; gap between cards 12; section gap 24 |
| Radius | 8, 12, 16, 20, 28 | Chips 8; fields 12; buttons and mini tiles 16; cards 20; sheets and hero 28. These values win over the Product Excellence source's 12-20 dp card range (owner default, 2026-11-07); data tables and dense lists are never over-rounded |
| Size | touch target 48; hub icon 44; KPI icon 28; bottom-nav icon 24; menu card min height 88 | |
| Elevation | 0 for cards; 1 to 3 only for sheets, dialogs and a floating cart bar | Separation comes from the ground tint and hairline |

## Motion

| Pattern | Timing | Where |
|---|---|---|
| Reveal (rise and fade, in order) | 70 ms stagger, at most 8 steps, 420 ms, 24 dp rise, ease out | Summary and hub pages, once per visit |
| Count-up of the hero figure | 900 ms, ease out, once | Hero card only |
| Chart grow-in | 700 ms after a 250 ms delay | Day or month bar charts |
| Dialog enter | 140 ms | Everywhere |
| Under reduced motion or animator scale 0 | 0 ms; final state at once | Everywhere |

## Evidence/currentness

- WCAG 2.2 contrast minimum 1.4.3 (4.5:1, 3:1 large), non-text contrast 1.4.11 (3:1), target size
  2.5.8 (24 by 24 CSS px minimum; the house uses 48 dp): via
  `doctrine/references/wcag-2.2-criteria.md` (accessed 2026-09-24 there); status current.
- Material 3 colour roles and the 48 dp Android touch target: m3.material.io and
  developer.android.com, not re-read for this record; `NOT_ASSESSED` for any change since
  September 2026.
- Font licences: Atkinson Hyperlegible and Public Sans are SIL Open Font Licence families; the
  bundled subsets and licences sit in the reference app's repository. Re-check the licence file of
  the exact release you bundle.
- Contrast figures: computed on 2026-11-07 from the values above.
