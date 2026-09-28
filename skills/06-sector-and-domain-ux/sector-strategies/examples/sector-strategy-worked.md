---
title: Worked Sector Strategy — Fintech (Cross-Border Payments App)
sector: fintech
status: example
note: One fully reasoned sector strategy, end to end. Illustrates the workflow in SKILL.md and the constraint in ANTI-HOMOGENEITY-PRINCIPLE.md. Numbers and names below are an illustrative brief, not prescriptive defaults — re-derive them per client.
---

# Worked Sector Strategy: Fintech

A single, concrete design strategy for one named brand so the reasoning is visible end to end:
trust cues → visual direction → content priorities → the one anti-homogeneity move that keeps it
from looking like every other fintech.

## The brief (illustrative)

**Brand:** Lumira — a cross-border payments app moving money between East Africa and the diaspora
(Nairobi/Kampala ↔ London, Toronto, Dubai). Audience: working diaspora senders, 28–55, sending
£100–£800 monthly to family. They are price-sensitive, burned by hidden FX margins, and check
"is this a scam?" before "is this pretty?".

**Competitive field they must NOT blend into:** Wise (teal + bright, geometric), Remitly (blue +
photography of families), Revolut (black + neon gradients), every neobank that ships purple-to-blue
gradients on white cards. If Lumira looks like any of these, it reads as a clone — lower trust, not
higher.

## 1. Trust cues (fintech earns the click before it earns the transfer)

In money apps, trust *is* the conversion funnel. Rank the cues by what this audience actually checks:

| Cue | How it shows up on Lumira | Why it matters here |
|-----|---------------------------|---------------------|
| **Regulatory proof** | FCA / Bank of Uganda licence numbers in the footer and on the transfer screen, not buried in T&Cs | Diaspora senders explicitly look for "is it licensed in both countries" |
| **Transparent FX** | Live mid-market rate + Lumira's margin shown as a line item *before* sign-up | The entire wedge against incumbents is "no hidden margin" — hiding it kills it |
| **Real delivery time** | "Arrives in M-Pesa in ~4 min" with a real countdown, not "fast transfers" | Recipients are waiting; vague speed claims read as evasive |
| **Named human recourse** | Support shown as named agents + WhatsApp number, local-language | Scam fear drops when there is a face and a reachable channel |
| **Social proof with provenance** | Reviews tagged with corridor ("London → Kampala, £300") | Generic 5-star walls feel manufactured; corridor-specific feels real |

The trust cues are *content commitments*, not decoration — they decide layout order in section 3.

## 2. Visual / aesthetic direction

The strategic problem: fintech has converged on cool blues, teals, and gradient cards. Lumira's
audience associates that exact palette with the incumbents who overcharged them. So the direction
leans **warm, grounded, and plainspoken** — closer to a trusted local agent than a Silicon Valley app.

- **Palette:** deep clay-brown primary (`#6B3F2E`) with a warm ivory ground (`#F7F1E8`); a single
  decisive signal-green for "money arrived / on its way" (`#1F7A4D`, used only on confirmation and
  the rate line). No blue as a brand color — blue appears only as a muted info state. This is the
  load-bearing differentiation choice (see section 4).
- **Type:** a confident humanist serif for headlines (**Alegreya** at display weight) paired with a
  clear grotesque for numbers and body (**Hanken Grotesk**, an approved workhorse with true tabular
  figures). The serif signals "established, written by people," the grotesk keeps figures legible and
  tabular. Numbers use tabular lining so rates and amounts align in columns. **Not** Inter, Roboto,
  Arial, or Space Grotesk — those read as default-fintech / AI-escape slop.
- **Shape language:** soft-but-flat. Slight 8px radius, no glassmorphism, no neon glow, no gradient
  fills. Money UI should feel like a printed receipt you can trust, not a casino.
- **Imagery:** real corridor photography — a mother in Kampala checking her phone, a London kitchen
  table — shot warm and undirected. No abstract 3D coins, no isometric blobs.
- **Motion:** restrained. The only celebratory moment is the transfer-confirmed checkmark; everything
  else is instant and quiet, because hesitation in money apps reads as a glitch.

## 3. Content priorities (order = trust order from section 1)

Above the fold, in this order:

1. **The promise + the proof in one breath:** "Send to M-Pesa in 4 minutes. See our rate before you
   sign up." with the live rate widget *right there*.
2. **The rate calculator** — sender amount → recipient amount, with Lumira's margin shown as its own
   line. This is the hero, not a feature buried below.
3. **Licence + delivery-time strip** — regulator names, corridors served, typical arrival time.
4. **Corridor-tagged reviews.**
5. **Named support + local-language channels.**

De-prioritized (these are table stakes, not differentiators here): feature-grid marketing, app-store
badges as hero elements, founder-story long copy, and decorative illustration sections.

## 4. The anti-homogeneity move

> **Refuse the fintech blue and lead with the rate as the hero, in a warm "local agent" skin.**

Every competitor in section's field signals trust through *cool, corporate, tech-forward* cues —
the very aesthetic this audience associates with being overcharged. Lumira inverts it: the trust
signal is warmth and radical price transparency, dressed like a person you'd hand cash to, not a bank.

Concretely, the one move is: **clay-brown + ivory + serif headline, with the FX margin shown as a
visible line item in the hero.** A competitor could copy the calculator; they cannot copy the
calculator *and* the warm anti-fintech skin without abandoning their own brand. That pairing — not
any single token — is the moat.

Why this satisfies the principle: per `ANTI-HOMOGENEITY-PRINCIPLE.md`, the sector template informs
but never dictates. The fintech "default" (blue, teal, gradient, geometric) was identified and then
*deliberately not occupied*. The differentiation is derived from this client's audience pain (hidden
FX, scam fear), so a second fintech built with this skill would land somewhere else entirely.

## Verification check

- Can you tell Lumira apart from Wise/Remitly at a glance? Yes — warm clay + serif vs. cool teal/blue + grotesque.
- Is the differentiation arbitrary or earned? Earned — every choice traces to a trust cue in section 1.
- Any banned defaults? No Inter/Roboto/Arial; no purple/blue gradient on white cards; no SaaS glassmorphism.
- Would the same skill produce this exact look for a *different* fintech? No — it's bound to this brief's audience pain.
