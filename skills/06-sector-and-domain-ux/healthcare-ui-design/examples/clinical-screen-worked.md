# Worked Example: Inpatient Vitals Dashboard (Bedside Tablet)

A single, concrete screen spec for a ward nurse's bedside vitals dashboard — the most common
clinical screen and the one where information hierarchy, status design, and error-prevention carry
the most safety weight. It applies the SKILL's Patient Safety Rules and the engine's WCAG 2.2 floor.

**Context.** Tablet, landscape, 1024×768. User: ward nurse, often gloved, frequently interrupted,
reading a deteriorating patient at 3 a.m. Stack: Tabler/Bootstrap 5 + PHP web view (also runs on a
wall-mounted tablet). Vitals source: HL7 FHIR Observation resources; nothing is computed in the UI.

---

## 1. Information hierarchy for safety

Top-to-bottom = most-to-least safety-critical. A nurse glancing for two seconds must land on
*who*, *how sick*, and *what's wrong* before anything else.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ PATIENT HEADER (persistent, sticky)                                            │
│ Jane Doe   •   DOB 14 Mar 1981 (45y)   •   MRN 7823   •   Bed 4B               │
│ ⚠ ALLERGY: Penicillin (severe)   [red banner, icon + text, full width]        │
├──────────────────────────────────────────────────────────────────────────────┤
│ NEWS2 ACUITY: 7  ●●●●●●●○  AGGREGATE HIGH — escalate per protocol              │
│ [status block: number + label + icon, not a colour swatch alone]              │
├──────────────────────────────────────────────────────────────────────────────┤
│ VITALS GRID (6 tiles, each: label · value · unit · range · trend · status)    │
│   RR 24 /min      HR 118 bpm     BP 92/58 mmHg                                 │
│   SpO₂ 91 %       Temp 38.6 °C   ACVPU  Alert                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ Last set: 03:12 (4 min ago) by N. Okello   ·   [ Record new vitals ]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **Two patient identifiers always on screen** (name + DOB, plus MRN/bed) — Safety Rule 4.
- **Allergy banner sits above everything actionable** — Safety Rule 1; it never scrolls away.
- Aggregate acuity (NEWS2) is the single most important derived number, so it gets the second slot
  and the largest type after the name.
- "Last set … 4 min ago" is explicit recency — stale vitals are a known clinical hazard, so the age
  is shown in words, not just a timestamp the reader must subtract from now.

---

## 2. Status & alert design (the abnormal-vital tile)

Each tile encodes status with **three independent signals** (Safety Rule 5): colour, an icon/shape,
and a text label. Colour is never the only cue.

```html
<div class="vital-tile is-high" role="group" aria-labelledby="rr-label">
  <div class="vital-head">
    <span id="rr-label" class="vital-name">Respiratory rate</span>
    <span class="vital-status">
      <svg class="i-up" aria-hidden="true"><!-- upward triangle --></svg>
      HIGH
    </span>
  </div>
  <div class="vital-value">24 <span class="vital-unit">/min</span></div>
  <div class="vital-meta">Normal 12–20 · was 18 at 23:00 ▲</div>
</div>
```

```css
/* Status carries shape + label; colour is reinforcement, never the sole signal. */
/* chwezi-slop-disable-next-line decorative-side-stripe -- Peter Bamuhigire (side-stripe ruling, 29 Sep 2026): status encoding paired with a text label */
.vital-tile        { border-left: 6px solid var(--surface-border); background: #fff; }
.vital-tile.is-normal { border-left-color:#10B981; }           /* + "NORMAL" + flat icon  */
.vital-tile.is-high   { border-left-color:#B45309; }           /* + "HIGH"   + ▲ icon     */
.vital-tile.is-low    { border-left-color:#B45309; }           /* + "LOW"    + ▼ icon     */
.vital-tile.is-critical {                                       /* + "CRITICAL"+ ⛔ icon   */
  border-left-color:#B91C1C; box-shadow: inset 0 0 0 2px #B91C1C;
}
.vital-status { font-weight:700; display:inline-flex; gap:.25rem; align-items:center; }
```

Status-encoding reason (side-stripe ruling, Option A, 29 Sep 2026): the 6px tile stripe encodes
clinical status and is always paired with the NORMAL / HIGH / LOW / CRITICAL text label and a
shape icon, so it stays as a recorded, waived status encoding rather than a decorative stripe.

**Alert tiers — escalate intrusiveness with clinical urgency, not with noise:**

| Tier | Trigger | Treatment | Why |
|------|---------|-----------|-----|
| Passive | Single mildly out-of-range vital | Tile colour + icon + label | Awareness, no interruption |
| Banner | Aggregate acuity HIGH | Sticky amber/red strip under header + `role="status"` | Visible without blocking work |
| Interrupt | New CRITICAL value (e.g. SpO₂ < 88, RR > 25 + falling BP) | Modal with `role="alertdialog"`, focus trapped, names the patient and the value | Demands acknowledgement — Safety Rule 2 analogue |

Red is reserved for genuine criticality (SKILL anti-pattern: alert fatigue). A ward of amber tiles
trains nurses to ignore amber; a ward of red tiles trains them to ignore red.

