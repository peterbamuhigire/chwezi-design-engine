---
name: chwezi-business-app-house-style
description: "Use when a Chwezi business app (POS, ERP, hotel, pharmacy, school, SaaS admin; Android or web) needs the house look: tinted ground and soft cards, one amber next-step button, illustrated hub icons, KPI and hero cards, motion, guardrail tests. Money-figure layouts route to money-figures-and-statement-display."
metadata:
  portable: true
  category: 09-design-systems-tokens-and-theming
  compatible_with:
  - claude-code
  - codex
---

# Chwezi Business-App House Style

Applies the Chwezi house style to a business application and keeps it from drifting: colour
roles, type, shape, spacing, the shared components, motion and the tests that hold them.

The style was distilled from the Maduuka Android app after the October and November 2026
interface kaizen cycles. Only patterns that the owner called out as better, that worked in the
shipped screens and that held up on contrast, large text and reduced motion were kept. The audit,
including what was rejected, is in `docs/kaizen/2026-11-app-house-style/README.md`.

<!-- dual-compat-start -->
## Use When

- Starting the interface of a new Chwezi app, or bringing an existing one onto the house style.
- Defining or reviewing the theme of a Chwezi app: colour roles, type pair, shapes, spacing.
- Building a hub page (Tools, Reports, Settings), a Home page with figures, or a summary page.
- Choosing button emphasis on a screen, or deciding which icon style a menu card should use.
- Adding guardrail tests that stop raw colours, extra accents and spacing drift.

## Do Not Use When

- The question is how money figures, statements, trial balances or monthly summaries are laid out
  and abbreviated: `12-data-viz-and-dashboards/money-figures-and-statement-display`.
- The product is not a Chwezi app or has its own brand system: use
  `09-design-systems-tokens-and-theming/design-tokens-and-naming` and
  `02-color-brand-and-visual-identity/*` to build that system instead.
- Marketing websites and landing pages: `14-conversion-and-web-page-patterns/*`.
- Drawing or choosing the illustrated icons themselves:
  `11-imagery-illustration-and-art-direction/iconography-system-design` (its
  `references/illustrated-menu-icons.md`).
- Interface wording and terminology: `10-content-design-and-ux-writing/*`.

## Required Inputs

| Input | Source | Required? | Why |
|---|---|---|---|
| App name, platform (Android Compose, web) and the screens in scope | User or repository | yes | Sets the component mapping |
| Brand primary colour and logo | Owner or brand file | yes | Only the brand primary changes between apps |
| Whether the app shows money figures | Product scope | yes | Decides if the money skill is also needed |
| Existing theme, tokens and screenshots | Repository | if the app exists | Baseline counts for the guardrail ratchets |
| Light and dark support, minimum platform version | Product scope | yes | Theme and motion APIs differ |

## Workflow

1. **Read the record.** Read `docs/kaizen/2026-11-app-house-style/README.md`: what was kept (K1 to
   K19), rejected (R1 to R11) and on probation (P1, P2). Never reintroduce a rejected pattern.
2. **Fix the colour roles.** Map the app onto the roles in
   [references/style-roles-and-tokens.md](references/style-roles-and-tokens.md). Only the brand
   primary changes per app. Measure its contrast with white text and on the tinted ground; stop if
   either is under 4.5:1 and darken the primary until both pass. Derive the ground and the primary
   container from the primary's hue. Status uses the five semantic roles (`success`, `warning`,
   `danger`, `info`, `neutral`), which no brand may restyle.
3. **Fix type.** Use the body face and figure face from the role table, or another pair that
   passes `01-typography-and-fonts/ai-slop-typography-audit`. State the pair and the reason before
   building. Money uses tabular figures everywhere, including amounts inside sentences.
4. **Lay out with the scales.** Spacing, radius and size values come only from the scales in the
   role table. Cards use the large radius, a hairline border and no shadow, on the tinted ground.
5. **Build from the component catalogue.** Use
   [references/component-catalogue.md](references/component-catalogue.md): context strip, hub menu
   card, KPI tile (`KpiCard` in code), hero summary card, soft section card, insight line, highlight tile, rank badge,
   period navigator, button hierarchy, bottom navigation. Do not invent a second version of a
   component that the catalogue already names.
6. **Place the accent.** Find the one next step on each screen (Charge, Pay, Save, Send to
   kitchen). Only that button takes the warm accent. If a screen has no clear next step, it has no
   accent.
7. **Add motion last.** Reveal, count-up and grow-in play once per visit and are switched off under
   reduced motion. Operational screens (POS, cashier, kitchen) get state transitions only.
8. **Install the guardrails.** Add the tests in
   [references/guardrail-tests.md](references/guardrail-tests.md). For an existing app, measure the
   current counts first and set them as ratchet baselines that may only go down.
9. **Prove it.** Capture screenshots at default and 200% text, light and dark, on a 360 dp phone
   and a tablet. Record the contrast table. Run `governance/design-quality-gate.md`. Anything not
   captured stays `NOT_ASSESSED`.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Brand primary under 4.5:1 with white text or on the tinted ground | Darken the primary in the same hue; keep the logo colour for marks only | Body links and buttons fail contrast on every screen |
