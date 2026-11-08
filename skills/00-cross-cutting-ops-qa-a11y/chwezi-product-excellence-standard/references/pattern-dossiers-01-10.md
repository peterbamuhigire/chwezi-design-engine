Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Shared contract: [pattern-dossier-contract.md](pattern-dossier-contract.md)

# Pattern dossiers PD-01 to PD-10

Field, catalogue, checkout and early money patterns. Each dossier adds only what is specific to its
pattern; reading order, region contract, state set and evidence pack come from the shared contract.
A value tagged "proposed" is proposed (owner to confirm): a Chwezi starting value, calibrated
on the product's baseline device, that may be changed only through a DDR until the owner confirms it.
Platform figures are cited through the currentness register, never restated here as fact.

## PD-01 — Living-asset care guide with photo capture

- **Family:** F1 Field and farm operations. Lead product: Farm Acre.
- **Archetype:** AR-11 Capture / field form + AR-01 Welcome / discovery.
- **Pattern:** A record built around one living asset (a crop block, seedling batch or tree) where a
  photograph is the fastest way in. The reference wins attention with botanical imagery, a calm
  green-and-cream palette and short detail cards behind a bottom bar. The reusable idea is
  "photograph first, attach meaning second": care guidance arrives as cards under the asset, not as
  a manual the user must search.
- **Primary task and success metric:** Photograph a crop, attach the image to the correct field
  record and see the next care action. Target: capture-to-saved in at most 3 taps from the record,
  and the save completes with no network.
- **Anatomy (priority order):**
  1. Asset header: block or crop name, plot, planting date, this record's sync badge.
  2. Capture control: one camera action plus a gallery fallback; the viewfinder is its own screen.
  3. Latest observation: newest thumbnail with capture time, observer name and location tag state.
  4. Next care action: exactly one card, for example "Scout for armyworm by Thursday", with due date.
  5. Observation history: dated photo list; long advisory text expands in place.
- **Domain states:** camera permission denied (gallery offered, settings link); low light detected
  (a hint, never a block); photo compressed and queued (size and queue position shown); upload failed
  after retries (manual retry, photo kept); advisory lookup unavailable offline (record saves,
  advice marked "waiting for connection"); device storage nearly full (warning before capture).
- **Kaizen corrections:**
  - Source "avoid tiny botanical text", upgraded: crop and variety names render at body size or
    larger; a scientific name may appear as secondary text but is never the only identifier.
  - Source "separate camera capture from information panels", upgraded: closing the viewfinder
    returns to the record with the new photo selected and focus in its caption field.
  - Added: leaf artwork lives only in empty states and onboarding, never behind data.
  - Added: a photo never substitutes for a measurement; plant count, height and pest severity are
    typed fields with units.
- **Adaptive behaviour:**
  - Compact: one column; capture is the single filled action, pinned within thumb reach; history
    uses 72 dp thumbnails in a lazy list.
  - Medium: field list beside the selected asset; capture opens full screen and returns to the pane.
  - Expanded: field list, asset record and a comparison panel showing two dated photos side by side
    for agronomist review.
- **East African context:** the baseline handset has 2 GB RAM and a modest camera, so compress on
  device to 300 KB or less (proposed) before queueing and hold originals for Wi-Fi or explicit
  consent. Glare in open fields calls for the high-contrast light theme. Local crop names in
  Luganda and Swahili are searchable aliases. Extension officers often carry one phone for many
  farmers, so the farmer is chosen before the shutter, not after.
- **Chwezi application:** Farm Acre "Crop observation" inside a field record, used by field officers
  while scouting and reviewed by agronomists on a tablet.
- **Acceptance tests:**
  1. Given airplane mode, when an officer captures and saves, then the record shows "Queued (1)"
     with file size; after reconnect it shows "Synced" with a time, and the server holds one image.
  2. Given a 12 MP source photo, then the queued file is at most 300 KB and the list decodes
     thumbnails at display size (memory trace shows no full-resolution bitmap in the list).
  3. Given 200% font scale on a compact phone, then header, next-action card and capture button
     render without clipping or overlap.
  4. Given camera permission denied, when the user taps capture, then a gallery route and a one-line
     reason appear on the same screen.
- **Rule IDs:** PX-PROFILE-005, PX-PERF-005, PX-PERF-011, PX-OFFLINE-001, PX-OFFLINE-002,
  PX-OFFLINE-003, PX-PRIV-004, PX-TYPE-003, PX-TYPE-005, PX-COLOUR-007, PX-STATE-004.

