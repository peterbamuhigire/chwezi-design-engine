# Design System Skills

Design System Skills is the Chwezi cross-cutting engine for the presentation layer: typography, colour, brand identity, layout, interface and interaction design, UX process, content design, imagery, motion, data visualisation, documents, presentations, print and game visual experience. It activates alongside whichever domain engine owns the content, and it governs how that content looks and behaves. Its 101 skills cover selection, specification, production handoff and review, under a written anti-slop doctrine. That doctrine has three working parts. The first is a machine-readable banned-font list (`doctrine/references/ai-slop-banned-fonts.json`), enforced by a write-time gate: a hard ban on Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces and the whole IBM Plex superfamily; a secondary ban on seventeen further faces, including Space Grotesk, Poppins, Montserrat, DM Sans, Playfair Display and Lora; and Source Sans 3 allowed only as a paired body face. The second is `chwezi-slop`, a deterministic detector that checks source files and rendered pages against a rule registry. The third is `design_query`, an offline catalogue with calibrated search that declines to answer when no record fits the query.

The engine works to WCAG 2.2 AA (ISO/IEC 40500:2025) and the WAI-ARIA Authoring Practices, PDF/UA-2 (ISO 14289-2:2024), ISO 9241-161:2025, Google's Core Web Vitals thresholds, Apple's Human Interface Guidelines and Material 3, the SIL Open Font License 1.1 for font embedding, and the ISO 12647 and PDF/X conventions for print. Its outputs include design directions and art-direction boards, brand identity and style guides, colour systems and design-token packs, typeface selections with licence checks, interface and interaction specifications, handoff redlines with acceptance criteria, formatting specifications for DOCX, PDF, PPTX and XLSX, print specifications, dashboards and infographics, recorded UI demo videos, and severity-rated audits (design, WCAG 2.2, anti-slop and whole-product) with remediation plans. It serves designers, product and engineering teams, agencies, and the other Chwezi engines whenever their deliverables need a considered visual layer. Every font approval traces to human design authority. AI-vendor sources are admitted only as evidence for a ban.

## Installation

**Prerequisites.** Node.js 18 or later runs the clone installer, the hooks and the `chwezi-slop` detector. CI uses Node 24. Python 3.11 or later runs the validators, `design_query` and the Codex model-policy helper; CI uses Python 3.12, with `PyYAML` and `pytest`. The detector's browser tier uses the consuming project's own locked Playwright and installs nothing itself.

**Claude Code plugin.** The marketplace is `chwezi-design-system` and the plugin is `design-system` (version 1.1.0, defined in `.claude-plugin/`):

```text
/plugin marketplace add https://github.com/peterbamuhigire/design-system-skills
/plugin install design-system@chwezi-design-system
```

The plugin registers all 101 skills and the enforcement hooks in `hooks/hooks.json`: the banned-font gate, the token-file gate, the destructive-command gate, and the `chwezi-slop` immediate and deep passes. Setting `hooks_enabled` to `false` in the plugin's user configuration turns the hooks off and keeps the skills.

**Clone installer.** `install.sh` and `install.ps1` delegate to `scripts/install-engine.js`. The default scope is the user (`~/.claude`); `--scope project` installs into `.claude` under the current directory. The installer also accepts `--dry-run` and `--json`, and `scripts/install-engine.js` provides `uninstall`, `doctor` and `list-installed`.

```text
git clone https://github.com/peterbamuhigire/design-system-skills
cd design-system-skills
./install.sh --scope project        # macOS, Linux, Git Bash
.\install.ps1 --scope project       # Windows PowerShell
```

**Codex.** Codex reads `AGENTS.md` as the router. Before substantive work it runs `python <engine-root>/.codex/ensure_model_policy.py --runtime codex --check` (see `.codex/README.md`). Claude and other runners skip this step.

**Manual route.** Clone the repository and read `AGENTS.md` (`CLAUDE.md` is a thin bridge to it). Then read `doctrine/design-doctrine.md`, glob `skills/**/SKILL.md` fresh each time, route on the frontmatter `description`, and run `governance/design-quality-gate.md` before you call an artefact finished. In Claude Code, read these skills directly rather than through the `Skill` tool. Useful commands:

```text
python -X utf8 scripts/design_query.py search "editorial report serif" --domain typography
node tools/slop-detector/cli.mjs --tier deep path/to/project
python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json
python -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures
python -X utf8 -m pytest -q
```

## Capabilities

The tables below were generated from the 101 active `SKILL.md` files under `skills/`. The `_TEMPLATE` scaffold is excluded. The engine has no `ALIAS.md` entries.

