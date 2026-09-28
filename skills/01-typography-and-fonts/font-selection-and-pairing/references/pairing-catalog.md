# Reference: Pairing Catalog

Concrete, named display+body pairings by design-intent category. Every face is checked against
`doctrine/references/ai-slop-banned-fonts.md` and drawn from the approved baselines in
`doctrine/references/font-groups-and-usage.md`.

`pairing-principles.md` is the theory. This catalog is the menu. State the display face, body
face, category, and one-line reason before producing the artifact.

## 01 Formal / Institutional

| # | Display / Header | Body | Why it works |
|---|---|---|---|
| F1 | Source Serif 4 700 | Public Sans 400 | Serious serif authority over a civic, quiet sans body; strong for formal proposals and statutory reports. |
| F2 | Spectral 600 | Public Sans 400 | Literary but restrained serif display over a plain body; good for policy, public-sector, and board documents. |
| F3 | Crimson Pro 700 | Source Serif 4 400 | Formal all-serif register with enough contrast in structure and weight to avoid muddiness. |
| F4 | Source Serif 4 600 | Public Sans 400 (`tabular-nums`) + JetBrains Mono for IDs/figures | Technical-formal tone for reports, standards, governance packs, and SRS/BRD work; mono confined to identifiers and figures. |

## 02 Editorial / Literary

| # | Display / Header | Body | Why it works |
|---|---|---|---|
| E1 | Andada Pro 800 | Source Serif 4 400 | Sturdy, calligraphic editorial headline (Huerta Tipográfica) over a calm reading serif. |
| E2 | Newsreader 700 | Public Sans 400 | News/editorial warmth with neutral sans body clarity. |
| E3 | Cormorant Garamond 700 | Source Serif 4 400 | Elegant high-contrast title face over a durable body serif. Use for covers and title pages. |
| E4 | Alegreya 700 | Alegreya Sans 400 | Humanist editorial pair for education, culture, and long-form narrative reports. |

## 03 Modern Product / Grotesque

| # | Display / Header | Body | Why it works | Note |
|---|---|---|---|---|
| P1 | Bricolage Grotesque 800 | Hanken Grotesk 400 | Distinctive product display over calm modern body; fully OFL. | Baseline, no premium needed. |
| P2 | Clash Display 700 | Satoshi 400 | Confident branded display over premium product body. | Fontshare; embed yes, raw redistribution no. |
| P3 | Cabinet Grotesk 700 | Hanken Grotesk 400 | Sharper corporate startup tone with a softer body. | Fontshare display. |
| P4 | Bricolage Grotesque 800 | Public Sans 400 | Use when product marketing needs more neutral long-copy body text. | All OFL. |

## 04 Technical / Data / Code

| # | Display / Header | Body | Code / Data Accent | Why it works |
|---|---|---|---|---|
| T1 | Public Sans 700 | Public Sans 400 (`tabular-nums`) | JetBrains Mono | One rational civic sans; weight carries hierarchy; tabular figures align data; mono stays in code/IDs. |
| T2 | Source Serif 4 600 | Public Sans 400 | JetBrains Mono | Adds technical-formal serif authority for docs over a rational sans body. |
| T3 | JetBrains Mono 700 | Public Sans 400 | JetBrains Mono | Monospace display gives a deliberate developer signal; proportional body protects readability. |
| T4 | Unbounded 700 | Public Sans 400 | JetBrains Mono | More expressive technical campaign tone while preserving dashboard/body clarity. |

## 05 Friendly / Humanist

| # | Display / Header | Body | Why it works |
|---|---|---|---|
| H1 | Alegreya 800 | Atkinson Hyperlegible 400 | Warm calligraphic display with legibility-first body for healthcare, education, and service products. |
| H2 | Bricolage Grotesque 700 | Lexend 400 | Product energy with a calm learning-friendly body; useful for onboarding and education. |
| H3 | Alegreya 700 | Alegreya Sans 400 | Humanist literary pairing for schools, culture, and social-impact documents. |
| H4 | Source Serif 4 650 | Public Sans 400 | Civic, plainspoken warmth for public-service reports and forms. |

