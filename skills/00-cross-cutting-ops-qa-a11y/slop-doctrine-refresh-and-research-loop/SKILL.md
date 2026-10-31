---
name: slop-doctrine-refresh-and-research-loop
description: Use when AI-slop definitions, banned fonts, visual tells, product-slop patterns, or anti-slop doctrine may have changed and the design engine needs a self-review pass coordinated with the digital-research engine before updating guidance.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Slop Doctrine Refresh & Research Loop
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- A user says the definition of "AI slop" has changed.
- A font, visual style, layout trope, AI-image tell, or UI/product pattern may have become a new
  AI-default signal.
- Updating `ai-slop-taxonomy.md`, `ai-slop-banned-fonts.md`, `visual-product-slop-audit`, or
  `ai-slop-typography-audit`.
- A high-stakes public artifact needs a freshness check against current AI-slop norms.
- Another engine asks whether a design choice is merely popular, genuinely AI-converged, or still
  acceptable with a deliberate rationale.

## Do Not Use When

- You are auditing a specific image/UI only against the current checklist - use
  `visual-product-slop-audit`.
- You are only auditing type in a finished artifact - use `ai-slop-typography-audit`.
- The concern is written copy only - route to the digital-research engine's `anti-ai-slop` and
  `ai-slop-audit` skills.

## Required Inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Current doctrine and change history | Design engine | yes | Establishes the baseline |
| Candidate new tell or changed norm | Audit, user, or monitoring | yes | Defines the research question |
| Evidence-discipline rules | Digital-research engine | yes | Controls source quality |

- The doctrine, checklist, or artifact under review.
- The suspected changed tell, default, font, product trope, or market signal.
- The intended scope: typography, image/video, UI/product, brand, document, or cross-engine handoff.
- Whether the result is advisory, watchlist-level, or intended to change a hard ban.

## Workflow

1. **Load the local anti-slop doctrine**: `doctrine/design-doctrine.md`,
   `doctrine/references/ai-slop-taxonomy.md`, `doctrine/references/ai-slop-banned-fonts.md`, and
   `doctrine/references/living-slop-refresh-protocol.md`.
2. **Route research to the digital-research engine** before making doctrine changes. Load its
   `skills/source-evaluation/SKILL.md`,
   `skills/source-evaluation/references/evidence-discipline.md`, `skills/anti-ai-slop/SKILL.md`,
   and `skills/ai-slop-audit/SKILL.md`.
3. **Separate claims by evidence type**: primary/vendor/platform source, design-practitioner
   source, public incident, marketplace/template observation, social signal, or weak anecdote.
4. **Classify the change** using the protocol buckets: hard ban / critical tell, watchlist,
   contextual risk, or rejected claim.
5. **Translate only the design consequence** into this engine. Keep writing/cultural taxonomy in
   the digital-research engine and cross-cite it instead of duplicating it.
6. **Patch doctrine with a dated rationale** if the evidence warrants it. State observed shift,
   evidence grade, design consequence, scope, and date checked.
7. **Run the design quality gate** and verify every active `SKILL.md` still has an example when a
   new skill is added.

8. **Apply the machine-error overlay**: review whether a new visual or product pattern adds a user
   task, state, decision, proof point, or meaningful hierarchy. Record ME1-ME7 findings in the
   proposal delta; route prose semantics to Digital Research and mark incomplete evidence
   `NOT_ASSESSED`.

9. **Enforce the visual boundary**: for websites, web products, presentations, and design
   artefacts, reject purple gradients, glassmorphism, neon glow, AI-beige defaults, decorative
   editorial scaffolding, and decorative motion. Preserve only task, state, accessibility, data,
   or approved design-system reasons, and keep unavailable evidence `NOT_ASSESSED`.

## Anti-Patterns

- Freezing a 2026 slop tell as permanent truth after models have moved.
- Adding hard bans from vibes, social screenshots, or a single anecdote.
- Treating AI-vendor design recommendations as approval authority.
- Copying the digital-research engine's writing guidance into this repo instead of referencing it.
- Updating a checklist without recording evidence strength and date checked.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Source register | Doctrine maintainer | Claims, dates, sources, and confidence recorded |
| Proposed doctrine delta | Design engine owner | Exact add, revise, retain, or retire decisions |
| Validation note | Auditors and routers | Collision and downstream impact checked |

- A slop-doctrine refresh note: observed shift, evidence grade, design consequence, scope, date
  checked, and changed files.
- Updated design doctrine/checklists when evidence supports a change.
- A rejected-claim note when the evidence is too weak for doctrine.

## Examples

- Use the worked example in `examples/` for the source register and doctrine-delta format.

## Quality Standards

- Use current, traceable evidence and distinguish human design authority from AI-vendor self-report.
- Require corroboration before adding a ban or universal tell.
- Stop publication when evidence conflicts materially; retain the current doctrine and record uncertainty.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| Multiple independent human authorities identify convergence | Propose a doctrine update | Current slop signal remains invisible |
| Only an AI vendor recommends a design choice | Use it only as avoidance evidence | Vendor output becomes design authority |
| A classic tell has materially declined | Reclassify, do not silently delete | Audit loses historical and edge-case value |
| Evidence is weak or conflicting | Keep current rule and mark review date | Doctrine churns on anecdotes |

## Capability Contract

Read, search, and network research are required; doctrine editing requires explicit authority. Preserve citations and change history. Do not update bans from model memory, social virality, or a single source.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without current research access, return the question set and source plan, keep doctrine unchanged, and label all currency claims unverified. Recover when authoritative sources can be checked.

- `examples/font-default-refresh-note.md` - classifies an emerging AI-default font signal and
  decides whether it becomes a hard ban, watchlist item, or rejected claim.

## Responsibility overlay

Do not promote a style irritation into a design ban. Classify a visual pattern as a task failure,
provenance gap, accessibility defect, generic convergence, or contextual preference, and record
the evidence mode. The 25 writing signs remain editorial prompts owned by Digital Research; this
engine translates only evidenced visual consequences. Keep intentional repetition and design-system
consistency when their function is recorded; otherwise remediate or mark the check `NOT_ASSESSED`.

- Shared standard: `AI-slop responsible publishing` (`references/ai-slop-responsible-publishing-standard-2026-09-11.md` in the chwezi-dev-engine repository; resolve the checkout through the workspace map)

## References

- `doctrine/references/living-slop-refresh-protocol.md` - required update protocol.
- `doctrine/references/ai-slop-taxonomy.md` and `doctrine/references/ai-slop-banned-fonts.md` -
  design-engine slop doctrine.
- `visual-product-slop-audit` and `ai-slop-typography-audit` - artifact-level audits that consume
  the refreshed doctrine.
- Digital-research engine: `source-evaluation`, `evidence-discipline`, `anti-ai-slop`, and
  `ai-slop-audit` - source discipline and writing/cultural slop framing.
<!-- dual-compat-end -->