| Category | Folder | Skills |
|---|---|---:|
| Quality, accessibility and review | `00-cross-cutting-ops-qa-a11y` | 16 |
| Typography and fonts | `01-typography-and-fonts` | 7 |
| Colour, brand and visual identity | `02-color-brand-and-visual-identity` | 7 |
| Layout, grid and composition | `03-layout-grid-and-composition` | 4 |
| Web and UI design | `04-web-and-ui-design` | 10 |
| UX process, research and psychology | `05-ux-process-research-and-psychology` | 7 |
| Sector and domain UX | `06-sector-and-domain-ux` | 7 |
| Mobile: iOS, Android, cross-platform | `07-mobile-ios-android-cross-platform` | 5 |
| Motion and interaction | `08-motion-and-interaction` | 3 |
| Design systems, tokens and theming | `09-design-systems-tokens-and-theming` | 5 |
| Content design and UX writing | `10-content-design-and-ux-writing` | 3 |
| Imagery, illustration and art direction | `11-imagery-illustration-and-art-direction` | 6 |
| Data visualisation and dashboards | `12-data-viz-and-dashboards` | 4 |
| Presentations and documents | `13-presentations-and-documents` | 7 |
| Conversion and web-page patterns | `14-conversion-and-web-page-patterns` | 5 |
| Game visual experience | `15-game-visual-experience` | 5 |
| **Total** | | **101** |

