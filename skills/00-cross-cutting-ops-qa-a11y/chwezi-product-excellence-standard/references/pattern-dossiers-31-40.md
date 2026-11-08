Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Shared contract: [pattern-dossier-contract.md](pattern-dossier-contract.md)

# Pattern dossiers PD-31 to PD-40

Each dossier lists only what is specific to its pattern. A value tagged "proposed" is proposed (owner to confirm): a Chwezi starting value, calibrated
on the product's baseline device, that may be changed only through a DDR until the owner confirms it. Platform values cite rows in
[currentness-register.md](currentness-register.md). PD-39 is the canonical dense-table dossier;
PD-32 and PD-38 reuse its mechanics and add only their own columns and states.

## PD-31 — Teacher lesson planner with calendar rail

- **Family:** F10 Education and learning.
- **Archetype:** AR-07 Scheduling workspace.
- **Pattern:** Three zones give the teaching day a shape: a dark navigation rail, today's lessons in the
  centre, and the week's calendar on the right.
- **Primary task and success metric:** A teacher prepares today's lessons and records whether each was
  taught. Metric: today's lessons appear without scrolling on the first screen; marking a lesson taught,
  with an optional note, takes 2 taps or fewer.
- **Anatomy (priority order):**
  1. Day header: date, term and week number, school or campus.
  2. Today's lessons in period order: time, class and stream, subject, topic, plan status, materials.
  3. Lesson detail: objectives, materials, homework, link to the class register.
  4. Calendar rail: week view with exams, events and timetable clashes.
  5. Navigation rail: icon plus visible text label for every destination.
- **Domain states:** unplanned; planned; materials missing; taught; not taught (reason); substitute
  assigned; timetable clash; term closed (read-only); plan saved on device awaiting sync.
- **Kaizen corrections:** Source asked for higher secondary-text contrast. Upgraded: muted text on the
  dark rail and on light content measures at least 4.5:1 in both themes (currentness A3). Added: rail
  labels never collapse to icons alone, and tooltips are never the only label; a clash is stated in
  words naming the other class; plans are editable offline.
- **Adaptive behaviour:** Compact: today's list only; the calendar is a separate tab and the rail
  becomes a bottom bar. Medium: lesson list with detail pane; the week shrinks to a strip above the
  list. Expanded: rail, lessons and calendar panel together.
- **East African context:** Large classes split into streams; three-term school years; staff-room
  computers shared between teachers; frequent power cuts that make offline planning essential.
- **Chwezi application:** Education/LMS teacher home (lesson plan and register entry points).
- **Acceptance tests:**
  1. Given both themes, then measured secondary-text contrast on the rail is at least 4.5:1.
  2. Given every rail destination, then a visible text label is present at all widths.
  3. Given a double-booked room, then the lesson reads "Clash: S2 East is also booked here".
  4. Given airplane mode, when a lesson is marked taught, then it shows queued and syncs later with the
     original time.
- **Rule IDs:** PX-COLOUR-001, PX-TYPE-003, PX-A11Y-001, PX-NAV-001, PX-OFFLINE-002, PX-L10N-006,
  PX-PROFILE-008.

## PD-32 — Shared document library with sync and permission states

- **Family:** F11 Workspace shell and approvals.
- **Archetype:** AR-12 Dense data table.
- **Pattern:** Quick-access folders above a file table let people jump to recent or shared work without
  browsing a tree.
- **Primary task and success metric:** Upload, find and share a document with the right people.
  Metric: each file shows its own transfer state; every sharing change is confirmed and audited; a
  large upload resumes after a dropped connection instead of restarting.
- **Anatomy (priority order):**
  1. Search plus quick folders: recent, shared with me, by linked record type.
  2. File table: name, type, owner, linked record, modified, size, sync state word, access level.
  3. Upload tray: per-file progress, queued, waiting for Wi-Fi, failed with retry.
  4. Preview pane; restricted files carry a viewer watermark.
  5. Share dialog: people or roles, access level, link expiry.
- **Domain states:** uploading with percentage; queued offline; waiting for Wi-Fi; failed (reason,
  retry); checksum mismatch; sync conflict (two versions); view-only; no access (request path); link
  expired; in bin (restorable until a stated date).