## PD-02 — Field task tracker with due and overdue states

- **Family:** F1 Field and farm operations. Lead product: Farm Acre.
- **Archetype:** AR-05 Workflow queue.
- **Pattern:** A day of field work presented as a short, ordered feed with visible progress steps
  and status cards. What deserves keeping is the sense of "today, and how far along": the reference
  states the day's position at a glance before showing any task.
- **Primary task and success metric:** See today's assigned tasks and mark one done with evidence.
  Target: the first task is visible on load without scrolling; completion takes at most 2 taps
  (a photo is optional, never forced).
- **Anatomy (priority order):**
  1. Day line: date, farm or site, and progress as words ("4 of 9 done"), replacing the green hero.
  2. Overdue strip, present only when something is late, sorted by days late.
  3. Today's tasks grouped by plot, each with task type, plot, assignee and a 56 dp done control.
  4. Due soon: the next window per task type, collapsed to a count when it holds over 5 items.
  5. Completed today, collapsed, each with who and when.
- **Domain states:** due today; due soon (window set per task type, proposed: spraying 1 day,
  fencing 7 days); overdue (the word "Overdue", an icon and "3 days late"); done on this device,
  waiting to sync; done by a colleague; reassigned; blocked by weather with the reason; cancelled.
- **Kaizen corrections:**
  - Source "clarify overdue vs due-soon", upgraded: both are computed against the last trusted server
    time, not the handset clock; a skew above 10 minutes (proposed) raises a visible banner.
  - Source "bound card density", upgraded: more than 20 tasks switch from cards to grouped rows,
    and groups beyond the viewport load lazily.
  - Added: when two devices complete the same task offline, the first completion stands and the
    second is kept as a confirmation in the audit trail, never as a duplicate.
  - Added: there is no swipe-only completion; every gesture has a visible button.
- **Adaptive behaviour:**
  - Compact: single list, overdue strip pinned above the fold, done control at the trailing edge.
  - Medium: list beside task detail with the evidence photo, notes and history of reassignment.
  - Expanded: week board by plot or by assignee, with a filter for overdue only.
- **East African context:** rains move planting and spraying dates, so rescheduling is one action
  with a reason. Coverage drops between plots, so the whole week's schedule is held locally. Wet
  or gloved hands need the 56 dp target. Farmers without smartphones receive an SMS digest of
  overdue tasks addressed to them.
- **Chwezi application:** Farm Acre "Today" tab for field officers; the farm manager's tablet uses
  the expanded week board to rebalance work.
- **Acceptance tests:**
  1. Given a greyscale screenshot, then overdue, due-soon and done tasks remain distinguishable by
     text alone.
  2. Given two devices offline that both complete task T, when both sync, then the server has one
     completion and an audit entry naming both users and times.
  3. Given the handset clock moved two days ahead, then due states still follow server time and the
     skew banner is shown.
  4. Given 60 tasks on the baseline device, then scrolling stays within the recorded frame budget
     and no layout shift moves the done control under the finger.
- **Rule IDs:** PX-INTERACT-018, PX-COLOUR-002, PX-STATE-006, PX-OFFLINE-005, PX-INTERACT-002,
  PX-VIZ-004, PX-PERF-006, PX-NOTIFY-002, PX-A11Y-008.

## PD-03 — Controlled-environment sensor monitor

- **Family:** F1 Field and farm operations. Lead product: Farm Acre.
- **Archetype:** AR-02 Operational dashboard.
- **Pattern:** A glanceable conditions board for a greenhouse or store: an environment summary,
  outside weather and a tile per sensor. The strength is speed of reassurance; one look should say
  "in range" or "act now".
- **Primary task and success metric:** Confirm that temperature, humidity and soil moisture are in
  range, and reach the out-of-range reading at once. Target: first meaningful figure painted from
  cache within 2 s of open on the baseline device; out-of-range tiles always sort first.
- **Anatomy (priority order):**
  1. Site header: house name, gateway status and "last contact 4 min ago".
  2. Exceptions band: each out-of-range reading with value, unit, target band and age.
  3. Reading tiles: value, unit, target band, age text, and a 24-hour sparkline with min and max.
  4. Outside weather, labelled "forecast" with its source time.
  5. Calibration and maintenance list.
