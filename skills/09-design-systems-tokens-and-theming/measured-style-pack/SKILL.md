---
name: measured-style-pack
description: Use when an approved reference needs its colour, type scale, and spacing measured into a deterministic token pack. Use design-tokens-and-naming for naming/tiering after measurement, and color-system-and-palette when no approved reference exists and the palette must be designed.
metadata:
  portable: true
  category: 09-design-systems-tokens-and-theming
  compatible_with:
  - claude-code
  - codex
---

# Measured Style Pack
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com. Method adapted from ECC's
`taste-distillation`/`taste-application` (video colour-grade measurement), re-targeted from
colour-grading and cut-rhythm to design tokens (colour, type scale, spacing).

<!-- dual-compat-start -->
## Use When

- An approved reference exists — a signed-off deck, a shipped screen, an existing brand
  application, a client's current site — and the ask is "match this" or "make our new work look
  like this," not "invent a new look."
- You keep re-describing the same look in prose to every generation and getting drift each time
  (a chroma word, a spacing adjective) instead of a stable, checkable result.
- You are standing up tokens for a rebrand/redesign where the brief is "keep the feel of the old
  system" and the old system was never tokenised.
- You need to prove numerically that a new build matches an approved reference, not just assert it
  looks similar.

## Do Not Use When

- No approved reference exists yet — the palette, scale, or rhythm must be *designed*, not
  measured. Use `02-color-brand-and-visual-identity/color-system-and-palette` and the type-scale
  doctrine in `doctrine/references/type-scale-and-spacing.md` instead, then the resulting values
  become a future reference.
- The "reference" is itself AI-generated output with no human sign-off. Per the human-design-
  authority rule (`rules/common/core.md`), measuring an ungrounded AI generation only launders it
  into a number — it does not make it authoritative. Confirm sign-off provenance first (§ Workflow
  step 1) or stop.
- Values already exist and only need naming, tiering, or export — use `design-tokens-and-naming`.
- The measurement target is video colour grade or cut rhythm, not a static UI/brand reference —
  that is ECC's original `taste-distillation` domain, out of scope here.

## Required Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| The reference artefact(s): screenshots, exported deck slides, or a live shipped screen | User or project | yes | The pack has nothing to measure without it |
| Sign-off provenance for the reference | User | yes | Establishes it traces to human design authority, not an AI vendor's own output |
| Which token families to extract (colour / type / spacing / all three) | User | yes | Scopes the measurement and the pack's contents |
| Namespace/brand prefix and target tier (primitive/semantic) | `design-tokens-and-naming` conventions | yes | The pack's output must slot into the existing tier model, not invent a parallel one |

## The Core Finding (why measurement, not prose)

Prompting/describing a look and re-asking for it each time drifts every pass — colour and spacing
adjectives ("warm," "airy," "tight") are not renderable quantities, and a model asked repeatedly
for "the same look" regenerates its own average, not the reference's. Measuring the reference once
into numbers and then *applying* those numbers deterministically removes the drift entirely: the
pack is applied, not re-imagined. This is the same finding ECC's `taste-distillation` made for
video colour grading (chroma and contrast measured directly from footage vs. described in a
generation prompt) — retargeted here to design tokens. Cite the measured pack, not a stylistic
opinion, whenever a build is checked against the reference.

**Division of labour:** the new build supplies structure, content, and layout; the measured pack
supplies colour, type scale, and spacing rhythm. A design system stops being a document the model
is asked to honour and becomes an artefact that is applied.

## Statistical Hygiene Rules (apply to every measured family)

These generalise directly from ECC's colour-grade measurement work and hold for any values sampled
from a real reference, not just colour:

