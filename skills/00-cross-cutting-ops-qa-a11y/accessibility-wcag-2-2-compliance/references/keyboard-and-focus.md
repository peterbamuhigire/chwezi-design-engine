# Reference: Keyboard & Focus

Companion to [`doctrine/references/wcag-2.2-criteria.md`](../../../../doctrine/references/wcag-2.2-criteria.md)
(canonical criteria). This file operationalizes **2.1.1 Keyboard, 2.1.2 No Keyboard Trap,
2.4.3 Focus Order, 2.4.7 Focus Visible, and 2.4.11 Focus Not Obscured (new in 2.2)**.
Source: WCAG 2.2 + WAI-ARIA Authoring Practices keyboard sections.

---

## 1. Tab order = DOM order (2.4.3)

- **Author the DOM in reading order.** Visual reordering (CSS `order`, `flex-direction`,
  `grid` placement, absolute positioning) must not desync from focus order.
- **Reading sequence is its own criterion: 1.3.2 Meaningful Sequence (Level A).** When the order
  produced by `order`, `row-reverse` or grid placement changes the meaning (a Cancel button that
  reads before Send, a total that precedes its rows), a screen reader still announces the DOM
  sequence. Fix the DOM, not the CSS. `chwezi-slop` cannot judge a reorder; tab through the
  rendered page and read it with a screen reader to check.
- **Avoid positive `tabindex`** (`tabindex="2"`). It overrides DOM order and is almost always a
  bug. Use only:
  - `tabindex="0"` — make a custom widget focusable in normal order.
  - `tabindex="-1"` — focusable by script (`.focus()`) but not in the tab sequence (used for
    roving tabindex and for the focus target inside a dialog).
- Native interactive elements are already in the tab order — don't add `tabindex="0"` to a
  `<button>` or `<a href>`.

---

## 2. One tab stop per composite widget — roving tabindex (2.4.3, APG)

A menu, tablist, radio group, toolbar, listbox, grid, or tree is **one** stop in the Tab
sequence; **Arrow keys** move *within* it. Two implementations:

- **Roving tabindex:** exactly one child has `tabindex="0"` (the active item), all others
  `tabindex="-1"`. On arrow press, move `tabindex="0"` to the new item and `.focus()` it.
- **`aria-activedescendant`:** the container stays focused and holds
  `aria-activedescendant="<id-of-active-option>"`; you move the id, not DOM focus (common for
  comboboxes where the text input keeps focus).

Without this, a 30-item menu becomes 30 tab stops — a 2.4.3 / usability failure.

---

## 3. Keyboard interaction map (the keys each pattern owes)

| Pattern | Tab | Arrows | Enter / Space | Esc | Other |
|---|---|---|---|---|---|
| Button | in/out | — | activate | — | — |
| Link | in/out | — | Enter activates | — | — |
| Checkbox / Switch | in/out | — | Space toggles | — | — |
| Radio group | in/out (group = 1 stop) | move + select | — | — | — |
| Tabs | in/out (tablist = 1 stop) | switch tab | activate (manual mode) | — | Home/End first/last |
| Menu / menu button | open (Tab leaves) | move items | activate item | close + focus trigger | Home/End, type-ahead |
| Disclosure / Accordion | in/out | (optional move between headers) | toggle | — | — |
| Combobox | in/out | open list, move options | select option | close list / clear | type to filter |
| Dialog (modal) | **trapped inside** | (per inner widgets) | per inner control | close + return focus | — |
| Slider | in/out | inc/dec value | — | — | Home/End min/max, PageUp/Dn |
| Data grid | in/out (grid = 1 stop) | move cell | activate cell content | — | Home/End, Ctrl+Home |

Whatever the pointer can do, the keyboard must do too (2.1.1) — including a **single-pointer /
keyboard alternative to any drag** (2.5.7).

---

## 4. No keyboard trap (2.1.2)

- Focus must be able to **leave** every component using the keyboard alone.
- The **one allowed trap** is an intentional modal dialog — and it must be escapable with **Esc**
  and/or a visible Close control that returns focus to the trigger.
- Watch for accidental traps: custom widgets that swallow Tab, embedded editors/iframes,
  date pickers that never release focus.

---

## 5. Focus management on dynamic UI

- **Open overlay (dialog/popover/drawer):** move focus into it (first field, or the container
  with `tabindex="-1"`), trap it, mark the rest `inert`. **Close:** restore focus to the element
  that opened it. Never drop focus to `<body>` (sends screen-reader users to the top).
- **Route change (SPA):** move focus to the new view's `<h1>`/main region and announce the title.
- **Inserted content / async result:** announce via a polite live region; don't yank focus for
  non-critical updates.
- **Removed element that had focus:** move focus to a sensible sibling/parent before removing it.

---

## 6. Visible & unobscured focus (2.4.7; 2.4.11 new in 2.2)

- **Never `outline: none`** without an equally clear replacement. Prefer `:focus-visible` so the
  ring shows for keyboard but not mouse:
  ```css
  :focus-visible { outline: 2px solid; outline-offset: 2px; }
  /* indicator must reach ≥ 3:1 contrast vs adjacent colours */
  ```
- The indicator must be perceivable on **every** background it can land on (light and dark).
- **2.4.11 (new):** a focused element must not be **entirely** hidden by author content — most
  often a sticky header/footer. Fixes: `scroll-margin-top` / `scroll-padding-top` equal to the
  sticky bar height so focused items scroll clear; or shrink/hide the sticky chrome on focus.
- (AAA reach: **2.4.13 Focus Appearance** — minimum indicator area/contrast; **2.4.12** — *no
  part* obscured.)

---

## 7. Manual keyboard-audit checklist (run with the mouse unplugged)

For the screen under test, Tab from the top and confirm:

- [ ] **Reachable** — every interactive control receives focus (no mouse-only controls).
- [ ] **Visible** — focus indicator is always clearly visible (light + dark), ≥ 3:1.
- [ ] **Unobscured** — focused control never sits hidden under a sticky header/footer (2.4.11).
- [ ] **Logical order** — focus follows reading order; no surprising jumps; no positive tabindex.
- [ ] **One stop per widget** — menus/tabs/radio groups/grids are a single tab stop; arrows move inside.
- [ ] **Operable** — Enter/Space/Arrows/Home/End behave per the pattern map (§3).
- [ ] **No trap** — focus can always leave (2.1.2); only modals trap, and Esc/Close releases them.
- [ ] **Focus managed** — opening an overlay moves focus in; closing returns it to the trigger.
- [ ] **Esc works** — closes menus/dialogs/popovers and restores focus.
- [ ] **Drag has an alternative** — anything drag-driven is also doable by keyboard (2.5.7).
- [ ] **Skip link** — a "Skip to content" link is the first focusable element on long pages.

A Fail on any AA item here blocks ship. Record results on `examples/wcag-2.2-audit-sheet.md`.
