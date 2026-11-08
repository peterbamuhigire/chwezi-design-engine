---
name: responsive-and-adaptive-layout
description: Use when a browser-rendered page, component, dashboard, or email must adapt across widths using intrinsic layout, fluid values, breakpoints, or container queries. Do not use to establish the base grid or for fixed-canvas documents; route those to layout-grid-and-spacing.
metadata:
  portable: true
  category: 03-layout-grid-and-composition
  compatible_with:
  - claude-code
  - codex
---

# Responsive And Adaptive Layout
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- Building or restyling any browser-rendered artifact that must survive multiple widths: a
  website, landing page, web/app UI screen, dashboard, marketing email, or embeddable widget.
- Deciding **breakpoints** — how many, where, and whether they belong to the viewport or to a
  component's container.
- A component must adapt to wherever it is *placed* (a card in a 1-up hero vs the same card in a
  4-up sidebar grid), not merely to the global window width — i.e. you need **container queries**.
- Deciding whether a value should be fixed, fluid, or intrinsic: column counts, gutters, type
  size, image sizing, and how they interpolate between sizes via `clamp()`.
- An Apple-platform UI or web surface must survive iPhone resizability, iPad multitasking,
  Mac-designed-for-iPhone windows, iPhone Mirroring, Safari/WebKit viewport behavior, or
  intermediate window widths that are not named device breakpoints.
- A layout was designed desktop-first and "responsiveness" is being bolted on by stacking
  everything into one centred column on small screens — the slop tell this skill exists to remove.

## Do Not Use When

- The page-level grid, spacing unit, focal point, and hierarchy are not yet decided — set those
  first in `03-layout-grid-and-composition/layout-grid-and-spacing`, then make them respond here.
- The decision is purely *which typeface* (`01-typography-and-fonts/font-selection-and-pairing`)
  or purely *which colours* (`02-color-brand-and-visual-identity`). Set those, then size them here.
- The artifact is a fixed-canvas document or slide (DOCX/PPTX/PDF) with no fluid viewport — use
  `layout-grid-and-spacing` for page/slide grids; this skill targets resizable surfaces.
- The work is RTL mirroring or translation-expansion tolerance — that is
  `internationalization-and-rtl-design` (combine with it; logical properties below support both).
- Performance is the *primary* deliverable (budgets, CWV as a gate) — that is
  `performance-as-ux-and-core-web-vitals`. This skill respects those budgets; it does not own them.

## Required Inputs

| Input | Source | Required evidence |
|---|---|---|
| Realistic width and input-mode range | Product requirements, device support policy, or analytics | Minimum/maximum widths and keyboard, touch, or pointer needs |
| Base grid, hierarchy, and content priority | Layout skill and approved content model | Named focal point, grid tokens, and reflow priorities |
| Portable component inventory | Component library or interface audit | Placement contexts and widths at which each component fails |
| Performance and accessibility constraints | Project budgets and doctrine | CLS budget, zoom/text-resize target, and required platform states |

- The target surfaces and their realistic width range (smallest phone to largest desktop/ultrawide
  the design must survive — not an assumed 320–1440 default).
- The content inventory and per-block importance from `layout-grid-and-spacing` (you re-compose
  hierarchy at each size; you cannot do that without knowing what should dominate).
- The chosen type scale and spacing unit from `doctrine/references/type-scale-and-spacing.md`
  (fluid type interpolates *between* scale steps; it does not invent new ones).
- Which components are **context-portable** (placed in more than one container width) — these are
  the container-query candidates, not viewport candidates.
- The performance budget from `doctrine/references/web-performance-budgets-2026.md` (CLS ≤ 0.1 in
  particular constrains how images and fluid blocks may resize).

## Workflow

1. **Start mobile-first, and design — don't reflow.** Author the smallest realistic width first
   and let layout *add* structure as space appears (`min-width` media/container queries only). This
   is not just a CSS convention: it forces you to decide what the focal point and hierarchy are
   when space is scarcest, which is the honest test of a composition. Per
   `layout-grid-and-spacing` §8, each width is **re-composed**, never collapsed into one stacked
   column of identical cards — that collapse is the single most common responsive slop tell.

