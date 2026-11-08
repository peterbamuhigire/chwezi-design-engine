# Worked review: a POS checkout against the Product Excellence Standard

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

This is an original, fictional example. The shop, people, devices, figures and findings are
invented to show how a reviewer applies the standard to a Maduuka-style retail checkout. Use it as
a model for the shape of a review: scope, evidence, findings with rule IDs, scorecard, decision and
remediation. Rule IDs are defined in [rules-catalogue.md](../references/rules-catalogue.md); the
scorecard method is in [scorecard-and-release-gate.md](../references/scorecard-and-release-gate.md).

## Scope

| Item | Entry |
|---|---|
| Product and profile | Maduuka-style POS, retail profile (PX-PROFILE-001, -002) |
| Tenant (fictional) | "Example Hardware", Ntinda branch; single currency UGX |
| Screen under review | Checkout: scan or search, cart, tender, receipt |
| Build | Android release candidate 4.3.0-rc2, targetSdk 36, CMP 1.12.2; web back-office not in scope |
| Roles | Cashier (primary), supervisor (overrides) |
| Core journey | Scan 3 items, change a quantity, take mobile-money payment, issue receipt |
| Reviewer | Independent verifier from another team (PX-QA-006); the implementer did not review |
| Date | 2026-11-12 (fictional) |

## Evidence gathered

| Evidence | Device or method | Class |
|---|---|---|
| Baseline device profile | Floor device "Example A10", 3 GB RAM, Android 12, 360 x 760 dp; from the client's crash analytics, Oct 2026 | MEASURED |
| 25 scripted sales, 3G-like profile and airplane mode | Floor device, Macrobenchmark plus manual script | MEASURED |
| Mobile-money sandbox with delayed, late and duplicate callbacks | Provider sandbox | MEASURED |
| API permission tests with a cashier token | HTTP test suite | MEASURED |
| TalkBack pass of the core journey; 200% font scale; Force RTL with Arabic strings | Floor device | MEASURED |
| Screenshots: compact phone, 10-inch tablet portrait and landscape, light and dark | Floor device and tablet | MEASURED |
| Five-second test and cashier session | Not run (no cashier available this cycle) | NOT_ASSESSED |

Sample cart used in every test (fictional prices, UGX, no minor unit):

| Item | Qty | Unit price | Line |
|---|---|---|---|
| Cement 50 kg | 2 | 34,000 | 68,000 |
| Iron sheet, 3 m | 10 | 32,500 | 325,000 |
| Wire nails, 1 kg | 3 | 6,500 | 19,500 |
| **Total** | | | **412,500** |

## Findings

Severity: **Hard fail** = on the hard-fail list, blocks release regardless of score. **Major** = a
MUST rule fails. **Minor** = a SHOULD rule misses or a polish issue.