| Category | Skill | What it does |
|---|---|---|
| Quality, accessibility and review | `accessibility-wcag-2-2-compliance` | Designs and audits interactive UI against WCAG 2.2 AA: keyboard, focus, names, target size, reflow |
| Quality, accessibility and review | `click-path-audit` | Traces controls that silently do nothing: resets, races, stale closures, final-state mismatches |
| Quality, accessibility and review | `design-audit` | Audits one UI, page, flow or document and returns evidence-backed, severity-rated findings |
| Quality, accessibility and review | `design-critique-and-review-facilitation` | Runs a critique session with a clear ask, a single decider and recorded outcomes |
| Quality, accessibility and review | `design-engine-and-product-improvement` | Runs Kaizen improvement cycles on this engine or a rendered product, with re-measurement |
| Quality, accessibility and review | `design-ethics-and-anti-dark-patterns` | Screens consent, urgency, pricing, subscription and retention flows for deception |
| Quality, accessibility and review | `design-qa-and-pre-launch-review` | Final go/no-go gate on parity, browsers, devices, accessibility, performance and slop |
| Quality, accessibility and review | `inclusive-and-assistive-design` | Designs beyond the WCAG floor, including low-literacy and shared-phone, low-bandwidth users |
| Quality, accessibility and review | `internationalization-and-rtl-design` | Adapts UI and documents to locales, scripts, RTL and bidi text, and locale formats |
| Quality, accessibility and review | `performance-as-ux-and-core-web-vitals` | Treats Core Web Vitals, asset and font weight, and layout shift as design constraints |
| Quality, accessibility and review | `plan-canvas-design-review` | Lets a reviewer anchor feedback to exact elements and return Approve or Request changes |
| Quality, accessibility and review | `product-design-audit` | Scores and prioritises findings across web, SaaS, iOS, Android and desktop surfaces |
| Quality, accessibility and review | `slop-doctrine-refresh-and-research-loop` | Refreshes banned-font and slop doctrine with the Digital Research Engine |
| Quality, accessibility and review | `ui-demo` | Records Playwright demo videos (WebM) with an injected cursor and rehearsed selectors |
| Quality, accessibility and review | `ux-remediation-and-redesign` | Turns audit findings into a remediation plan, redesign, re-test and before/after result |
| Quality, accessibility and review | `visual-product-slop-audit` | Audits imagery, brand assets, screens and AI features for visual and product slop |
| Typography and fonts | `ai-slop-typography-audit` | Finds banned or convergent type, weak hierarchy and unstated type choices |
| Typography and fonts | `fine-typesetting-and-typesetting-qa` | Checks rag, hyphenation, widows, figures, quotes, dashes and UK or East African style |
| Typography and fonts | `fluid-responsive-typography` | Scales browser type across viewports and containers while keeping zoom, reflow and measure |
| Typography and fonts | `font-embedding-and-licensing` | Embeds a chosen font in web, DOCX, PPTX, PDF or XLSX with verified permission |
| Typography and fonts | `font-selection-and-pairing` | Chooses and pairs typefaces for voice, audience and licence, outside the banned list |
| Typography and fonts | `premium-font-scan` | Checks local premium font folders and manifests before the OFL baseline is used |
| Typography and fonts | `variable-fonts-and-opentype-features` | Configures variable axes, optical sizing, numerals and OpenType features |
| Colour, brand and visual identity | `accessible-color-and-contrast` | Verifies and fixes contrast for text, UI, focus and data colours, with non-colour cues |
| Colour, brand and visual identity | `brand-style-guide` | Packages an approved identity into a client-facing guide |
| Colour, brand and visual identity | `brand-visual-identity` | Defines or refreshes an identity across logo use, colour, type, spacing and imagery |
| Colour, brand and visual identity | `color-selection` | Generates candidate website palettes from brand hues, imagery, audience and mood |
| Colour, brand and visual identity | `color-system-and-palette` | Builds tonal ramps, semantic roles, tokens, contrast contracts and theme mappings |
| Colour, brand and visual identity | `dark-mode-and-theming` | Builds and audits dark, high-contrast and multi-theme systems |
| Colour, brand and visual identity | `logo-and-wordmark-design` | Specifies marks, wordmarks, lockups, clear space, favicons and app icons |
| Layout, grid and composition | `composition-and-visual-hierarchy` | Sets focal point, reading order, figure-ground and visual tension |
| Layout, grid and composition | `editorial-and-long-form-layout` | Lays out articles, documentation and web reports for sustained reading |
| Layout, grid and composition | `layout-grid-and-spacing` | Defines columns, margins, gutters, spacing rhythm and alignment |
| Layout, grid and composition | `responsive-and-adaptive-layout` | Adapts layouts with intrinsic sizing, fluid values, breakpoints and container queries |
| Web and UI design | `ai-agent-ux` | Designs agent and copilot status, plans, approvals, uncertainty and trust controls |
| Web and UI design | `ai-output-design` | Structures AI answers with citations, grounding and editable refinement |
| Web and UI design | `component-states-and-interaction-fidelity` | Specifies hover, focus-visible, pressed, selected and read-only states for a control |
| Web and UI design | `distinctive-by-design` | Sets one defensible visual signature before high-fidelity build |
| Web and UI design | `form-ux-design` | Designs field anatomy, validation, errors, multi-step flow and submission recovery |
| Web and UI design | `interaction-design-patterns` | Selects proven behaviour, navigation, action, layout and data-display patterns |
| Web and UI design | `interface-craft-micro-details` | Checks concentric radii, optical alignment, tabular numerals and image edges |
| Web and UI design | `practical-ui-design` | Sets a practical system for colour, type, spacing, layout, buttons and forms |
| Web and UI design | `premium-ui-ux-design` | Conveys premium value through trust, clarity, restraint and service detail |
| Web and UI design | `webapp-gui-design` | Designs SaaS shells, dense desktop UI, tables, dialogs and system states |
| UX process, research and psychology | `demo-driven-design-process` | Converges designs through repeated demos, dogfooding, selection and decision capture |
| UX process, research and psychology | `enterprise-ux-process` | Runs a maturity-declared UX engagement for regulated, B2B or large internal products |
| UX process, research and psychology | `heuristic-evaluation-and-design-critique` | Inspects against Nielsen and Tognazzini heuristics with 0–4 severity |
| UX process, research and psychology | `journey-mapping-and-service-design` | Builds personas, JTBD, journeys, experience maps and service blueprints |
| UX process, research and psychology | `ux-psychology` | Gives cautious cognitive rationale: Gestalt, affordances, memory, attention, bias |
| UX process, research and psychology | `ux-research-and-usability-testing` | Plans usability sessions, field research, surveys, card and tree tests, and synthesis |
| UX process, research and psychology | `wireframing-and-prototyping` | Matches sketch, wireframe or prototype fidelity to the learning question |
| Sector and domain UX | `ecommerce-and-checkout-ux` | Designs product pages, cart, guest checkout, payment, returns and order status |
| Sector and domain UX | `fintech-and-financial-product-ui` | Designs banking, wallet, mobile-money and payment screens that prevent costly errors |
| Sector and domain UX | `healthcare-ui-design` | Designs safety-centred clinical, EHR, patient-portal and medication interfaces |
| Sector and domain UX | `hospitality-hotel-restaurant` | Designs guest journeys, booking and staff screens for hotels, restaurants and venues |
| Sector and domain UX | `legal-sector-ui-ux` | Designs law-firm sites with ethical trust signals, practice areas and intake |
| Sector and domain UX | `pos-and-retail-operations` | Designs point-of-sale workflows kept aligned with stock, customers and payments |
| Sector and domain UX | `sector-strategies` | Sets evidence-based web direction for sectors without a dedicated skill |
| Mobile: iOS, Android, cross-platform | `android-ui-ux-design` | Designs native Material and Compose screens, states and adaptive layouts |
| Mobile: iOS, Android, cross-platform | `app-store-presence-and-aso` | Plans store icons, screenshots, preview video, captions and localisation |
| Mobile: iOS, Android, cross-platform | `cross-platform-design-parity` | Makes unify-or-diverge decisions for one product on iOS and Android |
| Mobile: iOS, Android, cross-platform | `ios-ui-ux-design` | Designs native iPhone and iPad screens with Dynamic Type and VoiceOver |
| Mobile: iOS, Android, cross-platform | `touch-gesture-and-haptics` | Sets touch targets, thumb reach, gesture alternatives and truthful haptics |
| Motion and interaction | `micro-interactions-and-feedback` | Designs per-control feedback, optimistic actions, rollback and reduced-motion options |
| Motion and interaction | `motion-design` | Defines system timing, easing, transitions, choreography and reduced motion |
| Motion and interaction | `motion-react-implementation` | Implements approved motion in React or Next.js with `motion/react`, SSR-safe |
| Design systems, tokens and theming | `component-library-architecture` | Defines component anatomy, variants, states, slots, APIs and documentation |
| Design systems, tokens and theming | `design-handoff-and-dev-spec` | Hands off token-referenced redlines, states and testable acceptance criteria |
| Design systems, tokens and theming | `design-tokens-and-naming` | Names and exports primitive, semantic and component tokens across themes and brands |
| Design systems, tokens and theming | `figma-and-tooling-workflow` | Structures Figma variables, modes, auto-layout, Dev Mode and library publishing |
| Design systems, tokens and theming | `measured-style-pack` | Measures an approved reference into a deterministic token pack |
| Content design and UX writing | `error-empty-and-system-messaging` | Writes error, empty, loading, offline, permission and destructive-action messages |
| Content design and UX writing | `ux-writing-and-microcopy` | Writes buttons, labels, hints, tooltips, menus and other interface copy |
| Content design and UX writing | `voice-tone-and-content-style-guide` | Defines voice chart, tone map, terminology glossary and content style guide |
| Imagery, illustration and art direction | `advertising-creative-art-direction` | Art-directs campaign creative: copy-image relationships, big-idea tests, critique |
| Imagery, illustration and art direction | `ai-image-generation-art-direction` | Turns briefs into generated imagery with reject gates and provenance notes |
| Imagery, illustration and art direction | `art-direction-routes` | Proposes named routes and safe, stretch and bold direction boards from real content |
| Imagery, illustration and art direction | `iconography-system-design` | Designs icon grids, keylines, stroke, metaphors, naming and export |
| Imagery, illustration and art direction | `illustration-style-and-systems` | Defines illustration language, scene systems, characters and ownable motifs |
| Imagery, illustration and art direction | `photography-art-direction` | Directs sourcing, shooting, treatment, cropping and licensing of photographs |
| Data visualisation and dashboards | `chart-selection-and-encoding` | Chooses chart type and honest encoding for the question asked |
| Data visualisation and dashboards | `dashboard-and-data-product-design` | Designs dashboards and KPI scorecards with filters, drill-downs and freshness states |
| Data visualisation and dashboards | `data-illustration-and-infographics` | Designs self-contained infographics for print, presentation, web and social |
| Data visualisation and dashboards | `data-visualization` | Crafts and reviews single charts for accuracy, annotation and accessibility |
| Presentations and documents | `deck-system` | Designs decks, pitches and board updates with a visual system and presenter notes |
| Presentations and documents | `design-storytelling-and-case-studies` | Structures evidence-backed narratives for design decks and case studies |
| Presentations and documents | `docx-report-and-document-formatting` | Formats editable DOCX reports with named styles, contents, tables and embedded fonts |
| Presentations and documents | `email-and-newsletter-design` | Builds HTML email that holds up in Outlook, Gmail, Apple Mail and dark mode |
| Presentations and documents | `pdf-proposal-and-bankable-document-design` | Designs print-ready PDF proposals, feasibility studies, tenders and lender documents |
| Presentations and documents | `print-production-and-finishing` | Specifies ink limits, spot colours, proofs, folds, binding and finishes for press |
| Presentations and documents | `xlsx-and-financial-model-presentation` | Presents XLSX models through number formats, styles, charts and print layout |
| Conversion and web-page patterns | `empty-error-and-loading-states` | Designs empty, error, loading, offline, partial-failure and retry states |
| Conversion and web-page patterns | `landing-page-and-conversion-design` | Structures landing and campaign pages around one honest conversion goal |
| Conversion and web-page patterns | `navigation-and-information-architecture` | Defines content inventory, taxonomy, sitemap, navigation, search and filters |
| Conversion and web-page patterns | `onboarding-and-first-run-design` | Designs first-run, activation, setup checklists and time-to-value paths |
| Conversion and web-page patterns | `trust-credibility-and-social-proof` | Selects, verifies and places testimonials, reviews, ratings and certifications |
| Game visual experience | `educational-and-childrens-game-experience` | Designs age-appropriate learning games with scaffolding, safety and stopping cues |
| Game visual experience | `game-art-direction-and-visual-development` | Sets visual pillars, shape language, colour scripting and an asset bible |
| Game visual experience | `game-feel-feedback-camera-and-haptics` | Tunes anticipation, impact, timing, VFX, camera, hit-stop and haptics |
| Game visual experience | `game-ui-hud-and-diegetic-interfaces` | Designs HUDs, menus, maps, inventory, controller focus and diegetic interfaces |
| Game visual experience | `game-visual-experience-orchestration` | Routes a game's player fantasy and loop into HUD, art, feedback and handoff |

