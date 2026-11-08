Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Product profiles and experience briefs

Use this file to apply the standard to a specific Chwezi product. Each profile adds
product-specific hard rules, key states and risk hotspots on top of the portfolio rules, and
says which screen blueprints (S01-S16), component contracts (K01-K16) and pattern dossiers
(01-50) apply. Profiles never relax a portfolio rule; where a profile is stricter, the stricter
rule applies (PX-MANDATE-003).

## Task: declare the profile for a project

Every product repository records, in its design-standard section or evidence folder:

| Declaration | Content | Rule |
|---|---|---|
| Profile | One of the profiles below (or two, for a mixed product, with the stricter rule winning) | PX-PROFILE-* |
| Supported locales | Subset of the default list: English, Luganda, Swahili, French, Arabic (RTL), Kinyarwanda, Spanish (owner default, 2026-11-07); layout tests run on the longest declared language and on Arabic RTL | PX-L10N-002, PX-L10N-005 |
| Currencies | ISO 4217 codes in scope; minor units from ISO 4217 (UGX and RWF 0, KES, TZS and USD 2; CR:C1-C2) | PX-DATA-011 |
| Baseline device | Model, RAM, OS/API floor, screen; real device held by the team | PX-PERF-001 |
| Distribution | Play, other store, sideload, web; Play builds target API 36 (CR:M7) | PX-NAV-003 |
| Idle lock | Tenant-configurable; SHOULD defaults: shared POS 2 min, clinical 5 min, back office 15 min (owner default, 2026-11-07) | PX-PRIV-008 |
| Core journeys | The journeys scored in every release | PX-SCORE-001 |
| Fiscal integration | Fiscal e-invoicing (e.g. URA EFRIS) on or off, per tenant | PX-DATA-012 |

## Profile: Maduuka

- **Domain.** Retail, restaurant, hotel, pharmacy and inventory, single and multi-outlet.
- **Users and contexts.** Cashier at a busy counter with a queue; waiter moving between tables;
  pharmacist dispensing under time pressure; store owner checking figures on a phone at home.
  Shared tills, budget Android phones and tablets, thermal printers, hardware scanners,
  intermittent power and data.
- **Primary screens.** POS checkout, scanner input, cart, payment (cash, mobile money, card),
  receipt, offline queue, table and kitchen flow, stock count, stock alerts, outlet switcher,
  owner sales summary.
- **Design directives.** Compact transaction density; persistent, prominent total; fast repeat
  sale; outlet context always shown; zero-decimal UGX; fiscal receipt status visible when the
  integration is on; checkout reachable in one step from home.
- **Hard rules.** PX-PROFILE-001, PX-PROFILE-002; queued payment never shown as paid
  (PX-OFFLINE-003); scan failure always visible and announced (PX-INTERACT-015); no
  decorative chart on checkout (PX-DATA-008); hardware scanner input lands in the scan target
  without focusing; receipts on 58 mm, 80 mm and A4, reprints marked "COPY" (PX-PRINT-001);
  document numbers per the contiguous-numbering rule (PX-DATA-013); in-app keypad targets
  >= 56 dp (PX-INTERACT-016).
- **Key states.** Cart empty; item not found; scan duplicate; awaiting mobile-money approval;
  payment timed out (re-check before retry); printer offline (sale continues); offline sale
  with provisional number; fiscal submission pending or failed; shift closed.
- **Risk hotspots.** Double charge on retry; wrong outlet selected; cash rounding not
  reconciling; drawer variance at shift close; owner dashboard numbers that differ from the
  sales list.
- **Applies.** Blueprints S01, S02, S03, S04 (pharmacy), S06, S07 (hotel), S09, S15.
  Components K02, K03, K06, K07, K08, K12, K14, K15. Dossiers 06, 07, 09, 14, 17, 21, 22, 23,
  30, 33, 38, 42, 43.

## Profile: Medic8

- **Domain.** Clinical operations and hospital or clinic management.
- **Users and contexts.** Receptionist registering patients with a queue at the desk; nurse on
  a ward tablet, often at night; clinician switching between patients; pharmacist dispensing;
  billing clerk. Shared ward devices, interruptions, privacy-sensitive surroundings.
- **Primary screens.** Patient search, registration, queue and triage, encounter, observations,
  orders and prescriptions, lab results review, dispensing, appointments, billing.
