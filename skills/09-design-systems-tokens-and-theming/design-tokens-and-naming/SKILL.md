---
name: design-tokens-and-naming
description: Use when defining, naming, mapping, or exporting primitive, semantic, and component design tokens for colour, type, space, radius, elevation, motion, themes, or brands. Use component-library-architecture for component APIs and design-handoff-and-dev-spec for screen delivery.
metadata:
  portable: true
  category: 09-design-systems-tokens-and-theming
  compatible_with:
  - claude-code
  - codex
---

# Design Tokens And Naming
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- Standing up a new design system, or formalising an ad-hoc one, and you need named tokens
  instead of raw hexes/px scattered through code and Figma.
- Adding a second theme: dark mode, a high-contrast mode, a sub-brand, or a white-label tenant —
  anything that must reskin without rewriting components.
- Exporting tokens for engineering: CSS custom properties, JSON, Tailwind theme, iOS/Android,
  or a Style Dictionary build that fans out to all of those.
- Mapping brand tokens onto Apple-native materials, SF Symbols, app icon variants, or Liquid
  Glass chrome without pretending system materials are raw brand color tokens.
- Reviewing an existing token set that has drifted — duplicate hexes, components hardcoding
  primitives, names like `--blue-2` used as a semantic role.

## Do Not Use When