**Font doctrine in brief.** The authored source is `doctrine/references/ai-slop-banned-fonts.md`, and the hook reads its machine-readable mirror, `ai-slop-banned-fonts.json` (last synced 29 September 2026). Each ban carries a reason label: `[AI]` for an AI-ecosystem default, `[POP]` for a generic, overused face, `[SYS]` for a lazy system default and `[HOUSE]` for a house ruling.

- **Hard ban:** Inter, Geist (every cut), Roboto, Open Sans, Lato, Arial, Fraunces, and every face of IBM Plex.
- **Secondary ban:** Space Grotesk, Instrument Serif, Poppins, Montserrat, Nunito and Nunito Sans. On 29 September 2026 the list gained Newsreader, Cormorant, Cormorant Garamond, Crimson Pro, Space Mono, Plus Jakarta Sans, Instrument Sans, DM Sans, Outfit, Playfair Display and Lora.
- **System stacks:** a bare system stack used on its own is banned.
- **Monospace:** Roboto Mono and IBM Plex Mono are banned as deliberate monospace choices. JetBrains Mono and Fira Code are approved.
- **Watchlist:** Syne, DM Serif Display, DM Serif Text, Helvetica, Mona Sans, Recoleta and DejaVu Sans are not banned, but choosing one needs a stated human-design reason. They are next reviewed on 29 December 2026.

