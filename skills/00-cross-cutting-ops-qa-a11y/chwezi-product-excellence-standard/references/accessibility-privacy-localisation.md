# Accessibility, privacy and localisation

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Use this reference when you plan or review accessibility evidence, decide what a role may see on a
shared device, or prepare a product for its languages and for right-to-left (RTL) layout. Rule IDs
are in [rules-catalogue.md](rules-catalogue.md); facts cite
[currentness-register.md](currentness-register.md). WCAG detail and evidence classes live in the
design engine's [wcag-2.2-criteria.md](../../../../doctrine/references/wcag-2.2-criteria.md); this
file maps them to Chwezi rules and adds the native-app and shared-device layer.

## Task 1: map WCAG 2.2 AA to Chwezi rules

WCAG 2.2 (W3C Recommendation, updated 12 December 2024) is the conformance reference; WCAG 3.0 is a
Working Draft and never a conformance target (A1, A2). Level AA is the floor. Any applicable AA
failure on a core journey is a hard fail and blocks release (see
[scorecard-and-release-gate.md](scorecard-and-release-gate.md)).

The source document named only contrast, colour, names, focus order, text size, screen readers and
RTL. The rows marked **added** are criteria it omitted that Chwezi apps routinely fail.

| WCAG criterion (level) | What it means in a Chwezi app | Chwezi rule | How to test |
|---|---|---|---|
| 1.1.1 Non-text Content (A) | Icon-only controls and meaningful images have names; decorative images are hidden | PX-A11Y-001 | Scanner + screen-reader pass |
| 1.3.1 Info and Relationships (A) | Headings, lists, table headers and form labels are exposed, not just styled | PX-TYPE-006 | Accessibility tree review |
| 1.3.4 Orientation (AA) **added** | No orientation lock unless essential; also forced by Android targetSdk 36 on large screens (M9) | PX-LAYOUT-002 | Rotate every screen |
| 1.3.5 Identify Input Purpose (AA) **added** | Name, phone, email fields declare their purpose (`autocomplete`, content type) | PX-FORM-002 | Field register |
| 1.4.1 Use of Color (A) | Status never by colour alone | PX-COLOUR-002 | Greyscale screenshot |
| 1.4.3 Contrast Minimum (AA) | 4.5:1 text; 3:1 large text (A3) | PX-COLOUR-001 | Contrast table, both themes |
| 1.4.4 Resize Text (AA) | 200% text without loss | PX-TYPE-005 | 200% capture |
| 1.4.10 Reflow (AA) **added** | Web content works at 320 CSS px width without two-axis scroll (data tables excepted) | PX-LAYOUT-002 | 320 px capture |
| 1.4.11 Non-text Contrast (AA) | Field borders, focus rings, chart marks 3:1 (A4) | PX-COLOUR-001 | Contrast table |
| 1.4.12 Text Spacing (AA) **added** | No loss when users increase line, letter, word and paragraph spacing (web) | PX-TYPE-002 | Text-spacing bookmarklet or stylesheet |
| 1.4.13 Content on Hover or Focus (AA) **added** | Tooltips dismissible, hoverable, persistent | PX-A11Y-005 | Keyboard and pointer test |
| 2.1.1 Keyboard (A) | Everything works with an external keyboard | PX-A11Y-003 | Keyboard-only run |
| 2.2.1 Timing Adjustable (A) **added** | Session and idle timeouts warn and let users extend, unless a security exception is documented | PX-PRIV-009 | Timer test (Task 5) |
| 2.2.2 Pause, Stop, Hide (A) | Auto-moving content over 5 s can be paused | PX-MOTION-003 | Review |
| 2.3.1 Three Flashes (A) | Nothing flashes more than 3 times a second | PX-MOTION-003 | Review |
| 2.4.3 Focus Order (A) | Logical focus order, including after dialogs close | PX-A11Y-002 | Keyboard and screen-reader run |
| 2.4.6 Headings and Labels (AA) | Headings and labels describe their content | PX-TYPE-006, PX-FORM-001 | Review |
| 2.4.7 Focus Visible (AA) | A visible focus indicator on every focusable control | PX-A11Y-003 | Keyboard run |
| 2.4.11 Focus Not Obscured (AA) **added** | Sticky bars, sheets and the keyboard never hide the focused control entirely (A7) | PX-A11Y-007 | Keyboard run with sticky cart bar |
| 2.5.3 Label in Name (A) **added** | The accessible name contains the visible label, so voice control works | PX-A11Y-004 | Voice control spot test |
| 2.5.7 Dragging Movements (AA) **added** | Every drag (reorder, slider, swipe action) has a single-tap alternative (A8) | PX-A11Y-008 | Review |
| 2.5.8 Target Size Minimum (AA) **added** | Web pointer targets at least 24 x 24 CSS px or spaced (A5); native floors are higher (Task 2) | PX-GEOM-005 | Measurement |
| 3.1.1 / 3.1.2 Language of Page / Parts (A / AA) **added** | Page language set; inline text in another language marked, so screen readers switch voice | PX-L10N-002 | Markup or locale-span review |
| 3.2.6 Consistent Help (A) **added** | Help sits in the same place on every screen (A9) | PX-A11Y-011 | Review |
| 3.3.1 / 3.3.3 Error Identification / Suggestion (A / AA) | Errors named in text with a fix | PX-FORM-006 | Form test |
| 3.3.4 Error Prevention: Legal, Financial, Data (AA) **added** | Payments, voids and submissions are reversible, checked or confirmed | PX-INTERACT-008, PX-DESTRUCT-001 | Flow review |
| 3.3.7 Redundant Entry (A) **added** | Information already given in a process is prefilled or selectable (A10) | PX-A11Y-010 | Flow review |
| 3.3.8 Accessible Authentication Minimum (AA) **added** | No memory or transcription test without an alternative; paste allowed in password and OTP fields (A11) | PX-A11Y-009 | Login test |
| 4.1.2 Name, Role, Value (A) | Custom components expose role, name and state | PX-ARCH-006 | Accessibility tree |
| 4.1.3 Status Messages (AA) **added** | "Saved", "Queued", "Synced", scan results announced without moving focus | PX-A11Y-012 | Screen-reader log |