- **Kaizen corrections:** Source asked for permission, sync, upload and bulk states. Upgraded: each is a
  named state with its own word and recovery action. Added: chunked resumable uploads with checksum
  verification; uploads above a size threshold wait for Wi-Fi or explicit consent on metered data;
  location metadata stripped from photos; revoked users lose access at their next request; bulk actions
  report results per item.
- **Adaptive behaviour:** Compact: list rows with name, state word and overflow menu; tray as a bottom
  sheet; preview full screen; drag-and-drop absent, upload by button. Medium: list with preview pane.
  Expanded: table, preview and details panel; drag-and-drop with a button alternative.
- **East African context:** Data is costly, so files never auto-download in full. Paper originals (land
  titles, IDs, receipts) are captured by phone camera, compressed before queueing. Low phone storage is
  routine, so caches are capped and visible.
- **Chwezi application:** Aqar lease and title documents; Medic8 patient documents under PHI rules;
  SpannaMax vehicle papers and inspection photos.
- **Acceptance tests:**
  1. Given a 20 MB upload interrupted at 60%, when the network returns, then it resumes from the last
     confirmed chunk.
  2. Given a bulk move of 10 files with 2 failures, then each failure is listed with its reason.
  3. Given a metered connection, then an upload above the threshold waits with "Upload now" offered.
  4. Given a revoked user, then the next file request is denied by the server.
  5. Given a completed download, then its hash equals the stored hash.
- **Rule IDs:** PX-PERF-011, PX-OFFLINE-001, PX-OFFLINE-005, PX-STATE-006, PX-PRIV-001,
  PX-DESTRUCT-001, PX-A11Y-008, PX-TABLE-001.

## PD-33 — Financial KPI dashboard with contrast-safe tiles

- **Family:** F3 Money control and finance. Tile contrast and number formatting only; balances are
  PD-14, goals PD-17, period comparison PD-18.
- **Archetype:** AR-04 Analytics workspace + AR-08 Financial control.
- **Pattern:** Soft-tinted KPI tiles above a line chart and a small composition chart make a finance
  overview approachable for owners who are not accountants.
- **Primary task and success metric:** An owner reads today's position: cash, receivables, payables and
  profit to date. Metric: every label and value pair passes measured contrast in light and dark; every
  amount uses the currency's ISO 4217 precision and tabular figures.
- **Anatomy (priority order):**
  1. Scope header: entity or branch, currency, as-of time.
  2. KpiCards (four or fewer): cash across bank, till and mobile money float; receivables; payables;
     profit to date; each with unit, period and a delta in words.
  3. Cash trend line.
  4. Expense composition: donut only for five or fewer categories, otherwise bars.
  5. Drill-down list behind each tile.
- **Domain states:** period not closed (provisional); mobile money unreconciled; stale since last sync;
  negative value (loss or overdraft); figure restricted by role; several currencies in scope.
- **Kaizen corrections:** Source asked to fix low-contrast KPI text. Upgraded: tile tints come from
  container tokens with measured on-container text, never pastel-on-pastel. Added: category tints mark a
  small swatch, not the text background; a loss shows a minus sign and the word "loss", not red alone;
  compact amounts ("UGX 1.2bn") reveal the exact amount on tap and to assistive tech; "Provisional"
  shows until the period is closed.
- **Adaptive behaviour:** Compact: 2 x 2 tiles with compact amounts, one chart at a time. Medium: tiles
  in one row with the trend beneath. Expanded: tiles, both charts and a receivables ageing table.
- **East African context:** UGX has 0 minor units and RWF 0; KES and TZS have 2 (currentness C1).
  Owners commonly check figures on a phone outdoors, and mobile money float is treated as cash.
- **Chwezi application:** Maduuka owner home, "Money" tab; Aqar finance overview.
- **Acceptance tests:**
  1. Given each tile in both themes, then value and label contrast measure at least 4.5:1.
  2. Given a UGX tenant, then no amount shows decimals; given a KES tenant, then two decimals show.
  3. Given the composition chart, then each slice's value appears in the legend and the text summary.
  4. Given a compact amount, then the screen reader reads the exact figure with the currency name.
- **Rule IDs:** PX-COLOUR-001, PX-TOKEN-003, PX-L10N-001, PX-DATA-002, PX-DATA-005, PX-DATA-011,
  PX-TYPE-004, PX-VIZ-002.

