# CLAUDE.md — design-system-skills (router for Claude Code)

This is the **cross-cutting design & typography engine**. Treat it as the default source of
presentation-layer skills (typography, colour, layout, visual identity, mobile/web/desktop UI,
document visual formatting) **in addition to** whichever domain engine is active — the same way
the finance engine (`chwezi-accounting-doctrine`) is consulted alongside domain work.

These skills are NOT on the native skill-discovery path. **Read the `SKILL.md` files directly;
do not use the `Skill` tool for them.**

## Routing (dynamic discovery — the filesystem is the index)

1. Read `doctrine/design-doctrine.md` first (anti-slop charter + map).
2. **Glob `skills/**/SKILL.md` FRESH every time** and read each match's frontmatter
   `description`; route by best fit. Do NOT rely on any hardcoded skill list — the README
   table is a hint only. This is what makes newly-added skills appear automatically with no
   registration step.
3. Apply the doctrine references in `doctrine/references/`.
4. For skill authoring or catalogue maintenance, apply
   `governance/skill-authoring-standard.md` and run both local quality commands in `AGENTS.md`.

## The one rule that overrides convenience

Never use a banned AI-slop font as a primary typeface (`doctrine/references/ai-slop-banned-fonts.md`).
Hard ban: Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces, IBM Plex (all faces), and bare
system stacks used alone. Secondary ban: Space Grotesk, Instrument Serif, Poppins, Montserrat,
Nunito, Nunito Sans. Roboto Mono and IBM Plex Mono are banned as monospace choices; Source Sans 3
is permitted only as a paired body face. **State the chosen typeface(s)
and reason before producing any artifact.** If you cannot satisfy the anti-slop checklist, say
so and ask — never silently fall back to Inter or a system stack.

## Never store book extractions

Book extractions, book summaries and chapter-by-chapter notes must never be stored in this
repository (no `book-extractions/` or `docs/book-study/` folder, no `*-extraction.md` files). Keeping them infringes
copyright. Knowledge from purchased books enters only as paraphrased, task-oriented skill content
and `references/` files (procedures, checklists, decision rules, templates) with a short citation
(Author (Year) *Title*, Publisher). Verbatim quotations stay rare and under 25 words. Staging
notes live outside the repository and are never linked from skills. `scripts/validate_engine.py`
fails if an extraction folder exists or a file under skills/, doctrine/ or docs/ links to one; plan and audit documents may name books but not store their content.

## Font folder contract

The eight top-level folders under `fonts/` are fixed team taxonomy, not personal preference:
`01-formal-institutional`, `02-editorial-literary`, `03-modern-product-grotesque`,
`04-technical-data-code`, `05-friendly-humanist`, `06-expressive-display-artistic`,
`07-script-cursive-handwritten`, and `08-body-ui-workhorses`. On a new device, or after pulling a
font-taxonomy change, ensure all eight directories exist before scanning or adding fonts. Team
members may curate different individual font files inside those folders, but must not rename or
replace the categories.

## When invoked from another engine

A domain engine (business-plan, srs, proposal, website, engineering-catalog, social-media,
digital-research) should hand off here whenever the work touches how an artifact *looks*: font
choice, type scale, colour, layout/grid, UI screens, mobile UX, or the visual formatting of a
DOCX/PPTX/PDF/XLSX. Content and structure stay in the domain engine; presentation comes here.

Advertising and campaign creative arrive from the social-media and digital marketing engine as a
brief; this engine returns concepts, campaign systems, layouts and placement specifications under
`skills/11-imagery-illustration-and-art-direction/advertising-creative-art-direction/references/handoff-contract-marketing-engine.md`.
Strategy, copy, legal release and measurement stay with the marketing engine.
