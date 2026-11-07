# Kaizen record: the Chwezi business-app house style (7 November 2026)

Peter Bamuhigire asked on 7 November 2026 for the recent Maduuka Android interface work to become
a house style that his other apps follow. The request was to audit the changes first, keep only
what made the app more appealing, redefine what was kept, and then write it into five engines.

This file is the audit record. The canonical standard lives in two skills:

- [`chwezi-business-app-house-style`](../../../skills/09-design-systems-tokens-and-theming/chwezi-business-app-house-style/SKILL.md):
  roles, tokens, components, motion and the guardrail tests that hold them.
- [`money-figures-and-statement-display`](../../../skills/12-data-viz-and-dashboards/money-figures-and-statement-display/SKILL.md):
  compact amounts, hero figures, statement and summary layouts.

Illustrated menu icons are a reference inside the existing
[`iconography-system-design`](../../../skills/11-imagery-illustration-and-art-direction/iconography-system-design/SKILL.md) skill.

## Observe: what was studied

- **Shipped screens:** 30 marketing screenshots and 25 test screenshots of the Maduuka staging build,
  taken 5 and 6 November 2026. They covered Home, Money Reports, Monthly and Daily summaries, the
  customer statement, trial balance, financial position, Tools, Hotel home, POS and Pharmacy.
- **Code:** the app's theme (colour roles, typography, shapes, spacing, accents), the shared card,
  button, KPI, hero, top-three, period-navigator and motion components, and the guardrail tests.
- **Owner rulings:** the decisions recorded during the October and November 2026 interface kaizen
  cycles (colour model, one next-step accent, first-hour discoverability, compact amounts, formal
  statement wording as a setting, plain words, human-readable dates and amounts).
- **References the owner supplied:** seven finance-app reference images (5 November) and seventeen
  Behance projects (3 November). They were used as idea guides only. No screen, artwork or layout
  was copied into the standard.

The repository paths of the reference implementation are in the Maduuka app's own records. This
record names components by role so it stays portable.

## Baseline: what the engines already held

Searched on 7 November 2026 across the five engines for compact amounts, K/M/B, hero figures,
statement rows, trial balance layout, illustrated icons, one-accent buttons and guardrail ratchets.

- The design engine had the parts but not the whole. `fintech-and-financial-product-ui` asks for
  tabular figures and clear statements; `dashboard-and-data-product-design` covers KPI tiles;
  `iconography-system-design` covers line icon systems. None of them set a house palette model,
  a compact-amount ladder, statement row layouts or the rule for multicolour menu icons.
- No engine had a test-enforced design system method: a raw-colour ban, a one-accent rule or a
  spacing ratchet that may only go down.
- The writing engine's interface-copy skill had no money-summary vocabulary ("came in", "went out",
  "still owed") and no rule against machine phrases such as run ids on a report.
- The SDLC UX specification skill did not ask a specification to declare its house style.

## Select: the audit

Each pattern was scored against three questions. Did the owner call it out as better? Does a
screenshot show it working? Does it hold up on contrast, large text and reduced motion? A pattern
needed the first two to be kept and the third to be kept without a correction.

### Kept

| # | Pattern | Why it is kept |
|---|---|---|
| K1 | Pale brand-tinted page ground with near-white cards, large radius, hairline border, little or no shadow | Calm, separates groups without heavy lines; every finance and hub screen uses it |
| K2 | One warm accent (amber with dark ink text) for the single next step on a screen | Owner ruling on first-hour discoverability; ink on amber measures 8.36:1 |
| K3 | Hub menu card: illustrated multicolour icon drawn as it is, bold title, one plain sentence, chevron, whole card tappable | Owner asked for colourful icons on Tools, Money Reports and Sales; screens read faster |
| K4 | KPI tile: small tinted line icon, label, large compact figure, change chip with arrow, word and colour | Home figures read at a glance; change is never colour alone |
| K5 | Hero summary card: soft vertical gradient, period range, label, large figure with the decimals and unit softened, three mini tiles | Owner picked it from the reference designs; one focal number per page |
| K6 | Money in plain words: "Came in", "Went out", "Profit", with a "You kept N% of what came in" bar | Owners without accounting training understood the month at once |
| K7 | Highlight tile on the warm container for the single best item (best day, top customer) | Draws the eye once per page |
| K8 | Top-three tables with rank badges (first is warm, second and third neutral), names left, compact amounts right | Owner-requested summary format; short and scannable |
| K9 | Period navigator: previous, a pill with calendar glyph, period name and dropdown, next | Lets a person step through months or days without a form |
| K10 | Statement rows: date and type left; Due, Paid and Balance stacked right, each labelled | Owner ruling: paid and due on separate lines |
| K11 | Trial balance as collapsible group cards with group debit and credit totals, muted account codes and a pinned closing footer | Replaces a wide table that did not fit a phone |
| K12 | Compact amounts (K/M/B, two decimals) for tiles, rows and summaries; full amounts for documents, closing balances and inputs; full amount always read by screen readers | Owner rule; "888.88B" fits beside another figure at 12 sp |
| K13 | Button order: one accent next step; filled primary for other main actions (with an icon on a light disc for money actions); outlined error colour for sign-out and other destructive exits; text buttons in top bars | Tools, statement and POS screens all show it |
| K14 | Context strip on hub and report pages: date chip, Switch, the place name centred | People always know which business and branch they are looking at |
| K15 | Motion once per visit: cards rise and fade in order, the hero number counts up, bars grow; nothing moves when the system asks for reduced motion | Owner asked for the page to "flow smoothly"; guarded by a reduced-motion check |
| K16 | A readable body face and a sturdy figure face with tabular figures, a 12 sp floor and named amount styles | Money columns align; the type pair was approved in the October cycle |
| K17 | Bottom navigation with line icons, a pill behind the selected item and labels at every text size | Holds at 200% text in the October accessibility checks |
| K18 | One insight sentence with a lightbulb and an action link ("3 unpaid invoices worth 179,200.00. Customers") | Turns a figure into the next step |
| K19 | Guardrail tests that ban raw colours outside the theme, allow one accent per screen part, and ratchet spacing, shape and raw-identifier counts downward | Kept the style from drifting across 20+ waves of change |

