---
title: Personal & Portfolio Design Tokens Reference (REFERENCE ONLY — CUSTOMIZE FOR YOUR BRAND)
sector: personal
---

# Personal & Portfolio: Design Tokens Reference

**⚠️ IMPORTANT: This is a REFERENCE palette, not a prescription. Do NOT use these colors/fonts directly. Every personal website must look distinctly like YOU.**

This document shows ONE example of how personal portfolio sites can be designed. Your site should have its own distinctive visual identity that authentically represents your personality and work.

## Color Philosophy (For Your Customization)

Personal websites must balance **professionalism with personality and authenticity**. But achieving this requires YOUR unique color strategy, not a default palette.

### Example Palette (DO NOT USE AS-IS)

- **Slate Dark** (#1e293b): Trust, professionalism, primary text
- **Slate Gray** (#64748b): Secondary text, subtle elements
- **Accent Vibrant** (#3b82f6): Energy, CTAs, personality, highlights
- **Warm Neutral** (#f8fafc): Clean backgrounds, breathing room
- **Gold Accent** (#f59e0b): Highlights, special elements, warmth

### Why This Is Just ONE Option

Different personal brands need different colors:
- **Creative/Designer**: Often use bold, saturated colors (vibrant purples, teals, magentas) not neutral slate
- **Technical/Developer**: Often use dark mode + electric accent (neon greens, cyans, purples)
- **Writer/Content Creator**: Often use warm, welcoming palettes (warm creams, earth tones, soft accents)
- **Photographer/Visual Artist**: Often use minimal color, let images dominate (mostly white/black with one accent)
- **Entrepreneur/Personal Brand**: Often use vibrant, personality-driven colors reflecting brand identity
- **Academic/Researcher**: Often use sophisticated neutrals (grays, navy, one accent)

Your personal brand should NOT default to this palette. Answer your sector-brief questions to define colors that authentically represent YOU.

## Typography (CUSTOMIZE — DO NOT USE THESE FONTS DIRECTLY)

### Example Font Pairing (This Is NOT Your Pairing)

**Serif Example**: Bodoni Moda (DO NOT USE — find your own)
- Headlines, hero section
- About me section
- Blog post titles

**Sans-serif Example**: Public Sans (DO NOT USE — find your own)
- Navigation, labels, body text
- All devices and sizes

**Mono Example**: JetBrains Mono (DO NOT USE — find your own)
- Code snippets
- Technical elements
- Developer portfolios

### Why You Need Different Fonts

The design-system skill explicitly forbids Inter, Roboto, and Arial to prevent generic designs. This reference also shows common fonts, but your personal brand should choose UNIQUE fonts that:
- Reflect your personality and work style
- Differentiate from other portfolio sites
- Work across all device sizes
- Maintain accessibility (WCAG AA+)

**Font Selection by Personality:**
- **Creative/Designer**: Modern, distinctive display fonts (Clash Display, Cabinet Grotesk, Satoshi)
- **Developer**: Bold, code-friendly pairing (Courier Prime + Bricolage Grotesque)
- **Writer**: Elegant, readable serif (Theano Didot + Source Serif 4)
- **Visual Artist**: Minimal fonts (let visuals dominate)
- **Entrepreneur**: Confident, bold fonts (Bricolage Grotesque + Crimson Text)

See [Fontsource](https://fontsource.org) for hundreds of distinctive, self-hosted font options.

## Spacing & Layout

### Spacing Scale (Tailwind-aligned)

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Tight icon spacing |
| **sm** | 8px | Button padding, small gaps |
| **md** | 16px | Default padding, margins |
| **lg** | 24px | Card padding, section spacing |
| **xl** | 32px | Large gaps, section breaks |
| **2xl** | 48px | Major section separation |
| **3xl** | 64px | Full page breaks |

### Layout Breakpoints

- Mobile: 375px (primary design base)
- Tablet: 768px
- Desktop: 1280px+

### Component Specifications

**Buttons:**
- Primary: Bold, high contrast, 12px rounded
- Secondary: Outline or ghost style
- Hover: Scale, shadow, or color change

**Cards:**
- Consistent border-radius (8px or 12px)
- Subtle shadow or border (not both)
- Hover: Lift effect (translateY -4px)

**Typography Scale:**
- H1: 48px serif, 700 weight
- H2: 36px serif, 600 weight
- H3: 24px serif, 600 weight
- Body: 16px sans, 400 weight
- Small: 14px sans, 400 weight

## Anti-Homogeneity Principle

**Every personal website must look distinctly like YOU.** If two portfolios both use Slate + Public Sans + same layout, they become indistinguishable. This defeats the purpose of a personal site.

To ensure your site is unique:

1. **Define YOUR colors** (not these reference colors)
   - Research other portfolios in your field and choose opposite territory
   - Align with your personality, not just trends
   - Consider your market: What colors do competitors overuse?

2. **Choose distinctive fonts** (not the example fonts)
   - Start at [Fontsource](https://fontsource.org)
   - Choose ONE heading font that feels distinctly like you
   - Choose ONE body font that's invisible (easy to read)
   - Test across all pages before committing

3. **Build your unique layout approach**
   - Not every portfolio needs a grid
   - Not every portfolio needs the same navigation
   - Think about what structure best showcases YOUR work
   - Consider your primary goal: hire me? commission me? share ideas?

4. **Let your work speak**
   - Your projects/content are what matter most
   - Design should support and highlight your work, not overshadow it
   - Consider emphasis: What deserves the most visual real estate?

## Accessibility Standards

- Minimum contrast ratio: 4.5:1 (WCAG AA)
- All interactive elements: 44px+ touch targets
- Focus visible: 2px outline, high contrast
- Alt text: Descriptive for all images
- Keyboard navigation: Full support
- Mobile-first responsive design

## Reference Sites (For Differentiation Strategy)

Study these to understand personal portfolio patterns, but DO NOT COPY their aesthetics:
- Brittany Chiang (terminal-inspired developer) — different aesthetic approach
- Maggie Appleton (digital garden, illustrated) — unique content structure
- Matt Farley (minimalist designer) — clean grid approach
- Robby Leonardi (gamified resume) — interactive approach
- Austin Kleon (blog-focused writer) — content-first design

Better approach: Find 3 people in your exact field/niche and decide what visual territory they DON'T occupy. Build your site there.

---

## Related References

- **portfolio-branding.md** — Color psychology for 8 hues, typography by 6 creator types, photography, brand voice
- **portfolio-conversion.md** — Portfolio funnel, project showcase design, social proof, CTA hierarchy
- **portfolio-type-patterns.md** — 7 creator types with distinct design systems + branding personality framework

## Next Steps

1. **Read your sector-brief-template.md carefully** — especially the Brand Identity and Visual Identity sections
2. **Complete your sector-brief.md** in `docs/sector-brief.md` with YOUR colors, YOUR fonts, YOUR personality
3. **Do NOT default to this reference palette** — answer your brief to create something authentically YOU
4. **Run the design-system skill** — it will read your customized brief and generate a unique visual system
5. **Result**: A personal website that distinctly reflects your personality and work
