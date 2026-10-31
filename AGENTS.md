# AGENTS.md — chwezi-design-engine

## Codex-only model setup and Kaizen review

Apply this section only when the active runner is Codex. Claude and other
runners must skip it and retain their own models and full engine capabilities.

Before substantive Codex work, resolve this engine's directory and an available
Python 3.11+ interpreter (use its absolute path if absent from PATH), then run
`python <engine-root>/.codex/ensure_model_policy.py --runtime codex --check`.
If it reports configuration drift, Peter authorises the bounded
`--runtime codex --apply` repair, followed by `--check`. The helper backs up
changes and preserves unrelated settings. If Python or configuration access is
unavailable, report the limitation; do not replace the user's config wholesale.
Read `.codex/model-policy.md` for the full contract. Use Luna (`gpt-6-luna`) with high reasoning by
default for orchestration, research, audit, review, and implementation. Use Astra (`gpt-6-astra`) only when
Peter explicitly selects it for the task; never select or fall back to GPT-5.6. Report unavailable required GPT-6
models. A running session may need restarting for root settings to apply.


Every Kaizen cycle MUST check latest official model releases and actual
runtime availability, record dated evidence and a retain/change decision,
and evaluate better candidates before recommending replacement. Preserve the
pins until Peter authorises a verified change. Missing model-currentness
evidence is `NOT_ASSESSED`. This Codex adapter must not change CLAUDE.md,
Claude configuration, domain doctrine, permission settings or skill access.

## Universal agent integration

See `.skills-engine/engine-manifest.yaml` for the declarative contract used by the optional universal coordination package. The router and domain SKILL.md files remain authoritative.

The package may read the router, discover skills, inspect Git, and run only declared checks. Missing evidence is NOT ASSESSED; writes, pulls, publication, submissions, ledger/filing changes, deployment, or control changes require explicit approval.

Project context: if the working project root holds a `PROJECT.md` with `project_schema: 1`, read it before planning. It points to this engine's own context sources and never replaces them.

## Never store book extractions

Book extractions, book summaries and chapter-by-chapter notes must never be stored in this
repository (no `book-extractions/` or `docs/book-study/` folder, no `*-extraction.md` files). Keeping them infringes
copyright. Knowledge from purchased books enters only as paraphrased, task-oriented skill content
and `references/` files (procedures, checklists, decision rules, templates) with a short citation
(Author (Year) *Title*, Publisher). Verbatim quotations stay rare and under 25 words. Staging
notes live outside the repository and are never linked from skills. `scripts/validate_engine.py`
fails if an extraction folder exists or a file under skills/, doctrine/ or docs/ links to one; plan and audit documents may name books but not store their content.

## References are task guides, not book digests

A `references/` file must be organised around the task it supports (inputs, decision rules,
procedures, pattern tables, original worked examples) and should synthesise more than one source
where more than one exists. It must not be a single-book digest: no chapter-numbered headings, no
catalogue reproduced in a book's own sequence, no book examples or case studies, no "key mantras"
lists, and no more than one brief attributed quotation. Cite sources in a short line (Author,
*Title*). Replace book examples with original, preferably localised, examples.

## Rules

Always-on cross-cutting principles live in `rules/` — see `rules/README.md`.
Load `rules/common/core.md` alongside the routed skill for any non-trivial task;
it is short and does not replace the skill, only sets the baseline the skill
operates within.

## Mandatory Digital Research currentness gate for Kaizen

Every Kaizen audit, skill edit, reference update, validator change, and
standardisation decision MUST begin with the Digital Research Engine (resolve its checkout through the
active engine-routing table or the workspace map; never hard-code a path). Read its `source-evaluation` and
`source-verification` skills and the currentness gate reference
`docs/continuous-improvement/kaizen-currentness-gate.md`.

Before admitting any standard, policy, law, technology, platform capability,
software version, command, security control, benchmark, or lifecycle claim,
record source scope, publication/version date, access date, freshness class,
review date, support status, and uncertainty. Use current authoritative
primary sources; quarantine stale/ambiguous/unsupported claims and mark them
`NOT_ASSESSED`. Books are durable concept inputs only.

