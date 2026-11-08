Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Shared contract: [pattern-dossier-contract.md](pattern-dossier-contract.md)

# Pattern dossiers PD-41 to PD-50

Each dossier states only what is specific to its pattern. Reading order, premium rules, the
canonical state set, the mutation state machine, size-class behaviour, low-end and accessibility
floors and the evidence pack all come from the shared contract. A value tagged "proposed" is proposed (owner to confirm): a Chwezi starting value, calibrated
on the product's baseline device, that may be changed only through a DDR until the owner confirms it.

## PD-41 — Leave and expense approval queue

- **Family:** F11 Workspace shell and approvals.
- **Archetype:** AR-05 Workflow queue.
- **Pattern:** an approver's queue of staff requests (leave, expense claims) with a detail view,
  balance impact and a decision that is confirmed, attributed and traceable.
- **Primary task and success metric:** clear pending requests with the right decision. A complete,
  in-policy request is approved in 2 interactions (open, approve and confirm in one sheet). Zero
  decisions stored without actor, time and request version.
- **Anatomy:**
  - Header: queue name, scope (branch or department), pending count, as-at time.
  - Filter chips: type (leave, expense), age band, amount band, "flagged by policy".
  - Request row: requester, type, period or amount with currency code, submitted date, age in days,
    attachment status, policy flag in text, status in text.
  - Detail: summary; balance impact (leave days before and after; budget line remaining before and
    after); attachment previews; history timeline (submitted, viewed, each approval level, payment).
  - Actions: Approve (the one primary), Reject (needs a reason), Request information, Delegate.
  - The expense category chart from the reference is demoted to a text table inside the detail; the
    queue itself carries no chart (PX-DATA-007).
- **Domain states:** pending; returned for information; approved at level 1 awaiting level 2;
  approved; rejected with reason; withdrawn by requester; attachment missing, uploading, failed;
  reimbursement not started, scheduled, part-paid, paid (with payment reference), reversed; decision
  queued offline; request changed after the approver opened it (conflict); self-approval blocked;
  delegation active with an end date.
- **Kaizen corrections:** the reference approved with a bare tap and showed "approved" as if the
  money had moved. Add a consequence-stating confirmation, the acting user on every decision,
  per-attachment status, and a separate reimbursement state so "approved" never reads as "paid".
- **Adaptive behaviour:** compact opens each request as a destination with Approve and Reject in a
  sticky bar that the keyboard never covers. Medium is list-detail. Expanded adds a table with bulk
  approve limited to in-policy, unflagged requests, and a context panel with team leave calendar and
  budget lines; bulk results are reported per item.
- **East African context:** managers often approve from a phone in the field on intermittent data,
  so decisions queue offline and say so. Reimbursement by mobile money stays "pending provider
  confirmation" until the provider confirms (PX-DATA-010). Receipt photos are taken on low-end
  phones and compressed before upload. Leave-day counts use the tenant country's public holidays.
  UGX amounts show no decimals; foreign-currency claims show rate, source and date.
- **Chwezi application:** Maduuka branch petty-cash and supplier expense claims; Medic8 staff leave
  with a shift-coverage warning when approval leaves a ward below its rota minimum; SpannaMax
  mechanic parts and travel claims.
- **Acceptance tests:**
  1. Given a pending expense, when the approver taps Approve, then the confirmation names requester,
     amount with currency and consequence, and after confirming the audit entry holds actor, time,
     request version and before/after status.
  2. Given airplane mode, when the approver approves, then the row reads "Queued - not yet sent" and
     never "Approved" until the server acknowledges; on reconnect exactly one decision is stored.
  3. Given Reject with an empty reason, when submitted, then submission is blocked, focus moves to
     the reason field and the error is announced.
  4. Given an approver who is also the requester, when the approve API is called directly, then it
     is denied by the backend regardless of what the UI shows.
  5. Given a request edited after the approver opened it, when Approve is tapped, then a conflict
     view shows both versions with who and when, and no decision is stored.