## References

Everything below is cited in this repository: in skill `references/`, the doctrine, the governance registers, the continuous-improvement and audit records, `THIRD_PARTY_NOTICES.md`, and the my-10-kaizen commits of 29 September 2026. Books contributed only paraphrased, task-oriented guidance, and no extraction is stored here. The typeface folders under `fonts/` are assets. Their `MANIFEST.md` files record licence classes but give no foundry or source URLs, so they are not listed as sources.

### Books

- Adams, S. et al. (2012) *Graphic Design Rules*, Frances Lincoln
- Atkinson, C. (2011) *Beyond Bullet Points*, Microsoft Press
- Bell, A. and Pickering, H. *Every Layout*
- Ben-David, Y. (2026) *The Fundamentals of UX Writing*, Apress
- Bertin, J. *Semiology of Graphics: Diagrams, Networks, Maps* (French original *Sémiologie graphique*)
- Bodnar, K. and Cohen, J. (2012) *The B2B Social Media Book*
- Bonneville, D. N. *The Big Book of Font Combinations*
- Braganza, A. *Looks Good to Me*
- Branson (2020) *UX/UI Design: Introduction Guide to Intuitive Design and User-Friendly Experience*
- Bringhurst, R. *The Elements of Typographic Style*
- Buxton, B. (2007) *Sketching User Experiences*
- Cao, J., Zieba, K., Stryjewski, S. and Ellis, M. (2015) *Web UI Design for the Human Eye*, UXPin
- Chaffey, D. (2024) *Digital Marketing: Strategy, Implementation and Practice*
- Cook, P. (2022) *Fundamentals of HTML, SVG, CSS and JavaScript for Data Visualisation*, Leanpub
- Cooper, A., Reimann, R., Cronin, D. and Noessel, C. (2014) *About Face: The Essentials of Interaction Design*
- Crane, B. E. *Infographics*
- Csikszentmihalyi, M. (2009) *Flow: The Psychology of Optimal Experience*, Harper Row
- Dannaway (2022) *Practical UI*
- Deacon (2020) *UX and UI Design Strategy*
- Devitt, Ryan et al. *Arrive: A Design Innovation Framework to Deliver Breakthrough Services, Products and Experiences*, Routledge
- Duarte, N. (2010) *Resonate*, Wiley
- Duarte, N. (2012) *HBR Guide to Persuasive Presentations*
- Fekeshazi, Z. (c. 2017) *Product Managers' Guide to UX Design*, UX Studio
- Few, S. (2004) *Show Me the Numbers*, Analytics Press
- Few, S. (2006) *Information Dashboard Design*, Analytics Press
- Flux Academy (Segall, R. et al.) *The Complete Guide for Choosing Colors*
- Gothelf, J. and Seiden, J. (2021) *Lean UX*, 3rd edn, O'Reilly
- Graham, L. *Basics of Design*
- Grant, W. (2018) *101 UX Principles*, Packt
- Gujral, R. *The AI Instinct*
- Hatton, A. (2007) *The Definitive Business Pitch*
- Hinton, A. (2010) "The story is the thing", in *UX Storytellers: Connecting the Dots*
- Hochuli, J. *Detail in Typography*
- Holmes, N. *Joyful Infographics*
- Hoskins, D. *The Product-Minded Engineer*
- IDEO.org *The Field Guide to Human-Centered Design*
- Itten, J. *The Art of Color*
- Keith, J. *Resilient Web Design*
- Kelley and Sheehan (c. 2021) *Advertising Management in a Digital Environment*, Routledge
- Kirk, A. et al. *Data Visualization: Representing Information on Modern Web*
- Klaff, O. (2011) *Pitch Anything*
- Klein, L. (2013) *UX for Lean Startups*, O'Reilly
- Knaflic, C. N. (2015) *Storytelling with Data*, Wiley
- Kocienda, K. (2018) *Creative Selection*, St. Martin's Press
- Kohavi, R., Tang, D. and Xu, Y. (2020) *Trustworthy Online Controlled Experiments*
- Krug, S. (2010) *Rocket Surgery Made Easy*
- Krug, S. (2014) *Don't Make Me Think, Revisited*, New Riders
- Kuleszo *How to Design Better UI Components 3.0* (2022, rev. 2024)
- Kupsh and Graves (1993) *How to Create High-Impact Business Presentations*, NTC Business Books
- LaGrone, B. (2016) *Web Design Blueprints*, Packt
- Landa, R. (2022) *Strategic Creativity*, Routledge
- Levy, J. (2015) *UX Strategy*, O'Reilly Media
- Lidwell, W., Holden, K. and Butler, J. (2010) *Universal Principles of Design*, Rockport
- Lupton, E. *Thinking with Type*
- Macfadyen (2025) *Designing AI Interfaces*, O'Reilly
- Macnab, M. *Design by Nature*, New Riders
- Maioli, L. (2018) *Fixing Bad UX Designs*, Packt
- Mall, D. *Design That Scales*
- Mangialardi, M. *Design Systems for Developers*
- Marcotte, E. *Responsive Web Design*
- McNeil, P. (2010) *The Web Designer's Idea Book, Volume 2*
- McNeil, P. (2013) *The Web Designer's Idea Book, Volume 3*, HOW Books
- Miller, C. H. *Digital Storytelling*
- Minto, B. *The Pyramid Principle*
- Mohan, S. *Designing the AI-Driven Data Foundations*
- Müller-Brockmann, J. (1981) *Grid Systems in Graphic Design*
- Munzner, T. (2014) *Visualization Analysis and Design*, CRC
- Nassery (2025) *Next-Level A/B Testing*
- Neil, T. (2014) *Mobile Design Pattern Gallery*, 2nd edn, O'Reilly
- Neumeier, M. *The Brand Gap*
- Norman, D. (2013) *The Design of Everyday Things*, Basic Books
- Osmani, A. (2026) *Web Performance Engineering in the Age of AI*, O'Reilly Media
- Paduraru (2024) *Roots of UI/UX Design*; Paduraru *Fundamentals of Creating a Great UI/UX*
- Panzarella (2022) *UI/UX Web Design Simply Explained*
- Pickering, H. *Inclusive Components*
- Plumley, G. (2011) *Website Design and Development: 100 Questions to Ask Before Building a Website*, Wiley
- Podmajersky, T. *Strategic Writing for UX*
- Randazzo, G. W. (2024) *Winning Marketing Strategies Using Generative AI*, Business Expert Press
- Reason, J. (1990) *Human Error*, Cambridge University Press
- Reynolds, G. *Presentation Zen*
- Ries, E. (2011) *The Lean Startup*
- Rosenfeld, L., Morville, P. and Arango, J. *Information Architecture for the Web and Beyond*, 4th edn
- Rubinelli, S. *Institutional Health Communication in the Information Age*
- Sadr, A. *Designing for AI*
- Saffer, D. *Microinteractions*
- Sandler, L. H. (2023) *Universal Principles of Storytelling for Designers: 100 Key Concepts*
- Schwabish, J. *Better Presentations*
- Scott, B. and Neil, T. (2009) *Designing Web Interfaces*, O'Reilly
- Segall, R. *Complete Guide to Choosing Fonts*, Flux Academy
- Serling (ed.) (2002) *How to Write Million Dollar Ads, Sales Letters and Web Marketing Pieces*
- Skolnick, E. *Video Game Storytelling*
- Snyder, C. *Paper Prototyping*
- Sosulski, K. *Data Visualization Made Simple*
- Spencer, D. *A Practical Guide to Information Architecture*
- 3DTotal *Dynamic Characters*
- Tidwell, J., Brewer, C. and Valencia, A. (2020) *Designing Interfaces*, 3rd edn, O'Reilly
- Tufte, E. R. (1990) *Envisioning Information*, Graphics Press
- Tufte, E. R. (2001) *The Visual Display of Quantitative Information*, 2nd edn, Graphics Press
- Tufte, E. R. (2006) *Beautiful Evidence*, Graphics Press
- Venkatesan, R. and Lecinski, J. (2026) *The AI Marketing Canvas*, 2nd edn, Stanford Business Books
- Vignelli, M. *The Vignelli Canon*
- Ware, C. (2004) *Information Visualization: Perception for Design*, Morgan Kaufmann
- Wathan, A. and Schoger, S. *Refactoring UI*
- Wiegers, K. *Software Requirements Essentials*
- Wildish, S. *Chartography*
- Wu and Liang (eds) (2026) *Human-AI Interaction and Collaboration*, Cambridge University Press
- Yablonski, J. (2024) *Laws of UX*
- Yau, N. *Visualize This*
- Zelazny, G. *Say It with Charts*
- Working texts recorded in the 2026 Kaizen records: *Applying the Kaizen in Africa*; *LEAN: Ultimate Collection*; *Paid for Your Perspective*

