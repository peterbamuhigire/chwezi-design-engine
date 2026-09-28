# Worked Example — Pricing Card: BEFORE → AFTER

One real screen, fixed against the practical-ui-design rules. The screen is the **"Pro" plan card** from a three-tier SaaS pricing page. Each change below is mapped to the exact rule it satisfies (section numbers refer to `SKILL.md` and `references/skill-deep-dive.md`).

Typeface choice: display face **Andada Pro** (headings/price), body face **Source Sans 3** (everything else). Deliberate pairing — neither is a banned AI-slop default (no Inter / Roboto / Open Sans / Lato / Montserrat / Poppins / Nunito).

---

## BEFORE — the weak version

```html
<div style="
  background:#fff; border:1px solid #ddd; border-radius:14px;
  box-shadow:0 8px 30px rgba(0,0,0,0.35);
  padding:18px; font-family:Inter, sans-serif; text-align:center;">

  <h3 style="color:#2563eb; font-size:20px; margin:0 0 12px;">PRO</h3>
  <div style="color:#000; font-size:34px; font-weight:700;">$29/mo</div>
  <p style="color:#999; font-size:13px;">Everything you need to scale.</p>

  <ul style="color:#000; font-size:14px; list-style:none; padding:0;">
    <li>✓ Unlimited projects</li>
    <li>✓ 5 team seats</li>
    <li>✓ Priority support</li>
    <li>✓ Advanced analytics</li>
  </ul>

  <button style="
    background:#2563eb; color:#fff; border:none;
    border-radius:10px; padding:8px 14px; font-size:14px;
    box-shadow:0 6px 16px rgba(37,99,235,0.6);">Buy</button>

  <a href="#" style="color:#2563eb; font-size:13px;">Compare all plans</a>
</div>
```

### What's wrong

| # | Defect | Rule violated |
|---|---|---|
| 1 | Pure-black `#000` body and price text on white | §1.3 Avoid pure black — eye strain |
| 2 | Heading `PRO` painted brand blue `#2563eb` | §1.3 Brand colour only on interactive elements — users mistake it for a link |
| 3 | Three competing greys (`#ddd`, `#999`, `#000`) with no shared hue | §1.2 Tint neutrals — never pure grey |
| 4 | Sub-copy `#999` on white ≈ 2.85:1 contrast — fails AA | §1.6 Small text needs ≥ 4.5:1 |
| 5 | Brand blue used on heading, button, **and** link — colour does no work distinguishing them | §1.3 One brand colour, interactive only |
| 6 | Heavy, dark, coloured shadows (`0.35` and `0.6` alpha) — the "floating slop" look | Deep-dive §5/§9 Shadows should be subtle, neutral, layered |
| 7 | Cramped `padding:18px`, ad-hoc `12px`/`8px` gaps — no rhythm | Deep-dive §3 Spacing tokens / 8px rhythm |
| 8 | Flat price/label/features — no size or weight hierarchy beyond the price | Deep-dive §2 Type scale + hierarchy |
| 9 | Button label `Buy` — vague, not action-specific | Deep-dive §4 / §5 Button copy states the outcome |
| 10 | `text-align:center` on the feature list — ragged left edge, hard to scan | Deep-dive §3 Left-align scannable lists |
| 11 | `Inter` primary typeface | Banned AI-slop font (`doctrine/references/ai-slop-banned-fonts.md`) |

---

## AFTER — the fixed version

Palette derived per §1.4 (1 hue + variations), brand hue **230**, neutrals tinted with the same hue (§1.2). HSB shown in comments, HEX for implementation.

