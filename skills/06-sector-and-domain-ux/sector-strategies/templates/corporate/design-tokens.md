---
title: Corporate & Consulting Design Tokens Reference (REFERENCE ONLY — CUSTOMIZE FOR YOUR BRAND)
sector: corporate
---

# Corporate & Consulting: Design Tokens Reference

**⚠️ IMPORTANT: This is a REFERENCE palette, not a prescription. Do NOT use these colors/fonts directly. Every corporate website must look different.**

This document shows ONE example of how corporate sites can be designed. Your site should have its own distinctive visual identity.

## Color Philosophy (For Your Customization)

Corporate and consulting sites must balance **authority with approachability and trust**. But what colors achieve this depends entirely on your brand and market position:

### Example Palette (DO NOT USE AS-IS)

- **Deep Navy** (#0F172A): Leadership, stability, enterprise-grade, professionalism
- **Slate Gray** (#64748B): Clarity, sophistication, secondary messaging, data visualization
- **Accent Brand** (#2563EB): Primary CTA, energy, differentiation from competitors
- **Forest Green** (#15803D): Growth, sustainability, positive metrics, success indicators
- **Warm Neutral** (#F5F3FF): Modern minimalism, breathing room, clean interfaces

### Why This Is Just ONE Option

Different corporate markets need different colors:
- **Financial firms**: Often use navy + gold (heritage + prestige), not blue
- **Tech consultants**: Often use black + vibrant accent (forward-looking), not neutral navy
- **Boutique firms**: Often use warm earth tones (human-focused), not cool navy
- **Established institutions**: Often use charcoal + subtle accent (sophisticated restraint)

Your brand should NOT default to this palette. Answer your sector-brief questions to define YOUR colors.

### Primary Palette (Optimized for Conversion)

| Role | Light | Dark | RGB Light | Usage |
|------|-------|------|-----------|-------|
| **Deep Navy** | #0F172A | #1E293B | 15, 23, 42 | Primary background, headers, hero, trust |
| **Slate Gray** | #64748B | #94A3B8 | 100, 116, 139 | Secondary text, data, metadata |
| **Accent Brand** | #2563EB | #60A5FA | 37, 99, 235 | Primary CTA "Request Demo", highlights |
| **Forest Green** | #15803D | #4ADE80 | 21, 128, 61 | Growth metrics, "ROI", success indicators |
| **Warm Neutral** | #F5F3FF | #F9F5FF | 245, 243, 255 | Card backgrounds, breathing room |
| **Light Gray** | #E2E8F0 | #334155 | 226, 232, 240 | Borders, dividers, subtle elements |
| **Alert Red** | #DC2626 | #F87171 | 220, 38, 38 | Warnings, critical metrics |

### Dark Mode Support

All colors verified for WCAG AAA standard (7:1 contrast) in both light and dark modes. Corporate sites often operate in dark office environments.

### Color Psychology by Company Type

- **Technology/SaaS**: Emphasize Accent Brand + Deep Navy (innovation + stability)
- **Financial Services**: Lead with Deep Navy + Slate Gray (trust + transparency)
- **Consulting/Professional Services**: Use Deep Navy + Accent Brand (authority + innovation)
- **Healthcare/Biotech**: Highlight Forest Green + Deep Navy (health + professionalism)
- **Real Estate/Commercial**: Deep Navy + Accent Brand (establishment + growth)

## Typography (CUSTOMIZE — DO NOT USE THESE FONTS DIRECTLY)

### Example Font Pairing (This Is NOT Your Pairing)

**Serif Example**: Georgia or Source Serif 4 (DO NOT USE — find your own)
- Headlines: H1–H2
- Long-form content (about, case studies, thought leadership)

**Sans-serif Example**: Public Sans or Sora (DO NOT USE — find your own)
- Navigation, labels, CTAs, metadata
- Body text on all devices

**Display Example**: Bodoni Moda (DO NOT USE — find your own)
- Hero headline (company mission, value proposition)
- Section headers (accent use only)

### Why You Need Different Fonts

The design-system skill explicitly forbids Inter, Roboto, and Arial to prevent generic designs. This reference also shows common fonts, but your brand should choose UNIQUE fonts that:
- Reflect your market position (traditional vs. forward-looking)
- Differentiate from competitors
- Work across all device sizes
- Maintain accessibility (WCAG AA+)

See [Fontsource](https://fontsource.org) for hundreds of distinctive, self-hosted font options.

### Typography Scale

| Element | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| **H1** | Bodoni Moda | 52px | 700 | 1.1 |
| **H2** | Source Serif 4 | 40px | 600 | 1.2 |
| **H3** | Source Serif 4 | 28px | 600 | 1.3 |
| **Body** | Public Sans | 16px | 400 | 1.6 |
| **Small text** | Public Sans | 14px | 400 | 1.5 |
| **CTA buttons** | Public Sans | 16px | 600 | 1.5 |
| **Data labels** | Public Sans | 13px | 500 | 1.4 |

### Mobile Typography

- H1: 36px
- H2: 28px
- H3: 20px
- Body: 15px (slightly larger for readability)
- Line-height: +0.1 on all sizes

## Spacing & Layout

### Spacing Scale (Tailwind-aligned)

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Tight element spacing, icon padding |
| **sm** | 8px | Button padding, small gaps |
| **md** | 16px | Default padding, section margins |
| **lg** | 24px | Card padding, section spacing |
| **xl** | 32px | Large gaps, major section breaks |
| **2xl** | 48px | Full-width section separation |
| **3xl** | 64px | Hero to content, full page breaks |

### Layout Breakpoints

- Mobile: 375px (primary design base)
- Tablet: 768px
- Desktop: 1280px
- Wide: 1920px+ (data-heavy dashboards, investor relations)

## Component Guidelines

### Buttons

**Primary CTA**: Accent Brand background, white text, 8px rounded
- Padding: 12px 24px
- Hover: Darken 15%, add subtle shadow
- Focus: 2px outline ring

**Secondary**: Slate Gray border, Slate Gray text, transparent background
- Hover: Slate Gray background fill (10% opacity)
- Used for "Learn More", "Contact Us"

**Tertiary**: Navy text, transparent background, underline on hover
- Used for "View case study", "Read article"

**Size variants**:
- Small (13px text, 8px 16px padding)
- Normal (16px text, 12px 24px padding)
- Large (18px text, 14px 32px padding)

### Cards

- Background: White with subtle shadow (0 1px 3px rgba(0,0,0,0.12))
- Border radius: 8px
- Padding: 24px
- Image ratio: 16:9 (case studies, office interiors)
- Hover: Lift shadow (0 10px 25px rgba(0,0,0,0.15)), translate Y -2px
- Border: 1px Light Gray (optional, for data-heavy cards)

### Forms

- Input background: Warm Neutral
- Border: 1px Light Gray
- Focus: 2px Accent Brand border, blue ring +2px
- Label: Public Sans 14px 600, Deep Navy
- Placeholder: Slate Gray 14px 400
- Error: Alert Red (#DC2626) on light background, clear error message below

### Data Visualization

- Primary chart color: Accent Brand
- Secondary: Slate Gray
- Success metric: Forest Green
- Warning: Alert Red
- Neutral: Light Gray
- Font: Public Sans (all sizes)

## Animation & Motion

### Subtle Animations (Performance-First)

- **Fade-in on scroll**: 600ms ease-out
- **Hover lift**: 200ms ease-out (translate Y -2px)
- **Button press**: 100ms ease-out (scale 0.98)
- **Chart animation**: 800ms ease-out
- **Number counter**: 1200ms ease-out (for KPIs)

**Mobile**: Reduce all animation durations by 30% OR disable if `prefers-reduced-motion`

## Accessibility Standards

- Minimum contrast ratio: 7:1 (WCAG AAA for corporate sites)
- All interactive elements: 44px+ touch targets
- Focus visible: 2px outline, high contrast
- Alt text: Descriptive for all images
- Keyboard navigation: Full support
- Data tables: Proper header markup, screen reader support

## Anti-Homogeneity Principle

**Every website built with this system must look visually distinctive.** If two corporate sites both use Deep Navy + Public Sans + the same component patterns, they become indistinguishable from generic templates.

To ensure your site is unique:

1. **Define YOUR colors** (not these reference colors)
   - Research your competitors' palettes and choose opposite territory
   - Align with your logo (but don't be limited by it)
   - Consider your market: What colors do leaders in your space avoid?

2. **Choose distinctive fonts** (not Public Sans/Source Serif 4/Bodoni Moda)
   - Start at [Fontsource](https://fontsource.org) or Google Fonts
   - Choose ONE heading font that feels distinctive
   - Choose ONE body font that's invisible (easy to read)
   - Test the pairing across all pages before committing

3. **Build component variations** (not cookie-cutter cards)
   - Design at least 3 button styles (primary, secondary, tertiary)
   - Create 2–3 card layouts for different content types
   - Add visual identity through:
     - Accent element position (lines, dots, shapes)
     - Spacing rhythm (generous vs. tight)
     - Border treatment (none, subtle, bold outline)
     - Corner radius (sharp, subtle, fully rounded)

4. **Use reference sites strategically**
   - Study competitors to understand what you DON'T want
   - Use non-competitors for inspiration (different markets)
   - Borrow patterns, not palettes (good navigation ≠ their colors)

## Reference Sites (For Differentiation Strategy)

Study these to understand corporate site patterns, but DO NOT COPY their aesthetics:
- McKinsey & Company (consulting authority — what NOT to copy)
- Goldman Sachs (dark theme mastery — but find different colors)
- Accenture (enterprise scale navigation — adapt, don't replicate)
- Deloitte (navigation structure — inform yours differently)
- Stripe (minimalist design — use different palette)

Better approach: Find 3 competitors and decide what visual territory they DON'T occupy. Build your site there.

---

## Related References

- **corporate-branding.md** — Color psychology for 8 hues, competitive differentiation (McKinsey/Bain/BCG examples), typography by 6 firm types, brand voice
- **client-conversion.md** — B2B 6-second test, client funnel, trust architecture, case study design, CTA hierarchy, thought leadership
- **corporate-type-patterns.md** — 6 firm types with distinct design systems + branding personality framework

## Next Steps

1. **Read your sector-brief-template.md carefully** — especially the Brand Identity and Visual Identity sections
2. **Complete your sector-brief.md** in `docs/sector-brief.md` with YOUR colors, YOUR fonts, YOUR differentiation strategy
3. **Do NOT default to this reference palette** — answer your brief to create something distinctive
4. **Run the design-system skill** — it will read your customized brief and generate a unique visual system
5. **Result**: A website that stands apart from other corporate sites
