---
title: Tour & Travel Design Tokens Reference (REFERENCE ONLY — CUSTOMIZE FOR YOUR BRAND)
sector: tour-travel
---

# Tour & Travel: Design Tokens Reference

**⚠️ IMPORTANT: This is a REFERENCE palette, not a prescription. Do NOT use these colors/fonts directly. Every travel website must look different.**

This document shows ONE example of how travel sites can be designed. Your site should have its own distinctive visual identity.

Design system for high-conversion, high-performance travel websites optimizing for discovery, trust, and immediate booking action. But how you achieve this visually should be UNIQUE to your brand.

## Color Philosophy (For Your Customization)

Tour & travel sites must balance **wanderlust with urgency and trust**. But achieving this requires YOUR unique color strategy, not a default palette:

### Example Palette (DO NOT USE AS-IS)
- **Sky Blue** (#0EA5E9): Exploration, sky, freedom, trust
- **Sand Gold** (#F59E0B): Exotic locations, warmth, adventure, urgency
- **Emerald Green** (#10B981): Nature, sustainability, positive experiences
- **Deep Navy** (#1F2937): Professional, established, credible

### Why This Is Just ONE Option

Different travel markets need different colors:
- **Luxury eco-lodge**: Often use warm earth tones + muted greens (natural, premium), not bright blue/gold
- **Adventure outfitter**: Often use deep earth + bold accent (rugged, trustworthy), not sky blue
- **Cultural tourism**: Often use warm terracotta + ochre (authentic, heritage), not modern palette
- **Budget backpacker**: Often use bold colors + energetic palette (youthful, exciting), not conservative

Your travel brand should NOT default to this palette. Answer your sector-brief questions to define YOUR colors based on your specific market and target customer.

### Primary Palette (Optimized for Conversion)

| Role | Light | Dark | RGB Light | Usage |
|------|-------|------|-----------|-------|
| **Sky Blue** | #0EA5E9 | #06B6D4 | 14, 165, 233 | Primary CTA "Book Now", highlights |
| **Sand Gold** | #F59E0B | #FBBF24 | 245, 158, 11 | Urgency "Limited Spots", secondary CTA |
| **Emerald** | #10B981 | #34D399 | 16, 185, 145 | "Free Cancellation", eco-tours, success |
| **Deep Navy** | #1F2937 | #111827 | 31, 41, 55 | Body text, headers, trust |
| **Warm Gray** | #9CA3AF | #D1D5DB | 156, 163, 175 | Borders, metadata, inactive |
| **Premium Gold** | #D4AF37 | #FCD34D | 212, 175, 55 | Luxury tours, VIP, 5-star reviews |
| **Adventure Red** | #DC2626 | #F87171 | 220, 38, 38 | "Limited Time Offer", energy |

### Dark Mode Support

All colors verified for WCAG AA minimum (4.5:1 contrast) in both light and dark modes.

### Color Psychology by Tour Type

- **Adventure Tours**: Emphasize Sky Blue + Adventure Red (energy)
- **Luxury Tours**: Use Premium Gold + Deep Navy (prestige)
- **Eco-Tours**: Lead with Emerald + Sky Blue (nature + trust)
- **Budget Tours**: Highlight Sand Gold (value), Blue CTA (trust)

## Typography (CUSTOMIZE — DO NOT USE THESE FONTS DIRECTLY)

### Example Font Pairing (This Is NOT Your Pairing)

**Serif Example**: Source Serif 4 or Merriweather (DO NOT USE — find your own)
- Headlines: H1–H3
- Long-form content (about, blog, testimonials)

**Sans-serif Example**: Hanken Grotesk or Sora (DO NOT USE — find your own)
- Navigation, labels, CTAs, short copy
- Body text on mobile

**Display Example**: Bodoni Moda (DO NOT USE — find your own)
- Hero headline (one word or short phrase)
- Accent headers

### Why You Need Different Fonts

The design-system skill explicitly forbids common fonts (Inter, Roboto, Arial) to prevent generic designs. This reference shows example fonts, but your brand should choose UNIQUE fonts that:
- Reflect your travel market (luxury vs. adventure vs. cultural vs. budget)
- Differentiate from competitor sites
- Work across all device sizes
- Maintain accessibility (WCAG AA+)

See [Fontsource](https://fontsource.org) for hundreds of distinctive, self-hosted font options.

### Typography Scale

| Element | Font | Size | Weight | Line-height |
|---------|------|------|--------|-------------|
| **H1** | Bodoni Moda | 48px | 700 | 1.2 |
| **H2** | Source Serif 4 | 36px | 600 | 1.3 |
| **H3** | Source Serif 4 | 24px | 600 | 1.4 |
| **Body** | Hanken Grotesk | 16px | 400 | 1.6 |
| **Small text** | Hanken Grotesk | 14px | 400 | 1.5 |
| **CTA buttons** | Hanken Grotesk | 16px | 600 | 1.5 |

### Mobile Typography

- H1: 32px
- H2: 24px
- Body: 15px (slightly larger for readability)
- Line-height: +0.1 on all sizes

## Spacing & Layout

### Spacing Scale (Tailwind-aligned)

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Icon spacing, tight spacing |
| **sm** | 8px | Padding in buttons, small gaps |
| **md** | 16px | Default padding, small margins |
| **lg** | 24px | Section padding, card spacing |
| **xl** | 32px | Large gaps, section margins |
| **2xl** | 48px | Major section breaks |
| **3xl** | 64px | Full-width section separation |

### Layout Breakpoints

- Mobile: 375px (primary design base)
- Tablet: 768px
- Desktop: 1280px+

## Component Guidelines

### Buttons

**Primary CTA**: Deep Forest background, white text, 12px rounded
- Padding: 12px 24px
- Hover: Darken 10%, add shadow

**Secondary**: Terracotta outline, Terracotta text, transparent background
- Hover: Light Terracotta background fill

**Size variants**:
- Small (12px text, 8px 16px padding)
- Normal (16px text, 12px 24px padding)
- Large (18px text, 14px 32px padding)

### Cards

- Background: White with light shadow (0 2px 8px rgba(0,0,0,0.08))
- Border radius: 8px
- Padding: 24px
- Image ratio: 16:9 (destination photos), 1:1 (experiences/people)
- Hover: Lift shadow (0 8px 16px rgba(0,0,0,0.12)), scale +2%

### Forms

- Input background: Cream
- Border: 1px Stone Gray
- Focus: 2px Deep Forest border, blue ring +2px
- Label: Hanken Grotesk 14px, Charcoal
- Error: Red #D32F2F on light background

## Animation & Motion

### Subtle Animations (Performance-First)

- **Fade-in on scroll**: 600ms ease-out
- **Hover lift**: 200ms ease-out (translate Y -4px)
- **Button press**: 100ms ease-out (scale 0.98)
- **Image reveal**: 800ms ease-out

**Mobile**: Reduce all animation durations by 30% OR disable if `prefers-reduced-motion`

## Accessibility Standards

- Minimum contrast ratio: 4.5:1 (WCAG AA)
- All interactive elements: 44px+ touch targets
- Focus visible: 2px outline, high contrast
- Alt text: Descriptive for all images
- Keyboard navigation: Full support

## Anti-Homogeneity Principle

**Every travel website built with this system must look visually distinctive.** If two tour operators both use Sky Blue + Hanken Grotesk + the same component patterns, they become indistinguishable from each other and generic booking sites.

To ensure your site is unique:

1. **Define YOUR colors** (not these reference colors)
   - Research your competitors' palettes and choose opposite territory
   - Align with the destinations you promote (but don't be limited by it)
   - Consider your market: Budget travelers want different colors than luxury travelers

2. **Choose distinctive fonts** (not Hanken Grotesk/Source Serif 4/Bodoni Moda)
   - Start at [Fontsource](https://fontsource.org)
   - Choose ONE heading font that feels distinctive to your brand
   - Choose ONE body font that's invisible (easy to read)
   - Test the pairing across all pages before committing

3. **Build component variations** (not cookie-cutter cards)
   - Design at least 3 tour card layouts (depending on tour type)
   - Create different gallery treatments for different content
   - Add visual identity through:
     - Accent element position (lines, dots, shapes)
     - Spacing rhythm (generous vs. tight)
     - Border treatment (none, subtle, bold outline)
     - Corner radius (sharp, subtle, fully rounded)

4. **Use reference sites strategically**
   - Study competitors to understand what you DON'T want
   - Look at non-competitors for inspiration (airlines, hotels, lifestyle brands)
   - Borrow patterns, not palettes

## Reference Sites (For Differentiation Strategy)

Study these to understand travel site patterns, but DO NOT COPY their aesthetics:
- Wilderness Safaris (luxe eco-safari aesthetic — what NOT to copy if budget market)
- Trafalgar Tours (structured, mature traveler design — inform yours differently)
- Intrepid Travel (adventure brand — but choose different visual territory)
- Natural Habitat Adventures (conservation focus — use different color strategy)
- Perenn (design-forward boutique — study navigation, not colors)

Better approach: Find 3 competitors in your exact market and decide what visual territory they DON'T occupy. Build your site there.

---

---

## Related References

- **travel-branding.md** — Full color psychology guide, typography pairing by tour type, photography direction, competitive differentiation, brand voice, brand audit checklist
- **booking-conversion.md** — Booking funnel, 3-second test, urgency/scarcity patterns, trust architecture (3 tiers), pricing display, review design, search widget, gallery patterns
- **travel-type-patterns.md** — Design patterns for 9 travel types (luxury safari, budget/backpacker, cultural, eco-tourism, adventure, wellness, cruise, city breaks, family) with branding personality framework
- **component-patterns.md** — HTML/Tailwind component code examples (destination cards, itinerary timeline, testimonials, booking CTA, gallery, hero, trust section)
- **IMPLEMENTATION-GUIDE.md** — Full Astro + Tailwind implementation guide with booking flow, revenue optimisation, SEO, performance benchmarks

## Next Steps

1. **Read your sector-brief-template.md carefully** — especially the Brand Identity and Visual Identity sections
2. **Complete your sector-brief.md** in `docs/sector-brief.md` with YOUR colors, YOUR fonts, YOUR travel market positioning
3. **Do NOT default to this reference palette** — answer your brief to create something distinctive
4. **Run the design-system skill** — it will read your customized brief and generate a unique visual system
5. **Result**: A travel website that stands apart from competitor sites
