# 11 — Measured Evidence

Engine: `C:\wamp64\www\design-system-skills`, HEAD `25ce1e6` (clean working tree before and after the
audit, apart from this folder). Host: Windows 11, Python 3.13.7, Node v24.8.0. Every command ran in the
engine root with `PYTHONDONTWRITEBYTECODE=1` on 29 September 2026.

## A. Validators named in the task brief

| # | Command | Exit | Key output |
|---|---|---:|---|
| 1 | `python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json` | 0 | `skills=101 fully_compliant=101`; `slop_rules=49 slop_fixtures=98`; six report-only `skill-bytes` warnings (see below) |
| 2 | `python -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures` | 0 | `routing fixtures=68 precision@1=94% precision@3=100% owned_negatives=21/21 not_assessed=1 (lexical proxy; not live routing)`; `fixture lint: 0 finding(s)` |
| 3 | `node --test tools/slop-detector/test/` | 0 | `tests 117, pass 116, fail 0, skipped 1` |
| 4 | `node tools/slop-detector/cli.mjs --validate-registry` | 0 | `PASS: 49 rules (42 static, 7 browser); sha256 750eaf52…66cd0` |
| 5 | `node tools/slop-detector/cli.mjs --doctrine-consistency` | 0 | `PASS: 0 baseline/ban conflict(s); 0 banned font folder(s) reported` |
| 6 | `node hooks/test-banned-font-gate.js` | 0 | `45/45 passed` (SVG, Mermaid, JSON, Tailwind, system-stack and Source Sans 3 cases) |
| 7 | `python -X utf8 -m pytest -q -p no:cacheprovider` | 0 | `139 passed in 30.19s` |

`skill-bytes` warnings (over 20,480 bytes; report-only): `design-audit` (24,039),
`webapp-gui-design` (24,215), `ecommerce-and-checkout-ux` (21,418), `healthcare-ui-design` (22,354),
`data-visualization` (29,392), `email-and-newsletter-design` (23,087).

The one skipped detector test and the seven browser-tier rules were not exercised in a browser in this
audit; the browser tier is **NOT_ASSESSED** here.

## B. Additional free local checks run by the auditor

| Command | Exit | Key output |
|---|---:|---|
| `python -X utf8 scripts/validate_cross_engine_routes.py --workspace-root C:/wamp64/www` | 0 | `findings: 0`; all declared cross-engine handoffs resolve |
| `python -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json` | 0 | structure valid; **delivery verdict: CONDITIONAL**; stages accessibility, generation, render, reopen, visual_qa all `NOT ASSESSED` |
| `python -X utf8 scripts/validate_route_existence.py` | 0 | `findings: 0` |
| `python -X utf8 tests/eval_catalog_relevance.py` | 0 | held-out p@1 1.000, MRR@3 1.000, nDCG@3 0.968, negative abstention 1.000 (n=16); calibration n=24 |
| `python -X utf8 scripts/design_query.py search "fintech dashboard typography" --domain typography` | 0 | one result `type-04-public-sans-tabular-mono`, BM25 7.363, not abstained |
| `node tools/slop-detector/cli.mjs examples/kraal-code-bilingual-spec/index.html` | 0 | 1 warning (`kicker-above-heading`, AS2); four token-drift rules `NOT_ASSESSED` (no token source) |
| `python -X utf8 scripts/skill_fanin.py --engine design-system-skills --json` (in `chwezi-engine-agents`) | 0 | 101 active skills; `zero_inbound: 16`; `router_none: 0` |
| Direct call of `routing_smoke_test.evaluate()` on `tests/routing-fixtures.yml` | — | `top1 64 / 68`, `top3 68 / 68`, negatives 21/21, `failures: []`; the one `not_assessed` item is `pdf-proposal-and-bankable-document-design vs srs-skills/02-business-case` (cross-engine owner, union check) |

Catalogue size (read from `data/design-catalog.json`): 66 records — typography 29, ux 20, colour 7,
and one each for product, landing, chart, icons, react, web, google-fonts, gsap; two style records
(one deprecated).

## C. Engine Eval Readiness — recomputed

Inputs: `chwezi-engine-agents/docs/operations/m10-kaizen-evidence/M10-14/eval-readiness.json`,
`readiness/coverage.json`, `readiness/collision-scan.json`, `readiness/design-smoke.txt`, cross-checked
against the auditor's own runs above.

| Slot | Input | Fraction |
|---|---|---:|
| T1 | 2 of 2 declared validators pass (`catalog/engines.yaml` declares `validate_engine.py --baseline …` and `routing_smoke_test.py`); the auditor also saw all 7 brief-listed validators pass | 1.0000 |
| T2_p1 | 64 / 68 | 0.9412 |
| T2_neg | 21 local owned negatives + 1 cross-engine mirror in the union oracles = 22 / 22 | 1.0000 |
| T2_cov | skills with ≥ 3 positives and ≥ 2 owned negatives: 0 / 101 (57 skills have any positive fixture; 8 have any owned negative) | 0.0000 |
| T2_clean | 3 cross-engine pairs ≥ 0.75 involving the engine (all `hospitality-hotel-restaurant`, disposition `mirrored_domain_pack`), 0 undeclared | 1.0000 |
| T3 | 0 grading files; every planned run `NOT_ASSESSED (zero-spend rule)` | 0 |

Arithmetic:

- T1 points = 30 × 1.0000 = **30.00**
- T2 mean = (0.9412 + 1.0000 + 0.0000 + 1.0000) ÷ 4 = 2.9412 ÷ 4 = 0.7353; T2 points = 40 × 0.7353 = **29.41**
- T3 points = 30 × 0 = **0.00**
- **Readiness = 30.00 + 29.41 + 0.00 = 59.41 → 59.4 / 100**

**Auditor's position: agreed.** The recomputation matches the stored figure exactly. The T2 figures are a
lexical drift guard, not proof of live routing. One observation: the catalogue declares only two of the
seven validators the engine actually ships; adding the other five would not move T1 today (all pass) but
would make the T1 slot guard the slop detector, font gate and pytest suite.

Within-engine collision reported, not gated: `accessible-color-and-contrast` ↔ `color-system-and-palette`,
cosine 0.768. Cross-engine warnings between 0.50 and 0.60 (undeclared, below the 0.75 gate): `deck-system`
↔ business-plan `pitch-deck` (0.597); `visual-product-slop-audit` ↔ social-media, proposal and
business-plan `ai-slop-audit` (0.578, 0.552, 0.519); `ecommerce-and-checkout-ux` ↔ website
`ecommerce-checkout` (0.506).

## D. NOT_ASSESSED list

| Item | Cause | Effect |
|---|---|---|
| Tier 3 behavioural runs | Zero-spend rule; 0 `grading.json` files | 30 Readiness points at 0; Readiness ceiling 70 |
| Live (model-executed) routing | Zero-spend rule | T2 is lexical only |
| Slop detector browser tier (7 rules, 1 skipped test) | No browser run in this audit | Not credited in production/handoff |
| Design-delivery stages (generation, render, reopen, visual QA, accessibility) | The engine's own fixture records them as `NOT ASSESSED` | Verdict `CONDITIONAL`; no render credit |
| Device, simulator, screen-reader and print-proof evidence | None held in the engine | No platform-fidelity credit for iOS, Android, print |
| Portfolio craft-standard acceptance evidence | Absent for every engine in this Kaizen | Published score capped at 65 |
| Fresh external standards research | Not performed | Standards currency judged from the engine's own currentness records |
