---
title: Worked Screen Spec — Send Money to an M-Pesa Number
context: East-African mobile money (illustrative brand "Sente")
status: example
note: One fully worked transfer flow, end to end. Figures, fees, and brand are an illustrative brief, not prescriptive defaults — re-derive per client and per the live regulator fee table. Demonstrates the workflow in SKILL.md and the rules in references/money-ux-patterns.md.
---

# Worked Screen Spec: Send Money to an M-Pesa Number

A concrete, implementable spec for one money action so the reasoning is visible end to end:
number formatting → fee/FX disclosure → review/confirm → status/undo → trust cues → a11y → the
single anti-homogeneity move.

## The brief (illustrative)

**Product:** *Sente* — a Kampala-based wallet app that lets a user send Ugandan shillings to a
Kenyan **M-Pesa** number (cross-border, UGX → KES). Audience: small cross-border traders, 25–50,
on mid-range Android phones, often outdoors in bright sun, switching between English, Luganda and
Swahili. They have been burned by hidden FX margins and fear sending to a wrong number.

**Regulators in play:** Bank of Uganda (sender side), Central Bank of Kenya (recipient rail).
Both licence numbers must be visible at the decision point.

**Reversibility:** the M-Pesa leg settles instantly → **irreversible** once confirmed. There is a
short pre-send hold *inside Sente only* (before it hits the rail), so a real 8-second Undo is
possible up to confirmation submit, not after.

## Stated design choice (Anti-Slop Charter, before building)

- **Type:** **Alegreya** (Huerta Tipográfica humanist, calligraphic serif, display weight) for the primary amount and screen title
  — signals "written by people, established" — paired with **Hanken Grotesk** for body, labels and
  all figures, because it ships **true tabular lining figures** (`tnum`) so amounts column-align.
  Explicitly **not** Inter / Roboto / Geist / Space Grotesk (`ai-slop-banned-fonts.md`).
- **Palette intent:** warm and grounded — deep terracotta primary (`#9A4A2F`) on a warm sand ground
  (`#F6EFE4`), with **one** decisive signal-green (`#1E7A4A`) reserved only for "sent / on its way".
  No fintech blue/teal, no purple→blue gradient, no glassmorphism.
- This is the anti-homogeneity move (see end): refuse the cool corporate fintech skin the
  incumbents share; dress the flow like a trusted local agent and lead with cost transparency.

---

## Screen 1 — Amount & recipient

Layout (top → bottom):
- **Title:** "Send to M-Pesa" (Alegreya).
- **Recipient field:** Kenyan MSISDN input, formatted live as `+254 7XX XXX XXX`. On a valid number,
  **echo the registered name back**: "Sending to **JANE W.**" (catches a wrong number — the user's
  top fear). If the name can't be resolved, say so plainly and require a confirm tick.
- **Amount field:** large, Alegreya, lining tabular figures (`lnum` + `tnum`; confirm in the specimen). User enters in **UGX** (their currency).
  - Below it, live: **"Jane receives ≈ KES 1,200"** with the rate shown to 4 dp.
- **No submit/auto-advance here.** A single "Review" button, disabled until recipient is valid and
  amount is within balance + limits, with the reason shown when disabled
  ("Enter an amount up to your UGX 850,000 available balance").
- **Available balance** shown explicitly and labelled (distinct from any pending), tabular,
  right-aligned: `Available  UGX 850,000`.

Number rules applied: UGX displays **0 decimals** (whole shillings), KES **2 decimals** at the rate
line but the received amount rounds to the minor unit M-Pesa actually credits; ISO codes used
(`UGX`, `KES`) because two currencies are in play; grouping `1,200` / `850,000`.

## Screen 2 — Review (the last editable point, all cost disclosed)

A receipt-like card (flat, 8px radius, no gradient). Every line tabular and right-aligned:

```
Recipient            JANE W.  ·  +254 712 345 678
You send             UGX  185,000
Our fee              UGX    2,500
FX margin            UGX    1,480        rate 1 KES = 153.6210 UGX
─────────────────────────────────────
Total debited        UGX  188,980
Jane receives        KES    1,200
Arrives              ~ in M-Pesa within 2 min
```

