# Reference: The AI-Slop Banned Font List

**Rule:** None of these may appear as a **primary typeface** in any generated artifact —
website, DOCX, PPTX, PDF, or UI — regardless of how convenient or "clean" they seem.

**Evidence basis — and a hard asymmetry principle.** AI-vendor sources are admissible as
evidence ONLY for what to **BAN**, NEVER as authority for what to **APPROVE**. An AI tool
confessing *"I converge on X"* is the strongest possible evidence that X is a tell; an AI tool
saying *"use Y"* is worthless as approval grounds, because the tool's own recommendations are
exactly what the next wave of AI output will converge on. **Approvals trace only to human design
authority** — typographers, type foundries, and the design literature (Bonneville, Vignelli,
Segall; see `pairing-principles.md`).

Applying that: Anthropic's **Claude Cookbook**, *"Prompting for frontend aesthetics"* (the AI
vendor itself), is cited here **only as the AI confessing its own convergence** — verbatim:
*"Overused font families (Inter, Roboto, Arial, system fonts)"*, *"Never use: Inter, Roboto,
Open Sans, Lato, default system fonts"*, and on Space Grotesk: *"You still tend to converge on
common choices (Space Grotesk, for example)… Avoid this."* That is valid ban-evidence.
Its *recommendation* list (which includes several of our approved faces) is **deliberately not
used as a reason to approve anything** — those faces earn their place on human-design grounds,
and we note the convergence risk on any the cookbook also happens to push. Corroborated by
Vercel/shadcn defaults and designer commentary; verified via the digital-research engine's
source-verification pass (2026-06-21).

Diagram tooling adds a second, non-AI default of the same kind: Mermaid's default theme font stack
`trebuchet ms, verdana, arial, sans-serif` (mermaid-js `develop`, `theme-default.js` line 36,
accessed 29 Sep 2026) is what a rendered figure falls back to when no face is set. It is a
tool default and is recorded as **evidence only** (M10-07, AR-12); Trebuchet MS and Verdana are
not on the machine-readable ban list, and adding them awaits Peter's ratification. Diagram
typography is set in
`skills/13-presentations-and-documents/docx-report-and-document-formatting/references/diagram-visual-standards.md`.

> **Label every ban by its failure mode — they are not all the same.** Four distinct reasons:
> **[AI]** = genuine AI-ecosystem default / tell · **[POP]** = generic-popular & overused (reads
> as "no design," predates AI) · **[SYS]** = lazy system default · **[HOUSE]** = house ruling by
> Peter Bamuhigire, Lead Consultant, Chwezi Core Systems, 29 Sep 2026; supporting AI-tool
> evidence: the pbakaus/impeccable deterministic detector and its reflex-font list. Only **[AI]**
> is truly an "AI tell" on independent evidence; all four are banned as a *primary* typeface for
> Chwezi work, but stating the right reason keeps the doctrine honest.

---

## 1. Hard ban (primary offenders)

<!-- rule:font.ban.hard.inter -->
- **Inter** — **[AI]** the single strongest tell; "the Helvetica of the LLM era"; shadcn's
  historic `--font-sans` default. Banned outright.
<!-- rule:font.ban.hard.geist -->
- **Geist** — **[AI]** *added 2026-06-21.* Vercel's own font, now the **v0 / shadcn / Vercel
  template default that replaced Inter** — the modern successor AI tell. Banned outright. The ban
  covers every Geist cut (Geist Sans, Geist Mono and later cuts): the gate matches any family name
  beginning "Geist" (doctrine clarification 2026-09-29; Geist Mono is flagged by the
  pbakaus/impeccable detector and bundled in Anthropic's `canvas-design` fonts, evidence for bans
  only).
<!-- rule:font.ban.hard.roboto -->
- **Roboto** — **[POP/AI]** on the Cookbook list; also the #1 Google Font and Android/Material
  system face. Banned.
