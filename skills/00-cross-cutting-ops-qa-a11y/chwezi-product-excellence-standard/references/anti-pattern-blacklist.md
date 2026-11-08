Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Anti-pattern blacklist

Use this file during design review, code review and release verification to catch patterns
that are banned in every Chwezi app. Each entry names the pattern, why it harms the user, the
business or performance, how to detect it, the correction, and the rule it breaks. A
blacklisted pattern found on a core journey is a finding; one that trips a hard-fail gate
(`scorecard-and-release-gate.md`) blocks release.

Detection methods: **VR** visual review of screenshots; **LINT** static check or guardrail
test; **TEST** automated or scripted test; **PROF** profiler or trace on the baseline device;
**AT** assistive-technology run; **AUD** audit of copy, data or logs.

## Pretty but unusable (PX-BLACKLIST-001)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-01 | Decorative hero art or banner above a task screen | Pushes the task below the fold on 5-6 inch phones; slows the first action | VR at compact width: first action visible without scrolling | Remove from task screens; keep identity art on hub or marketing surfaces | PX-LAYOUT-006 |
| AP-02 | Tiny muted text carrying essential data | Unreadable outdoors and for older users; contrast failure | VR + contrast table; check essential data at body size | Body size or a labelled field; metadata only for non-essential detail | PX-TYPE-003, PX-COLOUR-001 |
| AP-03 | Giant whitespace bands in data entry | Extra scrolling per record, fatigue across a shift | VR; count scrolls per form | Dense, grouped form on the spacing scale | PX-LAYOUT-006 |
| AP-04 | Primary action hidden in an overflow menu or only on swipe | Users cannot find the next step; swipe is invisible to screen readers | VR; AT; five-second test | One visible primary action; swipe always mirrored by a visible control | PX-INTERACT-004, PX-INTERACT-013 |
| AP-05 | Modal chains (dialog opens dialog) on routine work | Lost context, accidental dismissal, broken focus | TEST: modal depth on core tasks | One modal layer at most; use inline steps or a sheet | PX-INTERACT-013 |
| AP-06 | Several equally loud filled buttons on one panel | No obvious next step; wrong-button errors | LINT/VR: count primary-emphasis controls | One accent next step; others tonal or text | PX-INTERACT-004, PX-COLOUR-004 |
| AP-07 | Placeholder-only form labels | Label disappears while typing; memory load; screen-reader gaps | VR of a filled field; AT | Persistent visible label | PX-FORM-001 |
| AP-08 | Confirmation dialog on harmless, reversible actions | Trains users to tap "OK" blindly, so real warnings fail | AUD: tag each dialog with its protected reason | Undo for reversible; confirm only money, health, privacy, irreversible | PX-INTERACT-008 |

## False confidence (PX-BLACKLIST-002)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-09 | Success toast before server acknowledgement | Cashier releases goods for an unpaid sale; disputes | TEST with delayed or failed server response | Show "Sending" then the confirmed state from the server | PX-STATE-002 |
| AP-10 | Queued mobile-money or card payment shown as "Paid" | Direct cash loss; double charge on retry | TEST state machine with late callback and timeout | Full payment state model; only provider-confirmed is paid | PX-OFFLINE-003, PX-DATA-010 |
| AP-11 | Fabricated or sample totals in production | Wrong business decisions; destroys trust | LINT build check for fixtures; AUD | Real data or an honest empty state; demo data labelled | PX-DATA-001 |
| AP-12 | Charts without units, period or source | Misread figures; percent vs percentage point confusion | VR checklist | Units, period, source, text interpretation | PX-VIZ-005, PX-DATA-003 |
| AP-13 | Ambiguous offline state (no last-sync time, no queue count) | Users do not know whether work was saved; duplicate entry | VR offline screenshots | Last sync time, queue count, per-item status | PX-OFFLINE-001 |
| AP-14 | Stale clinical or stock values shown as live | Clinical harm; overselling stock | TEST with cached data; VR for age label | Show age and source; block decisions on expired data | PX-OFFLINE-004, PX-DATA-006 |
| AP-15 | Spinner with no timeout | User waits forever or force-quits mid-transaction | TEST network stall | Timeout plus retry, keep working offline, or cancel | PX-INTERACT-003 |
| AP-16 | "0%" or delta chip when there is nothing to compare | Implies a measured change that does not exist | VR of first-period data | Hide delta; say "No earlier period" | PX-DATA-002 |

