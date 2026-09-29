---
name: dashboard-and-data-product-design
description: Use when designing or reviewing a dashboard, analytics console, monitoring view, KPI scorecard, or data product with multiple metrics, charts, filters, drill-downs, and freshness states. Use chart-selection-and-encoding for chart choice and data-visualization for single-chart craft.
metadata:
  portable: true
  category: 12-data-viz-and-dashboards
  compatible_with:
  - claude-code
  - codex
---

# Dashboard & Data Product Design — From Charts to a Decision Surface

A single chart answers one question. A dashboard is a *product*: a persistent surface where
someone with a job to do scans, orients, drills, and decides — often while the data underneath
is still moving. This skill governs the page above the chart: which metrics earn the top row,
how the grid sequences answers, how drill-down preserves context, and how real-time data stays
trustworthy instead of twitchy.

<!-- dual-compat-start -->
## Use When

- Designing or reviewing a **dashboard, analytics console, monitoring/observability view, admin
  panel, KPI scorecard, executive summary screen, or embedded data product**.
- You must decide **which metrics matter most** and how to tier them (the KPI hierarchy), not
  just how to draw one of them.
- The screen carries **multiple charts + KPIs + filters/controls** that must read as one
  coherent layout rather than a pile of widgets.
- The view shows **live, streaming, or frequently-refreshed data** and you must design refresh
  cadence, freshness/staleness signals, latency tolerance, and loading/empty states.
- You need **drill-down, cross-filtering, or detail-on-demand** that keeps the user oriented.

## Do Not Use When

