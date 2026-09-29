# Reference: Pre-Launch QA Checklist (the composed ship gate)

The single go/no-go checklist run before a build ships. It does **not** restate the audit
logic — it **composes** the three owning gates and adds the two parity checks (spec, pixel)
and the two coverage matrices (device, browser). Canonical numbers live in the doctrine refs
cited below; this checklist points at them, it does not fork or override them.

**Verdict rule (from `doctrine/design-doctrine.md`, Mission):** any open blocker on the slop,
accessibility-AA, or performance-budget gate forces **NO-SHIP**. Convenience never overrides.

---

## Section 0 — Header (record before you start)

- Target (page / flow / component), date, build URL or commit, **approved design source**
  (Figma frame / redline / spec), page **archetype** (marketing/landing · web-app shell ·
  document/long-form), conformance target (default **WCAG 2.2 AA**), launch owner.
- Confirm you have **both sides**: the build AND the approved design. Parity cannot be
  certified from one side alone.

---

## Section 1 — Spec parity (build matches the design *system*)

| Check | Pass condition | Standard |
|---|---|---|
| Design tokens | Colour/type/spacing resolve to system tokens, not hard-coded one-offs | `doctrine/design-doctrine.md` §tokens; group-09 tokens skill |
| Type scale | Sizes follow the project scale; no off-scale values | `doctrine/references/type-scale-and-spacing.md` |
| Pairing | The stated font pairing is the one in the build; no monotype, no banned font | `doctrine/references/pairing-principles.md`, `ai-slop-banned-fonts.md` |
| Component variants | Every variant in the design exists in the build | group-09 component skill |
| **State set** | Each interactive element ships default/hover/focus/active/disabled/loading/error/success | `design-audit` Dim 7; `empty-error-and-loading-states` |
| Microcopy | Built strings match approved copy (verb+noun buttons; real error/empty text) | group-10 content skills |
| Spacing rhythm | Spacing uses the token scale; grouping/separation intent preserved | `type-scale-and-spacing.md` |

> Any undocumented drift = finding. Documented, intentional deviation = note, not a blocker.

---

## Section 2 — Pixel parity (build matches the mockup at the reference width)

- Side-by-side / overlay the build against the design frame at the **canonical breakpoint**.
- Check: alignment axes, component dimensions, spacing, image crops, and that nothing
  "settled" differently from the design after load.
- Record each delta as *intentional (documented)* or *finding*. Pixel parity without spec
  parity (Section 1) is a false pass — both are required.

---

## Section 3 — GATE A · Anti-slop  *(composed — blocking)*

Run `visual-product-slop-audit` (visual + product tells) and `ai-slop-typography-audit`
(type). Do **not** re-derive the checklist here — invoke the skills.

- [ ] No banned default typeface — `doctrine/references/ai-slop-banned-fonts.md`.
- [ ] The type / colour / layout choice was **stated** before build — Charter rule 1.
- [ ] No visual slop tells survived (waxy AI imagery, melted backgrounds, gibberish text,
      warped logos, decorative blur/glow/gradient-as-design) — `ai-slop-taxonomy.md`.
- [ ] No product slop tells (AI feature where nav/search was faster; ungrounded bot;
      generative output with no verifiability/undo; decorative "AI" badge) — `ai-slop-taxonomy.md`.

**Gate A verdict: PASS / FAIL.** Binary. **Any FAIL = NO-SHIP.**

---

## Section 4 — GATE B · Accessibility (WCAG 2.2 AA)  *(composed — blocking)*

Run `accessibility-wcag-2-2-compliance` against `doctrine/references/wcag-2.2-criteria.md`.
Method per that ref: **automated (axe/Lighthouse) + manual keyboard + screen-reader smoke
test** — automation catches only ~30–40%.

Perennial AA floor:
- [ ] Contrast: body **≥ 4.5:1**; large (≥24px / ≥18.66px bold) and UI/graphics **≥ 3:1** (1.4.3, 1.4.11).
- [ ] Keyboard: everything operable; visible focus; logical order (2.1.1, 2.4.3, 2.4.7).
- [ ] Name/Role/Value on all controls (4.1.2).
- [ ] Meaningful images have alt; decorative hidden (1.1.1).
- [ ] Reflow at 320px width + usable at 200% zoom (1.4.10, 1.4.4).
- [ ] `prefers-reduced-motion` honoured; nothing flashes >3×/s (2.3.1, 2.3.3).
- [ ] Forms: labels, error identification + suggestions, prevention on important data (3.3.x).

WCAG 2.2 deltas:
- [ ] 2.4.11 Focus Not Obscured (Min) — sticky chrome doesn't hide the focused element.
- [ ] 2.5.7 Dragging Movements — drag has a single-pointer alternative.
- [ ] 2.5.8 Target Size (Min) — pointer targets **≥ 24×24 CSS px** (aim 44 touch / 48dp).
- [ ] 3.2.6 Consistent Help — help in consistent order across pages.
- [ ] 3.3.7 Redundant Entry — don't re-ask info already provided in the flow.
- [ ] 3.3.8 Accessible Authentication (Min) — no cognitive-function test without alternative.

### Code-level checks: platform and good/bad pairs

Rows above that can be checked in code, with the platform each applies to. `all` means web,
iOS, Android, React Native and Flutter; the snippets are web, so translate them to the native
equivalent on other platforms. Each row mirrors one catalogue record (`ux-wcag-<sc>`); query it
with `python -X utf8 scripts/design_query.py search "<check>" --domain ux`.

