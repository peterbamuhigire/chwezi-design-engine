# Reference: Editorial & Long-Form Layout Patterns

The operational catalog for the `editorial-and-long-form-layout` skill — the measure, the reading
rhythm, and the long-form furniture (drop caps, pull-quotes, notes, figures, multi-column), each
with copy-ready CSS. All numbers tie back to `doctrine/references/type-scale-and-spacing.md`; the
reading-craft authority is Bringhurst, Lupton, Tschichold, Tufte, and Butterick (human design
literature, never AI-vendor picks — `doctrine/design-doctrine.md` §2).

Worked CSS uses custom properties on the reading column so it composes with the page grid from
`layout-grid-and-spacing`. Faces shown are the **02 Editorial / Literary** baseline pairing
(Andada Pro headings → Newsreader/Source Serif 4 body) from
`doctrine/references/font-groups-and-usage.md` — never a banned default.

---

## 1. The measure (line length) — the first decision

| Metric | Value | Why |
|---|---|---|
| Target | **~66ch** | Bringhurst's "ideal"; comfortable single-glance line return |
| Floor | **45ch** | Below this the eye returns too often; reading stutters |
| Ceiling | **75ch** | Above this the eye loses the next line's start |
| Screen sweet spot | **60–68ch** | Screens read a touch wider than print at generous leading |

Set the measure on the **reading column**, in `ch` or `rem` — never on the viewport.

```css
.prose {
  --measure: 66ch;          /* target line length */
  max-width: var(--measure); /* or ~38rem as a rem fallback */
  margin-inline: auto;
  padding-inline: 1.25rem;   /* gutter so text never touches the screen edge */
}
```

Tables, figures, code, and pull-quotes may break **out** of the measure (see §6, §5). Running prose
never exceeds it. A `100ch`+ body is the single most common long-form failure.

---

## 2. Reading rhythm (body size, leading, paragraph separation)

Built on `doctrine/references/type-scale-and-spacing.md`:

| Token | Value | Source rule |
|---|---|---|
| Body size | **18–20px** long-form (16px floor) | larger than dense UI; editorial comfort |
| Body line-height | **1.5–1.6** | the reference's ≥1.6-for-small-text band |
| Heading line-height | **1.3 → 1.1** as size grows past 32px | "big type needs tighter leading" |
| Heading scale ratio | **≥1.25**, real jumps | the type-scale ratio rule |
| Body colour | **near-black** (e.g. `#1a1a1a`), not `#000` | the reference's text-colour rule |

**Paragraph separation — pick ONE, never both, never neither:**

```css
/* Web convention: spaced blocks (most articles) */
.prose p { margin-block: 0 0.85em; }      /* ~0.85em space after; no indent */

/* Book convention: first-line indent (long literary pieces) */
.prose.indented p { margin-block: 0; text-indent: 1.5em; }
.prose.indented p:first-of-type,
.prose.indented h2 + p { text-indent: 0; }  /* no indent after a heading */
```

Shipping *both* indent and a blank line — or neither — is a typeset-vs-assembled tell.

---

## 3. Baseline rhythm

Establish one vertical unit (derive it from the body line-height, or use an 8pt grid per
`layout-grid-and-spacing` `references/spacing-rhythm.md`) and make every vertical gap a multiple.

```css
.prose {
  --rhythm: 1.6rem;          /* one baseline unit ≈ body line-height */
}
.prose h2 { margin-block: calc(var(--rhythm) * 2) var(--rhythm); } /* more above than below */
.prose h3 { margin-block: calc(var(--rhythm) * 1.5) calc(var(--rhythm) * 0.5); }
.prose figure,
.prose blockquote { margin-block: calc(var(--rhythm) * 1.5); }
```

Headings belong to the section they open: **more space above than below** is what makes structure
legible at a skim.

---

## 4. Scannability layer (lead, subheads, TOC)

Long-form is read scan-then-read. Provide landmarks:

- **Lead / standfirst** — the opening summary paragraph, set larger and/or in a distinct weight.
  ```css
  .prose > .lead { font-size: 1.25em; line-height: 1.45; font-weight: 380; color: #333; }
  ```
- **Subheads** — real `<h2>`/`<h3>` in the heading scale, one every ~300–500 words. Write them so
  reading only the subheads gives the article's outline.
- **TOC** (long reports, 2000+ words) — jump links from the heading IDs; sticky rail on wide
  screens, collapsible block on narrow.
  ```css
  @media (min-width: 64rem) {
    .toc { position: sticky; top: 2rem; }   /* rail beside the measure */
  }
  ```

---

## 5. Drop caps (and the small-cap open)

A drop cap marks the **start of the read** — once, at the opening (or section openings in very long
pieces), never sprinkled. 2–4 lines deep, optically **hung** to the margin.

```css
.prose > p:first-of-type::first-letter {
  initial-letter: 3;                 /* 3 lines deep where supported */
  -webkit-initial-letter: 3;
  font-family: "Andada Pro", Georgia, serif;
  font-weight: 600;
  margin-inline-end: 0.5rem;
  margin-inline-start: -0.06em;      /* OPTICAL HANG: pull left to the text margin */
}
/* Float fallback for engines without initial-letter */
@supports not (initial-letter: 3) {
  .prose > p:first-of-type::first-letter {
    float: left; font-size: 3.4em; line-height: 0.78; padding-inline-end: 0.5rem;
  }
}
```

Classic editorial open: pair the cap with **small-caps on the first few words**.

```css
.prose > p:first-of-type { /* mark the run in markup, or: */ }
.prose .opening-words { font-variant-caps: small-caps; letter-spacing: 0.02em; }
```

A glyph set mathematically flush looks indented — overshoot left (the optical-alignment rule from
`layout-grid-and-spacing`). Skipping the cap is also valid — but state the choice.

