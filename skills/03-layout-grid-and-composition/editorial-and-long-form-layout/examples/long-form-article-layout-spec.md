# Worked Example: Long-Form Web Feature — Reading Layout Spec

**Artifact:** a ~2,400-word web feature article, *"The Quiet Return of the Reading Page,"* for a
design studio's journal. Desktop-first, must also read on tablet and phone; a print stylesheet is
wanted. This is the workflow in `SKILL.md` turned into a shippable spec — read alongside
`references/editorial-layout-patterns.md`.

---

## 0. Stated decisions (declared BEFORE any markup — charter §2)

| Decision | Choice | Reason |
|---|---|---|
| Type pairing | **Andada Pro** (headings, drop cap, pull-quotes) → **Newsreader** (body) | 02 Editorial / Literary baseline; Andada Pro's calligraphic, semi-slab serif (Huerta Tipográfica) carries the editorial voice, Newsreader is a screen-tuned reading serif. Both OFL — embed-safe. Not a banned default. |
| Measure | **66ch** target (`max-width: 66ch`) | Bringhurst's ideal; comfortable single-glance return |
| Body | **19px / line-height 1.6**, near-black `#1a1a1a` | type-scale reference: ≥1.6 leading for body; never `#000` |
| Heading scale | 1.25 ratio off 19px → 24 · 30 · 38 · 47px | real ≥1.25 jumps |
| Baseline unit | **`--rhythm: 1.6rem`** (= body line); all gaps are multiples | typeset rhythm, not arbitrary gaps |
| Paragraph separation | **spaced blocks** (no indent) | web convention; one method only |
| Drop cap | **one**, 3 lines, optically hung, + small-caps opening words | marks the start of the read once |
| Pull-quotes | **two**, Andada Pro, broken out to the breakout track | amplify striking lines; ~1 per 1,200 words |
| Notes | **sidenotes** on wide screens, **footnote fallback** below 60rem | a few rich asides on a wide page; robust on mobile |
| Figures | three bands: 1 full-bleed hero, 1 breakout chart, 2 inset diagrams | varied rhythm, not a column of identical insets |
| Columns | **single measured column** for body | continuous reading; multi-column reserved for the end glossary |

**Focal point** (from the sibling `layout-grid-and-spacing`): the full-bleed hero + the headline
set in 47px Andada Pro, pinned to the top of the measure with air to its right on wide screens.

---

## 1. The reading column (CSS)

```css
.prose {
  --measure: 66ch;
  --rhythm: 1.6rem;
  font-family: "Newsreader", Georgia, serif;
  font-size: 19px;
  line-height: 1.6;
  color: #1a1a1a;
  text-wrap: pretty;

  /* grid with full / breakout / measure tracks (see patterns ref §6) */
  display: grid;
  grid-template-columns:
    [full-start] minmax(1.25rem, 1fr)
    [breakout-start] minmax(0, 4rem)
    [measure-start] min(var(--measure), 100%) [measure-end]
    minmax(0, 4rem) [breakout-end]
    minmax(1.25rem, 1fr) [full-end];
}
.prose > *          { grid-column: measure; }
.prose > .breakout  { grid-column: breakout; }
.prose > .full-bleed{ grid-column: full; }

.prose p { margin-block: 0 0.85em; }            /* spaced blocks, no indent */

.prose h2 {
  font-family: "Andada Pro", Georgia, serif;
  font-size: 30px; line-height: 1.2; font-weight: 600;
  margin-block: calc(var(--rhythm) * 2) var(--rhythm);   /* more above than below */
}
.prose h3 {
  font-family: "Andada Pro", Georgia, serif;
  font-size: 24px; line-height: 1.25; font-weight: 560;
  margin-block: calc(var(--rhythm) * 1.5) calc(var(--rhythm) * 0.5);
}
.prose .lead {
  font-size: 1.25em; line-height: 1.45; font-weight: 380; color: #333;
  margin-block-end: calc(var(--rhythm) * 1.5);
}
```

## 2. The headline + drop cap

```html
<h1 class="headline">The Quiet Return of the Reading Page</h1>
<p class="lead">For a decade the web optimised every page for scanning. The long read never
left — it just needed its measure back.</p>

<p class="opening"><span class="opening-words">For years,</span> the article was treated as a feed
item: something to be skimmed at full viewport width, three columns deep, and forgotten…</p>
```

