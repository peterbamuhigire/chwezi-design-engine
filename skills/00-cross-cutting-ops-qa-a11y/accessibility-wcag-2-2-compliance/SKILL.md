---
name: accessibility-wcag-2-2-compliance
description: Use when designing or auditing an interactive UI for WCAG 2.2 AA, keyboard and focus behaviour, accessible names, screen readers, target size, reflow, authentication, or reduced motion. Use inclusive-and-assistive-design for needs beyond the compliance floor.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Accessibility — WCAG 2.2 Compliance (Build + Audit)

This skill operationalizes the engine's accessibility floor into a repeatable
**build-then-audit** workflow. It does **not** restate the criteria — the canonical,
versioned list of success criteria (the 9 new in 2.2, the perennial AA checklist, the
contrast method note, the testing note) lives in
[`doctrine/references/wcag-2.2-criteria.md`](../../../doctrine/references/wcag-2.2-criteria.md).
**Read that file first; this skill tells you how to apply it to real components.**

**AA is the floor for all Chwezi work; reach AAA where feasible** (per the doctrine).
Accessibility is not a colour concern or a final pass — it is a cross-cutting constraint
that co-activates with every group and is enforced one last time by
`design-qa-and-pre-launch-review`.

<!-- dual-compat-start -->
## Use When
- Building any interactive component (modal, menu, combobox, tabs, accordion, dialog, form,
  toast, carousel, data table) — wire focus, ARIA, and keyboard *as you build*, not after.
- Reviewing or auditing an existing screen for WCAG 2.2 AA conformance.
- A request mentions: focus order/visibility, keyboard operability, tab traps, ARIA,
  accessible names, screen-reader testing, target size, dragging alternatives, redundant
  entry, accessible authentication, reduced motion, reflow, or 200% zoom.
- The UI uses Apple Liquid Glass, SF Symbols, App Intents surfaces, widgets, or iOS/iPadOS/macOS
  chrome that must pass VoiceOver, Dynamic Type, Reduce Transparency, Increase Contrast, and
  Reduce Motion checks.
- Certifying that a deliverable meets the AA floor before ship (alongside the QA gate).

## Do Not Use When
- The work is purely **colour contrast / non-colour cues / colour-blind ramps** → use
  `02-color-brand-and-visual-identity/accessible-color-and-contrast` (this skill cites it
  for 1.4.3/1.4.11 but does not own palette construction).
- The work is **performance budgets / Core Web Vitals** → `performance-as-ux-and-core-web-vitals`.
- The work is **error/empty copy wording** → `10-content-design-and-ux-writing/error-empty-and-system-messaging`
  (this skill checks that errors are *programmatically associated*, not how they are phrased).
- You only need the **final pre-launch gate** that composes a11y + slop + perf →
  `design-qa-and-pre-launch-review` (it calls this skill in).

## Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Interactive component or flow | User or project | yes | Defines applicable criteria and interactions |
| Rendered semantics and target platforms | Build | required for audit | Enables keyboard and assistive-technology checks |
| Conformance target | Product or compliance owner | yes | Defaults to WCAG 2.2 AA |
- The component(s) or screen under work, with their interaction model (what is clickable,
  draggable, focusable, dynamic).
- The rendered markup / framework (HTML, React, SwiftUI, Compose, Flutter) — you must know
  what role and name each control will expose.
- Conformance target: **AA** unless the user states AAA.
- For an audit: a way to traverse it by keyboard and a screen reader available
  (NVDA + Firefox/Chrome on Windows, VoiceOver + Safari on macOS/iOS, TalkBack on Android).

## Workflow

Choose the build or audit branch, then record evidence for every applicable requirement.

### A. Build (wire accessibility in as you author the component)
1. **Choose the right pattern, not a generic `<div>`.** Map the component to a known
   accessible pattern (WAI-ARIA Authoring Practices) before writing markup. Prefer native
   elements (`<button>`, `<a href>`, `<dialog>`, `<input>`, `<details>`) — they ship focus,
   role, and keyboard behaviour for free. Only reach for ARIA when no native element fits.
   See `references/aria-patterns.md`.
2. **Name, role, value (4.1.2).** Every control must expose an accessible **name** (visible
   label, `aria-label`, or `aria-labelledby`), a correct **role**, and live **state**
   (`aria-expanded`, `aria-selected`, `aria-checked`, `aria-pressed`, `aria-current`,
   `aria-disabled`, `aria-invalid`). The first rule of ARIA: don't use ARIA if a native
   element does it. See `references/aria-patterns.md`.
3. **Keyboard operability (2.1.1, 2.1.2).** Everything operable by pointer must be operable
   by keyboard, with no trap (except an intentional, escapable modal trap). Implement the
   pattern's expected keys (Tab/Shift+Tab move between widgets; Arrow keys move *within* a
   composite widget; Enter/Space activate; Esc closes/cancels; Home/End where applicable).
   See `references/keyboard-and-focus.md`.
