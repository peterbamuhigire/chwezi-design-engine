# Chwezi Design Engine

Chwezi Design Engine is the Chwezi cross-cutting engine for the presentation layer: typography, colour, brand identity, layout, interface and interaction design, UX process, content design, imagery, motion, data visualisation, documents, presentations, print and game visual experience. It activates alongside whichever domain engine owns the content, and it governs how that content looks and behaves. Its [102 skills](.claude-plugin/plugin.json) cover selection, specification, production handoff and review, under a written anti-slop doctrine. That doctrine has three working parts. The first is a machine-readable banned-font list ([JSON registry](doctrine/references/ai-slop-banned-fonts.json)), enforced by a write-time gate: a hard ban on Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces and the whole IBM Plex superfamily; a secondary ban on seventeen further faces, including Space Grotesk, Poppins, Montserrat, DM Sans, Playfair Display and Lora; and Source Sans 3 allowed only as a paired body face. The second is `chwezi-slop`, a deterministic detector that checks source files and rendered pages against a registry of 51 rules (43 static, 8 browser). The third is `design_query`, an offline catalogue with calibrated search that declines to answer when no record fits the query.

The engine works to WCAG 2.2 AA (ISO/IEC 40500:2025) and the WAI-ARIA Authoring Practices, PDF/UA-2 (ISO 14289-2:2024), ISO 9241-161:2025, Google's Core Web Vitals thresholds, Apple's Human Interface Guidelines and Material 3, the SIL Open Font License 1.1 for font embedding, and the ISO 12647 and PDF/X conventions for print. Its outputs include design directions and art-direction boards, brand identity and style guides, colour systems and design-token packs, typeface selections with licence checks, interface and interaction specifications, handoff redlines with acceptance criteria, formatting specifications for DOCX, PDF, PPTX and XLSX, print specifications, dashboards and infographics, recorded UI demo videos, and severity-rated audits (design, WCAG 2.2, anti-slop and whole-product) with remediation plans. It serves designers, product and engineering teams, agencies, and the other Chwezi engines whenever their deliverables need a considered visual layer. Every font approval traces to human design authority. AI-vendor sources are admitted only as evidence for a ban.

## Installation

**Prerequisites.** Node.js 18 or later runs the clone installer, the hooks and the `chwezi-slop` detector. CI uses Node 24; the checks in this document were run on Node 22. Python 3.11 or later runs the validators, `design_query` and the Codex model-policy helper; CI uses Python 3.12 and the checks were run here on 3.14. The only third-party Python packages are `PyYAML` (the routing, route-existence, cross-engine and engine validators) and `pytest` (the test suite). The repository has no requirements file and CI installs both unpinned, so pin them in your own environment when you need repeatable runs. The detector's browser tier uses the consuming project's own locked Playwright and installs nothing itself.

**Repository name.** The GitHub repository is `chwezi-design-engine`. A checkout made before the rename may still sit in a directory called `design-system-skills`. The repository scripts find the repository root from their own location, so the directory name does not matter to them.

**Claude Code plugin.** The marketplace is `chwezi-design-engine` and the plugin is `design-engine` (version 1.1.0, defined in `.claude-plugin/`):

```text
/plugin marketplace add https://github.com/peterbamuhigire/chwezi-design-engine
/plugin install design-engine@chwezi-design-engine
```

The generated Claude plugin manifest lists all 102 skill paths. The repository declares enforcement hooks in `hooks/hooks.json`; verify hook execution and configuration behavior in the target host rather than assuming repository metadata proves runtime behavior.

**Clone installer.** `install.sh` and `install.ps1` delegate to `scripts/install-engine.js`. The default scope is the user (`~/.claude`); `--scope project` installs into `.claude` under the current directory. The installer also accepts `--dry-run` and `--json`, and `scripts/install-engine.js` provides `uninstall`, `doctor` and `list-installed`.

