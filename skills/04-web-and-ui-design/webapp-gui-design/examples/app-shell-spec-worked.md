# Worked Example — SaaS App-Shell Specification

**Product:** *Ledger Relay* — a multi-tenant payment-reconciliation SaaS for finance ops teams
(web app + responsive mobile web). Operators match incoming bank settlements against expected
payouts, chase exceptions, and close each day's reconciliation. This worked spec carries one
product end-to-end through the skill: shell layout → navigation IA → a dashboard view → a
data-table view → component states → responsive behaviour, all on documented tokens.

This is a deep, session-heavy operations tool, so the structural call (doctrine Mission §0) is a
**persistent left nav rail + top bar**, not a top-only nav — operators live in the table for
hours and need a stable rail and visible context, not a hamburger.

**Typeface & palette (stated before layout, per `doctrine/design-doctrine.md` §2):** UI text in
**Public Sans**; numerics and IDs in **JetBrains Mono** (tabular figures for column alignment).
No banned default (no Inter/Geist/Roboto/system stack). Palette: neutral slate surfaces, a single
deep-teal brand accent (`--accent`), and semantic status hues (amber/red/green/slate) reserved
**only** for reconciliation state — never decoration.

---

## 1. Design tokens (the spec speaks in these, not raw values)

```
Spacing scale (4px base):  space-1 4 · space-2 8 · space-3 12 · space-4 16 · space-6 24 · space-8 32
Radii:                     r-sm 6 · r-md 8 · r-lg 12
Surfaces:    --bg #f8fafc (slate-50)   --surface #ffffff   --surface-2 #f1f5f9 (slate-100)
Text:        --fg #0f172a (slate-900)   --muted #64748b (slate-500)   --border #e2e8f0 (slate-200)
Brand:       --accent #0f766e (teal-700)   --accent-fg #ffffff
Status:      matched #16a34a · pending #d97706 · exception #dc2626 · ignored #64748b
Focus ring:  2px --accent at 2px offset  (focus-visible only)
Shell metrics:  rail 248px (expanded) / 64px (rail)   top bar 56px   content pad space-6 (24px)
```

Status hues all clear ≥4.5:1 on white for text use; where used as a fill, text sits on the dark
variant. Brand teal-700 on white = 4.7:1 (AA body ✔).

---

## 2. Shell layout

Three regions, owned by the route-group layout — pages only fill `main`, never reach into the shell.

```
┌──────────────┬──────────────────────────────────────────────────────────┐
│              │  TOP BAR (56px): {Org switcher ▾}   ⌘K Search   ◷ EOD timer │
│   NAV RAIL   │                              ⠀⠀⠀⠀  🔔 Alerts   {User ▾}      │
│   (248px)    ├──────────────────────────────────────────────────────────┤
│              │                                                            │
│  Dashboard   │   MAIN  (content, pad 24px, max-w-[1440px] centred)        │
│  Settlements │                                                            │
│  Exceptions  │   ← the only region a page renders into →                  │
│  Payouts     │                                                            │
│  Reports     │                                                            │
│  ──────────  │                                                            │
│  Settings    │                                                            │
└──────────────┴──────────────────────────────────────────────────────────┘
```

- **Nav rail** — vertical, 248px expanded, persistent on ≥1024px. User can collapse to a 64px
  icon-only rail; state persists to `localStorage` (`shell:rail-collapsed`). On the rail, labels
  appear as accessible-name tooltips on hover **and** on keyboard focus.
- **Top bar** — 56px, sticky. Left: org/tenant switcher (multi-tenant). Centre-right: global
  `⌘K` search. Right cluster: an end-of-day reconciliation timer (operations-specific), an alerts
  bell with unread badge, and the user menu. Sticky bar sets `scroll-padding-top: 56px` so a
  focused rail item is never hidden behind it.
- **Main** — 24px padding, content capped at 1440px and centred so tables don't sprawl on
  ultrawide monitors. `overflow-x: hidden` on the column; tables manage their own x-scroll.

Region order in the DOM (and focus order): skip-link → top bar → nav rail → main.

---

## 3. Navigation information architecture

Primary spine is **task/object based**, six items, max depth 3, everything in ≤3 clicks.

```
Dashboard                                /
Settlements        (faceted table)       /settlements          → /settlements/{id}
Exceptions         (faceted table)       /exceptions           → /exceptions/{id}
Payouts            (faceted table)       /payouts              → /payouts/{id}
Reports                                  /reports
  ├─ Daily Close                         /reports/daily-close
  ├─ Aged Exceptions                     /reports/aged-exceptions
  └─ Match-rate Trend                    /reports/match-rate
Settings (utility, foot of rail)         /settings
  ├─ Bank Connections                    /settings/connections
  ├─ Matching Rules                      /settings/rules
  ├─ Members & Roles                     /settings/members
  └─ Billing & Plan                      /settings/billing

Top bar (utility): Org switcher · ⌘K Search · EOD timer · Alerts · {User ▾: Profile, Sign out}
```

