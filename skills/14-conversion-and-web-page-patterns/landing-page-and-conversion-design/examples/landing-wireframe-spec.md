# Worked example — landing wireframe spec: "Tallymark"

A real, section-by-section landing spec for a sample product. Not a template — an authored page with
a stated distinctive idea, real copy, a single conversion goal, an honest proof treatment, and the
WCAG/perf constraints applied. Use this as the *shape* of the spec this skill produces.

---

## Product & brief

- **Product:** **Tallymark** — a month-end close tool for SMB finance teams (10–200 staff).
- **The ONE conversion goal:** **Book a 20-minute demo.** (High-consideration B2B purchase →
  demo, not instant signup.) Secondary action (pricing page link) is a subordinate text link only.
- **Audience & stage:** *Cold-to-warm* — finance managers / controllers arriving from a LinkedIn ad
  about "closing the books faster." They feel the pain (long, manual close) but don't know Tallymark.
- **Real value proposition:** *"Close your books in 2 days, not 9 — without ripping out your ERP."*
- **Proof we are allowed to use (real):** 3 named-with-role testimonials, a logo strip of 6 real
  customers, an internal metric (avg close time across customers: 9.1 → 2.4 days), SOC 2 Type II.

### Distinctive decision (stated before markup, per `distinctive-by-design`)
> "Tallymark's distinctive idea is an **editorial, ledger-inspired layout**: a tight left rule
> column (like a ledger margin) running the page, a **serif display face (Andada Pro) for the
> headline** against a precise grotesque for body, and a recurring **tick/check-mark motif** as the
> section marker — because the audience is finance professionals who trust precision and ledgers,
> grounded in editorial type practice (`pairing-principles.md`). Explicitly NOT the SaaS template
> (no Inter, no indigo gradient, no centred three-icon row)."

Colour intent: ink-near-black on warm paper-white, one deep accountant's-green accent reserved
*only* for the CTA so it is the single focal point. (No indigo gradient.)

---

## Section 1 — Hero  *(answers: "what is this and is it for me?")*

- **Purpose:** message-match the ad, state the outcome, make one credible ask, earn the scroll.
- **Real content:**
  - Headline (Andada Pro, ~64px, weight 600): **"Close your books in 2 days, not 9."**
  - Subhead (grotesque, ~20px, weight 400): "Tallymark automates reconciliations, accruals, and the
    close checklist — on top of the ERP you already run. No rip-and-replace."
  - Primary CTA (button): **"Book a 20-min demo"**  — accountant's-green, the brightest element here.
  - Credibility anchor (above the fold): a row of 6 real customer logos, label "Closing faster at".
- **Layout / focal point:** off-centre hero — headline + CTA in the left two-thirds against the
  ledger rule; an authored product screenshot (real UI, not a glass mock) in the right third.
  The green CTA is the single focal point in the viewport.
- **CTA state:** real `<button>`/`<a>`; visible focus ring (2px, offset); target ≥ 48px tall
  (clears SC 2.5.8 ≥24px comfortably); green-on-paper contrast verified ≥ the button criterion.
- **Performance:** the product screenshot is the LCP element — served as a sized, compressed AVIF
  with width/height set to reserve space (CLS = 0 from it); fonts preloaded, swapped.

## Section 2 — Value / outcome  *(answers: "what do I get?")*

- **Purpose:** convert the headline promise into the visitor's concrete outcomes.
- **Real content (three outcome statements, each outcome-first, feature-second):**
  1. **"Finish before the 3rd, not the 9th."** Auto-reconciliation clears the manual matching that
     eats your first week.
  2. **"Stop chasing the checklist."** A live close board shows every task, owner, and blocker —
     no more status-update emails.
  3. **"Keep your ERP."** Tallymark sits on top via read/write connectors; nothing migrates.
- **Layout:** asymmetric — not three equal centred cards. A wider lead statement, two supporting,
  tick-motif markers. Deliberately breaks the three-feature-icon-row default.

## Section 3 — How it works / mechanism  *(answers: "how — is this believable?")*

- **Purpose:** make the 9→2 claim credible with just enough mechanism.
- **Real content (3 steps):** 1) Connect your ERP (read-only first; ~15 min). 2) Tallymark maps your
  accounts and learns last quarter's close. 3) Run the close — it reconciles, flags exceptions, and
  drives the checklist. "You approve; it does the matching."
