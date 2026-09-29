---
name: enterprise-ux-process
description: Use when a regulated, B2B, or large internal product needs a maturity-declared enterprise UX engagement with stakeholder, research, prototype, evaluation, and launch evidence. Do not use for a small experiment or single prototype; route those to the focused research/prototyping skills.
metadata:
  portable: true
  category: 05-ux-process-research-and-psychology
  compatible_with:
  - claude-code
  - codex
---

# Enterprise UX Process Skill
**Source:** Operationalises Synechron (2018) enterprise UX guidance (derived from The Design Ladder and Natalie Hanson's UX Maturity Model), with strategy and collaboration methods from Levy (2015) *UX Strategy*, O'Reilly, and Fekeshazi, *Product Managers' Guide to UX Design*, UX Studio. The methods live in this skill and its `references/`; no book extraction is stored in any engine repository.

---

<!-- dual-compat-start -->
## Use when

- Scoping or executing a premium-priced enterprise UX engagement (financial services, insurance, healthcare, regulated industries, large internal apps, B2B SaaS)
- Auditing whether an enterprise project is positioned correctly on the maturity scale
- Defending a premium-pricing claim against an internal or external review
- Bridging strategy (Levy) and tactical UX work (Branson, Deacon, Fekeshazi) into a single enterprise-grade process

## Do not use when

- The work is consumer-grade (single-interaction, low-stakes) — use simpler skills
- The artifact is a prototype or experiment, not a production deliverable
- The project is explicitly priced as standard tier and the team has agreed not to pursue premium positioning

## Required inputs

| Input | Source | Evidence |
|---|---|---|
| Problem, objective, stakeholders, and success criteria | Executive sponsor and product owner | Named funder/owner/executor and signed criteria |
| Target maturity level and engagement boundary | UX lead and sponsor | Level rationale, phases in scope, timeline, and approvals |
| User, market, system, regulatory, and accessibility evidence | Research, operations, legal, engineering | Source register, provenance, currency, and handling limits |

Before invoking this skill, the following must be available or generated:

- Problem definition statement (what is the need; why now; for whom)
- Stakeholder list with roles (funder, owner, executor)
- Business objective (what success means in measurable terms)
- Success criteria (signed off by stakeholders)
- Target maturity level: **3 (UX Design)** for standard premium, **4 (Experience Design)** for top-tier

## Workflow

The process maps directly to Synechron's Activity-by-Level matrix. All 9 phases must produce documented evidence at Level 3+; the additional Level 4 activities are noted inline.

### Phase 1 — Problem Definition + Business Objective
- UX team meets with business stakeholders and product owners
- Answer: What is the need? Why now? For whom? How does this make life easier for the end user?
- Document vision, hopes, aspirations, and fears from the business perspective
- Output: signed problem-definition document

### Phase 2 — Stakeholder Discussions / Interviews
- Identify funders, owners, executors
- Conduct focused-group discussions OR individual interviews
- Capture: roles, expectations from UX, problem perception, end-user identification, collective goals, organizational/competitive/scope context
- Output: stakeholder-interview transcripts + summary brief

### Phase 3 — Success Criteria sign-off
- Checklist of measures the deliverable must hit to be successful
- Documented and agreed by all stakeholders
- Treat as non-negotiable acceptance criteria
- Output: signed success-criteria document

### Phase 4 — User Research (qualitative + quantitative)
- Methodologies: interviews, contextual inquiries, eye tracking, surveys, A/B testing, web analytics, field studies
- Quantitative: how many, what %
- Qualitative: why behaviors occur, what users notice
- Output: user-research report with both data types

### Phase 5 — Competitor Analysis
- Use Levy's 19-attribute competitive matrix and four-step analysis in `references/strategy-and-collaboration-inputs.md` section 2
- Minimum: 5 direct + 3 indirect competitors
- Output: filled matrix + 1-page distilled brief

### Phase 6 — Personas + User Journeys + Information Architecture
- Personas: apply Branson's discipline (Essential Persona declared, Mechanics floor — name, demographics, goals, environment, pain points, stress points); keep each persona to one or two pages so teams actually read it
- User Journeys: chronological touch-point sequence per primary persona
- Information Architecture: organization, structure, labelling of all content; navigation strategy/flow; site map; content buckets; intuitive labels
- **Level 4 also requires:** Experience Maps
- Output: persona deck + journey deck + IA deck

### Phase 7 — Wireframes + Clickable Prototype + Visual Design Mockups
- Wireframes: low-fidelity (paper) + high-fidelity (no color, focus on flow)
- Clickable prototype: stitched screens behaving like the real product per crucial user scenarios
- Visual design mockups: full-scale static representation with colors, branding, graphics
- **Level 4 also requires:** Mood Boards
- Output: wireframe pack + interactive prototype + mockup set

### Phase 8 — Heuristic Evaluation
- UX expert reviews against Nielsen-style heuristics:
  1. Visibility of System Status
  2. Match Between System and the Real World
  3. User Control and Freedom
  4. Consistency and Standards
  5. Error Prevention & Error Handling
  6. Recognizing Rather than Recall
  7. Flexibility and Efficiency of Use
  8. Aesthetic and Minimal Design
  9. Help and Documentation
- Plus Branson's 4-stage cognitive affordance audit per primary CTA (Presence → Visibility → Recognizability → Intelligibility)
- Output: heuristic evaluation report listing flaws + improvements

### Phase 9 — Usability Testing + ADA / Section 508 verification (Level 4 + all-levels accessibility)
- Usability testing: moderated in-person, moderated remote, OR unmoderated remote
- Test scenarios derived from actual use cases and task flows
- ADA / Section 508 / WCAG 2.2 AA verification — required at ALL maturity levels
- Output: usability test report + accessibility audit

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Organisation cannot evidence Level 4 activities | Declare Level 3 and show the gap | Aspirational maturity claims undermine commercial credibility |
| Research or accessibility evidence is missing | Block the affected gate and gather evidence | Ceremony substitutes documents for user outcomes |
| Engagement is a bounded experiment | Use the focused research/prototype workflow | Nine-phase overhead delays learning without reducing risk |
| Regulated decision has unresolved owner | Stop release and assign accountable approval | Diffuse governance leaves high-impact risks unowned |

## Capability Contract

- Must read engagement, research, regulatory, and delivery evidence and preserve provenance; audit/planning is read-only unless execution is authorised.
- May create in-scope artefacts and facilitate approved research. Do not contact participants, spend budget, sign for stakeholders, publish sensitive evidence, or claim certification without separate authority.

## Degraded Mode

- If sponsor, decision owner, maturity target, success criteria, or evidence provenance is missing, stop maturity/release claims and issue a blocker register.
- If research or testing cannot run, produce only the completed phases and mark downstream claims pending; never fabricate transcripts, scores, accessibility results, or sign-off.
- Recover a failed phase by assigning the evidence owner, completing the smallest missing activity, and rerunning all dependent gates.

## Quality Standards

- Each phase has an owner, source evidence, acceptance criterion, decision, and dependency trace; activity volume alone does not prove maturity.
- Accessibility claims use the current agreed standard and test evidence; legal compliance or certification is never inferred from a checklist.
- The launch declaration is blocked by any unresolved critical outcome, consent/privacy breach, or missing accountable sign-off.

## Anti-Patterns

- Declaring Level 4 because the proposal lists Level 4 activities. Correction: require completed, reviewed evidence for each activity.
- Treating stakeholder opinion as user research. Correction: label its source and run an appropriate user method.
- Producing personas from imagination. Correction: trace attributes to research or label a proto-persona.
- Running accessibility as a final cosmetic check. Correction: set criteria early and test throughout.
- Using a five-outcome score to conceal one critical failure. Correction: preserve the blocking rule and evidence each outcome.
- Claiming ADA, Section 508, or WCAG certification from self-review. Correction: state scope, method, result, and limits.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Maturity declaration and phase evidence pack | Sponsor, procurement, delivery leadership | Every claimed activity links to dated evidence, owner, and acceptance |
| Evaluation, research, and accessibility records | Product, design, compliance | Methods, samples, findings, limits, and remediation decisions are traceable |
| Five-outcome launch declaration | Accountable launch owner | Each outcome has pass/block evidence; unresolved critical failure blocks launch |

A complete enterprise-ux-process engagement produces:

1. **Maturity-level declaration** — single sentence at the top of the engagement summary: "This engagement operates at UX Maturity Level [3 / 4], per Synechron's 5-level model."
2. **Activity-by-level evidence pack** — see `references/maturity-checklist.md` for the matrix and required evidence per activity
3. **Heuristic evaluation report** — Phase 8 output
4. **Five-outcomes pre-launch declaration** — Yes/No with evidence per outcome:
   - Useful (persona-validated)
   - Easy to use (first-task success without coaching)
   - Efficient (task time benchmarked)
   - Pleasing (≥ 4/5 first-impression rating)
   - Accessible (ADA/Section 508/WCAG 2.2 AA)
   - **Rule:** 4-of-5 disqualifies premium pricing. One No = no launch.

## Examples

- `examples/ux-engagement-worked.md` — a full worked enterprise UX engagement for a sample client (Meridian Trust Bank treasury portal): scored UX maturity assessment, 14-week engagement plan with phases/deliverables/gates, value/ROI framing, and the completed 5-outcomes pre-launch declaration.

## References

Load only the directly relevant process references for the current enterprise phase and decision.

### Design doctrine (always consult)
- `doctrine/design-doctrine.md` — the anti-slop charter; Phase 7 visual design and the "Pleasing" pre-launch outcome must satisfy it.
- `doctrine/references/ai-slop-taxonomy.md` — the product/interface slop tells the heuristic evaluation (Phase 8) and Aesthetic-and-Minimal heuristic should screen for.

### Source works (cited, not stored)
Synechron (2018) enterprise UX maturity guidance; Levy, J. (2015) *UX Strategy*, O'Reilly Media
(four tenets upstream of Phase 1; competitive matrix in Phase 5); Branson (persona discipline and
the four-stage affordance audit, Phases 6 and 8, held in `ux-psychology/references/legacy-guidance.md`);
Deacon (three levels of UX scope, declared in Phase 1, held in
`ux-psychology/references/three-levels-of-ux-scope.md`); Fekeshazi, *Product Managers' Guide to
UX Design*, UX Studio (PM collaboration rules). The working methods are paraphrased in
`references/strategy-and-collaboration-inputs.md` and `references/maturity-checklist.md`.

### Operational skills in other engines
- `website-skills/skills/quality-gates/design-quality-score/SKILL.md` — Category 8 (UX Maturity) scores the same artifacts independently
- `website-skills/skills/orchestration/premium-ui-ux-design/references/enterprise-five-outcomes.md` — same 5-outcomes gate applied to website templates
- `chwezi-sdlc-documentation/01-strategic-vision/07-premium-product-positioning/SKILL.md` — premium-positioning gate using the same 5+5 model
- `chwezi-sdlc-documentation/03-design-documentation/05-ux-specification/SKILL.md` — UX spec produced under this process

### Quick-use checklist
- `references/maturity-checklist.md` — standalone activity-by-level checklist for use in project workspaces
- `references/strategy-and-collaboration-inputs.md` — Levy four tenets, 19-attribute competitive matrix and analysis steps, and product-manager collaboration practices (paraphrased)
- `references/innovation-front-end-and-concept-validation.md` — six-stage front-end innovation procedure (landscape audit, deep research, reframe, ideate, validate, prove at small scale), desirability/viability/feasibility/suitability tests, templates, compressed two-week engagement
<!-- dual-compat-end -->
