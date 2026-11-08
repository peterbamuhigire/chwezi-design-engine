Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Scorecard and release gate

Use this file to decide whether a Chwezi screen, flow or release may ship. It turns the six
weighted dimensions into anchored scores, lists the hard-fail gates that no score can buy back,
and records who signs. It runs inside the design engine's `governance/design-quality-gate.md`
as its product-excellence section and uses the same verdicts (`PASS`, `CONDITIONAL`,
`BLOCKED`) and evidence classes (`MEASURED`, `HEURISTIC`, `NOT_ASSESSED`).

This is a binding Chwezi internal policy (PX-SCORE-001, PX-SCORE-002). It is not an industry
certification and must never be described as one.

## Task: choose the scope

| Scope | When | What is scored |
|---|---|---|
| Change | One screen, component or flow changed | Dimensions the change touches; all hard gates that apply to the touched journey |
| Release | A versioned build going to users | All six dimensions on every core journey of the product profile |
| Product baseline | First release, major redesign, or quarterly review | All six dimensions plus value metrics (see `product-profiles.md`) |

Core journeys come from the product profile (for example Maduuka: scan or search -> cart ->
payment -> receipt). A score for a scope must name the journeys, roles, devices, locales and
build it covers.

## Task: score the six dimensions

Weights sum to 100. Score each dimension 0-4 with the anchors below, then convert:
`points = weight x score / 4`. Total = sum of points (0-100). Record the evidence class of every
check that fed the score.

| Dimension | Weight | Feeding rules |
|---|---|---|
| Task usability and speed | 25 | PX-INTERACT-004/005/009/010/011, PX-NAV-006/007, PX-QA-010 |
| Reliability and recovery | 20 | PX-INTERACT-002/003/006/007, PX-OFFLINE-001..005, PX-STATE-001..006 |
| Visual and interaction craft | 15 | PX-TOKEN-*, PX-GEOM-*, PX-TYPE-*, PX-MOTION-*, PX-STATE-005, PX-LAYOUT-* |
| Accessibility and inclusion | 15 | PX-A11Y-*, PX-COLOUR-001/002, PX-TYPE-005, PX-L10N-002/003/005/008 |
| Performance and efficiency | 15 | PX-PERF-001..014 |
| Security and data trust | 10 | PX-PRIV-*, PX-DATA-*, PX-DESTRUCT-003 |

Financial and clinical correctness sits in the smallest dimension by weight, which is why it is
also a hard-fail gate below: weight measures quality, the gate protects safety.

### Anchors: task usability and speed (25)

| Score | Anchor |
|---|---|
| 4 | Core journeys timed with representative novice and experienced users (MEASURED); task success >= 95%; time and error rate at or better than the agreed budget or previous release; five-second test >= 80%; zero unexplained re-entry. |
| 3 | All journeys MEASURED; one journey misses its time budget by <= 15% with an owned fix; success >= 90%. |
| 2 | Timings from internal testers only, or one journey HEURISTIC; success 80-89%; more than one budget missed. |
| 1 | Only walkthrough or screenshot review; no timings; several journeys NOT_ASSESSED. |
| 0 | Core task cannot be completed by a representative user, or no evidence. |

### Anchors: reliability and recovery (20)

| Score | Anchor |
|---|---|
| 4 | Double-tap, timeout-retry, replay, process-death, airplane-mode, conflict and reboot suites pass on device (MEASURED); 0 duplicates; 0 data loss; every progress state has timeout and recovery. |
| 3 | All suites MEASURED and passing on the core journey; a secondary flow has a minor recovery-copy gap with an owned fix. |
| 2 | Suites run on emulator only, or conflict handling HEURISTIC. |
| 1 | Happy path tested only; offline and retry behaviour unverified. |
| 0 | Any duplicate record, lost save or queued-as-confirmed label (also a hard fail). |

### Anchors: visual and interaction craft (15)

| Score | Anchor |
|---|---|
| 4 | Guardrail lint clean (no raw literals, off-scale spacing or radii); screenshots for every required state in light and dark, at default and 200% text, at each declared window class; motion register complete; copy audit clean; typeface from the house style. |
| 3 | As 4 with <= 3 minor findings (alignment, spacing) logged with owners. |
| 2 | Lint ratchet not falling, or state screenshots missing for some states, or one dark-theme gap. |
| 1 | Visual review from mockups only; several states unseen. |
| 0 | Framework default type left as primary face, raw colours in screens, or no review. |

