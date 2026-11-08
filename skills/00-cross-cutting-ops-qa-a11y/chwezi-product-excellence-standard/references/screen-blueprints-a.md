# Screen blueprints A: shared screen contract and screens 01-08

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

A blueprint is a pattern contract, not a product requirement: what a screen of this kind must declare, prove and survive.
Fields, prices, calculations, clinical rules and permissions come from product requirements (PX-MANDATE-004); **VERIFY**
marks a question to answer from them, never with a guess. Screens 09-16: [screen-blueprints-b.md](screen-blueprints-b.md).
Components: [component-contracts-a.md](component-contracts-a.md), [component-contracts-b.md](component-contracts-b.md).
Platform facts cite [currentness-register.md](currentness-register.md) row IDs (e.g. M3); no VERIFIED row means NOT_ASSESSED.

## Shared screen contract

Write this contract before code (PX-AGENT-004). Each blueprint below lists only what differs from or adds to it.

### Contract fields

| Field | What to write | Evidence that it is done |
|---|---|---|
| Identity | Screen ID, product profile, roles allowed, requirement IDs for every field and action | Reviewer finds no field without a source |
| User goal and success metric | One sentence goal plus numeric targets: actions (taps/keys), time on task, error rate | Timed task record on the reference device |
| Anatomy by tier | P0-P3 table (below) with component names | Screenshot at 360x640 dp, 100% text |
| Interaction contract | Inputs, focus order, keyboard/IME type, validation timing, back behaviour, idempotency, timeouts | Automated UI tests per path |
| State table | Unified states (below) marked applies / N/A with reason, plus domain states | One screenshot or assertion per row |
| Adaptive behaviour | Composition per width class and compact height | Screenshot per class |
| Domain rules to verify | VERIFY list answered with requirement references | Answers linked in the contract |
| East African context | Currency, language, network, device and sharing conditions that change the design | Fixture data includes them |
| Acceptance tests | Numbered `AT-<screen>.<n>`, each with method and pass threshold | Test report; unrun tests reported NOT_ASSESSED |
| Rule IDs and profile | Applicable PX rules; profiles that use the screen | Traceability row in the evidence pack |

### Priority tiers

| Tier | Content | Check |
|---|---|---|
| P0 | Current context (tenant, outlet or ward, role, period, freshness) and the primary task control | Visible without scrolling at 360x640 dp and 100% text |
| P1 | The actionable record or primary figure, with status and unit | Highest emphasis; never a bare number |
| P2 | Supporting fields and evidence, grouped by meaning | Labels not repeated per cell |
| P3 | History, metadata, optional tools | Progressive disclosure; never pushes P0 or P1 below the fold |

The most frequent action sits beside the dominant content, never only in an overflow menu. Every amount, quantity and identifier
uses tabular figures (PX-TYPE-004). One dominant next action per screen or panel (PX-INTERACT-004), coloured with the shared
next-step accent (PX-COLOUR-004).

### Interaction defaults

- **Acknowledgement.** Every input shows a visible response within 100 ms at p95 on the reference device, measured apart from
  server completion (PX-INTERACT-001; a Chwezi target, calibrate per product).
- **No silent waiting.** Reads show recovery (retry, keep working, cancel) after 15 s; writes after 30 s unless the domain sets
  another bound (PX-INTERACT-003).
- **Idempotency.** Every create, payment and approval carries a client-generated key made when the draft starts; double taps,
  timeouts and replays yield one record (PX-INTERACT-002).
- **Validation.** Errors appear on blur or submit, never per keystroke; a failed submit moves focus to the first invalid field and
  announces it (PX-FORM-003).
- **Work survives.** Drafts, carts, filters, scroll and selection survive rotation, resize, process death and app switch. Test:
  start the task, kill the process (`adb shell am kill <package>` or OS equivalent), reopen; the draft is intact
  (PX-INTERACT-006).
- **Back.** Android targetSdk 36 has predictive back on by default (M8): no business logic in `onBackPressed`; intercept back only
  to confirm discarding unsaved data. iOS edge swipe and browser back behave the same way (PX-NAV-003).
- **Success honesty.** A network write never shows final success before server acknowledgement (PX-STATE-002); queued work is
  labelled "Pending" or "Queued", never "Saved" or "Paid".

