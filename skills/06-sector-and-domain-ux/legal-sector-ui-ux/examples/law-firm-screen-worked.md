# Worked Example: Family-Law Practice-Area Page

A single screen spec for one practice-area page on a law-firm website. The firm is a
two-attorney family-law practice; the page covers **divorce and child custody**. This is the
page a worried parent lands on after searching "divorce attorney Kampala" at 11pm. Every
decision below is justified against the legal-sector skill, the design doctrine, and the
ethics constraints — not improvised.

This is a reference output, not a template to copy verbatim. Swap the firm name, jurisdiction,
and figures; keep the structure and the reasoning.

---

## 1. Client psychology framing (drives every other decision)

The visitor is not shopping for a service — they are frightened about losing time with their
children and afraid of being out-lawyered by an ex-spouse. They arrive in a state of
**overwhelm and shame**, often outside business hours, often on a phone.

Three things must happen, in this order, before any credential is shown:

1. **Acknowledge the emotional reality** — name the fear before naming the firm.
2. **Reduce the threat** — show that the first step is small, free, and confidential.
3. **Then** earn authority with concrete, verifiable signals.

This is why the page opens with the client's situation, not the firm's founding year — mistake
#1 in the skill's "What Not to Do" list. Credentials come *after* reassurance, never first.

---

## 2. Practice-area design direction

Per the skill: **do not default to navy + white + gold** — every family-law firm uses it, and
it reads as templated in a credibility-critical sector. Family law differs from criminal or
corporate practice: the emotional register is *calm and protective*, not *aggressive* or
*institutional*. The visual language should feel like a steady professional, not a courtroom.

| Token | Choice | Rationale |
|---|---|---|
| Primary | Deep teal `#1F4E4A` | Trust-spectrum without the navy cliché; reads calm, not combative. WCAG AA on white (contrast 8.1:1). |
| Accent | Warm clay `#B4623A` | Human warmth for CTAs; differentiates from the cold-blue convergent default. AA on white for large text/buttons. |
| Surface | Warm off-white `#F7F4EF` | Softer than pure white; lowers visual tension for a stressed reader. |
| Ink | `#21272A` near-black | Body text at AAA on the surface. |

**Type pairing** (both outside the banned list — no Inter, Roboto, Open Sans, Lato, Montserrat,
Poppins, Geist, Arial, system defaults):

- **Headings:** *Alegreya* (humanist, calligraphic serif) — authored, warm, conveys judgment and care.
- **Body / UI:** *Source Sans 3* — highly legible at small sizes, calm, not a slop default.
- Fallback tier if embedding is constrained: Georgia (headings) / a device-common humanist
  sans, declared explicitly — never a silent fall-back to Inter.

**Imagery:** no gavels, scales, or empty courtrooms (mistake #4). Use one real photo of the
two attorneys in their actual office, or restrained editorial illustration. The reception/
consultation room photo also doubles as a local-trust signal.

---

## 3. Screen layout, top to bottom

### Above the fold — problem first, then the small first step

```
H1 (Alegreya, 40px):
    Divorce and Custody Lawyers in Kampala — Protecting Your Time With Your Children

Intro (Source Sans, 18px, 2 sentences, ~45 words):
    Separation is one of the hardest things a parent goes through, and the fear of losing
    custody can be paralysing. We guide Kampala parents through divorce and custody with
    clarity, discretion, and a clear plan — so the decisions about your children are made
    calmly, not in anger.

Primary CTA (clay button, 48px tap target):
    Book a Confidential Consultation

Trust strip beneath CTA (small, muted):
    Free 30-minute first consultation  ·  Same-day response on weekdays  ·  Strictly confidential
```

The H1 leads with the *client's* situation and city (also the SEO keyword: practice area +
"lawyers" + city in the first 50 words). The CTA is practice-specific — "Confidential
Consultation," not generic "Contact Us" — and the word *confidential* directly answers the
shame the visitor feels.

### "We handle these cases" — client language, not legal classification

A two-column list using the words a parent would actually type, not statute names:

