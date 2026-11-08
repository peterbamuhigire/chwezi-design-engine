# Kaizen record: adopting the Chwezi Product Excellence Standard (8 November 2026)

Peter Bamuhigire supplied the Chwezi Core Systems product excellence design standard, a Chwezi-owned
internal design bible, and made it the mandatory UI/UX standard for every Chwezi app and system:
Android, iOS, tablet, desktop and web, with Kotlin Multiplatform and Compose Multiplatform as the
primary mobile stack and existing web front ends keeping their stack. It was chosen by Lead
Developer Peter Bamuhigire and the Chwezi Core Systems design team, effective 01 November 2026
until further communication.

The source was not transcribed. It was deduplicated, made measurable, checked against current
platform guidance and enriched where it was thin. The original is held as evidence in the private
knowledge bank, not in this public repository.

## What was adopted

- **Binding doctrine:** [`doctrine/product-excellence-standard.md`](../../../doctrine/product-excellence-standard.md),
  version 1.0.0: scope, MUST/SHOULD/MAY, precedence ladder, 13 hard release gates, release decision,
  relationship to the house style and money-figures skill, owner defaults, platform baseline,
  evidence states, change control.
- **Skill:** [`chwezi-product-excellence-standard`](../../../skills/00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/SKILL.md)
  with 21 references and 2 examples: 236 rules with stable `PX-<AREA>-NNN` IDs (189 MUST, 47
  SHOULD) plus the 13 gates; the 20 principles; scorecard and sign-off charter; foundations;
  offline and low-end performance; data trust and visualisation; accessibility, privacy and
  localisation; 16 screen blueprints and 16 component contracts (short and expanded source annexes
  merged); 50 pattern dossiers in 11 families with neutral archetypes in place of third-party
  names; product profiles; agent protocol with audit checklist and DDR template; anti-pattern
  blacklist; currentness register; machine-readable policy; worked POS checkout review.

## Defects fixed during integration

| Defect | Fix |
|---|---|
| Numbered `### 1.` headings in the dossier contract | Unnumbered; "section 5" pointer reworded |
| Release rule stated four different ways | One rule in doctrine, skill, PX-SCORE-002, scorecard and policy (below) |
| Document numbering was a scored MUST only | Hard gate PX-GATE-13 (catalogue, doctrine, scorecard, policy, skill) |
| Dossier index titles and archetype labels differed from the dossiers; only PD-41 to PD-50 named an archetype | Every dossier has an `Archetype:` line in the form `AR-NN Name` (secondary joined with ` + `), identical to the index; index titles equal the dossier headings (checked by script, 50 of 50) |
| SKILL.md at 20,473 bytes, 7 under the 20,480 report limit | Evidence table moved to the currentness register reference; now about 19.2 KB |
| Gate titles and rule lists differed between doctrine and scorecard | Doctrine titles used everywhere; rule lists match the catalogue |
| PX-QA-008 named five sign-off roles; the charter names four | PX-QA-008 now follows the charter roles plus the domain reviewer |
| Worked review graded truncated total, missing accessible name and UGX decimals as Major although the gates list them | Re-graded as hard fails (gates 03, 06, 07, 13); total 31.25 |
| "proposed" thresholds worded five ways | One sentence: proposed (owner to confirm) |

Checked and consistent: every `PX-` ID cited in the skill and doctrine exists in the catalogue
(including slash and range shorthand), every `CR:` row ID exists in the currentness register, and
the policy YAML lists the same 236 IDs, levels and gates as the catalogue.

## Owner decisions applied (owner default, 2026-11-07)

- **Release rule.** PASS = score at least 85, zero open hard gates and no dimension below 2. A
  dimension at 1 caps at CONDITIONAL. 70-84 with owned, dated remediation and written acceptance by
  the product owner and the Lead Developer = CONDITIONAL (pilot only). Below 70, a dimension at 0,
  or any open gate = BLOCKED. An applicable gate with unmeasured evidence counts as open.
- **Accent model.** House model: per-product brand primary plus one shared amber next-step accent.
- **Semantic roles.** House style gains `warning`, `info` and `neutral`; `danger` is the token name;
  "critical" is a severity label. Values for warning, info and neutral are proposed with computed
  contrast (all at least 5.15:1 on surface and ground; containers at least 9.24:1).
- **Money.** Full amounts take decimals from the ISO 4217 minor unit (UGX and RWF 0); this replaces
  the money-figures skill's "always two decimals". Compact K/M/B unchanged.
