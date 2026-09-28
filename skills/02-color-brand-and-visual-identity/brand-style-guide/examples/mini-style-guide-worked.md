# Köya Coffee Roasters — Mini Brand Style Guide

**Version:** 1.0 | **Date:** June 2026 | **Prepared by:** Chwezi Core Systems

A compact, single-page style guide for **Köya**, a specialty coffee roaster sourcing from East
African smallholder cooperatives and selling direct-to-consumer subscriptions plus wholesale to
cafés. This worked example shows the *minimum viable* deliverable: every section carries concrete,
shippable values — no placeholders. Use it as the calibration target for length, specificity, and
the stated-choice discipline the full template demands.

---

## 1. Logo Usage

The logo is a horizontal lockup: a hand-drawn coffee-cherry mark beside the **Köya** wordmark.

**Variants**

| Variant | File | Use when |
|---|---|---|
| Primary (Ember on Bone) | `koya-primary.svg` | Light backgrounds — default for most contexts |
| Reversed (Bone on Ember) | `koya-reversed.svg` | Ember, Espresso, or dark photo backgrounds |
| Monochrome (Espresso) | `koya-mono.svg` | Single-colour print, embossing, stamps |
| Mark only | `koya-mark.svg` | Favicon, app icon, social avatar, bag seal |

**Clear space** — Keep a margin of **1× the cap-height of the K** on all four sides. Nothing —
text, image, or rule — enters that zone.

**Minimum size** — Digital: **120px** wide (full lockup) / **24px** (mark only). Print: **28mm**
wide (full lockup) / **8mm** (mark only). Below these, switch to the mark.

---

## 2. Colour Palette

Roles are fixed: build roughly 70% on neutrals (Bone/Espresso), 25% on Ember, 5% Leaf for accents.

| Role | Name | Hex | OKLCH | Use |
|---|---|---|---|---|
| Primary | **Ember** | `#C24A1E` | `oklch(0.585 0.158 41)` | Brand surfaces, primary buttons, the mark |
| Secondary | **Espresso** | `#2B1A12` | `oklch(0.255 0.038 48)` | Headlines, footers, body text on Bone |
| Accent | **Leaf** | `#3F7A52` | `oklch(0.555 0.105 152)` | Origin tags, "in stock" status, links on Bone |
| Neutral light | **Bone** | `#F6F1E7` | `oklch(0.953 0.018 84)` | Page background, card fills |
| Neutral mid | **Husk** | `#B8AD98` | `oklch(0.735 0.028 88)` | Borders, dividers, captions |

**Contrast (WCAG 2.2):** Espresso on Bone = **13.8:1** (AAA body). Ember on Bone = **4.6:1**
(AA for ≥18px / bold or UI components — never small body text). Bone on Ember = **4.5:1** (AA).
Leaf on Bone = **4.1:1** — use Leaf for links at ≥16px bold only; otherwise pair with an
underline so colour is never the sole signal.

---

## 3. Typography Specimen

**Approved pairing — Andada Pro (display) + Public Sans (body).** A sturdy, calligraphic editorial
serif (Huerta Tipográfica) against a clean grotesque body: cross-category contrast, distinct moods committed to fixed roles.
Both are open-licence (SIL OFL / US Government) and self-hosted via Fontsource. Neither appears on
the banned-font list.

> **Köya. Roasted in small batches, the morning you order.**
> Single-origin beans from cooperatives in Sipi Falls and Mount Elgon. We roast to order, seal
> within the hour, and ship the same day — so the cup you brew tastes like the week it was picked.

| Element | Font | px / rem | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| Display / H1 | Andada Pro | 52 / 3.25 | 600 | 1.1 | -0.02em |
| H2 | Andada Pro | 34 / 2.125 | 600 | 1.15 | -0.01em |
| H3 | Andada Pro | 24 / 1.5 | 500 | 1.25 | 0 |
| Body | Public Sans | 16 / 1.0 | 400 | 1.6 | 0 |
| Caption | Public Sans | 13 / 0.8125 | 400 | 1.5 | 0.01em |
| Label / Tag | Public Sans | 12 / 0.75 | 600 | 1.4 | 0.06em (uppercase) |

Two typefaces only. Hierarchy comes from weight and size within these families, never a third face.

---

## 4. Spacing System

8px base grid; every gap is a multiple of 8.

| Token | Value | Use |
|---|---|---|
| `space-1` | 8px | Tag padding, icon-to-label gaps |
| `space-2` | 16px | Default component padding |
| `space-3` | 24px | Card padding, between stacked fields |
| `space-4` | 40px | Between content groups |
| `space-6` | 64px | Section gaps (mobile) |
| `space-8` | 96px | Section gaps (desktop), hero padding |

Grid: 4-col / 16px gutter (mobile 375px), 12-col / 32px gutter, max content **1200px** (desktop).

---

## 5. Photography Style

**Mood:** earthy, warm, hands-on, honest, sunlit, unposed.

Shoot real growers, real hands sorting cherries, steam off a fresh pour, kraft bags mid-pack —
photographed in daylight with a warm white balance that sits beside Ember and Bone, never a cold
or blue-grey grade. Show the origin and the craft, not stock café clichés (no latte-art-only
flatlays, no anonymous baristas mid-laugh). Minimum 2000px long edge for web; one consistent grade
across any page. No generic posed stock; AI-generated imagery is not approved for client-facing use.

---

## 6. One Do / One Don't

**Do** — Set headlines in **Andada Pro 600 in Espresso on a Bone background**, with Ember reserved
for the buttons and the mark. The serif carries the editorial, harvest-to-cup warmth the brand
sells, and the contrast clears AAA.

**Don't** — Don't set Ember body text on Bone (4.6:1 fails AA below 18px and looks muddy), don't
stretch or recolour the lockup, and don't add a third typeface to "spice up" a layout — hierarchy
lives in Andada Pro and Public Sans weights alone.