### Repositories

The first eight entries are the repositories from the my-10-kaizen operation (29 September 2026) that this engine took something from. The other two studied in that operation, Superpowers and Graphify, contributed nothing here. Ideas were paraphrased, and no source code, data rows, palettes, font pairings or fixtures were copied. None of these repositories is authority for a design approval.

- **Impeccable**, https://github.com/pbakaus/impeccable (Apache-2.0, commit `114ea1d`). Adapted: the rule and threshold ideas, waiver model and hook tiers in `tools/slop-detector/` (`chwezi-slop`); the visitor-mode framing; the refinement verbs. Its font lists are evidence for bans only.
- **UI UX Pro Max**, https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (MIT, commit `09170ee`). Adapted: BM25 ranking with per-domain abstention floors, versioned calibration, the graded relevance harness and the catalogue query contract behind `scripts/design_query.py`. None of its font, palette or style data is reused.
- **Ponytail**, https://github.com/DietrichGebert/ponytail (MIT, commit `e3ba2aa`). Adapted: native-control sufficiency framing (`accessibility-wcag-2-2-compliance/references/native-control-sufficiency.md`).
- **Understand Anything**, https://github.com/Egonex-AI/Understand-Anything (MIT, commit `b05cc3b`). Adapted: the "graphs that teach" problem framing (`data-visualization/references/relationship-diagrams-that-teach.md`).
- **Addy Osmani agent-skills**, https://github.com/addyosmani/agent-skills (MIT, commit `2686b62`). Adapted: owned-negative routing semantics from `scripts/run-evals.js`, applied in `scripts/routing_smoke_test.py`.
- **Caveman**, https://github.com/JuliusBrussee/caveman (split licence: MIT for the skill, BSL-1.1 for parts of the engine). Adapted: the report-only `SKILL.md` byte warning in `scripts/validate_engine.py` (idea only).
- **Awesome Claude Skills**, https://github.com/ComposioHQ/awesome-claude-skills (no root licence file). Used as a vetted pointer: it surfaced anydesign and the Anthropic `canvas-design` and `theme-factory` defaults recorded as ban evidence.
- **Archify**, https://github.com/tt-a1i/archify (MIT). Kaizen input for the diagram visual standards and the diagram-aware banned-font gate. No Archify code or default styling was adopted.
- **anydesign**, https://github.com/uxKero/anydesign (MIT, commit `d81bd89`). Adapted: the capture-budget and element-scope ideas in `measured-style-pack`.
- **Anthropic skills**, `anthropics/skills` (HEAD `3337550`). The `canvas-design` bundled fonts and the `theme-factory` defaults, used as evidence for bans only.
- **Anthropic Claude Cookbooks**, `anthropics/claude-cookbooks`, "Prompting for frontend aesthetics" (last changed `944b94a`). The model's own admission that it converges on certain faces, used as evidence for bans only.
- **Mermaid**, `mermaid-js` (`develop`, `theme-default.js`). Its default diagram font stack is recorded as ban-side evidence.
- **Everything Claude Code (ECC)**, https://github.com/affaan-m/ECC. The MSYS2 path-conversion fix used in `install.sh` and the user/project scope choice in the installer.
- **codex-astra-luna-orchestrator**, https://github.com/donvito/codex-astra-luna-orchestrator (commit `21f4561`). Concept reference for the Codex model-policy helper in `.codex/`.
- **Chwezi Dev Engine**, https://github.com/peterbamuhigire/chwezi-dev-engine. The TF-IDF routing ranker vendored with provenance into `scripts/routing_smoke_test.py`.