### Unified state table

Every data screen declares each row as applies or N/A with a reason (PX-STATE-001).

| Code | State | Required treatment |
|---|---|---|
| ST-LOAD | First load | Static skeleton in final geometry, no shimmer loop; layout shift after content arrives <= 0.1 (CLS-equivalent); one polite status announcement |
| ST-REFRESH | Refreshing | Current content stays; progress in the header; screen never blanks |
| ST-CONTENT | Populated | Baseline screenshot |
| ST-EMPTY | Nothing yet | Says what will appear and offers one start action; zero is not "unavailable" (PX-STATE-004) |
| ST-NOMATCH | Filtered to nothing | Shows active filters, "0 of N", and a clear-filters action |
| ST-OFFLINE | Offline with cache | Data labelled "As of 14:02"; mutations queued or blocked by stated rule (PX-OFFLINE-004) |
| ST-QUEUED | Local change pending | Row marked "Pending", neutral or info styling, never success styling (PX-OFFLINE-003) |
| ST-SYNC | Syncing | Progress with count ("Sending 3 of 12"); user can keep working |
| ST-CONFLICT | Conflict | Both versions with actor and time; authorised user chooses; nothing silently dropped (PX-STATE-006) |
| ST-ERROR | Recoverable error | What happened, what is still safe, what to do; retry; reference ID secondary (PX-STATE-005) |
| ST-RESTRICT | Permission restricted | Explains the limit and who can grant it; masked values read "Restricted" (PX-PRIV-006) |
| ST-EXPIRED | Session expired or idle-locked | Re-authentication keeps the draft and returns to the same place |
| ST-DONE | Success | States exactly what was saved, queued or completed and offers the next step (PX-STATE-003) |

**Presentation passes** (every screen, PX-QA-002, PX-QA-003): 200% text and the platform maximum (M13, I3); TalkBack, VoiceOver
and a desktop screen reader on web; keyboard only; light and dark; Arabic RTL and the product's longest declared language;
greyscale (status still readable).

### Adaptive defaults

| Width class (M3, VERIFIED) | Range | Default composition |
|---|---|---|
| Compact | < 600 dp | Single column; records open as destinations; bottom navigation 3-5 items; primary action in bottom 40% of the screen |
| Medium | 600-839 dp | Navigation rail; list beside selected record where content supports it |
| Expanded | 840-1199 dp | Rail or sidebar; list-detail; filters and context panel together |
| Large | 1200-1599 dp | Persistent labelled sidebar; context panel; tables (opt-in via `supportLargeAndXLargeWidth`) |
| Extra-large | >= 1600 dp | As Large with a capped content width; no stretched cards or line lengths |

Compact height (< 480 dp, M4, phone landscape) collapses headers into a single line. At targetSdk 36 orientation locks are ignored
on displays >= 600 dp smallest width (M9): no tablet screen may rely on portrait lock. Rotation and resize keep selection, drafts,
scroll and pending operations (PX-NAV-002).

### Fixtures, budgets and naming

- **Data fixture set** (every screen): 60+ character names in Luganda, Swahili and Arabic; zero; negatives where valid;
  billion-scale UGX amounts; responses delayed 3 s and 30 s; expired session; permission revoked mid-session; sync interrupted at
  50%. Business rules are unit-tested apart from UI.
- **Low-end budget**: measure on the project's declared reference device (PX-PERF-001) with a realistic dataset. No whole-screen
  recomposition per keystroke; lists over 50 rows virtualised; images decoded at display size; zero animation frames once the
  screen settles (PX-MOTION-003).
- **Test tags**: `<screen>.<region>.<element>` in lowerCamelCase with stable record IDs, never list indexes: `pos.cart.total`,
  `pos.cart.line.<sku>`, `queue.patient.<ticket>.action`. The same string is the Compose `testTag` and the web `data-testid`.
- **Acceptance tests**: run on the reference device unless stated; timing targets are p95 over at least 20 runs; each test names
  its method (automated UI, instrumented, timed manual, review).

## Screen 01: Role-aware business dashboard

