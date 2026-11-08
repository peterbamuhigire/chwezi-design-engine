Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Excellence principles

The twenty principles say what "premium" means for a Chwezi product in terms a reviewer can
check. Each principle is a lens over rules in `rules-catalogue.md`; the rule IDs below are the
binding text, and this file explains intent, the check, the failure to look for, and what the
principle looks like in a real Chwezi screen.

## How to use this file

- **During design:** pick the principles that bear on the screen or flow (most screens touch
  01, 02, 03, 07 and 18) and write their checks into the screen contract's acceptance criteria.
- **During review:** score each principle's check as `MEASURED`, `HEURISTIC` or `NOT_ASSESSED`
  (see `scorecard-and-release-gate.md`). A principle never passes on appearance alone
  (PX-QA-004).
- **Evidence floor for every principle:** the per-change minimum in PX-QA-002 (compact-phone and
  tablet screenshots, an interaction test of the main task, a large-text check, an
  offline-interruption check where relevant, and a deviation note). It is not repeated below.
- **Agent boilerplate is not repeated either:** inspect before building (PX-AGENT-001), implement
  the canonical state set (PX-STATE-001), tokens only (PX-TOKEN-001), no networking or business
  calculation in rendering code (PX-ARCH-005).
- Thresholds marked *target* are Chwezi working targets (SHOULD) to be calibrated per product
  after baseline measurement; thresholds without that word are gates.

Example contexts used: Maduuka POS (retail, restaurant, pharmacy, hotel), Medic8 clinic, Farm
Acre field work, Aqar property, SpannaMax workshop, Education/LMS.

## Principle: Invisible effort

- **Intent.** The common task should need no thought about where to go, what format to type or
  whether it worked. Context and part-finished work persist without the user asking.
- **MUST.** PX-INTERACT-005 (minimal taps, persistent context, predictable focus),
  PX-INTERACT-006 (work survives back, process death, connectivity loss, dismissal),
  PX-INTERACT-008 (confirmations only for money, health, privacy or irreversible state).
- **Check.** First-use task success without help (target >= 90% on the core journey); count of
  confirmation dialogs not tagged with one of the four protected reasons = 0; kill-process and
  airplane-mode tests mid-task restore the exact state (pass rate 100%).
- **Anti-pattern.** An "Are you sure?" on adding an item to a cart; filters that reset when the
  user returns from a record.
- **Example (Maduuka POS).** A cashier scans five items, a call interrupts and Android kills
  the app. On reopening, the cart, the selected customer and the outlet are exactly as left,
  with a quiet "Cart restored" line, not a dialog.

## Principle: One clear primary action

- **Intent.** Each screen or focused panel has one dominant next step. Secondary actions are
  findable but do not compete; destructive actions are distinct and kept apart.
- **MUST.** PX-INTERACT-004, PX-COLOUR-004 (one next-step accent per screen),
  PX-DESTRUCT-002 (destructive never adjacent to a high-frequency positive action),
  PX-INTERACT-013 (no hidden primary actions, modal depth <= 1 on core tasks).
- **Check.** Primary-emphasis controls per panel <= 1 (0 when there is no next step);
  five-second test: *target* >= 80% of representative users name the screen's purpose and next
  step; destructive control separated from the primary by at least one target width or placed
  in a separate group.
- **Anti-pattern.** "Save", "Save and print" and "Submit" all filled in the brand colour on one
  form; "Delete job" beside "Mark complete".
- **Example (SpannaMax).** The job card's only accent button is "Request parts approval". "Close
  job" sits in the overflow menu and asks for a closure reason.

## Principle: Instant acknowledgement

- **Intent.** Every input visibly answers at once. Local acknowledgement is kept separate from
  server truth, and nothing is ever submitted twice.
- **MUST.** PX-INTERACT-001 (acknowledgement for every input), PX-INTERACT-002 (no duplicate
  records), PX-INTERACT-003 (no indefinite waiting), PX-A11Y-012 (status announced without
  moving focus).
