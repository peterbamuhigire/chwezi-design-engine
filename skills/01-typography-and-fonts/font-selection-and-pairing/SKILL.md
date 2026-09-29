---
name: font-selection-and-pairing
description: Use when choosing and pairing typefaces for a website, UI, document, report, proposal, deck, or marketing page, including design voice and licence constraints. Use font-embedding-and-licensing after selection and ai-slop-typography-audit for existing output.
metadata:
  portable: true
  category: 01-typography-and-fonts
  compatible_with:
  - claude-code
  - codex
---

# Font Selection And Pairing
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When

- About to generate, theme, or restyle any artifact that contains type: website/landing page,
  DOCX/PPTX/PDF/report/proposal/business-plan/SRS, app or web UI, dashboard, or pitch deck.
- A typeface decision is needed and the work risks defaulting to an AI-slop font.
- Reviewing or refreshing an existing artifact's typography.

## Do Not Use When

- The work has a binding client brand guideline that already mandates fonts - follow it,
  record it, and skip selection, but still apply pairing/scale hygiene.
- The task is purely embedding/loading an already-chosen font - use
  `font-embedding-and-licensing`.
- The task is auditing an existing artifact for slop - use `ai-slop-typography-audit`.

## Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Artefact type, format, audience, and design voice | Brief | yes | Selects category and pairing contrast |
| Functional roles and size/device range | Product or document constraints | yes | Protects readability and hierarchy |
| Brand, script coverage, licence, and font availability | Brand and font manifests | conditional | Governs permitted implementation |

- Artifact type and output format: web, DOCX, PPTX, PDF, XLSX, UI, mobile, or app shell.
- Context and audience: formal/institutional, editorial/literary, product/grotesque,
  technical/data/code, friendly/humanist, expressive/artistic, script/cursive, or body/UI.
- Functional role: display, body, UI, code/data, or accent.
- Any brand constraints, and the device/size range the type must survive.

## Workflow

1. **Classify the artifact** via `doctrine/references/font-groups-and-usage.md` using:
   artifact context -> design voice -> functional role -> licence/availability.
2. **Verify the font folder taxonomy:** before scanning on a new device or after a pull, ensure
   the eight required `fonts/<category>/` directories from `fonts/README.md` exist. Create any
   missing category folder without deleting or moving local font files.
3. **Scan for premium files:** run the `premium-font-scan` logic against the matching
   `fonts/<category>/` folder. If a permitted premium family is present and would look better,
   prefer it; else take the named OFL baseline.
4. **Pick a pairing** using `doctrine/references/pairing-principles.md`: display + body,
   category contrast, weight extremes, compatible x-heights, and no mood conflict. For ready,
   named, context-sorted pairings, use `references/pairing-catalog.md`.
5. **State the choice before producing anything:** name the display face, the body face, the
   category, and a one-line reason tied to this artifact's context.
6. **Run the anti-slop checklist** below. If any item fails, fix before proceeding.
7. **Set the type scale** per `doctrine/references/type-scale-and-spacing.md`: ratio >=1.25,
   real jumps, inverse line-height, and weight extremes. For concrete px/rem scales, fluid
   `clamp()` versions, and variable-font axes, use `references/type-scale-recipes.md`.
8. **Hand off to `font-embedding-and-licensing`** for the format-correct load/embed, and to
   `fine-typesetting-and-typesetting-qa` for hierarchy steps, paragraph shape and punctuation.

### Catalogue query

Before step 4, ask the offline catalogue for an approved, cited pairing:
`python -X utf8 scripts/design_query.py search "<context> typography" --domain typography`.
Each result names heading, body and mono faces, the font group, the licence and a
human-authority citation (pairing ID or principle number); every face has passed the
banned-font and watchlist lint.

The query contract (idea adapted from UI UX Pro Max, MIT, commit 09170ee; paraphrased):
Keep one dominant intent per query and 2-5 meaningful terms; if the engine abstains, retry
once with a synonym, then proceed from the references above and say the catalogue abstained.
Never persist an unverified decision: `design_query.py persist` refuses abstained domains
unless `--accept-abstention "<who>: <reason>"` is recorded.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Permitted premium family exists and fits the brief | Prefer it over the baseline and record the licence scope | Purchased craft value is ignored or used outside its rights |
| Premium files are absent or rights are unclear | Use the named OFL baseline pairing | Unlicensed binaries are embedded or work stalls unnecessarily |
| Script coverage or readability conflicts with the desired voice | Choose coverage and legibility first, then restore contrast through display treatment | Distinctive type excludes readers or breaks localisation |
| No valid display/body pair can be verified | Stop before producing the artefact and request a decision | A banned or bare-system fallback silently becomes the design |

## Capability Contract

Read access to the brief, doctrine, font taxonomy, and licence information is required. Filesystem
search is required for premium-font discovery. Network access is optional for source verification;
embedding or file mutation belongs to `font-embedding-and-licensing`.

## Degraded Mode

If premium files or licence evidence cannot be inspected, propose an OFL baseline pair and label
premium use unavailable. If script specimens cannot be rendered, provide a provisional choice and
block embedding until glyph coverage and metrics are checked.

## The Anti-Slop Checklist

1. Typeface(s) named explicitly with a one-line contextual reason - stated before output.
2. None on the banned list (`ai-slop-banned-fonts.md`), including secondary escape fonts.
3. A deliberate display+body pairing, not one font for everything.
4. Licence permits the intended use, including embedding (`licensing-and-embedding.md`).
5. Loaded/embedded correctly for the format, subsetting on for DOCX/PPTX (`embedding-by-format.md`).
6. A sensible fallback set after, never instead of, the chosen font.
7. **Family completeness:** the body family has a true italic, a real bold and every weight the
   hierarchy needs; no faux (slanted or synthesised) styles will be required.
8. Face choices come only from this engine's catalogue and doctrine. Era-specific font advice in
   source books (for example system faces "for screens" or a free service as the default) is
   never adopted.

If the checklist cannot be satisfied, say so and ask. Never silently fall back to Inter or a
bare system stack.

## Anti-Patterns

- Picking a font "to start" and never stating it.
- Reaching for Space Grotesk/Poppins/Montserrat as the safe distinctive choice.
- Treating `08-body-ui-workhorses` as a complete identity instead of the body layer.
- Using `07-script-cursive-handwritten` for paragraphs, forms, tables, dashboards, or UI labels.
- One typeface for headings, body, labels, and buttons.
- Timid mid-weights and near-identical sizes.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Typeface decision and pairing rationale | Artefact-producing workflow | Display/body roles, categories, context, script coverage, and licence basis are explicit |
| Type scale and embedding handoff | `font-embedding-and-licensing` | Anti-slop checklist passes and unresolved licence or rendering checks are named |

- A stated typographic decision: display + body + category + reason.
- A completed anti-slop checklist.
- The type scale and a clean handoff to embedding.

## Examples

- `examples/applied-type-scale.md` - a real px/rem type scale for a named brief: the stated
  pairing + reason, the full scale, the fluid `clamp()` version, variable-font axis settings,
  and the anti-slop checklist run end to end.

## References

- `doctrine/design-doctrine.md`, and the references it indexes: `ai-slop-banned-fonts.md`,
  `font-groups-and-usage.md`, `pairing-principles.md`, `type-scale-and-spacing.md`.
- `fonts/README.md` - required eight-category folder taxonomy and new-device setup command.
- `references/pairing-catalog.md` - named, context-sorted display+body pairings.
- `references/type-scale-recipes.md` - concrete px/rem scales, fluid `clamp()`, variable-font axes.
<!-- dual-compat-end -->