**Goal.** A manager sees how the business is doing and what needs them, then acts.
**Success metrics.** First meaningful KPI <= 2.5 s from cold start with cached data; 80% of users name the screen's next action in
a five-second test (PX-QA-010); drill from KPI to report in 1 tap.

| Tier | Content |
|---|---|
| P0 | Context header: tenant, branch or "All branches", role, period, freshness ("As of 09:40") |
| P1 | One primary KpiCard; up to three urgent actions, each linked to its records |
| P2 | Two to four supporting KPI cards (max four per group); at most one insight line |
| P3 | Recent activity, shortcuts, one trend ChartPanel |

**Interaction contract.** A KPI tap opens the report filtered to the same period and branch, and the report total equals the KPI
exactly. An alert opens the affected records (PX-NAV-005). A period or branch change updates every widget together; mixed periods
are never visible at once. Returning keeps scroll and filters (PX-NAV-006). "Live" appears only on push-fed figures.

| Domain state | Treatment |
|---|---|
| Stale | Age above the threshold (default 15 min, tenant-configurable) shows a "Stale" chip with the as-of time |
| Partial failure | The failed widget shows its own error and retry; the others render |
| Zero vs unavailable | "0" with period for real zero; "Not available" with reason when unknown |
| Mixed currency | Branches in different currencies are shown separately unless a labelled conversion (rate, source, time) applies |

**Adaptive.** Compact: header, primary KPI, urgent actions, KPI cards in two columns, insight, activity. Medium: two columns.
Expanded: three columns plus a ContextPanel for the selected alert. Large and up: twelve-column grid with capped card width.

**VERIFY.** Widget set per role (who may see margin, cost, payroll); each KPI's definition (gross or net, tax-inclusive or not);
business-day cut-off for trading after midnight; stale threshold.

**East African context.** Owners of several branches check from a phone on mobile data while away from the shop: payload is
delta-refreshed and small; branch switching is one tap from the context strip.

**Acceptance tests.** AT-01.1 cold open to first KPI <= 2.5 s. AT-01.2 role matrix (3 roles x every widget) asserted, and a
cashier token gets no margin or cost fields from the API (PX-PRIV-001). AT-01.3 KPI total equals report total, exact, for 10
fixture periods. AT-01.4 data aged 16 min shows "Stale". AT-01.5 one widget endpoint returns 500: other widgets render, failed one
offers retry. AT-01.6 at 200% text the primary value is not truncated and the screen reader reads the full amount.

**Rules.** PX-DATA-002, PX-DATA-007, PX-DATA-009, PX-OFFLINE-004, PX-NAV-005, PX-NAV-006, PX-PRIV-002, PX-INTERACT-004,
PX-VIZ-005. **Profiles.** Maduuka (owner, branch manager), Medic8 (administrator), SpannaMax (manager), Farm Acre (agronomist
summary); Aqar uses Screen 08.

## Screen 02: Retail point-of-sale transaction

**Goal.** Identify items, adjust quantities, take payment and issue a receipt with the fewest actions and zero doubt about what
was charged. A fuller review sits in `examples/worked-review-pos-checkout.md`.
**Success metrics.** Repeat sale of one known item: scan, Pay, confirm tender = 3 actions. Three-item cash sale by a trained
cashier: median <= 20 s scan-to-receipt (Chwezi target; calibrate per tenant from the first measured release, PX-PERF-010).
Duplicate sales 0; lost sales 0.

| Tier | Content |
|---|---|
| P0 | Cart total (largest figure on screen), outlet, cashier, shift state, scan target, Pay |
| P1 | Cart lines (name, quantity, unit price, line total), last-scan feedback, queue and sync status |
| P2 | Product search and favourites grid, customer (tenant "Walk-in" by default), discount and tax lines when authorised |
| P3 | Parked carts, recent sales, reprint, X-report |

**Scanning (PX-INTERACT-015).** Keyboard-wedge and serial scanners deliver into the scan target without the cashier focusing it.
The same code read again within the debounce window (tenant-configurable 300-800 ms, default 500 ms) counts once, unless the
cashier turns on repeat mode; different codes are never debounced. A successful scan shows the line within 150 ms p95, with an
optional beep or haptic (PX-INTERACT-014). An unknown code opens search with the code prefilled and is announced; "Add product"
appears only for roles allowed to create products. Camera scanning offers torch and manual entry. Weighed and price-embedded
barcodes are parsed only by the tenant's configured prefix rule (VERIFY).

