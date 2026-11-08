# Component contracts B: components 09-16 and supporting components

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

These contracts extend the shared component contract in
[component-contracts-a.md](component-contracts-a.md): API rules, the universal state matrix,
sizing floors, the test-tag scheme, the reject list, the Compose Multiplatform and web baseline,
and the house-style name mapping all apply unchanged. Each entry lists purpose, parameters,
deltas and tests. Platform facts cite [currentness-register.md](currentness-register.md).

## Component 09: Timeline

**Purpose.** Show the stages of a process (order, approval chain, shipment, draw, job card) with
who did what and when. Not for charts of values over time (use ChartPanel).

**Parameters.** `stages` (each: `id`, `name`, `state` completed, current, blocked, pending or
skipped; `actorName`; `timeText` relative and `timeAbsoluteText`; `note`; `exception`),
`orientation` (vertical default; horizontal only on expanded widths with five or fewer stages),
`onOpenStage`.

**Rules.** Every stage shows word, icon, time and actor; never dots alone (PX-VIZ-003). Relative time
("2 h ago") with the absolute time on demand and in the accessible text. A blocked stage shows the
reason and the owner. Skipped stages are shown, labelled, not hidden.

| State | Treatment |
|---|---|
| Completed | Check icon, word "Done", time, actor |
| Current | Emphasised marker and "In progress" or "Waiting for Finance Manager" |
| Blocked | Danger tone, reason, owner |
| Pending | Neutral, "Not started" |
| Long chain (> 8 stages) | Collapse completed stages behind "Show 5 earlier steps" |

**Semantics.** Ordered list; each item reads "Step 2 of 4, Approved by Grace Namutebi, 3 Nov
10:12". Current step marked as current.

**Keyboard.** Each openable stage is a focus stop; non-interactive stages are read in sequence.

**Test tags.** `timeline.<timelineId>.stage.<stageId>`, `.state`, `.actor`.

**Performance.** Static; no animated connectors.

**Compose.** Column of rows, not a lazy list, up to 20 stages. **Web.** `ol` with `aria-current="step"`.

**Acceptance tests.** CT-09.1 greyscale: each stage state readable. CT-09.2 screen reader reads step
number, state, actor and absolute time. CT-09.3 blocked stage shows reason and owner.

## Component 10: ChartPanel

**Purpose.** A chart with its title, period, unit and a text reading of what it shows. Never on
checkout or other transaction screens (PX-DATA-008).

**Parameters.** `title`, `period`, `unit`, `series` (preaggregated points, bounded), `summaryText`
(required: one or two sentences giving the answer), `tableData` (for the table toggle),
`freshness`, `chartType` (chosen by the data-viz skills), `onOpenTable`, `onSelectPoint`.

**Rules.** Text summary is mandatory and shown, not only announced (PX-A11Y-005, PX-VIZ-005). Table
alternative one tap away. Brand primary plus at most two supporting hues and the accent for one
highlight; encoding, axes and chart choice follow `12-data-viz-and-dashboards/chart-selection-and-encoding`
and `data-visualization`. Donuts only for five or fewer categories (PX-VIZ-002). Time series label
granularity, unit and missing periods (PX-VIZ-001). Time axes run left to right in RTL; legends and
labels follow RTL (SHOULD with native-reader review, R4 NOT_ASSESSED).

| State | Treatment |
|---|---|
| Loading | Axis frame with skeleton; no animated placeholder |
| Empty period | "No activity in this period", not a flat zero line |
| Stale | "As of" time with stale chip |
| Restricted | "Restricted" panel, no axes |
| Too many points | Aggregated to bucket size with label ("Weekly totals") |

**Semantics.** The panel is a region named by its title; the summary is the accessible description;
points are not individual focus stops unless selectable.

**Keyboard.** Tab to the table toggle; within an interactive chart, arrow keys move between points
and announce values.

**Test tags.** `chartPanel.<chartId>`, `.summary`, `.tableToggle`.

**Performance.** At most 500 rendered points per series (downsample above, PX-PERF-006); no redraw
when data is unchanged; grow-in animation only on summary pages, once per visit, off under reduced
motion.

**Compose.** Draw in one canvas pass from precomputed geometry; geometry computed outside
composition. **Web.** SVG or canvas with a visible summary and an HTML table toggle.

