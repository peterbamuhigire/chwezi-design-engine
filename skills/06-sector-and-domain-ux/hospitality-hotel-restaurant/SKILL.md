---
name: hospitality-hotel-restaurant
description: Use when designing visual systems, guest journeys, operational screens, menus, booking flows, or hospitality brand experiences for hotels, resorts, restaurants, venues, and food businesses.
metadata:
  portable: true
  category: 06-sector-and-domain-ux
  compatible_with:
  - claude-code
  - codex
---

# Hospitality Hotel And Restaurant UX
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

Use this vertical overlay with the design doctrine, typography, layout, UX,
content, accessibility, conversion, imagery, dashboards and design-system
skills. Hospitality design must make service feel clear and trustworthy while
helping staff operate safely under pressure.

## Required Inputs

| Artefact | Source/provider | Required? | If absent |
|---|---|---:|---|
| Format, guest/customer segments, service promise, environment and business outcome | Client brief and operators | Yes | Stop the visual decision and request context. |
| Real/representative content, assets, brand constraints, accessibility target and owner | Client, content and design authority | Conditional | Return a qualified brief and mark affected checks `NOT_ASSESSED`. |

## Use When

- Designing a hotel, resort, accommodation, restaurant, venue, catering or food-service guest/staff experience.

## Do Not Use When

- The work is only backend implementation, generic brand strategy or a live accessibility audit; route to the narrower owner.

## Required Inputs

The required inputs are the format, audience, service promise, environment,
real/representative content, brand constraints, accessibility target and owner
listed above. If a material input is missing, stop the affected visual decision.

## Workflow

1. Map the guest journey and the staff journey together: discover, choose,
   reserve/order, arrive, receive service, recover, pay, leave and return.
2. Choose one visual thesis and three authored decisions. State typeface pair,
   palette intent, density, image direction and why they fit the audience.
3. Design critical states first: available/unavailable, loading, sold out,
   waitlist, late arrival, payment failure, allergen warning, room not ready,
   maintenance/out-of-order, cancellation, refund and service recovery.
4. Create tokens for brand, semantic status, type, spacing, elevation, focus,
   motion and density; map them to reusable components and channels.
5. Render real content on mobile, desktop, low bandwidth and staff devices;
   review contrast, keyboard, screen-reader labels, touch targets, translation,
   error recovery and operational legibility.

## Outputs

| Artefact | Consumer | Acceptance condition |
|---|---|---|
| Purpose-fit design brief, type/palette rationale, journey maps, token map, component/state matrix, responsive renders and handoff notes | Owner, designer, developer and QA | Visual thesis, critical states, accessibility, responsive behaviour and owner decision are explicit. |

## Evidence Produced

- Rendered visual slice, contrast/accessibility checks, responsive/device review,
  usability findings, owner decision and explicit unassessed checks.

## Capability Contract

Read/search, visual design, content inspection, rendering and accessibility
review may be required. Production mutation and publication require authority.

## Degraded Mode

Without real content, render tooling, device access or reviewer input, return a
qualified design brief and mark the affected checks `NOT_ASSESSED`.

## Decision Rules

| Condition | Action | Risk avoided |
|---|---|---|
| Guest discovery is the primary job | Use editorial hierarchy with fast task paths | Pretty but unusable site |
| Staff operate under time/pressure | Use dense, scannable states and clear exceptions | Slow or unsafe service |
| A state affects money, safety or privacy | Design text, recovery and role feedback first | Hidden irreversible error |

## Quality Standards

Purpose-fit, authored, accessible, readable, responsive, state-complete,
maintainable and proven in context; missing proof is `NOT_ASSESSED`.

## Hospitality patterns

- Guest web: editorial photography plus fast task paths for rooms, dining,
  events, location, policies and booking/enquiry.
- Operations UI: compact, scan-friendly boards for rooms, housekeeping,
  maintenance, tables, orders, KOT/KDS, payments and day close; never encode
  status by colour alone.
- Menus: readable hierarchy, price/portion clarity, dietary/allergen content
  only when verified, and clear availability/86'd states.
- Events: capacity/layout/package comparison, enquiry state, function-sheet
  handoff and post-event feedback.
- Trust: genuine images, attributed reviews, accessible policies and visible
  human help. Avoid decorative friction on high-intent tasks.

## Decision table

| Choice | Use when | Avoided failure |
|---|---|---|
| Editorial, restrained guest surface | Discovery and premium positioning | Generic booking-app look |
| Dense status board | Front desk, housekeeping, kitchen or cashier | Slow scanning and hidden exceptions |
| Visible text status + colour/icon | Any operational state | Colour-blind or low-light ambiguity |
| Progressive disclosure | Complex rates, packages or event options | Overwhelming choice |
| Human fallback and recovery | Payment, booking, complaint or safety path | Abandoned or unsafe guest |

## Acceptance evidence

Provide the design brief, token map, component/state matrix, real-content
render, responsive/keyboard/screen-reader review, contrast check, usability
notes, handoff annotations and owner decision. Missing render, accessibility,
device, content or reviewer evidence is `NOT_ASSESSED`.

## Anti-Patterns

- Luxury equals dark gradients. Fix: use a purpose-fit thesis and readable contrast.
- One dashboard serves every role. Fix: design role-specific density and actions.
- Photos hide missing facts. Fix: pair imagery with verified amenities, policies and availability.
- Colour is the only status signal. Fix: add text, icon, order and accessible focus.
- A polished prototype is called ready. Fix: test failure, translation, input, responsive and staff workflows in context.

## Worked example

For a lodge booking flow, pair an editorial guest page with a high-contrast
availability summary, explicit inclusions/cancellation/deposit facts, a human
fallback, and confirmation/error states. Test the same journey on a low-cost
phone and keyboard before standardising its tokens and components.

## Examples

The worked lodge booking flow above is the minimum example: a room page, clear
availability and policy facts, human fallback, confirmation/error states and a
low-cost-phone/keyboard review.

## References

- [Design doctrine](../../../doctrine/design-doctrine.md)
- [Design quality gate](../../../governance/design-quality-gate.md)
- `chwezi-dev-engine/docs/source-registers/hospitality-currentness-2026-09.json` (resolve the checkout through the current workspace map).
