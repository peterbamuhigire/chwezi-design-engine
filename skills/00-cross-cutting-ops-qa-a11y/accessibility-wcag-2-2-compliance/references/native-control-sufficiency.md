# Reference: Native-Control Sufficiency Checklist

The skill's build step says to prefer native elements. This reference turns that preference into
an evidence rule: for each common native control it records what the browser gives for free, where
the control falls short, and the evidence required before a custom component is approved in its
place.

Native-first is the default, **not a universal rule**. A native control is kept when it meets every
stated requirement; a custom or reused component is approved when a named requirement fails
natively and the evidence below is recorded. This matches the dev engine's solution-selection
ladder (`chwezi-dev-engine`, `benchmarks/solution-selection`, fixture F13: native date input
insufficient for a range with explained blackout dates).

> Checklist framing adapted from Ponytail (DietrichGebert/ponytail, MIT,
> https://github.com/DietrichGebert/ponytail, commit e3ba2aa). Control facts are from MDN Web Docs
> and the WHATWG HTML Standard; the memorable-date rule is from the GOV.UK Design System. Sources
> and access dates are listed at the end.

## The approval rule

A custom component replaces a native control only when all three are recorded:

1. **A user task that fails natively.** Name the task and the requirement the native control
   cannot meet (for example "choose a stay that must not include the closure week, and see why
   those dates are closed"). "It looks dated" or "the design uses a custom picker" is not a failed
   task.
2. **An assistive-technology test result** for the replacement: keyboard-only traversal plus at
   least one screen reader (NVDA, VoiceOver or TalkBack) on the target platforms, recorded as
   `MEASURED` per `doctrine/references/wcag-2.2-criteria.md`. Where no test has been run the status
   is `NOT_ASSESSED` and the replacement is not approved.
3. **A design-system reason**: the replacement is an existing, tested component of the project's
   design system (reuse), or a new component that is added to the system with its full state and
   accessibility contract. A one-off custom control for a single screen is not approved.

Prefer reusing a proven accessible component over building one. The replacement must still meet
the full WCAG 2.2 AA contract (name, role, value; keyboard; focus; target size; contrast).

## Control by control

### `input type="date"`
- **Native gives:** a date role and value exposed to assistive technology; keyboard entry; the
  platform's picker on mobile; `min`, `max` and `step` constraints; a value always submitted as
  `yyyy-mm-dd`.
- **Falls short:** the displayed format follows the browser's locale, not the page; the picker's
  appearance cannot be restyled in any meaningful way; no way to disable individual dates
  (blackout dates) or explain why a date is unavailable; no range selection across two dates as
  one control; picker behaviour and quality differ by browser.
- **Evidence before custom:** a failed task needing ranges, per-date availability or explanations
  (the F13 shape); an AT result for the replacement; the replacement is a system component.
- **Memorable dates:** for dates people already know or can look up without a calendar (date of
  birth, passport issue date), the GOV.UK Design System recommends separate day, month and year
  fields (its date input component) rather than a calendar control. A calendar control is suited
  to choosing a date in the near future or recent past, or when the day of the week matters, and
  must never be the only way to enter a date. Follow the same rule in Chwezi forms.

### `input type="color"`
- **Native gives:** a labelled control with keyboard focus, the operating system's colour dialog,
  and a value submitted as a lowercase hex string.
- **Falls short:** the dialog differs by platform and cannot be styled or constrained; no way to
  restrict choices to a brand palette or tokens; no contrast feedback.
- **Evidence before custom:** a failed task such as "choose only from the approved palette" or
  "see the contrast of the chosen colour against the surface"; often a set of radio buttons
  styled as swatches (native, labelled) meets this without a custom widget.

### `input type="file"`
- **Native gives:** a button role, keyboard activation, the platform file chooser (camera and
  gallery options on mobile), `accept` and `multiple` attributes.
- **Falls short:** limited styling of the button and file-name text; no built-in progress, preview
  or per-file error; drag and drop is not part of the control.
- **Evidence before custom:** a failed task (progress for large uploads, per-file validation
  messages, preview before submit). Keep the native input as the underlying control and enhance
  around it; a drag-and-drop area always needs a keyboard and single-pointer alternative
  (SC 2.5.7).

### `dialog`
- **Native gives:** with `showModal()`, the dialog renders in the top layer, the rest of the page
  becomes inert, Escape closes it, and focus moves into the dialog; the backdrop can be styled.
- **Falls short:** focus return to the invoking control and the initial-focus choice still need
  deliberate handling and testing; scroll locking and nested dialogs need care.
- **Evidence before custom:** rarely justified. A custom modal must reproduce inertness, focus
  containment, Escape and focus return, and be tested with a screen reader; record which of these
  the native element failed to give.

### `details` / `summary`
- **Native gives:** a disclosure widget with a button-like summary, keyboard toggling, an exposed
  expanded or collapsed state, and in-page search that can reveal collapsed content in browsers
  that support it.
- **Falls short:** limited control over the marker and open/close animation; heading semantics
  inside `summary` need care; exclusive accordions (`name` attribute) depend on browser support.
- **Evidence before custom:** a failed task (for example a tab interface, which is not a
  disclosure). Styling preferences alone do not justify replacement.

### `popover` attribute
- **Native gives:** non-modal content in the top layer, light dismiss (click outside or Escape),
  declarative wiring with `popovertarget`, no script required.
- **Falls short:** it is not a modal (use `dialog` for that); anchoring and positioning rely on
  newer CSS features with uneven support; accessible naming and the relationship to the trigger
  still need checking; support must be confirmed for the project's browser matrix.
- **Evidence before custom:** a failed task on a supported browser, or a browser-matrix gap
  recorded in `design-qa-and-pre-launch-review`; any replacement must keep dismissal by Escape and
  meet SC 1.4.13 (dismissible, hoverable, persistent).

## Counterexample: the F13 shape

A booking flow needs a date range, some dates are unavailable, and each unavailable date must say
why ("closed for maintenance"). Two native date fields cannot show availability, cannot explain it,
and cannot let a keyboard user explore the range before choosing. The native controls fail named
requirements, so a proven accessible range component is approved, subject to the three-part rule
above, and the server still validates the range. If the same flow only needed a single date of
birth, the native answer (day, month and year fields) wins and a picker would be the wrong choice.

## Sources (accessed 29 September 2026)

- GOV.UK Design System, *Date input* component —
  https://design-system.service.gov.uk/components/date-input/
- GOV.UK Design System, *Dates* pattern — https://design-system.service.gov.uk/patterns/dates/
- MDN Web Docs, `<input type="date">` —
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/date
- MDN Web Docs, *Popover API* — https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
- WHATWG, *HTML Living Standard* (the `dialog`, `details` and `popover` definitions) —
  https://html.spec.whatwg.org/
- W3C, *WCAG 2.2* via `doctrine/references/wcag-2.2-criteria.md` (SC 1.4.13, 2.5.7, 4.1.2).
