# Foundations: tokens, type, geometry, colour, navigation, interaction and architecture

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Use this reference when you set up a product theme, review a screen's visual and interaction
foundations, choose navigation for a window size, or lay out a Kotlin Multiplatform (KMP) /
Compose Multiplatform (CMP) codebase. Rule IDs (`PX-<AREA>-NNN`) are defined in
[rules-catalogue.md](rules-catalogue.md); platform facts carry a currentness ID (for example
`M3`) from [currentness-register.md](currentness-register.md).

Two layers govern how a Chwezi app looks:

- **The house style** supplies the concrete values: colours, faces, scales, motion timings. Read
  [style-roles-and-tokens.md](../../../09-design-systems-tokens-and-theming/chwezi-business-app-house-style/references/style-roles-and-tokens.md).
- **This standard** supplies the semantic contract those values must satisfy and the checks that
  prove it. Where this file gives a range and the house style gives a value inside or near it, the
  house value is the implementation. Departures need a design decision record (DDR).

## Task 1: build or review the token pack

### Semantic token groups

Every product theme defines these groups. Screen and component code reads tokens only, never raw
literals (PX-TOKEN-001). The right-hand column maps each token to the house-style role that
currently carries it.

| Group | Token | Job | House-style role |
|---|---|---|---|
| Surface | `surface.canvas` | Page background behind cards | Ground |
| Surface | `surface.default` | Cards, sheets, top bar | Surface |
| Surface | `surface.raised` | Floating layers: sheets, dialogs, floating cart bar | Surface plus elevation 1-3 |
| Surface | `surface.overlay` | Scrim behind modal layers | **Gap**: define in house style |
| Surface | `surface.inverse` | Snackbars, inverse banners | **Gap**: define in house style |
| Brand | `brand.primary` / `brand.onPrimary` | Links, filled buttons, selection | Brand primary / On primary |
| Brand | `brand.container` / `brand.onContainer` | Selected nav pill, period navigator | Primary container |
| Brand | `action.nextStep` / `action.onNextStep` | The single next-step action | Accent (warm amber) |
| Text | `text.primary` | Body text and figures | Ink |
| Text | `text.secondary` | Labels, secondary lines | Muted |
| Text | `text.tertiary` | Non-essential metadata only | Muted (no separate role; must keep body contrast) |
| Text | `text.inverse` | Text on inverse surfaces | **Gap** |
| Text | `text.link` | Inline links | Brand primary |
| State | `state.success` + `on` + `container` | Paid, confirmed, synced, positive change | Money up / success |
| State | `state.danger` + `on` + `container` | Failure, loss, due, destructive | Money down / error |
| State | `state.warning` + `on` + `container` | Needs attention soon: low stock, expiring, stale data | **Gap** |
| State | `state.info` + `on` + `container` | Neutral notices: queued, syncing, informational banners | **Gap** |
| State | `state.neutral` + `on` + `container` | Draft, inactive, not started | **Gap** |
| Geometry | `radius.xs` ... `radius.xl`, `space.*`, `size.*` | Shape and rhythm | Radius and spacing scales |
| Motion | `motion.short`, `motion.standard`, `motion.long`, `motion.reduced` | Durations and easings | Motion table |
| Elevation | `elevation.0` ... `elevation.3` | Layer separation | 0 for cards; 1-3 floating layers only |

Owner default, 2026-11-07: the token name is `danger`; "critical" is a severity label, never a
colour role. The house style is to add `warning`, `info`, `neutral`, `overlay` and `inverse`
roles with measured contrast in both themes. Until it publishes values, any product that uses
these roles records its own values and measured contrast in its token pack, and the values are
reviewed against the house style when it catches up.

### Token rules (all MUST unless marked)

1. **Two themes, remapped.** Every surface, text and state token has light and dark values; dark
   is remapped, never inverted; contrast pairs are recomputed per theme (PX-TOKEN-003).
2. **Only brand tokens vary by product.** A product theme changes `brand.*` and colours derived
   from the brand hue. It never changes the meaning, colour role or label of success, warning,
   danger, info, neutral or destructive (PX-TOKEN-004). The accent model is the house model
   (owner default, 2026-11-07): per-product brand primary plus one shared amber next-step accent;
   any extra colour needs a DDR.