<!-- rule:font.ban.hard.open-sans -->
- **Open Sans** — **[POP]** Cookbook "never use"; ~#2 Google Font. Banned.
<!-- rule:font.ban.hard.lato -->
- **Lato** — **[POP]** Cookbook "never use"; ~#3 Google Font. Banned.
<!-- rule:font.ban.hard.arial -->
- **Arial** — **[SYS]** "lazy default," reads as no-design. Banned as a deliberate choice.
<!-- rule:font.ban.hard.fraunces -->
- **Fraunces** — **[HOUSE]** *added 2026-09-29.* The "soft, wonky" variable serif has become
  the reflex "I avoided Inter" display serif in generated editorial and landing work; flagged by
  the pbakaus/impeccable deterministic detector. Banned outright — as display, heading and body.
<!-- rule:font.ban.hard.ibm-plex -->
- **IBM Plex (the entire superfamily)** — **[HOUSE]** *added 2026-09-29.* IBM Plex Sans, Serif,
  Mono, Sans Condensed and every script companion (Sans Arabic, Devanagari, Thai, Thai Looped,
  Hebrew, KR, JP, and any later cut). Listed among the reflex / AI-default fonts by
  pbakaus/impeccable; it had become the engine's own "safe technical" reflex. Banned outright;
  the gate matches any family name beginning "IBM Plex".
<!-- rule:font.ban.hard.bare-system-stack -->
- **Bare system-font stacks used alone** — **[SYS]** e.g. `-apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif` with no deliberate face layered on top. (Note: a *deliberate,
  documented* system-font fallback chain is different — see `system-font-fallbacks.md`.)

## 2. Secondary ban (the "I tried" upgrades)

The fonts AI reaches for *after* being told to avoid the first list. Banned as a default reflex
for Chwezi work — but note the honest evidence label:

<!-- rule:font.ban.secondary.space-grotesk -->
- **Space Grotesk** — **[AI]** named by the Claude Cookbook as *the* convergence trap. The most
  common "escape attempt." Do **not** treat it as the safe distinctive choice.
<!-- rule:font.ban.secondary.instrument-serif -->
- **Instrument Serif** — **[AI]** *added 2026-06-21.* Repeatedly named as the AI serif-accent
  reflex. Avoid as the default serif accent.
<!-- rule:font.ban.secondary.poppins -->
- **Poppins** — **[POP]** *generic-popular cliché, weak AI-specific evidence.* Kept on the ban
  list as a Chwezi house rule (overused), but the honest reason is "modern-startup cliché," not
  "AI tell."
<!-- rule:font.ban.secondary.montserrat -->
- **Montserrat** — **[POP]** ~#4 Google Font; popular human default. Banned as overused, not as
  an AI signature.
<!-- rule:font.ban.secondary.nunito -->
<!-- rule:font.ban.secondary.nunito-sans -->
- **Nunito / Nunito Sans** — **[POP]** no direct AI-tell evidence found; banned as a Chwezi
  house preference (rounded-friendly cliché), not on evidence grounds.

### 2a. Added 2026-09-29 — AI-default faces with two or more independent AI-tool signals

