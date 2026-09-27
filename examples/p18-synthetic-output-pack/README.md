# P18 synthetic output pack

This demonstration carries one clearly bounded synthetic cash-timing fixture through four editable formats. It exists to exercise production and review workflows; it is not a client deliverable or a finance opinion.

## Design direction

**Typeface pairing:** Spectral for editorial display and Atkinson Hyperlegible for dense body copy, tables and labels. Spectral gives the report and deck a measured editorial voice; Atkinson keeps similar-looking numerals and letterforms distinguishable in dense information. The raster infographic uses medium-weight Public Sans labels with Spectral figures, preserving the same restrained editorial/sans-serif contrast at phone width. All three families are OFL assets in the Design System Engine library. Office files reference their selected faces but do not embed them. PDFs generated for this local review embed subsets; other machines may substitute fonts.

The visual system uses deep ink, warm paper and teal for the primary path, with blue and red distinguishing the other cases. Each infographic states one conclusion: only the two-period lag leaves a 45 SCU gap. The same graphic is retained as a 390-pixel-wide preview; the workbook summary chart measures only that gap, while the full period-by-period workings stay in a separate table. The deck provides assumptions and limits on separate slides. No client branding, invented market evidence or decorative stock imagery is used.

## Files

| Source | Review export | Purpose |
|---|---|---|
| `synthetic-internal-proposal.docx` | `renders/final/synthetic-internal-proposal.pdf` | Internal decision brief |
| `synthetic-cash-timing-report.docx` | `renders/final/synthetic-cash-timing-report.pdf` | Two-page report with repeated table header, chart, visible note and bilingual layout sample |
| `synthetic-cash-timing-model.xlsx` | `renders/final/synthetic-cash-timing-model.pdf` | Inputs, formulas, cash bridges, summary and chart |
| `synthetic-executive-briefing.pptx` | `renders/final/synthetic-executive-briefing.pdf` | Five-slide conclusion-led briefing |
| `source-data.json` | — | Synthetic inputs and explicit scope boundary |
| `build_pack.py` | — | Deterministic source generator |
| `verify_pack.py` | — | Formula, structure, reopen and render consistency checks |
| `render-review-manifest.json` | — | Output hashes, checks and unresolved presentation evidence |

The workbook figures recalculate to cash troughs of 0, -60 and -120 SCU; funding needs of 0, 60 and 120; gaps of 0, 0 and 45; and fixture receivables of 0, 100 and 200. SCU is not a currency. These values reproduce only the synthetic P13 cash-timing fixture. They do not model accounting recognition, tax, customer credit, financing availability or a real business.

## Rebuild and inspect

From this directory:

```powershell
python build_pack.py
python verify_pack.py
```

The local proof used LibreOffice 26.2.4.2 for XLSX recalculation, DOCX/XLSX/PPTX reopen-roundtrip and PDF export, then Ghostscript 10.07.0 for 100-DPI page previews. Python 3.13 with `python-docx`, `openpyxl`, `python-pptx`, Pillow and PyMuPDF read and verify the native files, caches and PDFs. The Excel cache was checked after LibreOffice recalculation. See `renders/final/pages/` for every inspected page and slide, including the 390-pixel infographic preview. `renders/final/reopened/` contains separate round-trip copies; it does not replace the generated editable sources.

`renders/final/font-substitution-check.pdf` is an earlier unregistered-font render used to observe substitution. The final locally rendered PDFs use temporary, process-scoped registration of the repository's Spectral and Atkinson font files; the registration is removed at process exit. No system font installation or persistent setting is part of the pack.

## Limits

This is an internal technical demonstration. The title/logo is intentionally generic. A French disclosure is a layout sample and has not been reviewed by a language owner. Local PDF inspection found no page overflow; this does not establish accessibility conformance. Assistive-technology reading order, colour contrast measurements, human comprehension, Microsoft Office round-trip, recipient-machine portability and professional designer review remain **NOT ASSESSED**. Do not publish this pack or use it as a client or accounting output.
