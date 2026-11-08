Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Shared contract: [pattern-dossier-contract.md](pattern-dossier-contract.md)

# Pattern dossiers PD-21 to PD-30

Each dossier lists only what is specific to its pattern; the shared contract supplies reading order,
region rules, the canonical state set and evidence. A value tagged "proposed" is proposed (owner to confirm): a Chwezi starting value, calibrated
on the product's baseline device, that may be changed only through a DDR until the owner confirms it. Platform values cite rows in
[currentness-register.md](currentness-register.md) (for example M3 width classes, M9 orientation).

## PD-21 — Shipment offer comparison and route timeline

- **Family:** F8 Logistics and stock.
- **Archetype:** AR-05 Workflow queue.
- **Pattern:** Carrier offers sit side by side on identical attribute rows, so price, transit time and
  cover are compared like for like; once booked, one vertical milestone timeline tells everyone where
  the consignment is and what happens next.
- **Primary task and success metric:** A dispatcher learns the consignment's current state and next
  milestone, or picks an offer. Metric: state word, next milestone and expected time sit in the first
  viewport; offer choice takes 3 interactions or fewer (proposed).
- **Anatomy (priority order):**
  1. Shipment header: transfer or delivery-note number, origin and destination branch, state word, ETA with zone.
  2. Next-milestone card: event, responsible party, expected versus actual time, late flag in words.
  3. Milestone timeline: stage, actor, timestamp, location source and its age, exception note.
  4. Offer comparison (booking only): one row per attribute, one column per offer, cheapest and fastest marked in text.
  5. Proof-of-delivery block: recipient, photo or signature, link to the goods-received note.
- **Domain states:** booked; collected; in transit; held at border or customs (reason); delayed
  (reason, new ETA); exception (damaged, short, wrong item); delivered awaiting receipt; received in
  full; received short; location stale; offer expired; offer withdrawn by carrier.
- **Kaizen corrections:** Source asked for accessible, filterable route state. Upgraded: each milestone
  is a list item carrying word, icon, time and actor, and the shipment list filters by delayed,
  exception and awaiting proof. Added: expected and actual times are separate fields; an attribute a
  carrier did not quote reads "Not quoted", never blank; offer expiry is static text ("Expires 16:00"),
  not a ticking animation; a map is a cached static thumbnail, never an animated vehicle that looks
  live; stock in transit counts as available in neither branch.
- **Adaptive behaviour:** Compact: header, next-milestone card, last three milestones with "Show all";
  offers become a ranked stack where every card repeats the same four attributes in the same order.
  Medium: shipment list and timeline as two panes. Expanded: filterable shipment table (mechanics from
  PD-39), timeline centre, documents and map thumbnail in the context panel.
- **East African context:** Corridor freight crosses borders, so customs holds and long dwell times are
  normal states, not errors. Tracking pings arrive patchily on rural routes; last-mile delivery to
  trading centres is confirmed to the recipient by SMS. Freight is often quoted in USD and paid in UGX:
  show both with the rate date.
- **Chwezi application:** Maduuka distribution: "Stock transfer detail" and "Incoming deliveries"
  feeding goods receipt. SpannaMax: supplier parts orders awaiting arrival at the workshop.
- **Acceptance tests:**
  1. Given a last location ping older than the stale threshold, when the detail opens, then the line
     reads "Last seen 3 h ago" and no live indicator renders.
  2. Given three offers where one omits insurance, when compared, then that cell reads "Not quoted".
  3. Given a greyscale screenshot, then delayed and exception milestones differ by word and icon.
  4. Given a transfer in transit, when stock is queried, then neither branch's available quantity includes it.
- **Rule IDs:** PX-VIZ-003, PX-COLOUR-002, PX-OFFLINE-004, PX-DATA-009, PX-DATA-011, PX-DATA-013,
  PX-L10N-006, PX-NAV-005.

## PD-22 — High-volume kitchen ticket board

- **Family:** F9 Order and kitchen operations.
- **Archetype:** AR-05 Workflow queue.
- **Pattern:** Tickets keep the shape of the paper chit cooks already read at a glance (table, course,
  items, modifiers), and a single status chip says where each ticket stands.
