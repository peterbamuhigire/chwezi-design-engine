# Slop doctrine refresh: font watchlist (M10-09 T12)

| Field | Value |
|---|---|
| Record type | Slop-doctrine refresh note (`slop-doctrine-refresh-and-research-loop`; `doctrine/references/living-slop-refresh-protocol.md`) |
| Backlog items | IM-04 (remaining faces), UX-14, AC-09 |
| Date checked | 2026-09-29 |
| Decision authority | Decided by orchestrator under Peter's delegated authority, 29 Sep 2026 (my-10-kaizen, "Implement the Plan!") |
| Doctrine files changed | `doctrine/references/ai-slop-banned-fonts.md` and `.json`, `doctrine/references/font-groups-and-usage.md`, `doctrine/references/pairing-principles.md`, `skills/01-typography-and-fonts/font-selection-and-pairing/references/pairing-catalog.md`, `fonts/README.md`, three `fonts/*/MANIFEST.md`, plus skill references, examples and sector templates (listed in §6) |
| Re-check due | 2026-12-29 (every watchlist row) |

## 1. Authority rule and the ruling applied

AI-tool repositories are **evidence for bans only**. They never approve a face (roadmap rule 4;
`ai-slop-banned-fonts.md` "Evidence basis"). Every approval kept or added below traces to a type
designer or foundry.

