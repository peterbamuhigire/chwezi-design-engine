# Chwezi Product Excellence Standard

**Status:** Adopted by Lead Developer Peter Bamuhigire and the Chwezi Core Systems design team.
Effective 01 November 2026 until further communication is given on the matter.
**Version:** 1.0.2 (policy file `product-excellence-policy.yaml` carries the same version)
**Owner:** Peter Bamuhigire / Chwezi Core Systems
**Applies with:** `doctrine/design-doctrine.md` (presentation doctrine) and
`governance/design-quality-gate.md` (release gate)
**Agent entry point:**
[chwezi-product-excellence-standard](../skills/00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md)

This is the governing product-quality standard for Chwezi software. It says what a Chwezi app
must do for the people who use it every working day, how that is proved, and when a release is
blocked. It is an internal policy, not an industry certification, and no Chwezi proposal may
present it as one.

## Why it exists

Chwezi products are used at a shop counter, a ward, a farm, a workshop and a property office, by
staff who repeat the same task hundreds of times a day on shared, low-cost Android phones and
tablets, over intermittent and metered networks, in several languages, with money and patient
records at stake. In that setting quality is not polish. It is: the task finishes fast, nothing
is lost when the network drops, the numbers are right, the screen says honestly what was saved,
and nobody sees data they should not. This standard turns those outcomes into checkable rules.

## Scope

- **Every Chwezi app and system**, on Android, iOS, tablet, desktop and web, including internal
  tools, tenant portals and admin consoles, from the date above.
- **New and existing products.** New work complies from its first release. Existing products
  comply for every screen they touch from the effective date and burn down the rest under a
  dated ratchet plan (counts may only fall).
- **Stacks.** Kotlin Multiplatform with Compose Multiplatform is the primary mobile stack.
  Existing web front ends keep their stack (server-rendered PHP, React, Tailwind and similar)
  and adopt the same tokens, states and behaviour. Interaction parity is required, pixel
  identity is not, and no rewrite is implied.
- **Out of scope.** Marketing websites (the conversion and web-page skills govern them), print
  collateral and slide decks, except where they reproduce product screens. Dashboards, documents,
  decks and infographics are governed by the four child systems named under "The Chwezi standards
  family"; this standard's UI/UX, token, accessibility, performance, brand and QA rules still apply
  to them.

## Normative language

| Word | Meaning | Departure |
|---|---|---|
| **MUST** | Required. Observable and binary. A failure on a rule mapped to a hard gate blocks release; any other MUST failure is a finding that lowers its scorecard dimension and carries an owner and a date. | Not allowed. A MUST that is genuinely impossible on a platform is escalated to the owner; it is never quietly skipped. |
| **SHOULD** | The default. | Allowed only with a design decision record (DDR) that names the problem, at least two alternatives, the choice, the trade-offs, the evidence, the owner and a review date. |
| **MAY** | Optional good practice. | No record needed. |

A rule that cannot be checked is not a MUST. Where the standard sets a number (a timing, a
target size, a threshold), the number is the check. Words such as "premium", "elegant" or
"delightful" carry no weight on their own; they are judged through the scorecard.

Every rule has a stable ID of the form `PX-<AREA>-NNN` in the
[rules catalogue](../skills/00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/references/rules-catalogue.md).
IDs are never reused; a withdrawn rule keeps its ID with the status `WITHDRAWN`.

## Authority and precedence

The versioned text in this repository and the machine-readable policy file are the authority.
Any PDF or DOCX is a rendering. The original Chwezi design bible is retained as evidence in the
private knowledge bank; where it and this standard differ, this standard wins.

When two requirements conflict, the higher item wins:

1. **Law, safety and privacy** - statutory, fiscal, clinical-safety and data-protection duties,
   and the product's domain safety rules.
2. **Accessibility** - WCAG 2.2 AA and the platform accessibility requirements.
3. **Data integrity** - correct money, stock, tax and clinical values; honest sync state; no
   duplicates; no silent loss.
4. **This standard** - its MUST rules, then its SHOULD defaults. Where two of its gates differ,
   the stricter applies.
5. **House style (visual layer)** - `chwezi-business-app-house-style`: tokens, type pair,
   shapes, components and motion.
6. **Product brand** - the product's brand primary, logo, illustration subset and voice.

Semantic state meaning (success, warning, danger, info, neutral, destructive) sits at step 4 and
can never be changed by a product brand or theme. Reference studies and mockups are inspiration
only and never sit in this ladder: features, fields, prices, calculations, clinical rules and
permissions come from requirements, the domain model and the running product.

