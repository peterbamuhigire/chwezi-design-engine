---
name: ios-ui-ux-design
description: Use when an iPhone, iPad, SwiftUI, or UIKit screen needs native Apple navigation, controls, states, Dynamic Type, VoiceOver, and adaptive window behaviour. Do not use for Android conventions or cross-platform unify/diverge decisions; route those to Android design or parity.
metadata:
  portable: true
  category: 07-mobile-ios-android-cross-platform
  compatible_with:
  - claude-code
  - codex
---

# iOS UI/UX Design
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- Designing or reviewing iOS/iPadOS screens, SwiftUI/UIKit components, navigation, dashboards, forms, onboarding, widgets, controls, App Intents surfaces, or settings.
- The user asks for native iOS polish, premium UX, pleasantness, or App Store-quality experience.
- A business app must feel trustworthy, fast, accessible, and Apple-native.

## Do Not Use When

- The task is not iOS, iPadOS, or Apple-platform adjacent.
- The work is backend-only and has no user-facing iOS surface.

## Required Inputs

| Input | Source | Evidence |
|---|---|---|
| User task, navigation, roles, and screen states | Product and application contracts | Critical flow, routes, loading/error/offline/permission states |
| Supported Apple OS/device/window contexts | Engineering support policy | Deployment targets, iPhone/iPad/window classes, keyboard/pointer needs |
| Brand tokens and native implementation constraints | Design system and SwiftUI/UIKit repository | Approved type/colour/motion and existing components |

- Target screens, user task, device classes, brand/product context, backend constraints, and any existing screenshots or SwiftUI components.
- Confirm whether the deliverable is design guidance, implementation, review, QA, or documentation.

## Workflow

1. Load your platform's iOS development/implementation skill for code and build standards.
2. State the typography and visual-quality intent against the Chwezi anti-slop charter — see `doctrine/design-doctrine.md` and `doctrine/references/ai-slop-banned-fonts.md` — before styling.
3. Define the primary iOS task, top-level destinations, navigation hierarchy, and device classes.
4. Choose SwiftUI-native patterns before custom controls.
5. Model every screen state: loading, content, empty, error, offline, permission denied, and syncing.
6. Apply the current Apple platform material and feedback standards: **Liquid Glass** chrome, **current SF Symbols (iOS 27 generation)**, **Dynamic Type**, **haptics**, and system appearance/accessibility personalization per `references/hig-liquid-glass.md` and `references/ios-sensory-and-haptics.md`.
7. Apply the iOS mobile quality gate before implementation or review sign-off.

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Destinations are stable and peer-level | Native tab/sidebar pattern by size class | Web-like navigation weakens orientation and accessibility |
| Task is focused and temporary | Sheet with clear detent/dismissal and saved state | Full-screen takeover loses context without need |
| Dynamic Type reaches accessibility sizes | Reflow/stack and preserve complete labels | Fixed geometry clips critical actions and meaning |

## Capability Contract

- Must inspect product and SwiftUI/UIKit contracts and render/test representative Apple configurations; review is read-only unless implementation is requested.
- May edit/test in-scope UI. Do not change deployment targets, entitlements, production data, or release builds without authority.

## Degraded Mode

- If deployment targets, devices/windows, navigation, or states are missing, stop final specification and request them.
- Without simulator/device rendering, provide a size-class/state matrix marked unverified. Recover a failed state/configuration by preserving context, using native fallback, and retesting Dynamic Type, VoiceOver, keyboard/pointer, and navigation.

## iOS UX Standards

