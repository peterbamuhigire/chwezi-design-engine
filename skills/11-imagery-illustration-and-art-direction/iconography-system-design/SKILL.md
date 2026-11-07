---
name: iconography-system-design
description: Use when designing or auditing an icon family, grid, keylines, stroke, terminals, metaphors, optical corrections, small-size fitting, naming, or export contract. Use illustration-style-and-systems for expressive scenes and component-library-architecture for icon-button behaviour.
metadata:
  portable: true
  category: 11-imagery-illustration-and-art-direction
  compatible_with:
  - claude-code
  - codex
---

# Iconography System Design

<!-- dual-compat-start -->
## Use When
- Designing a **custom icon set** from scratch, or replacing a grab-bag of mismatched icons with one coherent family.
- Defining the **construction grid** for icons: artboard, live area, padding/keyline, and the keyline shapes (square / circle / rectangle / portrait) that govern how each glyph is sized.
- Setting the **stroke system** — nominal stroke weight, how it stays optically constant across sizes and across solid vs outline styles, corner radius, terminal/cap and join language.
- Enforcing **metaphor consistency** — that the same concept always uses the same glyph, that perspective/angle/fill are uniform, and that no two icons read as the same thing.
- Correcting **optical balance** — visual (not mathematical) centering, area compensation so a circle, square, and triangle of the same bounding box feel equal weight, and stem alignment.
- **Pixel-fitting** icons for small UI sizes (16/20/24px) and writing **export + naming** rules for an SVG sprite or icon font.
- Auditing an existing set for the slop signature: borrowed-from-three-libraries inconsistency, mixed stroke weights, off-grid glyphs.

## Do Not Use When
- You are directing **photography or AI-generated imagery** (style, treatment, cropping, sourcing). Use `photography-art-direction`.
- You are choosing **brand colors or building the palette** the icons are tinted with. Use `color-system-and-palette` / `accessible-color-and-contrast`; this skill keeps icons monochrome-by-default and inherits color via `currentColor`.
- You are specifying the **component** that *contains* an icon (Button with leading icon, IconButton states/target-size). Use `component-library-architecture`; this skill defines the glyph, that one defines the control around it.
- You only need **one quick glyph** and a consistent system is not the goal — though even then, match the existing grid/stroke rather than introducing a foreign icon.
- You are designing **spot illustrations or larger decorative art**. Iconography is functional, reductive, and grid-bound; illustration is not.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Concept inventory and target sizes | Product and component owners | yes | Deconflicted concept list and placement matrix |
| Brand/type character and platform constraints | Visual identity and platform guidance | yes | Approved style intent |
| Accessibility, localisation, and export targets | Product requirements | yes | Labelling, RTL, colour, and delivery contract |
- The **target rendering sizes** (e.g. 16, 20, 24px in UI; 24px as the design base) — this fixes the grid and the stroke weight, because stroke and grid are size-relative.
- The **style intent**: outline (stroked) vs solid (filled) vs duotone, and the brand's character (geometric/precise, humanist/friendly, sharp/technical). State this before drawing — per `doctrine/design-doctrine.md` §2, the choice is named first.
- The **inventory** — the concrete list of concepts that need glyphs (not "some icons"), so metaphors can be deconflicted as a set.
- A **type/grid context** — the icon stroke should relate to the UI's text weight and the spacing scale (`doctrine/references/type-scale-and-spacing.md`), so icons sit on the same rhythm as everything else.

