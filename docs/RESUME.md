# RESUME / Status - where to pick up (updated 2026-10-31)

Single source of truth for "what's done / what's next" on chwezi-design-engine.
(Supersedes `RESUME-2026-06-21.md`, which is historical.)

## Current state

- **102 active skills across 16 groups (15 domain groups plus cross-cutting), all 102 contract-compliant and all 102 shipping at least one worked example** (measured 2026-10-31: `validate_engine.py` reports 102 of 102 compliant; a file count finds an `examples/` file under every skill).
- The zero-debt conformance baseline is enforced in CI. 94 routing fixtures give precision@1 95% and precision@3 100%, with 46 of 46 owned negatives; this is a lexical proxy, not live routing. 11 of the 102 skills meet the Portfolio Kaizen Standard's three-positive, two-negative fixture rule.
- The `chwezi-slop` detector has 51 rules (43 static, 8 browser); the pytest suite has 196 tests and passes. The README "Validation" section lists every check and what it needs.
- Latest published score: raw 60.3 out of 100, published `min(raw, 65)` = 60.3 (pass 2, 2026-10-31); 59.0 raw on 2026-10-29. Evidence: `docs/kaizen/2026-10-engine-kaizen-pass-2/` and `docs/kaizen/2026-10-engine-kaizen/`. The target is 95 and is not met.
- 2026-09-24 Kaizen: book-study notes removed; `scripts/validate_engine.py` now fails on any stored
  or cited book extraction (guard tested in `tests/test_book_extraction_guard.py`); WCAG and Apple
  HIG claims re-verified against w3.org and developer.apple.com (APCA is no longer described as the
  WCAG 3 method; SF Symbols named by iOS 27 generation); the design quality gate now separates
  `HEURISTIC` from `MEASURED` evidence and covers state, keyboard, screen-reader, motion and reflow
  checks; design-handoff routes to `chwezi-sdlc-documentation` and `chwezi-dev-engine` are fixture-checked.
- The older 81/100 design-readiness score (progression 51 -> about 67 -> about 73 -> 80 -> 81) is the self re-audit of 22 June 2026 in `docs/audits/post-v2-plan/`: self-assessed, with no measured constraint and no strictness cap. The 2026-09-29 re-audit records it as not comparable with later scores; it is equally not comparable with the October scores above.
- Audit history: `docs/audits/2026-09-29-m10-reaudit/` (published 57.1), then the two October kaizen cycles above. `docs/README.md` indexes every record.

## Done

- Phase 0: taxonomy, standards refs, examples convention, deck/brand de-dup.
- Phase 1: 23 P0 skills plus P0-ten hardening.
- Examples backfill: all active skills ship a worked example.
- `product-design-audit` skill: audits a real product across web, SaaS, iOS/Mac/iPad/iPhone,
  Android, and desktop; routes findings to the skill that fixes each issue.
- 8-category intent-based font taxonomy reconciled: folders, manifests, and doctrine.
- Critical study of 20 UI/UX books: study notes retired 2026-09-24; methods now live in skills and references (see the Kaizen ledger).
- v2 plan executed: Track A doctrine refs and inoculation notes; Track B new skills; Track C
  changes; Track D full P1 wave.
- The two cheapest post-v2 fixes landed:
  - reauthored the old boilerplate `SKILL.md` heads;
  - split overloaded group 04 into focused group 04 plus new
    `14-conversion-and-web-page-patterns`; moved email to group 13.
- Fresh current re-audit completed and replaced `docs/audits/post-v2-plan/`.
- The July cleanup pass closed the measured `Evidence Produced` section blocker. Wave 1 adds a
  route-existence fixture for repaired local paths; cross-engine references remain owned by their
  originating engine.
- Added `slop-doctrine-refresh-and-research-loop`, a living AI-slop self-review skill wired to
  the digital-research engine's source-evaluation discipline.
- Added RN/Expo implementation-readiness gates to `cross-platform-design-parity`, using the local
  React Native book as historical pattern input and current RN/Expo docs as the version-sensitive
  source of truth.
- The July 2026 normalisation covered 82 active skills; the current 102-skill catalogue retains the
  portable contract with neighbour-aware triggers,
  input/output contracts, decision rules, capability boundaries, degraded mode, stop/recovery
  behaviour, evidence, acceptance conditions, and five concrete anti-patterns.
- Added `governance/skill-authoring-standard.md`, a rebuilt `_TEMPLATE`, local validation and
  routing scripts, 54 routing fixtures, a zero-debt baseline, and GitHub Actions enforcement.
- Reduced `data-visualization/SKILL.md` below the 500-line limit through a linked reference while
  retaining routing, workflow, decisions, and safety in the entrypoint.

## Next

The prioritised open findings, with the acceptance evidence each needs, are in `docs/kaizen/2026-10-engine-kaizen-pass-2/06-next-cycle.md`. The list below is the older capability roadmap.

Skill-contract repair is complete. Remaining work is capability expansion:

1. **Build P2 differentiators only where they improve output readiness:**
   3D/WebGL, scroll/page transitions, print/production layout, multi-brand theming/governance,
   public-sector/education UX, sustainability, advanced analytical exhibits.
2. **Resolve the two structural ceilings:**
   - **Specs-not-render wall:** the engine specifies artifacts but does not execute a render
     pipeline for DOCX/PDF/PPTX/XLSX/email/front-end output.
   - **Cross-platform mobile floor:** React Native/Expo handoff is stronger now, but Flutter
     implementation depth and full app-build ownership remain outside the design engine.

## Working method that worked

Parallel specialist passes, strict top-0.1% rubric, no banned fonts, real worked examples, no lorem,
and orchestrator-owned shared-file edits. Watch for shared-file write races when using parallel
agents.

For catalogue maintenance, run:

```bash
python3 -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json
python3 -X utf8 scripts/routing_smoke_test.py
```

The full list of checks is in the repository `README.md` under "Validation".
