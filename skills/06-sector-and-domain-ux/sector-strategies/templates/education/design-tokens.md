---
title: Education Design Tokens Reference
sector: education
---

# Education: Design Tokens Reference

This file provides sector-standard design tokens for education websites (schools, universities, training institutes).

## Color Philosophy

Education sites succeed when they convey **credibility, safety, and clear structure**. Colors should feel:
- Professional and trustworthy
- Energetic but not chaotic (primary colors for energy, neutrals for stability)
- Accessible (high contrast for readability)

**A signature color increases brand recognition by 80%.** Choose one dominant primary + one high-contrast accent for CTAs. The accent appears ONLY on enrollment buttons, key CTAs, and achievement badges. See **school-branding.md** for full color psychology guide and school-type-specific palette recommendations.

**Competitive differentiation:** Before choosing colors, audit 5-10 similar schools in your area. If every school uses blue + white, choose green + gold. Stand out while staying education-appropriate.

### Primary Palette (Sector Standard)

| Role | Hex | Usage |
|------|-----|-------|
| **Primary Blue** | #1E40AF | Main CTA, headers, trust |
| **Secondary Green** | #059669 | Accent, success states, positive messaging |
| **Neutral Dark** | #1F2937 | Body text, main headers |
| **Light Gray** | #F9FAFB | Backgrounds, cards |
| **Gold Accent** | #D97706 | Highlights, badges, achievement |

### Usage Rules
- Headers: Primary Blue or Neutral Dark
- CTAs (Enroll, Apply): Primary Blue on white
- Body text: Neutral Dark on Light Gray
- Success/Progress: Secondary Green
- Disabled: 50% opacity gray

## Typography

**Serif**: Georgia or Source Serif 4 (heritage, trust) for headers
**Sans-serif**: Public Sans or Hanken Grotesk (clarity) for body and navigation
**Display**: Bodoni Moda (one headline accent on hero)

## Key Components (Education-Specific)

### Primary CTAs
- **"Apply Now"** / **"Enroll"**: Primary Blue, large, visible above fold on all pages
- **"Schedule a Tour"**: Secondary CTA, equal prominence
- **"Request Info"**: Tertiary CTA, form trigger
- **"Donate"**: Gold/accent color, fundraising focus

**Best practice**: Use multiple audience-specific CTAs (Students, Parents, Alumni, Donors)

### Page Components
- **Enrollment CTA**: Primary Blue button, 60–80px height on desktop, sticky on mobile
- **Course/Program Cards**: 3–4 per row (responsive 1 mobile), program badge, credit hours, application button
- **Faculty Profiles**: Circular photo (200x200px), name, title, credentials, bio, office hours link
- **Event Calendar**: Grid or list view, clear dates + time, registration CTAs, category badges
- **Testimonials**: Student/parent quote, photo, name, year/role, 3+ star rating
- **Success Stats**: "100% internship placement" style trust-builders, displayed prominently
- **Virtual Tour**: Full-screen video hero + interactive hotspots (click for details)
- **News/Updates**: Blog grid, featured article, recent posts sidebar

### Navigation Patterns
- **Desktop**: Horizontal main nav + dropdown menus for sections (Academics, Admissions, Student Life, About)
- **Mobile**: Hamburger menu, simplified dropdowns, sticky mobile nav bar
- **Audience Segmentation**: Consider separate nav paths for Prospective Students / Current Students / Parents / Alumni / Donors

### Color Accent Strategy
- **Gold badges**: Achievement, completion, special programs (scholarships, honors)
- **Green success**: Admission decisions, completed applications, calendar events
- **Blue actions**: All primary CTAs, clickable elements, links

---

## Reference Sites (Real Examples)

Study these exemplary education websites for UI/UX inspiration. Note: These use different tech stacks, but we extract UI/UX patterns and implement them with **Astro + Tailwind CSS v4 + Alpine.js**.

### High-Trust, Community-Focused Designs
- [Alverno College](https://www.alverno.edu) - Colorful CTAs, organized nav, success stats displayed prominently
- [Bates College](https://www.bates.edu) - Minimalist design, community-driven, clear giving options
- [Muhlenberg College](https://www.muhlenberg.edu) - Simplistic menus, strategic multimedia blend

### Visual & Multimedia-Rich Designs
- [Dakota Wesleyan University](https://www.dwu.edu) - Full-screen video hero, interactive virtual tour, student testimonials
- [Rhode Island School of Design (RISD)](https://www.risd.edu) - Student work showcase, minimalist layout, ample whitespace
- [Virginia Commonwealth University](https://www.vcu.edu) - Bold CTAs, strong imagery, dynamic content

### Content & Engagement Leaders
- [Georgetown University](https://www.georgetown.edu) - Audience segmentation (students/parents/alumni tabs), rich background info
- [University of Washington](https://www.washington.edu) - Intuitive donation flow, prominent action icons, accessibility focus
- [MIT](https://www.mit.edu) - Unique navigation patterns, quality visual storytelling

### Accessibility & Responsive Excellence
- [George Washington University](https://www.gwu.edu) - Interactive campus map, WCAG compliance, seamless mobile experience
- [University of Notre Dame](https://www.nd.edu) - Strong brand consistency, responsive scaling
- [Stanford University](https://www.stanford.edu) - Simple discipline navigation, news/updates blog, effective information hierarchy

### Key UI/UX Takeaways from These Sites

**CTAs**: Make primary actions obvious (Apply, Tour, Donate)
**Stats**: Display trust-building metrics early and often
**Video**: Full-width hero videos create emotional connection
**Tours**: Interactive campus tours essential for remote engagement
**Testimonials**: Real student/parent quotes build credibility
**Segmentation**: Different content for different audiences (prospective vs. alumni)
**Accessibility**: WCAG AA compliance + semantic HTML a must
**Mobile-First**: Responsive design non-negotiable
**White Space**: Don't crowd pages; let content breathe

---

---

## Related References

- **school-branding.md** — Full color psychology guide, typography pairing, competitive differentiation, photography direction, brand voice
- **enrollment-design.md** — Enrollment conversion patterns, parent trust architecture, CTA hierarchy, form design, 5-second test
- **school-type-patterns.md** — Design patterns for 7 school types (public, private, charter, international, higher ed, religious, vocational) with branding personality framework
- **component-patterns-full.md** — Complete HTML/Tailwind code examples with reference site inspiration
- **IMPLEMENTATION-GUIDE.md** — Full Astro + Tailwind implementation guide for school websites
- **tour-travel/design-tokens.md** — Detailed spacing scale, breakpoints, and complete accessibility standards (apply with education adaptations)
