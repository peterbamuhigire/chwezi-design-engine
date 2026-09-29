# Core Rules — Design System Engine

> Distilled from this engine's own `CLAUDE.md` and `doctrine/`.

## Never use a banned AI-slop font as a primary typeface

Inter, Geist, Roboto, Arial, Open Sans, Lato, Fraunces, IBM Plex, bare system stacks; nor the
secondary escapes Space Grotesk, Instrument Serif, Poppins, Montserrat, Nunito,
Newsreader, Cormorant, Crimson Pro, Plus Jakarta Sans, DM Sans, Outfit, Playfair
Display, Lora, or standalone Source Sans. **State the chosen typeface(s) and reason before
producing any artifact.** If the anti-slop checklist cannot be satisfied, say so
and ask — never silently fall back to Inter or a system stack.

**Mechanically enforced:** `hooks/banned-font-gate.js` blocks a Write/Edit that
sets one of these as a primary `font-family` or as a quoted font-name literal.
This rule statement is retained here because the hook checks CSS declarations
and quoted literals specifically — it does not (yet) catch every possible way a
banned font could be specified, so the stated rule still carries weight beyond
what the hook mechanically catches.

## Approvals trace only to human design authority

An AI tool's own recommendation is never grounds to approve a typeface, colour,
or layout choice — only evidence for what to ban (an AI confessing its own
convergence is strong ban-evidence; an AI's recommendation is worthless as
approval-evidence, because it is what the next wave of AI output will converge
on too). Approvals trace to typographers, type foundries, and the design
literature.

## When unsure whether a choice is slop, treat it as slop

Pick a deliberate alternative rather than defaulting to "probably fine."

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
