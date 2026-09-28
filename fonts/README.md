# fonts/ - Shared category folders for local font curation

These folders hold purchased, manually downloaded, or locally tested font files that are
available on this device. Font binaries are gitignored. The tracked `MANIFEST.md` files and the
eight directory names are the durable team contract.

Every teammate may choose different individual fonts inside the folders, but everyone must use
the same eight category folders so agents scan and classify fonts consistently across devices.

## Required folder taxonomy

This repository must always contain exactly these top-level font category folders under
`fonts/`:

```text
fonts/
├── 01-formal-institutional/
├── 02-editorial-literary/
├── 03-modern-product-grotesque/
├── 04-technical-data-code/
├── 05-friendly-humanist/
├── 06-expressive-display-artistic/
├── 07-script-cursive-handwritten/
└── 08-body-ui-workhorses/
```

Do not rename, merge, split, or invent top-level categories without updating
`doctrine/references/font-groups-and-usage.md`, all eight manifests, and the typography skills.
Family subfolders are allowed inside a category.

## New-device setup after clone or pull

After cloning this repo on a new device, or after pulling changes on a device whose `fonts/`
folder may be incomplete, run this from the repository root:

```powershell
$fontCategories = @(
  "01-formal-institutional",
  "02-editorial-literary",
  "03-modern-product-grotesque",
  "04-technical-data-code",
  "05-friendly-humanist",
  "06-expressive-display-artistic",
  "07-script-cursive-handwritten",
  "08-body-ui-workhorses"
)
$fontCategories | ForEach-Object {
  New-Item -ItemType Directory -Force -Path (Join-Path "fonts" $_) | Out-Null
}
```

The command is idempotent: it creates missing folders and leaves existing folders and local font
files untouched. It should be treated as a standing pull/setup step for the team. If a category
folder is missing, create it before scanning fonts or choosing a typeface.

The matching `MANIFEST.md` files are tracked and should normally arrive with the clone. If a
manifest is missing, restore it from the repository before adding fonts to that category.

## Category details

### 01 - Formal / Institutional

Use for artifacts that need authority, sobriety, and institutional trust: legal work, finance,
government, audit-ready reporting, SRS/BRD documents, business plans, policy papers, board packs,
procurement responses, statutory exhibits, and official correspondence.

Place fonts here when they feel credible, restrained, and long-form capable. Serif families often
belong here, but engineered official sans faces may also fit when they are meant for reports or
institutional UI.

Avoid using this category for youthful SaaS launch pages, expressive campaign heroes, casual
service onboarding, or playful posters. The usual pairing is a formal display/body serif with a
quiet body/UI sans from `08-body-ui-workhorses`.

Baseline fallbacks: Source Serif 4, Spectral, Crimson Pro, Libre Baskerville.

### 02 - Editorial / Literary

Use for authored, literary, magazine-like, or premium reading experiences: whitepapers, essays,
thought-leadership reports, cultural reports, publication-style covers, narrative proposals, and
documents that should feel written and art-directed rather than merely official.

Place fonts here when they have a crafted editorial voice, elegant contrast, literary texture, or
cover/title-page presence. They can be more expressive than formal institutional fonts, but still
need strong reading manners.

Avoid using this category for dashboards, dense admin UI, code-heavy technical docs, or generic
startup product chrome. The usual pairing is a distinctive editorial display face with a readable
serif or quiet sans body face.

Baseline fallbacks: Andada Pro, Newsreader, Cormorant Garamond, Alegreya, Libre Caslon Text.

### 03 - Modern Product / Grotesque

Use for contemporary product and brand surfaces: SaaS landing pages, product marketing, startup
pitch decks, pricing pages, launch sites, branded product UI, high-energy onboarding, and modern
commercial web apps.

Place fonts here when they feel current, confident, product-led, and suitable for strong headings
or polished interface text. This is the home for premium grotesques and product sans families
that are distinctive without falling into banned AI-default habits.

Avoid using this category for legal/statutory documents, literary reports, code/data-heavy tools,
or full monotype systems with no display/body contrast. The usual pairing is a strong product
display face with a polished body/UI sans.

Baseline fallback: Bricolage Grotesque. Common manual/premium candidates include Clash Display,
Satoshi, Cabinet Grotesk, and General Sans when their licences permit the intended use.

### 04 - Technical / Data / Code

Use for technical and precision interfaces: dashboards, admin panels, analytics products, API
documentation, developer tools, logs, command examples, code blocks, data tables, engineering
reports, and code-adjacent UI.

Place fonts here when they improve numeric clarity, code readability, tabular scanning, or
engineered precision. Monospace faces belong here only for code, IDs, logs, formulas, and sparse
data accents.

