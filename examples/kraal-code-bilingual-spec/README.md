# Kraal Code dashboard specimen

## Brief

- **Audience:** cooperative operations lead reviewing daily sales and open work.
- **Decision:** see whether money, orders, or pending work need attention, then route one follow-up.
- **Task environment:** responsive browser UI used on desktop in an office and on a phone in the field; moderate bandwidth.
- **Stakes:** operational follow-up; all values and names in this specimen are synthetic and are not accounting evidence.
- **Success measure:** at a glance, a reviewer can identify the top unresolved item and its owner in either language and theme.

**Visual thesis:** keep the existing blue action cue visible and make dense operational information feel calm through warm light backgrounds, deliberate type contrast, and clear status labels that survive grayscale.

**Authored choices:**

1. The sampled blue `#0054A5` is used only for the primary action, focus, and chart series; this keeps continuity with the supplied dashboard capture without claiming it is an approved brand token.
2. Source Serif 4 600 is used for page titles, Public Sans 400/600 for UI and body text, and JetBrains Mono 500 only for numeric comparisons. This approved technical pairing creates a clear split between decisions, labels, and numeric evidence.
3. Pending, success, and error states pair color with a word and icon/shape. The KPI strip is limited to four decisions, and diagnostics stay below it.

## Routes considered

| Route | Type and density | Colour/interaction | Trade-off |
|---|---|---|---|
| A — close to the supplied dashboard | Sans-only hierarchy; four wide measures above a dense trend plot and ranked product list. | Sampled blue bars, live-looking figures, compact desktop nav. | Closest to the screenshot, but its chart spike and mixed business summaries do not make the operator's next action clear; small labels would compress on mobile. |
| B — decision-first, selected | Source Serif 4 600 page/section titles, Public Sans UI/body, JetBrains Mono 500 for figures; four measures and a visible three-item follow-up queue. | Sampled blue for action and trend; status text and marks carry meaning; English/French and light/dark controls; mobile stacks content. | Adds modest type contrast and state controls, but creates a clearer path from overview to named owner and follow-up. |

The supplied dashboard image anchors the colour and confirms the operational vocabulary (producers, sales, factory jobs, pending requests). The French content, KPI values, names, route hierarchy, type system, and state messages are original synthetic specimen content. The screenshots and their staging URL are not copied into this public example.

## Font and asset basis

The selected faces follow the design engine's technical/data category and T2 pairing. Before the selection, the technical/data and body/UI font folders and their manifests were scanned. They include local families such as Accuratist, Gyrotrope and Publica Ignominia. Accuratist has only one face; Gyrotrope's documented 1960s rounded display voice does not fit this operations interface; and Publica Ignominia was previewed as a body candidate but did not show an evidenced legibility or layout gain over the approved Public Sans baseline. More importantly, these local binaries are excluded from Git by the engine's font-folder policy, so the sample must not rely on a machine-specific font file.

Source Serif 4 600 (Adobe; Frank Grießhammer) is used for page/section titles, Public Sans 400/600 (U.S. Web Design System) for UI/body, and JetBrains Mono 500 for figures. All three are published under the SIL Open Font License, ship true italic styles, and cover extended Latin, including French. They are portable, approved baselines; the specimen loads them from Google Fonts for preview only. See the [Source Serif project](https://github.com/adobe-fonts/source-serif), the [Public Sans project](https://github.com/uswds/public-sans) and the [JetBrains Mono project](https://github.com/JetBrains/JetBrainsMono); confirm current releases and coverage before production.

Before production distribution, pin reviewed releases of the three families, include their OFL notices with self-hosted WOFF2 assets, verify exact glyph coverage and clean/offline rendering, and obtain the Kraal brand owner's font approval. A Kraal Code logo is visible in one supplied application screenshot, but no standalone logo asset or usage guide was available. The example uses the product name as text only: it does not copy the low-resolution screenshot mark or create a substitute logo. Its colours are measured from `Downloads/kraal-shots/00-dashboard.png`; no screenshot or customer data is copied into this public example.

## Palette and contrast sample

The accent blue `#0054A5` was sampled from chart pixels in the supplied screenshot (8,753 pixels of the most common sampled non-neutral blue). The light canvas `#F3F7FA` matches a large screenshot background area. Neutral, state and dark-theme values are authored as a prototype; they are not recovered brand specifications.

| Pair | Relative contrast | Use |
|---|---:|---|
| `#172B3A` / `#F3F7FA` | 13.51:1 | Light primary text |
| `#4C6470` / `#F3F7FA` | 5.80:1 | Light secondary text |
| `#0054A5` / `#FFFFFF` | 7.47:1 | Primary action and focus |
| `#0054A5` / `#E8F1FA` | 6.54:1 | Light information cue |
| `#72858F` / `#F3F7FA` | 3.57:1 | Light component boundaries and chart grid |
| `#EBF2F5` / `#101A20` | 15.58:1 | Dark primary text |
| `#BDCBD1` / `#1B2C35` | 8.66:1 | Dark secondary text |
| `#8CCBFF` / `#1B2C35` | 8.30:1 | Dark action and focus |
| `#8CCBFF` / `#233C4A` | 6.66:1 | Dark information cue |
| `#637985` / `#1B2C35` | 3.16:1 | Dark component boundaries and chart grid |
| `#256746` / `#E5F2E9` | 5.86:1 | Light success text/state |
| `#7B4300` / `#FFF0D7` | 7.07:1 | Light warning text/state |
| `#8F2E2E` / `#FBE5E3` | 6.70:1 | Light error text/state |
| `#9CDDB4` / `#1D392F` | 7.99:1 | Dark success text/state |
| `#FFD08A` / `#453720` | 8.04:1 | Dark warning text/state |
| `#FFAAA1` / `#462C2D` | 6.94:1 | Dark error text/state |

Ratios are static colour-pair calculations, not a WCAG conformance certification. UI boundaries, focus on every adjacent surface, browser zoom, screen readers, keyboard operation, and real user comprehension still need manual review.

## Run and review

Open `index.html` in a modern browser with network access to load the preview typefaces. Use the English/Français and light/dark controls, then select each operational state. Check desktop and widths down to 320 CSS px, keyboard focus, zoom to 200%, and print preview. State buttons replace one region; they do not simulate backend requests or real permissions.

This is a bounded visual study based on supplied screenshots, not an application redesign or a claim that the existing Kraal Code product uses these approved fonts or brand values.