- Use SwiftUI, platform-native navigation stacks, tab bars, sheets, forms, lists, menus, and toolbars.
- Minimum touch target is 44 pt.
- Preserve swipe-back and native gesture expectations.
- Support Dynamic Type, VoiceOver, Reduce Motion, Increase Contrast, Dark Mode, and SF Symbols consistency.
- **Liquid Glass (current Apple SDK era):** apply the Liquid Glass material to the **chrome/navigation layer only** (tab bars, toolbars, nav bars, sheets, controls) — never to content; never glass-on-glass; build on standard SwiftUI/UIKit containers so it adapts and stays accessible. Verify under Reduce Transparency, Increase Contrast, Reduce Motion, Dark Mode, and appearance personalization. See `references/hig-liquid-glass.md`.
- **current SF Symbols (iOS 27 generation):** use system (or template-drawn custom) symbols, weight-matched to adjacent Dynamic Type styles; animate as feedback only.
- **Dynamic Type:** use semantic text styles (`body`, `headline`, …), never hardcoded sizes; layouts must survive the largest accessibility size (**AX5**) — stack at large sizes, never clip critical labels. A branded display face must scale relatively, not freeze.
- **Haptics:** map feedback to real, discrete events with correct semantics (`.success`/`.warning`/`.error` for outcomes — never `.success` on failure; `.selection` on change). UI stays fully usable with haptics disabled. See `references/ios-sensory-and-haptics.md`.
- Use sheets for focused tasks; avoid full-screen covers unless the workflow truly requires takeover.
- Avoid Android-style components, web-like navigation, and cramped desktop tables on phones.
- For iPad, use split views, sidebars, and multi-column layouts where they improve productivity.
- For iPhone resizability, iPad multitasking, and Mac-designed-for-iPhone windows, verify compact/regular width changes, pointer/keyboard paths, and no clipped chrome or content at intermediate sizes.

## Quality Standards

- iOS screens feel native to SwiftUI and Apple platform conventions.
- Navigation, state handling, touch targets, Dynamic Type, VoiceOver, iPad adaptations, iPhone resizability, and Mac-designed-for-iPhone windowing are verified where applicable.
- Premium UX gate categories must score at least 8/10 before sign-off.

## Anti-Patterns

- Squeezing web layouts into a phone UI.
- Copying Android component patterns into iOS.
- Ignoring VoiceOver, Dynamic Type, swipe-back, offline states, or sheet/navigation conventions.
- Applying glass to content or glass-on-glass. Correction: reserve adaptive material for native chrome and test accessibility settings.
- Hard-coding one iPhone canvas. Correction: test size classes, iPad multitasking, and intermediate windows.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| iOS UI/navigation/adaptive specification | Product and SwiftUI/UIKit engineering | Components, states, size classes, navigation, accessibility, and tokens are explicit |
| Apple-platform quality gate | QA and accessibility | Representative OS/device/window/input configurations pass critical and recovery paths |

- iOS UI brief, SwiftUI component guidance, navigation model, state matrix, accessibility notes, or review findings.

## References

- [chwezi-product-excellence-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md) (binding for every Chwezi iOS app: Dynamic Type to 200%, VoiceOver pass on core tasks and the 13 hard release gates).
- `doctrine/design-doctrine.md` — the always-load anti-slop charter governing typography, colour, and visual identity.
- `doctrine/references/ai-slop-banned-fonts.md` and `doctrine/references/type-scale-and-spacing.md` for type choices, scale, and spacing.
  - Mobile-platform font caveat: iOS's **San Francisco / SF Pro** is the Apple system face — a platform-native default, allowed (and correct) for native iOS UI; it is not a Chwezi-chosen primary and carries no slop penalty. A deliberate branded display face should still come from the approved font categories (`doctrine/references/font-groups-and-usage.md`) and avoid the banned list.
- `references/hig-liquid-glass.md` for **Liquid Glass**, **current SF Symbols (iOS 27 generation)**, Dynamic Type, app icon Liquid Glass variants, and Apple-platform appearance/accessibility personalization.
- `references/ios-sensory-and-haptics.md` for **haptics** / sensory feedback semantics (Core Haptics, SwiftUI `sensoryFeedback`) and the accessibility rules around them.
- `references/swiftui-design.md` for SwiftUI-native layout, navigation, forms, accessibility, and visual polish.
- `references/swiftui-pro-patterns.md` for advanced SwiftUI layout, identity, animation, and performance patterns.
- `references/ios-uikit-advanced.md` for UIKit diffable data sources, compositional layout, custom transitions, and UIKit interop.
- `doctrine/references/wcag-2.2-criteria.md` for the accessibility floor (contrast, target size, reduced motion) that all of the above must clear.

## Examples

- `examples/ios-screen-spec.md` — a worked iOS screen spec (a "Send Payment" confirm screen) applying Liquid Glass, SF Symbols, Dynamic Type, haptics, the full state matrix, and the WCAG 2.2 checklist end to end.
<!-- dual-compat-end -->
