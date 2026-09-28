---
name: brand-style-guide
description: Use when packaging an approved identity into a client-facing guide with logo, colour, typography, spacing, imagery, voice, and application rules. Unlike brand-visual-identity, this documents settled decisions rather than creating the identity.
metadata:
  portable: true
  category: 02-color-brand-and-visual-identity
  compatible_with:
  - claude-code
  - codex
---

# Brand Style Guide
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->

## Use when
- You need to assemble the final client-facing brand style guide (`docs/brand-style-guide.md`) once brand strategy and the design system already exist — the premium hand-off deliverable.
- The request is to package logo usage rules, a colour palette card (hex/RGB/CMYK + roles), a typography specimen with scale, the spacing system, photography style, voice/tone, and component usage examples into one governed document.
- The client asks "how do we keep the brand consistent" and needs do/don't rules and usage standards a third party could follow without you in the room.

## Do not use when
- The palette itself is still being decided or needs WCAG-contrast values worked out — use the sibling `color-system-and-palette` first.
- The logo or wordmark has not been designed yet — that is `logo-and-wordmark-design`, and the broader mark/identity system is `brand-visual-identity`.
- The deep voice, tone, and editorial rules are the actual ask (not just a guide section) — route to `voice-tone-and-content-style-guide`.
- Type faces are still being chosen/paired — use `font-selection-and-pairing` before specimen-ing them here.

## Required inputs

| Input | Supplied by | Required? | Why |
|---|---|---|---|
| Approved identity-system specification | Brand-visual-identity | yes | Supplies settled rules |
| Production assets and licence records | Brand owner/production | yes | Enables lawful delivery |
| Audience, formats, and maintenance owner | Delivery brief | yes | Shapes usable guidance |
- Completed brand strategy and design-system decisions: chosen palette (with hexes/roles), the selected and paired typefaces, logo/wordmark assets, and spacing/type scale.
- Voice and tone direction, photography/art-direction intent, and any component patterns to be shown in usage examples.
- The banned-fonts and font-groups references, so the specimen can be verified against approved, non-slop faces before it ships.

## Workflow
1. Read the current business context and the concrete task to solve.
2. Use only the relevant detailed guidance and references for the request at hand.
3. Produce the strategy, writing, or framework output this skill is responsible for.
4. Check the result for clarity, realism, and handoff readiness.

## Quality standards
- Outputs must be specific, usable, and grounded in the available evidence.
- Recommendations should support follow-on execution instead of staying abstract.
- The result should remain consistent with the broader repository system.

## Anti-patterns
- Do not produce generic framework dumps with no decision made.
- Do not invent facts to complete the output.
- Do not ignore the actual audience, offer, or business constraints.
- Do not invent missing identity decisions to fill pages; return them to the owner.
- Do not show only ideal examples; include misuses and edge cases.

## Outputs

| Output | Consumer | Evidence / acceptance |
|---|---|---|
| Client-facing style guide | Client, partners, and producers | Required sections use approved examples |
| Asset and licence index | Client asset custodian | Source, format, owner, and restrictions recorded |
| Guide QA record | Delivery owner | Links, values, specimens, accessibility, and exports verified |

- Strategy notes, writing deliverables, framework outputs, or implementation-facing recommendations.

## Decision Rules

| Condition | Decision | Wrong-choice failure |
|---|---|---|
| Decision is approved and stable | Document with do/don't examples | Rule remains open to interpretation |
| Decision is missing or contradictory | Stop and return to identity owner | Guide invents policy |
| Guide serves non-designers | Prefer concise rules and production examples | Attractive document remains unusable |
| Editable and fixed delivery are needed | Supply source plus verified PDF | Client cannot maintain or view faithfully |

## Capability Contract

Read and document generation are required. Editing applies only to the authorised guide and delivery copies. Do not change master identity rules, redistribute restricted files, or publish without approval.

## Degraded Mode

If required evidence or tooling is unavailable, use the scoped fallback below and mark the result unverified.
Without final assets or approvals, create a marked draft with an open-decisions register. Without rendering, supply source content and mark visual QA blocked; never call it final.

## References
- `doctrine/design-doctrine.md` — the Mission and Anti-Slop Charter; the style guide must record *deliberate, stated* choices, not defaults.
- `doctrine/references/ai-slop-banned-fonts.md` and `doctrine/references/font-groups-and-usage.md` — verify the typography specimen names an approved, non-banned face before it ships to the client.
- `doctrine/references/pairing-principles.md`, `doctrine/references/type-scale-and-spacing.md` — typography pairing and the spacing/type scale the specimen documents.
- Sibling skills: `02-color-brand-and-visual-identity/color-system-and-palette` (palette card hexes + WCAG), `02-color-brand-and-visual-identity/brand-visual-identity`, `01-typography-and-fonts/font-selection-and-pairing`.
- Start with `references/legacy-guidance.md` and `references/style-guide-template.md` for the deliverable structure; read only the files under `references/` that match the task.
- Apply `../../../doctrine/references/book-driven-brand-story-and-visual-evidence.md` for strategy-before-styling, evidence mapping, and current accessibility verification.

## Examples
- `examples/mini-style-guide-worked.md` — a worked compact brand style-guide deliverable for a
  sample roaster (Köya): logo usage, colour palette (hex + OKLCH + roles), an approved Andada Pro +
  Public Sans typography specimen with scale, spacing system, photography note, and a do/don't.
  Use it as the calibration target for specificity and the stated-choice discipline.

## Notes
- Treat this `SKILL.md` as the portable execution layer for both Claude Code and Codex.
- Preserve existing project behavior unless the current task explicitly requires a change.
<!-- dual-compat-end -->