- **Rule IDs:** PX-INTERACT-002, PX-INTERACT-008, PX-DESTRUCT-001, PX-DESTRUCT-003, PX-STATE-002,
  PX-STATE-006, PX-OFFLINE-003, PX-PRIV-001, PX-PRIV-011, PX-DATA-005, PX-DATA-010, PX-FORM-003,
  PX-A11Y-012.

## PD-42 — Mobile shop-owner sales summary

- **Family:** F2 Catalogue and storefront.
- **Archetype:** AR-02 Operational dashboard.
- **Pattern:** an owner's phone view of today's trading across branches, honest about what has and
  has not synced from the tills.
- **Primary task and success metric:** know today's takings. Today's sales total, as-at time and
  branch scope are visible in the first viewport on a returning launch; branch switch is 1 tap plus
  one choice; no target gauge anywhere on the screen.
- **Anatomy:**
  - Header: branch switcher ("All branches" or a named branch), "Today" with the date, as-at time.
  - Primary panel: today's sales in the tenant currency, with comparison to the same weekday last
    week as amount and percentage, each labelled.
  - Supporting grid (2 x 2): transactions, average basket, cash versus mobile-money split,
    refunds and voids. Label above value, value in tabular figures.
  - Target progress as text ("62% of daily target - UGX 1,240,000 of 2,000,000") with an optional
    thin linear bar.
  - Sales by hour: bounded bar chart, at most 40% of viewport height, with a one-line text summary.
  - Top five products by value and quantity; exceptions list (voids above threshold, cash variance at
    close, fiscal receipt failures when fiscal e-invoicing is enabled).
- **Domain states:** day not opened on a till; till offline with N queued sales; branch switch
  loading; no sales yet today (empty with cause, not zero-filled charts); partial day; refunds
  exceeding sales; branch manager restricted to own branch; figures provisional until close.
- **Kaizen corrections:** the reference stacked large numbers with weak labels and a giant circular
  target gauge. Labels now sit above values with unit and period, and the gauge becomes a text
  statement because a gauge hides the absolute figures the owner acts on.
- **Adaptive behaviour:** compact is a single column with the 2 x 2 grid; at 200% text the grid drops
  to one column. Medium shows the four KPIs in a row with chart and top products side by side.
  Expanded adds a branch comparison table (branch, sales, transactions, cash, mobile money, variance)
  with a frozen branch column.
- **East African context:** owners check from away on 3G or worse, so the summary loads from cached
  aggregates with their age, and the payload is a small delta. The cash versus mobile-money split
  drives the evening reconciliation. UGX shows grouping and no decimals. Fiscal e-invoicing (e.g.
  URA EFRIS) status appears only when the tenant enables it.
- **Chwezi application:** Maduuka owner app for retail, pharmacy, restaurant and hotel outlets;
  the same summary feeds the owner's re-entry landing (PX-NAV-006).
- **Acceptance tests:**
  1. Given synced receipts for the day in the tenant time zone, when the summary loads, then today's
     total equals their sum exactly (reconciliation fixture).
  2. Given any till with queued sales, when the summary renders, then a text disclosure states how
     many sales from which till are not yet included.
  3. Given TalkBack or VoiceOver, when reading the KPI grid, then each tile is read label, value,
     unit, period in that order.
  4. Given the screen's component tree, when inspected, then it contains no circular gauge.
  5. Given 200% text on the baseline device, when the screen renders, then nothing clips and the KPI
     grid has one column.
- **Rule IDs:** PX-DATA-002, PX-DATA-004, PX-DATA-009, PX-DATA-011, PX-OFFLINE-001, PX-OFFLINE-004,
  PX-VIZ-002, PX-L10N-001, PX-PROFILE-001, PX-NAV-006, PX-TYPE-005, PX-PERF-011.

## PD-43 — Mobile freight volume statistics

