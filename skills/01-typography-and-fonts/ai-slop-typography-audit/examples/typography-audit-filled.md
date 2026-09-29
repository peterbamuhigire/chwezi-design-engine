# Worked example: A filled AI-slop typography audit

A complete, copy-real application of `ai-slop-typography-audit` end to end against a sample
landing-page stylesheet: detect each banned and secondary-slop face with the rule it breaks, score
every finding critical/major/minor, then state one deliberate, non-slop remediation. Built on
`doctrine/references/ai-slop-banned-fonts.md` (the guard list) and the named pairings in
`skills/01-typography-and-fonts/font-selection-and-pairing/references/pairing-catalog.md`.

---

## The artifact under audit

> **Sokoni — SaaS landing page.** A marketing site for a B2B inventory product. We were handed the
> shipped stylesheet (below) and asked: "does this read AI-generated, and if so, fix the type."
> Context: startup/product, web (HTML/CSS). No binding brand guideline mandates fonts.

```css
/* chwezi-slop-disable banned-primary-font,pure-black-body-text -- Chwezi design engine (M10-09 review, 29 Sep 2026): audited stylesheet quoted as found, before the fix */
:root {
  --font-sans:    "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-display: "Geist", "Inter", sans-serif;
  --font-accent:  "Space Grotesk", "Inter", sans-serif;   /* used on the eyebrow + pricing */
  --font-ui:      system-ui, -apple-system, sans-serif;   /* buttons, nav, form labels */
}

h1, h2, h3 { font-family: var(--font-display); font-weight: 600; letter-spacing: -0.01em; }
.eyebrow, .price { font-family: var(--font-accent); font-weight: 500; }
body { font-family: var(--font-sans); font-weight: 400; color: #000;
       font-size: 17px; line-height: 1.7; letter-spacing: 0.03em; }
.btn, nav a, label { font-family: var(--font-ui); font-weight: 500; }

/* type scale */
h1 { font-size: 40px; }   /* hero */
h2 { font-size: 32px; }
h3 { font-size: 24px; }
p  { font-size: 17px; }
.small { font-size: 15px; }
/* chwezi-slop-enable banned-primary-font,pure-black-body-text */
```

Classify → **03 Modern Product / Grotesque** (`doctrine/references/font-groups-and-usage.md`) — this
sets which approved group the remediation must draw from.

---

## Findings (each tagged, with the rule it breaks)