Ruling applied (orchestrator, under Peter's delegated authority, 29 Sep 2026):

- A face named as an AI default or reflex choice by **two or more independent AI-tool sources**
  goes to `secondaryBan` with reason `AI`, leaves every baseline and approved list, and is
  replaced by an approved face from the engine's own `fonts/` inventory or baselines with a
  human-authority citation.
- A face with **one** source goes on the watchlist with re-check date 2026-12-29.

## 2. Sources and how independence was counted

All sources below are **evidence for bans only**.

| Key | Source | Pinned at | What was read |
|---|---|---|---|
| IMP | pbakaus/impeccable (Apache-2.0) | commit `114ea1d3838fca73b253af45f873b9c4f5f213c8` | `crates/foundation/src/constants.rs` `OVERUSED_FONTS` (line 85; the detector list, "Imp-D") and `skill/reference/new-work.md` line 67 (the "training-data defaults" reflex list, "Imp-R"). Both fetched from raw.githubusercontent.com on 2026-09-29. |
| UUPM | nextlevelbuilder/ui-ux-pro-max-skill (MIT) | commit `09170ee` | `src/ui-ux-pro-max/data/typography.csv` (74 pairings), counted on 2026-09-29; live-output queries from `01-repo-reports/03-ui-ux-pro-max.md` §6.1. |
| ANTH | Anthropic | `anthropics/skills` HEAD `3337550` (2026-09-24; the canvas-font list is identical at the plan's `fa0fa64`); `anthropics/claude-cookbooks` `coding/prompting_for_frontend_aesthetics.ipynb` last changed `944b94a` (2026-02-17) | `skills/canvas-design/canvas-fonts/` (29 bundled families), `skills/theme-factory/themes/*.md` (10 themes), and the Cookbook's `<use_interesting_fonts>` "Impact choices" list. Fetched 2026-09-29. |

Independence rules (stricter than the phase-file table, which counted Imp-D and Imp-R apart):

- Imp-D and Imp-R are **one** source (same repository and author).
- Anthropic's `canvas-design` bundle, `theme-factory` defaults and Claude Cookbook recommendations
  are **one** source (same vendor).
- UUPM counts as a source only when the face appears in **two or more** of its 74 pairings
  (heading or body). A single row is not "most-recommended".
- v0/shadcn defaults: not independently verified for any of the eighteen faces in this pass, so
  not counted.

Evidence grade (protocol shape): **strong** = three independent sources; **moderate** = two;
**weak** = one; **rejected** = none, or the claim does not hold at the pinned commit.

## 3. The eighteen faces

Every row: date checked 2026-09-29; sources are evidence for bans only; decision recorded as
"decided by orchestrator under Peter's delegated authority, 29 Sep 2026".

| # | Face | Status before | IMP | UUPM (rows) | ANTH | Grade | Options considered | Decision applied |
|---|---|---|---|---|---|---|---|---|
| 1 | Plus Jakarta Sans | not approved, not banned | ✓ (D + R) | ✓ (3 H, 3 B) | – | moderate | watchlist / secondary ban / hard ban / reject | **Secondary ban [AI]** |
| 2 | Instrument Sans | not approved, not banned | ✓ (D + R) | – (0) | ✓ canvas bundle | moderate | as above | **Secondary ban [AI]** |
| 3 | Outfit | not approved, not banned | ✓ (R) | ✓ (3 H, 1 B) | ✓ canvas bundle | strong | as above | **Secondary ban [AI]** |
| 4 | Playfair Display | not approved, not banned | ✓ (R) | ✓ (3 H, 1 B; plus live NGO output) | ✓ Cookbook "Editorial" | strong | as above | **Secondary ban [AI]** |
| 5 | Crimson Pro | approved baseline, 01 Formal; pairing F3 | ✓ (R, "Crimson") | ✓ (2) | ✓ canvas bundle + Cookbook "Editorial" | strong | keep / keep with watchlist note / contextual / secondary ban / hard ban | **Secondary ban [AI]**; removed from 01 baselines |
| 6 | Newsreader | approved baseline, 02 Editorial; default-pairing alternate; pairing E2 | ✓ (R) | – (1 row) | ✓ Cookbook "Distinctive" | moderate | as row 5 | **Secondary ban [AI]**; removed from 02 baselines |
| 7 | Cormorant Garamond (and base Cormorant) | approved baseline, 02; pairings E3, C1 | ✓ (R, "Cormorant") | ✓ (4 incl. Cormorant, Cormorant Infant) | – | moderate | as row 5 | **Secondary ban [AI]** for Cormorant and Cormorant Garamond; removed from 02 baselines |
| 8 | Lora | not approved, not banned | ✓ (R) | – (1 row) | ✓ canvas bundle | moderate | watchlist / secondary ban / hard ban / reject | **Secondary ban [AI]** |
| 9 | DM Sans | not approved, not banned | ✓ (R) | ✓ (1 H, 3 B) | – | moderate | as above | **Secondary ban [AI]** |
| 10 | Space Mono | approved, 04, labels only | ✓ (R) | ✓ (2) | – | moderate | as row 5 | **Secondary ban [AI]**; short labels move to JetBrains Mono |
| 11 | Syne | approved baseline, 06; quick-chooser campaign default; pairing A1 | ✓ (R) | – (1 row) | – | weak | as row 5 | **Watchlist** (kept approved; human-design reason required; recheck 2026-12-29) |
| 12 | DM Serif (Display / Text) | not approved, not banned | ✓ (R) | – (0) | – | weak | watchlist / secondary ban / hard ban / reject | **Watchlist** (recheck 2026-12-29) |
| 13 | Helvetica | not banned (Arial is [SYS]) | ✓ (D) | – (0) | – | weak | as above, plus "treat as [SYS] like Arial" | **Watchlist** (recheck 2026-12-29); the [SYS] option was not taken because one AI-tool signal does not meet the ruling's threshold |
| 14 | Mona Sans | not approved, not banned | ✓ (D) | – | – | weak | as above | **Watchlist** (recheck 2026-12-29) |
| 15 | Recoleta | not approved, not banned | ✓ (D) | – | – | weak | as above | **Watchlist** (recheck 2026-12-29) |
| 16 | Geist Mono | covered only by exact "Geist" name match | ✓ (D) | – | ✓ canvas bundle | moderate | add `Geist` to `hardBanFamilyPrefixes` (clarification) | **`Geist` added to `hardBanFamilyPrefixes`** — a clarification of the existing Geist hard ban, not a new ban |
| 17 | Instrument Serif | already secondary ban | ✓ (D) | – | ✓ canvas bundle | moderate (corroboration) | record corroboration only | **No change**; corroboration recorded |
| 18 | DejaVu Sans | not approved, not banned | – | – | ✓ `theme-factory` body face in 6 of 10 themes | weak | watchlist / [SYS]-style ban / reject | **Watchlist** (recheck 2026-12-29) |

### Row detail in the protocol's update shape

- **Rows 1–10 (secondary ban).** `Observed shift:` each face recurs as a default or reflex pick in
  AI design tooling, and several had become reflex choices inside this engine (baselines, pairing
  catalogue, sector templates). `Evidence grade:` as in the table (moderate or strong).
  `Design consequence:` banned as primary type (display, heading, body) in every format; removed
  from baselines, pairings and templates; the banned-font gate now blocks them as the first family
  in a stack. `Scope:` typography — web, UI, DOCX, PPTX, PDF, XLSX. `Date checked:` 2026-09-29.
- **Rows 11–15 and 18 (watchlist).** `Observed shift:` one AI-tool source names the face.
  `Evidence grade:` weak. `Design consequence:` not banned; choosing it requires a stated
  human-design reason; re-graded on 2026-12-29. `Scope:` typography. `Date checked:` 2026-09-29.
- **Row 16 (Geist prefix).** `Observed shift:` Geist Mono ships as an AI-tool default alongside
  Geist. `Evidence grade:` moderate. `Design consequence:` the gate matches any family starting
  "Geist". `Scope:` typography. `Date checked:` 2026-09-29.
- **Row 17 (Instrument Serif).** Corroboration of the existing ban only.

## 4. Replacements (approvals trace to human authority only)

| Removed face | Replacement | Human authority |
|---|---|---|
| Crimson Pro (01 baseline; F3) | Arapey (01 baseline, `fonts/01-formal-institutional/arapey/`); F3 now Spectral 700 → Source Serif 4 | Arapey: Eduardo Tunni (type designer). Spectral: Production Type (foundry). Source Serif 4: Frank Grießhammer, Adobe. |
| Newsreader (02 baseline; E2; variable-axis examples; editorial body) | Libre Caslon Text (E2, editorial alternates); Source Serif 4 (variable `opsz` examples and long-form body) | Libre Caslon: Impallari Type (Pablo Impallari, Rodrigo Fuenzalida), revival of William Caslon's types. Source Serif 4: Frank Grießhammer, Adobe. |
| Cormorant Garamond (02 baseline; E3; C1) | Theano Didot, display sizes only (`fonts/02-editorial-literary/theano-didot/`) | Alexey Kryukov, after the Didot family's types. |
| Space Mono (04 labels) | JetBrains Mono (already the 04 code face) | JetBrains (Philipp Nurullin, Konstantin Bulenkov). See §7: JetBrains Mono itself now carries AI-tool signals. |
| Plus Jakarta Sans, DM Sans, Outfit, Playfair Display, Lora (sector templates, brand examples) | Public Sans, Hanken Grotesk, Bricolage Grotesque, Bodoni Moda, Source Serif 4, Theano Didot, Lexend, Alegreya Sans, Atkinson Hyperlegible | Public Sans: US Web Design System. Hanken Grotesk: Hanken Design Co. Bricolage Grotesque: Mathieu Triay. Bodoni Moda: indestructible type* (Owen Earl), after Giambattista Bodoni. Lexend: Bonnie Shaver-Troup and Thomas Jockin. Alegreya Sans: Juan Pablo del Peral, Huerta Tipográfica. Atkinson Hyperlegible: Applied Design Works for the Braille Institute. |

## 5. Font folders of newly banned faces (report only)

Folder removal is destructive and needs Peter's per-operation confirmation (memory rule "never
destructive sync"). Nothing was deleted. The folders stay; their MANIFEST rows are marked
"BANNED 2026-09-29" and the baseline lines no longer name them.

- `fonts/01-formal-institutional/crimson-pro/`
- `fonts/02-editorial-literary/newsreader/`
- `fonts/02-editorial-literary/cormorant-garamond/`

No other newly banned face has a `fonts/` folder.

## 6. Files changed by this refresh

- Doctrine: `doctrine/references/ai-slop-banned-fonts.md` (§1 Geist note, new §2a with rule
  markers, §2b watchlist without markers, change log), `doctrine/references/ai-slop-banned-fonts.json`
  (11 `secondaryBan` rows, `Geist` prefix, `watchlist` array), `doctrine/references/font-groups-and-usage.md`,
  `doctrine/references/pairing-principles.md`, `AGENTS.md` (hard-rule list).
- Fonts: `fonts/README.md`, `fonts/01-formal-institutional/MANIFEST.md`,
  `fonts/02-editorial-literary/MANIFEST.md`, `fonts/06-expressive-display-artistic/MANIFEST.md`.
- Typography skills: `pairing-catalog.md`, `type-scale-recipes.md`, `variable-axes.md`,
  `variable-fonts-and-opentype-features/SKILL.md` (body text only) and its `dashboard-type-system.md` example.
- Other skills: editorial long-form layout (SKILL.md body, reference, example), email bulletproof
  patterns, PDF proposal SKILL.md (body), brand-style-guide `design-decisions.md`, healthcare
  `color-typography.md` and `desktop-patterns.md` (older Inter/Roboto/Open Sans residue),
  sector-strategies `ANTI-HOMOGENEITY-PRINCIPLE.md` and 33 `templates/*` files (older residue:
  Inter, Poppins, Montserrat, Open Sans, Nunito, Instrument Serif, Space Grotesk, plus the newly
  banned faces).
- Cross-engine (single file): `website-skills/skills/orchestration/africa-excellence/references/african-language-pack.md` (Inter removed).

## 7. Out-of-scope observations (no doctrine change; for the 2026-12-29 re-check)

Counting the same sources for faces outside the eighteen:

| Face | Status | Signals | Grade under this record's rule |
|---|---|---|---|
| JetBrains Mono | approved monospace | UUPM (3 rows); ANTH (canvas bundle + Cookbook "Code aesthetic") | moderate — **meets the two-source threshold**; not actioned because it is the engine's approved code face and outside IM-04/UX-14/AC-09. Needs Peter's explicit decision. |
| Fira Code | approved monospace | UUPM (2 rows); ANTH (Cookbook) | moderate — same position as JetBrains Mono. |
| Bricolage Grotesque | approved 03 baseline | ANTH (canvas bundle + Cookbook "Distinctive") | weak |
| Libre Baskerville | approved 01 baseline | ANTH (canvas bundle); UUPM 1 row | weak |
| Clash Display, Satoshi, Cabinet Grotesk | approved premium 03 | ANTH (Cookbook "Startup") | weak |
| Crimson Text | not approved, not banned | IMP ("Crimson", R); UUPM 1 row | weak |
| Public Sans, Lexend, Atkinson Hyperlegible | approved | UUPM (2 rows each) | weak |

## 8. Verification

- `python -X utf8 chwezi-engine-agents/scripts/validate-rule-markers.py design-system-skills/doctrine/references/ai-slop-banned-fonts.md`
  → PASS, 29 markers, sidecar checked, 0 findings.
- `node hooks/test-banned-font-gate.js` → all cases pass after the JSON change.
- `python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json` → see the
  M10-09 evidence file.