- **Check.** p95 input-to-feedback <= 100 ms on the declared baseline device (*target*, measured
  separately from server completion); double-tap, timeout-then-retry and replay tests produce
  exactly one record (0 duplicates is a gate); every spinner has a timeout and recovery path.
- **Anti-pattern.** A "Pay" button that shows nothing for two seconds, so the cashier taps again
  and the customer is charged twice.
- **Example (Maduuka, mobile money).** Tapping "Request payment" turns the button into
  "Waiting for customer approval" within one frame, disables re-entry and starts a visible
  90-second timer with "Check status" and "Cancel" offered when it expires.

## Principle: Forgiving interaction

- **Intent.** Mistakes are cheap. Reversible changes can be undone, drafts survive, and a small
  error never forces a restart.
- **MUST.** PX-INTERACT-006, PX-INTERACT-007 (undo and drafts), PX-FORM-003 (focus to first
  invalid field, data kept), PX-FORM-006 (inline correction text).
- **Check.** Back navigation, process death, network loss, accidental dismissal and invalid
  input tests all pass with zero data loss; every reversible action type has undo; a draft is
  restored after a forced kill.
- **Anti-pattern.** A failed submit that clears a long intake form; a swipe-to-dismiss sheet
  that discards a half-written note with no way back.
- **Example (Medic8).** A nurse records six observations; the tablet loses Wi-Fi on save. The
  form stays filled, shows "Saved on this tablet - will send when connected", and the record
  appears in the ward's sync queue.

## Principle: Precision and rhythm

- **Intent.** Alignment, spacing, radii and numerals follow the shared scales so every screen
  reads as one system rather than a collage of unrelated cards.
- **MUST.** PX-GEOM-001 (one bounded spacing scale), PX-GEOM-008 (one radius set, one icon
  family), PX-TYPE-002 (no essential truncation at maximum text size), PX-TYPE-004 (tabular
  figures); SHOULD PX-GEOM-007 (baselines, right-aligned numbers, optical centring).
- **Check.** Guardrail lint: off-scale spacing or radius literals = 0 (or a ratchet baseline
  that only falls); screenshot overlay at device scale and at 200% text shows zero clipped
  essential values; numeric columns align on the last digit.
- **Anti-pattern.** Three card radii on one dashboard; amounts in a proportional face so
  columns of UGX totals wobble.
- **Example (Aqar).** The rent ledger's amount column is right-aligned with tabular figures,
  the arrears row uses the same row height as paid rows, and the only difference is the status
  word and its tone.

## Principle: Meaningful delight

- **Intent.** Motion and haptics confirm a state change or help orientation. Nothing decorative
  slows repeated work, and reduced-motion users lose no meaning.
- **MUST.** PX-MOTION-002 (reduced motion honoured), PX-MOTION-003 (no looping decorative
  animation), PX-MOTION-004 (every animation has a recorded purpose and never delays a repeat
  operation); SHOULD PX-INTERACT-012, PX-INTERACT-014 (haptics).
- **Check.** Animation register lists a purpose per animation; repeat-task time is equal with
  motion on and off; reduced-motion toggle on each platform shows final states instantly; idle
  screen trace shows zero animation frames after settle. Reduced motion is a Chwezi house MUST
  that exceeds WCAG AA (WCAG 2.3.3 is AAA; CR:A12).
- **Anti-pattern.** Confetti after every sale; a 900 ms count-up on a till total.
- **Example (Farm Acre).** When a field form syncs, its row's status word changes from "Queued"
  to "Sent 14:02" with a short fade and one light haptic. No celebration screen.

## Principle: Quiet confidence

- **Intent.** Status is calm, honest and time-stamped. Normal pending work does not look like
  an alarm, and nothing claims success before the server has confirmed it.
- **MUST.** PX-STATE-002 (labels match backend truth), PX-OFFLINE-003 (queued never shown as
  confirmed), PX-OFFLINE-004 (stale never shown as live); SHOULD PX-COLOUR-005 (red reserved
  for failure, loss, destruction and critical alerts).
- **Check.** Label-to-backend audit table (success, pending, queued, failed, stale, conflicted)
  with zero mismatches; red usage inventory shows no red on ordinary pending states.
