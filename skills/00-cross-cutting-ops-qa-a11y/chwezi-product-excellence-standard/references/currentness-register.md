# Currentness register

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Use this register when you cite a platform or standards fact in work governed by the Chwezi Product
Excellence Standard, and when you run the periodic currentness review. Every other reference in
this skill cites facts by the IDs below. A fact that is not here, or is marked NOT_ASSESSED, must
not be stated as fact; it may appear only as a Chwezi rule with a review prompt.

## How to read and maintain it

- **Accessed:** all rows were read on 2026-11-07 unless the row says otherwise. Method: claim-level
  support on the primary page (not URL liveness), using free public pages only. Inaccessibility is
  never converted into confirmation.
- **Status:** `VERIFIED` means the value was read on the primary page and matches. `NOT_ASSESSED`
  means the page could not be read or does not state the value. "Corrects source" marks a value
  that differs from the wording in the original design bible; the corrected value is the one given.
- **Review by**, by freshness class: volatile library versions and pre-releases 2026-12-07;
  platform behaviour, store policy and guidelines 2027-02-07; standards (WCAG, ISO 4217, CLDR, web
  specs) 2027-05-07.
- **Review protocol:** on or before the review-by date, re-read the source, update the value and
  date, then search this skill for the ID and update every rule that cites it. If the page cannot
  be read, change the status to NOT_ASSESSED; do not carry a VERIFIED status forward.
- Pages that returned no readable body to an automated request on 2026-11-07: every
  `m3.material.io` page tried, `m2.material.io` bidirectionality, and the HTML Apple Human Interface
  Guidelines pages. Apple guidance was read through Apple's JSON data endpoint for the same page
  (`developer.apple.com/tutorials/data/design/human-interface-guidelines/<page>.json`).

## Note on the design engine's source register

`governance/standards-source-register.md` row DGN-010 recorded Compose Material 3 1.5.0-beta02
(21 October 2026) with no release candidate. On 2026-11-07 the release notes listed 1.5.0-rc01
(4 November 2026), with 1.4.0 still the stable line (row M11); DGN-010 was updated to that on
2026-11-08, and row DGN-014 points to this register. Rows DGN-001, DGN-009, DGN-011 and DGN-013 agree with A1, I9, W1 and A2 below.

## Accessibility: WCAG

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| A1 | WCAG 2.2 is the current W3C Recommendation: published 5 Oct 2023, updated 12 Dec 2024; approved as ISO/IEC 40500:2025 | https://www.w3.org/WAI/standards-guidelines/wcag/ ; https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A2 | WCAG 3.0 is a Working Draft (10 Sep 2026), not for conformance, no timeline | https://www.w3.org/TR/wcag-3.0/ | 2026-11-07 | VERIFIED | 2027-02-07 |
| A3 | 1.4.3 Contrast (Minimum), AA: text 4.5:1; large text 3:1 | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A4 | 1.4.11 Non-text Contrast, AA: UI components and graphics 3:1 | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A5 | 2.5.8 Target Size (Minimum), AA: 24 x 24 CSS px, with spacing, equivalent, inline, user-agent and essential exceptions | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | 2026-11-07 | VERIFIED | 2027-05-07 |
| A6 | 2.5.5 Target Size (Enhanced), AAA: 44 x 44 CSS px, no spacing exception | https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html | 2026-11-07 | VERIFIED | 2027-05-07 |
| A7 | 2.4.11 Focus Not Obscured (Minimum), AA; 2.4.12 Enhanced is AAA | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A8 | 2.5.7 Dragging Movements, AA, new in 2.2 | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A9 | 3.2.6 Consistent Help, A, new in 2.2 | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A10 | 3.3.7 Redundant Entry, A, new in 2.2 | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A11 | 3.3.8 Accessible Authentication (Minimum), AA; 3.3.9 Enhanced is AAA | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED | 2027-05-07 |
| A12 | Reduced motion: 2.3.3 Animation from Interactions is AAA, not AA. Chwezi makes it a house MUST | https://www.w3.org/TR/WCAG22/ | 2026-11-07 | VERIFIED; corrects source | 2027-05-07 |
| W5 | Levels of other cited criteria: 1.1.1 A; 1.3.1 A; 1.3.4 Orientation AA; 1.3.5 Identify Input Purpose AA; 1.4.1 A; 1.4.4 AA; 1.4.10 Reflow AA; 1.4.12 Text Spacing AA; 1.4.13 AA; 2.1.1 A; 2.2.1 Timing Adjustable A; 2.2.2 A; 2.3.1 A; 2.4.3 A; 2.4.6 AA; 2.4.7 AA; 2.5.3 Label in Name A; 3.1.1 A; 3.1.2 AA; 3.3.1 A; 3.3.2 A; 3.3.3 AA; 3.3.4 AA; 4.1.2 A; 4.1.3 Status Messages AA | https://www.w3.org/TR/WCAG22/ (REC-WCAG22-20241212) | 2026-11-07 | VERIFIED | 2027-05-07 |