2. **Prefer intrinsic, content-driven layout over breakpoints.** Most "responsiveness" should need
   *no* breakpoint at all. Let CSS Grid and Flexbox respond to content and available space:
   `grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr))` reflows a card field
   from 1 to N columns with zero media queries and never produces a too-narrow column. Reach for an
   explicit breakpoint only where the *design itself* must change (a sidebar appears, a nav becomes
   a bar, the focal point moves) — not merely because the screen got wider. See
   `references/container-queries-and-intrinsic.md`.

3. **Make portable components respond to their CONTAINER, not the viewport.** A card, media object,
   or stat block that appears in several different column widths must adapt to *where it is placed*.
   Viewport media queries cannot do this — the same card is "wide" in a hero and "narrow" in a
   4-up grid at the *same* viewport width. Use **container queries**: set `container-type: inline-size`
   on the wrapper and switch the component's internal layout with `@container (min-width: …)`.
   This is the core modern capability of this skill — define the breakpoint where the component
   *breaks*, intrinsically, regardless of page context. Patterns in
   `references/container-queries-and-intrinsic.md`.

4. **Choose breakpoints from the CONTENT, not from device names.** Do not target "iPhone" or
   "iPad" widths. Resize until the layout *breaks* — a line gets too long (>~70–75ch), a column
   too narrow to hold its content, a focal point lost — and put a breakpoint there. Keep the set
   small (typically 2–4). Express widths in `em`/`rem` so breakpoints respect the user's font size.
   Full rationale and a starter scale in `references/breakpoint-strategy.md`.

5. **Make size fluid with `clamp()` instead of stepping at breakpoints.** Type, spacing, and
   measure should interpolate smoothly between a floor and a ceiling so the page bends rather than
   snapping. Fluid type: `font-size: clamp(<min>, <preferred-with-vw>, <max>)`, where the floor and
   ceiling are real steps from `doctrine/references/type-scale-and-spacing.md` (clamp interpolates
   *between* the scale; it does not replace it). Always set a `rem` floor **and** ceiling so text
   stays readable on tiny screens and never balloons on ultrawide, and so the user can still zoom
   (a pure-`vw` size defeats zoom — a WCAG 1.4.4 failure). Recipe in `references/breakpoint-strategy.md`.

6. **Size images and media to prevent layout shift.** Every image/video/embed gets an intrinsic
   `width`/`height` or `aspect-ratio` so the box is reserved before load — this is what keeps
   **CLS ≤ 0.1** per `doctrine/references/web-performance-budgets-2026.md`. Serve responsive
   sources (`srcset`/`sizes`, AVIF→WebP→fallback) and lazy-load below the fold. A fluid image is
   `max-width: 100%; height: auto` inside an aspect-ratio box. Never resize a block in a way that
   reflows content already on screen.

7. **Use logical properties and modern fit functions.** Author with `inline-size`,
   `margin-inline`, `padding-block`, `inset-inline` instead of physical `width`/`left`/`right` so
   the layout survives RTL and vertical writing modes for free (pairs with
   `internationalization-and-rtl-design`). Constrain measure with `width: min(100% - 2rem, 70ch)`
   and centre content columns with `margin-inline: auto`; cap line length at ~66ch for body text
   regardless of viewport.

8. **Re-decide the focal point and asymmetry at every size — apply progressive enhancement, not
   graceful degradation.** Carry the authored composition from `layout-grid-and-spacing` (focal
   point, intentional asymmetry, uneven whitespace) into *each* size. The mobile view is not a
   lesser version of desktop: decide what leads on a phone, then enrich as width allows (a margin
   column appears, an image bleeds off one edge). Mobile must still have a focal point and tension
   — not a flat single-column stack.

9. **Respect user and device preferences as first-class adaptivity.** Honour
   `prefers-reduced-motion` (no large fluid motion for those users), `prefers-color-scheme`, and
   coarse-vs-fine pointers (`@media (pointer: coarse)` → ≥24px / ideally ≥44px touch targets per
   `doctrine/references/wcag-2.2-criteria.md` target-size). Adaptivity is about the *person and
   context*, not only the pixel width.

10. **Run the responsive anti-slop checklist** (below). If any item fails, fix before shipping.

