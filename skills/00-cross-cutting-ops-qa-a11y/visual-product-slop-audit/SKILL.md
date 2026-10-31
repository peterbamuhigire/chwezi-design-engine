---
name: visual-product-slop-audit
description: Use when auditing imagery, brand assets, UI screens, or AI product features for visual and product slop. Unlike ai-slop-typography-audit, this excludes type; written-copy slop routes to the digital-research engine.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Visual & Product Slop Audit
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- Reviewing AI-generated or AI-assisted imagery, key art, thumbnails, or brand/marketing assets.
- Auditing a UI screen or a product feature that embeds generative AI.
- Gate-checking any visual deliverable before it ships under the Chwezi name.
- Checking a specific artifact against the current slop doctrine after the doctrine has already
  been refreshed.

## Do Not Use When

- The concern is the typeface/type system — use `ai-slop-typography-audit`.
- The concern is written copy (preambles, buzzword salad, vague attribution) — that is a writing
  concern owned by the `digital-research-engine` (`anti-ai-slop`); route there.

- The question is whether the definition of AI slop, a banned font, or a current visual tell has
  changed - use `slop-doctrine-refresh-and-research-loop` first, then return here for artifact
  audit.

## Required Inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Assets, screens, or live feature | Requester | yes | Defines the audit surface |
| Audience, channel, and stakes | Product or brand brief | yes | Calibrates severity |
| Current slop taxonomy | Design doctrine | yes | Prevents stale or invented tells |

- The asset(s) or screens (images, mockups, the live UI, or a description of the feature).
- The context and audience, and whether it is public-facing (raises the bar — corporate slop is
  the highest-backlash failure, per `doctrine/references/ai-slop-taxonomy.md`).

## Workflow

1. **Run the visual tells checklist** (`references/visual-tells-checklist.md`, which operationalises
   `ai-slop-taxonomy.md` → Visual & video tells): waxy skin, melted backgrounds, gibberish text,
   floating objects, extra fingers/impossible anatomy, warped/misspelled logos, uncanny faces,
   mismatched lighting. **Current 2026 AI-image tells** (the classic six-finger artifact is largely
   fixed in late-2025/2026 models, so the tells migrated): plastic "default-render" lighting & creamy
   bokeh, texture-too-perfect / uniform-frequency detail, micro-anatomy & accessory errors visible
   only on zoom (teeth, earrings, watch faces, fused hair), garbled small text / UI chrome / gauges,
   impossible reflections & re-tiling patterns, and the "no-author" style-blend aesthetic — perfect,
   even, styleless competence that looks made by nobody. The 2026 rule of thumb: the tell is now the
   **absence of authored specificity**, not a hard anomaly.
2. **Run the product/interface tells checklist**: AI feature where nav/search was faster;
   ungrounded chatbot that can invent commitments; generative output with no verifiability/undo;
   decorative "AI" badges/gradients with no user benefit.
3. **Classify each finding** — *critical* (public-facing visual anomaly, warped logo, halluc\
   inating bot) vs *major/minor*.
4. **Decide remake vs remediate.** Anomalous AI imagery is **remade or replaced** (art-directed,
   or real photography/illustration), not patched. Product slop is **removed or grounded**.
5. **State the human-craft alternative** — what a skilled designer would ship instead (per the
   Mission: distinct, authored, not templated).
6. **Report** findings → fixes with before/after.

## Anti-Patterns

- "Touching up" a six-fingered hero image instead of remaking it.
- Keeping an AI feature because it's impressive when a search bar served users better.
- Treating an AI gradient/badge as design.
- Declaring any polished generated image slop without naming a concrete tell and evidence.
- Spot-fixing anatomy, text, or logo corruption instead of remaking the source asset.

## Machine-error review overlay

