# Worked example — "Maduuka" store-listing asset spec (v1.0)

A complete, concrete store-listing asset spec for a single product — **Maduuka**, a Chwezi
merchant app (mobile-money payments, stock, and a daily sales dashboard for small shops). It
shows every decision the skill requires: the stated type/color intent, the dual-store **app
icon** delivery, a 5-frame **captioned device-framed screenshot set** in narrative order, the
**App Preview** storyboard, the full **copy hierarchy** mapped to both stores' fields with
character counts, and a **two-locale** localization pass. Real numbers, real captions — not
lorem. This is the pattern to copy for any new listing.

**Brief:** ship Maduuka to the **App Store** (iPhone 6.9" primary, iPad 13" secondary) and
**Google Play** (phone primary, 7" tablet secondary). Target market: Uganda / East Africa,
shop owners. Locales for v1.0: **English (en)** and **Swahili (sw)**.

---

## 0. Stated type & color intent (named before composing — doctrine §2)

> **Caption / marketing type:** **Andada Pro** (approved *02 Editorial / Literary* category,
> `doctrine/references/font-groups-and-usage.md`) for caption **headlines**; **Source Sans 3**
> (approved *08 Body / UI workhorse*) for caption **sub-lines**. Both pass the banned-list check
> (`doctrine/references/ai-slop-banned-fonts.md`) — **not** Inter, **not** Roboto-as-brand. The
> OS face (SF Pro / Roboto) appears **only inside the screenshots** of native UI, which is correct
> and carries no slop penalty.
>
> **Background palette:** Maduuka brand **deep teal `#0E5C55`** field with a warm **amber `#F4A431`**
> accent (the brand seed). Captions are **off-white `#FAF7F0`** on teal.
>
> **Signature compositional move:** a **single continuous teal-to-deep-teal vertical field bleeds
> across all five screenshots**, each device floated at a fixed **−6° tilt**, caption locked to the
> **top third**. That continuity is the authored "one hand" signal vs five isolated raw screenshots.

*Why:* Maduuka is a trust-sensitive money product for non-technical shop owners. Editorial
Andada Pro headlines read *credible and human*; the continuous teal field + consistent tilt make
the page read as a designed product, not a template upload.

---

## 1. App icon — dual-store delivery

Mark comes from `iconography-system-design` (a rounded amber coin-on-teal "M" monogram). Store
delivery:

| Item | App Store | Google Play |
|---|---|---|
| Master | **1024 × 1024** PNG, **flattened, no alpha**, teal bg | **512 × 512** 32-bit PNG |
| Rounding | **square, full-bleed** — system squircle masks it | **square** — adaptive mask applies |
| Safe zone | mark within central ~80% (corners clipped) | mark inside the **66 dp** guaranteed circle; layers full-bleed to 108 dp |
| Layers | layered source for Liquid Glass | adaptive: amber-coin **foreground** + teal **background** layer |

**iOS Liquid Glass variants** (all verified at every grid size + App Store thumbnail):

| Variant | Treatment |
|---|---|
| Light | amber coin on teal, full color |
| Dark | coin on near-black teal `#08322E`; coin edge lightened so it doesn't vanish |
| Tinted (mono) | coin silhouette as a single-weight monochrome layer |
| Clear / glass | reduced background density so the glass material reads |

No price/badge/screenshot baked in. Not pre-rounded; no alpha on the App Store master.

---

## 2. Screenshot set — 5 frames, captioned, device-framed, narrative order

Dimensions: **iPhone 6.9" → 1290 × 2796 px** (primary); iPad 13" → 2064 × 2752; Play phone →
1080 × 1920. Same composition template re-exported per size. Device floated at −6°, teal field
continuous, caption top-third. Headline = Andada Pro; sub-line = Source Sans 3; text off-white
`#FAF7F0` on teal `#0E5C55` → contrast ratio **≈ 9.4:1**, clears WCAG 2.2 §1.4.3 — and stays
legible at the search-result thumbnail size.

| # | Role | Screen shown | Caption headline | Caption sub-line |
|---|---|---|---|---|
| **F1** | **Hook** | Daily "Today" dashboard (sales total) | **"See today's sales the moment you open."** | Live totals, no spreadsheet. |
| **F2** | **Proof** | Send-payment confirm screen | **"Get paid by mobile money in seconds."** | MTN & Airtel, one tap. |
| **F3** | **Differentiator** | Low-stock alert list | **"Know what's running out before it does."** | Automatic stock alerts. |
| **F4** | **Depth** | Weekly trend chart | **"Watch your shop grow, week by week."** | Simple trends, plain language. |
| **F5** | **Depth / trust** | Offline-mode banner + receipt | **"Works even when the network doesn't."** | Records now, syncs later. |

- **F1 stands alone as a thumbnail** — the strongest screen + the value prop; most users decide
  here.
- Frames 1-3 carry the sell; 4-5 add depth for swipers.
- Screens are **real shipped Maduuka UI** with real (anonymized) shop data — not lorem.
- **Google Play feature graphic (1024 × 500, no alpha):** teal field, amber coin-mark left, the
  F1 headline right; nothing critical within 80px of edges (play-button overlay + crop).

---

## 3. App Preview storyboard (App Store, 15-30 s, real footage, muted)

| t | Beat | On-screen (muted-safe) |
|---|---|---|
| 0-3 s | **Hook** | "Today" dashboard animates the sales total up; caption: *"Your shop, at a glance."* |
| 3-9 s | Core action | Tap → send-payment confirm → success haptic ripple; caption: *"Get paid in seconds."* |
| 9-15 s | Differentiator | Low-stock alert slides in; caption: *"Never run out unaware."* |
| 15-22 s | Depth | Weekly trend chart draws; offline banner flashes "Synced". |
| 22-26 s | Close | Coin-mark + wordmark; caption: *"Maduuka — run your shop, simply."* |

- Captured from the **actual app** (no pure motion-graphics ad). **Poster frame = t≈1s** (the
  filled dashboard). Carries fully **muted**.

---

## 4. Copy hierarchy — mapped to each store's fields (with char counts)

### App Store (iOS)

| Field | Limit | Copy | Count |
|---|---|---|---|
| App name | 30 | `Maduuka: Shop Sales & Stock` | 27 |
| Subtitle | 30 | `Get paid, track stock daily` | 27 |
| Promotional text | 170 | `New: offline mode — record sales with no network and sync the moment you reconnect.` | 84 |
| Keywords | 100 | `shop,sales,stock,inventory,mobile money,mtn,airtel,merchant,pos,receipt,offline,duka` | 84 (comma, **no spaces** except inside phrases) |
| Description (first line) | 4000 | `Run your shop from your phone — see today's sales, get paid by mobile money, and know what's running low, all in one place.` | front-loaded |

### Google Play

| Field | Limit | Copy | Count |
|---|---|---|---|
| Title | 30 | `Maduuka: Shop Sales & Stock` | 27 |
| Short description | 80 | `See daily sales, get paid by mobile money, and track stock — even offline.` | 73 |
| Full description (first line) | 4000 | `Maduuka helps small shops in East Africa track daily sales, accept mobile-money payments, and manage stock — simply, on any phone.` | front-loaded; target terms used **naturally**, no stuffing |

**ASO keyword targets:** *shop sales app, stock/inventory, mobile money merchant, duka, offline
POS.* The same value prop runs through icon → F1 → subtitle/short-description = one story.

---

## 5. Localization pass — en + sw

Same layout template; locale is a fill-in, not a redesign.

| Asset | English (en) | Swahili (sw) | Overflow check |
|---|---|---|---|
| Subtitle | Get paid, track stock daily | Pokea malipo, fuatilia bidhaa | 29 ✓ (≤30) |
| F1 headline | See today's sales the moment you open. | Ona mauzo ya leo mara unapofungua. | fits top-third ✓ |
| Short desc (Play) | See daily sales, get paid by mobile money… | Ona mauzo ya kila siku, pokea malipo ya simu… | 79 ✓ (≤80) |

- Swahili runs slightly longer — verified each caption still fits the top-third zone; no clip.
- No RTL locale in v1.0; template is RTL-ready (mirror layout + directional icons) for a future
  Arabic add (`internationalization-and-rtl-design`).

---

## 6. Pre-flight result (against `references/aso-asset-specs.md` §6)

- [x] Icon square, full-bleed, **App Store master has no alpha**; Play mark inside 66 dp circle.
- [x] Liquid Glass light/dark/tinted/clear all legible at every grid size.
- [x] Screenshots at 1290×2796 / 2064×2752 / 1080×1920; F1-F3 sell; captions 9.4:1, legible as
      thumbnails.
- [x] No cross-platform frames; screens are real shipped UI; no lorem.
- [x] No price/badge in the icon. App Preview is real footage, 15-30 s, muted-safe, poster set.
- [x] Copy within every char limit; first description line carries the value prop; Play desc not
      stuffed; iOS keyword field comma-no-space.
- [x] sw captions don't overflow; template RTL-ready.
- [x] Age rating / Data safety consistent with the payment + offline-storage features shown.

---

## Why this beats the default (doctrine §0)
A reviewer sees **one hand**: a single teal field flows across all five frames, every device
sits at the same −6°, the caption headline is the same Andada Pro in the same top-third slot, and
the icon, the first screenshot, and the subtitle tell **one** story — "see your sales, get paid,
track stock." The convergent template version — three raw screenshots on white, the icon
pre-rounded with alpha, captions in Inter, copy that wastes its first line — would have none of
that authored continuity, and would likely trip a review rejection on the alpha icon alone.