Beyond AA (Chwezi house rules, reported as such, never as AA): reduced motion (2.3.3 is AAA,
A12; PX-MOTION-002); 44 x 44 CSS px targets on touch-first web screens (2.5.5 is AAA, A6).

Evidence classes (HEURISTIC, MEASURED, NOT_ASSESSED) follow the design engine reference. A
conformance claim needs MEASURED evidence for every applicable criterion on the full process,
including all thirteen canonical screen states (PX-STATE-001) that apply. An automated scan alone is never a conformance claim.

## Task 2: meet target sizes on each platform

| Platform | Floor | Source | Chwezi rule |
|---|---|---|---|
| Android | 48 x 48 dp on the interactive region | M1 | MUST |
| iOS / iPadOS | 44 x 44 pt (Apple's absolute minimum is 28 pt; Chwezi keeps 44) | I1 | MUST |
| Web | 24 x 24 CSS px or the spacing exception (AA); 44 x 44 CSS px on touch-first screens | A5, A6 | MUST floor, SHOULD aim |
| Gloves, field, POS keypad | 56 dp, 8 dp apart | Chwezi | MUST where the profile names these contexts (PX-INTERACT-018) |

Measure the hit area, not the icon. Targets must not shrink in compact density.

## Task 3: pass with screen readers and keyboards

- Complete every primary task with TalkBack, VoiceOver and, on web or desktop, a desktop screen
  reader; log the run (PX-A11Y-002).
- Deliver a keyboard and focus map per screen; everything works with an external keyboard
  (PX-A11Y-003). On POS, hardware scanners that act as keyboards must not steal focus from a
  screen-reader user's position.
- Names read in one phrase: label, value, unit, state ("Total, 46,500 Uganda shillings, 3 items").
- Headings are real headings; tables expose headers.
- On iOS with CMP, semantics map to VoiceOver and Full Keyboard Access works (K5); test on a
  device, because CMP's Dynamic Type and Reduce Motion behaviour is not documented (K5).
- Accessibility lives in the shared components, never in a separate "accessible mode"
  (PX-A11Y-006).

## Task 4: scale text to 200% and beyond

- Android: test at 200% font scale (non-linear on Android 14+, M13).
- iOS: test at the largest Dynamic Type size you support and record it; Apple asks for at least
  200% enlargement (I3) and offers AX1-AX5 (I4). At accessibility sizes, stack side-by-side
  layouts.
- Web: 200% zoom (1.4.4), 320 CSS px reflow (1.4.10), text-spacing override (1.4.12).
- Pass condition: no primary action lost, no essential text clipped or truncated without an
  accessible full value (PX-TYPE-002, PX-TYPE-005). Loss of a primary action at 200% is a hard
  fail.

## Task 5: protect privacy on shared devices

### Role visibility and backend authorisation

- Permissions are enforced in the domain and the backend. Hiding or disabling a control is a
  convenience only (PX-PRIV-001). Test: call each restricted endpoint with a low-role token; the
  server denies it. A permission enforced only in the UI is a hard fail.
- Hide a control when the role can never perform the action; show it disabled with the reason
  when the block is temporary or requestable, and offer the request or approval path
  (PX-PRIV-006).
- Sensitive patient, employee and financial data appears only for roles that need it, masked by
  default where the full value is not needed, and never shown just because space exists
  (PX-PRIV-002). Keep a role-by-screen visibility matrix and test it.

### Masking defaults

| Data | Default display | Reveal |
|---|---|---|
| Customer phone on a POS payment | `+256 7•• ••• 412` | Not revealable at the counter |
| National ID, account and card numbers | Last 4 only | Authorised role, logged |
| Patient name on a shared ward screen | Initials and bed or record number | Tap by an authorised clinician, logged |
| Salary and payroll | Hidden | Payroll role only |
| PINs, passwords, OTPs | Never displayed after entry | Never |

### Idle lock (owner default, 2026-11-07; tenant-configurable; SHOULD)

| Context | Default idle lock |
|---|---|
| Shared POS terminal | 2 minutes |
| Clinical (ward tablet, consultation) | 5 minutes |
| Back office | 15 minutes |

Rules (PX-PRIV-008, PX-PRIV-009, MUST): show a visible warning with "Stay signed in" before the
lock, long enough to respond (WCAG 2.2.1); locking preserves the cart, draft or open record;
unlock or fast user switch by PIN or badge returns to the same place; every transaction is
attributed to the signed-in user. A tenant may shorten the timeouts; lengthening one beyond the
default is recorded in the tenant's settings audit.

### Screenshots and the recents screen

- Android: set `FLAG_SECURE` on windows that show patient data, payroll, credentials, PINs or full
  account numbers (PX-PRIV-007). It blocks screenshots and display on non-secure displays such as
  casting, and blanks background screenshots (S1). Google notes it is not fully reliable on
  Android 11 and lower; do not over-promise.
- iOS: Chwezi has not verified an iOS mechanism equivalent to `FLAG_SECURE`; what the platform
  offers for hiding the app-switcher snapshot and detecting capture is NOT_ASSESSED (S2). Until
  verified, hide sensitive content when the app moves to the background, and state the limit in the
  product's privacy notes.
- Web: no reliable screenshot block exists; rely on masking and session expiry.

### Storage, analytics and location

- Sensitive data at rest uses the platform's secure storage; session expiry is tested
  (PX-PRIV-003).
- Analytics are opt-in; events carry no personal or health data or free text; identifiers are
  pseudonymous per tenant; retention is documented; uploads are batched and honour data-saver
  settings (PX-PRIV-005, PX-PRIV-010). Applicable data-protection law (for example Uganda's Data
  Protection and Privacy Act 2019) is confirmed per product with counsel; its specific
  requirements are NOT_ASSESSED here.
- Location is collected only when permitted and when the task needs it (PX-PRIV-004).

### Audit trails

Financial and clinical records show their history in the UI: who, what, when, the value before and
after, and the reason for overrides (PX-PRIV-011). Voids, price overrides, discounts above a cap,
job closures and total changes are always recorded (PX-DESTRUCT-003). The trail is append-only on
the server; the UI never offers to edit or delete it.

## Task 6: declare and test languages

The source's "six-language" wording is superseded (owner update, 2026-11-07).

- **Default portfolio list (seven):** English, Luganda, Swahili, French, Arabic (RTL), Kinyarwanda,
  Spanish. Each product declares its own supported list in its profile; the default applies when a
  product has not declared one (PX-L10N-005).
- **Layout gate:** every app passes layout tests on its longest supported language and on Arabic
  RTL, even if Arabic is not yet shipped, so the layout is ready (PX-L10N-002).
- Strings are externalised; plurals and gender use ICU message rules; sentences are never built by
  concatenation; layouts tolerate at least 35% text expansion. Run a pseudo-localisation build in
  CI.
- Translate concepts, not words, and test comprehension with non-technical staff in each language
  (PX-L10N-004). The writing engine owns wording.
- Dates: unambiguous formats (day-month order or month names); 24-hour or locale clock; time zone
  shown where more than one is in scope (PX-L10N-006).
- Names: never split into mandatory first and last name; search tolerates common spelling
  variants (PX-L10N-007).
- Locale data for Luganda (lg), Kinyarwanda (rw) and regional Swahili variants (plural rules,
  number formats) is NOT_ASSESSED (L1): verify against the CLDR release you ship before relying on
  platform formatters, and fall back to English formats with a recorded decision if data is
  missing.
- Typefaces must cover every declared script; take the Arabic face from the design engine's
  typography skills, not from a system fallback.

## Task 7: mirror correctly in RTL

Mechanics: Android `supportsRtl="true"`, start/end instead of left/right, `autoMirrored` only for
simple whole-image mirrors, `BidiFormatter.unicodeWrap()` on inserted strings (R1). Web: `dir` and
`lang` on `<html>`, never CSS for base direction, `dir="auto"` for user content and inputs, `<bdi>`
for unknown-direction inline text, logical CSS properties (R5).

| Element | Rule | Status |
|---|---|---|
| Navigation, back affordance (back points right), progress indicators, sliders | Mirror | VERIFIED (R2) |
| Icons for text or reading direction; forward and backward icons | Mirror | VERIFIED (R2) |
| Order of numerals that show progress (step 1, 2, 3) | Mirror | VERIFIED (R2) |
| Digits within a number (phone, card, amount, document number) | Do not mirror; isolate with bidi wrapping | VERIFIED (R3) |
| Clocks, logos, checkmarks and universal marks, physical-direction controls, photos | Do not mirror | VERIFIED (R3) |
| Media playback controls | Do not mirror | NOT_ASSESSED (R4): Chwezi SHOULD with native-reader review |
| Chart time axes | Keep the reading direction verified with native readers; legends and labels follow RTL | NOT_ASSESSED (R4): SHOULD with review prompt |
| Barcode and QR graphics | Never mirror | Chwezi rule (machine-readable) |

Mixed content (an Arabic customer name with a Latin product code and a UGX amount) uses bidi
isolation for each run (PX-L10N-008). Re-test Arabic line heights at targetSdk 36 (M10).

## Task 8: design for low literacy and second-language users

- Every primary action has an icon and a text label; never icon-only for primary actions
  (PX-L10N-009, SHOULD; icon-only secondary controls still need accessible names, PX-A11Y-001).
- Plain language at a stated reading level per product; one idea per sentence; business words
  users already use.
- Numbers are shown as digits, never only in words; amounts are always visible, not only spoken.
- Key outcomes get a pictorial confirmation as well as text (a receipt icon with "Paid").
- Field apps may offer optional audio or voice prompts.
- Never rely on reading a long instruction to complete a task; the next step is visible.
- Test with target users: task success without help, recorded per language.

## Evidence/currentness

Cited IDs in [currentness-register.md](currentness-register.md), accessed 2026-11-07: A1-A12 and W5
(WCAG), M1, M9, M10, M13 (Android), I1, I3, I4 (Apple), K5 (CMP iOS accessibility), R1-R5 (RTL), S1
(FLAG_SECURE, VERIFIED), S2 (iOS screenshot protection, NOT_ASSESSED), L1 (CLDR data for lg/rw,
NOT_ASSESSED). Language list: owner update 2026-11-07. Idle lock defaults and masking defaults:
owner default 2026-11-07 and Chwezi proposals. Data-protection law: NOT_ASSESSED, confirm per
product with counsel.