### Anchors: accessibility and inclusion (15)

| Score | Anchor |
|---|---|
| 4 | Logged TalkBack, VoiceOver and keyboard passes on core journeys; contrast measured in every theme; targets measured on hit areas; 200% text and platform maximum recorded; RTL (Arabic) and longest declared language screenshots; reduced motion verified; 0 WCAG 2.2 AA failures. |
| 3 | As 4 but one platform's screen-reader pass covers a subset of secondary screens, with an owned date. |
| 2 | Automated scanner results only (HEURISTIC for screen-reader behaviour); RTL partially checked. |
| 1 | Contrast checked from design files only; no assistive-technology run. |
| 0 | Any WCAG 2.2 AA failure on a core journey (also a hard fail). |

### Anchors: performance and efficiency (15)

| Score | Anchor |
|---|---|
| 4 | Real baseline device declared; cold/warm start, transition latency, jank, memory, battery and data use measured with a realistic dataset; all within recorded budget; no regression; web routes meet Core Web Vitals "good" at p75 on mobile where shipped (CR:W1-W3). |
| 3 | All measured; one metric over budget by <= 10% with an owned fix. |
| 2 | Measured on a mid-range or emulator device only, or dataset unrealistic. |
| 1 | Anecdotal ("feels fast"); no traces. |
| 0 | Crash, ANR or freeze on the core journey on the baseline device. |

### Anchors: security and data trust (10)

| Score | Anchor |
|---|---|
| 4 | Backend denial tests per role; role x screen visibility matrix tested; masking, audit trail, session lock and screenshot protection verified; values reconcile with ledger or clinical source; provenance shown on decision figures. |
| 3 | As 4 with a non-critical masking or provenance gap with owned fix. |
| 2 | Permission tests at UI level only for secondary screens (core screens tested at API). |
| 1 | Reconciliation or permission testing HEURISTIC. |
| 0 | Permission enforced only in UI, or any reconciliation mismatch (also hard fails). |

## Task: check the hard-fail gates

Any open gate means `BLOCKED`, whatever the total. A gate is "clear" only with `MEASURED`
evidence; a gate that applies but is `NOT_ASSESSED` is treated as open. The thirteen gates are
defined in `rules-catalogue.md` (area GATE); this table is the reviewer's view of them.
Document numbering (PX-DATA-013) is a hard gate (PX-GATE-13) wherever a screen issues numbered
documents (owner standing rule, 5 Nov 2026). Destructive-action trace (PX-DESTRUCT-001/003) is a
MUST rule scored under security and data trust; a failure there scores that dimension 0, which
blocks release through the decision table.

| Gate | Fails when | Rule IDs |
|---|---|---|
| PX-GATE-01 Duplicates | Double tap, timeout-retry or replay creates more than one record or charge | PX-INTERACT-002, PX-OFFLINE-002 |
| PX-GATE-02 False confirmation | Saved, paid, sent or live shown before confirmation; queued shown as confirmed; stale shown as live | PX-STATE-002, PX-OFFLINE-003/004, PX-DATA-010, PX-PROFILE-002 |
| PX-GATE-03 Numbers do not reconcile | Money, stock, tax or clinical values differ from the authoritative source, or a wrong minor unit | PX-DATA-003/004/005/011/012, PX-L10N-001 |
| PX-GATE-04 Interface-only authorisation | A restricted action or record is reachable with a lower-role session | PX-PRIV-001 |
| PX-GATE-05 Sensitive data exposed | Sensitive data reaches a role, screenshot, recents view or analytics event it should not | PX-PRIV-002/003/007/010 |
| PX-GATE-06 Accessibility failure | Any applicable WCAG 2.2 AA failure, or a core task not finishable with screen reader or keyboard | PX-A11Y-*, PX-COLOUR-001/002, PX-GEOM-005, PX-FORM-001/003 |
| PX-GATE-07 Large-text loss | A primary action or essential value lost or clipped at 200% text | PX-TYPE-002, PX-TYPE-005 |
| PX-GATE-08 Work lost or blocked | Process death, rotation, back, offline, or a failing non-core service loses or blocks work; a sync failure or conflict is dropped silently | PX-INTERACT-006, PX-NAV-002, PX-OFFLINE-005, PX-STATE-006, PX-PERF-008 |
| PX-GATE-09 Invented or fabricated content | Fixture or invented values, features or clinical content in a production build (includes unsafe clinical defaults and hidden critical results) | PX-MANDATE-004, PX-NAV-004, PX-DATA-001/006, PX-PROFILE-004 |
| PX-GATE-10 Missing state | A canonical state missing without a declared N/A reason | PX-STATE-001 |
| PX-GATE-11 Device budget broken | No baseline-device measurement, a budget regression, or an Android vitals threshold exceeded | PX-PERF-001/002/003/015/017 |
| PX-GATE-12 Unverified release | No independent verifier, or no human domain reviewer on a financial or clinical change | PX-QA-004/006/012 |
| PX-GATE-13 Document numbering broken | Where a screen issues numbered documents: a number that is not contiguous per tenant and type, allocated at draft or on the client, derived from COUNT+1, MAX+1 or the row id, changed on replay, shown as final while provisional offline, or a numbered document deleted instead of voided | PX-DATA-013 |

