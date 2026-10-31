# 04 — Validation record (pass 2)

**Run date:** 2026-10-31. **Branch:** `kaizen/2026-10-pass2`. **Host:** Linux, `python3` 3.14, `node` 22, no `pytest`, no `pwsh`, no `verapdf`, no `kotlinc`/`gradle`/`java`. Every command below was run from the repository root after the last content change to the item it covers; the final block was run after the last code change of the pass. Scratch artefacts (practitioner pages, PDFs, captured specimens, the pytest stand-in runner, the locked Playwright scratch project and the independent measurement script) are outside the repository and are described, not committed.

## Registered validators and gates (final run)

| Check | Exact command | Exit | Result |
|---|---|---:|---|
| Engine structure and regression gate | `python3 -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json` | 0 | 102/102 compliant; 51 slop rules, 102 detector fixtures; checkout 1,632 and package 1,250 of 5,000 entries at the last run before the closing commit (counts grow as files and git objects are added); `portability_findings=0`; six report-only size warnings, unchanged |
| Routing smoke (registered form) | `python3 -X utf8 scripts/routing_smoke_test.py` | 0 | 94 fixtures, p@1 95%, p@3 100%, owned negatives 46/46, one foreign owner `NOT_ASSESSED` |
| Routing smoke (CI floor) | `python3 -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures` | 0 | same; lint 0 findings |
| Route existence | `python3 -X utf8 scripts/validate_route_existence.py` | 0 | 0 findings |
| Portability gate (new) | `python3 -X utf8 scripts/validate_portability.py` | 0 | no unlisted machine paths; 3 allowlisted link findings in historical records |
| Cross-engine routes, default layout | `python3 -X utf8 scripts/validate_cross_engine_routes.py` | 1 | 6 `NOT ASSESSED`: this host names the dev and SDLC engine folders differently (tooling, not content) |
| Cross-engine routes, mapped | `python3 -X utf8 scripts/validate_cross_engine_routes.py --map chwezi-dev-engine=<checkout> --map chwezi-sdlc-documentation=<checkout> --workspace-root <parent of the other checkouts>` | 0 | 0 findings: all declared routes resolve |
| Catalogue relevance | `python3 -X utf8 tests/eval_catalog_relevance.py` | 0 | held-out p@1 1.000, MRR@3 1.000, nDCG@3 0.968, abstention 1.000, typo recovery 1.000 (n=16), unchanged |
| Design catalogue | `python3 -X utf8 scripts/validate_design_catalog.py data/design-catalog.json` | 0 | pass |
| Delivery evidence | `python3 -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json` | 0 | `CONDITIONAL`; five stages `NOT ASSESSED`, unchanged |
| Token example (now with shapes and claims) | `python3 -X utf8 scripts/validate_token_example.py skills/09-design-systems-tokens-and-theming/design-tokens-and-naming/examples/tokens.json` | 0 | aliases, tiers, roles, cycles, value shapes and contrast claims pass |
| Plugin manifest | `node scripts/generate-plugin-manifest.js --engine . --check` | 0 | current, 102 skills |
| File-entry guard | `python3 -X utf8 scripts/check_file_count.py . --mode checkout` and `--mode package` | 0, 0 | pass |
| Agent contract | `python3 -X utf8 tests/agent-integration/test_design_agent_contract.py` | 0 | pass |
| Slop registry | `node tools/slop-detector/cli.mjs --validate-registry` | 0 | 51 rules (43 static, 8 browser), sha256 `a4d34400...9ccc` |
| Font doctrine consistency | `node tools/slop-detector/cli.mjs --doctrine-consistency` | 0 | 0 conflicts |
| Detector suite, no Playwright | `node --test tools/slop-detector/test/` | 0 | 119 tests, 118 pass, 1 skipped (browser acceptance) |
| Detector suite, locked Playwright | `CHWEZI_SLOP_PLAYWRIGHT_PROJECT=<scratch locked project> node --test tools/slop-detector/test/` | 0 | 119 of 119 pass, 0 skipped: the browser acceptance test ran for real. Without a locked Playwright project it is skipped on this host, as in the baseline run |
| Font gate (source level) | `node hooks/test-banned-font-gate.js` | 0 | 45/45 |
| Rendered-output font gate (new) | `node hooks/test-rendered-font-names.js` | 0 | 73/73 |
| Other hook tests | `node hooks/test-destructive-bash-gate.js`, `test-plugin-hook-config.js`, `test-slop-deep-pass.js`, `test-slop-immediate.js`, `test-token-file-gate.js` | 0 each | 61/61, 7/7, 10/10, 12/12 (median 270 ms), 10/10 |
| File-count tests (Node) | `node --test tests/file-count.test.js` | 0 | 4 pass |
| New unittest suites | `python3 -X utf8 -m unittest tests.test_portability tests.test_token_pack_validator tests.test_cross_engine_workspace_map` | 0 | 51 tests OK (12 + 26 + 13) |
| Approval adapter | `python3 -X utf8 -m unittest tests.test_approval_adapter` | 0 | OK |
| Full Python suite, real pytest | `python3 -m pytest -q` | 1 | **`NOT_ASSESSED`**: `/usr/bin/python3: No module named pytest` |
| Full Python suite, stand-in runner | `python3 -X utf8 <scratch>/minipytest/run.py .` | 0 | 196 passed, 0 failed. This is **not pytest**: a small runner written for this pass (fixtures `tmp_path`, `capsys`, `monkeypatch`, stacked `parametrize`, `raises`, plus `unittest` classes). On the untouched baseline tree it reports 145 passed, equal to the 145 recorded on 29 October with real pytest; on this branch 145 + 12 + 26 + 13 = 196, which agrees with the number of tests added. Treat it as strong supporting evidence, not as a substitute for a pytest run |

