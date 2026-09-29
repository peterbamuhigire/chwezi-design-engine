---
name: design-handoff-and-dev-spec
description: >-
  Use when handing a design to engineering through token-referenced redlines, component and screen behaviour, states, breakpoints, accessibility notes, edge cases, and testable acceptance criteria. Use design-tokens-and-naming to define tokens and design-qa-and-pre-launch-review for final release.
metadata:
  portable: true
  category: 09-design-systems-tokens-and-theming
  compatible_with:
    - claude-code
    - codex
---

# Design Handoff And Dev Spec
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- Handing a finished design to engineering and you want it built right the first time — a
  redlined, token-referenced spec that names every value and behaviour instead of leaving the
  developer to eyeball the Figma frame.
- Writing the spec for one component or screen: the dimensions, the spacing, the type and colour
  *tokens* (not raw hexes), every variant, every interactive state, the responsive behaviour, and
  the motion.
- Defining **acceptance criteria** — the testable, binary statements that decide whether the
  implementation matches the design and is allowed to merge.
- Running a design-to-code fidelity review: comparing a built screen against its spec and logging
  the deltas (the "design QA" / "spec parity" pass before launch).
- Closing the loop on a design system: components exist, tokens exist, and now each screen needs a
  handoff that *uses* them so the build inherits the system instead of reinventing it.

## Do Not Use When

- You are still *defining the tokens themselves* (the primitive→semantic→component tiers, naming,
  export) — that is `09-…/design-tokens-and-naming`. A handoff *references* those tokens by name; it
  does not invent them. Do that skill first so this spec can cite real role names.
- You are authoring the component's *own* variant/state matrix and API as a reusable system part —
  that is `09-…/component-library-architecture`. This skill specs a component (or screen) *as placed
  in a design*, citing the library component; it does not design the library component from scratch.
- You are choosing palette, type, or layout — that craft lives in groups 01–04. A handoff documents
  resolved decisions; it is not where decisions get made.
- The deliverable is a full pre-launch QA gate spanning a11y + perf + anti-slop across a whole
  product — that is `00-…/design-qa-and-pre-launch-review`. This skill's QA is the narrower
  *spec-vs-build fidelity* check for the handed-off unit.

## Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Approved frames for every state and breakpoint | Design owner | yes | Prevents engineering guesswork |
| Stable token and component names | Design system | yes | Keeps the handoff composable |
| Behaviour, content, accessibility, data, and platform constraints | Product and engineering | yes | Makes acceptance criteria testable |

- The final design frames (Figma or equivalent) for every state and breakpoint — not just the
  default/happy-path frame. A spec can only be as complete as the frames it is drawn from; missing
  the error/empty/loading frames is the usual root cause of a thin handoff.
- The **token names** from `09-…/design-tokens-and-naming` (semantic role names: `color.text.default`,
  `space.inset.md`, `radius.200`, `elevation.raised`, motion tokens). Redlines reference these, never
  raw values.
- The library component(s) this screen composes, from `09-…/component-library-architecture` — so the
  spec says "Button / primary / md, library v2.3" instead of re-describing a button.
- The behaviour rules: what each control does, validation logic, async/loading behaviour, focus
  order, keyboard interactions, and the content/data edge cases (longest string, zero items, error).
- The target platforms and their constraints (web breakpoints / container contexts; or iOS + Android
  if cross-platform — then pair with `07-…/cross-platform-design-parity`).

## Workflow

1. **Decide the unit and assemble every frame first.** One component, or one screen? Pull *all* its
   frames before writing a word: default, plus every variant, every interactive state (hover, focus,
   active, disabled, loading, selected, error), every breakpoint/container size, and every content
   edge case (empty, one item, overflow, longest localized string, error). A handoff drawn from only
   the happy-path frame is the single most common defect — it pushes the missing decisions onto the
   developer, who will improvise, and the improvisation is where fidelity dies. If a frame is
   missing, the design is not ready to hand off; go get it. See `references/handoff-checklist.md`.

2. **Redline against tokens, never against raw values.** Every measurement is a *token reference*:
   spacing is `space.inset.md` (not "16px"), colour is `color.action.primary.bg` (not "#3B5BDB"),
   radius is `radius.200`, type is `text.body.md` / `font.size.300`, elevation is `elevation.raised`.
   A redline full of literal hexes and pixels has bypassed the system — it will drift the moment a
   token changes and it tells the developer to hardcode. State the token; put the *resolved* value in
   parentheses only as a sanity check (`space.inset.md` → 16px). This is the contract that makes the
   build inherit the design system instead of forking it. See `references/redline-and-spec-format.md`
   and the doctrine sourcing-authority rule (values trace to the token system, not to ad-hoc picks).