## Task: decide

Owner default, 2026-11-07.

| Condition (evaluate top to bottom) | Verdict |
|---|---|
| Any hard-fail gate open; an applicable gate whose evidence is `NOT_ASSESSED` counts as open | `BLOCKED` |
| Any dimension scored 0 | `BLOCKED` |
| Total < 70 | `BLOCKED` |
| Total 70-84, or any dimension scored 1 (a 1 caps the verdict at `CONDITIONAL` whatever the total), with every shortfall owned and dated and written acceptance by the product owner and the Lead Developer | `CONDITIONAL` |
| Total 70-84, or any dimension scored 1, with any shortfall lacking an owner, a date or the written acceptance | `BLOCKED` |
| Total >= 85, zero open hard gates, no dimension below 2 | `PASS` |

This is the single release rule of the standard; the doctrine, the skill, the rules catalogue
(PX-SCORE-002) and the policy file state it in the same terms.

Rules that apply to every verdict:

- `CONDITIONAL` is not production-ready and must not be described as such
  (`governance/design-quality-gate.md`). It permits only a named limited release (pilot tenant,
  feature flag, internal users) that the product owner and the Lead Developer both accept in
  writing, with a rollback plan (PX-ARCH-009).
- A missed remediation date turns `CONDITIONAL` into `BLOCKED` until re-scored.
- A high total never offsets a hard fail (PX-SCORE-002).
- Only `MEASURED` evidence may say "passes" or "conforms"; `HEURISTIC` findings may say "likely
  fails" or "risk" (PX-QA-004, PX-QA-012).

### Worked scoring example (Maduuka checkout release)

| Dimension | Score | Points |
|---|---|---|
| Task usability and speed | 4 | 25.00 |
| Reliability and recovery | 4 | 20.00 |
| Visual and interaction craft | 3 | 11.25 |
| Accessibility and inclusion | 3 | 11.25 |
| Performance and efficiency | 3 | 11.25 |
| Security and data trust | 4 | 10.00 |
| Total | | 88.75 |

All thirteen gates clear with `MEASURED` evidence and no dimension is below 2, so the verdict is `PASS`. Had the VoiceOver run
not been done, PX-GATE-06 would be `NOT_ASSESSED` and the verdict `BLOCKED` despite the total. A full
walk-through is in `../examples/worked-review-pos-checkout.md`.

## Task: assemble the evidence pack

Every release keeps an evidence folder in the product repository (PX-QA-011). Unless the project
already has a convention, use `docs/design-evidence/<release>/` with one sub-folder per screen ID
(`contract.md`, `states/`, `screenshots/`, `tests/`, `audit-checklist.md`) and, at release level,
`scorecard.md`, `gates.md`, `signoff.md` and `ddr/`. File names carry the evidence code (SHOT,
UIT, TRACE, AT and so on) so a verifier can find each rule's proof. Minimum contents:

