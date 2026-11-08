---
name: chwezi-product-excellence-standard
description: "Use when any Chwezi app or system screen (Android, iOS, tablet, desktop, web) is designed, built, reviewed or released: apply the binding Product Excellence rules, state matrix, 13 hard gates and scorecard verdict. Visual tokens route to chwezi-business-app-house-style; money layout to money-figures-and-statement-display."
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Chwezi Product Excellence Standard

Applies the binding Chwezi Product Excellence Standard to app and system interface work and
decides whether a release may ship. The standard was adopted by Lead Developer Peter Bamuhigire
and the Chwezi Core Systems design team, effective 01 November 2026 until further communication.
Binding text: [doctrine/product-excellence-standard.md](../../../doctrine/product-excellence-standard.md).
This skill is the procedure; the doctrine is the law; the rules catalogue and policy file are the
checkable detail.

The standard covers behaviour and proof: fast repeat work, honest sync and payment state,
correct UGX and multi-currency numbers, no lost work on low-end Android over poor networks,
shared-device safety, accessibility, and seven languages including Arabic RTL. Looks belong to
the house style.

<!-- dual-compat-start -->
## Use When

- Starting, changing or reviewing any screen, flow or component of a Chwezi app or system, on any
  platform or stack (Compose Multiplatform, Android, iOS, server-rendered or SPA web).
- Writing a screen contract, state matrix, component contract or handoff for Chwezi software.
- Deciding whether a Chwezi release is PASS, CONDITIONAL or BLOCKED.
- Resolving a conflict between product needs, the house style, a reference mockup and platform
  guidance.
- Bringing an existing Chwezi product onto the standard with a ratchet plan.
- Another engine asks what a Chwezi app screen must satisfy.

## Do Not Use When

- The question is the visual layer only (colour roles, type pair, scales, the shared component
  look, motion values): [chwezi-business-app-house-style](../../09-design-systems-tokens-and-theming/chwezi-business-app-house-style/SKILL.md).
  Co-activate it for any build.