| Screen has one obvious next step | That button is the warm accent; everything else is filled primary, tonal or outlined | Two accents split attention; none hides the way forward |
| Screen is a hub of destinations (Tools, Reports) | Hub menu cards with illustrated icons, one per row on phones | Grids of tiny icons force guessing |
| Screen is a task (selling, dispensing, checking in) | Line icons only, tinted by role; no illustrated icons | Illustrations crowd a working screen |
| Brand primary is itself green or red | Money figures keep their role and always carry a word or arrow; non-next-step buttons go outlined; shift money-up toward teal only if people still confuse them | Profit and the main button read as the same signal |
| Text sits on a primary or warm container | Use the matching on-container colour | Primary blue measured 4.32:1 and money green 4.10:1 there |
| A figure needs emphasis | One hero figure per page; others use tile sizes | Several large numbers flatten the page |
| A new colour seems needed | Use a role or one of the eight illustration hues; else change the theme on purpose | Palette sprawl (Maduuka reached 40+ hues) |
| Reduced motion is on, or the screen is operational | No reveal, count-up or grow-in | Motion delays work and can trigger vestibular symptoms |
| An existing app has many violations | Baseline the counts, ratchet down per release | A big-bang restyle stalls and regresses |

## Capability Contract

- Read the repository theme, components and screenshots; search for raw colours and literals.
- Edit theme, component and test files only when implementation is requested.
- Execute unit tests and the token validator; render screens on an emulator, device or browser.
- Publication, store submission and production deployment are outside this skill.

## Degraded Mode

- No renderer or device: deliver the role table, component mapping and tests; mark screenshots,
  large-text and dark-theme checks `NOT_ASSESSED` and block a release claim.
- No brand primary supplied: use the reference primary, label the output a draft, and ask.
- Premium or bundled fonts unavailable: use the named open-licence pair; never fall back to a
  banned face (`doctrine/references/ai-slop-banned-fonts.md`).
- No existing tests: ship the guardrail tests with baselines from the first measured run.

## Anti-Patterns

- **Second accent.** Amber on "Charge" and on "Add customer". Correction: one accent; the other
  becomes an outlined or tonal button.
- **Tinted or disced illustrations.** A multicolour icon recoloured to primary or placed on a
  gradient disc. Correction: draw it as it is at 44 dp on the card.
- **Raw colour in a screen file.** `Color(0xFF...)` or `#1a6db3` beside layout code. Correction:
  a role or named illustration hue from the theme; the guardrail test fails otherwise.
- **Card soup.** Shadows, borders and tints all on one card, cards inside cards. Correction:
  hairline border on a near-white surface over the tinted ground, one level deep.
- **Period named four times.** Title bar, picker, card title and range all say "October 2026".
  Correction: name it once; the card shows the range.
- **Machine text on screen.** Run ids, doubled labels, wire statuses. Correction: plain words;
  see `10-content-design-and-ux-writing/ux-writing-and-microcopy`.
- **Motion everywhere.** Count-ups on a POS total, looping shimmer. Correction: summary pages
  only, once per visit, none under reduced motion.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Role and token table for the app | Engineers, designers | Every role filled; contrast table recomputed; `scripts/validate_token_example.py --profile generic` passes on the token pack |
| Component mapping | Engineers | Each catalogue component named to one implementation; no duplicates |
| Guardrail tests with baselines | CI | Tests run in the unit suite; baselines recorded and only lowered |
| Screenshot set | Owner, reviewer | Default and 200% text, light and dark, phone and tablet; missing shots marked `NOT_ASSESSED` |

## Examples

- [examples/new-app-adoption.md](examples/new-app-adoption.md): taking a fictional agro-supply
  web app onto the house style, with the brand primary corrected for contrast.
- [examples/house-style-tokens.json](examples/house-style-tokens.json): the reference token pack
  (light and dark) with recomputed contrast claims.

## References

- [chwezi-product-excellence-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md) (governing product-quality layer above this visual layer: behaviour, states, data trust, 13 hard release gates; it records the owner decisions taken into this skill on 2026-11-08).
- [references/style-roles-and-tokens.md](references/style-roles-and-tokens.md)
- [references/component-catalogue.md](references/component-catalogue.md)
- [references/guardrail-tests.md](references/guardrail-tests.md)
- `docs/kaizen/2026-11-app-house-style/README.md` (audit record)
- `doctrine/design-doctrine.md`, `doctrine/references/wcag-2.2-criteria.md`,
  `doctrine/references/ai-slop-banned-fonts.md`, `doctrine/references/type-scale-and-spacing.md`
- Related: `12-data-viz-and-dashboards/money-figures-and-statement-display`,
  `06-sector-and-domain-ux/pos-and-retail-operations`,
  `07-mobile-ios-android-cross-platform/android-ui-ux-design`,
  `09-design-systems-tokens-and-theming/design-tokens-and-naming`.
<!-- dual-compat-end -->