**Acceptance tests.** CT-10.1 screen reader reaches the summary and the table. CT-10.2 a 10,000-point
series renders <= 500 points with an aggregation label. CT-10.3 idle panel produces zero animation
frames. CT-10.4 a chart without summary text fails validation.

## Component 11: AttachmentPicker

**Purpose.** Add photos, scans and files as evidence (receipts, damage photos, lab results). Not a
gallery.

**Parameters.** `acceptedTypes`, `maxSizeBytes`, `maxCount`, `sources` (camera, gallery, files),
`items` (each: id, name, size text, thumbnail, state, progress), `meteredPolicy`,
callbacks `onPick`, `onRetry(id)`, `onRemove(id)`, `onOpen(id)`.

**Rules.** Accepted types, maximum size and count are stated before picking. Images are compressed
and downscaled on the device before upload (target long edge per product, default 1600 px) and
location metadata is stripped unless the task needs it and the user permitted it (PX-PRIV-004).
Uploads are resumable and retried per file; large files wait for Wi-Fi or consent on metered
connections (PX-PERF-011). Lifecycle and storage follow the dev engine's
`tenant-media-upload-lifecycle`.

| State | Treatment |
|---|---|
| Queued | "Waiting to upload" (offline or metered) |
| Uploading | Per-file progress with percentage text |
| Failed | Reason and per-file retry; other files continue |
| Complete | Thumbnail and size; server-confirmed only |
| Rejected | "File too large: 18 MB, limit 10 MB" before upload starts |

**Semantics.** Add button names the limits ("Add photo, up to 5, 10 MB each"); each item reads name,
size and state; progress announced at most every 25%.

**Keyboard.** Add, then each item's open, retry and remove are focus stops.

**Test tags.** `attachmentPicker.<fieldId>.add`, `.item.<id>`, `.item.<id>.retry`.

**Performance.** Thumbnails decoded at display size; compression off the main thread; memory for
ten 12 MP photos stays within the bitmap budget recorded for the reference device (P2).

**Compose.** Camera, picker and file access through platform adapters (`expect`/`actual`).
**Web.** `input type="file"` with `accept` and `capture` where useful; chunked upload.

**Acceptance tests.** CT-11.1 a 12 MP photo uploads at or below the target long edge. CT-11.2 EXIF
location absent from the uploaded file. CT-11.3 network drop at 50% resumes without restarting.
CT-11.4 an oversized file is rejected before any bytes are sent.

## Component 12: OfflineBanner

**Purpose.** Tell the user, without alarm, that the app is offline or syncing, what is waiting, and
whether anything needs them. The name matches existing product code.

**Parameters.** `connectivity` (online, offline, syncing), `lastSyncText`, `queuedCount`,
`conflictCount`, `failedCount`, callbacks `onOpenQueue`, `onRetry`.

**Rules.** Shows last successful sync time and queue count (PX-OFFLINE-001). Hysteresis: a change of
connectivity must hold for 3 s before the banner switches, so a flaky network does not flash it.
Not dismissible while conflicts or failures exist. Neutral or info tone for offline and syncing;
danger only for failures. Tapping opens the SyncQueueSheet. Hidden when online with nothing queued.

| State | Treatment |
|---|---|
| Offline | "Offline - 4 changes saved on this device. Last sync 14:02" |
| Syncing | "Sending 3 of 12" |
| Conflict | "2 changes need your decision" with action; not dismissible |
| Failed | "1 change could not be sent" with retry |

**Semantics.** Polite live region; announces state changes once, not every count change.

**Keyboard.** A single focus stop that opens the queue.

**Test tags.** `offlineBanner`, `.queuedCount`, `.openQueue`.

**Performance.** Connectivity observed through one shared flow; no polling faster than the platform
callback.

**Compose / web.** Rendered in the AppScaffold status slot with reserved height or overlay so content
does not jump; web `role="status"`.

**Acceptance tests.** CT-12.1 toggling the network every second for 10 s causes no banner flicker.
CT-12.2 with a conflict the banner cannot be dismissed. CT-12.3 queue count equals the local queue
size. CT-12.4 screen reader announces "Offline" once.

## Component 13: ContextPanel

**Purpose.** Show the selected record and its actions beside a list on expanded and wider windows.
On compact it becomes a full screen or bottom sheet.

**Parameters.** `title`, `content` slot, `actions`, `open`, `width` (house token steps), `restricted`,
callbacks `onClose`, `onResize` (desktop only).

