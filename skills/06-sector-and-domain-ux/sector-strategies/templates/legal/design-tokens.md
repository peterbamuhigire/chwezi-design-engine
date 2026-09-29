# Legal Sector Design Tokens (Reference Only)

> **DO NOT USE AS-IS.** These are reference examples showing ONE possible interpretation of legal sector design. Every law firm must have different colors and fonts. Use these for psychology guidance — customize via your sector-brief.md.

---

## Reference Palette: Personal Injury Firm

One example — not a template. Your firm will differ.

```
Primary:    #1E4D8C  /* Deep trust blue — authority + accessibility */
Secondary:  #B45309  /* Warm amber — advocate energy, not aggression */
Accent:     #F59E0B  /* Gold highlight — achievement, conviction */
Background: #F8F7F5  /* Warm off-white — softer than clinical white */
Surface:    #FFFFFF  /* Card backgrounds */
Text:       #1A1A2E  /* Near-black — readable, not harsh */
Muted:      #6B7280  /* Supplementary text, metadata */
Border:     #E5E7EB  /* Subtle dividers */
```

**Typography example (not prescriptive)**:
- Heading: Libre Baskerville (serif — trustworthy, legal gravitas)
- Body: Source Sans Pro (humanist sans — clarity for stressed readers)
- Minimum body size: 17px

---

## Reference Palette: Family Law Firm

```
Primary:    #0D6E7A  /* Teal — calm, resolution-focused */
Secondary:  #4A7C59  /* Sage green — growth, healing */
Accent:     #C2724F  /* Terracotta — warmth, human connection */
Background: #F7F5F2  /* Warm cream */
Text:       #2D3748  /* Soft dark */
```

**Typography example**:
- Heading: Source Serif 4 (warm serif)
- Body: Lexend (rounded, approachable)

---

## Reference Palette: Criminal Defense Firm

```
Primary:    #1A2744  /* Deep navy — authority, protection, strength */
Secondary:  #2D4A6E  /* Mid navy — depth */
Accent:     #C0392B  /* Strong red — urgency, emergency line CTA */
Background: #0F1923  /* Very dark for hero — serious stakes */
Surface:    #F8FAFC  /* Light for content areas */
Text:       #F1F5F9  /* Light on dark sections */
```

**Typography example**:
- Heading: Oswald or Bricolage Grotesque Bold (strong, direct)
- Body: Atkinson Hyperlegible (highly readable at stress moment)

---

## Reference Palette: Estate Planning Firm

```
Primary:    #1B3A6B  /* Deep heritage blue */
Secondary:  #8B6914  /* Warm gold — legacy, achievement */
Accent:     #C4A44A  /* Lighter gold accent */
Background: #FAF8F4  /* Cream — warmth, heritage */
Text:       #2C2C2C  /* Rich near-black */
```

**Typography example**:
- Heading: Theano Didot (elegant, legacy-appropriate)
- Body: Source Serif Pro (readable, authoritative)

---

## Color Psychology Reference

### Trust Signal Colors

| Color | Psychological Association | Best Practice Areas |
|-------|--------------------------|---------------------|
| Deep blue | Authority, reliability, trust | All; universal for law |
| Teal | Calm, resolution, cooperation | Family, mediation |
| Navy | Seriousness, strength, protection | Criminal, litigation |
| Charcoal/slate | Sophisticated, modern | Corporate, business |
| Sage green | Growth, healing, resolution | Family, immigration |
| Warm gold | Achievement, premium, legacy | Estate, corporate |
| Terracotta/warm amber | Human, approachable, empathy | Immigration, family |

### Colors to Avoid

| Color | Why |
|-------|-----|
| Bright red as primary | Alarm/danger — wrong for most practices; use only for emergency CTAs |
| Bright orange | Associated with discounts; undermines premium positioning |
| Pure black background | Too aggressive for emotionally distressed clients |
| Lime/neon green | No trust association |
| Generic stock navy + gold | Every other law firm — zero differentiation |

---

## Spacing and Layout Reference

```css
/* Law firm content pages — wider margins for readability */
.content-max-width: 720px;     /* Readable line length for legal content */
.section-padding: 80px 0;      /* Generous whitespace — authoritative */
.card-padding: 32px;           /* Practice area cards */
.cta-padding: 16px 32px;       /* Consultation CTA button */

/* Mobile */
.mobile-section-padding: 48px 0;
.mobile-font-size: 17px;       /* Minimum — stressed adults need clarity */
.mobile-cta-height: 52px;      /* Tap-to-call and form submit */
```

---

## Component Color Usage

| Component | Color Role | Notes |
|-----------|-----------|-------|
| Primary CTA button | Accent (highest contrast) | "Free Consultation" — must stand out |
| Navigation | Primary on white | Firm and readable |
| Hero background | Primary (gradient or image overlay) | |
| Practice area cards | Surface + primary border | |
| Trust bar (credentials) | Light background, muted text | |
| Attorney photos | No color treatment | Authentic > filtered |
| Testimonial section | Surface or very light primary tint | |
| Contact section | Primary dark or accent | CTA emphasis |
| Footer | Near-black or dark primary | |
| Emergency/call CTA | High-contrast accent | Especially for criminal defense |
