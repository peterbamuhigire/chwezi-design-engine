# Documentation index

This folder holds the engine's working documents and its dated records. The repository root documents (`README.md`, `AGENTS.md`, `CLAUDE.md`, `CHANGELOG.md`, `CONTRIBUTING.md`) describe the engine as it is now. The records below describe what was found and decided on a given date, and they are not rewritten afterwards: they keep the names, counts and paths that were true when they were written. The portability allowlist (`governance/portability-allowlist.json`) lists the historical records that still hold old paths, with a ratchet that can only shrink. The counts in this index were measured on 2026-10-31.

## Working documents

| Document | Use |
|---|---|
| [`RESUME.md`](RESUME.md) | Where to pick up: current state, what is done and what is next |
| [`approval-enforcement.md`](approval-enforcement.md) and [`approval-adapter.json`](approval-adapter.json) | The design approval checkpoint and its machine-readable adapter |
| [`control-plane-adoption.md`](control-plane-adoption.md) | How this engine meets the shared control-plane contract |
| [`ai-prompting/domain-prompt-compilation-contract.md`](ai-prompting/domain-prompt-compilation-contract.md) | The contract for handing a visual prompt to another tool or agent |

## Improvement records

| Record | Date | Contents |
|---|---|---|
| [`kaizen/2026-10-engine-kaizen-pass-2/`](kaizen/2026-10-engine-kaizen-pass-2/) | 2026-10-31 | Seven files: scope and evidence, baseline scorecard, backlog, experiment log, validation record, final report, next-cycle record. Closed at a raw 60.3 out of 100 |
| [`kaizen/2026-10-engine-kaizen/`](kaizen/2026-10-engine-kaizen/) | 2026-10-29 | The same seven files for the first October cycle. Closed at a raw 59.0, published 45.0 under that cycle's stricter cap |
| [`kaizen/`](kaizen/) (seven single files) | 2026-09 | Phase 1 and first-wave evidence packs and one booking fixture, from September 2026 |
| [`continuous-improvement/`](continuous-improvement/) | 2026-08 to 2026-10 | Ten records: kaizen waves, book-driven and purpose-fit passes, the design catalogue provenance note, and the font watchlist refresh (re-check due 2026-12-29) |

## Audits and plans

| Folder | Date | Contents |
|---|---|---|
| [`audits/2026-09-29-m10-reaudit/`](audits/2026-09-29-m10-reaudit/) | 2026-09-29 | Measured re-audit; published 57.1 out of 100 ([summary](audits/2026-09-29-m10-reaudit/README.md)) |
| [`audits/post-v2-plan/`](audits/post-v2-plan/) and [`audits/post-phase-1/`](audits/post-phase-1/) | 2026-06-21 and 2026-06-22 | Early re-audits, scored on a different rubric from the October records |
| [`audits/`](audits/) (three single files) | 2026-07 and 2026-09 | Two September kaizen reviews and the game visual experience route record |
| [`initial-analysis/`](initial-analysis/) | 2026-06-21 | The first audit, scored 51 out of 100 ([index](initial-analysis/README.md)) |
| [`engine-upgrade-july-2026/`](engine-upgrade-july-2026/) | 2026-07 | Upgrade discovery, scorecard, backlog, roadmap and the skill-standard conformance record |
| [`plans/hardening-june/`](plans/hardening-june/) | 2026-06 | The hardening plan and the examples backfill tracker ([plan](plans/hardening-june/README.md)) |

Scores from different rubrics are not comparable. The October records use the Portfolio Kaizen Standard's ten dimensions and the cap `min(raw, 65)`; the latest published figure and the open findings are summarised in the repository `README.md` under "Quality and improvement".