**Rules.** Opening moves focus to the panel heading; closing returns focus to the item that opened
it. Escape closes. Selection and panel state survive resize; crossing below 840 dp turns the panel
into a destination without losing its content (PX-NAV-002). One shadow level only, if floating
(PX-GEOM-006).

| State | Treatment |
|---|---|
| Open / closed | Instant under reduced motion; otherwise <= 250 ms slide |
| Resized | Width snaps to token steps; minimum keeps 48 dp actions usable |
| Restricted | Explains the limit and who can grant access |
| Loading | Header shows the record identity first, details skeleton |

**Semantics.** Complementary region named by the record; on compact a dialog or new screen.

**Keyboard.** Focus trapped only when modal (compact sheet); non-modal on expanded.

**Test tags.** `contextPanel`, `.title`, `.close`, `.action.<actionId>`.

**Performance.** Content composed only while open.

**Compose.** List-detail adaptive layout driven by the width class. **Web.** `aside` with
`aria-labelledby`; modal dialog element on narrow widths.

**Acceptance tests.** CT-13.1 Escape closes and focus returns to the trigger. CT-13.2 resizing from
expanded to compact keeps the open record. CT-13.3 keyboard users reach every panel action.

## Component 14: FilterBar

**Purpose.** Narrow a list or report by search, filter chips and saved views; show what is applied.

**Parameters.** `filters` (id, label, options, selected), `appliedCount`, `savedViews`,
`resultCountText`, callbacks `onChange`, `onClearAll`, `onSaveView`.

**Rules.** House chip visuals: outlined, selected with a check on the secondary container. Applied
count badge; chips beyond the width go into "More filters". "Clear all" always available when any
filter is applied. Filters persist per user and screen. Result count announced after change.
Invalid combinations explain themselves rather than returning an empty list silently.

| State | Treatment |
|---|---|
| Applied | Check and count; summary text "3 filters" |
| No results | Shared ST-NOMATCH: active filters, "0 of 248", clear action |
| Overflow | "More filters (4)" |
| Invalid | Message naming the conflict |

**Semantics.** Each chip is a toggle with its selected state; result count in a polite live region.

**Keyboard.** Arrow keys move between chips; Space toggles; Enter opens option lists.

**Test tags.** `filterBar.<screenId>.chip.<filterId>`, `.clearAll`, `.resultCount`.

**Performance.** Filtering applies after 250 ms of no change for text filters; chip toggles apply at
once.

**Compose / web.** Horizontally scrolling chip row only with a visible "More" affordance; web
`button aria-pressed`.

**Acceptance tests.** CT-14.1 clear all restores the unfiltered count. CT-14.2 filters survive app
restart for the same user. CT-14.3 result count announced.

## Component 15: ConfirmationDialog

**Purpose.** Confirm an action that protects money, health, privacy or irreversible state, and only
those (PX-INTERACT-008). Reversible actions use undo instead.

