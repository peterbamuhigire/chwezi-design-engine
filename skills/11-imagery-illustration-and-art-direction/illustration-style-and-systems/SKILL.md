---
name: illustration-style-and-systems
description: Use when defining, building, or auditing an illustration language, cartoon, drawn poster, infographic vignette, spot-art set, scene system, character rules, or ownable visual motif. Use photography-art-direction for photographs and iconography-system-design for reductive grid-bound glyphs.
metadata:
  portable: true
  category: 11-imagery-illustration-and-art-direction
  compatible_with:
  - claude-code
  - codex
---

# Illustration Style & Systems

<!-- dual-compat-start -->

Illustration is the most *ownable* imagery a brand has — a photo can be re-shot by anyone, but a
specific drawn language is a signature competitors cannot buy off a shelf. That is exactly why it
is also the most-faked: the "corporate Memphis" / blob-people flat style (oversized limbs,
faceless purple figures, tiny heads, confetti shapes) became the default of an entire era of tech
marketing precisely because it is easy to mass-produce — and is now the single loudest
illustration slop signal there is. This skill makes illustration a **deliberate, constructed
system** with stated attributes and an ownable motif, exactly as the doctrine Mission demands
("the moat is looking human-made", `doctrine/design-doctrine.md` §0). The goal is a language a
viewer could recognise as *yours* with the logo cropped off.

## Use When
- Drawing a woodcut poster, cartoon training panel or infographic vignette where the action, prop and reading distance determine the medium.
- Defining an **illustration style system** for a brand/product: the style attributes (line,
  shape, colour, perspective/space) that every drawing must obey so the set reads as one author.
- Building a **spot-art system** (small inline illustrations: empty states, feature tiles,
  onboarding, error pages) and/or a **scene system** (larger hero/editorial compositions) — and
  defining how the two relate (shared DNA, different density).
- Writing **character/object construction rules** — proportion, anatomy/joint logic, face
  language, how objects are built from the same primitives — so any illustrator can extend the set
  on-model.
- Designing an **ownable motif** — the one repeatable, distinctive move (a signature line
  treatment, a recurring shape grammar, a specific imperfect texture) that makes the work
  unmistakable and un-generic.
- Deciding **when illustration beats photography** (and vice versa) for a given surface.
- Auditing existing illustration for the slop signature: corporate-Memphis blob-people, mixed
  styles bought from three marketplaces, default flat-vector sameness — and remaking it on-system.
- Directing an **AI image generator** toward a *defined* illustration system (only where the
  surface permits) and gating the output against the slop tells.

## Do Not Use When
- The asset is **photography or photo-realistic AI imagery** (treatment, crop, sourcing) →
  `photography-art-direction` (sibling). That skill owns *when to photograph*; this one owns *when
  and how to illustrate*.
- The asset is a **functional icon / icon set** → `iconography-system-design` (sibling).
  Iconography is reductive, grid-bound, monochrome, and metaphor-locked; illustration is
  expressive, scene-capable, and colour-rich. If it lives in a 24px live area and means one
  concept, it's an icon, not an illustration.
- It is a **chart, diagram, or data graphic** → group 12 (`data-visualization`).
- It is **brand colour-palette construction** itself → `color-system-and-palette` /
  `accessible-color-and-contrast`; this skill *consumes* the palette and adds illustration-only
  tints, it does not define the brand palette.
- You are running the **product-wide visual slop audit** (UI + features) → cross-cutting
  `visual-product-slop-audit` (group 00/04). This skill owns *illustration direction*.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Brand intent, audience, and concept inventory | Brand and product owners | yes | Approved creative brief |
| Surfaces, sizes, themes, and accessibility needs | Product and channel specifications | yes | Placement matrix |
| Production, rights, and maintenance constraints | Art director and legal owner | yes | Ownership and delivery contract |
- The **brand**: voice/positioning, audience, and the one idea the illustration must carry
  (warmth? rigour? play? craft?). Illustration is interpretive — state the read before drawing.
- The **surfaces and sizes**: spot (16–80px / small tile), inline (200–480px), hero/scene
  (full-bleed), document/deck — each constrains detail density and stroke.
- The **inventory**: the concrete list of things to illustrate (empty states, features, concepts,
  characters) so the set is deconflicted and built to one system, not commissioned ad hoc.
- The **existing assets**: brand palette, type voice, and any icon system the illustration must
  sit beside without clashing.
- **Sourcing path**: in-house illustrator, commission, or AI-assisted (and whether AI output is
  acceptable on this surface at all — truth/people surfaces usually are not).

## Workflow

