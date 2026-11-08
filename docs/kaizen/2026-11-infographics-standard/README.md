# Kaizen record: Chwezi Infographics Design and Production Quality Standard (8 November 2026)

**Owner instructions (8 November 2026).** Adopt the full Infographics Design and Production Quality
Standard as the final child standard, so that the Chwezi Product Excellence Standard has four child
standards; build it into the writing, dev, development and design engines, each working on its own,
and apply the best formulas, algorithms and mathematics where they give the engines an edge.

## Source

"Chwezi Full Infographics Design and Production Quality Standard", Version 1.0, 8 November 2026
(owner Design Governance / Product Engineering): 32 chapters and annexes A-O, about 22,000 words. Read
in three waves: structure; full text; comparison with the engines. Each chapter repeats one
implementation template and one worked scenario; once the repetition is removed, the unique content
is about 2,400 words of chapter rules, 74 annex controls, 8 worked cases, an 8-item Kaizen backlog,
the scoring model and the release declaration. All of it is kept.

## Decisions

| # | Decision | Reason |
|---|---|---|
| K1 | Repeated template text kept once (production brief procedure, evidence fields, default scenario) | It is identical in every chapter and annex |
| K2 | Typeface list superseded: Inter, Arial and IBM Plex are banned in the engines and Source Sans 3 is paired body only, so defaults are Public Sans, Source Serif 4, Atkinson Hyperlegible and Noto, with Georgia and Aptos only as fallbacks | The stricter rule wins; the handbook itself lets approved brand rules prevail |
| K3 | 8-point spacing base for infographic layout, with the house steps 4 and 12 as the justified exceptions; app screens keep the house scale | Reconciles Annex D.2 with the house style |
| K4 | Eight INFO gates derived from the handbook's mandatory rules, critical and major severities and P0 backlog, each mapped to the sibling gates it also trips | One evidence trail across the family |
| K5 | The parent Product Excellence doctrine gains a "Chwezi standards family" table naming its four children (1.0.1 to 1.0.2, wording only) | Owner instruction: one standard with four child standards |
| K6 | A standard-library checker ships with the skill and is copied into every engine | Structure and encoding checks become measurable, and each engine stays self-contained |
| K7 | Owner integration decision: the parent governs product UI/UX, design tokens, accessibility, performance, brand adaptation and quality assurance; the four child systems govern (1) dashboards and analytics, (2) documents and publishing, (3) presentations and slide decks, (4) infographics and visual communication | Keeps every standard without competing rulebooks |
| K8 | Mobile and tablet UI stated as the parent's (phones, tablets, POS tills, desktop, web); every child inherits its width classes where its output is viewed on a phone or tablet; the infographics export matrix gained tablet portrait and landscape | Owner question during the kaizen: tablets were covered by the parent, the dashboards child and the publishing child, but missing from the infographics matrix |

K9 (later the same day): the Design Studio Bible cross-check added INFO-CHART-006 (maps, from its Contract 26), making 83 rules; see `docs/kaizen/2026-11-design-bible-wave/README.md`.

## Mathematics added

Computed on 2026-11-08 (reference `mathematics-and-algorithms.md`, checker `check_infographic.py`):

- Type size by reading distance: about 23.6 pt per metre at a 20 arc-minute cap height (A2 poster:
  title 71 pt at 3 m, body 24 pt at 1 m, sources 12 pt at 0.5 m), matching poster practice.
- Print resolution: required ppi about 3438 / D(in): 291 at 0.3 m, 87 at 1 m; A2 pixel sizes at 150
  and 300 ppi, with and without 3 mm bleed.
- Phone canvas text: CSS minimum x canvas/slot scale (1,080 px in a 360 px slot: x3).
- Lie factor with a 0.95-1.05 band; radius-scaled bubbles give LF 3 for a doubling; a truncated bar
  axis can give LF 16.
- Diagram structure as a graph: unique ids, near-duplicate labels, orphans, reachability both ways,
  labelled decisions, Kahn topological order, numbering against order, strict-tree and single-ring
  tests, crossing count; the long text equivalent generated from the same graph.
- Ring radius (w + g) / (2 sin(pi/n)), truthful timeline spacing within 2%, contrast, CVD simulation
  with CIEDE2000, greyscale L*, total ink coverage, translation space by string length, weighted
  release score, SSIM regression.

The checker found a real numbering error in the first worked flow written for this record: an
exception step numbered after the step it precedes.

## Currentness

IF1 and IF2 VERIFIED; IF3 (W3C complex images), IF5 (translation expansion) and IF7 (ink limits) rest
on search summaries and are NOT_ASSESSED; IF8 (platform sizes) is measured per campaign.

## Not assessed

No Chwezi infographic has yet been released against this standard; the 20 arc-minute parameter and
the 150 ppi poster floor should be confirmed on a real printed A2 proof.
