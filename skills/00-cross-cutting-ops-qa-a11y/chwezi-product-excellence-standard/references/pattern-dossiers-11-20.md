Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

Shared contract: [pattern-dossier-contract.md](pattern-dossier-contract.md)

# Pattern dossiers PD-11 to PD-20

Community, people, education, money and booking patterns. Near-duplicate references are split so
each dossier owns one rule set: PD-11 (operations dashboard) versus PD-20 (module launcher);
PD-12 (role home) versus PD-20 (complete module map); PD-14, PD-17 and PD-18 own balance truth,
hero restraint and period maths respectively. A value tagged "proposed" is proposed (owner to confirm): a Chwezi starting value, calibrated
on the product's baseline device, that may be changed only through a DDR until the owner confirms it.

## PD-11 — Residential community operations dashboard

- **Family:** F4 Property and community. Lead product: Aqar.
- **Archetype:** AR-06 Enterprise command centre.
- **Pattern:** A central dashboard surrounded by context panels and quick actions for an estate or
  apartment block. Its merit is putting security, money and visitors on one surface for a manager
  who walks the site all day.
- **Primary task and success metric:** See today's open incidents, overdue dues and visitor
  activity, and act on the most urgent. Target: one primary panel; the oldest open incident is
  reachable in 1 tap.
- **Anatomy (priority order):**
  1. Estate header: estate, block scope, date, gate-device status.
  2. Primary panel: open incidents by severity, oldest age first, each with owner.
  3. Dues panel: collected today and overdue units as two separate figures.
  4. Gate panel: expected visitors, visitors on site now, last gate sync time.
  5. At most 3 quick actions: log incident, register visitor, record payment.
- **Domain states:** incident open, escalated, assigned, resolved; dues overdue by ageing bucket;
  payment received by mobile money but not yet reconciled; gate device offline; module disabled by
  entitlement (its panel absent, never an empty frame); manager off shift with a deputy named.
- **Kaizen corrections:**
  - Source "convert floating promotional cards into real panels", upgraded: every panel is a
    labelled landmark region with a drill-down; no card floats over another.
  - Added: each panel names the question it answers; a panel unused for a full quarter is demoted.
  - Added: resident phone numbers and unit occupants are masked for guard roles.
- **Adaptive behaviour:**
  - Compact: panels stacked in the anatomy order; quick actions in a bottom row.
  - Medium: two columns, incidents spanning the left column.
  - Expanded: three columns plus a context panel showing the selected incident's timeline.
- **East African context:** many residents have feature phones, so incident updates and dues
  reminders go by SMS. Guards share one gate tablet across shifts, so every entry carries the
  signed-in guard. Service charges arrive by mobile money with a reference to reconcile.
- **Chwezi application:** Aqar estate manager "Today" for gated communities and apartment blocks.
- **Acceptance tests:**
  1. Given a screen-reader landmark list, then every panel appears as a named region.
  2. Given the visitor module disabled for the tenant, then the dashboard renders with no gap or
     placeholder where its panel would be.
  3. Given a mobile-money payment awaiting reconciliation, then it is labelled "Received, not
     reconciled" and excluded from the reconciled total.
  4. Given the guard role, then resident phone numbers render masked and the API returns them masked.
- **Rule IDs:** PX-DATA-005, PX-DATA-007, PX-PRIV-002, PX-PRIV-008, PX-VIZ-004, PX-NAV-005,
  PX-PROFILE-006, PX-NOTIFY-002.

## PD-12 — Role-aware HR home with bounded shortcuts

- **Family:** F5 People operations and HR. Applies to every product's back office.
- **Archetype:** AR-13 Module launcher.
- **Pattern:** A strong KPI banner over a grid of modular, colour-coded shortcuts. The strength is
  an immediate "where do I go"; the risk the reference shows is a shortcut grid that grows until
  it is a second, worse menu.
- **Primary task and success metric:** Reach the user's most frequent HR action. Target: at most 6
  shortcuts, chosen by role; the banner holds one figure with its period.
- **Anatomy (priority order):**
  1. Header: organisation, branch, the user's role.
  2. One role figure: a manager sees "7 requests awaiting you"; an employee sees leave balance in
     days as at today.
  3. Shortcut grid, 6 maximum, each an icon with a text label.
  4. Pending items list for the user.
  5. "All HR modules", linking to the full launcher.