For a drawing, cartoon, illustrated poster or infographic, select a treatment from the fifteen [drawing recipes](references/drawing-recipes.md) and use [drawing production](references/drawing-production.md) to generate, repair and proof it. Apply the [visual slop taxonomy](../../../doctrine/references/ai-slop-taxonomy.md) on the intended surface. Check whether the point of contact, visual motif and setting still identify this client when the logo is hidden.
1. **State the style choice before drawing a single frame** (the anti-slop non-negotiable #1,
   `doctrine/design-doctrine.md` §2). One paragraph naming the five **style attributes**
   concretely — not adjectives:
   - **Line:** present or absent; if present, weight (e.g. 2.5px), variable vs uniform, terminal
     and join language, hand-drawn wobble vs geometric-clean.
   - **Shape:** geometric vs organic; corner language; fill style (flat / textured / gradient-
     within-a-defined-ramp); how forms are built from a small primitive set.
   - **Colour:** the illustration palette as a *constrained ramp* drawn from the brand palette
     (how many tints, the shadow/light logic, whether outline colour is fixed or tinted) — never
     the full rainbow, never the default flat-vector primaries.
   - **Perspective / space:** flat/front-on, isometric (one fixed angle), or naive-depth — pick
     **one** and hold it across the whole set; mixed perspective is an instant "assembled" tell.
   - **Texture / finish:** clean-vector, grain, halftone, paper, brush — the finish is often where
     the *ownable* signature lives.
   If you cannot write this paragraph, you are not ready to draw. See
   `references/illustration-system.md` §Style attributes.
2. **Choose the ownable motif — the one signature move** (`doctrine/design-doctrine.md` §0:
   prefer the choice a templating tool would never produce). Restraint plus one strong move beats
   five hedged ones: a recurring shape grammar, a distinctive imperfect line, a single accent
   texture, a consistent "broken-grid" composition, a recurring character of light. This is the
   thing that survives the logo being cropped off. Generic flat vector has *no* motif — that is
   precisely why it reads as slop. See `references/illustration-system.md` §Ownable motif.
3. **Decide spot vs scene, and how they relate.** Spot art is reductive — one idea, low detail
   density, reads at thumbnail size; scene art carries narrative, more depth, more characters.
   They must share DNA (same line/shape/colour/perspective attributes) but scale detail with size.
   Define the **density ladder**: what drops out as the illustration shrinks (a spot icon-scale
   illustration drops texture and background; the hero keeps them). See
   `references/illustration-system.md` §Spot vs scene.
4. **Write character / object construction rules.** So any illustrator extends the set on-model:
   proportion system (head-to-body ratio, hand/foot treatment), **anatomy and joint logic** (how
   limbs bend, whether figures have faces and what the face language is), **diversity handled with
   dignity** (real variation in body/skin/age/ability — *not* the faceless-everyone dodge), and
   how inanimate objects are built from the same primitives and line as the characters. Explicitly
   forbid the corporate-Memphis defaults (see Anti-Patterns). See
   `references/illustration-system.md` §Construction.
5. **Enforce consistency across the set.** Audit the whole inventory side by side before refining
   any single frame: one line weight, one shape language, one perspective, one colour ramp, one
   finish. The slop tell is a *set* that looks bought from three marketplaces. Build a small
   **component kit** (reusable characters, objects, backgrounds, accent shapes) so new
   illustrations are assembled on-system rather than improvised. See
   `references/illustration-system.md` §Consistency kit.
6. **Decide when illustration beats photography** for each surface, and state why
   (cross-check `photography-art-direction`). Illustration wins for: abstract/conceptual ideas with
   no literal subject (privacy, automation, "how it works"), schematic explanation, playful or
   editorial tone, owning a look photography can't (no stock can match a signature drawn language),
   and **avoiding the cost/cliché of stock people**. Photography wins for: truth claims (real
   people, real places, real product), credibility/trust surfaces, and anywhere "is this real?" is
   the question. State the call per surface in the spec. See `references/illustration-system.md`
   §Illustration vs photography.
7. **If sourcing AI:** only toward a **defined** system, only where the surface permits (never
   truth/people surfaces), and only when a human can re-draw/clean it onto the motif. Write the
   prompt + the negative-constraint list keyed to the slop tells, and run the reject gate
   (`doctrine/references/ai-slop-taxonomy.md` §Visual tells: melted detail, gibberish text,
   warped logos, six-finger anatomy, mismatched lighting). Per doctrine §2 sourcing-authority
   rule, an AI tool's *own* default illustration style (it is trained on the corporate-Memphis
   ocean) is **never** the authority for the look — it is the convergent mean we art-direct
   *away* from. See `references/illustration-system.md` §AI-assisted, gated.
8. **Accessibility & performance.** Every meaningful illustration needs `alt` text conveying its
   point (decorative → empty alt); never carry essential meaning in colour alone (WCAG 2.2
   **1.4.1**) — pair with shape/label; ensure text set over an illustration meets contrast
   (`doctrine/references/wcag-2.2-criteria.md`). Ship as optimised **SVG** where it stays vector
   (huge weight win, infinite scale, themeable via `currentColor`); rasterise only complex
   textured scenes, inside the LCP budget (`doctrine/references/web-performance-budgets-2026.md`).

## Decision Rules

| Condition | Illustration choice | Wrong-choice failure |
|---|---|---|
| Concept is abstract or impossible to photograph | Use illustration with an explicit metaphor | Forced photography becomes generic or misleading |
| Surface is small or peripheral | Use a simplified spot with reduced density | Scene detail collapses and creates noise |
| Multiple images must feel related | Apply one construction system and ownable motif | Frame-by-frame invention produces style drift |
| Image implies a real event or person | Label clearly or use authentic photography | Fiction is mistaken for evidence |

