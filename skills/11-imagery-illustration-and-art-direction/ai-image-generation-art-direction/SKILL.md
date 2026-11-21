---
name: ai-image-generation-art-direction
description: Use when turning an art-direction brief into generated imagery, prompts, negative constraints, reject gates, provenance notes, and post-processing instructions. Use photography-art-direction for sourced photos and visual-product-slop-audit for product-wide review.
metadata:
  portable: true
  category: 11-imagery-illustration-and-art-direction
  compatible_with:
  - claude-code
  - codex
---

# AI Image Generation & Art Direction

<!-- dual-compat-start -->

An AI image model is a slot machine that pays out the **convergent mean of its training data** by
default — and that mean *is* the slop the engine exists to fight (`doctrine/design-doctrine.md` §0,
"the moat is looking human-made"). Generation is cheap, so the gravity is toward sameness:
plastic light, creamy bokeh, styleless competence, "made by nobody." This skill makes AI imagery a
**directed, gated, post-processed, provenance-checked** act — the difference between a designer
*using* a tool and a tool *producing* slop. The generator's own aesthetic defaults are **never** the
authority for the look; we art-direct *away* from them, exactly as we do with banned default fonts
(`doctrine/design-doctrine.md` §2, sourcing-authority asymmetry rule).

## Use When
- Generating imagery with any AI model — Midjourney, DALL·E, Imagen, Stable Diffusion, Flux,
  Firefly, etc. — for a brand, hero, inline, background, deck, report cover, OG card, illustration,
  key art, icon-set base, or texture/pattern.
- Turning an **art-direction brief into a prompt** (subject + action + lens + light + mood + grade),
  and attaching the **negative-constraint list** keyed to the slop tells.
- Running the **reject/accept gate** on candidate frames before anything is kept.
- **Post-processing & integrating** a passed frame — re-grade, re-crop, fix micro-anatomy, composite
  into the brand treatment system so it stops reading as "a generation."
- Deciding **provenance & licensing**: is this model's output safe to ship (training-data rights,
  commercial terms, indemnity), and does the surface carry a **truth claim** that forbids AI people.
- Deciding **when NOT to use AI imagery at all** and routing back up the sourcing ladder.

## Do Not Use When
- You are directing **real or commissioned photography / stock sourcing & treatment** (grade, grain,
  duotone, crop system) — that is `photography-art-direction` (this group). It owns the *photo*
  sourcing ladder and treatment recipe; this skill owns *generation-specific* prompting, gating,
  and provenance. (They cross-reference; the AI-direction block in that skill points here for depth.)
- You are running the **product-wide visual slop audit** across imagery + UI + AI features →
  `visual-product-slop-audit` (group 00). That owns the audit/reject gate across a whole product;
  this skill owns *generating* imagery that would pass it.
- The concern is the **typeface / type system** → `ai-slop-typography-audit` (group 01).
- The asset is a hand-built **vector illustration or icon set** (not generated) → the illustration /
  `iconography-system-design` skills (this group).

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Art-direction brief, surface, and truth status | Brand and product owners | yes | Approved intent and allowed-use decision |
| Model/service terms, rights, and disclosure rules | Legal and procurement owners | yes | Current provenance and usage constraints |
| Treatment recipe and reject criteria | Art direction | yes | Concrete prompt, negatives, and acceptance gate |
- The **art-direction brief** (or enough to write one): brand voice/positioning, audience, the one
  feeling the image must carry, where it lives (surface + rendered size + aspect ratios).
- The **surface's truth status**: does it make a claim about *real* people, places, customers,
  outcomes (medical/financial/testimonial)? If yes, AI people are forbidden (see Workflow 1).
- The **treatment recipe** the output must land in (grade/grain/crop/ratios) — usually from
  `photography-art-direction/references/photo-treatment-system.md`.
- The **model + its licensing terms**: commercial-use rights, training-data provenance, indemnity,
  and whether it emits content-credentials (C2PA). See `references/ai-image-direction-and-gate.md` §4.

## Workflow

