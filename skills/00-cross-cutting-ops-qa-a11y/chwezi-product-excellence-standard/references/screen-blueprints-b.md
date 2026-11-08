# Screen blueprints B: screens 09-16

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

These blueprints extend the shared screen contract in
[screen-blueprints-a.md](screen-blueprints-a.md): contract fields, priority tiers P0-P3,
interaction defaults, the unified state table (ST-LOAD to ST-DONE), presentation passes, adaptive
defaults, fixtures, budgets and test-tag naming all apply unchanged. Each entry lists only goals,
deltas, domain states and tests. **VERIFY** items are answered from product requirements, never
invented (PX-MANDATE-004). Platform facts cite [currentness-register.md](currentness-register.md).

## Screen 09: Financial analytics and budgets

**Goal.** Understand income, expenses, cash and budget variance for a period, and trust the figures
enough to act on them.
**Success metrics.** Every figure on screen equals the report and the ledger query (0 mismatches);
answer "are we over budget on X?" in <= 2 taps from the screen.

| Tier | Content |
|---|---|
| P0 | Entity, period, currency, freshness; primary amount (net result or cash position) |
| P1 | Income and expense totals, budget progress with variance word and sign |
| P2 | Trend ChartPanel, category DataTable |
| P3 | Export, saved views, notes |

**Interaction contract.** Filters (account, date, category, branch) apply to every figure together.
Each figure drills to its transactions with the same filters. Amounts follow the money-figures skill
(`12-data-viz-and-dashboards/money-figures-and-statement-display`) for exact versus compact forms,
with one override: decimals come from the currency's ISO 4217 minor unit, so UGX shows none (owner
default, 2026-11-07; C1). Shares under 1% read "less than 1%", not "0%". Budget overrun shows the
word "Over", the signed variance and colour together. Every chart has a text summary and a table
toggle (PX-A11Y-005). Export carries period, filters, generated-at time and user, and opens with the
same totals.

| Domain state | Treatment |
|---|---|
| Period with no activity | "No activity in this period", not a zero-filled chart |
| Refresh failed | Last valid figures stay with "As of" time and a warning |
| Period not closed | "Provisional - period open" label |
| Mixed currency | Separate totals per currency unless a labelled conversion applies |

**Adaptive.** Compact: one chart at a time, category list below. Medium: chart beside categories.
Expanded and up: analytical grid with filters panel and drill-down ContextPanel.

**VERIFY.** Account mapping to categories; budget period and phasing; cash versus accrual basis;
who may export; rounding rule for compact figures.

**East African context.** Businesses run in UGX with USD costs (imports, rent); period close is often
late, so "provisional" must be explicit. Accountants export to spreadsheets: exports must be exact.

**Acceptance tests.** AT-09.1 dashboard figure = report figure = ledger query, exact, for 12 fixture
periods. AT-09.2 every chart exposes a text summary and a table to the screen reader. AT-09.3 export
totals equal screen totals. AT-09.4 a UGX amount never renders ".00"; a KES amount renders two
decimals. AT-09.5 a 0.4% share reads "less than 1%".

**Rules.** PX-DATA-002, PX-DATA-003, PX-DATA-004, PX-DATA-011, PX-VIZ-001, PX-VIZ-005, PX-A11Y-005,
PX-L10N-001, PX-TABLE-002. **Profiles.** All products' finance areas; Maduuka owner, Aqar, Farm Acre.

## Screen 10: Approvals and expense requests

**Goal.** Approvers decide quickly without losing evidence or accountability.
**Success metrics.** Single approval with attachment reviewed in <= 3 taps from the queue; duplicate
decisions on one item: 0; self-approvals: 0.

| Tier | Content |
|---|---|
| P0 | Pending count by type, the queue, Approve and Decline on the open item |
| P1 | Amount and currency, requester, purpose, dates, policy limit |
| P2 | Attachments, approval chain Timeline, comments |
| P3 | Decided items, delegation settings |

**Interaction contract.** The requester can never approve their own request (enforced on the
server, PX-PRIV-001). Approval limits by amount and role are enforced on the server and the UI shows
the limit. A multi-step chain is visible as a Timeline with the current step. Decline needs a reason
where policy requires it. Delegation while away has start and end dates and is audited. Bulk approve
works only on items of one type under the bulk threshold and shows count and total before the
ConfirmationDialog.

