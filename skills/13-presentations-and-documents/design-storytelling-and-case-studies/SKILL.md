---
name: design-storytelling-and-case-studies
description: Use when structuring the evidence-backed narrative of a design deck, pitch, portfolio piece, or case study around problem, stakes, decisions, before/after, proof, and action. Use deck-system for slide craft and never substitute narrative for a working demonstration.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# Design Storytelling & Case Studies

> **THE FENCE — read first, applies throughout.** Narrative *serves* the authored artifact;
> it must **NEVER replace the working demo, and must never decorate slop.** A story structure
> organises the *telling* of real, shipped, authored work — it is not a way to make a templated
> or unbuilt thing sound good. Every beat in every structure below must be **anchored to real
> evidence** (a working demo, a measured outcome, an actual decision you made), never to fiction.
> If there is no real artifact and no real outcome, there is no case study — there is a pitch for
> an imaginary puppy (`doctrine/references/creative-selection-and-taste.md`, rule 1). A well-told
> story over slop is worse than an untold one: it lends false credibility to the convergent mean
> the Mission exists to defeat. **Structure is the frame; the authored work is the picture.**

<!-- dual-compat-start -->
## Use When
- Structuring the **narrative arc** of a case study, design write-up, portfolio piece, or the
  story spine beneath a pitch/strategy deck.
- You need to **choose the right named structure** (Freytag, Three-Act, Pixar, Kishōtenketsu,
  Contrast beginning-to-end, Peak-End) for a specific story and audience.
- You are telling the story of **real, shipped, authored work** and need to frame the user as the
  protagonist, the product as a bit-player, and anchor each beat to evidence.
- Writing a problem→stakes→authored-decision→before/after→proof→CTA narrative.

## Do Not Use When
- You need **deck visual craft** — slide economy, action titles, builds, type/colour system,
  presenter notes → use `deck-system` (this skill supplies the *narrative structure*; deck-system
  owns the *deck craft* and the delivery frameworks: Sparkline, S.T.A.R. moment, Big Idea).
- The deliverable is a **long-form DOCX/PDF** report whose architecture (not narrative arc) is the
  question → `docx-report-and-document-formatting` / `pdf-proposal-and-bankable-document-design`.
- **There is no real artifact or outcome yet.** Then there is nothing to narrate — go build the
  demo first (`creative-selection-and-taste.md`). Do not use this skill to dress up the unbuilt.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Real problem, users, constraints, decisions, and outcome | Project evidence | yes | Source artefacts and chronology |
| Audience and desired action | Sponsor or publisher | yes | Narrative brief |
| Permission and confidentiality boundaries | Project owner | yes | Approved disclosure scope |
- The **real work** being told: a shipped artifact / working demo / outcome you can point to.
- The **evidence** available at each beat: the original problem, the decision you made and *why*,
  the measurable before/after delta, proof (metrics, screens, quotes, the live thing).
- The **audience** and the **one action** the telling should produce (the CTA).
- Who the **protagonist** is (the user, not you, not the product).

## Workflow
1. **Confirm there is a real thing to tell** (the fence). Name the shipped artifact / working
   demo / measured outcome this case study is *about*. If you cannot, stop — there is no story
   yet, only an imaginary puppy (`creative-selection-and-taste.md` rule 1). Do not proceed.
2. **Cast the protagonist.** The **user is the protagonist; your product is a bit-player** in
   *their* drama — it must fit the contours of their existing story, not star in its own
   (the "story is the thing" thesis, `references/case-study-structure.md`). State who they are and
   what they were trying to do.
3. **Establish the Contrast, beginning-to-end.** Name the **before** (the problem with real stakes)
   and the **after** (the outcome). The size of this delta *is* the narrative; if you open on the
   solution you erase the transformation. Do not open on the filtration system — open on the
   drought. (`references/narrative-frameworks.md` §Contrast.)
4. **Choose the structure** from `references/narrative-frameworks.md` using its decision table —
   match it to the story's shape and audience (Three-Act for a clean pitch; Pixar for a relatable
   change; Kishōtenketsu when there is no villain/conflict — an explanatory product story; Freytag
   for a full dramatic case study; Peak-End to design the climax + close of any of them).
5. **Lay the beats and anchor each to evidence.** Map the story onto the chosen structure's beats
   (`references/case-study-structure.md` gives the six-beat case-study spine:
   problem→stakes→authored decision→before/after→proof→CTA). For **every beat, name the concrete
   evidence** that proves it. A beat with no evidence is fiction — cut it (Kill Your Darlings).
