# Reference: Variable-Font Axes, Optical Sizing, and the CSS

A variable font carries many instances in **one file** along continuous *axes*. This is both a
craft lever (smooth weight extremes, size-aware shapes, a custom width) and a performance lever:
one `woff2-variations` file replaces a folder of static weights. The doctrine's preference for one
variable woff2 is set in `doctrine/references/embedding-by-format.md`.

Axes are identified by a four-character tag. **Registered** axes are lowercase and standardised;
**custom** axes are uppercase and foundry-defined.

---

## The registered axes

| Axis | Tag | Range (typical) | What it changes | Use it for |
|---|---|---|---|---|
| Weight | `wght` | 1–1000 | stroke thickness | the primary contrast lever — light body (≈380) vs heavy display (≈820) |
| Optical size | `opsz` | font's own range (e.g. 6–144) | shapes tuned for rendered size | bind to `font-size`: large = refined/higher-contrast/tighter, small = sturdier/open |
| Slant | `slnt` | usually 0 to −10 (degrees) | mechanical oblique — same shapes, sheared | subtle emphasis without a second file (geometric/grotesque faces) |
| Italic | `ital` | 0 or 1 (a toggle) | true italic — *different* letterforms (single-storey a, cursive f) | real emphasis in serif/humanist faces; not the same as `slnt` |
| Width | `wdth` | ~75–125 (%) | glyph width without changing height | condensed nav/labels, expanded headlines, fitting copy to a measure |
| Grade | `GRAD` | face-defined (often −200..+150) | weight **without reflow** — advance widths stay fixed | dark-mode optical fix (text looks heavier on dark; lower grade to compensate) and emphasis that must not shift layout |

**`slnt` vs `ital`.** `slnt` shears the upright shapes (oblique); `ital` swaps in drawn italic
forms. If a face exposes both, prefer `ital` for true italic emphasis. Don't fake italics with
`slnt` on a face that ships a real italic.

**Why `GRAD` exists.** Changing `wght` changes advance widths, so text reflows. `GRAD` adds the
visual weight while keeping every glyph's width fixed — nothing re-wraps. That is exactly what a
dark-mode "this text looks too light/heavy" fix needs, and what an active/hover emphasis needs
when layout stability matters.

## Custom axes (uppercase, foundry-defined)

Read the foundry's spec sheet; there is no universal list. Common ones among approved baselines:

| Face | Custom axes | Effect |
|---|---|---|
| Recursive | `MONO`, `CASL`, `CRSV` | sans↔mono, linear↔casual, cursive italic forms |

Custom axes have no CSS property — they are only reachable through `font-variation-settings`.

## Optical sizing — wire it to size, don't pin it

`opsz` is the axis most output ignores and the one that most reads as "drawn by a human." A face
designed at a display size has thinner hairlines and tighter spacing than the same face at caption
size. Let the browser tie `opsz` to the rendered `font-size`:

```css
:root { font-optical-sizing: auto; }   /* browser maps opsz ← font-size automatically */
```

Only **pin** `opsz` by hand when you deliberately want a display optical at a non-display size
(e.g. a large-optical look on a 24px lockup), via `font-variation-settings: "opsz" 72`. Pinning it
everywhere defeats the point.

## The CSS — high-level properties first, `font-variation-settings` only where needed

Register the **range** once, then drive axes per element:

```css
@font-face {
  font-family: "Recursive";
  src: url("/fonts/recursive.woff2") format("woff2-variations");
  font-weight: 300 1000;            /* the whole range, one file */
  font-display: swap;
}

:root { font-optical-sizing: auto; }                  /* opsz ← size */

h1   { font-weight: 820; }                            /* high-level property: weight */
body { font-weight: 380; }                            /* light body → weight contrast */

/* axes with NO CSS property → font-variation-settings only */
.dark h1 { font-variation-settings: "GRAD" 50; }      /* +grade in dark mode, no reflow */
.cond    { font-variation-settings: "wdth" 88; }      /* condensed label */
.lockup { font-family: "Source Serif 4"; font-variation-settings: "opsz" 60; } /* pinned display optical on a small lockup */
```

### Rules of the cascade (this is where bugs live)

- **Prefer the high-level property** when it exists: `font-weight` (→`wght`), `font-stretch`
  (→`wdth`), `font-style: italic`/`oblique <deg>` (→`ital`/`slnt`), `font-optical-sizing`
  (→`opsz`). They animate, inherit, and interact with the cascade cleanly.
- **`font-variation-settings` is all-or-nothing per element.** It does *not* inherit axis-by-axis
  — declaring it resets any axis you didn't list back to default, and it overrides `font-weight`
  etc. for the same axis. So: set `font-weight: 700` *or* `"wght" 700`, never both on one element.
- Use `font-variation-settings` for `GRAD`, custom axes, or a pinned `opsz` — and list **every**
  axis you want non-default on that element in the same declaration.

## Performance — one file is the lever

- A four-weight static family is four downloads / four `@font-face` blocks. One variable
  `woff2-variations` is a single request that covers `300 1000` (and any other axes) — fewer
  round-trips and, for most multi-weight faces, less total bytes.
- It also *enables* the doctrine's weight extremes (≈300 vs ≈820) without shipping extra files —
  the craft demand and the perf budget are satisfied by the same decision.
- Subsetting still applies for documents (`embedding-by-format.md`), but note: subset glyph-range,
  not axes — and keep the OpenType feature tables you depend on (see `opentype-features.md`).

## Approved variable baselines (none on `ai-slop-banned-fonts.md`)

Source Serif 4 (`opsz`,`wght`), Newsreader (`opsz`,`wght`,`ital`), Recursive
(`wght`,`slnt`,`MONO`,`CASL`,`CRSV`), Public Sans (`wght`), Hanken Grotesk (`wght`), Bricolage
Grotesque (`opsz`,`wght`), Andada Pro (`wght`). Confirm a specific face's axes against the
foundry/Google Fonts spec before relying on one — not every cut ships every axis.