```html
<!-- Critical interrupt: specific, actionable, dismissible only by an explicit choice -->
<div role="alertdialog" aria-modal="true" aria-labelledby="crit-h" aria-describedby="crit-b">
  <h2 id="crit-h">Critical: SpO₂ 88% — Jane Doe, Bed 4B</h2>
  <p id="crit-b">Oxygen saturation 88% at 03:16, down from 94%. NEWS2 now 9.</p>
  <button class="btn-acknowledge">Acknowledge &amp; record action</button>
  <button class="btn-escalate">Escalate to on-call</button>
</div>
```

The dynamic vitals region uses `aria-live="polite"` (and `role="alert"` only for the critical tier)
so a screen-reader user hears changes without the page hijacking focus on every refresh.

---

## 3. Accessibility (WCAG 2.2 AA floor; AAA where feasible)

- **Colour is never alone** (1.4.1): every status = colour **+** shape/icon **+** text label, as above.
- **Contrast** (1.4.3 / 1.4.11): body and value text ≥ 4.5:1; status strips, tile borders, and the
  NEWS2 block ≥ 3:1 against their background. `#B45309` amber and `#B91C1C` red on white clear 4.5:1,
  so the *label text* (not just the swatch) is legible — saturated `#F59E0B` text would fail and is
  used only as a fill behind dark text. Design with APCA for real legibility, certify with the ratios.
- **Large, legible type:** values 28px bold, labels 16px, units 16px; ranges/meta 14px at 1.5 line
  height. Wall-mounted tablet read at distance — nothing below 14px. Usable at 200% zoom and 320px
  reflow (1.4.4 / 1.4.10): the 6-tile grid collapses to one column, header stays sticky.
- **Target size** (2.5.8 / Material): "Record new vitals", Acknowledge, and Escalate are ≥ 48×48px —
  the nurse may be gloved.
- **Keyboard & focus** (2.1.1, 2.4.7, 2.4.11): full Tab order; 3px focus ring, 2px offset; the sticky
  header must not obscure the focused element (2.4.11 Focus Not Obscured) — focused tiles scroll clear
  of the sticky banner.
- **Dragging** (2.5.7): the trend chart's range scrubber has tap-to-step buttons as a single-pointer
  alternative — no gesture is the only way to do anything.
- **Reduced motion** (2.3.1): trend sparklines and the "Connecting to monitor…" pulse honour
  `prefers-reduced-motion`; nothing flashes > 3×/s.
- **Name/Role/Value** (4.1.2): each tile is a labelled `group`; the status word is part of the
  accessible name, so a screen reader announces "Respiratory rate, 24 per minute, HIGH".
- **Redundant entry** (3.3.7): the record-vitals form pre-fills patient, ward, and recorder from
  context — the nurse never re-types what the system already holds.

---

## 4. Error-prevention

- **Out-of-range entry is challenged, not blocked.** Typing HR = 18 (likely a transposed 81) triggers
  an inline soft-stop: "18 bpm is far below this patient's range (60–100). Confirm or re-enter."
  Physiologically impossible values (HR 400, Temp 52 °C) are rejected outright. Plausible-but-extreme
  values require an explicit confirm — never silent acceptance.
- **One metric per step on entry** (SKILL tablet pattern): RR → HR → BP → SpO₂ → Temp → ACVPU, large
  numeric keypad, previous reading shown for comparison so a wild jump is visible before submitting.
- **Units are fixed and labelled, never free-text.** Temp shows °C with the scale locked to the
  patient's chart to prevent °C/°F confusion; BP is two bounded fields, not one "120/80" string.
- **Autosave every 30 s + resume** (Safety Rule 6): an interrupted vitals set is preserved with a
  timestamp and a "Resume Jane Doe's vitals (started 03:14)" banner — partial clinical data is never lost.
- **Confirm-on-commit, separate from entry:** a "Review" screen restates *patient, values, flags, and
  time* before "Save to record" — the irreversible write is a deliberate second action (Safety Rule 3),
  and every write hits the audit trail.
- **Session timeout warning** 2 minutes before auto-logout on the shared wall tablet (Safety Rule 7),
  with unsaved entry retained through the lock.

---

## 5. Trust cues

- **Provenance on every value:** "Last set 03:12 by N. Okello" and a small "from bedside monitor"
  source tag distinguish device-streamed from manually-keyed numbers — clinicians trust data they can
  attribute.
- **Honest staleness:** when the feed is older than the local protocol threshold, the recency line
  goes amber with "Vitals 22 min old — re-check due", rather than presenting old numbers as current.
- **No fabricated precision:** trends say "▲ from 18 at 23:00", not a fake decimal; missing values
  show "—  not recorded", never a guessed or blank-as-zero figure.
- **Quiet, professional palette:** calm clinical blue for primary actions, status colour reserved for
  status — the screen does not look alarming until the patient is actually unwell, which is what makes
  the red mean something when it appears.
- **Visible accountability:** the audit note ("saved to record · audit logged") reassures the nurse
  the action is documented, reinforcing safe, deliberate use under HIPAA-style logging.

---

### Self-check against the SKILL Pre-Delivery Checklist

Two identifiers ✓ · allergy banner before action ✓ · three-signal alerts ✓ · 48px targets ✓ ·
WCAG contrast verified ✓ · keyboard + focus (incl. 2.4.11) ✓ · screen-reader live regions ✓ ·
session timeout ✓ · audit trail ✓ · confirm on commit ✓ · autosave + resume ✓ · landscape + reflow ✓.
