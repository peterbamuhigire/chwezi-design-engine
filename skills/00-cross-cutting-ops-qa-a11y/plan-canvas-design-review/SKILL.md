---
name: plan-canvas-design-review
description: Use when a local design artefact needs a human reviewer to point at an exact element and deliver an Approve or Request-changes verdict with anchored feedback. Use design-audit or design-qa-and-pre-launch-review to produce findings; this skill runs the review loop.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
  origin: "Adapted from ECC's plan-canvas skill (C:\\Users\\Peter\\Downloads\\ECC-main\\skills\\plan-canvas\\SKILL.md), reframed for design critique and pre-launch review rather than implementation plans."
---

# Plan Canvas for Design Review
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178. Mechanism
adapted from ECC's `plan-canvas`.

<!-- dual-compat-start -->
## Use When

- A design deliverable — a rendered HTML preview, a `design-preview.html` from
  `design-system` generation, a screen comp, a `design-audit` report, or a
  `design-qa-and-pre-launch-review` checklist — is ready for **human sign-off**, and the
  reviewer needs to **point at the actual element** rather than describe its location in
  prose ("the header is too big" → an annotation anchored to `h1.hero-title`, not a sentence
  that has to be re-parsed against the page).
- You are running a **design critique** (see `design-critique-and-review-facilitation`) and
  want the session's feedback captured as structured, anchored annotations instead of a
  meeting transcript someone has to mine for actionable items afterward.
- You need an **Approve / Request-changes verdict** recorded against a specific design
  artefact — the canvas verdict is the gate this engine's `design-qa-and-pre-launch-review`
  needs before a release ships, in the same way ECC uses it for the `/plan` confirmation gate.
