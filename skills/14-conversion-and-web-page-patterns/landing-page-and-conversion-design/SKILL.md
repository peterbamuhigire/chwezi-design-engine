---
name: landing-page-and-conversion-design
description: Use when designing or restructuring a landing, marketing, campaign, waitlist, signup, or product-home page around one honest conversion goal, value proposition, objections, proof, CTA hierarchy, and closing ask. Use trust-credibility-and-social-proof for proof assets and navigation-and-information-architecture for structure.
metadata:
  portable: true
  category: 14-conversion-and-web-page-patterns
  compatible_with:
  - claude-code
  - codex
---

# Landing Page & Conversion Design
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com.

> A landing page has one job: move a specific visitor to take one specific action, and earn that
> action honestly. This skill gives you the section-by-section architecture and the
> conversion-credibility craft that makes the page convert *because it is clear and trustworthy* —
> never because it tricked someone. The doctrine's Mission applies in full: a page that opens in
> Inter on an indigo gradient with a three-icon feature row tells the visitor no one authored it.
> Conversion is downstream of that judgement.

<!-- dual-compat-start -->
## Use When

- You are building or rebuilding a **landing / marketing / product-home / campaign / waitlist**
  page whose success is measured by **one** conversion (signup, trial, demo, purchase, subscribe).
- A page exists but underperforms and you need to diagnose *why the visitor doesn't act* —
  unclear value prop, weak proof, buried CTA, friction, or a credibility gap.
