---
name: design-qa-and-pre-launch-review
description: >-
  Use when a page, screen, flow, or component is done and needs a final design go/no-go gate across implementation parity, browsers, devices, accessibility, performance, and anti-slop checks. Use design-audit for diagnosis before release.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Design QA & Pre-Launch Review
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- A build is feature-complete and you need the **final go/no-go gate before it ships** —
  one review that fails the launch if any blocking gate fails.
- You need to verify the built UI **matches the approved design** — spec parity (tokens,
  type scale, spacing, components, states, copy) and pixel parity against the mockup/Figma.
- You need to confirm the page **holds up across devices and browsers** — the small-phone /
  tablet / desktop / large-screen breakpoints and the Chromium / WebKit / Firefox engines.
- You are shipping an Apple-platform surface and need iOS/iPadOS/macOS checks for Liquid Glass,
  current SF Symbols (iOS 27 generation), Dynamic Type, VoiceOver, Reduce Transparency, iPhone resizability, iPad
  multitasking, Mac-designed-for-iPhone, TestFlight screenshots, or Safari/WebKit behavior.
- You want the **anti-slop, accessibility, and performance gates rolled into a single
  checklist** with a recorded verdict and sign-off, rather than three separate passes that
  nobody reconciles.
- You are doing release acceptance and need an auditable artifact (filled QA review) that
  says exactly what passed, what blocks launch, and who signed off.

## Do Not Use When

- You want a **deep diagnostic critique** of an existing interface (10-dimension scored
  audit with prioritized remediation) — use `design-audit`. This skill is a pass/fail ship
  gate, not an exploratory critique; it *invokes* the audits as gates.
- You only need **one dimension**: the slop check → `visual-product-slop-audit`; WCAG
  conformance → `accessibility-wcag-2-2-compliance`; Core Web Vitals/budgets →
  `performance-as-ux-and-core-web-vitals`. This skill composes all three for the *ship*
  decision; use the single skill when that one gate is the whole job.
- The work is **early design** (no build to QA yet) — there is nothing to check parity
  against. Return when there is a build.
- The deliverable is a **static document** (DOCX/PDF) — cross-browser/CWV do not apply;
  use the group-13 document skills, which carry their own export checks.

## Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Built artefact and approved design/spec | Release team | yes | Enables parity review |
| Browser, device, state, and accessibility matrix | Product and QA owners | yes | Defines release coverage |
| Prior gate results and launch owner | Owning skills and team | yes | Creates an accountable verdict |

- The **built artifact** (a running URL, a staging build, or screenshots per breakpoint)
  AND the **approved design** to check it against (Figma frames, redlines, or the design
  spec). Parity needs both sides — refuse to certify parity from one side alone.
- The **page archetype** (marketing/landing, web-app shell, document/long-form) — selects
  the performance budget row in `web-performance-budgets-2026.md`.
- The **target matrix**: which devices/viewport widths and which browser engines are in
  scope (default to the matrix in `references/pre-launch-qa-checklist.md` §Cross-device).
- The **conformance target** (default WCAG 2.2 **AA**; note any AAA commitments).
- Whether the **slop, a11y, and perf gates have already been run** — if so, attach their
  results; if not, this review runs each gate inline by delegating to its owning skill.
- The **launch owner** who signs the verdict.

## Workflow

1. **Open the checklist and record the header.** Start from
   `references/pre-launch-qa-checklist.md`. Record date, target (page/flow), archetype,
   build URL/commit, the design source, the device+browser matrix, and the launch owner.
   Template: `examples/qa-review-filled.md`.
2. **Spec parity — does the build match the design system, not just the picture?** Walk the
   spec-parity section: design tokens (colour, type scale, spacing) resolve to the system,
   not hard-coded one-offs; the **type scale and pairing** follow `type-scale-and-spacing.md`
   and `pairing-principles.md`; every interactive element ships its full **state set**
   (default/hover/focus/active/disabled/loading/error/success); microcopy matches the
   approved strings (verb+noun buttons, real error/empty copy). Flag any drift.
3. **Pixel parity — does it match the mockup at the reference breakpoint?** Overlay or
   side-by-side the build against the design frame at the canonical width. Check spacing
   rhythm, alignment axes, component dimensions, and that nothing "settled" differently than
   designed. Intentional, documented deviations are fine; undocumented ones are findings.
4. **Run the anti-slop gate (composed).** Invoke `visual-product-slop-audit` over the built
   screens and `ai-slop-typography-audit` over the type. Confirm: no banned default font
   (`ai-slop-banned-fonts.md`), the type/colour/layout choice was **stated** per the Mission,
   and no visual or product slop tells survived into the build. **This gate is binary —
   any FAIL blocks launch.** Record PASS/FAIL with the tell cited.
