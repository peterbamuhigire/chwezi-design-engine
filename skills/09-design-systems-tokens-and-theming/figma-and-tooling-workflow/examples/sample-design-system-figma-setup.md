# Worked example — Figma setup for the "Maduuka" design system

A complete, concrete current-Figma setup for a sample design system (**Maduuka**, namespace `mdk` —
a retail/marketplace product). It shows the file/page/library split, variable collections with a
`Theme` mode axis and a `Breakpoint` number-mode axis, the styles-vs-variables split, a Button built
on auto-layout with its component-property/variant API, and the naming/branching/Dev-Mode
conventions. Every value maps to the token model from `design-tokens-and-naming`. No lorem; the
typefaces named are licensed system/OFL choices, not banned defaults.

> **Stated design choice first** (Anti-Slop Charter §2): Maduuka pairs **Andada Pro** (display, the one
> authored choice — its calligraphic, semi-slab serif and slight warmth read as a hand-made marketplace, not a
> templated SaaS) with **Source Sans 3** for UI/body. Accent hue is a deliberate amber-leaning
> primary, not a reflexive blue. These are decided in groups 01/02 and only *assembled* here.

---

## 1. File & library split

| File | Purpose | Publishes |
|---|---|---|
| **Maduuka — Foundations** | Variable collections + text/effect/grid styles + specimens | Library |
| **Maduuka — Components** | Component set, built on Foundations | Library |
| **Maduuka — Storefront** (and other product files) | Screens/flows consuming both libraries | — |

Foundations and Components publish once; Storefront subscribes and updates on its own cadence.

### Page spine (each file)

```
Cover            owner: Peter B. · status: active · v1.4 · links to tokens repo & Dev specs
🧱 Foundations   colour/type/space specimens, the variable & style index   (Foundations file)
🧩 Components    one section per component                                  (Components file)
📐 Patterns      composed templates (product card, checkout step)
🚧 WIP           in progress — not for consumption
🗄 Archive       deprecated
```

---

## 2. Variable collections (= token tiers)

### Collection `Primitives` (single mode — raw values)

| Variable | Value (OKLCH; hex fallback) |
|---|---|
| `color/amber/500` | `oklch(0.74 0.15 70)` → `#E8A33D` |
| `color/amber/600` | `oklch(0.66 0.15 64)` → `#C9821F` |
| `color/neutral/0` | `oklch(0.99 0 0)` → `#FCFCFC` |
| `color/neutral/900` | `oklch(0.22 0.01 70)` → `#26221C` |
| `color/neutral/950` | `oklch(0.17 0.01 70)` → `#1B1813` |
| `color/red/500` | `oklch(0.62 0.20 27)` → `#D23B2E` |
| `space/100 … 800` | `4, 8, 12, 16, 24, 32, 48, 64` |
| `radius/200` | `8` |

Components never bind to these directly.

### Collection `Semantic` (mode axis `Theme`: Light / Dark / Brand-B)

Each cell **aliases a primitive** (never a raw hex). Only the alias target changes per mode.

| Semantic variable | `Light` → | `Dark` → | `Brand-B` (light) → |
|---|---|---|---|
| `color/text/default` | `neutral/900` | `neutral/0` | `neutral/900` |
| `color/surface/base` | `neutral/0` | `neutral/950` | `neutral/0` |
| `color/surface/raised` | `neutral/0` | `neutral/900` | `neutral/0` |
| `color/action/primary/bg` | `amber/500` | `amber/500` | *(Brand-B teal/500)* |
| `color/action/primary/bg/hover` | `amber/600` | `amber/600` | *(Brand-B teal/600)* |
| `color/action/primary/text` | `neutral/900` | `neutral/900` | `neutral/0` |
| `color/border/focus` | `amber/600` | `amber/500` | *(Brand-B teal/500)* |
| `color/feedback/error` | `red/500` | `red/500` | `red/500` |

Dark is a re-point, not an inversion: surfaces drop to low-chroma `neutral/950/900`; the amber accent
holds (it already reads on dark). **Per-mode WCAG check (recorded):**

| Pair | Light | Dark | Verdict |
|---|---|---|---|
| `text/default` on `surface/base` | 12.1:1 | 13.4:1 | pass (≥4.5) |
| `action/primary/text` on `action/primary/bg` | 4.7:1 | 4.7:1 | pass (≥4.5) |
| `border/focus` ring vs `surface/base` | 3.4:1 | 3.6:1 | pass (≥3) |

