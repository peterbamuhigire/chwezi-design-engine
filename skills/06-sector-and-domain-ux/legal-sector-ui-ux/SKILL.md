---
name: legal-sector-ui-ux
description: Use when a lawyer, law firm, chambers, solicitor, barrister, or legal consultancy website needs ethical trust signals, practice-area structure, attorney profiles, or intake UX. Do not use for legal advice or generic sector selection; verify current jurisdictional advertising/privacy rules.
metadata:
  portable: true
  category: 06-sector-and-domain-ux
  compatible_with:
  - claude-code
  - codex
---

# Legal Sector UI/UX
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->

## Use when
- Building or redesigning a website for a law firm, solo lawyer, solicitor, barrister, or legal consultant — use this instead of the generic `06-sector-and-domain-ux/sector-strategies`.
- Designing practice-area pages (family, criminal, corporate, immigration, etc.) and need practice-specific tone, client-psychology framing, and a confidential-consult intake CTA.
- Building attorney profile pages, credentials/bar-admission blocks, case-result or testimonial sections, and other trust/credibility signals for a credibility-critical service.
- Wording or laying out legal calls-to-action that must carry the attorney–client disclaimer and respect bar-association advertising rules (no guarantees, no unverifiable "best/specialist" claims).
- Planning law-firm local SEO (jurisdiction pages, practice-area + city targeting, attorney schema).

## Do not use when
- The site is not a legal-services business — use the matching sector skill (e.g. `healthcare-ui-design`, `fintech-and-financial-product-ui`, `ecommerce-and-checkout-ux`) or the generic `sector-strategies`.
- You only need cross-sector trust/social-proof patterns with no legal-ethics or bar-rule constraints — pull from the trust-credibility-and-social-proof guidance directly.
- The job is pure palette/contrast or type-system work — defer to `02-color-brand-and-visual-identity/color-system-and-palette` (this skill calls into it for the trust-signal palette and WCAG gate).

## Required inputs

| Input | Source | Evidence |
|---|---|---|
| Jurisdiction, practice areas, audience, and intake boundaries | Firm owner and legal/ethics reviewer | Verified services, barred claims, disclaimers, and conflict process |
| Lawyer credentials and trust evidence | Authorised firm records | Names, admissions, experience, memberships, and permission to publish |
| Privacy, accessibility, and lead-routing requirements | Legal/privacy/operations | Consent, sensitive-data limits, retention, and response ownership |
- Firm details: jurisdiction(s), practice areas, attorney roster with real credentials/bar admissions, and any governing bar-association advertising rules.
- Brand and visual constraints (existing identity, or the trust-signal palette from `color-system-and-palette`) and the standard build-pipeline context.
- Real trust assets where available: case results, testimonials, accreditations, plus the required attorney–client disclaimer text.

## Workflow
1. **Fix the jurisdiction and the approver before any design.** Record the jurisdiction(s) the firm practises in, the regulator or professional body whose advertising rules apply, the practice areas in scope, and one named person who will approve every claim. If any of the four is missing, stop and return the content blocker register from Degraded Mode. `references/ethics-constraints.md` is written around US-style state-bar rules: use its categories (testimonials, results, "expert" and "best" claims, domain names, referral fees, response promises) as questions for the firm's own reviewer, never as the governing rules.
2. **Build a claim ledger from authorised records.** One row per claim the site would make (admission, years in practice, membership, result, testimonial, accreditation): the evidence, who gave permission to publish, the jurisdictional condition, and a status of publish, qualify or omit. A claim with no evidence or no permission is omitted. Use `references/content-templates.md` ("Testimonial and Review Format") for the testimonial and composite-testimonial rules.
3. **Set the stakes per practice area.** Mark each area as urgent and high-stakes (arrest, eviction, family safety), or planned (wills, company formation). Urgent areas lead with scope, jurisdiction, a contact route and what happens next; planned areas can lead with explanation. Take the client-psychology framing and the practice-area matrix from `references/legacy-guidance.md` ("The Legal Client Psychology", "Practice Area Design Matrix") and write the framing down before choosing layout.
4. **Specify the pages in the order the references fix.** Homepage tiers (`references/content-templates.md`, "Homepage Hero Copy Formula"; `references/legacy-guidance.md`, "Homepage Architecture"), practice-area pages with the required sections in order ("Practice Area Page Structure"), attorney profiles ("Attorney Bio Template") and FAQs drawn from real client questions. Credentials come after reassurance, as `examples/law-firm-screen-worked.md` shows.
5. **Choose palette and type, then state them.** Take the trust-signal palette and its WCAG pairs from `02-color-brand-and-visual-identity/color-system-and-palette`; pick a display and body pair outside the banned list and name both with the reason before producing any artefact (`doctrine/references/ai-slop-banned-fonts.md`). Build distinction from real people, place and authored type, not from gavels and scales.
6. **Design intake as minimum screening, not a case narrative.** Name, a contact route, the practice area and a conflict-check consent; no free-text account of the matter on the first form. The optional "brief description" field in `references/legacy-guidance.md` stays out unless the approver accepts it, with a notice above it not to enter confidential details. Place the three disclaimers from `references/ethics-constraints.md` ("Required Disclaimers") at the form, the footer and any results block, and state that contact does not itself create representation. Promise a response time only if the firm has named who answers and by when. Take form-field and emergency-availability detail from `references/legacy-guidance.md` ("Conversion and Intake"), and treat its conversion statistics as unsourced.
7. **Add local search only when in scope.** Jurisdiction and practice-area pages, the attorney and local-business schema and the directory citations come from `references/local-seo.md`; copy those patterns only after step 2 has cleared the claims they carry.
8. **Run the gate and hand over the register.** The named approver works through `references/ethics-constraints.md` ("Pre-Launch Ethics Checklist for Attorney Review"); the build passes `governance/design-quality-gate.md`, a WCAG 2.2 AA check with the rendered forms and the detector. The deliverable is the page specifications plus the claim ledger and a list of every item still awaiting approval. Do not mark a page publishable while a claim is `qualify` or unapproved.

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Visitor has an urgent/high-stakes matter | Clear scope, jurisdiction, contact route, and expectation | Vague conversion copy delays appropriate help |
| Claim cannot be substantiated or is restricted | Omit or qualify after ethics review | Superlatives/testimonials create misleading advertising risk |
| Intake may reveal privileged/sensitive facts | Collect minimum screening data before secure follow-up | Open forms invite unnecessary exposure and false confidentiality assumptions |