**Quantity and keypad (PX-INTERACT-016).** Quantity, price and tender use the in-app NumericKeypad with keys >= 56 dp. Setting
quantity to 0 removes the line with a 5 s undo. UGX entry has no decimal key (ISO 4217 minor unit 0, C1); fractional quantities
only for products sold by measured units.

**Park and resume.** Park stores the cart with a label (customer name or "Cart 14:02"), survives process death, and resumes with
one tap. Parked carts are listed at shift close and must be resumed, carried over or cancelled with a reason before the Z-report.
Whether a parked cart keeps park-time prices is a VERIFY item; the screen shows any price change on resume.

**Discounts and overrides.** Price override and discount are capped by role. Above the cap the SupervisorOverride sheet takes a
supervisor PIN and a reason; the audit records cashier, supervisor, before and after (PX-PRIV-011).

**Tender.** Split tender across cash, mobile money, card, customer credit and voucher. The remaining balance is shown above the
tender list and Pay completes only at zero remaining (or when credit is allowed). Credit needs a named customer, never Walk-in.
Cash offers quick-tender buttons (exact amount plus common notes; denominations are a VERIFY item) and shows change due as the
largest figure. The cash drawer opens only when a cash tender completes, or on an authorised "No sale" with a reason.

**Mobile money state machine (PX-DATA-010).** Initiated, then prompt sent (awaiting customer approval), pending provider
confirmation, then exactly one of confirmed, failed (with reason) or timed out. A countdown shows the provider timeout (VERIFY per
provider). On time-out the only offered next action is "Check status", which queries with the same idempotency key; "Try again"
appears only after the check reports not paid. The app never retries a charge on its own. A late confirmation after time-out
reconciles to the same sale. Switching to another tender while a request is pending first cancels it and checks status. Only
confirmed shows as paid; the provider reference prints on the receipt. Reversal or refund needs a reason, a permitted role and an
audit entry.

**Commit and numbering.** Pay shows busy, keeps its width and blocks repeat activation until resolved. The receipt number is
allocated at issue from the tenant's locked counter (contiguous per tenant and type; PX-DATA-013). An offline sale carries a
"Provisional" tag and a local reference until the server issues the number. A numbered sale is voided with reason, user and time,
never deleted.

**Receipt (PX-PRINT-001).** Print to 58 mm or 80 mm thermal (column counts verified on the target printer), A4 or PDF; send by SMS
or share sheet. Reprints say "COPY". A missing printer never blocks the sale: the print joins a queue with visible status. When
fiscal e-invoicing (e.g. URA EFRIS) is on, the fiscal number and verification code appear, and a pending fiscalisation is labelled
as pending.

**Shift.** Open with a counted float; X-report at any time; close with cash counted by denomination against expected, and a reason
for any variance above the tenant threshold. Close is blocked while a mobile money request is unresolved.

**Offline queue policy.** Whether offline sale is allowed, and for which tenders, is a tenant rule (VERIFY). Card and mobile money
need the provider and cannot complete offline. The queue states its maximum age and size, replays oldest first, relies on server
idempotency, and surfaces each conflict (price changed, stock short) per sale in the sync queue; nothing is silently changed.

**Stock, customer and shared device.** Out-of-stock follows the tenant rule: block, or sell with a visible shortage flag; never a
silent negative. The customer defaults to the tenant's Walk-in record, never guessed. Shared device: idle lock after 2 min (owner
default, tenant-configurable, PX-PRIV-008) with a warning; the cart survives; a PIN switch attributes later sales to the new
cashier.

| Domain state | Treatment |
|---|---|
| Shift not open | Sale blocked; one action "Open shift" |
| Tender partial | Remaining balance prominent; Pay disabled with reason |
| Awaiting approval / pending | Countdown, "Ask the customer to approve on their phone", cancel available |
| Timed out | "Payment not confirmed yet"; "Check status" only |
| Failed | Provider reason in plain words; other tenders offered |
| Sale queued | "Saved on this device - provisional", queue count in header |