---

## 6. Pull-quotes (amplify, never duplicate)

A pull-quote lifts a **striking** line to create a rest and a re-entry point. It must not be the
first appearance of that text near it. Larger, contrasting face/weight, **broken out** of the
measure, asymmetric space. At most one per ~400–600 words.

```css
.pullquote {
  /* break OUT of the measure into a wider band */
  width: min(90vw, 52rem);
  margin-inline: calc(50% - 50vw);  /* simple breakout; or use a grid full-bleed track */
  max-width: none;
  font-family: "Andada Pro", Georgia, serif;
  font-size: clamp(1.6rem, 1rem + 2vw, 2.4rem);
  line-height: 1.2;
  font-weight: 450;
  text-wrap: balance;
  padding-block: var(--rhythm);
  border-inline-start: 3px solid currentColor;  /* one quiet rule, not a box */
  padding-inline-start: 1rem;
}
```

A "pull-quote" repeating the adjacent sentence is visual noise — remove it.

**Breakout figure track (cleaner than the margin hack)** — give the prose a grid with named tracks:

```css
.prose {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [breakout-start] minmax(0, 4rem)
    [measure-start] min(66ch, 100%) [measure-end]
    minmax(0, 4rem) [breakout-end]
    minmax(1rem, 1fr) [full-end];
}
.prose > * { grid-column: measure; }       /* prose stays in the measure */
.prose > .breakout { grid-column: breakout; }
.prose > .full-bleed { grid-column: full; }
```

---

## 7. Footnotes vs. sidenotes (decision + CSS)

| Choose… | When | Behaviour |
|---|---|---|
| **Footnotes** | dense citation; any width; robustness first | numbered, collected at article end, two-way anchor links |
| **Sidenotes** | a few rich asides; wide editorial page | set in the outer margin beside the reference… |
| — narrow fallback | viewport below the measure + margin | …**collapse to inline/expandable footnotes** — never overlap the column |

Every note is a real two-way link, keyboard-focusable.

```css
/* Sidenote in the breakout/outer track on wide screens */
.sidenote { grid-column: breakout-end / full-end; font-size: 0.85em; color: #444;
            line-height: 1.4; margin-block: 0; }
@media (max-width: 60rem) {
  .sidenote { grid-column: measure; /* fold inline */ display: none; }
  .sidenote-toggle { display: inline; }  /* superscript marker reveals it / links to footnote */
}
/* Footnote back-link */
.footnotes li:target { background: #fff8e1; }  /* highlight the jumped-to note */
```

```html
<p>…the measure matters<sup><a id="ref-1" href="#fn-1">1</a></sup>.</p>
<aside class="sidenote">A 66ch line is Bringhurst's target.</aside>
...
<li id="fn-1">A 66ch line is Bringhurst's target. <a href="#ref-1">↩</a></li>
```

---

## 8. Figures & captions (block + numbered caption)

A figure = media **+** numbered caption, never a bare floating image. Vary the **width band** so the
page has rhythm.

| Band | Use |
|---|---|
| **Inset** (`grid-column: measure`) | small diagrams, portraits, inline charts |
| **Breakout** (`grid-column: breakout`) | wide charts, comparison images |
| **Full-bleed** (`grid-column: full`) | hero/section-opening photography |

```css
.prose figure { margin-block: calc(var(--rhythm) * 1.5); }
.prose figure img,
.prose figure table { width: 100%; height: auto; }
.prose figcaption {
  font-size: 0.85em;
  line-height: 1.4;
  color: #555;                       /* quieter than body, still AA */
  margin-block-start: 0.5rem;
  text-wrap: pretty;
}
.prose figcaption .label { font-weight: 600; }  /* "Figure 1." */
@media print { .prose figure { break-inside: avoid; } }  /* never orphan the caption */
```

Caption complements alt text, it does not replace it. Keep figure + caption together across breaks.

---

## 9. Multi-column — only where it earns its place

Single, well-measured column is the default for continuous reading. True multi-column on the web
forces up-and-down scroll reading and is usually wrong for one article. Reserve it for **parallel,
short-segment** content (glossary, reference card, link index, the footnote block) where each item
is shorter than the viewport.

```css
.reference-grid {            /* a glossary or link index — NOT article body */
  columns: 18rem;            /* column-WIDTH → intrinsic, reflows by available space */
  column-gap: 2.5rem;
}
.reference-grid > * { break-inside: avoid; }  /* keep each item whole */
```

State why multi-column helps *this* content before using it. Never `columns` on running prose.

---

## 10. Responsive & print transitions

- Measure in `ch`/`rem` survives most widths; below it, side padding keeps a gutter (text never
  touches the edge).
- Sidenotes → footnotes (§7); breakout/full figures → full width; TOC sticky-rail → collapsible
  top block.
- Fluid type via `clamp()` and container queries: the **depth** lives in the sibling
  `responsive-and-adaptive-layout` — name the transitions here, defer the machinery there.
- **Print stylesheet:** restore footnotes inline, expand link URLs (`a::after{content:" ("attr(href)")"}`),
  re-tighten leading for paper, `break-inside: avoid` on figures and pull-quotes.

---

## 11. Accessibility & performance floor

- Contrast: body and caption ≥ **4.5:1**, large headings ≥ **3:1** — `doctrine/references/wcag-2.2-criteria.md`.
- Reading order: notes and sidenotes follow their reference in the DOM; note links are
  keyboard-focusable with visible focus.
- `text-wrap: pretty` on body, `balance` on headings/pull-quotes to kill orphans/rivers.
- Webfont + image weight within `doctrine/references/web-performance-budgets-2026.md`; subset
  editorial faces, lazy-load below-fold figures, set explicit `width`/`height` to avoid layout
  shift.