- **Domain states:** role without HR rights (self-service only); approvals pending; target module
  not entitled (shortcut absent); payroll period locked (payroll shortcut shows the lock reason);
  first visit (role defaults applied, no tour).
- **Kaizen corrections:**
  - Source "reduce shortcut proliferation", upgraded: a hard cap of 6; users may pin within the cap,
    and the full map lives in the launcher (PD-20), not on the home.
  - Source "role-aware navigation", upgraded: the shortcut set is computed from role and
    entitlement on the server, not filtered in the client.
  - Added: colour coding on icons is decoration only; meaning lives in labels.
- **Adaptive behaviour:**
  - Compact: role figure, then a 2 x 3 grid; pending list below.
  - Medium: 3 x 2 grid beside the pending list.
  - Expanded: shortcuts as a single row; pending items as a sortable table.
- **East African context:** many staff use HR only for leave and payslips, so plain labels beat
  icons alone, in English, Luganda or Swahili per tenant. HR clerks often enter requests for
  colleagues on a shared machine; acting-for is recorded.
- **Chwezi application:** the HR home in the back office of Maduuka, Medic8, Aqar and SpannaMax.
- **Acceptance tests:**
  1. Given a manager and a cashier in the same tenant, then their shortcut sets differ and each
     matches the role matrix.
  2. Given a configuration with 7 shortcuts, then validation rejects it.
  3. Given the screen reader, then every shortcut is announced by its text label.
  4. Given the employee role, then no other person's salary data is returned by the home API.
- **Rule IDs:** PX-INTERACT-004, PX-NAV-004, PX-PRIV-001, PX-PRIV-002, PX-A11Y-001, PX-L10N-009,
  PX-COLOUR-002, PX-DATA-002.

## PD-13 — Cross-platform student self-service portal

- **Family:** F10 Education and learning. Lead product: Education/LMS.
- **Archetype:** AR-02 Operational dashboard.
- **Pattern:** One institution's portal that feels the same on a desktop and a phone, with compact
  student data. The lesson is continuity: a parent who learned the task on a laptop at work can
  repeat it on a phone at home.
- **Primary task and success metric:** Check fees balance, today's timetable and latest results.
  Target: each task has the same step sequence on compact and expanded widths (task parity 100%).
- **Anatomy (priority order):**
  1. Learner switcher for guardians with several children, always showing the active learner.
  2. Fees: balance with as-at date, last payment and reference, "Pay fees".
  3. Today's timetable with room and teacher.
  4. Latest results with term and year.
  5. School notices, newest first.
- **Domain states:** fees overdue; payment received, awaiting school reconciliation; results
  withheld (reason in neutral words and who to contact); term closed; timetable from cache with its
  age; session expired on a shared phone.
- **Kaizen corrections:**
  - Source "preserve workflows across screen classes", upgraded: a task-parity matrix lists each
    core task with its steps per width and is checked in CI.
  - Added: the withheld-results message states the route to resolve it, not a penalty.
  - Added: switching learner never leaves the previous learner's data on screen.
- **Adaptive behaviour:**
  - Compact: Fees, Timetable and Results as bottom destinations, learner switcher in the header.
  - Medium: two panes, fees and results left, timetable right.
  - Expanded: three columns in the same order the compact tabs use.
- **East African context:** fees are paid by mobile money or bank with a learner reference that must
  be shown for copying. Terms run three per year and boarding is common. Families share phones, so
  session timeout and a visible sign-out are required.
- **Chwezi application:** Education/LMS (AcademiaPro) guardian and student portal.
- **Acceptance tests:**
  1. Given the parity matrix, then "check balance", "view timetable" and "view results" have
     identical step counts at compact and expanded widths.
  2. Given a balance, then it shows UGX without decimals and an as-at date.
  3. Given a guardian switching from learner A to B, then no field of A remains visible or
     announced.
  4. Given an idle shared device past the tenant timeout, then the session locks after a warning
     with a "stay signed in" option.
- **Rule IDs:** PX-ARCH-008, PX-NAV-002, PX-LAYOUT-004, PX-L10N-001, PX-PRIV-008, PX-PRIV-009,
  PX-OFFLINE-004, PX-PROFILE-008.

## PD-14 — Account balance and transaction history

