---
name: fintech-and-financial-product-ui
description: Use when a banking, wallet, remittance, mobile-money, lending, transfer, balance, transaction, statement, fee, or payment-confirmation interface must prevent costly mistakes and build trust. Do not use for accounting rules or backend payment architecture; consult those domain engines separately.
metadata:
  portable: true
  category: 06-sector-and-domain-ux
  compatible_with:
  - claude-code
  - codex
---

# Fintech & Financial-Product UI

Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

Money UI is different from ordinary product UI: a mistake costs the user real money, a vague
fee reads as a scam, and a misaligned figure reads as a bug. This skill is the craft layer for
screens that move, display, or reconcile money — and the discipline for doing it without
collapsing into the convergent fintech look (cool blue/teal, gradient cards, glassmorphism).

<!-- dual-compat-start -->
## Use When
- Designing a **transfer / send-money / transaction** flow: amount entry, recipient, review,
  confirm, status, receipt.
- Displaying **balances, statements, or transaction history** — including running balance,
  pending vs. cleared, and multi-currency.
- Building **trust & security cues**: regulatory licence display, encryption/auth signals,
  fraud warnings, named recourse.
- Showing **regulatory disclosure**: fees, FX margin, APR/EAR, terms a regulator requires
  in-line (FCA, Bank of Uganda, EU, etc.).
- Formatting **money and numbers**: tabular figures, currency symbols/codes, grouping,
  negative/credit conventions, rounding.
- Adding **error-prevention, confirmation, undo, and status** to any money action.
- Adapting any of the above to **East-African mobile money** (M-Pesa, Airtel Money, MTN MoMo):
  phone-number recipients, agent/till/paybill, USSD parity, low-bandwidth.

## Do Not Use When
- The work is a generic SaaS dashboard or marketing page with no money action →
  `04-web-and-ui-design/*` and `12-data-viz-and-dashboards/*`.
- You only need a sector *brand/positioning* strategy, not screen-level money craft →
  `06-sector-and-domain-ux/sector-strategies` (its worked example is a fintech brand; pair with it).
- The numbers are analytical/statistical rather than transactional money →
  `12-data-viz-and-dashboards/*`.
- The accounting *meaning* of the figures (debits/credits, IFRS) is the question, not the UI →
  the finance engine (`chwezi-accounting-doctrine`; resolve its checkout through the current workspace map).

## Required Inputs

| Input | Source | Evidence |
|---|---|---|
| Money movement, ledger, status, and limit rules | Finance doctrine, product, and API contracts | Currency, precision, fees, limits, timestamps, and state machine |
| Identity, fraud, disclosure, and approval rules | Risk, legal, and compliance owners | Verified jurisdiction, consent, authentication, and escalation requirements |
| User contexts and supported channels | Research and operations | Personas, devices, connectivity, accessibility, and support paths |
- The **money action(s)** the screen owns (view / transfer / pay / withdraw / reconcile) and
  who bears the loss if it goes wrong.
- **Currencies** in play (single or multi), their ISO codes, decimal places, and symbol position.
- **Regulatory context**: which regulator(s), what must be disclosed in-line, what the
  reversibility rules are (can this transfer be cancelled / undone?).
- **Channel & audience**: smartphone app, web, USSD-parity, bandwidth, language(s), numeracy.
- A **trust threat model**: what makes *this* user fear fraud, and what they check before paying.

## Workflow
1. **Classify the action by reversibility and blast radius.** Irreversible + high-value (a real
   transfer to a stranger) earns the strictest treatment: explicit review step, typed/re-confirmed
   amount, and no auto-submit. Reversible/low-value can be lighter. See
   `references/money-ux-patterns.md` §Error-prevention.
2. **Design the number system first.** Choose a typeface with **true tabular lining figures** so
   every amount aligns in a column; fix currency display (symbol vs. ISO code, position, decimals);
   decide negative/credit convention. This is a hard requirement, not polish — misaligned money is
   the #1 "this is broken" tell. See `references/money-ux-patterns.md` §Number & currency.
3. **Make fees and FX visible before commitment.** Every cost a regulator (or honesty) requires —
   fee, FX margin, total debited, amount received — shown as line items on the **review** step,
   before the irreversible tap, never only in T&Cs. See §Regulatory disclosure.
4. **Build the review → confirm → status spine.** Amount-entry → **review** (recipient, fee,
   arrival time restated) → **confirm** (deliberate, single, labelled action) → **status**
   (in-progress, succeeded, failed — each distinct, each with a receipt/reference). See
   §Confirmation, undo & status.
5. **Place trust & security cues where the decision happens** — licence number and arrival time on
   the transfer screen itself, not only the footer; named/ reachable support; provenance on social
   proof. See §Trust & security cues.
6. **Add undo / cancel where the rails allow it,** and an honest "cannot be reversed" statement
   where they don't — never imply reversibility that doesn't exist.
7. **Certify accessibility.** Contrast ≥4.5:1 for amounts and disclosure text; targets ≥24×24 CSS
   px (aim 44/48 on touch); status conveyed by **text + icon**, never colour alone (a red/green-only
   "failed/succeeded" fails colour-blind users and `1.4.1`/`1.4.3`). Honour `3.3.4` Error
   Prevention for financial data. Cite `doctrine/references/wcag-2.2-criteria.md`.
