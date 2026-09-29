# 01 — Methodology and Rubric

## Auditor independence

This audit was carried out by an independent auditor who executed no my-10-kaizen phase and made no
change to the engine. It grades the engine as committed at HEAD `25ce1e6` on 29 September 2026. The only
files written are those in this folder. No git state was changed; no paid API, `claude -p` or
model-executed evaluation was used.

## Method

The engine's own audit skill was followed:
`C:\wamp64\www\chwezi-dev-engine\skills\sdlc-meta\skill-engine-audit\SKILL.md` with
`references/scoring-rubric.md` (including "Engine Eval Readiness (measured)"),
`references/eval-readiness-worked-example.md`, `references/audit-dimensions.md` and
`references/report-structure.md`.

1. **Harness first.** The seven validators named in the brief were run in the engine root with
   `PYTHONDONTWRITEBYTECODE=1`; four further free local checks were added (cross-engine routes,
   delivery evidence, route existence, catalogue relevance) plus the portfolio fan-in script. Commands,
   exit codes and output are in `11-measured-evidence.md`.
2. **Readiness recomputed** from the stored M10-14 inputs and checked against the auditor's own smoke-test
   run. Discovery & routing takes the Readiness value; it was not re-judged.
3. **Scope.** Router (`AGENTS.md`, `CLAUDE.md`, `README.md`), doctrine and its reference list, governance
   (`standards-source-register.md`), and an inventory of all 101 skills (lines, references, examples,
   byte warnings, fan-in, collisions).
4. **Sampling.** Fifteen SKILL.md files from twelve groups were read (listed in
   `03-existing-groups-audit.md`), with their examples or references where a claim depended on them.
   Targeted greps covered boilerplate, legacy parking and standards terms.
5. **Scoring** against the fixed rubric, each score labelled measured, judged or NOT_ASSESSED.
6. **Comparison** with `docs/initial-analysis/` (51, 21 June 2026), the author-run
   `docs/audits/post-v2-plan/` (81, 22 June 2026) and `docs/audits/2026-09-06-kaizen.md` (overall
   NOT_ASSESSED). Prior scores were read for movement only and not copied.

**Documented limitation: no parallel fleet.** The skill prescribes a parallel fleet of audit agents, one
per concern. Here a single auditor worked through each concern in turn (standards, existing skills,
taxonomy, output types, hardening). Scores were therefore not formed independently of one another, and
the standards benchmark, hardening plan and reading list were not re-run.

## Rubric

Bar: the top 0.1 % of design practice. Bands: 90–100 rivals the field's best; 75–89 excellent; 60–74
solid but visibly short; 40–59 competent with major gaps; below 40 skeletal. Default 45–65. Any score of
70 or above needs an "Extraordinary justification" paragraph naming concrete evidence. None was awarded.

## Weighting and the three numbers

| Bucket | Weight | Source |
|---|---:|---|
| Output-type readiness | 30 % | mean of 12 output types |
| Skill depth & worked examples | 25 % | mean of dimensions 3 and 4 |
| Standards currency | 15 % | dimension 5 |
| Taxonomy & structure | 10 % | dimension 2 |
| Doctrine & philosophy | 10 % | dimension 1 |
| Hygiene | 10 % | mean of redundancy (9), discovery/routing (10), safety (11) |

- **Raw**: routing third of hygiene uses the auditor's judged routing score (60).
- **Measured-constrained**: routing replaced by Engine Eval Readiness (59.4).
- **Published**: `min(measured-constrained, 65)`, because the portfolio craft standard's acceptance
  evidence does not exist for this engine.

Readiness formula: `30 × T1 + 40 × mean(T2_p1, T2_neg, T2_cov, T2_clean) + 30 × T3`, with
`NOT_ASSESSED` = 0 kept in the denominator.

## Limitations

- Tier 3 is unexecuted (zero-spend); Readiness cannot exceed 70.
- T2 is lexical (TF-IDF cosine and BM25), a drift guard rather than proof of live routing.
- Standards currency is **judged from the engine's own currentness records (no fresh external
  research)**. Where this report notes an absent standard (for example EN 301 549), it records the
  absence in the engine; it does not re-verify the standard's current status.
- The detector's browser tier, device renders, screen-reader runs and print proofs were not exercised.
- The installers were not reviewed line by line.
