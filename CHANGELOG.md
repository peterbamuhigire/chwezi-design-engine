# Changelog - Chwezi Design Engine

All notable changes to this engine are recorded here. Earlier changes are recorded in
`docs/continuous-improvement/`, `docs/audits/` and the Git history.

## [2026-11-08] - Chwezi Document Reporting and Publishing Standard (companion, binding for published reports and documents)

- New doctrine `doctrine/document-publishing-standard.md` (1.0.0, from the full handbook edition, adopted 8 November 2026 on the owner's instruction): scope across Maduuka, Kraal Code ERP, Medic8, Aqar and SpannaMax; precedence beside the Product Excellence and Reporting standards (stricter rule wins; measured palette contrast; "Not available" for missing values); eight design invariants; eight hard gates `PUB-GATE-01` to `PUB-GATE-08` covering the handbook's stop conditions; roles; implementation sequence; copies in other engines.
- New skill `skills/00-cross-cutting-ops-qa-a11y/chwezi-document-publishing-standard/`: 87 PUB rules (IDENT, ARCH, TOKEN, PAGE, CHART, FIN, READER, RENDER, DOCX, A11Y, PERF, SEC, CONTENT, AUDIT, AGENT, MATH, QA); archetypes, twelve blueprints, component catalogue, twelve page sheets, recipes; tokens and renderer contracts; agent contract, financial tests, edge-case library, acceptance matrix, QA manifest, adoption checklist; mathematics and algorithms (modular scale, measure, baseline grid, line and page breaking by cost minimisation, largest remainder, exact arithmetic, nice ticks, banking to 45 degrees, computed colour, image resolution, content hashing, visual regression); currentness register PB1-PB8; worked review of a monthly finance pack.
- Kaizen against the full edition: the first draft (from the concise edition) was rebuilt; ten findings in `docs/kaizen/2026-11-document-publishing-standard/README.md`.
- Routing: descriptions of the reporting, publishing and Product Excellence skills tuned (PX names "Android phone, POS till"); 102 fixtures, precision@1 95% (from 93%), precision@3 100%, negatives 53/53.
- Wiring: AGENTS hard rule, doctrine map row, quality-gate section, README section and task row, skill catalogue, plugin manifest, counts 106 to 107, quality baseline and test pins, five neighbour references, two fixtures with one owned negative.

## [2026-11-08] - Chwezi Reporting and Dashboards Standard (companion, binding for reporting surfaces)

- New doctrine `doctrine/reporting-and-dashboards-standard.md` (version 1.0.0, adopted 8 November 2026 on the instruction of Lead Developer Peter Bamuhigire): four output contracts, five reporting questions, precedence beside the Product Excellence Standard, eight hard gates `RPT-GATE-01` to `RPT-GATE-08` mapped to the PX gates they also trip, owner rules (no cross-unit quantity sums, ISO 4217 minor-unit decimals, readable dates and labelled amounts, contiguous document numbers), change control.
- New skill `skills/00-cross-cutting-ops-qa-a11y/chwezi-reporting-and-dashboards-standard/`: RPT rules catalogue (PURPOSE, METRIC, SCOPE, PERIOD, RECON, STATE, VIEW, NARR, SEC, PERF, PRINT, EXPORT, QA), metric contract and reconciliation, screen composition with 24 component contracts and six reporting states, A4 page system with eight page types, PDF accessibility boundaries, CSV/XLSX safety, export jobs and generation records, narrative governance, 28 screen blueprints by product family, currentness register RP1-RP3 (PDF/UA-2 ISO 14289-2:2024; PDF/A-4 ISO 19005-4:2020; spreadsheet formula-injection triggers), worked review of a daily sales close; `engineering-and-verification.md` (build layers, generation record, export jobs, fixtures, performance, observability, tenant isolation) so the engine delivers reporting work on its own.
- Kaizen before first release (all kept in 1.0.0, since nothing had been released): gate table no longer claims RPT-GATE-03, 05 and 06 trip PX gates they do not map to; RPT-PRINT-002 trips both RPT-GATE-03 and RPT-GATE-06; RPT-EXPORT-002 covers line feed and full-width triggers and separates CSV (single-quote prefix) from XLSX (string-typed cell, no visible apostrophe); scope wording no longer hands narrative rules to another engine; a section on copies in other engines; change-record wording that fits every engine; print floor stated as single minimum values; print font check worded without a design-engine script so copies stay identical.
- Cross-engine: identical local copies (61 rules, 8 gates, verified row by row) now ship in chwezi-dev-engine, chwezi-development-engine and chwezi-writing-engine, each working without this repository.
- Product Excellence Standard 1.0.0 to 1.0.1 (patch): a cross-reference to the companion standard; no rule, gate, threshold or weight changed.
- Wiring: AGENTS hard rule, design-doctrine map row, design-quality-gate section, PX skill and data-trust pointers, one reference line in `dashboard-and-data-product-design`, `chart-selection-and-encoding`, `data-visualization`, `money-figures-and-statement-display`, `docx-report-and-document-formatting` and `print-production-and-finishing`; two routing fixtures and one owned negative; README section and task row; skill catalogue row; plugin manifest (entry added by hand because the generator refuses on this checkout's ignored-folder count); counts, quality baseline and test pins 105 to 106.
- Checks on 2026-11-08: `validate_engine.py` 106 of 106 compliant, portability 0 (checkout file count 6,514 over the 5,000 limit from ignored local folders, as before; package 2,055); `routing_smoke_test.py` 100 fixtures, precision@1 93% (unchanged), precision@3 100%, owned negatives 52/52; fixture lint 0; `pytest` 196 passed.
- Record: `docs/kaizen/2026-11-reporting-standard/README.md`.

## [2026-11-08] - Chwezi Product Excellence Standard (binding for all Chwezi apps)

- New binding doctrine `doctrine/product-excellence-standard.md` (version 1.0.0, effective 01 November 2026 until further communication; adopted by Lead Developer Peter Bamuhigire and the Chwezi Core Systems design team): scope, MUST/SHOULD/MAY, precedence ladder, 13 hard release gates, release decision, owner defaults, platform baseline, change control.
- New skill `skills/00-cross-cutting-ops-qa-a11y/chwezi-product-excellence-standard/`: 236 rules with stable IDs (189 MUST, 47 SHOULD) plus 13 gates, 20 principles, scorecard and sign-off charter, foundations, offline and low-end performance, data trust, accessibility/privacy/localisation, 16 screen blueprints, 16 component contracts, 50 anonymised pattern dossiers in 11 families, product profiles, agent protocol, anti-pattern blacklist, currentness register, machine-readable policy and a worked POS checkout review.
- Release rule harmonised across doctrine, skill, catalogue (PX-SCORE-002), scorecard and policy: PASS = score >= 85, zero open gates, no dimension below 2; a dimension at 1 caps at CONDITIONAL; 70-84 with owned, dated remediation and written acceptance by product owner and Lead Developer = CONDITIONAL; < 70, a dimension at 0 or any open gate = BLOCKED; an unmeasured applicable gate counts as open.
- Contiguous document numbering (PX-DATA-013) is now hard gate PX-GATE-13 wherever a screen issues numbered documents.
- House style: semantic status roles `success`, `warning`, `danger`, `info`, `neutral` (warning, info and neutral values proposed, contrast computed, owner to confirm); "KPI tile" maps to `KpiCard`; card radius note (house values win over the source's 12-20 dp).
- Money figures: full amounts take decimals from the ISO 4217 minor unit (UGX and RWF 0, KES and USD 2), replacing "always two decimals"; compact K/M/B unchanged.
- Wiring: AGENTS.md hard rule, design-doctrine map row, design-quality-gate section, two routing fixtures with two owned negatives, cross-reference lines in 13 neighbour skills, plugin manifest, skill catalogue, README counts and one task row, quality baseline and test pins 104 to 105; standards register DGN-010 refreshed (Compose Material 3 1.5.0-rc01, 4 Nov 2026; stable 1.4.0) and DGN-014 added.
- Record: `docs/kaizen/2026-11-product-excellence-standard/README.md`.

## [2026-11-07] - Business-app house style

- New skill `skills/09-design-systems-tokens-and-theming/chwezi-business-app-house-style/`: colour roles with measured contrast, type pair, spacing and shape scales, component catalogue (context strip, hub menu card, KPI tile, hero card, highlight tile, insight line, period navigator, button order), motion and guardrail tests. Worked example of a new app whose green brand had to be darkened (3.20:1 to 5.30:1) and kept apart from money green; reference token pack, light and dark, 0 validator findings.
- New skill `skills/12-data-viz-and-dashboards/money-figures-and-statement-display/`: full, compact and axis forms with boundary tests, hero figure, percentages ("less than 1%"), statement, trial balance, financial position, profit or loss and monthly summary layouts; worked monthly summary.
- New reference `iconography-system-design/references/illustrated-menu-icons.md`: where illustrated icons belong, one family per app, no tint or disc, licence register (blocking).
- One cross-reference line each in `fintech-and-financial-product-ui`, `dashboard-and-data-product-design`, `android-ui-ux-design`, `pos-and-retail-operations` and `iconography-system-design`; three routing fixtures; plugin manifest, skill catalogue, README and AGENTS counts 102 to 104; quality baseline raised to 104 of 104 (`tests/test_route_existence.py` pins updated).
- Audit record: `docs/kaizen/2026-11-app-house-style/README.md` (kept K1-K19, rejected R1-R11, probation P1-P2, not assessed).

## [2026-11-06] - Banned-font gate: quoted names count only as font use (DG6)

- `hooks/lib/font-matcher.js` (`0398cdf`, `afbce48`): `findBannedQuotedLiterals` reports a quoted family name only where it is used as a font (a font-named key, property or constant, a literal inside a font-named call, object or list, a run-font attribute, an HTML font face). A script that quotes the model-adaptation term LoRA no longer exits 2. The CSS, script-stack and diagram checks, the ban list and the exemption globs are unchanged; no path exemption.
- `hooks/test-banned-font-gate.js`: 86 tests added, 131 in all. The 64 real-assignment cases pass on the original code too, so the narrowing loses none of them. A bounded search keeps a 1.3 MB one-line file under 2 seconds, where the original took over 120.
- README "Validation": the hook test count and a note on the 2026-11-06 re-run of every table command except the cross-engine check; all exit 0. Record: `docs/kaizen/dg6-banned-font-gate-context-2026-11-06.md`.
- `hooks/test-banned-font-gate.js`: ten inline slop-detector waivers (`banned-primary-font`, one above each of the ten pre-existing fixture lines the Stop hook flagged), each with a `<who>: <evidence>` reason. Detector on the file: 10 findings before, 0 findings and 10 waived after, 10 findings again with `--no-waivers`. See the record's section on waivers.
- Open: `website-skills` carries a registered byte copy of `hooks/lib/font-matcher.js` that now differs until it is re-vendored.

## [2026-10-31] - Documentation wave

Documents only; no skill, script, test, doctrine or detector change. Every number below was measured on 2026-10-31.

- README (`1d3e3ea`): added a "Validation" section (every check with `python3` commands, dependencies, results and what needs extra tools), a description of the design token validator with the unresolved `tokens-from-pack.json` result (17 findings on the default profile, 14 with `--profile generic`), a "Quality and improvement" section (latest published score, open findings, date-triggered calendar), the 51-rule detector count, the repository-name note and the rendered-font gate. The skill tables were checked against the 102 skills on disk.
- AGENTS.md (`2e57350`): corrected the active-skill count from 101 to 102, switched commands to `python3`, replaced short sibling names with current repository names, added a pointer to the improvement records. The three portfolio-managed router sentences were not edited; the shared renderer proposed no change and a second run changed nothing.
- `docs/README.md` (`651cee1`): new index of working documents, improvement records, audits and plans. `docs/RESUME.md` (`f92cc39`): current state refreshed (102 skills, 94 routing fixtures, 51 rules, 196 tests, the 60.3 raw score), the 22 June self-assessed 81/100 marked as not comparable.
- CONTRIBUTING (`0a5e0fc`): adding a skill also needs a regenerated plugin manifest and updated counts (a scratch copy with a 103rd skill failed `--check` and the pinned-count test); full check list and the portability rule added.
- `fonts/README.md` (`780e087`): Linux and macOS form of the category folder setup. `integration/integration-plan.md` (`9429c5a`): consumer table replaced with the measured state (11 sibling engines carry the identical `v4` block in `AGENTS.md`, none in `CLAUDE.md`).
- `docs/kaizen/2026-10-engine-kaizen-pass-2/07-docs-followups.md` (`f9cf605`): twelve items that need a script, test, doctrine, dated-record or other-repository change.
- README (`e07fe86`): the subsection "What the October 2026 kaizen improved" under "Quality and improvement" gives the account of the kept changes, with commit, check and before and after figures for each. The entries below stay the short list of what changed; the README section marks each figure as re-run on 2026-10-31 or recorded from the evidence files.
- README restructure (branch `kaizen/2026-10-readme-kaizen`; record in `docs/kaizen/2026-10-readme-kaizen/readme-kaizen-record.md`): added a front door ("At a glance", "Start here" with three commands), a contents list, a 12-row task-to-skill table, "What it does not cover" and "Contributing, author and licence"; rewrote the text in shorter sentences with nested evidence bullets; split the October account into two H2 sections, "What the October 2026 kaizen improved" and "What the October 2026 kaizen added" (the entry for `e07fe86` above still calls it a subsection of "Quality and improvement"). Measured: words 8,666 to 5,832, longest section 2,462 to 1,154 words, lines over 300 characters 41 to 6, first command at line 22. No score is published.
- Moved the 102-row skill table to `docs/skill-catalogue.md` (each name now links to its `SKILL.md`) and the 162-entry reference list to `docs/references.md`; the validation table and the font doctrine stayed in the README. `CONTRIBUTING.md` and `docs/README.md` were updated to name the new pages.
- Corrected a README command: `bash install.sh --scope project` replaces `./install.sh --scope project`, because `install.sh` is committed as mode 100644 and `./install.sh` fails with "Permission denied" in a fresh clone (verified in a scratch clone). The file mode itself is unchanged and is logged in the record for the next cycle. The duration "38 s" was dropped from the pytest result (a re-run took 29.7 s). Every other number, command, link and commit hash was kept, and all 24 validator runs exit 0 before and after.

Pass-2 commits by theme (descriptions are in the entry below): hygiene and portability gate `b6ab99e`, `0e23a7b`; rendered-output font gate `9bc10bd`; token validation `aca491a`, `355be12`; detector rules `7582bbf`; cross-engine workspace map `285658f`; legal-sector workflow `918dce0`; routing fixtures `2332e14`; source register `7340dfa`; pytest collection `39ec352`; frozen baseline, backlog and closing records `c9f4602`, `075100b`, `72a3a37`.

## [2026-10-31] - Portfolio Kaizen, pass 2

- Removed local download paths, a user name and acquisition-site file names from the premium-ui-ux-design source register, two skills and a hook comment; replaced web-root paths in the router and integration records and three links into sibling checkouts with repository identifiers.
- Added `scripts/validate_portability.py` and `governance/portability-allowlist.json` (reasons per entry, ratchets that only shrink); run by `validate_engine.py` and CI.
- Added a rendered-output font gate (`hooks/lib/rendered-font-names.js`, `scripts/check-rendered-fonts.js`): PostScript names in a PDF are checked against the banned-font doctrine; exit codes for banned, fallback-only and unembedded fonts; a missing `pdffonts` is `NOT_ASSESSED`.
- Token validation: `validate_token_example.py` gains a generic profile, Design Tokens 2025.10 value-shape checks and recomputation of every stated contrast ratio; both example token files migrated to the 2025.10 shapes, their figures recomputed, and the second brand's primary pair repaired (it documented 5.2:1 and measured 3.4:1).
- Detector: new browser rule `target-size-minimum` (WCAG 2.5.8) and static rule `positive-tabindex` (WCAG 2.4.3); 51 rules. The vendored copy in website-skills is out of step until it syncs.
- Cross-engine route validation accepts `--map`, `--workspace-map` and `CHWEZI_WORKSPACE_MAP` for renamed checkouts.
- Replaced the generic workflow in `legal-sector-ui-ux`; added routing fixtures for ten skills (coverage 1 to 11 of 102).
- Re-verified the standards source register on 2026-10-31 and corrected the Compose Material 3 row (stable 1.4.0 is dated 24 September 2025); ISO 14289-2, the EUR-Lex text and the Material guidance site stay `NOT_ASSESSED`.
- Added `tests/conftest.py` so scripts import under pytest collection.

## [2026-10] - Portfolio Kaizen

- Added a routed diagram-design and handoff skill with a worked specification and routing fixtures.
- Updated the standards source register from official sources checked 2026-10-29, corrected the ISO 14289-2 URL, and named the Design Tokens Format Module 2025.10 with its report status and limits.
- Replaced machine-specific checkout locations in active skill guidance with portable engine identifiers.
- Added a 5,000-file-entry guard to engine validation, the clone installer, and plugin-manifest generation, with checkout and package-tree modes.
- Recorded practitioner-task render evidence and verified actual Public Sans and Source Serif 4 font loading and PDF embedding in temporary output; this does not establish PDF/UA conformance.

## [2026-09-29] - Repository renamed to chwezi-design-engine

- The GitHub repository and local folder `design-system-skills` are now `chwezi-design-engine`
  (https://github.com/peterbamuhigire/chwezi-design-engine). Engine id, display name, README,
  manifest, installers and cross-engine links follow the new name.
- Claude Code plugin renamed: marketplace `chwezi-design-system` is now `chwezi-design-engine` and
  plugin `design-system` is now `design-engine` (`/plugin install design-engine@chwezi-design-engine`).
- The cross-cutting design trigger block marker is now `<!-- chwezi-design-engine:trigger v4 -->`
  (closing `<!-- /chwezi-design-engine:trigger -->`); every engine `AGENTS.md` copy was updated.
- Cross-engine skill references use the `chwezi-design-engine:<skill>` prefix.
- Dated records (audits, Kaizen logs, plans, evidence) keep the old name as written.
