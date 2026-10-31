# Worked Example: Component Handoff Sheet — Primary Button (in a Sign-in form)

A complete, real redlined dev spec for **one component as placed in a design**: the primary submit
button of a sign-in form. It cites the library component and the semantic tokens from
`09-…/design-tokens-and-naming` (brand "Maduuka", hue ~255, the same system used in that skill's
`tokens.json`). Resolved values appear in parentheses for sanity only — **the token name is the
contract.** This is the artefact a developer builds from and a reviewer signs off against.

---

## Header

| Field | Value |
|---|---|
| **Unit** | Submit button, Sign-in form |
| **Library component** | `Button / variant=primary / size=md` @ design-system **v2.3** |
| **Tokens from** | `09-…/design-tokens-and-naming` — Maduuka semantic layer |
| **Themes in scope** | Light (default) + Dark |
| **Platforms** | Web; container-driven (`form` container, `containerSm` = 360px) |
| **Owner / date** | Design → Eng handoff · 2026-06-21 |
| **Source frames** | `Signin / default · hover · focus · active · disabled · loading · error · containerSm · dark` (9 frames, all attached) |

---

## 1. Redline — box model & visual (resting, light)

```
Element: Submit button  —  Button / primary / md @ v2.3
  role:    <button type="submit">
  size:    height = hug → 40px (component-owned); width = fill form, min 96px, max none
  spacing: inset = space.inset.md (→16px) horizontal · component default vertical (→10px)
           gap above (to password field) = space.stack.lg (→24px)
  layout:  parent = form, single column, vertical stack; button justify=stretch
           internal: inline flex, center/center, gap space.inline.sm (→8px) [label ↔ spinner]
  type:    text.label.md  (component-owned: 14px / 20px, weight 600)
  colour:  bg = color.action.primary.bg   (→ brand.600  oklch(0.55 0.17 255))
           fg = color.text.on-action       (→ neutral.0)
  radius:  radius.200 (→8px)
  border:  none at rest
  elev:    none at rest
  icon:    none at rest (spinner only in loading state — see §2)
```

---

## 2. State matrix (deltas from resting; tokens only)

| State | Delta from resting | A11y note |
|---|---|---|
| **hover** | bg → `color.action.primary.bg.hover` (brand.700) | pointer only; no layout shift |
| **focus-visible** | + 2px `color.border.focus` ring, offset `space.50` (→2px) | ring ≥3:1 vs `surface.default`, **both themes** (WCAG 1.4.11) |
| **active / pressed** | bg → `color.action.primary.bg.active` (brand.800) | — |
| **disabled** | bg → `color.action.disabled.bg`; fg → `color.text.disabled`; cursor `not-allowed`; no hover/active | `aria-disabled` not used — real `disabled`; still in focus order per pattern? No: removed from tab order |
| **loading** | label visually hidden; `icon.spinner` (16px, `color.text.on-action`); width holds (no reflow); not clickable | `aria-busy="true"`; label text kept for SR (`.sr-only`), not removed |
| **error (form-level)** | button unchanged; error surfaces on fields + summary (see §4) | error summary focused, not the button |

### Dark theme (only the semantic aliases move; component spec is byte-identical)

| Role | Light | Dark |
|---|---|---|
| `action.primary.bg` | brand.600 `oklch(0.55 0.17 255)` | brand.400 `oklch(0.67 0.14 255)` (lightened + desaturated) |
| `text.on-action` | neutral.0 | neutral.950 |
| `border.focus` | brand.600 | brand.400 |
| **contrast check** | on-action vs bg = **4.8:1** ✓ | **6.3:1** ✓ (re-checked per theme) |

---

## 3. Responsive / adaptive behaviour

| Container | Behaviour |
|---|---|
| `> containerSm` (>360px) | button = fill form width (form is max 360px → effectively full) |
| `≤ containerSm` (≤360px) | unchanged — single full-width button; inset tokens hold; no font step |
| intermediate | fluid width (fill); **snaps** nothing; height fixed at 40px throughout |

> Container-driven (`@container`), not viewport — the form may sit in a modal or a sidebar.

---

## 4. Behaviour & motion

**Behaviour**
- **Action:** submits credentials.
- **Validation timing:** email + password validated **on submit** (not on change); also re-validated
  on blur after first submit attempt.
- **Disabled rule:** button is `disabled` until both fields are non-empty; full validity checked on
  click.
- **Async:** on click → `loading` state (§2), control `aria-busy`, request fires; on success →
  navigate to dashboard; on failure → exit loading, render error summary above the form, move focus
  to the summary, fields with errors get `border.error` + `aria-invalid`.
- **Focus on error:** focus moves to the error summary heading (not the button), which is a
  focusable `<h2 tabindex="-1">` with `aria-live="assertive"`.