The shared control plane is adapted to visual and document work in
[`docs/control-plane-adoption.md`](docs/control-plane-adoption.md); the central
registry is `docs/engine-control-plane.json` in the chwezi-dev-engine repository (resolve the checkout through the workspace map).

Cross-cutting design & typography engine. Compatible with Claude Code and Codex-style agents.
This file is the single runner-neutral router and doctrine for the engine; `CLAUDE.md` is a thin bridge that imports it (portfolio bridge contract, M10-02).

## Protocol

1. **Entry:** read `doctrine/design-doctrine.md` first (anti-slop charter + map).
2. **Select:** glob `skills/**/SKILL.md` **fresh every time** and route by frontmatter
   `description` (the filesystem is the index — never a cached list; this is how new skills are
   picked up with zero registration). The README table is a hint only. Do not use a `Skill`
   tool — read the files directly.
3. **Apply:** follow the `doctrine/references/` rules the skill cites.
4. **Gate:** before declaring an artifact done, run `governance/design-quality-gate.md`.

For skill creation, normalisation, or review, also read
`governance/skill-authoring-standard.md`. Run the local validator and routing smoke test after
any skill, frontmatter, router, doctrine, or governance change.

## Hard rules

- No banned AI-slop fonts as primary type (`doctrine/references/ai-slop-banned-fonts.md`). Hard
  ban: Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces, IBM Plex (all faces), bare system
  stacks alone; secondary ban: Space Grotesk, Instrument Serif, Poppins, Montserrat, Nunito, Nunito
  Sans, and (added 2026-09-29) Newsreader, Cormorant / Cormorant Garamond, Crimson Pro, Space Mono,
  Plus Jakarta Sans, Instrument Sans, DM Sans, Outfit, Playfair Display, Lora; Roboto Mono and IBM Plex Mono banned as monospace choices; Source Sans 3 paired body only.
- Always state typeface + reason before producing output.
- The banned-font rule overrides convenience. If you cannot satisfy the anti-slop checklist, say
  so and ask — never silently fall back to Inter or a system stack.
- Always pair (display + body); use weight/size extremes; check licence before embedding.
- On a new device or after pulling font-taxonomy changes, ensure the eight required
  `fonts/<category>/` directories exist before scanning or adding files. The category names are
  fixed team contract; individual font choices inside them may differ by device.
- The eight top-level folders under `fonts/` are fixed team taxonomy, not personal preference:
  `01-formal-institutional`, `02-editorial-literary`, `03-modern-product-grotesque`,
  `04-technical-data-code`, `05-friendly-humanist`, `06-expressive-display-artistic`,
  `07-script-cursive-handwritten`, and `08-body-ui-workhorses`. Team members may curate different
  individual font files inside those folders, but must not rename or replace the categories.
- Premium font binaries are gitignored — scan `fonts/<category>/`, read its `MANIFEST.md`, fall
  back to the named OFL baseline when a premium family is absent or its licence does not permit
  the intended use.

## Relationship to other engines

Referenced, not mirrored. Domain engines consult this one IN ADDITION to their own work for any
presentation-layer concern. See `integration/integration-plan.md`.

This is the **cross-cutting design & typography engine**. Treat it as the default source of
presentation-layer skills (typography, colour, layout, visual identity, mobile/web/desktop UI,
document visual formatting) **in addition to** whichever domain engine is active — the same way
the finance engine (`chwezi-accounting-doctrine`) is consulted alongside domain work.

A domain engine (business-plan-skills, chwezi-sdlc-documentation, proposal-skills, website-skills,
chwezi-dev-engine, social-media-skills, the Digital Research Engine) should hand off here whenever
the work touches how an artifact *looks*: font choice, type scale, colour, layout/grid, UI screens,
mobile UX, or the visual formatting of a DOCX/PPTX/PDF/XLSX. Content and structure stay in the domain engine; presentation comes here.

Advertising and campaign creative arrive from the social-media and digital marketing engine as a
brief; this engine returns concepts, campaign systems, layouts and placement specifications under
`skills/11-imagery-illustration-and-art-direction/advertising-creative-art-direction/references/handoff-contract-marketing-engine.md`.
Strategy, copy, legal release and measurement stay with the marketing engine.

## Skill-engine release commands

