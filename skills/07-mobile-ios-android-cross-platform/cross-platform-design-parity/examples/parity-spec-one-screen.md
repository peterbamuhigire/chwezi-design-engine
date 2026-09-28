# Parity spec — one screen, both platforms

**Screen:** Transactions list + transaction detail, "Maduuka Pay" (a fintech wallet app).
**Source of truth:** Figma authored on iOS. **Build target shown:** native (Swift + Kotlin);
the RN/Flutter equivalents are noted per row from `references/rn-flutter-mapping.md`.
**Brand constants (Unified, both platforms):** display face *Andada Pro* (from group 1 Editorial,
embedded), body *Source Sans 3*; brand teal `#0E7C6B` and ink `#13241F` as semantic tokens;
logo, transaction iconography, and voice ("Sent · Received · Pending"). None of these change
across platforms — see `doctrine/design-doctrine.md` §0.

Version gates: iOS targets 26+ (Liquid Glass tab bar + nav material; standard HIG vibrancy
fallback below 26). Android targets the Material 3 **Expressive** token set (baseline M3 fallback
on older devices).

---

## A. Unify / Diverge classification

**Unify (identical meaning/brand both sides):**
- Brand colour, type, logo, transaction-category icons, microcopy/voice.
- Information architecture: Home · **Transactions** · Cards · Profile (4 destinations).
- The Transactions data model, grouping (by day), and the row content (merchant, category icon,
  amount, status, time).
- Task flow: tap a row → detail → "Report a problem" / "Split" actions. Same steps both sides.
- The bespoke **empty state** ("No transactions yet") illustration — one branded asset, both apps.

**Diverge (native mechanism each side):**
- Tab container, top header, row chrome, primary action, detail presentation, motion, gestures.

---

## B. Side-by-side element sheet

| Element | Unified value | iOS resolution (HIG / Liquid Glass) | Android resolution (Material 3 Expressive) | Rationale |
|---|---|---|---|---|
| Tab bar | Same 4 destinations, same icons | Bottom **tab bar**, Liquid Glass material, SF-Symbol-matched icon weights | **Bottom navigation bar** (compact) → **navigation rail** on large/foldable | Same destinations; native container + adaptive on Android big screens |
| Screen title | "Transactions" | **Large title** collapsing to inline on scroll | **Large top app bar** collapsing to small on scroll | Same word, native header behaviour |
| Day grouping header | "Today / Yesterday / 12 Jun" | Inset-grouped `List` section header | `ListItem` overline / sticky M3 subheader | Same grouping; native list chrome |
| Transaction row | merchant · icon · amount · status · time | Inset row, trailing **disclosure chevron**, **swipe-left** for "Report" | Edge-to-edge `ListItem`, no chevron, **swipe-to-action** with M3 state-layer | Same content, platform row affordances |
| Status pill | Sent/Received/Pending, brand teal | HIG-styled capsule, SF font | M3 chip-style label, Roboto | Brand colour unified; label face is system text |
| Primary action ("Add money") | Same action, same label | **Prominent bar button** in the header/toolbar (no FAB on iOS) | **Extended FAB**, bottom-right, brand teal | FAB is Android-idiomatic; iOS never uses one |
| Pull to refresh | Refresh the list | `.refreshable` system spinner | M3 `PullToRefresh` indicator | Same behaviour, native indicator |
| Open detail | Navigate to detail | `NavigationStack` **push** (slide-in from right) + edge-swipe-back | Navigate via **container-transform** (row morphs into detail) | Same destination, native transition |
| Detail "more actions" | Split / Report / Share | **Action sheet** (Share via system share sheet; Report = destructive role) | **Bottom sheet** of actions (Share via Android share intent) | Same actions, native chooser |
| Detail dismiss | Back to list | Top-left chevron **+** edge-swipe-back | System **predictive-back** gesture/button + up affordance | Never rely on an iOS chevron alone on Android |
| Date in "filter" | Pick a date range | Native compact `DatePicker` / wheel | M3 **date-range picker** (calendar) | Always native picker; metaphors differ |
| Motion emphasis on new txn | Subtle arrive animation | Gentle spring, scale-in | Expressive **springy overshoot** | Same intent; Expressive is intentionally bouncier |
| Empty state | Branded "No transactions yet" art + CTA | Same illustration, HIG button | Same illustration, M3 filled button | Bespoke brand moment — fully unified |
| Loading | Skeleton rows | Skeleton + system spinner on refresh | Skeleton + M3 progress | Strategy unified, renderer native |

---

## C. State matrix (both platforms must satisfy)

| State | Unified? | Notes |
|---|---|---|
| Loading | Strategy unified (skeleton) | Native indicators differ |
| Content | Unified | Row content identical |
| Empty | **Unified** | Same branded illustration + CTA |
| Error | Strategy unified | iOS alert vs M3 dialog/snackbar — diverge form |
| Offline | Unified message | "You're offline — showing last synced data" banner, native styling |
| Permission denied (notifications) | **Diverge** | OS-owned permission dialogs; never custom |
| Syncing | Unified | Inline sync indicator, native spinner |

---

## D. RN / Flutter mapping for this screen

- **Shared:** brand theme tokens, the row content component, the empty-state illustration, the
  grouping logic, copy.
- **Adaptive:** Switch/date controls (`Switch.adaptive` / `@react-native-community/datetimepicker`),
  refresh control, share sheet.
- **Branched:** the tab scaffold (Cupertino tab vs Material `NavigationBar`; or React Navigation
  per-platform styling), the primary action (bar button vs FAB — `Platform.OS`/`defaultTargetPlatform`),
  and the detail page transition (`CupertinoPageRoute`/native-stack push vs Material
  container-transform).

---

## E. RN implementation-readiness addendum

- **RN target:** Expo prebuild with React Navigation native-stack; EAS Build and EAS Update in
  scope.
- **Native dependencies:** notifications, secure storage, haptics, share sheet, and biometric
  auth for sensitive transaction actions.
- **Platform branches:** tab scaffold styling, primary action placement, row affordance, action
  sheet/bottom sheet, date picker, and transition behavior.
- **Performance risks:** long transaction lists, grouped sections, refresh/sync indicators, and
  detail transition animation. Release-build testing required; debug FPS is not accepted.
- **Release gates:** device smoke test on one iPhone and one Android phone, permission wording
  review, offline/stale-data test, screen-reader pass, and EAS channel plan before store build.

---

## F. Sign-off

The spec passes only when the **iOS** column would independently pass the `ios-ui-ux-design` gate
(SwiftUI-native, 44 pt targets, Dynamic Type, VoiceOver, swipe-back) **and** the **Android** column
would independently pass the `android-ui-ux-design` gate (Material 3, 48 dp targets, TalkBack,
predictive back, edge-to-edge), while a side-by-side screenshot review confirms the **brand reads
identically**. Both platforms also clear the `doctrine/references/wcag-2.2-criteria.md` floor
(contrast, 24px minimum target, visible focus). If either side feels like a port of the other, the
parity is wrong — re-diverge the offending row.
