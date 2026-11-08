Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Pattern dossier contract

This file is written once and inherited by every pattern dossier (PD-01 to PD-50). A dossier only
states what is specific to its pattern; everything below applies unless the dossier says otherwise
and records why in a design decision record (DDR, PX-QA-005).

Rule IDs refer to [rules-catalogue.md](rules-catalogue.md). Platform values carry a currentness
record in [currentness-register.md](currentness-register.md); the short table in "Platform values
used by this contract" lists the ones the contract depends on.

## What a dossier is, and what it is not

- A dossier is a design interpretation of a pattern seen in supplied reference mockups. It is a
  pattern hypothesis, not proof and not a specification of any third-party product. Source
  mockups were text-described only, so treat every dossier as a starting point to test, not a
  finding (PX-QA-004).
- Keep the recognisable strength of the pattern; rebuild it with Chwezi tokens and components
  (PX-TOKEN-001, PX-ARCH-007). Never copy a reference as a screenshot, layout grid or asset.
- Fields, actions, prices, calculations, clinical rules and permissions come from the product's
  requirements, domain model and running code, never from a dossier or a mockup (PX-MANDATE-004).
  A capability shown in a mockup is not a requirement.
- Demonstration figures never ship. Demo data is labelled and cannot mix with live records
  (PX-DATA-001).
- Read a dossier against the real codebase, the product profile in
  [product-profiles.md](product-profiles.md) and the matching screen blueprint and component
  contracts before building.

## Platform values used by this contract

All rows accessed 2026-11-07. Status from the currentness register; NOT_ASSESSED values are never
asserted as platform fact.

| Value | Figure | Source | Status |
|---|---|---|---|
| Text contrast (WCAG 2.2 1.4.3, AA) | 4.5:1; large text 3:1 | https://www.w3.org/TR/WCAG22/ | VERIFIED |
| Non-text contrast (1.4.11, AA) | 3:1 for UI boundaries, focus, meaningful graphics | https://www.w3.org/TR/WCAG22/ | VERIFIED |
| Web target size (2.5.8, AA) | 24x24 CSS px floor, spacing exception | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | VERIFIED |
| Android touch target | at least 48x48 dp | https://developer.android.com/guide/topics/ui/accessibility/apps | VERIFIED |
| Apple hit target | 44x44 pt default (Apple minimum 28 pt; Chwezi floor stays 44 pt) | https://developer.apple.com/design/human-interface-guidelines/accessibility | VERIFIED |
| Width size classes (dp) | compact <600; medium 600-839; expanded 840-1199; large 1200-1599; extra-large >=1600 (large and XL need `supportLargeAndXLargeWidth = true`) | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes | VERIFIED |
| Height size classes (dp) | compact <480; medium 480-899; expanded >=900 | same as above | VERIFIED |
| Android 16 / targetSdk 36 | edge-to-edge with no opt-out; predictive back on by default; orientation and resizability locks ignored at smallest width >=600 dp | https://developer.android.com/about/versions/16/behavior-changes-16 | VERIFIED |
| Play target API | new apps and updates target API 36 from 31 Aug 2026 | https://developer.android.com/google/play/requirements/target-sdk | VERIFIED |
| Font scale | Android 14+ nonlinear to 200%; Apple: allow at least 200% enlargement, test AX sizes | https://developer.android.com/about/versions/14/features#non-linear-font-scaling ; Apple HIG typography | VERIFIED |
| Frame budget | 16 ms at 60 Hz; slow frame >16 ms; frozen frame >700 ms (diagnostic, no bad-behaviour threshold) | https://developer.android.com/topic/performance/vitals/render | VERIFIED |
| Android core vitals | user-perceived crash 1.09%, ANR 0.47% (overall, 28 days) | https://developer.android.com/topic/performance/vitals | VERIFIED |
| Reduced motion | WCAG 2.3.3 is AAA; honouring it is a Chwezi house MUST | https://www.w3.org/TR/WCAG22/ ; MDN `prefers-reduced-motion` | VERIFIED |
| Web vitals (p75) | LCP <=2.5 s; INP <=200 ms; CLS <=0.1 | https://web.dev/articles/vitals | VERIFIED |
| Currency minor units | UGX 0, RWF 0, KES 2, TZS 2 (CLDR cash digits 0), USD 2 | ISO 4217 List One (SIX, 17 Sep 2026) | VERIFIED |
| Chart time axes and media controls not mirrored in RTL | none read on a primary source | m3.material.io bidirectionality | NOT_ASSESSED (Chwezi SHOULD with native-reader review) |

