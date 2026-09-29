---
name: interface-craft-micro-details
description: Use when checking geometry and rendering details in nested UI surfaces, icons, numerals, and images covering concentric radius, optical alignment, tabular numerals, and image edges. Use component-states-and-interaction-fidelity for states/tokens and variable-fonts-and-opentype-features for the wider OpenType set.
metadata:
  portable: true
  category: 04-web-and-ui-design
  compatible_with:
  - claude-code
  - codex
---

# Interface Craft — Micro Details
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com. Mechanics imported and adapted from
ECC's community-sourced `make-interfaces-feel-better` skill (PR-salvaged, attributed to
`linus707`'s original report). Per the engine's human-design-authority rule
(`rules/common/core.md`), only the checkable mechanics below were kept; each is re-sourced to a
verifiable authority (a geometric derivation, a W3C/CSS spec, or an accessibility standard) rather
than carried over on the strength of the source skill's own say-so. Two items from the source
skill were dropped for lacking a defensible authority — see § Dropped From Source.

<!-- dual-compat-start -->
## Use When

- Nesting rounded surfaces (a padded card inside a padded panel, a button inside a toolbar) and
  the corners look visually uneven even though the radii are "reasonable" numbers.
- Placing an icon (play triangle, arrow, star, or any asymmetric glyph) inside a button where
  geometric centering looks visibly off-centre.
- Displaying numbers that update in place — counters, timers, prices, table columns — where digit
  width changes are causing visible jitter.
- Placing photographic or user-generated images directly against a UI surface where edges need a
  boundary that isn't a heavy visible border.

## Do Not Use When

- You need the full OpenType feature set (ligatures, small caps, stylistic sets, fractions) —
  use `01-typography-and-fonts/variable-fonts-and-opentype-features`; this skill only cites
  `tabular-nums` because it is the one feature load-bearing for nested-surface/number-heavy UI
  craft.
- You need the component state/token model (hover/focus/active/disabled, border/shadow/radius
  tokens) — use `component-states-and-interaction-fidelity`; this skill's radius/alignment rules
  apply *within* whatever token system that skill defines.
- You need paragraph-level text-wrapping rules (`text-wrap: balance`/`pretty`) for headings and
  body copy — those already live in `03-layout-grid-and-composition/editorial-and-long-form-layout`
  and `06-sector-and-domain-ux/fintech-and-financial-product-ui` (numeral tables); this skill does
  not re-cover them.
- The question is whether an interaction pattern (hover-only, ARIA, keyboard) is correct — use
  `00-cross-cutting-ops-qa-a11y/accessibility-wcag-2-2-compliance`.

## Required Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| The nested surfaces or icon in question, with actual radius/padding values | Component spec or code | yes | The formula below needs real numbers, not vibes |
| Whether a number updates in place | UI spec | yes | Determines whether tabular numerals are load-bearing |

## Workflow

1. **Concentric radius for nested rounded surfaces.** For two concentric rounded rectangles that
   should read as sharing a curvature centre (an inner card padded inside an outer panel):

   ```
   outer_radius = inner_radius + padding
   ```

   This is a geometric identity, not a style preference: if the inner and outer corners are meant
   to share the same centre point, the outer arc must clear the inner arc by exactly the padding
   distance, or the two curves visibly fight each other (the outer corner reads either too sharp
   or too loose relative to the inner one). When the padding is large enough that a shared centre
   stops being the right visual model, treat the layers as genuinely separate surfaces instead of
   forcing the formula — the goal is optical coherence, not formula compliance. See
   `references/geometry-and-alignment.md` for the derivation and worked values. Apple's Human
   Interface Guidelines documents the same concentric relationship under "concentricity" for nested
   rounded shapes — cited here as the design-authority precedent for treating this as a real rule,
   not an invented one.

2. **Optical, not geometric, alignment for asymmetric icons.** A play triangle, arrow, star, or
   any icon whose visual mass is not centred in its bounding box will look off-centre when
   centered by its box, even though the math is correct. This is a long-documented type-design and
   graphic-design principle — historically the same reason typefaces use *overshoot* (round and
   pointed letterforms are drawn slightly taller/wider than flat ones so they read as the same
   size) — see `references/geometry-and-alignment.md` for the source citation. Fix at the source
   (re-export the SVG with corrected internal padding) when possible; otherwise apply a small
   pixel-level offset via margin/padding, and record the offset so it survives an icon-set update.