| # | Finding | Rule IDs | Severity | Evidence |
|---|---|---|---|---|
| F1 | After the provider accepts the request, the screen shows a green tick and "Paid" and enables "Print receipt", before the customer approves on their phone. In 3 of 25 sales the customer then declined, leaving a receipt marked paid | PX-DATA-010, PX-OFFLINE-003, PX-STATE-002 | Hard fail PX-GATE-02 (pending shown as confirmed) | Sandbox log; screenshots F1-a, F1-b |
| F2 | A fast double tap on Pay sends two payment requests; one sale received two prompts on the customer's phone. No idempotency key is sent | PX-INTERACT-002 | Hard fail PX-GATE-01 (duplicate in retry tests) | Double-tap test: 10 runs, 4 duplicates |
| F3 | The 10% cashier discount cap is enforced only by disabling the field; the API accepted a 50% discount from a cashier token | PX-PRIV-001 | Hard fail PX-GATE-04 (permission enforced only in UI) | API test PT-07 |
| F4 | Amounts render as `412,500.00`; the price keypad accepts a decimal point | PX-DATA-011, PX-L10N-001, PX-INTERACT-016 | Hard fail PX-GATE-03 (wrong currency minor unit) | Screenshot F4; formatter test missing for UGX |
| F5 | An offline sale shows receipt number `INV-000231` as final while still queued; after sync the server issued `INV-000233`, so the printed paper receipt and the ledger disagree | PX-DATA-013, PX-OFFLINE-003 | Hard fail PX-GATE-13 (provisional number shown as final) | Airplane-mode run, sale 7 |
| F6 | "Clear cart" sits directly beside Pay, same size and same filled style; the cart clears with no undo | PX-DESTRUCT-001, PX-DESTRUCT-002, PX-INTERACT-004 | Major | Screenshot F6 |
| F7 | Unknown barcode shows a 2-second toast "Not found" that TalkBack does not announce; no search or add path | PX-INTERACT-015, PX-A11Y-012, PX-STATE-005 | Hard fail PX-GATE-06 (status message not announced) | TalkBack log; scan test |
| F8 | Offline banner says "Offline" only: no last-sync time, no queue count, cannot be tapped | PX-OFFLINE-001 | Major | Screenshot F8 |
| F9 | On the targetSdk 36 build the floating total bar sits under the gesture navigation area; the bottom 12 dp of Pay is not tappable | PX-GEOM-002, PX-GEOM-005 | Major | Screenshot with gesture nav; layout inspector |
| F10 | The checkout was portrait-locked. On the 10-inch tablet (sw600dp) the lock is ignored (currentness M9), and in landscape the cart stretches to 1,280 dp wide with the total off to the right edge | PX-LAYOUT-001, PX-LAYOUT-002, PX-NAV-002 | Major | Tablet screenshots |
| F11 | At 200% font scale the total truncates to `412,5...` with no accessible full value; Pay stays visible | PX-TYPE-002, PX-TYPE-005 | Hard fail PX-GATE-07 (essential value truncated with no accessible full value; Pay survives) | Screenshot F11 |
| F12 | A seven-day sales sparkline sits in the checkout header | PX-DATA-008, PX-PROFILE-002 | Major | Screenshot F12 |
| F13 | Each scan recomposes the whole screen; scan-to-cart-line p95 is 340 ms on the floor device | PX-PERF-004 (MUST); target from the POS blueprint (SHOULD, 150 ms) | Major for PX-PERF-004; Minor for the target | Trace TR-3; recomposition counts |
| F14 | The "Waiting" spinner after a timeout has no limit or recovery action; after 90 s the cashier restarted the app | PX-INTERACT-003 | Major | Stalled-network test |
| F15 | Change due is shown at 14 sp in muted text | PX-INTERACT-016, PX-TYPE-003 | Minor | Screenshot F15 |
| F16 | The Pay button's accessible name is "Button" | PX-A11Y-001 | Hard fail PX-GATE-06 (missing accessible name) | TalkBack log |

What passed and should be kept:

- Tabular figures in the cart and total; columns right-aligned (PX-TYPE-004).
- Contrast table for light and dark both pass; the next-step accent is used once (PX-COLOUR-001,
  -004).
- Cart survives process death and back navigation (PX-INTERACT-006).
- Tokens only in screen code; guardrail test clean (PX-TOKEN-001).
- Predictive back: no `onBackPressed` logic; back during tender asks to keep or discard the sale
  (PX-NAV-003).
- RTL: layout mirrors; amounts and barcodes do not (PX-L10N-003).
- Crash and ANR rates in the beta channel are below the Play core-vital thresholds (CR:P1).

## Scorecard

Each dimension is scored 0-4 against its evidence and scaled by weight / 4.

| Dimension | Weight | Score (0-4) | Points | Reason |
|---|---|---|---|---|
| Task usability and speed | 25 | 2 | 12.5 | Journey works, but F6, F10, F12 add risk; usability study NOT_ASSESSED |
| Reliability and recovery | 20 | 0 | 0 | Hard fails F1, F2; F5 and F14 |
| Visual and interaction craft | 15 | 3 | 11.25 | Tokens, tabular figures, contrast good; F6, F15 |
| Accessibility and inclusion | 15 | 0 | 0 | Hard fails F7, F11, F16; RTL and contrast pass |
| Performance and efficiency | 15 | 2 | 7.5 | Measured on floor device; F13 over budget |
| Security and data trust | 10 | 0 | 0 | Hard fails F3, F4, F5 (permission, money display, numbering) |
| **Total** | **100** | | **31.25** | |

Hard-fail gates open: PX-GATE-01 (F2), PX-GATE-02 (F1), PX-GATE-03 (F4), PX-GATE-04 (F3),
PX-GATE-06 (F7, F16), PX-GATE-07 (F11) and PX-GATE-13 (F5).

## Decision

**BLOCKED.** Seven hard-fail gates are open, three dimensions score 0, and the score is 31.25,
below 70. A higher score would
not change the decision while any hard fail is open. The release candidate does not ship to any
tenant. The NOT_ASSESSED usability evidence must also be gathered before a PASS is possible.

## Remediation plan

Owners are roles; dates are fictional.