- How money figures and statements are laid out or abbreviated:
  [money-figures-and-statement-display](../../12-data-viz-and-dashboards/money-figures-and-statement-display/SKILL.md)
  (with this standard's UGX override, below).
- Detailed component state and interaction fidelity:
  [component-states-and-interaction-fidelity](../../04-web-and-ui-design/component-states-and-interaction-fidelity/SKILL.md).
- A full WCAG 2.2 audit procedure:
  [accessibility-wcag-2-2-compliance](../accessibility-wcag-2-2-compliance/SKILL.md).
- Breakpoint and composition craft:
  [responsive-and-adaptive-layout](../../03-layout-grid-and-composition/responsive-and-adaptive-layout/SKILL.md).
- Platform-native detail: [android-ui-ux-design](../../07-mobile-ios-android-cross-platform/android-ui-ux-design/SKILL.md),
  [ios-ui-ux-design](../../07-mobile-ios-android-cross-platform/ios-ui-ux-design/SKILL.md),
  [cross-platform-design-parity](../../07-mobile-ios-android-cross-platform/cross-platform-design-parity/SKILL.md).
- Dashboard and KPI composition:
  [dashboard-and-data-product-design](../../12-data-viz-and-dashboards/dashboard-and-data-product-design/SKILL.md).
- Sector depth: [pos-and-retail-operations](../../06-sector-and-domain-ux/pos-and-retail-operations/SKILL.md),
  [healthcare-ui-design](../../06-sector-and-domain-ux/healthcare-ui-design/SKILL.md).
- State copy and visuals: [empty-error-and-loading-states](../../14-conversion-and-web-page-patterns/empty-error-and-loading-states/SKILL.md).
- Generic pre-launch design QA of a non-Chwezi artefact:
  [design-qa-and-pre-launch-review](../design-qa-and-pre-launch-review/SKILL.md).
- Marketing websites, decks and print collateral: they are outside the standard's scope.

## Required Inputs

| Input | Source | Required? | Why |
|---|---|---|---|
| Product and profile (Maduuka, Medic8, Farm Acre, Aqar, SpannaMax, Education/LMS, other) | User or project instructions | yes | Selects profile rules PX-PROFILE-* and raised targets |
| Screens or flow in scope, roles and the task each serves | Requirements, issue or user | yes | Screen contracts trace every field to a requirement |
| Platforms, stack and distribution (Play-distributed Android, iOS, web) | Repository build files | yes | Decides platform rules (targetSdk 36, web vitals) |
| Baseline device profile (model, RAM, OS, screen) | Project `PROFILE` file or owner | yes for release | Performance gates need real-device traces |
| Supported locales and currencies | Product profile | yes | Formatter, RTL and longest-language tests |
| Existing tokens, components, screenshots, tests | Repository | if the product exists | Baseline and ratchet counts |
| Requested outcome: build, review or release decision | User | yes | Sets edit permission and the output |

## Workflow

1. **Classify and scope.** Confirm the work is a Chwezi app or system and name the outcome (build,
   review, release decision). Not Chwezi software: stop and route to the neighbour. Record the
   standard version from the policy file.
2. **Inspect before building** (PX-AGENT-001). Read project instructions, architecture,
   requirements, domain rules, current screens, theme, tests and device profile. Do not overwrite
   working patterns. Stop if the role, task or product profile is unknown and would change the
   result; ask, or deliver a draft marked as such.
3. **Baseline** (PX-AGENT-002). Capture current screenshots, task timings, defects, accessibility
   findings and device observations. No device: mark performance `NOT_ASSESSED` and continue.
4. **Load the rules.** Select the areas that apply from the
   [rules catalogue](references/rules-catalogue.md) and the product profile in
   [product-profiles.md](references/product-profiles.md). Add platform rules from
   [foundations.md](references/foundations.md) and context rules (shared device, glove, clinical,
   offline) from the decision table below.
5. **Write the screen contract** (PX-AGENT-004) from the matching blueprint in
   [screen-blueprints-a.md](references/screen-blueprints-a.md) or
   [screen-blueprints-b.md](references/screen-blueprints-b.md): purpose, roles, anatomy, tokens,
   component tree, paths, adaptive variants, the 13-state matrix (PX-STATE-001; N/A needs a
   reason; loading, content, error and success are never N/A), semantics, provenance, performance notes, acceptance tests. Fields with no
   requirement are removed, not invented (PX-GATE-09).
6. **Resolve conflicts** with the precedence ladder in the doctrine. Any SHOULD departure gets a DDR
   using the template in [agent-implementation-protocol.md](references/agent-implementation-protocol.md).
   Owner defaults and the UGX override are already decided; do not reopen them in a project.
7. **Build in two passes** (PX-AGENT-006), one screen or phase at a time. Pass 1: flows, every
   state, offline and recovery, idempotency, permissions, keyboard and accessibility. Pass 2: type,
   spacing, hierarchy and measured motion through the house style. Stop pass 2 while any pass-1
   state is unfinished.
8. **Verify** (PX-AGENT-008). Run each rule's check and file its evidence code. Use
   [offline-and-low-end-performance.md](references/offline-and-low-end-performance.md),
   [data-trust-and-visualisation.md](references/data-trust-and-visualisation.md) and
   [accessibility-privacy-localisation.md](references/accessibility-privacy-localisation.md) for
   procedures. Unrun checks are `NOT_ASSESSED`, never passes.
9. **Independent verification and verdict.** A different agent or person reviews (PX-QA-006); a
   human domain reviewer signs financial and clinical changes. Score with
   [scorecard-and-release-gate.md](references/scorecard-and-release-gate.md), check the 13 gates,
   and issue the verdict. Any open gate: stop the release and list the repair.
10. **Record and recover.** File the evidence pack, scorecard, DDRs and release note (flags,
    rollback, communicated workflow changes) in the product repository. For a BLOCKED verdict,
    return the narrowest shippable slice and the owned repairs; for CONDITIONAL, pilot only with
    dated remediation.

## Decision Rules

**Release verdict**

| Condition | Verdict | Failure caused by the wrong choice |
|---|---|---|
| Any hard gate open (an applicable gate with `NOT_ASSESSED` evidence counts as open), or any dimension at 0 | BLOCKED | Shipping a duplicate charge, a false "paid" or a data leak to real customers |
| Score below 70 | BLOCKED | A weak build reaches users and the redesign costs more later |
| Zero open gates; score 70-84 or any dimension at 1 (a 1 caps at CONDITIONAL); every shortfall owned and dated; product owner and Lead Developer accept in writing | CONDITIONAL (pilot only); BLOCKED if any of these is missing | Treating it as PASS lets known friction reach every outlet |
| Zero open gates, score 85 or more, no dimension below 2 | PASS | Blocking a sound release erodes trust in the gate and invites bypass |

**Conflict resolution**

| Conflict | Decision | Wrong-choice risk |
|---|---|---|
| Mockup or reference shows a field or feature with no requirement | Leave it out; raise a requirement question | Invented capability, wrong prices or clinical claims (PX-GATE-09) |
| House style and a standard SHOULD differ on a visual value | House value wins; the behaviour rule still applies | Two competing token sets drift apart |
| Money-figures skill says two decimals; currency is UGX or RWF | ISO 4217 minor unit wins: 0 decimals for full amounts | `USh 1,250,000.00` misleads and breaks receipt reconciliation |
| Brand wants a second accent or a new hue | DDR and owner approval, else refuse | Two next steps split attention; palette sprawl |
| Platform default face would be quicker | Use the house pair or an audited alternative | Ships a hard-banned face; fails the slop gate |
| Accessibility and a product request clash | Accessibility wins (precedence step 2) | AA failure blocks the release anyway |

**Context raises the bar**

| Context | Raised rules | Wrong-choice risk |
|---|---|---|
| Shared POS or ward tablet | PX-PRIV-008 user switch and idle lock (POS 2 min, clinical 5 min); attribution per transaction | Sales or orders recorded under the wrong person |
| Glove, outdoor, workshop, POS keypad | 56 dp targets, 8 dp gaps, no gesture-only actions, 7:1 sunlight theme | Wrong taps, abandoned forms in the field |
| Payments by mobile money or card | PX-DATA-010 full state model; only provider-confirmed is "paid" | Double charge on retry; goods released unpaid |
| Clinical record or order | PX-DATA-006, PX-PROFILE-004, human domain sign-off | Patient harm from hidden critical result or unsafe default |
| Offline-first field or POS work | PX-OFFLINE-*, PX-INTERACT-002/006, provisional document numbers | Lost or duplicated records after reconnect |
| Play-distributed Android | Edge-to-edge insets, predictive back, no orientation lock at 600 dp+ | Content under system bars; broken back; store rejection risk |

## Capability Contract

- Read: repository code, theme, tests, screenshots, requirements and project instructions.
- Search: raw colour and size literals, idempotency keys, permission checks, state coverage.
- Edit: only when the user asks for implementation or remediation; reviews are read-only.
- Execute: unit, UI, screenshot, accessibility and benchmark tests; render on emulator, device or
  browser where available.
- Delegate: independent verification goes to a different agent instance or person.
- Never: publish to a store, deploy to production, push, or claim certification or conformance
  without the owner's stated authority and measured evidence.

## Degraded Mode

- **No real baseline device:** deliver contracts, code and emulator observations; mark PX-GATE-11
  `NOT_ASSESSED`; verdict cannot be PASS.
- **No renderer:** deliver contracts and tests; screenshots `NOT_ASSESSED`; block any release claim.
- **No screen reader or keyboard run possible:** run the automated scanner, mark PX-GATE-06
  `NOT_ASSESSED`, and list the manual runs still owed.
- **Requirements missing:** produce a qualified draft contract with every untraced field flagged;
  do not build those fields.
- **Policy file or catalogue unreadable:** use the doctrine's gate table as the minimum and say so.
- **Currentness lapsed** (review date passed in the currentness register): treat the fact as
  `NOT_ASSESSED`, keep the stricter Chwezi value, and flag a refresh.

## Anti-Patterns

- **Polish before states.** Pass-2 styling on a screen with no offline, conflict or error state.
  Correction: finish the state matrix and recovery paths first (PX-AGENT-006).
- **Optimistic "Paid".** The cart shows Paid when the mobile-money prompt is sent. Correction:
  "Waiting for customer approval" until the provider confirms; re-check status before retry.
- **Two decimals on UGX.** `USh 45,000.00` on receipts and totals. Correction: format from the
  currency's ISO 4217 minor unit; UGX shows `USh 45,000`.
- **Hidden button as security.** Void is hidden for cashiers but the API accepts it. Correction:
  enforce in the backend and test with a cashier token (PX-GATE-04).
- **Emulator evidence.** Startup and scroll "pass" on a desktop emulator. Correction: trace on the
  declared baseline phone with a realistic dataset.
- **Mockup as requirement.** A loyalty badge copied from a reference into checkout. Correction:
  remove it unless a requirement exists; references are inspiration only.
- **Self-review.** The implementing agent scores its own release PASS. Correction: a different
  verifier and, for money or clinical change, a human domain reviewer.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Screen contract with state matrix | Engineers, reviewer | Every field traced to a requirement; every canonical state evidenced or N/A with reason |
| DDR log | Owner, reviewer | One DDR per SHOULD departure, with two alternatives and a review date |
| Evidence pack | QA, owner | Each applicable rule has its evidence code filed; unrun checks marked `NOT_ASSESSED` |
| Scorecard and gate record | Release decision | Six dimensions scored 0-4 with evidence class; all 13 gates stated |
| Verdict and release note | Owner, support | PASS, CONDITIONAL or BLOCKED per the policy; flags, rollback and repairs listed |

## Examples

- [examples/worked-review-pos-checkout.md](examples/worked-review-pos-checkout.md): an original
  review of a Maduuka-style POS checkout on a low-end Android phone, from contract to verdict.
- [examples/product-excellence-policy.yaml](examples/product-excellence-policy.yaml): the
  machine-readable policy (rule IDs, levels, gates, required states, scorecard, owner defaults).

## References

| File | Use it for |
|---|---|
| [references/rules-catalogue.md](references/rules-catalogue.md) | Every rule with ID, level, gate, check and evidence |
| [references/excellence-principles.md](references/excellence-principles.md) | The 20 principles with intent, checks and examples |
| [references/scorecard-and-release-gate.md](references/scorecard-and-release-gate.md) | Rubric, gates, sign-off charter, evidence states |
| [references/foundations.md](references/foundations.md) | Tokens, type, geometry, colour, motion, navigation, adaptive layout |
| [references/offline-and-low-end-performance.md](references/offline-and-low-end-performance.md) | Sync honesty, durability, device budgets, data cost |
| [references/data-trust-and-visualisation.md](references/data-trust-and-visualisation.md) | Money, payments, KPIs, charts, provenance |
| [references/accessibility-privacy-localisation.md](references/accessibility-privacy-localisation.md) | Assistive technology, access control, sessions, locales, RTL |
| [references/screen-blueprints-a.md](references/screen-blueprints-a.md) | Shared screen contract and screens 01-08 |
| [references/screen-blueprints-b.md](references/screen-blueprints-b.md) | Screens 09-16 |
| [references/component-contracts-a.md](references/component-contracts-a.md) | Shared component contract and components 01-08 |
| [references/component-contracts-b.md](references/component-contracts-b.md) | Components 09-16 |
| [references/pattern-dossier-contract.md](references/pattern-dossier-contract.md) | Dossier contract and index of 11 families and 50 dossiers |
| [references/pattern-dossiers-01-10.md](references/pattern-dossiers-01-10.md) | Pattern dossiers 01-10 |
| [references/pattern-dossiers-11-20.md](references/pattern-dossiers-11-20.md) | Pattern dossiers 11-20 |
| [references/pattern-dossiers-21-30.md](references/pattern-dossiers-21-30.md) | Pattern dossiers 21-30 |
| [references/pattern-dossiers-31-40.md](references/pattern-dossiers-31-40.md) | Pattern dossiers 31-40 |
| [references/pattern-dossiers-41-50.md](references/pattern-dossiers-41-50.md) | Pattern dossiers 41-50 |
| [references/product-profiles.md](references/product-profiles.md) | Product profiles, experience briefs and the repeat-use loop |
| [references/agent-implementation-protocol.md](references/agent-implementation-protocol.md) | Agent protocol, audit checklist, DDR template |
| [references/anti-pattern-blacklist.md](references/anti-pattern-blacklist.md) | Banned patterns with detection and repair |
| [references/currentness-register.md](references/currentness-register.md) | Platform and standard facts with URL, date and status |

Engine context: [design doctrine](../../../doctrine/design-doctrine.md),
[design quality gate](../../../governance/design-quality-gate.md),
[banned fonts](../../../doctrine/references/ai-slop-banned-fonts.md),
[WCAG 2.2 criteria](../../../doctrine/references/wcag-2.2-criteria.md). Related skills:
[internationalization-and-rtl-design](../internationalization-and-rtl-design/SKILL.md),
[performance-as-ux-and-core-web-vitals](../performance-as-ux-and-core-web-vitals/SKILL.md),
[ux-writing-and-microcopy](../../10-content-design-and-ux-writing/ux-writing-and-microcopy/SKILL.md),
[font-selection-and-pairing](../../01-typography-and-fonts/font-selection-and-pairing/SKILL.md).

## Evidence and currentness

Platform and standard facts used here (WCAG 2.2 and its target-size and reduced-motion levels,
Android and Apple target sizes, Play targetSdk 36 behaviour, window size classes, Android vitals,
Core Web Vitals, Compose Multiplatform platform status, ISO 4217 minor units) were read on the
primary source on 2026-11-07 and are `VERIFIED` there with URL, freshness class and review date in
[references/currentness-register.md](references/currentness-register.md). Data-protection law
detail and RTL mirroring of media controls and chart time axes are `NOT_ASSESSED`; the latter is a
Chwezi SHOULD with native-reader review. A lapsed review date makes a fact `NOT_ASSESSED`.

This skill's own outputs are design intent until measured: a heuristic review may say "likely
fails"; only recorded measurement may say "passes".
<!-- dual-compat-end -->