- **Primary task and success metric:** A cook or expediter sees what to prepare next and bumps it when
  ready. Metric: oldest unstarted ticket found in under 3 s from 2 m away (proposed, measured with
  staff); bump is one tap with a 10 s undo; 50 open tickets scroll on the baseline tablet with frozen
  frames recorded and within the project budget.
- **Anatomy (priority order):**
  1. Station header: station name (grill, bar, cold), open count, age of the oldest ticket.
  2. Ticket grid ordered by fire time: order number, table, course, items, modifiers, allergy flags, age.
  3. Per-ticket bump and recall controls at a fixed corner.
  4. Table mode: one row per ticket for rush periods.
  5. Bulk bar: selected count, bump selected, undo.
- **Domain states:** new; fired; course on hold; in preparation; ready; bumped; recalled; modified
  after send (difference shown); voided after send (reason, role); allergy flagged; station offline.
- **Kaizen corrections:** Source asked for a high-volume table mode and bulk operations. Upgraded: table
  mode is offered automatically above a configurable open-ticket count (proposed 24) and is always
  user-selectable; bulk bump has undo. Added: age bands use a word ("Late") plus colour; allergy flags
  are word and icon, never tint; a change after send strikes the old line and labels "Changed"; a voided
  ticket shows a VOID watermark and stays in the void log; no alert relies on sound alone.
- **Adaptive behaviour:** Compact (expediter phone): single list oldest first, ticket expands in place.
  Medium (portrait tablet): two-column grid; portrait must work because orientation locks are ignored
  at sw600dp under target API 36 (currentness M9). Expanded or wall display: four to six columns or
  table mode, kitchen-display type tokens, no navigation chrome.
- **East African context:** Internet drops mid-service, so tickets travel over the local network and the
  board resumes after a power cut without losing state. Hot, greasy screens call for 56 dp targets and
  support for hardware bump bars. Menu names mix English and local-language dish names.
- **Chwezi application:** Maduuka restaurant and hotel: kitchen display per station and the bar ticket screen.
- **Acceptance tests:**
  1. Given 50 open tickets, when a 10-minute scroll and bump session runs on the baseline tablet, then
     frame metrics are recorded and meet the project budget.
  2. Given a bumped ticket, when undo is pressed within 10 s, then it returns to its original position.
  3. Given a voided ticket, then a reason and an authorised role were required and the void log lists it.
  4. Given a greyscale screenshot, then every allergy flag is still identifiable.
  5. Given a waiter sends an order on the local network, then it appears on the board within 2 s (proposed).
- **Rule IDs:** PX-PERF-002, PX-PERF-004, PX-INTERACT-007, PX-INTERACT-018, PX-DESTRUCT-003,
  PX-DATA-013, PX-COLOUR-002, PX-MOTION-003, PX-OFFLINE-002.

## PD-23 — Order desk with role-limited payment actions

- **Family:** F9 Order and kitchen operations.
- **Archetype:** AR-05 Workflow queue + AR-09 Transaction / checkout.
- **Pattern:** Compact order cards beside a filter sidebar let one cashier scan many open orders and
  settle any of them without leaving the desk view.
- **Primary task and success metric:** A cashier settles an order's bill correctly. Metric: tender panel
  reachable in 2 taps from any order; zero duplicate payments in double-tap and timeout tests; refund,
  void and discount reachable only by permitted roles.
- **Anatomy (priority order):**
  1. Context strip: outlet, till and shift, signed-in cashier.
  2. Filter chips with counts: Unpaid, Part-paid, Awaiting mobile money, Dine-in, Takeaway.
  3. Order cards: order number, table or customer, total, paid, balance, state word.
  4. Bill panel: lines with modifiers, service charge, tax lines with rate, rounding line, total.
  5. Tender panel: quick-tender notes, mobile money, card, split; change due in a large figure.
  6. Restricted zone: discount, void, refund, each disabled with a reason and "Request approval".
