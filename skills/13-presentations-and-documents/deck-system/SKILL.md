---
name: deck-system
description: Use when designing or writing a slide deck, pitch, strategy presentation, board update, review, or credentials deck with a visual system, slide economy, builds, and presenter notes. Use design-storytelling-and-case-studies for the narrative spine and document skills for paginated output.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# Deck System
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

<!-- dual-compat-start -->
## Use When
- Building any presentation deck — pitch, strategy, campaign proposal, credentials, investor/board
  update, or monthly/quarterly/annual review.
- A slide deck (PPTX / Google Slides / Canva / rendered) is the deliverable or part of it.

## Do Not Use When
- The deliverable is a long-form DOCX report or PDF proposal → use `docx-report-and-document-formatting`
  / `pdf-proposal-and-bankable-document-design` (Phase 1).
- The need is the typographic/colour system itself → use groups 01 / 02 (this skill *applies* them).

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Audience, decision, venue, duration, and delivery mode | Presenter and sponsor | yes | Approved brief |
| Evidence, narrative, and required sections | Content owners | yes | Source register and outline |
| Brand, template, format, and accessibility constraints | Brand and delivery owners | yes | Asset package and output spec |
- The deck's **purpose** (pick the matching `examples/variant-*`), audience, the single decision or
  action you want, the content/evidence, and the brand (or a deliberate type+colour choice).

## Workflow
1. **Pick the variant.** Match the purpose to an `examples/variant-*.md` (initial-pitch, strategy,
   ai-strategy-presentation, campaign-proposal, credentials, monthly-report, quarterly-review,
   annual-review) — each carries its slide list, tone, and length.
2. **State the typography + colour first** (anti-slop charter): a distinctive display + refined body
   from groups 01/02; never a banned font. State the choice and reason before building slides.
3. **Build the narrative** (`references/presentation-frameworks.md`, `pitch-psychology.md`,
   `storytelling.md`): conclusion-first (Minto/SCQA), one idea per slide, action titles (the title
   is the takeaway), evidence beneath, a clear ask.
4. **Apply slide economy** — ruthless cuts, real size/weight extremes for hierarchy, a consistent
   grid, builds only where they aid comprehension, no bullet soup.
5. **Design the data** — route exhibits to `chart-selection-and-encoding` / `data-visualization`.
6. **Write presenter craft** — speaker notes, transitions, the spoken arc; rehearse-ready.
7. **Plan the room and delivery** for live decks with
   `references/presentation-structure-room-and-delivery.md`: strategy sheet, storyboard before
   slides, farthest-seat legibility test on the real display, handout timing, rehearsal scoring.
   Run `fine-typesetting-and-typesetting-qa` on text-heavy and leave-behind decks.
8. **Run the gates** — anti-slop (no template look, no stock gradients), accessibility (contrast,
   legibility at room distance), and `design-qa-and-pre-launch-review`.

## Decision Rules
| Condition | Deck choice | Wrong-choice failure |
|---|---|---|
| Live presentation | Sparse slides plus presenter notes/builds | Slides become a teleprompter |
| Stand-alone circulation | More explicit evidence and captions | Readers lack spoken context |
| One slide contains two claims | Split or subordinate one claim | Competing messages destroy hierarchy |
| Room, display or aspect ratio unseen | Get the strategy sheet answers and run the farthest-seat test before sign-off | Text unreadable from the back; letterboxed slides |
| Several related charts compare the same measure | Lock one axis scale across the series | Unequal values look equal and credibility is lost |
| Power or projection is unreliable at the venue | Carry PDF and native copies offline, printed handouts and a flip-chart fallback | Presentation collapses when the equipment fails |

## Capability Contract
Read, edit, and render capabilities are required for production; analysis defaults read-only. Execution is required to claim font embedding, animation, media, or layout fidelity. External publication requires separate authority.

## Degraded Mode
Without rendering, deliver an outline and slide specification marked unverified. Stop release when sources, fonts, aspect ratio, or target-app inspection are missing; recover with a static PDF-ready version and named gaps.

## Anti-Patterns
- **Paragraph slides:** reduce to one claim and move detail into notes.
- **Template repetition:** vary composition while preserving the system.
- **Tiny evidence:** enlarge, crop, or split the exhibit.
- **Unattributed claims:** cite the source on the slide.
- **Decorative builds:** animate only to control sequence or explain change.
- One template reused unthinkingly for every purpose (the slop the old 8 deck-skills risked).
- Title = topic instead of takeaway; bullet soup; 6 ideas per slide.
- Decorative builds/transitions; stock-gradient title slides; banned fonts.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Editable deck and narrative map | Presenter and sponsor | Each slide has one role in the argument |
| Presenter notes and source register | Presenter and reviewer | Claims, transitions, and citations are traceable |
| Rendered review package | Release owner | Fonts, overflow, contrast, media, and aspect ratio are inspected |
- A deck spec: chosen variant, stated type+colour, slide-by-slide narrative with action titles,
  exhibit plan, and presenter notes — ready to build in PPTX/Slides/Canva.

## Examples
- `examples/variant-*.md` — the 8 purpose-specific deck blueprints (slide lists, tone, length).
  These ARE the worked examples for this skill.

## References

- [chwezi-presentation-standard](../../00-cross-cutting-ops-qa-a11y/chwezi-presentation-standard/SKILL.md) (binding for Chwezi decks: claim ledger, assertion headlines, venue-computed legibility, editable PPTX, PDF parity, eight DECK gates).
- `references/presentation-frameworks.md`, `references/pitch-psychology.md`, `references/storytelling.md`.
- `references/presentation-structure-room-and-delivery.md` — strategy sheet, storyboard, slide
  text rules, room legibility, seating, handouts, rehearsal scoring and claims not to import
  (source: Kupsh and Graves (1993) *How to Create High-Impact Business Presentations*, NTC
  Business Books, adapted). Pitch rehearsal content routes to `business-plan-skills`; tender
  orals to `proposal-skills`.
- `doctrine/design-doctrine.md` (Mission, charter), `doctrine/references/ai-slop-banned-fonts.md`,
  `pairing-principles.md`, `type-scale-and-spacing.md`, `wcag-2.2-criteria.md` (legibility).
<!-- dual-compat-end -->
