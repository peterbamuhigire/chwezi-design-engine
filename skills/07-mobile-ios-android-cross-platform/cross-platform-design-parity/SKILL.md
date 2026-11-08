---
name: cross-platform-design-parity
description: Use when one product must ship as idiomatic iOS and Android and needs explicit unify/diverge decisions for brand, IA, flows, navigation, controls, motion, gestures, and system chrome. Do not use to perfect only one platform; route that work to the iOS or Android skill.
metadata:
  portable: true
  category: 07-mobile-ios-android-cross-platform
  compatible_with:
  - claude-code
  - codex
---

# Cross-Platform Design Parity
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- One product must ship on iOS **and** Android and you must decide, per element, what stays identical and what becomes platform-native.
- You are writing a single design/handoff spec that two platform teams (or one RN/Flutter team) will both build from.
- A design was authored on one platform (usually iOS in Figma) and needs an honest Android translation — not a pixel copy.
- You are using React Native or Flutter and must decide where to use one shared UI versus where to branch per platform.
- A React Native or Expo handoff needs an implementation-readiness check for navigation, state,
  permissions, offline/sync, list performance, native APIs, and release gates.
- A stakeholder asks "shouldn't it just look the same on both?" and you need a defensible answer.

## Do Not Use When

- The work targets only one platform with no parity requirement — use `ios-ui-ux-design` or `android-ui-ux-design` directly.
- The task is platform-specific implementation detail (SwiftUI layout, Compose state) with no parity decision — use the single-platform skill's references.
- It is purely backend/API work with no shared UI surface.

## Required Inputs

| Input | Source | Evidence |
|---|---|---|
| Shared product model, brand, content, and critical flows | Product/design system | Approved invariants and representative screens/states |
| Platform support and implementation stack | iOS/Android engineering | OS/API ranges, native/RN/Flutter constraints, component inventory |
| Platform conventions and accessibility requirements | Current official guidance and policy | Verified navigation, controls, gestures, targets, and fallback needs |

- The screens/flows in scope, the single source-of-truth design (Figma, screenshots, or a token set), and which platform it was authored on.
- The brand system: typeface(s), colour tokens, logo, voice — the things that MUST stay constant across platforms.
- The build target: native Swift+Kotlin, React Native, or Flutter (this changes the mapping, not the parity decisions).
- For React Native/Expo: Expo managed vs prebuild vs bare RN, minimum RN/Expo version if known,
  native dependencies, permission surfaces, offline/sync expectations, and EAS Build/Update scope.
- Target device classes (compact phone, large phone, tablet/foldable), Apple resizable windows/Mac-designed-for-iPhone behavior when relevant, and minimum OS versions (these gate Liquid Glass / Material 3 Expressive availability).

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Phone visitors come for different jobs than desktop visitors (call, WhatsApp, directions, pay, check prices) | Draw a mobile job map and reorder the mobile hierarchy around those jobs within one responsive build | Desktop content crammed onto phones buries the main mobile task |
| Difference expresses brand/content/business meaning | Unify through shared semantic tokens/content | Unnecessary divergence fractures product identity |
| Difference is a learned platform convention | Diverge idiomatically and document rationale | Pixel cloning feels foreign and harms usability |
| Shared framework lacks safe native behaviour | Platform branch behind one semantic contract | Lowest-common-denominator UI is native to neither platform |
| Version-specific feature lacks required fallback | Gate by version and specify fallback | Unsupported devices receive broken or inconsistent behaviour |

## Capability Contract

- Must inspect both platform contracts/builds and current guidance; review is read-only unless parity remediation is requested.
- May edit shared/in-scope platform UI, but may not change minimum OS/API support, permissions, or release configuration without authority.

## Degraded Mode

- If either platform, support range, or shared product invariant is unavailable, stop parity sign-off and mark that side pending.
- Without runnable builds, produce a side-by-side specification marked unverified. Recover divergence defects by identifying the semantic invariant, correcting the platform resolution, and rerunning both native gates.

## The Parity Principle (state this before specifying anything)

**Unify meaning; diverge mechanism.** A user on either platform should recognise the same brand, the same content, the same information architecture, and complete the same task in the same number of steps. *How* they touch it — the navigation container, the control widgets, the transitions, the gestures, the system chrome — must be **native to their platform**. A design that is pixel-identical on both platforms is a slop signal: it means the author defaulted to one platform's idioms and forced the other to wear them. See `doctrine/design-doctrine.md` §0 — the moat is looking authored, and an idiomatically-correct port is the authored choice.

| Layer | Default | Why |
|---|---|---|
| Brand: logo, colour, type, illustration, photography, voice | **Unify** | This is identity. Divergence here reads as two different apps. |
| Content & data model | **Unify** | Same product, same truth. |
| Information architecture & task flows | **Unify** | Same mental model; same step count. |
| Navigation container (tab bar vs nav rail, back model) | **Diverge** | Each OS has a learned home for these. |
| Standard controls (pickers, switches, sheets, menus, dates) | **Diverge** | Use the OS-native control; users trust the muscle memory. |
| Motion & transitions | **Diverge** | iOS push/sheet physics ≠ Material container-transform. |
| Gestures & system chrome (back, status/nav bars, safe areas) | **Diverge** | OS-owned; fighting them breaks the platform contract. |
| Bespoke brand moments (hero, onboarding, empty-state art) | **Unify** | This is where you spend your distinctiveness budget on both. |

See `references/ios-vs-android-idioms.md` for the element-by-element divergence table, and `references/rn-flutter-mapping.md` for how each row resolves in React Native and Flutter.

## Workflow

