# Worked Critique Session — Maduuka First-Time-User Onboarding Flow (filled)

A real, end-to-end design critique run against `references/critique-protocol.md`. It shows the
**frame**, the **announced framework**, the **captured feedback** tagged taste-vs-requirement, the
**single-decider decisions**, and the **decision log + next demo**. The artifact is a *working demo*,
not a description. Numbers and decisions are concrete, not placeholder.

---

## Section 0 — Header

| Field | Value |
|---|---|
| Target | First-time-user onboarding flow (3 screens: welcome → 1 setup question → first value) |
| Artifact | **Clickable demo** `maduuka-web@demo/onboarding-v2` on staging, walked on a 390px phone + desktop |
| Date | 2026-06-21 |
| Mode | **Live**, 45 min |
| Facilitator | A. (design lead) |
| Author | K. (product designer) |
| Reviewers | 4 — 1 PM, 1 engineer, 1 content designer, 1 second product designer |
| **Decider (one)** | K. (the author owns the design decision); A. decides only the one cross-product consistency call (noted at F4) |
| Capture doc | `docs/crit/onboarding-v2-crit-2026-06-21.md` |

Artifact is a real clickable demo → the "no critique without a concrete artifact" rule is satisfied. Proceed.

---

## Section 1 — Frame & ask (move 0)

**Session goal (facilitator):** decide whether onboarding-v2's structure is right enough to build
out, and resolve the open questions K. brought.

**Author's ask (K.):**
- **Stage:** mid-fidelity demo; structure and copy are in play, final visuals are not.
- **The two questions I want answered:**
  1. Does putting the *single* setup question **before** the first value moment help or hurt
     first-run completion?
  2. Is the welcome screen earning its place, or should it be cut?
- **Locked / out of scope (do not re-open):** the brand palette and the Andada Pro/Public Sans pairing
  (already decided in the brand crit); the decision to ask **one** setup question, not five.

Frame written to the top of the capture doc. Reviewers acknowledged the out-of-scope list.

---

## Section 2 — Present + clarify (moves 1–2)

K. walked the demo once (welcome → setup question → first value), then stopped to listen.

Clarifying questions (no judgement yet):
- *"What happens if they skip the setup question?"* → there's a Skip; it defaults the value screen to a generic state.
- *"Is the welcome screen shown again on later launches?"* → no, first run only.
- *"Is the progress '1 of 1' real or placeholder?"* → real; there is genuinely one question.

---

## Section 3 — Feedback (move 3)