- **Family:** F3 Money control and finance (finance engine activates alongside). Leads: Maduuka,
  Aqar.
- **Archetype:** AR-08 Financial control.
- **Pattern:** A strong balance card over recent transactions and a spending chart. This dossier
  owns ledger truth: the balance must be the ledger's balance, at a stated time.
- **Primary task and success metric:** Know the current balance and recent movements. Target: the
  balance and its as-at time paint on load, from cache within 1 s (proposed) on the baseline device.
- **Anatomy (priority order):**
  1. Account selector (till, bank, mobile-money wallet).
  2. Balance as the screen's one hero figure, with as-at time; available balance shown separately
     where it differs from ledger balance.
  3. Pending movements, visually and textually separate from posted ones.
  4. Posted transactions grouped by date, with running balance.
  5. Period selector, category chart (collapsed on compact), export.
- **Domain states:** pending versus posted; reversal (an entry of its own, linked to the original);
  balance cached offline with age; FX-converted with rate and time; negative or overdrawn; account
  closed.
- **Kaizen corrections:**
  - Source "correct number formats and periods", upgraded: precision follows the currency's
    ISO 4217 minor unit; grouping follows locale; the period label sits on the chart and the list.
  - Added: negatives carry a minus sign and the word "overdrawn", not red alone.
  - Added: a reversed transaction is never deleted or hidden.
- **Adaptive behaviour:**
  - Compact: balance, pending, then the posted list; chart behind "Spending by category".
  - Medium: list beside the selected transaction's detail and source document.
  - Expanded: table with date, reference, description, debit, credit and running balance columns.
- **East African context:** a business typically holds a cash till, one or two mobile-money wallets
  and a bank account; UGX accounts show no decimals while USD accounts show two. Tenants that use
  Arabic choose Western or Arabic-Indic digits once, applied everywhere.
- **Chwezi application:** Maduuka "Cash and bank" accounts; Aqar tenant and landlord ledgers.
- **Acceptance tests:**
  1. Given a reversed payment, then two linked entries appear and the original remains visible.
  2. Given a period change, then balance, list, totals and chart all reflect the same period.
  3. Given a UGX account, then no figure shows ".00"; given a USD account, then two decimals show.
  4. Given no network, then the balance shows "as at" with the cache age, never "now".
- **Rule IDs:** PX-DATA-004, PX-DATA-009, PX-DATA-011, PX-L10N-001, PX-L10N-008, PX-TYPE-004,
  PX-OFFLINE-004, PX-COLOUR-002.

## PD-15 — Category budget tracker with honest percentages

- **Family:** F3 Money control and finance. Applies to every product with budgets.
- **Archetype:** AR-08 Financial control.
- **Pattern:** Progress bars per category, reminders and an expense breakdown. Keep the bar's
  instant "how much is left" reading; fix the arithmetic that sits under it.
- **Primary task and success metric:** Find which categories are over budget. Target: overspend is
  identifiable from text labels alone, without reading any chart.
- **Anatomy (priority order):**
  1. Period header with days elapsed ("Day 18 of 30").
  2. Summary: total spent, total budget, remaining, and percent computed from those sums.
  3. Category rows: name, spent, budget, remaining, percent used, status word.
  4. Bar per row with a 100% marker; spend beyond 100% extends past it in a hatched pattern.
  5. Reminders and the expense list behind each category.
- **Domain states:** under; near (85% or more, proposed); over (shown as the true figure, e.g. 132%);
  no budget set (no percentage at all); zero budget with spend; on pace or ahead of pace against
  days elapsed.
- **Kaizen corrections:**
  - Source "avoid misleading percentage aggregates", upgraded: the summary percentage is total
    spent over total budget; averaging category percentages is a failing test.
  - Added: bars never clip at 100%; an over-budget row shows the excess amount in words.
  - Added: pace compares spend share with time share, labelled as a projection.
- **Adaptive behaviour:**
  - Compact: summary then rows; the bar sits under the figures, not in place of them.
  - Medium: rows beside the selected category's transactions.
  - Expanded: sortable table by percent used and by amount over budget.
- **East African context:** school departments, clinic wards and shop branches run cash-heavy budgets
  reviewed monthly; amounts are UGX with no decimals and large values group with locale separators.
- **Chwezi application:** Maduuka expense budgets by branch; Medic8 department budgets; Aqar
  maintenance budgets per property.
