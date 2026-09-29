# 09 — Master Scorecard

All scores /100 against the top-0.1 % bar for design practice (studio and platform-owner level). Strict
default band 45–65. Labels: **measured** (from a command in `11-measured-evidence.md`), **judged**
(auditor reading, with named deficiencies), **NOT_ASSESSED** (0 where it feeds a formula).

No dimension, group or output type is scored 70 or above, so no "Extraordinary justification" paragraph
is required. The nearest candidate, doctrine at 68, is explained below.

## A. The eleven dimensions

| # | Dimension | Label | Score | Evidence and named deficiencies |
|---|---|---|---:|---|
| 1 | Doctrine & philosophy | judged | **68** | Anti-slop charter, human-authority asymmetry rule and purpose-fit brief (`doctrine/design-doctrine.md` §0–2) are distinctive, and unusually they are executable: 49-rule slop registry, doctrine-consistency check and a 45-case font gate all pass. Held below 70 because the doctrine header still reads v0.2.0 although the 29 Sep 2026 hard- and secondary-ban additions are the kind of change its own §6 says must bump the minor version; §3 promises worked examples in `doctrine/examples/`, which is empty and untracked; §5 says "start at README.md" while `AGENTS.md` says read the doctrine first. |
| 2 | Taxonomy & structure | judged | **60** | 16 groups, 101 skills, zero-debt contract. Deficiencies: diagrams, a declared output type, have no owning skill (only `docx-report-and-document-formatting/references/diagram-visual-standards.md`); group 00 (16 skills) holds eight overlapping review/audit skills; groups 08 and 10 have 3 skills each and 03 and 12 have 4; group 15 is five thin skills. |
| 3 | Skill depth & rigour | judged | **58** | Strong samples (`design-tokens-and-naming`, `docx-report-and-document-formatting`, `dashboard-and-data-product-design`, `accessibility-wcag-2-2-compliance`). Deficiencies: `sector-strategies`, `legal-sector-ui-ux` and `ux-psychology` keep a generic four-step workflow ("Read only the relevant project inputs…"); six skills still route to a `references/legacy-guidance.md`; group-15 references are 19–28 lines; six skills exceed the 20 KB byte budget. |
| 4 | Worked examples & applied proof | judged | **48** | 101/101 skills ship at least one example, and `examples/p18-synthetic-output-pack` holds real DOCX/PPTX/XLSX/PDF output with verify scripts. But most examples are markdown specifications, several are 10–16 lines (`plan-canvas-design-review`, all five game skills, `interface-craft-micro-details`), the delivery-evidence fixture is `CONDITIONAL` with all five stages `NOT ASSESSED`, and Tier 3 is empty. |
| 5 | Standards currency | judged (from the engine's own currentness records; no fresh external research) | **58** | Good: Liquid Glass / iOS 27 record accessed 24 Sep 2026; WCAG 3.0 Working Draft of 10 Sep 2026 correctly treated as non-normative, APCA framed as a design aid only; Material 3 Expressive in 9 files. Deficiencies: `governance/standards-source-register.md` has only 5 rows (no Apple HIG, Material, Core Web Vitals or design-token format entry) and the ISO 14289-2 link contains a malformed `%20render` segment; `web-performance-budgets-2026.md` cites only the June internal benchmark with no access date; no file names EN 301 549 or the European Accessibility Act; the token skill cites the "W3C Design Tokens" format without naming a stable version. |
| 6 | Coverage / output-type readiness | judged | **55** | Mean of 12 output types (`05-per-output-type-readiness.md`); range 42 (diagrams) to 62 (web application). |
| 7 | Accessibility / inclusivity | judged | **62** | WCAG 2.2 cited in 130 files, dedicated WCAG, inclusive-design and i18n/RTL skills, success-criterion-numbered checklists. Deficiencies: no EN 301 549 / EAA mapping, PDF/UA appears only in the source register, no assistive-technology run evidence anywhere. |
| 8 | Production / handoff / render fidelity | judged | **55** | Token skill, handoff spec, token-file gate hook, `validate_token_example.py`, detector token-drift rules and the P18 render pack. Deficiencies: the engine's own delivery fixture is `CONDITIONAL`; the browser tier is unexercised here; no PPTX or PDF build procedure lives in the engine (it relies on external document skills). |
| 9 | Redundancy & hygiene | judged | **52** | One within-engine pair ≥ 0.75 (`accessible-color-and-contrast` ↔ `color-system-and-palette`, 0.768); eight overlapping audit/review skills; 16 zero-inbound skills; `sector-strategies` example is a fintech strategy although its own Do-Not-Use sends fintech elsewhere; doctrine version drift; empty `doctrine/examples/`; malformed register URL; retrieval `calibration_version` labelled `2026-10-v1` a month ahead of its date. |
| 10 | Discovery & routing | **measured** | **59.4** | Engine Eval Readiness (recomputed and agreed, `11-measured-evidence.md` §C). Auditor's own judged routing score, used only for the raw number: **60** (p@1 94 %, p@3 100 %, negatives 21/21, fixture lint clean, fresh-glob routing and a BM25 catalogue CLI; but 44 skills have no positive fixture, 16 have no inbound references and coverage is 0/101). |
| 11 | Safety & integrity | judged | **64** | Destructive-bash and mirror-config hooks with tests, book-extraction guard (pytest), provenance and pinned third-party citations, network-free static detector tier (tested), waiver discipline tests, Codex-only block gated. Deficiencies: safety tests cover hooks, not the installers (`install.sh`, `install.ps1`, `scripts/install-engine.js`), which were not reviewed line by line; `--allow-remote` exists in the detector. |

**Why doctrine is 68, not 70+.** Executable enforcement is concrete evidence, but a top-0.1 % doctrine
would also keep its own change log, version and example promises true. Three self-contradictions (version,
empty examples folder, entry-point wording) are exactly what the strictness directive asks the auditor to
find.

## B. Groups (detail in `03-existing-groups-audit.md`)

| Group | Score |
|---|---:|
| 00 Cross-cutting ops, QA, a11y | 58 |
| 01 Typography and fonts | 62 |
| 02 Colour, brand, identity | 57 |
| 03 Layout, grid, composition | 58 |
| 04 Web and UI | 60 |
| 05 UX process, research, psychology | 52 |
| 06 Sector and domain UX | 48 |
| 07 Mobile | 56 |
| 08 Motion and interaction | 57 |
| 09 Design systems, tokens, theming | 58 |
| 10 Content design, UX writing | 56 |
| 11 Imagery and art direction | 54 |
| 12 Data viz and dashboards | 60 |
| 13 Presentations and documents | 57 |
| 14 Conversion and web page patterns | 56 |
| 15 Game visual experience | 45 |
| **Mean** | **55.9** |

## C. Output types (detail in `05-per-output-type-readiness.md`)

| Output type | Score |
|---|---:|
| Web application UI | 62 |
| Marketing website / landing page | 60 |
| Data products, dashboards, data-viz | 60 |
| Documents (DOCX/PDF) | 58 |
| Design handoff (tokens/specs) | 58 |
| iOS | 55 |
| Presentations / decks | 55 |
| Brand / visual identity | 55 |
| Android | 54 |
| Proposals | 54 |
| Cross-platform mobile | 50 |
| Diagrams | 42 |
| **Mean** | **55.25 → 55** |

## D. The three overall numbers

Weighting (from the rubric, stated as required): output readiness 30 %, skill depth & worked examples
25 %, standards currency 15 %, taxonomy 10 %, doctrine 10 %, hygiene 10 %. Hygiene = mean of redundancy,
discovery/routing and safety. Skill depth & worked examples = mean of dimensions 3 and 4
= (58 + 48) ÷ 2 = 53. Accessibility (62) and production/handoff (55) are already reflected in the
per-output-type scores and are not double-counted.

| Bucket | Weight | Raw input | Raw points | Measured input | Measured points |
|---|---:|---:|---:|---:|---:|
| Output readiness | 0.30 | 55 | 16.50 | 55 | 16.50 |
| Depth & examples | 0.25 | 53 | 13.25 | 53 | 13.25 |
| Standards currency | 0.15 | 58 | 8.70 | 58 | 8.70 |
| Taxonomy | 0.10 | 60 | 6.00 | 60 | 6.00 |
| Doctrine | 0.10 | 68 | 6.80 | 68 | 6.80 |
| Hygiene | 0.10 | (52 + 60 + 64) ÷ 3 = 58.67 | 5.87 | (52 + 59.4 + 64) ÷ 3 = 58.47 | 5.85 |
| **Total** | | | **57.1** | | **57.1** |

- **Raw: 57.1 / 100** (16.50 + 13.25 + 8.70 + 6.00 + 6.80 + 5.867 = 57.117)
- **Measured-constrained: 57.1 / 100** (16.50 + 13.25 + 8.70 + 6.00 + 6.80 + 5.847 = 57.097)
- **Published: 57.1 / 100** = `min(57.1, 65)`; the cap does not bind, but it would at 65 because no
  portfolio craft-standard acceptance evidence exists.
- **Engine Eval Readiness: 59.4 / 100** (reported beside the overall, not folded away).

## E. Movement against prior audits

| Audit | Overall | Nature |
|---|---:|---|
| Initial analysis, 21 Jun 2026 (`docs/initial-analysis/`) | 51 | Strict, fleet-based; 37 skills |
| Self re-audit, 22 Jun 2026 (`docs/audits/post-v2-plan/`) | 81 | Author-run, no measured constraint, no strictness cap applied |
| Kaizen, 6 Sep 2026 (`docs/audits/2026-09-06-kaizen.md`) | NOT_ASSESSED | Evidence-limits review; published cap 65 stated |
| **This re-audit, 29 Sep 2026** | **57.1** | Independent, measured-constrained |

Against the strict 21 June baseline the engine has moved +6: taxonomy 48 → 60, examples 22 → 48, standards
40 → 58, output readiness 52 → 55, accessibility 28 → 62, production/handoff 31 → 55. Doctrine is 74 → 68
only because this audit penalises internal inconsistencies the baseline did not test for. The 22 June
figure of 81 is not comparable: it was self-assessed, predates the Readiness rule and applied no 70+
justification test.