4. **Focus order + roving tabindex (2.4.3).** DOM order = reading/focus order. Composite
   widgets (menus, tabs, grids, radio groups, toolbars) use **roving tabindex** or
   `aria-activedescendant` — one tab stop for the whole widget, arrows move inside.
   See `references/keyboard-and-focus.md`.
5. **Visible, unobscured focus (2.4.7; 2.4.11 new in 2.2).** Never `outline: none` without a
   replacement. Provide a focus indicator with **≥ 3:1** contrast against adjacent colours
   (use `:focus-visible`). Ensure sticky headers/footers do **not** obscure the focused
   element (2.4.11) — scroll-pad with `scroll-margin`/`scroll-padding`. See
   `references/keyboard-and-focus.md`.
6. **Focus management on dynamic UI.** On open: move focus into the dialog/popover and trap
   it; on close: return focus to the trigger. Announce async changes via a polite
   `aria-live` region; don't steal focus for non-critical updates.
7. **Target size 24×24 CSS px minimum (2.5.8, new in 2.2).** Pointer targets are at least
   **24×24 px**, or have ≥ 24px of spacing so a 24px circle centred on each doesn't overlap a
   neighbour. **Aim higher on touch: 44×44 px (Apple HIG) / 48dp (Material).** Inline links in
   a sentence are exempt; standalone tap targets are not.
8. **Dragging alternative (2.5.7, new in 2.2).** Any drag operation (reorder, slider, swipe,
   kanban) needs a single-pointer alternative — buttons, a menu, or arrow-key control.
9. **Forms — redundant entry + association (3.3.7 new; 3.3.1–3.3.4).** Every field has a
   programmatically associated `<label>`; errors are tied to fields via `aria-describedby`
   and flagged with `aria-invalid`; required fields are marked in name + state. **Do not
   re-ask for information already given in the same process** (3.3.7) — autofill, prefill, or
   offer "same as above".
10. **Accessible authentication (3.3.8 new).** No login step may *require* a cognitive
    function test (solving a puzzle, transcribing, recalling a password with no paste) without
    an alternative — allow paste, password managers, email links, passkeys, OAuth.
11. **Consistent help (3.2.6 new).** If a help mechanism (contact link, chat, FAQ) repeats
    across pages, keep it in a **consistent relative order**.
12. **Motion + media.** Nothing flashes > 3×/sec (2.3.1, A); auto-moving content over 5 s can be
    paused (2.2.2, A). Honour `prefers-reduced-motion` as a house floor and report it as SC 2.3.3
    (AAA), not as an AA item. Captions/transcripts for media.
13. **Reflow + zoom (1.4.10, 1.4.4).** Usable at **320px** width and **200%** zoom with no loss
    of content or horizontal scroll (except where 2D is intrinsic, e.g. data tables).
14. **Contrast — design with APCA, certify with the WCAG ratio.** Body ≥ 4.5:1; large text and
    UI/graphical objects ≥ 3:1. Construct the palette in `accessible-color-and-contrast`; this
    skill only verifies the result. See `wcag-2.2-criteria.md` §contrast method note.
15. **Apple material settings.** For Liquid Glass or Apple-native chrome, verify Reduce
    Transparency, Increase Contrast, Reduce Motion, Dark Mode, Dynamic Type AX sizes, VoiceOver,
    and appearance/icon variants. Do not let translucency, refraction, or icon-only symbols carry
    required meaning without a text/name fallback.

### B. Audit (certify against the floor)
16. **Automated sweep first.** Run axe-core / Lighthouse / Accessibility Insights. This catches
    only **~30–40%** of issues (per `wcag-2.2-criteria.md` §testing) — never stop here.
17. **Manual keyboard traversal.** Unplug the mouse. Tab through the whole flow: every control
    reachable, focus visible and never obscured, order logical, no trap, Esc works, modal
    behaviour correct. See the checklist in `references/keyboard-and-focus.md`.
18. **Screen-reader smoke test.** Walk the flow with NVDA (Win) and VoiceOver (mac/iOS): does
    each control announce a sensible **name + role + state**? Are dynamic changes announced?
    Are decorative images silent and meaningful ones described? See `references/aria-patterns.md`.
19. **Target-size + zoom + reduced-motion spot checks.** Measure tap targets; test at 200% and
    320px; toggle reduced motion.
20. **Record the result on the audit sheet.** For each applicable criterion: **Pass / Fail /
    N/A**, evidence, and the fix. Use `examples/wcag-2.2-audit-sheet.md` as the template.
    A Fail on any AA criterion blocks ship.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| New component or flow | Design native semantics, keyboard behaviour, focus, and names before visual polish | Accessibility becomes an expensive retrofit |