- A growth/marketing team hands you copy and asks for the page structure and CTA hierarchy.
- You are asked to "make it convert" and your instinct (or someone else's) is reaching for
  countdown timers, fake "3 people are viewing this," or a pre-checked upsell — STOP and use the
  anti-dark-pattern rules here instead.

## Do Not Use When

- The page is a **product UI** (dashboard, app screen, settings) not a marketing page — use
  `practical-ui-design` / `webapp-gui-design`.
- The task is the **trust/proof section in isolation** — go to
  `trust-credibility-and-social-proof` (P1, group 04). This skill *composes* that section into the
  whole page; that skill details the testimonial/security-cue catalog.
- The task is a **multi-step checkout or signup flow** — use `ecommerce-and-checkout-ux` (P1,
  group 06) or `onboarding-and-first-run-design` (P1, group 04). A landing page *ends* at the CTA;
  those skills own what happens after the click.
- You only need the **copy/microcopy** for buttons and headlines — use
  `10-content-design-and-ux-writing/ux-writing-and-microcopy` for wording, then return here for
  placement and hierarchy.

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Audience, job, offer, conversion, and post-click outcome | Product/marketing owner | yes | Approved conversion brief |
| Proof, objections, claims, pricing, and constraints | Research, sales, legal, and product | yes | Verified evidence inventory |
| Brand, traffic source, device, analytics, and accessibility needs | Delivery owners | yes | Channel and measurement plan |

- **The ONE action.** Exactly one primary conversion goal for the page. If there are two
  equally-weighted goals, the page has none — split it or rank them. Write it down first.
- **The audience and their stage.** Cold (never heard of you) vs warm (clicked an ad they already
  understand) changes how much proof and education the page must carry above the fold.
- **The real value proposition** — the genuine one-sentence answer to *"why should this specific
  person care, in their words, not yours."* Not a tagline; the concrete outcome. You cannot design
  a hero around a slogan you haven't sharpened (doctrine: design around real content, never lorem).
- **Real proof you are allowed to use** — named customers, real quotes with attribution, true
  metrics, genuine logos/certifications. If proof is thin, the page must be honest about it (see
  conversion-credibility), not fabricate it.

### 0. Run the pre-flight, then commit the page's ONE distinctive idea
Run `04-web-and-ui-design/distinctive-by-design` first — it gates the build. A landing page is the
single highest-stakes surface for the Mission: it is where the convergent SaaS template
(Inter / indigo gradient / glass cards / centred hero / three-feature-icon row) is most reflexive
and most damaging. Commit ONE authored organising idea for the page (a signature display face
carrying the headline, an off-centre hero, a recurring motif, an authored image POV) per
`doctrine/design-doctrine.md` §0 and `pairing-principles.md`. State it before any markup.

### 1. Lock the single conversion goal and the message match
- Name the **one** primary action. Every section below either moves the visitor toward it or earns
  the right to ask. Secondary actions (a "learn more", a docs link) are visually subordinate — a
  text link, never a second equal-weight button competing with the primary CTA.
- **Message match:** the hero headline must echo the promise of whatever brought the visitor here
  (the ad, the email subject, the search). A mismatch between the click's promise and the page's
  first line is the largest, most common conversion leak.

### 2. Build the section spine (see `references/landing-anatomy.md`)
Order is deliberate — it answers the visitor's questions in the sequence they ask them:

1. **Hero** — value prop headline + supporting subhead + primary CTA + one credibility anchor
   (a real proof token: named logo strip, a rating, a usage number). Answers *"what is this and is
   it for me?"* in one screen.
2. **Value proposition / outcome** — the concrete transformation, framed as the visitor's outcome,
   not your feature list. Answers *"what do I get?"*
3. **How it works / the mechanism** — enough to make the promise believable. Answers *"how?"*
4. **Social proof** — testimonials with attribution, case numbers, logos, ratings. Composed from
   `trust-credibility-and-social-proof`. Answers *"do people like me trust this?"*
5. **Objection handling** — address the top 2–3 real reasons this visitor hesitates (price, effort,
   risk, lock-in). A short FAQ or a comparison. Answers *"what's the catch?"*
6. **Closing CTA** — restate the value and the ask, with the same primary action. Answers
   *"okay — how do I start?"*

Not every page needs all six, but the *sequence* (claim → outcome → believability → proof →
objections → ask) is the load-bearing logic. Reorder only with a stated reason.

### 3. Design the CTA hierarchy
- **One primary CTA**, repeated (hero + closing, sometimes a sticky bar) but *visually identical*
  every time — same label, same weight, same colour role. Repetition without variation; the
  visitor learns the button.
- **Real button copy** stating the value, not the mechanic: "Start my free trial" / "Get the audit"
  — not "Submit" / "Click here." (Route wording through `ux-writing-and-microcopy`.)
- **One focal point per screen.** The primary CTA is the brightest, highest-contrast element in its
  viewport. If a secondary action is equally loud, demote it (`distinctive-by-design` §3 — one
  clear focal point, designed eye-path).
- **Minimise the ask.** The fewest fields the conversion truly needs. Every extra field is friction;
  defer the rest to after the click (see `onboarding-and-first-run-design`).

### 4. Earn the click — conversion-credibility, not coercion (see `references/conversion-credibility.md`)
This is the heart of the skill and the doctrine's ethics line. Persuasion is legitimate; coercion
and deception are not. Build conversion from **honest** levers:

- **Specificity over hype** — a true number ("cuts month-end close from 9 days to 2") out-converts
  a superlative ("revolutionary platform") and survives scrutiny.
- **Real, attributable proof** — named person, role, company, ideally a face. Anonymous "★★★★★ —
  a happy customer" reads as fabricated and *lowers* trust.
- **Risk reversal, stated plainly** — a real guarantee, a genuine free tier, "no card required" only
  if it is actually true. Honest risk reversal is the strongest ethical conversion lever there is.
- **Transparent pricing and terms** — show the price, the renewal, the cancellation path. Hiding
  them converts the wrong people and they churn or chargeback.

**Banned — dark patterns (never ship these, even if asked):** fake/urgency-faked countdowns and
"only 2 left" that reset on reload; "3 people are viewing this right now" invented numbers;
confirmshaming opt-outs ("No thanks, I hate saving money"); pre-checked add-ons / opt-ins;
sneak-into-basket; forced continuity (free trial that auto-charges with no reminder and a buried
cancel); disguised ads and fake "system" notifications; roach-motel signup (one click in, ten to
leave). These violate `doctrine/design-doctrine.md` §0 (looking *authored and trustworthy*) and the
engine's ethics posture. If a stakeholder requests one, refuse and offer the honest equivalent
(see `references/conversion-credibility.md` §Dark-pattern → honest-swap table).

### 5. Hold the line on accessibility and performance — they ARE conversion
- **Accessibility (`doctrine/references/wcag-2.2-criteria.md`):** the CTA must be a real focusable
  control with a visible focus ring; target size ≥ 24×24px (SC 2.5.8); contrast ≥ the criterion for
  button text; never colour-only state. An inaccessible CTA is an un-clickable CTA for some visitors
  — a direct conversion loss, not just a compliance line.
- **Performance (`doctrine/references/web-performance-budgets-2026.md`):** the hero is the LCP
  element — keep it light; a slow first screen is abandoned before the value prop is read. Reserve
  space for hero media to protect CLS; defer below-the-fold weight. Treat the LCP/INP/CLS budgets as
  design constraints, not after-thoughts.

### 6. Specify, then build
Produce a section-by-section spec (see `examples/landing-wireframe-spec.md` for the shape): per
section — purpose, the real content, the type/weight/space treatment, the focal point, the CTA
state, and the proof token. Run the checklist below before any markup.

## Workflow
1. Define one audience, job, offer, conversion, and post-click outcome.
2. Build a claim–proof–objection map from verified evidence.
3. Sequence value, mechanism, proof, risk reversal, and CTA around commitment level.
4. Prototype responsive and accessible states without dark patterns.
5. Validate comprehension, credibility, conversion tracking, and post-click continuity before release.

## Conversion-Credibility Checklist (run before building)

1. **One conversion goal** named; secondary actions visually subordinate (never a second equal CTA).
2. **Message match** — hero headline echoes the click's promise.
3. **Value prop is a concrete outcome in the visitor's words**, sharpened from real content — not a
   slogan, not lorem.
4. **Section spine present and in believable order** — claim → outcome → mechanism → proof →
   objections → ask (deviations have a stated reason).
5. **CTA hierarchy** — identical repeated primary CTA, value-stating copy, single focal point per
   screen, minimal fields.
6. **All proof is real and attributable** — named people/companies/numbers; zero fabricated
   testimonials, logos, or metrics.
7. **Zero dark patterns** — no fake scarcity/urgency, confirmshaming, pre-checked opt-ins, forced
   continuity, sneak-into-cart, disguised ads, roach-motel.
8. **Risk reversal and pricing/terms are honest and visible** when claimed.
9. **CTA passes WCAG 2.2** — focusable, visible focus, ≥24px target, sufficient contrast, not
   colour-only.
10. **Hero respects the performance budget** — LCP-light, CLS-reserved.
11. **No convergent default** — type/colour/layout pass `distinctive-by-design` (no Inter+indigo
    gradient, no three-feature-icon row as a reflex, no centred-everything).

If any item can't be satisfied (proof is thin, a stakeholder insists on a dark pattern, no real
copy yet), **say so and ask** — never quietly ship the coercive or convergent version.