5. **Run the accessibility gate (composed).** Invoke `accessibility-wcag-2-2-compliance`
   against `doctrine/references/wcag-2.2-criteria.md`. Verify the perennial AA floor
   (contrast ≥ 4.5:1 body / ≥ 3:1 large+UI; keyboard operable with logical visible focus;
   name/role/value; alt text; reflow at 320px + 200% zoom; reduced-motion) **and** the nine
   WCAG 2.2 deltas (focus-not-obscured 2.4.11; target size ≥ 24px 2.5.8; dragging
   alternative 2.5.7; consistent help; redundant entry; accessible authentication). Run it
   the way the ref demands: automated (axe/Lighthouse) **plus** manual keyboard traversal
   **plus** a screen-reader smoke test — automation alone catches only ~30–40%. **Any AA
   failure is a launch blocker.**
6. **Run the performance gate (composed).** Invoke
   `performance-as-ux-and-core-web-vitals` against
   `doctrine/references/web-performance-budgets-2026.md`. Confirm field/lab CWV in the *good*
   band (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1) and that the page is within the archetype's
   JS/CSS/image/font/total KB budget. A page over budget or out of the good band **fails the
   gate** — wire the budget as Lighthouse-CI thresholds so this is enforced on every build.
7. **Cross-device check.** Walk every viewport in the matrix (small phone 320–360px →
   large desktop). Verify no horizontal scroll, no clipped/overlapping content, touch
   targets ≥ 24px (aim 44px touch), readable type, and that the **responsive intent** (not
   just "it doesn't break") survives. See `references/pre-launch-qa-checklist.md` §Cross-device.
8. **Cross-browser check.** Verify on the in-scope engines — **Chromium** (Chrome/Edge),
   **WebKit** (Safari, incl. iOS Safari), and **Firefox/Gecko**. Watch the usual divergences:
   focus-ring rendering, form-control styling, `backdrop-filter`/`gap`/container-query
   support, font rendering/metrics, and date/number input. Record per-engine pass.
9. **Apple-platform visual QA when in scope.** Verify Liquid Glass chrome, current SF Symbols (iOS 27 generation), Dynamic
   Type AX sizes, Reduce Transparency, Increase Contrast, Reduce Motion, Dark Mode, appearance
   personalization, app icon variants, iPhone resizability, iPad multitasking, and
   Mac-designed-for-iPhone windows. Record device, OS, SDK, and build evidence.
10. **Tally and sign the verdict.** Roll the checklist into a single verdict: **SHIP** (all
   blocking gates PASS), **SHIP-WITH-FOLLOWUPS** (only non-blocking lows remain, logged with
   owners), or **NO-SHIP** (any blocker open — list each blocker with its gate and fix).
   The launch owner signs. A blocker on slop, a11y-AA, or perf-budget **always** forces
   NO-SHIP — convenience never overrides (`doctrine/design-doctrine.md` Mission).

## Decision Rules

| Condition | Verdict | Wrong-choice failure |
|---|---|---|
| Release includes long text, documents or dated surface treatments | Run `fine-typesetting-and-typesetting-qa` and the dated-treatment list in `art-direction-routes` | Amateur typesetting or decade-old treatments ship to the client |
| Any accessibility, security-relevant deception, critical state, or approved-spec blocker fails | `NO-SHIP` | A known user or compliance defect reaches production |
| Required browser, device, or render evidence is unavailable | `CONDITIONAL` or `NO-SHIP`, never `SHIP` | Missing evidence is mistaken for passing evidence |
| Only owned, non-blocking cosmetic findings remain | `SHIP-WITH-FOLLOWUPS` with owner and date | Minor debt either blocks indefinitely or disappears |
| Every applicable gate has linked passing evidence | `SHIP` | Sign-off relies on memory or confidence rather than proof |

## Capability Contract

Read, interactive inspection, and access to the approved design/spec are required. Browser/device
execution, rendering, accessibility checks, and performance measurement are required when those
gates apply. The review may record findings but does not mutate production or publish a release.

## Degraded Mode

If rendering is unavailable, the result cannot be `SHIP`.
If a target browser, device, assistive technology, renderer, or performance environment is
unavailable, record the missing matrix cell and return `CONDITIONAL` or `NO-SHIP` according to its
risk. Never convert an unrun check into N/A merely to obtain a passing verdict.

## Quality Standards

- Parity is checked against **both** the build and the approved design — never certified
  from one side. Every deviation is either documented-intentional or a finding.
- The three composed gates are **actually run** (or attached with fresh results), not
  assumed. Slop, a11y-AA, and perf-budget are blocking; the verdict reflects that.
- Accessibility is verified with automation **plus** manual keyboard **plus** screen-reader —
  a green Lighthouse score alone is not a pass.
- Apple-platform release checks record actual device/simulator evidence, not only a desktop browser resize.
- Every blocker in the verdict names its gate, its standard, and a specific fix.

## Anti-Patterns

