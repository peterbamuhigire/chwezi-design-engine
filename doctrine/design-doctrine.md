# Chwezi Design Doctrine

**Version:** 0.2.0
**Owner:** Peter Bamuhigire / Chwezi Core Systems (chwezicore.com)
**Status:** active
**Scope:** Cross-cutting presentation-layer doctrine for every Chwezi engine that emits a
rendered artifact — documents (DOCX/PPTX/PDF/XLSX), websites, and software/app UI (web,
desktop, mobile). Consult this engine **in addition to** whichever domain engine is active,
exactly as the finance doctrine is consulted alongside domain work.

---

## 0. Mission — the moat is looking human-made

In the age of AI, almost anything *functional* can be generated cheaply. What will sell a
product is whether it looks **different, distinct, and the product of highly skilled human
hands.** Sameness is now free and worthless; deliberate, crafted distinctiveness is the moat.

Every skill in this engine exists to push output **away from the convergent AI mean** and toward
the unmistakable signature of a skilled designer who made specific, defensible choices. When two
options are equally "clean," prefer the one that looks *authored* — the one a templating tool
would never have produced. Restraint plus one strong, intentional choice beats five hedged,
safe ones. This mission outranks convenience every time.

---

### Premium authorship means purpose-fit craft

The engine must produce work that is unique, world-class, premium, and artistically considered
for the client and the job. This is a quality contract, not a promise that every client receives
the same visual style. Premium means that the visual language, interaction model, information
hierarchy, content, motion, and level of finish belong to this product rather than to a fashionable
reference product.

Every meaningful design output therefore needs a **purpose-fit design brief** before production:

1. Name the client, audience, primary job, environment, stakes, and success measure.
2. State one visual and experiential thesis in plain language.
3. Record three authored decisions that express the thesis, and the user or business reason for
   each.
4. Name the references consulted as transferable principles only. Reject direct imitation of a
   competitor's composition, gradient, copy, illustration language, or distinctive interaction.
5. Show the design in context with real or representative content, critical states, responsive
   behaviour, accessible alternatives, and a concrete refinement or demo loop.

No single visual treatment is universally premium. A colourful marketing site, a quiet clinical
dashboard, a dense operations console, and an editorial report may all be premium when their
choices fit their audiences and consequences. A design that cannot explain its fit, authorship,
and finished states is not ready to be called world-class; missing proof is `NOT ASSESSED`.

## 1. Purpose

Typography, colour, layout, and visual identity are not domain concerns — they cut across
every engine. This doctrine is the **single source of truth** for how a Chwezi artifact
should look, so that the rule lives in one place and the domain engines (business-plan, srs,
proposal, website, engineering-catalog, social-media, digital-research) reference it rather
than each carrying its own drifting copy.

The prime directive: **forever remove "AI slop" from Chwezi products.** Every deliverable must
make a *deliberate, stated* visual choice — never a reflexive default.

---

## 2. The Anti-Slop Charter (read this every time)

AI tools converge on a small set of "safe default" fonts, colours, and layouts because those
defaults dominate their training data. Using them is the recognisable signature of
unconsidered, machine-generated work. A page or document that opens in Inter, on a generic
purple-to-blue gradient, with evenly-spaced cards, tells a discerning client that no one
thought about design. That undermines the premium positioning of the whole portfolio
(Maduuka, Medic8, KesiLex, BrightSoma, Longhorn ERP, and external client deliverables).

**The five non-negotiables:**

1. **State the choice before producing the artifact.** Name the typeface(s), the palette
   intent, and why they fit *this* artifact's context — before writing any code or generating
   any document. See `skills/01-typography-and-fonts/font-selection-and-pairing/`.
2. **Never use a banned default.** See `references/ai-slop-banned-fonts.md`. This includes the
   secondary "escape" fonts AI reaches for *after* being told to avoid the first list.
3. **Always pair, never monotype.** A single font (or a single weight, or a single size step)
   used for everything is itself a slop signal. See `references/pairing-principles.md`.
4. **Check the licence before embedding.** Embedding redistributes the file. See
   `references/licensing-and-embedding.md`.
5. **If you cannot satisfy the above, say so and ask** — never silently fall back to Inter or
   a bare system stack.

**Sourcing authority (the asymmetry rule).** Approvals — what fonts/colours/layouts we *choose*
— trace **only to human design authority**: typographers, type foundries, and the design
literature. **AI-vendor recommendations are never authority for what to use**, because an AI
tool's own picks are precisely what the next wave of AI output converges on — adopting them just
launders slop one step removed. AI-vendor sources are admissible **only as evidence of what to
avoid** (the AI confessing its own convergence). When a human-justified approved font also
happens to appear on an AI tool's recommend-list, note the convergence risk — do not treat the
AI nod as endorsement. See `references/ai-slop-banned-fonts.md` §Evidence basis.

---

## 3. How the engine is organised

