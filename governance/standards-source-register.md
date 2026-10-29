# Design-System Standards Source Register

Register date: 2026-10-29
Owner: chwezi-design-engine maintainer
Portfolio source: use the portfolio workspace map to locate its source register; this checkout does not contain that file.

This is the design-engine applicability index for externally mutable sources. A source URL
establishes provenance and availability only; it does not prove that a particular design or
artefact conforms. Claim-level review, target-application checks, and the applicable licence or
jurisdiction remain separate evidence.

| ID | Design decision or control | Primary source and issuer | Version/date observed | Applicability and limit | Owner | Next review |
| --- | --- | --- | --- | --- | --- | --- |
| DGN-001 | Use WCAG 2.2 as the accessibility-criteria reference for web and digital-interface work | [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/), W3C | Recommendation, 12 December 2024 | Applies to web and digital interfaces. It does not certify a specific screen or product | Accessibility/design owner | 2026-11-11 |
| DGN-002 | Use Microsoft's PowerPoint accessibility workflow when a presentation is reviewed in PowerPoint | [Make your PowerPoint presentations accessible](https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities), Microsoft | Page current at access; accessed 2026-08-11 | Application guidance; edition and platform behaviour may vary | Presentation owner | 2026-11-11 |
| DGN-003 | Use Microsoft's Word accessibility workflow when a DOCX is reviewed in Word | [Make your Word documents accessible with Accessibility Assistant](https://support.microsoft.com/en-us/accessibility/word/make-your-word-documents-accessible-to-everyone-with-accessibility-assistant), Microsoft | Page current at access; accessed 2026-08-11 | Application guidance; it does not prove a particular DOCX is accessible | Document owner | 2026-11-11 |
| DGN-004 | Treat PDF/UA-2 as the PDF accessibility reference where PDF accessibility is in scope | [ISO 14289-2:2024](https://www.iso.org/standard/82278.html), ISO | Edition 1, published March 2024; checked 2026-10-29 | Conformance requires appropriate PDF testing; file existence or font embedding alone is not evidence | PDF/document owner | 2027-01-27 |
| DGN-005 | Use ISO 9241-161:2025 as a visual user-interface guidance reference | [ISO 9241-161:2025](https://www.iso.org/standard/85790.html), ISO | Edition 2, 2025 | Design reference; licensed normative access may be required | UI/design owner | 2026-11-11 |
| DGN-006 | Use the latest published EN 301 549 edition as an ICT accessibility reference when the target context requires it | [ETSI Human Factors technical group](https://www.etsi.org/technical-groups/hf/), ETSI | V4.1.1 (2026-09), listed as Published; checked 2026-10-29 | The source establishes publication/version only. Applicability, harmonisation and legal effect require jurisdiction and procurement review | Accessibility/design owner | 2027-01-27 |
| DGN-007 | Assess the European Accessibility Act against the named product/service and jurisdiction where relevant | [Directive (EU) 2019/882](https://eur-lex.europa.eu/eli/dir/2019/882/oj), European Union | Directive adopted 2019; checked 2026-10-29 | Does not establish that a particular product/service is in scope or compliant; obtain jurisdiction-specific legal assessment | Product owner | 2027-01-27 |
| DGN-008 | Use the Design Tokens Format Module 2025.10 when an interoperable token interchange format is requested | [Design Tokens Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/), Design Tokens Community Group | Final Community Group Report, 28 October 2025; checked 2026-10-29 | The report identifies itself as a Final Community Group Report, not a W3C Standard; implementation compatibility still requires validation | Design-system owner | 2027-01-27 |
| DGN-009 | Review Apple's current HIG and design resources for Apple-platform work | [Apple Design, What's New](https://developer.apple.com/design/whats-new/), Apple | Page snapshot checked 2026-10-29; page includes an entry dated 13 October 2026 | Mutable platform guidance; record the specific page and platform version used for each implementation. This entry does not imply adoption of any visual treatment | Apple-platform design owner | 2027-01-27 |
| DGN-010 | Review Material 3 and the AndroidX Compose Material 3 release notes for Android work | [Material Design](https://m3.material.io/) and [Compose Material 3 release notes](https://developer.android.com/jetpack/androidx/releases/compose-material3), Google | AndroidX Compose Material 3 version 1.4.0 listed 21 October 2026; checked 2026-10-29 | A library release is not a complete design-system specification. Verify the APIs and visual behavior against the target app and platform | Android design owner | 2027-01-27 |
| DGN-011 | Use Google's Core Web Vitals as field-performance guidance when relevant to the product | [Understanding Core Web Vitals and Google Search results](https://developers.google.com/search/docs/appearance/core-web-vitals), Google | Page last updated 10 December 2025; checked 2026-10-29 | The page describes recommended metric thresholds; field metrics do not establish lab performance or a product's conformance. Capture the measurement method and population | Web performance/design owner | 2027-01-27 |

## Review protocol

When a registered source changes, record the observed date, inspect the affected skill or
reference, update the smallest canonical rule, and rerun the route and delivery-evidence gates.
If the source cannot be checked, record the claim as `NOT ASSESSED`; do not infer currency or
conformance from a link.

## October 2026 source review

The new entries above were opened on 2026-10-29 and checked against the specific edition or page
state named in the row. Dynamic pages are access-date snapshots, not dated releases. The ETSI
entry records the published document version and does not decide whether it is harmonised for a
particular legal purpose. The European Accessibility Act entry is a legal source index, not legal
advice or an applicability finding. Each output still requires claim-level, target-context review.
