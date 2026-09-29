# Reference: Refinement Verbs (bounded critique vocabulary)

Ten verbs that turn a critique note into a bounded edit. A reviewer writes the verb, the target
and, where needed, one sentence of intent: `quieter: the filter bar`, `typeset: the pricing table`.
The person making the edit knows what may change and what must not.

These verbs are feedback tokens for reviews and critique sessions. They are not skills, they do not
appear in any skill description, and they do not replace the critique protocol
(`critique-protocol.md`): they are the vocabulary used to record the actions a crit agrees.

> Verb framing adapted from Impeccable (pbakaus/impeccable, Apache-2.0,
> https://github.com/pbakaus/impeccable, commit 114ea1d). Definitions, scope rules, mode readings,
> done-checks and the DOCX/PPTX section are Chwezi-original. Impeccable is not an authority for
> any design choice made under these verbs; faces, colours and rules still trace to the Chwezi
> doctrine and its human authorities.

## Rules shared by every verb

1. **The scope is the named target.** Everything outside the named target stays unchanged. If the
   edit cannot be made without touching something else, stop and raise it as a new note.
2. **Use only what the system already owns.** No new colours, typefaces, radii, shadows, spacing
   values or component primitives. If the system lacks what the edit needs, that is a design-system
   change and goes through `design-tokens-and-naming`, not through a verb.
3. **Read the verb through the surface's visitor mode** (`doctrine/references/visitor-modes.md`).
   The same verb means different things on a Persuade page and an Operate screen.
4. **Every verb has a done-check.** An edit is not finished because it looks different; it is
   finished when its done-check passes.
5. **Every verb except `polish` hands off to `polish`.** Several bounded edits can leave seams;
   `polish` closes them.

## The ten verbs

### bolder
- **Scope rule:** raise the emphasis of the named element only; neighbours do not shrink to make
  room unless the note says so.
- **By mode:** Persuade: a stronger headline weight or scale step and a clearer call to action.
  Operate: make the primary action or the critical figure unmistakable, never more decoration.
  Read: stronger section headings, not larger body text. Experience: a larger scene gesture within
  the existing palette and faces.
- **Done-check:** in a squint or grayscale test the named element is the first thing seen, and
  the type-scale steps used exist in the project scale.
- **Hand-off:** `polish`.

### quieter
- **Scope rule:** lower the visual volume of the named element or region; its content and
  function stay the same.
- **By mode:** Operate: fewer accents, flatter cards, less motion, status colour only where
  status exists. Persuade: remove competing accents so one action leads. Read: calm running heads,
  rules and marginal devices. Experience: slow or reduce motion without removing the idea.
- **Done-check:** the element no longer competes with the primary action or content, and every
  contrast pair still meets the WCAG 2.2 floor.
- **Hand-off:** `polish`.

### distill
- **Scope rule:** remove or merge parts of the named element until each remaining part earns its
  place; no new content is added.
- **By mode:** Persuade: fewer sections, one offer, one proof per claim. Operate: fewer columns,
  controls and steps in the named flow. Read: shorter paragraphs and fewer nested levels, with the
  meaning kept. Experience: fewer effects, each one deliberate.
- **Done-check:** every removed item is listed in the change note with the reason, and the task
  or message still completes without it.
- **Hand-off:** `polish`.

### polish
- **Scope rule:** close the seams left by earlier edits on the named target: alignment, spacing
  rhythm, state coverage, copy consistency. No new ideas.
- **By mode:** the same in every mode; the mode only sets which seams matter most (states and
  focus in Operate, rhythm and measure in Read, first viewport in Persuade, motion timing in
  Experience).
- **Done-check:** the target passes the relevant slop-detector rules (`tools/slop-detector`,
  `chwezi-slop`) and a human review. Treat a detector result as evidence of defects where it
  flags something; a clean run does not prove quality, so the human review is still required.
- **Hand-off:** none; `polish` is the last verb in a chain.

### harden
- **Scope rule:** make the named element survive real conditions: long and short content,
  empty, loading, error, offline, slow network, zoom, keyboard and screen reader. Visual style is
  unchanged.
- **By mode:** Operate: every state in the state matrix, preserved input on error, recoverable
  destructive actions. Persuade: the page still works without its hero image, script or web font.
  Read: long headings, tables and figures reflow at 320 CSS px. Experience: a static,
  reduced-motion path with the same content.
- **Done-check:** the state matrix is complete and each state has been rendered at least once;
  the WCAG 2.2 AA items in `wcag-2.2-criteria.md` that apply to the element are recorded as
  `MEASURED` or `NOT_ASSESSED`, never assumed.
- **Hand-off:** `polish`.

### clarify
- **Scope rule:** change words, labels, order or grouping inside the named element so that its
  meaning is understood on first reading; visual styling is unchanged.
- **By mode:** Operate: verb-and-noun buttons, specific error messages, units on every figure.
  Persuade: a plain statement of who it is for and what happens next. Read: signposting headings
  and a summary before detail. Experience: one line that says what the piece is.
- **Done-check:** a person new to the surface can say what the element does and what to do next;
  record who checked.
- **Hand-off:** `polish`.

### typeset
- **Scope rule:** adjust type on the named target only: scale step, weight, leading, measure,
  tracking, figure style, hyphenation. Faces stay the ones the project already uses.
- **By mode:** Read: measure about 45–75 characters, body leading that holds rhythm, real
  headings. Operate: tabular figures in tables, compact but legible sizes, no all-caps body.
  Persuade: a display step with clear contrast against body. Experience: expressive display
  settings, with body text still set for reading.
- **Done-check:** every value used exists in the project type scale
  (`doctrine/references/type-scale-and-spacing.md`), and no banned face appears
  (`ai-slop-banned-fonts.md`).
- **Hand-off:** `polish`.

### layout
- **Scope rule:** change position, grouping, alignment and spacing inside the named region;
  components and their styling are unchanged.
- **By mode:** Operate: scan order follows the task; related controls grouped; primary action in
  a consistent place. Persuade: one reading path to the call to action. Read: a single column with
  clear hierarchy and figures near their references. Experience: composition may break the grid
  on purpose, with a clear reading order kept for assistive technology.
- **Done-check:** the region works at 320 CSS px and at desktop width with no horizontal scroll,
  and the DOM or reading order matches the visual order.
- **Hand-off:** `polish`.

### colourise
Command token `colorize` is accepted as an alias.
- **Scope rule:** apply or re-point colour roles on the named target using existing tokens only;
  no new hues or hex values.
- **By mode:** Operate: colour for status, focus and destructive actions, never as the only
  signal. Persuade: the brand accent concentrated on the action. Read: restrained link and
  navigation colour. Experience: a freer use of the existing palette.
- **Done-check:** every text pair meets 4.5:1 (3:1 for large text) and every control boundary
  and focus ring meets 3:1, computed and recorded; meaning never depends on colour alone.
- **Hand-off:** `polish`.

### animate
- **Scope rule:** add, change or remove motion on the named element only, using the project's
  existing duration and easing tokens.
- **By mode:** Operate: feedback and state transitions only, short durations. Persuade: at most a
  purposeful entrance; nothing that delays the offer. Read: no motion beside running text.
  Experience: motion may carry content, with pause or stop controls.
- **Done-check:** `prefers-reduced-motion` gives a static or shortened path; nothing flashes more
  than three times per second; moving content longer than five seconds can be paused.
- **Hand-off:** `polish`.

## Applying the verbs to DOCX and PPTX review comments

The same verbs work as review comments in Word and PowerPoint deliverables (proposals, SRS
documents, business plans, reports, decks). The rules above still apply: the comment names a
target, and the editor uses only the document's existing styles, theme colours and fonts.

| Comment | Target in the file | What the editor changes | What stays fixed |
|---|---|---|---|
| `typeset: Table 4` | one table | table style settings: header weight, figure alignment (decimal or right), tabular figures, cell padding | the document's theme fonts and the table's content |
| `quieter: slide 7 background` | one slide's background and decoration | remove or mute decorative shapes, use the master's plain layout | the slide's content and the master itself |
| `distill: section 3.2` | one section | merge or cut paragraphs; move detail to an annex | headings above and below; numbering scheme |
| `clarify: Figure 2 caption` | one caption | caption wording, units, source line | the figure itself |
| `layout: slides 4–6` | a run of slides | placeholder use, alignment to the layout grid, reading order in the selection pane | the slide master and theme |
| `bolder: executive summary heading` | one heading | apply the next heading style up, or the document's emphasis style | body text size |
| `colourise: RAG status column` | one column | apply existing theme colours for status, with a text label in every cell | theme palette |
| `harden: numbered requirements` | the requirement list | restart and numbering rules, cross-reference fields, keep-with-next for headings | wording of requirements |
| `animate: slide 9 build` | one slide | remove or simplify builds; one build per idea | other slides' transitions |
| `polish: whole document` | the file | style consistency pass: direct formatting replaced by styles, orphaned headings, caption numbering, table of contents refresh | content |

Rules for document reviews:

- Direct formatting is a defect. A verb edit is done through the document's styles or the deck's
  master, never by hand-formatting one paragraph or one text box.
- A comment that needs a new style, font or theme colour is not a verb edit: raise it against the
  template, using `13-presentations-and-documents` skills.
- The editor replies to each comment with the done-check result before resolving it.

## Related

- `critique-protocol.md` — the session structure in which verbs are agreed.
- `doctrine/references/visitor-modes.md` — the mode vocabulary each verb reads through.
- `tools/slop-detector/README.md` — the deterministic detector used in the `polish` done-check.