11. **For Apple surfaces, test resizable windows, not just device presets.** On iOS/iPadOS/macOS
    and Safari/WebKit, resize through intermediate widths; verify Liquid Glass chrome, safe areas,
    toolbars, keyboards, popovers, pointer states, and home-screen PWA display modes do not clip,
    overlap, or hide primary actions.

## The Responsive Anti-Slop Checklist (run every time)

1. Mobile-first source order; each size **re-composed**, never collapsed into one identical-card stack.
2. Most reflow is intrinsic (Grid/Flex `auto-fit`/`minmax`/`clamp`) — breakpoints reserved for real
   design changes, and there are only a handful.
3. Portable components use **container queries**, not viewport queries, to adapt to their placement.
4. Breakpoints chosen where the *content* breaks, in `em`/`rem` — not at device-name pixel widths.
5. Fluid type via `clamp()` with a real `rem` floor **and** ceiling; zoom still works (no pure-`vw`).
6. Every image/media has reserved space (`aspect-ratio`/`width`+`height`); CLS ≤ 0.1 holds.
7. Logical properties (`inline-size`, `margin-inline`…) so RTL/vertical modes work; measure capped ~66ch.
8. A named focal point and at least one intentional asymmetry survive at the **smallest** size too.
9. `prefers-reduced-motion`, `prefers-color-scheme`, and coarse-pointer target sizes honoured.
10. Apple surfaces checked across resizable iPhone/iPad/Mac-designed-for-iPhone windows and Safari/WebKit viewport behavior where applicable.

## Decision Rules

| Condition | Choose | Wrong-choice failure |
|---|---|---|
| A component appears in differently sized parents | Container query at its content failure point | Viewport queries make the same component fail in sidebars or embeds |
| A value can interpolate safely | Bounded `clamp()` tied to approved scale endpoints | Abrupt jumps feel crude; unbounded fluid values become illegible |
| Structure changes because content no longer fits | Content-derived breakpoint | Device-name breakpoints leave damaging intermediate widths |
| Source order already matches reading/task order | CSS reflow without DOM duplication | Duplicate desktop/mobile markup creates accessibility and state drift |
| Dense information cannot remain useful when stacked | Recompose, prioritise, or provide controlled overflow | Blind one-column stacking destroys comparison and task context |

## Capability Contract

- Must inspect the source structure and render at representative and intermediate widths; may resize, measure overflow/CLS, and run accessibility checks.
- Review defaults to read-only. Change markup, styles, or tokens only for requested implementation/remediation, preserving semantic order and unrelated work.
- Do not claim device coverage from named breakpoints alone, or deploy/publish without separate authority and test evidence.

## Degraded Mode

- If target widths or content priorities are unknown, stop structural breakpoint decisions and return a discovery matrix.
- If browser rendering is unavailable, provide intrinsic CSS and a viewport/container test plan marked unverified.
- If container queries are unsupported by a required environment, document the feature query and smallest maintainable fallback.
- Recover from overflow, overlap, CLS, or order failure by fixing the earliest governing rule, then retest boundary widths on both sides of it.

## Quality Standards

- No horizontal overflow, clipped critical content, hidden action, or semantic-order mismatch at tested boundary and intermediate widths.
- Zoom, text resizing, touch/pointer input, reduced motion, and representative content remain usable where applicable.
- Release evidence names browsers, widths, containers, states, failures, corrections, and residual compatibility risks.

## Anti-Patterns

- **The desktop mockup with mobile bolted on:** designed at 1440 only, then everything stacks into
  one centred column of identical cards on phones — hierarchy and focal point destroyed.
- **Device-width breakpoints:** `@media (max-width: 768px)` chasing yesterday's iPad instead of
  putting the breakpoint where *this* content actually breaks.
- **Viewport queries for component-level adaptivity:** forcing a card to know the window width when
  it should respond to its own container; the card then looks wrong in any non-default placement.
- **Breakpoint soup:** a dozen `max-width` queries hand-tuning every element because the base layout
  isn't intrinsic; brittle, and it snaps instead of bending.
- **Pure-`vw` font sizing:** `font-size: 5vw` with no floor/ceiling — illegible on small screens,
  gigantic on ultrawide, and it breaks browser zoom (WCAG 1.4.4 reflow/zoom failure).
- **Unreserved media:** images with no width/height/aspect-ratio that shove content down as they
  load — a visible CLS jump and an instant "unconsidered" read.
