# 06 — Next cycle (pass 2)

**Improvement target:** 95/100 remains a target, not a forecast ([05-final-report.md](05-final-report.md)). **Targeted re-check:** 2026-12-29 (the font watchlist and any registry row that moved). **Full re-audit:** 2027-01-27 (the register's review date), with the real inputs listed below.

## Decisions needed from Peter

1. **Doctrine header and promises** (`doctrine/design-doctrine.md`): the header is v0.2.0 (line 3) although section 6 says a ban change bumps the minor version; section 3 promises `doctrine/examples/`, which does not exist (line 104); section 5 (line 161) names a Windows web-root checkout path. Canonical doctrine, so not edited. The portability allowlist carries the line-161 exception with this reason until you decide.
2. **Public history.** The source register that listed local download paths and acquisition-site file names (finding H-1) is repaired in the working tree, but earlier commits on a public repository still contain it. Rewriting history is outside this pass's permissions. Decide whether to rewrite or accept the exposure.
3. **Font licence files** (29 files under `fonts/*/LICENSE.txt`) carry a local drive origin line. They are your provenance records, so they are allowlisted, not edited.
4. **Merge.** The work is on `kaizen/2026-10-pass2`. `main` is unchanged.

## Open findings

| Priority | Finding | Acceptance evidence |
|---|---|---|
| P1 | Rerun the three practitioner tasks with a real brief and the supplied screen; compile the Compose output | Recorded input, owner, approved tokens, the built Kotlin and a device or emulator run; the seeded fixture stays separate from any supplied screen |
| P1 | PDF/UA-2 and assistive-technology testing of the proposal output, and print-bureau acceptance of Type 3 variable fonts | A named validator run (for example veraPDF), a screen-reader pass, and the bureau's answer, each recorded or marked `NOT_ASSESSED` |
| P1 | Run the pytest-style suite under real pytest and confirm the `conftest.py` fix | `python -m pytest -q` output on a host that has it; the stand-in runner is not a substitute |
| P1 | Import the migrated token files into Style Dictionary and Figma | Tool versions, the command, the output files, and any value the tool rejects |
| P2 | Routing gaps from S7: a web self-hosting prompt ranks `font-embedding-and-licensing` 100th; natural cross-platform prompts rank the platform skills above `cross-platform-design-parity` (three phrasings); a delete-confirmation prompt ranks `error-empty-and-system-messaging` 33rd | Decide with real requests whether to change the three descriptions; re-run the smoke test; do not tune descriptions to fixtures alone |
| P2 | Remaining stubs: `sector-strategies` keeps the generic workflow; five skills park depth in `legacy-guidance.md` (`brand-style-guide`, `color-selection`, `ux-psychology`, `legal-sector-ui-ux`, `sector-strategies`) | One skill per cycle, built from task-organised references; the contract validator and fixtures stay green |
| P2 | The legal-sector references are written around US-style state-bar rules and carry unsourced conversion statistics (`references/legacy-guidance.md`, "Conversion and Intake"); the target market is East African | Source the statistics or remove them; add jurisdiction-specific reviewer prompts for the regimes the firm serves, each with a primary source |
| P2 | Fixture coverage for the other 91 skills | Three positives and two owned negatives each, from real reviewer requests rather than skill descriptions |
| P2 | Scripted checks for 1.4.11 (non-text contrast) and DOM order against visual order (1.3.2) | A rule with a flag and a pass fixture that a reviewer agrees has no common false positive, or a recorded decision that it stays manual |
| P2 | `doctrine/examples/` promise, worked-example depth (11 skills under 250 words), six skills over 20 KiB | Examples produced and checked; size split only where it helps routing |
| P2 | Three sources `NOT_ASSESSED`: ISO 14289-2, the EUR-Lex text of Directive (EU) 2019/882, the Material guidance site | A reachable primary source for each, or a licensed copy, with access date |
| P3 | Rendered-PDF coverage in the detector: the browser tier checks screen viewports, not printed pages; `tiny-text` fires on SVG text sized in viewBox units | A print-media probe, or a recorded limitation in each document skill |

## Cross-engine mismatches (recorded, not edited)

| Engine | Mismatch | Files on both sides | Fix for that engine's cycle |
|---|---|---|---|
| website-skills | The vendored detector is out of step with this engine after S4: the registry, `lib/checks.mjs` and `lib/browser-rules.mjs` differ; the banned-font sidecar and `hooks/lib/font-matcher.js` are identical. Its own hash check compares against this engine when it finds the checkout, so it will report drift | this engine `tools/slop-detector/rules/registry.json` (sha256 `a4d34400...9ccc`, 51 rules), `tools/slop-detector/lib/checks.mjs`, `tools/slop-detector/lib/browser-rules.mjs`; that engine `scripts/vendor/chwezi-slop/VENDOR.json` (registry sha256 `750eaf52...cd0`, source commit `3fe84a6`) and the three vendored files | Run `python -X utf8 scripts/check-vendored-detector.py --sync-from <design engine checkout>` in that repository, review, and commit; then check any count of 49 rules in its slop-pack tests and `quality/slop-rules.website.json` |
| chwezi-engine-agents | The catalogue lists two validators for this engine; the engine now has more that a portfolio run should execute | `catalog/engines.yaml` (entry `chwezi-design-engine`, lines 72-79) against this engine's `.skills-engine/engine-manifest.yaml` | Add `python -X utf8 scripts/validate_portability.py`, `node hooks/test-rendered-font-names.js` and the detector suite; `validate_engine.py` already runs the portability gate |
| digital-research-engine and every router that copies its boilerplate | The standard and the gate name a Windows web-root path to the research engine | research engine `docs/continuous-improvement/portfolio-kaizen-standard-2026-08.md` (line 76) and `docs/continuous-improvement/kaizen-currentness-gate.md` (lines 52 to 53) against this engine's `AGENTS.md`, now written without paths | Portfolio cycle: replace with an identifier plus the workspace map, and run the portability gate over each router |
| All other routers | Checked once: the secondary-ban list in the router of each of the other 11 engines agrees with this engine's sidecar (`Cormorant (all cuts)` covers Cormorant Garamond). The hard-ban list was not compared | each engine's `AGENTS.md` trigger block against `doctrine/references/ai-slop-banned-fonts.json` | Add a parity check to the portfolio gate |

## One small experiment for next time

Take the three practitioner tasks to a real project with its own brief, and run one rendered-PDF check chain on its proposal: `check-rendered-fonts.js`, a PDF/UA validator, and a screen-reader read. Measure how many of the defects that chain finds were already caught by the detector. If the detector found none of them, the next investment is a print-media probe, not another rule.

## Improvement loop

Keep canonical doctrine unchanged unless the owner authorises a review. Freeze a fresh scorecard before implementation; write the failing control before the check; measure with something other than the generator being measured (a browser for colour, a primary page for a standard); and distinguish observation, synthesis, inference and `NOT_ASSESSED`. A score rises only with new evidence for its dimension.
