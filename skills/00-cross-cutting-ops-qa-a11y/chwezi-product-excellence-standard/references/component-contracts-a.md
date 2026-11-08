# Component contracts A: shared component contract and components 01-08

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

These contracts define behaviour, API shape, states, semantics and tests for the sixteen shared
components every Chwezi product builds on (PX-ARCH-006). The house style
(`09-design-systems-tokens-and-theming/chwezi-business-app-house-style`, its
`references/component-catalogue.md` and `references/style-roles-and-tokens.md`) supplies the
visual values; this file supplies the contract. Where the two overlap, house tokens win for
geometry and colour, and this contract wins for behaviour, states and tests. Components 09-16 and
the supporting components the screens need are in [component-contracts-b.md](component-contracts-b.md).
Platform facts cite [currentness-register.md](currentness-register.md) by row ID.

## Shared component contract

Every component contract fills these fields. A new component or variant needs a DDR (PX-ARCH-007).

| Field | Content |
|---|---|
| Purpose | One sentence: the user need it serves and where it must not be used |
| API parameters | Immutable UI state plus semantic callbacks; no repository, DAO, HTTP client or domain calculation inside (PX-ARCH-005) |
| Sizes and variants | Named variants, minimum and maximum size, truncation rule |
| State matrix | Every state below marked applies or N/A, with its treatment |
| Semantics | Role, accessible name, state description, live-region use, heading level |
| Keyboard | Focus order, keys, focus return |
| Test tags | Names following the scheme below |
| Performance limits | Recomposition, item counts, image sizes, animation |
| Compose Multiplatform notes | Shared-code shape and platform adapters |
| Web notes | Element choice, ARIA, CSS behaviour for existing web stacks |
| House-style mapping | Catalogue entry and resolution |
| Acceptance tests | Numbered `CT-<component>.<n>` with pass thresholds |

### API rules

- Parameters are a single immutable state object (or a few primitives) plus callbacks named for
  intent: `onOpen`, `onRetry`, `onDismiss`, `onSelect`, never `onClick` for a business action.
- Values arrive preformatted for display (strings from the formatter layer) together with an
  accessible text; the component never formats money, computes totals or derives status.
- Explicit `enabled`, `busy`, `error`, `selected` and `contentDescription` where they apply;
  disabled carries an optional `disabledReason` shown or announced.
- Optional slots for leading and trailing content; no boolean explosion (more than three booleans
  that change layout means a new variant and a DDR).

### Universal state matrix

| State | Treatment |
|---|---|
| Default | House tokens only (PX-TOKEN-001) |
| Pressed | Visible response within 100 ms p95 on the reference device (PX-INTERACT-001) |
| Focused | Visible indicator with >= 3:1 contrast against adjacent colours (WCAG 1.4.11, A4); never hidden by sticky bars (PX-A11Y-007) |
| Hovered (pointer) | Tonal change only; no layout shift |
| Selected | Shape or check plus colour; never colour alone (PX-COLOUR-002) |
| Disabled | Still legible; reason given where useful; not colour-only |
| Busy | Geometry reserved; repeat activation blocked; progress announced once |
| Error | Inline, plain cause and fix; retry where meaningful |
| Offline / queued | If it mutates: queued label and pending styling, never success styling |
| Restricted | "Restricted" text, not blank |
| 200% text | Wraps, no clipping of essential text; height grows (no fixed heights for text) |
| RTL | Mirrors layout and directional icons; numbers and codes stay LTR with bidi isolation |
| Dark | Remapped roles, contrast recomputed (PX-TOKEN-003) |
| Reduced motion | Final state shown at once (PX-MOTION-002) |

### Sizing floors

Touch targets measure at least 48x48 dp on Android (M1) and 44x44 pt on Apple platforms (I1) on the
real hit area, in every density. Web touch-primary screens use 44x44 CSS px; the WCAG 2.2 AA floor
is 24x24 CSS px (A5) and applies only to pointer-primary desktop layouts. Glove, field and POS
keypad contexts use 56 dp with 8 dp spacing (PX-INTERACT-018). Radii come from house tokens (cards
20, hero 28, tiles, chips and buttons 16; the source's 12-20 dp card range is superseded, owner
default 2026-11-07).

