# Reference: Money-UX Patterns

The canonical rules for screens that move, display, or reconcile money. Cited by the
`fintech-and-financial-product-ui` SKILL. Accessibility figures trace to
`doctrine/references/wcag-2.2-criteria.md`; the anti-convergence stance traces to
`doctrine/design-doctrine.md` (Anti-Slop Charter) and the sibling
`sector-strategies/ANTI-HOMOGENEITY-PRINCIPLE.md`.

Governing idea: **a mistake here costs the user real money.** Every pattern below trades a small
amount of friction for a large reduction in irreversible harm and in the perception of fraud.

---

## 1. Number & currency formatting (the foundation — do this first)

Misformatted money is the single fastest way to read as broken or untrustworthy. Fix the number
system before any visual styling.

### Tabular figures are mandatory
- Use a typeface with **true tabular lining figures** (every digit the same advance width) for all
  amounts, rates, balances, and statement columns, so figures align vertically in a column.
  Proportional figures (where `1` is narrower than `8`) break column alignment and read as a bug.
- Enable with `font-feature-settings: "tnum" 1;` (and `"lnum" 1;` for lining) or
  `font-variant-numeric: tabular-nums lining-nums;`. Confirm the chosen face actually ships `tnum`.
- Approved faces with genuine tabular figures include workhorse grotesques such as **Hanken
  Grotesk** and **Public Sans**, and technical/data faces like **JetBrains Mono** / **Fira Code**
  for dense ledgers. **Never** Inter/Roboto/Geist/Arial/Space Grotesk as the primary face
  (`ai-slop-banned-fonts.md`) — even though incumbents reach for them.

### Currency display
- **Symbol vs. ISO code:** when one currency is unambiguous, a symbol is fine (`KSh 1,200`). When
  multiple currencies or any ambiguity exists (USD vs. CAD vs. AUD `$`; or local vs. foreign), show
  the **ISO 4217 code** (`USD 50.00`, `UGX 185,000`, `KES 1,200`). For cross-border, always code.
- **Symbol position & spacing** follow the locale, not a global default: `£100`, `100 kr`,
  `KSh 1,200`. Don't hardcode a leading `$`.
- **Decimal places** follow the currency's minor unit: 2 for USD/GBP/EUR/KES/UGX-cents contexts,
  **0** for currencies/contexts with no minor unit in practice (many UGX displays round to whole
  shillings). Never show `UGX 185,000.00` if shillings aren't transacted in cents here.
- **Grouping separators** follow locale (`1,234.56` vs `1.234,56` vs `1 234,56`). Be consistent in
  a single product; do not mix.

### Sign & emphasis conventions
- Decide and apply **one** convention for money in/out: e.g. credits plain (`+ KES 1,200` or just
  `1,200`), debits with a leading minus and a muted/red-but-not-only treatment (`− KES 1,200`).
  Never rely on colour alone to mark a debit (see §6, WCAG `1.4.1`).
- Right-align amount columns so decimal points line up. Left-align labels.
- The **primary amount** (what the user is about to send / what just moved) is the largest,
  highest-contrast element on the screen — but still ≥4.5:1, and big-number ≥3:1 only counts as
  "large text" at ≥24px / ≥18.66px bold.

### Rounding & precision
- Compute in minor units (integers/cents) internally; never accumulate float money. Display the
  rounded figure but disclose if rounding occurred on FX (see §4).
- Show the **rate to enough precision** that recipient amount reconciles (FX often needs 4+ dp on
  the rate even if amounts show 2).

---

## 2. Transactions, transfers & history

### The transfer spine: amount → review → confirm → status
Every value-moving flow has four distinct moments. Do not collapse them:
1. **Amount & recipient entry** — large amount field, recipient (number/account/agent), purpose if
   required. No submit here.
2. **Review** — restate recipient, amount, **all fees and FX as line items**, total debited,
   amount received, expected arrival time. This is the last fully-editable point. (§4, §5)
3. **Confirm** — a single, deliberate, clearly-labelled action ("Send KES 1,200 to 0712…"), not a
   generic "Next". For high-value/irreversible, add a second factor (PIN/biometric) here. (§5)
4. **Status** — in-progress, succeeded, or failed, each visually distinct, each with a reference
   number and a path to a receipt. (§7)

### Transaction history / list
- Each row: counterparty, date/time, **amount right-aligned & tabular**, status, running balance
  where meaningful. Pending vs. cleared visibly distinct (text label, not colour alone).
- Group by date; show running balance for statements. Make every row tappable to a full receipt
  with the reference number.
- Searchable/filterable by counterparty, date range, amount, status, and (for mobile money)
  channel (send / receive / withdraw / pay bill / buy airtime).

### Statements & balances
- Distinguish **available balance** from **current/ledger balance** and from **pending** — these
  differ and conflating them causes overdrafts and support tickets. Label each explicitly.
- Statements: opening balance → dated rows with running balance → closing balance; columns align
  (tabular). Provide a downloadable/printable version (receipts are a trust artifact).
- Never show a single ambiguous "Balance" number when holds/pending exist.

---

## 3. Trust & security cues (in money UI, trust *is* the funnel)

Place cues **where the decision happens**, not only in the footer.
- **Regulatory proof:** licence/registration number(s) of the actual regulator(s) — e.g. FCA,
  Bank of Uganda, Central Bank of Kenya — visible on the transfer/review screen, not buried in
  T&Cs. For cross-border, show both ends.
- **Security signals that are real:** session lock, biometric/PIN on sensitive actions, "we never
  ask for your PIN" anti-phishing line, device/session management. Avoid theatre (a padlock icon
  alone proves nothing).
