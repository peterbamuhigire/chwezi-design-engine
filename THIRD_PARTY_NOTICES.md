# Third-Party Notices

This engine is MIT-licensed (see `LICENSE`). The notices below record third-party ideas that
shaped parts of it.

## Impeccable

Rule ideas and numeric thresholds adapted in paraphrase from Impeccable,
https://github.com/pbakaus/impeccable, Copyright 2025 Paul Bakaus, Apache-2.0, commit 114ea1d.
No source code or fixture files were copied.

Where this applies:

- `tools/slop-detector/` (`chwezi-slop`): the rule registry, the static and browser checks, the
  waiver model and the hook tiers. Every registry row that draws on Impeccable cites
  `impeccable@114ea1d:<rule>` in `authority.ban_evidence` and names the licence and commit in
  `provenance`.
- `doctrine/references/ai-slop-banned-fonts.md` and the font watchlist record: Impeccable's font
  lists are used as evidence for bans only, never as approvals.

Impeccable's `NOTICE` file covers files derived from third-party iOS and Android material. None
of those files, and no other Impeccable file, is included here.

## M10-10 adoptions (29 September 2026)

Ideas below were adapted in paraphrase. No source code, data rows, palettes, font pairings or
fixture files were copied from any of these projects. None of them is an authority for a design
approval; approvals trace to human authorities under the design-authority rule.

- **UI UX Pro Max** (nextlevelbuilder/ui-ux-pro-max-skill, MIT,
  https://github.com/nextlevelbuilder/ui-ux-pro-max-skill, commit 09170ee): the BM25 ranking with
  per-domain abstention floors, versioned calibration, the graded relevance harness with
  calibration and held-out splits, and the catalogue query contract, as used in
  `engine/design_engine/`, `data/retrieval-calibration.json`, `tests/eval_catalog_relevance.py` and
  `scripts/design_query.py`. Its font, palette and style data is not reused (see
  `docs/continuous-improvement/design-catalog-provenance-2026-09-29.md`).
- **Impeccable** (pbakaus/impeccable, Apache-2.0, https://github.com/pbakaus/impeccable,
  commit 114ea1d): the visitor-mode framing (`doctrine/references/visitor-modes.md`, mode enum in
  `engine/design_engine/decisions.py`) and the refinement-verb framing
  (`skills/00-cross-cutting-ops-qa-a11y/design-critique-and-review-facilitation/references/refinement-verbs.md`).
- **Ponytail** (DietrichGebert/ponytail, MIT, https://github.com/DietrichGebert/ponytail,
  commit e3ba2aa): the native-control sufficiency framing
  (`skills/00-cross-cutting-ops-qa-a11y/accessibility-wcag-2-2-compliance/references/native-control-sufficiency.md`).
- **Understand Anything** (Egonex-AI/Understand-Anything, MIT,
  https://github.com/Egonex-AI/Understand-Anything, commit b05cc3b): the "graphs that teach"
  problem framing
  (`skills/12-data-viz-and-dashboards/data-visualization/references/relationship-diagrams-that-teach.md`);
  every recommendation there cites human information-design authorities.
- **anydesign** (uxKero/anydesign, MIT, https://github.com/uxKero/anydesign, commit d81bd89): the
  capture-budget and element-scope ideas in
  `skills/09-design-systems-tokens-and-theming/measured-style-pack/SKILL.md`.