3. **Spec the box model explicitly: size, spacing, alignment.** For each element give width/height
   behaviour (fixed, fill, hug, min/max), internal padding (inset tokens), gaps between children
   (stack/inline gap tokens), and alignment within the parent. Name the layout primitive
   (flex/grid, direction, wrap, justify/align) so the developer builds the same auto-layout the
   designer used — not a pixel-pushed approximation that breaks at the next content length.

4. **Specify every interactive state — states are not optional.** For each control, give the visual
   spec of hover, focus-visible, active/pressed, disabled, loading, selected, and error, each as
   token deltas from the default ("focus: 2px `border.focus` ring, offset `space.50`"). Disabled and
   loading states are where handoffs are thinnest and where bugs ship. Focus-visible is an
   accessibility requirement, not a nicety — name the ring token and that it must clear 3:1 against
   the adjacent surface (`doctrine/references/wcag-2.2-criteria.md`, WCAG 1.4.11 / 2.4.11–2.4.13).

5. **Document behaviour and motion as precisely as the visuals.** What does each control *do*: the
   action, the validation rule and *when* it fires (on blur? on submit?), the async/optimistic
   behaviour, the success/error outcome, navigation. Motion as token references (duration + easing
   tokens), what triggers it, and what it communicates — plus the reduced-motion fallback
   (`prefers-reduced-motion`). "It animates" is not a spec; "150ms `motion.ease.standard` opacity +
   4px rise on enter, no transform under reduced-motion" is.

6. **Annotate accessibility inline, not as an afterthought.** On the spec, mark: semantic
   role/element (is this a `<button>` or a link?), the accessible name and where it comes from, focus
   order, keyboard interactions (Enter/Space/Esc/arrow behaviour), live-region announcements for
   async/error, the 24px minimum target size (WCAG 2.5.8), and any state that must be conveyed by
   more than colour. These are build instructions, not review notes — they belong on the handoff
   so they get implemented, not bolted on after the audit fails. (`wcag-2.2-criteria.md`.)

7. **Cover the responsive/adaptive behaviour, not just two endpoints.** State what changes at each
   breakpoint or container size — reflow, stack, hide, font-step, target growth — and what the
   *intermediate* behaviour is (does it scale fluidly, or snap?). Name whether sizing is viewport- or
   container-driven. The gap between "mobile frame" and "desktop frame" is where developers guess;
   close it.

8. **Write acceptance criteria as testable, binary statements.** Each is a checkable assertion a
   reviewer (or a visual-regression test) can mark pass/fail with no judgement call: "Primary button
   uses `action.primary.bg`; on hover, `action.primary.bg.hover`." / "Focus-visible ring is 2px
   `border.focus`, offset 2px, ≥3:1 vs surface." / "At ≤containerSm, the actions stack vertically
   with `space.stack.sm` gap." / "Empty state renders the zero-items frame, not a blank region." /
   "Submit disabled until both fields valid; error announced via `aria-live=polite`." Vague criteria
   ("looks good", "matches Figma") are not criteria. See `references/redline-and-spec-format.md`.

9. **Run the fidelity review against those criteria and log deltas.** When the build lands, walk the
   acceptance list against the implementation across states and breakpoints; record each delta with
   the criterion it fails, the expected token/behaviour, and the actual. Triage (blocker / polish /
   accept-with-note). Parity is measured against the spec, not against a fresh re-read of the
   designer's intent — which is exactly why the spec and its acceptance criteria had to be written
   down first. Pairs with `00-…/design-qa-and-pre-launch-review` for the broader gate.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Approved tokens and components exist | Reference their stable names and versions | The handoff forks the design system with raw values |
| A value or state is not defined upstream | Stop and resolve the design decision before handoff | Engineering is forced to invent product behaviour |
| One implementation target is in scope | Specify its native breakpoints, input modes, and accessibility behaviour | Generic handoff language misses platform constraints |
| Several platforms share intent but not controls | Share semantic intent and write platform-specific mappings | Pixel parity is imposed where behavioural parity is required |

## Capability Contract

Read access to approved design files, tokens, component documentation, content, and target-platform
constraints is required. Editing is limited to the authorised handoff artefacts. Build inspection
is optional during authoring and required when producing a fidelity-review verdict.

## Degraded Mode

If token, component, content, or state definitions are missing, issue a readiness gap list and do
not label the handoff build-ready. If the implementation cannot be inspected, provide acceptance
tests but leave fidelity results unverified.

## Anti-Patterns

- **The happy-path handoff** — one default frame, no states, no breakpoints, no edge cases. The
  developer improvises the rest and the improvisation ships. The #1 fidelity killer.
- **Redlines in raw hex/px** instead of token names — bypasses the design system, hardcodes values,
  and drifts the instant a token changes. A handoff that doesn't cite tokens forked the system.
