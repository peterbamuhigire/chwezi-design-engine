# 03 — Experiment log

**Cycle:** 2026-10, design-system-skills only. **Baseline ref:** `c9b334d`; evidence frozen in [01-baseline-scorecard.md](01-baseline-scorecard.md) before implementation. The baseline commit is `a69e2bb`.

## Observe — baseline and practitioner tasks

- The pre-edit baseline validator found 101 active skills compliant, 49 slop rules, 98 detector fixtures, and six report-only skill-size warnings ([01-baseline-scorecard.md](01-baseline-scorecard.md)).
- The routing smoke run measured p@1 94%, p@3 100%, and 21/21 local owned negatives; no skill met the three-positive/two-local-negative fixture threshold ([01-baseline-scorecard.md](01-baseline-scorecard.md)). This is a lexical proxy, not a live model test.
- Practitioner task 1 produced an illustrative token JSON, HTML table, Compose sketch, and screenshot. No client content, API contract, approved palette, or executable data state was supplied; static sorting and code behavior remain unverified. Artifacts are retained in the temporary design prep folder, not this repository.
- Practitioner task 2's supplied screen was absent. A synthetic flawed specimen was audited. It measured 4.48:1 normal-text contrast, 20×20 CSS-pixel controls, a positive-tabindex order, an offscreen skip link, and no visible button focus. These are specimen findings only, not findings about the missing supplied screen ([01-baseline-scorecard.md](01-baseline-scorecard.md)).
- Practitioner task 3's initial PDF used Liberation font fallbacks despite CSS naming Source Serif 4 and Public Sans. Before font correction, `pdffonts` listed LiberationSans and LiberationSerif subsets; those do not prove the intended faces were used.

## Select and experiment — retained changes

### D-1 — diagram route and handoff

**Observation:** The proposal-diagram task routed to a DOCX reference because no diagram-owning skill existed. (Baseline scope record.)

**Change:** Added `diagram-design-and-handoff`, one illustrative relationship/process specification, three positive route examples with six owned-negative examples, and regenerated the plugin manifest. Manifest check reports 102 skills; the skill validator reports 102/102 fully compliant. The skill distinguishes conceptual diagrams, analytical charts, dashboard page systems, and document-specific figure work.

**Experiment result:** Routing smoke reports 72 positives, p@1 94%, p@3 100%, and 29/29 locally owned negatives; one cross-engine route remains `NOT_ASSESSED`. Fixture lint reports zero findings. This does not establish live Claude/Codex routing quality.

### D-2 — currentness and source register

**Observation:** The baseline standards register had five rows and a malformed ISO URL; it did not identify EN 301 549, the European Accessibility Act, or a dated token-format module ([01-baseline-scorecard.md](01-baseline-scorecard.md)).

**Change:** Corrected the ISO 14289-2 URL; checked the listed official source pages on 2026-10-29; added source rows for EN 301 549 V4.1.1, Directive (EU) 2019/882, Design Tokens Format Module 2025.10, Apple HIG update index, Android Compose Material 3 release notes, Core Web Vitals, and WCAG 3 draft status. The token skill now names the 2025.10 report and states that it is a Final Community Group Report, not a W3C Standard.