- **Named, reachable recourse:** support as a named channel (in-app, WhatsApp, local-language
  phone) — scam fear drops when there is a face and a real channel.
- **Provenance on social proof:** reviews/ratings tagged with context (corridor, amount band) read
  as real; generic 5-star walls read as manufactured.
- **No dark patterns:** pre-ticked add-ons, disguised fees, or urgency timers on money actions
  destroy trust and often breach conduct rules.

---

## 4. Regulatory disclosure

- **Disclose cost before commitment.** Fee, FX margin, total debited, amount received, and any tax
  must appear as **line items on the review step**, before the irreversible action — never only in
  terms. Hiding the FX margin is both the classic trust-killer and, in most jurisdictions, a
  breach.
- **APR/EAR & lending:** where credit is offered, the representative APR/EAR and total repayable
  must be shown with the prominence the regulator mandates, near the borrow action.
- **Required statements:** "transfers cannot be reversed once sent", deposit-protection/non-
  protection statements, and risk warnings appear in plain language at the decision point, at
  ≥4.5:1 contrast (no greyed-out 2:1 fine print — that can itself be a disclosure failure).
- **Receipts/references:** every completed money movement yields a unique reference and a receipt
  the user can retrieve — a regulatory and trust expectation.

---

## 5. Error-prevention & confirmation (WCAG 3.3.4)

WCAG 2.2 `3.3.4 Error Prevention (Legal, Financial, Data)` requires that for financial
transactions, submissions are **reversible, checked, or confirmed**. Implement at least one,
prefer confirmation + check:
- **Reversible:** a true cancel window where the rails allow it (see §6).
- **Checked:** validate recipient, amount within limits/balance, format, and surface a clear
  inline error *before* submit (e.g. "You're sending more than your available balance").
- **Confirmed:** the explicit review→confirm gap; restate the consequential values on confirm.

Further prevention:
- **No auto-submit / no submit-on-enter** for value-moving forms.
- **Validate the recipient**: echo the recipient's registered name back ("Sending to JOHN O.") so
  the user catches a wrong number — critical in mobile money where a typo sends to a stranger.
- **Amount sanity checks**: warn on unusually large amounts, amounts above limits, or a new
  recipient + large amount combo (common fraud shape).
- **Disable the primary button** until the form is valid, but explain *why* it's disabled.

---

## 6. Confirmation, undo & status

### Undo / cancel — only where it's real
- If the rails allow a hold/cancel window (some bank transfers, scheduled payments), offer an
  explicit **Undo** for a stated period with a visible countdown. This is the gentlest error
  recovery and satisfies `3.3.4` (reversible).
- If the movement is **irreversible** (most mobile-money sends settle instantly), say so plainly at
  the confirm step — never render a "cancel" affordance that can't actually cancel. A fake undo is
  worse than none.

### Status — distinct, text+icon, never colour-only
- Three minimum states, each visually and textually distinct:
  - **In progress / pending** — spinner or progress, "Sending…", optionally an ETA.
  - **Succeeded** — checkmark **+ text** ("Sent — KES 1,200 to 0712… · Ref AB12CD"), receipt link.
  - **Failed** — clear icon **+ text** + reason + a retry/recourse path, and an explicit statement
    of whether money left the account.
- Never green-dot/red-dot alone (WCAG `1.4.1` Use of Color). Status must survive greyscale and
  sunlight glare on a cheap screen.
- For async settlement, keep the status truthful as it updates (pending → settled / reversed); push
  a notification on resolution.

---

## 7. East-African mobile-money context (M-Pesa / Airtel Money / MTN MoMo)

- **Recipient is a phone number** (or till/paybill/agent), not an account/IBAN. Echo back the
  registered name; format the MSISDN clearly (`+254 712 345 678`).
- **Channel types** to model: send to number, send to agent/till, pay bill (paybill + account),
  buy airtime/data, withdraw at agent, receive. Each has distinct fees and confirmation copy.
- **Fee tables are tiered by amount band** and regulator-published — show the *actual fee for this
  amount*, not "fees may apply".
- **USSD parity & low bandwidth:** many users run the same action over USSD on a feature phone.
  Keep flows shallow, copy short, and never depend on heavy assets; the smartphone UI should mirror
  the USSD mental model (numbered steps, terse confirmation).
- **Sunlight & cheap screens:** high contrast and text+icon status are not optional here — colour-
  only states are unreadable in glare.
- **Language & numeracy:** offer local language (e.g. Swahili, Luganda) and avoid jargon; spell out
  the amount in the confirm copy ("Send KES 1,200").

---

## 8. The anti-homogeneity rule for fintech (reuse the sibling principle)

Per `sector-strategies/ANTI-HOMOGENEITY-PRINCIPLE.md` and the Anti-Slop Charter: the fintech field
has converged on **cool blue/teal, purple-to-blue gradient cards, glassmorphism, neon glow, and
isometric coin imagery**. For an audience burned by incumbents, that aesthetic signals "the people
who overcharged me" — copying it lowers trust.

- **Identify the default, then deliberately do not occupy it.** Name the competitors' shared skin;
  pick visual territory they don't hold.
- **State the type + palette choice before building** (Charter rule). Choose a distinctive,
  human-justified pairing with tabular figures — never Inter/Roboto/Geist/Space Grotesk.
- **Warmth and radical transparency can be the differentiator**, not a cooler blue. The one
  load-bearing move (palette + a transparency-of-cost commitment together) is the moat; a single
  token isn't.
- Two products built with this skill should not look alike — differentiation is derived from *this*
  audience's specific trust fears, so it lands somewhere unique each time.
