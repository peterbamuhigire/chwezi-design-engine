# Offline integrity and low-end performance

Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Use this reference when you define the device a product must run well on, set or check
performance budgets, design offline and sync behaviour, or design a mobile-money or card payment
flow. Chwezi users work on budget Android phones, on shared counters, in clinics and in the field,
over networks that drop and data that costs money. The rules here make that the first design
target, not an afterthought (PX-MANDATE-005). Rule IDs are in [rules-catalogue.md](rules-catalogue.md);
platform facts cite IDs in [currentness-register.md](currentness-register.md).

## Task 1: define the baseline device

Every project records a baseline device profile and a declared OS/API floor before performance
work starts (PX-PERF-001). "Works on all phones" is never a claim.

### Procedure

1. **Gather fleet evidence.** In order of preference: install and crash analytics for the
   product (device model, RAM, OS version); the client's device inventory; a field survey at
   two or three sites; support tickets. Record the source and its date.
2. **Pick two devices.**
   - *Floor device*: the weakest device the product supports, normally the lowest-RAM, oldest-OS
     device that still holds a material share of the fleet. All MUST budgets are measured here.
   - *Typical device*: the median device in the fleet. SHOULD targets and user studies use it.
3. **Record the profile** in the repository (for example `docs/quality/baseline-device.md`):

   | Field | Example entry (fictional) |
   |---|---|
   | Model and SoC | "Example A10, 8-core entry-level SoC" |
   | RAM / free storage | 3 GB / 4 GB free |
   | OS and API level | Android 12 (API 31) |
   | Screen | 360 x 760 dp, 2.0x density |
   | Network profiles | 3G-like (400 kbps, 300 ms RTT, 2% loss) and offline |
   | Dataset | 5,000 products, 20,000 customers, 90 days of sales |
   | Distribution channel | Play, or sideloaded / other store (affects Baseline Profiles, see Task 5) |
   | Evidence source and date | Crash analytics export, 2026-10-30 |

4. **Declare the OS/API floor** (`minSdk`) from the same evidence. Raising it is a product
   decision recorded in a DDR, with the share of users affected.
5. **Use a real device.** Emulator-only evidence does not pass a performance gate (PX-PERF-002).
   If no physical floor device is available, the gate is NOT_ASSESSED and blocks PASS.
6. **Re-check yearly** or when analytics show the fleet has moved.

No market statistic about East African device fleets is asserted in this standard; each project
measures its own.

## Task 2: render cheaply

Rendering rules (PX-PERF-004, MUST):

- Solid or tonal surfaces; static backgrounds. No large blurred surfaces, no live full-screen
  blur, no oversized vector paths (PX-BLACKLIST-004).
- Lazy lists with stable, deterministic keys. Virtualise any list that can exceed 50 rows.
- Minimal nested measurement; no nested scrolling on the same axis (PX-LAYOUT-005).
- Bounded recomposition: no whole-screen recomposition per keystroke or per scanned item. Read
  frequently changing values (scroll offset, timers) in the narrowest scope possible.
- Charts redraw only when their data changes; no constantly animating charts (PX-MOTION-003).
- Stable, immutable UI models so the framework can skip unchanged parts.

Checks: Compose layout inspector recomposition counts on the core task; a trace of the core task
on the floor device; lint for the patterns above.

## Task 3: handle data and media

| Rule | Detail | ID |
|---|---|---|
| Page long records | Server paging or cursor paging; never load a full history into memory | PX-PERF-006 |
| Thumbnails in lists | Request and decode images at display size; never a full-resolution image in a scrolling list | PX-PERF-005 |
| Compress before upload | Client-side resize and compression; strip location metadata unless the task needs it | PX-PERF-005, PX-PRIV-004 |
| Intentional caches | Memory caches have a cap; disk caches have a size and an eviction rule | PX-PERF-005 |
| Bounded chart points | Downsample large series to the points the chart can show; keep spikes (see [data-trust-and-visualisation.md](data-trust-and-visualisation.md)) | PX-PERF-006, PX-VIZ-001 |
| Scale test | A dataset of 10x production size scrolls within budget | PX-PERF-006 |