- **Card radius and naming.** House radii win over the source's 12-20 dp; `KpiCard` in code, "KPI
  card" in prose, house "KPI tile" maps to it.
- **Languages, idle lock, fiscal e-invoicing, typography** as recorded in the doctrine.

## Wiring

AGENTS.md hard rule; design-doctrine map row; design-quality-gate section; routing fixtures for
"build the POS checkout screen for Maduuka" and "review this app dashboard against the Chwezi
standard" with two owned negatives (house style, generic design QA); one reference line in 13
neighbour skills; plugin manifest, skill catalogue, README counts and one task row; quality
baseline and test pins 104 to 105; standards register DGN-010 refreshed and DGN-014 added.

## Open owner confirmations

1. Warning, info and neutral hex values (light and dark), and the container pairs for success and
   danger, which are not yet measured.
2. Every threshold marked "proposed" in the dossiers and references (media and data budgets,
   stale windows, domain timings).
3. Whether the semantic roles enter the house token pack (`house-style-tokens.json`), which would
   bring them under `validate_token_example.py`.
4. The release rule's treatment of a dimension scored 0 as BLOCKED (kept from the scorecard; it was
   not in the brief's wording).

## Not assessed

- Rendered-device contrast of the new roles; any screen built to the standard (no product screen
  was rendered in this cycle).
- Rows marked `NOT_ASSESSED` in the currentness register: Material 3 site pages (M5, design
  guidance in M11), iOS Reduce Transparency rules (I6), the date INP replaced FID (W4), CLDR
  separators for UGX and locale data for Luganda and Kinyarwanda (C3, L1), RTL mirroring of media
  controls and chart axes (R4), iOS snapshot hiding (S2), data-protection law detail.
- Live routing (the smoke test is a lexical proxy).
- The other engines' adoption, README overhaul and product-project adoption (later steps).

## Validation (2026-11-08, Windows, Python 3, Node 24.8.0)

| Check | Result |
|---|---|
| `validate_engine.py --baseline tests/quality-baseline.json` | 105 of 105 compliant, 51 slop rules, 102 fixtures, 0 portability findings; exit 1 only from the pre-existing local checkout count (6,362 entries with ignored folders; package 2,045) |
| `routing_smoke_test.py` | 98 fixtures, precision@1 94%, precision@3 100%, owned negatives 51/51, 1 not assessed; exit 0 |
| `validate_route_existence.py` | 0 findings; exit 0 |
| `validate_cross_engine_routes.py --workspace-root <workspace>` | 0 findings; exit 0 |
| `validate_portability.py` | PASS; exit 0 |
| `check_file_count.py . --mode package` / `--mode checkout` | PASS 2,045 / FAIL 6,362 (ignored local folders, pre-existing) |
| `validate_design_catalog.py data/design-catalog.json` | PASS, 0 stale; exit 0 |
| `validate_token_example.py` (house pack, generic profile; design-tokens example) | 0 findings; exit 0 |
| `pytest -q -p no:cacheprovider` | 196 passed |
| `node --test tests/file-count.test.js` | 4 pass |

## Wave 2: independent audit and repair (2026-11-08)

A second agent re-read the doctrine, the skill, all 21 references and both examples with fresh
eyes, re-ran every consistency check by its own scripts and repaired what it found. Wave-1 work
was kept; nothing was reverted, deleted or renamed.

### Findings and fixes

