# Changelog - Chwezi Design Engine

All notable changes to this engine are recorded here. Earlier changes are recorded in
`docs/continuous-improvement/`, `docs/audits/` and the Git history.

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