- **Max-width-only (desktop-first) cascades:** authoring large then subtracting, which buries the
  scarcest-space decision instead of confronting it first.
- **Ignoring the person:** no reduced-motion, no dark-scheme, desktop-sized hit targets on touch.

## Sourcing authority (the asymmetry rule)

Grounds **only** in human design and web-standards authority — never in an AI tool's responsive
suggestions, per `doctrine/design-doctrine.md` §2. Canonical sources for this skill:

- **Ethan Marcotte — *Responsive Web Design*** — fluid grids, flexible media, media queries as a
  single adaptable layout rather than per-device mockups.
- **Jeremy Keith — *Resilient Web Design*** and progressive enhancement — build up from the
  smallest, most robust layer outward.
- **Andy Bell & Heydon Pickering — *Every Layout*** — intrinsic, algorithmic layouts that respond
  to content and space with minimal media queries.
- **The CSS specifications** (CSS Grid, Containment / Container Queries, `clamp()` math functions,
  logical properties) as the standards basis — admissible as *standards*, not as AI endorsement.
- Builds directly on `03-layout-grid-and-composition/layout-grid-and-spacing` (the grid, spacing
  unit, focal point, and asymmetry this skill makes responsive).

When an AI tool recommends "three `max-width` breakpoints at 768/1024/1280 with everything
stacking on mobile," treat that as the convergent mean to *avoid* — not as endorsement.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Responsive behaviour specification | Designer and frontend implementer | Intrinsic rules, breakpoints, container queries, fluid ranges, and priority changes are explicit |
| Boundary test matrix | QA and accessibility reviewer | Representative widths/containers and critical states pass without overflow or order defects |
| Release gate record | Approver | Render evidence, performance/accessibility checks, fallbacks, and unresolved risks are recorded |

- A stated responsive decision **before** any markup/CSS: the breakpoint set (and the content
  reason for each), which components are container-query-driven, the fluid-type `clamp()` floors
  and ceilings (tied to the type scale), and how the focal point + asymmetry re-compose at each
  size — including the smallest.
- The responsive CSS itself (intrinsic grid, container queries, fluid type/space) — see
  `examples/responsive-grid-template.md`.
- A completed responsive anti-slop checklist, consistent with the Mission in
  `doctrine/design-doctrine.md` §0 and within the budgets of
  `doctrine/references/web-performance-budgets-2026.md`.

## Examples

- `examples/responsive-grid-template.md` — a complete, real responsive card grid: intrinsic
  `auto-fit`/`minmax` reflow, a container-query-driven card that changes its *own* internal layout
  by available width, and fluid type/space via `clamp()` — annotated against the checklist.

## References

- [chwezi-product-excellence-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md) (for Chwezi apps, the window-class layout rules and orientation behaviour at 600 dp and above are binding).
- `doctrine/design-doctrine.md` (§0 Mission — "the moat is looking human-made"; §2 sourcing-
  authority asymmetry rule).
- `doctrine/references/type-scale-and-spacing.md` (the scale steps and spacing unit that fluid
  `clamp()` interpolates between — clamp does not invent sizes).
- `doctrine/references/web-performance-budgets-2026.md` (CLS ≤ 0.1, responsive image budgets,
  font-display/preload — the constraints fluid sizing and media must respect).
- `doctrine/references/wcag-2.2-criteria.md` (1.4.4 zoom/reflow for fluid type; 2.5.8 target size
  for coarse-pointer adaptivity).
- `03-layout-grid-and-composition/layout-grid-and-spacing` (the grid, spacing unit, focal point,
  and intentional asymmetry this skill carries responsively across sizes).
- `references/container-queries-and-intrinsic.md` and `references/breakpoint-strategy.md`.
- `references/modern-css-capability-baseline.md` — load when a spec relies on container/style queries,
  subgrid, `:has()`, `svh`/`dvh`, view transitions, popover or anchor positioning: dated Baseline
  status, carry-versus-enhance rules, and replacements for older layout techniques.
- `references/mobile-web-patterns.md` — load when phones in a browser are the main surface: responsive
  versus different mobile experience, first-screen rule, sticky actions, tap-to-contact, phone forms,
  browser-chrome and keyboard constraints.
<!-- dual-compat-end -->
