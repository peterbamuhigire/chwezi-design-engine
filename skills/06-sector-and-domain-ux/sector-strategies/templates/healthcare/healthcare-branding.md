---
title: Healthcare Branding & Visual Identity Guide
sector: healthcare
---

# Healthcare Branding & Visual Identity

Healthcare websites must prioritise clarity and trust above all else. Patients are often anxious, in pain, or making decisions for loved ones. Design must reduce stress, not add to it. Accessibility is not optional — it is the primary design requirement.

## Color Psychology for Healthcare

| Hue | Psychological Effect | Best For | Avoid When |
|-----|---------------------|----------|------------|
| **Calm Blue** (#2563EB) | Trust, calm, reliability | General hospitals, clinics, insurance | You want to feel warm/personal |
| **Teal** (#0D9488) | Clean, modern, clinical | Specialist clinics, diagnostics, dental | Traditional/heritage institutions |
| **Soft Green** (#16A34A) | Healing, growth, wellness | Wellness centres, physiotherapy, paediatrics | Surgical/emergency services |
| **Deep Navy** (#1E3A5F) | Authority, expertise, stability | Cardiology, neurology, research hospitals | Community/friendly clinics |
| **Warm Coral** (#F97316) | Warmth, caring, energy | Paediatrics, maternal health, community | Surgical, emergency, specialist |
| **Lavender** (#8B5CF6) | Calm, gentle, modern | Mental health, whole-person care, fertility | Emergency, surgical, orthopaedics |
| **Burgundy** (#9F1239) | Heritage, prestige, strength | Established teaching hospitals | Start-up clinics, wellness |
| **Clean White + Gray** | Sterile, precise, professional | Diagnostics, labs, imaging centres | Community warmth needed |

### Critical Rule: Accessibility First
- **All text**: Minimum 4.5:1 contrast (WCAG AA), target 7:1 (AAA) for body text
- **Large text exceptions**: No exceptions in healthcare — everything must be readable
- **Colour-blind safe**: Never use colour alone to convey information (always pair with icons/text)
- **High contrast mode**: Must work for visually impaired users
- **Touch targets**: 48px minimum (larger than standard 44px) — patients may have tremors, injuries, reduced dexterity

### Clinical Semantic Color System

Adapted from clinical-grade healthcare application design. Map these semantic roles to your chosen palette:

| Semantic Role | Purpose | Example Hex | Usage |
|--------------|---------|-------------|-------|
| **Primary** | Trust, navigation, headers | `#2563EB` | Header, primary buttons, navigation |
| **Secondary** | Supporting actions | `#0F766E` | Secondary buttons, accent elements |
| **Surface** | Clean backgrounds | `#F8FAFC` | Card backgrounds, content areas |
| **Success/Normal** | Positive status, confirmations | `#059669` | "Available", "Open", trust badges |
| **Warning** | Attention needed | `#D97706` | Wait times, limited availability |
| **Critical/Emergency** | Urgent information | `#DC2626` | Emergency info, urgent notices |
| **Info** | Informational content | `#0284C7` | Health tips, patient education |
| **Muted** | Secondary text, metadata | `#64748B` | Timestamps, captions, fine print |

### Colour-Blind Safety Rules

8% of males have red-green colour blindness. Healthcare sites MUST:

| Instead Of | Use | Why |
|-----------|-----|-----|
| Red/green for status | Blue/amber + icons + text labels | Distinguishable by all |
| Colour-only badges | Colour + icon (✓/⚠/✕) + text ("Available"/"Urgent") | Triple redundancy |
| Red/green charts | Different patterns (solid, dashed, dotted) + distinct markers | Pattern-based |

Test all palettes with Deuteranopia, Protanopia, and Tritanopia simulators.

### Competitive Differentiation

| Market | Overused Colors | Differentiation Territory |
|--------|----------------|--------------------------|
| **General hospitals** | Blue + white | Warm teal, sage green, earthy blue-gray |
| **Specialist clinics** | Clinical teal | Deep navy + warm accent, warm charcoal |
| **Wellness centres** | Sage green + cream | Warm lavender, sunset coral, rich earth |
| **Dental** | Teal + white | Warm blue + gold, coral accents |
| **Mental health** | Lavender | Warm sage, soft terracotta, calm blue-gray |

**Rule**: Research the top 3 competing facilities in the same city. Note their primary colours. Choose the opposite visual territory. Two hospitals in the same city should never look alike.

## Typography for Healthcare

| Facility Type | Header Font | Body Font | Key Rule |
|---------------|-------------|-----------|----------|
| **Hospital/General** | Clean sans (Public Sans, Hanken Grotesk) | Accessible sans (Atkinson Hyperlegible) | Maximum readability |
| **Specialist Clinic** | Modern sans (Bricolage Grotesque, Hanken Grotesk) | Clean sans (Public Sans) | Professional clarity |
| **Wellness/Whole-Person Care** | Soft serif (Source Serif 4, Theano Didot) | Rounded sans (Lexend) | Warm, approachable |
| **Paediatrics** | Rounded friendly (Lexend, Quicksand) | Readable sans (Public Sans) | Child-friendly, parent-reassuring |
| **Mental Health** | Calm sans (Jost, Bricolage Grotesque) | Readable sans (Source Sans Pro) | Non-threatening, calm |
| **Dental** | Modern sans (Hanken Grotesk) | Clean sans (Public Sans) | Clean, professional |

### Key Rules
- Body text: **18px minimum** (larger than standard — patients include elderly)
- Line height: **1.7-1.8** (generous for readability)
- Never use decorative or script fonts in healthcare
- Atkinson Hyperlegible is the gold standard for accessibility
- **Monospace for clinical data**: Use monospace font for any displayed clinical values (phone numbers, hours, appointment times) — improves scanning accuracy
- **Font loading**: Self-host via Fontsource. Never use web fonts that may fail — fallback must remain readable

### Typography Hierarchy for Hospital Sites

| Element | Size (Desktop) | Size (Mobile) | Weight | Purpose |
|---------|---------------|---------------|--------|---------|
| **H1 Page Title** | 40px | 32px | 700 | Page identification |
| **H2 Section** | 28px | 24px | 600 | Major sections |
| **H3 Subsection** | 22px | 20px | 600 | Department/service names |
| **Body** | 18px | 18px | 400 | All patient-facing text |
| **Large body** | 20px | 18px | 400 | Key information (hours, address) |
| **Small/caption** | 14px | 14px | 400 | Timestamps, metadata only |
| **CTA buttons** | 18px | 18px | 600 | Minimum size for all buttons |

## Photography Direction

- **Facility photos**: Clean, modern, well-lit, reassuring environments
- **Staff photos**: Warm, professional, approachable (white coats optional, smiles essential)
- **Patient interactions**: Dignity-first, diverse, authentic (with explicit consent)
- **Equipment**: Modern, well-maintained — signals competence
- **Community**: Health events, outreach programmes, wellness activities
- **NEVER**: Stock photos of generic "doctor with stethoscope" — patients detect immediately

## Brand Voice

| Context | Tone | Example |
|---------|------|---------|
| **Patients seeking care** | Warm, reassuring, clear | "We're here for you. Book your appointment today." |
| **Medical information** | Accurate, accessible, non-jargon | "What to expect during your visit" |
| **Emergency/urgent** | Direct, calm, action-oriented | "Need urgent care? Walk in or call: +256..." |
| **Staff recruitment** | Professional, mission-driven | "Join a team dedicated to compassionate care" |

## Multi-Language Medical Terminology

Healthcare sites in multi-language markets (en/fr/sw) must:

- **Localise medical terms**: Not just translate, but use locally understood terminology
- **Consistent formatting**: Same visual treatment of condition names across languages
- **Cultural sensitivity**: Photography and language appropriate per audience
- **Text expansion**: French medical content ~30% longer; Kiswahili ~20% longer; design must flex
- **Emergency info**: Must be in ALL enabled languages on every page

---

## Related References

- **premium-hospital-playbook.md** — Complete guide to building $5K+ hospital websites
- **patient-trust-design.md** — Patient trust architecture, appointment conversion, accessibility requirements
- **healthcare-type-patterns.md** — Design patterns for 7 facility types
- **design-tokens.md** — Reference palettes, component specs