- **"Matches the design" as acceptance criteria** — unfalsifiable, so nothing actually gets checked.
  Criteria must be binary and token-specific or they are decoration.
- **States and behaviour treated as "the developer will figure it out"** — disabled, loading, focus,
  error, validation timing, async outcomes left unspecified. These are decisions, and an
  unspecified decision is a defect waiting to be filed.
- **Accessibility left for the post-launch audit** — role, name, focus order, keyboard, target size,
  non-colour state. Annotating these at handoff costs minutes; retrofitting them costs a sprint.
- **Re-describing a library component** instead of citing it (`Button / primary / md @ v2.3`).
  Duplicating the spec guarantees the screen and the library drift apart.
- **A motion note that says "animates nicely"** — no duration, no easing token, no trigger, no
  reduced-motion fallback. Unbuildable, untestable.
- **Reviewing fidelity against the designer's memory** rather than a written spec — turns sign-off
  into an argument and lets regressions through because there's no record of intent.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Token-referenced component or screen specification | Engineering | Every state, breakpoint, behaviour, content edge, and accessibility note is buildable |
| Binary acceptance checklist and fidelity log | QA and pre-launch review | Each criterion can pass or fail against the approved design and implementation |

- A **component/screen handoff sheet**: token-referenced redlines (size, spacing, type, colour,
  radius, elevation), the full variant × state matrix, responsive/breakpoint behaviour, behaviour +
  motion (with reduced-motion fallback), inline accessibility annotations, and content/data edge
  cases — each citing the library component and the semantic token names it consumes.
- A **testable acceptance-criteria checklist** (binary, token-specific) that gates the merge.
- A **fidelity-review log** of deltas (spec vs build) with triage, for the pre-launch QA pass.

## Examples

- `examples/component-handoff-sheet.md` — a complete redlined dev spec for one real component (a
  primary Button as placed in a form): token-referenced measurements, the full state matrix,
  responsive behaviour, behaviour + motion with reduced-motion fallback, inline a11y annotations,
  content edge cases, and the acceptance-criteria checklist a reviewer signs off against.

## References

- `doctrine/design-doctrine.md` — Mission §0 (authored, system-driven output over convergent
  approximation) and Anti-Slop Charter §2 (state the choice first; the sourcing-authority asymmetry —
  a redline's values trace to the token system and human design authority, never to a reflexive
  default or an AI tool's pick).
- `doctrine/references/wcag-2.2-criteria.md` — the contrast floors (4.5:1 / 3:1), focus-visible /
  focus-appearance (1.4.11, 2.4.11–2.4.13), and 24px target size (2.5.8) annotated inline on the
  spec and asserted in the acceptance criteria.
- `references/handoff-checklist.md` — the readiness + completeness checklist (every frame, state,
  breakpoint, edge case) a handoff must satisfy before it is "ready".
- `references/redline-and-spec-format.md` — how to write token-referenced redlines and binary,
  testable acceptance criteria; the annotation vocabulary and the spec sheet anatomy.
- Upstream: `09-…/design-tokens-and-naming` (the semantic token names this spec cites) and
  `09-…/component-library-architecture` (the library components this spec composes and references).
- Pairs with: `00-…/design-qa-and-pre-launch-review` (broader pre-ship gate),
  `07-…/cross-platform-design-parity` (when the handoff targets iOS + Android),
  `08-…/motion-and-interaction` (the motion tokens and choreography the spec references).
- Standards (named for provenance, not in-repo): WCAG 2.2; W3C Design Tokens Format Module (the token
  names referenced); common spec-handoff practice (Figma Dev Mode, redline annotation, Gherkin-style
  acceptance criteria).
- Cross-engine handoffs (resolve via the global engine routing table): measurable UX requirements
  (contrast, target size, response time, breakpoints, assistive technologies) go to
  `chwezi-sdlc-documentation/03-design-documentation/05-ux-specification/SKILL.md` and form and content rules to
  `chwezi-sdlc-documentation/03-design-documentation/09-ux-content-and-form-specification/SKILL.md`; component
  code, ARIA wiring and token pipelines go to
  `chwezi-dev-engine/skills/frontend-ux/frontend-architecture/SKILL.md`, and automated
  state and accessibility checks to `chwezi-dev-engine/skills/sdlc-meta/advanced-testing-strategy/SKILL.md`.
  Design supplies values and tests; evidence stays `NOT_ASSESSED` until the build is measured.

## Book-informed practice route

Use [the design-system operating model](../component-library-architecture/references/design-system-operating-model.md) to connect visual handoff to behaviour, tokens, accessibility, and acceptance evidence.
<!-- dual-compat-end -->