### Standards and official sources

- W3C, Web Content Accessibility Guidelines (WCAG) 2.2, Recommendation (updated 12 December 2024; ISO/IEC 40500:2025), https://www.w3.org/TR/WCAG22/, with Understanding and Quick Reference pages
- W3C, WCAG 3.0 Working Draft, https://www.w3.org/TR/wcag-3.0/, recorded as a draft that does not replace 2.2
- W3C, WAI-ARIA 1.2 and the ARIA Authoring Practices Guide, https://www.w3.org/WAI/ARIA/apg/
- WHATWG, HTML Living Standard, https://html.spec.whatwg.org/
- W3C CSS specifications: CSS Color 4 (OKLCH) and CSS View Transitions Levels 1 and 2
- ISO 14289-2:2024 (PDF/UA-2); ISO 9241-161:2025 (visual user-interface elements)
- PDF/X-1a and PDF/X-4 print exchange formats; the ISO 12647 series for offset print conditions
- Design Tokens Community Group format
- Google web.dev: Core Web Vitals (LCP, INP, CLS at the 75th percentile), INP replacing FID (12 March 2024), Baseline, performance budgets, https://web.dev/articles/vitals
- Apple Human Interface Guidelines, Liquid Glass documentation, SwiftUI and SF Symbols, https://developer.apple.com/design/human-interface-guidelines/
- Google Material 3 and Material 3 Expressive, https://m3.material.io/; Jetpack Compose documentation
- GOV.UK Design System, date input component and dates pattern, https://design-system.service.gov.uk/
- Microsoft accessibility guidance for Word and PowerPoint (support.microsoft.com)
- SIL Open Font License 1.1, https://openfontlicense.org
- Section 508 and the ADA (enterprise accessibility verification)
- Healthcare: HIPAA, FDA 21 CFR Part 11, IEC 62366-1 usability engineering (cited in-repo as ISO 62366-1), HL7 FHIR
- Uganda, *Data Protection and Privacy Act, 2019* (ULII consolidated text)
- ISO 4217 (currency codes), ISO 8601 (dates) and ISO 216 (paper sizes)
- Research papers: Cleveland and McGill (1984) "Graphical Perception", *JASA*; Mackinlay (1986) "Automating the Design of Graphical Presentations", *ACM ToG*; Miller (1956) "The magical number seven, plus or minus two", *Psychological Review*; Cowan (2001) "The magical number 4 in short-term memory"; Sweller (1988) "Cognitive load during problem solving"; Amershi et al. (2019) "Guidelines for Human-AI Interaction", CHI; Rodden, Hutchinson and Fu (2010) HEART framework, Google; Nielsen and Molich, heuristic evaluation