- **Domain states:** open; bill printed; unpaid; part-paid; mobile money awaiting customer approval;
  pending provider confirmation; paid (confirmed only); timed out (re-check status); refund requested;
  refund approved; voided; shift closed.
- **Kaizen corrections:** Source asked for safe, role-limited payment actions. Upgraded: the backend
  enforces permission; the UI shows the blocked action with its reason and a supervisor PIN path that
  records both actors. Added: discounts above a tenant threshold need approval; a timed-out mobile
  money payment is re-checked before any retry; reprints say REPRINT; a split bill always shows the
  remaining balance; the till relocks after 2 min idle (owner default, 2026-11-07) without losing the order.
- **Adaptive behaviour:** Compact (waiter handset): order list, bill and tender as three steps with a
  sticky Pay bar in the bottom 40% of the screen. Medium: order list beside the bill. Expanded (counter
  terminal): filter sidebar, order list, bill and tender panel, keyboard shortcuts for search and pay.
- **East African context:** Cash dominates, so quick-tender buttons follow local notes (UGX 5,000 to
  50,000) and UGX entry accepts no decimals. Mobile money prompts time out on congested networks. When
  fiscal e-invoicing (e.g. URA EFRIS) is enabled, receipt fiscal status is shown on the order.
- **Chwezi application:** Maduuka restaurant "Order desk" and hotel bar till.
- **Acceptance tests:**
  1. Given a waiter token, when the refund endpoint is called, then it is denied, and the UI shows
     refund disabled with its reason.
  2. Given a double tap on Pay, then exactly one payment record exists.
  3. Given a mobile money timeout followed by a late success callback, then the order shows paid once
     and no second charge was initiated.
  4. Given a supervisor override, then the audit entry names cashier, approver, time and reason.
- **Rule IDs:** PX-PRIV-001, PX-PRIV-006, PX-PRIV-008, PX-INTERACT-002, PX-INTERACT-016,
  PX-DATA-010, PX-DATA-012, PX-PRINT-001, PX-PROFILE-002.

## PD-24 — Stage-matrix pipeline with blocked-state reasons

- **Family:** F6 Pipelines and registers. Board mechanics only; money in pipelines is PD-27, funnel
  metrics PD-34, dense-table mechanics PD-39.
- **Archetype:** AR-10 Pipeline / stage board.
- **Pattern:** A matrix of stages against owners or requests, with a count in every cell, a personal task
  queue and a context rail for the selected record, shows the whole flow without losing the item.
- **Primary task and success metric:** Move a record to its next stage and clear what blocks it. Metric:
  every count has a visible definition; every blocked record shows reason, owner and since-date; every
  move is possible without dragging.
- **Anatomy (priority order):**
  1. Pipeline selector and filters: owner, age in stage, blocked only.
  2. Stage header row: stage name, count, one-line count definition.
  3. Cells or cards: identity, age in stage, owner, blocked badge with reason.
  4. Context rail: selected record, allowed transitions as a "Move to" menu, stage history.
  5. "My tasks" queue: items waiting on the signed-in user.
- **Domain states:** active in stage; blocked (reason from a controlled list, blocker, since); stalled
  beyond the stage limit; moved back (reason); withdrawn or rejected (reason required); transition not
  permitted for this role or state.
- **Kaizen corrections:** Source asked to explain counts and blocked states. Upgraded: each count states
  what it includes ("excludes withdrawn") and equals the filtered list. Added: transitions follow a state
  machine, so invalid moves are not offered; drag always has a "Move to" alternative; stalled items say
  "12 days in Vetting"; no colour heat map without numbers; moving backwards needs a reason.
- **Adaptive behaviour:** Compact: scrollable stage tabs each with its count, a list for the chosen
  stage, "Move to" in a bottom sheet. Medium: horizontally snapping lanes, rail as a sheet. Expanded:
  full matrix with a persistent rail; arrow keys move between cells.
- **East African context:** Approval chains in public, donor-funded and NGO procurement are long and
  multi-signatory, so "blocked: awaiting second signatory" is common. Counts load first and cards page
  in afterwards on slow links.
