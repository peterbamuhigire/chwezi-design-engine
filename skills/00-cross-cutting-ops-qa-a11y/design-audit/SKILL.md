---
name: design-audit
description: Use when auditing one existing UI, page, screen, flow, or document for design quality and producing evidence-backed, severity-rated findings. Use product-design-audit for multiple product surfaces and design-qa-and-pre-launch-review for a release verdict.
metadata:
  portable: true
  category: 00-cross-cutting-ops-qa-a11y
  compatible_with:
  - claude-code
  - codex
---

# Design Audit Skill
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- You need a severity-rated UI/UX audit across the 10 dimensions (AI slop, visual hierarchy, accessibility, typography, colour, layout/spacing, interaction states, motion, microcopy, performance) with a defensible 0–100 score.
- A screen, flow, landing page, or component "looks AI-generated" or generic and you need to prove it: Inter/Roboto defaults, purple gradients, everything-in-cards, glassmorphism, "Submit"/"Loading..." copy.
- You need a WCAG 2.2 AA pass (contrast, target size 24/44px, focus not obscured, drag/auth/redundant-entry deltas) and a Core Web Vitals check (LCP/INP/CLS at field p75).
- You need findings triaged into an **ordered fix queue** (red-route/Travis test + effort×impact + MoSCoW) to hand off to `ux-remediation-and-redesign`, not just a list of complaints.
- A premium product needs a premium-readiness pass: buyer proof, pricing confidence, support visibility, empty states, executive clarity.

## Do Not Use When

- You want to **execute** the fixes — redesign lo-fi→hi-fi, run 5-user/A/B/tree tests, measure uplift. That is `ux-remediation-and-redesign`; this skill diagnoses, scores, and triages, then hands off.
- You need only the detailed visual/product slop checklist (`visual-product-slop-audit`), the positive visual system rules to build against (`practical-ui-design`), or animation craft standards (`motion-design`) — load those directly.
- You need a ship go/no-go gate — that is `design-qa-and-pre-launch-review`.

## Inputs

| Artefact or context | Source | Required? | Why |
|---|---|---|---|
| Inspectable artefact and key states | User or project | yes | Grounds every finding in evidence |
| Audience, purpose, platform, and brand intent | Brief | yes | Sets the correct design bar |
| Design system, analytics, and field data | Project evidence | conditional | Tests consistency and real-world impact |

- The artifact under audit: screens/URLs/components plus, ideally, the live build (CWV needs CrUX/RUM field data, not just a mockup).
- Context for Step 1: who the users are, the purpose (task/commerce/info), the platform (web/Android/iOS), the design system/tokens if any, and the intended brand personality.
- Whether a **full 10-dimension scored audit** or the **10-minute quick checklist** is wanted, and whether a premium-readiness pass applies.

## Workflow

- For premium products, add a premium-readiness pass: buyer proof, service cues, pricing confidence, executive clarity, support visibility, SEO/content authority, and product packaging.

## Decision Rules

| Condition | Action | Wrong-choice failure |
|---|---|---|
| One page, screen, flow, or document | Run this audit and produce a triaged finding register | Product-wide scope dilutes evidence and misses local detail |
| Multiple product surfaces or platforms | Route to `product-design-audit` | Independent scores cannot expose cross-platform drift |
| Final release decision is required | Route to `design-qa-and-pre-launch-review` | A diagnostic score is mistaken for a ship verdict |
| The artefact or a critical state cannot be inspected | Mark the dimension unverified and cap confidence | Guessed findings are presented as observed evidence |

## Capability Contract

Read and visual inspection are required. Repository search, browser access, rendering, and
measurement tools are optional but strengthen evidence. This audit is read-only: do not edit the
artefact unless the user separately requests remediation.

## Degraded Mode

When only screenshots or partial files are available, audit only visible states, label every
unseen interaction or breakpoint as unverified, and return a conditional score. Do not claim
accessibility, responsiveness, or release readiness without the relevant interactive checks.
Stop rather than score when the primary artefact itself cannot be inspected.