For drawn artwork, select a [cartoon or illustration treatment](../illustration-style-and-systems/references/drawing-recipes.md) and follow its [production and proof workflow](../illustration-style-and-systems/references/drawing-production.md). Keep captions, values and data marks editable in layout.
1. **Decide if AI imagery is even allowed here first** (the gate before the gate). If the surface
   makes a **truth claim** — real customers, "our team," a clinical/financial outcome, a named place —
   AI-generated people/scenes are **forbidden** (the "shovelware assets" backlash trap,
   `doctrine/references/ai-slop-taxonomy.md` §2). Route up the sourcing ladder to a real shoot
   (`photography-art-direction`). AI is admissible only for **conceptual, abstract, background, or
   non-claiming** imagery, on a surface that permits it. See `references/ai-image-direction-and-gate.md` §1.
2. **State the intent first** (Anti-Slop non-negotiable #1, `doctrine/design-doctrine.md` §2). One
   sentence: *subject world + action + light + distance + mood*. If you cannot say it, you are not
   ready to generate — you will get the model's mean instead of your choice.
3. **Write the prompt like a photographer/illustrator, not a slot machine.** Specify subject +
   *specific* action (mid-task, not posed), lens/medium + framing, light (named source/direction),
   mood + realism cues (natural texture, slightly imperfect), and a grade hint matching the
   treatment recipe. Concrete construction in `references/ai-image-direction-and-gate.md` §2.
4. **Attach the negative-constraint list**, keyed directly to the `ai-slop-taxonomy.md` visual tells —
   waxy/plastic skin, over-smoothed faces, extra/fused fingers, melted/dissolving backgrounds,
   floating objects, gibberish text/signage, warped/misspelled logos, uncanny eyes, mismatched
   lighting, plus the cliché stand-ins (lens-flare skyline, glowing-blue HUD, isolated-on-white).
   Full list in `references/ai-image-direction-and-gate.md` §3.
5. **Run the reject/accept gate on every candidate** (`references/ai-image-direction-and-gate.md` §5).
   Reject if *any* classic tell OR any **2026 migrated tell** fires — the obvious six-finger artifact
   is largely fixed in late-2025/2026 models, so the live tells are now plastic default-render light,
   texture-too-even, micro-anatomy/accessory errors on zoom (teeth, earrings, watch faces, fused
   hair), garbled small text/UI/gauges, impossible reflections, and the **no-author style-blend**
   ("made by nobody"). The 2026 rule: the tell is the **absence of authored specificity**. Ask
   *"would a named designer have made this exact choice?"* — if no, it is slop with zero hard anomalies.
6. **Post-process & integrate a passed frame** — generation is the *start*, never the ship. Re-grade
   into the treatment recipe, re-crop hard (off-centre, kill the default centre-punch), repair
   micro-anatomy/zoom errors, add real-world grain/noise to kill the too-even texture, composite with
   brand elements so it reads as a *composition*, not a borrowed generation. Steps in
   `references/ai-image-direction-and-gate.md` §6. If it cannot be made to read as authored, it failed.
7. **Record provenance & licensing** before ship: model + version, that commercial rights/indemnity
   were checked, any C2PA/content-credentials, and the one-line decision record (Workflow 8). Strip
   stray watermark ghosts; never pass off AI output as a real photo of a real subject.
8. **State the one-line decision record** (per `doctrine/design-doctrine.md` §2): *"<surface>: AI
   imagery permitted because <non-claim reason>; model <name/ver>, rights checked; passed the reject
   gate; re-graded/cropped into <recipe>."* No generated image ships without this sentence — an
   unstated choice is a reflexive default, exactly what the Charter exists to stop.

## Decision Rules

| Condition | Generation decision | Wrong-choice failure |
|---|---|---|
| Surface asserts real people, testimony, evidence, or outcomes | Do not generate; source authentic material | Synthetic imagery deceives the audience |
| Rights, confidentiality, or service terms are unclear | Stop and resolve before upload or generation | Inputs or outputs create legal exposure |
| Controlled concept has no truth claim and generation is allowed | Generate against the brief and reject gate | Unbounded prompting converges on generic model defaults |
| Candidate contains anatomy, text, provenance, or brand defects | Reject or repair, then rerun the full gate | Local fixes leave contradictory artefacts elsewhere |

## Capability Contract

Read and search are required for the brief, policy, rights, provenance, and existing assets. Network generation and editing require explicit production authority. Publication, uploading confidential assets, impersonation, and truth-claim use require separately stated authority and evidence.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without an approved generator, deliver a model-neutral generation brief, negative constraints, and reject rubric. Without current terms, provenance, or truth-status evidence, block generation and recommend licensed or commissioned alternatives.

## Anti-Patterns
- **Generating onto a truth-claim surface** — AI "customers," AI "our team," an AI clinician on a
  real-care page. The single highest public-backlash risk (`ai-slop-taxonomy.md` §2).
- **Shipping the raw generation** — straight out of the model, ungraded, uncropped, unrepaired. Like
  raw stock, the failure is shipping it *unauthored*.
- **Prompting in adjectives, not direction** — "beautiful, professional, high quality, 4k, trending"
  yields the convergent mean. Direct subject/light/lens/medium, not vibes.
- **No negative list** — letting the model's defaults (plastic skin, creamy bokeh, golden-hour-on-
  everything) through untouched.