The engine validator, clone installer, and plugin-manifest generator enforce a 5,000-file-entry ceiling for both checkout and package-oriented trees. Package counts exclude `.git`, caches, virtual environments, and `node_modules`; source checkouts are preserved. This guard applies to the repository tools that invoke it. Native Claude Code or Codex plugin installation does not run these repository scripts, so this is not a claim about a marketplace or public-directory package review.

```text
git clone https://github.com/peterbamuhigire/chwezi-design-engine
cd chwezi-design-engine
./install.sh --scope project        # macOS, Linux, Git Bash
.\install.ps1 --scope project       # Windows PowerShell
```

**Codex.** Codex reads `AGENTS.md` as the router. Before substantive work it runs `python <engine-root>/.codex/ensure_model_policy.py --runtime codex --check` (see `.codex/README.md`). Claude and other runners skip this step.

**Manual route.** Clone the repository and read `AGENTS.md` (`CLAUDE.md` is a thin bridge to it). Then read `doctrine/design-doctrine.md`, glob `skills/**/SKILL.md` fresh each time, route on the frontmatter `description`, and run `governance/design-quality-gate.md` before you call an artefact finished. From a bare clone, without the plugin, these skills are not on Claude Code's native discovery path, so read the `SKILL.md` files directly rather than through the `Skill` tool. With the plugin installed, Claude Code lists them as `design-engine:<skill-name>`. Use `python3` on Linux and macOS and `python` on Windows. Commands for using the engine (the checks are under [Validation](#validation)):

```text
python3 -X utf8 scripts/design_query.py search "editorial report serif" --domain typography
node tools/slop-detector/cli.mjs --tier deep path/to/project
node scripts/check-rendered-fonts.js path/to/output.pdf
```

`design_query` prints a calibrated JSON result and declines to answer when no record fits. The detector exits `2` when it finds a failing issue (for example a banned face as primary type), `1` when it could not run and `0` otherwise. `check-rendered-fonts.js` reads the fonts a finished PDF embeds through poppler's `pdffonts` and applies the same banned-font doctrine: exit `0` pass, `2` banned family, `3` only fallback faces, `4` font not embedded, `1` did not run, which is `NOT_ASSESSED` and never a pass. It lists Type 3 fonts as a note, because it cannot judge outlined glyphs.

## Validation

Run every command from the repository root. The Python checks need `PyYAML`; the pytest suite also needs `pytest`. The results below were measured on 2026-10-31 on Linux with Python 3.14 and Node 22, with `pytest` 9.0.3 and `PyYAML` 6.0.3 in a separate virtual environment. They are a dated record, not a promise; rerun a command before you quote it.