- **Layout:** numbered with the tick motif; a real annotated screenshot per step, not an icon.

## Section 4 — Social proof  *(answers: "do people like me trust this?")*  → composed from `trust-credibility-and-social-proof`

- **Purpose:** show people *like the visitor* (SMB finance leads) trust it.
- **Real, attributable proof (no fabrication):**
  - Quote: *"We went from a 9-day close to under 3 in two cycles. My team got their evenings back."*
    — **Dawn Achieng, Financial Controller, Maduuka Retail (Nairobi).** (Real name/role/company.)
  - Two further attributed quotes (manufacturing controller; SaaS finance lead).
  - Aggregate metric, stated precisely: **"Across Tallymark customers, average close time fell from
    9.1 to 2.4 days."** (Internal data; defensible.)
  - Security cue: **SOC 2 Type II** badge linking to the real report request.
- **Honesty note:** every logo in the hero strip is a paying customer; every quote is real and
  attributed with a face where permitted. No "★★★★★ — happy customer."

## Section 5 — Objection handling  *(answers: "what's the catch?")*

- **Purpose:** answer the top 3 real objections of an SMB finance lead.
- **Real content (honest FAQ):**
  1. *"Will this touch my ledgers?"* — Read-only by default; write access is opt-in, scoped, and
     logged.
  2. *"How long to set up?"* — Most teams connect in a day and run their next close on it.
  3. *"What does it cost?"* — Flat per-entity pricing, shown on the [pricing page](#) (text link,
     subordinate). No hidden fees; monthly, cancel anytime. *(Transparent — no forced continuity.)*

## Section 6 — Closing CTA  *(answers: "how do I start?")*

- **Purpose:** restate value, repeat the identical ask.
- **Real content:** Heading (Andada Pro): **"See your next close in 2 days."** Subhead: "20 minutes,
  your real data, no commitment." CTA: **"Book a 20-min demo"** — *identical* label, weight, and
  green as the hero. Risk reversal stated: "No card. No sales pressure. A real walkthrough."

---

## CTA hierarchy (whole page)

- **Primary (one, repeated identically):** "Book a 20-min demo" — green, hero + closing
  (+ sticky bar appears once the hero CTA scrolls out). Same label/weight/colour every time.
- **Secondary (subordinate):** "See pricing" — a text link in objection handling, never a co-equal
  button. No second green button anywhere.
- **Minimal ask:** the demo form is name + work email + company size (3 fields). Everything else is
  asked *after* booking (deferred to `onboarding-and-first-run-design`).

---

## Conversion-credibility checklist — applied

| # | Item | Result |
|---|---|---|
| 1 | One conversion goal, secondary subordinate | Pass — demo only; pricing is a text link |
| 2 | Message match | Pass — headline echoes the "close faster" ad |
| 3 | Concrete outcome value prop, real content | Pass — "2 days, not 9", real copy |
| 4 | Section spine in believable order | Pass — claim→outcome→mechanism→proof→objections→ask |
| 5 | CTA hierarchy (identical, focal, minimal) | Pass — one green CTA, 3-field form |
| 6 | All proof real & attributable | Pass — named quotes, real logos, internal metric, SOC 2 |
| 7 | Zero dark patterns | Pass — no fake scarcity/urgency, no pre-checks, cancel-anytime |
| 8 | Risk reversal & pricing honest/visible | Pass — "no card, cancel anytime", pricing linked |
| 9 | CTA passes WCAG 2.2 | Pass — focusable, visible focus, ≥48px, contrast verified |
| 10 | Hero respects perf budget | Pass — sized AVIF LCP, CLS reserved, fonts preloaded |
| 11 | No convergent default | Pass — Andada Pro+grotesque, paper/ink+green, ledger layout, no indigo gradient, no icon-row |

**Verdict:** ships. Authored (ledger/editorial idea), honest (real proof, zero dark patterns),
accessible and fast — conversion earned by clarity and trust, per `doctrine/design-doctrine.md` §0.

> Fonts named here (Andada Pro, a grotesque body) are illustrative of the *editorial* intent for this
> sample; on a real build, run `01-typography-and-fonts/font-selection-and-pairing` and scan
> `fonts/` for a licensed premium family before committing.