## Quality Standards

Every finding must be observable, severity-calibrated, routed to an owner, and preserved in the
coverage record. Hard-gate failures cap the verdict; missing evidence lowers confidence.

## Anti-Patterns

- **Finding without evidence.** Cite the screen, state, measurement, or source line; otherwise
  remove the claim.
- **Severity by taste.** Tie severity to blocked tasks, user harm, compliance, frequency, or
  business impact; do not promote a personal preference to Critical.
- **Score averaging across blockers.** Apply the hard caps when accessibility or slop gates fail;
  a polished visual average must not hide a release blocker.
- **Audit that silently redesigns.** End with the triaged queue and hand accepted findings to
  `ux-remediation-and-redesign`.
- **Happy-path-only inspection.** Include empty, error, loading, focus, disabled, responsive, and
recovery states or mark them unverified.

## Outputs

| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Scored audit and triaged finding register | Design and product owners | Every finding cites observed evidence, severity logic, and an owning remediation skill |
| Coverage and confidence note | Release reviewer | Unseen states and unrun checks are explicit |

- A **design audit report** covering visual hierarchy, typography, spacing, colour, accessibility,
  performance, microcopy, slop signals, and an ordered fix queue.
- An **accessibility pass report** when WCAG conformance is part of the audit scope.

## References

- `doctrine/design-doctrine.md` — the anti-slop charter every audit enforces.
- ECC `skills/design-system/SKILL.md` §"Mode 2: Visual Audit"
  (`C:\Users\Peter\Downloads\ECC-main\skills\design-system\SKILL.md`) — source of the §2.0
  code-grounded 0–10-per-dimension scoring with mandatory `file:line` fixes.
- `doctrine/references/ai-slop-taxonomy.md` — the visual/product slop tells the AI Slop dimension checks against.
- `doctrine/references/ai-slop-banned-fonts.md` — the banned primary typefaces the Typography dimension flags.
- `doctrine/references/pairing-principles.md` and `doctrine/references/type-scale-and-spacing.md` — the type-pairing and scale standards the Typography dimension audits against.
- Use `references/consistency-audit.md` when drift between screens, components, or labels is a suspected issue.
- `references/audit-rubric.md` — composes the AI-slop, WCAG 2.2, and Core Web Vitals gates into a
  scored 0–100 rubric with cap rules; use it whenever the audit needs a defensible number.
- `references/triage-and-prioritization.md` — the triage stack (Travis red-route test +
  effort-vs-impact + MoSCoW + tie-breakers) that turns scored findings into an **ordered fix
  queue**; run it after scoring (Workflow Step 3).
- `doctrine/references/interaction-anti-patterns.md` — the behavioural **interaction-detection
  checklist** (A1–E3: navigation, forms, feedback, hierarchy, novelty/platform-fit). Walk the UI
  against it during the systematic scan; any match is a finding, with severity set by triage.
- `doctrine/references/wcag-2.2-criteria.md` and `doctrine/references/web-performance-budgets-2026.md`
  — the accessibility floor (WCAG 2.2 AA) and performance floor (CWV "good") the rubric enforces.

## Examples

- `examples/design-audit-filled.md` — a real scored audit of a sample artifact (marketing
  landing + signup), showing the three gates, 0–4 dimension scoring, and how a failed gate caps
  the final score.
<!-- dual-compat-end -->

## Plugins (Load Alongside)

Load `visual-product-slop-audit`, `practical-ui-design`, or `motion-design` for specialist checks;
hand triaged findings to `ux-remediation-and-redesign` for execution and re-validation.

## 1. Audit Process

### Step 1: Gather Context

Before auditing, understand:

- **Who are the users?** (age, tech literacy, use context)
- **What's the purpose?** (task completion, information display, commerce)
- **What platform?** (web, Android, iOS, cross-platform)
- **What design system?** (if any — tokens, components, patterns)
- **What's the brand personality?** (professional, playful, clinical)