Avoid using monospace faces for paragraphs, marketing body copy, or non-technical branding.
Avoid expressive display drama in dense operational tools. The usual pairing is a rational
proportional UI/body face with a mono accent for code/data.

Baseline fallbacks: Public Sans (with `tabular-nums`), Source Serif 4, JetBrains Mono, Fira Code,
Space Mono for short labels only.

### 05 - Friendly / Humanist

Use for warm, accessible, people-facing products and documents: healthcare, education, civic
services, NGO/public-service work, onboarding, support flows, forms, older-user interfaces,
patient/student/parent experiences, and service design.

Place fonts here when they feel humane, legible, plainspoken, calm, and approachable without
becoming childish. Accessibility-sensitive body/UI families belong here.

Avoid using this category to make formal statutory work look casual, to solve luxury/editorial
display needs, or to default to banned friendly cliches. The usual pairing is a friendly body/UI
face beneath a more distinctive heading face, or an accessibility-first UI face for dense forms.

Baseline fallbacks: Atkinson Hyperlegible, Lexend, Alegreya Sans, Hanken Grotesk, Public Sans.

### 06 - Expressive Display / Artistic

Use for high-personality display moments: campaigns, posters, event identities, cultural brands,
portfolio covers, hero sections, beauty/luxury moments, festival material, creative pitches, and
one-off visual statements.

Place fonts here when they are meant to carry the visual identity at large sizes. These are
display-first choices with strong personality, unusual forms, high contrast, or artistic energy.

Avoid using this category for long body copy, dense UI, legal/finance/statutory work, tables, or
small labels unless a specific family has been proven readable at that size. The usual pairing is
one expressive display face with a quiet body face from `08-body-ui-workhorses`.

Baseline fallbacks: Syne, Unbounded, Bodoni Moda, Eczar, Theano Didot.

### 07 - Script / Cursive / Handwritten

Use for short accents that intentionally feel signed, annotated, celebratory, boutique, or
handmade: signatures, invitation accents, beauty/event marks, short human notes, annotation-style
callouts, and occasional expressive words.

Place fonts here when they are script, cursive, calligraphic, brush, marker, or handwritten in
character. They are accent fonts, not systems.

Avoid using this category for paragraphs, forms, dashboards, UI labels, tables, accessibility-
sensitive text, formal business documents, or anything more than a few words. The usual pairing
is a script accent with a very readable body face.

Baseline fallbacks: Caveat, Kalam, Dancing Script, Great Vibes, Sacramento.

### 08 - Body / UI Workhorses

Use for the quiet, durable reading layer beneath a more distinctive display face: body copy,
captions, labels, forms, dense UI, mobile screens, report body text, tables, and long-running
product surfaces.

Place fonts here when they are legible, resilient, neutral enough to support another voice, and
strong across weights, sizes, and platforms. These faces keep the artifact usable while the
display category carries the identity.

Avoid using this category as the whole identity by itself. A body workhorse without a separate
display choice usually reads as generic. Source Sans 3 is permitted only as a paired body face,
never as standalone display or primary identity.

Baseline fallbacks: Public Sans, Hanken Grotesk, Source Sans 3 body-only, Atkinson Hyperlegible.

## Selection protocol

1. Classify the artifact by context: document, site, app UI, dashboard, deck, campaign, etc.
2. Classify the desired voice: formal, editorial, product, technical, friendly, expressive, or
   script/cursive.
3. Classify the role: display, body, UI, code/data, or accent.
4. Verify the eight top-level category folders exist on this device. Create any missing folder
   before continuing.
5. Scan the matching category folder for present `.ttf`, `.otf`, or `.woff2` files.
6. Read that folder's `MANIFEST.md` and confirm role, avoid-for notes, pairing, licence,
   embedding permission, and file redistribution permission.
7. If a present premium family fits the voice and licence, use it. Otherwise use the named OFL
   baseline from `doctrine/references/font-groups-and-usage.md`.
8. State the typeface pair and reason before producing the artifact.

## Manifest schema

Each manifest uses this schema so agents can make defensible choices:

```markdown
| Family | Role | Voice | Best for | Avoid for | Pair with | Licence | Embed? | Redistribute file? | Present? |
```

## Licence policy

- OFL families are safe to use and embed, but font files are still kept out of git by policy.
- Fontshare families such as Clash Display, Satoshi, Cabinet Grotesk, and General Sans may be
  used and embedded, but raw files may not be redistributed.
- Premium commercial families must be added to the right category manifest with explicit
  embedding and redistribution notes before use.
- Geist is banned. Do not place it in any category.

Drop files directly into the category folder, or into family subfolders inside it. Update the
manifest when the licence, intended routing, or approved use changes; actual file presence is
detected by scanning the device.