**Adaptive.** Compact: two stages, Items and Cart, with a persistent bottom bar holding total and Pay in the bottom 40% of the
screen. Medium: product grid 60% and cart 40%. Expanded: grid, cart and tender panel. Large and up: documented keyboard shortcuts
for search, quantity, park and pay that do not clash with browser, OS or screen-reader keys (PX-INTERACT-017). Compact height: the
header collapses into the total bar.

**VERIFY.** Tax inclusive or exclusive; cash rounding rule (PX-DATA-012); discount caps; offline tenders; queue age and size;
mobile money timeout; note denominations; mandatory receipt fields; fiscal rules; return window and void permissions; parked-cart
limit and price rule.

**East African context.** UGX totals reach ten or more digits without decimals; mobile money is a main tender; counter phones are
shared; Bluetooth thermal printers drop; power cuts drain batteries mid-shift; SMS receipts cost the customer no data; product
names in Luganda or Swahili run long.

**Acceptance tests.** AT-02.1 endurance: 100 consecutive scripted sales with mixed tenders give 0 duplicates, 0 lost, receipts
total = shift expected = ledger postings (exact); heap after sale 100 within 10% of heap after sale 10; no frozen frame > 700 ms
(P3). AT-02.2 scan-to-line <= 150 ms p95. AT-02.3 same code at 400 ms counts 1; at 900 ms counts 2. AT-02.4 tap Pay 10 times
quickly: 1 sale. AT-02.5 kill the app while mobile money is pending: on reopen the sale shows pending with the same key and
resolves by status query. AT-02.6 after time-out the network log shows a status query before any new charge request. AT-02.7 UGX
1,234,567 renders with no decimals and the screen reader reads the whole amount. AT-02.8 airplane mode, 20 sales, reconnect: 20
synced in order, numbers contiguous, provisional tags replaced. AT-02.9 shift close variance computed exactly for 5 fixtures.
AT-02.10 printer off: sale completes, print queued and retried. AT-02.11 idle 2 min: lock, cart intact, next sale attributed to
the new PIN. AT-02.12 unknown code opens search prefilled.

**Rules.** PX-INTERACT-002, PX-INTERACT-014, PX-INTERACT-015, PX-INTERACT-016, PX-INTERACT-017, PX-DATA-010, PX-DATA-011,
PX-DATA-012, PX-DATA-013, PX-PRINT-001, PX-OFFLINE-001, PX-OFFLINE-002, PX-OFFLINE-003, PX-PRIV-008, PX-PRIV-011, PX-PROFILE-001,
PX-PROFILE-002, PX-DATA-008.
**Profiles.** Maduuka (retail, pharmacy till, restaurant bill), SpannaMax (parts counter).

## Screen 03: Restaurant order and kitchen flow

**Goal.** Waiters and the kitchen share one accurate view of active orders.
**Success metrics.** Order reaches the kitchen display <= 2 s on the local network; a standard two-item order with one modifier <=
6 taps from table select to send; wrong-item rate tracked per shift.

| Tier | Content |
|---|---|
| P0 | Table or seat, order status lane, Send to kitchen |
| P1 | Items with modifiers, course, notes; allergy flags (icon + word) |
| P2 | Ticket age per order, station routing, bill and payment panel |
| P3 | Order history, transfers, voids |

**Interaction contract.** Create, amend, send, acknowledge, serve and close are role-authorised transitions. Courses can be held
and fired. Items route by station (bar, grill, cold) per menu setup. A void after send needs a reason and a permitted role, and
appears on the kitchen ticket. The kitchen bump has a 10 s undo. Bills split by item or seat and merge across tables; table
transfer keeps the order history. Payment reuses the Screen 02 tender rules.

| Domain state | Treatment |
|---|---|
| Sent / acknowledged / ready / served | Word and icon per stage on both waiter and kitchen views |
| Ticket ageing | Age timer with word and colour at tenant thresholds (for example "Late, 18 min") |
| Held course | "Held" label; Fire action |
| Kitchen offline | Waiter sees "Kitchen not receiving"; local-network fallback or print ticket |

**Adaptive.** Compact (waiter phone): my tables first, order as a destination. Medium and expanded: table map beside the open
order. Kitchen display: large high-contrast cards in columns by age, no navigation chrome, operable by bump bar or touch.