| Check | SC | Platform | Good | Bad |
|---|---|---|---|---|
| Text contrast | 1.4.3 | all | `color: #1F2430; background: #F8F9FB` (14.7:1) | `color: #9AA0A6; background: #FFFFFF` (2.6:1) |
| Non-text contrast | 1.4.11 | all | `border: 1px solid #6A7080` (4.9:1 on white) | `border: 1px solid #E4E6EA` (1.2:1) |
| Keyboard | 2.1.1 | all | `<button type="button">Save</button>` | `<div onclick="save()">Save</div>` |
| Focus order | 2.4.3 | all | source order matches visual order | `tabindex="1"`, `tabindex="2"` reordering |
| Focus visible | 2.4.7 | all | `:focus-visible { outline: 3px solid #3A5BB8 }` | `:focus { outline: none }` |
| Name, role, value | 4.1.2 | all | `<button aria-pressed="true">Bold</button>` | `<div class="toggle on">B</div>` |
| Alt text | 1.1.1 | all | `alt="Revenue rose 12% from Q1 to Q2"` | `<img src="chart.png">` |
| Reflow | 1.4.10 | web | `repeat(auto-fit, minmax(16rem, 1fr))` | `width: 1200px` |
| Resize text | 1.4.4 | web | `font-size: 1rem; min-height: 2.75rem` | `font-size: 14px; height: 20px; overflow: hidden` |
| Pause, stop, hide | 2.2.2 | web | a visible Pause control on auto-play | `setInterval(nextSlide, 4000)` with no control |
| Flashing | 2.3.1 | all | `animation: fade 600ms ease-out 1` | `animation: blink 100ms steps(2) infinite` |
| Focus not obscured | 2.4.11 | web | `html { scroll-padding-top: 5rem }` under sticky chrome | sticky header with no scroll padding |
| Dragging alternative | 2.5.7 | all | Move up / Move down buttons beside drag handles | drag-and-drop as the only way to reorder |
| Target size | 2.5.8 | all | `min-width: 24px; min-height: 24px` (touch: 44 pt iOS, 48 dp Android) | `width: 16px; height: 16px; padding: 0` |
| Accessible authentication | 3.3.8 | all | `autocomplete="current-password"`, paste allowed | `onpaste="return false"` |

> Design with **APCA** for real legibility, then **certify with the WCAG 2.x ratios**
> (APCA is a design aid, not a W3C method; the WCAG 3.0 draft has not chosen a contrast measure). See `wcag-2.2-criteria.md` §Contrast method.

**Gate B verdict: PASS / FAIL.** **Any AA failure = NO-SHIP.** (AAA commitments logged separately.)

---

## Section 5 — GATE C · Performance (Core Web Vitals + budget)  *(composed — blocking)*

Run `performance-as-ux-and-core-web-vitals` against
`doctrine/references/web-performance-budgets-2026.md`.

- [ ] **LCP ≤ 2.5 s** · **INP ≤ 200 ms** · **CLS ≤ 0.1** (field p75, *good* band).
- [ ] Within the archetype asset budget — JS / CSS / image / font / total KB (per the ref's table).
- [ ] LCP element preloaded, never lazy-loaded; CLS reservations set; fonts subset +
      `font-display: swap`; images AVIF/WebP + `srcset` + explicit width/height.
- [ ] Budget wired as **Lighthouse-CI thresholds** so it stays enforced post-launch.

**Gate C verdict: PASS / FAIL.** **Over budget or out of the good band = NO-SHIP.**

---

## Section 6 — Cross-device matrix

Default viewports (override per project). Verify *responsive intent* survives, not merely
that nothing breaks.

| Viewport | Width | No h-scroll | No clip/overlap | Targets ≥24px (aim 44) | Type readable | Layout intent holds |
|---|---|---|---|---|---|---|
| Small phone | 320–360px | | | | | |
| Large phone | 390–430px | | | | | |
| Tablet | 768–834px | | | | | |
| Desktop | 1280–1440px | | | | | |
| Large desktop | 1920px+ | | | | | |

---

## Section 7 — Cross-browser matrix

| Engine | Browsers | Focus rings | Form controls | Layout (`gap`/container-query/`backdrop-filter`) | Fonts/metrics | Pass |
|---|---|---|---|---|---|---|
| Chromium | Chrome, Edge | | | | | |
| WebKit | Safari (macOS + iOS) | | | | | |
| Gecko | Firefox | | | | | |

> Common divergences: WebKit form-control styling and `backdrop-filter`; focus-ring
> rendering across engines; font metrics/hinting; date/number input UI.

---

## Section 8 — Verdict (sign here)

Roll up all sections into ONE verdict:

- **SHIP** — every blocking gate (A slop, B a11y-AA, C perf) PASS; parity clean or deviations
  documented; device/browser matrices pass.
- **SHIP-WITH-FOLLOWUPS** — only non-blocking lows remain; each logged with an owner + date.
- **NO-SHIP** — any blocker open. List each: *gate · standard violated · specific fix*.

Recorded by: ____  ·  Launch owner sign-off: ____  ·  Date: ____

---

*Composes: `visual-product-slop-audit` + `ai-slop-typography-audit` (Gate A),
`accessibility-wcag-2-2-compliance` (Gate B), `performance-as-ux-and-core-web-vitals`
(Gate C). Canonical numbers: `doctrine/references/wcag-2.2-criteria.md`,
`doctrine/references/web-performance-budgets-2026.md`. Verdict rule:
`doctrine/design-doctrine.md` Mission. QA-review structure adapted from NNG heuristic
evaluation.*
