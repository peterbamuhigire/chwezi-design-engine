# Adding skills to chwezi-design-engine (flawless auto-pickup)

This engine is **self-indexing**: consumers discover skills by globbing `skills/**/SKILL.md`
fresh and reading frontmatter. There is **no registry, index file, or router list to update.**
Adding a skill is one step.

## To add a skill

1. Copy `skills/_TEMPLATE/` to `skills/<NN-group>/<your-skill-name>/`.
2. Fill in the frontmatter — especially a **specific, trigger-rich `description`** (this is the
   only thing that decides whether the skill gets routed to; vague text = missed pickup).
3. Write the body using `governance/skill-authoring-standard.md` and the current
   `skills/_TEMPLATE/SKILL.md`. Cite `doctrine/references/*`
   for any canonical rule rather than restating it.
4. That's it. The next glob finds it — no edits to `README.md`, `CLAUDE.md`, the domain
   engines, or anything else.

## To add a new group

Create `skills/<NN-newgroup>/` and drop skills in it. It's discovered on the next glob. Add a
one-line row to the README router table only if you want the human-facing hint (optional — the
glob is authoritative).

## Premium fonts

The eight top-level folders under `fonts/` are fixed team taxonomy:
`01-formal-institutional`, `02-editorial-literary`, `03-modern-product-grotesque`,
`04-technical-data-code`, `05-friendly-humanist`, `06-expressive-display-artistic`,
`07-script-cursive-handwritten`, and `08-body-ui-workhorses`.

After cloning this repo on a new device, or after pulling a font-taxonomy change, run the
idempotent setup command in `fonts/README.md` so any missing category directories are recreated
before local font curation starts.

Drop purchased font files into the matching `fonts/<category>/` folder (binaries are gitignored)
and record them in that category's `MANIFEST.md` (licence + embedding permission). Teammates may
choose different individual font files, but must preserve the same category folders. The
`premium-font-scan` skill reads the MANIFEST automatically.

## Examples are mandatory (the convention)

Every **craft** skill (one that produces a design artifact) **MUST ship at least one file under
`examples/`** that demonstrates the skill's *output* — not more prose. Audit/process skills SHOULD
ship a worked example (a filled audit, a completed template). A craft skill without `examples/` is
**incomplete**.

A worked example is one of:
- a real applied **spec** (a full type scale with px/rem; a token JSON; an OKLCH colour ramp);
- a **before/after** (a slop version → the fixed version, with the reasoning);
- a **sample artifact** (a `@font-face` block; a component state matrix; a grid template; a deck
  outline; a DOCX style table);
- a worked **decision** (the stated typeface + colour + reason for a named brief).

Never use lorem/placeholder — examples must be specific and reusable. Track backfill in
`docs/plans/hardening-june/examples-backfill-tracker.md`.

## Never store book extractions

Book extractions, book summaries and chapter-by-chapter notes must never be stored in this
repository (no `book-extractions/` or `docs/book-study/` folder, no `*-extraction.md` files). Keeping them infringes
copyright. Knowledge from purchased books enters only as paraphrased, task-oriented skill content
and `references/` files (procedures, checklists, decision rules, templates) with a short citation
(Author (Year) *Title*, Publisher). Verbatim quotations stay rare and under 25 words. Staging
notes live outside the repository and are never linked from skills. `scripts/validate_engine.py`
fails if an extraction folder exists or a file under skills/, doctrine/ or docs/ links to one; plan and audit documents may name books but not store their content.

## Rules every skill must follow

- Valid frontmatter (`name` + specific `description` + correct `metadata.category` = its group
  folder). Without it, pickup is unreliable.
- One concern per skill; name the sibling skill in `## Do Not Use When`.
- Never restate doctrine — cite `doctrine/references/*` (incl. `wcag-2.2-criteria.md` and
  `web-performance-budgets-2026.md` for any UI/web skill).
- Ship ≥1 `examples/` file (see above).
- Honour the anti-slop charter (`doctrine/design-doctrine.md`).
- Declare inputs, outputs, capability limits, degraded mode, decision rules, stop conditions,
  evidence, and acceptance criteria.
- Run `python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json` and
  `python -X utf8 scripts/routing_smoke_test.py` before submitting changes.
