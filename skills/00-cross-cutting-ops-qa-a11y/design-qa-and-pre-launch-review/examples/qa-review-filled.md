# Pre-Launch QA Review — Maduuka Checkout Page (filled)

A worked, end-to-end pre-launch review of a real page archetype. Run against
`references/pre-launch-qa-checklist.md`. Shows a first-pass **NO-SHIP**, the blocker
remediation, and the re-review **SHIP**. Numbers are concrete, not placeholder.

---

## Section 0 — Header

| Field | Value |
|---|---|
| Target | `/checkout` — single-page checkout (cart review → address → pay) |
| Date | 2026-06-21 (review 1) · 2026-06-22 (re-review) |
| Build | `maduuka-web@a91f3c2` on staging.maduuka.example |
| Approved design | Figma `Checkout v4` frames (mobile 390px + desktop 1440px) + redline `RL-117` |
| Archetype | **Web-app shell** (interactive, authed, per-route budget) |
| Conformance target | WCAG 2.2 **AA** |
| Launch owner | P. Bamuhigire |

Both sides present (build + Figma + redline). Proceed.

---

## Section 1 — Spec parity

| Check | Result | Note |
|---|---|---|
| Design tokens | **FAIL** | "Place order" button uses hard-coded `#1F6FEB`; system token is `--color-action` (`#1A5FD4`). One-off, will drift. → Finding S-1 |
| Type scale | PASS | All sizes on the project Major-Third scale. |
| Pairing | PASS | Stated pairing (Andada Pro display / Public Sans body) present; no banned font; no monotype. |
| Component variants | PASS | All three address-card variants present. |
| **State set** | **FAIL** | "Place order" button has no **disabled** and no **loading** state — double-submit possible while the charge resolves. → Finding S-2 (also a11y + UX) |
| Microcopy | **FAIL** | Primary button reads "Submit"; approved copy is "Place order". Empty-cart text is "No items." vs approved "Your cart is empty — browse the catalogue to add items." → Finding S-3 |
| Spacing rhythm | PASS | 8pt token scale throughout; grouping intent preserved. |

---

## Section 2 — Pixel parity (reference width 1440px)

- Overlay vs `Checkout v4 / Desktop`. Order summary panel sits **24px** narrower than design
  (480 → 456px) because a hard-coded max-width overrides the grid. → Finding S-4 (minor, but
  cascades into a wrap at 1280px — see device matrix).
- Everything else within 1–2px. No undocumented deviations beyond S-4.

---

## Section 3 — GATE A · Anti-slop  *(composed — blocking)*

Ran `visual-product-slop-audit` + `ai-slop-typography-audit`.

- [x] No banned default typeface — Andada Pro + Public Sans, both intentional, stated in the design doc.
- [x] Type/colour/layout choice stated before build (design doc §2).
- [x] No visual slop tells — no AI imagery, no decorative blur/glow/gradient-as-design.
- [x] No product slop tells — no gratuitous "AI" feature; the "estimate delivery" call is grounded in a real API with a visible fallback.

**Gate A verdict: PASS.**

---

## Section 4 — GATE B · Accessibility (WCAG 2.2 AA)  *(composed — blocking)*

Ran `accessibility-wcag-2-2-compliance`: axe (Lighthouse) + manual keyboard + VoiceOver smoke test.

| Check | Result | Detail |
|---|---|---|
| Contrast — body | PASS | Body `#1A1A2E` on `#FBFAF7` = 14.8:1. |
| Contrast — button label | **FAIL** | White on hard-coded `#1F6FEB` = **3.9:1** (< 4.5:1 for the 16px label). The correct token `#1A5FD4` = 5.2:1 → passes. Ties to S-1. → Blocker A11Y-1 (1.4.3) |
| Keyboard operable + visible focus | **FAIL** | Custom radio address-cards are `<div onClick>` — not focusable, not keyboard-selectable; no visible focus. → Blocker A11Y-2 (2.1.1, 2.4.7) |
| Name/Role/Value | **FAIL** | Same `<div>` radios expose no role/state to AT. → Blocker A11Y-3 (4.1.2) |
| Alt text | PASS | Product thumbnails have meaningful alt; decorative divider hidden. |
| Reflow 320px / 200% zoom | PASS | Usable; no loss at 320px or 200%. |
| Reduced motion | PASS | `prefers-reduced-motion` removes the panel slide. |
| Forms: labels/errors | PASS | Labelled; inline errors identify field + suggest fix. |
| 2.4.11 Focus not obscured | PASS | Sticky order-summary bar does not cover focused inputs. |
| 2.5.7 Dragging | N/A | No drag interaction. |
| 2.5.8 Target size ≥24px | **FAIL** | The "remove item" ✕ is **18×18px**. → Blocker A11Y-4 (2.5.8) |
| 3.2.6 Consistent help | PASS | Support link in consistent footer slot. |
| 3.3.7 Redundant entry | PASS | Saved address pre-fills; not re-asked. |
| 3.3.8 Accessible auth | PASS | OTP has a one-tap email-link alternative. |

(Designed with APCA for legibility; certified here against the WCAG 2.x ratios per
`wcag-2.2-criteria.md`.)

**Gate B verdict: FAIL** — 4 AA blockers (A11Y-1..4).

---

## Section 5 — GATE C · Performance (Core Web Vitals + budget)  *(composed — blocking)*

Ran `performance-as-ux-and-core-web-vitals` vs `web-performance-budgets-2026.md`
(web-app shell, per-route budget).

