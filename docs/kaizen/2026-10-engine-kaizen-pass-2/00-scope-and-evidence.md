# 00 — Scope and evidence (pass 2)

**Engine:** Chwezi Design Engine (`peterbamuhigire/chwezi-design-engine`)
**Cycle:** October 2026 Portfolio Kaizen, pass 2 (a continuation of the 29 October pass; its evidence is in [`../2026-10-engine-kaizen/`](../2026-10-engine-kaizen/05-final-report.md))
**Date:** 2026-10-31
**Starting branch / HEAD:** `main` at `fe7bac7079f829607a2315ab49f2e399d576f4d3`
**Work branch:** `kaizen/2026-10-pass2` (created from that HEAD; nothing pushed, tagged or released)

## Preconditions (Step 0)

- `git status --porcelain` was empty at the start: no uncommitted files from anyone else, so nothing to preserve.
- Read in order: the shared brief, the engine prompt, the Portfolio Kaizen Standard, the currentness gate, `AGENTS.md`, the 29 October `05-final-report.md`, `06-next-cycle.md`, `01-baseline-scorecard.md` and `04-validation-record.md`, the 29 September re-audit roadmap and master scorecard, and the font watchlist note.
- The 29 October backlog (D-1 diagram route, D-2 source register, D-3 file-entry guard, D-4 portable paths in six skills, D-5 font render proof) is closed in the history. This pass does not repeat it. Its carry-forward items are mapped in [02-improvement-backlog.md](02-improvement-backlog.md).
- Open findings quoted in the prompt were each re-measured before acting (table below).

| Finding quoted in the prompt | State on 2026-10-31 | How confirmed |
|---|---|---|
| Fixture coverage 0/101; Tier 3 unexecuted | **Still open**: 1/102 skills have three positives and two owned negatives (the diagram route); 58/102 have at least one positive; 44 have none. Tier 3 `NOT_ASSESSED` (no paid calls) | independent count over `tests/routing-fixtures.yml` by `measure.py` (scratch, not committed) |
| Diagrams have no owning skill | **Closed** on 29 October (`diagram-design-and-handoff`) | `skills/12-data-viz-and-dashboards/diagram-design-and-handoff/SKILL.md` exists; routes first for the Task 3 diagram prompt |
| Generic four-step workflow in `sector-strategies`, `legal-sector-ui-ux`, `ux-psychology` | **Open for two of three**: `ux-psychology` was already repaired; `legal-sector-ui-ux/SKILL.md:41` and `sector-strategies/SKILL.md:44` still say "Read only the relevant project inputs" | `grep` over `skills/**/SKILL.md` |
| Six skills park depth in `legacy-guidance.md` | **Open, five files** across `brand-style-guide`, `color-selection`, `ux-psychology`, `legal-sector-ui-ux`, `sector-strategies` | `find skills -name legacy-guidance.md` |
| `doctrine/examples/` empty | **Open**: the directory does not exist, and `doctrine/design-doctrine.md` still promises it at line 104 | `test -d doctrine/examples` |
| Doctrine header v0.2.0 | **Open**: `doctrine/design-doctrine.md:3`. Canonical doctrine: not changed here; question escalated in [06-next-cycle.md](06-next-cycle.md) | file read |
| Register has five rows, one malformed ISO link, no EN 301 549 or EAA, token edition unnamed | **Closed** on 29 October (12 rows). A different defect was found: the token skill names the 2025.10 edition but its worked example does not follow that edition's value shapes (Task 1) | `governance/standards-source-register.md` and the Task 1 checks below |

## Tooling on this machine

`python3` 3.14, `node` 22, no `pytest`, no `pwsh`. The 29 October record used an external venv that does not exist here, so the pytest-only suite is `NOT_ASSESSED` for this pass (exact error: `/usr/bin/python3: No module named pytest`). New Python tests added in this pass are written as `unittest.TestCase` so they run under `python3 -m unittest`.

The detector's browser tier needs a locked Playwright. None is installed in this repository (and nothing was installed). A scratch project outside the repository declares `playwright` 1.64.1 in `package.json` and `package-lock.json` and points `node_modules` at an existing read-only install on this machine; the detector accepted it, and it flagged every flag fixture in `tests/fixtures/slop-browser` (positive control: 11 findings, exit 2). Chromium came from the existing Playwright cache.

## Step 1 — practitioner tasks

All artefacts were produced outside the repository. Fonts: Public Sans 2.001 and Source Serif 4.005 (both SIL OFL 1.1) downloaded from the upstream revisions recorded on 29 October; the SHA-256 of both files equals the hashes recorded then, an independent reproduction of that record.