## The seven-section contract

Each section gives the rule, then the check. "Compact reference viewport" means 360 x 640 dp at
100% text unless the product profile names a different baseline device.

### Visual anatomy and reading order

Rules:
- Reading order is fixed: context (who, where, when) -> the primary decision or action -> the
  evidence for it -> secondary functions.
- One focal point per screen or focused panel: at most one primary-emphasis control
  (PX-INTERACT-004) and at most one next-step accent (PX-COLOUR-004).
- The primary figure or action, with its label, unit and context, is visible without scrolling in
  the compact reference viewport.
- Labels, amounts, dates and actions sit on one alignment grid built from spacing tokens
  (PX-GEOM-001); figures are tabular and right-aligned in columns (PX-TYPE-004, PX-TABLE-002).
- Decoration never sits above or displaces a task control (PX-LAYOUT-006, PX-BLACKLIST-001).

Checks: annotated screenshot names the four reading-order zones; accessibility-tree order matches
visual order (PX-A11Y-002); count of primary-emphasis controls per panel <= 1; first-viewport
screenshot at the compact reference viewport shows the primary element.

### Premium transformation rules

"Premium" means these observable properties, not an adjective:
- Hierarchy carried by the type scale and spacing, not by colour floods or effects. Typefaces come
  from the house style or the typography skills; a framework default face is never the primary
  face (PX-TYPE-007).
- At most one hero surface per screen; gradients only on that surface and never on task screens
  (PX-COLOUR-006); text on it meets contrast at its lightest point.
- Saturated brand colour covers a small share of task screens (SHOULD <= 10% of area,
  PX-COLOUR-003).
- Cards at elevation 0 with hairline or tonal separation; shadow only on floating layers such as
  sheets, dialogs and a floating cart bar (PX-GEOM-006).
- One radius set, one line-icon family and one illustration style per product (PX-GEOM-008); radius
  values come from the house style tokens.
- No repeated labels; secondary detail expands in place rather than adding panels.
- Motion has two classes: state and navigation transitions in the 120-300 ms band; once-per-visit
  summary flourishes only on hub pages, never on operational screens, total <= 1.2 s, off under
  reduced motion (PX-MOTION-001 to 004).

Checks: guardrail lint (no raw colour, size or spacing literals, PX-TOKEN-001); count of shadowed
and gradient surfaces per screen; animation register with a purpose per animation; slop audit of
the theme file.

### Component decomposition

| Region | Required content | Built from | Rule IDs |
|---|---|---|---|
| Header | Module or entity title; active tenant, outlet, branch or property scope; date, period or as-at time; at most one overflow control | App bar / screen header contract | PX-NAV-006, PX-DATA-009 |
| Primary panel | Exactly one highest-priority figure, status or record summary with label, unit, period, freshness and one direct action | KpiCard or summary card contract | PX-DATA-002, PX-INTERACT-004 |
| Secondary panels | 2-4 supporting metrics or task groups | Shared card and list primitives; never custom drawing | PX-ARCH-007, PX-DATA-007 |
| Records | Searchable rows with stable keys, title, metadata, status as text and one deterministic action target | List row / data table contracts | PX-TABLE-002, PX-PERF-004 |
| Feedback | Every state in the canonical set below | State and feedback components | PX-STATE-001, PX-STATE-004, PX-STATE-005 |

