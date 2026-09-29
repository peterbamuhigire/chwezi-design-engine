---
title: Anti-Homogeneity Principle
---

# Anti-Homogeneity Principle for Website-Skills

**Core Rule: No two websites built with these skills should look the same.**

This is a hard constraint enforced by the entire system. Sector templates provide customization frameworks, not prescriptive designs. Every site must be visually distinctive within its sector.

## The Problem We're Solving

Without anti-homogeneity enforcement, this system would produce generic websites:
- All corporate sites: Navy blue + Inter font + same card layout
- All travel sites: Sky blue + Poppins + same gallery pattern
- All education sites: Blue + white + same enrollment form

Result: Websites that look AI-generated and undifferentiated.

## How We Prevent Homogeneity

### 1. Sector-Brief Customization (REQUIRED)

Every project MUST complete a sector-brief-template.md with:
- **Unique competitive advantage** (not just company description)
- **Custom color palette** (with reasoning, not sector defaults)
- **Custom font selection** (from Fontsource, distinctive choices)
- **Target customer pain points** (shapes emotional design)
- **Visual market positioning** (what territory competitors DON'T occupy)

**If you skip the sector-brief, you get generic output.**

### 2. Reference vs. Prescriptive

**Design-tokens.md is REFERENCE ONLY:**
- Shows ONE example of how the sector could be designed
- NOT meant to be copied directly
- Marked with ⚠️ warnings about customization
- Includes anti-homogeneity section in every template

**Sector-brief-template.md is REQUIRED:**
- Asks detailed customization questions
- Drives differentiation through answers
- Results in unique design output

### 3. Design-System Enforcement

The design-system skill:
- **FORBIDS** Inter, Roboto, Arial (prevent generic fonts)
- **FORBIDS** purple + white gradient (prevent generic aesthetic)
- **FORBIDS** gray + rounded corners template (prevent SaaS look)
- **READS** your customized sector-brief
- **GENERATES** unique tailwind.config.mjs based on YOUR colors/fonts
- **ENFORCES** that each project has distinct visual identity

### 4. Competitor Differentiation Strategy

Customization questionnaires ask:
- **What competitors should we avoid visually?** (so we know what NOT to do)
- **What visual territory is unoccupied?** (where we can differentiate)
- **What color/font strategy would set you apart?** (unique positioning)

Recommended workflow:
1. Research 3 main competitors
2. Analyze their visual identity (colors, fonts, layouts)
3. Identify what they ALL do (so you DON'T do it)
4. Find visual territory they DON'T occupy
5. Build your site there

## Implementation Checklist

### For Sector Templates
- [ ] **sector-brief-template.md** asks differentiation questions
- [ ] **sector-brief-template.md** forbids using sector defaults
- [ ] **design-tokens.md** has ⚠️ REFERENCE ONLY warning
- [ ] **design-tokens.md** includes anti-homogeneity section
- [ ] Each sector-brief references this ANTI-HOMOGENEITY-PRINCIPLE.md document

### For Client Projects
- [ ] Sector-brief.md is completed with genuine customization answers
- [ ] Colors chosen are NOT the reference palette
- [ ] Fonts chosen are distinctive (not example fonts)
- [ ] Competitor analysis done to inform differentiation
- [ ] design-system skill produces unique visual identity
- [ ] Result: Site that looks distinctly different from competitors

### For Skills
- **design-system**: Enforce no Inter/Roboto/Arial + read customized briefs ✓
- **design-reference**: Analyze competitor URLs to inform differentiation strategy ✓
- **sector-strategies**: Warn against defaults + require customization ✓
- **page-builder**: Use customized design-tokens, not sector templates ✓

## Visual Verification

After design-system runs, verify differentiation:

**Does this site look like a template?**
- ❌ Navy + Inter font + white cards = Failed (too generic)
- ❌ Blue + same palette as another site = Failed (looks copied)
- ✓ Forest green + charcoal + Cabinet Grotesk + unique cards = Success
- ✓ Warm terracotta + serif + custom gallery layout = Success

**Competitors: Can you tell them apart visually?**
- ❌ Two corporate sites both navy + blue accent = Failed
- ✓ One corporate navy + gold serif, another charcoal + rust sans-serif = Success

## Anti-Patterns to Avoid

### ❌ Pattern 1: Use Sector Defaults Directly

```
Client: "We want a corporate website"
Process: Copy corporate/design-tokens.md → Use those colors/fonts directly
Result: Generic, indistinguishable from other corporate sites
```

### ✓ Pattern 1: Customize for Differentiation

```
Client: "We want a corporate website"
Process:
1. Fill sector-brief with custom colors, fonts, positioning
2. design-system reads sector-brief and customizes tailwind.config.mjs
3. Unique visual identity emerges from client's brand answers
Result: Distinctive corporate site that stands apart
```

### ❌ Pattern 2: Generic Sector Template Copy

```
Client: "We're a law firm"
Process: Use professional-services template as-is
Result: Looks like law firm template #42 online
```

### ✓ Pattern 2: Strategic Customization

```
Client: "We're a law firm"
Process:
1. Sector-brief asks: "What makes you different? (boutique vs. big firm? tech-forward vs. traditional?)"
2. Answer: "We're a boutique firm focused on intellectual property, tech-forward, 10 people"
3. Choose colors: Deep charcoal + rust (warm, boutique), not navy
4. Choose fonts: Modern serif (Andada Pro) + clean sans (Hanken Grotesk)
5. design-system generates unique visual identity
Result: Distinctive boutique law firm site
```

## Common Objections

**Q: Isn't this more work than templates?**
A: Not really. The sector-brief questionnaire takes 30 minutes. The result is a custom, differentiated site instead of a template.

**Q: What if we want the sector default colors?**
A: You can choose them, but only after considering alternatives. The sector-brief process ensures you're making that choice intentionally, not defaulting.

**Q: What if clients want a generic website?**
A: You should educate them that generic = low trust + high bounce. Distinctive design = higher conversion + brand credibility.

**Q: How do we ensure design-system doesn't revert to generic?**
A: By strictly reading the customized sector-brief. If the brief is incomplete or defaulted, ask the client to recomplete it fully.

## Enforcement Points

The system enforces anti-homogeneity at multiple levels:

1. **Sector-strategies SKILL.md**: Warns against using template defaults
2. **design-tokens.md files**: Mark themselves as reference-only + include anti-homogeneity section
3. **sector-brief-template.md files**: Ask customization + differentiation questions
4. **design-system SKILL.md**: Reads customized briefs + forbids generic fonts/patterns
5. **CLAUDE.md**: Hard rule: "Every site must look different"

If any of these enforcement points are skipped, homogeneity may occur. Follow all steps rigorously.

---

**Key Takeaway:**

Sectors are customization frameworks, not templates. Customization is not optional. Every answer in your sector-brief matters. The result should be visually distinctive within your market.

No two websites should look the same.