1. **Name the source of truth and the brand constants.** State the typeface(s) and palette intent against the anti-slop charter — see `doctrine/design-doctrine.md` and `doctrine/references/ai-slop-banned-fonts.md` — *once*, because brand is the unified layer and must read identically on both platforms. Note the platform-font caveat: SF Pro on iOS and Roboto on Android are allowed *as system UI text*; a branded display face still comes from `doctrine/references/font-groups-and-usage.md`.
2. **Classify every element** in scope into Unify or Diverge using the table above and `references/ios-vs-android-idioms.md`. Produce this as an explicit list — never leave it implicit.
3. **For each Diverge element, name both native resolutions** (the iOS HIG component and the Android Material 3 component) and the version gate (for example, current Apple SDK Liquid Glass/current SF Symbols (iOS 27 generation) availability and Material 3 Expressive token availability).
4. **Map to the build technology** using `references/rn-flutter-mapping.md`: decide per element whether to use a shared component, a platform-adaptive component (`Platform.select` / Flutter `.adaptive` / `Theme.of(context).platform`), or two distinct implementations.
5. **If the build target is React Native or Expo, run the RN implementation-readiness check**
   (`references/react-native-implementation-readiness.md`). Record navigation shell, platform
   branches, state model, native APIs, permission states, list performance, keyboard behavior,
   responsive layout, and build/release gates.
6. **Model every shared state** on both platforms: loading, content, empty, error, offline, permission-denied, syncing — confirm each diverges only where the platform demands (e.g. permission dialogs are OS-owned).
7. **Apply both single-platform quality gates.** Run the screen through `ios-ui-ux-design` and `android-ui-ux-design` checks; the parity spec passes only when each platform's native build would independently pass its own gate.
8. **Write the parity spec** as a side-by-side sheet (see `examples/parity-spec-one-screen.md`). One row per element: Unified value, iOS resolution, Android resolution, rationale.

## Anti-Patterns

- **Pixel-identical cloning** — shipping iOS's design on Android (bottom tab bar copied as a non-native widget, iOS back-chevron with no Android system back, sheets that ignore Material). This is the #1 cross-platform failure.
- **Lowest-common-denominator flattening** — using only the components both platforms share, so the app feels generic and native to neither.
- **Diverging the brand** — letting the two platforms drift into different colours, type, or voice "because the OS does it that way." Brand is the unified layer.
- **Unstated divergence** — diverging without writing down *why*, so the next designer "fixes" it back to identical.
- **Forgetting version gates** — speccing Liquid Glass or Material 3 Expressive without checking the minimum OS / token availability, leaving older devices with a broken fallback.
- **Ignoring Apple windowing/resizability** - treating iPhone, iPad, and Mac-designed-for-iPhone as one fixed phone canvas instead of testing compact/regular width, pointer, keyboard, and safe-area changes.
- **RN/Flutter "write once" complacency** — assuming the framework makes it native automatically. It does not; adaptive components and per-platform branches are deliberate choices.
- **RN handoff without implementation states** - approving camera, map, chat, feed, auth, or media
  screens without permission, offline, upload, retry, release-build performance, and EAS/build
  implications.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Unify/diverge parity specification | Product, design, iOS/Android engineering | Shared invariant, each platform resolution, rationale, version gate, and fallback are explicit |
| Cross-platform gate | QA and accessibility | Both native quality gates and shared critical flows/states pass independently |

- A parity spec: the Unify/Diverge classification, a side-by-side element sheet (unified value · iOS resolution · Android resolution · rationale), the RN/Flutter mapping, the state matrix, version-gate notes, and an RN implementation-readiness addendum when React Native/Expo is the build target.

## Examples

- `examples/parity-spec-one-screen.md` — the SAME screen (a transactions list + detail in a fintech app) specced for iOS and Android side by side: what stays, what diverges, and why, down to the control level.

## References
- [chwezi-product-excellence-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md) (binding for Chwezi apps on Compose Multiplatform and existing web stacks: interaction parity, not pixel identity).
- Mobile job map (from McNeil (2013) *The Web Designer's Idea Book, Volume 3*, HOW Books): list what phone visitors come to do and let that, not the desktop sitemap, set mobile order; prefer responsive with task-reordered content over separate mobile sites.

- `doctrine/design-doctrine.md` — the always-load anti-slop charter; §0 (looking human-made/authored) is the basis for "idiomatic port, not clone."
- `doctrine/references/ai-slop-banned-fonts.md`, `doctrine/references/font-groups-and-usage.md`, and `doctrine/references/type-scale-and-spacing.md` for the unified brand type system and the SF Pro / Roboto system-font caveat.
- `doctrine/references/wcag-2.2-criteria.md` — accessibility floor both platforms must clear (target size, contrast, focus); note iOS minimum touch target is 44 pt and Android 48 dp.
- `references/ios-vs-android-idioms.md` — element-by-element comparison: navigation, controls, typography, motion, gestures, system chrome (HIG / Liquid Glass / current SF Symbols (iOS 27 generation) vs Material 3 Expressive).
- `references/rn-flutter-mapping.md` — how each design element maps to React Native and Flutter components, and when to go shared vs platform-adaptive vs branched.
- `references/react-native-implementation-readiness.md` - RN/Expo handoff gates for navigation,
  state, permissions, native APIs, offline/sync, list performance, responsive layout, and
  build/release constraints.
- Pair with `ios-ui-ux-design` and `android-ui-ux-design` (same group) — this skill decides the split; those two skills perfect each native side.
- Use `../../../docs/kaizen/phase-1-task-mobile-accessibility-evidence-pack.md` to retain
  task, viewport, state, touch, keyboard, and accessibility evidence for the parity handoff.
<!-- dual-compat-end -->
