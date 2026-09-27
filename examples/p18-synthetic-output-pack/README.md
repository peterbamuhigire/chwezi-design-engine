# P18 synthetic output pack

This demonstration carries one clearly bounded synthetic cash-timing fixture through four editable formats. It exists to exercise production and review workflows; it is not a client deliverable or a finance opinion.

## Design direction

**Typeface pairing:** Spectral for editorial display and Atkinson Hyperlegible for dense report/deck copy. The square mobile infographic uses Spectral SemiBold for the conclusion and medium/semibold Public Sans for labels. The sharper size and weight contrast holds the title apart from the comparison labels while staying legible at phone width. All three families are OFL assets in the Design System Engine library. Office files reference their selected faces but do not embed them. PDFs generated for this local review embed subsets; other machines may substitute fonts.

The visual system uses deep ink, warm paper and teal for the primary path, with blue and red distinguishing the other cases. The original landscape chart remains in the report. A separate 1080 × 1080 mobile export states one conclusion: only the two-period lag leaves a 45 SCU gap. Its 390 × 390 preview keeps the title, unit, case labels and values visible in the target-size file inspection; this is not an actual-device or audience test. A plain-text equivalent travels with the image. The workbook summary chart measures only that gap, while full period-by-period workings stay in a separate table. The deck provides assumptions and limits on separate slides. No client branding, invented market evidence or decorative stock imagery is used.

## Files

| Source | Review export | Purpose |
|---|---|---|
| `synthetic-internal-proposal.docx` | `renders/final/synthetic-internal-proposal.pdf` | Internal decision brief |
| `synthetic-cash-timing-report.docx` | `renders/final/synthetic-cash-timing-report.pdf` | Two-page report with repeated table header, chart, visible note and bilingual layout sample |
| `synthetic-cash-timing-model.xlsx` | `renders/final/synthetic-cash-timing-model.pdf` | Inputs, formulas, cash bridges, summary and chart |
| `synthetic-executive-briefing.pptx` | `renders/final/synthetic-executive-briefing.pdf` | Five-slide conclusion-led briefing |
| `cash-timing-chart-mobile.png` | `renders/final/pages/cash-timing-chart-mobile-preview.png` | Square 1080 px mobile infographic and retained 390 px preview |
| `cash-timing-chart-mobile-alt.txt` | — | Plain-text equivalent for the mobile infographic |
| `source-data.json` | — | Synthetic inputs and explicit scope boundary |
| `build_pack.py` | — | Deterministic source generator |
| `verify_pack.py` | — | Formula, structure, reopen and render consistency checks |
| `build_mutation_fixture.py` | — | Rebuilds the pack with a synthetic 100 SCU buffer assumption |
| `verify_mutation_fixture.py` | — | Checks changed values across the recalculated workbook, report, deck and mobile-image text alternative |
| `render-review-manifest.json` | — | Output hashes, checks and unresolved presentation evidence |

The workbook figures recalculate to cash troughs of 0, -60 and -120 SCU; funding needs of 0, 60 and 120; gaps of 0, 0 and 45; and fixture receivables of 0, 100 and 200. SCU is not a currency. These values reproduce only the synthetic P13 cash-timing fixture. They do not model accounting recognition, tax, customer credit, financing availability or a real business.

## Rebuild and inspect

From this directory:

```powershell
python build_pack.py
python verify_pack.py
python build_mutation_fixture.py
python verify_mutation_fixture.py
```

The mutation command creates an isolated variant under `renders/final/mutation-proof/`; recalculate its workbook and export its report, workbook and deck through the same LibreOffice workflow before running its verifier. The retained proof changes the buffer from 75 to 100 SCU and confirms the gap updates from 45 to 20 SCU across formats without stale figures.

The local proof used LibreOffice 26.2.4.2 for XLSX recalculation, DOCX/XLSX/PPTX reopen-roundtrip and PDF export, then Ghostscript 10.07.0 for 100-DPI page previews. Python 3.13 with `python-docx`, `openpyxl`, `python-pptx`, Pillow and PyMuPDF read and verify the native files, caches and PDFs. The Excel cache was checked after LibreOffice recalculation. See `renders/final/pages/` for every inspected page and slide, including the square 390-pixel infographic preview. `renders/final/reopened/` contains separate round-trip copies; it does not replace the generated editable sources.

`renders/final/font-substitution-check.pdf` is an earlier unregistered-font render used to observe substitution. The final locally rendered PDFs use temporary, process-scoped registration of the repository's Spectral and Atkinson font files; the registration is removed at process exit. No system font installation or persistent setting is part of the pack.

## Limits

This is an internal technical demonstration. The title/logo is intentionally generic. A French disclosure is a layout sample and has not been reviewed by a language owner. Local PDF inspection found no page overflow; this does not establish accessibility conformance. Assistive-technology reading order, colour contrast measurements, human comprehension, Microsoft Office round-trip, recipient-machine portability and professional designer review remain **NOT ASSESSED**. Do not publish this pack or use it as a client or accounting output.
