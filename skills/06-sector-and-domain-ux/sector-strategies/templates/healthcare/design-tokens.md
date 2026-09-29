---
title: Healthcare Design Tokens Reference (REFERENCE ONLY — CUSTOMIZE FOR YOUR FACILITY)
sector: healthcare
---

# Healthcare: Design Tokens Reference

**WARNING: This is a REFERENCE palette, not a prescription. Do NOT use these colors/fonts directly. Every healthcare facility must have its own distinctive, calming visual identity.**

## Color Philosophy

Healthcare design must prioritise trust, accessibility, and calm above all else. Patients are anxious, in pain, or making decisions for loved ones. The colour system must reduce stress.

### Example Palette (DO NOT USE AS-IS)

- **Clinical Blue** (#2563EB): Trust, primary actions, navigation, authority
- **Teal** (#0F766E): Secondary actions, specialist/clinical contexts
- **Surface White** (#F8FAFC): Clean backgrounds, card surfaces
- **Success Green** (#059669): Normal status, confirmations, availability
- **Warning Amber** (#D97706): Attention needed, wait times, limited availability
- **Critical Red** (#DC2626): Emergency info, urgent notices (use sparingly)
- **Info Blue** (#0284C7): Educational content, informational badges

### Why This Is Just ONE Option

Different facilities need different palettes:
- **General hospitals**: Often use calm blue/teal (trust + cleanliness)
- **Wellness centres**: Often use sage green + warm cream (natural + calming)
- **Paediatrics**: Often use warm blue + coral (friendly + safe)
- **Mental health**: Often use lavender + soft neutrals (gentle + non-threatening)
- **Teaching hospitals**: Often use navy + burgundy (academic authority)

Your facility should NOT default to this palette. Answer your sector-brief questions to define YOUR colours.

### Clinical Semantic Color System

Map these roles to your chosen palette:

| Semantic Role | Usage | Example |
|--------------|-------|---------|
| **Primary** | Headers, navigation, primary CTAs | Trust blue |
| **Secondary** | Supporting actions, accent elements | Clinical teal |
| **Surface** | Card backgrounds, content areas | Clean white |
| **Success** | "Available", "Open", confirmations | Green |
| **Warning** | Wait times, limited availability | Amber |
| **Critical** | Emergency info, urgent notices | Red (sparingly) |
| **Info** | Patient education, informational | Blue |
| **Muted** | Timestamps, metadata, captions | Slate gray |

### Accessibility Requirements (Mandatory)

| Requirement | Minimum | Target |
|-------------|---------|--------|
| **Body text contrast** | 4.5:1 (AA) | 7:1 (AAA) |
| **UI component contrast** | 3:1 | 4.5:1 |
| **Touch targets** | 44px | 48px |
| **Body font size** | 16px | 18px |
| **Colour independence** | Always pair colour with text/icon | Never colour alone |

### Colour-Blind Safety

Never use colour alone for status or meaning. Always pair with:
- **Text labels**: "Available", "Urgent", "Closed"
- **Icons**: ✓ (check), ⚠ (warning), ✕ (unavailable)
- **Patterns**: Solid, dashed, dotted for charts

## Typography (CUSTOMIZE — DO NOT USE THESE FONTS DIRECTLY)

### Example Font Pairing (This Is NOT Your Pairing)

**Accessible Sans**: Atkinson Hyperlegible (DO NOT USE without customising — find your own)
- Body text for all patient-facing content
- Specifically designed for maximum readability
- Distinguishes similar characters (I, l, 1)

**Clean Sans**: Public Sans (DO NOT USE — find your own)
- Headers, navigation, CTAs
- Professional, clean, modern

### Typography Scale

| Element | Desktop | Mobile | Weight | Line Height |
|---------|---------|--------|--------|-------------|
| **H1** | 40px | 32px | 700 | 1.2 |
| **H2** | 28px | 24px | 600 | 1.3 |
| **H3** | 22px | 20px | 600 | 1.4 |
| **Body** | 18px | 18px | 400 | 1.7 |
| **Large body** | 20px | 18px | 400 | 1.6 |
| **Small** | 14px | 14px | 400 | 1.5 |
| **CTA buttons** | 18px | 18px | 600 | 1.5 |

**18px minimum body text** — non-negotiable in healthcare.

## Spacing & Layout

### Spacing Scale (Tailwind-aligned)

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Icon-to-text gap, tight inline spacing |
| **sm** | 8px | Button padding, badge padding |
| **md** | 16px | Card padding, form field gaps |
| **lg** | 24px | Section padding, card groups |
| **xl** | 32px | Major section separation |
| **2xl** | 48px | Page-level vertical spacing |
| **3xl** | 64px | Hero-to-content separation |

### Layout Breakpoints

- Mobile: 375px (primary — 52%+ healthcare traffic)
- Tablet: 768px
- Desktop: 1280px

### Component Specifications

**Buttons:**
- Primary: High contrast, 48px minimum height, 18px text
- Secondary: Outlined style, same touch target
- Emergency: Red background, always visible

**Cards:**
- Doctor cards: Photo + credentials + CTA
- Service cards: Icon + title + description + link
- Department cards: Image + name + key services

**Forms:**
- 18px input text, 48px input height
- Visible labels always (never placeholder-only)
- Error messages inline and announced to screen readers

## Anti-Homogeneity Principle

**Every healthcare website must look different.** Two hospitals in the same city using the same blue + white + Public Sans template destroy trust — patients recognise templates.

To ensure uniqueness:

1. **Research 3 competing facilities** — note their colours, fonts, layout
2. **Choose opposite visual territory** — if competitors use blue, try warm teal or sage
3. **Select distinctive fonts** from [Fontsource](https://fontsource.org) — always prioritise readability
4. **Match your facility's personality** — a children's hospital ≠ a teaching hospital ≠ a wellness centre

---

## Related References

- **premium-hospital-playbook.md** — Complete guide to building $5K+ hospital websites
- **healthcare-branding.md** — Color psychology for 8 hues, accessibility-first design, typography by facility types
- **patient-trust-design.md** — Patient funnel, trust architecture, doctor profiles, appointment booking, WCAG requirements
- **healthcare-type-patterns.md** — 9 facility types with distinct design systems + premium feature matrix

Reference **tour-travel/design-tokens.md** and **education/design-tokens.md** for alternative formatting examples.