Chwezi default media budgets (owner to confirm; SHOULD, measured per product): uploaded photos
resized to at most 1600 px on the long edge and about 300 KB; list thumbnails at most 2x the
displayed size. Products with clinical or legal evidence photos record their own floor in a DDR,
because over-compression can destroy evidence.

## Task 4: keep offline work honest

### Record states

Every mutable record, and every action that writes, moves through these states. The label shown
always matches the backend truth (PX-STATE-002).

| State | Meaning | What the user sees | Never |
|---|---|---|---|
| Draft | Being edited on this device; not submitted | "Draft", editable, saved locally on every change | Lost on back, kill or crash (PX-INTERACT-006) |
| Queued | Submitted on this device; waiting for the server | "Saved on this device, waiting to send" with `info` styling and a pending count | Shown as confirmed, paid, issued or synced (PX-OFFLINE-003) |
| Syncing | Being sent now | Progress with a count; the user can keep working | Blocks the screen |
| Confirmed | Server acknowledged and stored | "Saved" or the domain word ("Paid", "Issued"), with the server number and time | Shown before server acknowledgement |
| Conflict | Server copy changed since the local edit | Both versions with who and when; the authorised user chooses or merges | Resolved silently, or a financial or clinical edit dropped (PX-STATE-006) |
| Failed | Server rejected it, or retries are exhausted | Plain reason, what is still safe, and the next action (fix, retry, contact) | Hidden in a log; red styling for an ordinary wait |

### Integrity rules (MUST)

1. **Durable local saves.** A queued action survives process death and reboot (PX-OFFLINE-002).
2. **Idempotency key on every create and payment.** The key is generated once when the user
   commits, stored with the queued item, and sent on every retry. The server returns the original
   result for a repeated key. Replays, double taps and timeouts produce exactly one record
   (PX-INTERACT-002). The key is durable on the document row, so a replay also returns the same
   document number (standing numbering rule).
3. **Provisional numbers.** A document created offline shows a clearly provisional tag until the
   server allocates its contiguous number at issue (PX-DATA-013). Never show a locally invented
   number as final.
4. **Last-sync display.** Every screen that can show cached data shows the time of the last
   successful sync ("Updated 14:02" or "Updated 3 h ago"), the pending queue count and any
   conflict (PX-OFFLINE-001). Tapping the indicator opens the sync queue.
5. **Never claim server confirmation for queued work.** "Saved" without qualification means the
   server has it. Queued work says "on this device" (PX-OFFLINE-003).
6. **No silent sync results.** Failures and conflicts reach the user who owns them, with a deep
   link (PX-OFFLINE-005).
7. **Ordered replay.** The queue replays in order (FIFO) per record, so a later edit never lands
   before the create. Queue limits (maximum age, maximum size) are product rules and are shown
   when reached.
8. **Stable offline banner.** Hold a connectivity state for at least 3 s before switching the
   banner, so a flaky network does not flash. The banner cannot be dismissed while conflicts
   exist, and its changes are announced politely.
9. **Tenant rules decide what may queue.** Some actions (for example a credit sale over a limit)
   must be blocked offline. The blocked state says why and what to do.

Checks: kill the app and reboot mid-queue, then sync: one server record each. Airplane mode for
20 actions, reconnect: 20 synced in order. Forced conflict: resolution UI appears, nothing lost.
Label audit: every label maps to a backend condition.

## Task 5: mobile-money and card payment state machine

Mobile-money payments are asynchronous: the customer approves on their own phone, and the
provider confirms later, sometimes late. The UI must never call a payment paid before the
provider says so (PX-DATA-010).

```text
initiated --> pending --> confirmed
                 |  \--> failed
                 |  \--> timed-out --(status query)--> confirmed | failed | pending
confirmed --> reversed  (refund or provider reversal, with reason and actor)
```