### Test-tag scheme

`<componentName>.<part>[.<stableId>]`, lowerCamelCase, dot-separated: `kpiCard.sales30d.value`,
`recordRow.<recordId>.status`, `appScaffold.nav.<destinationId>`. IDs are domain keys, never list
indexes or display text. The same string is the Compose `testTag` (exposed as resource ID for
device tests and as the iOS accessibility identifier, K5) and the web `data-testid`. Each contract
lists its parts.

### Reject list (CI or review)

Raw colour or size literals; missing accessible names; targets that shrink under density;
infinite or looping animation; clipping at 200% text; non-deterministic list keys; network,
database or formatting work during composition or render; a second accent-coloured action in one
panel.

### Compose Multiplatform and web baseline

- Compose: stateless composables; `@Immutable` or `@Stable` state classes with stable collections;
  tokens through the shared theme and typed composition locals; `expect`/`actual` only for genuine
  platform needs (haptics, printing, camera, secure flag). Previews for default, empty, loading,
  error and long text. Screenshot tests: light and dark x compact and expanded x 100% and 200% text,
  plus RTL. CMP iOS needs device checks at accessibility text sizes and with Reduce Motion because
  their mapping is not documented (K5, NOT_ASSESSED).
- Compose for Web is Beta (K3): existing web front ends keep their stack and implement the same
  contract, states and tests; Compose for Web in production needs a DDR.
- Web: native elements first (`button`, `a`, `input`, `table`); ARIA only to fill gaps; CSS logical
  properties for RTL; `prefers-reduced-motion` honoured (X1).

## House-style name mapping

| Contract (code) | Prose name | House catalogue entry | Resolution |
|---|---|---|---|
| AppScaffold | app scaffold | Page frame (top bar, context strip, bottom navigation) | House visuals; this contract adds API, adaptive switch, insets, back |
| KpiCard | KPI card | KPI tile | Owner default 2026-11-07: `KpiCard` in code, "KPI card" in prose; "KPI tile" is the house alias |
| OperationalRecordRow | record row | none (money skill has statement rows) | New; statement rows remain the money-specific variant |
| StatusChip | status chip | Status and chips | Tones success, warning, danger, info, neutral (owner default adds info); "critical" is a severity word, rendered with the danger tone |
| DataTable | data table | none (money skill: trial balance collapsible groups) | New; collapsible groups are the compact fallback for statements |
| SearchField | search field | none | New |
| MoneyField | money field | none (money skill amount styles) | New; decimals from ISO 4217 minor unit override "always two decimals" (owner default) |
| PrimaryAction | primary action | Buttons, Accent emphasis | Maps to the one accent next-step button |
| Timeline | timeline | none | New (file B) |
| ChartPanel | chart panel | Hero summary mini tiles, bars | Encoding defers to `12-data-viz-and-dashboards` skills |
| AttachmentPicker | attachment picker | none | New |
| OfflineBanner | offline banner | none | New; name already used in product code |
| ContextPanel | context panel | none | New |
| FilterBar | filter bar | Filter chips | House chip visuals |
| ConfirmationDialog | confirmation dialog | Buttons, Destructive exit | Consistent: labels name the action |
| CalendarPicker | calendar picker | Period navigator | Different controls; cross-link, do not merge |

House-only components (hub menu card, hero summary card, soft section card, highlight tile, insight
line) keep their catalogue entries and are used by summary screens; they inherit the universal
state matrix and test-tag scheme.

## Component 01: AppScaffold

**Purpose.** The frame every screen sits in: navigation, context, global status, safe areas. Not
for dialogs or full-screen media.

**Parameters.** `destinations` (3-5 on compact, each id, label, icon, badgeCount), `selectedId`,
`title`, `topActions` (max two icon actions or one text action), `context` (tenant, place, period:
strings), `statusSlot` (OfflineBanner), `primaryActionSlot`, `contextPanel` (expanded and up),
callbacks `onNavigate(id)`, `onSwitchContext`, `onBack`.

