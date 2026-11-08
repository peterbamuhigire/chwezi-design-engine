---
name: print-production-and-finishing
description: Use when preparing a brochure, leaflet, book, report, packaging, signage or stationery for commercial print - printer specification, ink limits, spot colours, overprint, proofs, folds, binding, creep, finishes and press checks. Use pdf-proposal-and-bankable-document-design for page design and screen PDFs.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# Print Production and Finishing
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

Print is physical. Screen appearance does not predict ink on paper, and a missed fold allowance
or ink limit cannot be fixed after the run. This skill turns an approved design into a job the
printer can run, and proves it with a written specification, a preflight and a hard proof.

<!-- dual-compat-start -->
## Use When

- A design is going to a commercial printer: brochure, leaflet, folded flyer, annual report, book,
  magazine, catalogue, packaging, label, poster, banner, signage, stationery or business cards.
- You need a printer specification sheet, a preflight before PDF/X export, or a proofing and
  press-check plan.
- A job involves spot colours, metallic inks, varnish, lamination, foil, embossing, die-cutting,
  folding or binding.
- A client asks why the print looks different from the screen, or a job came back dark, soft or
  mis-trimmed and needs a corrected specification.

## Do Not Use When

- The job is page design of a proposal or report (covers, dividers, exhibits) - use
  `pdf-proposal-and-bankable-document-design`, then return here for litho or special-finish jobs.
- The output is screen-only (PDF by email, web, WhatsApp) - use the document or web skills;
  CMYK conversion and ink limits do not apply.
- The task is choosing brand colours - use `color-selection` and `color-system-and-palette`;
  this skill specifies how chosen colours are printed.
- The task is typesetting quality - use `fine-typesetting-and-typesetting-qa`.
- The question is print procurement price negotiation or supplier contracts - route to the
  agency operations owner; this skill supplies the technical specification only.

## Required Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Approved artwork (native files and linked assets) | Designer | yes | The job is built from final artwork only |
| Trim size, extent, orientation and quantity confirmed in writing | Client and account lead | yes | Size errors are the most expensive reprint cause |
| Printer's specification: process (litho, digital, large format, screen), press profile, ink limit, bleed, safety, file format | Printer | yes | Every press differs; book-era numbers are only starting points |
| Stock (name, weight, coated or uncoated, whiteness) and finishes | Printer and client | yes | Stock drives colour, dot gain, folding and cost |
| Die-line or template for packaging, folders and die-cuts | Printer or converter | conditional | Folds, glue areas and flaps vary by converter |
| Budget and delivery date | Client | yes | Decides process, finishes and proof type |

## Workflow

1. **Confirm the job in writing.** Trim size, extent, orientation, quantity, delivery date and
   address. Triple-check trim size; get it signed off.
2. **Involve the printer before final artwork.** Ask: litho or digital? Which press profile and
   ink limit? Which stocks are in stock locally? What bleed and safety? Can you show a drawdown
   or sample on this stock? What lead time for proofs and finishing? Record the answers.
3. **Choose process and stock** with the decision rules below. Order a paper dummy for any bound
   or folded job, and a full-size mock-up for packaging or dimensional work.
4. **Set colour for the process.** Build print colours in CMYK or named spot inks from a physical
   guide, never from RGB screen values. Apply ink, tint, rich black and overprint rules from
   `references/ink-colour-and-finishing-rules.md`.
5. **Build geometry.** Bleed, safety zone, folds and panel widths, creep, gutter loss, glue
   areas and die-lines from `references/folding-binding-and-proofing.md`.
6. **Preflight and export** with the checklist in
   `references/printer-specification-and-preflight.md`: fonts, images, colour, overprint, marks,
   PDF standard and profile as the printer specifies.
7. **Send the specification sheet** with the files. Itemise everything; assume nothing.
8. **Proof.** Get a hard proof on the actual stock or the printer's contract proof. A laser or
   office colour print is not a colour proof. Show the client the proof, not the screen.
9. **Press-check** where the job allows (always for brand colours, covers, packaging and large
   runs). Approve against the signed proof.
10. **Close out.** Check delivered quantity and trim against the specification, archive the
    final files, the proof and the specification, and log lessons for the next job.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| Short run, fast turnaround, variable data, or mainly office stock | Digital print; ask for the device profile and a sample | Litho set-up cost wasted, or litho-only effects promised on a digital press |