Canonical state set (PX-STATE-001), thirteen states with the codes of the unified state table in
[screen-blueprints-a.md](screen-blueprints-a.md): initial loading, content, refreshing, empty (by
cause: nothing yet, no permission, not yet synced), filtered-empty, error with recovery, offline
with cached age, queued change, syncing, conflict, permission-restricted, session expired or
idle-locked, success. States that do not apply are declared N/A with a reason in the screen
contract, never silently omitted; initial loading, content, error and success are never N/A.

Every dashboard element names the question or decision it serves; elements with none are removed
(PX-DATA-007).

### Interaction and state machine

Mutation state machine (applies to every create, edit, payment, approval and void):

| From | Event | To | Shown to the user |
|---|---|---|---|
| draft | submit (online) | processing | Pressed state within the input budget; control disabled |
| draft | submit (offline) | queued | "Saved on this device - not yet sent", queue count |
| queued | connectivity | processing | Syncing indicator with count |
| processing | server acknowledgement | confirmed | Result naming what was saved, with reference and next step (PX-STATE-003) |
| processing | rejection or timeout | failed | What happened, what is still safe, what to do (PX-STATE-005) |
| processing | version clash | conflict | Both versions with who and when; authorised choice (PX-STATE-006) |

Rules:
- Confirmed is shown only after durable server acknowledgement; queued is never shown as confirmed
  (PX-STATE-002, PX-OFFLINE-003).
- Every create and payment carries an idempotency key; double tap, retry and replay produce exactly
  one record (PX-INTERACT-002). Document numbers follow contiguous per-tenant numbering, allocated at
  issue; offline documents carry a provisional tag (PX-DATA-013).
- Input acknowledgement p95 <= 100 ms on the baseline device, measured apart from server
  completion (PX-INTERACT-001, SHOULD target). No indefinite spinner: every wait has a timeout and
  a recovery path (PX-INTERACT-003).
- Confirmation only where money, health, privacy or irreversible state is at stake
  (PX-INTERACT-008); it names the item, consequence and reversibility (PX-DESTRUCT-001). Reversible
  changes get undo instead. Voids and overrides record actor, time and reason (PX-DESTRUCT-003).
- Long-press only for discoverable shortcuts with a visible alternative; every drag has a single
  tap alternative (PX-A11Y-008).
- Back: Android uses `BackHandler` / `PredictiveBackHandler` with no business logic in
  `onBackPressed`; back is blocked only to confirm discarding unsaved data. iOS edge swipe and web
  browser back behave the same (PX-NAV-003). Scroll position, selection and input survive back,
  rotation, resize and process death (PX-NAV-002, PX-INTERACT-006).
- Keyboard: logical focus order, focus never hidden by sticky bars, sheets or the soft keyboard
  (PX-A11Y-003, PX-A11Y-007); status changes announced without moving focus (PX-A11Y-012).

### Adaptive layout contract

Switch on window size class and task, never on device model or "phone/tablet" flags.

| Width class | Navigation | Content | Filters and detail | Completion controls |
|---|---|---|---|---|
| Compact (<600 dp) | Bottom bar, 3-5 destinations, or a single back action in focused tasks | One column; records open as destinations | Filters in a bottom sheet | Sticky bar only for the primary completion action; never covered by the keyboard (PX-FORM-005) |
| Medium (600-839 dp) | Navigation rail | Two panes where content supports; selected record persists | Filter row or side sheet | Inline in the detail pane |
| Expanded (840-1199 dp) | Rail or sidebar | List-detail, multi-column widgets, sortable tables | Persistent filter bar; optional context panel | Inline |
| Large / extra-large (>=1200 dp, opt-in) | Persistent labelled sidebar, global search | Tables, utility panel, configurable grids | Context pane | Inline; keyboard shortcuts (PX-INTERACT-017) |

Rules:
- Height compact (<480 dp, e.g. phone landscape or tablet with keyboard) collapses headers and
  keeps the primary action reachable.
- Play-distributed Android apps at targetSdk 36 cannot lock orientation at smallest width >= 600 dp:
  portrait-only POS or tablet layouts must adapt (PX-LAYOUT-002).
