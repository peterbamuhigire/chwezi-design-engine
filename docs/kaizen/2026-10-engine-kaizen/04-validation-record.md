# 04 — Validation record

**Run date:** 2026-10-29. **Scope:** design-system-skills checkout and temporary practitioner specimens. Baseline and final cross-engine route checks used the canonical workspace map rather than relying on sibling folders beside this checkout.

## Repository and route checks

| Check | Result | Evidence and limit |
|---|---|---|
| Engine structure and regression gate | PASS; 102/102 active skills compliant; 49 slop rules and 98 detector fixtures; six report-only large-skill warnings | `python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json`. The size warnings do not change exit status. |
| Plugin manifest generation | PASS; manifest names 102 active skills; generator `--check` agrees with the generated file | `node scripts/generate-plugin-manifest.js --engine . --check`; exact discovered-skill/manifest parity is also covered by `tests/test_route_existence.py`. This validates repository metadata, not native host installation or hook execution. |
| Routing smoke | PASS; 72 positives; p@1 94%, p@3 100%; 29/29 local owned negatives; fixture lint has zero findings | `python -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures`. This is lexical routing, not a live-model test. One foreign cross-engine negative is `NOT_ASSESSED` in this runner. |
| Local route targets | PASS; zero findings | `python -X utf8 scripts/validate_route_existence.py`. |
| Cross-engine targets at frozen baseline | PASS; zero findings | `python -X utf8 scripts/validate_cross_engine_routes.py --root <baseline-worktree> --workspace-root <canonical-workspace-map>`. This corrects the initial default-layout check that falsely reported six unavailable siblings; see [01-baseline-scorecard.md](01-baseline-scorecard.md). |
| Cross-engine targets at final checkout | PASS; zero findings | `python -X utf8 scripts/validate_cross_engine_routes.py --workspace-root <canonical-workspace-map>`. No sibling repository was modified. |
| Held-out catalogue relevance | PASS at recorded floors: held-out p@1 1.000, MRR@3 1.000, nDCG@3 0.968, negative abstention 1.000, typo recovery@3 1.000 (`n=16`) | `python -X utf8 tests/eval_catalog_relevance.py`. These metrics do not measure live agent routing. |
| Delivery-evidence manifest | CONDITIONAL; manifest structure valid; accessibility, generation, render, reopen, and visual QA remain `NOT ASSESSED` | `python -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json`. |
| Token example | PASS; no findings | `python -X utf8 scripts/validate_token_example.py skills/09-design-systems-tokens-and-theming/design-tokens-and-naming/examples/tokens.json`. |
| Full pytest suite | PASS; 144 passed | `/tmp/linux-kaizen-checks/venv/bin/python -X utf8 -m pytest -q`; the system Python lacked `pytest`, so the existing isolated venv was used. |
| Slop detector suite | PASS; 117 passed, zero skipped | `CHWEZI_SLOP_PLAYWRIGHT_PROJECT=<locked-temp-Playwright-project> node --test tools/slop-detector/test/`. Browser fixtures ran with the consuming project's locked Playwright; this is detector acceptance evidence, not a production artefact audit. |
| File-entry guard, normal and failure paths | PASS; exact boundary accepted, over-limit rejected; validator, installer, and manifest generator refuse before writing | `node --test tests/file-count.test.js` (4 tests) and `/tmp/linux-kaizen-checks/venv/bin/python -X utf8 -m pytest -q tests/test_file_count.py` (4 tests). Counts files and symlink entries; package mode excludes only `.git`, `.cache`, `cache`, `__pycache__`, `node_modules`, `.venv`, and `venv`. |
| Checkout/package current counts | PASS; checkout 1,359 entries, package-oriented tree 1,224 entries, each below the 5,000 ceiling | `python -X utf8 scripts/check_file_count.py . --mode checkout` and `--mode package`; these are checkout snapshots and can change as `.git` objects accumulate. The package count keeps tests and fixtures. The 5,000 ceiling is documented by [OpenAI plugin submission errors](https://developers.openai.com/plugins/deploy/submission-errors), accessed 2026-10-29. |
| Codex model-policy helper | PASS | `python .codex/ensure_model_policy.py --runtime codex --check`; no host-level model or plugin configuration changed. |

## Practitioner tasks and rendered specimens

### Shared tokens, web table, and Compose equivalent

Temporary outputs include token JSON, a web table and Compose sketch, plus a screenshot. The output is illustrative because the prompt supplied no client, data model, API contract, or approved palette. Sorting is a static specimen behavior and the Compose code was not run as an application. The specimen does not demonstrate production behavior.

### Accessibility review of a supplied screen

The supplied screen was absent. The temporary synthetic specimen is clearly labeled in its filename and notes. The audit measured 4.48:1 normal-text contrast and 20×20 CSS-pixel controls, found positive `tabindex` ordering and an offscreen skip link, and observed no visible button focus. These findings belong only to the synthetic screen. Review of the supplied screen, production assistive-technology behavior, and target-device behavior remain `NOT_ASSESSED`. The baseline audit note and source fixture are described in the [experiment log](03-experiment-log.md).

### Proposal and diagram

The final temporary render embeds the SVG diagram rather than a broken local-file reference. Chromium reports both Public Sans and Source Serif 4 loaded; `document.fonts.check` returns true for both. `pdffonts` lists embedded subsets named PublicSans-Thin and SourceSerif4Variable-Roman, with embedded/subset/Unicode fields set to yes. A visual screenshot was inspected after fixing the SVG resource embedding. The specimen remains illustrative; there is no approved client content, actual production target application, or PDF/UA-2 validation. PDF/UA status is `NOT_ASSESSED`.

The exact upstream font versions and license observations are in [03-experiment-log.md](03-experiment-log.md). Font binaries, license copies, render script, screenshot and PDF stay in the task's temporary evidence area and were not committed.

## Currentness and integrity limits

- Official primary pages for the new register entries were checked on 2026-10-29; their editions, page states and applicability limits appear in [governance/standards-source-register.md](../../../governance/standards-source-register.md). This does not establish a specific product's legal or standards conformance.
- The new repository guard covers the custom validator, clone installer, and plugin-manifest generator only. Native plugin-host behavior and public directory review are `NOT_ASSESSED`.
- Root supplied read-only observations of prior native CLI install checks. This cycle did not mutate host configuration or repeat a native host install after the manifest changed.
- Device/browser matrix, assistive-technology validation, supplied-screen review, real client content, production application rendering, publication, and comparative model quality/cost/latency remain `NOT_ASSESSED`.
- Baseline and final cross-engine route targets all resolved using the canonical workspace map; the earlier default-layout result was a workspace binding error, not a repository defect.