- **Acceptance tests:**
  1. Given categories of 1,000,000 and 100,000 UGX budgets at 50% and 150%, then the summary shows
     59%, not 100%.
  2. Given an over-budget category, then the row carries "Over budget by UGX 50,000" as text.
  3. Given a category with no budget, then it reads "No budget set" and shows no percent.
  4. Given a greyscale render, then under, near and over remain distinguishable.
- **Rule IDs:** PX-DATA-003, PX-DATA-004, PX-DATA-002, PX-VIZ-005, PX-COLOUR-002, PX-L10N-001,
  PX-TABLE-002.

## PD-16 — Wellness services and appointment hub

- **Family:** F7 Clinical and care. Lead product: Medic8.
- **Archetype:** AR-07 Scheduling workspace.
- **Pattern:** Soft pastel service tiles, upcoming appointments and a personal profile. The hub
  feels welcoming; the risk is that lifestyle goals start to look like clinical results.
- **Primary task and success metric:** Book or manage a wellness appointment (physiotherapy,
  nutrition counselling, antenatal class). Target: booking completes in at most 4 steps.
- **Anatomy (priority order):**
  1. Next appointment: date, time, provider, location, reschedule and cancel.
  2. Services as text rows with an icon, each showing duration and price.
  3. Session packages: "3 of 10 sessions used".
  4. "Your goals" section for lifestyle tracking.
  5. A link to "Clinical results", which opens Medic8's clinical view under its own rules.
- **Domain states:** slot taken; provider cancelled (alternatives offered); rescheduled; reminder
  sent by SMS; no-show recorded; package expired; deposit pending.