- **Anti-pattern.** A green "Payment successful" toast fired on button press; a red banner for
  three invoices that are merely waiting to sync.
- **Example (Aqar).** A tenant's mobile-money rent shows "Received - awaiting reconciliation"
  in neutral tone with the provider reference and time, never "Paid" until reconciled.

## Principle: Thoughtful defaults

- **Intent.** Remember safe context so users do not re-enter it, but never presume a choice
  with clinical or financial consequence.
- **MUST.** PX-INTERACT-009 (safe, reversible defaults only; override in one step).
- **Check.** Defaults register reviewed per role, outlet and device; every default overridable
  in one step; consequential preselections = 0.
- **Anti-pattern.** Pre-ticking "Apply 10% discount" because the last sale used it;
  preselecting a drug strength from the previous patient.
- **Example (Maduuka pharmacy).** The outlet and the last payment method are remembered; the
  dosage, quantity and substitution choice are always blank until the pharmacist sets them.

## Principle: Progressive mastery

- **Intent.** Beginners get labels and guidance; experienced users get speed through recents,
  scanning, shortcuts and bulk actions, without a separate "advanced mode".
- **SHOULD.** PX-INTERACT-010, PX-INTERACT-017 (desktop shortcuts), PX-STATE-007 (role-based
  onboarding: skippable, shown once, resumable). No MUST rule; departures need a DDR.
- **Check.** Novice and expert journeys benchmarked separately; zero training prompts on the
  expert path after first successful use; shortcut map with no conflicts with OS or
  screen-reader keys.
- **Anti-pattern.** A tooltip tour that replays after every update; shortcuts available only
  after switching to "Pro mode".
- **Example (Education/LMS).** A new teacher sees labelled steps to mark attendance; after the
  first week the register opens on today's class with "Mark all present" and per-learner
  exceptions.

## Principle: Humane language

- **Intent.** Copy is short, specific and non-blaming, in the business vocabulary users already
  use. Errors say what happened, what is still safe and what to do next.
- **MUST.** PX-STATE-005 (three-part error message; codes secondary), PX-L10N-005 (declared
  locales, externalised strings, no concatenation); SHOULD PX-L10N-004, PX-L10N-009.
- **Check.** Copy audit: every error has the three parts; comprehension test with non-technical
  staff in each declared language (*target* success set per product). Default language list
  (owner default, 2026-11-07): English, Luganda, Swahili, French, Arabic (RTL), Kinyarwanda,
  Spanish. Wording itself is owned by the writing engine's interface-copy skill.
- **Anti-pattern.** "Error 500: transaction failed"; "Invalid input" with no hint.
- **Example (Maduuka).** "Card machine not responding. The sale is saved on this till. Try the
  card again or take cash."

## Principle: Operational joy

- **Intent.** Repetitive work builds momentum: totals stay visible, focus lands in the right
  place, nothing is re-entered, safe batch actions exist.
- **SHOULD.** PX-INTERACT-011, PX-QA-010 (30-60 minute realistic sessions); MUST
  PX-INTERACT-016 (numeric entry), PX-INTERACT-015 (scanning).
- **Check.** In a 30-60 minute session per operational role: wrong taps, re-entries and
  interruptions per hour, trended across releases (*target*: falling or flat); field re-entry
  count per core task = 0 where the value is already known (PX-A11Y-010).
- **Anti-pattern.** A stock count that returns to the top of the list after each entry.
- **Example (Maduuka stock count).** After a count is entered, focus moves to the next item's
  quantity field, the running variance stays pinned, and "Same as expected" fills a row in one
  tap.

## Principle: Information restraint

- **Intent.** Nothing appears because there is space. Every KPI, chart, banner or assistant
  widget answers a named question, decision or action.
- **MUST.** PX-DATA-007 (widget register), PX-DATA-008 (no decorative chart on transaction
  screens), PX-LAYOUT-006 (no decorative hero on data entry, SHOULD).
- **Check.** Widget register with named need per element; widgets unused for two consecutive
  releases removed or demoted (*target*); path length from launch to checkout unaffected by
  dashboard content.