Each face below is named as a default or reflex choice by at least two independent AI-tool
sources (the pbakaus/impeccable detector or reflex list, the UI UX Pro Max typography data, and
Anthropic's own `canvas-design` font bundle or Claude Cookbook "Prompting for frontend
aesthetics" recommendation list). These sources are **evidence for bans only**. Decided by the
orchestrator under Peter's delegated authority, 29 Sep 2026; the graded record is
`docs/continuous-improvement/slop-doctrine-refresh-2026-10-font-watchlist.md`.

<!-- rule:font.ban.secondary.newsreader -->
- **Newsreader** — **[AI]** Impeccable reflex list; Claude Cookbook "distinctive" recommendation.
  Replaced in the 02 Editorial baselines by Libre Caslon Text and Source Serif 4.
<!-- rule:font.ban.secondary.cormorant -->
<!-- rule:font.ban.secondary.cormorant-garamond -->
- **Cormorant / Cormorant Garamond** — **[AI]** Impeccable reflex list; UI UX Pro Max (four
  pairings). Replaced as the elegant title face by Theano Didot (display sizes only).
<!-- rule:font.ban.secondary.crimson-pro -->
- **Crimson Pro** — **[AI]** Impeccable reflex list ("Crimson"); UI UX Pro Max; Anthropic
  `canvas-design` bundle and Claude Cookbook "editorial" recommendation. Replaced in the 01 Formal
  baselines by Arapey; pairing F3 now uses Spectral.
<!-- rule:font.ban.secondary.space-mono -->
- **Space Mono** — **[AI]** Impeccable reflex list; UI UX Pro Max (two pairings). Short labels
  now use JetBrains Mono.
<!-- rule:font.ban.secondary.plus-jakarta-sans -->
- **Plus Jakarta Sans** — **[AI]** Impeccable detector and reflex list; UI UX Pro Max (three
  headings, three bodies).
<!-- rule:font.ban.secondary.instrument-sans -->
- **Instrument Sans** — **[AI]** Impeccable detector and reflex list; Anthropic `canvas-design`
  bundle (alongside the already banned Instrument Serif).
<!-- rule:font.ban.secondary.dm-sans -->
- **DM Sans** — **[AI]** Impeccable reflex list; UI UX Pro Max (three bodies, one heading).
<!-- rule:font.ban.secondary.outfit -->
- **Outfit** — **[AI]** Impeccable reflex list; UI UX Pro Max (three headings); Anthropic
  `canvas-design` bundle.
<!-- rule:font.ban.secondary.playfair-display -->
- **Playfair Display** — **[AI]** Impeccable reflex list; UI UX Pro Max (three headings plus live
  output); Claude Cookbook "editorial" recommendation.
<!-- rule:font.ban.secondary.lora -->
- **Lora** — **[AI]** Impeccable reflex list; Anthropic `canvas-design` bundle.

### 2b. Watchlist (not banned; recheck 2026-12-29)

One independent AI-tool signal only. These faces are **not** banned. Choosing one requires a
stated human-design reason; the next refresh re-grades them.

- **Syne** (approved 06 baseline) — Impeccable reflex list only.
- **DM Serif Display / DM Serif Text** — Impeccable reflex list only.
- **Helvetica** — Impeccable detector only (not treated as a system default like Arial).
- **Mona Sans** — Impeccable detector only.
- **Recoleta** — Impeccable detector only.
- **DejaVu Sans** — Anthropic `theme-factory` body default only.

## 3. Conditional — Source Sans 3 (paired body only)

<!-- rule:font.conditional.source-sans-3 -->
<!-- rule:font.conditional.source-sans-pro -->
- **Source Sans 3 / Source Sans Pro** — a competent, human-designed text face (Adobe / Paul D.
  Hunt). It is **overused as a standalone "neutral upgrade,"** so it is **banned as a primary /
  display / standalone face** but **permitted as a quiet paired body face** beneath a
  distinctive display font — matching the original Chwezi rule and the workhorse note. This is a
  human-design / overuse judgement, **not** an "an AI tool recommended it" approval.

---

## 4. Why the ban matters

Chwezi products compete on looking intentionally designed and trustworthy. The moment a
deliverable opens in Inter or Geist, a discerning client reads it as "no one thought about
typography," which corrodes the premium positioning across the portfolio and every external
client deliverable shipped under the Chwezi Core Systems name.

## 5. Edge cases

<!-- rule:font.ban.mono.roboto-mono -->
- **Code/monospace** in a technical artifact may need a monospace face — use an approved one
  (JetBrains Mono, Fira Code), never Roboto Mono or IBM Plex Mono as a *design* choice.
- **Non-Latin script coverage** that previously leaned on an IBM Plex script companion (e.g.
  IBM Plex Sans Arabic) now uses the matching **Noto** family (e.g. Noto Sans Arabic, Noto Sans
  Devanagari) — chosen for script coverage, not as a display statement.
- **A client brand guideline that mandates a banned font** overrides this list for that client
  only — state it explicitly, record it, do not generalise it.
- **A deliberate device-common fallback** (e.g. Georgia, the system stacks in
  `system-font-fallbacks.md`) is **not** slop — slop is the *thoughtless* default, not every
  pre-installed face used on purpose.

When unsure whether a face is slop, treat it as slop and pick a deliberate alternative from
`font-groups-and-usage.md`.

## 6. Living refresh rule

Font defaults move. Before adding, removing, or reclassifying a banned face, run
`skills/00-cross-cutting-ops-qa-a11y/slop-doctrine-refresh-and-research-loop/` and
`doctrine/references/living-slop-refresh-protocol.md` with the digital-research engine's source
evaluation discipline. Record the observed shift, evidence grade, design consequence, scope, and
date checked. Weak evidence becomes a watchlist note, not a hard ban.

## 7. Change log

- **2026-09-29 — Font watchlist refresh (M10-09 T12): eleven families secondary-banned [AI],
  seven faces on the watchlist, Geist prefix clarified.** `Observed shift:` a second wave of
  "tasteful" AI defaults (Newsreader, Cormorant, Crimson Pro, Space Mono, Plus Jakarta Sans,
  Instrument Sans, DM Sans, Outfit, Playfair Display, Lora) recurs across AI design tools, including
  in this engine's own baselines and sector templates. `Evidence grade:` moderate to strong per
  face (two to three independent AI-tool sources each; see the record) — admissible for bans only.
  Faces with one signal (Syne, DM Serif, Helvetica, Mona Sans, Recoleta, DejaVu Sans) are weak and
  go to the watchlist. `Design consequence:` secondary ban as primary type; baselines replaced by
  human-authority faces (Arapey, Spectral, Libre Caslon Text, Theano Didot, Source Serif 4,
  JetBrains Mono); `fonts/` folders for Crimson Pro, Newsreader and Cormorant Garamond retained
  pending Peter's per-operation removal decision. `Scope:` typography — web, UI, DOCX, PPTX, PDF,
  XLSX. `Date checked:` 2026-09-29. Decided by the orchestrator under Peter's delegated authority,
  29 Sep 2026. Record: `docs/continuous-improvement/slop-doctrine-refresh-2026-10-font-watchlist.md`.

- **2026-09-29 — Fraunces and IBM Plex (whole superfamily) added to the hard ban [HOUSE].**
  `Observed shift:` both faces had become reflex "tasteful" defaults — Fraunces as the go-to
  soft editorial display serif, IBM Plex as the go-to "technical but not Inter" sans/serif/mono —
  including inside this engine's own baselines. `Evidence grade:` moderate (one AI-tool source:
  the pbakaus/impeccable deterministic detector flags Fraunces; its reflex/AI-default font list
  includes IBM Plex) — admissible for bans only, per the asymmetry principle above. The ban's
  authority is the house ruling of Peter Bamuhigire (Lead Consultant, Chwezi Core Systems), not
  the evidence grade. `Design consequence:` hard ban as primary type in every format; binaries
  removed from `fonts/02-editorial-literary/`; role replacements — editorial/document display →
  Andada (web: "Andada Pro"), luxury/expressive display → Theano Didot, warm heading over humanist
  UI → Alegreya, variable-axis examples → Source Serif 4, UI/body/data → Public Sans (with
  `tabular-nums`), serif text → Source Serif 4, monospace → JetBrains Mono (fallback Fira Code),
  non-Latin script coverage → matching Noto family. `Scope:` typography — web, UI, DOCX, PPTX,
  PDF, XLSX. `Date checked:` 2026-09-29.
