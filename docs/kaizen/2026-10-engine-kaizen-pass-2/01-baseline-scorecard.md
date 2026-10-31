# 01 — Frozen baseline scorecard (pass 2)

**Date:** 2026-10-31
**Baseline:** clean `main` at `fe7bac7079f829607a2315ab49f2e399d576f4d3`, measured before any repository content changed. This file is committed before the first backlog change, so it is frozen.
**Scoring:** fresh judgments against the ten Standard dimensions, using the same weighted buckets as the 29 October pass so the two are comparable. The cap is the Standard's `min(raw, 65)`. (The 29 October prompt also applied a stricter user cap of 45; this pass was given none, so no second cap is shown.)

## Scores

| Standard dimension | 29 Oct final | Fresh baseline | Named evidence and one-line deficiency |
|---|---:|---:|---|
| Doctrine | 60 | 60 | Executable anti-slop charter; header still v0.2.0 (`doctrine/design-doctrine.md:3`), `doctrine/examples/` promised at line 104 and absent, §5 (line 161) hard-codes a Windows path to this engine. Not changed here. |
| Taxonomy and routing | 62 | 61 | 102 active skills; lexical p@1 94%, p@3 100%, 29/29 local owned negatives. Coverage under the Standard's rule (three positives and two owned negatives) is 1/102, and 44 skills have no positive at all. A practitioner Compose prompt missed its owner in the lexical ranker. |
| Skill depth | 60 | 58 | 102/102 pass the mechanical contract, but two skills keep the generic four-step workflow, five keep `legacy-guidance.md`, six exceed 20 KiB, and the token skill's worked example contradicts the edition the skill names. |
| Applied proof | 47 | 44 | Median example text 1,137 words, 11 skills under 250 words. The headline token example states 11 contrast ratios and 9 do not match the rendered colours. Delivery fixture still `CONDITIONAL`. |
| Standards currency | 60 | 58 | 12 register rows, none past review; but the named token edition and the example disagree, DGN-005 has no access date, and Step 5 sources are not yet re-checked this pass. |
| Output readiness | 60 | 58 | Task 1 table works in Chromium (Compose uncompiled); Task 3 proposal renders with embedded fonts; but the machine checks that gate those outputs miss four of six seeded accessibility defects and cannot inspect a PDF's fonts. |
| Accessibility and inclusion | 60 | 58 | Skill names the criteria well (1.3.2 excepted); detector recall on the seeded screen is 2/6 (contrast 1.4.3 and focus removal 2.4.7 only). No assistive-technology run. |
| Production and handoff | 63 | 60 | PDF built with both faces embedded (as Type 3 outlines for variable fonts); token example not interoperable with the named format edition; no rendered-output font gate. |
| Hygiene | 65 | 56 | Public repository: 10 operational files with machine-specific paths (3 in the router), 3 markdown links climbing out of the repository, 22 historical files, 29 font licence files with local drive origins. One file lists local epub paths including acquisition-site tags (blocker B1). |
| Safety and integrity | 67 | 62 | Hooks and guards pass; but a public file exposes a user name and unlicensed-copy file names (B1), and the font gate cannot fail on a rendered file. |

Weighted raw (same formula as 29 October: output 30%, mean of depth and proof 25%, standards 15%, taxonomy 10%, doctrine 10%, hygiene bucket 10% where the bucket is the mean of hygiene, routing and safety):

- Output: `58 × 0.30 = 17.40`
- Depth and proof: `((58 + 44) ÷ 2) × 0.25 = 12.75`
- Standards: `58 × 0.15 = 8.70`
- Taxonomy: `61 × 0.10 = 6.10`
- Doctrine: `60 × 0.10 = 6.00`
- Hygiene bucket: `((56 + 61 + 62) ÷ 3) × 0.10 = 5.97`
- **Raw baseline: 56.92, reported 56.9/100. Published: `min(56.9, 65) = 56.9`.** The 29 October final raw was 59.0. The fresh figure is lower because this pass tested things the earlier cycle did not (rendered contrast figures, value shapes against the named edition, seeded-defect recall, rendered-PDF fonts, a repository-wide path scan); it is a stricter measurement, not a regression in the engine. Improvement target remains 95/100; the cap is not a target.

## Blockers

- **B1 (legal, privacy and provenance, public repository):** `skills/04-web-and-ui-design/premium-ui-ux-design/references/source-register.md:7-21` (see H-1 in [00-scope-and-evidence.md](00-scope-and-evidence.md)). A blocker whatever the score; must be fixed or escalated before this cycle closes.
- No safety, financial or release blocker beyond B1 was found. Tier 3 behavioural evaluation, assistive-technology and device runs, PDF/UA validation and Kotlin compilation are `NOT_ASSESSED`.

## Measured inputs

Commands run from the repository root on 2026-10-31 (`python3`, not `python`; no `pytest` on this host).