- **Fee, FX margin, total debited, and received amount are line items here** — before the
  irreversible tap, never only in T&Cs (WCAG `3.3.4`; disclosure rule, `money-ux-patterns.md` §4).
- The FX margin is shown as its own line, not folded into the rate — that transparency is the wedge
  against incumbents and the audience's specific pain.
- **Edit** affordance returns to Screen 1. This is the last fully-editable point.
- **Irreversibility statement, plain:** "Once you confirm, this transfer **cannot be reversed**."
  (Honest — the rail settles instantly.)
- **Trust strip at the decision point:** "Licensed by Bank of Uganda (No. …) · partnered rail
  regulated by CBK" — on this screen, not just the footer (§3).

## Screen 3 — Confirm

- One deliberate, specific primary action: **"Send UGX 188,980 → KES 1,200 to JANE W."** (not a
  generic "Confirm"). Restates the consequential values (`3.3.4` confirmed).
- **Second factor here:** PIN or biometric, because this is high-value + irreversible.
- After the tap, an **8-second Undo** appears with a visible countdown ("Sending in 8… Undo"),
  because the only real cancel window is *before* Sente releases to the rail. After it hits M-Pesa,
  no cancel is offered (no fake undo — §6).

## Screen 4 — Status

Three distinct, **text + icon** states (never colour-only — §6, WCAG `1.4.1`; must survive sun glare):
- **Pending:** progress indicator + "Sending to M-Pesa…".
- **Succeeded:** checkmark **+ text** — "Sent · KES 1,200 to JANE W. · Ref **SEN8K2QD**", with a
  **View receipt** link and **Send again**. Signal-green used here and only here.
- **Failed:** clear error icon **+ text** + reason ("Recipient rail timed out") + **explicit money
  statement** ("Your UGX 188,980 was **not** debited") + **Retry** and **Contact support** (named
  WhatsApp + local-language line).

The transaction then appears in **history** as a tappable row: counterparty, date/time, amount
(tabular, right-aligned, `− UGX 188,980` with the agreed debit convention), status, running
balance. Pending vs. cleared distinguished by label, not colour.

---

## Accessibility certification (against `wcag-2.2-criteria.md`)

- Amount, fee lines, and disclosure text all ≥ **4.5:1** on the sand ground; the big amount ≥ 3:1
  qualifies as large text at display size but we hold it to 4.5:1 anyway.
- All tap targets ≥ **24×24 CSS px**, primary actions sized to **48dp** (Material) for thumb use
  outdoors.
- Status conveyed by **icon + text**, never colour alone (`1.4.1`).
- Financial submit is **confirmed + checked + (briefly) reversible** — satisfies `3.3.4`.
- Recipient name not re-entered across steps (`3.3.7` Redundant Entry); PIN auth has a non-puzzle
  path (`3.3.8`).
- Focus order logical; focused field never hidden behind the sticky trust strip (`2.4.11`).
- Usable at 320px width / 200% zoom; honours `prefers-reduced-motion` (the only motion is the
  confirm countdown and the success check).

## The anti-homogeneity move

> **Refuse the fintech blue/teal; lead with the FX margin as a visible line item, in a warm
> "local agent" skin with a serif amount.**

Every cross-border incumbent the audience knows signals trust through cool, corporate, tech-forward
cues — the exact aesthetic they associate with being overcharged. Sente inverts it: terracotta +
sand + Alegreya serif, with the margin shown openly. A competitor can copy the calculator; they
can't copy the calculator **and** the warm anti-fintech skin without abandoning their own brand.
Per `ANTI-HOMOGENEITY-PRINCIPLE.md`, the sector default was named and then deliberately not
occupied, and the differentiation is bound to *this* audience's pain — so a second wallet built
with this skill would land somewhere else entirely.

## Verification check

- Tell it apart from incumbents at a glance? Yes — warm terracotta + serif vs. cool blue + grotesque.
- Earned, not arbitrary? Yes — every choice traces to a stated trust fear (wrong number, hidden FX).
- Any banned defaults? No Inter/Roboto/Geist/Space Grotesk; no blue/teal/gradient/glassmorphism.
- Figures column-aligned (tabular)? Yes — Hanken Grotesk `tnum` on every amount.
- All cost disclosed before the irreversible tap? Yes — fee, FX margin, total, received, on Review.
- Status colour-independent? Yes — icon + text on every state.