- You are still *choosing* the palette, ramp, or contrast pairs — do that first in
  `02-color-brand-and-visual-identity/color-system-and-palette` (it produces the perceptual ramp
  and the WCAG-gated pairs that become this skill's primitive colour tokens).
- You are designing the dark-mode *palette remap itself* (which hues lighten/desaturate) — that
  craft lives in `09-…/dark-mode-and-theming`; this skill only defines the *role names and tiers*
  it plugs into.
- You are authoring a component's variant/state matrix — that is
  `09-…/component-library-architecture`, which *consumes* the component-tier tokens defined here.
- The task is purely a type scale or spacing rhythm with no system to tokenise — use the
  doctrine references directly (`type-scale-and-spacing.md`).

## Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Approved colour, type, space, radius, elevation, and motion decisions | Upstream design skills | yes | Tokens encode rather than invent decisions |
| Theme, brand, density, and platform axes | Product architecture | yes | Determines semantic remapping boundaries |
| Consumer inventory and export targets | Repositories and platform owners | yes | Prevents unusable or colliding contracts |

- The resolved colour system (ramps + semantic intent + recorded WCAG results) from the colour
  skill, the type scale/ratio, and the spacing unit. Tokens *encode* these decisions — they do
  not invent them.
- Which themes must coexist now or soon (light, dark, brands/tenants, density modes). Decide the
  theme axes *before* naming, because they determine which tier carries the variation.
- Target export formats and platforms (web CSS, JSON, Style Dictionary, Tailwind, native).
- A naming-namespace prefix for the system/brand (e.g. `mdk` for Maduuka) to avoid collisions.

## Workflow

1. **Separate the three tiers before naming anything.** A token system that conflates them is the
   structural cause of drift.
   - **Primitive (a.k.a. global/option) tokens** — raw, context-free values: the full colour
     ramps, the type sizes, the space scale. Named by *what they are*, never *where they're used*:
     `color.blue.500`, `space.4`, `font.size.300`. Components must NEVER reference these directly.
   - **Semantic (a.k.a. alias/system) tokens** — role names that point *at* primitives and carry
     intent: `color.text.default`, `color.surface.raised`, `color.action.primary.bg`,
     `space.inset.md`. This is the only tier a theme (dark, brand) re-points. It is the contract.
   - **Component tokens** — the most specific tier, scoped to one component, pointing at semantic
     tokens: `button.primary.bg`, `card.padding`, `input.border.focus`. They exist so a single
     component can be retuned without touching the shared semantic layer.
   Each tier references *only the tier above it*: component → semantic → primitive → literal value.
   Never let a component reach past semantic to a primitive — that is the single most common
   failure and it silently breaks theming. See `references/token-tiers-and-naming.md`.

2. **Set one naming convention and hold it.** Use a consistent, hierarchical
   `namespace.category.concept.property.variant.state` shape (drop segments that don't apply),
   lower-kebab or dot-delimited, no abbreviations that aren't in a stated glossary. Decide
   plural-vs-singular, and decide your scale unit names (`100–900` numeric, or `xs…3xl` t-shirt)
   *once*. A name must say its tier: a reader should tell a primitive from a semantic token by
   the name alone. Banned names: anything that bakes a literal value into a role
   (`color.text.blue`), positional cruft (`color.box-2`), or a primitive masquerading as a role.

3. **Make semantic tokens the theming seam — never the primitives.** Light/dark, each brand, and
   each density mode are expressed by re-pointing the *semantic* layer at different primitives.
   Components and their tokens stay byte-identical across themes; only the alias targets change.
   This is what lets one component set serve N brands and both modes. For the dark remap, do NOT
   invert lightness — dark surfaces want lower chroma and a near-dark grey carrying the brand hue,
   accents usually lighten and slightly desaturate; re-run the contrast gate for the dark roles
   independently (doctrine colour rule; `02-…/color-system-and-palette` workflow). See
   `examples/semantic-mapping.md`.

4. **Encode colour primitives in OKLCH, not hex.** Author the ramps in OKLCH (`oklch(L C H)`):
   lightness is perceptual so ramp steps are *actually* even, hue stays put while you adjust
   chroma, and generating a dark variant or a sibling brand is a controlled L/C move rather than
   eyeballed hex-twiddling. Keep a hex fallback for legacy/email targets in the same token. This
   is the perceptual-uniformity rule from the colour system, carried into the token layer.

5. **Hold every themed semantic pair to the WCAG gate as a token-level invariant.** A token set is
   a *promise* that any sanctioned foreground/surface pairing passes: body/small text ≥ **4.5:1**,
   large text (≥24px or ≥18.66px bold) and meaningful UI/icons/focus ≥ **3:1**
   (`doctrine/references/wcag-2.2-criteria.md`, WCAG 1.4.3/1.4.11). Verify the pairs in *each*
   theme — light passing does not imply dark passing. Record the results next to the tokens; a
   token that can produce a failing pair is a bug, not a style choice.

6. **Tokenise type, space, radius, elevation, and motion too — not just colour.** Type sizes off
   a real ratio (≥1.25; doctrine `type-scale-and-spacing.md`), space as multiples of one unit
   (4 or 8px), a small radius set, an elevation set (shadow tokens that *also* remap for dark,
   where elevation reads as lighter surface + lower-chroma shadow), and motion duration/easing
   tokens. One rhythm, named once, is what separates "designed" from "assembled."

7. **Choose the export topology, then generate.** Single source of truth = the tier'd token file
   (JSON, ideally aligned to the **W3C Design Tokens** `$value`/`$type` format). Transform out to:
   CSS custom properties (semantic tokens become `:root` / `[data-theme="dark"]` / `[data-brand]`
   vars), a JSON consumed by app code, a Tailwind theme, and native platforms — via **Style
   Dictionary** so all targets derive from one source and cannot drift. See
   `references/token-export-formats.md` and `examples/tokens.json`.

8. **Document references, not values.** The handoff is the *semantic role map* and the alias graph,
   so engineering wires components to roles. A spec that lists hexes per component instead of role
   names has already lost the plot. Hand the wired tokens to
   `09-…/component-library-architecture` and `09-…/design-handoff-and-dev-spec`.

9. **Treat Apple materials as platform aliases, not primitives.** Liquid Glass, vibrancy, system
   backgrounds, SF Symbols rendering modes, and app icon variants should be named as semantic
   platform roles with fallbacks. Do not hardcode a fake glass color or shadow token and call it
   Liquid Glass; the platform material remains owned by the OS.

### Catalogue query

When seeding semantic colour and type tokens, pull approved values rather than typing them:
`python -X utf8 scripts/design_query.py search "<surface> tokens" --domain color` and
`... --domain typography`. For a whole brief, `design_query.py design-system --brief <json>`
returns one decision per domain, with abstentions listed rather than filled by guesswork.

The query contract (idea adapted from UI UX Pro Max, MIT, commit 09170ee; paraphrased):
Keep one dominant intent per query and 2-5 meaningful terms; if the engine abstains, retry
once with a synonym, then proceed from the references above and say the catalogue abstained.
Never persist an unverified decision: `design_query.py persist` refuses abstained domains
unless `--accept-abstention "<who>: <reason>"` is recorded.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| One product and one theme | Keep three tiers but avoid speculative brand/platform aliases | Premature abstraction makes tokens harder to use |
| Dark mode or multiple brands are confirmed | Remap semantic roles; do not fork primitive/component contracts | Theme copies drift and components bypass intent |
| Existing code uses raw values | Inventory usage, define aliases, and migrate incrementally | A big-bang rename breaks consumers and destroys traceability |
| Platform-owned material has no portable equivalent | Use a semantic platform alias with documented fallback | A fake literal token impersonates native behaviour |

## Capability Contract

Read and search are required across current design files, token sources, and consuming code. Editing
is allowed only when token implementation is requested. Execution is preferred for schema,
contrast, export, and consumer tests; publishing packages requires separate authority.

## Degraded Mode

Without consumer-code access, produce a proposed contract and migration risks rather than claiming
compatibility. Without export or contrast tooling, return source tokens plus the exact unverified
checks and block release of generated platform packages.

## Anti-Patterns

- **Two tiers, not three** — semantic tokens that *are* the primitives (`--blue-500` used as the
  button colour), so there is nothing to remap for a theme. The flat palette dumped from a tool,
  renamed, and called a token system.
- **Components reaching past the semantic layer** to a primitive (or a raw hex/px). Silently
  breaks dark mode and every brand. The #1 drift cause.
- **Names that encode the value or the position** (`color.text.blue`, `color.box-2`,
  `spacing-thing-3`) instead of the role/intent. A role named after a colour can't be re-themed.
- **Dark mode by lightness inversion**, full-chroma accents, `#000` surfaces, and shadows that
  don't remap — instead of a deliberate semantic re-point with re-checked contrast.
- **Hex-authored ramps** with perceptually uneven steps and muddy mid-tones, where deriving a
  dark or sibling-brand variant is guesswork — instead of OKLCH.
- **Per-platform hand-maintained copies** of the tokens that drift, instead of one source +
  Style Dictionary transforms.
- Treating the 4.5:1 / 3:1 gate as something to check once in light mode rather than a per-theme
  token invariant.
- Encoding Liquid Glass as literal translucency/shadow values instead of platform material roles
  with accessibility and non-Apple fallbacks.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Three-tier token source and naming contract | Component and theme skills | Primitive, semantic, and component boundaries are machine-readable and documented |
| Theme/brand maps and platform exports | Product repositories | Contrast and schema checks pass for each supported transform or are marked unverified |
| Migration map | Engineering owners | Existing values and aliases have a staged compatibility path |

- A tier'd token file (primitive → semantic → component) in W3C-aligned JSON with OKLCH colour
  (+ hex fallback), a stated naming convention, the semantic role map with the dark and any
  brand remaps, recorded per-theme WCAG results, and generated exports (CSS custom properties,
  JSON, Style Dictionary config) plus a clean handoff to the component-library and handoff skills.

## Examples

- `examples/tokens.json` — a complete worked token set for a sample brand: OKLCH primitive ramps,
  semantic roles with a light + dark remap, and component tokens, in W3C `$value`/`$type` form.
- `examples/semantic-mapping.md` — the same system as a readable role-mapping table showing how
  one semantic layer re-points across light, dark, and a second brand, with the contrast results.

## References

- `doctrine/design-doctrine.md` — Mission §0 (authored over convergent; one strong system beats
  five hedged ones) and Anti-Slop Charter §2 (state the choice first; the sourcing-authority
  asymmetry rule — token *values* trace to human colour science, never to an AI tool's defaults).
- `doctrine/references/type-scale-and-spacing.md` — the ratio, line-height, weight, and spacing-
  unit rules the type/space/radius tokens encode.
- `doctrine/references/wcag-2.2-criteria.md` — the 4.5:1 / 3:1 contrast floors enforced as a
  per-theme token invariant.
- `references/token-tiers-and-naming.md` — the three-tier model and the full naming scheme.
- `references/token-export-formats.md` — CSS custom properties, W3C JSON, and Style Dictionary.
- Upstream: `02-color-brand-and-visual-identity/color-system-and-palette` (produces the ramps and
  WCAG-gated pairs) and `09-…/dark-mode-and-theming` (the dark palette remap craft).
- Standards (named for provenance, not in-repo): W3C Design Tokens Format Module
  (`$value`/`$type`); OKLCH (CSS Color 4); Amazon Style Dictionary.
## Book-informed practice route

Use [the design-system operating model](../component-library-architecture/references/design-system-operating-model.md) for source-of-truth, token tiers, transformations, and adoption evidence.
Use `../component-library-architecture/references/design-system-operating-model.md` §1 and §7 for the requirements-to-decision trace, semantic-role discipline, and product-first adoption notes from the supplied books.
<!-- dual-compat-end -->