| Metric / asset | Budget | Measured | Result |
|---|---|---|---|
| LCP | ≤ 2.5 s | 2.1 s | PASS |
| INP | ≤ 200 ms | 165 ms | PASS |
| CLS | ≤ 0.1 | **0.18** | **FAIL** — the order-summary total injects after fetch with no reserved height; layout jumps. → Blocker PERF-1 |
| JS (gz) | ≤ 300 KB | 244 KB | PASS |
| CSS (gz) | ≤ 75 KB | 41 KB | PASS |
| Fonts | ≤ 100 KB | 88 KB (2 variable faces, subset, `swap`) | PASS |
| Images | lazy | thumbnails lazy, AVIF, width/height set | PASS |

**Gate C verdict: FAIL** — CLS 0.18 over the 0.1 good band (PERF-1).

---

## Section 6 — Cross-device matrix

| Viewport | Width | No h-scroll | No clip/overlap | Targets ≥24px | Type readable | Intent holds |
|---|---|---|---|---|---|---|
| Small phone | 360px | ✓ | ✓ | ✗ (✕ 18px) | ✓ | ✓ |
| Large phone | 414px | ✓ | ✓ | ✗ (✕ 18px) | ✓ | ✓ |
| Tablet | 768px | ✓ | ✓ | ✗ | ✓ | ✓ |
| Desktop | 1280px | ✓ | **✗ summary wraps under cart** (S-4 cascade) | ✗ | ✓ | partial |
| Large desktop | 1920px | ✓ | ✓ | ✗ | ✓ | ✓ |

→ S-4 promoted: the narrow summary panel wraps at 1280px. Finding S-4 (high).

---

## Section 7 — Cross-browser matrix

| Engine | Browsers | Focus rings | Form controls | Layout | Fonts | Pass |
|---|---|---|---|---|---|---|
| Chromium | Chrome 126, Edge | ✓ | ✓ | ✓ | ✓ | ✓ |
| WebKit | Safari 17 (macOS+iOS) | n/a (div radios unfocusable — see A11Y-2) | **✗** native checkbox unstyled, oversized on iOS | ✓ | ✓ | ✗ |
| Gecko | Firefox 127 | ✓ | ✓ | ✓ | ✓ | ✓ |

→ WebKit checkbox styling. Finding B-1 (medium).

---

## Section 8 — Verdict (review 1)

### NO-SHIP

Blockers (each: gate · standard · fix):

| ID | Gate | Standard | Fix |
|---|---|---|---|
| A11Y-1 | B · a11y | WCAG 1.4.3 (4.5:1) | Use token `--color-action` `#1A5FD4` (5.2:1); fixes S-1 too. |
| A11Y-2 | B · a11y | WCAG 2.1.1 / 2.4.7 | Rebuild address-cards as a real `<fieldset>`/`<input type=radio>` group with visible focus. |
| A11Y-3 | B · a11y | WCAG 4.1.2 | (Same rebuild) exposes role=radio + checked state to AT. |
| A11Y-4 | B · a11y | WCAG 2.5.8 (≥24px) | Enlarge "remove" ✕ to 44×44 touch target. |
| PERF-1 | C · perf | CWV CLS ≤ 0.1 | Reserve the order-total row height (`min-height`/`aspect-ratio`) so the fetched total doesn't shift layout. |

Non-blocking follow-ups (logged): **S-2** add disabled+loading button states (owner: FE, also prevents double-submit) · **S-3** copy "Submit"→"Place order", empty-cart text (owner: content) · **S-4** restore summary to grid width / fix 1280px wrap (owner: FE) · **B-1** style the WebKit checkbox (subsumed by the A11Y-2 rebuild).

Recorded by: QA (Codex-assisted) · Owner sign-off: **withheld — NO-SHIP** · 2026-06-21

---

## Re-review (2026-06-22, build `a91f3c2`→`c40d8e1`)

All five blockers remediated and the follow-ups landed in the same pass:

- A11Y-1 / S-1: button now uses `--color-action` `#1A5FD4` → **5.2:1 PASS**.
- A11Y-2 / A11Y-3 / B-1: address-cards rebuilt as native radio fieldset → keyboard-selectable,
  visible focus, role+state exposed, WebKit control now styled consistently.
- A11Y-4: ✕ target now 44×44 → **≥24px PASS** on all viewports.
- PERF-1: total row reserves height → **CLS 0.04 PASS**.
- S-2: disabled + loading ("Placing order…") states added → no double-submit.
- S-3: "Place order" + full empty-cart copy live.
- S-4: summary back to 480px grid width; 1280px wrap resolved.

Re-run gates: **A PASS · B PASS (0 AA failures) · C PASS (CLS 0.04, all budgets green)**.
Device matrix: all ✓. Browser matrix: Chromium ✓ · WebKit ✓ · Gecko ✓.

### SHIP

Build-gate lines wired so the gates stay enforced post-launch:
- Lighthouse-CI: `cls: 0.1`, `lcp: 2500`, `inp: 200`, resource budgets per the web-app-shell row.
- axe-core CI: 0 serious/critical violations to merge.

Recorded by: QA (Codex-assisted) · **Launch owner sign-off: P. Bamuhigire** · 2026-06-22

---

*Run against `references/pre-launch-qa-checklist.md`. Gates composed:
`visual-product-slop-audit` + `ai-slop-typography-audit`, `accessibility-wcag-2-2-compliance`,
`performance-as-ux-and-core-web-vitals`. Canonical refs: `doctrine/references/wcag-2.2-criteria.md`,
`doctrine/references/web-performance-budgets-2026.md`, `doctrine/design-doctrine.md` (Mission /
NO-SHIP rule).*