## Hard release gates

Any one of these, found on a core journey, blocks release regardless of score. Each gate needs
`MEASURED` evidence to be closed; an applicable gate whose evidence is `NOT_ASSESSED` counts as
open.

| Gate | Fails when | Main rules |
|---|---|---|
| PX-GATE-01 Duplicates | A double tap, timeout-then-retry or offline replay creates more than one record or charge. | PX-INTERACT-002, PX-OFFLINE-002 |
| PX-GATE-02 False confirmation | Anything shows "saved", "paid", "sent" or "live" before the server or provider confirms it; queued shown as confirmed; stale shown as live. | PX-STATE-002, PX-OFFLINE-003/004, PX-DATA-010, PX-PROFILE-002 |
| PX-GATE-03 Numbers do not reconcile | Money, stock, tax or clinical values differ from the authoritative ledger or report; currency minor unit wrong (for example UGX shown with decimals); due, received and reconciled conflated. | PX-DATA-003/004/005/011/012, PX-L10N-001 |
| PX-GATE-04 Interface-only authorisation | A restricted action or record is reachable by calling the API with a lower-role session. | PX-PRIV-001 |
| PX-GATE-05 Sensitive data exposed | Patient, payroll, credential or full account data visible to a role without need, unmasked, captured in recents or screenshots, or sent in analytics. | PX-PRIV-002/003/007/010 |
| PX-GATE-06 Accessibility failure | Any applicable WCAG 2.2 AA failure, missing accessible name, or a core task that cannot be finished with a screen reader or keyboard. | PX-A11Y-*, PX-COLOUR-001/002, PX-GEOM-005, PX-FORM-001/003 |
| PX-GATE-07 Large-text loss | At 200% text (or the platform's largest accessibility size where tested) a primary action or essential value is clipped, hidden or truncated without an accessible full value. | PX-TYPE-002/005 |
| PX-GATE-08 Work lost or blocked | Process death, rotation, back, connectivity loss or a failing non-core service (analytics, media) loses a cart, draft or record, or blocks the core task. | PX-INTERACT-006, PX-NAV-002, PX-OFFLINE-005, PX-STATE-006, PX-PERF-008 |
| PX-GATE-09 Invented or fabricated content | Demo or fixture data in a production build; a field, feature, destination or clinical statement with no requirement behind it. | PX-MANDATE-004, PX-NAV-004, PX-DATA-001/006, PX-PROFILE-004 |
| PX-GATE-10 Missing state | A screen lacks one of the canonical states without a declared "not applicable" reason. | PX-STATE-001 |
| PX-GATE-11 Device budget broken | No measurement on the declared baseline device (emulator-only evidence), a regression beyond the recorded budget, or an Android vitals bad-behaviour threshold exceeded. | PX-PERF-001/002/003/015/017 |
| PX-GATE-12 Unverified release | No independent verifier, or a human domain reviewer absent for a financial or clinical change. | PX-QA-004/006/012 |
| PX-GATE-13 Document numbering broken | Where a screen issues numbered documents: a number that is not contiguous per tenant and document type, allocated at draft or on the client, derived from COUNT+1, MAX+1 or the row id, changed on replay, shown as final while provisional offline, or a numbered document deleted instead of voided (owner standing rule, 5 Nov 2026). | PX-DATA-013 |

## Release decision

Six weighted dimensions are scored 0-4 on evidence and scaled to 100: task usability and speed
25, reliability and recovery 20, visual and interaction craft 15, accessibility and inclusion 15,
performance and efficiency 15, security and data trust 10.

| Verdict | Condition |
|---|---|
| **PASS** | Score at least 85, zero open hard gates (every applicable gate closed on `MEASURED` evidence) and no dimension scored below 2. |
| **CONDITIONAL** | Zero open hard gates, no dimension scored 0, and either a score of 70-84 or any dimension scored 1 (a 1 caps the verdict at CONDITIONAL whatever the total). Every shortfall has a named owner and a dated remediation, and the product owner and the Lead Developer accept the limited release in writing. Pilot or limited rollout only; re-scored before general release. |
| **BLOCKED** | Any open hard gate (an applicable gate with `NOT_ASSESSED` evidence counts as open), any dimension scored 0, a score below 70, or a CONDITIONAL case without owned, dated remediation and written acceptance. |

A high score never buys back a hard gate. The rubric, the sign-off charter and the evidence pack
are in the skill's `references/scorecard-and-release-gate.md`; the policy file holds the same
numbers in machine-readable form.

## Relationship to other design-engine doctrine

**House style.** `09-design-systems-tokens-and-theming/chwezi-business-app-house-style` is the
visual implementation layer: colour roles, type pair, scales, components, motion and guardrail
tests. This standard is the governing product-quality layer: behaviour, states, data trust,
access, performance and proof. Neither restates the other. Resolved conflicts (owner default,
2026-11-07):

| Topic | Resolution |
|---|---|
| Accent model | House model wins: a per-product brand primary plus one shared amber accent for the single next step on a screen. Any further colour needs a DDR. |
| Semantic roles | House style gains `warning`, `info` and `neutral` roles, each with on- and container- pairs measured in light and dark. The token name is `danger`; "critical" is a severity label, not a colour role. |
| Card radius | House values win (cards 20, hero and sheets 28). The source bible's 12-20 dp range is superseded. Data tables and dense lists are never over-rounded. |
| Spacing | House scale 2, 4, 8, 12, 16, 24, 32, 48. The 2 step is for optical nudges only. |
| KPI component | `KpiCard` in code, "KPI card" in prose; the house "KPI tile" maps to it. |
| Motion | State and navigation transitions 120-300 ms on every screen. Summary flourishes (reveal, count-up, chart grow-in) only on summary and hub pages, once per visit, at most 1.2 s in total, never on operational screens, and off under reduced motion. |
| Distinctiveness | The authored signature lives at product-family level and on hub and summary surfaces. Operational screens (POS, dispensing, field forms) favour consistency and speed; no per-screen novelty. |

**Money figures.** `12-data-viz-and-dashboards/money-figures-and-statement-display` governs how
amounts and statements are laid out and abbreviated. This standard **overrides its "always two
decimals" rule**: the number of decimals in a full amount comes from the currency's ISO 4217
minor unit. UGX and RWF have 0 (show `USh 1,250,000`, never `1,250,000.00`); KES, TZS and USD
have 2; TZS cash rounding follows CLDR cash digits. Amounts are stored as integer minor units per
currency. Compact forms (K, M, B) remain as that skill defines them, because their decimals scale
the unit rather than express minor units; they are never used for a closing balance, invoice
total or payment input.

**Typography.** Typeface choice is made under the typography skills (`font-selection-and-pairing`,
`ai-slop-typography-audit`) and the house pair. A Chwezi app never ships the framework default
face or a bare system stack as its primary type; the Android and Compose default face is on the
hard-ban list in `doctrine/references/ai-slop-banned-fonts.md`. Arabic uses a covering face from
the same design family decision. Figures use tabular numerals everywhere, including amounts inside
sentences.

**The Chwezi standards family (owner decision, 8 November 2026).** The Chwezi standard is one
family: this parent standard and four child systems. The parent governs product UI/UX, design
tokens, accessibility, performance, brand adaptation and quality assurance everywhere. Each child
governs one domain of output, sits beside the parent at step 4 of the ladder (the stricter rule
applies), adds its own rules and eight gates, and leaves every parent check unchanged. The children
complement each other and never compete: when one artefact falls under two children (an infographic
inside a deck or a report), both apply and the stricter rule wins.

Mobile and tablet UI belong to the parent: every app screen on Android and iOS phones, tablets, POS
tills, desktop and web follows this standard's width classes, touch targets, large-text, offline and
baseline-device rules. Every child inherits them for its own output wherever that output is viewed
on a phone or tablet: a dashboard at compact and medium widths, a document's browser reading mode, a
deck's PDF read on a tablet, an infographic in a phone feed or on a tablet.

| Child system | Governs | Binding text | Rules and gates |
|---|---|---|---|
| 1. Dashboards and analytics | Dashboards, reports, statements, print and exports in products | `doctrine/reporting-and-dashboards-standard.md` | `RPT-`, `RPT-GATE-01` to `08` |
| 2. Documents and publishing | Formal documents as browser reading mode, A4 PDF and DOCX | `doctrine/document-publishing-standard.md` | `PUB-`, `PUB-GATE-01` to `08` |
| 3. Presentations and slide decks | Decks in PowerPoint and landscape PDF | `doctrine/presentation-standard.md` | `DECK-`, `DECK-GATE-01` to `08` |
| 4. Infographics and visual communication | Infographics and explanatory diagrams for web, SaaS, social, slides, DOCX, PDF and print to A2 | `doctrine/infographics-standard.md` | `INFO-`, `INFO-GATE-01` to `08` |

**Design quality gate.** `governance/design-quality-gate.md` remains the gate every artefact
passes. For Chwezi app work, this standard's scorecard and hard gates run inside that gate as an
additional section; an applicable AA failure blocks `PASS` in both.

## Owner defaults (2026-11-07)

Recorded as "owner default, 2026-11-07"; the owner may override any of them.

- **Languages.** Each product declares its supported locales. The default portfolio list is
  English, Luganda, Swahili, French, Arabic (right to left), Kinyarwanda and Spanish. Every app
  passes layout tests in its longest supported language and in Arabic RTL. Earlier
  "six-language" wording is superseded.
- **Idle lock on shared devices** (tenant-configurable, SHOULD): shared POS 2 minutes, clinical
  5 minutes, back office 15 minutes, each preceded by a visible warning that preserves work.
- **Fiscal e-invoicing** may be named as "fiscal e-invoicing (e.g. URA EFRIS)"; receipts show the
  fiscal document number and verification code when the integration is enabled.
- **Release thresholds** as in the release decision table above.

## Current platform baseline

These platform facts shape several MUST rules. They were read on the primary sources on
2026-11-07; the skill's `references/currentness-register.md` holds the URL, access date, status
and review date for each, and anything not verified there is `NOT_ASSESSED` and is not asserted.

- WCAG 2.2 (W3C Recommendation, updated 12 Dec 2024) is the conformance target; WCAG 3.0 is a
  Working Draft and is never a conformance target.
- Touch targets: Chwezi uses 48x48 dp on Android and 44x44 pt on iOS, raised to 56 dp for glove,
  field and POS keypad use. The WCAG 2.5.8 AA web floor of 24x24 CSS px is a minimum only.
- Android apps distributed through Google Play target API 36 from 31 August 2026: edge-to-edge
  has no opt-out, predictive back is on by default, and orientation or aspect-ratio locks are
  ignored on displays of smallest width 600 dp or more.
- Width window classes: compact under 600 dp, medium 600-839, expanded 840-1199, large 1200-1599,
  extra-large 1600 and above; height classes compact under 480 dp, medium 480-899, expanded 900
  and above.
- Android vitals core thresholds: user-perceived crash rate 1.09% and ANR rate 0.47% overall
  (8% per device model), over 28 days.
- Core Web Vitals "good" at the 75th percentile: LCP 2.5 s or less, INP 200 ms or less, CLS 0.1
  or less.
- Compose Multiplatform: Android, iOS and desktop stable; web (Wasm) Beta, so production web
  use needs a DDR.
- Reduced motion is honoured as a Chwezi house MUST; in WCAG it is 2.3.3, Level AAA.

## How agents apply it

Agents load the skill
[chwezi-product-excellence-standard](../skills/00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md)
for any Chwezi app interface work, in addition to the house style and the domain skill. In short:
inspect before building, baseline, write a screen contract with the full state matrix, build
behaviour and states before visual refinement, verify with measured evidence, have a different
reviewer verify, score, and record the verdict and any DDRs in the product repository. Unrun
checks are reported `NOT_ASSESSED`, never as passes.

## Evidence states

Two separate vocabularies are used and never mixed.

| Applies to | States | Meaning |
|---|---|---|
| Facts about platforms and standards | `VERIFIED`, `CHANGED`, `NOT_ASSESSED` | Read on the primary source on the recorded date; corrected value recorded; not readable or not stated, so not asserted. |
| Release evidence for a rule or gate | `MEASURED`, `HEURISTIC`, `NOT_ASSESSED` | Produced by a test, trace, assistive-technology run or reconciliation; reviewer judgement against a checklist; not performed. |

Only `MEASURED` evidence closes a hard gate. A heuristic review may say "likely fails"; only a
measurement may say "passes". Static images and mockups are never release evidence.

## Change control

- **Who may amend.** Lead Developer Peter Bamuhigire approves every change. Members of the Chwezi
  Core Systems design team and engine agents may propose changes through a DDR or a Kaizen record
  with evidence; a proposal is not in force until approved and released.
- **Versioning.** Semantic versions shared by this file, the policy file and the rules catalogue.
  Patch: wording and currentness refreshes with no change to any check. Minor: new SHOULD or MAY
  rules, new evidence types, new screen or component contracts. Major: any new, removed or
  re-levelled MUST, any gate change, any threshold or weight change.
- **Currentness.** Volatile library facts are re-checked monthly, platform guidance quarterly,
  and standards six-monthly, per the currentness register. A fact that lapses becomes
  `NOT_ASSESSED` until re-read.
- **History.** Every release is logged in the engine `CHANGELOG.md` with the rule IDs affected.
  Product repositories record the standard version they were assessed against.
