Parent skill: [chwezi-product-excellence-standard](../SKILL.md)

# Agent implementation protocol

Use this file whenever an agent (or a developer working like one) designs, builds or changes a
screen, component or flow in any Chwezi app. It is the single protocol: it merges the agent
implementation contract, the execution specification (two-pass build, review loop, versioning)
and the ten-step orchestration protocol into eight phases, each with inputs, outputs and stop
conditions. Rules are cited by ID from `rules-catalogue.md`.

## Ground rules before any phase

- The running product, its requirements and its domain model are the truth. Mockups, reference
  dossiers and screenshots are inspiration only (PX-MANDATE-004).
- Precedence when rules collide, highest first: law, safety and privacy; accessibility; data
  integrity; this standard; house style; product brand (PX-MANDATE-003). Where two gates in
  this standard overlap, the stricter applies. Semantic state meaning is never overridable, and
  a reference or mockup feature never outranks any step.
- The versioned repository text and the machine-readable policy
  (`../examples/product-excellence-policy.yaml`) are the authority; rendered PDFs are copies
  (PX-MANDATE-011).
- Typeface, colour roles and component visuals come from the house style skill
  (`skills/09-design-systems-tokens-and-theming/chwezi-business-app-house-style`); this standard
  governs product quality, the house style governs the visual implementation.

## Phase 0: Reconnaissance

- **Inputs.** Project `CLAUDE.md` / `AGENTS.md`, architecture notes, requirements and business
  rules, domain model, existing screens and components, theme and token pack, tests, supported
  OS/API floor, declared baseline device, product profile (`product-profiles.md`).
- **Do.** Inventory reusable components and existing patterns; identify which product profile,
  screen blueprint and component contracts apply; read open DDRs (PX-AGENT-001).
- **Outputs.** Recon note: profile, blueprints, components to reuse, constraints, open questions.
- **Stop when.** No requirement or domain source exists for a field, action, price, calculation
  or permission the task needs; the product profile or baseline device is undeclared and the
  task touches performance; project instructions forbid the change. Ask, do not invent.

## Phase 1: Baseline and evidence map

- **Inputs.** Recon note; access to a build and, where possible, the baseline device.
- **Do.** Capture current screenshots, task timings, existing errors, accessibility findings and
  low-end performance observations (PX-AGENT-002). Map each screen to workflows, real fields,
  permissions, the matching blueprint and the state model; list uncertainties (PX-AGENT-003).
- **Outputs.** Baseline folder; evidence map (screen -> requirement IDs -> fields -> roles ->
  states).
- **Stop when.** A baseline cannot be captured for a redesign (PX-QA-009 requires before/after);
  record `NOT_ASSESSED` and ask whether to proceed as greenfield, where the first measured
  release becomes the baseline.

## Phase 2: Specify the screen contract

- **Inputs.** Evidence map; shared screen contract and blueprint
  (`screen-blueprints-a.md` holds the shared template; `-b.md` continues the set).
- **Do.** Write the contract before code (PX-AGENT-004): purpose, roles, task, anatomy and
  hierarchy, tokens, component tree, interaction paths, navigation, adaptive variants per window
  class, canonical state matrix with N/A states declared (PX-STATE-001), semantics and focus
  map, data provenance, performance notes, tests and measurable acceptance criteria drawn from
  `excellence-principles.md`.
- **Outputs.** Screen contract file; DDR drafts for any departure.
- **Stop when.** Acceptance criteria cannot be made measurable; a needed component has no
  contract and no DDR; the contract would need a backend logic change that is not approved
  (PX-ARCH-009).

## Phase 3: Prototype and reuse

- **Inputs.** Screen contract; component contracts (`component-contracts-a.md`, `-b.md`).
- **Do.** Prototype the core flow cheaply and check it with the product owner or a
  representative user before refinement (PX-AGENT-005). Reuse approved tokens and components; a
  new component or variant gets a contract (purpose, parameters, sizes, variants, states,
  semantics, keyboard, test tags, RTL, previews, performance limits) and a DDR before
  integration (PX-ARCH-006, PX-ARCH-007).
- **Outputs.** Prototype link or build; component contracts for anything new; approved DDRs.
- **Stop when.** The prototype shows the core task fails or confuses users; return to Phase 2.

## Phase 4: Build pass one - behaviour

- **Inputs.** Approved contract and DDRs.
- **Do.** Build one coherent screen or workflow phase at a time, preserving existing behaviour
  (PX-AGENT-007). Pass one completes flows, every state, offline and retry behaviour,
  idempotency, keyboard and accessibility semantics (PX-AGENT-006). Immutable UI state,
  explicit intents and one-off effects (PX-ARCH-004); stable keys and lazy containers
  (PX-PERF-004); no networking or business calculation in rendering code (PX-ARCH-005);
  platform adapters for permissions, camera, printing and notifications (PX-ARCH-001). Use
  feature flags where migration risk is high.