## PD-34 — Recruitment funnel metrics (narrow-screen safe)

- **Family:** F6 Pipelines and registers. The metric summary only; the working board is PD-24.
- **Archetype:** AR-10 Pipeline / stage board + AR-04 Analytics workspace.
- **Pattern:** A few large figures and horizontal funnel bars tell a hiring manager in seconds how many
  applicants reached each step.
- **Primary task and success metric:** See conversion between stages and where candidates drop out.
  Metric: at compact width the screen is one column with no horizontal scroll; every conversion is
  shown as "x of y" with its percentage.
- **Anatomy (priority order):**
  1. Vacancy and period selector.
  2. Three headline figures at most: applications, interviews, offers accepted.
  3. Funnel bars from a zero baseline, count and step conversion per stage.
  4. Median days in each stage (medians, not means, because a few stalled files skew means).
  5. Recent applicants, each linking into the PD-24 board.
- **Domain states:** too few applicants to compare (flagged); vacancy closed; period partial;
  application source unknown.
- **Kaizen corrections:** Source asked to avoid desktop density on narrow screens. Upgraded: content
  priority decides what moves to "More" at compact width instead of everything shrinking. Added: bars,
  not trapezoid funnels, so lengths stay proportional; denominators always visible; small samples
  labelled rather than shown as confident percentages.
- **Adaptive behaviour:** Compact: headline figures stacked, full-width bars with labels above each
  bar, applicants listed below; no table appears under 600 dp. Medium: figures in a row beside the
  funnel. Expanded: funnel, application-source table and applicant list.
- **East African context:** Public and graduate vacancies attract very high volumes, often submitted by
  phone; equal-opportunity reporting may be required by funders.
- **Chwezi application:** Back-office recruitment for Medic8 facilities and multi-outlet Maduuka tenants.
- **Acceptance tests:**
  1. Given 360 dp width at 200% text, then there is no horizontal scroll and no clipped label.
  2. Given every conversion figure, then the numerator and denominator are displayed.
  3. Given a stage with fewer than 10 candidates (proposed), then it reads "Too few to compare".
  4. Given the chart configuration, then the bar axis starts at zero.
- **Rule IDs:** PX-LAYOUT-001, PX-LAYOUT-002, PX-TYPE-002, PX-DATA-003, PX-VIZ-005, PX-A11Y-005.

## PD-35 — Clinical patient queue with textual triage severity

- **Family:** F7 Clinical and care.
- **Archetype:** AR-05 Workflow queue.
- **Pattern:** One queue grouped by urgency, with counts per group and clinical shortcuts, lets staff
  see who waits and who is most urgent.
- **Primary task and success metric:** Call the next patient by clinical priority. Metric: next patient
  identified in under 3 s (proposed five-second test); severity readable as a word; every severity
  change stores actor, time and reason.
- **Anatomy (priority order):**
  1. Clinic header: department, clinician on duty, privacy-mode switch.
  2. Priority groups using the facility's configured triage scale.
  3. Patient row: two identifiers, ticket, waiting time, latest observations with their time, severity
     word and icon, assigned clinician.
  4. "Call next" action.
  5. Counts per priority group.
- **Domain states:** emergency; urgent; routine (facility labels); waiting beyond threshold;
  observations stale; re-triaged up or down; called; in consultation; left without being seen;
  transferred; data masked by role; empty queue stated with time, never "all clear".
- **Kaizen corrections:** Source required textual severity and audit provenance. Upgraded: severity is
  carried by word, icon and group position together; re-triage records reason and actor. Added: wall
  displays show initials and ticket only; two identifiers are confirmed before any action; the shared
  tablet locks after 5 min idle (owner default, 2026-11-07) keeping its place; a patient waiting past
  the threshold prompts re-assessment.
- **Adaptive behaviour:** Compact: grouped list, row expands in place. Medium: queue beside a patient
  summary. Expanded: queue, summary and context panel. Wall-display mode: large type, no names or
  diagnoses, no controls.
- **East African context:** Outpatient volumes are high and tablets are shared between shifts.
  Outages are common, so the queue keeps working offline. Call-outs may need several languages on
  display and audio.