- Edge-to-edge: every screen handles system bar and cut-out insets (PX-GEOM-002).
- Web: reflow without horizontal page scroll at 320 CSS px and usable at 200% zoom; dense tables
  may scroll horizontally inside their own region with a frozen identifier column.
- At 200% text, multi-column card grids reduce columns rather than clip (PX-TYPE-002).

Checks: screenshot at each shipped class; rotate, resize and fold mid-task with no loss of
selection or input.

### Low-end Android and accessibility

Performance (PX-PERF-001 to 008):
- The product declares its baseline device (model, RAM, API, screen) and budgets measured on it with
  a realistic dataset; emulator-only evidence does not pass.
- Forbidden on task screens: live backdrop blur, looping or perpetually animating gauges and charts,
  nested scrolling on the same axis, per-row shadows, full-resolution images in lists.
- Required: lazy lists with stable keys; images decoded at display size; vectors cached; scoped
  state updates; paged long records; charts down-sampled to visible points.
- Frame target: no frozen frames (>700 ms) on core tasks; slow-frame share recorded against the
  16 ms budget at 60 Hz. Crash and ANR rates are tracked against Play's core vitals (1.09% and 0.47%)
  with Chwezi SLOs set stricter per product (PX-PERF-013).
- Analytics, media or marketing failures never block a core task (PX-PERF-008); large media waits
  for Wi-Fi or consent on metered networks (PX-PERF-011).

Accessibility (PX-A11Y-001 to 012, PX-COLOUR-001/002, PX-GEOM-005):
- Contrast 4.5:1 text, 3:1 large text and non-text, in light and dark; outdoor field and workshop
  screens offer a high-contrast light theme with body text >= 7:1 (PX-COLOUR-007).
- Touch targets 48x48 dp (Android) and 44x44 pt (iOS) on the hit area; 56 dp for glove, field and
  POS keypad contexts (PX-INTERACT-018); web 24x24 CSS px floor and 44 px on touch-primary screens.
- Text survives 200% scale on Android, at least 200% and the largest AX size on iOS, 200% zoom on web
  (PX-TYPE-005); nothing essential clips.
- Colour is never the only signal (PX-COLOUR-002); every icon-only control has a name; charts have a
  text summary or table (PX-A11Y-005).
- Reduced motion removes non-essential motion and shows the end state at once (house MUST,
  PX-MOTION-002).
- RTL: directional controls and navigation mirror; numbers, logos, and real-world objects do not;
  numbers and codes inside text are bidi-isolated (PX-L10N-003, PX-L10N-008).

### Agent acceptance evidence

Every dossier implementation attaches an evidence pack. Each item carries an evidence class:
MEASURED, HEURISTIC or NOT_ASSESSED (PX-QA-012). Hard-gate items need MEASURED.

| Evidence | Minimum content | Rule IDs |
|---|---|---|
| Screenshot matrix | Compact phone, tablet portrait and landscape, desktop or web where shipped; light and dark; 100% and 200% text; longest supported language and Arabic RTL | PX-LAYOUT-004, PX-L10N-002 |
| State set | One screenshot per applicable canonical state, N/A states listed | PX-STATE-001 |
| Before and after | Same viewports before and after the change | PX-QA-009 |
| Primary task test | Automated UI test of the dossier's primary task, including double-submit and offline interruption | PX-QA-002, PX-INTERACT-002 |
| Screen reader | Logged TalkBack and VoiceOver (and a desktop reader for web) pass of the primary task | PX-A11Y-002 |
| Keyboard | Focus map and keyboard-only pass | PX-A11Y-003 |
| Device trace | Cold start, transition and scroll trace on the named baseline device | PX-PERF-002 |
| Data trust | Reconciliation of every figure against its authoritative source; label-versus-backend audit | PX-DATA-004, PX-STATE-002 |
| Permissions | Backend denial test with a low-role token | PX-PRIV-001 |
| Deviations | A DDR for every departure from this contract or the dossier | PX-QA-005 |
| Verification | Review by someone other than the implementer | PX-QA-006 |

Checks that could not be run are reported NOT_ASSESSED, never as passed (PX-AGENT-008).