- **Domain states:** fresh (age under 15 min, proposed and set per sensor); stale (over the
  threshold: value dimmed, age in words, sparkline stops at the last real point); sensor silent
  (no heartbeat for 60 min, proposed); high or low with the breached bound; calibration due or
  overdue; gateway offline (every tile inherits a stale state); sensor battery low.
- **Kaizen corrections:**
  - Source "never rely on decorative sensor indicators without timestamps", upgraded: every tile
    carries an age; a needle gauge is allowed only with its numeric value and a known bound.
  - Added: an alarm acknowledgement records who acknowledged it and when, and does not clear the
    condition itself.
  - Added: the saturated teal hero becomes a neutral header; colour is saved for exceptions.
  - Added: no extrapolated "live" line is drawn across a data gap.
- **Adaptive behaviour:**
  - Compact: exceptions band, then a two-column tile grid that drops to one column at large text.
  - Medium: tile grid with a trend panel for the selected sensor.
  - Expanded: a matrix of houses by metric, with text markers for out-of-range cells.
- **East African context:** gateways ride on intermittent 2G or 3G and solar power, so the last good
  value with its age is the honest default. Alerts reach an off-app manager by SMS. The app never
  polls faster than the sensors report, protecting airtime and battery.
- **Chwezi application:** Farm Acre "House conditions" for horticulture and nursery clients; the
  farm manager watches it on a phone, the agronomist compares houses on a desktop.
- **Acceptance tests:**
  1. Given a reading 20 minutes old, then the tile is dimmed, shows "20 min ago" and the screen
     reader announces "stale".
  2. Given humidity above its band, then the exceptions band lists it first with value and bound,
     and the change is announced without moving focus.
  3. Given the screen idle for 10 s after settle, then the frame trace shows zero animation frames.
  4. Given no network, when the screen opens on the baseline device, then the first figure paints
     from cache within 2 s.
- **Rule IDs:** PX-OFFLINE-004, PX-DATA-009, PX-VIZ-001, PX-VIZ-002, PX-VIZ-004, PX-MOTION-003,
  PX-PERF-007, PX-A11Y-012, PX-NOTIFY-002, PX-COLOUR-002.

## PD-04 — Heavy-equipment catalogue and spec comparison

- **Family:** F2 Catalogue and storefront. Lead products: SpannaMax (parts), Maduuka (dealers).
- **Archetype:** AR-03 Record catalogue.
- **Pattern:** Product-led browsing: large machine imagery, a bright accent, a search field and
  category tiles. Worth keeping is how fast a buyer recognises the right machine by shape before
  reading a single spec.
- **Primary task and success metric:** Find a machine or part and compare its specification with
  alternatives. Target: search to detail in at most 3 interactions; zero dead-end searches.
- **Anatomy (priority order):**
  1. Search field matching names, part numbers and local aliases.
  2. Category tiles, at most 8, then "All categories".
  3. Results: fixed-ratio card with image, model, the one deciding spec, stock and price.
  4. Compare tray holding up to 3 items, pinned at the bottom edge.
  5. Detail: spec table, compatible parts, stock by branch, "Add to quote".
- **Domain states:** no results (spelling suggestion, category route, "request this item");
  out of stock with expected date; price on request; image missing (fixed-ratio placeholder with a
  category glyph); compare limit reached; discontinued with its replacement; catalogue served from
  cache with its age.
- **Kaizen corrections:**
  - Source "consistent thumbnail crops", upgraded: one 4:3 container for every image, contained on
    a neutral ground, so no product is cropped away and rows never jump.
  - Source "reliable empty search", upgraded: search runs over the cached catalogue offline with
    tolerant matching, and an empty result always offers a next step.
  - Added: specs are normalised to SI units with the maker's unit as secondary text.
  - Added: the amber accent marks only "Add to quote"; category tiles use neutral surfaces.
- **Adaptive behaviour:**
  - Compact: list rows with 72 dp thumbnails (faster than a grid); comparison becomes a stack with
    one row per spec showing each model's value beneath it.
  - Medium: filter sheet becomes a rail; two-column card grid.
  - Expanded: filter sidebar, grid, and a side-by-side comparison table with a frozen spec column.
- **East African context:** mechanics ask for parts by local or trade names, so aliases are
  first-class search terms. Imported equipment is often priced in USD while sales close in UGX: show
  the currency code, the rate and its date; UGX shows no decimals. The catalogue downloads once on
  Wi-Fi and refreshes by delta.
