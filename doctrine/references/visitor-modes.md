# Reference: Visitor Modes (chosen per surface)

A visitor mode names what the person on a given surface is there to do. It sets the default
posture for type, density, motion and colour on that surface. The mode is chosen **per surface,
not per project**: one product usually has several.

> Idea adapted from Impeccable (pbakaus/impeccable, Apache-2.0,
> https://github.com/pbakaus/impeccable, commit 114ea1d). The wording, the Chwezi examples, the
> font-category defaults and the detector mapping below are Chwezi-original. Impeccable is cited
> for the framing only; it is not an authority for any typeface or colour choice (design authority
> rule: approvals trace to human authority, see `pairing-principles.md`).

## The four modes

| Mode | The visitor is here to… | Success looks like |
|---|---|---|
| **Persuade** | decide whether to trust, sign up, buy, apply or get in touch | the visitor understands the offer and takes one clear next step |
| **Operate** | get a task done repeatedly: enter, check, approve, compare, fix | the task is fast, error-resistant and recoverable, day after day |
| **Read** | understand long-form content: a report, article, policy or guide | the visitor reads to the end without strain and can find their place again |
| **Experience** | feel something: a launch, an exhibition, a campaign, a portfolio piece | the surface is remembered, and still usable and accessible |

## Choose per surface, not per project

The same product, even the same brand, spans modes. Decide the mode for each surface and write it
in the brief or the `PROJECT.md` surface list.

Worked examples from Chwezi work:

- **SRS portal.** The public landing page that explains the service and invites a request is
  **Persuade**. The admin screens where analysts triage requirements and manage users are
  **Operate**. The published SRS document view is **Read**.
- **Business or client website.** The home and service pages are **Persuade**. The blog and
  case-study articles are **Read**. The contact form is **Operate** (a task with validation and
  recovery), even though it sits inside a marketing site.
- **Dashboard product (for example a Maduuka-style retail back office).** The dashboards, stock
  tables and forms are **Operate**. The sign-up and pricing pages are **Persuade**. The monthly
  performance report exported to PDF is **Read**.
- **Launch or campaign microsite.** The hero sequence is **Experience**; the registration form
  inside it is still **Operate**.

A tool's landing page is still Persuade, and a cultural institution's documentation is still
Read: the visitor's job decides the mode, not the industry or the brand's temperament.

## Posture per mode

Font defaults name **categories only** (see `font-groups-and-usage.md`). The actual face is chosen
from that category's approved baselines, checked against `ai-slop-banned-fonts.md`, and stated
with its reason before output.

| Mode | Default font categories | Density | Motion | Colour posture |
|---|---|---|---|---|
| **Persuade** | Display from **03** Modern Product or **06** Expressive; body from 08 | Low to medium; generous spacing around the single call to action | Purposeful entrance and state feedback only; nothing that delays the offer | One brand accent carries the action; proof and trust content stays neutral |
| **Operate** | **04** Technical/Data or **08** Body/UI workhorses; never a bare system stack as the whole identity | Medium to high; tables and forms may be dense if hierarchy and alignment hold | Minimal; state changes and feedback only, short durations, reduced-motion honoured | Neutral surfaces; colour reserved for status, focus and destructive actions; never colour-only meaning |
| **Read** | **04** or **08** workhorses for body (a serif body from 01/02 is allowed for long documents); display may come from 01/02 | Low; measure, leading and rhythm come first | Near none; nothing moves beside running text | Quiet; high text contrast, restrained accent for links and navigation |
| **Experience** | Display from **06** Expressive or **03** Modern Product; body from 08 | Varies by scene; each scene still has one focal point | Allowed as content, with pause/stop controls and a reduced-motion path | Freer palette, still meeting the WCAG 2.2 floor for text and controls |

Rules that hold in every mode:

- The WCAG 2.2 AA floor (`wcag-2.2-criteria.md`) applies to every surface in every mode.
- The banned-font doctrine applies in every mode. A mode never licenses a banned face.
- Script faces from group 07 remain accent-only in every mode.

## Detector rules and modes

`tools/slop-detector/rules/registry.json` carries a `modes` list on each rule. As of
29 September 2026 **every one of its 49 rules lists all four modes**, so no rule is relaxed or
tightened by mode today: the same severities apply everywhere. The mapping below is posture
guidance for reviewers (which findings to read first on a surface), not a change in severity.

| Mode | Rules that matter most on this surface |
|---|---|
| **Persuade** | `hero-eyebrow-chip`, `kicker-above-heading`, `identical-three-column-feature-grid`, `purple-blue-gradient`, `gradient-text`, `placeholder-image-host`, `first-viewport-column-overflow` |
| **Operate** | `focus-indicator-removed`, `tiny-text`, `low-contrast-computed`, `gray-on-color`, `nested-cards`, `design-system-color`, `design-system-font-size`, `horizontal-overflow` |
| **Read** | `line-length`, `body-leading-tight`, `body-leading-loose`, `justified-body-text`, `all-caps-body`, `skipped-heading`, `body-wide-tracking` |
| **Experience** | `missing-reduced-motion`, `bounce-easing`, `marquee`, `pulsing-dot`, `neon-glow`, `text-occlusion`, `content-hidden-at-rest` |

If a later registry change gives rules mode-specific severities, update this table from the
registry; do not restate severities here.

## Runtime vocabulary

The design engine runtime (`engine/design_engine/decisions.py`) accepts
`mode ∈ {persuade, operate, read, experience}`. The legacy values are still accepted and
normalised: `app → operate` and `marketing → persuade`. The decision output carries the
normalised `mode`, and `mode_alias_from` when a legacy value was supplied. Stored projects are not
rewritten; normalisation happens when they are read.

## Related

- `doctrine/references/font-groups-and-usage.md` — the category taxonomy the defaults point to.
- `doctrine/references/pairing-principles.md` — how to combine the chosen faces.
- `skills/00-cross-cutting-ops-qa-a11y/design-critique-and-review-facilitation/references/refinement-verbs.md`
  — how each refinement verb reads under each mode.
