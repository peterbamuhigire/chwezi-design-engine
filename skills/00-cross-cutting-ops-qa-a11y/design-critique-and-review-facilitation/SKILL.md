---
name: design-critique-and-review-facilitation
description: Use when facilitating a live or asynchronous design critique that needs a clear ask, safe feedback, a decider, and recorded outcomes. Unlike design-audit or heuristic evaluation, this runs the human review session rather than producing expert findings.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Design Critique & Review Facilitation

Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- You have to **run the meeting**, not just have an opinion — a live or async design critique /
  design review where several people will react to a concrete piece of work and a decision must
  come out the other end.
- Feedback in your reviews is **unstructured, demoralising, or goes in circles** — people argue
  preferences, the loudest voice wins, the author leaves bruised, and nothing is actually decided.
- You need a **repeatable session protocol**: how to frame the ask, which feedback framework to
  use, how to separate *taste* from *requirement*, who decides, and how the decisions get recorded.
- You are setting up an **async review** (PR-style comments, a Figma thread, a recorded walkthrough)
  and need the same rigour without everyone in a room at once.
- You want the critique to **protect the maker** (psychological safety) *while still being honest* —
  the two are not in tension when the session is run well.

## Do Not Use When

- You want an **expert evaluation of the artifact itself** — a structured walkthrough against
  Nielsen/Tognazzini heuristics with per-finding severities → use
  `heuristic-evaluation-and-design-critique`. That skill **produces the findings**; this one
  **runs the human session** in which findings (and taste calls) are discussed and decided.
- You want a **scored 0–100 quality audit** across 10 dimensions → use `design-audit`. (Audit =
  one expert's graded scan; critique = a facilitated group session. They feed each other: an audit
  can be an *input* to a crit, but the crit is where humans decide what to do about it.)
- You need a **ship go/no-go gate** with spec/pixel parity and signed verdict →
  `design-qa-and-pre-launch-review`.
- There is **nothing concrete to react to** yet — only an idea in someone's head. Build the smallest
  real demo first; a critique with no artifact is the "imaginary-puppy" anti-pattern
  (`doctrine/references/creative-selection-and-taste.md`). Return when there is a demo.

## Required Inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Review artefact and maturity | Maker | yes | Calibrates feedback depth |
| Decision, constraints, and open questions | Maker and sponsor | yes | Keeps critique on scope |
| Participants, roles, and decider | Organiser | yes | Establishes authority and safety |

- **A concrete artifact to react to** — a working demo, screens, a prototype, a flow, or a redline.
  Never run a crit on a verbal description or a mock-of-a-mock (creative-selection rule 1: *the
  working demo is the unit of progress*). The closer to real, the better the feedback.
- **The author's framed ask** — what *stage* the work is at, what *one or two questions* the author
  wants answered, and what is explicitly **off the table** for this round (locked decisions,
  out-of-scope). An unframed crit invites scattershot feedback on things already decided.
- **The decision model** — who is the **single decider** for this work, and what is merely advisory.
  Reviews without a named decider end in mush (Kocienda: every review has *one* decider).
- **Mode** — live (synchronous) or async — and the **roster** (author, facilitator, reviewers; keep
  it small — 3–6 reviewers, not the whole org).
- **Where decisions will be captured** — the doc/ticket/thread that becomes the record.

## Workflow

Run the session in seven moves. The full protocol (timings, scripts, framework choice) is in
`references/critique-protocol.md`; an end-to-end worked session is in
`examples/critique-session-worked.md`.

1. **Set the frame (before any feedback).** The facilitator states the goal of the session and the
   author states the ask: the stage, the **1–2 questions** they want answered, the audience/context
   of the work, and **what is locked / out of scope**. Write the ask at the top of the capture doc.
   A tight frame is the single biggest lever on crit quality — it turns "what do you think?" (which
   yields taste noise) into "does this onboarding reduce drop-off for first-time users?" (which
   yields useful signal).
2. **Present the artifact, not the rationale-as-defence.** The author walks the *concrete demo*
   briefly, then **stops defending and starts listening**. Reviewers react to the artifact in front
   of them, not to an imagined one. (No artifact ⇒ no crit — send it back to be built.)
3. **Choose and announce a feedback framework.** Pick the one that fits the stage and say which it
   is, so everyone gives feedback in the same shape (`references/critique-protocol.md` §Frameworks):
   - **I-like / I-wish / what-if** — early/exploratory work; keeps it generative and safe.
   - **Problem, not solution** — name the *problem you observed* and leave the fix to the author
     ("users can't tell which field failed", not "make the border red"). Protects authorship.
   - **Ladder of feedback** (clarify → value → concerns → suggestions) — climbs from understanding
     to critique so concerns land *after* the work is understood, not before.
