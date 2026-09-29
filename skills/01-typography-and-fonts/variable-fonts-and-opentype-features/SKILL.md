---
name: variable-fonts-and-opentype-features
description: Use when configuring variable-font axes, optical sizing, numerals, or OpenType features after a face is chosen. Unlike font-selection-and-pairing, this implements type mechanics; embedding and licence work routes to font-embedding-and-licensing.
metadata:
  portable: true
  category: 01-typography-and-fonts
  compatible_with:
  - claude-code
  - codex
---

# Variable Fonts And OpenType Features
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- A typeface is already chosen (via `font-selection-and-pairing`) and you now need to wire its
  *mechanics* into a web/app UI: which weights, optical sizes, slant, width, grade, and which
  OpenType features to switch on.
- You are choosing **numerals** for tables, dashboards, prices, code, or running prose — the
  single most common correctness bug in Chwezi data UI (mis-aligned columns = tabular missing).
- You want the doctrine's weight extremes and one-strong-choice display *from a single file* —
  using a variable font as a performance lever, not shipping five static weights.
- You are switching on craft features the foundry built and most output never uses: real
  ligatures, stylistic sets (`ss01`..), contextual alternates, small caps, fractions.

## Do Not Use When

- No face is chosen yet, or the pairing/scale itself is the question — use
  `font-selection-and-pairing` first; it hands off here.
- The task is only loading/subsetting/licence-checking the file for a format — use
  `font-embedding-and-licensing` (and `doctrine/references/embedding-by-format.md`).
- You are auditing an existing artifact for slop — use `ai-slop-typography-audit`.

## Required Inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Chosen face and files | Typeface selector | yes | Establishes available mechanics |
| Axis and feature inventory | Foundry or file inspection | yes | Prevents invented settings |
| Text contexts and platform | Product brief | yes | Determines numeral and feature policy |

- The chosen face(s) and whether each ships as a **variable** font, and which axes/features it
  exposes (check the foundry/Google Fonts spec sheet or `references/variable-axes.md` table).
- The output target: web/app CSS (this skill's CSS applies), or a document format (the *concepts*
  carry; the controls differ — see `embedding-by-format.md`).
- Where numerals appear: tables/financials/dashboards (→ tabular), running prose (→ proportional,
  often old-style), code/IDs (→ tabular lining).

## Workflow

1. **Confirm the file is variable and list its axes.** Map each registered axis (`wght`, `opsz`,
   `slnt`, `ital`, `wdth`, `GRAD`) and any custom axis the foundry ships (e.g. Recursive
   `MONO`/`CASL`/`CRSV`). Reference: `references/variable-axes.md`.
2. **Register the weight range once** in `@font-face` with `font-weight: <min> <max>` and
   `format("woff2-variations")` so one file carries the whole hierarchy
   (`doctrine/references/embedding-by-format.md` already prefers one variable woff2).
3. **Drive weight via `font-weight`**, not raw axis settings, wherever the high-level property
   exists — reserve `font-variation-settings` for axes with no CSS property (`GRAD`, custom).
   Never set both for the same axis: `font-variation-settings` wins and resets the others.
4. **Wire optical sizing to size.** Set `font-optical-sizing: auto` so the browser ties `opsz`
   to `font-size` (large = refined/tighter, small = sturdier). Only pin `opsz` by hand when you
   want a display optical at a non-display size.
5. **Choose numerals deliberately** — this is mandatory, not optional:
   - **Tabular** (`font-variant-numeric: tabular-nums`) for any column, table, dashboard KPI,
     price list, timer, or code — equal-width digits keep columns aligned.
   - **Proportional** (`proportional-nums`) for running prose.
   - **Old-style / lining**: old-style (`oldstyle-nums`) for literary body that sits in lowercase
     text; lining (`lining-nums`) for UI, caps settings, and all-caps.
6. **Switch on the craft OpenType features the face actually has**: standard ligatures (default;
   disable only in mono/code), discretionary ligatures only as accent, **contextual alternates**,
   the chosen **stylistic set** (`ss01`..`ssNN` — adopt one as a brand signature, name it),
   **small caps** (`font-variant-caps: small-caps`, real not faux), and **fractions**
   (`diagonal-fractions`) for recipes/measures/specs. Reference: `references/opentype-features.md`.