- **Chwezi application:** Aqar tenant applications (enquiry, viewing, application, vetting, lease
  signed); Maduuka and SpannaMax purchase requisitions (request, quotes, approval, order, receipt).
- **Acceptance tests:**
  1. Given keyboard-only use, then every transition completes through "Move to" without drag.
  2. Given any filter, then each stage count equals the number of records listed under it.
  3. Given an invalid transition request, then it is rejected with a message naming the allowed stages.
  4. Given a blocked card, then the screen reader announces reason, owner and since-date.
  5. Given any move, then the audit records actor, time, from-stage and to-stage.
- **Rule IDs:** PX-VIZ-003, PX-A11Y-003, PX-A11Y-008, PX-DESTRUCT-003, PX-PRIV-011, PX-COLOUR-002,
  PX-NAV-002.

## PD-25 — Privacy-aware staff directory (grid and list)

- **Family:** F5 People operations and HR.
- **Archetype:** AR-03 Record catalogue.
- **Pattern:** Profile cards with photo, role and status tags make colleagues recognisable at a glance.
- **Primary task and success metric:** Find a colleague and reach them through a channel policy allows.
  Metric: found by name, role or branch in 3 interactions or fewer; private fields absent from API
  responses for roles without permission.
- **Anatomy (priority order):**
  1. Search across name variants, role and branch; filters for department, branch, status.
  2. View toggle: list (default on compact) or grid.
  3. Person entry: photo or initials avatar at a fixed ratio, display name, role, branch, status word.
  4. Allowed contact actions only: work phone, internal message, work email.
  5. Profile detail with role-gated sections; identity numbers masked to the last four characters.
- **Domain states:** active; on leave (return date and delegate named); deactivated (visible to
  administrators only, labelled); field withheld by the employee ("Not shared"); no photo; contractor or casual.
- **Kaizen corrections:** Source asked for a list view and privacy controls. Upgraded: the server omits
  private fields, so hiding never depends on the UI; employees control visibility of personal contacts.
  Added: no live "online" presence (a location and surveillance risk); deactivated people leave pickers
  but stay in history; photo upload asks consent; export is a restricted permission.
- **Adaptive behaviour:** Compact: 56-72 dp rows with avatar, name and role; detail opens full screen.
  Medium: list with a detail pane, or a three-column grid. Expanded: sortable list by name, department
  or branch with the detail panel docked.
- **East African context:** Naming conventions vary (clan names, single names, Arabic names, order
  swapped), so search tolerates order and spelling and never forces first and last name. Phone numbers
  are E.164 with the tenant country default. Data-protection duties apply (statute details: currentness
  NOT_ASSESSED; route to the finance and legal owners).
- **Chwezi application:** Medic8 "Find on-call clinician"; Maduuka outlet staff list; shared back-office
  directory in every product.
- **Acceptance tests:**
  1. Given a cashier opens a colleague, then the network response contains no personal phone field.
  2. Given the search "Nakato Sarah", then "Sarah Nakato" is returned.
  3. Given width below 600 dp, then list view is the default.
  4. Given a deactivated employee, then they are absent from every assignee picker.
- **Rule IDs:** PX-PRIV-001, PX-PRIV-002, PX-L10N-007, PX-LAYOUT-001, PX-PERF-005, PX-A11Y-001.

## PD-26 — Workforce KPI widgets with explicit units

- **Family:** F5 People operations and HR. Units and widget restraint only; denominators and ratios
  belong to PD-40.
- **Archetype:** AR-04 Analytics workspace.
- **Pattern:** A branded header band above plain white widgets groups the figures and keeps the brand
  away from the numbers.
- **Primary task and success metric:** A manager reads headcount, attendance and overtime for a period.
  Metric: 100% of widgets declare unit, period and as-of time; at most six widgets per view (proposed),
  each with a named decision in the widget register.
- **Anatomy (priority order):**
  1. Header band: organisation or branch scope, period selector.
  2. KpiCard group (four or fewer): headcount (people), attendance (days), overtime (hours), payroll
     cost (currency, role-gated).
  3. One trend chart with the unit on its axis.
  4. Department breakdown table.
  5. "Why this widget" link to the register entry.