4. **Separate taste from requirement — out loud, every time.** Tag each piece of feedback as either
   a **requirement** (it violates an objective standard — a11y AA, a broken red-route, a stated
   brand rule, a measured perf budget: an *algorithm*, the arrow points one way) or a **taste call**
   (a heuristic with a real value but no objective arrow — a colour, a duration, a word). This is the
   algorithm-vs-heuristic lens from `doctrine/references/creative-selection-and-taste.md`. Requirements
   are non-negotiable and go straight to the decision log; taste calls are *input to the decider*,
   **never** settled by vote, volume, or seniority. ("I'd have used another font" is taste; "this
   label fails 4.5:1 contrast" is requirement. Saying which prevents taste being smuggled in as fact.)
5. **Name the decider and decide — on the spot where possible.** After the input, the **single
   decider** makes the calls. Taste decisions trace to a skilled human's conviction, not to a tally
   and not to an A/B metric (the "41 shades of blue" lesson — do not outsource a taste decision to a
   number). Decisiveness is the job; a crit that defers everything was theatre.
6. **Capture decisions, not just comments.** For every open question record one of: **decided**
   (what + who + why, one line), **author's call** (owner + by-when), **needs a demo/spike** (the
   variation to build before the next round), or **parked** (with the reason). Comments evaporate;
   the **decision log is the deliverable**. See `references/critique-protocol.md` §Capture.
7. **Close the loop with "live on it" where it's a heuristic.** Some calls can't be settled in one
   review — an animation's feel, whether the flow "adds up". Mark these to be **dogfooded over time**
   ("live on it"), not re-litigated by reopening the same argument
   (`doctrine/references/creative-selection-and-taste.md` rule 2). Schedule the next demo, not the
   next debate.

**Async variant.** The same seven moves apply, time-shifted: the frame + ask is written at the top
of the thread; reviewers comment in the chosen framework's shape and **tag each comment
[requirement] / [taste]**; the decider resolves each thread with a decision tag; the captured log is
the thread's summary. Async trades immediacy for a written record and wider time zones — see
`references/critique-protocol.md` §Live-vs-async for which to choose.

## Anti-Patterns

- **No artifact in the room.** Critiquing a description or a mock-of-a-mock — "arguing about whose
  imaginary puppy is cuter." Build the smallest real demo first
  (`doctrine/references/creative-selection-and-taste.md`).
- **Unframed "what do you think?"** With no ask and no out-of-scope, the crit sprays opinions over
  settled decisions and wastes the room. Frame first, always.
- **Taste smuggled in as requirement.** "That's just wrong" about a colour/word/duration, stated as
  fact. Tag it as taste and route it to the decider; reserve "requirement" for objective standards.
- **Decision by vote, volume, or seniority.** Letting the loudest or most senior voice settle a
  *taste* call, or counting hands. Taste traces to the decider's conviction, not a tally
  (the "41 blues" error on the process side).
- **Feedback aimed at the person, not the work.** "You always do this" / praise-sandwich theatre.
  Critique the artifact; protect the maker (see Psychological-safety, `references/critique-protocol.md`).
- **The author defends instead of listening.** Turning the crit into a debate the author "wins" kills
  the signal. The author asks clarifying questions, captures, and decides later.
- **Comments captured, decisions not.** Leaving a pile of notes and no record of what was *decided*,
  by whom, and why — so the same argument reopens next week.