| State | Trigger | UI rule |
|---|---|---|
| Initiated | Cashier commits the payment; idempotency key created; request sent | "Sending payment request". The Pay control is disabled to block a second request. The cart stays visible |
| Pending | Provider accepted the request; prompt sent to the customer's phone | "Waiting for customer to approve on phone", amount, masked phone number, elapsed time, and a "Check status" action. `info` styling, not `danger`. The cashier may park the sale and serve the next customer |
| Confirmed | Provider callback or a verified status query says success | "Paid", provider transaction reference, time. Only now is a receipt issued as paid, and the sale is final |
| Failed | Provider reports failure (declined, insufficient funds, cancelled) | Plain reason from the provider, "No money was taken", and the next actions: try again (a new attempt with a new key), another method |
| Timed out | No final answer within the product's timeout | "We have not heard back yet. Do not charge again." The only actions are "Check status" (same key) and "Choose another method" after the status query returns failed. Never auto-retry a charge |
| Reversed | Refund or provider reversal after confirmation | "Reversed", with reason, who, when and the reversal reference; the receipt is marked; the ledger shows both entries |

Additional MUST rules:

- A late callback after "timed out" updates the record and notifies the cashier; it never
  creates a second sale.
- Reopening the app during a pending payment shows the same pending payment with the same key;
  the final state resolves by status query.
- Split tender (cash plus mobile money plus card) shows the remaining balance after each part;
  the sale completes only when every part is confirmed.
- Due, received and reconciled are separate states and labels in every ledger view
  (PX-DATA-005).
- The provider brand name may appear as the method label in a product; the standard names no
  provider.

Checks: a state-machine test with simulated callbacks, late callbacks, duplicate callbacks and
timeouts; kill-during-pending test; double-tap Pay 10 times yields one request.

## Task 6: set measurable performance gates

Budgets come from measurement on the floor device, and a release may not regress beyond the
agreed budget (PX-PERF-003). Never promise 60 fps on all old hardware.

### Android: platform thresholds (what Play measures)

| Metric | Threshold | Status in Play | Source |
|---|---|---|---|
| User-perceived crash rate | 1.09% overall; 8% per phone model | Core vital (bad behaviour) | P1 |
| User-perceived ANR rate | 0.47% overall; 8% per phone model | Core vital | P1 |
| Excessive partial wake locks | 5% overall | Core vital | P1 |
| Memory and bitmap memory | Per RAM tier; for example 4 GB tier foreground 2.00 GB; bitmap 200 MB (perceived services or background) and 400 MB (cached) | Core vital; may affect store visibility from February 2027 | P1, P2 |
| Slow frames / frozen frames | Slow > 16 ms; frozen > 700 ms; excessive = > 50% slow frames or > 0.1% frozen frames per session | Diagnostic; no published bad-behaviour threshold | P3 |
| Startup (TTID) | Excessive: cold >= 5 s; warm >= 2 s; hot >= 1.5 s (one Google page) or >= 1 s (another) | Diagnostic | P5 |

Play evaluates the last 28 days (P1). Slow frames, frozen frames and startup are **not** core
vitals; do not describe them as such.

### Chwezi internal gates (stricter, measured on the floor device)

| Gate | Target | Level |
|---|---|---|
| Crash and ANR | Below the Play core-vital thresholds at all times; product SLO set per release (PX-PERF-013) | MUST |
| Crash-free sessions | >= 99.9% of user sessions, rolling 28 days, per platform, after stabilisation | SHOULD (PX-PERF-009) |
| Hot start | <= 1 s TTID | SHOULD (stricter than both Google figures) |
| Cold and warm start | Budget set from the first measured release; no regression beyond it | MUST (PX-PERF-003) |
| Time to full display | Measured with `ReportDrawn`, `ReportDrawnWhen` or `ReportDrawnAfter` in Compose (P6); returning user reaches the first meaningful action within the product's budget (PX-NAV-006) | MUST to measure; budget per product |
| Input acknowledgement | p95 <= 100 ms input-to-feedback | SHOULD (PX-INTERACT-001) |
| Scan to cart line | p95 <= 150 ms on the POS profile | SHOULD (POS blueprint) |
| Frames | Core task trace shows no frozen frames; slow-frame share recorded per release; frame budget 16 ms at 60 Hz, 11 ms at 90 Hz, 8 ms at 120 Hz (P4) | MUST to record; budget per product |
| Memory | Below the RAM-tier vitals threshold for the floor device; no bitmap growth across a 30-minute session | MUST |