| Rule | Applied to design tokens |
|---|---|
| **Median + MAD, never mean + std, on skewed data** | Spacing gaps and font sizes sampled from a real layout are rarely symmetric — a handful of outlier hero sizes or one-off paddings will drag a mean far from the rhythm the eye actually reads. Report median and MAD (median absolute deviation); flag when mean and median diverge by more than ~20% as a signal the sample is skewed or contaminated. |
| **Report the whole distribution, never only the endpoints** | Don't summarise a type scale as "smallest 12px, largest 48px" — that hides whether the scale is even (geometric ratio) or lumpy (a few sizes clustered, big gaps elsewhere). Print every distinct measured value with its frequency. |
| **Track the statistic no moment of the distribution can see** | For colour: the share of samples below a near-black lightness threshold (background/ink weight) — a palette can pass a contrast check while having no real dark anchor. For spacing: the share of gaps that are *not* a multiple of the base unit — a system can have a plausible mean while being structurally off-grid. |
| **Mask the furniture before measuring** | Screenshots carry browser chrome, OS window furniture, cursor, scrollbars, ads, and placeholder Lorem Ipsum blocks. None of that is the reference's design — crop or mask it out before sampling, the same way ECC masks static screen-recording chrome before measuring footage. An unmasked capture systematically drags spacing/colour stats toward generic browser/OS defaults, not the brand. |
| **Enforce the hedging-word ban in code, not the prompt** | Any generated description of the measured pack (a spec.json, a handoff note) must not contain hedging words that describe a distribution instead of stating it: `varied`, `mixed`, `dynamic`, `some`, `often`, `neutral`, `roughly`, `generally`, `or`. A prompt instruction is violated in practice a meaningful fraction of the time; a code-level lint that greps generated text and fails the check is not. See `scripts/hedge-word-lint.js` (bundled, runnable) and wire it into the pack-build step, not left as a style note. |
| **Percentile selection, not absolute thresholds** | When picking "the accent colour" or "the largest recurring spacing unit" from noisy samples, select by percentile (e.g. the 95th-percentile chroma sample, the modal spacing bucket) rather than an absolute cutoff tuned on one reference — an absolute threshold that worked on a bright deck can select the entire image on a dark one. |
| **State the grounding caveat** | Once a spec or description is written *from* the measurements, it stops being an independent check on them — say so explicitly in the pack's `spec.json`/handoff note, the same disclosure ECC's `taste-distillation` requires for its VLM-grounded description. |

## Workflow

1. **Confirm the reference's authority before measuring anything.** Ask (or record from the
   user's own statement): who signed this off, and is it a real shipped/approved artefact or an
   AI-generated mockup with no human review? A measured pack built from an unapproved AI mockup
   is not exempted from the human-design-authority rule — it has simply been given more decimal
   places. If provenance can't be confirmed, say so in the pack's manifest and treat the pack as
   provisional, not authoritative.

2. **Capture raw samples.** Screenshots at native resolution (no re-compression before measuring),
   exported deck slides as images, or a live screen inspected via devtools computed styles when
   the reference is a running site (computed styles beat pixel sampling when available — no
   measurement noise). Keep every capture; do not average anything before this point.

3. **Mask the furniture.** Crop out browser chrome, OS window decoration, cursor, ads, cookie
   banners, scrollbars, and any placeholder/Lorem Ipsum content block before sampling. For a
   multi-screenshot set, discard or explicitly flag screenshots where furniture cannot be cleanly
   masked rather than let it contaminate the sample.

4. **Measure colour** (see `references/colour-measurement.md` for the full method):
   - Convert every sampled pixel/swatch to OKLCH (matches the primitive-token convention in
     `design-tokens-and-naming` step 4 — author in OKLCH, keep a hex fallback).
   - Bucket by **lightness band** (near-black / shadow / midtone / highlight / near-white), not
     globally — a brand's colour identity usually lives in one or two bands, and a global average
     across all bands can look neutral while a real accent band is saturated.
   - Within each band, report **median chroma + MAD**, not mean + std, and the **share of samples
     below near-black** (background/ink weight) as its own tracked statistic.
   - Print the full per-band table, not just the darkest/lightest bands.

5. **Measure the type scale** (see `references/type-and-spacing-measurement.md`):
   - Extract every distinct rendered font size present in the reference (computed `font-size` when
     inspectable; otherwise measured cap-height/x-height ratios from the image at known DPI).
   - Compute the ratio between each adjacent pair of sizes sorted ascending; report the **median**
     ratio and the full list of pairwise ratios — a real reference is rarely a perfectly even
     geometric scale, and reporting only "looks like a 1.25 scale" hides where it deviates.
   - Cross-check the median ratio against the doctrine floor (`doctrine/references/
     type-scale-and-spacing.md` — ratio ≥ 1.25); a measured reference scale below that floor is a
     finding to report, not silently round up.

6. **Measure spacing** (same reference file):
   - Extract every distinct gap/padding/margin value present (computed styles, or pixel-measured
     from the image at known DPI).
   - Cluster to candidate base units (commonly 4 or 8px); report, for each candidate unit, the
     **share of measured gaps that are an exact multiple of it** — pick the base unit maximising
     that share, not the smallest common factor, since real references have some noise.
   - Report the **modal** spacing value (most frequent), not the mean — a design's rhythm is what
     recurs, not what averages out.