**Variants.** Hub (context strip visible), task (context folded into the title line as a chevron
button, per house style), wall display (no navigation, no input).

| State | Treatment |
|---|---|
| Compact | Bottom navigation, labels always visible at every text size |
| Medium | Navigation rail with labels |
| Expanded | Rail or labelled sidebar; optional ContextPanel |
| Large / extra-large | Persistent labelled sidebar; content width capped |
| Offline | Status slot shows OfflineBanner; layout does not jump (reserved height or overlay) |
| Badge | Count as text in the accessible name ("Approvals, 3 pending"); "99+" cap |
| RTL | Navigation order and back arrow mirror |

**Semantics.** Navigation exposed as a navigation landmark; selected destination announced as
selected; title is the screen heading; badges in the accessible name, not a separate node.

**Keyboard.** Web: skip-to-content link first; Tab reaches navigation, then content. Desktop: arrow
keys move within the rail; Escape closes the ContextPanel and returns focus to its trigger.

**Insets and back.** Edge-to-edge is enforced at targetSdk 35+ on Android 15+, with no opt-out at
targetSdk 36 (M6): every screen pads for system bars and the display cut-out through the scaffold,
never per screen. Back uses the predictive back APIs (M8); the scaffold never consumes back except
for an unsaved-data confirmation the screen requests.

**Test tags.** `appScaffold.nav.<destinationId>`, `appScaffold.title`, `appScaffold.context.switch`,
`appScaffold.status`.

**Performance.** Changing destination recomposes only the content region; badge updates recompose
only the badge.

**Compose.** Choose the navigation form from `currentWindowAdaptiveInfo()` width class (M3; large
and extra-large need the opt-in flag). Insets from `WindowInsets.safeDrawing`.
**Web.** `<nav>` with `aria-current="page"`; `<main>` with a skip link; layout switch by container
or media queries at 600, 840 and 1200 CSS px.

**Acceptance tests.** CT-01.1 screenshots at each width class show the expected navigation form.
CT-01.2 at 200% text bottom-navigation labels are visible and unclipped. CT-01.3 gesture and
three-button navigation screenshots show no content under system bars. CT-01.4 rotation keeps the
selected destination and scroll. CT-01.5 web: first Tab focuses the skip link.

## Component 02: KpiCard

**Purpose.** One headline figure with its meaning: label, value, unit, period, optional change and
a path to the detail. Not for long lists of numbers (use DataTable).

**Parameters.** `label`, `valueText` (preformatted, compact or exact), `valueAccessibleText` (full
amount in words the screen reader reads), `unit`, `period`, `delta` (optional: `direction` up,
down or flat; `text` such as "Up 15.7%"; `tone`), `freshness` (as-of text, stale flag), `icon`,
`onOpen`.

**Variants.** Standard (house KPI tile, two per row on compact); hero (one per page, largest
display style); compact (dense dashboards on expanded widths).

| State | Treatment |
|---|---|
| Loading | Skeleton in final size; no shimmer loop |
| Zero | "0" with unit and period; delta hidden |
| Nothing to compare | No delta chip (never "0%") |
| Stale | "As of 14:02" plus "Stale" chip |
| Restricted | Value reads "Restricted"; card not openable |
| Error | "Could not load" with retry; other cards unaffected |

**Rules.** Label, value, unit and period are required parameters, not optional (PX-DATA-002).
Change uses arrow, word and colour together. Percent and percentage points are labelled
distinctly (PX-DATA-003). Four cards at most per group. Counts are plain numbers.

**Semantics.** One merged node with role button when `onOpen` exists, read as: "Sales, last 30
days, 67,870,000 shillings, up 15.7 percent, as of 2 PM". Stale and restricted are part of the
description.

**Keyboard.** Single focus stop; Enter or Space opens.

**Test tags.** `kpiCard.<kpiId>`, `.label`, `.value`, `.delta`, `.freshness`.

