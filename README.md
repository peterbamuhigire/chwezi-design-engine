# Design System Skills

Design System Skills is the Chwezi cross-cutting library for typography, visual identity, layout, UX, interface design, imagery, motion, data visualisation, and the design of websites, apps, documents, presentations, and games. Its 101 active skills guide research, design decisions, production handoff, and review under the engine’s design doctrine: make choices for the audience and task, ground approval in human design authority, state licensing and accessibility considerations, and verify current platform or standards claims before relying on them.

The engine produces design directions, brand and token systems, interface and interaction specifications, content and visual systems, production-ready document and print guidance, and evidence-based audits or remediation plans. It is for designers, product and engineering teams, agencies, and domain specialists who need a clear, reviewable presentation layer; content strategy and domain rules remain with their owning engines.

## Installation

Install the native Claude Code plugin, or clone the repository and use its installer. The clone installer requires Node.js 18 or newer and supports user or project scope.

```text
/plugin marketplace add https://github.com/peterbamuhigire/design-system-skills
/plugin install design-system@chwezi-design-system

git clone https://github.com/peterbamuhigire/design-system-skills
cd design-system-skills
./install.sh --scope project      # macOS/Linux/Git Bash
.\install.ps1 --scope project     # Windows PowerShell
```

## Capabilities

The table reflects the 101 active `SKILL.md` files under `skills/`, counted from the current tree; the non-skill `_TEMPLATE` scaffold is excluded. Category links open the relevant skill directory.

| Category | Skills | Focus |
|---|---:|---|
| [Quality, accessibility, and review](skills/00-cross-cutting-ops-qa-a11y/) | 16 | Design audits, accessibility, inclusive design, performance-aware UX, pre-launch QA, and improvement workflows |
| [Typography and fonts](skills/01-typography-and-fonts/) | 7 | Selection, pairing, responsive typography, licensing, embedding, and typesetting QA |
| [Colour, brand, and identity](skills/02-color-brand-and-visual-identity/) | 7 | Colour systems, contrast, brand identity, logos, theming, and style guides |
| [Layout and composition](skills/03-layout-grid-and-composition/) | 4 | Grid, spacing, hierarchy, editorial layouts, and responsive composition |
| [Web and interface design](skills/04-web-and-ui-design/) | 10 | Web, desktop, SaaS, forms, interaction states, AI interfaces, and interface craft |
| [UX process and research](skills/05-ux-process-research-and-psychology/) | 7 | Research, usability, journeys, prototyping, critique, and design psychology |
| [Sector UX](skills/06-sector-and-domain-ux/) | 7 | E-commerce, finance, healthcare, hospitality, legal, and retail experiences |
| [Mobile design](skills/07-mobile-ios-android-cross-platform/) | 5 | iOS, Android, cross-platform parity, touch, and app-store presence |
| [Motion and interaction](skills/08-motion-and-interaction/) | 3 | Motion design, micro-interactions, feedback, and implementation guidance |
| [Design systems and tokens](skills/09-design-systems-tokens-and-theming/) | 5 | Tokens, component libraries, tooling, measured style packs, and handoff |
| [Content design and UX writing](skills/10-content-design-and-ux-writing/) | 3 | Microcopy, voice and tone, and system messages |
| [Imagery and art direction](skills/11-imagery-illustration-and-art-direction/) | 6 | Photography, illustration, iconography, AI imagery, campaigns, and art direction |
| [Data visualisation](skills/12-data-viz-and-dashboards/) | 4 | Charts, dashboards, data products, and infographics |
| [Presentations and documents](skills/13-presentations-and-documents/) | 7 | Slides, DOCX/PDF/XLSX, email, storytelling, print production, and finishing |
| [Conversion patterns](skills/14-conversion-and-web-page-patterns/) | 5 | Landing pages, onboarding, navigation, trust, and page states |
| [Game visual experience](skills/15-game-visual-experience/) | 5 | Game art direction, HUDs, feedback, camera, and child-focused game UX |

## References

- [Design System Skills repository](https://github.com/peterbamuhigire/design-system-skills) — active skill inventory and source implementation.
- [Design doctrine](doctrine/design-doctrine.md), [design quality gate](governance/design-quality-gate.md), [common rules](rules/common/core.md), and [engine improvement skill](skills/00-cross-cutting-ops-qa-a11y/design-engine-and-product-improvement/SKILL.md) — local operating principles and review workflow consulted for this overview.
- [Everything Claude Code (ECC)](https://github.com/affaan-m/ECC) — referenced by the repository installer comments for its Windows/MSYS2 path-resolution handling.