**VERIFY.** Modifier pricing; station routing map; course model; void and comp permissions; service charge and tax treatment;
whether orders may be sent with the internet down.

**East African context.** Internet often fails while the local network stays up: kitchen traffic must not depend on the cloud
round-trip. Kitchens are bright and hot; displays sit 1-2 m from cooks.

**Acceptance tests.** AT-03.1 send-to-display <= 2 s p95 on local network with internet cut. AT-03.2 modifier price sums
unit-tested for 20 menu fixtures. AT-03.3 30 open tables scroll with no frozen frame. AT-03.4 bump then undo within 10 s restores
the ticket. AT-03.5 allergy flag readable in greyscale. AT-03.6 kitchen text legible at 2 m (cap height measured; NOT_ASSESSED
until run).

**Rules.** PX-INTERACT-002, PX-INTERACT-005, PX-COLOUR-002, PX-DESTRUCT-003, PX-OFFLINE-005, PX-VIZ-003.
**Profiles.** Maduuka (restaurant, hotel restaurant).

## Screen 04: Pharmacy dispensing

**Goal.** Find the medicine, confirm a safe batch and quantity, and issue an accurate, traceable sale or dispense.
**Success metrics.** Non-controlled item from search to cart <= 4 actions; expired-batch sale attempts that succeed: 0;
controlled-drug dispenses with two distinct users: 100%.

| Tier | Content |
|---|---|
| P0 | Patient or customer (when a prescription applies), item search, Dispense |
| P1 | Selected item, batch, expiry, quantity in the dispensing unit, availability |
| P2 | Prescription link and number, prescriber, pack and unit conversion, price |
| P3 | Dispense history, label reprint, stock by batch |

**Interaction contract.** The default batch is FEFO (first expiry, first out) among sellable batches; choosing another needs a
reason. An expired or recall-blocked batch cannot be added (hard block, no override). A near-expiry batch (tenant threshold) shows
a warning with the date. Pack and unit conversion (strip, box, bottle) is explicit and shown on the line. Substitution comes only
from the maintained equivalence list and is recorded. Controlled drugs need prescription number, prescriber, patient identifier
and two-person sign-off: the dispenser, then a different verifier entering their own PIN; the register entry is written in the
same transaction. Label dosage text comes from the prescription record, never generated (PX-DATA-006). Payment reuses Screen 02.

| Domain state | Treatment |
|---|---|
| Out of stock / insufficient | Shows available quantity; no silent part-fill |
| Expired or recalled batch | Blocked with reason and date |
| Near expiry | Warning chip with expiry date |
| Awaiting verifier | "Needs second pharmacist"; dispenser cannot self-verify |
| Prescription required, missing | Dispense disabled with reason |

**Adaptive.** Compact: guided stages (patient, items, verify, pay). Medium: search beside item detail. Expanded and up: dense
batch table with expiry sort and the patient pane.

**VERIFY.** Controlled-drug schedule list and register format; near-expiry threshold; substitution policy; label fields; who may
verify; whether insurance or credit applies.

**East African context.** Counter screens face waiting customers: patient names and drug names for sensitive conditions are masked
on any customer-facing display. Mixed retail and prescription sales happen at one till.

**Acceptance tests.** AT-04.1 20 attempts to add an expired batch: 0 succeed. AT-04.2 FEFO picks the earliest valid expiry in 100%
of 30 fixtures. AT-04.3 a controlled drug cannot complete with one user, or with the same user entering two PINs. AT-04.4 every
dispense writes batch, quantity, dispenser, verifier where applicable and time to the audit log. AT-04.5 the UI never shows dosing
text absent from the prescription record (review of all label templates).

**Rules.** PX-DATA-004, PX-DATA-006, PX-PRIV-002, PX-PRIV-011, PX-INTERACT-009, PX-DESTRUCT-003.
**Profiles.** Maduuka (pharmacy), Medic8 (pharmacist).

## Screen 05: Clinical priority queue

**Goal.** A clinician separates urgent from routine patients and acts on the right person.
**Success metrics.** Most urgent waiting patient identified in <= 3 s (five-second test, 90% correct); wrong-patient actions in
testing: 0.

