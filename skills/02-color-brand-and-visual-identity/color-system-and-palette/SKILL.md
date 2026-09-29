---
name: color-system-and-palette
description: Use when building a cross-format colour system with an authored anchor, perceptual tonal ramps, semantic colour roles and tokens, contrast contracts, and theme mappings. Unlike color-selection, this operationalises a palette; focused contrast audit routes to accessible-color-and-contrast.
metadata:
  portable: true
  category: 02-color-brand-and-visual-identity
  compatible_with:
  - claude-code
  - codex
---

# Color System And Palette
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- About to choose colours or theme any artifact: website/landing page, app or web UI,
  dashboard, DOCX/PPTX/PDF report or deck, or a new brand identity.
- A colour decision is needed and the work risks defaulting to the AI-slop look
  (indigo/purple→blue gradients, the stock Tailwind palette, glassmorphism, neon-on-dark).
- Reviewing or refreshing an existing artifact's colours, or adding a dark mode.

## Do Not Use When

- A binding client brand guideline already mandates exact colours — follow it, record the
  hexes and roles, and skip selection (but still run the contrast gate and the dark-mode remap).
- The task is only typography — use `01-typography-and-fonts/font-selection-and-pairing`.
- The task is chart/data-viz colour encoding specifically — start here for the base palette,
  then hand the categorical/sequential scales to `12-data-viz-and-dashboards/data-visualization`.

## Required Inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Brand/concept anchor and mood | Brand owner or brief | yes | Prevents arbitrary generation |
| Artefact types, themes, and semantic needs | Design brief | yes | Defines role coverage |
| Existing colours and constraints | Source system or client | conditional | Preserves equity |

- Artifact type and medium (web / UI / DOCX / PPTX / PDF), and whether dark mode is required.
- A real anchor: the brand, product, place, material, or concept the palette must express
  (e.g. a logo colour, a physical material, a regional or sector reference) — not a vibe word.
- The audience/context register (editorial-authoritative, developer-technical, startup-product)
  and the smallest text size and thinnest UI stroke the colours must survive.

## Workflow

1. **Find a real anchor before picking any hex.** Derive the palette from something that
   actually exists — a brand mark, a product material, a place, a printed reference, a named
   designer's or artist's work. State the anchor and the primary hue *before* generating the
   artifact, exactly as typography states the typeface first (per the Mission in
   `doctrine/design-doctrine.md` §0 and the Anti-Slop Charter §2.1). A palette with no anchor
   is how slop happens.

2. **Reject the convergent defaults explicitly.** Do not ship the indigo/violet→blue gradient,
   the unedited Tailwind default scale, frosted-glass panels as the identity, or neon accents
   on near-black. These are the colour equivalent of opening in Inter — see
   `doctrine/references/ai-slop-taxonomy.md`. If the anchor genuinely lands near one of these,
   shift hue, desaturate, or warm/cool it until it no longer reads as the stock look, and say so.

3. **Build the ramp by perceptual steps, not by lightening toward white.** Take the anchor hue
   and generate a tonal ramp (roughly 50–900) where each step is an even *perceptual* lightness
   move, holding or subtly rotating hue and adjusting chroma so mid-tones don't go muddy and
   light tints don't go chalky. This is Albers' lesson in *Interaction of Color* — a colour is
   judged by its neighbours, so tune the ramp in context, not in isolation. Itten's contrast
   types (hue, light–dark, saturation, warm–cool) name the levers; pick the one the artifact
   needs. Prefer a perceptually-uniform space (OKLCH / CIELAB) over naive HSL, whose "equal"
   steps are perceptually uneven. **Operationalize this in OKLCH (CSS Color 4, native in evergreen
   browsers):** author tokens as `oklch(L C H)` — step the ramp evenly on **L** (e.g. 50→900 at
   L ≈ 0.97→0.24), arc **C** so it peaks in the mid-tones and falls off both ends (so tints don't
   go chalky, shades don't go muddy), and hold **H** roughly constant (rotate ≤ ~15° only with
   intent). Build neutrals as a low-chroma ramp on the anchor hue (C ≈ 0.005–0.02), never pure grey.
   The full recipe with stop tables is in `references/oklch-ramp-construction.md`.

4. **Assign semantic roles, not raw hexes.** Map ramp positions to roles: `surface` (and
   raised/sunken surfaces), `text` (primary + muted), `border`, `accent` (the brand voice),
   and the status set `success / warning / error / info`. Components reference roles, never
   literal colours, so the system can be retuned or remapped in one place. Each role carries the
   contrast contract (e.g. `text-muted` is *defined* as ≥4.5:1 on `surface`), so the gate is
   applied once per role pairing, not re-litigated per screen. Full role set + bindings in
   `references/semantic-color-roles.md`.

5. **Hold the 60-30-10 distribution.** ~60% a quiet dominant (usually surface), ~30% a
   secondary, ~10% the accent that carries the brand. The accent earns its scarcity — colour
   everywhere is colour nowhere. One confident accent beats a rainbow of hedged ones (Mission §0).

6. **Gate every foreground/background pair on WCAG — this is a hard gate, not advice.**
   Body and small text ≥ **4.5:1**; large text (≥24px, or ≥18.66px bold) and meaningful UI
   components/icons/focus rings ≥ **3:1** (WCAG 2.x 1.4.3 / 1.4.11). Any pair that fails is
   rejected and the ramp step is retuned until it passes — no exceptions for "it looks fine."
   **Design with APCA, certify with WCAG:** while tuning mid-tones, judge real legibility with
   **APCA** (a perceptual design aid — not a W3C method and not in the current WCAG 3.0 draft), which models thin/small text
   better; then **verify against the 4.5:1 / 3:1 ratios for conformance** before shipping. See
   `doctrine/references/wcag-2.2-criteria.md` (Contrast method note).