## Android and Material

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| M1 | Touch targets at least 48 x 48 dp; Compose Material components enforce the minimum | https://developer.android.com/guide/topics/ui/accessibility/apps | 2026-11-07 | VERIFIED | 2027-02-07 |
| M2 | Android text contrast: under 18 sp (or bold under 14 sp) 4.5:1; other text 3:1 | https://developer.android.com/guide/topics/ui/accessibility/apps | 2026-11-07 | VERIFIED | 2027-02-07 |
| M3 | Width window size classes: compact < 600 dp; medium 600-839; expanded 840-1199; large 1200-1599; extra-large >= 1600. Large and extra-large need `currentWindowAdaptiveInfo(supportLargeAndXLargeWidth = true)` | https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes | 2026-11-07 | VERIFIED; corrects source (source stopped at >= 1200) | 2027-02-07 |
| M4 | Height classes: compact < 480 dp; medium 480-899; expanded >= 900 | as M3 | 2026-11-07 | VERIFIED | 2027-02-07 |
| M5 | Material 3 site's own window size class page | https://m3.material.io/foundations/layout/applying-layout/window-size-classes | 2026-11-07 | NOT_ASSESSED (unreadable); rely on M3 | 2026-12-07 |
| M6 | Edge-to-edge enforced on Android 15+ at targetSdk >= 35; at targetSdk 36 on Android 16+, `windowOptOutEdgeToEdgeEnforcement` is deprecated and disabled (no opt-out) | https://developer.android.com/develop/ui/views/layout/edge-to-edge ; https://developer.android.com/about/versions/16/behavior-changes-16 | 2026-11-07 | VERIFIED; corrects source | 2027-02-07 |
| M7 | Google Play: from 31 Aug 2026 new apps and updates must target API 36 (phone and tablet); extension possible to 1 Nov 2026; existing apps need API 35+ to stay available to new users on newer OS | https://developer.android.com/google/play/requirements/target-sdk | 2026-11-07 | VERIFIED | 2027-02-07 |
| M8 | Predictive back at targetSdk 36 on Android 16+: system animations on by default; `onBackPressed` not called; `KEYCODE_BACK` not dispatched; temporary opt-out `android:enableOnBackInvokedCallback="false"`; Compose `BackHandler` / `PredictiveBackHandler` (activity-compose 1.8.0+) | https://developer.android.com/about/versions/16/behavior-changes-16 ; https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture | 2026-11-07 | VERIFIED | 2027-02-07 |
| M9 | targetSdk 36: orientation, resizability and aspect-ratio restrictions ignored where smallest width >= 600 dp (games excepted); opt-out `PROPERTY_COMPAT_ALLOW_RESTRICTED_RESIZABILITY` ends at API 37 | https://developer.android.com/about/versions/16/behavior-changes-16 | 2026-11-07 | VERIFIED | 2027-02-07 |
| M10 | `elegantTextHeight` deprecated and ignored at targetSdk 36; re-check Arabic and other tall scripts | https://developer.android.com/about/versions/16/behavior-changes-16 | 2026-11-07 | VERIFIED | 2027-02-07 |
| M11 | Compose Material 3: stable 1.4.0; pre-release 1.5.0-rc01 (4 Nov 2026). Expressive APIs (MotionScheme, expressive theme, buttons, menus, FAB menu, FloatingToolbar, list items) left experimental during 1.5.0 alphas; MaterialShapes and LoadingIndicator remain experimental. Material Expressive design guidance itself unreadable | https://developer.android.com/jetpack/androidx/releases/compose-material3 | 2026-11-07 | VERIFIED (library); NOT_ASSESSED (design guidance). Supersedes DGN-010 | 2026-12-07 |
| M12 | Dynamic colour since Android 12; brand colours can be kept and harmonised | https://developer.android.com/develop/ui/views/theming/dynamic-colors | 2026-11-07 | VERIFIED | 2027-02-07 |
| M13 | Android 14+ font scaling to 200%, non-linear; use sp for text and line height, not for padding; do not compute from `fontScale` | https://developer.android.com/about/versions/14/features#non-linear-font-scaling | 2026-11-07 | VERIFIED | 2027-02-07 |
| M14 | Material motion duration tokens: short 50/100/150/200 ms; medium 250/300/350/400; long 450/500/550/600; extra-long 700/800/900/1000; standard easing (0.2, 0, 0, 1) and emphasised variants | https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MotionTokens.kt (token file v0_103) | 2026-11-07 | VERIFIED from token source; m3 motion page NOT_ASSESSED | 2026-12-07 |