## Practitioner tasks, re-run with the final tooling

| Task | Result |
|---|---|
| 1. Token pack, table, Compose | The practitioner pack passes `validate_token_example.py --profile generic` (aliases, tiers, shapes, claims). The table sorts ascending then descending by keyboard (`aria-sort` follows), empty state shows no rows and a visible explanation, loading state is `aria-busy` with four skeleton rows, both fonts load. Detector: 0 findings in both tiers with `--fail-on warning`, including the new target-size rule. Kotlin generated from the same tokens was **not compiled** (no `kotlinc`, `gradle`, `java`); the Compose composable was not written. `NOT_ASSESSED` |
| 2. Seeded-defect screen | Detector findings: D1 contrast (`low-contrast-computed`, 3.19:1), D3 positive tabindex (3 findings), D5 target size (3 findings), D6 focus removed. **Recall 4 of 6, up from 2 of 6.** D2 (non-text contrast, 1.4.11) and D4 (DOM order against visual order, 1.3.2) are not scripted and remain known false negatives. The supplied screen was not provided: `NOT_ASSESSED` |
| 3. Proposal and diagram | Source level: banned-font hook allows the file, blocks the `Inter` control; detector 0 findings in both tiers. Rendered level: `check-rendered-fonts.js` on the proposal PDF exits 0 with a Type 3 note (variable fonts exported by Chromium); on the Montserrat control PDF exits 2; on a real Liberation-only PDF exits 3. PDF/UA-2 not tested (no `verapdf`): `NOT_ASSESSED` |

## Independent measures (not produced by the engine's own generators)

Taken by a separate script over the working tree; its logic is stated in [01-baseline-scorecard.md](01-baseline-scorecard.md) and was reused unchanged.

| Measure | Baseline | Final |
|---|---:|---:|
| Active skills | 102 | 102 |
| Positive routing fixtures / owned-negative rows (local) | 72 / 29 | 94 / 46 |
| Skills with at least one positive | 58 | 61 |
| Skills with three positives and two owned negatives | 1 | **11** |
| Operational files with machine-specific paths | 10 | **2** (both allowlisted with a reason) |
| Markdown links climbing into sibling checkouts | 3 | **0** |
| Broken relative links outside `docs/`, `tests/`, `fonts/` | 4 | 1 (a spreadsheet number format inside a code span in `xlsx-design-system.md`, not a link; the portability gate ignores code spans) |
| Skills with the generic workflow | 2 | 1 (`sector-strategies`) |
| Skills parking depth in `legacy-guidance.md` | 5 | 5 |
| Stated contrast ratios in the token example that match the rendered value | 2 of 11 | 16 distinct claims checked, all within 0.08 of Chromium-rendered colours; the validator now guards them |
| Seeded-defect recall of the detector | 2 of 6 | 4 of 6 |
| Expired source records / due within 30 days | 0 / 3 | 0 / 0 |
| Worked-example words per skill: median / skills under 250 words | 1,137 / 11 | 1,137 / 11 (unchanged) |

## Currency (Step 5): source, access date 2026-10-31, support state, review date