- **Family:** F8 Logistics and stock.
- **Archetype:** AR-04 Analytics workspace.
- **Pattern:** a compact statistics view comparing delivery volumes across a week, with the chart
  kept in proportion and the numbers carried in text.
- **Primary task and success metric:** see whether this week's volume is up or down and where. The
  text summary names the largest change by day or route; the chart occupies at most 40% of
  viewport height at compact width.
- **Anatomy:**
  - Period control: week, four weeks or custom, always showing the explicit date range and time zone.
  - KPI strip: consignments, weight (kg or t), and parcels or volume (m3); one declared unit per
    metric.
  - Grouped bars: this week versus last week by day, at most two series, legend with pattern as
    well as colour.
  - Text summary: "Week to date 1,840 consignments, down 6% on the same days last week; Thursday
    lowest."
  - Drill-down table by route and day with sortable columns.
  - Theme follows the system setting; a manual toggle is optional.
- **Domain states:** partial week ("Week to date, Mon-Thu"); a day with no data shown differently
  from a day with zero; late records that revised a figure (marker with revision time); imported
  data in another unit normalised with a note; cached view with age; route filter applied; empty
  period.
- **Kaizen corrections:** the reference let the bar chart dominate, with unlabelled axes. Axis title,
  unit and period are now mandatory, the chart is capped in height, and the theme toggle is verified
  to keep contrast in both themes.
- **Adaptive behaviour:** compact orders summary, chart, then route cards. Landscape on a phone
  (height compact) shows chart and summary side by side. Medium places chart and table side by side.
  Expanded adds route breakdown columns and a period-over-period table.
- **East African context:** mixed fleets (motorcycles, vans, trucks) mean volume is reported in more
  than one unit; never add across units. Cross-border corridor delays show as late records, so
  revision markers matter. Aggregates are computed server-side so the phone downloads summaries, not
  raw records. In Arabic RTL, bar category order mirrors; whether the time axis mirrors is
  NOT_ASSESSED and needs a native-reader review.
- **Chwezi application:** Maduuka distribution and wholesale deliveries; SpannaMax parts dispatch.
- **Acceptance tests:**
  1. Given 360 x 640 dp and 412 x 915 dp viewports, when rendered, then the chart container height
     is at most 40% of the viewport.
  2. Given a day with no data and a day with zero volume, when viewed in greyscale and with a screen
     reader, then they are distinguishable ("No data" versus "0").
  3. Given the chart dataset, when the text summary is generated, then its figures equal the data
     (automated comparison).
  4. Given light and dark themes, when measured, then bars against background are at least 3:1 and
     all text at least 4.5:1.
  5. Given a partial week, when displayed, then the period label states the days covered.
- **Rule IDs:** PX-VIZ-001, PX-VIZ-005, PX-A11Y-005, PX-COLOUR-001, PX-COLOUR-002, PX-DATA-002,
  PX-DATA-003, PX-PERF-006, PX-TOKEN-003, PX-L10N-003, PX-OFFLINE-004.

## PD-44 — Property portfolio rent and work-order control

- **Family:** F4 Property and community.
- **Archetype:** AR-02 Operational dashboard + AR-08 Financial control.
- **Pattern:** a manager's portfolio view that keeps money due, received and reconciled apart, ages
  arrears, and turns overdue maintenance into an assignment.
- **Primary task and success metric:** see collections and act on urgent work. Collections and
  arrears are never combined into one figure; an overdue work order is assigned in at most 2 taps
  from the dashboard.
- **Anatomy:**
  - Header: scope (portfolio, property, block), rent period, as-at time.
  - Primary panel: four labelled figures for the period - Due, Received, Reconciled, Outstanding -
    each per currency.
  - Arrears ageing: 0-30, 31-60, 61-90, 90+ days, with tenant count and amount, each opening the
    tenant ledger.
  - Work orders: overdue against SLA first, then by severity and age; each row has property, unit,
    issue, age, SLA breach in text and an Assign action.
  - Occupancy: occupied, vacant, on notice, as counts.
  - The building hero image from the reference shrinks to a thumbnail in the property selector.