6. **Make the authored decision the turning point.** The climax of a design case study is *the
   specific, defensible choice a skilled human made* (the heuristic resolved by taste, not a
   metric) — show the decision and *why* it, not a feature tour. This is where the Mission lives.
7. **Design the Peak and the End deliberately.** Memory is shaped by the most intense moment and
   the close (Peak-End rule). Place your strongest piece of evidence at the peak; end on the
   transformed "after" + the single CTA — never trail off on a credits-roll of features.
8. **Cut to top tasks.** Strip everything the audience did not come for; one clear through-line
   beats a complete but cacophonous record (top-tasks / long-neck, `references/case-study-structure.md`).
9. **Hand off.** If this narrative sits under a deck, pass the arc to `deck-system` for slide
   craft; if it is a written case study, format per the docx/pdf skills. The *structure* is done
   here; the *visual telling* is theirs.

## Decision Rules
| Condition | Story choice | Wrong-choice failure |
|---|---|---|
| Audience must approve a decision | Problem–stakes–options–recommendation | A portfolio arc delays the decision |
| Shipped work has measurable change | Before–decision–after–proof | Process theatre displaces outcomes |
| Evidence is incomplete | State limits and use a conditional ending | Invented certainty damages credibility |

## Capability Contract
Read and search are required for project evidence and permissions. Editing is allowed for an authorised narrative deliverable. Publication, client identification, or confidential disclosure requires separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without outcome evidence, produce a process case study labelled accordingly. Stop before publishing claims, quotes, or metrics that cannot be sourced; recover through anonymisation, omission, or a named evidence request.

## Anti-Patterns
- **Narrative as decoration over slop** — wrapping a templated, unbuilt, or convergent artifact in
  a Hero's-Journey arc. The cardinal sin this skill is fenced against. Story never launders slop.
- **Fictional beats** — inventing stakes, a "journey," or an outcome the evidence does not support.
  If you cannot point to it, it did not happen; cut it.
- **Product as protagonist** — making the case study a feature tour where the product is the hero.
  The user is the hero; the product is a bit-player that fit their story.
- **Opening on the solution** — showing the polished result first, erasing the before/after delta
  so the audience never feels how big the transformation was.
- **No turning point / feature soup** — listing what was built instead of showing the one authored
  decision and *why* it was made.
- **Trailing off** — ending on a feature list or a thank-you slide instead of the transformed
  state + one CTA (wasting the Peak-End close).
- **Telling everything** — a complete but undifferentiated record that buries the top task the
  audience actually came for.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Evidence-backed story spine | Deck or case-study author | Every beat maps to a source or is labelled interpretation |
| Scene/slide/section outline | Production skill | Stakes, decisions, proof, and action progress coherently |
| Disclosure and evidence register | Reviewer and project owner | Permissions, anonymisation, sources, and gaps are explicit |
- A **narrative spec** for a case study or deck: the named structure chosen (with the reason), the
  protagonist cast, the before→after contrast stated, the beats mapped onto the structure, and
  **the concrete evidence anchoring each beat** — ready to hand to `deck-system` (deck) or the
  docx/pdf skills (written case study) for visual production.

## Examples
- `examples/case-study-kesilex-onboarding.md` — a fully worked case-study/deck narrative for a real
  project: the chosen framework and *why*, the arc beat-by-beat, and the specific evidence anchored
  at each beat (incl. the user-as-protagonist framing and the authored-decision turning point).

## References

- [chwezi-presentation-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-presentation-standard/SKILL.md) (binding for Chwezi decks: deck-type sequences, case studies with baseline, intervention, outcome and limits, no correlation as impact).
- `references/narrative-frameworks.md` — the named structures (Freytag, Three-Act, Pixar,
  Kishōtenketsu, Contrast beginning-to-end, Peak-End, Rule of Three) and a decision table for
  choosing among them.
- `references/case-study-structure.md` — the six-beat case-study spine (problem→stakes→authored
  decision→before/after→proof→CTA), user-as-protagonist / product-as-bit-player framing,
  evidence-anchoring, and top-tasks cutting.
- `doctrine/design-doctrine.md` (Mission — the moat is looking human-made; the Anti-Slop Charter).
- `doctrine/references/creative-selection-and-taste.md` — **the fence**: the working demo is the
  unit of progress (rule 1); a story must be about a real demo/outcome, never the imaginary puppy;
  the authored decision (heuristic by taste, not metric) is the turning point of the telling.
- `deck-system` (paired skill) — owns deck *craft* and the delivery frameworks (Sparkline, S.T.A.R.,
  Big Idea, Glance Test). This skill supplies the *narrative structure* that deck-system renders.
<!-- dual-compat-end -->