- **Chwezi application:** Medic8 outpatient and casualty queue.
- **Acceptance tests:**
  1. Given a greyscale screenshot, then every priority group is distinguishable.
  2. Given a screen reader, then reading order equals priority order.
  3. Given wall-display mode, then no full name or diagnosis is present in the rendered tree.
  4. Given a re-triage, then saving without a reason is impossible and the audit names the actor.
  5. Given 5 min idle, then the device locks and returns to the same queue position after sign-in.
- **Rule IDs:** PX-PROFILE-003, PX-PROFILE-004, PX-DATA-006, PX-COLOUR-002, PX-PRIV-002,
  PX-PRIV-008, PX-PRIV-011, PX-OFFLINE-004, PX-VIZ-004.

## PD-36 — Ward shift and care-progress board

- **Family:** F7 Clinical and care.
- **Archetype:** AR-02 Operational dashboard.
- **Pattern:** Care progress per patient, clinician availability and shift panels on one board give a
  ward a shared picture of what is done and what is still owed.
- **Primary task and success metric:** Hand over a shift so the incoming nurse knows what is
  outstanding for each patient. Metric: outstanding tasks per bed visible on the board; handover
  completes only when the incoming nurse acknowledges it under their own sign-in.
- **Anatomy (priority order):**
  1. Ward header: shift times, nurse in charge, beds occupied of total.
  2. Bed list: bed, patient identifiers, tasks outstanding as "4 of 6 done", risk flags as words.
  3. Due-now panel: medications and observations due in the window, overdue first.
  4. Structured handover note per patient (situation, background, assessment, recommendation).
  5. On-call clinicians: name, contact route, available until.
- **Domain states:** due; overdue; done; not done (refused, off ward, unavailable stock); discharged;
  transferred; handover awaiting acknowledgement; acknowledged; clinician unavailable.
- **Kaizen corrections:** Source required every visualisation to be clinically interpretable. Upgraded:
  progress rings are removed; progress is counted text with a legend for every icon. Added: overdue
  medication sorts first; night shifts get a dark theme whose critical colours are re-measured; each
  handover note carries author and time; a printable handover sheet exists for downtime.
- **Adaptive behaviour:** Compact (nurse phone): "My patients" with due-now first. Medium (ward
  tablet): bed grid beside the due panel. Expanded or wall: whole-ward board in privacy mode (bed
  number and initials).
- **East African context:** High nurse-to-patient ratios and a part-paper workflow make a downtime
  print essential; the ward tablet is shared, switched by PIN.
- **Chwezi application:** Medic8 inpatient ward board and handover screen.
- **Acceptance tests:**
  1. Given any indicator on the board, then it has a legend and a numeric or word value.
  2. Given a handover, then it cannot complete without the incoming nurse's acknowledgement.
  3. Given dark theme, then critical status colours measure at least 3:1 against their surface.
  4. Given a 40-bed ward on the baseline tablet, then a scroll trace is recorded within budget.
- **Rule IDs:** PX-DATA-006, PX-VIZ-002, PX-VIZ-004, PX-COLOUR-008, PX-PRIV-008, PX-PRIV-011,
  PX-PERF-002.

## PD-37 — Hospital operations overview with privacy-bounded assistant

- **Family:** F7 Clinical and care.
- **Archetype:** AR-06 Enterprise command centre.
- **Pattern:** Search, appointments, queue load, alerts and an assistant sit on one overview so a
  hospital manager can scan the whole facility.
- **Primary task and success metric:** See department load and alerts, then act. Metric: five primary
  panels or fewer per role; patient identity masked by default; no assistant suggestion changes a
  record without explicit confirmation.
- **Anatomy (priority order):**
  1. Header: facility, role-gated patient search, date.
  2. Load panel: waiting count per department, bed occupancy.
  3. Alerts ordered by severity, due time and owner, each linking to its record.
  4. Today's appointments and theatre list (counts, not names, by default).
  5. Assistant panel: cards labelled "Suggestion", citing their source records, accept or dismiss.
- **Domain states:** assistant unavailable offline; assistant low confidence (stated); alert
  acknowledged; alert resolved; patient identity revealed (time-boxed, audited); department data stale.
