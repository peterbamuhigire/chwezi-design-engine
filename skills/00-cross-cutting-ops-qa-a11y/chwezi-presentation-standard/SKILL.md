---
name: chwezi-presentation-standard
description: "Use when a Chwezi slide deck (board, investor, proposal, status, training, case study) is released as PPTX or landscape PDF: claim ledger, assertion headlines, venue-computed legibility, editable native objects, PDF parity, eight DECK gates and scorecards. General slide craft: deck-system; narrative spine: design-storytelling-and-case-studies."
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Chwezi Presentation and Slide Deck Design Standard

Applies the Chwezi Presentation and Slide Deck Design Standard (full edition, 1.0.0) to decks and
decides whether they may be released. Adopted into the engines on 8 November 2026 on the instruction
of Lead Developer Peter Bamuhigire. Binding text:
[doctrine/presentation-standard.md](../../../doctrine/presentation-standard.md). Everything needed to
brief, storyboard, build, check and release a deck is in this engine; no other engine is required.

## Use When

- A Chwezi deck is planned, built, reviewed or released: executive review, board briefing, investor
  pitch, consulting or tender proposal, project status, training, case study, sales or credentials.
- A deck must be exported to a landscape PDF that matches the PowerPoint slide for slide.
- Someone asks whether text will be readable in a given room, or why a deck feels crowded.
- A product exports figures into slides.

## Do Not Use When

- The work is general slide craft for a non-Chwezi deck: use `deck-system`; the narrative spine alone
  goes to `design-storytelling-and-case-studies`.
- The output is a long-form document or report: use `chwezi-document-publishing-standard`; the figures
  themselves follow `chwezi-reporting-and-dashboards-standard`.
- The work is a live app screen: use `chwezi-product-excellence-standard`.

## Required Inputs

| Input | Supplied by | If missing |
|---|---|---|
| Audience, decision sought, mode, talk length, language | Requester | Stop and ask; the storyboard depends on them |
| Venue: farthest viewer distance and screen image height | Organiser | Assume D/H = 6 (27 pt minimum) and record the assumption |
| Evidence and sources for every material claim | Owner, analysts | Build the claim ledger; block any claim without evidence |
| Brand tokens and master template | Brand pack | Use house-style tokens; record it |
| Image rights and permissions | Owner | Leave unlicensed assets out |
| Deliverables, confidentiality, compatibility needs | Requester | PPTX plus landscape PDF; confidential by default |

## Workflow

1. **Brief**: record audience, decision, mode, runtime, venue, language, brand, sources, sensitivity
   and formats ([agent-workflow-and-qa.md](references/agent-workflow-and-qa.md)).
2. **Evidence**: build the claim ledger; stop if a material claim has no evidence.
3. **Storyboard**: thesis plus assertion headlines; read the headlines alone
   ([narrative-and-blueprints.md](references/narrative-and-blueprints.md)).
4. **Compute**: the venue minimum size, type scale, grid, image budget and runtime budget
   ([mathematics-and-legibility.md](references/mathematics-and-legibility.md)).
5. **Build**: one blueprint per communication job, native objects on the master and theme
   ([production-contracts.md](references/production-contracts.md)).
6. **Editorial, visual and accessibility QA**: render every slide; fix clipping, crowding, contrast and
   reading order.
7. **Export QA**: landscape PDF compared page by page; offline and second-machine tests.
8. **Score**: six dimensions at least 4 of 5; slide scorecard average at least 90.
9. **Release** with the QA log, licence manifest, claim register and handoff manifest; any open DECK
   gate blocks release. Recover from a failed check by fixing it and re-running, never by downgrading
   its evidence.

## Decision Rules