| Check | Exact command | Exit | Result |
|---|---|---:|---|
| Engine structure and regression gate | `python3 -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json` | 0 | 102/102 compliant, 49 slop rules, 98 detector fixtures, checkout 1,420 of 5,000 entries, package 1,224, six report-only size warnings |
| Routing smoke (registered) | `python3 -X utf8 scripts/routing_smoke_test.py` | 0 | passes |
| Routing smoke (CI floor) | `python3 -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures` | 0 | 72 positives, p@1 94%, p@3 100%, 29/29 owned negatives, 1 foreign-owner `NOT_ASSESSED`, lint 0 findings |
| Route existence | `python3 -X utf8 scripts/validate_route_existence.py` | 0 | 0 findings |
| Cross-engine routes, default layout | `python3 -X utf8 scripts/validate_cross_engine_routes.py --workspace-root <parent of the sibling checkouts>` | 1 | 6 `NOT ASSESSED`: repository names `chwezi-sdlc-documentation` and `chwezi-dev-engine` not found as siblings (finding X-1) |
| Cross-engine routes, workspace map | same command with `--workspace-root <scratch dir of symlinks named by repository name>` | 0 | 0 findings |
| Catalogue relevance | `python3 -X utf8 tests/eval_catalog_relevance.py` | 0 | held-out p@1 1.000, MRR@3 1.000, nDCG@3 0.968, abstention 1.000, typo recovery 1.000 (n=16) |
| Design catalogue | `python3 -X utf8 scripts/validate_design_catalog.py data/design-catalog.json` | 0 | pass, 0 stale as of 2026-10-31 |
| Delivery evidence | `python3 -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json` | 0 | `CONDITIONAL`; five stages `NOT ASSESSED` |
| Token example | `python3 -X utf8 scripts/validate_token_example.py skills/09-design-systems-tokens-and-theming/design-tokens-and-naming/examples/tokens.json` | 0 | 0 findings (passes although T1-1 and T1-2 hold: it checks structure only) |
| Plugin manifest | `node scripts/generate-plugin-manifest.js --engine . --check` | 0 | current, 102 skills |
| File-entry guard | `python3 -X utf8 scripts/check_file_count.py . --mode checkout` and `--mode package` | 0, 0 | 1,420 and 1,224 of 5,000 |
| Agent contract | `python3 -X utf8 tests/agent-integration/test_design_agent_contract.py` | 0 | pass |
| Slop detector registry | `node tools/slop-detector/cli.mjs --validate-registry` | 0 | 49 rules (42 static, 7 browser), sha256 `750eaf52...cd0` |
| Font doctrine consistency | `node tools/slop-detector/cli.mjs --doctrine-consistency` | 0 | 0 conflicts |
| Slop detector suite | `node --test tools/slop-detector/test/` | 0 | 117 tests, 116 pass, 1 skipped (browser acceptance, needs `CHWEZI_SLOP_PLAYWRIGHT_PROJECT`) |
| Slop detector browser acceptance | `CHWEZI_SLOP_PLAYWRIGHT_PROJECT=<scratch locked project> node tools/slop-detector/cli.mjs --tier browser tests/fixtures/slop-browser/` | 2 | 11 findings on the flag fixtures, as designed (positive control) |
| Font gate tests | `node hooks/test-banned-font-gate.js` | 0 | 45/45 |
| Other hook tests | `node hooks/test-destructive-bash-gate.js`, `test-plugin-hook-config.js`, `test-slop-deep-pass.js`, `test-slop-immediate.js`, `test-token-file-gate.js` | 0 each | 61/61, 7/7, 10/10, 12/12, 10/10 |
| File-count tests (Node) | `node --test tests/file-count.test.js` | 0 | 4 pass |
| Approval adapter test | `python3 -X utf8 -m unittest tests.test_approval_adapter` | 0 | 1 test OK |
| Python suite (pytest style) | `python3 -m pytest -q` | 1 | `NOT_ASSESSED`: `No module named pytest`. The 29 October record of 145 passing tests came from a venv absent on this host |

Counts that the validators do not report, taken by an independent script over the working tree (not by the engine's generators; the script lives in the session scratch area, and its logic is described here so the final measurement repeats it):

| Measure | Baseline |
|---|---:|
| Active skills (`skills/**/SKILL.md` without `_TEMPLATE`) | 102 |
| Skills with at least one positive routing fixture | 58 |
| Skills with three positives and two locally owned negatives (the Standard's fixture coverage) | **1** (`diagram-design-and-handoff`) |
| Skills with no positive fixture | 44 |
| Owned-negative rows (local owner) / (foreign owner) | 29 / 1 |
| Worked-example text per skill: minimum / median words; skills under 250 words | 45 / 1,137; 11 |
| Operational files with machine-specific paths (a Windows web-root folder, drive letters, `/home/<user>`, `/Users/<user>`; excludes `docs/`, `tests/`, `fonts/`) | **10** (`AGENTS.md`, `doctrine/design-doctrine.md`, `hooks/test-destructive-bash-gate.js` (intentional test inputs), `hooks/token-file-gate.js`, `install.sh` (a comment about drive letters), `integration/integration-plan.md`, `integration/migration-manifest.md`, `design-audit/SKILL.md`, `plan-canvas-design-review/SKILL.md`, `premium-ui-ux-design/references/source-register.md`) |
| Historical files (`docs/`, `tests/`) with such paths / font licence files with a local drive origin | 22 / 29 |
| Markdown links checked outside `docs/`, `tests/`, `fonts/` / links climbing into sibling checkouts | 179 / **3** |
| Dangling cross-engine references (declared routes that do not resolve with a workspace map) | 0 (6 unresolved by default layout: tooling, not content) |
| Expired source records / rows due within 30 days | 0 / 3 (DGN-002, DGN-003, DGN-005 on 2026-11-11) |
| Skills over 20 KiB | 6 |
| Seeded-defect recall of the shipped detector (Task 2) | **2 of 6** |
| Stated contrast ratios in the token example that match the rendered value (tolerance 0.15) | **2 of 11** |
| Literal colour and dimension values in the token example that use the named edition's object shape | **0 of 49** (63 colour tokens: 31 literal OKLCH strings, 32 `{reference}` aliases, which are valid; 26 dimension tokens: 18 literal strings, 8 aliases) |