7. **Assemble the pack** in the shape `stylepacks/<name>/` (mirrors ECC's pack layout,
   retargeted):
   ```
   stylepacks/<name>/
     grade.json      measured colour statistics (per-band median+MAD, background share)
     scale.json      measured type scale (sizes, pairwise ratios, median ratio, doctrine check)
     spacing.json    measured spacing (base-unit candidates + winner, modal value, full histogram)
     spec.json       grounded, hedging-word-checked description of the measured pack
     grounding.txt   the raw measured facts fed into spec.json, for audit
     pack.json       manifest: reference provenance, capture list, masked regions, build date
   ```
   See `examples/tokens-from-pack.json` for a complete worked pack feeding a W3C-aligned token
   file, matching the tier model in `design-tokens-and-naming`.

8. **Apply deterministically, don't re-describe.** Feed `grade.json`/`scale.json`/`spacing.json`
   directly into the primitive tier of `design-tokens-and-naming`'s token file — the pack *is* the
   primitive values; semantic and component tiers still get built the normal way on top of them.
   Never re-prompt a generation with prose colour/spacing adjectives once a pack exists for that
   reference — prose is exactly the channel measurement was built to replace.

9. **Verify before shipping.** Run the WCAG contrast gate
   (`doctrine/references/wcag-2.2-criteria.md`, 4.5:1 / 3:1) on every semantic pair built from the
   pack — a measured reference can itself contain a failing pair, and measuring it faithfully does
   not launder that. Run `scripts/hedge-word-lint.js` against `spec.json`/any generated handoff
   prose and block the pack from shipping until it passes clean.

### Capture budget

Hold to this budget unless the brief states a reason to raise it:

- **Frames:** at most 4 desktop and 2 mobile captures per reference. Raise the cap only with a
  written reason in `pack.json`.
- **Run scripts, do not read them.** Call the measurement and lint scripts; read their source only
  when debugging a failure.
- **Never read a raw dump whole.** Pixel samples, computed-style dumps and DOM exports are
  summarised by a script (counts, medians, MAD, top values) and only the summary is read.
- **Generate derived files by script.** Token files, tables and handoff JSON are produced from the
  measured summary by script, not typed by hand.
- **Write the style pack once, then lint it.** Draft `spec.json` prose in one pass and run
  `scripts/hedge-word-lint.js` on the extracted prose; fix what it flags instead of rewriting the
  pack from scratch.

### Element-scope mode

When the brief concerns one component (a pricing card, a data table, a navigation bar), measure
that element only instead of the whole page: crop captures to the component and its immediate
surround, and report colour, type and spacing statistics for it alone. The same provenance gate
applies: the reference must trace to human sign-off, or the result is marked provisional. An
element-scope pack feeds a component token set, never the project's global primitives.