7. **Never put pure black on white, or pure white on a saturated field.** `#000` on `#fff`
   over-contrasts and vibrates (haloing/eye strain); use a near-black with a trace of the brand
   hue (e.g. a very dark desaturated version of the anchor). Likewise prefer a near-white,
   slightly warm or cool surface over `#fff`. This is perceptual colour science, not taste.

8. **Make dark mode a deliberate remap, not an inversion.** Do not invert lightness. Dark
   surfaces want *lower* chroma and a near-dark grey carrying the brand hue (not `#000`);
   accents usually need to be *lightened and slightly desaturated* to stay legible and keep the
   same semantic meaning at 3:1/4.5:1. Re-run the contrast gate (step 6) for the dark roles
   independently — passing in light mode does not imply passing in dark. **Dark mode is a re-bind
   of the same role names, never an inversion:** `surface` points *low* (≈ ramp 900), `surface-raised`
   becomes *lighter* than surface (elevation logic flips), `text` points *high*, and `accent-text`
   may flip from white to near-black when the accent is lightened. The role names — and the
   component code — stay identical; only the ramp bindings change (`references/semantic-color-roles.md`).

9. **State the system and hand off.** Output the named roles, the ramp, the distribution rule,
   and the recorded contrast results. Hand categorical/sequential data scales to
   `12-data-viz-and-dashboards/data-visualization`.

## Anti-Patterns

- The indigo/purple→blue hero gradient, glassmorphism-as-identity, or neon-on-near-black.
- Shipping the default Tailwind palette (or any tool's stock swatches) unedited.
- Justifying a colour because "an AI tool / generator recommends it" — AI picks are evidence of
  what to *avoid*, never authority for what to use (`doctrine/design-doctrine.md` §2, the
  sourcing-authority asymmetry rule). Authority traces to human colour science and named
  designers — Albers, Itten, foundry/brand systems — not to a model's convergent default.
- `#000` on `#fff`; eyeballing contrast instead of measuring it; treating 4.5:1 as a target
  to barely clear rather than a floor.
- Dark mode by lightness inversion, with full-chroma accents and `#000` surfaces.
- A different literal hex sprinkled per component instead of a small set of semantic roles.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Perceptual colour ramps | Designers and token engineers | OKLCH stops, gamut checks, and rationale |
| Semantic role map | Components and documents | Roles map to tested values by theme |
| Contrast and usage contract | Accessibility and QA | Approved pairs, restrictions, and evidence |

## Quality Standards

- State the palette anchor and contextual reason before generating values.
- Build ramps perceptually and test real component, document, and data contexts.
- Stop release when a core pair fails contrast or two states cannot be distinguished.

### Catalogue query

Before inventing a palette, check the catalogue for a contrast-verified starting point:
`python -X utf8 scripts/design_query.py search "<sector> palette" --domain color`.
Palette records carry semantic token pairs whose WCAG ratios the validator computed; treat
them as a starting point to adapt to the brand, and recompute contrast after any change.

The query contract (idea adapted from UI UX Pro Max, MIT, commit 09170ee; paraphrased):
Keep one dominant intent per query and 2-5 meaningful terms; if the engine abstains, retry
once with a synonym, then proceed from the references above and say the catalogue abstained.
Never persist an unverified decision: `design_query.py persist` refuses abstained domains
unless `--accept-abstention "<who>: <reason>"` is recorded.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| Strong brand hue exists | Preserve hue and tune lightness/chroma | Recognition is discarded |
| No defensible anchor exists | Derive one through color-selection | Generic trend palette is invented |
| Value expresses meaning across surfaces | Assign a semantic token | Raw colour names leak into components |
| Dark theme is required | Remap roles deliberately | Light palette is mechanically inverted |

## Capability Contract

Read and colour calculation are required. Edit only for authorised token or artefact changes; rendering is preferred. Do not overwrite established brand colours without owner approval.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without colour tooling or rendering, return a provisional role architecture and candidate values, marking gamut and contrast unverified. Recover with approved pairs until tests exist.

- A stated colour decision (anchor + primary hue + reason), the tonal ramp, the semantic role
  map, the 60-30-10 distribution, recorded WCAG results for light and dark, and a clean handoff
  to data-viz colour.

## Examples

- `examples/oklch-palette-worked.md` — a full applied OKLCH ramp (weathered-copper patina anchor),
  both light and dark role bindings, with measured WCAG contrast for every pair and a real
  retune-on-fail loop on the focus ring.

## References

- `references/oklch-ramp-construction.md` — operationalized OKLCH ramp recipe (L/C/H channels,
  stop tables, gamut and neutral handling).
- `references/semantic-color-roles.md` — the full role set, status set, contrast contract, and
  the dark-mode re-bind rule.
- `doctrine/references/wcag-2.2-criteria.md` — the 4.5:1 / 3:1 contrast floors and the
  design-with-APCA / certify-with-WCAG method note (the dark-mode roles are gated against these).
- `doctrine/design-doctrine.md` — Mission §0 (the moat is looking human-made; authored over
  convergent), Anti-Slop Charter §2 (state the choice first; the sourcing-authority asymmetry
  rule).
- `doctrine/references/ai-slop-taxonomy.md` — the convergent-default tells to reject.
- Human authority (not citable in-repo, named for provenance): Josef Albers, *Interaction of
  Color*; Johannes Itten, *The Art of Color* (the seven colour contrasts); WCAG 2.x success
  criteria 1.4.3 and 1.4.11.
<!-- dual-compat-end -->