| Existing interactive build | Run automated checks plus keyboard and screen-reader testing | Tool-only coverage misses interaction failures |
| Any applicable WCAG 2.2 AA criterion fails | Record evidence and block the release gate | A known barrier ships under a misleading pass label |
| Legal certification or formal conformance claim is requested | Produce technical evidence and require qualified human/legal sign-off | The skill overstates authority it does not hold |
| Evidence is designs, specs or screenshots only | Label findings `HEURISTIC` ("likely fails", "risk"); list the measured tests still owed as `NOT_ASSESSED` | A design review is reported as conformance and the client ships an untested barrier |
| Contrast was tuned with APCA | Certify with the WCAG 2.2 ratios; APCA is a design aid, not a W3C method or part of the current WCAG 3.0 draft | A conformance claim rests on a non-normative metric |

## Capability Contract

Read and interactive inspection are required for an audit. Browser or device access and at least
one automated checker are preferred; keyboard and screen-reader checks remain mandatory for a
release verdict. Editing is allowed only when remediation is requested.

## Degraded Mode

Without an interactive build, return design/spec risks and test cases, not a WCAG conformance
verdict. Without a screen reader or target device, mark those checks unverified and block any
claim that the experience passes the full gate.

## Anti-Patterns
- **`outline: none` with no replacement** — the single most common keyboard-a11y failure.
- **`<div onclick>` as a button** — no role, no name, no keyboard, no focus. Use `<button>`.
- **ARIA over native** — `role="button"` on a `<div>` instead of a `<button>`; redundant or
  conflicting ARIA. First rule of ARIA: don't use ARIA.
- **Placeholder as label** — disappears on input, often fails contrast, not a programmatic name.
- **Icon-only controls with no accessible name** — a bare `<button>🗑</button>` announces nothing.
- **Tiny tap targets** — 16px icon buttons crammed together fail 2.5.8.
- **Drag-only interactions** — sliders/reorder with no keyboard or single-pointer path (2.5.7).
- **Focus lost or stuck** — dialog opens but focus stays behind it; or focus trapped with no Esc.
- **Sticky header eating focus** — focused field scrolls under a fixed bar (2.4.11).
- **Re-asking known data** — making users retype an address they entered a step ago (3.3.7).
- **CAPTCHA puzzle as the only auth path** (3.3.8); blocking paste in password fields.
- **`aria-live` spam** — announcing every keystroke; use polite, scoped regions.
- **Audit by automated tool only** — declaring "axe is green, we're accessible". It isn't.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Accessible component or flow specification | Design and engineering | Native semantics, keyboard, focus, names, states, and alternatives are defined |
| WCAG 2.2 audit sheet | Pre-launch review | Each applicable criterion has Pass/Fail/N/A, evidence, and a fix; any AA failure blocks |
- Components built to the WAI-ARIA pattern with correct name/role/state, keyboard operation,
  managed focus, ≥24px targets, and drag alternatives.
- A completed **WCAG 2.2 audit sheet** (Pass/Fail/N/A + evidence + fix per criterion) suitable
  for handoff to `design-qa-and-pre-launch-review` as the a11y gate.

## Examples
- `examples/wcag-2.2-audit-sheet.md` — a **filled** audit of a sample "Edit profile" modal
  dialog (with a form inside), showing Pass/Fail/N/A and the fix per criterion, including the
  9 new 2.2 criteria. Use it as the template for any audit.

## References
- [`doctrine/design-doctrine.md`](../../../doctrine/design-doctrine.md) — the cross-cutting
  charter; §3 places this skill in `00-cross-cutting-ops-qa-a11y` (co-activates with every group).
- [`doctrine/references/wcag-2.2-criteria.md`](../../../doctrine/references/wcag-2.2-criteria.md)
  — **the canonical source of the criteria** (the 9 new in 2.2, the perennial AA checklist, the
  contrast method note, the testing note). This skill operationalizes it; it does not duplicate it.
- `references/aria-patterns.md` — accessible component patterns: native-first, name/role/value,
  and a per-pattern recipe (dialog, menu, tabs, combobox, accordion, table, live regions).
- `references/keyboard-and-focus.md` — keyboard interaction maps, focus order, roving tabindex,
  focus management, visible/unobscured focus, and the manual keyboard-audit checklist.
- `references/native-control-sufficiency.md` — what native date, colour, file, dialog, details and
  popover controls give, where they fall short, and the evidence required before a custom control
  replaces one (native-first is the default, not a universal rule).
- Pairs with `00-cross-cutting-ops-qa-a11y/design-qa-and-pre-launch-review` (final gate) and
  `02-color-brand-and-visual-identity/accessible-color-and-contrast` (palette/contrast).
- Use `../../../docs/kaizen/phase-1-task-mobile-accessibility-evidence-pack.md` for the
  task, mobile, state, manual-assistive-technology, and `NOT_ASSESSED` handoff record.
<!-- dual-compat-end -->