- **Design directives.** Urgency, privacy, provenance and clinical legibility outrank style.
  The active patient is identified on every clinical screen (name, age, identifier, photo where
  available). Priority cues carry a word and a timestamp, never colour alone.
- **Hard rules.** PX-PROFILE-003, PX-PROFILE-004; no invented diagnoses, unsafe defaults,
  hidden critical results or clinical decisions delegated to decorative AI (PX-DATA-006); no
  consequential preselection of drug, dose or route (PX-INTERACT-009); screenshot and recents
  protection on patient screens (PX-PRIV-007); every record open audited (PX-PRIV-011); human
  clinical reviewer signs any change to clinical values (PX-GATE-09, PX-GATE-12).
- **Key states.** Patient not found (offer register); possible duplicate patient; critical
  result unacknowledged; observation saved locally; order awaiting pharmacy; stale result
  (shows age and source); restricted record (break-glass with reason, where the product
  supports it).
- **Risk hotspots.** Wrong-patient actions after fast switching; stale values shown as live;
  alert fatigue from over-flagging; diagnoses visible at reception.
- **Applies.** Blueprints S01, S04, S05, S12. Components K03, K04, K06, K09, K12, K13, K15,
  K16. Dossiers 09, 16, 19, 35, 36, 37.

## Profile: Farm Acre

- **Domain.** Farm records and field operations: crops, livestock, inputs, activities.
- **Users and contexts.** Farmer with a low-end phone and little data; field officer visiting
  many farms per day outdoors; agronomist reviewing reports. Direct sunlight, dust, gloves or
  wet hands, no signal for hours.
- **Primary screens.** Field and plot list, activity record, observation form with photos,
  input use, treatment schedule, sync queue, reports.
- **Design directives.** Outdoor contrast (high-contrast light theme, body text >= 7:1,
  PX-COLOUR-007); large controls (56 dp, PX-GEOM-009, PX-INTERACT-018); offline-first forms; photo
  compression before upload; visible sync confidence; agricultural terms users already use;
  location only when permitted and needed.
- **Hard rules.** PX-PROFILE-005; no silent unsynced updates (PX-OFFLINE-005); no heavy maps
  or tiny charts on field screens; media waits for Wi-Fi or consent on metered data
  (PX-PERF-011); location permission asked at the task that needs it (PX-PRIV-004).
- **Key states.** Offline with N records queued; photo compressing; upload paused (metered);
  sync conflict on a shared plot; location denied (manual entry offered); low storage.
- **Risk hotspots.** Lost field data after days offline; airtime spent on photo uploads;
  unreadable screens in sunlight; duplicate visits recorded by two officers.
- **Applies.** Blueprints S01, S06, S12. Components K03, K06, K11, K12, K16. Dossiers 01, 02,
  03, 05, 08, 10.

## Profile: Aqar

- **Domain.** Property management: portfolios, units, tenancies, charges, collections,
  maintenance.
- **Users and contexts.** Property manager at a desk or tablet; caretaker on site with a phone;
  tenant paying rent and reporting issues by phone. Mobile-money collections, multiple
  properties per manager.
- **Primary screens.** Portfolio overview, units and occupancy, tenancy and lease timeline,
  charges and invoices, collections and receipts, arrears, work orders, documents.
- **Design directives.** Clear ledgers; arrears provenance (which charges, since when); occupancy
  hierarchy (property -> block -> unit); lease timeline; work-order urgency and queues;
  property scope always shown; document previews.
- **Hard rules.** PX-PROFILE-006; due, received and reconciled are distinct states and labels
  (PX-DATA-005); every arrears figure drills to its charges (PX-DATA-002); voided invoices
  watermarked, never deleted (PX-DATA-013).
- **Key states.** Payment received, not reconciled; partial payment; unit vacant, notice given;
  lease expiring; work order overdue; document pending signature.
- **Risk hotspots.** Overstated collections; wrong property scope on a multi-portfolio
  account; tenant disputes over unexplained arrears.
- **Applies.** Blueprints S08, S09, S10, S11, S12. Components K02, K03, K05, K09, K13, K14.
  Dossiers 11, 14, 20, 33, 44, 45.

## Profile: SpannaMax