**Source observations:** ETSI lists EN 301 549 V4.1.1 (2026-09) as published ([ETSI HF technical group](https://www.etsi.org/technical-groups/hf/), accessed 2026-10-29). EUR-Lex identifies Directive (EU) 2019/882 and its scope; applicability still requires jurisdiction and product/service assessment ([Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj), accessed 2026-10-29). The token report is dated 28 October 2025 and is explicitly a Community Group report ([DTCG Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/), accessed 2026-10-29). W3C's WCAG 3 page remains a Working Draft dated 10 September 2026 ([WCAG 3.0](https://www.w3.org/TR/wcag3/), accessed 2026-10-29). Google Search Central's Core Web Vitals page was last updated 10 December 2025 ([Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals), accessed 2026-10-29). These sources do not determine legal applicability or output conformance.

### D-3 — checkout and package file-entry guard

**Change:** Added a deterministic 5,000-entry ceiling for checkout and package-oriented trees and wired it into engine validation, the custom clone installer, and plugin-manifest generation. Package mode excludes only `.git`, `.cache`, `cache`, `__pycache__`, `node_modules`, `.venv`, and `venv`; tests and fixtures stay counted. The source tree is preserved. Native plugin installation does not execute these repository scripts, so this is not evidence of native-host or public marketplace review.

**Failure-path evidence:** Node and Python unit tests accept exactly 5,000 entries and reject 5,001; package-mode tests confirm ignored transient directories are excluded and test fixtures remain counted. An integration test gives both installer and manifest generator an over-limit temporary source and verifies exit status 1 before a manifest is written. No user files are removed.

**Scope limit:** The 5,000-entry ceiling is enforced by the engine validator and custom repository installer/manifest generator. Native Claude Code/Codex plugin flows do not invoke these repository scripts. This guard is not a claim that a native marketplace or public-directory package was reviewed or accepted.

### D-4 — portable path references

**Change:** Replaced machine-specific webroot references in six active skill files with engine identifiers and workspace-map resolution instructions. Canonical doctrine is unchanged. Historical records and the doctrine's own legacy reference are preserved.

### D-5 — selected-font rendering and PDF inspection

**Source/version evidence:** Temporary font assets came from the official upstream revisions below. The upstream release records Public Sans version 2.001 and SIL Open Font License 1.1 ([release](https://github.com/uswds/public-sans/releases/tag/v2.001), [license](https://github.com/uswds/public-sans/blob/v2.001/OFL.txt)); Source Serif 4 is version 4.005 and its repository license identifies OFL 1.1 ([release](https://github.com/adobe-fonts/source-serif/releases/tag/4.005R), [license](https://github.com/adobe-fonts/source-serif/blob/4.005R/LICENSE.md)).

| Temporary asset | Upstream revision | SHA-256 |
|---|---|---|
| Public Sans variable TTF | [c7923167a592d941646f99fb7b5fba17aa7d69e1](https://github.com/uswds/public-sans/tree/c7923167a592d941646f99fb7b5fba17aa7d69e1) | `d75a7dc1a27eb9e336d5b33f55489d2ecb5621bf694d5c43b2415bce2ca830a8` |
| Source Serif 4 variable Roman TTF | [2823e993c53fca27c5c8749f529b56a5a7c77b6b](https://github.com/adobe-fonts/source-serif/tree/2823e993c53fca27c5c8749f529b56a5a7c77b6b) | `14d360ee1b76655da9276628b229e11671bc1f5d1083636144db6677d452cf55` |

License text was downloaded beside the temporary font files and inspected for the SIL Open Font License 1.1 notice. The binaries and license copies remain temporary; no font binary was added to the checkout.

**Render evidence:** Chromium `document.fonts.load` and `document.fonts.check` returned loaded/true for Public Sans and Source Serif 4. `pdffonts` on the corrected specimen lists embedded, subset, Unicode-capable font objects named PublicSans-Thin and SourceSerif4Variable-Roman. This proves the selected fonts loaded in that isolated Chromium render and were embedded in that generated PDF. It does not prove PDF/UA-2 conformance or behavior in another application.

## Required model-policy currentness check

**Provider-source synthesis:** The provider changelog records GPT-6.1 Terra's release on 26 October 2026; the current official catalogue lists `gpt-6-astra`, `gpt-6.1-sol`, `gpt-6.1-terra`, and `gpt-6-luna`, while provider guidance describes their intended task fit ([OpenAI API changelog](https://developers.openai.com/api/docs/changelog), [models](https://developers.openai.com/api/docs/models), [model selection](https://developers.openai.com/api/docs/guides/model-selection), accessed 2026-10-29). A local non-secret runtime catalogue snapshot fetched 2026-10-29 included those IDs and `high` reasoning availability; it does not prove active-session selection or account entitlement. Retain the authorized `gpt-6-luna`/high pin. Comparative quality, cost, and latency remain `NOT_ASSESSED`; no automatic model switch or policy edit is proposed.

## Standardise and re-measure

The detailed command results and NOT_ASSESSED findings are in [04-validation-record.md](04-validation-record.md). The design claims above are limited to this checkout, temporary specimens, and the specific runner outputs. The final raw score and both caps are recorded separately in [05-final-report.md](05-final-report.md); score changes are judgments against the stated rubric, not measured causal effects of an individual fix.
