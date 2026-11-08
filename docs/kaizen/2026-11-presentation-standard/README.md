# Kaizen record: Chwezi Presentation and Slide Deck Design Standard (8 November 2026)

**Owner instructions (8 November 2026).** Build the full edition of the Chwezi Presentation and Slide
Deck Design Standard into the writing, dev, development and design engines, each working on its own,
and apply the best formulas, algorithms and mathematics wherever they give the engines an edge.

## Source

"Chwezi Presentation and Slide Deck Design Standard", full edition (Version 1.0, 8 November 2026,
Chwezi Core Systems Design Standards Series): parts I-V, about 10,100 words, of which a large share
repeats one composition paragraph per archetype. Read in three passes with repeated paragraphs read
once.

## Decisions

| # | Decision | Reason |
|---|---|---|
| K1 | The handbook's 22 archetypes and 20 blueprints merged into 29 blueprints by communication job | They overlapped; every content contract and failure mode of both is kept |
| K2 | Two scoring systems kept and related: six deck dimensions at least 4 of 5, and the 100-point slide scorecard averaging at least 90 with no critical failure | The handbook defines both; together they gate the deck and its slides |
| K3 | Two margin statements reconciled: safe area at least 0.45 in by 0.35 in, outer margins starting at 0.45-0.65 in | The core section and Part II gave different values for different things |
| K4 | WCAG used as a design benchmark only, never a PowerPoint conformance claim | The handbook says so itself |
| K5 | Eight DECK gates mapped to the Publishing and Reporting gates they also trip | One evidence trail across standards |
| K6 | Legibility computed, not guessed: minimum size about 4.5 x (farthest viewer / screen image height) pt | Owner instruction to apply mathematics; see below |

## Mathematics added

Computed on 2026-11-08 (reference `mathematics-and-legibility.md`):

- Venue legibility: at a 20 arc-minute cap height, cap height 0.7 em and a 540 pt slide, the minimum
  size is about 4.5 x D/H pt. The handbook's 18 pt body is right only when the farthest viewer is
  within four screen heights; at six screen heights the minimum is 27 pt. A 1366x768 laptop at 0.6 m
  needs about 14 pt, inside the 16 pt floor.
- Analytical screens: image height at least distance x vertical pixels / 3438 (one pixel per
  arc-minute): 2.51 m for 1080 lines at 8 m.
- Modular type scale: body 20 pt x 1.25^n gives 10.2, 16, 20, 31.3 and 39.1 pt, each inside the
  handbook ladder.
- Grid: column width (13.333 - 2m - 11g) / 12 = 0.844 in at m = 0.5 in, g = 0.2 in.
- Images: 144 pixels per slide inch for 1080p, 288 for 4K.
- White space measured from the render (background pixel share), target 20-35%.
- Runtime: 30-90 s per substantive slide, so 10-30 substantive slides for 15 minutes.
- Contrast formula, OKLab ramps, nice ticks, banking to 45 degrees, largest-remainder rounding.

## Currentness

PR3 (legibility visual angle) and PR4 (display image size) rest on secondary sources and a third-party
calculator; the standards' own texts were not read, so both are `NOT_ASSESSED` and the 20 arc-minute
value is recorded as a Chwezi parameter.

## Routing

104 fixtures, precision@1 95%, precision@3 100%, owned negatives 54/54 after adding two fixtures and
one owned negative (`deck-system`).

## Not assessed

No Chwezi deck has yet been built or reviewed against this standard; the venue law should be checked
on a real projector with a measured farthest seat before the 20 arc-minute parameter is confirmed.
