# Reference: Tables, Figures & Captions in DOCX

How to make tables and figures in a premium Word document read as designed *and* stay
accessible. Pairs with the style rows `Table Text`, `Table Header`, and `Caption` in
`docx-style-system.md`.

---

## Table style system

Build one named **table style** ("Chwezi Report Table") and apply it everywhere — never
hand-format individual tables.

| Property | Value | Why |
|---|---|---|
| Border model | **Hairline horizontal rules only** (no verticals) | Verticals box-in and read as a spreadsheet; horizontal rules guide the eye across rows |
| Header row rule | 1 pt solid `Ink` above and below header | Anchors the header band |
| Body row rules | 0.5 pt `#D8D8D8` between rows (or none + zebra) | Quiet separation |
| Zebra fill (optional) | even rows `#F7F7F7` | Aids row tracking in wide tables; never rely on it alone for meaning |
| Header fill | `Accent`-tint (~12% accent) | Distinguishes header without shouting |
| Cell padding | 0.06 in top/bottom, 0.10 in L/R | Air; prevents text touching rules |
| Header text | `Table Header` style — 10 pt, 600 | Real header styling |
| Body text | `Table Text` style — 10 pt, 400, single line | Tighter than body copy |
| Numeric columns | **right-aligned**, tabular figures, consistent decimals | Numbers compare by place value |
| Text columns | left-aligned | Ragged right is fine; never justify table cells |
| Header row repeat | **ON** ("Repeat as header row at top of each page") | Header reappears on every page — also required for accessibility |

### Hard rules
- **One real header row**, marked as a header row (Table Properties → Row → "Repeat as header
  row"). This is both design and the accessibility header tag.
- **No merged or nested cells** for layout. Merged cells destroy the reading order for screen
  readers and break the tag tree. If data truly spans, keep merges to a single, simple span and
  state the relationship in the caption.
- **No blank rows/columns** for spacing — use the `Table Text` space-before/after instead.
- **Don't let a table break awkwardly:** allow header repeat, but set "Keep with next" on the
  caption so it never strands from its table.

---

## Figures (images, charts, diagrams)

- Place each figure **inline** (In Line with Text), not floating — floating anchors reorder
  unpredictably and confuse the reading/tag order.
- Size to the body measure (~6.25 in / 152 mm) or a clean half-measure; never bleed past margins.
- Export charts/diagrams at **≥ 300 ppi** (or as vector/SVG→EMF) so they stay crisp in print and
  when the PDF is generated.
- Every meaningful figure gets **alt text** (see `accessible-docx-tags.md`). Decorative rules and
  spacers are marked **decorative** so screen readers skip them.
- Diagrams (architecture, sequence, state, data flow, ER) follow `diagram-visual-standards.md`
  for label typeface, colour tokens, line weight, the font-substitution check and export.

---

## Caption system

Use the **Caption** named style (9 pt, 500, Muted) with an auto-numbered field, *not* a typed
bold line — so numbers renumber automatically and cross-references resolve.

| Element | Placement | Format | Example |
|---|---|---|---|
| Table caption | **Above** the table | `Table {N}. {Title}` — number bold/600, title 400 | **Table 3.** Cost build-up by quarter |
| Figure caption | **Below** the figure | `Figure {N}. {Title}` | **Figure 2.** Revenue ramp, FY1–FY3 |
| Source/note line | Under the caption | 8 pt italic Muted | *Source: management accounts, 2026.* |

- Insert via References → Insert Caption (Word) so it uses the `SEQ` field — numbers stay correct
  when content is reordered.
- Cross-reference with References → Cross-reference ("see Table 3"), never a typed "Table 3" —
  typed references rot when numbering shifts.
- Number **sequentially per type** (Tables 1..n, Figures 1..n) document-wide, or per chapter
  (`{chapter}.{n}`) in long reports — pick one and be consistent.

---

## Accessibility tie-in

Repeating header row + simple (un-merged) structure + alt text + a caption that names what the
table/figure shows are exactly the four things `accessible-docx-tags.md` and
`doctrine/references/wcag-2.2-criteria.md` require. Designed and accessible are the same checklist
here — do them together, not as a later pass.
