# Reference: Font Categories, Usage, and Approved Baselines

Font routing is based on design intent, not only artifact type. Each category maps to a folder
in `fonts/<category>/` and to a family of visual voices. Before committing, scan the matching
folder for present premium files and read its `MANIFEST.md`.

The eight top-level category folder names are fixed team taxonomy. On a new device, or after
pulling a font-taxonomy change, create or verify these folders before adding files or scanning.
Individual font selections may differ by device; category names must not.

> Pairing always crosses a display/header face with a refined body face. A category tells you
> the voice and role; `pairing-principles.md` tells you how to combine faces.

## Routing order

1. **Artifact context:** proposal, SRS, dashboard, app UI, landing page, pitch deck, campaign,
   report, document, mobile screen, etc.
2. **Design voice:** formal, editorial, product, technical, friendly, expressive, or
   script/cursive.
3. **Functional role:** display, body, UI, code/data, or accent.
4. **Licence and availability:** premium present? embed allowed? raw-file redistribution allowed?

## 01 - Formal / Institutional

**Use for:** official, legal, finance, government, board, policy, SRS/BRD, business plans,
formal proposals, statutory or audit-ready documents.

**Baseline faces:** Source Serif 4, Spectral, Libre Baskerville, Arapey.

**Premium folder:** `fonts/01-formal-institutional/`
**Typical role:** serious serif display/body with a quiet sans body or UI layer.

## 02 - Editorial / Literary

**Use for:** authored reports, whitepapers, essays, thought leadership, premium report covers,
cultural or magazine-like documents.

**Baseline faces:** Andada Pro (local: Andada ht_2015), Alegreya, Libre Caslon Text, Theano Didot
(display only).

**Premium folder:** `fonts/02-editorial-literary/`
**Typical role:** distinctive editorial display with a readable serif or quiet sans body.

## 03 - Modern Product / Grotesque

**Use for:** SaaS landing pages, startup marketing, pitch decks, branded product UI, product
launches, pricing pages, contemporary web apps.

**Baseline faces:** Bricolage Grotesque. Premium/manual faces: Clash Display, Satoshi, Cabinet
Grotesk, General Sans.

**Premium folder:** `fonts/03-modern-product-grotesque/`
**Typical role:** strong product display with a polished grotesque body.

## 04 - Technical / Data / Code

**Use for:** dashboards, developer tools, admin panels, API docs, code-adjacent UI, analytics,
data products, technical documentation.

**Baseline faces:** Public Sans (with `tabular-nums` for data), Source Serif 4, JetBrains Mono,
Fira Code (JetBrains Mono also for short labels).

**Premium folder:** `fonts/04-technical-data-code/`
**Typical role:** Public Sans for UI/body with JetBrains Mono accents; mono faces only for code,
IDs, logs, or data accents.

## 05 - Friendly / Humanist

**Use for:** healthcare, education, NGO/public-service products, onboarding, support flows,
forms, service design, accessibility-sensitive interfaces.

**Baseline faces:** Atkinson Hyperlegible, Lexend, Alegreya Sans, Hanken Grotesk, Public Sans.

**Premium folder:** `fonts/05-friendly-humanist/`
**Typical role:** warm body/UI face under a more distinctive heading face, or accessible UI body.

## 06 - Expressive Display / Artistic

**Use for:** campaign heads, posters, event identities, cultural brands, portfolio covers,
beauty/luxury moments, bold hero sections.

**Baseline faces:** Syne (watchlist, recheck 2026-12-29), Unbounded, Bodoni Moda, Eczar, Theano Didot.

**Premium folder:** `fonts/06-expressive-display-artistic/`
**Typical role:** display only, paired with a quiet body face.

## 07 - Script / Cursive / Handwritten

**Use for:** signatures, short accent words, invitations, boutique/beauty/event branding,
human annotation effects.

**Baseline faces:** Caveat, Kalam, Dancing Script, Great Vibes, Sacramento.

**Premium folder:** `fonts/07-script-cursive-handwritten/`
**Typical role:** accent only. Never body text, never dense UI, rarely more than a few words.

## 08 - Body / UI Workhorses

**Use for:** the readable body and UI layer beneath a distinctive display face from another
category.

**Baseline faces:** Public Sans, Hanken Grotesk, Source Sans 3 body-only, Atkinson Hyperlegible.

**Premium folder:** `fonts/08-body-ui-workhorses/`
**Typical role:** body, captions, labels, forms, and UI text. Never the whole identity by itself.

## Quick chooser by artifact

| Artifact | Default category | Header -> Body example |
|---|---|---|
| Business plan / statutory report / SRS / legal proposal | 01 Formal / Institutional | Source Serif 4 -> Public Sans |
| Premium report / whitepaper / thought leadership | 02 Editorial / Literary | Andada Pro -> Source Serif 4 or Public Sans |
| Dashboard / admin UI / API docs | 04 Technical / Data / Code | Public Sans (Semibold) -> Public Sans (`tabular-nums`) + JetBrains Mono accents |
| SaaS landing / product marketing / pitch deck | 03 Modern Product / Grotesque | Bricolage Grotesque or Clash Display -> Hanken Grotesk or Satoshi |
| Healthcare / education / civic service UI | 05 Friendly / Humanist | Atkinson Hyperlegible -> Public Sans, or Alegreya -> Atkinson Hyperlegible |
| Campaign / poster / expressive hero | 06 Expressive Display / Artistic | Syne or Bodoni Moda -> Public Sans |
| Signature / boutique accent / handwritten note | 07 Script / Cursive / Handwritten | Great Vibes or Caveat -> Public Sans |
| Generic readable body layer | 08 Body / UI Workhorses | Any approved display -> Hanken Grotesk or Public Sans |

## Guardrails

- Never use banned primary faces from `ai-slop-banned-fonts.md`.
- Never use a script/cursive face for body text.
- Never let body workhorses become a monotype identity.
- Never place Geist in any folder; it is banned.
- Never use Fraunces or any IBM Plex face; banned 2026-09-29 (HOUSE).
- Never use Newsreader, Cormorant / Cormorant Garamond, Crimson Pro, Space Mono, Plus Jakarta Sans,
  Instrument Sans, DM Sans, Outfit, Playfair Display or Lora; secondary-banned 2026-09-29 [AI]
  (see `docs/continuous-improvement/slop-doctrine-refresh-2026-10-font-watchlist.md`). Their
  `fonts/` folders are retained pending Peter's per-operation removal decision; do not select them.
- Syne is approved but on the watchlist (one AI-tool signal); state a human-design reason when
  choosing it.
- State the chosen display + body pair and reason before producing output.
