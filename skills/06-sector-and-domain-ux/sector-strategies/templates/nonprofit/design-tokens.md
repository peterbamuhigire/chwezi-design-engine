---
title: Nonprofit/Charity/NGO Design Tokens Reference
sector: nonprofit
---

# Nonprofit/Charity/NGO: Design Tokens Reference

This file provides sector-standard design tokens for nonprofit and charity websites. Focus: **trust, impact, and emotional connection** in both light and dark modes.

## Color Philosophy

Nonprofit sites succeed when they convey **hope, trust, and tangible impact**. Colors should feel:
- **Warm & Hopeful**: Inviting, not corporate or cold
- **Trustworthy**: Established, credible, stable
- **Action-Oriented**: CTA colors that inspire giving
- **Accessible**: High contrast in light AND dark modes
- **Emotional**: Colors that resonate with the cause

**A signature color increases brand recognition by 80%.** Choose one dominant primary + one high-contrast accent for CTAs. The accent appears ONLY on donate buttons, key CTAs, and action headlines. See **color-psychology.md** for full hue-by-hue guide and sub-sector palette recommendations.

**Competitive differentiation:** Before choosing colors, audit 5-10 similar orgs. Charity: water chose bright yellow in a blue sector. Susan G. Komen chose pink against healthcare's cool tones. Stand out while staying mission-aligned.

## Primary Palette (Sector Standard)

### Light Mode Colors

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Charitable Blue** | #0EA5E9 | 14, 165, 233 | Primary CTAs (Donate), trust signals |
| **Impact Magenta** | #D946EF | 217, 70, 239 | Impact stories, results, achievements |
| **Warm Gold** | #FBBF24 | 251, 191, 36 | Highlights, testimonials, calls-to-action |
| **Clean White** | #FFFFFF | 255, 255, 255 | Card backgrounds, clean layouts |
| **Trust Dark** | #1F2937 | 31, 41, 55 | Body text, primary headers |
| **Secondary Gray** | #6B7280 | 107, 114, 128 | Secondary text, descriptions |

### Dark Mode Colors

| Role | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Charitable Blue** | #06B6D4 | 6, 182, 212 | Primary CTAs (lighter for dark) |
| **Impact Magenta** | #EC4899 | 236, 72, 153 | Impact stories (lighter, saturated) |
| **Warm Gold** | #FCD34D | 252, 211, 77 | Highlights (lighter for dark) |
| **Dark Background** | #0F172A | 15, 23, 42 | Dark mode background |
| **Dark Surface** | #1E293B | 30, 41, 59 | Cards, surfaces in dark mode |
| **Light Text** | #F1F5F9 | 241, 245, 249 | Primary text in dark mode |

## Typography

### Font Stack
- **Serif (Stories, Trust)**: Georgia, Source Serif 4, or Merriweather
- **Sans-serif (Clarity, Accessibility)**: Public Sans, Hanken Grotesk, or Atkinson Hyperlegible
- **Display (Hope, Impact)**: Bricolage Grotesque, Bodoni Moda, or DM Serif Display

### Typography Scale

| Element | Font | Size (Desktop) | Size (Mobile) | Weight | Line-height |
|---------|------|---|---|---|---|
| **H1 Hero** | Display | 48–56px | 32–40px | 700 | 1.2 |
| **H2 Section** | Serif | 36px | 28px | 600 | 1.3 |
| **H3 Subsection** | Serif | 24px | 20px | 600 | 1.4 |
| **Body Text** | Sans-serif | 16px | 15px | 400 | 1.6 |
| **Button Text** | Sans-serif | 16px | 14px | 600 | 1.5 |
| **Small Text** | Sans-serif | 14px | 13px | 400 | 1.5 |

## Component Specifications