3. **No hard-coded hues.** Components get brand colour only through tokens (PX-TOKEN-005).
4. **Theme swap is colour-only.** Swapping the brand primary changes no layout, spacing, state
   meaning or contrast pass (PX-TOKEN-006). Check: screenshot two brand primaries side by side;
   geometry diff is zero; the contrast table is recomputed and passes.
5. **Versioned together.** Token pack, component library and screenshot baselines share one
   version tag (PX-TOKEN-007).
6. **One source for every platform.** Web and desktop consume tokens generated from the same
   source as the KMP theme (PX-TOKEN-008). See Task 9.
7. **SHOULD: state colour by severity.** `danger` is for failures, losses, destructive actions
   and critical alerts. Ordinary pending or queued work uses `info` or `neutral`, never `danger`
   (PX-COLOUR-005).

Check: a schema validation of the token pack confirms every group above exists with light and
dark values and an `on`/`container` pair for each state.

## Task 2: set the type scale

Typeface choice is not made here. Take the type pair from the house style or from the design
engine's typography skills (`01-typography-and-fonts/font-selection-and-pairing` and
`01-typography-and-fonts/ai-slop-typography-audit`) and state the pair and reason before you build
(PX-TYPE-007). Two failures are automatic:

- Shipping Compose's default family (`FontFamily.Default`, which is Roboto on Android) as the
  primary face.
- Shipping a bare system font stack on web as the only face. A system stack is allowed only as a
  documented fallback chain behind bundled faces.

### Starting ranges

The ranges below are the standard's envelope (PX-TYPE-001, SHOULD). House-style named styles are
the implementation.

| Role | Phone | Large window | Validation |
|---|---|---|---|
| Screen title | 24-28 sp | 28-32 sp | Wraps; never clips at 200% text |
| Section heading | 18-22 sp | 18-24 sp | Exposed as a heading to assistive technology (PX-TYPE-006) |
| Body | 14-16 sp | 14-16 sp | Follows the OS text-size setting (PX-TYPE-005) |
| Metadata | 12-14 sp | 12-14 sp | Never the only carrier of essential information (PX-TYPE-003) |
| KPI figure | 24-36 sp | 24-36 sp | Tabular figures; unit and period visible (PX-TYPE-004) |
| Single hero figure | up to 45 sp | up to 45 sp | One hero figure per page (house rule) |

Floor: 12 sp for any text. Step ratio: at least 1.25 between adjacent steps, per
[type-scale-and-spacing.md](../../../../doctrine/references/type-scale-and-spacing.md).

### Type validation checklist

- Text uses scalable units: `sp` on Android and in Compose, Dynamic Type text styles on iOS, `rem`
  on web. Padding and container sizes do not use `sp` (currentness: M13).
- Do not compute sizes from `fontScale` or `scaledDensity`; Android 14+ scales non-linearly up to
  200% (M13).