| Item | Evidence | Class needed for PASS |
|---|---|---|
| Scope sheet | Journeys, roles, devices, OS/API floor, locales, build ID, date | n/a |
| Baseline device profile | Model, RAM, OS/API, screen, dataset size (PX-PERF-001) | MEASURED |
| Screenshot set | Each required state x light/dark x default/200% text x window classes shipped; RTL and longest-language set | MEASURED |
| Task study | Success, time, error rate, novice and experienced (PX-QA-010) | MEASURED |
| Reliability logs | Retry, replay, process-death, offline, conflict test output | MEASURED |
| Accessibility log | Screen-reader and keyboard pass notes, contrast table, target measurements | MEASURED |
| Performance traces | Start, transition, jank, memory, battery, data use vs budget | MEASURED |
| Security tests | Backend denial per role, visibility matrix, audit trail check | MEASURED |
| Reconciliation | Screen totals vs ledger, report or clinical source | MEASURED |
| Numbering tests (where documents are issued) | Concurrent issue from two devices, replay of the same idempotency key, offline provisional tag, void instead of delete; the per-tenant, per-type sequence has no gap or duplicate (PX-DATA-013, PX-GATE-13) | MEASURED |
| Audit checklist | Per screen (`agent-implementation-protocol.md`) | HEURISTIC allowed for review items |
| DDRs | One per SHOULD departure or new component | n/a |
| Scorecard | Scores, points, evidence class per check, gates, verdict | n/a |
| Sign-off record | Names, roles, dates, verdict | n/a |
| Rollback plan | Flags, rollback steps, data migration reversal | n/a |

Unrun checks are written `NOT_ASSESSED` with the reason, never omitted.

## Task: keep the reviewer independent

- The implementer never verifies their own work (PX-QA-006). For agent work, a separate agent
  instance with a fresh context counts as independent; it receives the code, the screen contract
  and the evidence, not the implementer's conclusion.
- Financial and clinical changes need a human domain reviewer in addition (accountant or
  finance lead for money, clinician for Medic8).
- The verifier re-runs at least one test from each hard gate rather than reading the log only.
- Findings and repairs are recorded in the evidence folder; a disagreement goes to the Lead
  Developer.

## Sign-off charter

Approval is recorded, never inferred from an attractive screenshot. One person may hold two
roles in a small team, except that the implementer can never be the independent verifier.

| Role | Confirms | Signs |
|---|---|---|
| Implementer agent (or developer) | Scope built as contracted; all states implemented; self-review done; evidence pack assembled; unrun checks marked `NOT_ASSESSED` | Evidence pack complete |
| Independent verifier | Business correctness, state coverage, accessibility, performance and gate evidence re-checked; covers the source's design, QA and engineering review lenses | Scorecard and gates |
| Product owner | The screen solves a real user problem; client-facing claims match delivered behaviour (PX-MANDATE-006); domain review obtained for financial, clinical or operational correctness | Fitness for purpose; any `CONDITIONAL` scope |
| Lead Developer | Architecture, maintainability, platform integration, recovery, rollback plan; final verdict | Release verdict |

The domain reviewer (finance, clinical, operations) is a named participant whenever money,
stock, tax or clinical values change; the product owner records their confirmation.

## Re-measure cadence

| Trigger | What is re-measured |
|---|---|
| Every change to a screen | Touched dimensions and applicable gates (change scope) |
| Every release | Full scorecard on core journeys |
| Platform change (targetSdk bump, OS major, new Compose or web stack version) | Accessibility, performance, navigation and edge-to-edge checks on device |
| Live product, quarterly | Product baseline scope including value metrics |
| Android vitals | Rolling 28-day crash and ANR rates against 1.09% / 0.47% (CR:P1) every release |
| Post-launch | Value metrics at 30 and 90 days against the agreed baseline (PX-MANDATE-010) |
| Currentness | Platform facts on their review-by date (library versions monthly, platform guidance quarterly, standards six-monthly) in `currentness-register.md` |

A score older than the last release of the scored product is stale and cannot support a `PASS`.

## Evidence/currentness

WCAG 2.2 level references, Android vitals thresholds, Core Web Vitals thresholds and platform
behaviours cited here are recorded with source URL, access date (2026-11-07) and status in
`currentness-register.md` (IDs A1-A12, P1, W1-W3, M6-M9). Nothing in this file adds a platform
fact not held there.