- **Chwezi application:** SpannaMax parts lookup at the service desk; Maduuka catalogue for
  agro-dealers and hardware outlets.
- **Acceptance tests:**
  1. Given 100 results, then every thumbnail container has the same aspect ratio (bounds check).
  2. Given no network and the query "filtr", then filter products are returned from cache.
  3. Given 3 models in compare at compact width, then all specs are readable with no horizontal
     scroll.
  4. Given a USD-priced item, then the code "USD", the rate and its date appear; a UGX price has
     no decimal part.
- **Rule IDs:** PX-PERF-005, PX-STATE-004, PX-L10N-001, PX-DATA-011, PX-COLOUR-004, PX-TABLE-002,
  PX-LAYOUT-001, PX-OFFLINE-004.

## PD-05 — Agricultural investment listings with risk disclosure

- **Family:** F3 Money control and finance (finance engine activates alongside). Lead: Farm Acre.
- **Archetype:** AR-03 Record catalogue + AR-08 Financial control.
- **Pattern:** Compact financial listings with minimal borders and a structured detail page. The
  reference shows that money products can feel calm when every listing follows the same
  fact order.
- **Primary task and success metric:** Judge a listing's return, term and risk, then commit funds.
  Target: risk grade, currency code and term visible on the listing card without opening it.
- **Anatomy (priority order):**
  1. Listing card: enterprise and district, amount sought and raised, term, risk grade in words,
     currency code, and return labelled "projected".
  2. Disclosure block, open by default on first view, with text from an approved field only.
  3. Cash-flow schedule aligned to the crop calendar.
  4. Operator track record with counts ("2 of 14 past projects repaid late").
  5. Commit flow: amount, funding method, disclosure acknowledgement, confirmation.
- **Domain states:** draft; open; fully funded; closed; repaying; repayment late; defaulted;
  cancelled with refund; local-currency or FX-exposed; funding payment awaiting approval, pending,
  confirmed, failed or timed out.
- **Kaizen corrections:**
  - Source "clarify risks, currencies and legal disclosures", upgraded: a listing without risk
    grade, currency code and disclosure link fails to render (component props are required).
  - Added: projected and realised returns never share a style; projected uses an outline figure
    with the word "projected".
  - Added: past-performance rates show their denominator.
  - Added: the commit action sits after the acknowledgement, not beside the headline return.
- **Adaptive behaviour:**
  - Compact: card list in fixed fact order; commit flow as three short steps.
  - Medium: list beside detail with the schedule visible.
  - Expanded: sortable comparison table (term, risk, projected return, raised %) with detail panel.
- **East African context:** listings may be in UGX or USD; show both with the rate date where
  exposure exists. Funding arrives by mobile money, so the payment state model applies in full.
  Disclosure wording comes from the tenant's legal counsel; the standard asserts no regulator rule.
  Terms follow harvest seasons, not calendar quarters.
- **Chwezi application:** Farm Acre input-finance or produce pre-finance listings, only where a
  tenant's requirements include them; never added because the reference shows it.
- **Acceptance tests:**
  1. Given listing data without a risk grade or currency, then the component refuses to render and
     the build test fails.
  2. Given any return figure, then its label includes "projected" or "realised".
  3. Given a mobile-money commit that times out, then the commitment stays pending and a status
     check is offered before any retry.
  4. Given a USD listing viewed by a UGX user, then the conversion shows rate, source and timestamp.
- **Rule IDs:** PX-MANDATE-004, PX-DATA-001, PX-DATA-009, PX-DATA-010, PX-DATA-011, PX-DATA-003,
  PX-INTERACT-002, PX-INTERACT-008.

## PD-06 — Recurring meal-plan selection and checkout

- **Family:** F2 Catalogue and storefront. Lead product: Maduuka (hotel and restaurant).
- **Archetype:** AR-09 Transaction / checkout.
- **Pattern:** Appetising image cards and a sticky checkout bar wrapped around a weekly plan.
  The distinct idea is commitment over time: the customer shapes a repeating schedule, not one
  basket, and always sees what the week will cost.
- **Primary task and success metric:** Choose recurring meals and confirm the schedule. Target:
  changing one day's choice takes at most 3 taps; plan total and next charge date stay visible.
