---
name: data-illustration-and-infographics
description: Use when designing a self-contained infographic, explanatory visual, annotated diagram, pictorial data story, or chart-led visual for print, presentation, web, or social; use data-visualization for one analytical chart and dashboard-and-data-product-design for dashboard systems.
metadata:
  portable: true
  category: 12-data-viz-and-dashboards
  compatible_with:
  - claude-code
  - codex
---

# Data Illustration And Infographics

Own the visual translation of a complex idea into a memorable, truthful, self-contained visual argument.

<!-- dual-compat-start -->
## Use When

- The output is an infographic, visual explainer, pictorial data story, annotated process, timeline, map-led story, comparison poster, or chart-and-illustration composition.
- The visual must work without a live presenter explaining every element.
- The brief needs an authored metaphor, human warmth, editorial hierarchy, or a distinctive visual signature in addition to accurate data.
- A chart alone is not enough because the audience needs context, sequence, mechanism, or a conclusion.

## Do Not Use When

- The task is one analytical chart with no multi-element story; use `data-visualization`.
- The task is chart-type selection; use `chart-selection-and-encoding`.
- The task is a dashboard page, KPI tile system, drill-down, or cross-filtered data product; use `dashboard-and-data-product-design`.
- The task is only brand colour, typography, illustration production, or accessibility remediation; route to the matching sibling skill and use this skill only for the infographic story.

## Required Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---:|---|
| Decision, audience, desired action, and single takeaway | Brief owner | yes | Defines the visual thesis and stopping point |
| Validated data, definitions, units, period, denominators, and uncertainty | Data owner or evidence pack | yes for factual claims | Prevents persuasive decoration from becoming misinformation |
| Medium, dimensions, viewing distance, responsive target, and distribution context | Publisher | yes | Controls density, type size, interaction, and alternate formats |
| Brand, cultural, tone, and subject-sensitivity constraints | Brand or domain owner | conditional | Prevents a playful treatment from trivialising a serious subject |
| Licensed assets, fonts, icons, image provenance, and AI-output status | Production owner | conditional | Establishes lawful, attributable production |

## Workflow

1. **Frame the job.** Write the audience, decision, consequence of misunderstanding, medium, and one-sentence visual thesis. Load `doctrine/design-doctrine.md` and the portfolio craft loop.
2. **Reduce the editorial question.** Convert the brief into one primary question, one conclusion, and no more than three supporting beats. Put surplus facts in an appendix or companion text.
3. **Audit the evidence.** Check source, definitions, missingness, scale, uncertainty, and whether each number supports the intended conclusion. Route current claims through Digital Research; books supply durable concepts only.
4. **Choose the visual grammar.** Decide whether the story is comparative, temporal, spatial, proportional, causal, procedural, categorical, or explanatory. Choose the most truthful chart or diagram before styling.
5. **Invent the metaphor deliberately.** Select one visual metaphor or pictorial vocabulary that improves comprehension and belongs to this subject. Record why it fits; reject borrowed compositions and decorative metaphor that competes with the data.
6. **Storyboard the reading path.** Sketch title, orientation, main exhibit, annotations, supporting detail, source note, and conclusion in the order a reader will scan. Use generous space and a clear entry point.
7. **Build in layers.** Establish the data layer first, then labels and annotations, then restrained illustration, then brand and finishing details. Use one focal accent and a controlled type pair; consult colour, typography, composition, imagery, and accessibility siblings.
8. **Make the visual self-explaining.** Direct-label important values, explain symbols, show units and period, state the conclusion, and provide alt text or a text-equivalent narrative. Never make a legend, colour, or animation carry meaning alone.
9. **Exercise failure paths.** Test a missing value, long label, narrow viewport, greyscale print, colour-vision deficiency, 200% zoom, screen reader reading order, and a serious-topic or low-attention interpretation.
10. **Render, refine, and record.** Inspect at the target size and a reduced thumbnail. Remove one unnecessary element, correct one ambiguity, and retain the design decision that works. Record source/rights, assumptions, checks, reviewer, and unresolved `NOT_ASSESSED` items.

### Mobile product and social infographics

For a product-listing image, social post, or other image commonly scanned on a phone, treat the actual image slot as the design canvas. At its delivered size, the reader should be able to identify the subject, the single buyer-relevant message, and the evidence for that message at a glance. If the copy needs zooming, split or recompose the story; do not reduce type to preserve every detail. Keep supporting facts in a companion image, caption, or accessible text alternative.

- Choose one message for each image. Make one benefit, comparison, instruction, or proof point dominant; move secondary benefits and specifications elsewhere.
- Prefer visible proof when the category supports it: a truthful before/after, a product beside a familiar scale reference, or a clearly enumerated package-contents view. Show context and limitations so a comparison does not imply an unsupported result or included item.
- Use a consistent, purpose-fit type, colour, shape, and image treatment across the image set. Balance, contrast, hierarchy, proximity, whitespace, proportion, repetition, and movement should reinforce the same reading path; variety must not compete with the focal point.
- Treat hooks, novelty, density, point-of-view, saves, shares, virality, and conversion lift as hypotheses for a specific audience and channel. Do not equate information density with value or claim a design will outperform without valid comparative evidence.
- Review the exported asset in the real listing/feed slot and on a representative narrow viewport. Record dimensions, smallest essential text, the first three-second reading, crop behaviour, and any device or audience checks that were not performed. A resized preview is not a device or comprehension test.
- Compare materially different treatments in the same target slot when the channel permits testing. Change one meaningful design choice at a time, define the audience, exposure, success measure, and stopping rule, and report uncertainty. Likes, anecdotes, and an uncontrolled before/after are not evidence of conversion lift.

### Composition and data-story principles