### Step 2: Systematic Scan

Evaluate across all 10 dimensions (Section 2). Score each dimension. Run the
**interaction-detection pass**: walk the UI against `doctrine/references/interaction-anti-patterns.md`
(A1–E3) — any match is a finding feeding the list below.

### Step 3: Triage — sequence the findings into a fix order

Scoring tells you *how bad*; it does not tell you *what to fix first*. After scoring, run every
finding through the triage stack in **`references/triage-and-prioritization.md`**:

1. **Red-route / Travis test** (red route? hard to overcome? persistent?) → sets the severity band.
2. **Effort-vs-impact map** → sequences within a band (Quick wins → Major projects → Fill-ins; park Thankless).
3. **MoSCoW** (Must/Should/Could/Won't) → the release commitment.
4. Tie-break on **frequency** and **business alignment**.

Gate failures (Slop / WCAG 2.2 AA / CWV) are always at least Critical/High and never demoted below
their cap. The output is an **ordered fix queue** — the audit ends with a prioritised sequence, not
just a number. This queue is the input contract to the `ux-remediation-and-redesign` skill (see
Section 6 / Hand-off): **this skill diagnoses, scores, and triages; that skill executes the fix.**

### Step 4: Produce Report

Follow the report structure (Section 3). Order findings by the Step 3 triage queue, not just by
raw severity.

---

## 2. The 10 Audit Dimensions

### 2.0 Code-grounded 0–10 scoring, with a fix at exact file:line (DS-12)

When the artefact under audit is source-controlled (CSS/SCSS, component files, template files —
not only a live screen or a mockup), score each dimension below **0–10** in addition to the
`audit-rubric.md` 0–4 weighted score, and require every "Fix" to name the **exact `path:line`**
it applies to, e.g. `src/components/Card.tsx:42`, not "the card component" or "the hero section."
An unlocatable finding is not a finding — if the artefact cannot be traced to a specific file and
line, mark it unverified per the Degraded Mode rule rather than asserting a vague fix.

This addition is adapted from ECC's `skills/design-system/SKILL.md` Mode 2 ("Visual Audit"),
which scores 10 dimensions 0–10 each and states: *"Each dimension gets a score, specific
examples, and a fix with exact file:line."* ECC's 10 dimensions map onto this skill's 10 (§2
below) as follows — use ECC's naming and this skill's checks together, they are not identical
lists:

| ECC dimension (0–10) | This skill's dimension (0–4, `audit-rubric.md`) |
|---|---|
| Colour consistency | Dimension 5: Colour |
| Typography hierarchy | Dimension 4: Typography (feeds Dimension 2: Visual Hierarchy) |
| Spacing rhythm | Dimension 6: Layout & Spacing |
| Component consistency | Dimension 6/7 combined (Layout & Spacing; Interaction States) — see `references/consistency-audit.md` |
| Responsive behaviour | Dimension 6: Layout & Spacing (breakpoint checks) |
| Dark mode | Dimension 5: Colour (dark-mode row) |
| Animation | Dimension 8: Motion & Animation |
| Accessibility | Dimension 3: Accessibility |
| Information density | Dimension 2: Visual Hierarchy (whitespace/focal-point rows) |
| Polish | Dimension 7: Interaction States (hover/loading/empty states) |

ECC's rubric does not run the AI-Slop, WCAG 2.2, or Core Web Vitals hard gates this engine's
`audit-rubric.md` requires (§1 there) — the 0–10/file:line **addition does not replace** those
gates or the 0–4 weighted score; it is a stricter, code-grounded supplement for use whenever the
audited artefact is a real codebase rather than a rendered screen only. Report both scores when
both apply: the 0–4 weighted total (with gate caps) stays the number of record for the ship
decision (§4 below); the 0–10 code-grounded scores go in the Findings section, one per dimension,
each with its `file:line` fix.

### Dimension 1: AI Slop Detection

**The first check.** Does this interface look machine-generated?