- **Kaizen corrections:** Source asked to prevent sensitive overexposure and dashboard overload.
  Upgraded: each role has a registered panel set; names show only after a permitted reveal with a
  reason. Added: the assistant never diagnoses or prescribes; its output always carries "Suggestion"
  and its sources; failure of the assistant never blocks the rest of the overview.
- **Adaptive behaviour:** Compact: alerts, then load counts; assistant behind a button. Medium: two
  columns. Expanded: three columns with a context panel for the selected alert.
- **East African context:** Referral hospitals run near capacity; patient data protection duties apply
  (statute detail: currentness NOT_ASSESSED); assistant calls cost data, so they run on request only.
- **Chwezi application:** Medic8 administrator and department-head overview.
- **Acceptance tests:**
  1. Given a nurse role, then the overview renders no patient names until a reveal.
  2. Given a reveal, then an audit entry stores user, reason and time.
  3. Given an assistant suggestion, then no record changes until the user confirms.
  4. Given airplane mode, then the assistant reads "Unavailable offline" and other panels still work.
- **Rule IDs:** PX-PRIV-002, PX-PRIV-011, PX-DATA-006, PX-DATA-007, PX-VIZ-004, PX-NAV-005,
  PX-PERF-008, PX-INTERACT-008.

## PD-38 — Warehouse stock table with threshold-driven reorder

- **Family:** F8 Logistics and stock.
- **Archetype:** AR-12 Dense data table + AR-02 Operational dashboard.
- **Pattern:** A stock table, a movement chart for the selected item and alert counts let a storekeeper
  move from "something is low" to "this is what to order".
- **Primary task and success metric:** Reorder low-stock items. Metric: low-stock row to purchase-order
  draft in 2 taps or fewer; the reorder point appears beside every alert.
- **Anatomy (priority order):**
  1. Warehouse or branch selector, as-of time.
  2. Alert strip: below reorder point, stockouts, batches near expiry; each opens the filtered table.
  3. Stock columns: item, code, on hand, reserved, available, in transit, reorder point, suggested
     quantity, unit, last movement.
  4. Movement chart for the selected item.
  5. Reorder action: purchase-order draft prefilled with supplier, unit and suggested quantity.
- **Domain states:** below reorder point (threshold shown); stockout; negative stock (flagged as a
  data problem); on order; in transit; count in progress (movements frozen); batch near expiry; unit
  mismatch between purchase and sale.
- **Kaizen corrections:** Source asked for direct, threshold-specific low-stock actions. Upgraded: the
  reorder point is a visible column and the suggestion rule is stated. Added: available equals on hand
  minus reserved; in-transit stock is shown but not available; the order number is allocated at issue;
  negative stock is flagged, never hidden; pack and piece units are explicit; a transfer from another
  branch is offered when that branch has surplus.
- **Adaptive behaviour:** Compact: alert-filtered cards showing available against reorder point with a
  Reorder button. Medium: table with frozen item column. Expanded: table, movement chart and supplier panel.
- **East African context:** Imported goods have long lead times and seasonal demand; pack sizes vary by
  supplier; costs are in UGX with occasional USD purchases.
- **Chwezi application:** Maduuka inventory "Low stock" view; SpannaMax parts store.
- **Acceptance tests:**
  1. Given any low-stock alert, then its reorder point is shown in the same row.
  2. Given an alert row, then a prefilled order draft opens within 2 taps.
  3. Given an order draft, then it has no number until issued.
  4. Given the fixture, then available excludes reserved and in-transit quantities.
- **Rule IDs:** PX-DATA-004, PX-DATA-013, PX-TABLE-001, PX-TABLE-002, PX-VIZ-004, PX-NAV-005,
  PX-INTERACT-005.

## PD-39 — Dense contract register with column management

- **Family:** F6 Pipelines and registers. Canonical table dossier for PD-21, PD-32 and PD-38.
- **Archetype:** AR-12 Dense data table.
- **Pattern:** Advanced filters, a dense table and a create menu make a register searchable by people
  who manage hundreds of records daily.
- **Primary task and success metric:** Find and filter contracts and act on those expiring. Metric:
  column chooser, frozen identifier column and per-user saved views exist; horizontal overflow is
  operable by keyboard.