## Dossier entry fields

Each dossier under `## PD-NN — <neutral title>` gives: Family; Archetype (written `AR-NN Name`, a
secondary archetype joined with ` + `, exactly as in the index below); Pattern; Primary task and success
metric; Anatomy (specific regions and fields); Domain states; Kaizen corrections (what the
reference got wrong and the fix); Adaptive behaviour (only what differs from the adaptive layout contract above); East
African context; Chwezi application; Acceptance tests (3-5, measurable, Given/When/Then where
useful); Rule IDs.

## Archetype kit (corrected)

The source assigned archetypes by rotating through eight names in order, not by meaning, so many
pairings were wrong (an approval queue labelled "welcome", a rent dashboard labelled "analytics").
Archetypes below are assigned by what the user does on the screen. Six archetypes were added for
patterns the original eight could not describe.

| # | Archetype | Anatomy | Upgrade rule |
|---|---|---|---|
| AR-01 | Welcome / discovery | Restrained masthead, headline, one primary action, one dominant feature area | Imagery only when it aids recognition; primary action always visible |
| AR-02 | Operational dashboard | Context header, one dominant metric or status card, supporting metrics, quick actions, recent activity | Urgent actions above charts; every metric has unit and period; freshness shown |
| AR-03 | Record catalogue | Search and filters, category controls, scannable rows or cards, detail entry | Fixed-ratio thumbnails, readable names, predictable action positions, cause-specific empty states |
| AR-04 | Analytics workspace | Period control, 2-4 KPIs, primary trend, secondary breakdown, underlying records | Zero baselines, units, sample sizes or denominators, text summary |
| AR-05 | Workflow queue | Status overview, priority-filtered records, actor and date metadata, explicit next actions | Keep provenance; confirm consequential state changes; actor recorded |
| AR-06 | Enterprise command centre | Persistent navigation, global search, KPI strip, analytical content, utility panels | Role-specific priority; secondary content collapses; bounded panel count |
| AR-07 | Scheduling workspace | Date controls, agenda or calendar, status-marked entries, upcoming tasks, detail | Time zone explicit, conflict detection, non-colour status |
| AR-08 | Financial control | Prominent amount with as-at, comparison, transaction history, category split, drill-down | Currency precision per ISO 4217, codes where several currencies, auditable provenance |
| AR-09 | Transaction / checkout (new) | Basket or order lines, persistent total, tender selection, confirmation, receipt | One-step-at-a-time payment state model; idempotent submit; no decoration in the payment path |
| AR-10 | Pipeline / stage board (new) | Stage columns or stage list with counts, cards, blocked markers, stage rules | Count definitions shown; blocked reasons in text; stage moves audited; compact turns board into list |
| AR-11 | Capture / field form (new) | Camera or scan capture, minimal fields, location only if permitted, offline queue | Capture separate from information panels; compressed media; durable local save |
| AR-12 | Dense data table (new) | Column chooser, frozen identifier column, sort, filter, saved views, bulk actions | Virtualised rows; keyboard-accessible horizontal overflow; per-item bulk results |
| AR-13 | Module launcher (new) | Grid or list of entitled modules with labels, recents, pending counts | Only entitled modules; text labels on icons; decorative connectors never navigate |
| AR-14 | Detail record (new) | Identity and status block, key facts, activity timeline, related records, actions | Status in text, separate from imagery; facts separated from marketing copy |

PD-46 is a verification set, not a UI archetype.

## Pattern families