## 06 Expressive Display / Artistic

| # | Display / Header | Body | Why it works |
|---|---|---|---|
| A1 | Syne 800 | Public Sans 400 | Artistic geometric display over quiet civic body; strong for campaigns and posters. |
| A2 | Bodoni Moda 700 | Public Sans 400 | Dramatic high-contrast display with readable body support for luxury/beauty/culture. |
| A3 | Eczar 700 | Alegreya Sans 400 | Textured expressive headline with warm humanist body. |
| A4 | Unbounded 700 | Public Sans 400 | Futuristic display with plain, rational clarity beneath it. |

## 07 Script / Cursive / Handwritten

Script and cursive faces are accents only. They must sit beside a readable display/body system.

| # | Accent | Display / Body System | Why it works |
|---|---|---|---|
| C1 | Great Vibes | Cormorant Garamond 700 -> Public Sans 400 | Formal script for a signature or short flourish without sacrificing readability. |
| C2 | Caveat | Alegreya 800 -> Atkinson Hyperlegible 400 | Casual human annotation over an accessible service-oriented pair. |
| C3 | Kalam | Alegreya 700 -> Alegreya Sans 400 | Handwritten education/workshop accent over a humanist reading pair. |
| C4 | Sacramento | Bodoni Moda 700 -> Public Sans 400 | Boutique/lifestyle accent with a controlled high-contrast display system. |

## 08 Body / UI Workhorses

These are partners, not complete identities.

| Display source | Workhorse body | Why |
|---|---|---|
| Formal serif display | Public Sans 400 | Neutral civic sans under institutional headings. |
| Product grotesque display | Hanken Grotesk 400 | Soft, polished product body that does not compete. |
| Editorial display | Source Serif 4 400 | Quiet serif body for long reading. |
| Accessibility-first display | Atkinson Hyperlegible 400 | Legibility-first body for forms, healthcare, and education. |
| Technical display | Public Sans 400 (`tabular-nums`) | Rational UI body under technical headings and mono accents. |

## Cross-category defaults

| Context | Pairing | One-line reason to state |
|---|---|---|
| Business plan / formal proposal / SRS | Source Serif 4 -> Public Sans | Formal serif authority over a plain civic body; credible and readable. |
| Premium whitepaper / authored report | Andada Pro -> Source Serif 4 | Sturdy, calligraphic editorial headline over a calm long-form reading serif. |
| Dashboard / admin UI | Public Sans -> Public Sans (`tabular-nums`) + JetBrains Mono | One rational sans; weight carries hierarchy; tabular figures align columns; mono confined to code/IDs. |
| SaaS landing / pitch deck | Bricolage Grotesque -> Hanken Grotesk | Distinctive product display over a quiet modern body. |
| Healthcare / education service UI | Alegreya -> Atkinson Hyperlegible | Warm authored headings with accessibility-first body text. |
| Campaign / expressive hero | Syne -> Public Sans | Artistic display energy with readable body support. |
| Cursive accent | Great Vibes accent + Cormorant/Public Sans system | Script is limited to a human signature moment, not body text. |

## Banned-face guard

Neither display nor body may be: Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces, any IBM Plex
face, bare system stack, Space Grotesk, Instrument Serif, Poppins, Montserrat, Nunito/Nunito Sans, or Source Sans 3 as a
display/standalone face. Full reasons are in `doctrine/references/ai-slop-banned-fonts.md`.

## References

- `doctrine/references/pairing-principles.md`
- `doctrine/references/font-groups-and-usage.md`
- `doctrine/references/ai-slop-banned-fonts.md`
- `skills/01-typography-and-fonts/font-selection-and-pairing/references/type-scale-recipes.md`
- `skills/01-typography-and-fonts/font-selection-and-pairing/examples/applied-type-scale.md`