## Workflow
1. **State the style choice before drawing a single glyph** (`doctrine/design-doctrine.md` §2 non-negotiable #1). Name it: e.g. *"2px outline, round join, round cap, 2px corner radius, geometric — on a 24px grid."* The default-looking icon set (1.5px generic outline, the exact Material/Feather silhouette everyone ships) is the convergent AI mean; the authored choice is what makes the set read as one skilled hand. Pick the *one* signature move (a distinctive corner radius, a consistent open-terminal, a 45°-only diagonal rule) and apply it to every glyph.
2. **Define the grid: artboard, live area, padding, keylines.** Standard base is a **24×24px artboard** with a **~2px outer padding → 20×20 live area** (some systems use 22px live area / 1px trim; state which). Inside the live area place **keyline shapes**: a square (e.g. 18×18), a circle (e.g. 20Ø), a horizontal rectangle (20×16), and a portrait rectangle (16×20). Every glyph is sized to **one** keyline so a circular icon (clock) and a square icon (image) feel the same size despite different bounding boxes. See `references/icon-grid-and-stroke.md`. Off-grid, free-floating construction is the #1 inconsistency smell.
3. **Lock the stroke system and keep it optically constant.** Choose a nominal stroke (commonly **2px on a 24px grid**, i.e. ~1/12 of the artboard). The rule: **stroke weight is fixed across all glyphs at a given size** — never thin a stroke to fit a busy icon; simplify the icon instead. When scaling the set to other sizes, scale stroke *proportionally but snap to the pixel grid* (2px@24 → ~1.33px@16, hinted to 1.5px). Define corner radius (e.g. 2px outer), cap (butt/round) and join (round/miter) once, and apply everywhere. Mixed stroke weights are the single loudest "assembled from three libraries" tell.
4. **Write the metaphor rules and deconflict the set.** Each concept → exactly one glyph; each glyph → exactly one concept (no "gear" meaning both *settings* and *processing*). Fix **perspective uniformity** (all flat/front-on, or all the same isometric angle — never mixed), **fill consistency** (all outline or a stated outline+solid pairing for active states), and **directionality** (arrows, chevrons share one angle set). Audit the whole inventory side by side for collisions before refining any single glyph. RTL-mirror the directional ones (see `internationalization-and-rtl-design`).
5. **Correct for optical balance — visual, not mathematical.** Equalize **perceived area, not bounding box**: a circle and a triangle that fill the same square look smaller/lighter than a square, so overshoot circles slightly and grow triangles to match visual mass. **Center optically** — a play-triangle is centered on its visual center of mass, not its bounding box (nudge right). Align stems and counters to the pixel grid. These corrections are what separate a typographer-grade set from a math-grid set; document each compensation in `references/icon-grid-and-stroke.md`.
6. **Pixel-fit / hint for small UI sizes.** At 16–20px, snap strokes and key edges to whole/half pixels so glyphs stay crisp; **redraw, don't shrink**, the smallest size — drop detail and increase relative stroke so the 16px icon stays legible rather than a muddy down-scale of the 24px master. Maintain a separate optimized master per major size if the set ships below 20px.
7. **Make icons accessible and color-agnostic.** Icons are **monochrome by default and use `currentColor`** so they inherit text color and theme for free (ties to `dark-mode-and-theming`). A meaningful icon needs a text label or `aria-label`; a **decorative** icon is `aria-hidden`. Never rely on an icon's color alone to carry meaning (WCAG 2.2 **1.4.1**); when an icon sits in a control, the *control's* target is **≥ 24×24 CSS px** (2.5.8) — the glyph itself can be smaller (`doctrine/references/wcag-2.2-criteria.md`). Icon-only buttons must still have an accessible name.
8. **Define export + naming taxonomy.** Export a single optimized **SVG sprite** (or icon font) with a stable, namespaced naming scheme — `category-name-modifier` (`action-search`, `media-play`, `status-warning-fill`), kebab-case, no synonyms drift. Normalize viewBox to the artboard, strip editor cruft, keep paths as strokes-converted-to-fills *or* document that stroke is preserved for `currentColor` weight control. State the version and how additions are reviewed so the set does not fork.

## Decision Rules

| Condition | Icon-system choice | Wrong-choice failure |
|---|---|---|
| Icons must be understood by low-literacy or multilingual users | Prefer similar (literal) and example (associated object) icons over symbolic or arbitrary ones; one idea per icon; test comprehension | Abstract icons are misread and tasks fail |
| Glyph is primarily structural UI | Use the shared grid and restrained metaphor | Expressive illustration reduces recognition |
| Meaning is unfamiliar or critical | Pair icon with visible text | Icon-only control becomes ambiguous |
| Direction changes meaning in RTL | Mirror only the directional glyph | Mirroring universal objects corrupts semantics |
| Small-size detail does not survive | Redraw/hint for that size | Mechanical scaling creates blur and closed counters |

## Capability Contract

Read and search are required for concepts, type, components, platform conventions, and existing assets. Editing is allowed only for authorised icon production. Rendering is required for optical, pixel-fit, contrast, RTL, and export claims; publication requires separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without vector or raster rendering, deliver the grid, stroke, metaphor, naming, and size-variant specification and mark optical checks unverified. Without labelling or localisation context, block icon-only critical controls.

## Anti-Patterns
- **The mixed-library set.** Three icons from Feather, two from Material, one from a random Dribbble file — different grids, weights, and metaphors. The most common slop signature in iconography.
- **Mixed stroke weights** (or thinning the stroke to cram detail into one busy glyph) — breaks the family instantly. Simplify the glyph instead.
- **Bounding-box ("mathematical") centering and sizing** — circles/triangles end up looking small and off-center because area and optical center were not compensated.
- **Off-grid, free-floating construction** — glyphs that ignore the live area and keylines render at visibly different sizes next to each other.
- **One glyph, two meanings** (or two glyphs, one meaning) — gear = settings *and* loading; trash *and* delete drawn differently. Metaphor collisions confuse users.
- **Mixed perspective/fill** — some flat, some isometric; some outline, some solid with no rule — the set looks unauthored.
- **Naive downscale to 16px** — a blurry shrink of the 24px master instead of a redrawn, pixel-fit small size.
- **Hard-coded color** instead of `currentColor`; meaning carried by color alone (fails 1.4.1); icon-only control with no accessible name.
- **No naming taxonomy** — `icon1`, `Group 47`, synonyms (`bin`/`trash`/`delete`) — guarantees duplicates and a forked set.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Grid, stroke, terminal, and optical specification | Icon designers | Construction rules reproduce a coherent family |
| Concept-to-glyph, naming, and RTL map | Product and localisation teams | Meanings are unique, labelled, and directionally correct |
| Size variants and export verification | Component engineers and QA | Target-size renders, SVG hygiene, and contrast checks pass |
- A **stated style spec** (stroke px, cap/join, corner radius, outline/solid rule, character) named before production.
- A **construction grid**: artboard, live area, padding, and the keyline shapes with each glyph assigned to one.
- A **stroke system** with the constant-weight rule and the per-size scaling/hinting table.
- **Metaphor rules** and a deconflicted concept→glyph map (no collisions), with perspective/fill/direction conventions.
- **Optical-balance corrections** documented (area compensation, optical centering, stem alignment).
- A **sample icon set** drawn/specified to the system, plus the **export + naming taxonomy** (SVG sprite/font, kebab-case namespaced names, viewBox, `currentColor`, a11y rules).

## Examples
- `examples/icon-set-spec.md` — a complete, concrete icon-system spec: a 24px grid with live area + four keyline shapes, a 2px constant-stroke system with per-size hinting table, corner/cap/join language, metaphor & perspective rules, the optical-balance compensation table, and a worked **sample set** (search, settings, play, user, trash, chevron, image, warning) each placed on a keyline with its compensations and `currentColor`/a11y notes. Use it as the pattern for any new set. (See `CONTRIBUTING.md` — examples are mandatory and never lorem.)

## References
- Icon types (Adams et al. (2012) *Graphic Design Rules*): similar, example, symbolic, arbitrary; keep each icon to one idea.
- `doctrine/design-doctrine.md` — the anti-slop charter; §0/§2 "looks human-made" applied to icons: name the style first, make one authored move, and refuse the borrowed-library mean.
- `references/illustrated-menu-icons.md` — when multicolour illustrated icons belong on hub menu cards (and when line icons do), one family per app, drawn untinted with no disc, and the licence register that blocks release.
- `references/icon-grid-and-stroke.md` — the real grid (artboard/live-area/padding/keylines), stroke weight + per-size hinting, corner/cap/join language, and the optical-balance correction rules with numbers.
- `doctrine/references/wcag-2.2-criteria.md` — color-not-alone (1.4.1), target size 24px for the containing control (2.5.8), name/role/value for icon-only controls (4.1.2).
- `doctrine/references/type-scale-and-spacing.md` — icon stroke and size relate to the UI's type weight and spacing rhythm.
- Sibling: `photography-art-direction` (imagery direction), `component-library-architecture` (the control around the glyph), `dark-mode-and-theming` (`currentColor` theming), `internationalization-and-rtl-design` (mirroring directional icons).
<!-- dual-compat-end -->