**Labels** are parallel plural nouns in operators' own words (*Settlements*, *Exceptions*,
*Payouts*) — distinct, specific, no "More/Other". *Exceptions* is promoted to a top-level item
(not buried under Settlements) because chasing exceptions is the operator's core job.

- **Active state** uses three signals, never colour alone: filled teal-tint background **+** a 3px
  leading indicator bar **+** label weight 600; programmatically `aria-current="page"` on the leaf.
- **Breadcrumbs** render from matched route segments via a `routeTitles` map — never hand-coded:
  `Settlements › STL-90412`. Shown on every record/report. Current crumb is text (not a link) with
  `aria-current="page"`.

---

## 4. Dashboard view — "Today's reconciliation"

12-column grid on `lg:`, stacking to 1 column on `sm:`. Gap = `space-4` (16px).

```
┌ KPI strip (4 cards, each lg:col-span-3) ──────────────────────────────────┐
│ Match rate 97.4% ▲0.6  · Unmatched $128.4k · Open exceptions 23 · Closed ✓ │
├ Match-rate trend  (lg:col-span-8) ──────┬ Exception queue (lg:col-span-4) ─┤
│  area chart, 30 days, reads --accent     │ live list, newest first,        │
│  + status hues from CSS vars             │ each row → /exceptions/{id}      │
├ Recent settlements (lg:col-span-12) ─────┴──────────────────────────────────┤
│  compact DataTable, last 10, "View all →" links to /settlements            │
└────────────────────────────────────────────────────────────────────────────┘
```

- **KPI cards** — `--surface`, `r-lg`, padding `space-6`, hairline `--border`. Value in JetBrains
  Mono 28px/600; label in Public Sans 13px `--muted`; trend chip uses a status hue **plus** a ▲/▼
  glyph (never colour alone). A KPI loading shows a shimmer block of the **same height** so the
  grid never reflows.
- **Charts** read theme CSS variables (`--accent`, status hues) so dark mode and the chart library
  stay in sync. Reduced-motion users get no enter animation.
- **Cardinal rule:** every panel here ships loading, empty, error, and success states (§6),
  wired before real data — a dashboard that collapses to a spinner on refresh is a defect.

---

## 5. Data-table view — "Settlements"

One `DataTable<Settlement>` primitive; columns live in the feature folder. Server-side pagination,
sorting, and filtering (the dataset is unbounded). Sticky header; row height 48px (≥44px touch).

```
Toolbar:  [⌕ Filter…]  Status ▾  Date range ▾  Bank ▾  Amount ▾     [ Export ▾ ]  [ + Match ]
          └ active facets shown as removable chips, URL-encoded (shareable view)

┌─────────────┬────────────────┬───────────┬──────────┬───────────────┬─────────┐
│ ☐  REF       │ Bank           │ Amount  ⇅ │ Date  ⇅  │ Status        │ ⋯       │
├─────────────┼────────────────┼───────────┼──────────┼───────────────┼─────────┤
│ ☐  STL-90412 │ Stanbic        │  $4,210.00│ 06-21    │ ● Matched     │ ⋯       │
│ ☐  STL-90411 │ Equity         │ $12,980.50│ 06-21    │ ● Exception   │ ⋯       │
│ ☐  STL-90410 │ KCB            │    $312.00│ 06-21    │ ● Pending     │ ⋯       │
└─────────────┴────────────────┴───────────┴──────────┴───────────────┴─────────┘
Footer:  3 selected · [ Bulk match ] [ Ignore ]      Rows 1–25 of 1,284   ◀ 1 2 3 … ▶  [25 ▾]
```

- **Columns:** checkbox; `REF` (JetBrains Mono, deep-links to the record); Bank; Amount
  (JetBrains Mono, **right-aligned**, tabular figures); Date; Status as a `StatusPill`; a row-anchored
  `⋯` actions menu (never a single global menu).
- **Numerics** use JetBrains Mono so amounts and refs align down the column.
- **Facets** mirror object fields (Status, Date range, Bank, Amount range), are additive, show as
  removable chips, and are URL-encoded so a filtered view is bookmarkable/shareable.
- **Selection** reveals a bulk action bar in the footer (match / ignore); `aria-live="polite"`
  announces the selected count.
- **Row actions** open a dropdown anchored to the row, keyboard-operable (Enter opens, Arrow
  navigates, Escape closes, focus returns to the trigger).

---

## 6. Key component states

### 6.1 StatusPill (the reconciliation vocabulary)

| State | Dot / fill | Text | When |
|---|---|---|---|
| Matched | `matched` green | "Matched" | settlement reconciled to a payout |
| Pending | `pending` amber | "Pending" | awaiting bank confirmation |
| Exception | `exception` red | "Exception" | mismatch needs an operator |
| Ignored | `ignored` slate | "Ignored" | deliberately excluded, with reason |