## Decision Rules
| Condition | Page choice | Wrong-choice failure |
|---|---|---|
| Page structure is being chosen (one page, one-page sales pitch, map-led, tiled) | Choose from the content-driven structures in `art-direction-routes`; repeat the primary action per section on a sales pitch; make the footer a functional next step | Structure chosen for novelty strands visitors |
| One dominant conversion | One primary CTA repeated with consistent wording | Competing CTAs split intent |
| Proof is strong and specific | Place it near the matching claim/objection | A detached logo wall fails to substantiate claims |
| Commitment is high | Add process, risk reversal, and qualification detail | Premature ask suppresses trust |

## Capability Contract
Read and search are required for audience, offer, proof, claims, and analytics. Editing is allowed only for requested implementation. Testing, publication, tracking changes, and experiment launch require separate authority and privacy review.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without verified proof or offer detail, deliver a wireframe and evidence-request list, not invented persuasion. Stop publication when claims, pricing, consent, accessibility, analytics, or post-click behaviour are unverified.

## Anti-Patterns

- **Two co-equal CTAs** in the hero ("Start free" *and* "Contact sales" at identical weight) —
  the choice paralyses; rank them.
- **Feature-listing instead of outcome-selling** — a wall of "we have X, Y, Z" with no "so you can…"
- **The convergent SaaS template** — Inter/Geist, indigo→blue gradient, glass cards, centred hero
  with two buttons, the three-feature-icon row, a logo strip with no real names. The single most
  template-looking surface on the web; the Mission targets it directly.