### Rejected or corrected

These were in the shipped screens and made them worse. The standard forbids them or states the fix.

| # | Seen | Problem | Rule in the standard |
|---|---|---|---|
| R1 | The period name appears four times on the daily summary (top bar, navigator, hero title, hero range) | Wastes the most valuable space and reads as a template | Name the period once (top bar or navigator); the hero shows the range only |
| R2 | "You kept 0% of what came in" beside a profit of 3.18K | A non-zero rounded to zero contradicts the figure next to it | Never show 0% for a non-zero value; show "less than 1%" |
| R3 | "Run 9f3773fa", "As at: As at 06 Nov 2026", "Generated; reconciliation not confirmed" on the financial position | Machine identifiers and doubled labels; jargon | No run ids or doubled labels on screen; plain status ("Not yet checked against the bank") |
| R4 | "06 Nov 2026" on one screen, "6 Nov" on the next | Two date formats | One format: "6 Nov 2026", short form "Fri 6 Nov" |
| R5 | Financial position rows alternate two greys, name on one line and amount on the next | Tall rows; the bands look like selection | One band per group; name and amount on one line where they fit |
| R6 | Two zero shapes in one sentence (slashed in body text, plain in figures) | Looks like two systems | All amounts, including amounts inside sentences, use the figure face |
| R7 | Primary blue or green text on the pale blue container (4.32:1 and 4.10:1) | Fails 4.5:1 for small text | On a primary container, text uses the on-container colour; money colour only on surfaces |
| R8 | The theme's decorative palette grew to more than 40 named hues | Every new screen added a colour | At most eight illustration hues, named by hue; anything else is a theme change |
| R9 | A generic house-shaped placeholder where a product has no photo | Reads as broken | A tile with the item's initials on a category tint |
| R10 | Icons placed on a tinted gradient disc | The owner removed the discs on 6 November; the disc dulls a multicolour icon | Illustrated icons are drawn as they are, never tinted or put on a disc |
| R11 | Illustrated icons added without a recorded source or licence | Free icon sites usually require attribution; status unknown | Every illustrated icon has a source and licence record before release |

### On probation

| # | Pattern | Condition for admission |
|---|---|---|
| P1 | Dark navy "operational day" band with a small amber letterspaced label (Hotel home) | Admit only if a second app needs a day header and the label passes as a short overline, not a status in capitals |
| P2 | Product photos faded behind name and price on POS cards | Admit when a scrim rule keeps the text at 4.5:1 over every photo; measure on real catalogue images |

## Experiment and check

- Contrast pairs were recomputed from the token values on 7 November 2026 (WCAG relative
  luminance). Results are in the token pack shipped with the house-style skill and are checked by
  `scripts/validate_token_example.py --profile generic`.
- The rejected items R1 to R7 were confirmed from the screenshots themselves, not from memory.
- Device, TalkBack and 200% text checks of the kept patterns rely on the Maduuka app's October 2026
  records. They were not repeated for this record and stay `NOT_ASSESSED` for any new app.

## Standardise: where each part was written

| Engine | What was added |
|---|---|
| `chwezi-design-engine` | Two new skills, a token pack, an illustrated-icon reference, cross-references in neighbouring skills, routing fixtures, this record |
| `chwezi-dev-engine` | Implementation references for Jetpack Compose and for Tailwind web apps, including the guardrail tests |
| `chwezi-development-engine` | A guardrail reference for theme and component implementation, mirrored in the marketplace package |
| `chwezi-sdlc-documentation` | A house-style declaration section for UX specifications |
| `chwezi-writing-engine` | Money-summary vocabulary and banned machine phrases for interface copy |

## Not assessed

- Whether the style suits a non-finance app with no money figures. The standard says which parts
  are optional for such apps; no such app has used it yet.
- The licence of the illustrated icons now in the Maduuka app (R11).
- Rendering of the token pack in a Style Dictionary or Figma import.
- Host discovery of the new skills in Claude Code and Codex.

## Teach and re-measure

Re-measure when the second app adopts the style, or by 7 February 2027, whichever comes first:
count raw colours, accents per screen and raw identifiers on screen in that app, and repeat the
contrast table for its brand primary.