- **Domain states:** mobile-money payment received but pending reconciliation; partial payment;
  overpayment held as tenant credit; deposit held (not rent income); payment plan active; lease
  expiring within the configured window; work order new, assigned, in progress, awaiting parts,
  SLA breached, completed awaiting tenant confirmation, reopened; caretaker updates queued offline.
- **Kaizen corrections:** the reference mixed collected rent and debt in one headline and listed
  delayed work orders without a way to act. Money states are now separate figures, and every
  overdue item carries its own action and owner.
- **Adaptive behaviour:** compact shows scope, the four figures as a 2 x 2 grid, then a "Needs
  action" list (SLA breaches, 90+ arrears). Medium is list-detail by property. Expanded shows a
  property table (Due, Received, Reconciled, Arrears, Occupancy, Open work orders) with a frozen
  property column and a work-order panel.
- **East African context:** commercial rent is often in USD and residential in UGX; totals stay per
  currency and are never converted without rate, source and date. Rent may be billed monthly or
  quarterly in advance, so the period rule is configurable. Mobile-money and bank deposits arrive
  ahead of reconciliation. Caretakers on basic phones receive work orders by SMS fallback.
- **Chwezi application:** Aqar property management for landlords, agents and estate managers.
- **Acceptance tests:**
  1. Given the screen contract, when reviewed, then no tile, chart or total combines received and
     outstanding amounts.
  2. Given a portfolio with USD and UGX leases, when the dashboard renders, then each currency has its
     own totals and none is converted without a shown rate and date.
  3. Given an SLA-breached work order, when the manager taps Assign and chooses an assignee, then it
     is assigned in 2 taps and the audit holds actor and time.
  4. Given ledger fixtures, when compared, then Received minus Reconciled equals the shown "pending
     reconciliation" amount.
  5. Given arrears buckets, when read by a screen reader, then each announces its inclusive day range.
- **Rule IDs:** PX-DATA-004, PX-DATA-005, PX-DATA-009, PX-DATA-011, PX-PROFILE-006, PX-VIZ-004,
  PX-NAV-005, PX-TABLE-001, PX-NOTIFY-002, PX-PRIV-011.

## PD-45 — Property listing detail with viewings and offers

- **Family:** F4 Property and community.
- **Archetype:** AR-14 Detail record + AR-07 Scheduling workspace.
- **Pattern:** a listing record that separates verified facts and operational status from
  marketing imagery, and runs viewings and offers from the same page.
- **Primary task and success metric:** book a viewing or record an offer. Status and price are
  readable as text above the fold without images; a viewing is booked in at most 4 steps; every
  offer has amount, currency, date and party.
- **Anatomy:**
  - Identity block: listing reference, name, location, status in text (Available, Under offer, Let,
    Sold, Withdrawn), price with currency and basis (per month, sale).
  - Media: fixed-ratio gallery placed below the identity block; status is never overlaid on a photo.
  - Key facts: bedrooms, floor area (m2), plot size, tenure type, parking, service charge, last
    verified date.
  - Viewings: upcoming list with date, time and time zone, agent, prospect, status.
  - Offers: amount, conditions, status (submitted, countered, accepted, rejected, withdrawn), time.
  - Price history: dated rows with currency code.
  - Documents: role-gated (title, draft lease). Actions: Schedule viewing (primary), Record offer,
    Share.
- **Domain states:** viewing requested, confirmed, rescheduled, no-show, cancelled; slot clash with
  the agent's calendar; offer below reserve (flagged, visible to permitted roles only); accepted offer
  exists; listing facts stale beyond the verification window; images not loaded on a metered network.