| Domain state | Treatment |
|---|---|
| Already decided elsewhere | "Already approved by Grace Namutebi at 10:12"; actions removed |
| Above my limit | Approve disabled with "Above your limit of USh 5,000,000; goes to Finance Manager" |
| Attachment failed to load | Item cannot be approved until the attachment opens or the approver records that it was reviewed elsewhere |
| Queued offline | "Decision queued - not yet sent" |

**Adaptive.** Compact: queue then focused detail. Medium: queue beside detail. Expanded and up:
bulk review table with selection count and total.

**VERIFY.** Limits by role; chain rules; whether offline decisions are allowed; required reasons;
delegation policy.

**East African context.** Approvers travel and approve on phones over weak networks; attachments
are often photographed receipts, so images are downsampled before display.

**Acceptance tests.** AT-10.1 two devices approve one item: exactly one succeeds, the other shows who
decided. AT-10.2 decline without reason is impossible where required. AT-10.3 a requester token gets
403 approving their own request. AT-10.4 bulk confirm shows count and total equal to the selection.

**Rules.** PX-INTERACT-002, PX-INTERACT-008, PX-PRIV-001, PX-PRIV-006, PX-PRIV-011, PX-VIZ-003,
PX-DESTRUCT-003. **Profiles.** All products' back office; SpannaMax and Farm Acre purchasing.

## Screen 11: Document and contract management

**Goal.** Find, preview, version and control access to documents and contracts.
**Success metrics.** Find a known document by name in <= 2 actions; uploads resumed after a drop:
100%; access revocation effective on the next request.

| Tier | Content |
|---|---|
| P0 | Search, current folder or category, Upload |
| P1 | Document rows: name, type, owner, status, modified date, expiry for contracts |
| P2 | Preview, version history, access list |
| P3 | Activity log, bulk tools |