- **Outputs.** Working behaviour with tests for every state and recovery path.
- **Stop when.** Any hard-fail gate behaviour (duplicates, false confirmation, UI-only
  permission) cannot be satisfied with the current backend; escalate rather than mask it.

## Phase 5: Build pass two - craft and self-verification

- **Inputs.** Pass-one build.
- **Do.** Typography, spacing, hierarchy, optical alignment, microcopy, measured motion and
  haptics, loading feedback, empty states and return journeys (PX-AGENT-006, protocol "polish").
  Cosmetic work never starts while error or recovery states are unfinished. Then run static
  checks, unit, UI and accessibility tests, screenshot comparison, baseline-device profiling and
  business-total and permission checks (PX-AGENT-008). Complete the audit checklist below.
- **Outputs.** Evidence pack draft; completed audit checklist; self-review note.
- **Stop when.** A check cannot run (no device, no screen reader, no printer): mark it
  `NOT_ASSESSED` with the reason; never report it as passed.

## Phase 6: Independent verification and measurement

- **Inputs.** Code, screen contract, evidence pack (not the implementer's conclusions).
- **Do.** A separate verifier checks financial or clinical correctness, permissions, offline
  behaviour, state coverage, accessibility, performance and regressions (PX-QA-006). Test
  realistic workflows on older Android hardware and supported iOS devices with interruptions
  and large datasets (protocol "measure"). Score the scorecard
  (`scorecard-and-release-gate.md`).
- **Outputs.** Verifier findings, repairs log, scorecard with evidence classes, gate status.
- **Stop when.** A hard-fail gate is open: return to Phase 4 or 5 with the finding.

## Phase 7: Release decision and learning

- **Inputs.** Scorecard, gate status, sign-offs.
- **Do.** Produce the verdict, exceptions, known limitations, migration notes, feature flags,
  rollout and rollback plan, and support notes (PX-AGENT-009, PX-ARCH-009). Commit or push only
  under the project's authorised workflow. After release, collect opt-in analytics, support
  issues and feedback and rank fixes by task friction and risk (PX-AGENT-010, PX-PRIV-010).
- **Outputs.** Release note with verdict; signed record; per-screen handoff (below); backlog
  items tagged with their source.
- **Stop when.** Verdict is `BLOCKED`, or `CONDITIONAL` without written acceptance from the
  product owner and Lead Developer.

## Audit checklist (per screen)

Complete in the pull request or evidence pack. Each line: result, evidence class, link.

| # | Check | Rule IDs |
|---|---|---|
| 01 | User role(s) and primary task documented; each field and action traced to a requirement | PX-AGENT-003, PX-MANDATE-004 |
| 02 | Every critical action reachable with the expected input: touch, keyboard, hardware scanner, screen reader | PX-A11Y-002/003, PX-INTERACT-015 |
| 03 | One dominant next action; at most one next-step accent; destructive separated | PX-INTERACT-004, PX-COLOUR-004, PX-DESTRUCT-002 |
| 04 | Amounts carry correct currency, minor units, unit, period and rounding; tabular figures | PX-L10N-001, PX-DATA-011, PX-DATA-012, PX-TYPE-004 |
| 05 | Canonical state set implemented or declared N/A, with a screenshot each | PX-STATE-001 |
| 06 | Empty states name their cause and offer one next action; errors say what happened, what is safe, what next | PX-STATE-004, PX-STATE-005 |
| 07 | Labels match backend truth; queued never shown as confirmed; stale shows its age | PX-STATE-002, PX-OFFLINE-003, PX-OFFLINE-004 |
| 08 | Double tap, retry and replay create one record | PX-INTERACT-002 |
| 09 | Work survives back, process death, offline and dismissal | PX-INTERACT-006, PX-OFFLINE-002 |
| 10 | No status relies on colour alone; contrast measured in every theme | PX-COLOUR-001, PX-COLOUR-002 |
| 11 | Layout verified on compact phone, tablet portrait and landscape, desktop/web where shipped; no orientation lock at sw600dp on Android | PX-LAYOUT-001/004, PX-NAV-001 |
| 12 | 200% text and platform maximum: nothing essential clipped, no primary action lost | PX-TYPE-002, PX-TYPE-005 |
| 13 | Screen-reader focus order, accessible names and announced status messages verified | PX-A11Y-001/002/012 |
| 14 | Focus never hidden by bars, sheets or keyboard; drag has a single-pointer alternative | PX-A11Y-007, PX-A11Y-008 |
| 15 | RTL (Arabic) and the longest declared language tested; bidi isolation of numbers and codes | PX-L10N-002/003/008 |
| 16 | Touch targets measured on hit areas (48 dp / 44 pt; 56 dp in glove, field and keypad contexts) | PX-GEOM-005, PX-GEOM-009, PX-INTERACT-018 |
| 17 | Baseline-device performance measured against budget | PX-PERF-001..003 |
| 18 | Charts carry labels, units, source period and a text interpretation | PX-VIZ-005, PX-A11Y-005 |
| 19 | Permissions enforced on the backend; restricted controls hidden or disabled with reason | PX-PRIV-001, PX-PRIV-006 |
| 20 | Sensitive data masked by default and screenshot-protected where required | PX-PRIV-002, PX-PRIV-007 |
| 21 | Destructive actions state consequence and reversibility; undo or explicit confirmation; trace kept | PX-DESTRUCT-001/003 |
| 22 | Light and dark screenshots for major states | PX-TOKEN-003, PX-QA-001 |
| 23 | Reduced motion verified; every animation has a recorded purpose; no summary flourish on operational screens | PX-MOTION-002, PX-MOTION-004, PX-MOTION-005 |
| 24 | Android back via platform handlers; back intercepted only to protect unsaved data | PX-NAV-008 |
| 25 | No fabricated data or unverified feature presented as production functionality | PX-DATA-001 |
| 26 | Tokens only; house-style typeface; no framework default face as primary | PX-TOKEN-001, PX-TYPE-007 |
| 27 | Deviations from the design system recorded as DDRs | PX-QA-005, PX-ARCH-007 |
| 28 | Where the screen issues numbered documents: number allocated at issue inside the save transaction from a locked per-tenant, per-type counter; replay returns the same number; offline shows a provisional tag; numbered documents are voided, never deleted | PX-DATA-013 (PX-GATE-13) |
| 29 | All 13 gates stated with evidence class; any applicable gate not `MEASURED` is recorded as open | PX-SCORE-002, PX-QA-004 |

## Design decision record (DDR) template

One file per decision, stored with the product's evidence (PX-QA-005). A SHOULD departure,
a new component or variant, an extra colour beyond the accent model, or a conflict resolved by
precedence each need one.

```markdown
# DDR-<product>-<NNN>: <short decision title>

- Date: YYYY-MM-DD        - Status: proposed | approved | superseded by DDR-...
- Owner: <name/role>      - Reviewer: <name/role>    - Revisit by: YYYY-MM-DD
- Rules affected: PX-...  - Precedence step used (if a conflict): law/safety/privacy |
  accessibility | data integrity | standard | house style | brand

## Problem
User, task, context (device, environment, role) and the observed constraint.

## Alternatives (at least two)
1. <option> - consequences
2. <option> - consequences

## Choice and rationale
Selected pattern and why it serves the task better than the alternatives.

## Trade-offs
Accessibility | performance on the baseline device | platform compatibility | complexity
and maintenance | localisation and RTL.

## Evidence
Usability test, profiling trace, domain requirement or regulation, prototype. Evidence class.

## Rollback
How to return to the standard pattern if the evidence does not hold.
```

## Screen contract and handoff

- The shared screen contract template lives in `screen-blueprints-a.md`; per-screen blueprints
  list only their deltas. Component contracts use the shared template in
  `component-contracts-a.md`.
- Per-screen handoff on completion (PX-QA-007): screen ID; roles; task; tokens; component
  tree; phone, tablet and desktop layouts; required states; screen-reader labels; keyboard and
  focus map; API and data contract; screenshots; tests and measured device profile; known
  limitations; verifier sign-off.

## Machine-readable assertions

The policy file asserts at least (PX-AGENT-011): text scaling supported; offline states
cached, queued, syncing, conflict and error; baseline device test done; adaptive navigation;
semantic tokens only; no invented capabilities; backend authorisation. Validators read
`../examples/product-excellence-policy.yaml`; a project may add rule IDs, never remove one.

## What an agent must never do

| Never | Instead | Rule IDs |
|---|---|---|
| Invent features, menu items, fields, prices, calculations, diagnoses, contract statuses or permissions to match a reference | Trace every element to a requirement or ask | PX-MANDATE-004, PX-NAV-004 |
| Put sample, fixture or illustrative data into a production build | Label demo data and keep it out of live tenants | PX-DATA-001 |
| Claim compliance, conformance or "passes" without a recorded measurement | Report `HEURISTIC` or `NOT_ASSESSED` | PX-QA-004, PX-AGENT-008 |
| Verify its own work as the independent verifier | Hand code and evidence to a separate verifier | PX-QA-006 |
| Approve a screen from static images | Require device, test and accessibility evidence | PX-BLACKLIST-006 |
| Enforce a permission only by hiding a control | Enforce in backend and test with a low-role token | PX-PRIV-001 |
| Change backend logic or user workflows silently | Get approval, flag the change, communicate it | PX-ARCH-009 |
| Polish visuals before error and recovery states work | Finish pass one first | PX-AGENT-006 |
| Overwrite a working pattern because a reference looks better | Raise a DDR with usability evidence | PX-AGENT-001, PX-QA-005 |
| Name a vendor's product as the quality bar, or claim parity without evidence | Use the measurable checks in this standard | PX-MANDATE-007 |
| Commit, push, deploy or publish outside the project's authorised workflow | Stop and report | PX-AGENT-009 |
| Ship a banned or framework-default typeface as primary | Use the house-style pair | PX-TYPE-007 |