**Announced framework: "Problem, not solution"** (chosen because the work is concrete enough that we
want *problems* named and the fixes left to K.). Each item tagged **[requirement]** (objective
standard) or **[taste]** (heuristic — decider's call). The facilitator kept the shape and made sure
strengths were named first.

**Strengths named first (protect these):**
- The single-question setup (vs the old five-field form) is a clear, well-earned simplification — "edit for less" working.
- Copy on the value screen is specific and warm; no AI-jargon.

**Problems raised:**

| # | Reviewer | Problem (observed) | Tag | Note |
|---|---|---|---|---|
| F1 | Engineer | On the setup screen, the "Continue" button's label is white on the *light* accent tint — I could barely read it. | **[requirement]** | Measured 3.1:1 — fails WCAG 1.4.3 (4.5:1 for the 16px label). Objective; not a matter of opinion. |
| F2 | Content | The welcome screen adds a tap but no information the user can act on — it's a speed bump. | **[taste]** | Maps to K.'s question 2. A heuristic (does the screen earn its place?) — no objective arrow. |
| F3 | PM | If I Skip the setup question, the value screen feels generic and I don't see why I should have answered. | **[taste]** | The skip path undersells the value of answering — a feel/heuristic call about the skip default. |
| F4 | Designer 2 | The setup screen's progress dots use a different style from the dots used in the main app's flows. | **[requirement]** | Violates the stated cross-product consistency rule (a brand/system rule already decided) → objective, but the *call* is A.'s, not K.'s (cross-product owner). |
| F5 | Engineer | "What if the setup question came *after* a first taste of value?" | **[taste]** | Offered explicitly as one option, not a verdict — maps to K.'s question 1. |

The facilitator stopped one reviewer who started to argue F2 as "the welcome screen is just wrong" —
reframed it as a tagged **[taste]** problem for the decider, not a fact.

---

## Section 4 — Decide (move 4)

**Requirements (non-negotiable — straight to the log):**
- **F1** contrast fail → must fix. K.: use the darker `--color-action` token (5.2:1), same fix
  pattern as the checkout crit. **Decided now.**
- **F4** progress-dot inconsistency → it violates the cross-product rule, so it *will* change; the
  *which-style* call is **A.'s** (cross-product owner), not a room vote. A. decided: adopt the main-app
  dot component. **Decided now (by A.).**

**Taste calls (the decider K.'s conviction, after input — not a vote):**
- **F2 / question 2 (cut the welcome screen?):** K.'s call. The room split; K. did **not** count
  hands. Her conviction: the welcome screen is a speed bump *as currently written*, but a one-line
  value promise there could prime the setup question. **Decision: needs a demo** — build two
  variations (no-welcome vs welcome-with-a-value-promise) and live on them, rather than deciding from
  argument. (The "41 blues" discipline: don't settle a taste call by tally.)
- **F3 (skip path undersells value):** K.'s call — agreed it's a real problem; **author's call** to
  redesign the skip default so the value screen still shows *why answering helps*. Owner K., next round.
- **F5 / question 1 (question before or after first value?):** a heuristic with no objective arrow —
  **cannot be settled by discussion.** **Decision: needs a demo + live on it** — build the
  "value-first" variation, dogfood both for a few days, re-decide from real use, not from the meeting.

---

## Section 5 — Decision log (the deliverable)

| Q / Feedback | Kind | Resolution | Owner | Why (1 line) | Decider |
|---|---|---|---|---|---|
| F1 button contrast | requirement | **Decided** — use `--color-action` (5.2:1) | K. | Fails WCAG 1.4.3; objective | K. |
| F4 progress-dot inconsistency | requirement | **Decided** — adopt main-app dot component | A. | Cross-product consistency rule | A. (cross-product owner) |
| Q2 / F2 cut welcome screen? | taste | **Needs a demo** — build no-welcome vs welcome-with-value-promise; live on them | K. | No objective arrow; decide from real use, not a vote | K. |
| F3 skip undersells value | taste | **Author's call** — redesign skip default | K. | Real problem; fix is K.'s craft | K. |
| Q1 / F5 question before/after first value? | taste | **Needs a demo + live on it** — build value-first variation, dogfood, re-decide | K. | Heuristic; only demo+taste+time can settle it | K. |

**Requirement list (must-fix, non-negotiable):** F1 (contrast), F4 (dot consistency).
**Taste-input list (decider's, never voted):** F2, F3, F5.

---

## Section 6 — Close (move 5): next demo, not next debate

**Next demo to build for round 2:**
1. Fix F1 + F4 (the two requirements) — done before the next crit.
2. Build the **two welcome-screen variations** (F2) and the **value-first ordering variation** (F5)
   as real clickable demos.
3. Redesign the **skip default** (F3).

**Live-on-it items (dogfood, do NOT re-argue next meeting):** the welcome-screen question (F2) and
the question-ordering (F5) — the team uses both variations on staging for ~4 days, then K. re-decides
from real use at round 2.

**What we did *not* do:** we did not re-open the locked items (palette, pairing, one-vs-five
questions); we did not vote on any taste call; we did not leave with a pile of comments and no
decisions; no one was critiqued instead of the work.

Recorded by: A. (facilitator) · Author/decider: K. · 2026-06-21

---

*Run against `references/critique-protocol.md`. Embodies `doctrine/references/creative-selection-and-taste.md`:
critique grounded in a working demo; the algorithm-vs-heuristic split behind requirement-vs-taste; the
single decider deciding taste by conviction (the "41 shades of blue" no-vote rule); and "live on it"
for the two heuristic calls (welcome screen, question ordering) that one meeting cannot settle.*