Each pill pairs the hue with a **text label** (and a shape/dot) — never colour alone. Text sits on
the dark variant of its hue for ≥4.5:1.

### 6.2 Data surface — four states (every table & panel)

- **Loading:** skeleton rows of the real row height (no full-page spinner after first paint).
- **Empty:** icon + headline + concrete next action — "No settlements today. Connect a bank feed
  or import a statement." with a primary **Connect bank** and secondary **Import statement**.
  Never bare "No data."
- **Error:** inline `EmptyState` — "Couldn't load settlements," a **Try again** primary, a
  **Contact support** secondary, and a logged `digest` handle. Never a raw stack in production.
- **Success:** the populated table / dashboard.

### 6.3 Button states (every interactive button ships all six)

`enabled · hover · focus-visible (2px teal ring, 2px offset) · pressed · disabled · loading`.
Loading **keeps** the label and adds a spinner ("Matching…", not a bare spinner). Labels name the
outcome ("Match selected", "Export CSV"), not "Submit/OK". The destructive **Ignore** path routes
through a `ConfirmDialog` with a typed confirm and a danger variant; high-impact bulk actions offer
undo via toast. Icon-only buttons (⋯, bell, search) are ≥44×44px and carry an `aria-label`.

### 6.4 Form field (Matching Rules → new rule)

React Hook Form + Zod via a single `FormField` primitive: visible label, helper text, and an error
that wires `aria-invalid` + `aria-describedby`. Inline errors on blur/submit, never an alert dialog.

---

## 7. Responsive behaviour

Breakpoints swept: 360 / 768 / 1024 / 1280 / 1920. No horizontal overflow; nothing clipped behind
the sticky bar.

| Region | ≥1280px (desktop) | 1024–1279px | 768–1023px (tablet) | <768px (mobile) |
|---|---|---|---|---|
| Nav rail | Full 248px | Collapsed 64px **rail** | 64px rail | **Bottom bar**: Dashboard · Settlements · Exceptions · Reports · **More** (drawer: Payouts, Settings) |
| Top bar | Full cluster | Full cluster | Condense to icons | Search + Alerts icons; rest in **More** drawer |
| Dashboard | 12-col grid | 12-col grid | 2-col (KPIs 2×2, chart over feed) | 1-col stack |
| Settlements table | All columns | Hide Bank, keep priority cols | **Priority columns** (REF, Amount, Status) + row-expand for the rest | **Card list** — one settlement per card (REF, amount, status, date), tap → record |
| Toolbar facets | Inline row | Inline row | "Filters" button → sheet | "Filters" button → full-screen sheet; chips above list |

No region disappears without a replacement: the bottom bar + **More** drawer covers every primary
item, and the table degrades to a card list rather than an unreadable x-scroll on phones.

---

## 8. Accessibility & keyboard contract (merge gate)

- **Skip link** "Skip to main content" is the first focusable element, visible on focus.
- **Landmarks:** `<nav aria-label="Primary">` (rail), `<nav aria-label="Utility">` (top bar),
  `<nav aria-label="Breadcrumb">`, `<main>`.
- **Focus order** = visual order (skip → top bar → rail → main); `:focus-visible` ring on every
  interactive element; sticky bar uses `scroll-padding-top` so focused rail items stay visible.
- **Rail rail-collapse / org switcher / user menu:** `aria-expanded` + `aria-haspopup`; Escape
  closes and returns focus to the trigger; arrow-key navigation within menus.
- **Table:** header sort buttons are real `<button>`s exposing `aria-sort`; `⋯` row menu follows
  the APG menu pattern; selection count announced via `aria-live="polite"`.
- **Active item:** `aria-current="page"` on the active rail leaf and the breadcrumb tail.
- **Targets:** rail rows 40px (≥44px touch via padding), bottom-bar items 56px, icon-only buttons
  ≥44×44px, all with accessible names.
- **Motion:** `prefers-reduced-motion` respected on chart/skeleton/drawer transitions.
- **Testing:** axe + Lighthouse in CI, **then** a manual keyboard traversal (rail, menus, table
  sort/menu/selection, bottom bar + drawer) and an NVDA/VoiceOver smoke test.

---

## 9. Why this is the authored choice (anti-slop note)

The default SaaS template would have shipped a top-only nav, an Inter/Geist body face, and a table
that x-scrolls into oblivion on mobile. The deliberate calls here, each stated before build per
doctrine Mission §0 and Anti-Slop Charter §2: a **persistent left rail** for a long-session ops
tool; **Public Sans + JetBrains Mono** with tabular figures because this product is fundamentally
about reading money in aligned columns; **status hues reserved strictly for reconciliation state**
(never decoration), always paired with a label; and a **card-list table fallback** plus
**bottom-bar + More** so nothing orphans on a phone.