7. **Prefer high-level properties over `font-feature-settings`.** Use `font-variant-numeric`,
   `font-variant-ligatures`, `font-variant-caps`, `font-feature-settings` only for `ssNN`,
   custom, or unsupported features. Don't fight the cascade by mixing both for one feature.
8. **Verify it renders, then subset.** Confirm the feature/axis is in the file (not faked), then
   subset for documents per `doctrine/references/embedding-by-format.md`. Note: aggressive
   subsetting can strip OpenType feature tables — keep the features you rely on.

## Anti-Patterns

- Shipping five static weight files when the face is variable — the doctrine's weight extremes
  (300 vs 800) and the performance win both come from **one** woff2-variations file.
- Default `font-variant-numeric` in a table or financial dashboard — proportional digits make
  columns jitter; tabular is the correctness default for data.
- Old-style numerals inside all-caps or UI chrome (they look like dropped digits); lining there.
- **Faux** small caps (CSS `font-variant: small-caps` on a face without the feature shrinks caps
  and thins the stroke) — only use real `smcp`/`c2sc` from a face that ships them.
- Setting `font-variation-settings: "wght" 700` *and* `font-weight: 700` on the same element.
- Turning on every stylistic set "to look designed" — pick **one** `ssNN` with intent and a
  stated reason; the rest is noise.
- Disabling standard ligatures globally, or leaving them on in monospaced/code contexts.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Axis plan | Implementer | Axis, range, property, and context recorded |
| Numeral and feature policy | Design-system owner | Real samples render without faux features |
| Verified type-mechanics spec | QA and handoff | Render plus inspected font metadata |

- A stated axis plan: which axes are driven, by which property, and at which values for display
  vs body (plus `font-optical-sizing: auto`).
- A stated numeral policy per context (tabular / proportional / old-style / lining).
- The chosen OpenType feature set with one named stylistic set and a reason, expressed in
  high-level CSS where possible and `font-feature-settings` only where required.
- One variable woff2 per face registered with its full weight range — the performance lever.

## Examples

- See `examples/dashboard-type-system.md` for the complete worked contract and rendered checks.

## Quality Standards

- Verify every axis and feature against the actual file rather than inferring support.
- Test display, body, data, code, and fallback samples at representative sizes.
- Stop release when required numerals, glyphs, or features are absent.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| High-level CSS controls the setting | Use the high-level property | Raw settings override the cascade |
| Dense data, prices, timers, or IDs | Use tabular lining numerals | Columns jitter and comparisons fail |
| Feature is absent | Omit it or change the font cut | A faux or inconsistent result ships |
| Variable file is not payload-efficient | Compare measured static subsets | Assumed performance benefit adds weight |

## Capability Contract

Read and font inspection are required. Edit only for authorised implementation; execution may render specimens. Network access is optional and cannot replace inspection of the shipped file.

## Degraded Mode

Without inspection or rendering, return a conditional plan, label support unverified, and provide a specimen matrix. Never claim a feature exists without evidence.

- `examples/dashboard-type-system.md` — a real analytics/finance product type system on Recursive
  + Source Serif 4: variable axes wired, `opsz` bound to size, tabular numerals in the data layer,
  old-style numerals in prose, one stylistic set adopted, with the full CSS.

## References

- `references/variable-axes.md` — the registered axes (`wght`/`opsz`/`slnt`/`ital`/`wdth`/`GRAD`)
  plus custom axes, optical sizing, and the `font-variation-settings`/`font-optical-sizing` CSS.
- `references/opentype-features.md` — ligatures, contextual alternates, stylistic sets, small caps,
  fractions, and the numerals matrix (tabular/proportional × lining/old-style), with the CSS.
- `doctrine/design-doctrine.md`; `doctrine/references/font-groups-and-usage.md` (which baseline
  faces are variable and their axes); `doctrine/references/embedding-by-format.md` (one variable
  woff2, subsetting, and feature-table preservation).
- Hands off from `font-selection-and-pairing`; hands to `font-embedding-and-licensing` for load.
<!-- dual-compat-end -->