- **Anatomy (priority order):**
  1. Week strip, Monday to Sunday, each day showing chosen, skipped or locked.
  2. The selected day's items as text rows with portion and price.
  3. Sticky summary: items this week, weekly total, next charge date, "Confirm changes".
  4. Menu browse with images, reached from the day, not shown on the schedule itself.
  5. Plan management: skip week, pause, change delivery point, cancel.
- **Domain states:** item unavailable that day (substitute offered); cut-off passed (day locked,
  reason shown); week skipped; plan paused; payment due, pending, or prompt timed out; delivery
  point closed; price change from next cycle (old and new shown).
- **Kaizen corrections:**
  - Source "keep food photos out of high-frequency operations", upgraded: the kitchen's daily prep
    list generated from plans is text-only, sorted by item and count.
  - Added: cut-off is printed as a time ("Edit until 18:00 Tue"), never as a ticking animation.
  - Added: skip and pause carry undo for 10 seconds (proposed) and stay editable until cut-off.
  - Added: delivery fees appear as their own line inside the weekly total.
- **Adaptive behaviour:**
  - Compact: week strip, day list, summary bar inside thumb reach that never covers a focused field.
  - Medium: week grid with the menu browser in a side panel.
  - Expanded: full week by meal slot; moving a meal by drag always has a tap alternative.
- **East African context:** staff-canteen and school catering contracts are the common form,
  billed monthly by mobile money or invoice. Data-saver mode shows the menu as text and loads
  images only on request.
- **Chwezi application:** Maduuka hotel/restaurant "Meal plans" for canteen and school catering
  tenants that have this requirement.
- **Acceptance tests:**
  1. Given images disabled, then a full week can be planned and confirmed.
  2. Given a payment prompt that times out, then the plan reads "Payment pending" and retrying
     after a status check creates no second charge.
  3. Given a day past cut-off, then its controls are disabled with the reason as visible text.
  4. Given keyboard focus on the last field above the sticky bar, then the field stays fully visible.
- **Rule IDs:** PX-DATA-008, PX-DATA-010, PX-INTERACT-007, PX-PERF-008, PX-PERF-011, PX-A11Y-007,
  PX-A11Y-008, PX-PRIV-006.

## PD-07 — Grocery basket and fast checkout

- **Family:** F2 Catalogue and storefront. Lead product: Maduuka (retail).
- **Archetype:** AR-09 Transaction / checkout.
- **Pattern:** Product imagery, a cart and a promotional hero that invites browsing. The useful
  lesson is the cart that is always one tap away with its total showing; the hero belongs to
  discovery, never to payment.
- **Primary task and success metric:** Take payment for a basket. Target: basket to paid in at
  most 4 steps; no promotional content once the basket holds an item.
- **Anatomy (priority order):**
  1. Running total in the house hero-figure style, persistent on every checkout step.
  2. Basket lines: name, quantity stepper, line total right-aligned in tabular figures.
  3. Tender: cash with quick-tender buttons, mobile money, card, split.
  4. Change due, large, after cash entry.
  5. Receipt actions: print, SMS, share, new sale.
- **Domain states:** price changed since added (old and new shown before pay); out of stock;
  awaiting customer approval on phone; pending provider confirmation; confirmed with provider
  reference; failed with reason; split tender part-paid; sale saved offline with a provisional
  receipt; receipt issued with its contiguous number; printer offline (receipt queued).
- **Kaizen corrections:**
  - Source "limit hero to discovery", upgraded: checkout has no banner, chart or carousel.
  - Source "simplify checkout", upgraded: tender and change sit on one screen; no account sign-up.
  - Added: Pay carries an idempotency key; a double tap or a timeout retry yields one payment.
  - Added: the receipt number is allocated at issue inside the save transaction, never at draft.
- **Adaptive behaviour:**
  - Compact: basket, then tender, then receipt, as separate steps sharing one retained state.
  - Medium: two panes, basket left and tender keypad right.
  - Expanded: adds scanner focus indicator and keyboard shortcuts for search, pay and new sale.
- **East African context:** UGX takes whole numbers only, so the keypad has no decimal key for
  UGX. Quick-tender buttons follow circulating notes (denominations NOT_ASSESSED until verified).
  Cash plus mobile money split is routine. Fiscal e-invoicing (e.g. URA EFRIS) status shows on the
  receipt when enabled, and an SMS receipt serves customers who decline paper.