- The task is the **craft of one chart** — chart-type choice, decluttering, colour-as-emphasis,
  axis/baseline rules, annotation, storytelling. Use the sibling **`data-visualization`** (it
  owns Knaflic's six lessons and the per-chart checklist); this skill assumes those are applied
  to each tile and does not repeat them.
- It is a **static report or slide** (one narrative, author-controlled pacing) rather than an
  interactive, persistent surface → use `data-visualization` + the presentation/document skills.
- The grid/spacing question is generic page layout → use the layout-grid skill; this skill only
  covers the *dashboard-specific* layout patterns (KPI strip, F/Z scan order, zone density).

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Users, decisions, cadence, and critical tasks | Product research and owners | yes | Decision/task inventory |
| Metric definitions, targets, dimensions, and freshness | Semantic layer and data owners | yes | Metric dictionary and SLA |
| Access, interaction, device, and alert constraints | Product and engineering | yes | Role and platform matrix |

- **The decision(s) this dashboard exists to support**, and **who** makes them (role + how often
  they look + on what device). A dashboard with no named decision is a slop signal — see
  Anti-Patterns.
- The **candidate metric list** with, per metric: definition, unit, direction-of-good, comparison
  basis (vs target / vs prior period / vs benchmark), and update frequency.
- **Data freshness reality**: how fresh is the data actually, what is the refresh interval, and
  what is the acceptable staleness window.
- Target **viewport(s)** and whether the dashboard is standalone or embedded.

## Workflow

1. **State the decision and the persona first** (one sentence each). Per
   `doctrine/design-doctrine.md` §2, name the choice before building. "This dashboard lets the
   on-call SRE decide *within 10s* whether to page someone." Everything below serves that line.
2. **Build the KPI hierarchy** — load `references/kpi-hierarchy.md`. Sort every candidate metric
   into **Tier 1 (headline, 3–5 max, the decision metrics)**, **Tier 2 (diagnostic / drivers)**,
   **Tier 3 (operational / drill detail)**. Demote vanity metrics. Each Tier-1 KPI gets a value,
   a comparison, and a trend/direction. More than ~5 headline numbers means no hierarchy.
3. **Choose the layout pattern** — load `references/dashboard-layout-patterns.md`. Pick a layout
   archetype (KPI strip + grid, F-pattern analytical, Z-pattern executive, master-detail,
   monitoring wall) that matches the persona's scan behaviour. Place Tier-1 in the primary scan
   zone (top-left → top strip), Tier-2 in the mid grid, Tier-3 behind drill-down. Respect the
   layout-grid skill for the underlying columns/gutters; this skill governs zone *sequence and
   density*.
4. **Design the interaction model** — global filters (what they scope, persistence, URL/state),
   **cross-filtering** (does clicking one tile filter the others — and is that obvious and
   reversible), and **drill-down** (in-place expand vs master-detail vs navigate-to-page; always
   keep a visible breadcrumb/back path so context is never lost). Specify defaults so the
   first paint already answers the headline question with zero clicks.
5. **Design the real-time/data UX** — load the real-time section of
   `references/dashboard-layout-patterns.md`. Decide refresh model (poll / push / manual),
   **show a freshness timestamp and a staleness state**, never animate numbers so fast they
   can't be read, preserve scroll/selection across refreshes, and design the **loading**
   (skeleton, not spinner-on-everything), **empty** (zero-state with guidance), and **error /
   stale-data** states as first-class — not afterthoughts.
6. **Apply the accessibility floor** — cite `doctrine/references/wcag-2.2-criteria.md`: every
   control ≥24×24px (2.5.8); any drag/brush filter has a single-pointer alternative (2.5.7);
   sticky KPI headers must not obscure focus (2.4.11); the dashboard reflows usably at 320px and
   200% zoom (1.4.10/1.4.4); auto-refresh respects `prefers-reduced-motion` and never flashes;
   KPI tiles are not colour-only (pair red/green with arrow + sign + label). Each chart tile
   still passes `data-visualization`'s own checklist.
7. **Run the dashboard QA gate** (see Anti-Patterns) and produce the spec.

## Decision Rules
| Condition | Dashboard choice | Wrong-choice failure |
|---|---|---|
| User monitors exceptions | Lead with status, thresholds, and anomalies | Decorative summaries hide action |
| User investigates causes | Enable scoped drill-down and preserved filters | Static tiles force tool switching |
| Data freshness varies | Show timestamp and staleness state per source | Users act on stale data unknowingly |
| Audience decisions differ materially | Separate role views over one metric contract | One overloaded dashboard serves nobody |

## Capability Contract
Read and search are required across research, metric definitions, data access, and implementation. Editing is allowed only when design or build is requested. Query execution and rendering are required for correctness and interaction claims; production mutation requires separate authority.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without trusted metrics, deliver a wireframe and metric dependency register, not a decision-ready dashboard. Stop release when definitions, freshness, access controls, or critical-state renders are missing; provide the narrowest prototype and list unverified checks.

## Anti-Patterns

- **No decision, no persona** — a dashboard that "shows all the data" so everyone can find
  something. Every screen must serve a named decision for a named role.
- **Flat KPI wall** — 12 equally-sized number tiles with no tier, no comparison, no direction.
  If everything is highlighted, nothing is (doctrine contrast rule, inherited from
  `data-visualization` Lesson 4).
- **Vanity metrics in Tier 1** — totals that only go up (cumulative signups) crowding out the
  rate/ratio that actually drives the decision.
- **Number without comparison** — "Revenue: $1.2M" with no vs-target / vs-prior / trend. A bare
  number is not a KPI.
- **Drill-down that teleports** — clicking dives to a new context with no breadcrumb, no back,
  the filters lost. Always preserve and show the trail.
- **Twitchy real-time** — values counting/flickering on every push so fast they're unreadable;
  layout reflowing on refresh; scroll/selection reset. Throttle, transition gently, preserve state.
- **No freshness signal** — live-looking dashboard with no "as of" timestamp; users trust stale
  numbers. Always show data age and a distinct stale state.
- **Spinner soup / blank on load** — a spinner per widget, or an empty grid, instead of a
  skeleton layout that previews structure.
- **Mystery filters** — global filter changes silently rescope half the tiles with no indication
  of what's filtered or how to clear it.
- **Decorative dashboard** — gauges, 3D, rainbow tile backgrounds, donut KPIs (doctrine
  `ai-slop-taxonomy.md` "dashboard decoration" tell). Tiles are flat, grey-based, one accent.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Decision hierarchy and dashboard architecture | Product and data teams | Every region supports a named decision or task |
| Metric, filter, drill-down, freshness, and state specification | Engineers and analysts | Definitions and interaction scopes are traceable |
| Tested dashboard prototype and evidence | Users, QA, and release owner | Critical tasks, roles, devices, and failure states pass or are marked blocked |

- A **dashboard spec**: the named decision + persona; the tiered KPI list; the chosen layout
  archetype with zone map; the interaction model (filters, cross-filter, drill-down with
  breadcrumb); the real-time/data-UX rules (refresh, freshness, staleness, loading/empty/error);
  and the WCAG 2.2 gate results. See `examples/dashboard-spec.md` for a full worked one.

## Examples

- `examples/dashboard-spec.md` — a complete, real dashboard spec for a sample SaaS product
  (a subscription-billing "Revenue Health" console): KPI tiers, layout zone map, drill-down and
  cross-filter interactions, and the real-time/freshness model — end to end.

## References

- `doctrine/design-doctrine.md` — Mission (looks human-made / authored) and the Anti-Slop
  Charter; a dashboard must be a *designed decision surface*, never a default widget dump.
- `doctrine/references/ai-slop-taxonomy.md` — the "dashboard decoration" / chart-junk tells
  (gauges, 3D, rainbow tiles, donut KPIs) this skill bans.
- `doctrine/references/wcag-2.2-criteria.md` — target size 24px, dragging alternative, focus not
  obscured by sticky headers, reflow at 320px, reduced-motion — the accessibility floor for the
  interactive, real-time surface.
- `doctrine/references/visitor-modes.md` — dashboards, tables and forms are Operate surfaces; exported reports are Read. Sets density, motion and colour posture per surface.
- **Sibling — `12-data-viz-and-dashboards/data-visualization`** — owns single-chart craft
  (chart choice, decluttering, colour, axes, annotation, storytelling). This skill sits *above*
  it: it decides which charts/KPIs exist, where they go, and how they interact. Do not duplicate
  its per-chart rules; assume every tile already passes its checklist.
- `references/kpi-hierarchy.md` — metric tiering (Tier 1/2/3), what makes a real KPI, vanity-
  metric demotion, comparison/target/trend rules.
- `references/dashboard-layout-patterns.md` — layout archetypes, scan-order zoning, drill-down
  and cross-filter patterns, and the real-time / streaming data UX patterns.
First-run rule: for a newly provisioned dashboard, provide representative
seeded/demo data or a clear setup path that demonstrates the core decision
without pretending sample data is live. Treat a blank state as an onboarding
state with an owner and a measurable next action.

Practitioner cross-check: [Eleken dashboard examples](https://www.eleken.co/blog-posts/dashboard-design-examples-that-catch-the-eye). Use for hierarchy, progressive introduction, and first-run prompts; do not treat visual appeal or portfolio selection as performance evidence.

<!-- dual-compat-end -->