| Check | Command | Needs | Result on 2026-10-31 |
|---|---|---|---|
| Engine contract and regression gate | `python3 -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json` | PyYAML | Exit 0. 102 of 102 skills compliant; 51 rules and 102 detector fixtures; six report-only size warnings; portability findings 0 |
| Portability | `python3 -X utf8 scripts/validate_portability.py` | none | Exit 0. No unlisted machine-specific path; three allowlisted link findings in dated records |
| Routing (lexical proxy, not live routing) | `python3 -X utf8 scripts/routing_smoke_test.py --min-rank1 92 --lint-fixtures` | PyYAML | Exit 0. 94 fixtures, precision@1 95%, precision@3 100%, owned negatives 46/46, one foreign owner `NOT ASSESSED` |
| Route existence | `python3 -X utf8 scripts/validate_route_existence.py` | PyYAML | Exit 0. 0 findings |
| Delivery-evidence record | `python3 -X utf8 scripts/validate_design_delivery_evidence.py tests/fixtures/design-delivery/manifest.json` | none | Exit 0. Structure valid; verdict `CONDITIONAL`, with five stages `NOT ASSESSED` |
| Design token example | `python3 -X utf8 scripts/validate_token_example.py skills/09-design-systems-tokens-and-theming/design-tokens-and-naming/examples/tokens.json` | none | Exit 0. 0 findings (see below) |
| Design catalogue | `python3 -X utf8 scripts/validate_design_catalog.py data/design-catalog.json` | none | Exit 0. Schema, coverage, font-doctrine, contrast and lifecycle checks pass; 0 stale records |
| File-entry ceiling | `python3 -X utf8 scripts/check_file_count.py . --mode checkout` and `--mode package` | none | Exit 0 for both; ceiling 5,000 entries |
| Plugin manifest | `node scripts/generate-plugin-manifest.js --engine . --check` | Node | Exit 0. `plugin.json` is current, 102 skills |
| Python test suite | `python3 -X utf8 -m pytest -q -p no:cacheprovider` | pytest, PyYAML | Exit 0. 196 passed in 38 s |
| Detector registry and font doctrine | `node tools/slop-detector/cli.mjs --validate-registry` and `--doctrine-consistency` | Node | Exit 0. 51 rules (43 static, 8 browser); 0 baseline/ban conflicts |
| Detector suite | `node --test tools/slop-detector/test/` | Node; a locked Playwright project for the browser test | Exit 0. 119 tests: 118 pass, 1 skipped (the browser acceptance test, which needs the locked Playwright project) |
| Hook tests | `node hooks/test-banned-font-gate.js`, `test-rendered-font-names.js`, `test-token-file-gate.js`, `test-destructive-bash-gate.js`, `test-plugin-hook-config.js`, `test-slop-immediate.js`, `test-slop-deep-pass.js` | Node | Exit 0 each: 45/45, 73/73, 10/10, 61/61, 7/7, 12/12, 10/10 |
| Installer file guard | `node --test tests/file-count.test.js` | Node | Exit 0. 4 pass |
| Agent contract | `python3 -X utf8 tests/agent-integration/test_design_agent_contract.py` | PyYAML | Exit 0. Pass; the universal catalogue is not available, so that part is `NOT ASSESSED` |
| Cross-engine handoffs | `python3 -X utf8 scripts/validate_cross_engine_routes.py` | PyYAML and sibling checkouts | See below |

CI (`.github/workflows/skill-engine-quality.yml`) runs the engine gate, portability, routing, route-existence, delivery-evidence, token-example and catalogue checks, the pytest suite, the detector registry and suite, and the seven hook tests. It does not run `--doctrine-consistency`, the file-count tests, the manifest check, the agent-contract test (pytest does not collect it) or the cross-engine check, and it does not run the token validator on any file other than the shipped example.

**Cross-engine handoffs.** The script checks that every declared handoff to another engine names a repository and a path that exist. A repository it cannot find is `NOT ASSESSED` and fails the run (exit 1); it is never a pass. It looks first at `--map NAME=PATH` (repeatable), then at a JSON file named by `--workspace-map` or the `CHWEZI_WORKSPACE_MAP` environment variable, then at `--workspace-root` (default: the folder that holds this checkout). Use the map when sibling checkouts keep their former folder names. On 2026-10-31 the default run on a workstation with the former folder names exited 1 with six routes `NOT ASSESSED`, and a run with a map for `chwezi-dev-engine` and `chwezi-sdlc-documentation` plus a root holding the other siblings exited 0 with 0 findings. This engine does not read `CHWEZI_ENGINES_ROOT`.

**Design token validator.** `scripts/validate_token_example.py <tokens.json>` checks a three-tier token file (primitive, semantic, component). Every run checks that each `{alias}` resolves, that no alias forms a cycle, that no type changes across an alias, and that component tokens resolve through the semantic tier. By default it also checks that literal colour, dimension, duration, font-family, font-weight and cubic-bezier values use the shapes of the Design Tokens Format Module 2025.10 and its Color Module (Final Community Group Reports of 28 October 2025, not W3C Standards), so a CSS string such as `oklch(...)` or `16px` is rejected, and it recomputes every `vs <token> = N:1` contrast claim in a `$description` from the token values and requires agreement within 0.05. The default profile, `canonical-example`, also requires the roles the shipped example defines and so guards that file. `--profile generic` runs the structural checks alone and suits a project's own pack. `--skip-value-shapes` and `--skip-contrast-claims` relax the two extra checks for a legacy pack. It is a structural and arithmetic guard: it does not claim full Design Tokens conformance and it does not test a Style Dictionary or Figma import.

