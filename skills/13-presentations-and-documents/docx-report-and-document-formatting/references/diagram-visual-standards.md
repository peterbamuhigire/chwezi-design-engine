# Reference: Diagram Visual Standards for Formal Documents

How architecture, sequence, state, data-flow and entity-relationship figures should look when they
are placed in an SRS, design document, statutory report or proposal delivered as DOCX or PDF. This
reference covers typography, colour, line weight, export and captions. Placement, captions and alt
text in Word follow `tables-and-figures.md`; this file does not repeat those rules, it applies them
to diagrams.

Scope boundary: layout teaching for relationship diagrams (layered before force-directed layouts,
caps on visible nodes) belongs to the data-visualisation references under
`skills/12-data-viz-and-dashboards/data-visualization/references/` (backlog item UA-13, M10-10).
Neither reference duplicates the other.

---

## 1. Typeface

This reference does not choose a new face. It applies the doctrine's existing mapping for formal
documents (`doctrine/references/font-groups-and-usage.md`, Quick chooser: "Business plan /
statutory report / SRS / legal proposal → Source Serif 4 → Public Sans").

| Text in the figure | Face | Basis |
|---|---|---|
| Node, edge and boundary labels; captions drawn inside the figure | **Public Sans** | Secondary (sans) layer of the formal-document pairing in `font-groups-and-usage.md`; role replacement "UI/body/data → Public Sans" in the 2026-09-29 house ruling recorded in `ai-slop-banned-fonts.md` §7 |
| Code identifiers inside a label (table, column, endpoint names) | **JetBrains Mono** | `monospaceApproved` in `ai-slop-banned-fonts.json`; monospace only for code and data, never for the label as a whole (`pairing-principles.md` rule 11, Bonneville 24) |
| Body text around the figure | Source Serif 4 (unchanged) | The document's text face; a sans label layer against a serif text layer follows the cross-category contrast rule (`pairing-principles.md` rules 1–3, Bonneville 1–3) |

Human authority. The pairing structure (serif text, sans labels, monospace only for code) traces
to Bonneville as recorded in `pairing-principles.md`. The choice of Public Sans *by name* for this
role rests on the house ruling of Peter Bamuhigire (29 September 2026); `font-groups-and-usage.md`
records no typographer, foundry or design-literature citation for that specific face. The
typographic-authority citation for Public Sans is therefore **NOT_ASSESSED** and is escalated to
Peter; it is not invented here.

Rules:

- Never leave a diagram on a system stack alone. A figure that names no face inherits the
  renderer's default, which is how banned defaults reach delivered documents.
- Load the face explicitly in the renderer (a local font file, for example through `@font-face`)
  and embed it in every SVG. Do not rely on the face being installed on the build machine;
  on the reference build host Public Sans is present only at
  `fonts/08-body-ui-workhorses/public-sans/`.
- Write the family unquoted in a Mermaid `%%{init}%%` directive (`Public Sans, sans-serif`):
  Mermaid drops a `fontFamily` value that contains quote characters and silently falls back to its
  default stack.
- One face for all labels in a figure; weight (Regular, Semibold) carries hierarchy, not a second
  family.

## 2. Font availability and substitution check

Every render must prove that the approved face was used.

1. Before rendering, probe the headless browser (`document.fonts.load` and `document.fonts.check`)
   and stop the build if the face does not resolve.
2. After rendering, read every `font-family` declaration in the SVG: the primary family must be the
   approved face or a generic; anything else fails the figure.
3. Record the result per figure (`PASS`, `FAIL` or `NOT_ASSESSED`) in the build's figure manifest,
   following the P18 `render-review-manifest.json` convention and its font-substitution precedent.

A silent fallback to Trebuchet MS, Verdana or Arial is a failure, not a warning. If the check cannot
run, record `NOT_ASSESSED` and do not claim conformance.

## 3. Colour and hierarchy

- Map node roles to design tokens, never to raw hex values in the diagram source. For Word output
  use the document tokens from `docx-style-system.md` and `tables-and-figures.md`:

  | Role | Fill | Stroke / text |
  |---|---|---|
  | Primary element (system, component, process, entity, state) | neutral light tint | `Ink` |
  | External actor or system | none (outline only) | `Ink` |
  | Store / datastore | neutral light tint | `Ink` |
  | Boundary / zone | very light tint | `Muted` label |
  | The one element the figure is about (optional) | `Accent` tint | `Ink` |

- At most **one** emphasis colour per figure. Meaning never depends on colour alone: shape and
  label carry the role as well (WCAG 2.2 SC 1.4.1).
- Line weight distinguishes primary flow (solid, heavier) from secondary or asynchronous flow
  (dashed or lighter); keep to two weights.
- Labels in sentence case ("Looks up reference data"), no terminal full stops, no all-caps except
  identifiers that are upper case by definition.
- No drop shadows, gradients, 3D effects or decorative icons. (Mermaid's neutral theme adds a
  drop-shadow filter to nodes; renderers must switch it off.)

### 3a. Gantt charts

Gantt bars use the same neutral tokens; Mermaid's red critical-path default is not used.

| Gantt role | Fill | Border / text |
|---|---|---|
| Task | `#F4F4F4` (neutral light tint) | `Muted` border, `Ink` text |
| Critical task or milestone (the emphasis) | `#D8D8D8` (darker tint), or the document's `Accent` tint where one is set | `Ink` border at the heavier weight, `Ink` text |
| Active task | `#F7F7F7` | `Ink` border |
| Done task | none (white) | `Muted` border |
| Grid rules | — | `#D8D8D8` |
| Alternate section band | `#F7F7F7` | — |

- Critical work is marked by the darker tint **and** the heavier border, and the plan text or a
  legend names the critical path; colour alone never carries it (WCAG 2.2 SC 1.4.1).
- Draw the chart at a fixed width sized for the placed measure (the `srs-skills` renderer uses
  720 px with 13 px labels, which prints the smallest label at about 8.1 pt at 6.25 in). A chart
  drawn at the renderer's window width prints its labels far below 8 pt.
- Leave out the "today" line in a printed plan: it ties the figure to the build date.
- Keep axis dates short (for example `%b %Y` or `%d %b`) so tick labels do not collide; a
  schedule that still cannot hold 8 pt labels is split by phase or moved to a landscape page, with
  the full schedule kept as a table.

## 4. Export

- Export a PNG at **≥ 300 ppi at the placed width** plus an SVG of the same figure; the SVG embeds
  the face.
- Place the figure at the body measure (about 6.25 in / 152 mm) or a clean half-measure; reduce the
  width only when a tall figure would exceed the page. A figure whose labels drop below about 8 pt
  at the placed size needs splitting or a landscape page, not a smaller scale.
- Caption below the figure, auto-numbered with the `Caption` style (`tables-and-figures.md`).
- Alt text comes from the figure's source (for example the IR `meta.alt_text` or a `%% alt:` line
  in a Mermaid block) and says what the figure shows, not "diagram".

## 5. Checklist (per figure)

- [ ] Labels render in Public Sans; code identifiers, if any, in JetBrains Mono.
- [ ] Font-substitution check recorded as `PASS` (or `NOT_ASSESSED` with the reason; never assumed).
- [ ] No banned or watchlist face appears as a primary family in the SVG.
- [ ] Roles mapped to tokens; at most one emphasis colour; meaning not carried by colour alone.
- [ ] Two line weights at most; no shadows, gradients or 3D effects.
- [ ] Sentence-case labels, legible at the placed size.
- [ ] PNG ≥ 300 ppi at the placed width, plus SVG with the embedded face.
- [ ] Numbered caption below; meaningful alt text in the Word image description.

## 6. Ban-side evidence (not approval)

Tool defaults are recorded only as evidence of what to avoid, per the asymmetry principle in
`doctrine/references/ai-slop-banned-fonts.md`: Mermaid's default theme stack
(`trebuchet ms, verdana, arial, sans-serif`) is what a figure falls back to when no face is set.
Adding Trebuchet MS or Verdana to the machine-readable ban list is a doctrine change awaiting
Peter's ratification; it is not made by this reference.