## Capability Contract

Read and search are required for brand, surfaces, inventory, and rights. Editing or generation is allowed only when production is requested. Rendering is required for scale, theme, contrast, and export claims; publication and external commissioning require separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without drawing or rendering capability, deliver the style system, construction rules, motif, inventory, and acceptance rubric. Without rights or provenance, block embedding and provide placeholder specifications.

## Anti-Patterns
- **Corporate Memphis / "Alegria" / blob-people** — faceless figures with oversized limbs and
  tiny heads, gangly noodle arms, flat saturated purple/coral, confetti geometric shapes floating
  for no reason. The defining illustration slop of the era; banned outright. It reads as "we
  bought the default" and signals no authored choice (`doctrine/design-doctrine.md` §0/§2).
- **Generic flat-vector with no motif** — clean, competent, and completely interchangeable with
  ten thousand other brands. Competence without a signature is still slop here.
- **The mixed-marketplace set** — illustrations bought from three different sources: different line
  weights, perspectives, and colour logic sitting side by side. The single loudest "unauthored"
  tell, the illustration cousin of the mixed-icon-library smell.
- **Mixed perspective / mixed finish in one set** — some flat, some isometric; some grain, some
  clean-vector — no stated rule.
- **Faceless-everyone as a diversity dodge** — removing faces/identity to "be inclusive" is the
  corporate-Memphis cop-out; depict real, dignified human variation instead.
- **Rainbow palette / default flat primaries** — ignoring a constrained ramp drawn from the brand.
- **Illustrating a truth claim** — drawing "our happy customers" instead of showing real ones;
  illustration is interpretive, so using it where credibility is the job misleads. Photograph it.
- **AI illustration shipped un-vetted** — melted detail, gibberish labels, warped logos, six
  fingers (`ai-slop-taxonomy.md` §2 "shovelware assets" — the highest public-backlash risk), or
  simply the AI's default corporate-Memphis regurgitation.
- **Decorative sparkle/gradient "illustration"** with no subject and no benefit — slop by the
  taxonomy's product/interface tells.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Illustration style and construction system | Illustrators and art directors | Line, shape, colour, perspective, finish, and motif are reproducible |
| Spot/scene inventory and density ladder | Product designers | Detail scales intentionally across target sizes |
| Export, accessibility, rights, and consistency evidence | Engineers and release owner | Representative assets pass size, theme, labelling, and provenance checks |
- A **stated style spec**: the five style attributes (line, shape, colour ramp, perspective,
  finish) named concretely *before* production.
- The **ownable motif** — the one signature move, documented and applied across the set.
- A **spot-vs-scene system** with the density ladder (what scales with size).
- **Character/object construction rules** (proportion, anatomy, face language, dignified
  diversity, object-from-primitives) that keep the set on-model.
- A **consistency kit** (reusable characters/objects/backgrounds/accents) + the audited,
  deconflicted inventory.
- A per-surface **illustration-vs-photography decision** with reasons.
- A worked **sample set** drawn/specified to the system, with a11y (alt/contrast) and
  SVG/weight/`currentColor` export notes; and (if AI) the prompt + negatives + reject gate.

## Examples
- `examples/illustration-style-spec.md` — a complete, concrete illustration-style spec for a
  sample brand ("Maduuka Merchant Tools", a small-business commerce product): the five named style
  attributes with numbers, the ownable motif, the spot-vs-scene density ladder, character/object
  construction rules, the constrained colour ramp, a per-surface illustration-vs-photography
  table, and a described **sample set** (empty-cart spot, "sync" feature tile, an onboarding
  scene, a 404) each on-system — plus the explicit corporate-Memphis rejection and the AI reject
  gate. Reusable as a template — not lorem. (See `CONTRIBUTING.md` — examples are mandatory and
  never lorem.)

## References
- `references/illustration-system.md` — the full system: the five style attributes (with how to
  state each concretely), the ownable-motif method, spot-vs-scene + density ladder,
  character/object construction rules, the consistency kit, the illustration-vs-photography
  decision rubric, the corporate-Memphis kill-list, the AI-assisted gate, and a11y/SVG export.
- `doctrine/design-doctrine.md` — Mission §0 ("looks human-made", prefer the authored choice) and
  Anti-Slop Charter §2 (state-the-choice; the sourcing-authority asymmetry rule applied to AI's
  default illustration style).
- `doctrine/references/ai-slop-taxonomy.md` — the visual tells (the reject-gate checklist), the
  "shovelware assets" public-backlash risk, and colour-not-alone.
- `doctrine/references/wcag-2.2-criteria.md` — alt text, colour-not-alone (1.4.1), text-over-
  illustration contrast.
- `doctrine/references/web-performance-budgets-2026.md` — SVG/raster weight inside the LCP budget.
- Siblings: `photography-art-direction` (when to photograph; imagery treatment) and
  `iconography-system-design` (the reductive, grid-bound functional cousin).
<!-- dual-compat-end -->