### Task 1 — token pack, data table with sorting, empty and loading states, Compose equivalent

- **Request:** produce a three-tier token pack and one documented component (a sortable data table with empty and loading states) for web, then the Compose equivalent from the same tokens.
- **Router choice (lexical ranker over fresh frontmatter, plus reading the skills):** `design-tokens-and-naming` (first for the token prompt), `empty-error-and-loading-states` (first for the table-states prompt; its description names table components), `component-states-and-interaction-fidelity`, `android-ui-ux-design` for Compose. **Right for the first three. The Compose prompt ranked `data-illustration-and-infographics` first and `android-ui-ux-design` outside the top four**: a lexical miss. An agent reading descriptions would choose correctly, but no fixture guards this route.
- **Outputs (scratch):** `tokens.json` (57 colour and 15 dimension tokens, primitive to semantic to component, plus a dark re-point), generated `tokens.css` and `Tokens.kt` from that one source, `table.html`.
- **Behaviour measured in Chromium:** header buttons sort ascending then descending by keyboard (Enter), `aria-sort` follows, a polite live region announces the sort; the empty state removes the header and explains the next step; the loading state sets `aria-busy="true"` and shows four skeleton rows; contrast of every text role passed in both themes (lowest 7.12:1 light, 7.19:1 dark); focus ring present on header buttons; controls are at least 26 px high. Fonts loaded (`document.fonts.check` true for both).
- **Detector:** static tier 0 findings with `--fail-on warning`; browser tier 0 findings.
- **Not verified:** the Kotlin was not compiled (no `kotlinc`, `gradle` or `java` on PATH) and the Compose composable was not written or run. `NOT_ASSESSED`.

Defects and gaps found while doing the task:

| ID | Severity | Where | Finding |
|---|---|---|---|
| T1-1 | **Major** (contradictory guidance, interoperability) | `skills/09-design-systems-tokens-and-theming/design-tokens-and-naming/SKILL.md:112` and `:215`, `examples/tokens.json:7-35` (colour) and `:40-72`, `:57-63` (dimension), `references/token-export-formats.md:18` | The skill and the register (DGN-008) name Design Tokens Format Module 2025.10. In that edition a `color` value is an object (`colorSpace`, `components`, optional `alpha` and `hex`) and a `dimension` value is an object (`value`, `unit` of `px` or `rem`); a CSS string such as `oklch(0.6 0.16 255)` or `16px` is not defined. Verified against the primary pages, saved locally (Format Module and Color Module, both dated 28 October 2025). The shipped example has 31 of 63 colour and 18 of 26 dimension tokens in string form; `measured-style-pack/examples/tokens-from-pack.json` has 3 of 3 and 11 of 11. The skill also says to "keep a hex fallback in the same token", but the example has none and the string form has nowhere to put one (in 2025.10 it is the `hex` property) |
| T1-2 | **Major** (wrong evidence in an accessibility example) | `examples/tokens.json:86,87,88,98,116,159,160,161,162,164,166` | Of 11 contrast pairs the file states, **9 differ by more than 0.15 from the rendered value**. Worst: `text.on-action` on `action.primary.bg` is stated as 6.4:1 and measures 4.86:1; dark `text.link` is stated 7.9:1 and measures 9.52:1. No pair flips pass to fail, but an agent copying the file copies unverified numbers. The file's header says they are illustrative and need recalculation; nothing checks them. Colours were rendered by Chromium for the comparison, and an independent OKLCH conversion agreed to within one level per channel except one out-of-gamut tint (gamut-mapping differs by design). Full table: `04-validation-record.md` |
| T1-3 | **Major** (tooling) | `scripts/validate_token_example.py:16-17` and `:92-96` | The only token validator is specific to the canonical example. Run on a practitioner's own pack it reports four findings that are not defects of the pack: `size.target-min` is read as an unreferenced component token, and three example-only roles (`semantic.color.action.danger.bg`, `...danger.fg`, `semantic.radius.control.sm`) are "missing". The skill says to execute schema, contrast and export checks; no script does that for a real pack, and none checks value shapes against the named edition |
| T1-4 | Minor | `tests/routing-fixtures.yml` | No fixture for the Compose-table route (`android-ui-ux-design`), which a lexical ranker misses |

### Task 2 — audit a screen with seeded contrast, focus-order and target-size defects