- **Accepting the no-author style-blend** because it has "no obvious errors" — styleless competence is
  the *core* moat-failure (`ai-slop-taxonomy.md` migrated tells), not a pass.
- **Decorative AI sparkle/gradient as "imagery"** with no subject and no benefit — slop by the
  product/interface tells.
- **Ignoring provenance** — embedding output whose training-data rights / commercial terms / indemnity
  were never checked, or laundering an AI render as a genuine photograph.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Model-neutral generation brief and negative constraints | Authorised image operator | Prompt encodes subject, composition, medium, treatment, and exclusions |
| Candidate gate and reject/repair log | Art director and reviewer | Every candidate is assessed for truth, anatomy, text, style, and integration |
| Provenance, rights, disclosure, and post-processing record | Legal and release owner | Shipped imagery has an allowed-use decision and traceable edits |
- A **generation brief**: intent sentence, the prompt, the negative-constraint list, and the
  accept/reject gate — ready to run against any model.
- A **gate run** per candidate: tick-listed tells, pass/reject, and (on reject) the reason and next move.
- A **passed, post-processed frame** integrated into the treatment recipe — plus the provenance +
  licensing note and the one-line decision record.

## Examples
- `examples/ai-image-brief-and-gate-run.md` — a complete worked case for a sample brand
  ("Maduuka" small-merchant platform): the surface decision (why AI is allowed here), the intent
  sentence, the full prompt + negative list, and a **gate run on two real candidates** — one
  **rejected** (waxy skin + garbled signage + no-author blend, with reasons) and one **accepted**
  (with the post-processing + provenance note). Reusable as a template — not lorem.

## References
- `references/ai-image-direction-and-gate.md` — the full method: the allowed-surface decision, the
  prompt construction, the negative-constraint list, the accept/reject gate (classic + 2026 migrated
  tells), the post-processing/integration steps, and the provenance/licensing caution.
- `doctrine/design-doctrine.md` — Mission §0 ("looks human-made") and Anti-Slop Charter §2
  (state-the-choice; the sourcing-authority asymmetry that makes the model's defaults non-authority).
- `doctrine/references/ai-slop-taxonomy.md` — the visual tells (the reject-gate source) and the
  "shovelware assets" public-backlash risk (the truth-claim-surface ban).
- Siblings: `photography-art-direction` (photo sourcing + treatment system — the recipe this lands in);
  `visual-product-slop-audit` (the product-wide reject gate this skill is designed to pass).
- `doctrine/references/wcag-2.2-criteria.md` (alt text + text-over-image contrast) and
  `doctrine/references/web-performance-budgets-2026.md` (generated-image weight inside the LCP budget).
<!-- dual-compat-end -->