```css
.headline {
  font-family: "Andada Pro", Georgia, serif;
  font-size: 47px; line-height: 1.1; font-weight: 650; letter-spacing: -0.01em;
  text-wrap: balance; margin-block-end: var(--rhythm);
}
.prose > .opening::first-letter {
  initial-letter: 3; -webkit-initial-letter: 3;
  font-family: "Andada Pro", Georgia, serif; font-weight: 600;
  margin-inline-end: 0.5rem; margin-inline-start: -0.06em;   /* optical hang */
}
@supports not (initial-letter: 3) {
  .prose > .opening::first-letter { float: left; font-size: 3.4em; line-height: 0.78; padding-inline-end: 0.5rem; }
}
.opening-words { font-variant-caps: small-caps; letter-spacing: 0.02em; }
```

## 3. A pull-quote (broken out)

```html
<blockquote class="pullquote breakout">A line that runs 110 characters wide isn't a paragraph —
it's a place to lose your eye.</blockquote>
```

```css
.pullquote {
  font-family: "Andada Pro", Georgia, serif;
  font-size: clamp(1.6rem, 1rem + 2vw, 2.4rem); line-height: 1.2; font-weight: 450;
  text-wrap: balance;
  padding-block: var(--rhythm); padding-inline-start: 1rem;
  border-inline-start: 3px solid currentColor;   /* one quiet rule, not a box */
}
```

Neither pull-quote repeats its neighbouring sentence — each lifts a line from elsewhere in its
section as a re-entry point.

## 4. A sidenote with footnote fallback

```html
<p>The 45–75 character range is older than the web<sup><a id="ref-1" href="#fn-1">1</a></sup>.</p>
<aside class="sidenote">Bringhurst gives 66 characters as the ideal for a single-column page.</aside>
```

```css
.sidenote { grid-column: breakout-end / full-end; font-size: 0.85em; color: #444; line-height: 1.4; }
@media (max-width: 60rem) {
  .sidenote { display: none; }                 /* fold to the footnote below */
}
.footnotes { grid-column: measure; font-size: 0.85em; color: #444; }
.footnotes li:target { background: #fff8e1; }
```

## 5. A figure (breakout chart)

```html
<figure class="breakout">
  <img src="line-length-vs-comprehension.svg"
       alt="Reading comprehension peaks between 50 and 70 characters per line, then declines.">
  <figcaption><span class="label">Figure 2.</span> Comprehension by line length; the plateau is the
  45–75ch band.</figcaption>
</figure>
```

```css
.prose figure { margin-block: calc(var(--rhythm) * 1.5); }
.prose figure img { width: 100%; height: auto; }
.prose figcaption { font-size: 0.85em; line-height: 1.4; color: #555; margin-block-start: 0.5rem; text-wrap: pretty; }
.prose figcaption .label { font-weight: 600; }
@media print { .prose figure { break-inside: avoid; } }
```

## 6. The end glossary (the one justified multi-column)

```html
<dl class="reference-grid"> … short term/definition pairs … </dl>
```

```css
.reference-grid { grid-column: measure; columns: 18rem; column-gap: 2.5rem; }
.reference-grid > * { break-inside: avoid; }
```

Multi-column is used **only** here, because each glossary entry is short and parallel — never on the
article body.

## 7. Responsive & print transitions

- **≥ 64rem:** sidenotes in the outer track; TOC sticky rail; hero full-bleed.
- **60–64rem:** sidenotes fold to footnotes; breakout figures stay breakout.
- **< 48rem:** measure becomes 100% minus the 1.25rem gutter; breakout/full figures go full width;
  TOC becomes a collapsible top block. (Fluid `clamp()` type + container-query depth deferred to
  `responsive-and-adaptive-layout`.)
- **Print:** footnotes inline; `a::after { content: " (" attr(href) ")"; }`; leading tightened to
  1.4; `break-inside: avoid` on figures and pull-quotes.

---

## 8. Checklist run (from SKILL.md)

1. Measure 66ch on the column in `ch` — never viewport-wide. **Pass.**
2. Body 19px / 1.6; paragraphs spaced, not indented (one method). **Pass.**
3. Baseline rhythm on `--rhythm`; headings more space above than below. **Pass.**
4. Lead + subheads + (for this length, optional) TOC; subheads read as an outline. **Pass.**
5. One drop cap, 3 lines, optically hung, + small-caps open. **Pass.**
6. Two pull-quotes amplify (don't duplicate), broken out, asymmetric space. **Pass.**
7. Notes two-way linked; sidenotes fall back to footnotes < 60rem. **Pass.**
8. Figures = block + numbered caption; bands varied (full/breakout/inset×2); captions kept with
   figures. **Pass.**
9. Multi-column only on the parallel short-segment glossary, with a stated reason. **Pass.**
10. Body/caption contrast ≥ 4.5:1 (`#1a1a1a`/`#555` on white); webfonts subset within the
    performance budget. **Pass.**

Result: a page that holds its measure, scans cleanly, and reads as typeset rather than assembled —
consistent with `doctrine/design-doctrine.md` §0.