**Parameters.** `title` (states the consequence), `body` (affected item, consequence,
reversibility), `confirmLabel` (names the action: "Void receipt 00482"), `cancelLabel` ("Keep
receipt"), `destructive`, `requiresTypedConfirmation` (text to type), `requiresSupervisor`
(opens SupervisorOverride), `reasonRequired`, callbacks `onConfirm(reason)`, `onCancel`.

**Rules.** Buttons never read only "OK" or "Cancel". The destructive button is outlined with the
error role (house destructive exit) and is not the default focus. Irreversible bulk actions require
typed confirmation. One modal layer at most (PX-INTERACT-013). The dialog stays open with the error
if the action fails.

| State | Treatment |
|---|---|
| Busy | Confirm shows progress; both buttons blocked from repeat |
| Failed | Error inside the dialog; retry |
| Permission needed | Supervisor variant opens the PIN step |
| Reason missing | Confirm disabled with "Enter a reason" |

**Semantics.** Alert dialog role; title and body as name and description; focus starts on the safe
action.

**Keyboard.** Escape cancels; Tab cycles inside; Enter does not trigger the destructive action by
default.

**Test tags.** `confirmDialog.<actionId>`, `.confirm`, `.cancel`, `.reason`.

**Performance.** Appears within 140 ms (house dialog timing); instant under reduced motion.

**Compose / web.** Platform dialog semantics; web `dialog` element with `aria-describedby`.

**Acceptance tests.** CT-15.1 initial focus on the safe action. CT-15.2 Enter alone does not confirm a
destructive action. CT-15.3 every dialog in the product maps to one of the four protection reasons
(inventory review).

## Component 16: CalendarPicker

**Purpose.** Choose a date, time, range or slot with availability. The house period navigator
(previous, period pill, next) is a different control for reports; cross-link, do not merge.

**Parameters.** `mode` (date, dateTime, range, slot), `value`, `min`, `max`, `availability` (slots
with state), `timeZoneId`, `businessZoneId`, `firstDayOfWeek` (from locale), `calendarSystem`
(Gregorian default; others only if required), callbacks `onSelect`, `onTypedEntry`.

**Rules.** Typed entry is always available alongside the grid. Dates display unambiguously (month
name or locale order, PX-L10N-006). The zone shows when it differs from the business zone. Min and
max enforced with a reason for disabled dates. Slots show availability as word plus style, with
the freshness of availability.

| State | Treatment |
|---|---|
| Invalid typed date | Inline message with the expected format |
| No slots | "No free slots on 12 Nov" plus next available date |
| Stale availability | "Availability as of 08:15" |
| RTL | Grid mirrors; dates and times keep their digit order |

**Semantics.** Grid with row and column headers; selected and disabled states announced; typed field
labelled with the format.

**Keyboard.** Arrows move by day, Page Up and Page Down by month, Home and End to week ends, Enter
selects.

**Test tags.** `calendarPicker.<fieldId>.day.<isoDate>`, `.typed`, `.slot.<slotId>`.

**Performance.** Month grid renders <= 42 cells; availability for adjacent months loads on demand.

**Compose / web.** Platform date formatting; web native date input only where it meets these rules,
otherwise an ARIA grid.

**Acceptance tests.** CT-16.1 full keyboard selection of a date and a slot. CT-16.2 first day of the
week follows locale. CT-16.3 a slot shown in CAT for an EAT business displays the zone label.

## Supporting components

The screens need six more components the source did not define. Each needs a DDR before adoption
(PX-ARCH-007) and then a full contract in this format.

| Component | Purpose | Minimum contract points | Used by |
|---|---|---|---|
| NumericKeypad | In-app entry for quantity, price, tender and PIN | Keys >= 56 dp with 8 dp gaps; decimal key only for currencies or units with fractions; quick-tender keys from tenant denominations; backspace and clear; each key announced; physical keyboard digits also accepted; test tags `numericKeypad.key.<value>` | 02, 04, 06 |
| ScanTarget | Receives hardware-wedge, serial and camera scans | Captures wedge input without focus; debounce window parameter (default 500 ms); not-found callback; torch and manual entry for camera; result announced; never steals focus from an open text field | 02, 04, 06 |
| ReceiptPreview | Shows and sends a receipt or invoice | 58 mm, 80 mm and A4 layouts from one model; "COPY" on reprints; "Provisional" for offline numbers; print, SMS and share actions with queue status; fiscal fields when enabled | 02, 03 |
| SupervisorOverride | Authorise an action above a role's limit | Supervisor identity and PIN (no reuse of the requester's session); reason required; audit of both users; lockout after tenant-set failed attempts; paste allowed (PX-A11Y-009) | 02, 04, 10 |
| SyncQueueSheet | List queued, failed and conflicting changes | Per item: what, when, state, retry or resolve; conflicts show both versions with actor and time (PX-STATE-006); oldest first; no silent discard | All offline screens |
| EmptyStateBlock | Explain an empty area and offer one next step | Cause-specific copy (nothing yet, filtered, no permission, not yet synced); one action; no decorative art above a task (PX-LAYOUT-006) | All list screens |

## Component release checklist

| Check | Pass condition |
|---|---|
| Contract complete | Every field of the shared contract filled or marked N/A with reason |
| Previews | Default, empty, loading, error, long text, RTL, dark |
| Screenshot matrix | Light and dark x compact and expanded x 100% and 200% text |
| Semantics | Screen-reader pass on Android and iOS (CMP) and on one desktop browser (web) |
| Targets | Hit areas measured, not glyphs |
| Reject list | Zero findings |
| Tags | Every listed part tagged with the scheme |
| House mapping | Name and tokens match the house catalogue or a DDR records the departure |