- **Domain.** Workshop and garage operations, including project and parts work.
- **Users and contexts.** Service advisor at reception with the customer present; mechanic in
  the bay with gloves and dirty hands; garage manager approving parts and invoices. Noise,
  grease, shared tablets.
- **Primary screens.** Vehicle check-in, inspection checklist, job card, parts request, labour
  entry, technician queue, invoice, job history.
- **Design directives.** Glove-friendly controls (56 dp); large checklists; strong state labels;
  camera evidence per finding; compact operational cards; rapid workshop navigation;
  audit-friendly invoices.
- **Hard rules.** PX-PROFILE-007; no accidental job closure (closure needs a reason and
  confirmation, PX-DESTRUCT-001); totals never change without who, when and why
  (PX-DESTRUCT-003); every drag has a single-tap alternative (PX-A11Y-008).
- **Key states.** Awaiting customer approval; parts on order; job blocked (with reason); job
  ready for collection; invoice draft vs issued; photo upload queued.
- **Risk hotspots.** Disputed invoices without inspection evidence; parts used but not billed;
  jobs closed by mistake on a shared tablet.
- **Applies.** Blueprints S06, S10, S13, S15, S16. Components K03, K04, K08, K09, K11, K15.
  Dossiers 04, 24, 38, 50.

## Profile: Education/LMS

- **Domain.** Student and teaching workflows: courses, attendance, exams, fees, calendar,
  content.
- **Users and contexts.** Teacher marking attendance at the start of a lesson; learner on a
  shared or family phone; bursar handling fees; parent checking progress. Short sessions,
  school networks, end-of-term peaks.
- **Primary screens.** Course hub, lesson planner, attendance register, exam and results,
  fees statement, timetable and calendar, content viewer.
- **Design directives.** Progress visibility; clear schedules; distraction-free learning;
  fees statements that reconcile; results released only when authorised.
- **Hard rules.** PX-PROFILE-008 (SHOULD as written, with portfolio MUSTs applying in full);
  learner data visible only to authorised roles (PX-PRIV-002); no streaks or leaderboards that
  pressure learners (PX-BLACKLIST-005); fee figures follow the money rules (PX-DATA-011).
- **Key states.** Attendance offline-queued; results draft vs released; fee balance with last
  payment; content downloaded for offline; assignment overdue.
- **Risk hotspots.** Results leaked before release; fee disputes; attendance lost when the
  network drops mid-register.
- **Applies.** Blueprints S12, S14. Components K02, K03, K09, K16. Dossiers 13, 31, 46
  (verification protocol), 47, 48.

## Shared patterns for every product

Dossiers 12, 15, 18, 20, 24-29, 32, 34, 39-41 and 49 (HR, approvals, registers, workspace
shell, analytics) and blueprints S01, S10, S11 apply across products. Dossier 46 is the
cross-form-factor verification protocol used in every release.

## Experience briefs

Each brief states the core journey to time, the differentiator to prove and the failure that
blocks release.

| Product | Primary roles | Core journey (timed) | Differentiator, with its check | Prohibited failure (hard gate) |
|---|---|---|---|---|
| Maduuka | Cashier, waiter, pharmacist, store owner | Scan or search -> cart -> confirm payment -> receipt; table -> order -> kitchen -> bill; count -> variance -> submit | Persistent total, fast repeat sale (tap budget recorded after scan), visible offline queue, outlet context, UGX with no decimals, fiscal e-invoicing status (e.g. URA EFRIS) when enabled | Queued payment shown as paid; hidden scan failure; checkout behind dashboard widgets (PX-GATE-02; scored under PX-PROFILE-002) |
| Medic8 | Receptionist, nurse, clinician, pharmacist | Patient search -> encounter -> observations -> order or prescription -> review | Priority cues with word and timestamp; privacy-aware summaries; patient switch with active-patient banner; legible clinical detail at 200% text | Invented diagnoses, unsafe defaults, hidden critical results, decisions delegated to decorative AI (PX-GATE-09) |
| Aqar | Property manager, caretaker, tenant | Unit -> tenancy -> charge -> receipt; maintenance request -> assignment -> closure | Ledgers that reconcile; arrears provenance; work-order urgency; property scope; document previews | Due, received and reconciled conflated (PX-GATE-03) |
| Farm Acre | Farmer, field officer, agronomist | Field -> activity -> observations -> input use -> report | Offline-first forms; 56 dp targets; compressed photos; familiar terms; location only when permitted | Tiny charts, heavy maps, silent unsynced updates (PX-GATE-08) |
| SpannaMax | Service advisor, mechanic, garage manager | Vehicle -> inspection -> job card -> parts -> labour -> invoice | Large checklists, camera evidence, clear job status, rapid navigation, audit-friendly invoices | Accidental job closure; totals changed without trace (PX-DESTRUCT-001/003) |
| Education/LMS (added) | Teacher, learner, bursar, parent | Class -> attendance -> lesson -> assessment -> results release | Register completed in under a minute for a typical class (*target*); progress visible to learner and parent | Results visible before release; attendance lost offline (PX-GATE-05, PX-GATE-08) |