- Every figure uses tabular figures (`tnum` or the face's tabular set), including an amount inside
  a sentence (PX-TYPE-004).
- At 200% text on Android, the largest accessibility size you support on iOS (record it; I4 lists
  AX1-AX5), and 200% zoom on web: no essential text clips, and no primary action is lost
  (PX-TYPE-002, PX-TYPE-005). At accessibility sizes, stack side-by-side layouts (I4).
- Arabic and other scripts: re-test line height after moving to targetSdk 36, because
  `elegantTextHeight` is ignored there (M10).

## Task 3: apply spacing and geometry

| Item | Rule | Level |
|---|---|---|
| Spacing scale | One bounded 4-based scale. House values: 2, 4, 8, 12, 16, 24, 32, 48. The 2 is only for optical nudges and hairline offsets | MUST (PX-GEOM-001) |
| Screen inset | 16-20 dp phone, 24-32 dp large windows (house gutter 16 on phone) | SHOULD (PX-GEOM-003) |
| Radius | House radius set: 8, 12, 16, 20, 28. Cards 20; sheets and hero 28. The source's "card 12-20 dp, hero 20-24 dp" is superseded (owner default, 2026-11-07) | MUST: one radius set per product (PX-GEOM-008) |
| Tables and dense lists | Rounded container only; rows stay square | SHOULD (PX-GEOM-004) |
| Separation | Hairline borders or tonal steps; cards elevation 0; elevation 1-3 only for sheets, dialogs and a floating cart bar | SHOULD (PX-GEOM-006) |
| Touch targets | 48 x 48 dp Android, 44 x 44 pt iOS, measured on the interactive region, not the glyph | MUST (PX-GEOM-005) |
| Glove, field and POS keypad | Targets at least 56 dp, at least 8 dp apart, no gesture-only actions | MUST where the product profile names gloves, outdoor or POS keypad use (PX-INTERACT-018) |
| Web pointer targets | At least 24 x 24 CSS px (WCAG 2.5.8 AA floor, A5); 44 x 44 CSS px on touch-first screens | MUST floor; SHOULD aim |
| Safe areas | Content clears system bars, cut-outs and gesture areas on every screen | MUST (PX-GEOM-002) |
| Icons | One line-icon family plus one illustration style per product | MUST (PX-GEOM-008) |
| Alignment | Numeric columns right-aligned; baselines aligned; consistent card padding | SHOULD (PX-GEOM-007) |

Keep three target numbers distinct and never merge them in documents: 24 CSS px (WCAG AA), 44
CSS px (WCAG AAA, A6), and the platform floors 48 dp / 44 pt (M1, I1). The Chwezi house floor on
touch is the platform floor, which exceeds WCAG AA.

## Task 4: check colour and contrast

1. **Contrast in every theme** (PX-COLOUR-001): body text at least 4.5:1; large text at least
   3:1; component boundaries, focus indicators and meaningful graphics at least 3:1 (A3, A4).
   Compute from rendered colours, not from intended tokens.
2. **Never colour alone** (PX-COLOUR-002): every status carries a word, sign or icon as well as
   colour. Check with a greyscale screenshot: every status is still readable.
3. **Neutral working surfaces** (PX-COLOUR-003): brand colour goes to identity surfaces (hero
   panel, logo, selection), not across working content. Review prompt: on a task screen, does
   saturated brand colour cover more than about a tenth of the area? If so, justify it in a DDR.
4. **One next-step accent per screen** (PX-COLOUR-004): count accent-coloured actions per screen
   or focused panel; the count is 0 or 1.
5. **No decorative gradients on task screens** (PX-COLOUR-006).
6. **Outdoor products** (Farm Acre, SpannaMax field screens): provide a high-contrast light theme
   with body text at least 7:1; dark mode is not the outdoor answer (PX-COLOUR-007).
7. **Dynamic colour** (Android 12+, M12) may harmonise brand colours, but it never replaces
   semantic state colours, and contrast is re-checked after harmonisation.

For palette work, use `02-color-brand-and-visual-identity/accessible-color-and-contrast` and
`02-color-brand-and-visual-identity/dark-mode-and-theming`.

## Task 5: choose navigation by window size class

Classify by the window, not the device. Width classes (verified, M3):

| Width class | Width (dp) | Navigation | Content |
|---|---|---|---|
| Compact | w < 600 | Bottom bar with 3-5 primary destinations; contextual top bar; a focused More area | Single column; records open as destinations |
| Medium | 600 <= w < 840 | Navigation rail | Two panes where the content supports it |
| Expanded | 840 <= w < 1200 | Rail or labelled sidebar | Multi-column widgets; list-detail |
| Large | 1200 <= w < 1600 | Persistent labelled sidebar; global search | Tables, context or utility pane, configurable grids |
| Extra-large | w >= 1600 | Persistent labelled sidebar; global search | As large, plus a cap on line length and table width so content does not stretch edge to edge |

Height classes (verified, M4): compact h < 480 dp; medium 480 <= h < 900; expanded h >= 900.
House SHOULD: in compact height (a phone in landscape, a split window), prefer a rail to a
bottom bar so the working area keeps its height, and keep the primary action visible without
scrolling.

Rules:

- **Opt in to large and extra-large.** In Compose they are reported only when you call
  `currentWindowAdaptiveInfo(supportLargeAndXLargeWidth = true)` (M3). Without the opt-in, a
  1400 dp window reports expanded; record which you use.
- **Breakpoints are starting points** (PX-LAYOUT-002): test with long localised content, 200% text,
  the keyboard open and fold postures. If content breaks before the breakpoint, the content wins.
- **Continuity** (PX-NAV-002): destination, selection, scroll position and in-progress input
  survive resize, rotation and fold changes. Test: rotate, resize and unfold mid-task.
- **No invented destinations** (PX-NAV-004): the nav graph matches the product information
  architecture.
- **Alerts deep-link** to the affected record (PX-NAV-005).
- **Evidence set** (PX-LAYOUT-004): compact phone; tablet portrait and landscape; desktop or web
  where the product ships there.

Material's own site lists the window size classes too, but it could not be read on 2026-11-07
(M5, NOT_ASSESSED); the Android developer page (M3) is the cited source.

## Task 6: make every interaction answer

| Rule | Check | ID |
|---|---|---|
| Every input gets visible and accessible acknowledgement: pressed, in progress, success, failure or queued | Instrumented timing; target p95 input-to-feedback <= 100 ms on the baseline device, measured apart from server completion (target is SHOULD) | PX-INTERACT-001 |
| Double taps, timeouts and replays never create duplicate records | Double-tap, timeout-then-retry and replay tests produce exactly one record | PX-INTERACT-002 |
| No indefinite waiting: every progress indicator has a timeout and a recovery path | Stall the network; recovery UI appears within the stated timeout | PX-INTERACT-003 |
| One visually dominant next action per screen or panel | Count primary-emphasis controls per panel = 0 or 1 | PX-INTERACT-004 |
| Work in progress survives back, process death, connection loss and accidental dismissal | Kill the process and toggle airplane mode mid-task | PX-INTERACT-006 |
| Reversible changes offer undo; confirmation only protects money, health, privacy or irreversible state | Inventory of confirmations, each tagged with one of the four reasons | PX-INTERACT-007, PX-INTERACT-008 |
| Safe defaults only; never preselect a consequential clinical or financial choice | Defaults register reviewed per role | PX-INTERACT-009 |
| At most one modal layer on routine tasks; no hidden primary actions | Modal depth <= 1 on core tasks | PX-INTERACT-013 |
| Haptics confirm scan, payment confirmation and destructive commit; distinct failure pattern; follow the system setting; never the only channel | Haptic register; system-setting-off test | PX-INTERACT-014 (SHOULD) |
| Hardware scanners deliver into the active scan target without the user focusing it; not-found is visible and announced | Scripted wedge input; double-read test | PX-INTERACT-015 |

Status messages (saved, queued, synced, scan result) are announced without moving focus
(PX-A11Y-012, WCAG 4.1.3). Interaction patterns in depth:
`04-web-and-ui-design/component-states-and-interaction-fidelity` and
`08-motion-and-interaction/micro-interactions-and-feedback`.

## Task 7: set motion

Motion has two classes. Both are off under reduced motion.

| Class | Where | Duration | Rules |
|---|---|---|---|
| State and navigation transitions | Every screen | 120-300 ms (house dialog enter 140 ms sits inside) | Animate opacity and translation; no live blur; no repeated layout per frame (PX-MOTION-001, SHOULD) |
| Once-per-visit summary flourishes | Summary and hub pages only | House reveal 420 ms with 70 ms stagger, count-up 900 ms, chart grow-in 700 ms; total <= 1.2 s | Never on operational screens (POS, clinical, data entry); never repeated in a session |

Reference durations come from the Material token source: short 50-200 ms, medium 250-400 ms, long
450-600 ms, extra-long 700-1000 ms, with standard and emphasised easings (M14). The newer
expressive system uses a spring-based `MotionScheme` (M11); do not mandate it until Compose
Material 3 1.5.0 is stable in the project's pinned version. Apple publishes no numeric durations
(I8).

MUST rules:

- **Reduced motion (house rule).** When the user asks for reduced motion (Android "Remove
  animations" / animator duration scale 0, iOS Reduce Motion, CSS `prefers-reduced-motion:
  reduce`), remove non-essential motion and show the final state at once (PX-MOTION-002; X1, I5).
  This is a Chwezi house MUST. WCAG places it at AAA (2.3.3, A12), so never report it as an AA
  requirement.
- **No idle animation** (PX-MOTION-003): no looping decoration, no shimmer loops, no constantly
  animating charts. Check: an idle-screen trace shows zero animation frames after settle.
- **Every animation has a recorded purpose** and never delays a repeat operation (PX-MOTION-004).
  Check: repeat-task timing is equal with motion on and off.
- WCAG A floor still applies: nothing flashes more than three times a second (2.3.1); auto-moving
  content over 5 s can be paused (2.2.2).

## Task 8: build forms and destructive actions

### Forms

| Rule | Detail | ID |
|---|---|---|
| Visible labels | Labels stay visible while typing; no placeholder-only labels | PX-FORM-001 |
| Right keyboard | Field register lists the input type: numeric, decimal, phone, email, date, text. Set the platform hint (`KeyboardType` in Compose, `inputmode` and `autocomplete` on web, which also serves WCAG 1.3.5) | PX-FORM-002 |
| Numeric keypad | Amounts and quantities open a numeric keypad, or an in-app keypad on POS with targets >= 56 dp. Zero-minor-unit currencies (UGX, RWF) accept no decimal key. Quick-tender buttons for common notes; change due shown large | PX-INTERACT-016 |
| Validation timing | Validate on blur or on submit, never per keystroke for errors. Clear an error as soon as the input becomes valid. Format hints show before entry, not after failure | PX-FORM-003, PX-FORM-006 |
| Failed submit | Focus moves to the first invalid field; the error is announced; entered data is kept | PX-FORM-003 |
| Correction text | Inline, contextual, saying what to change ("Enter a phone number with 9 digits after +256"), not "Invalid input" | PX-FORM-006 |
| Optional marking | One convention per product (mark optional, or mark required), applied everywhere | PX-FORM-004 |
| Reach | Save or submit stays within thumb reach on phones and is not hidden by the keyboard | PX-FORM-005 (SHOULD) |
| No re-entry | Data given earlier in the same process is prefilled or selectable (WCAG 3.3.7) | PX-A11Y-010 |
| Phone numbers | Entered and stored in E.164 with a country selector defaulting to the tenant country | PX-L10N-007 |

Form craft in depth: `04-web-and-ui-design/form-ux-design`.

### Destructive actions

1. State the affected item, the consequence and whether it can be undone (PX-DESTRUCT-001).
2. Reversible: act at once and offer undo. Irreversible: confirm with a dialog whose buttons name
   the action ("Void receipt", "Keep receipt"), never "OK" and "Cancel" alone; the destructive
   button is not the default focus.
3. Destructive controls look different from routine primary actions (outlined `danger` role in the
   house style) and are never adjacent to a high-frequency positive action; separate them by at
   least one target width or put them in a separate group (PX-DESTRUCT-002).
4. Voiding documents, closing jobs and changing totals are recorded with who, when and why
   (PX-DESTRUCT-003). Numbered documents are voided, never deleted (standing numbering rule;
   PX-DATA-013).
5. Irreversible bulk actions use typed confirmation; supervisor-gated actions use a PIN or badge
   step that is attributed in the audit trail.

## Task 9: meet Android targetSdk 36 consequences

Google Play requires new apps and updates to target Android 16 (API 36) from 31 August 2026
(extension possible to 1 November 2026) (M7). For every Play-distributed Android app, these are
MUST rules:

| Platform change | What the app must do | Check |
|---|---|---|
| Edge-to-edge with no opt-out: at targetSdk 36 on Android 16+, `windowOptOutEdgeToEdgeEnforcement` is deprecated and disabled (M6) | Handle insets on every screen: status bar, navigation bar, cut-out, IME. Bottom bars and the floating cart bar sit above the gesture area; scrolling content pads by the inset, not a fixed number | Screenshots with gesture navigation, 3-button navigation, a cut-out device and the keyboard open (PX-GEOM-002) |
| Predictive back on by default: `onBackPressed` is not called and `KEYCODE_BACK` is not dispatched (M8) | No business logic in `onBackPressed`. Use `BackHandler` or `PredictiveBackHandler` (activity-compose 1.8.0+). Intercept back only to protect unsaved data, and then offer save, discard or stay. Never block back in other cases | Back-behaviour matrix per screen, including mid-payment and mid-form (PX-NAV-003) |
| Orientation, resizability and aspect-ratio restrictions ignored where smallest width >= 600 dp (M9) | A portrait-locked POS or tablet screen must adapt. Build landscape and resizable layouts for every screen that can run on a tablet or foldable. The temporary opt-out ends at API 37 | Rotate and resize every screen on a sw600dp device; state and drafts survive (PX-NAV-002, PX-LAYOUT-002) |
| `elegantTextHeight` ignored (M10) | Re-test Arabic and other tall-script layouts for clipping | RTL and Arabic screenshots at 100% and 200% text |

WCAG 1.3.4 Orientation (AA) points the same way on web: do not lock orientation unless it is
essential.

## Task 10: structure a KMP / Compose Multiplatform product

### Platform status

CMP is Stable on Android, iOS and desktop (JVM) and Beta on web (Kotlin/Wasm) (K1, K3). Existing
web front ends keep their stack and consume the same tokens; a Compose-for-Web production front
end needs a DDR. Pin the CMP version per project and record it (K2).

### Module layout

With AGP 9 or later, the KMP plugin cannot share a module with `com.android.application` or
`com.android.library` (K4). Use this layout (PX-ARCH-003, SHOULD; the `androidApp` split is MUST
on AGP 9+):

```text
androidApp/                      Android entry point (com.android.application): Activity, manifest, insets
iosApp/                          Xcode project hosting the shared UI
shared/ (or composeApp/)         com.android.kotlin.multiplatform.library + KMP
  core/designsystem/             tokens, typography, theme, components, charts, motion, accessibility
  core/ui/                       navigation, feedback (status, snackbar), adaptive scaffolds
  core/platform/                 interfaces for platform adapters (expect/actual only where needed)
  features/<feature>/presentation   screens, UI state, intents, effects
  features/<feature>/domain         use cases and rules (no UI imports)
  features/<feature>/data           repositories, sync queue, local store
desktopApp/, webApp/             where shipped
```

Source sets: `commonMain`, `androidMain`, `iosMain`, with `appleMain` as an intermediate set;
iOS targets `iosArm64` and `iosSimulatorArm64` (K4). Features talk through interfaces, never
direct cross-feature imports; enforce it with a dependency lint, not by convention.

### State model

Each screen has immutable UI state, explicit user intents and one-off effects (PX-ARCH-004). No
networking or business calculation inside rendering functions (PX-ARCH-005).

Every data screen declares all thirteen canonical states (PX-STATE-001). A state that cannot
occur is declared "not applicable" with a reason, never silently omitted. Initial loading,
content, error and success may never be N/A. The codes match the unified state table in
[screen-blueprints-a.md](screen-blueprints-a.md) and the `required_screen_states` list in the
policy file.

| # | Code | State | Minimum treatment |
|---|---|---|---|
| 1 | ST-LOAD | Initial loading | Static skeleton in final geometry; no shimmer loop; no layout shift on arrival |
| 2 | ST-CONTENT | Content | The baseline |
| 3 | ST-REFRESH | Refreshing | Current content stays; progress in the header; never blank the screen |
| 4 | ST-EMPTY | Empty | Cause named (nothing yet, no permission, not yet synced) and one next action (PX-STATE-004) |
| 5 | ST-NOMATCH | Filtered-empty | Active filters shown, "0 of N", and a clear-filters action; never the "nothing yet" message |
| 6 | ST-ERROR | Error | What happened, what is still safe, what to do next; codes only as a secondary reference (PX-STATE-005) |
| 7 | ST-OFFLINE | Offline with cache | Data labelled with last successful sync time; never presented as live (PX-OFFLINE-004) |
| 8 | ST-QUEUED | Queued change | Record marked pending; never styled as confirmed (PX-OFFLINE-003) |
| 9 | ST-SYNC | Syncing | Progress with a count; the user can keep working |
| 10 | ST-CONFLICT | Conflict | Both versions with actor and time; the authorised user chooses; nothing dropped silently (PX-STATE-006) |
| 11 | ST-RESTRICT | Permission-restricted | Says what is restricted and who can grant it; masked fields read "Restricted", not blank (PX-PRIV-006) |
| 12 | ST-EXPIRED | Session expired or idle-locked | Re-authentication keeps the draft and returns to the same place (PX-PRIV-008) |
| 13 | ST-DONE | Success | Shows exactly what was saved, queued or completed, plus the next step; only after server acknowledgement for server writes (PX-STATE-002, PX-STATE-003) |

Recommended shape in Kotlin (illustrative):

```kotlin
@Immutable
data class SaleUiState(
    val cart: CartUi,
    val load: LoadState,          // Loading, Content, Refreshing, Empty(cause), NoMatch(filters, total), Error(message)
    val connectivity: SyncState,  // Online, OfflineCached(lastSyncAt), Syncing(done, total)
    val pending: PendingState,    // None, Queued(count), Conflict(items)
    val access: AccessState,      // Full, Restricted(reason, grantor), SessionExpired(draftKept)
    val outcome: Outcome?,        // null, or Done(what, nextStep) after acknowledgement
)
sealed interface SaleIntent { /* AddItem, ChangeQty, Pay, Retry, ResolveConflict, Reauthenticate ... */ }
sealed interface SaleEffect { /* ShowReceipt, Announce(text), OpenPaymentStatus ... */ }
```

Keep the orthogonal parts (loading, connectivity, pending, access) separate so a screen can be
"content + offline cached + 3 queued" at once; one flat enum cannot express that.

### Component contract

Every shared component documents (PX-ARCH-006): purpose; parameters (immutable state plus
semantic callbacks such as `onAction`, `onRetry`, `onDismiss`, never repositories or network
clients); default and minimum sizes; variants; states (enabled, disabled with reason, loading
with geometry reserved and duplicate activation blocked, selected, error, offline where it
mutates); semantics (role, name, state, live region where it reports status); keyboard behaviour;
test tags named `<component>.<part>` (for example `kpi.value`); RTL behaviour; previews for
normal, empty, loading, error and long text; screenshot tests in both themes at compact and
expanded width and at 100% and 200% text; and performance limits (row counts, recomposition
budget). The full per-component contracts are in [component-contracts-a.md](component-contracts-a.md)
and [component-contracts-b.md](component-contracts-b.md). Reuse approved components first; a new
component or variant needs a DDR (PX-ARCH-007).

### Platform adapters

Keep these behind interfaces in `core/platform`, implemented per platform (PX-ARCH-001):
permissions, biometrics, camera and barcode capture, printing (thermal and system print),
notifications, secure storage, screenshot protection, haptics, share sheets, keyboard and IME
behaviour, and back handling. Never assume an Android-only library works on iOS (PX-ARCH-002);
the iOS build runs every shared screen.

On iOS, CMP maps semantics to VoiceOver and supports Full Keyboard Access (K5). Dynamic Type
mapping and Reduce Motion behaviour are not documented for CMP, so they must be device-tested at
accessibility sizes and with Reduce Motion on, and recorded as MEASURED evidence (K5). Do not
imitate Apple's translucent control layer in the content layer; any custom translucency needs an
opaque fallback (I7).

### Web and desktop token export

Web and desktop products meet interaction parity (same states, flows and semantics), not pixel
identity, and need no Compose rewrite (PX-ARCH-008). Generate their tokens from the same source
file as the KMP theme (PX-TOKEN-008):

1. Keep one token source in a format your toolchain reads. When an interchange format is wanted,
   use the Design Tokens Format Module 2025.10 (DGN-008 in the design engine's
   `governance/standards-source-register.md`).
2. A build step emits the Kotlin theme objects and a CSS file of custom properties, and, where
   the web stack uses a utility framework, its theme configuration. No hand-maintained copies.
3. Emit light values on `:root` and dark values under the dark-scheme media query and an explicit
   theme attribute, so a user or tenant choice can override the system.

```css
:root {
  --color-surface-canvas: #E8F1FC;
  --color-text-primary: #1D273B;
  --color-state-danger: #B42323;
  --radius-card: 20px;
  --space-4: 16px;
  --motion-standard: 200ms;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) { --color-surface-canvas: #161C24; /* ... */ }
}
:root[data-theme="dark"] { --color-surface-canvas: #161C24; /* ... */ }
@media (prefers-reduced-motion: reduce) {
  :root { --motion-standard: 0ms; }
}
```

The values shown are the house-style reference values; your product's generated file replaces
them. Check: a diff between the generated CSS and the token source is empty in CI.

## Evidence/currentness

All platform facts above cite IDs in [currentness-register.md](currentness-register.md), accessed
2026-11-07: WCAG A3-A6, A12 and W5 (other criteria levels); Android M1, M3-M14; Apple I1, I4, I5,
I7, I8; CMP K1-K5; motion X1. Material's own layout and motion pages are NOT_ASSESSED (M5, M14
note). House-style values are those in
[style-roles-and-tokens.md](../../../09-design-systems-tokens-and-theming/chwezi-business-app-house-style/references/style-roles-and-tokens.md)
as measured there on 2026-11-07. The `warning`, `info`, `neutral`, `overlay` and `inverse` roles
have no house values yet: any contrast claim for them is NOT_ASSESSED until measured.