- **Anti-pattern.** An AI "insights" card on the POS home that pushes "New sale" below the fold.
- **Example (Medic8).** The clinic home shows today's queue, critical results awaiting review
  and pending discharges; the revenue chart lives in the management view only.

## Principle: Accessibility as craftsmanship

- **Intent.** Large text, contrast, semantics, focus order, voice control and screen readers
  are built into the shared components as part of quality, not added as a separate skin.
- **MUST.** PX-A11Y-001..003, PX-A11Y-006..010, PX-A11Y-012, PX-TYPE-005, PX-COLOUR-001,
  PX-COLOUR-002, PX-GEOM-005.
- **Check.** Logged TalkBack, VoiceOver (and a desktop screen reader on web), external keyboard,
  RTL, reduced-motion and 200% text passes on the core journey; WCAG 2.2 AA failures on core
  journeys = 0 (CR:A1-A11); touch targets measured on the hit area, 48 dp / 44 pt.
- **Anti-pattern.** An "Accessible mode" toggle that loads different screens; icon-only buttons
  read as "button".
- **Example (SpannaMax).** The inspection checklist reads "Brake pads, front, fail, photo
  attached" as one node; every pass/fail toggle carries a word as well as a colour.

## Principle: Device respect

- **Intent.** A budget Android phone on an intermittent network is a first-class client.
  Richer devices gain layout, not costly effects.
- **MUST.** PX-MANDATE-005, PX-PERF-001..008, PX-PERF-011 (data cost).
- **Check.** Declared baseline device profile; cold/warm start, transition latency, jank,
  memory and battery measured on that real device with a realistic dataset and compared with
  the recorded budget (no regression beyond budget); emulator-only evidence does not pass.
  Android vitals core thresholds are crash 1.09% and ANR 0.47% (CR:P1).
- **Anti-pattern.** Full-resolution product photos in a scrolling catalogue; a live blur behind
  the bottom bar.
- **Example (Farm Acre).** Field photos are compressed on the device before upload and wait for
  Wi-Fi unless the officer chooses "Send now on mobile data".

## Principle: Privacy by design

- **Intent.** Sensitive data appears only for roles that need it, masked by default, permission
  enforced on the server and every access auditable.
- **MUST.** PX-PRIV-001 (backend enforcement), PX-PRIV-002 (need-to-see, masking),
  PX-PRIV-006 (hide vs disable with reason), PX-PRIV-007 (screenshot protection),
  PX-PRIV-008 (shared devices), PX-PRIV-011 (visible audit trail).
- **Check.** Role x screen visibility matrix tested; a low-role token against restricted
  endpoints is denied; recents snapshot blanked on protected screens; idle lock with warning
  at the tenant's configured timeout (SHOULD defaults, owner default 2026-11-07: shared POS
  2 min, clinical 5 min, back office 15 min).
- **Anti-pattern.** Patient diagnoses on a reception dashboard tile "because there was room".
- **Example (Medic8).** Reception sees name, visit time and queue status; diagnosis and results
  appear only in the clinician's encounter view, and every open is logged.

## Principle: Cross-platform coherence

- **Intent.** One mental model across Android, iOS, tablet, desktop and web, while each
  platform's back, keyboard, notification, safe-area and accessibility conventions are honoured.
- **MUST.** PX-NAV-003 (platform back and deep links), PX-NAV-008 (back handlers), PX-ARCH-002, PX-ARCH-008 (interaction
  parity, not pixel identity), PX-GEOM-002 (safe areas, edge-to-edge).
- **Check.** Shared functional contract tests run separately on Android and iOS; back-behaviour
  matrix per platform; for Play-distributed Android apps at targetSdk 36, edge-to-edge without
  opt-out and predictive back by default are verified on device (CR:M6-M8).
- **Anti-pattern.** Business logic in `onBackPressed`; an iOS build with an Android-style
  bottom sheet that ignores the edge swipe.
- **Example (Aqar).** The caretaker app on Android and the manager's iPad share the work-order
  states and wording; back on the iPad is the edge swipe, on Android the system gesture.