| Situation | Choose | Risk if wrong |
|---|---|---|
| Body text would fall below the venue minimum | Fewer words, larger type, or a handout | The back of the room cannot read the slide |
| A figure has no ledger entry | Remove it or mark it illustrative | A fabricated claim reaches a board or investor |
| A bar chart's differences look small | Keep the zero baseline; annotate the difference | A truncated axis exaggerates the story |
| Shares must total 100% | Largest-remainder rounding | 99% or 101% undermines every other number |
| The talk is 15 minutes and the draft has 40 slides | Cut to about 10-20 substantive slides; move detail to the appendix | A lecture in disguise; the decision gets lost |
| A photograph has unclear rights or is AI-generated | Replace it, or disclose and never present it as evidence | Legal exposure; misleading proof |
| The deck will be read on phones | A PDF with large headlines or a vertical executive summary | A 16:9 deck nobody can read on a phone |

## Capability Contract

- Read: briefs, source data, claim ledgers, templates, PPTX and PDF files.
- Execute: rendering, PDF export and comparison, contrast and legibility calculations where available.
- Edit: only on a build or remediation request; reviews are read-only.
- No sending, publishing or presenting on someone's behalf without authority.

## Degraded Mode

- No renderer: deliver the storyboard, ledger and slide specifications; DECK-GATE-03, 04 and 08 stay
  NOT_ASSESSED.
- Unknown venue: compute for D/H = 6 and record the assumption.
- No PowerPoint: build with another OOXML tool, record it, and test opening in PowerPoint before
  release.
- In every degraded case release is blocked until the gates are measured.

## Anti-Patterns

- Choosing a template before the message. Correction: thesis and headlines first, then blueprints.
- Topic titles ("Q3 results"). Correction: assertion headlines ("Q3 sales beat plan by 8%").
- Shrinking text to fit. Correction: compute the venue minimum; cut words or move detail to notes.
- Screenshots of tables and charts. Correction: native tables and charts bound to the theme.
- Ending on "Thank you". Correction: the ask, owner, cost and next step.
- Shipping after viewing thumbnails only. Correction: render every slide at full size and compare the
  PDF page by page.

## Outputs

| Output | Consumer | Accepted when |
|---|---|---|
| Storyboard and claim ledger | Editorial reviewer | Headlines form the argument; every material claim verified or blocked |
| Editable PPTX | Presenter, client | Native objects, theme-bound, legible at the venue |
| Landscape PDF | Readers | Page-for-page parity; fonts embedded; links work |
| QA log, licence manifest, handoff manifest | Release approver | All gates MEASURED; dimensions at least 4; scorecard average at least 90 |

## Examples

- [Worked review: quarterly board deck (fictional)](examples/worked-review-board-deck.md): ten
  findings, including a venue legibility calculation and a largest-remainder fix.

## References

- [rules-and-gates.md](references/rules-and-gates.md): every DECK rule and the eight gates.
- [narrative-and-blueprints.md](references/narrative-and-blueprints.md): deck framing, sequences by
  deck type, 29 blueprints by communication job, composition, reference lessons.
- [mathematics-and-legibility.md](references/mathematics-and-legibility.md): venue legibility law,
  display image size, modular type scale, grid arithmetic, image resolution, measured white space,
  runtime budget, computed colour, nice ticks, largest remainder.
- [production-contracts.md](references/production-contracts.md): tokens, editable PowerPoint, landscape
  PDF, imagery, motion, devices, charts.
- [agent-workflow-and-qa.md](references/agent-workflow-and-qa.md): ten steps, claim ledger,
  scorecards, test matrix, handoff manifest, retrospective, master instruction.
- [currentness-register.md](references/currentness-register.md): WCAG, PowerPoint accessibility, OOXML,
  PDF/UA, legibility and display-size sources.
- Companion standards: [chwezi-document-publishing-standard](../chwezi-document-publishing-standard/SKILL.md)
  and [chwezi-reporting-and-dashboards-standard](../chwezi-reporting-and-dashboards-standard/SKILL.md).

## Evidence and currentness

Standards facts are recorded in the currentness register (PR1-PR7). Type, grid and white-space values
are Chwezi values from the handbook; legibility, grid, resolution and runtime figures were computed on
2026-11-08. Following this standard is not a claim of WCAG or PDF/UA conformance.