### Tooling

- **Baseline Profiles** with the Baseline Profile Gradle plugin, generated by Macrobenchmark
  (`benchmark-macro-junit4` 1.5.0 or later recommended; `profileinstaller` 1.4.1; AGP 8.0+). Google
  reports about 30% faster code execution from first launch. Keep the binary profile under
  1.5 MB. Add a Startup Profile for DEX layout gains (P7). MUST for every Android product.
- **Distribution caveat.** Sideloaded or third-party-store installs may not apply the profile at
  install time, so the first runs are slower (P7). Measure startup on the channel your users
  actually use.
- **Macrobenchmark** for startup and the core journey (scroll, scan, pay) in CI on a physical
  device where possible; store the results with the release.
- **JankStats** (`androidx.metrics:metrics-performance` 1.0.0) for field jank, tagged with UI
  state; jank is a frame over 2x the refresh interval by default (P8).

### Web

For web front ends, Core Web Vitals at the 75th percentile, segmented by mobile and desktop,
must be "good": LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1. "Poor" begins at LCP > 4.0 s, INP > 500
ms, CLS > 0.25 (W1-W3). Test on a low-end mobile profile, not a developer laptop
(PX-PERF-014). Asset budgets per page archetype are in the design engine's
[web-performance-budgets-2026.md](../../../../doctrine/references/web-performance-budgets-2026.md).
Do not state an adoption date for INP (W4).

## Task 7: respect data cost and battery

| Rule | Check | ID |
|---|---|---|
| Media above a size threshold waits for Wi-Fi or explicit consent on metered connections | Network capture on a metered profile | PX-PERF-011 |
| Sync payloads are delta-based and compressed | Payload log per sync | PX-PERF-011 |
| The OS data-saver setting is honoured; an in-app data-saver mode exists where media is heavy | Data-saver test | PX-PERF-011 |
| Record data use per core task and per day of typical use; no regression beyond budget | Network capture on the floor device for a scripted day | PX-PERF-003 |
| Background work is batched and constraint-aware (network, charging, battery not low); no polling loops | Energy profile; wake-lock count below the 5% vital (P1) | PX-PERF-007 |
| Analytics batch and upload on unmetered or charging conditions where possible | Network capture | PX-PRIV-010 |
| Install and update size recorded per release; graceful behaviour on low storage | Size report; low-storage test | PX-PERF-012 (SHOULD) |

Chwezi default data budgets (owner to confirm; SHOULD): routine sync of text records under 1 MB
per user per working day; no media download on app start; no auto-play video anywhere in
operational apps.

## Task 8: degrade gracefully

When the device, battery or network is constrained (PX-PERF-008, MUST):

1. Switch off non-essential motion and decorative images first.
2. Keep every critical workflow (sell, dispense, record, save) working offline where the tenant
   rule allows.
3. Failure of analytics, media, marketing content, remote configuration or a dashboard widget
   never blocks POS, clinical or any core task. Check: block those endpoints; the core task
   completes.
4. A slow dependency gets a timeout and a fallback (cached value with its age, or a stated
   "unavailable"), never an indefinite spinner (PX-INTERACT-003).
5. A printer that is offline queues the receipt with a visible status and never blocks the sale.

## Evidence/currentness

Platform facts cite [currentness-register.md](currentness-register.md), accessed 2026-11-07:
P1-P8 (Android vitals, startup, frames, Baseline Profiles, JankStats), W1-W4 (Core Web Vitals).
The hot-start figure conflicts between two Google pages (P5); this standard sets its own
stricter target. Media and data budgets marked "owner to confirm" are Chwezi proposals, not
platform facts. The payment state machine is Chwezi doctrine; provider-specific callback
behaviour must be verified per provider integration and is NOT_ASSESSED here.