- **Chwezi application:** Maduuka retail checkout for shops and mini-supermarkets.
- **Acceptance tests:**
  1. Given a double tap on Pay, then exactly one payment record exists.
  2. Given two sales, then their receipt numbers are consecutive for that tenant and document type,
     and a draft abandoned between them consumes no number.
  3. Given no network, then the sale completes with a "Provisional" tag replaced by the server
     number after sync.
  4. Given a UGX tender entry, then decimal input is impossible and change due shows no decimals.
- **Rule IDs:** PX-PROFILE-001, PX-PROFILE-002, PX-DATA-008, PX-DATA-010, PX-DATA-012, PX-DATA-013,
  PX-INTERACT-002, PX-INTERACT-016, PX-OFFLINE-003, PX-LAYOUT-003.

## PD-08 — High-contrast care-reminder list (treatment and feeding schedules)

- **Family:** F1 Field and farm operations. Lead product: Farm Acre (livestock and crops).
- **Archetype:** AR-07 Scheduling workspace.
- **Pattern:** The plainest reminder list: warm white ground, simple rows, a strong action colour.
  Re-pointed from house plants to animal treatments and crop applications, where a missed or
  repeated dose has a cost.
- **Primary task and success metric:** Act on today's treatment, vaccination or feeding reminders.
  Target: every metadata line reaches 7:1 in the outdoor theme and 4.5:1 otherwise; recording
  completion with dose takes one tap plus a confirmable pre-filled dose.
- **Anatomy (priority order):**
  1. Withdrawal banner: animals under a drug withdrawal period, with the safe date for milk or meat.
  2. Missed reminders, oldest first.
  3. Today's reminders grouped by pen or plot: animal or group, product, dose, route, due time.
  4. Upcoming 7 days, collapsed.
- **Domain states:** due; snoozed until a stated time; missed; completed by another user (name and
  time); withdrawal active; medicine stock too low for the dose; cancelled by the vet with reason.
- **Kaizen corrections:**
  - Source "improve small metadata contrast", upgraded: dose and route are body-size text, since
    they are the data that prevents harm.
  - Added: completion records product batch and dose, and opens a withdrawal period automatically
    when the product has one.
  - Added: the withdrawal state follows the animal into sale and milk-collection screens.
- **Adaptive behaviour:**
  - Compact: one list; withdrawal banner pinned while any animal is affected.
  - Medium: list beside the animal or plot record with treatment history.
  - Expanded: week grid by pen with missed cells marked by text.
- **East African context:** one shared phone per farm is common, so each completion asks who did it
  from a short worker list. Reminders fire from the local schedule without network. Herders without
  the app receive an SMS for missed doses. Product names include local trade names as aliases.
- **Chwezi application:** Farm Acre livestock "Treatments due" and crop "Applications due".
- **Acceptance tests:**
  1. Given the outdoor theme, then measured contrast of every metadata line is at least 7:1.
  2. Given a missed reminder and a device restart with no network, then the reminder is still
     listed as missed.
  3. Given a dose recorded for a product with a 14-day withdrawal, then the animal shows the
     withdrawal state on its milk-collection screen until the safe date.
  4. Given a reminder completed on another device, then this device shows the colleague's name and
     time after sync, and offers no second completion.
- **Rule IDs:** PX-COLOUR-007, PX-COLOUR-001, PX-TYPE-003, PX-OFFLINE-002, PX-PRIV-008,
  PX-PRIV-011, PX-NOTIFY-002, PX-INTERACT-009.

## PD-09 — Regulated-product catalogue with claim control

- **Family:** F2 Catalogue and storefront. Lead products: Maduuka (pharmacy), Medic8 (dispensary).
- **Archetype:** AR-03 Record catalogue.
- **Pattern:** Editorial product detail, clear filters, category icons and a sticky add action.
  The reference reads well; the danger is that it reads like advertising for products where the
  law controls what may be claimed and who may buy.
- **Primary task and success metric:** Find a product and add it to a sale correctly. Target:
  every claim shown comes from an approved field; the add action stays within thumb reach at
  compact width.
- **Anatomy (priority order):**
  1. Search across brand and generic names, strength and form.
  2. Filters: form, strength, category, regulatory class.
  3. Result row: name, strength, form, pack, stock, price, regulatory class as text.
  4. Detail: approved indications, warnings, batches with expiry, substitutes.
  5. Sticky "Add to sale" that respects the class rules.