- **Anatomy (priority order):**
  1. Saved-view tabs (All, Expiring in 90 days, Mine) and the create menu.
  2. Filter bar: applied count, chips, clear all.
  3. Table: frozen identifier column, sticky header, sortable columns, right-aligned tabular numbers,
     status word.
  4. Column management: show or hide, reorder, reset widths, density (comfortable or compact).
  5. Bulk bar: selected count, total value, permitted bulk actions, export.
- **Domain states:** draft; active; expiring within the configured window; expired; renewal pending;
  terminated (reason); rows loading (skeleton); no results under filter (clear filter offered); export
  in progress.
- **Kaizen corrections:** Source asked for horizontal overflow handling and column management.
  Upgraded: frozen first column, keyboard-scrollable grid, column chooser. Added: virtualise lists over
  50 rows; sort state announced; saved views stored server-side per user; rows at least 48 dp; web
  filters reflected in the URL; exports carry filters, generated-at time and user; container radius only.
- **Adaptive behaviour:** Compact: no table; a row list with identifier, counterparty, status and key
  date, sort and filter in a sheet, "Fields shown" replaces the column chooser. Medium: table with
  frozen column and five visible columns. Expanded: full table with a preview panel.
- **East African context:** Leases and service contracts run in UGX and USD. In Arabic the frozen
  column sits on the start (right) side. Virtualisation keeps large registers usable on low-end devices.
- **Chwezi application:** Aqar lease register; Maduuka supplier contracts; SpannaMax service contracts.
- **Acceptance tests:**
  1. Given keyboard-only use, then focus enters the grid and arrow keys move between cells.
  2. Given a saved view, then it reappears after signing in on another device.
  3. Given a 5,000-row fixture on the baseline device, then frame metrics are recorded within budget.
  4. Given RTL, then the frozen column is on the start side.
  5. Given a bulk selection, then the total value shows before confirmation.
- **Rule IDs:** PX-TABLE-001, PX-TABLE-002, PX-A11Y-003, PX-L10N-003, PX-PERF-006, PX-GEOM-004,
  PX-LAYOUT-001.

## PD-40 — People metrics with explicit denominators

- **Family:** F5 People operations and HR. Ratios and denominators; units and widget restraint are
  PD-26.
- **Archetype:** AR-04 Analytics workspace.
- **Pattern:** Rate cards, monthly trends and a team comparison let an HR lead see how the workforce is
  changing over time.
- **Primary task and success metric:** Interpret turnover, absence and training completion rates.
  Metric: every rate shows numerator, denominator and period; no gauge appears without a numeric value;
  teams below the privacy threshold are suppressed.
- **Anatomy (priority order):**
  1. Population line: "All permanent staff, 3 branches, 1 Jan to 30 Jun".
  2. Rate cards: "9 leavers of 120 average headcount, 7.5%".
  3. Monthly trend with denominators in its data table.
  4. Team comparison with n per team; suppressed cells read "Fewer than 5".
  5. Definitions drawer with each formula and the headcount-averaging method.
- **Domain states:** zero denominator ("Not applicable", never 0% or infinity); small group suppressed;
  definition changed mid-period (annotated); data incomplete for a branch.
- **Kaizen corrections:** Source asked to avoid decorative gauges and unclear denominators. Upgraded:
  gauges give way to numbers and bars. Added: percentage and percentage-point changes are labelled
  distinctly; the privacy threshold is 5 people (proposed); comparisons stay at team level, never an
  individual ranking.
- **Adaptive behaviour:** Compact: rate cards stacked, each with its "x of y" line; one trend at a time.
  Medium: cards with the trend. Expanded: cards, trend and the team comparison table.
- **East African context:** Small branches make suppression essential; casual and permanent staff are
  reported separately; personal-data duties apply (statute detail: currentness NOT_ASSESSED).
- **Chwezi application:** Back-office HR analytics shared across products.
- **Acceptance tests:**
  1. Given the component registry, then no gauge renders without its numeric label.
  2. Given every rate, then numerator, denominator and period are displayed.
  3. Given a three-person team, then its cells are suppressed.
  4. Given a change from 7.5% to 9.0%, then it reads "up 1.5 percentage points".
- **Rule IDs:** PX-DATA-002, PX-DATA-003, PX-VIZ-002, PX-VIZ-005, PX-PRIV-002, PX-A11Y-005.