Unresolved follow-up: the second shipped example, `skills/09-design-systems-tokens-and-theming/measured-style-pack/examples/tokens-from-pack.json`, does not pass this validator. Run on 2026-10-31 it reports 17 findings on the default profile and 14 with `--profile generic`, and exits 1 both times. Fourteen findings are `seeded_primitive_tokens.*: component token must reference semantic token`: the file is a primitive-seed fragment under a custom root, not a three-tier pack. The other three are canonical roles the default profile requires (`semantic.color.action.danger.bg`, `semantic.color.action.danger.fg` and `semantic.radius.control.sm`). The unit test accepts the fourteen as expected. No decision has been taken on whether the example or the validator should change, and CI does not run the validator on this file.

**What needs more than Python and Node.** None of the checks above needs PowerShell, Pandoc, Mermaid, LibreOffice or a container. Three things need more. First, the detector's browser tier needs the consuming project's own locked Playwright: without it the rendered-page rules are reported as `NOT_ASSESSED` and the run still exits 0, so read the output and not only the exit code. Second, `check-rendered-fonts.js` needs poppler's `pdffonts`. Third, the rebuild-and-verify scripts in `examples/p18-synthetic-output-pack/` need LibreOffice, Ghostscript, `python-docx`, `openpyxl`, `python-pptx`, Pillow and PyMuPDF. On the measurement host the Python document libraries were absent, so those scripts were not run (`NOT_ASSESSED`). `install.ps1` is the Windows installer; it needs PowerShell and was not run on the Linux host. The Codex helper (`python3 .codex/ensure_model_policy.py --runtime codex --check`) reads the Codex configuration of the machine it runs on; it was run against an empty scratch directory only (exit 1, drift reported), and `--runtime claude` prints `NOT_APPLICABLE` and exits 0.

## Capabilities

The tables below were generated from the [102 active `SKILL.md` files listed in the plugin manifest](.claude-plugin/plugin.json) under `skills/`; the manifest parity check is in [`tests/test_route_existence.py`](tests/test_route_existence.py). The `_TEMPLATE` scaffold is excluded. The engine has no `ALIAS.md` entries.

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
| Data visualisation and dashboards | `12-data-viz-and-dashboards` | 5 |
| Presentations and documents | `13-presentations-and-documents` | 7 |
| Conversion and web-page patterns | `14-conversion-and-web-page-patterns` | 5 |
| Game visual experience | `15-game-visual-experience` | 5 |
| **Total** | | **102** |

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
| Data visualisation and dashboards | `diagram-design-and-handoff` | Designs conceptual diagrams with source, rendered checks, text alternative and implementation handoff |
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

**Font doctrine in brief.** The authored source is `doctrine/references/ai-slop-banned-fonts.md`, and the hook reads its machine-readable mirror, `ai-slop-banned-fonts.json` (last synced 29 September 2026). Each ban carries a reason label: `[AI]` for an AI-ecosystem default, `[POP]` for a generic, overused face, `[SYS]` for a lazy system default and `[HOUSE]` for a house ruling. The same sidecar drives the write-time hook `hooks/banned-font-gate.js`, the detector's `banned-primary-font` rule and `scripts/check-rendered-fonts.js`, which reads the fonts a finished PDF embeds.

- **Hard ban:** Inter, Geist (every cut), Roboto, Open Sans, Lato, Arial, Fraunces, and every face of IBM Plex.
- **Secondary ban:** Space Grotesk, Instrument Serif, Poppins, Montserrat, Nunito and Nunito Sans. On 29 September 2026 the list gained Newsreader, Cormorant, Cormorant Garamond, Crimson Pro, Space Mono, Plus Jakarta Sans, Instrument Sans, DM Sans, Outfit, Playfair Display and Lora.
- **System stacks:** a bare system stack used on its own is banned.
- **Monospace:** Roboto Mono and IBM Plex Mono are banned as deliberate monospace choices. JetBrains Mono and Fira Code are approved.
- **Watchlist:** Syne, DM Serif Display, DM Serif Text, Helvetica, Mona Sans, Recoleta and DejaVu Sans are not banned, but choosing one needs a stated human-design reason. They are next reviewed on 29 December 2026.