## Android performance

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| P1 | Core vitals: user-perceived crash rate 1.09% overall, 8% per phone model; user-perceived ANR rate 0.47% overall, 8% per model; excessive partial wake locks 5%; memory and bitmap memory per RAM tier. Play uses the last 28 days | https://developer.android.com/topic/performance/vitals ; https://support.google.com/googleplay/android-developer/answer/9844486 | 2026-11-07 | VERIFIED; corrects source (frames and startup are not core vitals) | 2027-02-07 |
| P2 | Memory vitals may affect store visibility from February 2027. Example: 4 GB tier foreground 2.00 GB; bitmap 200 MB (perceived services or background), 400 MB (cached) | https://developer.android.com/topic/performance/vitals | 2026-11-07 | VERIFIED | 2027-02-07 |
| P3 | Slow frame > 16 ms; frozen > 700 ms; excessive = > 50% slow frames or > 0.1% frozen frames per session; no published bad-behaviour threshold | https://developer.android.com/google/play/vitals/render | 2026-11-07 | VERIFIED | 2027-02-07 |
| P4 | Frame budget 16 ms at 60 fps, 11 ms at 90, 8 ms at 120; ANR after 5 s unresponsive | https://developer.android.com/topic/performance/vitals/render | 2026-11-07 | VERIFIED | 2027-02-07 |
| P5 | Excessive startup (TTID): cold >= 5 s; warm >= 2 s; hot >= 1.5 s on the vitals page but "1 second or more" on the Play Console help page | https://developer.android.com/google/play/vitals/launch-time ; https://support.google.com/googleplay/android-developer/answer/9844486 | 2026-11-07 | VERIFIED (cold, warm); hot-start figure conflicts between sources | 2027-02-07 |
| P6 | TTID = first frame; TTFD = fully usable, signalled by `reportFullyDrawn` or Compose `ReportDrawn`, `ReportDrawnWhen`, `ReportDrawnAfter` | https://developer.android.com/topic/performance/vitals/launch-time | 2026-11-07 | VERIFIED | 2027-02-07 |
| P7 | Baseline Profiles: about 30% faster code execution from first launch; AGP 8.0+, `benchmark-macro-junit4` 1.5.0, `profileinstaller` 1.4.1; binary profile < 1.5 MB; Startup Profiles add DEX layout gains; non-Play installs may not apply profiles at install time | https://developer.android.com/topic/performance/baselineprofiles/overview | 2026-11-07 | VERIFIED | 2026-12-07 |
| P8 | JankStats `androidx.metrics:metrics-performance` 1.0.0; jank = frame over 2x refresh interval by default | https://developer.android.com/topic/performance/jankstats | 2026-11-07 | VERIFIED | 2026-12-07 |
| P9 | Slow sessions metric applies to games only | https://developer.android.com/google/play/vitals/slow-session | 2026-11-07 | VERIFIED (not applicable to Chwezi business apps) | 2027-02-07 |

