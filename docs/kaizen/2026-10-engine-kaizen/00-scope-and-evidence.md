# 00 — Scope and evidence

**Engine:** Chwezi Design Engine (`peterbamuhigire/chwezi-design-engine`)  
**Cycle:** October 2026 Portfolio Kaizen  
**Baseline ref:** `c9b334d`  
**Branch:** `kaizen/2026-10`

## Scope decisions

This cycle applies the October Portfolio Kaizen prompt to the design engine only. Repository scope is this checkout; sibling-engine observations are recorded for handoff, not edited here. The checkout was clean at the baseline and no pre-existing user changes were found to preserve. No canonical doctrine or house font rulings are changed in this cycle. No paid model calls, public submissions, releases, or host configuration changes are in scope. Temporary browser and font work stays outside this repository.

The cycle runs the three practitioner tasks from the prompt through the engine router. The prompt did not include the “supplied screen”; the audit uses a clearly identified synthetic specimen and leaves supplied-screen evidence `NOT_ASSESSED`. (Observation.) The cycle reports two ceilings: the Portfolio Kaizen Standard ceiling of 65 and the user-specified initial ceiling of 45. The latter governs the cycle’s published score; neither ceiling lowers the raw score.

## Evidence classes

- **Observed:** checkout state and version control; command output; installed native plugin manifests and offline debug prompt; local files and fixture contents; rendered temporary artifacts; measured browser results.
- **Inference:** dimension scores, priorities, task suitability and root causes; each is labelled as judgment or inference in the relevant record.
- **NOT_ASSESSED:** a check that did not run, a missing input, an unsupported source claim, or evidence that does not prove the named outcome. Absence is never reported as a pass.

## Practitioner-task record

1. **Shared token pack, sorted web table and Compose equivalent.** Router route: token naming, component architecture/handoff, Android UI table reference. Temporary HTML/JSON/Kotlin and rendered screenshot are retained outside the checkout. The task brief omits a client, data model, theme contract and approved palette; outputs are illustrative. Sorting and the Compose implementation are not executable.
2. **Accessibility audit of a supplied screen.** The supplied screen is absent from the handoff and located local fixtures. A synthetic, deliberately flawed disposable screen was audited. Browser evidence finds a contrast failure and off-screen skip link; keyboard traversal identifies reordered focus; measured target boxes are below the engine’s stated floor. Supplied-screen inspection remains `NOT_ASSESSED`.
3. **Branded proposal style and diagram from shared tokens.** Router route: PDF proposal design and token guidance. Diagram work falls back to the DOCX diagram reference because no diagram-owning skill exists. Temporary HTML, SVG, PDF and renders are retained outside the checkout. Browser slop rules pass after a responsive sizing correction. The font declaration passes the banned-name hook, but selected-font rendering and embedding are `NOT_ASSESSED` because those font files are unavailable in the initial environment.

Full specimen routes, measured outputs, source locations and defects are in this folder’s `04-validation-record.md`; temporary source artifacts are described there without machine-specific paths.

## Preserved checkout state

No uncommitted user-authored changes were present at baseline (`git status --short --branch` showed a clean `main` at `c9b334d`). Branch creation occurred only after the baseline read; all baseline evidence is frozen in `01-baseline-scorecard.md` before repository content changes.

## Cross-engine observations (no edits here)

The local cross-engine validator cannot resolve the declared `chwezi-sdlc-documentation` and `chwezi-dev-engine` repositories in the supplied workspace; those routes are `NOT_ASSESSED`, not validated. The diagram/proposal styling boundary and missing diagram skill are recorded in `06-next-cycle.md` for the portfolio/design handoff. No changes are made to those repositories.
