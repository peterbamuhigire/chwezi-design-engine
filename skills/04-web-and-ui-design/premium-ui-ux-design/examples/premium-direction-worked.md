# Worked Example — Premium UI/UX Direction for One SaaS Screen

A single, concrete direction for one screen so the reasoning is auditable, not abstract.
Product: **Ledgerline**, a B2B accounts-receivable platform for finance teams.
Screen: the **Collections workspace** — the daily screen where a credit controller
sees which invoices are overdue, how much cash is at risk, and what to chase next.
Buyer: a CFO paying ~$1,200/seat/year. The screen has to read as a trusted system of
record, not a dashboard template.

---

## 1. Visual voice (stated, not implied)

**Restrained enterprise, edging toward editorial.** The voice is "a competent colleague
who has already done the math." Calm, dense where it must be, generous around the one
number that matters. No celebration, no gamification, no playful illustration — this is
someone's cash position. The screen earns trust by being legible and unsurprising, then
earns admiration by being unusually quiet and well-spaced for a finance tool.

One distinctive commitment: **the page is organised around a single "at risk" figure**,
treated almost like a magazine pull-quote, with everything else demoted to support it.
That editorial demotion is the idea that keeps it from looking like a generic KPI grid.

## 2. Colour logic — dominant / subordinate / accent

- **Dominant (≈70%) — near-neutral ground.** A cool off-white canvas (`#F7F8FA`) with
  ink-grey text (`#1C2230`). Surfaces are white with a single hairline border, not shadow
  stacks. The neutral does the heavy lifting so data can speak.
- **Subordinate (≈22%) — one brand hue used structurally.** A deep slate-teal (`#12414B`)
  for the primary nav rail, the active row marker, and the one primary button. It signals
  "this is Ledgerline" and marks the spine of the layout — never used decoratively.
- **Accent (≈8%) — status, spent sparingly.** A single amber (`#B26A00`) for "overdue,
  needs action" and a muted red (`#9B2C2C`) reserved strictly for "in dispute / escalated."
  Positive/paid uses no green fill — just ink text with a small filled dot, so the eye
  isn't pulled to the resolved rows. Colour is rationed: if everything is coloured, the
  one at-risk figure stops being loud.

Rationale: status colour is the only saturated colour on screen, so it reads as *meaning*,
not garnish. The brand hue is load-bearing (navigation + primary action), which is why the
product feels branded without a single logo splash.

## 3. Typography roles

Type families: **Source Serif 4** for the hero figure and section labels (editorial weight),
**Public Sans** for all UI, data, and dense tables (`font-variant-numeric: tabular-nums`) — plain,
rational, with tabular figures that pair cleanly under the Source Serif 4 hero. (Never Inter/Geist, no Poppins, no
Montserrat, no system-default sans masquerading as a choice.)

- **Hero figure** — Source Serif 4, ~44px, tabular figures: the "$418,200 at risk" number.
  The serif on one number is the whole premium signal; it says "read this first."
- **Section label** — Source Serif 4, 13px, tracked +4%, uppercase: "Collections", "Aging".
- **Table data** — Inter 14px, **tabular/lining numerals** so columns of money align to the
  decimal. This is non-negotiable for a finance tool; proportional digits look amateur.
- **Row primary (customer name)** — Inter 14px medium.
- **Meta / secondary** — Inter 13px at 64% ink for due-dates and invoice IDs.
- **Numbers always right-aligned; labels left-aligned.** Money never centred.

## 4. Imagery rules

**Near-zero photography.** No stock office handshakes, no abstract gradient meshes. The only
"imagery" is functional: monogram avatars for customers (initials on a tinted neutral chip,
never coloured by status), a flat 16px icon set at a single stroke weight, and one small
sparkline per customer showing payment-timing trend. Any illustration is reserved for the
empty state only (a single line-drawn artifact, one colour). Rationale: in enterprise
finance, imagery is a liability — it dates fast and reads as marketing. Restraint reads as
substance.

## 5. Data and proof presentation

- **Aging is the proof.** A horizontal aging bar (Current / 1–30 / 31–60 / 60+) sits under
  the hero figure, segments labelled *directly on the bar* with value and share — no detached
  legend, no donut. Direct labelling is the premium tell versus chart-junk.
- **Every figure carries context.** "$418,200 at risk" is paired with "▲ 6% vs last week"
  and "of $2.1M total open" — a raw number with no comparison is not yet information.
- **Table earns trust through density done well:** customer, amount, days overdue, last
  contact, next action. Sorted by risk by default. Numbers tabular and right-aligned;
  the days-overdue column uses the amber dot only past threshold, so the eye lands on the
  five rows that matter, not all forty.
- **No vanity metrics.** No "total invoices sent." Only figures a controller acts on.

## 6. Component states (designed, not assumed)

- **Row default / hover / selected:** hover lifts the surface one neutral step and reveals
  the inline "Send reminder" action; selected shows the slate-teal left marker (4px). No
  full-row colour wash.
- **Primary button (Send reminders):** default solid slate-teal; hover one step darker;
  focus a 2px offset ring (keyboard-visible); loading shows inline spinner + "Sending…"
  with the label retained so width doesn't jump; disabled is ink-grey at 38% with a tooltip
  saying *why* (e.g. "Select at least one invoice").
- **Loading:** skeleton rows matching final column widths — never a centred spinner that
  collapses the layout.
- **Empty (nothing overdue):** the rare good-news state — "All caught up. $0 overdue across
  142 open invoices." Calm, not confetti.
- **Error (sync failed):** inline banner above the table, plain language + "Retry", with the
  last-synced timestamp shown so the user knows how stale the data is. Never a blocking modal.
- **Destructive (write off):** confirmation names the exact amount and customer in the
  button label ("Write off $3,400 — Mboga Foods Ltd"), so the consequence is unmissable.

## 7. Why this reads premium, not templated

- **One idea, executed:** the screen commits to a single editorial focal number and demotes
  everything else. Templated UIs give every card equal weight — this one has an opinion.
- **Colour is rationed and load-bearing:** brand hue marks structure, status colour is the
  only saturation on screen. Generic AI UIs spray gradients and colour every card; here
  colour means something, so the eye is guided instead of fatigued.
- **Type does real work:** a serif on exactly one number plus tabular figures in the table —
  craft a template never bothers with. Default-sans-everything is the tell of slop.
- **Density handled with respect:** the dense table is paired with generous breathing room
  around the focal figure. Premium isn't empty space everywhere; it's knowing where to spend
  it and where to compress.
- **Every state is designed,** including the boring ones (loading widths, disabled reasons,
  stale-data timestamps). Templates ship the happy path; trusted systems ship the edges.
- **Restraint as the signal:** no imagery, no chart-junk, no celebration on someone's money.
  The screen looks like it was made by a team that understood the user's job — which is
  exactly the "looks human-made" moat.