## Quality and improvement

The improvement records are in [`docs/kaizen/2026-10-engine-kaizen/`](docs/kaizen/2026-10-engine-kaizen/) (29 October 2026) and [`docs/kaizen/2026-10-engine-kaizen-pass-2/`](docs/kaizen/2026-10-engine-kaizen-pass-2/) (31 October 2026). Each holds the same seven files: scope and evidence, baseline scorecard, backlog, experiment log, validation record, final report and next-cycle record. [`docs/README.md`](docs/README.md) indexes the older audits and plans. What the two cycles changed, with the commit and the check for each change, is under [What the October 2026 kaizen improved](#what-the-october-2026-kaizen-improved) at the end of this section.

**Latest published score.** Pass 2 closed at a raw 60.3 out of 100. The published figure is `min(raw, 65)`, which is also 60.3 ([final report](docs/kaizen/2026-10-engine-kaizen-pass-2/05-final-report.md)). The 29 October cycle closed at a raw 59.0 and published 45.0 under a stricter cap set for that cycle (59.0 under the standard cap). The pass-2 baseline, taken before any change, was 56.9; it sat below the earlier final because the pass tested more. The target is 95 and is not met. The score is a judgement against named evidence. It is not a claim of production readiness.

**Open findings that matter to a user** (from the [next-cycle record](docs/kaizen/2026-10-engine-kaizen-pass-2/06-next-cycle.md)):

- The delivery record is `CONDITIONAL`. No run used a real brief or a supplied screen, no Compose output was compiled, and no PDF/UA-2 or assistive-technology test exists. Each is `NOT_ASSESSED`.
- Machine checks have known gaps. The detector does not script non-text contrast (WCAG 1.4.11) or reading order (1.3.2). Its target-size and positive-tabindex rules report warnings, so a pipeline that fails only on blocks will not stop them. The rendered-font gate reads names, not licences, and cannot see outlined text. Routing evidence is a lexical proxy, with three recorded routing gaps, and fixture coverage reaches 11 of 102 skills.
- Depth is uneven. `sector-strategies` still has the generic workflow, and five skills keep depth in `legacy-guidance.md` (`brand-style-guide`, `color-selection`, `ux-psychology`, `legal-sector-ui-ux`, `sector-strategies`). The legal-sector references follow US-style bar rules and carry unsourced conversion statistics.
- The `tokens-from-pack.json` example fails the token validator (see [Validation](#validation)).
- Three sources are `NOT_ASSESSED`: ISO 14289-2, the EUR-Lex text of Directive (EU) 2019/882 and the Material guidance site. Model currentness did not pass.
- Owner decisions are pending: the doctrine header (version 0.2.0), the promised `doctrine/examples/` folder (absent) and a local path in section 5 of the doctrine; public history that still holds paths removed from the working tree; and the local origin line in the font licence files.

**Date-triggered gates.** No validator in this repository fails because of the calendar. The only date logic is the stale-record warning in `validate_design_catalog.py`, which prints warnings and exits 0. This was checked by running it with `--as-of` on 2026-12-28, 2026-12-29, 2027-01-27 and 2027-06-01 (exit 0 each), by stepping `--as-of` day by day from 2026-10-31 to 2027-03-01, and by searching the scripts, hooks, detector and engine package for date handling.

| Date | What changes | Action |
|---|---|---|
| 2026-12-20 | `validate_design_catalog.py` starts to list 13 catalogue records as stale (due 2026-12-19); 19 from 2026-12-29 (six more due 2026-12-28). Warnings only | Recheck the records, or set a new `recheck_due` with evidence |
| 2026-12-29 | Targeted re-check of the font watchlist (seven faces) and any source-register row that moved. No validator reads this date | Re-research the watchlist under `doctrine/references/living-slop-refresh-protocol.md` |
| 2027-01-27 | Review date of every row in `governance/standards-source-register.md` (DGN-001 to DGN-011 and DGN-013) and of the full re-audit. No validator reads this date | Re-read each primary source and record the access date; sources that cannot be read stay `NOT_ASSESSED` |

### What the October 2026 kaizen improved

Two improvement cycles ran in October 2026, the first on 29 October and a second pass on 31 October. This list holds the changes that were kept and are on `main`. The pass-2 [final report](docs/kaizen/2026-10-engine-kaizen-pass-2/05-final-report.md) records no reverted change, and the 29 October [experiment log](docs/kaizen/2026-10-engine-kaizen/03-experiment-log.md) lists only retained ones. One 29 October item is left out because it changed no repository file: the font-embedding specimen (D-5). On 2026-10-31 each commit hash below was confirmed to be on `main` with `git merge-base --is-ancestor` and read with `git show --stat`. A figure marked **re-run** was measured again that day in a clean clone of the commit named, with Python 3.14, Node 22 and pytest 9.0.3. A figure marked **recorded** is copied from the evidence file named. Scores are judgments against named evidence, not measurements of single changes, and the 95 target is not met.

| Measure | 29 Oct baseline (`c9b334d`) | 29 Oct close (`fe7bac7`) | Now (tree at `63fc931`) | How obtained |
|---|---:|---:|---:|---|
| Active skills | 101 | 102 | 102 | Re-run: `validate_engine.py` at each commit |
| Detector rules / fixtures | 49 / 98 | 49 / 98 | 51 / 102 | Re-run: the same command |
| Routing fixture rows / local owned negatives | 68 / 21 | 72 / 29 | 94 / 46 | Re-run: `routing_smoke_test.py` |
| Skills with three positives and two owned negatives | 0 | 1 | 11 | Re-run: a separate count over `tests/routing-fixtures.yml` |
| Lexical precision@1 | 94% | 94% | 95% | Re-run: `routing_smoke_test.py`; a proxy for routing, not live routing |
| Python tests under pytest | 139 | 145 | 196 | Re-run: pytest 9.0.3, run from a clone of each commit |
| Standards-register rows | 5 | 12 | 12 | Re-run: count of `DGN-` rows |
| Operational files with machine-specific paths | 16 | 10 | 2 | Re-run: a separate scan with one pattern over all three trees |
| Relative links into sibling checkouts | 3 | 3 | 0 | Re-run: the same scan |
| Skills still on the generic workflow | 2 | 2 | 1 | Re-run: the same scan |
| Raw score / `min(raw, 65)` | 54.0 / 54.0 | 59.0 / 59.0 | 60.3 / 60.3 | Recorded in the [29 October](docs/kaizen/2026-10-engine-kaizen/05-final-report.md) and [pass-2](docs/kaizen/2026-10-engine-kaizen-pass-2/05-final-report.md) reports |

The 29 October cycle published 45.0 under a stricter cap set for it, and the pass-2 baseline was 56.9 raw and capped. The 29 October scorecard counted 11 operational files with paths from a narrower list; the table applies one scan to all three trees, so its first figure differs.

**Defects and wrong claims fixed, most severe first**

1. **Local paths, a user name and acquisition-site file names in a public repository (critical).** A source register listed local download paths and file names from an acquisition site, and the router, the integration records, skill files, a hook comment and an installer comment carried web-root, user-name or drive paths. They now hold titles and repository identifiers (`f4f1eaf`, `b6ab99e`, `0e23a7b`). Re-run: operational files with such paths 16 to 10 to 2 (the two left are allowlisted with a reason: one canonical doctrine line awaiting the owner, one file of intentional test inputs) and links into sibling checkouts 3 to 0. The old text is still in the history of the public repository, because no history rewrite was permitted. That exposure is open.
2. **The token example contradicted the edition it named, and its contrast figures were wrong.** It used CSS strings where the Design Tokens Format Module 2025.10 specifies object values, and 2 of its 11 stated ratios matched the rendered colours (recorded in the [pass-2 validation record](docs/kaizen/2026-10-engine-kaizen-pass-2/04-validation-record.md)). One second-brand pair was documented as 5.2:1 PASS and measures 3.4:1 (re-run by hand: 3.37:1). The validator gained a generic profile, the 2025.10 value-shape checks and a recomputation of every stated ratio; both example files were migrated and the pair moved to a darker step at 6.04:1 (`aca491a`, `355be12`). Re-run: the pre-change example fails the current validator with 65 findings (53 value shape, 12 contrast claims), the current example exits 0, and 26 unit tests pass. Style Dictionary and Figma imports were not tested, and `tokens-from-pack.json` still fails (see [Validation](#validation)).
3. **Two wrong source facts.** The standards register held a malformed ISO 14289-2 address (`ce4ae24`) and attached 21 October 2026 to Compose Material 3 1.4.0. The release notes give 24 September 2025 for stable 1.4.0 and 21 October 2026 for 1.5.0-beta02 (`7340dfa`). Recorded: the correcting page was read directly. Re-run: the diffs of both commits show the two rows changed. The web pages were not read again for this section.
4. **The cross-engine route check could not find renamed sibling checkouts.** It assumed folder names equal to repository names, so the default run on this workstation exits 1 with six routes `NOT ASSESSED`. It now accepts `--map NAME=PATH`, `--workspace-map` and `CHWEZI_WORKSPACE_MAP`, and a missing target still fails (`285658f`). Re-run: default run exit 1; mapped run exit 0 with 0 findings; 13 unit tests pass.
5. **`legal-sector-ui-ux` still had the generic workflow.** The four generic steps became eight task-specific ones built from the skill's own references, and two conflicts found on the way (an optional free-text intake field, unsourced conversion statistics) are stated in the workflow (`918dce0`). Re-run: contract validator 102 of 102; skills on the generic workflow 2 to 1 (`sector-strategies` remains). The references still follow US-style bar rules, which is an open finding.

**New checks and tests**

6. **A portability gate** (`0e23a7b`). `scripts/validate_portability.py` fails on machine-specific paths and on markdown links that leave the repository or break. Its allowlist carries a reason for each entry and ratchets that can only shrink, and `validate_engine.py` and CI both run it. Re-run: exit 0 on the tree, with three allowlisted link findings in dated records; 12 unit tests; a probe file holding a web-root path, a home path and an escaping link, placed in a scratch clone, made both the gate and `validate_engine.py` exit 1.
7. **A font gate for rendered output** (`9bc10bd`). The write-time gate reads source files, and a finished PDF set in a secondary-banned family passed it (recorded). `scripts/check-rendered-fonts.js` and `hooks/lib/rendered-font-names.js` classify the PostScript names that `pdffonts` reports against the same doctrine sidecar. Re-run: `node hooks/test-rendered-font-names.js` 73/73; the four saved `pdffonts` captures exit 2 (banned), 0 (clean, with a Type 3 note), 3 (fallback only) and 4 (not embedded; that capture is constructed and labelled so). It reads names and not licences, it cannot see outlined text, and a missing `pdffonts` is `NOT_ASSESSED`.
8. **Detector rules for target size and positive tabindex** (`7582bbf`). The detector found 2 of 6 defects seeded in a scratch accessibility specimen. The new browser rule `target-size-minimum` (WCAG 2.5.8) and static rule `positive-tabindex` (2.4.3) raise recall to 4 of 6 (recorded; the specimen is not in the repository). Both report warnings. Re-run: 51 rules where there were 49; detector suite 119 of 119 with a locked Playwright project, and 118 passed with one skipped without one; the tabindex flag fixture gives three warnings and the pass fixture none. Non-text contrast (1.4.11) and reading order (1.3.2) are not scripted. The copy vendored in `website-skills` is now out of step.
9. **A file-entry ceiling, and a defect in it** (`4ec79bc`, `a89d340`, `09ad82d`, `6db70dd`). A 5,000-entry guard runs in the validator, the clone installer and the manifest generator. The acceptance review then found that `os.walk` hid a traversal error and returned a partial count, so the guard now refuses with exit 2. Re-run: `node --test tests/file-count.test.js` 4 pass; `tests/test_file_count.py` 5 pass; 1,697 checkout and 1,252 package entries against 5,000 at `63fc931`. Native plugin hosts do not run these scripts, so this says nothing about marketplace review.
10. **The Python suite grew by 57 tests** (`39ec352`, the file-count tests of item 9 and the suites behind items 2, 4 and 6). Re-run under pytest 9.0.3: 139, 145 and 196 at the three commits. The 6 added on 29 October are five file-count tests and one route-existence test. The 51 added in pass 2 are 12, 26 and 13 and are `unittest`-compatible, so they also pass without pytest (51 OK). `39ec352` adds `tests/conftest.py` so a plain stand-in runner can import `scripts/`. With real pytest the suite passes with and without that file, so its benefit is not shown.

**Routing and discoverability**

11. **A diagram route** (`3877340`, `eacea34`). A proposal-diagram request routed to a DOCX reference because no skill owned conceptual diagrams. `diagram-design-and-handoff` now exists with a worked specification and fixture rows: four positive and eight owned-negative rows in the fixture file, where the experiment log says three and six. Re-run: skills 101 to 102; the plugin manifest check exits 0 with 102; 102 of 102 compliant. Routing here is lexical, and overlap with `data-visualization` is untested against real requests.
12. **Routing fixtures for ten more skills** (`2332e14`). 22 positives and 17 owned negatives took skills with full fixtures from 1 to 11 and precision@1 from 94% to 95%, with owned negatives at 46 of 46 and lint at 0 (re-run). Ten of the 39 prompts were reworded after the lexical ranker failed them, so the 95% is partly by construction. The three gaps recorded in the [next-cycle record](docs/kaizen/2026-10-engine-kaizen-pass-2/06-next-cycle.md) are the honest signal.
13. **A larger standards register** (`ce4ae24`, `7340dfa`). Five rows became 12 (re-run): EN 301 549 V4.1.1, Directive (EU) 2019/882, Design Tokens Format Module 2025.10, Apple design updates, Compose Material 3, Core Web Vitals and the WCAG 3.0 draft status. The token skill now names the 2025.10 report and says it is a Final Community Group Report and not a W3C Standard. Recorded: the rows were read from primary pages on 29 October and again on 31 October, except three sources that could not be read (ISO 14289-2, the EUR-Lex text of the Directive and the Material guidance site), which stay `NOT_ASSESSED`. The rows record provenance and edition, not legal applicability.

**Documentation**

14. **Documents brought in line with the repository** (`1d3e3ea`, `2e57350`, `651cee1`, `f92cc39`, `0a5e0fc`, `780e087`, `9429c5a`, `f9cf605`). These added the validation section with commands and measured results, the router's skill count (101 to 102) and `python3` commands, a documentation index, a refreshed resume, the manifest and count steps for a new skill, the Linux and macOS font-folder setup, the measured trigger-block state of the sibling engines, and twelve documentation follow-ups. Re-run: the skill table in this README lists exactly the 102 skills on disk, and the portability gate resolves every link in the files changed. Not run: the PowerShell forms (no `pwsh` on the measurement host).

The evidence behind this list is in the [29 October final report](docs/kaizen/2026-10-engine-kaizen/05-final-report.md), the [pass-2 backlog](docs/kaizen/2026-10-engine-kaizen-pass-2/02-improvement-backlog.md), [experiment log](docs/kaizen/2026-10-engine-kaizen-pass-2/03-experiment-log.md) and [validation record](docs/kaizen/2026-10-engine-kaizen-pass-2/04-validation-record.md), and the [documentation follow-ups](docs/kaizen/2026-10-engine-kaizen-pass-2/07-docs-followups.md).

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
