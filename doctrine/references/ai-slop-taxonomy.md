# Reference: The AI-Slop Taxonomy (what we are fighting)

"AI slop" is a recognised category of **digital waste**: low-effort, mass-produced AI content
deployed at scale to extract clicks, cash, or attention by prioritising **volume over
substance**. Unlike disinformation, its motive is usually extraction, not deception. This engine
exists to keep Chwezi products on the *opposite* side of this line — see the doctrine Mission
("the moat is looking human-made").

This reference scopes the taxonomy to the parts the **design engine** owns (visual, product,
interface). The **textual** tells (preambles, buzzword salad, vague attribution) are a *writing*
concern owned by the `digital-research-engine` (`anti-ai-slop` / `ai-slop-audit`) — cross-cite,
don't duplicate.

**Living-reference rule:** AI-slop tells move as models, templates, vendor defaults, and public
recognition move. Before changing this taxonomy or treating a "current" tell as durable, run
`skills/00-cross-cutting-ops-qa-a11y/slop-doctrine-refresh-and-research-loop/` and
`doctrine/references/living-slop-refresh-protocol.md` with the digital-research engine's source
evaluation discipline.

---

## The 5 categories (design-relevant emphasis in **bold**)

1. **Social-media slop** — engagement-bait & "brainrot": hyper-surreal emotionally-manipulative
   imagery (the "Shrimp Jesus" genre), automated looping AI visuals with robotic voiceover.
   *Design relevance:* never ship kitsch, uncanny, or manipulative AI imagery as brand content.
2. **Corporate & advertising slop ("shovelware assets")** — unpolished generative assets in
   public marketing: **misspelled logos, mismatched/uncanny promo art, deformed key-art
   thumbnails** (e.g. 19 smudged faces on a *12 Angry Men* tile). *Highest design risk for
   Chwezi* — this is the failure that triggers public backlash.
3. **Submission slop** — mass-generated books/papers/applications flooding gatekeepers
   (LLM prompt left in the text; scrambled pseudonyms). *Mostly a content concern → research
   engine.*
4. **Slop news / programmatic-SEO "pink slime"** — text for bots not humans; semantic
   hollowness. *Content concern → research engine; design only ensures the page doesn't look
   templated.*
5. **Product & interface slop ("feature cramming")** — forcing generative AI into UIs where it
   hurts UX. **The "AI hammer looking for a nail"** (a chatbot where a search bar was faster);
   hallucinating support bots inventing policies. *Squarely the design engine's job — see the
   audit skill.*

---

## Visual & video tells (the audit checklist)

If any of these appear, the asset is slop — reject or remake:

- **Waxy / hyper-glossy skin**, plasticky textures.
- **Melted or incoherent background detail**; objects that dissolve into each other.
- **Illegible text / gibberish signage** baked into the image.
- **Floating objects**, impossible shadows, broken physics.
- **Anatomically impossible features** — extra fingers/limbs, missing joints, fused hands.
- **Misspelled or warped logos / brand marks.**
- **Uncanny faces** — dead eyes, asymmetry that reads as "off," too-smooth symmetry.
- **Mismatched lighting** across a composite that should be one scene.

## Product / interface tells

- An AI feature (summary, chat) inserted where **standard navigation or search was faster**.
- A chatbot deployed without guardrails that can **invent commitments** (returns, prices, legal).
- Generative output surfaced **without verifiability, grounding, or an undo/adjust affordance**.
- "AI" badges and gradients used as decoration with no real user benefit.

## Why slop floods everything (so we resist the pull)

The cost of generation has dropped to near-zero, so quality gatekeepers collapse and programmatic
ad networks reward pure volume. The economic gravity is *toward* slop. Chwezi's deliberate
counter-position — crafted, distinctive, human-looking work — is precisely what becomes scarce
and therefore valuable.

---

## Counter-doctrinal "best practices" — taught by the literature, REJECTED here

The UI/UX book canon the engine studied contains advice that was once standard but
contradicts this engine's doctrine. Skills must **not** adopt these even though respected books
teach them — inoculate against them explicitly:

- **Glassmorphism as a default surface treatment** (taught by *Fundamentals of Creating a Great
  UI/UX*). It is a convergent AI-slop tell (see the taxonomy above) and usually fails contrast.
  Use deliberate, legible surfaces; reserve translucency for genuine platform materials (iOS
  Liquid Glass *chrome only*), never as decoration.
- **Fixed red/green or red/blue colour semantics + shadow-only dark-mode elevation** (taught by
  *Mobile Design Pattern Gallery*). We use **OKLCH semantic roles** and **lightness-based**
  elevation in dark mode (see `dark-mode-and-theming`), and **never colour-alone** signalling
  (WCAG 1.4.1) — always pair colour with icon/shape/text.
- **`ease-*-back` / bouncy overshoot interpolators** (taught by *App Design Apprentice*). These
  contradict `motion-design`'s **damping-ratio ζ ≥ 0.7 (no bounce)** rule. Use spring physics in
  the no-bounce band; honour `prefers-reduced-motion`.