| Path | What it holds |
|---|---|
| `doctrine/design-doctrine.md` | This charter — the always-load entry point. |
| `doctrine/references/` | The canonical rules: the AI-slop taxonomy, banned font list, font categories, pairing, type scale, embedding, licensing, and the device-common system-font fallback tier. |
| `doctrine/examples/` | Worked examples (good pairings, a slop-audit before/after). |
| `skills/00-cross-cutting-ops-qa-a11y/` | **Co-activates with every group.** Accessibility (WCAG 2.2), design QA/critique, the visual audits, ethics, performance-as-UX — consult IN ADDITION, never skip. |
| `skills/01-typography-and-fonts/` | Type selection & pairing, scale, embedding, licensing, slop audit. |
| `skills/02-color-brand-and-visual-identity/` | Palettes, contrast-as-design, brand systems, identity. |
| `skills/03-layout-grid-and-composition/` | Grids, spacing, hierarchy, responsive/editorial composition. |
| `skills/04-web-and-ui-design/` | Core interface craft (web/app/desktop), AI-native UI, forms, interaction patterns. |
| `skills/05-ux-process-research-and-psychology/` | Research, usability, heuristics, behavioural/cognitive, process. |
| `skills/06-sector-and-domain-ux/` | Vertical playbooks (healthcare, legal, fintech, e-comm, gov/NGO…). |
| `skills/07-mobile-ios-android-cross-platform/` | iOS HIG, Android Material, cross-platform, touch/gesture/adaptive. |
| `skills/08-motion-and-interaction/` | Animation, micro-interactions, transitions, gesture choreography. |
| `skills/09-design-systems-tokens-and-theming/` | Tokens, components, dark mode, multi-brand, dev handoff. |
| `skills/10-content-design-and-ux-writing/` | Microcopy, voice/tone, error/empty/onboarding copy. |
| `skills/11-imagery-illustration-and-art-direction/` | Photography, illustration, iconography, 3D, AI-image direction. |
| `skills/12-data-viz-and-dashboards/` | Charts, dashboards, KPI exhibits, data products. |
| `skills/13-presentations-and-documents/` | Decks, DOCX/PDF/XLSX, editorial, **email/newsletter**, design storytelling/case-studies. |
| `skills/14-conversion-and-web-page-patterns/` | Landing/conversion, IA & navigation, onboarding, trust/social-proof, empty/error/loading states. |
| `skills/15-game-visual-experience/` | Game-specific orchestration, HUD/diegetic interfaces, art direction, game feel/camera/haptics, and children/learning experience. |
| `fonts/<category>/` | Premium font files you purchase (gitignored) + a tracked `MANIFEST.md` per design-intent category. |
| `governance/` | The design quality gate. |
| `integration/` | The trigger block other engines paste in, plus the migration log. |

---

## 4. The font-folder protocol (standard-first, premium-when-present)

Every font skill follows the same two-tier rule:

1. **Baseline candidates:** consult the named standard fonts in `references/font-groups-and-usage.md`.
   Verify actual availability and the licence of the exact font files before use or embedding;
   a catalogue name is not installation evidence or permission. If the required face cannot be
   loaded lawfully in the target output, record the gap and select an approved available fallback.
2. **Premium (use when present):** before committing, **scan `fonts/<matching-category>/`** for a
   purchased family the user has dropped in. If a premium family is present *and* its MANIFEST
   permits the intended use, prefer it when it would make the product look better. Otherwise
   fall back to the named baseline. See `skills/01-typography-and-fonts/premium-font-scan/`.

The font folders now route by design intent and functional role:
`01-formal-institutional`, `02-editorial-literary`, `03-modern-product-grotesque`,
`04-technical-data-code`, `05-friendly-humanist`, `06-expressive-display-artistic`,
`07-script-cursive-handwritten`, and `08-body-ui-workhorses`.

These eight folders are fixed team taxonomy. On every new device, and after pulling font-
taxonomy changes, create or verify all eight category directories before adding local font files
or scanning for premium families. Individual font choices may differ per device; the categories
must not.

Selection order is: artifact context -> design voice -> functional role -> licence and
availability. This lets the engine distinguish formal authority, editorial craft, product
grotesques, technical precision, friendly service UX, expressive display type, cursive/script
accents, and quiet body/UI workhorses.

---

## 5. Integration (reference model)

Design skills live **only** in this engine. Each domain engine carries a one-line trigger
block (see `integration/integration-plan.md`) that says: *"Any typography / UI / visual
formatting / colour / layout work → consult `C:\wamp64\www\chwezi-design-engine` (start at
its `README.md`), IN ADDITION to the active engine."* Nothing is mirrored — this keeps each
domain engine's skill count down and prevents drift. The engine is cloned on every device the
user works on, so the reference always resolves.

---

## 6. Versioning

Semver, tracked here in the header. Reference files and skills state their own provenance.
Breaking changes to the banned list or group taxonomy bump the minor version and are logged in
`integration/integration-plan.md`.