| Family | One-line description | Lead Chwezi product |
|---|---|---|
| F1 Field and farm operations | Outdoor, offline-first capture, monitoring and reminders for crops, livestock and equipment | Farm Acre |
| F2 Catalogue and storefront | Finding, comparing and selling items, and the owner's view of sales | Maduuka (SpannaMax for parts) |
| F3 Money control and finance | Balances, budgets, goals, comparisons and project funds with exact, auditable figures | Maduuka, Aqar |
| F4 Property and community | Estates, rent, occupancy, work orders and listings | Aqar |
| F5 People operations and HR | Staff homes, directories, workforce metrics and personal schedules | All products (back office) |
| F6 Pipelines and registers | Records that move through stages or sit in large filterable registers | All products |
| F7 Clinical and care | Appointments, patient queues, ward boards and hospital overviews with privacy and triage | Medic8 |
| F8 Logistics and stock | Shipments, warehouse stock and freight volumes | Maduuka, SpannaMax |
| F9 Order and kitchen operations | Kitchen tickets, order desks and menu performance | Maduuka (restaurant, hotel) |
| F10 Education and learning | Student portals, lesson planning, exams, courses and cross-device consistency | Education/LMS |
| F11 Workspace shell and approvals | Admin shells, document libraries and approval queues | All products |

## Dossier index

