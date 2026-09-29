# Design Quality Gate

Run before declaring any artifact with type, colour, or layout "done." Mirrors the finance
engine's quality-gate pattern. A failed item blocks shipment until fixed or explicitly waived
(with a recorded reason). A waiver of a `chwezi-slop` detector finding uses the machine format in
`tools/slop-detector/README.md` (`.chwezi/slop.json` or an inline comment, reason "<who>:
<evidence>", agents limited to value-scope waivers) and is listed in
`templates/design-delivery-evidence.md`.

For a meaningful change, record the gate evidence in
`templates/design-delivery-evidence.md`. A checked box without a linked render, measurement,
inspection result, or explicit N/A reason is not evidence.

## Phase 1 evidence routing

Use the Phase 1 packs when the change includes a deliberate omission, a
candidate experiment, or a mobile/accessibility handoff:

- `docs/kaizen/phase-1-intentional-omission-review.md` records the user job,
  replacement/recovery path, accessibility impact, owner, and decision.
- `docs/kaizen/phase-1-candidate-guardrail-evaluation-pack.md` records the
  baseline/candidate comparison, guardrails, rollback, and evidence class.
- `docs/kaizen/phase-1-task-mobile-accessibility-evidence-pack.md` records the
  task, state matrix, viewport/device evidence, manual accessibility checks,
  and `NOT_ASSESSED` gaps.

These records extend the gate; they do not replace a retained render,
measurement, keyboard/assistive-technology check, or accountable reviewer
decision. Missing evidence remains `NOT_ASSESSED`, and any applicable AA
failure blocks a `PASS` decision.

## Routing and scope

- [ ] The selected skill owns the requested decision; the closest neighbour was considered.
- [ ] Artefact, audience, surfaces, states, constraints, and acceptance conditions are named.
- [ ] Client, audience, primary job, environment, stakes, and success measure are named.
- [ ] One purpose-fit visual/experiential thesis and three authored decisions are recorded.
- [ ] Missing context that would materially change the design caused a stop or a qualified draft.

## Premium authorship and originality

- [ ] The design language is derived from the client's product, content, audience, and domain
      rather than copied from a reference product.
- [ ] References are translated into principles; no distinctive competitor composition, gradient,
      copy, illustration language, or interaction has been reproduced without a separate rights
      and strategy decision.
- [ ] The work has one memorable, defensible signature choice that improves recognition or use;
      decoration that does not serve the job has been removed.
- [ ] Real or representative content has been used to judge hierarchy, density, rhythm, and fit.
- [ ] A concrete demo, render, or implemented slice has been reviewed through refinement; a
      moodboard or static hero alone is not premium evidence.
- [ ] Premium judgement is separated from measurable checks: taste and authorship are human
      decisions, while accessibility, performance, responsiveness, and task outcomes are gates.

## Typography

- [ ] Typeface(s) **named and justified** in one line, stated *before* the artifact was produced.
- [ ] No banned AI-slop font as primary (`doctrine/references/ai-slop-banned-fonts.md`), incl.
      the secondary escapes and bare system stacks.
- [ ] A deliberate **display + body pairing** — not one font for everything.
- [ ] Type scale uses a real ratio (≥1.25), with obvious size jumps and weight extremes.
- [ ] Line-height follows the inverse rule (×1.6 under 32pt; ×1.3–1.1 above).
- [ ] Body text is not pure black; not wide-tracked.

## Licensing & embedding

- [ ] Licence permits the intended use, including embedding where applicable.
- [ ] Premium (Fontshare) files are embedded into the output only — never committed or shipped raw.
- [ ] Format-correct loading: woff2/@font-face (web), embed+subset (DOCX/PPTX), default-embed
      (PDF), name-reference or PDF-instead (XLSX).
- [ ] Fallback set *after* — never instead of — the chosen face.

## Evidence classes (heuristic review is not measured conformance)

Label every gate item with its evidence class (see `doctrine/references/wcag-2.2-criteria.md`):
`HEURISTIC` (expert judgement from designs, specs or screenshots), `MEASURED` (a recorded test on
the rendered or implemented artefact) or `NOT_ASSESSED` (written `NOT ASSESSED` in the delivery
manifest). Critique and design review produce `HEURISTIC` findings and may say "likely fails" or
"risk"; only `MEASURED` evidence may say "passes" or "conforms". Render, device, browser,
assistive-technology and print proof is `NOT_ASSESSED` unless it was actually performed and the
artefact (screenshot, log, tool output, proof) is linked.

## Colour & layout (when present)

- [ ] No generic default gradient / template look; palette intent stated.
- [ ] Contrast measured on the rendered colours: text ≥ 4.5:1, large text (≥ 24 CSS px, or
      ≥ 18.66 CSS px bold) ≥ 3:1, UI component boundaries, focus indicators and meaningful
      graphics ≥ 3:1 against adjacent colours (WCAG 2.2 SC 1.4.3, 1.4.11), in every theme.
- [ ] Colour is never the only carrier of state or meaning (SC 1.4.1).
- [ ] Consistent spacing rhythm on a single unit; grid respected.

## Interaction states and feedback (when interactive)

- [ ] A state matrix covers every interactive component: default, hover (pointer only),
      focus-visible, active/pressed, selected, disabled, loading, empty, error, success and,
      where relevant, read-only and offline. Each state differs by more than colour alone.
- [ ] Every user action gives feedback within the expected time: pressed state immediately,
      progress for waits, and a success or error outcome with a recovery path.
- [ ] Disabled controls explain why (nearby text or tooltip reachable by keyboard) or are replaced
      by an enabled control that explains the blocker on use.

## Keyboard and screen reader (when interactive)

- [ ] Every function is operable by keyboard in a logical order with no trap (SC 2.1.1, 2.1.2,
      2.4.3); focus is always visible and not hidden by sticky headers, footers or sheets
      (SC 2.4.7, 2.4.11).
- [ ] Controls expose name, role, state and value; status messages are announced without moving
      focus (SC 4.1.2, 4.1.3). Dialogs move focus in and return it on close.
- [ ] Pointer targets ≥ 24×24 CSS px (SC 2.5.8, AA); touch targets meet the platform default
      (Apple 44×44 pt, Material 48×48 dp). Drag actions have a single-pointer alternative (SC 2.5.7).
- [ ] A screen-reader pass (VoiceOver, TalkBack or NVDA) on the primary task was performed and
      logged, or the item is marked `NOT_ASSESSED`.

## Motion (when animated)

- [ ] Nothing flashes more than three times per second (SC 2.3.1); auto-playing motion over five
      seconds can be paused (SC 2.2.2).
- [ ] `prefers-reduced-motion` / Reduce Motion replaces non-essential movement with a fade or
      instant change; no meaning or affordance is carried only by motion (house floor; SC 2.3.3 AAA).

## Responsive and zoom (when rendered on screens)

- [ ] Content reflows without two-dimensional scrolling at 320 CSS px width (SC 1.4.10) and stays
      usable at 200% text zoom (SC 1.4.4) and with user text-spacing overrides (SC 1.4.12).
- [ ] Each declared breakpoint and orientation was rendered with real, long and localised content,
      or is listed as `NOT_ASSESSED`.

## AI-slop freshness (when applicable)

- [ ] If the task depends on a current AI-slop definition, font ban, or visual tell, the
      `slop-doctrine-refresh-and-research-loop` was run or the current doctrine was explicitly
      accepted as fresh enough for the artifact's risk level.

## Mobile (when applicable)

- [ ] Platform conventions honoured (iOS HIG / Android Material), touch targets ≥ the platform
      default, safe areas / notch handled.
- [ ] Apple platforms: Liquid Glass only on the controls and navigation layer, checked with Reduce
      Transparency, Increase Contrast, Reduce Motion and the largest Dynamic Type size
      (`skills/07-mobile-ios-android-cross-platform/ios-ui-ux-design/references/hig-liquid-glass.md`).

## Escalation

- [ ] If any gate cannot be met (no font file, no CDN, restrictive licence) the artifact was
      **not** silently downgraded — the limitation was stated and a decision requested.

## Release evidence

- [ ] All required states and target surfaces were inspected, not inferred from one happy path.
- [ ] Empty, loading, error, recovery, success, keyboard, touch, reduced-motion, and long-content
      states were inspected where applicable.
- [ ] Rendered or implemented output was compared with the approved design where tooling exists.
- [ ] Unverified checks, residual risks, waiver owner, and next action are recorded.
- [ ] The final verdict is `PASS`, `CONDITIONAL`, or `BLOCKED`; `CONDITIONAL` cannot be described
      as production-ready.

## Handoffs

- [ ] Requirements that the design depends on (contrast, target size, response time, supported
      breakpoints, assistive technologies, locales) are stated as measurable acceptance criteria
      and handed to `srs-skills` (for example `03-design-documentation/05-ux-specification`); the
      design engine does not write the requirement, it supplies the value and the test.
- [ ] Implementation detail (component code, ARIA wiring, token pipeline, test automation) is
      handed to `chwezi-dev-engine` with the state matrix, token names and the evidence still
      `NOT_ASSESSED`; design does not claim the implementation passes until it is measured.