3. **Tabular numerals for updating numbers.** Any number that changes in place — a counter, timer,
   price, or a table column of numbers — should use `font-variant-numeric: tabular-nums`, which is
   a standard CSS Fonts Module Level 3 feature (W3C spec authority, not a stylistic opinion): it
   fixes each digit glyph to equal advance width so updates don't cause the surrounding layout to
   jitter. Where the full OpenType feature palette is in scope (old-style figures, fractions,
   stylistic sets), route to `variable-fonts-and-opentype-features` — this skill only asserts the
   one feature relevant to layout stability under updating digits.

4. **Image edge treatment against a UI surface.** A subtle 1px inset outline on images prevents an
   image's edge from optically blurring into a similarly-toned surface. Unlike steps 1-3, this is
   a **practical engineering heuristic**, not backed by a named design-literature source found
   during this skill's authoring — state it as such rather than dressing it up with false
   authority. Its actual justification is functional: WCAG 1.4.11 (Non-text Contrast) requires
   meaningful UI boundaries to be visually distinguishable at ≥3:1 against adjacent colours;
   ensure any outline used for this purpose is dark/light enough to clear that bar against the
   surface it sits on, not merely decorative. Use neutral black/white alpha — do not tint an image
   outline with the brand palette (tinting implies the outline is meant to communicate state or
   brand, which it is not). See `references/geometry-and-alignment.md` for CSS.

## Browser surfaces

The browser draws some surfaces itself, and they keep their defaults unless someone decides.
Check each one on every web or web-app surface. Each item cites the spec or standard that governs
it. The list idea is adapted in paraphrase from Impeccable's craft-floor "browser surfaces" check
(pbakaus/impeccable, Apache-2.0, https://github.com/pbakaus/impeccable, commit 114ea1d).

- [ ] **Selection (`::selection`).** Set a selection colour from the palette, and keep the
      selected text at 4.5:1 or better against it (CSS Pseudo-Elements Level 4; WCAG 2.2 SC 1.4.3).
      Only `color`, `background-color` and decoration properties apply; do not rely on others.
- [ ] **Caret (`caret-color`).** In inputs and editable regions, the caret takes a colour that
      stays visible on the field background in every theme (CSS Basic User Interface Level 4;
      WCAG 2.2 SC 1.4.11 for the 3:1 non-text contrast of a UI component).
- [ ] **Scrollbars (`scrollbar-color`, `scrollbar-width`, `scrollbar-gutter`).** Theme scrollbars
      only with the standard properties (CSS Scrollbars Styling Level 1), never hide a scrollbar on
      content that scrolls, and set `scrollbar-gutter: stable` where a scrollbar appearing would shift
      the layout (CSS Overflow Level 3).
- [ ] **Focus ring (`:focus-visible`).** Every interactive element shows a visible focus indicator
      (WCAG 2.2 SC 2.4.7) that sticky headers, footers or sheets do not hide (SC 2.4.11), with 3:1
      contrast against adjacent colours (SC 1.4.11). Style it with `:focus-visible`. Never write
      `outline: none` without a `:focus-visible` replacement in the same stylesheet; the detector
      rule `focus-indicator-removed` checks this
      (`node tools/slop-detector/cli.mjs --rule focus-indicator-removed <path>`).
- [ ] **Link underline (`text-underline-offset`, `text-decoration-thickness`).** Keep links
      underlined in running text, and set the offset so the underline clears descenders instead of
      removing it (CSS Text Decoration Level 4; WCAG 2.2 SC 1.4.1, colour not the only cue).
- [ ] **Tabular numerals.** Covered in Workflow step 3 (`font-variant-numeric: tabular-nums`); it is
      listed here only so the browser-surface pass is complete.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Nested rounded surfaces share a visual centre | `outer_radius = inner_radius + padding` | Corners visibly fight each other |
| Padding between nested surfaces is large | Treat as separate surfaces, don't force the formula | Forced concentricity produces an odd-looking result on surfaces that were never meant to share a curve |
| Icon has asymmetric visual mass | Optical alignment (source fix preferred, else pixel offset) | Geometrically "correct" centering looks wrong |
| A number updates in place | `font-variant-numeric: tabular-nums` | Digit-width changes cause layout jitter |
| Image needs a boundary against a similar-toned surface | Neutral alpha outline, checked against WCAG 1.4.11 (≥3:1) if boundary is meaningful, not merely decorative | Untinted-but-invisible or brand-tinted-but-misleading outline |

## Capability Contract

Read access to the component's actual radius/padding/icon values is required to apply the
formula correctly — this is not guessable from a screenshot alone. Editing is allowed when a fix
is requested. No execution/render capability is required, though a visual check is preferred to
confirm the optical-alignment offset before finalising it.

## Degraded Mode

Without the actual radius/padding/icon asset values, state the formula and flag the specific
numbers as needed rather than guessing a plausible-looking radius. Without a way to render the
result, mark an optical-alignment offset as a proposed value pending visual confirmation.
Stop when the actual values or a reviewable render are unavailable; retain the proposed change as
unverified rather than presenting it as a confirmed correction.

## Anti-Patterns

- **Same radius on parent and child regardless of padding** — the #1 tell of unconsidered nesting.
- **Geometric-only centering on an asymmetric icon** and declaring it centred because the numbers
  say so.
- **A counter or price that visibly shifts width on each digit change** — missing `tabular-nums`.
- **Brand-tinted image outlines** — implies the outline communicates state or brand identity, which
  it does not; use neutral alpha only.
- **Forcing the concentric-radius formula on surfaces with large, unrelated padding** where the
  layers were never meant to share a curvature centre — produces an odd result, not a coherent one.
- **Citing this skill's four mechanics as blanket authority for unrelated "polish" claims** (motion
  timing, shadow depth, colour) — those are owned by `motion-design` and other skills respectively;
  this skill's authority is scoped to the four items above and the browser-surface checklist.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Corrected radius/padding values for nested surfaces | Engineering | `outer_radius = inner_radius + padding` holds, or an explicit note that surfaces are treated as separate |