| ID | Neutral title | Family | Archetype | Primary Chwezi product | File |
|---|---|---|---|---|---|
| PD-01 | Living-asset care guide with photo capture | F1 | AR-11 Capture / field form + AR-01 Welcome / discovery | Farm Acre | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-02 | Field task tracker with due and overdue states | F1 | AR-05 Workflow queue | Farm Acre | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-03 | Controlled-environment sensor monitor | F1 | AR-02 Operational dashboard | Farm Acre | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-04 | Heavy-equipment catalogue and spec comparison | F2 | AR-03 Record catalogue | SpannaMax, Maduuka | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-05 | Agricultural investment listings with risk disclosure | F3 | AR-03 Record catalogue + AR-08 Financial control | Farm Acre | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-06 | Recurring meal-plan selection and checkout | F2 | AR-09 Transaction / checkout | Maduuka (hotel, restaurant) | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-07 | Grocery basket and fast checkout | F2 | AR-09 Transaction / checkout | Maduuka | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-08 | High-contrast care-reminder list (treatment and feeding schedules) | F1 | AR-07 Scheduling workspace | Farm Acre | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-09 | Regulated-product catalogue with claim control | F2 | AR-03 Record catalogue | Maduuka (pharmacy), Medic8 | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-10 | Irrigation monitoring with guarded remote control | F1 | AR-02 Operational dashboard | Farm Acre | [pattern-dossiers-01-10.md](pattern-dossiers-01-10.md) |
| PD-11 | Residential community operations dashboard | F4 | AR-06 Enterprise command centre | Aqar | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-12 | Role-aware HR home with bounded shortcuts | F5 | AR-13 Module launcher | All products | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-13 | Cross-platform student self-service portal | F10 | AR-02 Operational dashboard | Education/LMS | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-14 | Account balance and transaction history | F3 | AR-08 Financial control | Maduuka, Aqar | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-15 | Category budget tracker with honest percentages | F3 | AR-08 Financial control | All products | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-16 | Wellness services and appointment hub | F7 | AR-07 Scheduling workspace | Medic8 | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-17 | Savings-goal tracker with restrained hero surface | F3 | AR-08 Financial control | Maduuka (owner) | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-18 | Period-over-period spending comparison | F3 | AR-04 Analytics workspace | All products | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-19 | Clinician appointment booking with live availability | F7 | AR-07 Scheduling workspace + AR-09 Transaction / checkout | Medic8 | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-20 | Module launcher and entitlement-aware feature map | F4 | AR-13 Module launcher | All products | [pattern-dossiers-11-20.md](pattern-dossiers-11-20.md) |
| PD-21 | Shipment offer comparison and route timeline | F8 | AR-05 Workflow queue | Maduuka (distribution) | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-22 | High-volume kitchen ticket board | F9 | AR-05 Workflow queue | Maduuka (restaurant) | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-23 | Order desk with role-limited payment actions | F9 | AR-05 Workflow queue + AR-09 Transaction / checkout | Maduuka | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-24 | Stage-matrix pipeline with blocked-state reasons | F6 | AR-10 Pipeline / stage board | All products | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-25 | Privacy-aware staff directory (grid and list) | F5 | AR-03 Record catalogue | All products | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-26 | Workforce KPI widgets with explicit units | F5 | AR-04 Analytics workspace | All products | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-27 | Sales pipeline separating forecast from realised revenue | F6 | AR-10 Pipeline / stage board + AR-04 Analytics workspace | All products | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-28 | Admin workspace shell anatomy | F11 | AR-06 Enterprise command centre | All products | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-29 | Integrated HR suite (calendar, payroll, people) | F5 | AR-06 Enterprise command centre | All products | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-30 | Restaurant sales and menu-item performance analytics | F9 | AR-04 Analytics workspace | Maduuka | [pattern-dossiers-21-30.md](pattern-dossiers-21-30.md) |
| PD-31 | Teacher lesson planner with calendar rail | F10 | AR-07 Scheduling workspace | Education/LMS | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-32 | Shared document library with sync and permission states | F11 | AR-12 Dense data table | All products | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-33 | Financial KPI dashboard with contrast-safe tiles | F3 | AR-04 Analytics workspace + AR-08 Financial control | Maduuka, Aqar | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-34 | Recruitment funnel metrics (narrow-screen safe) | F6 | AR-10 Pipeline / stage board + AR-04 Analytics workspace | All products | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-35 | Clinical patient queue with textual triage severity | F7 | AR-05 Workflow queue | Medic8 | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-36 | Ward shift and care-progress board | F7 | AR-02 Operational dashboard | Medic8 | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-37 | Hospital operations overview with privacy-bounded assistant | F7 | AR-06 Enterprise command centre | Medic8 | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-38 | Warehouse stock table with threshold-driven reorder | F8 | AR-12 Dense data table + AR-02 Operational dashboard | Maduuka, SpannaMax | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-39 | Dense contract register with column management | F6 | AR-12 Dense data table | All products | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-40 | People metrics with explicit denominators | F5 | AR-04 Analytics workspace | All products | [pattern-dossiers-31-40.md](pattern-dossiers-31-40.md) |
| PD-41 | Leave and expense approval queue | F11 | AR-05 Workflow queue | All products | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-42 | Mobile shop-owner sales summary | F2 | AR-02 Operational dashboard | Maduuka | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-43 | Mobile freight volume statistics | F8 | AR-04 Analytics workspace | Maduuka (distribution) | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-44 | Property portfolio rent and work-order control | F4 | AR-02 Operational dashboard + AR-08 Financial control | Aqar | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-45 | Property listing detail with viewings and offers | F4 | AR-14 Detail record + AR-07 Scheduling workspace | Aqar | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-46 | Cross-form-factor consistency verification set | F10 | None (verification set) | All products | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-47 | Exam and question-performance analytics | F10 | AR-04 Analytics workspace | Education/LMS | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-48 | Course catalogue with learner progress | F10 | AR-03 Record catalogue | Education/LMS | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-49 | Personal schedule and focus-time planner (non-surveillant) | F5 | AR-07 Scheduling workspace | All products | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |
| PD-50 | Construction project budget and draw-stage control | F3 | AR-08 Financial control | SpannaMax (projects) | [pattern-dossiers-41-50.md](pattern-dossiers-41-50.md) |

## Keeping near-duplicates distinct

- PD-13 is the student portal pattern; PD-46 is the protocol that proves it behaves the same on
  every form factor.
- PD-11 is a community operations dashboard; PD-20 is the entitlement-governed launcher and absorbs
  the shortcut-proliferation lesson, so PD-12 covers only the role-aware HR home.
- PD-24 is the stage board; PD-39 is the canonical dense table that PD-32 and PD-38 reference.
- PD-01 is capture-first identification; PD-08 is the treatment and feeding reminder list.
- PD-14 owns ledger-true balances, PD-17 hero restraint, PD-18 period maths, PD-33 tile contrast.
- PD-22 is kitchen throughput; PD-23 is cashier payment safety.
- PD-26 owns units; PD-40 owns denominators.
- PD-34 is narrow-screen funnel metrics, PD-24 the board, PD-27 money in a pipeline.
- PD-06 is recurring selection; PD-07 is one-off basket checkout.
