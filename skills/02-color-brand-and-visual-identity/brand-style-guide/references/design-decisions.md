# Design Decisions Reference

Psychology, audit frameworks, and brand quality standards for use during brand-style-guide production.

Sources: Nahai (Webs of Influence), Keller (Strategic Brand Management), Leland (The Brand Mapping Strategy).

---

## 1. Colour Psychology by Colour

From Nahai's framework, synthesised with web-context application. Use these mappings when writing the psychology note for each colour in the Colour Palette section.

### How to use this table
Each colour carries a set of associations and a set of contexts where it performs well or poorly. When writing the psychology note for a client's palette colour, match the colour to the row below and adapt the note to the client's specific sector and audience.

| Colour | Core associations | High-trust context use | Caution |
|--------|------------------|----------------------|---------|
| Blue | Trust, calm, professionalism, reliability, competence | Finance, healthcare, B2B SaaS, legal, government | Overused in tech — differentiate with shade and pairing |
| Red | Urgency, excitement, appetite, passion, warning | CTAs, food and beverage, sale or limited-time offers | Never use for body text or large surfaces — creates anxiety at scale |
| Green | Nature, health, growth, wealth, safety, permission | Eco brands, wellness, finance, food, sustainability | Darker greens read as premium; lighter greens read as natural |
| Yellow | Optimism, warmth, attention, caution, energy | Highlights, children's brands, retail promotions, warnings | Low contrast on white — always test WCAG; can read as cheap if overused |
| Purple | Luxury, wisdom, creativity, spirituality, royalty | Premium brands, beauty, education, wellness, spiritual | Rare in B2B — use only when archetype supports it (Creator, Ruler, Sage) |
| Orange | Energy, enthusiasm, affordability, fun, accessibility | Retail, entertainment, youth brands, food, discount retail | Can undermine premium positioning — use cautiously in high-end sectors |
| Black | Luxury, sophistication, elegance, power, authority | Fashion, premium products, technology, editorial | Can feel cold or exclusive — pair with warm neutrals in service businesses |
| White | Cleanliness, simplicity, honesty, minimalism, space | Healthcare, tech, minimalist brands, premium | Needs strong typography and photography to avoid feeling empty |
| Brown / Earth tones | Reliability, warmth, craft, organic, heritage | Food, artisan brands, sustainability, construction | Can feel dated unless paired with strong contemporary typography |
| Gold / Metallic | Prestige, success, wealth, achievement | Luxury goods, awards, financial services, premium hospitality | Never use digital gold (#FFD700) — it reads cheap; use deep amber tones |

### Universal colour rule
Blue is universally associated with trust and reliability across cultures. When a client operates across markets with varied colour meanings, defaulting the primary trust-signal colour to blue reduces cultural misread risk.

### Cultural note
Colour meanings vary by culture and must be researched for specific markets. For East African and West African markets: green carries strong associations with growth and prosperity; white can signify mourning in some contexts; red holds positive celebratory associations in some cultures alongside its urgency associations. Always validate palette choices with in-market reviewers.

### Gender preferences in online colour (Nahai, research-cited)
Women in general online studies: prefer blue, purple, green; dislike orange, grey, brown.
Men in general online studies: prefer blue, green, black; dislike purple, orange, brown.
Blue is the only colour preferred by both groups — which explains its prevalence as a default trust colour in digital products.

---

## 2. Typography Psychology

From Nahai's framework, with agency application notes. Use these principles when writing the font personality note for each typeface in the Typography System section.

### Typeface category associations

**Serif fonts** (e.g., Source Serif 4, Libre Caslon Text, Andada Pro, Spectral)
- Associations: tradition, authority, trustworthiness, formality, heritage, expertise
- Appropriate for: law firms, newspapers, academia, financial services, established luxury brands, healthcare
- Agency note: Serif headings paired with sans-serif body text is the premium editorial combination. The contrast in formality creates visual interest while maintaining readability.

**Sans-serif fonts** (e.g., Public Sans, Hanken Grotesk, Atkinson Hyperlegible, Bricolage Grotesque)
- Associations: modernity, approachability, clarity, technology, efficiency, friendliness
- Appropriate for: SaaS, tech, startups, consumer apps, retail, service businesses
- Agency note: A humanist sans-serif (slightly rounded, warm proportions) reads warmer than a geometric sans-serif (precise, cold). Match to archetype: Caregiver and Everyman benefit from humanist; Ruler and Sage can use geometric.

**Script and handwritten fonts**
- Associations: elegance, femininity, creativity, personal touch, artisan, celebration
- Appropriate for: Beauty brands, food, events, personal brands, wedding, artisan goods
- Caution: Low legibility at small sizes. Never use for body text. Limit to display use (H1 only) at large sizes.

**Display / decorative fonts**
- Associations: personality, distinctiveness, creative energy, memorability
- Appropriate for: brands where personality is a competitive advantage (Jester, Creator, Rebel archetypes)
- Caution: High cognitive load. Use only for H1. Must pair with a clean, highly legible body font.

**Monospace fonts** (e.g., JetBrains Mono, Fira Code)
- Associations: technical precision, code, developer culture, authenticity in tech contexts
- Appropriate for: Developer tools, technical SaaS, data platforms, engineering brands
- Caution: Low readability for long-form content. Restrict to code samples and technical callouts.

### Processing fluency principle (Nahai)
Easier-to-read text is perceived as more truthful and the content as more achievable. This means: generous line height (1.5–1.7 for body), adequate font size (minimum 16px for body), sufficient contrast, and short line lengths (60–75 characters per line). Poor typography is not just an aesthetic problem — it reduces credibility and conversion.

### Maximum two typefaces rule
Every additional typeface beyond two increases cognitive load and weakens brand cohesion. This is a hard rule, not a preference. One heading typeface + one body typeface is the standard. A third accent typeface (used sparingly for pull quotes or specific components) may be justified when the archetype demands it (Creator, Jester), but requires explicit reasoning.

### Archetype-to-typeface guidance

| Archetype | Heading recommendation | Body recommendation |
|-----------|----------------------|---------------------|
| Ruler | Geometric serif or authoritative sans-serif | Clean sans-serif |
| Sage | Classic serif | Highly legible serif or humanist sans-serif |
| Hero | Bold condensed sans-serif | Clean sans-serif |
| Caregiver | Humanist sans-serif (warm, rounded) | Humanist sans-serif |
| Creator | Display or expressive serif | Humanist sans-serif |
| Explorer | Bold sans-serif with character | Clean sans-serif |
| Rebel | High-contrast or unconventional display | Legible sans-serif |
| Innocent | Soft rounded sans-serif | Rounded sans-serif or legible serif |
| Everyman | Plain humanist sans-serif | Plain humanist sans-serif |
| Jester | Playful display | Friendly rounded sans-serif |
| Magician | Elegant serif or distinctive display | Humanist sans-serif |
| Lover | Elegant serif or refined script (display only) | Refined sans-serif |

---

## 3. The 50ms First Impression: Rules for the Style Guide

Nahai cites research showing visitors form a stable aesthetic impression of a website in 50 milliseconds — before they read a single word. If the first impression is negative, the halo effect in reverse means users are primed to find fault with everything that follows.

### What drives the 50ms impression
1. **Visual complexity** — lower complexity is perceived as more beautiful in the first impression
2. **Visual prototypicality** — how closely the site matches what a "good website" looks like for its category
3. **Colour harmony** — harmonious palettes create immediate positive response

### Style guide implications

Translate these findings into concrete style guide requirements:

**Hero section rules (most important 50ms surface):**
- Maximum three visual elements in the hero: headline, subhead, CTA. No more.
- One dominant image — not a collage or grid.
- No competing focal points. The eye should know immediately where to go.
- Colour harmony must hold in the hero — primary background + one accent for the CTA.

**Visual prototypicality rule:**
- For first impressions, category-familiarity beats creativity. The style guide must ensure the site reads clearly as a [sector] website at a glance before it expresses individuality.
- Distinctiveness is expressed through typography choices and colour palettes, not through unusual navigation patterns or unconventional layouts.

**Complexity control rule:**
- Limit the number of visual styles (card types, background colours, border treatments) to a defined small set. Every new visual treatment adds cognitive load.
- The style guide must name all approved component treatments and prohibit invention of new ones without revision.

---

## 4. Keller's 6 Brand Element Criteria — Audit Checklist

From Keller, Strategic Brand Management (5th Edition), Chapter 4.

Apply this checklist when auditing the logo, brand name, colour, and slogan during style guide production. Each element should be evaluated against all six criteria. Document the result in the style guide review notes.

### The six criteria

**Build-oriented (offensive — these build equity):**

**1. Memorability**
Can the brand element be easily noticed and recalled in purchase or consumption situations?
- Logo audit question: Can a person who saw the logo once recall its basic shape and colour combination the next day?
- Name audit question: Is the brand name short enough and distinctive enough to be recalled unaided?
- Colour audit question: Is the brand colour distinctive enough in its category to create a trigger?

**2. Meaningfulness**
Does the brand element convey information about the product category, attributes, or benefits?
- Logo: Does the visual metaphor (if any) connect clearly to what the company does or stands for?
- Name: Does it suggest the category, benefit, or personality, even partially?
- Tagline: Does it communicate a meaningful promise or position?

**3. Likability**
Is the brand element aesthetically appealing, fun, or interesting? Can it create positive associations through likability alone, independent of any meaning?
- Logo: Would someone describe the logo as attractive or interesting without knowing the brand?
- Colour: Is the palette genuinely pleasing, not merely safe?
- Tagline: Is it memorable in a way that creates affinity (rhythm, surprise, wit)?

**Defensive criteria (protect equity):**

**4. Transferability**
How well does the brand element work across new products, geographies, and market segments?
- Logo: Does the logo remain legible and meaningful when translated to new categories or markets?
- Colour: Does the colour meaning travel across the client's target geographies without negative cultural associations?
- Name: Can the brand name be used in all three languages (English, French, Kiswahili) without negative meaning?

**5. Adaptability**
How flexible and updatable is the brand element over time?
- Logo: Could the logo be refreshed in five or ten years without a complete rebuild? (Clean, simple logos age better than complex ones.)
- Colour palette: Is the palette built on timeless associations or on a trend that may fade?
- Typography: Are the chosen typefaces available in perpetuity (ideally open source) so the client is not locked into a vendor?

**6. Protectability**
Can the brand element be protected legally and competitively?
- Logo: Is it distinctive enough to trademark? Has it been checked against existing registered marks?
- Name: Has the business name been registered or is trademark registration in progress?
- Colour: In premium sectors (fashion, luxury), is there a case for a colour trademark?

### Scoring guide
Evaluate each element (logo, name, colour palette, tagline) against all six criteria. Rate each: Strong / Adequate / Weak / At Risk. Any "At Risk" rating must be flagged for the client with a recommended action.

---

## 5. Photography Psychology — Authentic vs Staged

From Nahai's trust-building framework.

### Trust and photography

Photography is one of the fastest trust signals on a website. The brain reads visual authenticity faster than it reads text. Two rules govern this:

**Rule 1: Authentic photography outperforms staged photography for trust.**
Research on social proof and liking (Nahai, Cialdini) shows that people buy from brands they feel similar to. Real team photographs, real customer faces, and candid-style imagery trigger the "similarity heuristic" — visitors feel the brand is for people like them. Generic stock photography (the handshake photo, the smiling executive, the floating diverse team) triggers the opposite — it signals inauthenticity.

**Rule 2: Photography quality signals brand quality.**
Blurry, dark, or inconsistently lit photography communicates that the brand does not invest in its presentation. Professional photography is not a luxury item — it is a trust investment. For premium pricing contexts ($20k–$50k projects), the photography standard must match the price point.

### Authentic photography indicators
- People photographed in real environments related to the work
- Natural expressions rather than posed smiles
- Consistent colour grading throughout a set (even if individual photos were taken separately)
- Backgrounds that reflect the actual brand environment
- Clothing and styling consistent with the brand's visual identity

### Stock photography red flags (never approve these)
- Handshake photos
- People in suits pointing at whiteboards
- Generic team photos with artificial diversity
- Food photography that does not match actual product
- Photos clearly shot in a studio dressed to look like an office
- Photos with Asian or European settings used for African business contexts

### High-trust photography contexts
When a client operates in a high-trust-requirement sector (healthcare, legal, financial, education), authentic photography becomes a critical factor — not a nice-to-have. In these sectors, stock photography does more damage than no photography. Recommend professional photography shoot as part of the project if the client does not have an adequate photo library.

---

## 6. The 3 Cs Measurement Framework — Ongoing Brand Consistency Audits

From Leland, The Brand Mapping Strategy.

Use this framework as the quality gate before finalising the style guide, and recommend it to clients as a quarterly self-audit tool.

### The three criteria

**Consistency**
Is the brand being communicated consistently across all touchpoints?
- Visual check: Is the same logo, colour palette, and typography used on the website, social profiles, email signatures, business cards, and printed materials?
- Voice check: Does the brand sound the same in social captions, email newsletters, website copy, and in-person communications?
- Message check: Does the positioning statement appear in consistent language across all public surfaces?
- Audit action: Collect six to ten examples of current brand communications across different channels. Compare against the style guide. Document every deviation. Assign responsibility for correction.

**Constancy**
Is the brand showing up regularly and visibly?
- Frequency check: Is the brand active on the channels it has claimed? (A dormant social profile with the brand logo still signals the brand — poorly.)
- Visibility check: Are there gaps in brand presence that create inconsistent exposure?
- Audit action: Review the last 30 days of brand activity across all channels. Assess whether the cadence matches the brand's strategic intent.

**Congruency**
Do the external brand expressions match the internal brand reality?
- The Blow Dryer Effect (Leland): Named after the experience of checking into a hotel whose marketing promises luxury but the actual hairdryer is cheap and cracked. Any gap between the brand promise and the brand delivery destroys trust faster than good marketing can build it.
- Congruency check: Does the website's photography quality match the actual service quality? Does the "expert" positioning match the visible expertise of the team pages? Does the "warm and personal" voice match the actual responsiveness of the team?
- Audit action: Interview two to three team members and two to three clients. Ask: "What three words would you use to describe this brand?" Compare their answers to the brand personality words documented in the style guide. Close gaps.

### Recommended audit cadence
- At launch: Full 3 Cs review before the site goes live
- Quarterly: Quick consistency check (logo, colour, voice across active channels)
- Annually: Full 3 Cs audit including client and team interviews

### The Be-Do-Have reminder (Leland)
When congruency fails, the root cause is almost always that the brand was built in the wrong order: Have (desired results) → Do (actions) → Be (identity). This produces brands that claim to be what they are not yet. The fix is to align external expressions with current reality, then build toward the desired identity progressively. The style guide documents the destination — the client's job is to close the gap between current and documented.