8. **State the anti-slop choice before building** (per the Anti-Slop Charter): name the typeface
   pairing and palette intent, and explicitly say how it avoids the default fintech blue/teal/
   gradient skin. Reuse the anti-homogeneity discipline from the sibling `sector-strategies`.

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Transfer is not yet irrevocable | Review screen with recipient, amount, fee, rate, and total | One-tap commitment magnifies slips and recipient errors |
| Provider status is pending/unknown | Durable pending state and status lookup | Showing success early creates false financial assurance |
| Currency or fee basis differs | Label every amount and disclose conversion basis | Ambiguous numbers cause material loss and disputes |
| Reversal is possible | Offer truthful cancel/reverse path with deadline | Generic undo promises recovery the system cannot deliver |

## Capability Contract

- Must inspect authoritative finance/API/compliance contracts; design review is read-only unless remediation is requested.
- May edit/test in-scope UI with synthetic data. Do not move real money, expose financial data, change limits/disclosures, or claim regulatory approval without authority.

## Degraded Mode

- If currency, fee, status, reversal, jurisdiction, or approval rules are unknown, stop the affected flow and return blockers.
- Without a transaction sandbox, produce a synthetic state matrix marked unverified. Recover failures by preserving reference/status, preventing duplicate submission, and presenting the authorised support/escalation path.

## Quality Standards

- Every amount has currency, sign, precision, fee/exchange context, and a stable transaction status/reference.
- Evidence covers confirmation, authentication, pending/failure, duplicate prevention, statement formatting, accessibility, and support recovery.

## Anti-Patterns
- **Convergent fintech slop** — cool-blue/teal primary, purple-to-blue gradient cards,
  glassmorphism, neon glow, isometric coin blobs. The whole field looks identical; copying it
  *lowers* trust for a burned audience. (See `sector-strategies/ANTI-HOMOGENEITY-PRINCIPLE.md`.)
- **Proportional figures for money** — amounts that don't column-align because the font lacks
  tabular figures. Reads as broken.
- **Hidden fees / FX margin** — cost revealed only after commitment or buried in terms. Both a
  trust killer and, in most jurisdictions, a disclosure breach.
- **Colour-only status** — green dot = sent, red dot = failed, with no text/icon. Fails a11y and
  is ambiguous under glare (common on cheap phones in sunlight).
- **One-tap irreversible send** — no review step, autofocus-submit, or a "Send" button that fires
  on the amount screen. Money actions need a deliberate gap.
- **Fake undo** — a "cancel" affordance on a transfer the rails already settled. Never imply
  reversibility that doesn't exist; state irreversibility plainly instead.
- **Banned fonts** — Inter, Roboto, Geist, Arial, Space Grotesk et al. (`ai-slop-banned-fonts.md`).
  Especially tempting in fintech because incumbents use them; that is exactly why to refuse.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Financial interaction specification | Product, finance, risk, engineering | Amount, fee, recipient, status, approval, disclosure, and recovery rules are explicit |
| Fintech UI gate | Compliance, operations, accessibility QA | Synthetic journeys verify no ambiguous commitment, false success, or unsafe retry |
- A screen/flow spec for a money action with: number-format rules, fee/FX disclosure placement,
  review→confirm→status spine, trust cues, undo/irreversibility statement, and a stated palette/
  type direction that avoids the convergent look.
- Component-level rules a developer can implement directly (tabular figures, status component,
  confirm pattern).

## Examples
- `examples/send-money-screen-spec.md` — a fully worked transfer/transaction screen spec in an
  East-African mobile-money context (send to an M-Pesa number), end to end: number formatting,
  fee/FX disclosure, review/confirm/undo/status, trust cues, a11y, and the anti-homogeneity move.
  Never lorem; re-derive specifics per client.

## References
- `references/money-ux-patterns.md` — the canonical money-UX rules this skill owns:
  transactions/transfers, statements/balances, trust & security cues, regulatory disclosure,
  number/currency formatting (tabular), error-prevention, confirmation/undo, and status.
- `doctrine/design-doctrine.md` — Mission ("the moat is looking human-made") and the Anti-Slop
  Charter; state the type/palette choice before building.
- `doctrine/references/wcag-2.2-criteria.md` — the accessibility floor: contrast, target size
  (2.5.8), colour-not-alone (1.4.1), focus, and Error Prevention for financial data (3.3.4).
- `doctrine/references/ai-slop-banned-fonts.md` — fonts forbidden as primary faces.
- Sibling `06-sector-and-domain-ux/sector-strategies` (`ANTI-HOMOGENEITY-PRINCIPLE.md` + its
  fintech worked example) — pair with this skill; reuse the "refuse the fintech blue" discipline.
Trust-surface rule: audit the threat model across account opening, permissions,
fees/FX, confirmation, pending/failure, statements, support, and data controls.
Trust cues must expose useful control and consequence, not merely decorate the
screen. When a user decides whether to disclose data or authorise access, state
purpose, scope, consequence, and recovery/support at that decision point.

Practitioner cross-check: [Eleken banking-app trust guide](https://www.eleken.co/blog-posts/banking-app-design). Use for trust-threat questions and placement prompts; route regulatory, security, and financial conclusions to authoritative sources and the finance engine.

<!-- dual-compat-end -->
