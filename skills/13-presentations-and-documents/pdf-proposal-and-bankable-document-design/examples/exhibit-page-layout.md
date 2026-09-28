# Worked Example: Exhibit / Figure Page Layout

A fully dimensioned exhibit page for the same Kabaale Solar IPP proposal (see
`proposal-cover-spec.md`). The investment committee reads the exhibits first, so each must be
self-explanatory: numbered, captioned, sourced, framed consistently. Same type and accent system as
the cover. A4, single body column + 42 mm outer marginalia column
(`references/proposal-section-architecture.md` §2).

---

## The exhibit: a financial table

**Exhibit 4.2 — Sensitivity of Minimum DSCR to PPA Tariff and Capex.**

---

## Page geometry

| Property | Value |
|---|---|
| Trim | 210 × 297 mm (A4) |
| Margins | inside 22 mm · outside 18 mm · top 20 mm · bottom 22 mm |
| Body column | 22 mm → 132 mm (width **110 mm**) |
| Gutter | 6 mm |
| Marginalia column | 138 mm → 180 mm (width **42 mm**) — holds the source note + a one-line read |
| Running header | section name "4 · THE CASE" left, page number right, 0.5 pt rule under, at 12 mm |
| Running footer | "Strictly Private & Confidential" left, "Kabaale Solar IPP" right, at 285 mm |
| Baseline grid | 12 pt |

---

## The exhibit frame (the recurring system)

Every exhibit on every page uses this identical frame so the set reads as designed:

| Element | Spec |
|---|---|
| **Exhibit keyline** | 0.5 pt rule, `#1A1A1A` at 25%, enclosing the figure area |
| **Top accent tab** | a 3 mm × 24 mm solid `#0F4C4A` block flush to the frame's top-left (the recurring teal thread) |
| **Exhibit label** | "EXHIBIT 4.2" — Source Serif 4, 9/12 pt, 600, `#0F4C4A`, +0.06em UPPERCASE, sits on the accent tab row |
| **Caption (title)** | "Sensitivity of minimum DSCR to PPA tariff and capex" — Andada Pro, 14/18 pt, 600, `#1A1A1A`, directly under the label |
| **Figure area** | the table/chart, inside the keyline, 8 mm internal padding |
| **Source note** | "Source: Sponsor financial model v3.0, base case; bank case adjustments per §4.3." — Source Serif 4, 8.5/12 pt, 400 italic, `#1A1A1A` at 80%, **in the marginalia column**, top-aligned to the figure |

---

## The table itself (inside the figure area)

DSCR matrix — rows = PPA tariff (US¢/kWh), columns = capex variance.

| | **−10% capex** | **Base** | **+10% capex** | **+20% capex** |
|---|---|---|---|---|
| **8.5¢** | 1.42× | 1.31× | 1.21× | 1.12× |
| **8.0¢ (base)** | 1.35× | **1.25×** | 1.16× | 1.07× |
| **7.5¢** | 1.27× | 1.18× | 1.09× | 0.99× |
| **7.0¢** | 1.19× | 1.10× | 1.02× | 0.92× |

**Table type & rules:**
- Header row: Source Serif 4, 9 pt, 600, `#1A1A1A`; thin 0.5 pt rule under header only.
- Body cells: Source Serif 4 (tabular figures), 9.5/14 pt, 400; **no vertical rules, no zebra fill**
  (rules-light tables read as editorial, not spreadsheet-dumped).
- **Base case `1.25×` bolded**; cells **below the 1.20× covenant floor** tinted `#0F4C4A` at 12% so
  the breach reads at a glance — but also marked with a "†" so meaning is not colour-only
  (`wcag-2.2-criteria.md`: non-colour cues).
- Covenant-floor footnote in the marginalia: "† Below 1.20× minimum DSCR covenant."

---

## Marginalia column (the 42 mm outer column)

- **Source note** (top, as above).
- **One-line read** beneath it — Andada Pro italic 9.5/13 pt: *"Base case clears the 1.20× floor; the
  +20% capex / ≤7.5¢ corner does not — the key sensitivity for the IC."* This pre-digested takeaway is
  the strongest authored signal on the page.

---

## Why this passes the gate

- **Self-explanatory exhibit:** number, caption, source note, and a one-line read — an IC member
  understands it without the body text.
- **Consistent frame** = the document reads as one designed system, not assembled pages.
- **Accessible:** covenant breaches carry a "†" mark and a tint (not colour alone); tabular figures
  align; the page is tagged with a real reading order (caption → table → source).
- **Print-ready:** table is vector, fonts embed+subset, accent colour is the single CMYK teal — run
  `references/print-ready-pdf-checklist.md` before shipping.