## Generated inconsistency (PX-BLACKLIST-003)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-17 | Mixed corner radii and icon sets across screens | Product reads as patched together; lowers trust | LINT distinct radius values; dependency check for icon sets | One radius token set; one line-icon family plus one illustration style | PX-GEOM-008 |
| AP-18 | Random or decorative gradients on task screens | Visual noise; contrast failures on text over gradient | LINT gradient brushes outside approved tokens | Solid or tonal surfaces | PX-COLOUR-006 |
| AP-19 | Invented navigation destinations or menu items | Dead ends; users hunt for features that do not exist | AUD nav graph vs product IA | Navigation from the IA only | PX-NAV-004 |
| AP-20 | Copied brand assets, layouts or illustrations from a reference product | Legal and reputational risk; generic look | VR against reference dossiers; rights check | Translate the principle; author Chwezi assets | PX-MANDATE-004 |
| AP-21 | Mismatched terminology ("Invoice", "Bill", "Receipt" for one thing) | Training cost; wrong document issued | AUD glossary check across strings | One product glossary per language | PX-L10N-004 |
| AP-22 | Raw colour or size literals in screen code | Theme swap and dark mode break; drift | LINT guardrail test (ratchet only falls) | Semantic tokens | PX-TOKEN-001 |
| AP-23 | Framework default or banned typeface left as primary | Generic, untuned rendering; fails the design engine slop gate | LINT theme file; slop audit | House-style pair from the typography skills | PX-TYPE-007 |
| AP-24 | A product theme that recolours success, warning or danger | Colour stops meaning the same thing across products | TEST theme diff: only brand keys differ | Brand tokens only | PX-TOKEN-004 |

## Performance vanity (PX-BLACKLIST-004)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-25 | Full-screen live blur or translucency in the content layer | Dropped frames and battery drain on budget phones | PROF frame trace | Solid or tonal surfaces; opaque fallback | PX-PERF-004, PX-MOTION-003, PX-COLOUR-010 |
| AP-26 | Looping or idle decorative animation | Constant redraw, battery drain, distraction | PROF idle trace: frames after settle = 0 | Animate only on state change | PX-MOTION-003 |
| AP-27 | Full-resolution images in scrolling lists | Memory pressure, jank, crashes on low-RAM devices | PROF memory; image request size vs rendered size | Thumbnails at display size; capped cache | PX-PERF-005 |
| AP-28 | Excessive background polling | Battery and mobile-data cost; Android background limits | PROF energy and network logs | Batched, constraint-aware sync; push where available | PX-PERF-007 |
| AP-29 | Nested same-axis scrolling and deep nested layouts | Janky scroll, lost gestures, measure cost | PROF layout inspector | One scroll container per axis; flatten | PX-LAYOUT-005 |
| AP-30 | Large uploads on mobile data without consent | Spends the user's airtime; failed uploads | TEST on metered network profile | Wait for Wi-Fi or ask; compress first | PX-PERF-011 |
| AP-31 | Animated count-up or chart grow-in on operational screens | Delays reading of totals during repeat work | VR; timing with motion on vs off | Summary pages only, once per visit, <= 1.2 s, off under reduced motion | PX-MOTION-005 |

## Engagement manipulation (PX-BLACKLIST-005)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-32 | Artificial streaks, badges or leaderboards for workers | Pressures staff; rewards speed over accuracy | AUD feature review | Progress shown as work done, never as pressure | PX-BLACKLIST-005 |
| AP-33 | Notifications without operational value; permission asked at first launch | Users mute the app and miss critical alerts | AUD notification inventory; TEST permission timing | Operational notifications only, asked at first moment of value | PX-NOTIFY-001 |
| AP-34 | Forced check-ins or "rate us" prompts in a work flow | Interrupts transactions; erodes goodwill | TEST core journey for interruptions | None in task flows | PX-BLACKLIST-005 |
| AP-35 | Confetti or celebration for routine transactions | Slows repeat work; trivialises money and care | VR; animation register | Quiet confirmation and a clear receipt | PX-INTERACT-012 |
| AP-36 | Default-on analytics or tracking before consent | Privacy breach; legal exposure | TEST network capture on fresh install | Opt-in, no PII or PHI in events | PX-PRIV-005, PX-PRIV-010 |