## Principle: Brand character without clutter

- **Intent.** Each product is recognisable, but personality lives in the brand primary, logo,
  illustration subset and voice, never in changed state meanings or extra accent colours.
- **MUST.** PX-TOKEN-004 (themes change brand tokens only), PX-TOKEN-006 (theme swap changes
  colour only), PX-COLOUR-003 (brand confined to identity surfaces), PX-COLOUR-004.
- **Check.** Theme-swap screenshot test with two brand primaries: contrast table recomputed and
  passing, semantic states unchanged, geometry diff = 0. Accent model (owner default,
  2026-11-07): per-product brand primary plus one shared amber next-step accent; any extra
  colour needs a DDR.
- **Anti-pattern.** A product theme that recolours "warning" to match its brand.
- **Example (SpannaMax vs Maduuka).** Both use the same success, warning, danger, info and
  neutral roles; only the brand primary, logo and hub illustrations differ.

## Principle: Trustworthy numbers

- **Intent.** Money, tax, stock and clinical values are correct, current or visibly stale, and
  never illustrative.
- **MUST.** PX-DATA-001 (no fabricated data), PX-DATA-002 (KPI anatomy), PX-DATA-004
  (reconciliation), PX-DATA-005 (due, received, reconciled distinct), PX-DATA-011
  (minor units), PX-L10N-001, PX-DATA-009 (provenance).
- **Check.** Screen values reconciled against the ledger or report definition (mismatches = 0);
  rounding and offline reconciliation tests pass; UGX and other zero-minor-unit currencies show
  0 decimals per ISO 4217 (CR:C1; overrides any "always two decimals" rule); seed or
  fixture data in production builds = 0.
- **Anti-pattern.** "USh 45,000.00"; a sample revenue figure left in a production dashboard.
- **Example (Maduuka owner app).** "Sales today USh 2,450,000 - as of 16:40, 3 sales queued on
  Till 2" with a tap-through to the sales list that sums to the same figure.

## Principle: Re-entry experience

- **Intent.** Returning users land in the right tenant, outlet, role and context with their
  next task and pending work in view; nothing stands between them and work without reason.
- **MUST.** PX-NAV-006 (re-entry), SHOULD PX-NAV-007 (stable placement).
- **Check.** Launch-to-first-meaningful-action time for returning users measured on the
  baseline device against a per-product budget; on return there are no splash delays,
  promotional carousels, repeated onboarding or permission prompts unless a stated reason
  exists.
- **Anti-pattern.** A "What's new" carousel before a waiter can open a table.
- **Example (Maduuka restaurant).** The waiter's PIN unlocks straight into the floor plan with
  their open tables highlighted and two kitchen tickets marked "Ready".

## Principle: Continuous evidence

- **Intent.** Design is run as a measured system. Task metrics, error analysis, accessibility
  findings, performance profiles and decisions live in version control and move release by
  release.
- **MUST.** PX-QA-011 (evidence in version control), PX-QA-009 (redesigns carry before/after
  evidence, regression tests and rollback), PX-QA-012 (evidence class on every scorecard item),
  PX-MANDATE-010 (value baselines agreed before claims).
- **Check.** Each release updates the evidence folder; every SHOULD departure links a DDR;
  scorecard re-measured on the cadence in `scorecard-and-release-gate.md`.
- **Anti-pattern.** A redesign approved from a slide deck and shipped without the old timings.
- **Example (Medic8).** The triage redesign ships behind a flag to one clinic; time from arrival
  to triage and wrong-patient near misses are compared with the four-week baseline before
  wider rollout.

## Principle-to-scorecard map

| Scorecard dimension | Principles that feed it |
|---|---|
| Task usability and speed | 01, 02, 08, 09, 11, 19 |
| Reliability and recovery | 03, 04, 07 |
| Visual and interaction craft | 05, 06, 10, 12, 17 |
| Accessibility and inclusion | 13, 10 (language), 16 |
| Performance and efficiency | 14 |
| Security and data trust | 15, 18 |
| All dimensions (governance) | 20 |
