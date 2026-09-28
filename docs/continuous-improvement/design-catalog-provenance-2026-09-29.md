# Design catalogue provenance record — 29 September 2026

**Record ID:** UX-15 (my-10-kaizen, phase M10-00, task T07)
**Scope:** `engine/design_engine/catalog.py` and the offline catalogue runtime introduced by commit `02aa6c9` (20 September 2026, "Run book-informed design engine kaizen", authored by Peter Bamuhigire).

## Position

PROVENANCE: UNDETERMINED — attributed defensively.

Whether the 20 September catalogue runtime was modelled on the UI UX Pro Max interface could not be established from the repository history, and no engine file names that project. The observed correspondence is recorded as **convergent with nextlevelbuilder/ui-ux-pro-max-skill**, and attribution is added here as a precaution:

> Catalogue domain and stack vocabulary: convergent with nextlevelbuilder/ui-ux-pro-max-skill (MIT, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, interface as observed at commit `09170eec67eefd46a7ae85de61b40c194020f997`).

This position was taken by the orchestrator under Peter Bamuhigire's delegated authority on 29 September 2026. The phase plan offered two statements (an interface borrowing, or independent design); because neither could be verified, the plan's third, risk-register option (undetermined, attributed defensively) was chosen. Peter may later replace it with a firmer statement; any change is a new dated entry, never an edit to this one.

## Evidence

- `engine/design_engine/catalog.py` defines a `DOMAINS` tuple of 12 names (`product`, `style`, `typography`, `color`, `landing`, `chart`, `ux`, `icons`, `react`, `web`, `google-fonts`, `gsap`) and a `STACKS` tuple of 22 names (from `html-tailwind` to `uno`, including `wpf`, `winui`, `avalonia`, `javafx` and `laravel`).
- The my-10-kaizen report on UI UX Pro Max (`my-10-kaizen/01-repo-reports/03-ui-ux-pro-max.md`, §5.1) found that both tuples match that project's 12 search domains and 22 stacks exactly, at the inspected commit above.
- A case-insensitive search of this repository for `ui-ux-pro-max`, `uupm` and `nextlevelbuilder` on 29 September 2026 found no earlier mention.
- Licence of the upstream project: MIT ("Copyright (c) 2024 Next Level Builder").

## What is and is not reused

- UI UX Pro Max is **not installed** in this engine or on the host for engine work (disposition D5, `chwezi-engine-agents/docs/operations/third-party-tool-dispositions-2026-09-29.md`).
- **None of its data is reused.** No font pairing, palette, style, chart or UX-guideline row has been imported, and none may be: 23 of its 74 font pairings (31 %) use faces this engine bans, and none of its rows cites a human typographic authority.
- Only the domain and stack names above correspond. The catalogue is to be filled with human-sourced records (M10-10); the upstream project remains an evidence source for bans only, under the design-authority rule.

## Review

- **Review by:** M10-10 (catalogue data work), which governs the attribution line carried in catalogue documentation.
- **Reversal trigger:** Peter states a firmer provenance (interface followed, or independent design); record it as a new dated entry below.