## Repeat-use experience loop

Most Chwezi users open the same app dozens of times a day. Design and measure the loop, not
only the first visit.

| Stage | What the user must get | Check | Rules |
|---|---|---|---|
| Arrival | Correct tenant, outlet, role, last safe context and pending work; freshness shown where it matters; no promotional carousel, repeated onboarding, splash delay or unneeded permission prompt | Launch-to-first-meaningful-action time on the baseline device within the product budget | PX-NAV-006 |
| Orientation | One clear next action; only the relevant exceptions; key figures and actions in stable places | Primary action in the same region across states (screenshot diff); five-second test | PX-NAV-007, PX-INTERACT-004 |
| Execution | Predictable scan, search, select, edit, confirm; money, quantities and task context always visible | Tap and re-entry counts per core task; focus lands on the expected field | PX-INTERACT-005, PX-INTERACT-011 |
| Closure | Exactly what was saved, queued or completed; receipt, share, undo or next task | Post-action screenshot per core task shows outcome and next step | PX-STATE-003 |
| Return | Safe preferences, recents and pending work remembered; progress shown without gamifying money or care | Returning-user test; no streaks or pressure mechanics | PX-INTERACT-009, PX-BLACKLIST-005 |

Example (Maduuka restaurant): the waiter unlocks with a PIN (arrival), sees two "Ready" tickets
at the top (orientation), serves and adds a round of drinks to table 4 (execution), sees "Sent
to bar 14:32" on the order (closure), and next shift the same tables and favourite items are
waiting (return).

## Proof, not slogans: value metrics

Chwezi sells measured outcomes and human accountability, never "no AI was used" or hours of
code (PX-MANDATE-008). Client-facing claims need proof (PX-MANDATE-006); baselines and windows
are agreed with the client before any claim (PX-MANDATE-010), and no adoption or retention gain
is promised without observed evidence.

| Claim | Proof | Example metric |
|---|---|---|
| Usability | Representative users complete core tasks; measured time and error rate | Transaction time per sale; tasks per shift |
| Reliability | Repeatable offline, retry, interruption and recovery tests | Failed-sync recovery rate; duplicates = 0 |
| Polish | Token and state consistency; screenshot review across states and devices | Guardrail lint at zero; state coverage 100% |
| Business value | Before/after measures in the client's own operation | Stock variance; invoice correction rate; reconciliation effort; data completeness |
| Adoption | Usage by role over an agreed window | Active users by role; onboarding time to first solo task |
| Longevity | Versioned design system, tests, audit logs, support process | Release cadence with evidence packs; time to fix critical defects |

Engagement deliverables per phase (PX-MANDATE-009, SHOULD): discovery (process maps, roles,
constraints, data and risk inventory); experience design (clickable prototype, DDRs,
accessibility and responsive specification); engineering (code, documented APIs, offline model,
permissions, automated tests); validation (acceptance tests, low-end device report, defect
log); go-live (migration checklist, monitoring, rollback, training, support plan); post-launch
(measured adoption, friction analysis, improvement backlog, change governance). Proposal and
SDLC engines own the documents; this standard supplies the evidence each phase must carry.

## Evidence/currentness

Currency minor units (C1-C2), Play target API (M7), large-screen orientation behaviour (M9) and
Android vitals (P1) are recorded in `currentness-register.md` with source URL, access date
2026-11-07 and status. The language list, idle-lock defaults, accent model and fiscal naming
are owner defaults (2026-11-07) that Peter may override.