- Feedback keeps arriving as ambiguous prose ("move this down", "the spacing feels off up
  top") that costs a round-trip to disambiguate against the live artefact.

Do NOT use for: code diffs (`code-review`), a design **critique session's** facilitation
mechanics (that is `design-critique-and-review-facilitation` — this skill is the tool a
facilitated or async review can use to capture verdicts, not a replacement for running the
session), or remote/production URLs. The canvas serves local artefact files only, per ECC's
own boundary.

## Do Not Use When

- The reviewer will only ever type free-text feedback in chat and has no interest in a
  browser-based annotate loop — this skill adds mechanism for no benefit in that case. A
  plain prose review is fine.
- You need the **expert findings** in the first place, not the human verdict on them — that
  is `design-audit` (scored critique) or `heuristic-evaluation-and-design-critique`
  (structured heuristic walkthrough). This skill consumes their output as the artefact under
  review; it does not generate findings itself.
- The artefact is not a local file — the canvas server is loopback-only by design (ECC's own
  constraint) and does not proxy or fetch remote/production pages.

## Dependency and current status — read before wiring this up

This skill assumes the `ecc-plan-canvas` CLI: a detached loopback server
(`127.0.0.1:4517`), zero runtime dependencies, that opens a local `.md`/`.html` artefact in
the reviewer's browser with an annotation layer injected, and blocks the agent on a single
`await` call that returns the reviewer's feedback as JSON. **Do not port the CLI implementation
(server, sessions, markdown/HTML rendering) into this engine as a second, independently
maintained copy.** That work belongs to whichever engine vendors it first and everyone else
should call into it.

**Update (2026-09-20, later the same day): the CLI has since been vendored in `chwezi-sdlc-documentation`.**
This was checked directly, not assumed — `C:\wamp64\www\chwezi-sdlc-documentation\scripts\plan-canvas.js` now
exists, with the full implementation under `chwezi-sdlc-documentation/scripts/lib/plan-canvas/` and both
hooks (`plan-canvas-pending.js`, `plan-canvas-sessions.js`) wired into `chwezi-sdlc-documentation/hooks/hooks.json`.
It is real, tested infrastructure, not a stub: all 128 of ECC's own ported tests pass there
(markdown 64/64, sessions 16/16, server integration 28/28, CLI+server e2e 9/9, Stop-hook 7/7,
SessionStart-hook 4/4), independently re-run and confirmed rather than taken on trust.

**This engine (`chwezi-design-engine`) still has no `scripts/plan-canvas.js` of its own — by
design.** Per the "whichever engine finishes first is canonical" rule stated when this SKILL.md
was first written, `chwezi-sdlc-documentation` finished first. **Reuse that implementation rather than vendoring
a second copy of the same server.** From this engine's working directory:

```bash
node ../chwezi-sdlc-documentation/scripts/plan-canvas.js open <file>
node ../chwezi-sdlc-documentation/scripts/plan-canvas.js await <file>
```

(adjust the relative path to wherever `chwezi-sdlc-documentation` is checked out locally; the two repos are
independent, so there is no guarantee of a fixed relative position — resolve the path explicitly
rather than assuming sibling directories, the same caution the installation-and-distribution
report raises about the suite marketplace's relative `source` paths). If this engine is ever
packaged and distributed standalone without `chwezi-sdlc-documentation` present, vendor a copy at that point
using the same port process `chwezi-sdlc-documentation` went through — do not assume the dependency is always
available.

**Historical note, kept for anyone reading the edit history:** earlier the same day, before
either engine had ported it, this section stated the CLI existed in neither. That was accurate
at the time it was written and is preserved here only as a record of the honest, checked-not-assumed
discipline this whole Kaizen operation has followed — not because the information is still current.
`scripts/plan-canvas.js`, or a shared location `chwezi-engine-agents` ends up owning), point
this skill's `ecc-plan-canvas` invocations at that single vendored copy rather than copying the
server/session/rendering code a second time here — re-check
`C:\wamp64\www\chwezi-sdlc-documentation\scripts\plan-canvas.js` before vendoring, since whichever engine
finishes first should be the canonical source the other reuses. Until then, this skill
documents the intended workflow; the mechanism itself is not yet runnable in this engine.

## How It Works (via the `chwezi-sdlc-documentation`-vendored CLI — see the note above)

```bash
# 1. Open the design artefact in the reviewer's browser (returns immediately)
node ../chwezi-sdlc-documentation/scripts/plan-canvas.js open design-preview.html
# or a design-audit report, a screen comp exported as HTML, or a QA checklist:
node ../chwezi-sdlc-documentation/scripts/plan-canvas.js open reports/design-audit-2026-09-20.md

# 2. Block until the reviewer responds. Run this as a background task (Bash
#    run_in_background: true in Claude Code) — see "Stay listening" below —
#    and re-run if interrupted; queued feedback is never lost.
node ../chwezi-sdlc-documentation/scripts/plan-canvas.js await design-preview.html
```

(`ecc-plan-canvas` below is the conceptual command name from the upstream ECC skill this was
adapted from — it is not an installed binary in this estate; substitute the real
`node ../chwezi-sdlc-documentation/scripts/plan-canvas.js` invocation shown above wherever it appears.)

### Stay listening, or the reviewer talks to an empty chair

Feedback only reaches the agent while an `await` is actually parked on the session. If the
agent's turn ends with nothing listening, the reviewer's annotation or verdict sits queued and,
from their side of the glass, clicking "Approve" or leaving a comment appears to do nothing at
all — the exact failure this mechanism exists to prevent.

So **run `await` as a background task** whenever the harness supports one. It exits the moment
feedback arrives, keeping the loop alive across turns instead of dying with a foreground call
the harness eventually time-limits.

Two backstops exist, neither an excuse to skip the above:

- `node ../chwezi-sdlc-documentation/scripts/plan-canvas.js pending` lists feedback queued with no listener.
- A Stop hook blocks the agent's turn from ending while canvas feedback is undelivered — already
  wired and tested in `chwezi-sdlc-documentation/hooks/hooks.json` (`plan-canvas-pending.js`, 7/7 tests passing).
  If this engine's own sessions need the same backstop, wire an equivalent entry into this
  engine's `hooks/hooks.json` pointing at the reused `chwezi-sdlc-documentation` script, the same way
  `hooks/destructive-bash-gate.js` and `hooks/token-file-gate.js` are already wired here — this
  has not been done yet in this engine and is a reasonable next Kaizen item if this skill sees
  real use.

`await` prints JSON when the reviewer acts:

```json
{
  "status": "feedback",
  "items": [
    { "kind": "annotation", "text": "This should be the accent colour, not the primary",
      "anchor": { "selector": "button.cta-primary", "tag": "button",
                  "snippet": "Start free trial" } },
    { "kind": "verdict", "verdict": "request-changes" }
  ]
}
```

- `kind: "chat"` — freeform reviewer message; answer in the canvas, not the terminal.
- `kind: "annotation"` — feedback anchored to the **actual rendered element**
  (`anchor.selector`, `anchor.snippet`, `anchor.textRange.text` when a passage is
  highlighted). This is the direct, load-bearing replacement for "make the header bigger" —
  the anchor names which header, in which state, unambiguously.
- `kind: "verdict"` — `approve` means the artefact is CONFIRMED: stop polling, record the
  sign-off, and (if this was gating a release) hand off to
  `design-qa-and-pre-launch-review`'s verdict record. `request-changes` means revise the
  artefact (the canvas live-reloads it on save) and keep the loop going.

**Always respond in the canvas**, then keep listening:

```bash
node ../chwezi-sdlc-documentation/scripts/plan-canvas.js await <file> --reply "Swapped the CTA to the accent token. Take a look."
```

Silence in the chat panel is indistinguishable from a broken canvas to the reviewer — answer
there, not only in a terminal summary the reviewer never sees.

**End** when review concludes: `node ../chwezi-sdlc-documentation/scripts/plan-canvas.js end <file>`.

## Why this engine needs it specifically

This engine's audit and QA skills (`design-audit`, `design-qa-and-pre-launch-review`,
`heuristic-evaluation-and-design-critique`, `design-critique-and-review-facilitation`) all
currently assume the human's response to a finding or a proposed fix arrives as **prose typed
back at the agent**. That is ambiguous in exactly the way design feedback is worst at being
prose: "the spacing up top" could mean the hero's top padding, the nav's height, or the gap
between two cards, and disambiguating it costs a round trip. A canvas verdict removes the
ambiguity at the source — the reviewer points at the rendered `h1`, `button`, or spacing gap
they mean, and the anchor (`selector`/`snippet`) is unambiguous evidence of what was reviewed,
not a reconstruction from a chat transcript after the fact. That evidence is also exactly the
shape `design-audit` §2.0 (this engine's file:line requirement, added alongside this skill)
already demands of a finding — an anchored annotation is the human-review equivalent of a
`file:line` fix citation.

## Mapping the verdict into this engine's review chain

A canvas verdict is one governance event other skills in this engine consume, not an endpoint:

1. **`approve`** on a pre-launch artefact → record the verdict as the sign-off
   `design-qa-and-pre-launch-review` requires before a release ships; stop polling.
2. **`approve`** on a critique/audit artefact → the reviewed findings are accepted; hand
   accepted items to `ux-remediation-and-redesign` for execution, the same hand-off
   `design-audit` §6 already defines.
3. **`request-changes`** with one or more `annotation` items → each anchored annotation becomes
   a line item to resolve before the next review cycle. Revise the artefact file directly (the
   canvas live-reloads it); do not re-describe the change in prose back to the reviewer instead
   of fixing it.
4. Per the human-design-authority rule (`rules/common/core.md`): an `approve` verdict recorded
   through this mechanism is the **human reviewer's** judgment, never grounds to claim an AI
   tool self-approved a design choice. The canvas exists to make the human's judgment easier to
   capture accurately — it does not relocate the authority.

## Diagrams (Mermaid)

When a reviewed artefact includes a flow, information architecture, or component-state
diagram (a nav flow, a design-token tier diagram, a critique's decision tree), author it as a
fenced ` ```mermaid ` block rather than ASCII art — the canvas renders it as a themed diagram
the reviewer can point at directly, the same as ECC's original plan review.

## Rules

- Markdown artefacts render in the canvas's built-in template (including Mermaid blocks);
  `.html` artefacts (a `design-preview.html`, a rendered comp) render as-is with the
  annotation layer injected. For HTML authoring guidance, load `frontend-design-direction`
  and `artifact-design`.
- Edit the artefact file to revise — the canvas live-reloads on save. Never re-run `open` to
  refresh.
- `{"status": "ended", "endedBy": "user"}` means the reviewer closed the review: stop polling,
  deliver remaining updates in chat, and do not reopen without the reviewer asking to resume.
- The server is loopback-only (`127.0.0.1:4517`) and exits after 30 idle minutes — the same
  boundary ECC ships. No design artefact leaves the reviewer's machine through this mechanism.
- Sibling assets (images, exported font files, CSS) must sit next to the artefact and be
  referenced by relative path, same as any other local HTML preview.

## Anti-Patterns

- Polling with a timeout loop instead of leaving a plain `await` running.
- Ending the agent's turn with no `await` listening while a review is still open.
- Reading an annotation and answering only in the terminal instead of the canvas — the
  reviewer is looking at the canvas, not the agent's terminal output.
- Pasting the whole audit report into chat *and* opening a canvas — pick the canvas and keep
  the terminal summary to one line.
- Treating a canvas `approve` as license to skip the accountable reviewer named in
  `design-qa-and-pre-launch-review`'s sign-off requirement, or as AI-vendor approval evidence
  under `rules/common/core.md` — the canvas records *who* clicked approve; it does not itself
  confer design authority.
- Vendoring a second, independently-maintained copy of the CLI here once one engine already
  has it — reuse that copy (see "Dependency and current status" above).

## Required Inputs

| Artefact | Source | Required? | Missing behaviour |
|---|---|---|---|
| Local design artefact and review scope | Project owner or upstream audit | yes | Stop and return a qualified gap note if the artefact is unavailable. |
| Reviewer identity and decision authority | Named design or release owner | yes | Record the authority gap; do not treat an unassigned verdict as approval. |
| Reusable plan-canvas CLI | SRS sibling engine or approved local installation | yes | Mark the review mechanism unavailable and do not claim a verdict. |

## Workflow

1. Confirm the local artefact, review scope, reviewer authority, and CLI path before opening a session.
2. Open the artefact, keep `await` listening, and capture anchored annotations and the verdict as JSON.
3. Route `approve` to the accountable gate and route `request-changes` items to the owning remediation skill.
4. Stop release when the verdict, reviewer authority, or artefact identity is unresolved; recover by
   correcting the missing input and reopening the same review session.

## Outputs

| Artefact | Consumer | Acceptance condition |
|---|---|---|
| Anchored annotation and verdict record | Design owner and release reviewer | Each item identifies the artefact, anchor, reviewer, verdict, and next action. |
| Review handoff | Remediation or release gate owner | Approved work has accountable sign-off; requested changes have named owners and remain open. |

## Evidence Produced

| Evidence | Consumer | Acceptance condition |
|---|---|---|
| Canvas session JSON | Reviewer and gate owner | Feedback and verdict are retained from the CLI response, not reconstructed from prose. |
| Authority and limitation note | Release reviewer | Reviewer identity, local-only boundary, unavailable checks, and unresolved items are explicit. |

## Capability Contract

Read access to the local artefact and execution access to the approved canvas CLI are required.
The review is local and read-only unless a separately authorised remediation edit is requested.
Publication, remote URL access, and approval outside the named authority are out of scope.

## Degraded mode

If the CLI, local artefact, reviewer, or authority is unavailable, return the narrowest qualified
review checklist and mark the verdict `not assessed`. Do not manufacture anchored feedback or
convert a missing listener into approval.

## Decision Rules

| Choice | Action | Wrong-choice failure or risk |
|---|---|---|
| Reviewer has named authority and the artefact is local | Run the canvas review and retain its JSON | Approval cannot be attributed or reproduced. |
| Reviewer requests changes | Keep the gate open and route each annotation to an owner | Unresolved defects are mistaken for sign-off. |
| CLI or artefact is unavailable | Stop, record the gap, and recover the dependency | A missing review is presented as a passed gate. |

## Examples

- Open a local HTML preview, await anchored annotations, and record the final verdict before the
  design QA gate consumes it.

## References

- ECC original: `skills/plan-canvas/SKILL.md`, `docs/design/plan-canvas.md`
  (`C:\Users\Peter\Downloads\ECC-main`).
- Sibling adaptation: `C:\wamp64\www\chwezi-sdlc-documentation\09-governance-compliance\plan-canvas\SKILL.md`
  — read for the governance-artefact framing pattern; this skill is written separately because
  the design-review framing (annotate a rendered element, not a document clause) differs from
  SRS's clause-level review.
- This engine: `design-audit` (§2.0 file:line requirement — the anchored-annotation analogue
  for human review), `design-qa-and-pre-launch-review` (the ship verdict this feeds),
  `design-critique-and-review-facilitation` (the session this can capture verdicts for),
  `rules/common/core.md` (human-design-authority rule governing what an `approve` verdict does
  and does not confer).
<!-- dual-compat-end -->