- **Domain states:** period to date (flagged); no data for this branch; stale clock data; payroll
  figure restricted; clock import pending; FTE and headcount both available.
- **Kaizen corrections:** Source asked to reduce decorative shadow and ensure chart units. Upgraded:
  tiles use house elevation 0 with hairline borders; KpiCard makes unit and period required parameters.
  Added: brand colour stays in the header band and never sits behind figures; hours and days never share
  one widget; FTE is labelled separately from headcount; widgets unused for 90 days are reviewed for
  removal.
- **Adaptive behaviour:** Compact: 2 x 2 KpiCards, then the chart, then the breakdown as cards.
  Medium: four KpiCards in a row with chart and breakdown side by side. Expanded: KPI strip, chart,
  sortable breakdown table and a department drill-down panel.
- **East African context:** Biometric clocks sync intermittently, so the as-of reads "Clock data to
  07:00". Casual and day labourers are counted apart from permanent staff, and public holidays differ
  by country, which changes working-day counts.
- **Chwezi application:** Back-office HR dashboard; Farm Acre casual labour attendance; Maduuka
  multi-outlet attendance.
- **Acceptance tests:**
  1. Given a KpiCard without unit or period, then the build or lint fails.
  2. Given low-end mode, then the screenshot shows zero shadows on tiles.
  3. Given a partial month, then the label reads "Month to date (12 of 22 working days)".
  4. Given a supervisor role, then payroll cost is absent from the API response.
  5. Given a screen reader, then a tile reads as "Overtime, this month, 412 hours".
- **Rule IDs:** PX-DATA-002, PX-DATA-007, PX-GEOM-006, PX-TYPE-004, PX-VIZ-005, PX-PRIV-002,
  PX-OFFLINE-004, PX-COLOUR-003.

## PD-27 — Sales pipeline separating forecast from realised revenue

- **Family:** F6 Pipelines and registers.
- **Archetype:** AR-10 Pipeline / stage board + AR-04 Analytics workspace.
- **Pattern:** Funnel, target, reminders and forecast share one view, so a sales lead sees both the
  money already won and the follow-ups that produce the rest.
- **Primary task and success metric:** Know realised revenue against target, the credible forecast, and
  which follow-ups are overdue. Metric: realised and forecast are never summed into one figure and use
  different labels and encodings; an overdue follow-up is actionable in one tap.
- **Anatomy (priority order):**
  1. Target header: target, realised, gap, period; "realised" defined as invoiced or as cash received.
  2. Forecast panel: weighted forecast with its formula shown; unweighted pipeline value apart.
  3. Stage funnel with count and value per stage.
  4. Follow-ups due and overdue, each with call and message actions.
  5. Deal list.
- **Domain states:** open in stage; won (realised per the tenant's definition); lost (reason
  required); slipped (close date moved, count kept); follow-up overdue; deal in another currency.
- **Kaizen corrections:** Source asked to distinguish forecast from realised revenue. Upgraded: realised
  is a solid bar, forecast an outlined or hatched bar, both labelled in words and in the text summary.
  Added: stage probabilities are admin-owned and dated; slipped deals stay visible; target progress is a
  bar with figures, not a gauge; each reminder deep-links to its deal.
- **Adaptive behaviour:** Compact: realised-versus-target card, forecast card, follow-ups list, then
  stages as a list with values. Medium: cards in a row, follow-ups beside the funnel. Expanded: funnel
  and deal table with a context panel for the selected deal.
- **East African context:** Business-to-business deals run in USD and UGX, and collection lags mean
  invoiced is not cash, so the realised definition matters. Field reps work offline and follow up
  mostly by phone call.
- **Chwezi application:** Maduuka wholesale and distribution sales; SpannaMax fleet service contracts.
- **Acceptance tests:**
  1. Given won deals of UGX 10,000,000 and a weighted forecast of UGX 6,000,000, then no screen, export
     or summary shows UGX 16,000,000 as one figure.
  2. Given the chart, then legend and text summary both name the forecast series as "Forecast".
  3. Given a deal marked lost, then saving without a reason is impossible.
  4. Given a converted USD deal, then the rate and its date are displayed.