Apply the shared Digital Research machine-error gate to interface and product structure. Report
ME1-ME7 when repeated meaning, decorative symmetry, over-explanation, inflated emphasis, generic
examples, recurring visual tics, or insight-shaped product sections are evidenced. Compare adjacent
components and the actual user flow. Preserve repeated states, labels, and accessibility cues when
their function is documented; otherwise remove or redesign them. Written-copy findings route to the
Digital Research gate.

### Impeccable-derived AS1-AS7 review

Use `cli`, `browser`, `llm_only`, or `human_review` evidence. Block decorative purple gradients,
glassmorphism, neon glow, AI-beige defaults, editorial scaffolding, and decorative motion. Review
AS1 default convergence, AS2 unearned hierarchy, AS3 module monoculture, AS4 decorative attention,
AS5 placeholder material, AS6 copy tells, and AS7 delivery debt. A missing render, browser, or
detector is `NOT_ASSESSED`, not clean. Preserve functional state transitions, accessibility cues,
data encodings, and approved design-system decisions only with a recorded reason.

## Quality Standards

- Inspect focal details at delivery resolution and evaluate the feature in its actual flow.
- Separate anomalies, convergence, provenance gaps, and product-risk findings.
- Block public release for corrupted identity, anatomy, text, or ungrounded consequential output.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Severity-rated finding register | Designer and owner | Asset location, tell, evidence, and taxonomy mapping |
| Remake/remediate disposition | Production team | Named human-craft alternative for every finding |
| Gate verdict | Pre-launch QA | PASS, CONDITIONAL, or BLOCKED with unresolved risks |

- A findings list (tagged critical/major/minor with the tell it breaks) and a stated,
  human-craft remediation ready to apply.

## Examples

- See `examples/slop-audit-filled.md` for a complete severity and disposition register.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| Identity, anatomy, or embedded text is corrupted | Remake or replace and block ship | Visible anomaly damages trust |
| Asset is competent but unauthored and generic | Re-art-direct with a specific point of view | Convergent brand work ships |
| AI feature lacks grounding, verification, or undo | Remove or ground it | Generated output is treated as fact |
| Evidence is ambiguous | Mark conditional and seek source/provenance | Suspicion is presented as proof |

## Capability Contract

Read and high-resolution visual inspection are required. Review is read-only unless remediation is authorised. Network access is optional for provenance checks; editing or generation must preserve brand and usage rights.

## Degraded Mode

Without original-resolution assets or live-flow access, audit the supplied evidence, mark hidden details unverified, and withhold a pass. Recover by requesting crops, source files, or a recorded walkthrough.

- `examples/slop-audit-filled.md` — a real before/after audit of a Maduuka landing-page hero +
  embedded AI chat panel: findings (tagged critical/major/minor) → remake/remediate dispositions
  with the human-craft alternative named for each.

## Responsibility overlay

The 25 writing signs are non-diagnostic. Route copy and authorship questions to Digital Research;
this skill owns the visual consequence: does each chart, label, icon, image, hierarchy, and motion
serve a named user task, state, accessibility need, brand rule, or evidence point? Audit data scope,
date, source, and annotation fit; label hypothetical examples and generated assets where confusion
would matter. Missing render, browser, provenance, or human-review evidence is `NOT_ASSESSED`.

- Shared standard: `AI-slop responsible publishing` (`references/ai-slop-responsible-publishing-standard-2026-09-11.md` in the chwezi-dev-engine repository; resolve the checkout through the workspace map)

## References

- `references/visual-tells-checklist.md` — the concrete, tickable image + product/interface tells
  (incl. the current 2026 AI-image tells), citing the taxonomy.
- `doctrine/references/ai-slop-taxonomy.md`, `doctrine/design-doctrine.md` (Mission).
- `doctrine/references/living-slop-refresh-protocol.md` and
  `slop-doctrine-refresh-and-research-loop` for refreshing changing slop definitions.
- Sibling audits: `ai-slop-typography-audit` (type); digital-research `anti-ai-slop` (writing).
<!-- dual-compat-end -->