- **Request:** audit a supplied screen with deliberate contrast, focus-order and target-size defects; check every defect is found with the criterion it fails.
- **Supplied screen:** none was supplied again. A seeded fixture was written instead, with a ground-truth list of six defects. Findings below describe the fixture only; the supplied-screen audit stays `NOT_ASSESSED`.
- **Router choice:** `accessibility-wcag-2-2-compliance` (first), `accessible-color-and-contrast`, `touch-gesture-and-haptics`. Right.
- **Seeded defects:** D1 body text 3.19:1 on white (1.4.3); D2 control border 1.48:1 (1.4.11); D3 positive `tabindex` 3, 1, 2 (2.4.3); D4 `flex-direction: row-reverse` so visual order differs from DOM order (1.3.2, 2.4.3); D5 three 20 by 20 px icon buttons with 2 px gaps, which also fail the spacing exception (2.5.8); D6 `outline: none` on inputs and buttons (2.4.7).
- **Engine automation, as shipped:** the browser tier found **D1** (`low-contrast-computed`, 3.19:1, block). The static tier found **D6** (`focus-indicator-removed`, WCAG 2.4.7, warning). **D2, D3, D4 and D5 were not found: recall 2 of 6.** The registry has no target-size rule and no focus-order rule (`node tools/slop-detector/cli.mjs --list-rules`: 49 rules, 7 browser, none for 2.5.8 or 2.4.3).
- **Skill guidance:** the skill and `references/keyboard-and-focus.md` tell a practitioner what to check for D1, D3, D4 (visual reordering and positive `tabindex`), D5 (2.5.8, with the 24 px circle rule) and D6, and name their criteria. **1.3.2 Meaningful Sequence is named nowhere** in the accessibility skill or `doctrine/references/wcag-2.2-criteria.md`; D4 is attributed only to 2.4.3.

| ID | Severity | Where | Finding |
|---|---|---|---|
| T2-1 | **Major** (scanner false negatives) | `tools/slop-detector/rules/registry.json`, `tools/slop-detector/lib/browser-rules.mjs` | The engine's machine accessibility check misses target size (2.5.8) and positive `tabindex` (2.4.3). The audit skill asks for them by hand; a pipeline that trusts the detector passes the fixture's D3 and D5 |
| T2-2 | Minor | scanner scope | D2 (non-text contrast) and D4 (DOM versus visual order) need judgement about which borders identify a control and whether a reorder changes meaning. Recorded as known false negatives, not padded into a rule |
| T2-3 | Minor | `skills/00-cross-cutting-ops-qa-a11y/accessibility-wcag-2-2-compliance/` | 1.3.2 is not named |

### Task 3 — branded proposal style and one diagram from the same tokens

- **Request:** produce a branded proposal document style and one diagram from the same tokens; check the font gate and slop detector pass on the rendered output.
- **Router choice:** `pdf-proposal-and-bankable-document-design` (0.41), `docx-report-and-document-formatting`, `diagram-design-and-handoff` (first for the diagram prompt). Right; the diagram route added on 29 October worked.
- **Outputs (scratch):** `proposal.html` using the Task 1 `tokens.css` (semantic names only), an inline SVG request-flow diagram, a two-page A4 tagged PDF with a title and outline.
- **Source-level checks:** the banned-font hook allowed the file; a control copy with `"Public Sans"` replaced by `"Inter"` was blocked (exit 2). The static detector found two real issues in the first draft (a decorative side stripe on the cover, AS2, and 11 px SVG text); both were fixed and the second run had zero findings with `--fail-on warning`. The browser tier had zero findings.
- **Rendered output:** `document.fonts.check` true for both faces. `pdffonts` lists subsets of `PublicSans-Thin` and `SourceSerif4Variable-Roman`, all embedded, subset and Unicode. Both variable fonts are written as **Type 3** fonts by this Chromium build, which print workflows can reject; the PDF checklist does not mention Type 3. PDF/UA-2 was not tested: no `verapdf` on this machine. `NOT_ASSESSED`.