- **Hover-reveal / hover-as-primary-invitation and drag-as-hero interactions** (taught by
  *Designing Web Interfaces*, 2009). Desktop-only; they have **no touch equivalent**. Provide a
  visible, tap-operable affordance first; hover is an enhancement, never the only path.

If a skill's source material recommends one of the above, it must state the rejection and the
doctrine-correct alternative.

---

## Machine-error overlay for design

**Observed shift:** The Kaizen input identifies polished output that adds reading or interaction
cost without adding meaning; the signal is editorial and structural, not only lexical or visual.
**Evidence grade:** first-party and context-bound for the Impeccable catalog, but weak for a
universal claim about machine authorship or prevalence. **Design consequence:** use ME1-ME7 and
AS1-AS7 as evidence-led review controls, with the owner's explicit visual no-ship boundary below.
**Scope:** interface copy, information architecture, repeated components, product feature framing,
presentation surfaces, and handoff. **Date checked:** 2026-09-03.

The Digital Research engine owns written-copy semantics; this engine applies the same ME1-ME7 lens
to information architecture, repeated components, interface copy, and visual hierarchy:

| ID | Design interpretation |
|---|---|
| ME1 | Adjacent screens, cards, or labels repeat the same user information without a new task or state. |
| ME2 | Symmetric columns, cards, or alignment imply equal importance that the product does not support. |
| ME3 | Onboarding, helper text, or UI copy explains after the user already has enough to act. |
| ME4 | Visual scale, motion, colour, or AI branding makes an ordinary feature look more consequential than it is. |
| ME5 | Placeholder imagery, examples, or copy could be swapped into any client or sector unchanged. |
| ME6 | Repeated gradients, cards, icon rows, badges, or motion become a recognisable template tic. |
| ME7 | A section, component, or visual flourish has no user task, decision, proof, or state to justify it. |

Repeated UI is valid when it supports scanning, state recognition, accessibility, or a documented
interaction model. Written-copy findings route to Digital Research's dated machine-error gate.

### Impeccable-derived AS overlay

| ID | Design interpretation |
|---|---|
| AS1 | Default palette, type, layout, or copy lacks a brief-specific reason. |
| AS2 | Eyebrow, chip, icon tile, hero metric, or tiny section number adds authority without task value. |
| AS3 | Identical cards, nested cards, or monotonous spacing flatten information hierarchy. |
| AS4 | Glow, gradient, marquee, cursor, pulse, bounce, or hover motion demands attention without state or task value. |
| AS5 | Imagery, illustration, icon, or example is generic, shape-assembled, washed out, missing, or placeholder-valued. |
| AS6 | Buzzwords, em-dash cadence, aphoristic contrast, or theatrical framing becomes a repeated copy tell. |
| AS7 | Hidden content, poor contrast, tiny text, clipping, overflow, broken assets, or invalid structure is concealed by polish. |

For websites, web products, design artefacts, and presentations, purple gradients, glassmorphism,
neon glow, AI-beige defaults, decorative editorial scaffolding, and decorative motion are no-ship
choices. Functional status, accessibility, data encoding, and approved brand-system decisions must
state their reason and evidence mode. The overlay is not a ban on an intentional non-decorative
choice merely because it is common.

<!-- rule:layout.decorative-side-stripe -->
**Side-stripe ruling (Option A, 29 Sep 2026; decided by orchestrator under Peter's delegated
authority).** A coloured border wider than 1 px on one side of a card, callout, alert or list item
is a decorative scaffold (AS2) and fails at `warning` severity. Use a background tint, an icon and a
text label, or a 1 px full border. A side stripe stays only as a status encoding: the element
carries a status token and a non-colour text or icon marker, and the source records the reason in
a `chwezi-slop` waiver. Blockquotes and state indicators (active, selected, focused) are outside
the rule. The rule may rise to `block` on Persuade surfaces once visitor modes are wired (M10-10).

<!-- rule:detector.chwezi-slop -->
**Mechanical enforcement.** `tools/slop-detector/` (`chwezi-slop`) turns AS1-AS7 into registry
rules with pass/flag fixtures and is the `cli` and `browser` evidence mode for this overlay. Its
severity ladder keeps it from becoming an aesthetic blacklist: `block` needs a standard (WCAG), an
engine doctrine line or a dated house ruling; `warning` needs an engine doctrine line; rules whose
only support is AI-tool evidence stay `advisory` and never fail a run.

## How the engine uses this

- The **`visual-product-slop-audit`** skill (`skills/00-cross-cutting-ops-qa-a11y/`) runs these
  checklists against imagery, UI, and product features.
- The **`ai-slop-typography-audit`** skill covers the type-specific tells
  (`ai-slop-banned-fonts.md`).
- The **`slop-doctrine-refresh-and-research-loop`** skill refreshes this doctrine when the world
  changes, using the digital-research engine for source evaluation instead of guessing from vibes.
- Together with the Mission and the banned-font list, this is the engine's definition of "what
  we must never ship."
