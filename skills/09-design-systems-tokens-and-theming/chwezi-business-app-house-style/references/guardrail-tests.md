# Guardrail tests

Parent skill: [chwezi-business-app-house-style](../SKILL.md)

A style survives many change waves only when tests hold it. The reference app ran more than twenty
interface waves in October and November 2026 and kept its look because each rule below was a unit
test in the release gate. These tests read source files as text; they need no device.

## How a ratchet works

1. Count the violations in the current code and write the count into the test as a constant.
2. The test fails when the count rises above the constant.
3. When someone fixes violations, they lower the constant in the same change. It never goes up.
4. A rule that starts at zero is a ban.

Record each baseline and its date in the test's header comment, so the next person knows why it is
there and how far it has come.

## Test catalogue

| Test | Scans | Rule | Reference baseline (7 Nov 2026) |
|---|---|---|---|
| Raw colour ban | Screen and component source outside the theme package | No colour literal (`Color(0x...)`, `#rrggbb`, `rgb(`) | 0 (from 469 in early October) |
| One accent | Each component function or page template | At most one accent button | Ban |
| Contrast tokens | The theme's colour values | Recompute the role pairs; each meets its floor (4.5:1 text, 3:1 large text and boundaries) | Ban |
| Off-grid spacing | Spacing literals in screen code | Values outside the spacing scale | Ratchet (227 by 5 Nov) |
| Shape literals | Inline corner radii | Values not from the shape scale | Ratchet (63 by 5 Nov) |
| Typography | Inline font sizes and weights | No literal `fontSize` in screens | Ban |
| Raw identifiers on screen | Text built from ids, wire statuses, run ids | Names and plain words only | Ratchet (14) |
| Formatter guard | Money and quantity formatting | No printf money, no currency symbols, compact form not used where full amounts are required | Ban |
| Reduced motion | Infinite or repeating animations | Every one gated by the reduced-motion check | Ban |
| Accessibility | Clickable elements and icon buttons | A role on every clickable; a label on every icon button; targets at least 48 | Ban |
| Retired components | Copies of components the catalogue replaced | No private KPI cards, empty states or status chips | Ban |
| Jargon and copy | User-visible strings | Banned words ("Oops", "tender", "invalid") and hard-coded copy on key screens | Ban |

## Writing one

- Read files with the language's file APIs, strip comments, then match with a regular expression.
- Print each offending file and line in the failure message, so the fix is obvious.
- Keep an allow-list for the theme package and generated code only, each entry with a reason.
- Run the tests in the normal unit suite so they gate every build, not a separate job people skip.

## Platform notes

- Android (Compose): scan `presentation/**.kt`; colour literals are `Color(0x`; the accent check
  counts the accent button component per `@Composable` function.
- Web (Tailwind or CSS): scan templates and stylesheets outside the tokens file for hex, `rgb(` and
  arbitrary values such as `p-[13px]`; a stylelint rule or a small script in CI does the same job.

## Evidence/currentness

The baselines are the reference app's recorded values from its October and November 2026 records.
They describe that app only. A new app records its own.