| # | Fix | Owner | Due | Verification |
|---|---|---|---|---|
| F1 | Implement the payment state machine: initiated, pending ("Waiting for customer to approve on phone"), confirmed, failed, timed out, reversed. "Paid" and receipt only on provider confirmation; provider reference on receipt | Engineering lead | 2026-11-18 | Sandbox suite: delayed, declined, late and duplicate callbacks; kill during pending |
| F2 | Generate an idempotency key at commit, store it with the sale, send it on every retry; disable Pay while initiated | Engineering lead | 2026-11-18 | Double-tap 10 times = 1 request; timeout-then-retry = 1 charge |
| F3 | Enforce discount caps per role on the server; supervisor PIN override recorded in the audit trail | Backend lead | 2026-11-18 | API test PT-07 denies; override appears in history view |
| F4 | Format by ISO 4217 minor unit; no decimal key for UGX | Engineering | 2026-11-20 | Formatter tests for UGX, RWF, KES, USD; UGX 1,234,567 renders without decimals |
| F5 | Show "Provisional" on offline receipts; allocate the number at issue on the server; reprint after sync marked with the final number | Engineering, product owner | 2026-11-20 | 20 offline sales, reconnect: numbers contiguous, provisional tags replaced |
| F6 | Move Clear cart into the cart menu, outlined `danger`, with undo for 10 s | Design lead | 2026-11-20 | Screenshot review; undo test |
| F7 | Not-found panel that stays until dismissed, is announced, and offers search with the code prefilled | Design lead, engineering | 2026-11-20 | TalkBack log; scan test |
| F8 | Offline banner with last-sync time and queue count, opening the sync queue | Engineering | 2026-11-20 | Offline screenshots |
| F9 | Apply navigation-bar insets to the total bar | Engineering | 2026-11-19 | Gesture and 3-button nav screenshots; hit-area measurement |
| F10 | Remove the orientation lock; two-pane tablet layout (products left, cart and total right) | Design lead, engineering | 2026-11-25 | Rotate and resize on sw600dp; cart and drafts survive |
| F11 | Total row wraps; the full amount is the accessible value | Engineering | 2026-11-20 | 200% screenshots; TalkBack reads "Total, 412,500 Uganda shillings" |
| F12 | Remove the sparkline from checkout | Product owner | 2026-11-19 | Screenshot |
| F13 | Narrow state reads; stable keys; per-line recomposition only | Engineering | 2026-11-25 | Trace: scan-to-line p95 <= 150 ms on floor device |
| F14 | 20 s timeout with Check status, Keep working and Cancel | Engineering | 2026-11-20 | Stalled-network test |
| F15 | Change due as a large figure in ink | Design lead | 2026-11-20 | Screenshot |
| F16 | Accessible name "Pay 412,500 Uganda shillings" | Engineering | 2026-11-19 | TalkBack log |
| Gap | Run a five-second test and a 45-minute cashier session at the branch | Design lead | 2026-11-27 | Study log with task success, wrong taps, re-entries |

## Re-review (fictional, 2026-11-28)

All remediation items were verified by the same independent reviewer with MEASURED evidence. No
hard fail is open.

| Dimension | Weight | Score | Points |
|---|---|---|---|
| Task usability and speed | 25 | 4 | 25 |
| Reliability and recovery | 20 | 4 | 20 |
| Visual and interaction craft | 15 | 3 | 11.25 |
| Accessibility and inclusion | 15 | 3 | 11.25 |
| Performance and efficiency | 15 | 3 | 11.25 |
| Security and data trust | 10 | 4 | 10 |
| **Total** | 100 | | **88.75** |

**PASS**: 88.75 is at least 85 and zero hard fails are open. No dimension is below 2. Sign-off
recorded by the independent verifier, the product owner, a finance domain reviewer and the Lead
Developer (PX-QA-008). Residual minor items
(a craft polish list and a scan p95 of 140 ms, inside budget but close) go to the next release
backlog with owners.

## What this example teaches

- Hard fails decide before the score: the first review would still be BLOCKED at 95 points.
- Most serious findings were about truth, not looks: "Paid" before payment, a duplicate charge, a
  permission only in the UI, a receipt number that changed. Review these first.
- Platform changes create new failures in old screens: targetSdk 36 broke an inset and a
  portrait lock that had passed earlier reviews.
- Zero-decimal currencies need explicit tests; the bug hides in a shared formatter.
- Record what you could not test (here, the usability study) as NOT_ASSESSED; it is an open gap,
  not a pass.