- **Fabricated or anonymous proof** — stock-photo "customers," "★★★★★ — Anonymous," logos of
  companies that aren't actually customers. Lowers trust and is dishonest.
- **Dark patterns of any kind** (see §4 banned list) — they convert the wrong people, invite
  chargebacks and churn, and violate the engine's ethics. Non-negotiable.
- **Friction the conversion doesn't need** — a 9-field form for a newsletter; demanding a card for a
  "free" trial without saying so up front.
- **Burying the ask** — the only CTA below three screens of scroll, or low-contrast against its
  background.
- **Ignoring message match** — a beautiful page that answers a different question than the ad asked.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Conversion brief and page architecture | Marketing, product, and design | Every section advances one audience and conversion |
| Claim-proof-objection-CTA map | Writers and reviewers | Each substantive claim has attributable support |
| Prototype and measurement evidence | Engineering and growth owner | Responsive, accessibility, tracking, and post-click checks pass |

- A **stated page conversion goal** and the committed distinctive idea (what + why + human
  authority), written before markup.
- A **section-by-section spec** (purpose, real content, type/space treatment, focal point, CTA
  state, proof token per section) in the shape of `examples/landing-wireframe-spec.md`.
- A **CTA hierarchy** definition and a **completed conversion-credibility checklist** confirming
  zero dark patterns and real, attributable proof.

## Examples

- `examples/landing-wireframe-spec.md` — a full, real section-by-section landing spec for a sample
  product (an SMB month-end-close tool), showing hero through closing CTA, the CTA hierarchy, the
  honest-proof treatment, and the WCAG/perf constraints applied.

## References
- `skills/11-imagery-illustration-and-art-direction/art-direction-routes/references/direction-board-protocol.md` section 5 — content-driven structures. Functional footer: related content, contact or WhatsApp route, trust details (registration number, landmark address).

- `references/landing-anatomy.md` — the section spine, what each section must answer, above-the-fold
  budget, CTA-placement rules, and the page-length / cold-vs-warm decisions.
- `references/conversion-credibility.md` — the honest conversion levers, the full dark-pattern
  catalog with an honest-swap table, and the proof-authenticity rules. Ethical, real, no dark
  patterns.
- `references/demand-test-page-and-funnel-matrix.md` — load when a page is built to test demand before the product exists, or to plan stage-by-stage measurable learning (funnel learning matrix).
- `doctrine/design-doctrine.md` — the Mission (§0, "the moat is looking human-made"): conversion is
  downstream of an authored, trustworthy artifact.
- `doctrine/references/wcag-2.2-criteria.md` — CTA focusability, target size (SC 2.5.8), contrast,
  non-colour state.
- `doctrine/references/visitor-modes.md` — choose the visitor mode per surface: a landing page is Persuade even for a tool; its forms are Operate.
- `doctrine/references/web-performance-budgets-2026.md` — hero as LCP, CLS reservation, LCP/INP/CLS
  as design constraints.
- Sibling skills: `04-web-and-ui-design/distinctive-by-design` (run first; gates the build),
  `14-conversion-and-web-page-patterns/trust-credibility-and-social-proof` (P1 — the proof section in depth),
  `14-conversion-and-web-page-patterns/onboarding-and-first-run-design` (P1 — what happens after the click),
  `06-sector-and-domain-ux/ecommerce-and-checkout-ux` (P1 — purchase flows),
  `10-content-design-and-ux-writing/ux-writing-and-microcopy` (the CTA and headline wording).
<!-- dual-compat-end -->