- **Rule IDs:** PX-DATA-004, PX-DATA-009, PX-DATA-011, PX-VIZ-002, PX-VIZ-005, PX-A11Y-005,
  PX-NAV-005, PX-COLOUR-002.

## PD-28 — Admin workspace shell anatomy

- **Family:** F11 Workspace shell and approvals. Base anatomy for PD-29, PD-37 and the residential
  operations dashboard.
- **Archetype:** AR-06 Enterprise command centre.
- **Pattern:** Top bar, side navigation, KPI strip, widgets and tables form a recognisable frame that
  every module can fill without re-learning where things live.
- **Primary task and success metric:** Any user knows where they are (tenant, branch, module) and how to
  get anywhere. Metric: regions are named slots with token values, not pixel positions; landmark order is
  identical in every size class; returning-user launch-to-first-action is measured and budgeted.
- **Anatomy (priority order):**
  1. Top bar slot: tenant or outlet switcher, module title, global search, sync status, account.
  2. Navigation slot: bottom bar, rail or sidebar by width class.
  3. Context strip slot: branch, period, role.
  4. Content slot.
  5. Context panel slot (expanded and wider only).
  6. Feedback slot: offline banner and a polite live region for snackbars.
- **Domain states:** offline; syncing; conflicts waiting (count); tenant switch in progress; session
  expiry warning; navigation limited by role; maintenance notice.
- **Kaizen corrections:** Source said to treat the layout as anatomy, not a pixel template. Upgraded:
  slots carry collapse rules per width class. Added: web landmarks (header, nav, main, complementary)
  and a skip link; native heading semantics; inset handling under edge-to-edge with no opt-out at target
  API 36 (currentness M6) and predictive back (M8); a tenant switch with unsaved work prompts; deep links
  restore shell state; sidebar and content never scroll on the same axis inside each other.
- **Adaptive behaviour:** Width classes per currentness M3. Compact (under 600 dp): bottom bar with 3-5
  destinations plus More, context strip on one line, context panel becomes its own destination. Medium
  (600-839 dp): navigation rail. Expanded (840-1199 dp): rail or sidebar plus optional context panel.
  Large (1200 dp and up, opt-in): persistent labelled sidebar and docked context panel.
- **East African context:** On shared terminals the signed-in user is always visible in the top bar.
  The shell paints from cache before data arrives on slow links. Tenants spanning countries show the
  branch currency in the context strip.
- **Chwezi application:** AppScaffold for every KMP app; Maduuka back office and Aqar web administration.
- **Acceptance tests:**
  1. Given compact, medium and expanded widths, then the screen-reader landmark order is identical.
  2. Given gesture and three-button navigation, then no content sits under system bars.
  3. Given a window resize mid-form, then entered values and scroll position survive.
  4. Given network off, then the shell's first frame renders from cache.
- **Rule IDs:** PX-NAV-001, PX-NAV-002, PX-NAV-003, PX-NAV-006, PX-GEOM-002, PX-LAYOUT-001,
  PX-LAYOUT-005, PX-OFFLINE-001, PX-A11Y-002, PX-ARCH-006.

## PD-29 — Integrated HR suite (calendar, payroll, people)

- **Family:** F5 People operations and HR. Payroll-run lifecycle and responsive totals; the people
  directory is PD-25.
- **Archetype:** AR-06 Enterprise command centre.
- **Pattern:** Calendar, payroll, employee records and reports share one grammar of headers, tables and
  status words, so moving between modules costs no re-learning.
- **Primary task and success metric:** A payroll officer prepares, checks and submits the monthly run
  with leave effects in view. Metric: variance against the previous run is visible before approval;
  the totals row survives at every width; run numbers are contiguous per tenant.
- **Anatomy (priority order):**
  1. Run header: run number (provisional until issued), period, state, preparer, approver.
  2. Run summary: gross, statutory deductions, net, employer cost, variance with reasons.
  3. Exceptions: joiners, leavers, unpaid leave, missing bank or mobile money details.
  4. Employee lines table with a sticky totals row.
  5. Period calendar strip: leave and public holidays.