Use design principles as a set of checks on the visual argument, not a template that must add elements. The viewer should find the main claim first, understand its evidence next, and reach supporting detail only when needed. Give the focal point enough contrast and space to stand out; keep the composition balanced even when it is asymmetrical. Group related labels and exhibits by proximity, and use movement, rhythm, and directional cues to make the reading order feel natural. Repeat a restrained set of type, colour, shape, and annotation styles to create unity; introduce variety through scale or form only when it improves comparison or interest. Check that proportion accurately represents quantities and that emphasis does not exaggerate certainty. Remove any device that competes with the takeaway.

For review, verify that balance, contrast, hierarchy, unity, repetition or pattern, movement or rhythm, emphasis, proximity, whitespace, proportion, and variety each support the intended audience and medium. A principle can be satisfied by a deliberate decision to keep an element simple or absent; do not add decoration to tick a box.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| The reader must compare exact magnitudes | Use position or length on a common scale; add direct labels | Pictograms or area imply false precision |
| The story is a process or mechanism | Use a numbered sequence or diagram with directional cues | A decorative collage hides causality |
| The audience needs a memorable entry point | Add one restrained metaphor or human detail that preserves the data | Novelty becomes the subject and the conclusion disappears |
| Data is uncertain, incomplete, or estimated | Show range, missingness, definition, and confidence in plain language | A clean icon or single number implies certainty |
| The topic involves harm, grief, inequality, illness, or trauma | Use warmth and clarity without jokes, caricature, gamification, or sensational contrast | Humour trivialises the subject or damages trust |
| The output will be read on mobile or shared as an image | Create a mobile composition or split sequence; preserve type size and text alternative | Shrinking the desktop poster makes it unreadable |
| The infographic is a secondary product-listing or social image | Give the image one buyer- or reader-relevant message; show contextual proof where it is truthful; check it at the delivered slot size | Dense copy, unsupported before/after claims, and unexplained measurements are skipped or misread |
| A proposed hook, novelty, or dense save-worthy checklist is meant to improve reach or conversion | State it as a channel-specific hypothesis and define a valid comparison before claiming impact | Virality anecdotes or design rules are mistaken for causal evidence |
| Multiple visual treatments are proposed for a performance decision | Compare at the actual target size with a defined audience, measure, and stopping rule; isolate meaningful design differences where practical | Confounded exposure or engagement proxies are mistaken for causal conversion evidence |
| A visual choice cannot be explained by audience, message, or medium | Remove it or mark it as an experiment | Decoration masquerades as design |

## Capability Contract

- Read and search are required for the brief, evidence, existing brand system, and source/rights record.
- Calculation or data inspection is required when quantities are encoded.
- Editing and rendering are required for production; accessibility inspection includes keyboard or reading order where applicable, text alternatives, contrast, and greyscale/CVD checks.
- Network access is required only for authorised current-source or asset/licence verification. Publication, paid distribution, or third-party contact needs separate authority.

## Degraded Mode

- Without validated data, produce a labelled storyboard or visual specification, never a factual infographic.
- Without rendering, provide source, dimensions, type scale, checks, and a `NOT_ASSESSED` visual review; do not call the artifact finished.
- Without licensed assets or font evidence, use placeholders or an approved available baseline and mark rights `NOT_ASSESSED`.
- Without accessibility tooling, provide the text-equivalent narrative and a manual checklist, then block release of accessibility-critical work until checked.

## Anti-Patterns

- **Poster-shaped data dump.** Fix: choose one conclusion and demote or remove everything else.
- **Decorative pictograms used as a measurement scale.** Fix: encode comparison with a truthful chart and use illustration only for orientation or metaphor.
- **Rainbow, red/green-only, or colour-only meaning.** Fix: use a tested semantic scale plus labels, shapes, patterns, or line styles.
- **Humour pasted onto a serious subject.** Fix: use approachable language and humane spacing without comedy.
- **Unlabelled estimates, cropped baselines, or missing denominators.** Fix: show units, period, base, uncertainty, and source beside the claim.
- **AI-generated sameness: gradient, card grid, generic icons, and stock imagery.** Fix: define a visual thesis and make three defensible authored choices before production.
- **One desktop canvas mechanically shrunk for every channel.** Fix: recompose for print, presentation, mobile, and social with a text alternative.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Infographic or visual explainer | Intended reader or publisher | One takeaway is visible, the data is truthful, the reading path is clear, and the target render is reviewed |
| Storyboard and visual decision record | Designer, analyst, or AI production tool | Metaphor, chart/diagram choice, hierarchy, type, colour, rights, and accessibility decisions are explicit |
| Text-equivalent and source note | Accessibility reviewer and downstream publisher | All material content, units, uncertainty, and provenance remain available without the graphic |

## Evidence Produced

- Brief and visual thesis.
- Data/source/rights register with durable book concepts separated from current claims.
- Chart/diagram selection and encoding record.
- Render, accessibility, responsive, greyscale, and reader-path checks.
- Reviewer observation, unresolved gaps, rollback or recovery action, and re-audit date.

## Examples

- See `examples/infographic-worked-spec.md` for a complete illustrative decision and storyboard.

## References

- [`doctrine/design-doctrine.md`](../../../doctrine/design-doctrine.md) for purpose-fit authorship and anti-slop rules.
- [`references/infographic-systems.md`](references/infographic-systems.md) for the book-informed editorial, visual, and production system.
- [`../data-visualization/SKILL.md`](../data-visualization/SKILL.md) for analytical chart accuracy and accessibility.
- [`../chart-selection-and-encoding/SKILL.md`](../chart-selection-and-encoding/SKILL.md) for chart choice and perceptual encoding.
- `00-cross-cutting-ops-qa-a11y/` for accessibility, ethics, performance, and visual QA co-activation.
<!-- dual-compat-end -->