### Collection `Breakpoint` (number modes — responsive/density)

| Variable | `Compact` | `Regular` | `Expanded` |
|---|---|---|---|
| `space/section` | 24 | 32 | 48 |
| `container/max` | 360 | 768 | 1200 |
| `type/step/h1` | 28 | 34 | 44 |

`Theme` and `Breakpoint` are **separate collections** so they combine without a mode explosion: a
frame can be `Theme=Dark` + `Breakpoint=Expanded` independently.

---

## 3. Styles vs variables (decision record)

| Asset | Variable or Style | Note |
|---|---|---|
| All colour fills/strokes | **Variable** | themes via `Theme` mode |
| Spacing, radius, container width | **Variable** | `space/*`, `radius/*`, `container/*` |
| `text/body/md`, `text/display/h1` | **Text style** | font Andada Pro/Source Sans 3; **size backed by `type/step/*` number variable** |
| `effect/shadow/raised` | **Effect style** | shadow **colour bound to a `color/*` variable** so it themes |
| 12-col layout grid | **Grid style** | columns reference `container/max` |

---

## 4. Button component (auto-layout + property/variant API)

Section `🧩 Components › Button`. Built on **auto-layout**: horizontal, `padding = space/300` (12) V /
`space/400` (16) H bound to variables, `gap = space/200`, **hug** contents, `min-width 88`.

**Component properties (orthogonal — never one mega-property):**

| Property | Type | Values |
|---|---|---|
| `intent` | Variant | `primary` \| `secondary` \| `ghost` \| `destructive` |
| `size` | Variant | `sm` \| `md` \| `lg` |
| `state` | Variant | `default` \| `hover` \| `focus` \| `active` \| `disabled` \| `loading` \| `selected` \| `error` |
| `has-leading-icon` | Boolean | drives an instance-swap slot |
| `icon` | Instance-swap | the leading icon component |
| `label` | Text | editable label (e.g. "Add to cart") |

**State treatments (token-bound):**

| `state` | Fill | Text | Extra |
|---|---|---|---|
| `default` | `action/primary/bg` | `action/primary/text` | — |
| `hover` | `action/primary/bg/hover` | `action/primary/text` | — |
| `focus` | `action/primary/bg` | `action/primary/text` | **2px `border/focus` ring, offset `space/50`** (≥3:1, WCAG 2.4.7/1.4.11) |
| `active` | `action/primary/bg/hover` | `action/primary/text` | translate 1px |
| `disabled` | `action/primary/bg` @ reduced | `text/default` @ reduced | non-colour cue too (1.4.1) |
| `loading` | `action/primary/bg` | hidden | spinner instance; `aria-busy` noted in annotation |
| `error` | `feedback/error` | `neutral/0` | paired text + icon, not colour-only |

Every value is a variable — no hex/px typed into the component. The component is byte-identical across
`Theme` modes; only the aliased colours resolve differently.

---

## 5. Naming, branching, Dev Mode

- **Naming:** variables `color/action/primary/bg`, `space/inset/md`, `radius/200`; component
  `Button`, variant props `intent=primary` / `size=md` / `state=focus`; layers `container`,
  `label`, `icon-leading` (no `Frame 47`).
- **Branching:** the loading state above was added on branch `feat/button-loading-state`, reviewed,
  merged to `main`, then **published** with description "Button: add loading + error states; rename
  `color/cta/*` → `color/action/*`" and version bump `v1.3 → v1.4`. Storefront updated the
  subscription after reviewing the rename.
- **Dev Mode:** Button frames marked **Ready for Dev**; annotations name the variable on each value;
  inspect panel surfaces `color/action/primary/bg` (not `#E8A33D`); dev resources link the React
  `<Button>` (via Code Connect) and the written spec in `design-handoff-and-dev-spec`.

---

## What this demonstrates (checklist)

- File/library split (Foundations / Components / Product) and a page spine. ✔
- Variable collections mapped to token tiers, **aliasing not duplicating**. ✔
- **`Theme` mode axis** (Light/Dark/Brand-B) as the theming seam; dark = re-point, not inversion. ✔
- **`Breakpoint` number-mode axis** for responsive/density, separate collection. ✔
- Per-mode **WCAG gate** recorded. ✔
- **Styles vs variables** decision record, with style-internals variable-bound. ✔
- Component on **auto-layout** with **component properties + variants** covering the full state set
  incl. **focus-visible**. ✔
- Naming + branching + publishing + **Dev Mode** conventions. ✔
