Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Rules Catalogue

Every normative rule of the Chwezi Product Excellence Standard, version 1.0.3, effective
01 November 2026. Binding text: `doctrine/product-excellence-standard.md`. Machine-readable twin:
[../examples/product-excellence-policy.yaml](../examples/product-excellence-policy.yaml); the two
must list the same IDs and levels.

## How to read this catalogue

- **ID** `PX-<AREA>-NNN` is stable and never reused. **Lvl**: MUST (required, no departure;
  blocks release when its Gate column is filled, otherwise a scored finding with an owner and a
  date), SHOULD (departure needs a DDR), MAY. **Gate**: the hard gate a failure trips (blank =
  scored, not a hard gate).
- **Check** is the observable test. **Ev** is the evidence artefact the check leaves behind:

| Code | Evidence artefact |
|---|---|
| SHOT | Screenshot set (stated widths, themes, text scale, locale) |
| UIT | Automated UI, unit or integration test result |
| TRACE | Trace or benchmark from the declared baseline device |
| AT | Assistive-technology or keyboard run log |
| LINT | Guardrail, static or dependency check output |
| CONTRACT | Screen or component contract file |
| REVIEW | Recorded checklist review with reviewer name |
| RECON | Reconciliation report against ledger or report |
| NET | Network or analytics capture |
| STUDY | Usability study or timed task log |
| FIELD | Field test report in the real environment |
| PROFILE | Device, locale or configuration profile file |
| DDR | Design decision record |
| SIGN | Signed review or release record |

- **Refs** point to sibling references: FND foundations, OFF offline-and-low-end-performance, DTV
  data-trust-and-visualisation, APL accessibility-privacy-localisation, SB screen blueprints, CC
  component contracts, PRIN excellence principles (P01-P20), SCR scorecard-and-release-gate, AIP
  agent-implementation-protocol, APB anti-pattern-blacklist, PPR product-profiles, CR
  currentness-register (row IDs such as CR:M6).
- "(owner default)" marks a value set by the owner on 2026-11-07 that the owner may override.

## Area index