| ID | Severity | Where | Finding |
|---|---|---|---|
| T3-1 | **Major** (false negative, no rendered-output gate) | `hooks/lib/font-matcher.js:95-115` (`bannedEntry`) and no script for rendered files | The font gate matches CSS family names. A PDF carries PostScript names. A control PDF set in Montserrat (secondary-ban) embeds `Montserrat-Bold`; the matcher does not flag it. A 44-name probe of PostScript-style names (`Inter-Regular`, `IBMPlexSans-Regular`, `Roboto-Regular`, `OpenSans-Regular`, `Lato-Regular`, `ArialMT`, `Arial-BoldMT`, `Fraunces9pt-SoftLight`, `SpaceGrotesk-Medium`, and others) flagged only the ones that happen to equal a CSS name. The task asks that the font gate pass on the rendered output; today it cannot fail on one |
| T3-2 | Minor | `tools/slop-detector/lib/browser.mjs` | The browser tier checks screen viewports (390 by 844 and 1440 by 900), not the printed PDF; a document skill cannot rely on it for page layout |
| T3-3 | Minor | `skills/13-presentations-and-documents/pdf-proposal-and-bankable-document-design/references/print-ready-pdf-checklist.md` | No mention of Type 3 fonts produced from variable fonts |
| T3-4 | Minor | `tools/slop-detector` `tiny-text` | Fires on SVG text sized in viewBox units, which scale with the figure; a false-positive class, recorded not changed |

## Other defects found by direct inspection

| ID | Severity | Where | Finding |
|---|---|---|---|
| H-1 | **Critical** (legal, privacy and provenance; the repository is public: `gh repo view` reports `PUBLIC`) | `skills/04-web-and-ui-design/premium-ui-ux-design/references/source-register.md:7-21` | Lists seven local Windows download-folder paths to `.epub` files. Two of the file names carry the tags `z-library.sk, 1lib.sk, z-lib.sk`, which mark the copies as obtained from an unlicensed library, in contradiction of the engine's own rule that knowledge enters only from purchased books. Personal paths and the user name sit in a public repository (security rule: sanitise before public) |
| H-2 | Major (privacy, portability) | `hooks/token-file-gate.js:8`, `skills/00-cross-cutting-ops-qa-a11y/design-audit/SKILL.md:101`, `skills/00-cross-cutting-ops-qa-a11y/plan-canvas-design-review/SKILL.md:10,303` | The same local user-name download-folder path to a third-party repository copy in two skills and a hook comment |
| H-3 | Major (portability) | `AGENTS.md:66,79,167`; `integration/integration-plan.md:58-65`; `integration/migration-manifest.md:16,32` | Machine-specific Windows web-root paths in the router and integration records. The 29 October pass cleaned six active skills only. `doctrine/design-doctrine.md:161` carries one more; canonical doctrine, so escalated rather than edited |
| H-4 | Major (prompt guardrail: no relative links into sibling checkouts) | `skills/00-cross-cutting-ops-qa-a11y/design-engine-and-product-improvement/SKILL.md:169`, `slop-doctrine-refresh-and-research-loop/SKILL.md:138`, `visual-product-slop-audit/SKILL.md:145` | Three markdown links climb out of the repository (`../../../../digital-research-engine/...`, `../../../../chwezi-dev-engine/...`); none resolves inside this repository, and the check was done by hand on 29 October, not by a validator |
| X-1 | Major (tooling; named in the brief) | `scripts/validate_cross_engine_routes.py:36` and `:51-56` | The validator resolves `target_repository` as a folder name beside this checkout. On this machine the dev and SDLC engines live under other names and paths, so six of the declared routes report `NOT ASSESSED` (exit 1) with the default layout. With a scratch directory of symlinks named by the new repository names, all declared routes resolve (0 findings). The fix is a configurable map, not a hard-coded path |
| X-2 | Note | cross-engine | The vendored detector in `website-skills/scripts/vendor/chwezi-slop` is **in step** with this engine at the start: registry SHA-256 `750eaf52...cd0` on both sides, banned-font sidecar SHA-256 `9039a9dd...d0` on both sides, and `diff -rq` of the two detector trees shows only this engine's `README.md` and `test/` absent from the vendor copy. Any rule added here in this pass will put the copy out of step; that mismatch will be recorded, not edited |
| P-1 | Note (performance on this host) | `hooks/test-slop-immediate.js` | The immediate hook's median on a 500-line CSS file was 1908 ms against a stated target of 1000 ms (the test's own ceiling is 3000 ms; test passed). Recorded; not a defect of the hook logic |

## Router and guidance record

Points where guidance was **missing**: a generic token-pack validator (T1-3); 1.3.2 (T2-3); Type 3 font handling (T3-3); a rendered-output font gate (T3-1). **Contradictory**: token edition named versus example shape (T1-1); "keep a hex fallback in the same token" versus an example with none (T1-1). **Ignored by the shipped example**: the skill's own rule that contrast results be recorded and recalculated after any change (T1-2).

## Preserved checkout state

Clean `main` at `fe7bac7`; no pre-existing uncommitted files. Every commit in this pass adds explicit paths only.