### Donation Button (Primary CTA)
- **Light Mode**: Blue (#0EA5E9) background, white text
- **Dark Mode**: Cyan (#06B6D4) background, dark text
- **Padding**: 14px 32px
- **Border Radius**: 8px
- **Hover**: Brighten by 10%, add shadow
- **Focus**: Ring 3px with offset, high contrast

### Impact Stat Block
- **Light**: White background, blue accent
- **Dark**: Dark Surface background, cyan accent
- **Number Color (Light)**: Blue (#0EA5E9)
- **Number Color (Dark)**: Cyan (#06B6D4)
- **Number Size**: 48px (desktop), 36px (mobile)
- **Label**: Small, uppercase, gray text

### Story/Testimonial Card
- **Light**: White background, Magenta left border
- **Dark**: Dark Surface, lighter magenta border
- **Border Width**: 4px left
- **Padding**: 24px
- **Shadow**: Light (0 2px 8px), Dark (0 4px 12px)

### Newsletter Signup
- **CTA**: Warm Gold button (#FBBF24 light, #FCD34D dark)
- **Input**: Light gray background (light), dark surface (dark)
- **Focus State**: Blue ring, crisp border
- **Helper Text**: Secondary gray

### Volunteer/Get Involved CTA
- **Background**: Gradient from Blue to Magenta
- **Text**: White
- **Hover**: Gradient rotation, shadow enhancement
- **Icon**: Accent color

## Accessibility Contrast (Both Modes)

- **Body text on background**: 7:1 ratio (WCAG AAA)
- **Secondary text**: 4.5:1 ratio (WCAG AA)
- **Button text**: 4.5:1 minimum
- **All text**: Test with [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

**Dark Mode Specific**:
- ✅ Light text (#F1F5F9) on dark background (#0F172A) = 12:1
- ✅ Cyan (#06B6D4) on dark = 5.2:1
- ✅ Magenta (#EC4899) on dark = 4.6:1

## Spacing & Layout

| Token | Value | Usage |
|-------|-------|-------|
| **xs** | 4px | Tight spacing, icon gaps |
| **sm** | 8px | Button padding, input spacing |
| **md** | 16px | Default padding, small margins |
| **lg** | 24px | Card padding, section gaps |
| **xl** | 32px | Large gaps, section margins |
| **2xl** | 48px | Hero padding, major breaks |
| **3xl** | 64px | Full-width section separation |

## Motion & Animation

| Animation | Duration | Purpose |
|-----------|----------|---------|
| **Fade In** | 500ms | Page loads, section reveals |
| **Slide Up** | 600ms | Content emerges, impact reveals |
| **Pulse** | 2s | "Donate Now" button, highlights |
| **Bounce** | Infinite | Scroll indicators, CTAs |
| **Scale Hover** | 200ms | Button hover, card interaction |

**Accessibility**: Respect `prefers-reduced-motion` — disable animations for users who request it.

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Dark Mode Usage

Apply dark mode prefix to all color utilities:

```html
<!-- Example: Impact stat in light & dark -->
<div class="text-primary-600 dark:text-cyan-400">
  <div class="text-5xl font-bold">12,345</div>
  <div class="text-sm text-neutral-600 dark:text-neutral-400">People Helped</div>
</div>
```

## Reference Sites (Real Examples)

Exemplary nonprofit websites demonstrating strong UI/UX:

### High-Impact Storytelling
- [World Wildlife Fund (WWF)](https://www.worldwildlife.org) - Global reach, powerful imagery
- [TOMS](https://www.toms.com) - Social impact integrated with e-commerce
- [Charity: Water](https://www.charitywater.org) - Transparency, project updates, visual storytelling

### Trust & Credibility
- [Save the Children](https://www.savethechildren.org) - Professional, clear impact metrics
- [Doctors Without Borders (MSF)](https://www.msf.org) - Crisis-driven content, urgent CTAs
- [GiveDirectly](https://www.givedirectly.org) - Data-driven, transparent, accessible

### Volunteer & Engagement
- [Idealist.org](https://www.idealist.org) - Community-focused, volunteer matching
- [VolunteerMatch](https://www.volunteermatch.org) - Simple, searchable opportunities
- [Taproot Foundation](https://www.taprootfoundation.org) - Professional service matching

### Mobile-First & Accessible
- [OneGive](https://www.onegivecampaign.com) - Simple, mobile-optimized giving
- [GlobalGiving](https://www.globalgiving.org) - Projects, donor dashboard, mobile-first
- [Network for Good](https://www.networkforgood.org) - Accessibility-first design

### Dark Mode Considerations
Many nonprofits are adopting dark mode for:
- ✅ Reduced eye strain for donors who prefer it
- ✅ Better contrast for aging supporters
- ✅ Modern, accessible perception
- ✅ Energy savings for always-on displays

**Test your dark mode implementation** with real nonprofits' sites to ensure it meets accessibility and brand standards.

---

## Related References

- **color-psychology.md** — Full hue guide, sub-sector palettes, competitive differentiation, palette construction formula
- **storytelling-design.md** — Dignity principle, hero patterns, impact numbers, donation conversion, trust architecture, photography direction
- **sub-sector-patterns.md** — Design patterns for environment/agriculture, healthcare, education, humanitarian, arts/culture, research/science
- **tour-travel/design-tokens.md** — Detailed spacing scale, breakpoints, animation timing (apply with nonprofit adaptations)