## Unverifiable quality (PX-BLACKLIST-006)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-37 | Screens approved from static images | Errors, offline and permission states never seen | AUD evidence pack | Device, test and accessibility evidence | PX-QA-004 |
| AP-38 | Emulator-only performance claims | Real budget phones behave differently | AUD trace metadata | Real baseline device traces | PX-PERF-002 |
| AP-39 | "Accessible" claimed with no assistive-technology log | False compliance claim | AUD accessibility log | Logged screen-reader and keyboard passes or `NOT_ASSESSED` | PX-A11Y-002, PX-QA-012 |
| AP-40 | Implementer verifies their own work | Blind spots repeat; gates pass by default | AUD sign-off record | Independent verifier | PX-QA-006 |

## Data, money and privacy hazards (extension)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-41 | "USh 45,000.00" or any hard-coded two decimals | Wrong for zero-minor-unit currencies; looks foreign to users | TEST formatter per currency | Minor units from ISO 4217 and locale data | PX-L10N-001, PX-DATA-011 |
| AP-42 | Mixing currencies in one total | Meaningless sums; financial error | TEST multi-currency fixtures | Separate totals; conversion shows rate, source and time | PX-DATA-011 |
| AP-43 | Due, received and reconciled shown as one "Paid" figure | Overstated cash; disputes with tenants | AUD ledger UI states | Three distinct states and labels | PX-DATA-005 |
| AP-44 | Document number from COUNT+1, MAX+1 or at draft; numbered document deleted | Gaps and duplicates in fiscal series; audit failure | TEST concurrent issue; AUD delete paths | Locked per-tenant counter at issue; void, never delete; provisional tag offline | PX-DATA-013 |
| AP-45 | Permission enforced only by hiding a control | Any user with the API can act | TEST low-role token | Backend enforcement; hide or disable with reason | PX-PRIV-001, PX-PRIV-006 |
| AP-46 | Patient, payroll or credential screens visible in recents or screenshots | Data leak on shared devices | TEST recents snapshot | Platform secure flag or snapshot hiding | PX-PRIV-007 |
| AP-47 | Shared device with no idle lock, or locking that discards the cart | Transactions attributed to the wrong user, or lost work | TEST idle and user-switch | Tenant-configured idle lock with warning; work preserved | PX-PRIV-008 |
| AP-48 | Preselected consequential choice (drug, dose, discount, tax exemption) | Clinical or financial harm | AUD defaults register | Safe, reversible defaults only | PX-INTERACT-009 |

## Localisation and layout hazards (extension)

| ID | Pattern | Why it harms | Detect | Correction | Rule |
|---|---|---|---|---|---|
| AP-49 | Concatenated sentences and English-only plurals | Broken grammar in Luganda, Swahili, French, Arabic, Kinyarwanda, Spanish | LINT string resources; pseudo-localisation | ICU messages with plural rules | PX-L10N-005 |
| AP-50 | Left/right instead of start/end; mirrored numbers or logos | Broken Arabic layout; unreadable codes | TEST forced RTL; VR | Logical properties; bidi isolation; mirror only directional controls | PX-L10N-003, PX-L10N-008 |
| AP-51 | Portrait-locked tablet or POS layouts | Ignored at sw600dp for targetSdk 36 apps, so layouts break (CR:M9) | TEST on a 600dp+ device in landscape | Adaptive layouts per window class | PX-LAYOUT-001, PX-NAV-001 |
| AP-52 | Gesture-only actions on glove or field screens | Unusable with gloves, wet hands or in sunlight | TEST glove trial; target audit | 56 dp targets, single-tap alternatives | PX-GEOM-009, PX-INTERACT-018 |

## Review prompt

For each finding record: entry ID, screen, evidence link, evidence class, severity (hard fail,
major, minor), owner and due date. Repeat findings across releases go to the product's Kaizen
backlog with the rule ID so the pattern is fixed at the component level, not screen by screen.