- Filing for or responding to divorce
- Child custody and parenting-time arrangements
- Child and spousal maintenance
- Relocating with a child after separation
- Modifying an existing custody order
- Protection where there is family violence

(Client search language, per skill §"We Handle These Cases" — e.g. "parenting time," not
"physical custody apportionment.")

### "What you may be facing" — the empathy section

One short block in second person, validating the fear before selling anything:

> You may be lying awake worried that you will only see your children every other weekend.
> You may be afraid that the other parent is already talking to a lawyer, or that staying
> calm means you will be taken advantage of. Those fears are normal — and they are exactly
> why having a steady advocate early changes the outcome.

This section is the emotional turn. Authority signals before this point would feel like
boasting; after it, they land as relief.

### "What we do for you" — the process in plain English

A 4-step horizontal stepper, each step one plain sentence (no Latin, no unexplained terms):

1. **We listen first.** A confidential consultation to understand your situation and what you
   want for your children.
2. **We build the plan.** We explain your options and the likely path in clear language, with
   no surprises on cost.
3. **We negotiate or represent.** Most custody matters settle; where they cannot, we represent
   you firmly in court.
4. **We stay reachable.** You get a direct line to your attorney, not a call centre.

### Authority signals — *now* it is safe to show credentials

Placed only after reassurance and process. Each signal is concrete and verifiable — no vague
"dedicated to excellence" (mistake #2), no "expert/specialist" claim unless bar-certified
(ethics constraint):

- **Named, real people:** "Led by Sarah N. and David O., both admitted to the Uganda bar."
- **Specific experience:** "Over 12 years focused on family law — we do not dabble in it
  between other cases."
- **Bar-compliant recognition only**, current year, with the disclaimer that past results do
  not guarantee future outcomes.
- **Genuine client testimonial** (with consent), focused on *how the client felt treated*, not
  on a settlement figure — money-amount testimonials risk bar advertising rules.
- A short professional-association line and a real office address (also a local-SEO trust cue).

### FAQ — drawn from real client questions

4–6 questions in the exact phrasing a parent searches, each answered in 50–100 plain words.
Example: *"Will I lose custody if I move out of the house?"* — a top real-world fear, and a
featured-snippet opportunity. This section carries most of the page's organic search value.

### Closing CTA + the disclaimer that protects the firm

```
H2: Talk to a Family-Law Attorney Today
Sub: The first consultation is free, confidential, and there is no obligation.
[ Book a Confidential Consultation ]   [ Call: +256 … ]  (tap-to-call on mobile)

Microcopy under the form (required):
    Submitting this form does not create an attorney–client relationship. Please do not
    include confidential details about your case until we have confirmed we can represent you.
```

The intake form is **≤ 6 fields** (name, phone, email, city, one-line "how can we help," how
they heard about us). More fields measurably reduce completions. The disclaimer is mandatory
under the skill's ethics constraints and is the single most-omitted element on real law-firm
sites (mistake #10).

---

## 4. Conversion + accessibility checklist for this screen

- [ ] Phone number visible in the header on every breakpoint (not hidden below the fold).
- [ ] Primary CTA above the fold and repeated at page end; tap targets ≥ 44px.
- [ ] Stated response-time commitment near the form ("same-day response on weekdays").
- [ ] Attorney–client disclaimer present on the contact form.
- [ ] No banned fonts; embedded faces declared with an explicit non-Inter fallback tier.
- [ ] All text pairs meet WCAG AA against the warm off-white surface.
- [ ] No gavel/scales/stock-courtroom imagery; real office or restrained illustration only.
- [ ] One dedicated page per practice area — divorce/custody is *not* merged with other areas.

---

## 5. Why this is not slop

A templated build would open with "Welcome to [Firm], established 2009," drop a navy hero with
a gavel photo, set everything in Inter, and bury the phone number. This screen instead leads
with the parent's fear, uses a deliberately non-default teal/clay palette and an Alegreya/Source
Sans pairing, sequences reassurance → process → authority → action, and treats the bar's
advertising and disclaimer rules as design requirements rather than afterthoughts. That is the
difference between a page that reads as *authored for a frightened parent* and one that reads
as *generated*.