- **Seagull feedback.** A senior who swoops in, drops opinions, and leaves without engaging the
  context or owning a decision (Kocienda's *Seagull Manager* failure mode).
- **Re-litigating a heuristic instead of living on it.** Re-arguing a feel-call every meeting rather
  than dogfooding it over time and re-deciding from real use.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Critique brief and agenda | Participants | Ask, stage, constraints, and protocol visible |
| Structured feedback register | Maker and decider | Observation, impact, question, and source captured |
| Decision and action log | Delivery team | Decision, rationale, owner, and due date recorded |

- A **run session** (live or async) that produced **decisions, not just comments**.
- A **decision log** — each open question resolved as decided / author's-call / needs-a-demo /
  parked, with owner, one-line rationale, and (for taste calls) the decider named.
- A **requirement list vs. taste-input list** — the objective must-fixes separated from the
  conviction-led calls, so nothing objective is voted away and nothing subjective is faked as fact.
- A **next-step**: the next demo to build (not the next debate to have), and any "live-on-it" items
  to dogfood before re-deciding.

## Examples

- Use the worked example in `examples/` as the facilitation and decision-log model.

## Quality Standards

- Critique the work and its objectives, never the maker's competence or identity.
- Distinguish evidence, requirements, hypotheses, and taste before deciding.
- Stop the session when scope, decider, psychological safety, or artefact readiness is absent.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| Work is early and divergent | Use questions and possibilities | Premature polish feedback narrows exploration |
| Decision is constrained by a requirement | Cite the requirement and owner | Taste is debated as preference |
| Feedback conflicts | Decider resolves against stated objective | Loudest voice wins |
| Maker needs time to process | Collect async and decide later | Defensive real-time reactions replace judgement |

## Capability Contract

Read and facilitation are required. Writing is limited to the authorised brief, feedback, and decision record. Do not alter the reviewed artefact, expose private feedback, or infer consensus without participant evidence.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without synchronous access, run an asynchronous critique with deadlines and the same structured fields. Without a named decider or objective, pause decisions and return the missing-context checklist.

- `examples/critique-session-worked.md` — a full worked critique session of a real artifact (a
  first-time-user onboarding flow demo): the agenda and frame, the author's ask, the feedback
  captured under the chosen framework, the taste-vs-requirement split, the single-decider decisions,
  and the recorded decision log with next-demo. Concrete, not lorem.

## References

- `references/critique-protocol.md` — **the session structure**: agenda + timings, the three
  feedback frameworks (I-like/I-wish/what-if; problem-not-solution; ladder of feedback) and when to
  use each, the taste-vs-requirement split rule, the single-decider + decision-capture model,
  psychological-safety practices, and the live-vs-async decision.
- `references/refinement-verbs.md` — ten bounded critique verbs (bolder, quieter, distill, polish,
  harden, clarify, typeset, layout, colourise, animate) with scope rules, mode readings, done-checks,
  and their use as DOCX/PPTX review comments.
- `doctrine/references/creative-selection-and-taste.md` — **the doctrine spine of this skill**: no
  critique without a concrete demo (rule 1); the **algorithm-vs-heuristic** lens that powers the
  taste-vs-requirement split; the **"41 shades of blue"** lesson (don't outsource a taste decision to
  a vote/metric); **"live on it"** for heuristic calls that can't be settled in one review.
- `doctrine/design-doctrine.md` — the Mission (*the moat is looking human-made*) and the Anti-Slop
  Charter; a crit also surfaces convergent/slop choices, and the rule that taste choices trace to
  **human design authority**, never to a vote or a model's pick.
<!-- dual-compat-end -->

## Plugins (Load Alongside)

| Companion Skill | When to Load |
|---|---|
| `heuristic-evaluation-and-design-critique` | When the session needs an **expert evaluation as input** — run that to produce severity-rated findings, then bring them into the crit for the team to decide on. (That EVALUATES; this FACILITATES.) |
| `design-audit` | When a **scored diagnostic** of the artifact should seed the discussion — its triage queue is good crit input. |
| `design-qa-and-pre-launch-review` | **Downstream** — once the crit's decisions are built, run the ship gate. |
| `ux-remediation-and-redesign` | **Downstream** — to execute and re-validate the fixes the crit decided on. |

---

## 1. The method in one paragraph

A design critique is not a vote and not a venue for opinions — it is a **facilitated session in
which a small group reacts to a concrete piece of work so the author and the single decider can make
better, faster decisions**. Its discipline comes from four moves: **a tight frame** (what stage, what
question, what is off the table), **a named feedback framework** (so everyone gives feedback in the
same shape), **separating taste from requirement** (objective standards are non-negotiable; taste
calls are the decider's, never the room's vote), and **capturing decisions, not comments**. Run it
this way and honesty and psychological safety stop being in tension: the work is critiqued, the maker
is protected, and the meeting ends with decisions and a next demo rather than a pile of notes and a
bruised author. (Spine: `doctrine/references/creative-selection-and-taste.md` — demo-grounded
critique, the algorithm/heuristic lens, the single decider, and "live on it".)

## 2. How this differs from the EVALUATE pair

| | **Critique facilitation (this skill)** | **`heuristic-evaluation` / `design-audit`** |
|---|---|---|
| **What it is** | Running the **human session** | Producing an **expert evaluation** of the artifact |
| **Unit** | A meeting / async thread + a decision log | A findings report / a 0–100 score |
| **Who acts** | A facilitator, a small roster, one decider | One (or a few) evaluators against a rubric |
| **Output** | **Decisions**, requirement-vs-taste split, next demo | Severity-rated findings / gated score |
| **Question** | *How do we run this review so it's productive, safe, and decisive?* | *What's wrong with the artifact, and how bad?* |

They compose: an audit or heuristic evaluation can be an **input** that seeds the critique, but the
critique is where humans **discuss and decide**. Keep the boundary — do not re-derive heuristic
findings here; bring them in and facilitate the decision.

---

*Sources: `doctrine/references/creative-selection-and-taste.md` (Kocienda, *Creative Selection* —
demo-grounded critique, the single decider + decision capture, the algorithm-vs-heuristic lens, the
"41 shades of blue" taste-not-vote rule, "live on it"); the design-crit feedback frameworks
(I-like/I-wish/what-if; problem-not-solution; ladder of feedback) as used in design-studio practice;
`doctrine/design-doctrine.md` (the Anti-Slop Charter and the human-design-authority asymmetry rule).
Companion to the EVALUATE pair `heuristic-evaluation-and-design-critique` and `design-audit`.*