## Apple Human Interface Guidelines

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| I1 | iOS and iPadOS default control size 44 x 44 pt, minimum 28 x 28 pt | https://developer.apple.com/design/human-interface-guidelines/accessibility | 2026-11-07 (via JSON endpoint) | VERIFIED | 2027-02-07 |
| I2 | Accessibility Inspector uses WCAG AA contrast: up to 17 pt 4.5:1; 18 pt and bold 3:1 | as I1 | 2026-11-07 | VERIFIED | 2027-02-07 |
| I3 | Let people enlarge text by at least 200%; iOS default 17 pt, minimum 11 pt | as I1 | 2026-11-07 | VERIFIED | 2027-02-07 |
| I4 | Dynamic Type sizes xSmall to xxxLarge plus AX1-AX5; Body at Large 17 pt; stack layouts at accessibility sizes | https://developer.apple.com/design/human-interface-guidelines/typography | 2026-11-07 | VERIFIED | 2027-02-07 |
| I5 | Reduce Motion: reduce automatic and repetitive animation; replace x/y/z transitions with fades; avoid animating blurs | as I1 | 2026-11-07 | VERIFIED | 2027-02-07 |
| I6 | Concrete rules for Reduce Transparency | https://developer.apple.com/design/human-interface-guidelines/materials | 2026-11-07 | NOT_ASSESSED (only the adaptation is stated) | 2026-12-07 |
| I7 | Apple's translucent control layer floats above content; not for the content layer; use sparingly on custom controls | as I6 | 2026-11-07 | VERIFIED; the OS version label is NOT_ASSESSED | 2027-02-07 |
| I8 | Motion: purposeful, optional, cancellable; no numeric durations given | https://developer.apple.com/design/human-interface-guidelines/motion | 2026-11-07 | VERIFIED | 2027-02-07 |
| I9 | HIG updates after 24 Sep 2026: 13 Oct and 28 Oct 2026 entries | https://developer.apple.com/design/whats-new/ | 2026-10-31 (DGN-009, not re-read) | VERIFIED as of 2026-10-31 | 2027-01-27 |

## Compose Multiplatform and KMP

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| K1 | CMP Stable on Android, iOS and desktop (JVM); Web (Kotlin/Wasm) Beta | https://kotlinlang.org/docs/multiplatform/supported-platforms.html (page modified 10 Sep 2025) | 2026-11-07 | VERIFIED; page is old, re-check each cycle | 2026-12-07 |
| K2 | CMP latest stable 1.12.2 (15 Oct 2026); pre-release 1.13.0-beta02 | https://github.com/JetBrains/compose-multiplatform/releases ; https://kotlinlang.org/docs/multiplatform/whats-new-compose-112.html | 2026-11-07 | VERIFIED | 2026-12-07 |
| K3 | Compose for Web is Beta; 1.12.2 downloads font subsets on demand (missing glyphs may show briefly) | as K1, K2 | 2026-11-07 | VERIFIED | 2026-12-07 |
| K4 | KMP structure: `commonMain` plus platform source sets; iOS needs `iosArm64` and `iosSimulatorArm64`. With AGP 9+, put the Android entry point in a separate `androidApp` module and use `com.android.kotlin.multiplatform.library` in the shared module | https://kotlinlang.org/docs/multiplatform/multiplatform-discover-project.html ; https://kotlinlang.org/docs/multiplatform/multiplatform-project-agp-9-migration.html | 2026-11-07 | VERIFIED; corrects source | 2026-12-07 |
| K5 | CMP iOS accessibility: semantics map to VoiceOver; test tags to accessibility identifiers; Full Keyboard Access supported; high contrast manual. Dynamic Type mapping and Reduce Motion not documented | https://kotlinlang.org/docs/multiplatform/compose-ios-accessibility.html | 2026-11-07 | VERIFIED; Dynamic Type and Reduce Motion NOT_ASSESSED (device-test) | 2026-12-07 |

## Web performance

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| W1 | Core Web Vitals "good": LCP <= 2.5 s; INP <= 200 ms; CLS <= 0.1 | https://web.dev/articles/vitals | 2026-11-07 | VERIFIED | 2027-02-07 |
| W2 | "Poor": LCP > 4.0 s; INP > 500 ms; CLS > 0.25 | https://web.dev/articles/lcp ; https://web.dev/articles/inp ; https://web.dev/articles/cls | 2026-11-07 | VERIFIED | 2027-02-07 |
| W3 | Assess at the 75th percentile, segmented by mobile and desktop | https://web.dev/articles/vitals | 2026-11-07 | VERIFIED | 2027-02-07 |
| W4 | Date INP replaced FID | https://web.dev/articles/inp | 2026-11-07 | NOT_ASSESSED: do not state a date | 2027-02-07 |