- **Domain states:** prescription-only (needs prescription reference); controlled (pharmacist
  authorisation and register entry); batch expired (sale blocked); near expiry (under 90 days,
  proposed); not licensed at this outlet; recalled batch (blocked with notice); out of stock with
  a substitute.
- **Kaizen corrections:**
  - Source "avoid unsupported health claims", upgraded: no free-text marketing field exists in the
    product model; indications come from an approved formulary source with its reference.
  - Added: batch choice defaults to first-expiry-first-out and is overridable with a reason.
  - Added: every category icon carries a text label.
- **Adaptive behaviour:**
  - Compact: list rows, detail as a destination, add action pinned bottom.
  - Medium: list and detail side by side with the batch table.
  - Expanded: table with batch and expiry columns, keyboard search and scanner input.
- **East African context:** customers ask by local or brand name, so aliases matter. Rules on
  prescription status come from the national drug regulator via the tenant's configuration; the
  standard names no regulator. Fiscal e-invoicing (e.g. URA EFRIS) applies at the till.
- **Chwezi application:** Maduuka pharmacy sales; Medic8 dispensary issuing against prescriptions.
- **Acceptance tests:**
  1. Given a prescription-only product, when added without a prescription reference, then the sale
     is blocked with the reason and a route to attach one.
  2. Given an expired batch, then no sale or issue can complete against it.
  3. Given the product edit form, then no free-text claim field renders.
  4. Given a batch with 60 days left, then "Near expiry" shows as text beside the date.
- **Rule IDs:** PX-PROFILE-003, PX-PROFILE-004, PX-DATA-006, PX-PRIV-001, PX-PRIV-006, PX-PRIV-011,
  PX-COLOUR-002, PX-INTERACT-009.

## PD-10 — Irrigation monitoring with guarded remote control

- **Family:** F1 Field and farm operations. Lead product: Farm Acre.
- **Archetype:** AR-02 Operational dashboard.
- **Pattern:** Moisture charts, watering schedules and equipment switches on one surface. The
  reference is valuable for joining "what is happening" to "what I can do"; the correction is to
  join them by navigation, not by placing a pump switch next to a chart.
- **Primary task and success metric:** Check zone moisture and start or stop a valve safely.
  Target: every start command passes a confirmation stating consequence and state age; zero
  start commands are accepted against stale state.
- **Anatomy (priority order):**
  1. Zone list: moisture with unit, reading age, valve state, next scheduled run.
  2. Zone detail: 7-day moisture trend, rainfall, schedule.
  3. Control screen (separate): current state and age, command, duration, consequence statement,
     confirm.
  4. Command log: each command with actor, time and lifecycle state.
- **Domain states:** valve offline; command queued, sent, acknowledged, failed or timed out;
  manual override on site; sensor stale; pump fault; water source low; schedule paused for rain.
- **Kaizen corrections:**
  - Source "separate monitoring from hazardous remote actuation", upgraded: actuation lives on its
    own screen, is role-limited, and is disabled when state age exceeds 5 minutes (proposed).
  - Added: the safe-direction command (stop) may stay available on stale state only if the domain
    safety review approves it; start never does.
  - Added: a command shows "Queued" until the controller acknowledges it; nothing claims the valve
    opened before then.
- **Adaptive behaviour:**
  - Compact: zone list, zone detail, control as three destinations.
  - Medium: zones beside detail; control opens as a dialog over the detail.
  - Expanded: block schematic as a list-based layout (no heavy live map) with the command log.
- **East African context:** controllers often talk over GSM or SMS, so acknowledgements can take
  minutes; the lifecycle must show that honestly. Power cuts and solar pumps make "pump fault"
  routine. Commands are small payloads; trend data loads on demand.
- **Chwezi application:** Farm Acre irrigation for commercial and out-grower farms with controllers.
- **Acceptance tests:**
  1. Given state older than the threshold, then Start is disabled with the age and reason in text.
  2. Given a sent command, then it reads "Queued" until acknowledgement and records actor and time.
  3. Given a double tap on Confirm, then the controller receives one command.
  4. Given a role without irrigation control, then the API rejects a start request even if the
     client is modified.
- **Rule IDs:** PX-INTERACT-008, PX-INTERACT-002, PX-OFFLINE-003, PX-OFFLINE-004, PX-PRIV-001,
  PX-DESTRUCT-003, PX-STATE-002, PX-PROFILE-005.