- **Kaizen corrections:** the reference placed status on top of an immersive photo and blended
  marketing copy with facts. Status becomes text in the identity block, and marketing copy sits in
  its own labelled section apart from verified facts.
- **Adaptive behaviour:** compact shows identity, price and a sticky action bar, with the gallery as a
  thumbnail strip. Medium puts media left and facts and actions right. Expanded uses three panes:
  media, facts, and an activity timeline of viewings and offers.
- **East African context:** tenure types such as mailo, freehold, leasehold and customary are a
  required fact field in Uganda. Prices appear in UGX and USD. Prospects are reached by phone and
  messaging apps, so share uses the OS share sheet and numbers are stored in E.164. Diaspora buyers
  need viewing times with time zone. Large galleries wait for Wi-Fi or tap-to-load on metered data.
- **Chwezi application:** Aqar sales and lettings listings.
- **Acceptance tests:**
  1. Given images disabled, when the listing opens, then status, price, key facts and actions render
     and are read in that order.
  2. Given a prospect whose time zone differs from the tenant's, when a viewing is shown, then the
     time zone is displayed.
  3. Given an accepted offer, when a second offer is accepted via the API, then the backend refuses
     and the UI shows the conflict.
  4. Given a double tap on Schedule viewing, when confirmed, then exactly one viewing exists.
  5. Given price history, when inspected, then every row has a date and a currency code.
- **Rule IDs:** PX-DATA-009, PX-PERF-005, PX-PERF-011, PX-L10N-006, PX-L10N-007, PX-INTERACT-002,
  PX-STATE-006, PX-PRIV-002, PX-COLOUR-002, PX-LAYOUT-006, PX-PROFILE-006.

## PD-46 — Cross-form-factor consistency verification set

- **Family:** F10 Education and learning (origin); applies to all products.
- **Archetype:** None (verification set).
- **Pattern:** a repeatable protocol proving that core tasks work the same way on every form factor
  and platform a product ships to. Its reference showed one brand across many screens; the lesson is
  the check, not a look.
- **Primary task and success metric:** demonstrate parity before release. Task-parity matrix 100%
  for core tasks; zero unexplained token differences; every deviation linked to a DDR.
- **Anatomy (protocol artefacts):**
  - Core-task list drawn from the product profile.
  - Task-parity matrix: rows are core tasks; columns are compact Android (baseline device), compact
    iOS, tablet portrait, tablet landscape, desktop or web where shipped; cells record steps, outcome,
    states covered and pass, fail or NOT_ASSESSED.
  - Screenshot grid per size class and per canonical state.
  - Token parity diff: resolved token values on each platform compared with the source token pack.
  - Navigation equivalence table: each destination's place in bottom bar, rail or sidebar, and back
    behaviour per platform.
  - Semantic parity list: accessible names of core controls on each platform.
  - DDR register for accepted deviations.
- **Domain states (verification outcomes):** parity pass; permitted platform-convention variance
  (back gesture, share sheet, date picker); permitted size-class layout variance; functional gap
  (fail); not run (NOT_ASSESSED).
- **Kaizen corrections:** the source repeated the same product as a second reference. It is kept
  numbered for traceability but converted into evidence: "same" means the same steps, data, states
  and meaning, not pixel identity.
- **Adaptive behaviour:** defines the test, not a layout. Layout differences permitted by the size
  class table in the shared contract are passes; missing functions or states are failures.
- **East African context:** students and parents use shared, low-end Android phones while school
  offices use desktops; the matrix must include the declared baseline device, the longest supported
  language and Arabic RTL where Arabic ships. iOS columns apply only if the product ships on iOS.
- **Chwezi application:** release gate for the Education/LMS student portal (PD-13) and, by
  extension, any Chwezi product shipped on more than one form factor; produced by a CI job per
  release.