- **Domain states:** draft; calculated; under review; approved; posted to ledger; paid per channel;
  partially paid (failed transfers listed); reversed by a reversal run; period locked.
- **Kaizen corrections:** Source asked for stronger density and responsive tables. Upgraded: card rows
  on compact, a frozen name column on medium, the totals row always pinned. Added: preparer and approver
  must differ; variance above a threshold needs a written reason; ledger posting follows the finance
  engine; payroll screens are protected from screenshots and recents; a reversal never deletes.
- **Adaptive behaviour:** Compact: summary and exceptions first; employee lines expand to show net,
  totals pinned at the bottom. Medium: table with frozen name column and horizontally scrolling pay
  components. Expanded: full table with calendar and exceptions panels.
- **East African context:** Statutory deductions differ by country and change by law, so they are
  configured and verified with the finance engine, never hard-coded. Net pay goes to banks and mobile
  money; casual workers on daily rates; UGX lines are whole numbers.
- **Chwezi application:** Shared back-office payroll used by Maduuka, Medic8 and Farm Acre.
- **Acceptance tests:**
  1. Given the preparer tries to approve, then the action is refused with the reason shown.
  2. Given three issued runs, then their numbers are contiguous and none was allocated at draft.
  3. Given a payroll screen, then the recents snapshot is blank and screenshots are blocked.
  4. Given a 360 dp width, then the totals row equals the exact sum of lines with no page-level
     horizontal scroll.
- **Rule IDs:** PX-DATA-004, PX-DATA-013, PX-PRIV-002, PX-PRIV-007, PX-PRIV-011, PX-TABLE-002,
  PX-DESTRUCT-003, PX-L10N-001, PX-QA-008.

## PD-30 — Restaurant sales and menu-item performance analytics

- **Family:** F9 Order and kitchen operations.
- **Archetype:** AR-04 Analytics workspace.
- **Pattern:** Sales KPIs, an hourly trend and a dish ranking fit one landscape tablet screen, which suits
  owners who review the day standing at the counter.
- **Primary task and success metric:** Decide which items to promote, reprice or remove. Metric: every
  insight carries one action (edit price, feature, disable); ranking switches between revenue, quantity
  and margin in one tap.
- **Anatomy (priority order):**
  1. Filters: period, outlet, daypart.
  2. KpiCards: net sales, orders, average order value, gross margin when costs exist.
  3. Sales by hour or daypart, bars from zero.
  4. Item ranking: item, quantity, revenue, margin, trend word, action.
  5. Insight list with the rule behind each insight stated.
- **Domain states:** no recipe costs (margin hidden and explained); partial day; outlet closed; voids
  and complimentary items excluded or included (stated); price changed mid-period (annotated).
- **Kaizen corrections:** Source asked for actionable insights and clear chart scales. Upgraded: zero
  baselines, axis units, text summary, an action on each insight. Added: insight rules are stated ("sold
  none on 5 of 7 days"); ranking metric named in the heading; voids and comps shown separately so
  leakage is visible; top and bottom items marked by words, not only colour.
- **Adaptive behaviour:** Compact portrait: 2 x 2 KpiCards, one chart at a time behind tabs, ranking as
  a list. Medium and landscape tablet: KPI row, chart and ranking side by side. Expanded: full ranking
  table with export.
- **East African context:** Input prices move often, so price-change annotations matter; cash and mobile
  money splits are shown; one owner often runs a bar and a restaurant on one tenant.
- **Chwezi application:** Maduuka restaurant "Menu performance" report.
- **Acceptance tests:**
  1. Given portrait and landscape at 200% text, then no item name is clipped.
  2. Given the fixture data, then every figure in the text summary equals the chart value.
  3. Given missing recipe costs, then the margin column reads "Add recipe costs to see margin".
  4. Given an insight's action, then it opens the item editor with that item preselected.
- **Rule IDs:** PX-VIZ-001, PX-VIZ-005, PX-A11Y-005, PX-DATA-002, PX-DATA-007, PX-TABLE-001,
  PX-LAYOUT-002.
