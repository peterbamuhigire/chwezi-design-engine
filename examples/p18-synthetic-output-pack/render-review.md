# P18 local render review

## Scope and direction

Four editable sources: internal proposal DOCX, synthetic research report DOCX, cash-timing XLSX and five-slide executive PPTX. Audience: engine maintainers assessing whether content and caveats remain legible across file formats. Typeface pairing: Spectral display with Atkinson Hyperlegible body/data. Palette: warm paper, deep ink, teal primary, blue and red secondary paths. Scenario meaning is redundantly carried by labels and markers.

## Production and reopen evidence

- `python build_pack.py` generated the editable files and chart.
- LibreOffice 26.2.4.2 recalculated the workbook and exported the four PDFs.
- LibreOffice reopened and round-tripped each source into `renders/final/reopened/` without replacing the originals.
- `python verify_pack.py` passed formula-cache, structure, reopen and page-render checks.
- `python build_mutation_fixture.py` changed only the assumed buffer from 75 to 100 SCU. LibreOffice recalculated the workbook; report, workbook and deck PDFs and isolated sources were rebuilt.
- `python verify_mutation_fixture.py` passed: the gap changed from 45 to 20 SCU in the workbook, report, slide and image descriptions; stale 75/45 values were absent from the report and deck.
- The canonical infographic skill now carries the applied review rule forward: one message per mobile product/social image, evidence in familiar context where truthful, consistent art direction, and channel claims treated as hypotheses until measured. The added guidance avoids presenting anecdotal virality or conversion claims as fact.
- Ghostscript 10.07.0 rasterized the final PDFs at 100 DPI. PyMuPDF confirmed 1 proposal page, 2 report pages, 3 workbook print pages and 5 deck slides. All eleven final page/slide images are retained in `renders/final/pages/`.
- The rendered PDFs contain embedded Spectral and Atkinson subsets. `font-substitution-check.pdf` was made without registering those fonts; the observed substitutions establish a recipient portability risk. Office files reference fonts but do not embed them.

## Visual inspection findings

Peter's infographic guidance led to a specific simplification: one conclusion per graphic, fewer labels, stronger type weight and a 390-pixel-wide preview. The single claim is "Only the two-period delay leaves a gap." A red 45 SCU figure carries emphasis; zero-gap cases stay secondary. Three equal-width cards balance the cases, labels sit beside their values, the consistent palette and editorial/sans pairing repeat, and white space separates the message. The documents use Spectral with Atkinson Hyperlegible; the raster graphic uses Spectral with medium Public Sans. At 390 pixels wide, the headline, case labels and key value remain readable in the retained preview. This is a resized image inspection, not a test on an actual phone or a customer-behavior study. Product dimensions, before/after proof and package contents were left out because this is a synthetic cash-timing artifact, not a retail listing.

For the infographic palette, computed WCAG contrast ratios were 12.52:1 for ink on warm paper, 5.39:1 for muted text on warm paper, and 6.29:1 / 6.05:1 / 6.61:1 for teal / blue / red figures on white. These measured pairs do not establish whole-document or assistive-technology conformance.

- Proposal: one-page hierarchy, decision request, evidence table and limits fit without clipping.
- Report: two-page flow remains balanced. The long table continues with its heading, the scenario table and visible note remain together, the chart and source line fit, and the bilingual passage is explicitly marked unreviewed.
- Workbook: the summary chart shows only the unfunded gap across the three collection delays; detailed period values remain in the separate cash-bridge table. Summary table and chart fit on the first print page; input and cash-bridge sheets print separately. Formulas recalculate to troughs 0/-60/-120, needs 0/60/120, gaps 0/0/45 and fixture receivables 0/100/200. Inputs are blue, calculated outputs remain distinct, and the assumption limits appear in the input sheet and footer.
- Deck: five slides communicate the outcome range, fixed assumptions, gap graphic, scenario comparison and limits. No text or chart clipping was observed in retained local renders.
- One-input propagation review: the mutation proof retains its own DOCX/XLSX/PPTX sources, recalculated workbook, 2/3/5-page PDFs and 10 page/slide renders under `renders/final/mutation-proof/`. The new assumption is visibly carried through the outputs.
- The mobile critique is mapped to balance, contrast, hierarchy, unity, repetition, movement, emphasis, proximity, whitespace and proportion/variety in the authored composition. The canonical skill now includes a target-slot and three-second scan check; the 390-pixel preview is retained as a resized-only observation.
- Refinement applied after review: removed a narrow-wrapped summary note; replaced the multi-period infographic with a large-type one-claim outcome graphic; simplified the workbook chart to one measure; and added a three-case outcome strip to the opening slide. The final exports, round-trips and previews were regenerated after those changes.

This is heuristic Lead Consultant self-review. It is not independent art-direction acceptance, audience testing, or a measured accessibility result.

## Open checks

**NOT ASSESSED:** Word/Excel/PowerPoint native-app parity, recipient-device font substitution and printer output; accessibility checker and screen-reader order; document-wide contrast conformance; keyboard operation; French language-owner review; audience comprehension; client suitability; professional designer review. Do not infer these from the successful local export.
