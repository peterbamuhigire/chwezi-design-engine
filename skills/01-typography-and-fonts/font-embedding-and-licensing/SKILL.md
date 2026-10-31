---
name: font-embedding-and-licensing
description: Use when a chosen font must be loaded or embedded in web, DOCX, PPTX, PDF, or XLSX with verified permission. Unlike premium-font-scan, this implements format-specific embedding; type choice remains with font-selection-and-pairing.
metadata:
  portable: true
  category: 01-typography-and-fonts
  compatible_with:
  - claude-code
  - codex
---

# Font Embedding And Licensing
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- A typeface is chosen and must now be loaded/embedded into a web page, DOCX, PPTX, PDF, or
  XLSX so it renders correctly on machines that lack it.
- Verifying that an embedding is licence-compliant before shipping a client deliverable.

## Do Not Use When

- No font has been chosen yet — use `font-selection-and-pairing` first.

## Required Inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Chosen face and exact files | Typeface workflow | yes | Identifies what will be embedded |
| Licence evidence | Foundry, vendor, or manifest | yes | Establishes lawful use |
| Formats and distribution scope | Delivery brief | yes | Selects method and rights |

- The chosen typeface(s) and their licence basis (from `premium-font-scan`).
- The output format(s) and whether the artifact is distributed externally.

## Workflow

1. **Confirm the licence** permits embedding for this format and distribution
   (`doctrine/references/licensing-and-embedding.md`). If not, fall back to an OFL alternative
   and state the substitution.
2. **Load per format** (`doctrine/references/embedding-by-format.md`):
   - **Web:** woff2 + `@font-face` (or Google Fonts link); variable font where available;
     fallback listed *after* the chosen face; `font-display: swap`.
   - **DOCX / PPTX:** apply by name, embed, **subset** ("characters used only").
   - **PDF:** ensure the generator embeds rather than referencing system fonts.
   - **XLSX:** apply by name; for pixel-perfect branded output, deliver as PDF instead.
3. **Set the fallback** as a safety net, never as the design.
4. **Verify** the rendered artifact shows the intended face (not a substitute) and report file-
   size impact for embedded documents. For a PDF run `node scripts/check-rendered-fonts.js <file.pdf>`
   (exit 0 pass, 2 banned family, 3 only fallback faces, 4 not embedded, 1 not run); for DOCX, PPTX
   or SVG, extract the font names and pass them with `--names`. The gate reads PostScript names,
   which the source-level banned-font hook does not.

## Anti-Patterns

- Embedding a font whose licence forbids redistribution.
- Shipping DOCX/PPTX without subsetting (bloat) or PDF that references system fonts (substitution).
- Treating the fallback as the design.
- Assuming local rendering proves embedding; verify on a clean environment.
- Subsetting away required glyphs or OpenType tables; test the final artefact.

## Quality Standards

- Stop release if permission, glyph coverage, or actual embedding cannot be verified.
- Inspect the final distributable, not only its source or local preview.
- Record font version, subset scope, fallback, and file-size impact.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Embedding specification | Implementer | Method, files, subset, fallback, and rights basis |
| Embedded distributable | End user | Clean-machine or inspection-tool verification |
| Licence and size record | Delivery owner | Source and before/after size captured |

- The artifact with the chosen font correctly loaded/embedded, licence-verified, with fallback
  and (for documents) subsetting applied.

## Examples

- See `examples/embedding-worked-spec.md` for verified web and document embedding decisions.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| Web delivery | Serve WOFF2 with explicit faces and fallback | Excess payload or substitution |
| Editable Office document | Embed and subset when permitted | Client machine substitutes or file bloats |
| PDF delivery | Require embedded font objects | Rendering changes elsewhere |
| XLSX must be pixel-exact | Supply a PDF companion | Font references are not portable |
| Rights forbid required embedding | Stop and substitute an OFL face | Unlawful redistribution |

## Capability Contract

Read is required; edit and execute only for authorised implementation and verification. Do not alter binaries, remove licences, or distribute raw files beyond granted terms. Network may verify authoritative rights.

## Degraded Mode

Without embedding or render inspection, provide a conditional specification and verification checklist, marking delivery unverified. Recover with an OFL fallback when rights cannot be established.

- `examples/embedding-worked-spec.md` — a worked embedding spec for one chosen face (Clash Display,
  Fontshare) across web (woff2 `@font-face` + variable + `font-display`), DOCX (embed + subset), and
  PDF (embed-not-reference), each with its licence check (OFL vs Fontshare redistribution rule) and
  file-size impact.

## References

- `doctrine/references/embedding-by-format.md`, `licensing-and-embedding.md`.
<!-- dual-compat-end -->