**Performance.** Recomposes only when its own state changes; count-up animation only on summary
pages, once per visit, off under reduced motion (house exception for summary flourishes).

**Compose.** Merge descendants for semantics; set the accessible text explicitly rather than
letting the compact value be read. **Web.** A `button` or `a` wrapping the content, with a visually
hidden full value; never a clickable `div`.

**Acceptance tests.** CT-02.1 screen reader reads the full amount, not "67.87M". CT-02.2 a card with
no comparison has no delta node. CT-02.3 greyscale: direction readable from arrow and word.
CT-02.4 at 200% text the value wraps or steps down one size but is never truncated. CT-02.5 the
component fails to compile or validate without unit or period.

## Component 03: OperationalRecordRow

**Purpose.** One record in a working list (sale, patient, work order, room, request) with identity,
status and the main action. Not for statements (use the money skill's statement rows).

**Parameters.** `id`, `title`, `subtitle`, `meta` (time, owner), `trailingValueText` with
accessible text, `status` (StatusChip state), `pendingSync`, `selected`, `expanded`,
`onOpen`, `onPrimaryAction` (optional, labelled), `secondaryActions` (menu).

**Sizes.** Minimum height 56 dp (one line) or 72 dp (two lines); grows with text. Title wraps to two
lines then ellipsises, with the full text in the accessible name.

| State | Treatment |
|---|---|
| Selected | Check or leading bar plus tonal fill |
| Expanded | Detail inline; chevron rotates (instant under reduced motion) |
| Pending sync | "Pending" label and neutral styling |
| Overdue | Word and time overdue ("Overdue 2 days") with tone |
| Disabled | Muted, with reason in the accessible description |

**Rules.** Swipe actions always have a menu equivalent (PX-A11Y-008). The primary action is never
destructive. Stable keys from domain IDs (PX-TABLE-002).

**Semantics.** Row is one node with its full description; the primary action and menu are separate
focus stops with their own names ("Mark room 204 clean").

**Keyboard.** Up and Down move between rows in a list; Enter opens; a menu key or Shift+F10 opens
secondary actions.

**Test tags.** `recordRow.<recordId>`, `.title`, `.status`, `.primaryAction`, `.menu`.

**Performance.** Lists over 50 rows are lazy and keyed; a row recomposes only when its state
changes; images thumbnailed to the rendered size (PX-PERF-005).

**Compose.** Lazy list with `key = id`; avoid nested scroll on the same axis. **Web.** `li` in a
`ul` or a row in a grid; the row link wraps the title, not the whole row with nested buttons.

**Acceptance tests.** CT-03.1 a 1,000-row list scrolls with no frozen frame on the reference device.
CT-03.2 every swipe action is reachable from the menu. CT-03.3 at 200% text no essential field is
clipped. CT-03.4 reordering data keeps focus on the same record ID.

## Component 04: StatusChip

**Purpose.** A record's status in a word, with tone and icon. Not a button unless used as a filter
(then use FilterBar chips).

**Parameters.** `text` (required), `tone` (success, warning, danger, info, neutral), `icon`
(recommended), `accessibleText` (when the visible word needs context, for example "Payment
status: part paid").

**Tones.** Success for completed outcomes; warning for attention needed soon; danger for failure,
loss, overdue past threshold and critical severity; info for in-progress system states (syncing,
awaiting approval); neutral for pending, queued and draft (PX-COLOUR-005). Each tone has on and
container roles in light and dark with measured contrast (house style gains warning, info and
neutral roles, owner default 2026-11-07).

| State | Treatment |
|---|---|
| Long text | Wraps inside the row; never truncated to a colour blob |
| Dark | Container tone remapped, text contrast >= 4.5:1 |
| Greyscale | Word and icon carry the meaning |

**Semantics.** Read as text in the parent row; not a separate focus stop.

**Test tags.** `statusChip.<context>` (for example `recordRow.<id>.status`).

**Performance.** No animation except an instant change.

**Compose / web.** A text element with icon; web `span` with no role; never colour-only CSS classes
without the word.

**Acceptance tests.** CT-04.1 greyscale screenshot: every status readable. CT-04.2 contrast table for
five tones in two themes passes 4.5:1 for text. CT-04.3 no chip renders without text (validation).

## Component 05: DataTable

**Purpose.** Dense comparison of many records with sort, filter and selection on medium and wider
windows; becomes a row list on compact.

**Parameters.** `columns` (id, header, alignment, numeric flag, priority 1-3), `rows` (stable id
plus cell texts and accessible texts), `sort` (column, direction), `selection` (ids),
`onSort`, `onSelect`, `onOpen`, `onLoadMore`, `bulkActions`.

**Rules.** Numeric columns right-aligned with tabular figures (PX-TABLE-002). Header sticky.
Compact width: tables with more than four columns become OperationalRecordRow lists showing
priority-1 columns, never sideways scroll. Medium: priority 1-2 columns. Virtualise over 50 rows;
paging or incremental loading over 200 (PX-TABLE-001). Bulk selection shows count and, for money,
total before any bulk action.

| State | Treatment |
|---|---|
| Loading | Skeleton rows with final column widths |
| Empty / no match | Shared ST-EMPTY and ST-NOMATCH treatment |
| Sorted | Header shows direction icon and announces "sorted descending" |
| Bulk selected | Bar with count, total, actions |
| Overflow | Column chooser on expanded and up |

**Semantics.** Grid or table role with header associations; sort state on the header; selection
state per row.

**Keyboard.** Desktop and web: arrow keys move between cells, Home and End to row ends, Space
selects, Enter opens.

**Test tags.** `dataTable.<tableId>.header.<columnId>`, `dataTable.<tableId>.row.<rowId>`,
`dataTable.<tableId>.bulkBar`.

**Performance.** 10,000 rows keep scrolling free of frozen frames on the reference desktop and
tablet; sorting large sets runs off the main thread.

**Compose.** Lazy column with keyed rows; column widths measured once. **Web.** Native `table` for
up to a few hundred rows; ARIA grid with virtualisation above.

**Acceptance tests.** CT-05.1 at compact width a six-column table renders as rows, no horizontal
scroll. CT-05.2 sort announced by screen reader. CT-05.3 keys stable across sort and refresh.
CT-05.4 bulk bar total equals the sum of selected rows.

## Component 06: SearchField

**Purpose.** Find records by text or code, including scanned codes. Not a filter builder (use
FilterBar).

**Parameters.** `query`, `placeholderHint` (label stays visible, PX-FORM-001), `results` state,
`recent`, `scanEnabled`, `offlineIndex` flag, callbacks `onQueryChange`, `onSubmit`, `onClear`,
`onScan`.

**Rules.** Debounce typing 250 ms before querying; minimum characters per data set (default 2;
1 for codes). The scan button feeds the same pipeline as typed codes. Offline queries a local index
and labels results "Searching data on this device". Clear restores the previous list and scroll.
Search tolerates common spelling variants and diacritics (PX-L10N-007). Arabic input works with
`dir="auto"` behaviour.

| State | Treatment |
|---|---|
| Typing | Results update after debounce; stale results dimmed, not removed |
| No results | "No match for 'paracetamol'" plus suggestions or add action by role |
| Offline | Local results labelled |
| Error | Retry; query kept |

**Semantics.** Search role; result count announced politely ("12 results").

**Keyboard.** Ctrl or Cmd+K (or a documented key) focuses search on desktop; Down moves into results;
Escape clears then closes.

**Test tags.** `searchField.<context>.input`, `.clear`, `.scan`, `.result.<id>`.

**Performance.** No recomposition of the whole screen per keystroke; local index answers in
<= 100 ms p95 for 20,000 items on the reference device.

**Compose.** Query state hoisted; debounce in the presentation layer, not the composable.
**Web.** `input type="search"` with a visible label; `aria-live="polite"` count.

**Acceptance tests.** CT-06.1 typing 10 characters triggers at most 2 queries. CT-06.2 offline search
labels its results. CT-06.3 clear restores list and scroll. CT-06.4 result count announced.

## Component 07: MoneyField

**Purpose.** Enter or edit an amount in one currency. Not for display (use the formatter output).

**Parameters.** `currencyCode` (ISO 4217), `minorUnits` (from ISO 4217 with tenant override only by
DDR), `valueMinor` (integer minor units, never floating point), `min`, `max`, `allowNegative`,
`label`, `error`, `onValueChange(minor)`.

**Rules.** Decimals follow the currency's minor unit: UGX and RWF 0, KES, TZS and USD 2 (C1); UGX
never shows ".00" and its keypad has no decimal key. Grouping appears as the user types; the caret
does not jump. Paste is sanitised (spaces, symbols, local separators). The currency is shown once,
as code or symbol per the locale (UGX symbol `USh`, C3). Negative entry only where allowed (refund,
adjustment), shown with a minus sign and a word ("Refund"). Formatting is separate from
validation; the field never calculates tax, change or totals.

| State | Treatment |
|---|---|
| Invalid | Inline message: "Enter an amount up to USh 50,000,000" |
| Over max | Blocked with the limit |
| Disabled | Value legible; reason given |
| Refund / negative | Sign and word, not red alone |

**Semantics.** Label includes the currency ("Amount in Uganda shillings"); value read in full.

**Keyboard.** Numeric input mode; Enter submits or moves to the next field per form contract.

**Test tags.** `moneyField.<fieldId>.input`, `.currency`, `.error`.

**Performance.** Formatting is O(length) per keystroke; no recomposition outside the field.

**Compose.** Visual transformation for grouping with an offset mapping that keeps the caret; locale
digits shown per locale but stored as ASCII (C4). **Web.** `input inputmode="numeric"` (or
`decimal` for two-decimal currencies) with `dir="ltr"` inside RTL forms.

**Acceptance tests.** CT-07.1 typing 1234567 in UGX shows "1,234,567" and stores 1234567. CT-07.2 KES
12.5 stores 1250. CT-07.3 pasting "USh 1 200 000" stores 1200000. CT-07.4 caret position is stable
while grouping inserts separators. CT-07.5 in Arabic RTL the amount reads left to right with bidi
isolation.

## Component 08: PrimaryAction

**Purpose.** The single dominant next step on a screen or panel (house Accent button). Not for
secondary, destructive or navigation actions.

**Parameters.** `label` (verb phrase naming the outcome: "Take payment", never "OK" or "Submit"),
`icon` (optional leading), `enabled`, `disabledReason`, `busy`, `onAction`.

**Rules.** One per panel (PX-INTERACT-004, PX-COLOUR-004). Minimum height 48 dp (56 dp on POS and
glove contexts). Busy keeps the width, shows progress and blocks repeat activation until the
action resolves. Never adjacent to a destructive action (PX-DESTRUCT-002). On compact task screens
it sits in the bottom 40% of the screen and stays above the keyboard.

| State | Treatment |
|---|---|
| Busy | Progress inside the button; label kept for screen readers ("Taking payment") |
| Disabled | Reason shown nearby or announced on focus |
| Done | Brief confirmation, then the screen's ST-DONE state takes over |
| Offline | Label reflects the outcome ("Save on this device") when the action will queue |

**Semantics.** Button role; busy state exposed; name equals visible label (PX-A11Y-004).

**Keyboard.** Enter or Space activates; on desktop a documented shortcut may also trigger it.

**Test tags.** `primaryAction.<screenId>`.

**Performance.** Activation feedback <= 100 ms p95; no animation longer than 200 ms.

**Compose.** Debounce is not the guard: the busy state plus the idempotency key is. **Web.**
`button type="button"` with `aria-busy`; disabled via `aria-disabled` so focus and reason remain.

**Acceptance tests.** CT-08.1 ten rapid activations produce one `onAction` while busy. CT-08.2 width
unchanged between idle and busy. CT-08.3 at most one accent-coloured action per panel (screenshot
lint). CT-08.4 with the keyboard open the action is still visible on compact.