### Websites and articles

- Nielsen Norman Group: 10 usability heuristics, severity ratings, response-time limits, generative UI, neobrutalism, *State of UX 2026*, https://www.nngroup.com/
- Tognazzini, *First Principles of Interaction Design* (revised)
- Butterick, *Practical Typography*, https://practicaltypography.com/; *The Elements of Typographic Style Applied to the Web*, http://webtypography.net/
- Laws of UX, lawsofux.com; Utopia fluid type and space calculator, https://utopia.fyi; Atomic Design, atomicdesign.bradfrost.com
- Google PAIR, *People + AI Guidebook*; Stanford Web Credibility Project (Fogg et al., 2002)
- MDN Web Docs: Popover API, variable fonts, scroll-driven animations, `prefers-reduced-motion`, date input, https://developer.mozilla.org/
- Chrome for Developers, "View transitions in 2025"; web.dev on WebGPU, variable fonts, CLS and `prefers-reduced-motion`
- WebAIM: *The WebAIM Million* (2025 and 2026) and the contrast checker, https://webaim.org/; TPGi Colour Contrast Analyser; Coblis and Vischeck colour-blindness simulators; The A11Y Project
- GSMA, *The State of Mobile Internet Connectivity 2025*
- Colour tools: Coolors, Adobe Color, Paletton, ColorHexa, Name That Color (chir.ag), Image Color Picker; Interaction Design Foundation on colour theory; Empower on colour psychology
- Eleken blog: design consistency, design-system checklist, "Making it like Stripe", banking app design, dashboard examples, onboarding, UX improvements, AI design workflow, https://www.eleken.co/
- Design Studio UI/UX blog: dashboard, generative-AI UI, SaaS design and cost, mobile app examples, onboarding, navigation, web-app patterns, https://www.designstudiouiux.com/
- Studio and award benchmarks: Pentagram, IDEO, Instrument, MetaLab, Clay, Work & Co, Koto, AREA 17, Active Theory, Locomotive, Resn, Hello Monday, BUCK; Awwwards, Apple Design Awards, D&AD Pencils, CSS Design Awards, The FWA, The Webby Awards
- Craft references: Stripe (design blog; "Behind the gradient"), Linear, Vercel Geist, Figma ("How we built the Figma design team")
- Trade press: Apple Newsroom (June 2025 software design), Google Blog and TechCrunch on Material 3 Expressive, MacStories on bento layouts, LogRocket on web brutalism, Smashing Magazine on agentic AI UX, Creative Boom on 2026 design trends, StudioMeyer on bento grids, It's Nice That, LBBonline, Fortune on IDEO, TechCrunch on Ueno
- Presentation craft: Slideworks on action titles; Barbara Minto; the InfoVis Wiki on the data-ink ratio
- Tooling documentation: Motion easing functions, GSAP licensing (and Webflow's announcement), three.js, React Three Fiber, Typst, Quarto, Tailwind CSS configuration, AI SDK generative UI, OpenAI image-generation and image-prompting guides
- Legal directories cited for local search: Martindale-Hubbell, Avvo