- **Acceptance tests:**
  1. Given a release candidate, when CI runs, then it publishes the task-parity matrix as a release
     artefact.
  2. Given the matrix, when reviewed, then every core-task row passes on every shipped column or cites
     a DDR ID.
  3. Given the token parity diff, when run, then unexplained differences equal zero.
  4. Given core controls, when the accessible-name lists are compared across platforms, then the
     names match word for word.
  5. Given the screenshot grid, when inspected, then it includes the baseline device and Arabic RTL
     where supported.
- **Rule IDs:** PX-ARCH-002, PX-ARCH-008, PX-NAV-002, PX-NAV-003, PX-TOKEN-007, PX-TOKEN-008,
  PX-LAYOUT-004, PX-QA-001, PX-QA-005, PX-QA-012.

## PD-47 — Exam and question-performance analytics

- **Family:** F10 Education and learning.
- **Archetype:** AR-04 Analytics workspace.
- **Pattern:** item analysis for an exam: summary statistics, then a question table that flags weak
  items, with every statistic tied to its sample size.
- **Primary task and success metric:** find questions that performed poorly and act. Every statistic
  shows its sample size (n); items below the sample threshold are flagged; the question list is
  usable at 360 dp width without horizontal page scroll.
- **Anatomy:**
  - Selector: exam, class or stream, term.
  - Summary: candidates who sat (n), mean and median score, pass rate with numerator and denominator,
    score distribution histogram with labelled bins.
  - Question table: number, topic, facility (proportion correct, 0-1), discrimination index, n
    answered, omission rate, flag in text (too hard, too easy, negative discrimination).
  - Question detail: option distribution with counts for distractor analysis.
  - Actions: mark for review; exclude from scoring (reason required); export where authorised.
- **Domain states:** marking incomplete (statistics provisional); sample below threshold (proposed
  default 30, configurable); question excluded or regraded; results not yet published; cached
  offline view with age; learner-level data restricted by role.
- **Kaizen corrections:** the reference packed several small charts into a phone screen and showed
  statistics with no validation. One histogram plus a table replaces the mini-charts, and every
  figure is recomputed from raw responses in tests.
- **Adaptive behaviour:** compact shows summary then question cards with facility and discrimination
  as numbers and the flag in text; tapping opens the detail. Medium is list-detail. Expanded shows the
  full sortable table with the distribution chart beside it.
- **East African context:** streams of 60-100 learners are common; marks are often entered offline
  by teachers and synced later; grading follows national grade bands configured per country rather
  than hard-coded. Learners are minors, so names do not appear in aggregate item views.
- **Chwezi application:** Education/LMS exam module for school academic offices and teachers.
- **Acceptance tests:**
  1. Given a raw-response fixture, when statistics are computed, then displayed facility and
     discrimination match the reference calculation to 2 decimal places.
  2. Given an item with n below the threshold, when displayed, then a "Small sample" text flag
     appears and the value is visually de-emphasised but still shown.
  3. Given Exclude from scoring, when confirmed with a reason, then totals recalculate, a "Regraded"
     marker appears and the audit holds actor, time and reason.
  4. Given a role without learner access, when item views load, then no learner names are present in
     the response or the screen.
  5. Given 360 dp width, when the question list renders, then the page has no horizontal scroll.
- **Rule IDs:** PX-DATA-002, PX-DATA-003, PX-DATA-004, PX-VIZ-005, PX-A11Y-005, PX-DESTRUCT-003,
  PX-PRIV-002, PX-TABLE-001, PX-LAYOUT-001, PX-PROFILE-008.

## PD-48 — Course catalogue with learner progress

- **Family:** F10 Education and learning.
- **Archetype:** AR-03 Record catalogue.
- **Pattern:** a learner's course home that puts "continue where I stopped" first, defines progress
  plainly and treats downloads as first-class for offline study.
- **Primary task and success metric:** resume learning. The resume point is 1 tap from the home
  screen; progress is stated as completed lessons of total; a downloaded lesson plays with no
  network.