**Motion** (all as tokens; `08-…/motion-and-interaction`)
- **Press:** scale 0.98, `motion.duration.instant` (→80ms) `motion.ease.standard`.
- **Loading enter:** spinner fades in, `motion.duration.fast` (→150ms), `motion.ease.standard`.
- **Reduced-motion (`prefers-reduced-motion: reduce`):** no scale, no fade — spinner appears
  instantly; state still changes, only the transition is dropped.

---

## 5. Accessibility annotations (inline — `doctrine/references/wcag-2.2-criteria.md`)

- **Element/role:** native `<button type="submit">` inside `<form>`. Not a `<div>`.
- **Accessible name:** visible label "Sign in" (no `aria-label` needed). In loading, label kept for
  SR via `.sr-only`; `aria-busy="true"` announces the busy state.
- **Focus order:** email → password → (show-password toggle) → Submit. Submit `disabled` ⇒ skipped
  until enabled.
- **Focus-visible:** 2px `border.focus` ring, 2px offset, **≥3:1** vs adjacent surface in **both**
  themes (1.4.11 focus appearance, 2.4.13).
- **Keyboard:** Enter or Space activates; form submits on Enter from any field.
- **Live region:** error summary `aria-live="assertive"`; success navigation announced by route
  change / page title.
- **Target size:** 40px height × ≥96px width ≥ **24×24px** (WCAG 2.5.8). ✓
- **Non-colour signalling:** disabled conveyed by greyed fg **and** `disabled` semantics + cursor;
  loading by spinner **and** `aria-busy`, not colour alone (1.4.1). Error fields by `border.error`
  **and** `aria-invalid` **and** text message.
- **Contrast:** label vs bg 4.8:1 (light) / 6.3:1 (dark) ≥ 4.5:1 ✓; focus ring ≥3:1 ✓.

---

## 6. Content / data edge cases

- **Longest localized label:** "Anmelden / S'identifier" — button is fill-width, so label centers;
  if a locale label would exceed width, it wraps to 2 lines and height grows (hug) — acceptable.
- **Slow network:** loading state may persist; spinner is indeterminate; no timeout text on the
  button (a separate inline message appears after 10s).
- **Double-click:** second click ignored while `aria-busy` (button not clickable in loading).

---

## 7. Acceptance criteria (the merge gate — binary, token-specific)

**Visual (tokens)**
- [ ] Resting bg = `color.action.primary.bg`; fg = `color.text.on-action`; radius `radius.200`.
- [ ] Height 40px; horizontal inset = `space.inset.md` (16px); min-width 96px.
- [ ] Hover bg = `…bg.hover`; active bg = `…bg.active`.

**States**
- [ ] Disabled: bg `color.action.disabled.bg`, fg `color.text.disabled`, cursor `not-allowed`,
      removed from tab order, no hover response.
- [ ] Loading: label SR-only kept, `icon.spinner` shown, width unchanged, `aria-busy="true"`, not
      clickable.

**Responsive**
- [ ] At all container sizes the button fills the form width; height stays 40px; no font step.

**Behaviour**
- [ ] Button `disabled` until both fields non-empty; full validation on submit.
- [ ] On failure: loading exits, error summary rendered above form, focus moves to summary,
      invalid fields get `border.error` + `aria-invalid`.

**Motion**
- [ ] Press = 0.98 scale @ `motion.duration.instant` `motion.ease.standard`; spinner fade @
      `motion.duration.fast`.
- [ ] Under `prefers-reduced-motion: reduce`: no scale, no fade; state still changes.

**Accessibility**
- [ ] Native `<button type="submit">`; accessible name "Sign in".
- [ ] Focus-visible: 2px `border.focus`, 2px offset, ≥3:1 vs surface in light **and** dark.
- [ ] Activatable by Enter and Space; target ≥24×24px.
- [ ] Label contrast ≥4.5:1 in both themes; no state conveyed by colour alone.

---

## 8. Fidelity-review log (filled after build — spec vs implementation)

| # | Criterion | Expected | Actual | Status | Triage |
|---|---|---|---|---|---|
| V-2 | Inset = `space.inset.md` (16px) | 16px | 16px | PASS | — |
| S-2 | Loading width unchanged | hold width | reflows −12px (label removed) | FAIL | blocker |
| A-2 | Focus ring ≥3:1, 2px offset | 2px/2px ring | 1px ring, no offset | FAIL | blocker |
| M-2 | Reduced-motion: no fade | none | spinner still fades | FAIL | polish |
| A-4 | Target ≥24px | 40px | 40px | PASS | — |

> Two blockers (S-2 reflow, A-2 focus ring) block merge; M-2 logged as polish. Parity is measured
> against the criteria list above — not a re-read of the Figma frame — which is exactly why the
> criteria were written before the build started.