**Interaction contract.** Preview keeps list scroll and selection. Uploads are resumable in chunks
and verified by checksum (see the dev engine's `tenant-media-upload-lifecycle`). Contracts carry
expiry and renewal dates with a horizon filter. Share links have an expiry and can be revoked.
Restricted documents preview with a viewer watermark (name and time). Access changes confirm and are
audited. Bulk operations show the count before confirming.

| Domain state | Treatment |
|---|---|
| Uploading / paused / resumed | Per-file progress with bytes, retry per file |
| Version conflict | Both versions with author and time; keep both or choose |
| Missing file | "File missing from storage" with reference ID; not a broken preview |
| Cached offline | "Available offline - as of 3 Nov" |

**Adaptive.** Compact: list, preview as a destination. Medium: list beside preview. Expanded and up:
folder tree, list and preview with access panel.

**VERIFY.** Retention rules; who may share externally; watermark requirement; file size and type
limits; contract renewal workflow.

**East African context.** Uploads over mobile data fail mid-way; large scans should wait for Wi-Fi
or explicit consent on metered connections (PX-PERF-011).

**Acceptance tests.** AT-11.1 a 20 MB upload survives a network drop at 50% and resumes without
restarting. AT-11.2 downloaded file hash equals stored hash. AT-11.3 a revoked user is refused on the
next request. AT-11.4 expired share link returns a clear "Link expired" page.

**Rules.** PX-PERF-011, PX-PRIV-001, PX-PRIV-011, PX-STATE-006, PX-OFFLINE-004.
**Profiles.** Aqar (leases), all products' document areas.

## Screen 12: Scheduling and calendar

**Goal.** See commitments and change them safely without double booking.
**Success metrics.** Book an open slot in <= 3 taps; double bookings created in concurrency tests: 0.

| Tier | Content |
|---|---|
| P0 | Date navigation, view (day, week, month, agenda), time zone when it differs |
| P1 | Appointments with time, person, resource or location, status |
| P2 | Availability, conflicts, reminders |
| P3 | History, no-show records |

**Interaction contract.** Store times in UTC; display in the user's zone and show the zone when it
differs from the business's (EAT, UTC+3; CAT, UTC+2; PX-L10N-006). Booking, rescheduling and
cancelling check conflicts on the server; the slot is held only when the server confirms. Reminders
go by SMS or messaging only with recorded opt-in, in a single SMS segment where possible
(PX-NOTIFY-002). No-show marking needs a role and records time. The agenda view is a full keyboard
and screen-reader alternative to the grid.

| Domain state | Treatment |
|---|---|
| Slot taken meanwhile | "Just booked by someone else" with the next free slots |
| No slots | Next available date offered |
| Availability stale | "Availability as of 08:15" with refresh |

**Adaptive.** Compact: agenda or day view. Medium: week. Expanded and up: week or month with the
appointment ContextPanel.

**VERIFY.** Slot length rules; resources (rooms, mechanics, clinicians); cancellation policy;
reminder timing; first day of the week per locale.

**East African context.** No daylight saving in the region, but staff and clients travel across
EAT and CAT and abroad. Customers often have SMS but no data.

**Acceptance tests.** AT-12.1 two users book one slot: one succeeds, the other is told and offered
alternatives. AT-12.2 the agenda is fully operable by keyboard and screen reader. AT-12.3 an
appointment created at 10:00 EAT shows 09:00 for a user in CAT with the zone label.

**Rules.** PX-L10N-006, PX-INTERACT-002, PX-A11Y-003, PX-NOTIFY-001, PX-NOTIFY-002.
**Profiles.** Medic8 (appointments), SpannaMax (workshop bays), Education/LMS (timetable).

## Screen 13: Recruitment or sales pipeline

**Goal.** See how work is spread across stages and act on bottlenecks.
**Success metrics.** Every stage move possible without drag; column counts equal the filtered list.

| Tier | Content |
|---|---|
| P0 | Pipeline, filters, stage summary with counts (and value for sales) |
| P1 | Cards: name, owner, age in stage, priority, value |
| P2 | Preview with history and next step |
| P3 | Lost or closed items, reports |

**Interaction contract.** Only valid transitions are offered. Every card has a "Move to" menu as the
non-drag alternative (PX-A11Y-008; WCAG 2.5.7, A8). Moving to lost or rejected needs a reason. Age
in stage over the threshold shows a word and the age. Value totals per stage are weighted only when
weights are defined and labelled.

| Domain state | Treatment |
|---|---|
| Invalid transition | Refused with the reason and the allowed next stages |
| Moved by someone else | Card updates with "Moved by Joseph at 11:05" |
| Ageing | "In stage 21 days" with word and colour |

**Adaptive.** Compact: stage tabs with a list per stage. Medium: horizontally scrolling lanes with
visible scroll affordance. Expanded and up: full board with preview panel.

**VERIFY.** Stages and allowed transitions; ageing thresholds; weighting; reasons list.

**East African context.** Sales teams work in the field on phones; boards must work without drag
and with intermittent network.

**Acceptance tests.** AT-13.1 every move is possible via the menu. AT-13.2 column counts equal the
filtered list count for 10 filter fixtures. AT-13.3 an invalid transition is rejected with a message.

**Rules.** PX-A11Y-008, PX-VIZ-003, PX-DESTRUCT-003, PX-STATE-006.
**Profiles.** SpannaMax (job pipeline), Aqar (leads), any recruitment or sales module.

## Screen 14: Education course and exam hub

**Goal.** A learner or teacher sees progress and the next commitment and resumes in one step.
**Success metrics.** Resume last lesson in 1 tap; offline submissions shown as confirmed before the
server receipt: 0.

| Tier | Content |
|---|---|
| P0 | Learner or class identity, next commitment (class, exam, deadline), Resume |
| P1 | Course cards with progress and next item |
| P2 | Timetable, exam status, attendance, fees where authorised |
| P3 | Resources, announcements, history |

**Interaction contract.** Resume opens the last position. Downloads show size before starting and
offer Wi-Fi-only (PX-PERF-011). Submissions show "Queued" until the server receipt, then a receipt
with timestamp. Marks show only after release by the authorised role. Guardian and learner views
differ by role. Progress is plain (percentage and items left); no streaks or pressure mechanics
(PX-BLACKLIST-005).

| Domain state | Treatment |
|---|---|
| Downloaded | "Available offline" with size and date |
| Submission queued | "Queued - not yet received by school" |
| Marks unreleased | "Marks not released yet" |
| Fees restricted | Hidden for roles without permission |

**Adaptive.** Compact: next commitment then course list. Medium: courses beside timetable.
Expanded and up: dashboard with timetable, courses and announcements.

**VERIFY.** Marks release rules; guardian access; fee visibility; submission deadlines and late rules.

**East African context.** Learners share phones with family and buy data in small bundles; content
must state its size and work offline.

**Acceptance tests.** AT-14.1 resume opens the last position. AT-14.2 offline submission shows
"Queued" until the server receipt. AT-14.3 roles without permission get no fee fields from UI or API.
AT-14.4 download size shown before every download over 1 MB.

**Rules.** PX-PERF-011, PX-OFFLINE-003, PX-PRIV-002, PX-BLACKLIST-005, PX-PROFILE-008.
**Profiles.** Education/LMS.

## Screen 15: Supply chain operations

**Goal.** Understand stock, transfers, shipments and exceptions, and act on the exceptions first.
**Success metrics.** On-hand equals opening + in - out per item (0 mismatches); exception to the
affected document in 1 tap.

| Tier | Content |
|---|---|
| P0 | Warehouse or branch scope, exception queue (low stock, late shipments, short receipts) |
| P1 | Stock table, transfers in transit, open purchase orders |
| P2 | Route Timeline, supplier, reorder suggestions with their rule |
| P3 | Movement history, activity |

**Interaction contract.** Transfers between branches pass through "In transit", counted as
available in neither branch. Goods received notes match purchase orders with partial receipt
allowed and the shortfall shown. Reorder suggestions state the rule (for example "below 2 weeks of
average sales"). Pending movements are distinct from posted ones. GPS or tracking points older than
the threshold are labelled stale. Document numbers follow the contiguous numbering rule (PX-DATA-013).

| Domain state | Treatment |
|---|---|
| In transit | Quantity with origin, destination and dispatch time |
| Short receipt | Shortfall per line with reason |
| Stale location | "Last seen 3 h ago" |
| Pending movement | "Pending - not posted" |

**Adaptive.** Compact: exception queue first. Medium: table with detail. Expanded and up: table,
map or route Timeline and detail panel.

**VERIFY.** Reorder rule; transfer approval; receipt tolerance; tracking source.

**East African context.** Goods move by road between towns over days; network drops on the route;
branches in different districts reconcile transfers late.

**Acceptance tests.** AT-15.1 on-hand = opening + in - out for 50 item fixtures. AT-15.2 location older
than threshold labelled stale. AT-15.3 in-transit stock counted in neither branch's available.

**Rules.** PX-DATA-004, PX-DATA-013, PX-OFFLINE-004, PX-VIZ-003, PX-VIZ-004.
**Profiles.** Maduuka (multi-branch), Farm Acre (produce and inputs).

## Screen 16: Project funding and draws

**Goal.** Monitor budgets, funding sources and draw requests, and approve draws with full evidence.
**Success metrics.** Disbursed <= approved <= budget enforced in 100% of tests; draws submitted with
missing required documents: 0.

| Tier | Content |
|---|---|
| P0 | Project, funding source, currency scope, draw status |
| P1 | Budget, approved, disbursed, remaining per line |
| P2 | Draw history Timeline, supporting documents checklist |
| P3 | Reconciliation, audit log |

**Interaction contract.** A draw cannot be submitted until required documents are attached. The
requester cannot approve their own draw; approvals follow segregation of duties. Donor-currency and
local-currency amounts both show, with rate, source and date (PX-DATA-011). No optimistic
settlement: a draw is "Disbursed" only when the payment is confirmed. Remaining balance per budget line
is always visible.

| Domain state | Treatment |
|---|---|
| Documents incomplete | Submit disabled with the missing list |
| Over budget line | Blocked with the line and the shortfall |
| Disbursement pending | "Approved - payment pending" |

**Adaptive.** Compact: project summary then draws. Medium: draws beside detail. Expanded and up:
budget-line table with draw panel.

**VERIFY.** Budget structure; donor rules; rate source and timing; approval chain; required documents.

**East African context.** Donor funding in USD or EUR is spent in UGX, KES or RWF; rate dates matter
for audit; field teams submit from low-connectivity sites.

**Acceptance tests.** AT-16.1 disbursed <= approved <= budget enforced on the server and tested.
AT-16.2 report totals equal screen totals. AT-16.3 an approver who is the requester is refused.
AT-16.4 submit disabled until every required document is present.

**Rules.** PX-DATA-004, PX-DATA-005, PX-DATA-011, PX-PRIV-001, PX-PRIV-011, PX-VIZ-003.
**Profiles.** Farm Acre (donor projects), any project-finance module.

## Cross-screen checks

| Check | Screens | Pass condition |
|---|---|---|
| Server acknowledgement before success | All | No "Saved", "Paid", "Approved" before the server confirms |
| Drill parity | 01, 08, 09, 15, 16 | Figure equals its drill-down total, exact |
| Concurrency | 02, 06, 10, 12, 13 | Two actors, one winner, loser told who won |
| Shared-device safety | 02, 04, 05, 07 | Idle lock per owner defaults (POS 2 min, clinical 5 min, back office 15 min), work preserved, actions attributed |
| Currency correctness | 02, 08, 09, 16 | ISO 4217 minor unit respected; no cross-currency sums without a labelled conversion |
| Non-drag alternative | 13, any reorderable list | Every drag action has a menu or button equivalent |