- **Anatomy:**
  - Continue panel: course, lesson title, position, "7 of 20 lessons complete".
  - Enrolled courses list, then catalogue: title, teacher, level, lesson count, duration, download
    state, progress in text.
  - Filters: subject, class, enrolled or not.
  - Calendar strip: deadlines and live sessions with time zone.
  - Downloads manager: size per item, storage remaining, delete download.
- **Domain states:** not started; in progress; completed (completion rule stated); assignment
  overdue; course locked by prerequisite (reason shown); download not started, waiting for Wi-Fi,
  downloading with percentage, downloaded, failed, licence expired; offline progress queued; other
  learners' online presence hidden by default.
- **Kaizen corrections:** the reference showed pastel progress without a definition and a live list
  of online users beside learning content. Progress is now defined in text, and presence is opt-in
  and never shown on learning screens.
- **Adaptive behaviour:** compact orders continue panel, enrolled list, catalogue list. Medium shows a
  two-column grid with a calendar rail. Expanded uses a sidebar, a three- or four-column grid and a
  calendar panel.
- **East African context:** data is costly, so downloads default to Wi-Fi and state their size
  before starting; storage on baseline phones is small; family phones are shared, so each learner
  has a profile protected by a PIN; content may be in English, Luganda or Swahili.
- **Chwezi application:** Education/LMS learner app for schools and training providers.
- **Acceptance tests:**
  1. Given server progress of 7 completed of 20, when the course card renders, then it reads "7 of
     20 lessons complete".
  2. Given Continue, when tapped, then the exact lesson opens at the saved position (page, or within
     5 seconds for media).
  3. Given airplane mode, when a downloaded lesson is completed, then it plays, completion queues,
     and on reconnect exactly one completion is recorded.
  4. Given a metered connection, when a download is started, then consent is requested showing the
     size in MB.
  5. Given default settings, when any learning screen renders, then no online-presence element is
     present.
- **Rule IDs:** PX-NAV-006, PX-OFFLINE-001, PX-OFFLINE-002, PX-PERF-011, PX-PERF-012, PX-DATA-002,
  PX-STATE-004, PX-PRIV-008, PX-BLACKLIST-005, PX-PROFILE-008.

## PD-49 — Personal schedule and focus-time planner (non-surveillant)

- **Family:** F5 People operations and HR.
- **Archetype:** AR-07 Scheduling workspace.
- **Pattern:** a staff member's own day and week: shifts, tasks and protected focus time, owned by
  the user and never converted into a hidden productivity score.
- **Primary task and success metric:** plan and adjust the day. No figure appears without its formula
  available; the user sees their own data before anyone else; no manager-facing per-person
  productivity score exists.
