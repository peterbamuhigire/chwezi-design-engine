---
name: empty-error-and-loading-states
description: Use when designing visual and interaction behaviour for empty, error, loading, offline, permission, partial-failure, success, confirmation, disabled, or retry states, including table components. Use error-empty-and-system-messaging for words and onboarding-and-first-run-design for activation journeys.
metadata:
  portable: true
  category: 14-conversion-and-web-page-patterns
  compatible_with:
  - claude-code
  - codex
---

# Empty, Error & Loading States — States as First-Class Design

Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- Designing or reviewing the **full state set** of any component, screen, or flow — not just
  the "happy" filled state. The default-filled mock is the *least* common thing a real user
  sees; empty, loading, partial, and error states are what they hit on day one and on bad days.
- Designing a specific non-happy state: **empty/zero** (no data yet, first-run, cleared,
  filtered-to-nothing), **error** (network, server, validation summary, permission, not-found,
  offline), **loading** (skeleton, spinner, progressive/streaming, optimistic), or
  **success/confirmation**.
- Treating **perceived performance** as a design problem — skeletons vs spinners, when to show
  what, how long before you show anything at all.
- Building a **state matrix** for a component spec, handoff sheet, or QA gate.

## Do Not Use When

- You only need the **wording** of an error/empty/system message (the formula, tone, the apology
  vs. blame question) — that is the paired content skill
  `10-content-design-and-ux-writing/error-empty-and-system-messaging`. Use it for copy; use
  THIS skill for the layout, illustration, motion, skeleton geometry, and interaction.