Capture-budget and element-scope ideas adapted from anydesign (uxKero/anydesign, MIT,
https://github.com/uxKero/anydesign, commit d81bd89); wording and rules are Chwezi's own.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Reference provenance cannot be confirmed as human-signed-off | Mark the pack provisional in `pack.json`; do not present it as an approved brand source | An unapproved AI mockup gets laundered into "measured, therefore authoritative" |
| Colour or spacing sample is visibly skewed (mean/median diverge >~20%) | Report median + MAD and flag the skew explicitly | A mean-based pack pushes the applied look ~2-3x harder than the reference warrants |
| Screenshot furniture (chrome/ads/placeholder text) cannot be cleanly masked | Discard that capture or hand-crop before sampling | Furniture pixels contaminate every downstream statistic |
| Measured type-scale ratio falls under the 1.25 doctrine floor | Report the finding; do not silently round the pack up to 1.25 | Silently "fixing" the measurement stops it being a measurement |
| A semantic pair built from the pack fails the WCAG contrast gate | Block ship; report the failing pair against the source reference | A faithfully measured but inaccessible reference ships an inaccessible rebuild |

## Capability Contract

Read access to the reference artefact(s) (image files, exported slides, or live-site devtools
access) is required. Execution (running the bundled measurement/lint scripts) is preferred for the
colour/type/spacing statistics and the hedging-word check; without it, state which numbers are
estimated by eye rather than measured. Editing/writing the pack and resulting token files is
allowed once measurement inputs exist. Network access and publication of the resulting pack
require separate authority.

## Degraded Mode

Without the bundled scripts runnable (no image-processing environment available), produce the
workflow's structure with every numeric field marked `unverified` — do not fabricate median/MAD
values from eyeballing a screenshot and label them measured. Without confirmed reference
provenance, ship the pack marked provisional per the Decision Rules row above and do not let it
silently become the source of a semantic-token approval later.

## Anti-Patterns

- **Re-describing the look in prose instead of building a pack.** "Make it feel warm and premium
  like the old site" is exactly the failure mode this skill exists to remove.
- **Mean/std on skewed colour or spacing samples**, pushing the applied pack far harder than the
  reference actually is.
- **Reporting only the darkest/lightest colour band** ("looks neutral overall") and missing a real
  accent that lives in one mid-band.
- **Unmasked screenshots** — browser chrome, ads, or Lorem Ipsum blocks measured as if they were
  the brand's design.
- **A hedging-word ban stated only in the prompt/spec text**, not enforced by a script that
  actually fails the build — this was violated roughly one run in three in the source method and
  will be here too if left as a style note.
- **Treating an AI-generated, never-signed-off mockup as a valid measurement source** because
  "it's just measurement, not a design opinion" — measurement does not confer approval authority;
  see `rules/common/core.md`.
- **Measuring once and never re-verifying contrast** on the semantic pairs built from the pack —
  a faithful measurement of a low-contrast reference is still a low-contrast build.
- **Treating the grounded spec as an independent check on the measurements it was grounded in** —
  state the caveat, don't present the spec as a second opinion.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| `stylepacks/<name>/` measured pack (grade/scale/spacing/spec/grounding/pack.json) | `design-tokens-and-naming`, engineering | Every numeric field is measured or explicitly marked unverified; provenance recorded |
| W3C-aligned primitive token file seeded from the pack | Component/theme skills | Values trace to the pack, not to prose description |
| Hedging-word lint result | Release gate | `scripts/hedge-word-lint.js` run and passing before ship |
| WCAG contrast verification of pack-derived semantic pairs | `design-qa-and-pre-launch-review` | 4.5:1 / 3:1 pass recorded per pair, per theme |

## Examples

- `examples/tokens-from-pack.json` — a worked measured pack (grade/scale/spacing statistics) and
  the resulting W3C-aligned primitive token file it seeds, showing median+MAD colour bands, the
  measured type-scale ratios, and the spacing base-unit selection with its supporting share.

## References

- `references/colour-measurement.md` — OKLCH band bucketing, median+MAD method, background-share
  statistic, masking method.
- `references/type-and-spacing-measurement.md` — pairwise ratio measurement, base-unit candidate
  scoring, modal-value selection.
- `scripts/hedge-word-lint.js` — bundled, runnable Node script; greps generated pack prose for the
  banned hedging-word list and exits non-zero on a hit, so the ban is enforced by CI/build, not
  prompt text alone. No dependencies; run with `node scripts/hedge-word-lint.js <file...>`. **Run
  it against extracted prose fields (e.g. `spec.json`'s `text` field saved to its own file), not
  the whole pack JSON** — schema key names (`color.neutral`, an `$or`-shaped enum, etc.) can
  legitimately contain banned words without being hedging prose, and would otherwise false-positive
  the lint. Confirmed by running the script against this skill's own worked example (see
  `examples/tokens-from-pack.json`): run whole-file it flags the legitimate `"neutral"` token key;
  run against just the extracted `spec.json.text` string it passes clean.
- `doctrine/design-doctrine.md` — Anti-Slop Charter §2, the sourcing-authority asymmetry rule this
  skill's provenance check is built on.
- `doctrine/references/wcag-2.2-criteria.md` — the 4.5:1 / 3:1 gate applied in Workflow step 9.
- `doctrine/references/type-scale-and-spacing.md` — the ≥1.25 ratio floor checked in step 5.
- Upstream/sibling: `design-tokens-and-naming` (consumes the pack as primitive-tier input),
  `02-color-brand-and-visual-identity/color-system-and-palette` (designs a palette when no
  reference exists), `00-cross-cutting-ops-qa-a11y/visual-product-slop-audit` (independent slop
  check — a measured pack is not exempt from it).
- Method provenance: adapted from ECC's `taste-distillation`/`taste-application` skills (video
  colour-grade + cut-rhythm measurement); the statistical hygiene rules above are generalised from
  their measured findings, not carried over as video-specific mechanics.
<!-- dual-compat-end -->