| Check | Look For |
|---|---|
| Typography | Inter/Roboto defaults, no hierarchy, title case everywhere |
| Colour | Cyan-on-dark, purple gradients, gradient text, pure black/white |
| Layout | Everything in cards, identical card grids, everything centred |
| Effects | Glassmorphism, decorative blur, glow borders, SVG blobs |
| Motion | Bounce/elastic easing, animation fatigue |
| Content | "Submit" buttons, "Loading..." text, corporate AI jargon |

**Verdict**: PASS (distinctive, intentional) / BORDERLINE (some generic choices) / FAIL (immediately recognisable as AI-generated)

Premium audit red flags include generic screenshots, unsupported premium claims, vague pricing CTAs, weak empty states, no proof, no support path, no business outcome, and polish that is not backed by speed, accessibility, data quality, or controls.

### Dimension 2: Visual Hierarchy

| Check | Standard |
|---|---|
| Squint test | Most important element visible when blurred |
| Size hierarchy | Clear primary > secondary > tertiary sizing |
| Weight contrast | Bold for headings, regular for body (not medium/light) |
| Colour emphasis | Brand colour reserved for interactive elements |
| Whitespace | Generous spacing separates sections; tight spacing groups related items |
| Focal point | Each screen has one clear entry point for the eye |

### Dimension 3: Accessibility

| Check | Standard | Severity |
|---|---|---|
| Text contrast | >= 4.5:1 (body), >= 3:1 (large text) | Critical |
| UI component contrast | >= 3:1 against background | Critical |
| Touch targets | >= 44x44px (48x48px preferred) | Critical |
| Keyboard navigation | Logical tab order, visible focus ring | Critical |
| Screen reader | Semantic HTML, ARIA labels, meaningful alt text | Critical |
| Colour independence | Never colour alone as indicator | High |
| Zoom support | Usable at 200% zoom | High |
| Reduced motion | `prefers-reduced-motion` respected | High |
| Focus management | Focus moves logically after interactions | Medium |

**WCAG 2.2 deltas to check (new since 2.1):** focus not obscured by sticky chrome (2.4.11, AA);
target size **>= 24x24 CSS px** or spaced (2.5.8, AA); every drag has a single-pointer
alternative (2.5.7, AA); no re-entry of info already given in the flow (3.3.7, A); auth needs no
cognitive-function test without an alternative (3.3.8, AA); help appears in consistent order
(3.2.6, A). See `doctrine/references/wcag-2.2-criteria.md`. Certify with the WCAG ratio; design
with APCA.

### Dimension 4: Typography

| Check | Standard |
|---|---|
| Font choice | Intentional, not default (matches brand personality) |
| Type scale | Consistent scale (Major Third or project-appropriate) |
| Body size | >= 16px (18px preferred) |
| Line height | 1.5-2.0 for body; decreasing for larger sizes |
| Line length | 40-80 characters (66 ideal) |
| Weight usage | Regular + Bold only (avoid thin/light/medium) |
| Alignment | Left-aligned body text (no justified, centre only for 1-2 lines) |
| Letter spacing | Decreased for large display text |

### Dimension 5: Colour