| Area | Scope | Rules |
|---|---|---|
| [GATE](#gate) | The thirteen hard release gates | 13 |
| [MANDATE](#mandate) | Scope, authority, honesty of claims | 13 |
| [TOKEN](#token) | Semantic tokens and theming | 9 |
| [TYPE](#type) | Type roles, scaling, figures | 8 |
| [GEOM](#geom) | Spacing, radius, targets, safe areas | 9 |
| [COLOUR](#colour) | Contrast, accent, state colour | 10 |
| [NAV](#nav) | Adaptive navigation, back, re-entry | 8 |
| [INTERACT](#interact) | Feedback, idempotency, input hardware | 18 |
| [MOTION](#motion) | Transitions and reduced motion | 5 |
| [FORM](#form) | Fields, validation, keyboards | 6 |
| [DESTRUCT](#destruct) | Destructive and irreversible actions | 3 |
| [LAYOUT](#layout) | Window classes and composition | 8 |
| [ARCH](#arch) | Code structure and platform adapters | 11 |
| [STATE](#state) | Canonical state set and content states | 7 |
| [PERF](#perf) | Device respect, budgets, data cost | 18 |
| [OFFLINE](#offline) | Sync honesty and durability | 5 |
| [A11Y](#a11y) | Assistive technology and WCAG 2.2 | 13 |
| [PRIV](#priv) | Access, masking, sessions, analytics | 11 |
| [L10N](#l10n) | Locales, currency, RTL, dates | 10 |
| [DATA](#data) | Trust in numbers and payments | 13 |
| [VIZ](#viz) | Charts, timelines, alerts | 5 |
| [TABLE](#table) | Data tables | 2 |
| [PRINT](#print) | Receipts and printed output | 1 |
| [NOTIFY](#notify) | Notifications and SMS fallback | 2 |
| [PROFILE](#profile) | Product profiles | 8 |
| [QA](#qa) | Evidence, review, sign-off | 13 |
| [AGENT](#agent) | Agent implementation protocol | 11 |
| [SCORE](#score) | Scorecard and verdict | 3 |
| [BLACKLIST](#blacklist) | Banned patterns | 6 |

## GATE

| ID | Lvl | Gate fails when | Check | Ev | Rules |
|---|---|---|---|---|---|
| PX-GATE-01 | MUST | A double tap, timeout-retry or replay creates more than one record or charge | Scripted double tap, timeout then retry, offline replay: exactly one server record | UIT | INTERACT-002, OFFLINE-002 |
| PX-GATE-02 | MUST | Saved, paid, sent or live shown before confirmation; queued as confirmed; stale as live | Label-to-backend-condition audit with simulated late and missing acknowledgements | UIT, REVIEW | STATE-002, OFFLINE-003/004, DATA-010, PROFILE-002, BLACKLIST-002 |
| PX-GATE-03 | MUST | Money, stock, tax or clinical values differ from the authoritative source; wrong minor unit | Reconciliation and formatter tests per currency and locale | RECON, UIT | DATA-003/004/005/011/012, L10N-001 |
| PX-GATE-04 | MUST | A restricted action or record is reachable with a lower-role session | API calls with low-role tokens are denied | UIT | PRIV-001 |
| PX-GATE-05 | MUST | Sensitive data reaches a role, screenshot, recents view or analytics event it should not | Role-by-screen matrix, recents snapshot, analytics capture | UIT, SHOT, NET | PRIV-002/003/007/010 |
| PX-GATE-06 | MUST | Any applicable WCAG 2.2 AA failure, or a core task not finishable with screen reader or keyboard | Scanner plus logged screen-reader and keyboard runs | AT, UIT | A11Y-*, COLOUR-001/002, GEOM-005, FORM-001/003 |
| PX-GATE-07 | MUST | Primary action or essential value lost at 200% text | Screenshots at 200% and the platform maximum | SHOT | TYPE-002/005 |
| PX-GATE-08 | MUST | Interruption or a failing non-core service loses or blocks work | Kill, rotate, back, airplane mode, analytics/media endpoints down | UIT | INTERACT-006, NAV-002, OFFLINE-005, STATE-006, PERF-008 |
| PX-GATE-09 | MUST | Fabricated data or an invented capability in a production build | Build check for fixtures; requirement trace per field and destination | LINT, CONTRACT | MANDATE-004, NAV-004, DATA-001/006, PROFILE-004 |
| PX-GATE-10 | MUST | A canonical state missing without a declared N/A reason | State matrix against screenshots or assertions | CONTRACT, SHOT | STATE-001 |
| PX-GATE-11 | MUST | No baseline-device measurement, budget regression, or vitals threshold exceeded | Baseline traces compared with recorded budget; vitals dashboard | TRACE | PERF-001/002/003/015/017 |
| PX-GATE-12 | MUST | No independent verifier, or no human domain reviewer on a financial or clinical change | Review record names a different verifier and the domain reviewer | SIGN | QA-004/006/012 |
| PX-GATE-13 | MUST | Where a screen issues numbered documents: a number not contiguous per tenant and type, allocated at draft or on the client, derived from COUNT+1, MAX+1 or the row id, changed on replay, shown as final while provisional offline, or a numbered document deleted instead of voided | Concurrent issue, offline issue and replay, and void tests against the tenant counter | UIT | DATA-013 |

## MANDATE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-MANDATE-001 | MUST | | The standard governs every Chwezi app and system on all platforms; existing web stacks keep their stack and adopt the tokens and behaviour | Project instructions cite the standard and version; PR template carries the gate | REVIEW | doctrine |
| PX-MANDATE-002 | MUST | | MUST rules are gates; SHOULD departures carry a DDR; MAY is optional | Every SHOULD departure links a DDR ID | DDR | doctrine |
| PX-MANDATE-003 | MUST | | Conflicts resolve by the precedence ladder: law, safety and privacy; accessibility; data integrity; this standard; house style; product brand. State meaning is never overridable | DDR cites the ladder step | DDR | doctrine |
| PX-MANDATE-004 | MUST | 09 | Mockups and reference studies are inspiration only; fields, features, prices, calculations, clinical rules and permissions come from requirements and the domain model | Screen contract traces each field and action to a requirement | CONTRACT | SB, AIP |
| PX-MANDATE-005 | MUST | | Design for the low-end Android baseline first; larger windows are enriched by composition, never by costly effects on the phone | Baseline device declared; no phone-only decorative effect | PROFILE, REVIEW | OFF, P14 |
| PX-MANDATE-006 | MUST | | Every quality claim made to a client is backed by the evidence named for it; unproven claims are not made | Claim-to-evidence map in the proposal or release note | REVIEW | SCR |
| PX-MANDATE-007 | MUST | | No claim of parity with another vendor's product quality without comparative user evidence; the aim is discipline, not imitation of another vendor's styling | Text audit of proposals and marketing | REVIEW | APB |
| PX-MANDATE-008 | MUST | | Chwezi work is priced and defended on measured outcomes and human accountability, never on hours, lines of code or "no AI used" | Proposal deliverables match the phase artefacts | REVIEW | PPR |
| PX-MANDATE-009 | SHOULD | | Engagements deliver phase artefacts: discovery, experience design, engineering, validation, go-live, post-launch | Artefact checklist per phase | REVIEW | AIP |
| PX-MANDATE-010 | MUST | | Value metrics use baselines and windows agreed with the client; no promised adoption or retention gains without observed evidence | Dated baseline record with owner before any value claim | REVIEW | PPR |
| PX-MANDATE-011 | MUST | | Repository text and policy file are the authority; PDFs are renderings; both carry the same version | Version strings match | LINT | doctrine |
| PX-MANDATE-012 | SHOULD | | Each product turns the standard into versioned tokens, screen contracts, component previews and regression tests | Repository contains each artefact | REVIEW | AIP |
| PX-MANDATE-013 | SHOULD | | Users finish routine work quickly, can predict each action's result and can see their work was saved; no celebration on routine transactions | Session study: zero "did it save?" questions; no confetti assets | STUDY | PRIN |

## TOKEN

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-TOKEN-001 | MUST | | Colour, type, spacing, radius, elevation and motion values in screen code come from semantic tokens | Raw-literal guardrail = 0 or a ratchet baseline that only falls | LINT | FND |
| PX-TOKEN-002 | MUST | | Token pack defines surface, brand, text, state (success, warning, danger, info, neutral, each with on- and container- pairs), geometry and motion groups | Schema validation of the token pack | LINT | FND |
| PX-TOKEN-003 | MUST | | Every surface, text and state token has light and dark values; dark is remapped, not inverted; contrast recomputed per theme | Contrast table for both themes | REVIEW | FND |
| PX-TOKEN-004 | MUST | | A product theme changes brand tokens only; never the meaning, colour role or label of state or destructive tokens | Theme diff shows only brand keys | LINT | FND |
| PX-TOKEN-005 | MUST | | Components never hard-code a brand hue | Hex search in component library = 0 | LINT | FND |
| PX-TOKEN-006 | MUST | | Swapping the brand primary changes colour only; layout, spacing, state meaning and contrast still pass | Theme-swap screenshot test with two primaries | SHOT | FND, P17 |
| PX-TOKEN-007 | MUST | | Tokens, component APIs and screenshot baselines are versioned together | One version tag across the three | LINT | AIP |
| PX-TOKEN-008 | MUST | | Web products consume the same tokens (CSS custom properties or the stack's theme) generated from one source | Build emits tokens; no hand-kept duplicates | LINT | FND |
| PX-TOKEN-009 | SHOULD | | Standard roles map to house roles (canvas = ground, text.primary = ink, text.secondary = muted, link = brand primary, danger = money down/error); "critical" is a severity label, not a role (owner default) | Mapping table in the product theme file | REVIEW | FND |

## TYPE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-TYPE-001 | SHOULD | | Type roles start from: title 24-28 sp phone, 28-32 large; section 18-22; body 14-16; metadata 12-14; KPI 24-36 with one hero figure up to 45; floor 12 sp. House values are the implementation | Type tokens within ranges or a DDR | LINT | FND |
| PX-TYPE-002 | MUST | 07 | Titles and labels wrap; nothing essential clips or truncates without an accessible full value at maximum supported text scale | Screenshots at 200% (Android), largest accessibility size (iOS), 200% zoom (web) | SHOT | FND, CR:M13, CR:I3 |
| PX-TYPE-003 | MUST | | Metadata-size and tertiary text never carry essential information alone | Each essential datum at body size or in a labelled field | REVIEW | FND |
| PX-TYPE-004 | MUST | | Every figure (money, quantity, KPI, column, amounts inside sentences) uses tabular figures; KPIs show unit and period | Figure styles set tabular numerals; column alignment screenshot | SHOT | FND, DTV |
| PX-TYPE-005 | MUST | 07 | Text uses scalable units and follows the OS text setting; at 200% no primary action is lost; platform maximum is recorded | Large-text test on phone and tablet in two locales | SHOT | FND, CR:M13, CR:I3 |
| PX-TYPE-006 | SHOULD | | Consistent heading hierarchy exposed as headings to assistive technology | Accessibility tree shows ordered heading roles | AT | APL |
| PX-TYPE-007 | MUST | | Typefaces come from the house pair or an audited alternative under the typography skills; the framework default face or a bare system stack is never primary | Theme names bundled faces; slop audit passes | REVIEW | FND |
| PX-TYPE-008 | MUST | | At most one hero figure per page; other figures use tile sizes | Count of hero-size figures per page <= 1 | SHOT | FND |

## GEOM

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-GEOM-001 | MUST | | Spacing comes from the house 4-based scale (2, 4, 8, 12, 16, 24, 32, 48; 2 for optical nudges only) | Off-scale spacing literals = 0 | LINT | FND |
| PX-GEOM-002 | MUST | | Content respects safe areas and system bars on every platform; Android screens handle edge-to-edge insets with no opt-out | Screenshots with gesture nav, 3-button nav, cut-out, split screen | SHOT | FND, CR:M6 |
| PX-GEOM-003 | SHOULD | | Screen inset 16 dp on phones, 24-32 dp on large windows | Token values | LINT | FND |
| PX-GEOM-004 | SHOULD | | Radius from house tokens (cards 20, hero and sheets 28); the earlier 12-20 dp range is superseded; tables and dense lists are not over-rounded (owner default) | Radius tokens; table screenshot | LINT, SHOT | FND |
| PX-GEOM-005 | MUST | 06 | Touch targets at least 48x48 dp (Android) and 44x44 pt (iOS) on the actual hit area; web at least 24x24 CSS px (WCAG 2.5.8) and 44 px on touch-primary screens | Hit-area measurement, not glyph size | UIT, REVIEW | FND, CR:A5, CR:M1, CR:I1 |
| PX-GEOM-006 | SHOULD | | Surfaces separate by hairline or tonal step; one shadow level, only for floating layers (sheets, dialogs, floating cart) | Shadowed components per screen | REVIEW | FND |
| PX-GEOM-007 | SHOULD | | Baselines aligned, numeric columns right-aligned, icons optically centred, padding and section gaps consistent | Overlay review at device scale and 200% | REVIEW | FND, P05 |
| PX-GEOM-008 | MUST | | One radius set, one line-icon family and one illustration style per product | Distinct radius values <= token count; single icon dependency | LINT | FND |
| PX-GEOM-009 | MUST | | Glove, field, workshop and POS keypad screens use targets of at least 56 dp with 8 dp between targets | Target audit on those screens | UIT | FND, PPR |

## COLOUR

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-COLOUR-001 | MUST | 06 | Body text at least 4.5:1, large text 3:1, component boundaries, focus indicators and meaningful graphics 3:1, in every theme | Contrast table from rendered colours | REVIEW | FND, CR:A3, CR:A4 |
| PX-COLOUR-002 | MUST | 06 | Status and meaning never rely on colour alone; each state carries a word, sign, icon or pattern | Greyscale review; text present in accessibility tree | SHOT, AT | FND |
| PX-COLOUR-003 | SHOULD | | Task screens are mostly neutral or lightly tinted; saturated brand colour stays under about 10% of screen area | Area estimate on task screens | REVIEW | FND, P17 |
| PX-COLOUR-004 | MUST | | One amber accent marks the single next step; no screen has two accent actions; no next step means no accent (owner default: house model) | Accent actions per screen <= 1 | LINT, SHOT | FND |
| PX-COLOUR-005 | SHOULD | | Danger is reserved for failures, losses, destructive actions and critical alerts; normal pending work is neutral or info | Red-usage audit against the state list | REVIEW | FND, P07 |
| PX-COLOUR-006 | MUST | | No decorative or random gradients on task screens | Gradient brushes outside hero tokens = 0 | LINT | APB |
| PX-COLOUR-007 | MUST | | Field and workshop products provide a high-contrast light theme (body text at least 7:1) for direct sunlight | Sunlight field test | FIELD | PPR |
| PX-COLOUR-008 | SHOULD | | Clinical products offer a dark theme for night wards; critical colours keep meaning and contrast; theme never switches mid-transaction | Dark clinical screenshots | SHOT | PPR |
| PX-COLOUR-009 | MUST | | Any new colour beyond roles and the eight illustration hues needs a DDR and owner approval | DDR per added hue | DDR | FND |
| PX-COLOUR-010 | SHOULD | | Content layers do not imitate system glass materials; any custom translucency has an opaque fallback under Reduce Transparency or Increase Contrast | Settings toggle screenshots | SHOT | FND, CR:I6, CR:I7 |

## NAV

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-NAV-001 | MUST | | Navigation adapts by width class: compact 3-5 bottom destinations; medium rail; expanded rail or sidebar; large and extra-large persistent labelled sidebar with optional context pane | Screenshots per class; compact destinations <= 5 | SHOT | FND, CR:M3 |
| PX-NAV-002 | MUST | 08 | Destination, selection, scroll position and input survive size, orientation and fold changes | Rotate, resize and unfold mid-task | UIT | FND |
| PX-NAV-003 | MUST | | Platform conventions honoured: system and predictive back on Android, edge swipe on iOS, browser back and deep links on web | Back matrix per platform | UIT | FND |
| PX-NAV-004 | MUST | 09 | Navigation comes from the product IA; no invented destinations | IA map against navigation graph | CONTRACT | AIP |
| PX-NAV-005 | MUST | | Every alert, notification and exception opens the affected record | Tap-through from each alert type | UIT | DTV |
| PX-NAV-006 | MUST | | A returning user lands on the right tenant or outlet, role, last safe context, next task and pending work; no promo carousel, repeat onboarding, splash delay or unneeded permission prompt | Launch-to-first-meaningful-action for returning users within the product budget | TRACE | P19 |
| PX-NAV-007 | SHOULD | | The next action and key figures keep their place between visits and states | Screenshot diff across states | SHOT | P02 |
| PX-NAV-008 | MUST | | Android back uses the platform back handlers; no business logic in legacy back callbacks; back is intercepted only to protect unsaved data; predictive back animation kept unless a DDR says otherwise | Code review and back test on targetSdk 36 | UIT, REVIEW | FND, CR:M8 |

## INTERACT

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-INTERACT-001 | MUST | | Every input gets visible (and accessible) acknowledgement, measured separately from server completion; target p95 at most 100 ms on the baseline device | Instrumented timing on baseline device | TRACE | P03 |
| PX-INTERACT-002 | MUST | 01 | Double taps, timeouts and replays never create duplicate records; every create and payment carries an idempotency key | Double tap, timeout-retry, replay: one record | UIT | P03, OFF |
| PX-INTERACT-003 | MUST | | No indefinite waiting: every progress indicator has a timeout and a recovery path (retry, keep working offline, cancel) | Network-stall test | UIT | OFF |
| PX-INTERACT-004 | MUST | | One visually dominant next action per screen or panel; secondary actions subordinate | Primary-emphasis controls per panel <= 1 | SHOT | P02 |
| PX-INTERACT-005 | MUST | | High-frequency tasks: recorded tap budget, persistent context, predictable focus, immediate visible result | Tap count per core task against budget; focus lands as specified | STUDY, UIT | P01 |
| PX-INTERACT-006 | MUST | 08 | Selections, filters, partial forms and carts survive back, process death, connectivity loss and accidental dismissal | Kill-process and airplane-mode tests mid-task | UIT | P04 |
| PX-INTERACT-007 | MUST | | Reversible changes offer undo; drafts are retained; a slip never forces a restart | Undo per reversible action; draft restored after kill | UIT | P04 |
| PX-INTERACT-008 | MUST | | Confirmation only where it protects money, health, privacy or irreversible state | Each dialog tagged with one of the four reasons | REVIEW | P01 |
| PX-INTERACT-009 | MUST | | Defaults preselect only safe, reversible values from reliable context; never a consequential clinical or financial choice; override is one step | Defaults register by role, outlet and device | REVIEW | P08 |
| PX-INTERACT-010 | SHOULD | | Novices get labels and guidance; experts get shortcuts, recents, scanning and bulk actions without a mode switch; prompts stop after first success | Separate novice and expert benchmarks | STUDY | P09 |
| PX-INTERACT-011 | SHOULD | | Repetitive work avoids re-entry, keeps totals visible, autofocuses the next field and offers safe batch actions | Re-entry count; 30-60 minute session log | STUDY | P11 |
| PX-INTERACT-012 | SHOULD | | Micro-interactions and haptics only confirm state or orient; none delays a repeat operation | Animation register with purpose | REVIEW | P06 |
| PX-INTERACT-013 | MUST | | No hidden primary actions; at most one modal layer on routine work | Modal depth <= 1 on core tasks | UIT | APB |
| PX-INTERACT-014 | SHOULD | | Haptics: one light confirmation on scan, payment confirmation and destructive commit, a distinct failure pattern, never on every tap, follows the system setting, never the only channel | Haptic register; setting-off test | REVIEW | P06 |
| PX-INTERACT-015 | MUST | | Hardware scanners deliver into the active scan target without focusing it; success confirmed within the acknowledgement budget; "not found" visible, announced and offers search or add; double reads debounced; camera scan has torch and manual entry | Scripted keyboard-wedge input, not-found and double-read tests | UIT | SB, PPR |
| PX-INTERACT-016 | MUST | | Amounts and quantities open a numeric keypad (in-app POS keypad targets at least 56 dp); quick-tender buttons for common notes; change due shown large; zero-decimal currencies accept no decimal entry | Field register; UGX entry test | UIT | CC, PPR |
| PX-INTERACT-017 | SHOULD | | Desktop and web offer discoverable shortcuts for high-frequency actions that do not clash with browser, OS or screen-reader keys | Shortcut map and clash check | REVIEW | APL |
| PX-INTERACT-018 | MUST | | Glove and outdoor screens have no gesture-only actions; every drag has a single-tap alternative | Glove test | FIELD | PPR |

## MOTION

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-MOTION-001 | SHOULD | | State and navigation transitions run 120-300 ms and animate opacity and translation, not blur or repeated layout | Motion tokens; no per-frame layout in trace | TRACE | FND, CR:M14 |
| PX-MOTION-002 | MUST | | With reduced motion or animator scale 0, non-essential motion is removed and the end state shown at once (a Chwezi house MUST; WCAG 2.3.3 is AAA) | Toggle test on each platform | SHOT, UIT | FND, CR:A12, CR:X1, CR:I5 |
| PX-MOTION-003 | MUST | | No looping decorative animation, constantly animating charts or live full-screen blur | Zero animation frames after settle on an idle screen | TRACE | APB |
| PX-MOTION-004 | MUST | | Every animation has a recorded purpose and never delays a repeat operation | Animation register; repeat-task time equal with motion on and off | REVIEW, TRACE | P06 |
| PX-MOTION-005 | MUST | | Summary flourishes (reveal, count-up, chart grow-in) only on summary and hub pages, once per visit, at most 1.2 s in total, never on operational screens, off under reduced motion | Per-screen motion register | REVIEW | FND |

## FORM

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-FORM-001 | MUST | 06 | Labels stay visible while typing; no placeholder-only labels | Filled-field screenshot | SHOT | CC |
| PX-FORM-002 | MUST | | Each field uses the correct input type and keyboard (numeric, decimal, phone, email, date) | Field register | CONTRACT | CC |
| PX-FORM-003 | MUST | 06 | On failed submit, focus moves to the first invalid field, the error is announced and input is kept | Automated UI test with screen reader | UIT, AT | CC |
| PX-FORM-004 | MUST | | One convention per product for marking optional or required fields | Review | REVIEW | CC |
| PX-FORM-005 | SHOULD | | Save or submit within thumb reach on phones and never hidden by the keyboard | Screenshot with keyboard open | SHOT | SB |
| PX-FORM-006 | MUST | | Invalid input gets inline text saying what to change | Message per validation rule | CONTRACT | CC |

## DESTRUCT

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-DESTRUCT-001 | MUST | | A destructive action names the item, the consequence and whether it is reversible, then offers undo or explicit confirmation | Copy audit of dialogs and snackbars | REVIEW | CC |
| PX-DESTRUCT-002 | MUST | | Destructive actions are visually distinct and never adjacent to a high-frequency positive action | Separate group or at least one target width apart | SHOT | P02 |
| PX-DESTRUCT-003 | MUST | | Closing jobs, voiding documents or changing totals is deliberate and traceable: who, when, why | Audit entries for each such action | UIT | DTV |

## LAYOUT

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-LAYOUT-001 | MUST | | Content by width class: compact single column with records as destinations; medium two panes where content supports; expanded multi-column and list-detail; large tables, utility panel, configurable grids | Screenshots per class | SHOT | FND, SB, CR:M3 |
| PX-LAYOUT-002 | MUST | | Breakpoints are starting points; layout adapts to window size, text scale, orientation, keyboard and fold posture, judged with real localised content | Long localised content at each class and 200% text | SHOT | FND |
| PX-LAYOUT-003 | SHOULD | | Large tablets run transactions in two panes; phones split them into steps without losing state | Flow test on both sizes | UIT | SB |
| PX-LAYOUT-004 | MUST | | Evidence covers compact phone, tablet portrait and landscape, and desktop or web where shipped | Screenshot set complete | SHOT | SCR |
| PX-LAYOUT-005 | MUST | | No nested scrolling on the same axis; no deep nested layouts | Layout inspector | REVIEW | OFF |
| PX-LAYOUT-006 | SHOULD | | Data-entry screens carry no decorative hero or large empty bands | Review | REVIEW | APB |
| PX-LAYOUT-007 | MUST | | No screen relies on an orientation lock or fixed aspect ratio; at smallest width 600 dp and above every screen works in both orientations and when resized | Rotate and resize on a 600 dp+ device at targetSdk 36 | SHOT | FND, CR:M9 |
| PX-LAYOUT-008 | SHOULD | | Height classes are honoured: in compact height (under 480 dp, such as a phone in landscape) the primary action and total stay visible without scrolling | Landscape phone screenshot | SHOT | FND, CR:M4 |

## ARCH

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-ARCH-001 | SHOULD | | Shared visual components use Compose Multiplatform where compatible; permissions, biometrics, camera, printing, notifications, keyboard and navigation go through platform adapters | Module graph shows adapters behind interfaces | LINT | AIP |
| PX-ARCH-002 | MUST | | Share domain state and tokens, not platform assumptions; no Android-only library assumed on iOS | iOS build runs every shared screen | UIT | AIP |
| PX-ARCH-003 | SHOULD | | Modules: core/designsystem, core/ui, features/NAME/presentation, domain and data; features talk through interfaces, never direct cross-feature imports | Dependency lint | LINT | AIP |
| PX-ARCH-004 | MUST | | Each screen has immutable UI state, explicit user intents and one-off effects | Reducer or view-model unit tests | UIT | AIP |
| PX-ARCH-005 | MUST | | No networking or business calculation inside rendering functions | Static check: UI files import no repository or HTTP client | LINT | CC |
| PX-ARCH-006 | MUST | | Each shared component has a contract: purpose, parameters, sizes, variants, states, semantics, keyboard, test tags, RTL, previews, performance limits | Contract file and preview coverage | CONTRACT | CC |
| PX-ARCH-007 | MUST | | Reuse approved tokens and components first; a new component or variant needs a DDR | DDR per new component | DDR | CC |
| PX-ARCH-008 | MUST | | Web and desktop meet interaction parity (same states, flows, semantics), not pixel identity; no rewrite implied | Parity checklist per screen | REVIEW | FND |
| PX-ARCH-009 | MUST | | Incremental rollout with rollback plan, feature flags for high risk, no unapproved backend logic change, no silent breaking workflow change | Release note lists flags, rollback and communicated changes | REVIEW | AIP |
| PX-ARCH-010 | MUST | | Pin Compose Multiplatform and library versions per project; Compose for web (Beta) needs a DDR for production; with AGP 9+ the Android entry point lives in a separate androidApp module | Build files and DDR | LINT, DDR | CR:K1, CR:K2, CR:K3, CR:K4 |
| PX-ARCH-011 | SHOULD | | Expressive Material components are not mandated until Compose Material 3 1.5.0 is stable in the pinned version; experimental APIs need a DDR. Component names follow the shared catalogue (KpiCard in code, "KPI card" in prose) | Dependency versions and DDR | LINT, DDR | CC, CR:M11 |

## STATE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-STATE-001 | MUST | 10 | Every data screen implements the canonical states: initial loading, content, refreshing, empty, filtered-empty, error, offline with cache, queued change, syncing, conflict, permission-restricted, session expired, success (thirteen). Inapplicable states are declared N/A with a reason; initial loading, content, error and success are never N/A | State matrix with screenshot or assertion per state | CONTRACT, SHOT | SB, CC |
| PX-STATE-002 | MUST | 02 | State labels always match backend truth; no success before server acknowledgement | Label-to-backend-condition audit table | REVIEW, UIT | OFF, P07 |
| PX-STATE-003 | MUST | | Closure shows exactly what was saved, queued or completed and the next step (receipt, share, undo, next task) | Post-action screenshot per core task | SHOT | P20 |
| PX-STATE-004 | MUST | | Empty states name their cause (nothing yet, filtered, no permission, not yet synced), say what belongs here and offer one next action | Screenshot per cause | SHOT | SB |
| PX-STATE-005 | MUST | | Errors say what happened, what is still safe and what to do next; codes appear only as a secondary reference | Copy audit | REVIEW | P10 |
| PX-STATE-006 | MUST | 08 | Conflicts show both versions with who and when, let the authorised user choose or merge, and never silently drop a financial or clinical edit | Forced-conflict test | UIT | OFF |
| PX-STATE-007 | SHOULD | | Onboarding is role-based, skippable, shown once, resumable and uses the user's first real task; sample data is marked demo and removable | Fresh-install and returning-user tests | UIT | P09 |

## PERF

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-PERF-001 | MUST | 11 | Each project records a baseline device profile (model, RAM, OS and API level, screen) and an OS floor; no universal-compatibility claims | Profile file in the repository | PROFILE | OFF |
| PX-PERF-002 | MUST | 11 | Cold and warm start, transition latency, jank, memory and battery are measured on the real baseline device with a realistic dataset; emulator-only evidence fails | Linked trace files | TRACE | OFF, CR:P4, CR:P6 |
| PX-PERF-003 | MUST | 11 | Budgets come from measurement; a release never regresses beyond the agreed budget; no blanket frame-rate promises on old hardware | Benchmark comparison in CI or release record | TRACE | OFF |
| PX-PERF-004 | MUST | | Solid or tonal surfaces, lazy lists with stable keys, bounded recomposition, no large blurs or oversized vector paths | Recomposition counts; lint | TRACE, LINT | OFF |
| PX-PERF-005 | MUST | | Images are downsampled to display size before decode; caches are memory-capped; no full-resolution images in lists | Request size against rendered size | TRACE | OFF |
| PX-PERF-006 | MUST | | Long records page; lists over 50 rows virtualise; charts render bounded, downsampled points | 10x production dataset scrolls within budget | TRACE | OFF, DTV |
| PX-PERF-007 | MUST | | No excessive polling or wake locks; background work is batched and constraint-aware | Energy log; partial wake lock vital under 5% | TRACE | OFF, CR:P1 |
| PX-PERF-008 | MUST | 08 | Under constraint, decorative motion and images switch off; failure of analytics, media or marketing content never blocks a core task | Kill those endpoints; core task completes | UIT | OFF |
| PX-PERF-009 | SHOULD | | Crash-free user sessions at least 99.9% per platform over a rolling 28 days after stabilisation | Crash dashboard with stated denominator | TRACE | OFF |
| PX-PERF-010 | SHOULD | | Common tasks at least 20% faster than the previous measured baseline with no more errors; greenfield products start from release 2 | Matched task timing study | STUDY | SCR |
| PX-PERF-011 | MUST | | Media above a stated size waits for Wi-Fi or consent on metered networks; sync payloads are delta-based and compressed; data saver is honoured | Capture on a metered profile | NET | OFF |
| PX-PERF-012 | SHOULD | | Install and update size budgets recorded per release; graceful behaviour on low storage | Size report; low-storage test | PROFILE, UIT | OFF |
| PX-PERF-013 | MUST | | Per-product reliability objectives (crash-free sessions, ANR rate, sync success, p95 input acknowledgement); when exhausted, feature releases pause | Objective dashboard and release log | TRACE | SCR |
| PX-PERF-014 | SHOULD | | Web front ends meet "good" Core Web Vitals at p75 on a low-end mobile profile: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1 or less | Field data, or lab data marked as lab | TRACE | OFF, CR:W1, CR:W2, CR:W3 |
| PX-PERF-015 | MUST | 11 | Android apps stay below the vitals bad-behaviour thresholds: user-perceived crash rate 1.09% and ANR rate 0.47% overall, 8% per device model, over 28 days | Vitals dashboard | TRACE | OFF, CR:P1 |
| PX-PERF-016 | SHOULD | | Foreground and bitmap memory stay within the vitals thresholds for the baseline device's RAM tier | Memory profile | TRACE | OFF, CR:P2 |
| PX-PERF-017 | MUST | 11 | Startup on the baseline device never reaches the excessive thresholds (cold 5 s, warm 2 s); Chwezi hot-start target 1 s; full-display time reported | Startup benchmark with time to initial and full display | TRACE | OFF, CR:P5, CR:P6 |
| PX-PERF-018 | SHOULD | | Android apps ship Baseline Profiles measured with Macrobenchmark; sideloaded installs are measured separately because install-time compilation may not apply | Benchmark report | TRACE | OFF, CR:P7 |

## OFFLINE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-OFFLINE-001 | MUST | | Show last successful sync time, pending queue count, conflict status and per-action outcome | Offline screenshots | SHOT | OFF |
| PX-OFFLINE-002 | MUST | 01 | Local saves survive kill and reboot and are idempotent on replay | Kill or reboot then sync: one server record | UIT | OFF |
| PX-OFFLINE-003 | MUST | 02 | Queued is never shown as confirmed; a queued payment is never shown as paid | Label audit | UIT | OFF |
| PX-OFFLINE-004 | MUST | 02 | Cached or stale data is never presented as live; age shown where it matters (any cached figure; operational figures older than 15 minutes, configurable) | Stale-data screenshot shows age | SHOT | OFF, DTV |
| PX-OFFLINE-005 | MUST | 08 | No silent unsynchronised updates: results, failures and conflicts reach the user who owns them | Forced failure and conflict tests | UIT | OFF |

## A11Y

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-A11Y-001 | MUST | 06 | Every icon-only control has an accessible name | Scanner: zero unlabelled controls | UIT | APL |
| PX-A11Y-002 | MUST | 06 | Core tasks complete with the Android and iOS screen readers and a desktop screen reader on web, in logical focus order | Logged screen-reader runs | AT | APL |
| PX-A11Y-003 | MUST | 06 | Everything is operable by external keyboard; a keyboard and focus map exists per screen | Keyboard-only run | AT | APL |
| PX-A11Y-004 | SHOULD | | Voice control works: accessible names contain the visible label | Voice control spot test | AT | APL |
| PX-A11Y-005 | MUST | 06 | Charts have a text summary or data table alternative | Screen reader reads the summary | AT | DTV |
| PX-A11Y-006 | MUST | | Accessibility lives in the shared components, never in a separate mode or skin | No "accessible version" screens | REVIEW | APL, P13 |
| PX-A11Y-007 | MUST | 06 | Focus is never hidden by sticky bars, sheets or keyboards (WCAG 2.4.11) | Keyboard run | AT | APL, CR:A7 |
| PX-A11Y-008 | MUST | 06 | Every drag has a single-pointer alternative (WCAG 2.5.7) | Review | REVIEW | APL, CR:A8 |
| PX-A11Y-009 | MUST | 06 | Sign-in needs no cognitive test without an alternative; paste allowed in OTP and password fields (WCAG 3.3.8) | Sign-in test | UIT | APL, CR:A11 |
| PX-A11Y-010 | MUST | 06 | Information already given in a process is prefilled or selectable (WCAG 3.3.7) | Flow review | REVIEW | APL, CR:A10 |
| PX-A11Y-011 | SHOULD | | Help sits in a consistent place across screens (WCAG 3.2.6) | Review | REVIEW | APL, CR:A9 |
| PX-A11Y-012 | MUST | 06 | Status messages (saved, queued, synced, scan result) are announced without moving focus (WCAG 4.1.3) | Screen-reader log | AT | APL |
| PX-A11Y-013 | MUST | | Compose Multiplatform iOS screens are device-tested at accessibility text sizes and with Reduce Motion, because the mapping is not documented | Device run log on iOS | AT, SHOT | APL, CR:K5 |

## PRIV

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-PRIV-001 | MUST | 04 | Permissions are enforced in the domain and backend; hiding a control is convenience only | Low-role API calls denied | UIT | APL |
| PX-PRIV-002 | MUST | 05 | Patient, employee and financial data appear only for roles that need them, masked where the full value is not needed | Role-by-screen visibility matrix tested | UIT | APL, P15 |
| PX-PRIV-003 | MUST | 05 | Where the risk assessment requires: secure local storage, session expiry and audit trails | Storage, expiry and audit tests | UIT | APL |
| PX-PRIV-004 | MUST | | Location only when the user has permitted it and the task needs it | Permission flow test | UIT | APL |
| PX-PRIV-005 | MUST | | Product analytics are opt-in | Fresh install sends nothing before consent | NET | APL |
| PX-PRIV-006 | MUST | | Hide controls a role can never use; show temporarily blocked controls disabled with the reason and the request or approval path | Role matrix screenshots | SHOT | APL |
| PX-PRIV-007 | MUST | 05 | Screens with patient data, payroll, credentials, PINs or full account numbers are protected from screenshots and recents previews where the platform allows; iOS limits are recorded | Platform flag; blank recents snapshot | SHOT | APL |
| PX-PRIV-008 | MUST | | Shared devices: fast PIN or badge user switch keeping the cart or draft; every transaction attributed to the signed-in user; idle lock with a warning that preserves work. Timeouts (SHOULD, tenant-configurable, owner default): shared POS 2 min, clinical 5 min, back office 15 min | Idle and attribution tests | UIT | APL, PPR |
| PX-PRIV-009 | MUST | | Session-timeout warnings leave enough time to extend unless a documented security exception applies | Timer test | UIT | APL |
| PX-PRIV-010 | MUST | 05 | Analytics events carry no personal, health or free-text data; pseudonymous tenant IDs; documented retention; batched upload honouring metered settings; applicable data-protection law followed (legal currentness NOT_ASSESSED) | Event schema review and capture | NET, REVIEW | APL |
| PX-PRIV-011 | MUST | | Financial and clinical records show an audit trail in the interface: who, what, when, before and after, override reason | History view test | UIT | APL, DTV |

## L10N

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-L10N-001 | MUST | 03 | Money and numbers format by locale and by the currency's ISO 4217 minor unit (UGX and RWF 0; KES, TZS and USD 2); this overrides the money-figures skill's two-decimal rule for full amounts | Formatter tests per currency and locale | UIT | APL, DTV, CR:C1, CR:C2 |
| PX-L10N-002 | MUST | | Layouts are tested in every supported language, in the longest one, and in Arabic RTL | Screenshot set per locale | SHOT | APL |
| PX-L10N-003 | MUST | | In RTL, directional controls and navigation mirror; digits within a number, logos, clocks and photos do not | RTL screenshot review | SHOT | APL, CR:R2, CR:R3 |
| PX-L10N-004 | SHOULD | | Copy uses business vocabulary familiar to East African users, tested with non-technical staff | Comprehension test log | STUDY | APL, P10 |
| PX-L10N-005 | MUST | | Each product declares its locales. Default list (owner default): English, Luganda, Swahili, French, Arabic (RTL), Kinyarwanda, Spanish. Strings externalised, plural rules, no concatenated sentences, layouts tolerate 35% expansion | Pseudo-localisation and locale screenshots | SHOT, PROFILE | APL |
| PX-L10N-006 | MUST | | Show local time with zone where more than one zone is in scope; unambiguous dates (day-month order or month names) | Formatter tests | UIT | APL |
| PX-L10N-007 | MUST | | Phone numbers stored in E.164 with the country selector defaulting to the tenant country; names not forced into first and last; search tolerant of spelling variants | Input tests | UIT | APL |
| PX-L10N-008 | MUST | | Arabic: bidi isolation for numbers, codes and mixed strings; digit shapes follow the locale or tenant setting consistently; script uses a covering face | Mixed-content RTL screenshots | SHOT | APL, CR:R1, CR:R5 |
| PX-L10N-009 | SHOULD | | Low-literacy and second-language users: icon with text on every primary action, plain language, numbers never only in words, optional audio prompts in field apps | Comprehension test | STUDY | APL |
| PX-L10N-010 | MUST | | Arabic and other complex-script layouts are re-tested at targetSdk 36, where the tall-script line-height switch is ignored | RTL screenshots on targetSdk 36 | SHOT | APL, CR:M10 |

## DATA

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-DATA-001 | MUST | 09 | No fabricated or illustrative data in production builds; demo data is labelled and cannot mix with live records | Build check for fixtures; demo watermark | LINT | DTV |
| PX-DATA-002 | MUST | | Every KPI shows label, value, unit, period, freshness where relevant and a drill-down path; any delta shows direction by sign or word | KpiCard required props | CONTRACT | DTV, CC |
| PX-DATA-003 | MUST | 03 | Percent and percentage-point changes are never mixed or mislabelled | Copy review; unit token | REVIEW | DTV |
| PX-DATA-004 | MUST | 03 | Money, tax, stock and clinical values reconcile with the authoritative source and report definitions; rounding and offline reconciliation tested | Reconciliation test | RECON | DTV, P18 |
| PX-DATA-005 | MUST | 03 | Due, received and reconciled funds are always distinct states and labels | Ledger review | REVIEW | DTV |
| PX-DATA-006 | MUST | 09 | Clinical: no invented diagnoses, unsafe defaults, hidden critical results or clinical decisions delegated to decorative AI; urgency, privacy and provenance outrank style | Clinical safety sign-off | SIGN | PPR |
| PX-DATA-007 | MUST | | Every dashboard element names the question or decision it serves; unused ones are removed or demoted | Widget register with usage data | REVIEW | DTV, P12 |
| PX-DATA-008 | MUST | | Checkout and other transaction screens carry no decorative chart and are never behind dashboard widgets | Path length to checkout | REVIEW | PPR |
| PX-DATA-009 | MUST | | Figures that drive decisions show provenance: source and as-of time | Provenance field in the screen contract | CONTRACT | DTV |
| PX-DATA-010 | MUST | 02 | Mobile-money and card payments show initiated, awaiting customer approval, pending provider confirmation, confirmed, failed with reason, timed out, reversed; only provider-confirmed is "paid"; provider reference on receipt; timed-out payments re-check status before any retry | State-machine test with late callbacks and timeouts | UIT | DTV, SB |
| PX-DATA-011 | MUST | 03 | Amounts stored as integer minor units per currency; currency code shown wherever more than one currency is in scope; UGX never shows ".00"; FX shows rate, source and time; totals never mix currencies | Formatter tests; mixed-currency review | UIT | DTV, CR:C1 |
| PX-DATA-012 | MUST | 03 | Cash rounding applied once and shown as its own line; tax lines show rate and amount; fiscal e-invoicing (e.g. URA EFRIS) number and verification code shown when the integration is enabled | Receipt reconciliation test | RECON | DTV, PPR |
| PX-DATA-013 | MUST | 13 | Document numbers are contiguous per tenant and type, allocated at issue inside the save transaction from a locked counter (never COUNT+1, MAX+1, random, row-id-derived or client-generated), sent as strings, never sorted by string alone; a replayed idempotency key returns the same number; offline documents carry a provisional tag; numbered documents are voided with reason, user and time, never deleted | Concurrent-issue, replay, offline-issue and void tests | UIT | DTV |

## VIZ

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-VIZ-001 | MUST | | Time series label time zone, granularity, units and missing periods; smoothing never hides meaningful spikes | Chart checklist | REVIEW | DTV |
| PX-VIZ-002 | MUST | | Donuts and gauges only for five categories or fewer, or progress against a known bound, with exact figures and a readable legend | Category count; labels present | REVIEW | DTV |
| PX-VIZ-003 | MUST | | Timelines and pipelines show stage name, state as a word, timestamps, actor and exceptions; never dots alone | Component props required | CONTRACT | DTV, CC |
| PX-VIZ-004 | MUST | | Operational alerts sort by severity, due time, owner and required action, and can be acknowledged or resolved | Sort spec; acknowledge action | UIT | DTV |
| PX-VIZ-005 | MUST | | Charts use meaningful scales, show units and source period, and carry a text interpretation | Review | REVIEW | DTV |

## TABLE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-TABLE-001 | SHOULD | | Tables support sort, filter, search, column management, pagination or virtualisation, row actions, bulk selection and authorised export; on compact width they become row lists | Feature checklist; export permission test | REVIEW | CC |
| PX-TABLE-002 | MUST | | Numbers right-aligned with tabular figures; row identifiers stable across sorts and refreshes | Screenshot; row key test | SHOT, UIT | CC |

## PRINT

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-PRINT-001 | MUST | | Receipts have 58 mm and 80 mm thermal templates (column limits checked on the target printer) and A4 or PDF: business, document number, date and time with zone, cashier, items, tax, totals, payment method and reference, change; reprints marked COPY; printer-offline queues visibly and never blocks the sale; a digital receipt is offered | Print on target printers; printer-off test | FIELD, UIT | SB, PPR |

## NOTIFY

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-NOTIFY-001 | MUST | | Notifications carry operational value only, sit in user-controllable categories, open the record, respect quiet hours, are requested at the first moment of value rather than first launch, and badge counts are accurate | Notification inventory; permission timing test | REVIEW, UIT | APL |
| PX-NOTIFY-002 | SHOULD | | Critical customer messages (receipt, appointment, payment) have an SMS fallback that fits one segment where possible (GSM-7 160 characters; UCS-2, used by Arabic, 70) | Message length test | UIT | APL |

## PROFILE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-PROFILE-001 | MUST | | Maduuka (retail, restaurant, hotel, pharmacy, inventory): compact transaction density, persistent total, fast repeat sale, visible offline queue, outlet always shown, UGX formatting, fiscal receipt status when enabled | Core journeys timed; checklist | STUDY, REVIEW | PPR |
| PX-PROFILE-002 | MUST | 02 | Maduuka never shows a queued payment as paid, hides a scan failure, places checkout behind widgets or puts a chart on checkout | Negative tests | UIT | PPR |
| PX-PROFILE-003 | MUST | | Medic8: labelled, timestamped priority cues; privacy-aware summaries; fast patient switching with the active patient always identified; legible clinical detail | Wrong-patient test; checklist | UIT, REVIEW | PPR |
| PX-PROFILE-004 | MUST | 09 | Medic8 never invents diagnoses, uses unsafe defaults, hides critical results or delegates clinical decisions to decorative AI | Clinical safety review | SIGN | PPR |
| PX-PROFILE-005 | MUST | | Farm Acre: outdoor contrast, large controls, offline-first field forms, photo compression, sync confidence, familiar agricultural terms, location only when permitted; no tiny charts or heavy maps | Sunlight and offline form tests | FIELD | PPR |
| PX-PROFILE-006 | MUST | | Aqar: clear ledgers, arrears provenance, occupancy hierarchy, lease timeline, work-order urgency, property scope shown, document previews | Ledger review | REVIEW | PPR |
| PX-PROFILE-007 | MUST | | SpannaMax: glove-friendly controls, large checklists, strong state labels, camera evidence, audit-friendly invoices; no accidental job closure; totals never change without trace | Glove and audit-log tests | FIELD, UIT | PPR |
| PX-PROFILE-008 | SHOULD | | Education and LMS: visible progress, clear schedules, distraction-free learning, attendance, exams, fees and calendar | Checklist | REVIEW | PPR |

## QA

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-QA-001 | MUST | | Release evidence covers six gate families: visual, functional, accessibility, performance, data integrity, review | Evidence pack index | REVIEW | SCR |
| PX-QA-002 | MUST | | Every change carries compact-phone and tablet screenshots, an interaction test of the main task, a large-text check, an offline-interruption check where relevant, and a note on any deviation from shared components | PR checklist | SHOT, UIT | AIP |
| PX-QA-003 | MUST | | The per-screen audit checklist is completed | Checklist in PR | REVIEW | AIP |
| PX-QA-004 | MUST | 12 | No compliance claim without test results; nothing is approved on static images or appearance alone | Gate items carry MEASURED evidence | REVIEW | SCR |
| PX-QA-005 | MUST | | Departures are DDRs: ID, date, problem, two or more alternatives, choice, trade-offs, evidence, owner, reviewer, review date | DDR file per departure | DDR | AIP |
| PX-QA-006 | MUST | 12 | An independent verifier (not the implementer) checks correctness, states, accessibility and performance; a human domain reviewer signs financial and clinical changes | Review record names both | SIGN | SCR |
| PX-QA-007 | MUST | | Per-screen handoff: ID, roles, task, tokens, component tree, layouts per class, states, labels, focus map, data contract, screenshots, tests, device profile, limits, sign-off | Handoff file complete | CONTRACT | AIP |
| PX-QA-008 | MUST | | Sign-off follows the charter roles: implementer, independent verifier, product owner and Lead Developer, plus a named domain reviewer when money, stock, tax or clinical values change; one person may hold two roles except implementer and verifier | Signed record | SIGN | SCR |
| PX-QA-009 | MUST | | A major redesign ships only with before and after evidence, regression tests and a rollback plan | Release pack | REVIEW | SCR |
| PX-QA-010 | SHOULD | | Usability evidence: success, time and errors for novice and experienced users; 30-60 minute operational sessions; five-second purpose test with at least 80% naming purpose and next step | Study logs | STUDY | SCR |
| PX-QA-011 | MUST | | Task metrics, error analysis, accessibility findings, performance profiles and DDRs live in version control | Repository folder updated per release | REVIEW | P20 |
| PX-QA-012 | MUST | 12 | Every scorecard item carries an evidence class (MEASURED, HEURISTIC, NOT_ASSESSED); hard gates close only on MEASURED | Scorecard review | REVIEW | SCR |
| PX-QA-013 | SHOULD | | Field validation in the real environment (counter, ward, field, workshop) with target devices, network and light before first go-live | Field report | FIELD | SCR |

## AGENT

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-AGENT-001 | MUST | | Inspect before building: project instructions, architecture, requirements, domain rules, existing screens, components, OS targets, theme, tests and device profiles; do not overwrite working patterns | Recon note in the task log | REVIEW | AIP |
| PX-AGENT-002 | MUST | | Baseline before changing: screenshots, task timings, existing errors, accessibility findings, device observations | Baseline files | SHOT, TRACE | AIP |
| PX-AGENT-003 | MUST | | Map each screen to workflows, real fields, permissions, the matching blueprint and the state model; list uncertainties first | Evidence map | CONTRACT | AIP, SB |
| PX-AGENT-004 | MUST | | Write the screen contract before code, with measurable acceptance criteria | Contract file | CONTRACT | AIP, SB |
| PX-AGENT-005 | SHOULD | | Prototype the core flow cheaply and verify it before decorative refinement | Prototype link | REVIEW | AIP |
| PX-AGENT-006 | MUST | | Two passes: first flows, all states, keyboard and accessibility; then type, spacing, hierarchy and measured motion. Cosmetic-first work with unfinished recovery states is rejected | Commit order and review | REVIEW | AIP |
| PX-AGENT-007 | MUST | | One coherent screen or workflow phase at a time, preserving existing behaviour | PR scope | REVIEW | AIP |
| PX-AGENT-008 | MUST | | Verify with static, unit, UI and accessibility tests, screenshot comparison, device profiling, totals and permission checks; unrun checks reported NOT_ASSESSED | Test report | UIT | AIP |
| PX-AGENT-009 | MUST | | The release decision records evidence, exceptions and rollback; commits and pushes follow the project's authorised workflow | Release note | REVIEW | AIP |
| PX-AGENT-010 | SHOULD | | Learn after release from opt-in analytics, support issues and feedback, prioritised by task friction and risk | Tagged backlog items | REVIEW | AIP |
| PX-AGENT-011 | MUST | | The machine-readable policy is validated against this catalogue: same IDs, levels and gates | Policy validator | LINT | AIP |

## SCORE

| ID | Lvl | Gate | Rule | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-SCORE-001 | MUST | | Weights: task usability and speed 25; reliability and recovery 20; visual and interaction craft 15; accessibility and inclusion 15; performance and efficiency 15; security and data trust 10; each scored 0-4 on evidence | Scorecard file | REVIEW | SCR |
| PX-SCORE-002 | MUST | | PASS: total 85 or more, zero open gates (an applicable gate that is NOT_ASSESSED counts as open) and no dimension below 2. CONDITIONAL: zero open gates, no dimension at 0, total 70-84 or any dimension at 1 (a 1 caps the verdict at CONDITIONAL), every shortfall owned and dated, and written acceptance by the product owner and the Lead Developer; pilot or limited rollout only. Otherwise BLOCKED | Verdict record | SIGN | SCR |
| PX-SCORE-003 | SHOULD | | Benchmark targets: input acknowledgement p95 100 ms; common task 20% faster than baseline; crash-free sessions 99.9%; startup and scroll budgets set after profiling | Measurement records | TRACE, STUDY | SCR |

## BLACKLIST

| ID | Lvl | Gate | Banned pattern | Check | Ev | Refs |
|---|---|---|---|---|---|---|
| PX-BLACKLIST-001 | MUST | | Pretty but unusable: decorative art above tasks, tiny muted text, giant whitespace in data entry, hidden primary actions, modal chains | Review | REVIEW | APB |
| PX-BLACKLIST-002 | MUST | 02 | False confidence: success before acknowledgement, fabricated totals, charts without units, ambiguous offline state, stale clinical values shown as live | Review and tests | UIT, REVIEW | APB |
| PX-BLACKLIST-003 | MUST | | Generated inconsistency: mixed radii and icon sets, random gradients, invented navigation, copied brand assets, mismatched terminology | Lint and glossary check | LINT | APB |
| PX-BLACKLIST-004 | MUST | | Performance vanity: live full-screen blur, animation loops, full-resolution images in lists, excessive polling | Traces | TRACE | APB |
| PX-BLACKLIST-005 | MUST | | Engagement manipulation: artificial streaks, notifications without operational value, forced check-ins, gamification that pressures workers | Feature review | REVIEW | APB |
| PX-BLACKLIST-006 | MUST | | Unverifiable quality: approval from static images, no device tests, no accessibility evidence, no error states, no audit of critical workflows | Gate review | REVIEW | APB |