| # | Severity | Where | Face / pattern | Rule it breaks (`ai-slop-banned-fonts.md` + structural) |
|---|---|---|---|---|
| F1 | **Critical** | `--font-sans` → `body` | **Inter** as primary body face | Banned primary §1 — Inter is *the* AI-default sans; using it as the body voice is the single strongest slop tell. |
| F2 | **Critical** | `--font-display` → `h1–h3` | **Geist** as primary display face | Banned primary — Geist (Vercel) is the current-generation Inter-successor convergence font; reaching for it on headings is the new default tell. |
| F3 | **Critical** | `--font-accent` → eyebrow/price | **Space Grotesk** as the distinctive choice | Secondary "escape" slop §2 — the named convergence trap picked to *feel* non-slop; it is the reflex, not a deliberate choice. |
| F4 | **Major** | `--font-ui` → buttons/nav/labels | **Bare system stack** (`system-ui`) used as a standalone UI voice | Banned bare-system-stack §1 — a system stack alone is the no-decision default; it is not a stated typeface. |
| F5 | **Major** | whole sheet | **Effective monotype** — Inter is the visible reality of every stack (it's the first real face in sans, display, and accent; system-ui resolves to a near-Inter grotesque) | Structural: "one font for everything." The four variables are theatre — the page is monotone Inter-ish grotesque top to bottom. |
| F6 | **Major** | all weights 400/500/600 | **Timid mid-weights only** — no extreme (no ≥800 display, no real contrast) | Structural: hierarchy leans on size alone; 600 headings over 400 body is a weak, templated contrast. |
| F7 | **Minor** | the scale 40/32/24/17/15px | **Near-equal size steps** — hero 40px ÷ body 17px ≈ 2.35×, and 40→32→24 are ~1.25–1.33 but the hero is too small to read as a hero | Structural: timid scale; no dramatic jump a confident landing page needs. |
| F8 | **Minor** | `body` letter-spacing `0.03em` | **Wide-tracked body** | Structural: positive tracking on long body copy is a slop tell — body text wants 0 (tracking is for caps/eyebrows). |
| F9 | **Minor** | `body color: #000` | **Pure-black body text** | Structural: `#000` on white is harsh and "untouched-default"; considered type uses a near-black (e.g. `#1a1a1a`). |

Severity rule applied (per the skill): banned **primary** faces are critical (F1–F3 — F3 is the
secondary-slop face used *as the distinctive choice*, so it lands critical); standalone bare-system
and structural monotype/weight failures are major (F4–F6); scale, tracking, and colour polish are
minor (F7–F9).

---

## Anti-pattern check (don't half-fix)

Per the skill's anti-patterns: swapping Inter for one other single sans and calling it done would
still fail F5/F6/F8. The remediation below replaces the **faces** *and* fixes monotype, weights,
tracking, and the scale — otherwise the page stays slop with a new name on it.

---

## The deliberate remediation (one stated decision)

Draw the replacement from **03 Modern Product / Grotesque** of `pairing-catalog.md` - pairing **P1**, the named non-slop
default for startup/product:

- **Display / headings: Bricolage Grotesque (800).** A contrasty, slightly quirky grotesque no
  templating tool reaches for — it gives Sokoni an authored headline voice. OFL, fully embeddable.
  Deliberately **not** Geist, Inter, or Space Grotesk (the three faces we just removed).
- **Body: Hanken Grotesk (400).** A calm geometric grotesque that recedes under the display face and
  holds long marketing copy. OFL.
- **One-line reason (state before editing):** *"An expressive OFL grotesque headline (Bricolage 800)
  over a quiet geometric body (Hanken 400) gives Sokoni a confident, non-slop product voice with real
  800/400 weight contrast — and both faces ship without a licence problem."*

Why this pairing and not a like-for-like swap: it is **cross-mood-matched** (expressive display vs
quiet body), carries hierarchy on a **weight extreme** (800 vs 400, fixing F6), and is a genuine
**two-face pairing** (fixing F5) rather than one grotesque wearing four variable names.

### Remediation mapped finding-by-finding

| Finding | Fix |
|---|---|
| F1 Inter body | → **Hanken Grotesk 400** as the body face. |
| F2 Geist display | → **Bricolage Grotesque 800** as display. |
| F3 Space Grotesk accent | → fold eyebrow/price into the pairing: eyebrow = Bricolage 700 uppercase, price = Bricolage 800. No third face. |
| F4 bare system UI | → buttons/nav/labels = **Hanken Grotesk 600**; system stack demoted to *fallback only*, after the named face. |
| F5 monotype | → resolved by the genuine Bricolage/Hanken split across display vs body. |
| F6 timid weights | → contrast now **800 vs 400** (display vs body), not 600 vs 400. |
| F7 timid scale | → push to a Perfect-Fourth scale, hero ~67–89px (a real ~4–5× jump over 16px body). |
| F8 wide-tracked body | → body `letter-spacing: 0`; keep `-0.01em` on the hero and `+0.08em` only on uppercase eyebrow. |
| F9 pure-black body | → body `color: #1a1a1a` (near-black). |

### Remediated stylesheet (the before/after the skill asks for)

```css
:root {
  --font-display: "Bricolage Grotesque", Georgia, serif;     /* named face first, fallback after */
  --font-body:    "Hanken Grotesk", system-ui, sans-serif;   /* system stack demoted to fallback */
}

h1, h2, h3 { font-family: var(--font-display); letter-spacing: -0.01em; }
h1 { font-weight: 800; font-size: clamp(3rem, 1.6rem + 6.2vw, 5.61rem); line-height: 1.0; } /* 48→89px */
h2 { font-weight: 800; font-size: clamp(2rem, 1.34rem + 2.9vw, 3.157rem); line-height: 1.1; }
h3 { font-weight: 700; font-size: 1.777rem; line-height: 1.2; }

body { font-family: var(--font-body); font-weight: 400; color: #1a1a1a;
       font-size: 1rem; line-height: 1.6; letter-spacing: 0; }   /* tracking 0 on body */

.eyebrow { font-family: var(--font-display); font-weight: 700;
           text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.75rem; }
.price   { font-family: var(--font-display); font-weight: 800; }
.btn, nav a, label { font-family: var(--font-body); font-weight: 600; }
```

Two faces, real 800/400 weight contrast, a ~5× hero jump, zero-tracked near-black body, and the
system stack now sits **after** a named face as a fallback — not as the decision.

---

## Audit verdict

Original: **3 critical, 3 major, 3 minor** — reads unambiguously AI-generated (Inter body + Geist
display + Space Grotesk accent is the textbook 2025 slop signature, over a monotone grotchy stack).
Remediated to the stated **Bricolage Grotesque 800 → Hanken Grotesk 400** pairing, all nine findings
closed. Hand off to `font-embedding-and-licensing` for the woff2-variations load and subsetting.

---

## References

- `skills/01-typography-and-fonts/ai-slop-typography-audit/SKILL.md` (the workflow this applies).
- `doctrine/references/ai-slop-banned-fonts.md` (the banned + secondary-slop guard list).
- `skills/01-typography-and-fonts/font-selection-and-pairing/references/pairing-catalog.md` (pairing P1, 03 Modern Product / Grotesque).
- `doctrine/references/type-scale-and-spacing.md` · `pairing-principles.md` · `font-groups-and-usage.md`.