| Severity | File | Finding | Fix |
|---|---|---|---|
| High | `references/foundations.md`, `accessibility-privacy-localisation.md`, `pattern-dossier-contract.md` | "Eleven canonical states" and an 11-row table, while PX-STATE-001, the unified state table and the policy YAML list 13 (filtered-empty and session expired missing) | One truth everywhere: 13 states with the `ST-` codes of the unified table; loading, content, error and success never N/A (matches the YAML `na_allowed`); Kotlin state sketch gains `NoMatch`, `SessionExpired` and `Outcome`; PX-STATE-001 and the SKILL workflow and quality-gate checklist say 13 |
| High | doctrine normative table, policy `levels`, catalogue legend | MUST defined as "release gate", yet only gate-mapped MUSTs block and other MUST failures are scored (the worked review grades PX-PERF-004 Major) | MUST = required, no departure; blocks release when mapped to a hard gate, otherwise a scored finding with owner and date |
| Medium | `agent-implementation-protocol.md` audit checklist; scorecard evidence pack | No check or evidence item for PX-GATE-13 document numbering; no line requiring all 13 gates stated | Checklist rows 28 (numbering) and 29 (gate statement); evidence-pack row for concurrent-issue, replay, offline-provisional and void tests |
| Medium | `rules-catalogue.md` PX-DATA-013 | Check ("offline issue and void tests") did not cover the owner standing rule's locked counter, banned derivations or replay | Rule text and check extended to match PX-GATE-13 and the 5 Nov 2026 standing rule |
| Medium | scorecard and release gate | Evidence folder had no location, so an agent could not file or find proof | Default layout `docs/design-evidence/<release>/<screen-id>/` with evidence codes in file names, unless the project has a convention |
| Low | scorecard re-measure table | "F1 monthly, F2 quarterly, F3 six-monthly" freshness labels are undefined in the register and clash with dossier family IDs F1-F11 | Named classes (library, platform, standards) as in the register |
| Low | five dossier files | Tautological "Values marked proposed are proposed" sentence | Reworded once per file: a proposed value is a starting value changed only through a DDR until the owner confirms it |
| Low | PX-SCORE-002; worked review | CONDITIONAL "pilot only" missing from the rule text; "currentness P1" instead of `CR:P1` | Both aligned |
| Drift | `.claude-plugin/marketplace.json` (engine) and `chwezi-engine-agents/.claude-plugin/marketplace.json` (suite) | Descriptions said 102 skills; manifest lists 105 (`marketplace-count-drift`) | Both now 105; `generate-plugin-manifest.js --check-marketplace` shows the design rows ok |
| Drift | `docs/README.md`, README validation table | "102 active skills", "102 of 102", "102 skills" | 105 |

Checked and found sound: no source reference name from the private mapping appears in the doctrine,
the skill or this record (47 distinctive names searched, case-insensitive); no banned face is
recommended (the only Roboto mention is the prohibition of Compose's default); no numbered
headings; 249 catalogue IDs (236 rules plus 13 gates) with no duplicates; every cited `PX-` ID and
`CR:` row exists; YAML IDs and levels equal the catalogue; gate titles identical in doctrine,
scorecard and YAML; the release rule (including "any dimension at 0 = BLOCKED", now accepted by the
owner) is the same in doctrine, SKILL, PX-SCORE-002, scorecard, quality gate and YAML; the 50 PD
headings equal the index; all relative links resolve; platform figures match the currentness
register. Dossier overlap was measured with 6-word shingles: the highest pair shares 3%, so the
dossiers do not repeat each other; spot reads of PD-11, -13, -37, -40 and -46 found specific,
testable content.

Not caused by this change and left alone: the `install.sh` shared-asset drift (a comment edited by
hygiene commit `b6ab99e`) and the `install-engine.js` / `generate-plugin-manifest.js` variant
findings; the suite's engineering count (165 vs 166); `released-commit-lag` (clears on commit).

### Validator results (wave 2, 2026-11-08)

| Check | Result |
|---|---|
| `validate_engine.py --baseline tests/quality-baseline.json` | 105 of 105 compliant, 51 rules, 102 fixtures, 0 portability findings; exit 1 only from the pre-existing checkout count |
| `routing_smoke_test.py` | 98 fixtures, precision@1 94%, precision@3 100%, owned negatives 51/51, 1 not assessed; exit 0 |
| `validate_route_existence.py` | 0 findings; exit 0 |
| `validate_cross_engine_routes.py --workspace-root <workspace>` | 0 findings; exit 0 |
| `validate_portability.py` | PASS; exit 0 |
| `check_file_count.py --mode package` / `--mode checkout` | PASS 2,045 / FAIL 6,362 (ignored local folders, pre-existing; not "fixed" by deleting) |
| `validate_design_catalog.py data/design-catalog.json` | PASS, 0 stale; exit 0 |
| `validate_token_example.py` (design-tokens example; house pack `--profile generic`) | 0 findings each; exit 0 |
| `pytest -q -p no:cacheprovider tests` | 196 passed |
| `node --test tests/file-count.test.js` | pass; exit 0 |
| `render_host_files.py --check` (engine-agents) | design engine: only `released-commit-lag` remains |

### Still open

- **Owner confirmation:** warning, info and neutral hex values and the success/danger container
  pairs; every "proposed" threshold; whether the new semantic roles enter `house-style-tokens.json`;
  the default evidence-folder path; the dossier privacy threshold of 5 people (PD-40).
- **NOT_ASSESSED:** rendered-device contrast; any screen built to the standard; register rows M5,
  M11 (design guidance), I6, W4, C3 (pattern), L1, R4, S2 and data-protection law detail; live
  routing; adoption in the other engines and product repositories.