## Capability Contract

- Must inspect authorised credentials and current jurisdictional rules; review is read-only unless website remediation is requested.
- May edit in-scope content/design, but may not provide legal advice, invent outcomes/credentials, contact leads, or publish claims without firm approval.

## Degraded Mode

- If jurisdiction, credentials, disclaimer, or intake/privacy rules are unverified, stop publication and return a content blocker register.
- Without current regulatory research, use neutral factual language and mark compliance review pending. Recover a challenged claim by removing it, preserving evidence, and routing it to the named ethics owner.

## Quality Standards
- Outputs must be implementation-ready and internally consistent.
- Preserve existing behavior unless the task explicitly requires a change.
- Avoid host-specific path assumptions so the skill remains portable.

## Anti-patterns

- Guaranteed-outcome or "best lawyer" claims. Correction: use verifiable scope, experience, and evidence.
- Stock gavels and scales as the whole identity. Correction: build distinction from real people, place, expertise, and authored typography.
- Intake forms that solicit a full case narrative before conflict/privacy safeguards. Correction: collect minimum screening data.
- Testimonials without permission or required disclaimers. Correction: verify provenance and jurisdictional conditions.
- Ambiguous attorney-client relationship language. Correction: state that contact does not itself establish representation.
- Do not hardcode `.claude/skills` or another single install path.
- Do not skip validation against upstream or downstream dependencies.
- Do not generate generic output that ignores the actual project context.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Legal website direction and content architecture | Firm, content, design | Practice areas, profiles, trust evidence, intake, disclaimers, and exclusions are explicit |
| Ethics/privacy/accessibility gate | Firm approver and QA | Claims, credentials, consent, forms, jurisdiction, and representative journeys are verified |
- Implementation guidance, configuration, generated artifacts, or concrete follow-on steps.

## References
- `doctrine/design-doctrine.md` — the Mission and Anti-Slop Charter; legal sites must read as authored and trustworthy, never templated.
- `doctrine/references/ai-slop-taxonomy.md` — convergent-default tells to avoid in a credibility-critical sector.
- `references/ethics-constraints.md`, `references/content-templates.md`, `references/local-seo.md` (this folder) — bar-association advertising rules, attorney profile/practice-area structure, and law-firm local SEO.
- Sibling skills: `06-sector-and-domain-ux/sector-strategies` (the generic sector skill this one overrides), `02-color-brand-and-visual-identity/color-system-and-palette` (trust-signal palette + WCAG gate).
- Start with `references/legacy-guidance.md` for the preserved detailed guidance; read only the files under `references/` that match the current task.

## Examples
- `examples/law-firm-screen-worked.md` — a worked family-law practice-area page spec: client-psychology framing, non-default trust palette and a non-banned type pairing, authority/credibility signals sequenced after reassurance, plain-English process, and a practice-specific confidential-consult CTA with the required attorney–client disclaimer.

## Notes
- Treat this `SKILL.md` as the portable execution layer for both Claude Code and Codex.
- Preserve existing project behavior unless the current task explicitly requires a change.
<!-- dual-compat-end -->
