---
title: School Branding & Visual Identity Guide
sector: education
---

# School Branding & Visual Identity

A school's brand is its promise to families. 70%+ of school searches start on mobile, and parents decide within 5 seconds whether a school "feels right." Visual identity — colors, typography, photography, mascot — is what triggers that feeling before a single word is read.

## The Brand Recognition Formula

A signature color increases brand recognition by 80%. For schools, this means:

1. **One dominant primary color** — appears in header, CTAs, and link color
2. **One high-contrast accent** — appears only on enrollment CTAs, key badges, and achievement highlights
3. **Warm neutrals** — text and backgrounds that feel welcoming, not corporate

## Color Psychology for Schools

| Hue | Psychological Effect | Best For | Avoid When |
|-----|---------------------|----------|------------|
| **Deep Blue** (#1E40AF) | Trust, stability, authority | Established institutions, universities | You want to feel warm/playful |
| **Forest Green** (#059669) | Growth, safety, nature | Primary schools, rural/eco schools | Urban tech-focused academies |
| **Warm Gold** (#D97706) | Achievement, excellence, warmth | Private schools, honors programs | Budget-focused messaging |
| **Royal Purple** (#7C3AED) | Prestige, creativity, wisdom | Arts academies, prestigious prep schools | Casual, community schools |
| **Coral/Orange** (#EA580C) | Energy, enthusiasm, warmth | Early years, creative schools | Formal/academic positioning |
| **Teal** (#0D9488) | Innovation, calm, modern | STEM schools, progressive academies | Traditional/heritage branding |
| **Crimson** (#DC2626) | Passion, excellence, strength | Sports-focused, competitive schools | Calming/nurturing messaging |
| **Sky Blue** (#0EA5E9) | Openness, clarity, hope | International schools, modern academies | Heritage/traditional feel |

## Competitive Differentiation

**Before choosing colors, audit 5-10 competitor schools:**

- If every school in your district uses blue + white, choose green + gold
- If religious schools in the area use maroon, choose navy + teal
- If international schools nearby use red + blue, choose purple + gold

**Real examples of differentiation:**
- Aga Khan Academies chose deep blue + gold to signal global prestige among East African schools
- Green Hill Academy chose green + gold to stand apart from blue-dominated Ugandan schools
- GEMS Cambridge chose vibrant teal to differentiate from traditional British reds

## Typography for Schools

### Font Pairing Principles

Schools need **readability first**, then personality:

| School Type | Header Font | Body Font | Personality |
|-------------|-------------|-----------|-------------|
| **Traditional/Heritage** | Serif (Bodoni Moda, Source Serif 4) | Sans-serif (Source Sans Pro) | Established, trusted |
| **Modern/Progressive** | Geometric sans (Bricolage Grotesque, Unbounded) | Humanist sans (Public Sans, Lexend) | Forward-thinking |
| **Creative/Arts** | Display (Alegreya, Literata) | Clean sans (Public Sans) | Expressive, unique |
| **STEM/Tech** | Monospace accent (JetBrains Mono) | Sans (Public Sans, Rubik) | Innovative, precise |
| **Early Years** | Rounded (Lexend, Quicksand) | Rounded sans (Alegreya Sans) | Warm, approachable |
| **International** | Clean sans (Hanken Grotesk) | Neutral sans (Public Sans) | Global, professional |
| **Religious** | Serif (Theano Didot, EB Garamond) | Serif body (Source Serif 4, Merriweather) | Reverent, traditional |

**Never use:** Inter alone, Roboto alone, Arial, Times New Roman, Comic Sans. These signal "default" or "unbranded."

**Always use Fontsource** for self-hosted fonts — no external CDN requests.

### Typography Scale for Education

| Element | Size (Desktop) | Size (Mobile) | Weight | Notes |
|---------|---------------|---------------|--------|-------|
| Hero headline | 48-64px | 32-40px | 700-800 | School name or key message |
| Section heading | 32-40px | 24-28px | 600-700 | Program areas, key sections |
| Card heading | 20-24px | 18-20px | 600 | Course names, faculty names |
| Body text | 16-18px | 15-16px | 400 | Minimum 16px for parent readability |
| Small/caption | 13-14px | 12-13px | 400 | Dates, meta info |
| Button text | 16px | 14-16px | 600 | Always uppercased or sentence case |

**Accessibility note:** Many school website visitors are parents aged 35-55. Body text must be 16px minimum, with 1.6 line-height and high contrast (7:1 WCAG AAA for body text).

## Logo & Mascot Guidelines

### Logo Usage

- **Primary logo**: Full logo with school name — header, letterheads, formal use
- **Icon/mark**: Shield, crest, or mascot silhouette — favicon, mobile header, social
- **Minimum size**: 40px height on web, never distort aspect ratio
- **Clear space**: 1x height of logo on all sides (no crowding)
- **Dark backgrounds**: Provide white/light version of logo

### Mascot Integration

- Use mascot sparingly — hero section accent, 404 page, loading states
- Never let mascot compete with content hierarchy
- Mascot works well for: school spirit sections, athletics, student life
- Keep mascot illustrations consistent in style (vector, flat, or illustrated — pick one)

## Brand Voice for Schools

| Audience | Tone | Example |
|----------|------|---------|
| **Prospective parents** | Warm, reassuring, informative | "Your child's journey to excellence starts here" |
| **Current parents** | Direct, helpful, community | "Term 2 begins Monday 6 May — here's what to prepare" |
| **Students** | Encouraging, energetic, aspirational | "Dream big. Work hard. Make it happen." |
| **Alumni** | Nostalgic, proud, connected | "Once a [mascot], always a [mascot]" |
| **Staff/applicants** | Professional, inspiring, mission-driven | "Join a team shaping the next generation" |

### Language Standards (Multi-language)

Following the skill library's language standards:
- **English**: British spelling (colour, programme, organisation) for East African schools
- **French**: Formal francophone African French for francophone schools
- **Kiswahili**: East African standard Kiswahili for local-language pages

## Photography Direction

### What to Photograph

- **Students learning**: Engaged, active, in natural light (never posed "looking at camera")
- **Facilities**: Clean, well-maintained, showcasing investment
- **Events**: Sports days, graduation, science fairs — real moments
- **Community**: Parents at events, teacher-student interactions
- **Achievement**: Award ceremonies, competitions, exhibitions

### Photography Rules

- **Always authentic** — never use stock photos (parents detect them instantly)
- **Diverse representation** — reflect your actual student body
- **Dignity-first** — show students as capable, joyful, engaged
- **Consistent editing** — same warmth, contrast, and tone across all photos
- **Permission required** — parental consent for all student images

### Video Guidelines

- **Never upload video files to the repo or server** — host on YouTube (free, global CDN)
- Clients upload to their YouTube channel and provide URLs in docs
- Embed via `youtube-nocookie.com` iframe with `loading="lazy"` and descriptive `title`
- School tour videos: 2-3 minutes maximum
- Testimonial videos: 60-90 seconds per person
- Use poster/thumbnail image as fallback

## The 5 Brand Touchpoints

Every school website must maintain brand consistency across:

1. **Website** — primary brand expression (this skill's focus)
2. **Social media** — same colors, fonts, voice (profile pics, cover images)
3. **Print materials** — prospectus, letterheads, report cards
4. **Signage** — school entrance, classroom signs, banners
5. **Uniforms & merchandise** — colors that match the brand palette

The website should be the **source of truth** for all other touchpoints.

## Brand Audit Checklist

Before launching a school website, verify:

- [ ] Primary + accent colors are unique in the local school market
- [ ] Font pairing is distinctive (not default sans-serif)
- [ ] Logo displays clearly at all sizes (40px to full width)
- [ ] All photography is authentic (zero stock images)
- [ ] Brand voice is consistent across all page copy
- [ ] Colors pass WCAG AA contrast checks (4.5:1 text, 3:1 UI)
- [ ] Mobile header shows brand clearly (logo + school name)
- [ ] Favicon and social sharing images use brand colors
- [ ] 404 page maintains brand identity (use mascot if available)

---

## Related References

- **enrollment-design.md** — Enrollment conversion patterns, parent trust architecture, CTA optimization
- **school-type-patterns.md** — Design patterns for 7 school types (public, private, international, etc.)
- **design-tokens.md** — Reference color palettes, typography scales, component specs
- **component-patterns.md** — HTML/Tailwind component code examples