| Item | Source read | Observed | Support state | Next review |
|---|---|---|---|---|
| WCAG 2.2 | [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Recommendation of 12 December 2024; the page links an errata list | verified | 2027-01-27 |
| WCAG 3.0 | [W3C WCAG 3.0](https://www.w3.org/TR/wcag3/) | Working Draft of 10 September 2026 (`WD-wcag-3.0-20260910`); the draft says it does not deprecate WCAG 2 | verified as a draft; not usable as a conformance claim | 2027-01-27 |
| EN 301 549 | [ETSI delivery directory](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/) | Newest folder `04.01.01_60`, dated 2 September 2026 (V4.1.1) | verified as published; legal effect not assessed | 2027-01-27 |
| European Accessibility Act | EUR-Lex, Directive (EU) 2019/882 | Two re-reads returned an empty body | `NOT_ASSESSED` this pass; the 29 October entry stands | 2027-01-27 |
| Design Tokens format | [Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/), [Color Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-color-20251028/), [designtokens.org](https://www.designtokens.org/) | Both modules dated 28 October 2025, Final Community Group Reports; 2025.10 is still the latest published edition. Dimension, duration, colour, fontFamily and fontWeight shapes read from the pages and enforced | verified | 2027-01-27 |
| Apple design guidance | [Apple design updates](https://developer.apple.com/design/whats-new/) | After 24 September 2026: 13 October (Widgets, Live Activities) and 28 October (Designing for macOS, Gestures, Pointing devices, App icons) | verified as an update list; no visual treatment adopted | 2027-01-27 |
| Compose Material 3 | [Release notes](https://developer.android.com/jetpack/androidx/releases/compose-material3) | Stable 1.4.0 released 24 September 2025; 1.5.0-beta01 on 7 October and 1.5.0-beta02 on 21 October 2026; no release candidate | verified; corrects the 29 October row | 2027-01-27 |
| Material design guidance | m3.material.io | no readable content from an automated request | `NOT_ASSESSED` | 2027-01-27 |
| Core Web Vitals | [Google Search Central](https://developers.google.com/search/docs/appearance/core-web-vitals) | Last updated 2025-12-10 UTC; LCP, INP, CLS | verified | 2027-01-27 |
| ISO 9241-161 | [ISO page](https://www.iso.org/standard/85790.html) | Edition 2, published 2025-12, stage 60.60, replaces the 2016 edition | verified | 2027-01-27 |
| ISO 14289-2 | ISO page | HTTP 403 to an automated request | `NOT_ASSESSED` this pass | 2027-01-27 |
| Microsoft Word and PowerPoint accessibility pages | Microsoft Support | Reachable and titled as recorded; the pages show no version date | availability and scope only | 2027-01-27 |
| October font watchlist | `docs/continuous-improvement/slop-doctrine-refresh-2026-10-font-watchlist.md` | Re-check is due 2026-12-29; not due, not re-researched. The doctrine consistency check passes | not due | 2026-12-29 |
| F44 technique title (used in a new rule) | [W3C WCAG 2.2 technique F44](https://www.w3.org/WAI/WCAG22/Techniques/failures/F44) | Title read; page dated 12 January 2026 | verified | 2027-01-27 |

**Model currentness.** The provider changelog read on 2026-10-31 lists `gpt-6-rosalind` (30 October 2026, specialised biological reasoning, restricted access), `gpt-6.1-terra` (26 October) and an update to `gpt-6-luna` (22 October); no deprecation in that range. The Codex pins in this engine's router are retained: no release is relevant to design work and Peter has authorised no change. This session ran on Claude, so the Codex runtime catalogue and the comparison of quality, cost and latency are `NOT_ASSESSED`; no automatic model change is proposed. Model currentness did not pass, and is not claimed to have.

## NOT_ASSESSED, in one place

Real pytest (not installed); the supplied screen for Task 2; Kotlin compilation and the Compose composable; PDF/UA-2 and any assistive-technology or target-application run; Style Dictionary and Figma import of the token files; ISO 14289-2, the EUR-Lex text and the Material guidance site; the Codex model catalogue and the model comparison; Tier 3 behavioural evaluation (no paid calls were made); native plugin installation and hook execution.

## Install and host safety

No `sudo`, no package install, no service, firewall, cron or SELinux change, and no file outside the repository and the session scratch area was written. The browser tier used a scratch project whose `node_modules` points at an existing read-only installation; nothing was installed. `npm ci` was not run. No `git push`, tag, release or pull request.