| Optical-alignment offset for an icon | Engineering, icon asset owner | Offset recorded so it survives an icon-set update; source-fix preferred when feasible |
| `tabular-nums` applied to updating numerals | Engineering | No layout jitter on digit change |
| Image edge treatment | Engineering, a11y review | Neutral alpha, and checked against WCAG 1.4.11 when the boundary is meaningful |

## Examples

- `examples/before-after-review.md` — a worked before/after review table (the format this skill's
  findings should be reported in) covering all four mechanics against a sample card component.

## References

- `references/geometry-and-alignment.md` — the concentric-radius derivation with worked numbers,
  the optical-alignment/overshoot citation, and the image-outline CSS.
- `01-typography-and-fonts/variable-fonts-and-opentype-features` — the full OpenType feature set;
  this skill cites only `tabular-nums`.
- `doctrine/references/wcag-2.2-criteria.md` — 1.4.11 Non-text Contrast, cited in step 4.
- `rules/common/core.md` — the human-design-authority rule this skill's re-sourcing follows; see
  § Dropped From Source for what did not clear the bar.
- Provenance: mechanics extracted from ECC's community-sourced `make-interfaces-feel-better`
  skill. Motion timing, shadow/border usage, transition-scope, and hit-area sizing from that same
  source skill were NOT imported here because they duplicate existing coverage — motion timing and
  transition mechanics belong to `08-motion-and-interaction/motion-design` and
  `micro-interactions-and-feedback`; hit-area sizing duplicates the WCAG 2.5.8 target-size rule
  already in `accessibility-wcag-2-2-compliance`.

## Dropped From Source

Two items from ECC's `make-interfaces-feel-better` were dropped rather than imported, because
they did not clear the human-design-authority bar on inspection:

- **`-webkit-font-smoothing: antialiased` as a default recommendation.** The source skill presents
  this as an unconditional polish tip. It is contested in the type-rendering literature — forcing
  antialiasing overrides the OS/browser's own hinting decisions and can reduce fidelity on some
  displays/font combinations rather than improve it. Absent a named authority endorsing it as a
  default (rather than a situational fix for one specific rendering complaint), this skill does
  not carry the recommendation forward as a default rule.
- **Blanket motion/shadow/transition "feel" advice** (springs, layered shadows, `transition: all`
  bans) — these are already governed, with cited authority, by `motion-design` and
  `component-states-and-interaction-fidelity`. Re-stating them here without engaging those skills'
  existing sourcing would create a second, competing, less-grounded source of the same rules.
<!-- dual-compat-end -->