- **Kaizen corrections:**
  - Source "distinguish lifestyle progress from clinical metrics", upgraded: lifestyle goals never
    use clinical reference ranges, abnormal flags or danger colour, and live in a separate section.
  - Added: pastel tiles become neutral rows; contrast is measured, colour is not the identifier.
  - Added: notification text on the lock screen names no service ("You have an appointment
    tomorrow at 10:00").
- **Adaptive behaviour:**
  - Compact: next appointment, services, packages, goals, in that order.
  - Medium: services beside a month calendar of availability.
  - Expanded: week calendar with appointment detail and package panel.
- **East African context:** reminders go by SMS because data bundles lapse; deposits come by mobile
  money. Family-shared phones make discreet notifications a privacy requirement, not a nicety.
- **Chwezi application:** Medic8 outpatient wellness booking, where a facility offers such services.
- **Acceptance tests:**
  1. Given any goal metric, then it shows no reference range, abnormal flag or danger colour.
  2. Given a provider cancellation, then the patient receives in-app and SMS notice with
     alternatives.
  3. Given the lock screen, then the notification names no service or clinician.
  4. Given a new patient, then booking completes in 4 steps or fewer.
- **Rule IDs:** PX-DATA-006, PX-PROFILE-003, PX-PRIV-002, PX-NOTIFY-001, PX-NOTIFY-002,
  PX-COLOUR-001, PX-COLOUR-005.

## PD-17 — Savings-goal tracker with restrained hero surface

- **Family:** F3 Money control and finance. Leads: Maduuka (owner), Aqar.
- **Archetype:** AR-08 Financial control.
- **Pattern:** A gradient hero card over clean transactions and goals. This dossier owns surface
  restraint: one expressive panel is allowed per screen, and it must still read in sunlight and
  in dark mode.
- **Primary task and success metric:** See progress toward a saving goal and what it now needs.
  Target: goal amount, saved amount, remaining amount and target date are all present as text.
- **Anatomy (priority order):**
  1. Hero surface for the primary goal: name, saved of target, remaining, target date, and the
     amount needed per week to stay on track.
  2. Other goals as plain rows.
  3. Contributions with source (cash, mobile money, transfer).
  4. "Add contribution".
- **Domain states:** on track; behind (shortfall per week stated); achieved; target date passed;
  paused; contribution pending confirmation.
- **Kaizen corrections:**
  - Source "limit gradients to high-level surfaces", upgraded: the gradient is a hero token, used
    once per screen, never on task screens or rows.
  - Added: text on the gradient is measured at the lightest stop, in both themes.
  - Added: reaching a goal gets a quiet confirmation, never a confetti burst.
  - Added: a progress ring appears only with its numbers beside it.
- **Adaptive behaviour:**
  - Compact: hero at the top, rows below; hero height capped so the first row shows on load.
  - Medium: hero beside the contributions list.
  - Expanded: goal list as a table with the hero as a summary panel.
- **East African context:** group saving traditions make "goal" familiar; contributions often come
  by mobile money in small, irregular amounts, so weekly need is more useful than a monthly figure.
- **Chwezi application:** Maduuka owner reserves (restock fund, rent reserve); Aqar building
  sinking fund. Only where a product's requirements include goals.
- **Acceptance tests:**
  1. Given the hero, then text contrast at the lightest gradient stop is at least 4.5:1 in light
     and dark.
  2. Given reduced motion, then the hero renders its final state at once and content is unchanged.
  3. Given a goal behind schedule, then the hero states the weekly amount now needed.
  4. Given a task screen, then a lint finds no gradient brush outside the hero token.
- **Rule IDs:** PX-COLOUR-006, PX-COLOUR-003, PX-COLOUR-001, PX-MOTION-002, PX-MANDATE-013,
  PX-VIZ-002, PX-TOKEN-001.

## PD-18 — Period-over-period spending comparison

- **Family:** F3 Money control and finance. Applies to every product's reports.
- **Archetype:** AR-04 Analytics workspace.
- **Pattern:** Clean financial lists, bar charts and goal context. This dossier owns comparison
  maths: what is compared with what, over equal spans, with honest change figures.
- **Primary task and success metric:** Compare this period with an earlier one. Target: every delta
  shows amount and percent with both period labels in view.
- **Anatomy (priority order):**
  1. Period pair selector (this month vs last month; this month vs same month last year).
  2. Headline sentence: "Spending rose UGX 2,400,000 (12%) against September."
  3. Grouped bars on a zero baseline, current and prior distinguished by pattern as well as tone.
  4. Category table: current, prior, change amount, change percent.
  5. Partial-period flag and like-for-like switch.
- **Domain states:** current period partial ("1-12 Nov vs 1-12 Oct" offered); no prior data;
  prior value zero (shown as "new", never as an infinite percent); figures restated after a late
  posting (marked).
- **Kaizen corrections:**
  - Source "precise units and contextual comparisons", upgraded: like-for-like comparison is the
    default for partial periods; whole-period comparison is labelled when chosen.
  - Added: percentage-point change is used for rates and labelled "pts"; percent change for amounts.
  - Added: abbreviated figures ("UGX 2.4M") carry the full value in the accessible label.
- **Adaptive behaviour:**
  - Compact: headline sentence, chart at no more than 40% of viewport height, then the table as rows.
  - Medium: chart beside the category table.
  - Expanded: chart, table and a drill-down panel to transactions.
- **East African context:** seasons drive spend (school terms, harvest, festive months), so
  same-period-last-year is a first-class choice. Long UGX values need abbreviation rules that never
  lose precision in tables.
- **Chwezi application:** Maduuka sales and expense reports; Medic8 revenue reports; any product's
  analytics workspace.
- **Acceptance tests:**
  1. Given a partial current month, then the default comparison spans equal day ranges and says so.
  2. Given a prior value of zero, then the change percent reads "new", not a number.
  3. Given the chart, then the text summary states the same figures as the bars.
  4. Given an abbreviated value, then the screen reader reads the full amount.
- **Rule IDs:** PX-DATA-003, PX-VIZ-001, PX-VIZ-005, PX-A11Y-005, PX-DATA-002, PX-TYPE-004.

## PD-19 — Clinician appointment booking with live availability

- **Family:** F7 Clinical and care. Lead product: Medic8.
- **Archetype:** AR-07 Scheduling workspace + AR-09 Transaction / checkout.
- **Pattern:** Clinician cards, a slot picker, a location map and a sticky booking action. The
  strength is choosing a person and a time in one flow; the gap is honesty about how current the
  slots are.
- **Primary task and success metric:** Book a slot with a clinician. Target: slot availability shows
  its age; a confirmed booking returns a reference on the same screen.
- **Anatomy (priority order):**
  1. Clinician or service choice with specialty and languages spoken.
  2. Date strip and slot grid with "availability as at 09:42".
  3. Hold notice for the chosen slot with its expiry time in text.
  4. Patient details, pre-filled for a known patient.
  5. Confirmation: reference, time with zone where relevant, location, preparation notes.
- **Domain states:** slot held (5 minutes, proposed); hold expired; slot taken by another booking;
  confirmation pending; confirmed; offline (a booking request, clearly not a booking); clinician on
  leave; deposit pending.
- **Kaizen corrections:**
  - Source "show time zone, availability freshness, confirmation", upgraded: time zone appears when
    patient and facility zones differ; a confirmation is shown only after the server commits.
  - Added: the server holds and commits slots atomically; a race produces one winner and a clear
    message for the other with nearby alternatives.
  - Added: the map is a static, optional link, never a live map in the booking path.
- **Adaptive behaviour:**
  - Compact: clinician, slot, details, confirm as four steps with state retained on back.
  - Medium: clinician list beside slot grid.
  - Expanded: multi-clinician day grid for receptionists, with keyboard slot navigation.
- **East African context:** confirmations go by SMS as well as in-app. Diaspora and telehealth
  patients need the zone shown (EAT for the facility). Referrals from upcountry often book days
  ahead, so held slots must survive patchy connectivity on the receptionist's side.
- **Chwezi application:** Medic8 reception booking and patient self-booking.
- **Acceptance tests:**
  1. Given two clients booking the same slot at once, then one succeeds and the other sees
     "slot just taken" with alternatives.
  2. Given no network, then the action reads "Send booking request" and the result is labelled
     "Request, not yet booked".
  3. Given a patient in another time zone, then both zones appear on the confirmation.
  4. Given a confirmed booking, then an SMS with the reference is logged as sent.
- **Rule IDs:** PX-STATE-002, PX-OFFLINE-003, PX-L10N-006, PX-INTERACT-002, PX-NOTIFY-002,
  PX-PROFILE-003, PX-DATA-009.

## PD-20 — Module launcher and entitlement-aware feature map

- **Family:** F4 Property and community (origin); applies to every product shell.
- **Archetype:** AR-13 Module launcher.
- **Pattern:** A launcher of modules drawn as a functional icon map. Keep the overview; remove the
  decorative connector lines that look tappable. This dossier is the complete map that PD-12's
  bounded shortcuts point into.
- **Primary task and success metric:** Open any module the user is entitled to. Target: the
  launcher is reachable in 1 tap from every top-level screen; only entitled modules appear.
- **Anatomy (priority order):**
  1. Module search.
  2. Recent modules, at most 4.
  3. Modules grouped by job (Sales, Stock, People, Finance), each an icon with a text label.
  4. Offline-capable marker on modules that work without network.
  5. "Available to add", shown to tenant administrators only.
- **Domain states:** entitled; not entitled (hidden from staff, shown to the admin with an upgrade
  route); role-restricted (hidden); online-only module opened offline (explains and offers cached
  views); newly enabled (marked once, then plain).
- **Kaizen corrections:**
  - Source "do not render promotional connectors as navigation", upgraded: no decorative line or
    shape has a hit target or an accessible role.
  - Added: entitlement and role filtering happen on the server; the launcher refreshes on
    entitlement change without reinstall.
  - Added: no upgrade prompt ever appears to non-admin staff.
- **Adaptive behaviour:**
  - Compact: full-screen launcher from the "More" destination; groups as labelled grids.
  - Medium: launcher as a rail flyout with groups.
  - Expanded: persistent sidebar sections; search focuses with a keyboard shortcut.
- **East African context:** tenants on smaller plans see fewer modules, so the map must look
  complete at any size. Staff with limited reading confidence rely on icon plus text. The
  offline-capable marker sets expectations before a trip to the field or a power cut.
- **Chwezi application:** the "All modules" screen of Maduuka, Medic8, Farm Acre, Aqar, SpannaMax
  and the saas-seeder shell.
- **Acceptance tests:**
  1. Given an entitlement removed on the server, then the module disappears on next refresh with no
     reinstall.
  2. Given the screen reader, then modules are read by name and no connector is focusable.
  3. Given a cashier role, then no upgrade or "available to add" content renders.
  4. Given airplane mode, then online-only modules are marked and opening one explains why.
- **Rule IDs:** PX-NAV-001, PX-NAV-004, PX-PRIV-001, PX-PRIV-006, PX-A11Y-001, PX-L10N-009,
  PX-OFFLINE-001, PX-BLACKLIST-003.