- **Anatomy:**
  - Day and week agenda with time zone; entries carry a category label and icon, not colour alone.
  - Task list with due times; create focus block; shift swap request.
  - Profile panel: own working hours, leave balance, visibility notice ("Your manager sees your
    shifts and leave, not your tasks or focus blocks").
  - Summary: planned versus scheduled hours as plain descriptive figures, each with a formula
    on request.
- **Domain states:** overlapping entries (conflict); shift swap requested, approved, declined; task
  overdue; offline edits queued; external calendar sync conflict; leave day or public holiday;
  manager view limited to aggregate availability.
- **Kaizen corrections:** the reference used colour-banded productivity cards and unexplained
  scores beside a profile, implying monitoring. Scores are removed, colour bands gain text labels,
  and visibility to others is stated on screen.
- **Adaptive behaviour:** compact is an agenda list with add in a bottom sheet. Medium is a week
  grid. Expanded is the week grid with a task panel. Dragging an entry always has a menu
  alternative ("Move to...").
- **East African context:** shift work in shops, clinics and workshops dominates; public holidays
  vary by country; observance schedules (for example reduced hours during Ramadan) are configurable
  per tenant. Workforce data falls under the applicable data-protection law, so visibility follows
  the tenant's documented policy (legal specifics NOT_ASSESSED here).
- **Chwezi application:** Medic8 nurse's own rota and tasks; Maduuka shop-floor shifts; SpannaMax
  mechanic's personal job list.
- **Acceptance tests:**
  1. Given the manager role, when every manager-facing API is called, then none returns a per-person
     productivity score.
  2. Given any derived figure on screen, when its info control is opened, then the formula and inputs
     are shown.
  3. Given a greyscale screenshot, when reviewed, then every entry category is identifiable by text or
     icon.
  4. Given a drag-to-reschedule, when performed by keyboard or switch access, then an equivalent menu
     action completes it.
  5. Given two overlapping entries, when saved, then a conflict message in text appears and the user
     chooses to keep both or adjust.
- **Rule IDs:** PX-BLACKLIST-005, PX-PRIV-002, PX-PRIV-010, PX-COLOUR-002, PX-A11Y-008, PX-L10N-006,
  PX-OFFLINE-005, PX-DATA-007, PX-STATE-006.

## PD-50 — Construction project budget and draw-stage control

- **Family:** F3 Money control and finance.
- **Archetype:** AR-08 Financial control.
- **Pattern:** a project funding view that shows exact budget figures with provenance and approves
  each draw against inspected progress.
- **Primary task and success metric:** approve or reject a draw. Budget, committed, certified, paid
  and remaining appear as exact figures with as-at time and source; a draw cannot be approved without
  an inspection record.
- **Anatomy:**
  - Header: project, contract, contract currency, as-at time.
  - Budget summary as a label-amount list in tabular figures: original budget, approved variations,
    revised budget, committed, certified, paid, retention held, remaining. Terms and formulas are
    confirmed with the finance engine before release.
  - Draw stages: stage, inspected percentage complete, amount claimed, certified, retention, paid,
    status.
  - Cost-code table with overrun flags against a stated threshold.
  - Evidence: inspection reports, site photos, certificates, each dated and attributed.
- **Domain states:** draw requested, inspected, certified, approved, paid, rejected or partly
  certified; variation pending; cost-code overrun; retention release due; imported materials exposed
  to exchange rate; site inspection queued offline; approval awaiting a second signatory.
- **Kaizen corrections:** the reference used a dark "premium" workspace, a funding gauge and loose
  terms. Exact terms and figures replace the gauge (an optional linear bar may accompany the text),
  every figure links to its source, and dark-theme contrast is measured rather than assumed.
- **Adaptive behaviour:** compact shows the summary list and stage list, each opening as a
  destination. Medium is list-detail by stage. Expanded shows the cost-code table with a frozen code
  column beside a stage panel.
- **East African context:** UGX project figures reach billions, so approval screens show full values
  ("UGX 1,250,000,000"); abbreviations such as "1.25bn" appear only on charts, with the full value in
  the text summary. Contracts may be in USD with local costs in UGX: totals stay per currency. Tax and
  retention treatment defers to the finance engine. Site photos upload on poor networks, compressed
  and queued.
- **Chwezi application:** SpannaMax projects module; also property development budgets alongside
  Aqar.
- **Acceptance tests:**
  1. Given ledger fixtures, when the summary renders, then revised budget equals original plus
     approved variations and every figure matches its source exactly.
  2. Given a draw without an attached inspection record, when Approve is called through the API,
     then the backend refuses.
  3. Given dark theme, when measured, then all text is at least 4.5:1 and figure separators at least
     3:1.
  4. Given an approval, when stored, then the audit holds actor, time, before/after status and reason;
     a double submit stores one approval.
  5. Given any figure, when its source control is opened, then the source document and as-at time
     are shown.
- **Rule IDs:** PX-DATA-004, PX-DATA-009, PX-DATA-011, PX-DESTRUCT-003, PX-PRIV-011, PX-COLOUR-001,
  PX-TOKEN-003, PX-INTERACT-002, PX-INTERACT-008, PX-VIZ-002, PX-PROFILE-007.