- You are designing **form-field-level** validation and inline error affordances inside a form —
  start at `04-web-and-ui-design/form-ux-design` (it owns field anatomy; come here for the
  page-level error summary and the form's loading/success states).
- The work is purely **Core Web Vitals budgeting / Lighthouse gating** with no state design —
  use `00-cross-cutting-ops-qa-a11y/performance-as-ux-and-core-web-vitals`.

## Required Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Component, flow, and data-source behaviour | Product and engineering | yes | Determines reachable states and recovery paths |
| State inventory, latency, and failure modes | Runtime evidence or specification | yes | Selects loading, retry, and stale-data treatment |
| Voice, illustration, type, and semantic colour systems | Brand and design system | conditional | Keeps non-happy paths consistent and accessible |

- The **component or flow** being designed and its data source (sync? async? paginated?
  streamed? user-generated?). Async + user-generated = the richest state set.
- Which states are **reachable** for this component (run the state matrix in
  `references/state-matrix.md` to enumerate them — do not guess).
- The **brand's illustration/voice system** (or a note that none exists yet), the type scale,
  and the semantic colour roles for info/success/warning/danger so states are *authored*, not
  bolted on with stock clip-art and a generic spinner.
- Latency reality: rough p50/p95 load times per data source — this decides skeleton vs spinner
  vs instant, and whether optimistic UI is safe.

## Workflow

1. **Enumerate every state before designing any.** Run `references/state-matrix.md` against the
   component: ideal, empty (and its sub-types), partial, loading (and its sub-types), error
   (and its sub-types), success. A state you didn't enumerate is a state you'll ship broken.
   This step is the whole point — states are designed *up front*, as siblings of the happy path,
   never patched in after.
2. **Design the empty/zero state as an opportunity, not a void.** First-run empty is your best
   onboarding moment: explain the value, show *one* primary action, and prefer an authored
   illustration or a real preview over a sad-face icon. Distinguish the four empties (first-use,
   user-cleared, no-results-from-filter, error-disguised-as-empty) — they need different copy
   and different actions. Anti-slop: never the generic centered grey magnifying-glass.
3. **Design loading for perceived performance, not honesty.** Apply the latency tiers in
   `references/state-matrix.md` §Loading. Use **skeleton screens** that mirror the real layout's
   geometry (so there is zero layout shift when content arrives — protects CLS, per
   `doctrine/references/web-performance-budgets-2026.md`), not centered spinners, for content
   regions. Spinners only for short, indeterminate, in-place actions (a button submit). Below
   ~100 ms show nothing; show a skeleton only past the perception threshold so fast loads don't
   flash. Stream/progressively reveal where the data allows. Skeletons must animate subtly
   (shimmer/pulse) and honour `prefers-reduced-motion` (WCAG 2.3.3,
   `doctrine/references/wcag-2.2-criteria.md`).
4. **Design errors as recoverable, scoped, and honest.** Match the error's **blast radius** to
   its UI: a failed widget shows a *component-level* error (the rest of the page still works);
   a failed page shows a page-level error; never blow up the whole screen for one dead widget.
   Every error state carries a **recovery affordance** (Retry, Go back, Contact) and preserves
   the user's work. Pair colour with an icon and text — never colour alone (WCAG 1.4.1). Offline
   and permission-denied are distinct error states with distinct actions.
5. **Design success/confirmation deliberately.** Decide: silent (optimistic, the change is its
   own confirmation), inline (a toast/checkmark that auto-dismisses), or a full confirmation
   screen (irreversible/high-stakes actions). Success motion is a reward — keep it brief,
   purposeful, reduced-motion-safe. Avoid the celebratory-confetti reflex unless the moment
   truly earns it.
6. **Verify against the gates.** Target size ≥24px on every state's interactive control
   (WCAG 2.5.8); focus moves sensibly when a state swaps (don't strand the keyboard user on a
   removed node, 2.4.3); live regions announce loading/error/success to screen readers (4.1.3);
   no layout shift between skeleton and loaded; reduced-motion path exists.

## Quality Standards

- Every state is **authored** — illustrations, copy, and motion that belong to *this* product,
  not a default centered icon + "No data" + grey spinner (see `doctrine/design-doctrine.md`,
  the Anti-Slop Charter). When two empty states are equally clean, ship the one a templating
  tool would never produce.
- **Zero layout shift** between loading and loaded: skeleton geometry matches real content.
- **No dead ends**: every empty and every error offers a next action and preserves user work.
- **Accessible in every state**, not just the filled one (contrast, focus, target size, live
  regions, reduced motion).

## Decision Rules
| Condition | State pattern | Wrong-choice failure |
|---|---|---|
| First use with a meaningful action | Instructional empty state with primary action | Decorative blank slate delays activation |
| Local component fails | Preserve the rest and show local recovery | Page-level error destroys usable context |
| Wait is brief and determinate | Inline progress or skeleton matching geometry | Spinner flash or layout shift feels slower |
| Action is reversible and server-backed | Optimistic state plus rollback | False success silently diverges from truth |

## Capability Contract
Read and search are required for full state, latency, service, and content contracts. Editing is allowed only for requested implementation. Rendering and execution are required for focus, announcement, timing, rollback, and layout-stability claims.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without failure and latency semantics, deliver a state matrix and stop before prescribing optimistic success. Without renders, mark assistive, responsive, motion, and layout-shift evidence unverified.

## Anti-Patterns

- **Designing only the happy/filled state** and treating the rest as engineering's problem.
  This is the single most common cause of broken-looking shipped UI.
- **Spinner for everything**, including content regions and long loads (no layout preview,
  feels slower, causes CLS when content pops in).
- **Skeleton that doesn't match the real layout** — content jumps on arrival; you've added CLS
  while trying to look fast.
- **The generic empty state**: centered grey magnifying glass + "No results" + nothing to do.
- **Error states that destroy work**, blame the user, or nuke the whole screen for one failed
  widget. Vague "Something went wrong" with no retry and no scope.
- **Colour-only state signalling** (red border, no icon, no text) — fails WCAG 1.4.1 and
  colour-blind users.
- **Flashing a loader for a 60 ms load**, or showing a skeleton then a spinner then content
  (state thrash). Honour the perception threshold.
- **Ignoring `prefers-reduced-motion`** on shimmer/pulse/success animations.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Complete state matrix | Design, engineering, and QA | Every reachable empty, loading, error, success, offline, and permission state is covered |
| Visual, interaction, focus, announcement, and recovery specification | Component implementers | State transitions preserve context and provide honest recovery |
| Render and behaviour evidence | Release owner | Timing, rollback, accessibility, responsive, and partial-failure checks pass |

- A complete **per-component state matrix** (every reachable state enumerated and designed).
- **Designed specs** for each state: empty (per sub-type), loading (skeleton geometry + tier
  rationale), error (per scope + recovery affordance), success (chosen pattern).
- Skeleton layout maps that guarantee no layout shift.
- A11y notes per state (focus handling, live-region announcements, target size, reduced motion).
- Handoff-ready acceptance criteria a developer and QA can check off.

## Examples

- See `examples/states-for-a-table-component.md` — every state of one real component (a paginated
  data table) designed end to end: ideal, first-run empty, no-results-from-filter, loading
  skeleton, partial/streaming, row-level and page-level error, offline, and success. Includes
  skeleton geometry, recovery affordances, motion, and the a11y notes for each.

## References

- [chwezi-product-excellence-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md) (for Chwezi apps, the 13-state canonical set (including offline, queued, conflict and session expired) is binding and a missing state is PX-GATE-10).
- `doctrine/design-doctrine.md` — the Mission and the Anti-Slop Charter; states must look
  authored, never a defaulted spinner-and-sad-icon.
- `doctrine/references/web-performance-budgets-2026.md` — **skeletons over spinners**, perceived
  performance, and CLS (≤0.1): loading-state design is a Core-Web-Vitals lever, and skeleton
  geometry that prevents layout shift protects the CLS budget directly.
- `doctrine/references/wcag-2.2-criteria.md` — target size 24px (2.5.8), focus order on state
  swaps (2.4.3), reduced motion (2.3.3), colour-not-alone (1.4.1), live regions (4.1.3) for each
  state.
- `doctrine/references/ai-slop-taxonomy.md` — the convergent defaults (centered grey spinner,
  generic "No data" empty) this skill exists to replace.
- This skill's `references/state-matrix.md` — the enumerable set of states every component needs.
- Paired content skill `10-content-design-and-ux-writing/error-empty-and-system-messaging` —
  owns the **words** of each state; consult it for copy while this skill owns the visual/
  interaction design.
- Sibling `04-web-and-ui-design/form-ux-design` — field-level validation; this skill owns the
  page-level error summary and the form's loading/success states.
<!-- dual-compat-end -->
