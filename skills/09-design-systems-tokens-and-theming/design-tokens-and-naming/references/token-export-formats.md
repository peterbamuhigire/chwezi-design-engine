# Reference: Token Export Formats

How one tier'd source of truth becomes CSS, JSON, native, and Tailwind without drift. Provenance:
W3C Design Tokens Format Module (design-tokens.github.io/community-group), Amazon Style Dictionary
docs, CSS Color Module 4 (OKLCH). Carries the Chwezi rule that token *values* are authored in
OKLCH (`02-…/color-system-and-palette`).

---

## 1. The source of truth: W3C Design Tokens JSON

Author tokens once, in the Design Tokens Format Module 2025.10 (a Final Community Group Report,
not a W3C Standard), using `$value` / `$type`, with `{dot.path}` references for aliasing across
tiers. This is the file everything else is generated from. Literal values take the object shapes
of that edition; a CSS string such as `oklch(0.55 0.17 255)` or `16px` is not defined there.

```jsonc
{
  "color": {
    "brand":   { "600": { "$value": { "colorSpace": "oklch", "components": [0.55, 0.17, 255], "hex": "#1570d1" }, "$type": "color" } },  // primitive
    "action": {
      "primary": {
        "bg": { "$value": "{color.brand.600}", "$type": "color" }                  // semantic → primitive
      }
    }
  },
  "button": {
    "primary": { "bg": { "$value": "{color.action.primary.bg}", "$type": "color" } } // component → semantic
  }
}
```

- `$value` holds the value or a `{reference}`. `$type` enables correct per-platform transforms
  (a `color` becomes a hex/RGBA on platforms that can't take OKLCH; a `dimension` becomes `rem`/`pt`/`dp`).
  The optional `hex` in a colour object is the sRGB fallback for legacy, email and Compose targets;
  it must match the components when the colour is inside sRGB.
- References are resolved at build time, so the three-tier graph survives into every output.
- Use `$description` for handoff notes (e.g. recorded WCAG result). Group with nesting, not flat keys.

### Literal value shapes (2025.10)

| `$type` | `$value` | Not defined in this edition |
|---|---|---|
| `color` | `{ "colorSpace": "oklch", "components": [L, C, H], "hex": "#rrggbb" }`; `alpha` optional (0 to 1) | `"oklch(0.6 0.16 255)"`, `"#1570d1"` as a bare string |
| `dimension` | `{ "value": 16, "unit": "px" }`; unit is `px` or `rem` | `"16px"` |
| `duration` | `{ "value": 150, "unit": "ms" }`; unit is `ms` or `s` | `"150ms"` |
| `fontFamily` | `"Public Sans"` or `["Public Sans", "Georgia", "serif"]` | `"Public Sans, Georgia, serif"` |
| `fontWeight` | `400` or an alias such as `"semi-bold"` | `"400"` (a quoted number) |
| `cubicBezier` | `[0.2, 0, 0, 1]` (x values from 0 to 1) | `"cubic-bezier(0.2, 0, 0, 1)"` |

Check a pack with `python -X utf8 scripts/validate_token_example.py <tokens.json> --profile generic
--check-value-shapes --check-contrast-claims`. It also recomputes every `vs <token> = N:1` claim in
a `$description` from the token values. It does not test a Style Dictionary or Figma import; run
that against the target toolchain and record the result.

### Theming in the source
Keep one base set plus per-theme **overrides that re-point only the semantic tier**:

```jsonc
// tokens.dark.json — overrides, primitives & components untouched
{ "color": { "surface": { "default": { "$value": "{color.neutral.900}" } },
             "text":    { "default": { "$value": "{color.neutral.50}" } } } }
```

---

## 2. CSS custom properties

Semantic tokens become CSS variables; themes are attribute/media selectors. Dots → `-`.

```css
:root {                                  /* light = default */
  --color-surface-default: oklch(0.99 0.005 255);
  --color-text-default:    oklch(0.25 0.02 255);
  --color-action-primary-bg: oklch(0.55 0.17 255);
  --space-inset-md: 1rem;
  --radius-200: 0.5rem;
}
[data-theme="dark"] {                    /* dark = re-point semantics only */
  --color-surface-default: oklch(0.21 0.012 255);
  --color-text-default:    oklch(0.96 0.005 255);
  --color-action-primary-bg: oklch(0.70 0.13 255);  /* lightened + desaturated */
}
[data-brand="kesilex"] { --color-action-primary-bg: oklch(0.58 0.14 150); }

.button-primary {                        /* component reads the semantic var */
  background: var(--color-action-primary-bg);
  color: var(--color-text-on-action);
  padding: var(--space-inset-md);
  border-radius: var(--radius-200);
}
```

- Emit **only semantic + component** tokens as CSS vars by default. Primitives stay build-time;
  exposing them invites components to reach past the semantic seam.
- Always ship a **hex/RGB fallback** when targeting email or old engines: either a fallback custom
  property or `@supports not (color: oklch(0 0 0))`. OKLCH is broadly supported in modern browsers
  but assume it isn't everywhere.
- `[data-theme]`/`[data-brand]` attributes (not separate stylesheets) keep one cascade and let a
  subtree be re-themed in place.

---

## 3. Style Dictionary (the fan-out)

One source → many platforms, so nothing is hand-maintained twice. Style Dictionary reads the W3C
JSON and runs platform transforms + formats.

```js
// config.js
export default {
  source: ["tokens/**/*.json"],
  platforms: {
    css:   { transformGroup: "css", buildPath: "dist/css/",
             files: [{ destination: "tokens.css", format: "css/variables",
                       options: { selector: ":root", outputReferences: true } }] },
    json:  { transformGroup: "js", buildPath: "dist/json/",
             files: [{ destination: "tokens.json", format: "json/nested" }] },
    ios:   { transformGroup: "ios-swift", buildPath: "dist/ios/",
             files: [{ destination: "Tokens.swift", format: "ios-swift/class.swift" }] },
    android: { transformGroup: "android", buildPath: "dist/android/",
             files: [{ destination: "tokens.xml", format: "android/resources" }] }
  }
};
```

- `outputReferences: true` preserves the alias chain in CSS (emits `var(--…)` not flattened
  values) — the three tiers stay visible in the output.
- Add a custom transform for `color` → OKLCH→hex on platforms that need it; keep OKLCH for web.
- Build dark/brand as **separate Style Dictionary runs** with the override file layered on the base
  source, each emitting its own selector block / resource file.

---

## 4. Tailwind theme (optional)

Map semantic tokens into `@theme` (v4) / `theme.extend` (v3) so utilities resolve to the same vars:

```css
/* Tailwind v4 */
@theme {
  --color-surface: var(--color-surface-default);
  --color-action: var(--color-action-primary-bg);
}
```

Never paste the raw primitive palette into Tailwind and call it done — that recreates the flat,
two-tier, un-themeable set the doctrine warns against.

---

## 5. Export checklist

- [ ] Source is W3C `$value`/`$type` JSON; references (`{…}`) used for all cross-tier links.
- [ ] Only semantic + component tokens are exposed to consumers; primitives stay internal.
- [ ] Colour primitives authored in OKLCH; hex/RGB fallback emitted for legacy/email targets.
- [ ] Each theme = a semantic-only override layered on one base source (no forked component tokens).
- [ ] `outputReferences` on, so the alias chain survives into CSS.
- [ ] Per-theme WCAG results recorded (`$description` or a sidecar) — light passing ≠ dark passing.
- [ ] All platforms derive from the single source via Style Dictionary — zero hand-kept copies.