- **"Looks fine to me" sign-off.** Eyeballing one browser at desktop width and shipping —
  the gate exists precisely to stop that.
- **Pixel parity without spec parity.** Matching the screenshot while hard-coding values
  that should resolve to tokens — it drifts on the next change.
- **Treating Lighthouse green as the whole a11y gate.** Automation misses ~60%; skipping
  the keyboard and screen-reader passes ships inaccessible UI that "passed".
- **Letting a deadline override a blocker.** Shipping a known slop/AA/budget failure "for
  now" — the Mission outranks convenience; that is a NO-SHIP.
- **Re-deriving thresholds.** Inventing contrast ratios or CWV numbers instead of citing
  the canonical `wcag-2.2-criteria.md` and `web-performance-budgets-2026.md`.
- **Duplicating the audits.** Re-writing the slop/a11y/perf logic here instead of invoking
  the owning skills — this skill *composes* them into a ship gate, it does not fork them.
- **No recorded verdict.** A QA pass with no signed artifact leaves no audit trail.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Signed pre-launch verdict | Launch owner | Every applicable matrix cell and blocking gate has linked evidence |
| Blocker and follow-up register | Delivery team | Each item has severity, owner, fix, and due date or waiver |

- A **filled pre-launch QA review** (`examples/qa-review-filled.md` shape): header, spec-
  and pixel-parity findings, the three composed gate verdicts (slop / a11y-AA / perf), the
  cross-device and cross-browser matrices, and a single signed **SHIP / SHIP-WITH-FOLLOWUPS
  / NO-SHIP** verdict.
- A **blocker list** — each with its gate, the standard it violates, and the fix.
- A **follow-ups log** — non-blocking lows with owners, for SHIP-WITH-FOLLOWUPS.
- The **Lighthouse-CI / axe build-gate lines** to keep the gates enforced post-launch.

## Examples

- `examples/qa-review-filled.md` — a fully filled pre-launch review of a sample page (a
  checkout page): spec + pixel parity findings, the composed slop / WCAG-2.2-AA / Core-Web-
  Vitals gate verdicts, the cross-device and cross-browser matrices, the blocker list, and a
  signed NO-SHIP → (after fixes) SHIP verdict. Not lorem — concrete, with real thresholds.

## References
- [chwezi-product-excellence-standard](../chwezi-product-excellence-standard/SKILL.md) (for a Chwezi app or system release, use that skill's scorecard and 13 hard gates; this skill stays the generic pre-launch review).
- `fine-typesetting-and-typesetting-qa` (typesetting QA pass) and `art-direction-routes/references/style-currency-vocabulary.md` (dated treatments).

- `skills/09-design-systems-tokens-and-theming/component-library-architecture/references/design-system-operating-model.md` §7 — requirements trace, component state coverage, usability retest, and evidence-release synthesis.

- `doctrine/design-doctrine.md` — the Mission and Anti-Slop Charter; the rule that a slop /
  a11y / perf blocker forces NO-SHIP and that convenience never overrides.
- `doctrine/references/wcag-2.2-criteria.md` — **canonical** accessibility floor (AA) and the
  nine 2.2 deltas the a11y gate certifies against.
- `doctrine/references/web-performance-budgets-2026.md` — **canonical** Core Web Vitals
  thresholds and per-archetype asset budgets the performance gate enforces.
- `doctrine/references/ai-slop-taxonomy.md`, `doctrine/references/ai-slop-banned-fonts.md`,
  `doctrine/references/type-scale-and-spacing.md`, `doctrine/references/pairing-principles.md`
  — the standards the slop and spec-parity gates check against.
- `references/pre-launch-qa-checklist.md` — the composed gate: spec/pixel parity +
  cross-device/browser matrix + the slop, WCAG-2.2, and performance gates as one checklist.
<!-- dual-compat-end -->
## Plugins (Load Alongside)

| Companion Skill | When to Load |
|---|---|
| `visual-product-slop-audit` | The composed anti-slop gate (visual + product tells) — blocking |
| `ai-slop-typography-audit` | The type half of the slop gate (banned fonts, pairing) — blocking |
| `accessibility-wcag-2-2-compliance` | The composed WCAG 2.2 AA gate — blocking |
| `performance-as-ux-and-core-web-vitals` | The composed Core Web Vitals / budget gate — blocking |
| `design-audit` | When the review surfaces issues that need a deep, scored diagnostic (not a pass/fail gate) |

---

*Sources: WCAG 2.2 AA (`doctrine/references/wcag-2.2-criteria.md`); web.dev Core Web Vitals
(`doctrine/references/web-performance-budgets-2026.md`); the Chwezi Anti-Slop Charter
(`doctrine/design-doctrine.md`); composes `visual-product-slop-audit`,
`accessibility-wcag-2-2-compliance`, and `performance-as-ux-and-core-web-vitals`. NNG heuristic
evaluation framework for the QA-review structure.*
