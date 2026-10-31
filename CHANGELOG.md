# Changelog - Chwezi Design Engine

All notable changes to this engine are recorded here. Earlier changes are recorded in
`docs/continuous-improvement/`, `docs/audits/` and the Git history.

## [2026-10-31] - Documentation wave

Documents only; no skill, script, test, doctrine or detector change. Every number below was measured on 2026-10-31.

- README (`1d3e3ea`): added a "Validation" section (every check with `python3` commands, dependencies, results and what needs extra tools), a description of the design token validator with the unresolved `tokens-from-pack.json` result (17 findings on the default profile, 14 with `--profile generic`), a "Quality and improvement" section (latest published score, open findings, date-triggered calendar), the 51-rule detector count, the repository-name note and the rendered-font gate. The skill tables were checked against the 102 skills on disk.
- AGENTS.md (`2e57350`): corrected the active-skill count from 101 to 102, switched commands to `python3`, replaced short sibling names with current repository names, added a pointer to the improvement records. The three portfolio-managed router sentences were not edited; the shared renderer proposed no change and a second run changed nothing.
- `docs/README.md` (`651cee1`): new index of working documents, improvement records, audits and plans. `docs/RESUME.md` (`f92cc39`): current state refreshed (102 skills, 94 routing fixtures, 51 rules, 196 tests, the 60.3 raw score), the 22 June self-assessed 81/100 marked as not comparable.
- CONTRIBUTING (`0a5e0fc`): adding a skill also needs a regenerated plugin manifest and updated counts (a scratch copy with a 103rd skill failed `--check` and the pinned-count test); full check list and the portability rule added.
- `fonts/README.md` (`780e087`): Linux and macOS form of the category folder setup. `integration/integration-plan.md` (`9429c5a`): consumer table replaced with the measured state (11 sibling engines carry the identical `v4` block in `AGENTS.md`, none in `CLAUDE.md`).
- `docs/kaizen/2026-10-engine-kaizen-pass-2/07-docs-followups.md` (`f9cf605`): twelve items that need a script, test, doctrine, dated-record or other-repository change.

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