| Check | Standard |
|---|---|
| Tinted neutrals | No pure grey (#808080), black (#000), or white (#fff) |
| Palette structure | Primary + neutral + semantic + surface tokens |
| 60-30-10 rule | 60% neutral, 30% secondary, 10% accent |
| Semantic colour | Red=error, amber=warning, green=success, blue=info |
| Dark mode | Independently designed (not inverted), desaturated brand colours |
| Brand colour usage | Reserved for interactive elements only |
| System colour pairing | Always paired with icon (not colour alone) |

### Dimension 6: Layout & Spacing

| Check | Standard |
|---|---|
| Spacing system | Consistent token scale (4pt or 8pt based) |
| Spacing variation | Rhythm through varied spacing (not uniform everywhere) |
| Alignment consistency | Few alignment axes per screen |
| Content max-width | Text constrained to 40-80 character line length |
| Grid usage | Appropriate tool: Flexbox for 1D, Grid for 2D |
| Responsive | Mobile-first, content-driven breakpoints |
| Container queries | Used for reusable components |

### Dimension 7: Interaction States

Every interactive element must have these states defined:

| State | Visual Treatment |
|---|---|
| Default | Base appearance |
| Hover | Subtle shift (colour, shadow, or position) |
| Focus | Visible ring (`focus-visible` for keyboard only) |
| Active/Pressed | Distinct from hover (scale or colour change) |
| Disabled | Reduced opacity OR removed with explanation |
| Loading | Inline indicator with specific status text |
| Error | Red styling + icon + descriptive message |
| Success | Green styling + icon + confirmation message |

### Dimension 8: Motion & Animation

| Check | Standard |
|---|---|
| Purpose | Every animation serves a function (feedback, guide, connect) |
| Timing | Follows 100/300/500 rule for category |
| Easing | Exponential curves (ease-out-quart/quint), no bounce/elastic |
| GPU-only | Transform + opacity only (no layout property animation) |
| Reduced motion | `prefers-reduced-motion` alternative provided |
| Performance | 60fps on mid-range devices |
| Restraint | Not everything animates (no animation fatigue) |

### Dimension 9: Content & Microcopy

| Check | Standard |
|---|---|
| Button labels | Verb + noun (no "Submit", "OK", "Yes/No") |
| Error messages | What happened + why + how to fix |
| Empty states | Acknowledge + explain value + action |
| Loading text | Names the operation ("Saving your draft...") |
| Link text | Descriptive (no "Click here", "Learn more") |
| Vocabulary | Consistent terms throughout |
| Tone | Matches moment (serious for errors, warm for onboarding) |

### Dimension 10: Performance

| Check | Standard |
|---|---|
| LCP | < 2.5s (Core Web Vitals "good", field p75) |
| INP | < 200ms (CWV "good", field p75; INP replaced FID in 2024) |
| CLS | < 0.1 (CWV "good", field p75) |
| Initial load | Within archetype budget (marketing total <= 1 MB gz) |
| Images | WebP/AVIF, srcset, lazy loading, explicit dimensions |
| Fonts | `font-display: swap`, preloaded, subset |

Verify CWV from **field p75** (CrUX/RUM) where available; Lighthouse lab is a proxy. Set the
three thresholds as Lighthouse-CI gates. See `doctrine/references/web-performance-budgets-2026.md`
for per-archetype asset budgets.

---

## 3. Report Structure

### Header

```
# Design Audit Report
**Date:** [Date]
**Auditor:** [AI runner name] (AI-assisted)
**Target:** [Screen/feature name]
**Platform:** [Web/Android/iOS]
**Context:** [Brief description of purpose and users]
```

### AI Slop Verdict

```
## AI Slop Verdict: [PASS / BORDERLINE / FAIL]
[1-2 sentence summary of why]
```

### Executive Summary

```
## Executive Summary
- **Overall Score:** [X/100]
- **Critical Issues:** [count]
- **High Issues:** [count]
- **Medium Issues:** [count]
- **Low Issues:** [count]
- **What's Working:** [1-3 bullet points of strengths]
- **Top Priority:** [The single most impactful fix]
```

### Findings by Severity

```
## Critical (Must Fix Before Ship)
### [Finding Title]
- **Dimension:** [Which of the 10 dimensions]
- **Location:** [Where in the interface]
- **Issue:** [What's wrong]
- **Impact:** [Who is affected and how]
- **Fix:** [Specific actionable fix] — when the artefact is source-controlled, cite the exact
  `path:line` (e.g. `src/components/Hero.tsx:118`), per §2.0. A fix that cannot name a
  `path:line` is a vague instruction, not a finding — mark it unverified instead.
- **Standard:** [Which standard it violates]

## High (Fix Within Sprint)
[Same structure]

## Medium (Fix Within Quarter)
[Same structure]

## Low (Nice to Have)
[Same structure]
```

### Severity Definitions

| Severity | Meaning |
|---|---|
| **Critical** | Blocks users, fails accessibility law, data loss risk |
| **High** | Significant UX degradation, frequent user confusion |
| **Medium** | Noticeable quality issue, occasional friction |
| **Low** | Minor polish, edge case, aesthetic preference |

### Positive Findings

```
## What's Working Well
[List patterns and decisions that are effective and should be maintained]
```

### Triage Queue & Recommendations

Include the triage worksheet from `references/triage-and-prioritization.md` §2, then derive the
ordered recommendations from its **Order** column:

```
## Triage Queue
[Triage worksheet: each finding scored red-route / hard / persistent → severity, impact×effort,
MoSCoW, and a final Order integer.]

## Prioritised Recommendations (from the triage Order)
1. [Highest impact fix] — addresses [N] critical/high issues — [Must]
2. [Second priority] — addresses [N] issues — [Should]
3. [Third priority] — addresses [N] issues — [Could]
```

Hand the ordered queue to `ux-remediation-and-redesign` to execute the fixes.

---

## 4. Scoring Guide

For a defensible, repeatable score, use **`references/audit-rubric.md`** — it composes the AI
Slop, WCAG 2.2, and Core Web Vitals gates (which can cap the total) with the 0–4 dimension
scoring and the weights below. A worked, filled example is in `examples/design-audit-filled.md`.

| Score | Meaning |
|---|---|
| 90-100 | Production-ready. Minor polish only. |
| 75-89 | Good foundation. Fix high-priority issues before shipping. |
| 60-74 | Significant issues. Needs focused remediation sprint. |
| 40-59 | Major redesign areas. Multiple dimensions failing. |
| < 40 | Fundamental problems. Start with structure and hierarchy. |

### Dimension Weights

| Dimension | Weight | Rationale |
|---|---|---|
| Accessibility | 20% | Legal requirement, blocks users |
| Visual Hierarchy | 15% | Foundation of usability |
| Interaction States | 12% | Functional completeness |
| Content & Microcopy | 12% | User comprehension |
| Typography | 10% | Readability |
| Colour | 8% | Communication and mood |
| Layout & Spacing | 8% | Structure and scannability |
| Performance | 6% | Speed and responsiveness |
| Motion | 5% | Polish and feedback |
| AI Slop | 4% | Distinctiveness (binary pass/fail) |

---

## 5. Quick Audit Checklist (10-Minute Version)

For rapid checks when a full audit is not needed, review AI slop, hierarchy, contrast, touch
targets, keyboard focus, interaction states, button labels, error recovery, empty states,
responsive behaviour, performance, and reduced motion; record each item as pass, fail, or unverified.

---
## 6. Hand-off — where the audit stops

This skill ends at a **triaged, ordered fix queue** (Workflow Step 3 + the Triage Queue report
section). It deliberately does **not** redesign, re-prototype, or re-test.

| Stage | Owner |
|---|---|
| Detect (10 dimensions + `interaction-anti-patterns.md`) | **`design-audit`** (this skill) |
| Score (rubric, gates, caps) | **`design-audit`** |
| Triage → ordered fix queue (`triage-and-prioritization.md`) | **`design-audit`** |
| Redesign lo-fi → hi-fi, validate (5-user / A/B / tree test), measure uplift | `ux-remediation-and-redesign` |
| Ship go/no-go | `design-qa-and-pre-launch-review` |

Pass the triage worksheet + Prioritised Recommendations to `ux-remediation-and-redesign` as its
input contract. That closes the loop: **audit → fix → re-validate → ship.**

---

*Sources: Impeccable audit and critique skills (Bakaus, 2025) — Impeccable (Paul Bakaus), Apache-2.0, https://github.com/pbakaus/impeccable, commit 114ea1d (reviewed 2026-09-29); WCAG 2.2 AA; Nielsen Norman Group heuristic evaluation framework; triage method after Maioli, "Fixing Bad UX Designs" (2018).*