## Currency and number formatting

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| C1 | ISO 4217 minor units: UGX 0; RWF 0; KES 2; TZS 2; USD 2 (List One published 17 Sep 2026) | https://www.six-group.com/dam/download/financial-information/data-center/iso-currrency/lists/list-one.xml | 2026-11-07 | VERIFIED; UGX has 0 minor units in ISO 4217 itself | 2027-05-07 |
| C2 | CLDR fraction digits: UGX 0; RWF 0; TZS 2 with cash digits 0; KES and USD default 2 | https://github.com/unicode-org/cldr/blob/main/common/supplemental/supplementalData.xml | 2026-11-07 (main branch) | VERIFIED; tie to a CLDR release before shipping | 2027-05-07 |
| C3 | CLDR UGX symbol `USh` in en_UG and sw_UG; currency pattern and separators inherited, not checked | https://github.com/unicode-org/cldr/blob/main/common/main/en_UG.xml | 2026-11-07 | VERIFIED (symbol); NOT_ASSESSED (pattern) | 2027-05-07 |
| C4 | Locale formatting may use non-ASCII digits; use `Locale.US` for machine strings | https://developer.android.com/training/basics/supporting-devices/languages | 2026-11-07 | VERIFIED | 2027-02-07 |

## RTL, localisation and motion preferences

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| R1 | Android RTL: `supportsRtl`, start/end, `autoMirrored`, `BidiFormatter.unicodeWrap()`, test with Force RTL | https://developer.android.com/training/basics/supporting-devices/languages | 2026-11-07 | VERIFIED | 2027-02-07 |
| R2 | Mirror: progress indicators, sliders, navigation (back points right), reading-direction icons, forward and backward icons, progress numeral order | https://developer.apple.com/design/human-interface-guidelines/right-to-left | 2026-11-07 | VERIFIED | 2027-02-07 |
| R3 | Do not mirror: digits within a number, clocks, logos, checkmarks and universal marks, physical-direction controls, real objects, photos | as R2 | 2026-11-07 | VERIFIED | 2027-02-07 |
| R4 | Media controls and chart time axes do not mirror | https://m3.material.io/foundations/layout/understanding-layout/bidirectionality-rtl | 2026-11-07 | NOT_ASSESSED: Chwezi SHOULD with native-reader review | 2026-12-07 |
| R5 | Web bidi: `dir` and `lang` on `<html>`; no CSS base direction; `dir="auto"` for user content; `<bdi>`; logical properties | https://www.w3.org/International/questions/qa-html-dir | 2026-11-07 | VERIFIED | 2027-05-07 |
| L1 | CLDR locale coverage and plural/number data for Luganda (lg), Kinyarwanda (rw), regional Swahili | https://github.com/unicode-org/cldr | not read | NOT_ASSESSED | 2026-12-07 |
| X1 | `prefers-reduced-motion` values `no-preference` / `reduce`; Baseline widely available; maps to Android "Remove animations" and iOS Reduce Motion | https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion | 2026-11-07 | VERIFIED | 2027-05-07 |

## Security and privacy platform facts

| ID | Claim and verified value | Source URL | Accessed | Status | Review by |
|---|---|---|---|---|---|
| S1 | Android `FLAG_SECURE` blocks screenshots and display on non-secure displays (for example casting); background screenshots come out blank; not fully reliable on Android 11 (API 30) and lower; `HIDE_OVERLAY_WINDOWS` (Android 12+) blocks third-party overlays | https://developer.android.com/security/fraud-prevention/activities | 2026-11-07 | VERIFIED | 2027-02-07 |
| S2 | iOS mechanisms for hiding the app-switcher snapshot and detecting screen capture | Apple developer documentation (not read) | not read | NOT_ASSESSED | 2026-12-07 |

## Known gaps to research next

Not yet in the register, so not stated as fact anywhere in this skill: Android 13+ notification
permission timing; the 16 KB memory page-size requirement for apps with native code; SMS segment
limits; thermal printer column widths; Bank of Uganda denominations for quick-tender buttons;
fiscal e-invoicing requirements (for example URA EFRIS); Uganda, Kenya and Rwanda data-protection
law requirements; Apple App Store accessibility declarations.
