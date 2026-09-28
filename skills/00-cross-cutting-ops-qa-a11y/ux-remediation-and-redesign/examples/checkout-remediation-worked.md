# Worked Example — Remediating the Aurora Analytics signup flow

A full pass of the remediation lifecycle (**diagnose → triage → redesign → re-validate → measure**)
on a real flawed flow. The upstream diagnosis is `design-audit/examples/design-audit-filled.md` —
the "Aurora Analytics" marketing landing + free-trial signup that scored **41/100** with **two hard
gates failed** (AI Slop + WCAG 2.2 AA) and the CWV gate failing too. This file is the **fix side**:
it consumes those exact findings and carries them to a measured, re-validated improvement.

- **Flow:** Aurora Analytics — landing page → "start free trial" signup (web, responsive).
- **Red routes:** (1) hero comprehension → CTA click; (2) the signup form completion. Both are the
  business — a missed signup is a lost trial.
- **Baseline (captured before any edit):** audit **41/100** (raw 63, capped ≤59 by two gates);
  task-completion of the signup flow in a pre-fix 5-user test = **58%** (3 of 5 abandoned or
  mis-submitted); time-on-task median **2:40**; field CWV LCP **3.4 s** / CLS **0.18**; SUS **54**.

---

## Phase 1 — Diagnose (intake, not re-audit)

The audit's findings, **clustered by flow** and **named against
`doctrine/references/interaction-anti-patterns.md`**, with the gate each fed carried forward:

| # | Finding (from the audit) | Anti-pattern | Root flow | Gate fed |
|---|---|---|---|---|
| F1 | Gradient headline + CTA label measure 3.1–3.4:1 (need ≥4.5:1) | D3 Colour-Only / contrast | hero | **WCAG 2.2 AA** |
| F2 | `:focus` ring removed, no `:focus-visible` replacement | (a11y 2.4.7) | both | **WCAG 2.2 AA** |
| F3 | Newsletter chips 20×20 px (< 24×24, 2.5.8) | (a11y target size) | footer | **WCAG 2.2 AA** |
| F4 | Hero is a 480 KB PNG, not preloaded, no dimensions → LCP 3.4 s, CLS 0.18, page 1.6 MB | C2-adjacent (silent slow load) | entry | **CWV** |
| F5 | Inter, single weight, no real scale | D2 Typographic Noise + banned font | global | **AI Slop** |
| F6 | Warped product logo baked into hero art | (slop imagery tell) | hero | **AI Slop** |
| F7 | CTA has no loading state; signup submit gives no inline progress/error | C2 Silent System | signup | — |
| F8 | Four identical feature cards | D6 Oceans-of-buttons-adjacent / uniform grid | landing | — (slop-soft) |
| F9 | Dashboard-preview empty state copy is weak | C3 Dead End (soft) | landing | — |
| F10 | Pure-white surfaces (#fff) | (colour polish) | global | — |

Clustered: **hero** {F1, F4, F6}, **global type/colour** {F5, F10}, **signup** {F2, F7}, **a11y
targets** {F3}, **landing polish** {F8, F9}. Gate-tagged: F1–F6 feed a hard gate.

---

## Phase 2 — Triage (the matrix → ranked queue)

Each finding through the three lenses + the two overrides (`references/triage-matrix.md`):

| Finding | Red-route? | Hard? | Persistent? | Severity | Impact | Effort | Quadrant | Gate? | MoSCoW | Rank |
|---|---|---|---|---|---|---|---|---|---|---|
| F1 contrast | Y (hero) | Y | Y | Critical | High | **Low** | Quick win | A11y | **Must** | 1 |
| F2 focus ring | Y (both) | Y | Y | Critical | High | **Low** | Quick win | A11y | **Must** | 2 |
| F3 target size | N (footer) | Y | Y | Serious | Med | **Low** | Quick win | A11y | **Must** | 3 |
| F4 hero perf | Y (entry) | Y | Y | Critical | High | Med | Quick win | CWV | **Must** | 4 |
| F6 warped logo | Y (hero) | N | Y | Serious | Med | Low | Quick win | Slop | **Must** | 5 |
| F5 type system | N | N | Y | Serious | High | **High** | Major project | Slop | **Must** | 6 |
| F7 signup states | Y (signup) | Y | N | Serious | High | Med | Major project | — | **Should** | 7 |
| F8 uniform cards | N | N | Y | Minor | Low | Low | Fill-in | (soft) | Could | 8 |
| F9 empty state | N | N | N | Minor | Low | Low | Fill-in | — | Could | 9 |
| F10 pure white | N | N | N | Minor | Low | Low | Fill-in | — | Won't | — |

**Override applied:** F1–F6 are all forced to **Must** by the gate rule even though F3 (footer
chips) is off the red route and F5 looks like a big lift — a gate-failer cannot be deferred because
it **caps the score**. F7 is a genuine red-route states gap but feeds no gate → **Should**. F10 is
the only "Won't this release" (cosmetic, no gate, no red route).

**Ranked queue for this sprint:** F1, F2, F3, F4, F6 (gate-failing quick wins) → F5 (gate-failing
major project) → F7 (red-route Should) → F8/F9 (Could). The quick wins lift both capped gates with
the least effort; the type system is the one expensive Must.

---

## Phase 3 — Redesign (right-patterns + Anti-Slop Charter)

Each fix aims at the catalogue's **fix column** and is routed to the owning craft skill; every
redesign states its choice (doctrine).

- **F1 / F2 / F3 — a11y quick wins** (→ `accessible-color-and-contrast`,
  `accessibility-wcag-2-2-compliance`). Drop gradient text; H1 and CTA label on a **single solid
  foreground ≥4.5:1** (designed with APCA, certified with the ratio). Restore a **2 px
  `:focus-visible` ring** at ≥3:1 against adjacent colours, un-obscured by the sticky nav (2.4.11).
  Footer chips to **44×44** with an 8 px gap.
- **F4 — hero performance** (→ `performance-as-ux-and-core-web-vitals`). Re-export the hero as
  **AVIF ~110 KB**, `preload` it, set explicit `width`/`height` (kills CLS), add `font-display:
  swap` + preload the body face. Page back under the 1 MB marketing budget.
- **F6 — warped logo** (→ `ai-image-direction` / real asset). Replace the baked-in malformed logo
  with a **real product screenshot** of the dashboard; the logo lives as clean vector chrome.
- **F5 — type system** (→ `font-selection-and-pairing`, `type-scale-and-spacing`). **Stated
  choice:** drop Inter (banned default). Pair **Andada Pro** (editorial display, for the H1/value
  prop — its calligraphic serif carries authored character a grotesque cannot) with **Source Sans 3** body on a Major
  Third scale, regular + bold only. Authored, not convergent; both OFL.
- **F7 — signup states** (→ `error-empty-and-system-messaging`, `micro-interactions-and-feedback`).
  CTA gets a **loading state** ("Creating your trial…"); the submit gets **inline, solution-bearing
  validation** (errors say what + why + how to fix) and a step-progress cue. Targets C2 Silent
  System → React-immediately.
- **F8 / F9 (Could)** — differentiate the four cards by emphasis; rewrite the empty state to
  acknowledge + show value + offer a first action.

**Doctrine check:** no banned font (Andada Pro/Source Sans 3 are authored OFL choices, stated);
no slop gradient reintroduced; the screenshot replaces the warped-logo tell. No fix opened a new
gate finding → none re-enters triage.

---

## Phase 4 — Re-validate (prove it)

Method per change type (`references/remediation-lifecycle.md` §Re-validate):

| Fix | Method | Result |
|---|---|---|
| F1 contrast | re-measure ratio | H1 **7.2:1**, CTA **5.1:1** — 1.4.3 **passes** |
| F2 focus | keyboard + screen-reader pass | visible ring on every control, logical order — 2.4.7 / 2.4.11 **pass** |
| F3 targets | inspect | 44×44 + spacing — 2.5.8 **passes** |
| F4 perf | field CWV re-measure (p75) | **LCP 1.9 s**, **CLS 0.04**, INP 130 ms, page **0.9 MB** — CWV **passes** |
| F5/F6 slop | re-run `visual-product-slop-audit` + `ai-slop-typography-audit` | authored pairing, no banned font, no warped art — Slop gate **passes** |
| F1–F7 flow | **5-user usability test** of the signup red route | task-completion **58% → 91%** (almost all complete unaided); time-on-task **2:40 → 1:25**; error rate down |

All three hard gates now **PASS**; the 5-user re-test clears the red-route task. Nothing re-entered
triage. (Had the re-test still failed, F7's approach — not its pixels — would go back to Phase 2.)

---

## Phase 5 — Measure (before → after) & close the loop

| Metric | Baseline (before) | After | Delta |
|---|---|---|---|
| Audit score | **41 / 100** (capped ≤59) | **88 / 100** | **+47**; both gate caps lifted |
| Gates passing | 0 of 3 | **3 of 3** | Slop ✓ A11y ✓ CWV ✓ |
| Signup task-completion (5-user) | 58% | **91%** | **+33 pts** |
| Time-on-task (median) | 2:40 | **1:25** | **−47%** |
| Field LCP / CLS (p75) | 3.4 s / 0.18 | **1.9 s / 0.04** | both into "good" |
| SUS | 54 | **82** | **+28** (below-average → good) |
| Trial-start conversion (2-wk A/B on hero+CTA) | 4.1% | **6.8%** | **+66% relative** |

**Close the loop:** the re-built artifact (now 88/100, all gates green) hands to
`design-qa-and-pre-launch-review` for the pass/fail ship sign-off. One **new** finding surfaced
during redesign — the new dashboard screenshot needs a localized alt-text set for the RTL build —
routed back to `design-audit` (it is *not* fixed silently here). F10 (pure-white surfaces) remains
a recorded "Won't" for the next cycle.

---

*Consumes `design-audit/examples/design-audit-filled.md` (the diagnosis). Triaged with
`references/triage-matrix.md`; sequenced and re-validated per `references/remediation-lifecycle.md`;
right-patterns from `doctrine/references/interaction-anti-patterns.md`; redesigns satisfy the
`doctrine/design-doctrine.md` Anti-Slop Charter. Numbers are illustrative-but-coherent, not lorem;
fonts named (Andada Pro / Source Sans 3) are authored OFL choices, no banned default.*