| Long run, spot colour accuracy, special stocks or metallic inks | Sheet-fed litho with a named press profile | Brand colour drifts across the run |
| Job specifies a Pantone colour inside an otherwise CMYK job | Convert it to CMYK unless the budget pays for the extra plate and the printer confirms | Stray spot plate adds cost or separates wrongly |
| Large solid black areas | Printer's rich black recipe within the ink limit | Grey, blotchy solids, or set-off from too much ink |
| Black text on a coloured background | Overprint black text | White halos from mis-registration |
| Tint below the printer's minimum | Use a lighter spot at 100 per cent or drop the tint | Tint disappears on press |
| Saddle-stitched booklet near the printer's page limit for the stock | Switch to perfect binding or reduce extent after checking with the binder | Spine splits or pages creep beyond safe margins |
| Special finish (foil, emboss, spot varnish) not yet proven on the chosen stock | Ask for a test or sample before promising it | Finish fails or cracks after the client has approved it |
| No hard proof is possible before the deadline | Tell the client the risk in writing and get approval to proceed on a soft proof | Colour dispute after delivery with no approved reference |

## Capability Contract

- Read access to artwork, specifications and printer answers is required. Opening the PDF in a
  preflight tool is required to claim any preflight item.
- Editing artwork needs an implementation request. Ordering print, approving proofs or signing
  off a press check needs the client's or account owner's authority.
- Network access is only used to fetch the printer's current specification or profiles; record
  the date checked.

## Degraded Mode

- Without the printer's specification, prepare artwork to conservative defaults (3 mm bleed,
  generous safety, total ink well under the common ceilings), mark every numeric item
  `NOT_ASSESSED` and block release to press until the printer confirms.
- Without a preflight tool, deliver the checklist completed by inspection only and label it
  unverified.
- Without a hard proof, block press unless the client accepts the soft-proof risk in writing.

## Anti-Patterns

- Judging print colour on a monitor or an office laser print - correct with a physical colour
  guide and a hard proof on the actual stock.
- Specifying print colours in RGB - correct by building CMYK or named spot colours for the
  printer's profile.
- Leaving stray Pantone swatches in a CMYK job - correct by converting or deleting unused spots
  before export.
- Pushing total ink past the printer's limit in dark photographs and rich blacks - correct by
  checking coverage in preflight and adjusting separations.
- Folded leaflets with equal panels - correct by narrowing the panels that fold in, using the
  printer's panel widths.
- Ignoring creep in thick saddle-stitched booklets - correct with the imposition's creep
  allowance and wider inner-page margins.
- Promising foil or embossing before the local printer confirms capability - correct by asking
  for samples first.
- "Kitchen-sink" finishing on every job - correct by choosing one finish that serves the brief.
- Retyping supplied copy on the artwork - correct by pasting from the approved source.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Printer specification sheet | Printer, account lead | Every field filled or marked to be confirmed; printer's answers dated |
| Preflight record and print-ready PDF | Printer | Checklist passed in a preflight tool; PDF standard and profile as specified |
| Proof approval record | Client, printer | Signed hard proof, or written acceptance of soft-proof risk |
| Press-check note | Account lead, client | Approved sheet reference, adjustments made, sign-off name and time |
| Job archive | Studio | Final files, proof, specification and lessons stored together |

## Examples

- `examples/print-job-spec-worked.md` - a filled specification, preflight and proof plan for a
  folded A4 roll-fold leaflet and a 48-page saddle-stitched report for a fictional Kampala client,
  including the questions put to the printer and the answers recorded.

## References


- [chwezi-reporting-and-dashboards-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-reporting-and-dashboards-standard/SKILL.md) (binding for Chwezi reporting surfaces: A4 report page types and print acceptance tests for product reports).
- `references/printer-specification-and-preflight.md` - the specification sheet fields, the
  printer question list and the PDF/X preflight checklist.
- `references/ink-colour-and-finishing-rules.md` - colour building, ink limits, rich black,
  tints, overprint and knock-out, paper whiteness, dot gain, image resolution and finishes.
- `references/folding-binding-and-proofing.md` - bleed and safety, folds and panels, binding
  choice, creep, gutter loss, dummies, mock-ups, proofs, press checks and schedule contingency.
- Siblings: `pdf-proposal-and-bankable-document-design` (and its
  `references/print-ready-pdf-checklist.md` for screen and office-print PDFs),
  `fine-typesetting-and-typesetting-qa`, `color-system-and-palette`, `photography-art-direction`,
  `advertising-creative-art-direction` (print advertisement specifications).
- Source (human design authority): Adams, S., Dawson, P., Foster, J. and Seddon, T. (2012,
  revised edition) *Graphic Design Rules: 365 Essential Design Dos and Don'ts*, Frances Lincoln -
  Production and Print section. Numeric values from that book are working starting points only;
  the printer's current specification governs.
<!-- dual-compat-end -->