| Tier | Content |
|---|---|
| P0 | Ward or clinic, priority groups in order, the most urgent patient first |
| P1 | Per patient: triage category (colour + word + position), two identifiers, waiting time, owner |
| P2 | Latest observations with age, location, action (call, acknowledge, escalate) |
| P3 | Queue history, escalation log |

**Interaction contract.** Triage categories follow the facility's configured scale; nothing is hard-coded. Category is shown three
ways: colour, word and group position, never colour alone (PX-COLOUR-002). Any action on a patient first matches two identifiers
(for example name and record number). Acknowledge and escalate need permission and record a reason. Each observation carries its
own age threshold; older readings show "Stale".

**Shared-screen masking.** Wall or waiting-room mode shows ticket number and initials only: no full name, diagnosis or complaint.
Masking is a display mode chosen per device, not a per-screen toggle, and survives restart. Screens with patient data block
screenshots and blank the recents preview where the platform allows (PX-PRIV-007).

| Domain state | Treatment |
|---|---|
| Empty queue | "No patients waiting" with as-of time; never "All clear" |
| Stale observation | "Stale" label with reading time |
| Restricted | Masked fields read "Restricted" |
| Idle-locked | 5 min lock (owner default, configurable) preceded by a warning; queue hidden while locked |

**Adaptive.** Compact: list with expandable detail. Medium: list and patient detail. Expanded and up: queue, patient context and
observation trend side by side. Wall display: masked, large type, no input.

**VERIFY.** Triage scale and its colours and words; observation age thresholds per vital; escalation paths and roles; identifiers
used for matching; data allowed on shared displays.

**East African context.** One screen often serves several clinicians at a busy outpatient desk; patients see the screen; power and
network cuts are common, so the cached queue states its age.

**Acceptance tests.** AT-05.1 greyscale screenshot distinguishes every category by word and position. AT-05.2 observations older
than threshold show "Stale". AT-05.3 wall mode: automated scan finds no full name or diagnosis string. AT-05.4 screen-reader order
equals priority order. AT-05.5 idle lock at the configured minutes, with warning first. AT-05.6 an action on a patient whose
second identifier does not match is refused.

**Rules.** PX-COLOUR-002, PX-DATA-006, PX-PRIV-002, PX-PRIV-007, PX-PRIV-008, PX-VIZ-004, PX-A11Y-002, PX-PROFILE-003,
PX-PROFILE-004. **Profiles.** Medic8 (nurse, clinician, receptionist).

## Screen 06: Inventory stock count

**Goal.** Count physical stock accurately with little repetition, then post one traceable adjustment.
**Success metrics.** Scan-to-next-item <= 300 ms p95 on a 500-line count; lines lost on app kill: 0.

| Tier | Content |
|---|---|
| P0 | Count document (zone or bin, snapshot time), scan or search target |
| P1 | Current item, counted quantity entry, unit |
| P2 | Expected quantity (hidden in blind count), variance, reason, batch and expiry |
| P3 | Counted list, recount queue, approvals |

**Interaction contract.** Every entry autosaves locally. Expected quantity is hidden in blind-count mode. Variance = counted minus
expected at the snapshot time; movements after the snapshot are reported separately, not mixed in. Variance above the tenant
threshold triggers a recount. Several counters may work on one count and their lines merge with conflicts shown. The count
document is numbered at post, not at draft; posting is one atomic adjustment needing the permitted role.

| Domain state | Treatment |
|---|---|
| Duplicate scan | Asks "Add to count or replace?" per tenant rule |
| Inactive item | Shown with "Inactive"; counted but flagged |
| Recount required | Line marked with reason |
| Awaiting approval | Adjustment not posted; label says so |

**Adaptive.** Compact: thumb-reach rows with the NumericKeypad. Medium and expanded: list beside item detail. Large: bulk review
table for approvers.

**VERIFY.** Blind count default; recount threshold; batch and expiry capture; who approves; whether stock movement is frozen
during counts.

**East African context.** Counts happen in poorly lit stores with no signal; devices are shared by casual staff; product names mix
languages.