For visual changes, validate the machine-readable delivery record with
`python3 -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json`;
missing renders or required checks block a `PASS` verdict.

```bash
python3 -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json
python3 -X utf8 scripts/routing_smoke_test.py
```

Use `python` where the host has no `python3`. The README section "Validation" lists every check with its dependencies, the checks that need extra tools and the result measured on 2026-10-31.

Portability gate: `python3 -X utf8 scripts/validate_portability.py` (also run by `validate_engine.py`)
fails on machine-specific paths and on markdown links that leave the repository or break.
Exceptions live in `governance/portability-allowlist.json`, each with a reason and, for
historical records, a ratchet that can only shrink. Name sibling engines by repository
identifier and resolve them through the workspace map, never by a path or a relative link.

Rendered output and token packs: `node scripts/check-rendered-fonts.js <file.pdf>` applies the
banned-font doctrine to the fonts a PDF actually embeds (exit 0 pass, 2 banned family, 3 only
fallback faces, 4 not embedded, 1 did not run, which is `NOT ASSESSED`). `python3 -X utf8
scripts/validate_token_example.py <tokens.json> --profile generic` checks a real token pack for
aliases, tiers, the Design Tokens 2025.10 value shapes and every stated contrast ratio; the default
profile also requires the roles of the shipped example and so guards that file. The detector
(`node tools/slop-detector/cli.mjs`) also measures pointer targets (WCAG 2.5.8, browser tier) and flags
positive `tabindex` values (2.4.3); it does not script non-text contrast (1.4.11) or reading order (1.3.2).

The baseline is zero-debt: all 102 active skills currently pass the local contract. The validator
derives the active count from `skills/**/SKILL.md`; any new finding is a CI regression and must be
fixed before release.

When the sibling-engine workspace is available, also inspect declared external handoffs with
`python3 -X utf8 scripts/validate_cross_engine_routes.py --workspace-root <workspace-parent>`.
Missing sibling repositories are reported as `NOT ASSESSED`, not as a pass; the local route gate
remains independently runnable from this repository. When checkouts carry other folder names than
their repository names, pass `--map <repository>=<checkout>` (repeatable), `--workspace-map <json file>`
or set `CHWEZI_WORKSPACE_MAP`; the script header documents the order of lookup.

## Quality and improvement

Improvement evidence is in `docs/kaizen/2026-10-engine-kaizen/` and `docs/kaizen/2026-10-engine-kaizen-pass-2/`
(`docs/README.md` indexes the rest). The latest published score is a raw 60.3 out of 100, published as
`min(raw, 65)`, which is also 60.3; the target of 95 is not met. Open findings and the calendar of
re-checks are in the repository `README.md` under "Quality and improvement". Missing evidence
stays `NOT ASSESSED`; do not describe the engine as production-ready on this evidence.

## DOMAIN PROMPT GENERATION CONTRACT

For a prompt handoff, read the local [domain prompt contract](docs/ai-prompting/domain-prompt-compilation-contract.md). Generate a ready-to-paste visual prompt with audience/job, real content, visual thesis, hierarchy, composition, typeface and reason, colour, states, accessibility, licensing, output, and render checks. **Ready-to-paste prompt:** include assumptions, asset/accessibility risks, and next action. **Failure action:** correct one perceptual defect or rebuild when the visual system is wrong.

## PORTFOLIO CRAFT CONTRACT

Load `docs/operations/portfolio-craft-standard-2026-09-04.md` from the chwezi-engine-agents repository (resolve the checkout through the workspace map) when available. Design in perceptible slices: frame the user job and visual thesis, choose one component or flow, inspect the surrounding system and real content, make one purposeful change, render it in context, check hierarchy, states, contrast, motion, input, and responsive behaviour, refine, and record the visual proof. Every typeface, colour, spacing, asset, radius, shadow, and animation needs a product reason; remove decorative defaults. Do not generate a complete polished-looking system without reviewing its actual screens or artefacts. Apply `Observe -> Baseline -> Select -> Experiment -> Check -> Standardise -> Teach -> Re-measure` to kaizen itself. Missing render, device, accessibility, content, or reviewer evidence is `NOT ASSESSED`, never a pass.