```html
<div style="
  background:#ffffff;
  border:1px solid #e7e8ee;            /* Light 230,4,93 — decorative divider §1.4 */
  border-radius:16px;
  box-shadow:0 1px 2px rgba(31,33,46,0.06), 0 6px 16px rgba(31,33,46,0.08);
  padding:32px;                         /* 8px rhythm, 4x token §3 */
  font-family:'Source Sans 3', sans-serif;
  max-width:340px;">

  <!-- Plan label: neutral Dark, NOT brand colour §1.3 -->
  <p style="
    color:#5a5d72;                      /* Dark 230,18,45 — secondary text */
    font-size:13px; font-weight:600; letter-spacing:0.08em;
    text-transform:uppercase; margin:0 0 8px;">Pro</p>

  <!-- Price: display face, Darkest neutral, dominant in hierarchy §2 -->
  <div style="font-family:'Andada Pro', serif;">
    <span style="color:#1f212e; font-size:44px; font-weight:600; line-height:1;">$29</span>
    <span style="color:#5a5d72; font-size:16px;">/mo</span>
  </div>

  <p style="
    color:#5a5d72; font-size:15px; line-height:1.5;
    margin:8px 0 24px;">Everything you need to scale.</p>

  <ul style="
    color:#34374a;                      /* Darkest 230,25,28 — body text, ≥4.5:1 */
    font-size:15px; line-height:1.6; text-align:left;
    list-style:none; padding:0; margin:0 0 24px;">
    <li style="padding:6px 0;">Unlimited projects</li>
    <li style="padding:6px 0;">5 team seats</li>
    <li style="padding:6px 0;">Priority support</li>
    <li style="padding:6px 0;">Advanced analytics</li>
  </ul>

  <!-- Primary action: only brand colour on the card, clear outcome copy §1.3/§5 -->
  <button style="
    width:100%;
    background:#3a52cc;                  /* Primary 230,71,80 — interactive */
    color:#ffffff; border:none; border-radius:10px;
    padding:14px 20px; font-size:16px; font-weight:600;
    box-shadow:0 1px 2px rgba(31,33,46,0.10);
    cursor:pointer;">Start Pro plan</button>

  <!-- Secondary link: also interactive, brand colour earns its meaning §1.3 -->
  <a href="#" style="
    display:block; margin-top:16px;
    color:#3a52cc; font-size:14px; text-decoration:underline;">Compare all plans</a>
</div>
```

### Each fix mapped to its rule

| # | Change | From → To | Rule satisfied |
|---|--------|-----------|----------------|
| 1 | Body/price text off pure black | `#000` → `#1f212e` / `#34374a` (tinted Darkest) | §1.3 Avoid pure black |
| 2 | Plan label de-coloured | brand `#2563eb` → neutral `#5a5d72` | §1.3 Brand only on interactive |
| 3 | Neutrals unified on hue 230 | mixed greys → one tinted ramp | §1.2 Tint all neutrals |
| 4 | Sub-copy contrast | `#999` (≈2.85:1) → `#5a5d72` (≈5.8:1) | §1.6 Small text ≥ 4.5:1 |
| 5 | Brand colour reserved for the two interactive elements (button + link) | heading/button/link all blue → only button + link | §1.3 One brand colour, interactive only |
| 6 | Shadow softened + neutralised | dark/coloured `0.35`–`0.6` alpha → layered neutral `0.06`/`0.08` | Deep-dive §5/§9 Subtle layered shadows |
| 7 | Spacing on an 8px rhythm | `18px` + ad-hoc gaps → `32px` pad, `8/16/24px` steps | Deep-dive §3 Spacing tokens |
| 8 | Real type hierarchy | flat → 44px price (display) / 15px body / 13px label | Deep-dive §2 Type scale |
| 9 | Button copy states outcome | `Buy` → `Start Pro plan` | Deep-dive §4/§5 Action-specific labels |
| 10 | Feature list left-aligned, full-width button | centred → left-aligned, `width:100%` CTA | Deep-dive §3 Scannable alignment |
| 11 | Deliberate typeface pairing | `Inter` → Andada Pro (display) + Source Sans 3 (body) | Banned-fonts list + pairing principle |

### Net effect

The BEFORE card reads as generic AI output: floating dark shadow, brand colour sprayed everywhere so nothing signals "click me", failing-contrast grey copy, no rhythm. The AFTER card spends its one brand colour only where action happens, holds a clear price-first hierarchy on a tinted neutral ramp, sits on a quiet two-layer shadow, and breathes on an 8px grid — a deliberate interface rather than a default one.