**Acceptance tests.** AT-06.1 500-line count keeps scan-to-next <= 300 ms. AT-06.2 kill mid-count loses 0 lines. AT-06.3 variance
unit tests include negatives and zero. AT-06.4 posting creates one adjustment document with audit entries per line.

**Rules.** PX-INTERACT-006, PX-INTERACT-015, PX-OFFLINE-002, PX-DATA-004, PX-DATA-013, PX-DESTRUCT-003.
**Profiles.** Maduuka (inventory), SpannaMax (parts store), Farm Acre (input stores).

## Screen 07: Hotel room and housekeeping

**Goal.** Housekeeping staff see their assigned rooms and finish each task quickly.
**Success metrics.** Routine clean marked complete <= 10 s and <= 3 taps from the list.

| Tier | Content |
|---|---|
| P0 | My rooms, ordered by priority (arrivals first) |
| P1 | Room number, status (icon + word), task, Complete |
| P2 | Checklist, consumables, notes |
| P3 | History, maintenance issues |

**Interaction contract.** Status vocabulary: dirty, cleaning, clean, inspected, out of order; each an icon and a word. Routine
completion is one tap where the checklist is standard; exceptions open detail. Supervisors inspect before a room becomes sellable
where the tenant requires it. A maintenance issue takes a photo (AttachmentPicker). "Do not disturb" or "skipped" needs a reason.
Minibar consumption posts to the guest folio. Staff see only assigned rooms.

| Domain state | Treatment |
|---|---|
| Completed offline | Queued with the original completion time |
| Out of order | Not assignable; reason shown |
| Awaiting inspection | "Clean - not inspected" |

**Adaptive.** Compact: My rooms list. Medium: floor plan or grid beside room detail. Expanded and up: rota table for supervisors.

**VERIFY.** Status set; inspection rule; consumable price list; folio posting rule.

**East African context.** Wi-Fi coverage in corridors is patchy; staff may read English as a second language, so icons pair with
words in the declared languages.

**Acceptance tests.** AT-07.1 timed script: routine clean <= 10 s, <= 3 taps. AT-07.2 staff token returns 0 unassigned rooms from
the API. AT-07.3 offline completion syncs with its original timestamp.

**Rules.** PX-INTERACT-005, PX-COLOUR-002, PX-PRIV-001, PX-OFFLINE-002, PX-L10N-009.
**Profiles.** Maduuka (hotel).

## Screen 08: Property manager dashboard

**Goal.** Monitor collections, occupancy and maintenance across a portfolio, then act on arrears and urgent work.
**Success metrics.** Arrears total to the tenant ledger in 1 tap; due, received and reconciled never conflated (0 label mismatches
in audit).

| Tier | Content |
|---|---|
| P0 | Portfolio or property, period, currency scope, freshness |
| P1 | Due, received, reconciled, outstanding; urgent work orders |
| P2 | Occupancy, arrears ageing buckets, lease expiries in horizon |
| P3 | Unit status grid, tenant requests, activity |

**Interaction contract.** KPIs drill to the ledger with the same filters. Work orders open with assignee, priority and SLA clock.
Mobile money received but not yet reconciled is shown as "Received - not reconciled", never as settled (PX-DATA-005). USD and UGX
leases are totalled separately unless a conversion with rate, source and date is shown (PX-DATA-011).

| Domain state | Treatment |
|---|---|
| Payment pending | Label "Pending"; excluded from received |
| SLA breached | Word and time overdue, not colour alone |
| Scope restricted | Caretaker sees only assigned properties |

**Adaptive.** Compact: overdue and collections first. Medium: two columns. Expanded and up: unit table with tenant ContextPanel.

**VERIFY.** Ageing buckets; reconciliation rule; currency policy per lease; SLA targets by priority.

**East African context.** Many leases are in USD with rent paid in UGX by mobile money; landlords review from abroad on a phone.

**Acceptance tests.** AT-08.1 collected + outstanding = due per period (exact, 12 fixtures). AT-08.2 a user scoped to property A
gets 0 rows of property B from UI and API. AT-08.3 USD and UGX never summed without a labelled conversion.

**Rules.** PX-DATA-004, PX-DATA-005, PX-DATA-011, PX-PRIV-001, PX-PRIV-002, PX-PROFILE-006. **Profiles.** Aqar.

