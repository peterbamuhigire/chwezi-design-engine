---
title: Nonprofit Component Patterns & Dark Mode Guide
sector: nonprofit
---

# Nonprofit Component Patterns with Dark Mode Support

All components feature full light mode + dark mode support using Tailwind CSS v4 `dark:` prefix.

## ✅ Core Components Included

### 1. **Donation Button** (Primary CTA)
```html
<!-- Light: Blue, Dark: Cyan -->
<button class="bg-blue-500 dark:bg-cyan-500 text-white dark:text-neutral-900 font-bold py-3 px-8 rounded-lg hover:shadow-lg transition">
  Donate Now
</button>
```

### 2. **Impact Stats Dashboard**
```html
<!-- Animated number counters with light/dark backgrounds -->
- People Helped: 12,345+ (Blue text in both modes)
- Communities Served: 28 (Magenta accent)
- Volunteers: 567+ (Gold highlight)
- Years Active: 15
```

### 3. **Story Carousel**
```html
<!-- Hero image + story card, responsive -->
- Auto-advances every 8 seconds
- Previous/Next navigation
- Dot indicators
- Light: White cards, Dark: Dark surface cards
```

### 4. **Multi-Step Donation Form**
```html
<!-- 3-step: Amount → Information → Payment -->
- Step 1: Amount selection, recurring options, matching gift
- Step 2: Donor information, newsletter opt-in, tax receipt
- Step 3: Payment card details, summary
- Progress bar with light/dark styling
```

### 5. **Trust Badges & Credentials**
```html
<!-- 501(c)(3) status, certifications, ratings -->
- Charity Navigator ⭐⭐⭐⭐
- Guidestar Platinum
- B Corp Certified
- Light: Gray background, Dark: Dark surface
```

### 6. **Volunteer/Get Involved CTA**
```html
<!-- Gradient button with icon, always stands out -->
- Background: Gradient Blue → Magenta
- Text: White
- Icon: Accent color
- Dark mode: Lighter gradient maintaining contrast
```

### 7. **Newsletter Signup**
```html
<!-- Email collection with warm copy -->
- Input: Light gray (light), dark surface (dark)
- Button: Gold (#FBBF24 light, #FCD34D dark)
- Helper text: Secondary gray (both modes)
- Light focus ring: Blue, Dark: Cyan
```

### 8. **Impact Story Section**
```html
<!-- Structured story card: name, role, quote, outcome -->
- Story image (left or top)
- Bold quotation
- Attribution (name, role, location)
- Star rating (5/5)
- "Read Full Story" CTA
- Border-left accent in magenta
```

### 9. **Project Grid**
```html
<!-- 3-4 per row (responsive) -->
- Project image / icon
- Title & description
- Funding bar (% toward goal)
- Donation CTA
- Light: White cards, Dark: Dark surface cards
```

### 10. **Testimonial Carousel**
```html
<!-- Rotating donor/beneficiary testimonials -->
- Quote + attribution
- Auto-advance 8 seconds
- Previous/Next buttons
- Light: White, Dark: Dark surface background
```

---

## Component-by-Component Dark Mode Implementation

### Donation Button
```html
<!-- Light Mode -->
<button class="bg-blue-500 hover:bg-blue-600 text-white">
  Donate Now
</button>

<!-- With Dark Mode -->
<button class="bg-blue-500 dark:bg-cyan-500
               hover:bg-blue-600 dark:hover:bg-cyan-600
               text-white dark:text-neutral-900
               transition">
  Donate Now
</button>
```

### Impact Stats
```html
<!-- Light Mode -->
<div class="bg-white text-center">
  <div class="text-5xl font-bold text-blue-600">12,345</div>
  <div class="text-gray-600 text-sm">People Helped</div>
</div>

<!-- With Dark Mode -->
<div class="bg-white dark:bg-neutral-800 text-center">
  <div class="text-5xl font-bold text-blue-600 dark:text-cyan-400">12,345</div>
  <div class="text-gray-600 dark:text-gray-400 text-sm">People Helped</div>
</div>
```

### Story Card
```html
<!-- Light Mode -->
<div class="bg-white border border-magenta-600/25 rounded-lg shadow p-8">
  <p class="text-gray-700 italic">"{quote}"</p>
  <p class="text-sm text-gray-500 mt-4">— Name, Role</p>
</div>

<!-- With Dark Mode -->
<div class="bg-white dark:bg-neutral-800
            border border-magenta-600/25 dark:border-magenta-400/30
            rounded-lg shadow-sm dark:shadow-lg p-8">
  <p class="text-gray-700 dark:text-gray-300 italic">"{quote}"</p>
  <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">— Name, Role</p>
</div>
```

### Form Inputs
```html
<!-- Light Mode -->
<input class="bg-white border border-gray-300 text-gray-900 px-4 py-3 rounded-lg focus:ring-2 focus:ring-blue-500" />

<!-- With Dark Mode -->
<input class="bg-white dark:bg-neutral-700
              border border-gray-300 dark:border-neutral-600
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
              focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500
              px-4 py-3 rounded-lg transition" />
```

### Newsletter Section
```html
<!-- Light Mode -->
<div class="bg-blue-50 px-8 py-12 rounded-xl">
  <h3 class="text-blue-900 font-bold text-2xl mb-4">Stay Updated</h3>
  <div class="flex gap-2">
    <input placeholder="Your email" class="flex-1 px-4 py-3 rounded-lg" />
    <button class="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-lg">Subscribe</button>
  </div>
</div>

<!-- With Dark Mode -->
<div class="bg-blue-50 dark:bg-neutral-800 px-8 py-12 rounded-xl">
  <h3 class="text-blue-900 dark:text-cyan-300 font-bold text-2xl mb-4">Stay Updated</h3>
  <div class="flex gap-2">
    <input class="flex-1 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white
                  border border-gray-300 dark:border-neutral-600 px-4 py-3 rounded-lg
                  focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500"
           placeholder="Your email" />
    <button class="bg-gold-500 dark:bg-gold-600 hover:bg-gold-600 dark:hover:bg-gold-500
                   text-white dark:text-neutral-900 px-6 py-3 rounded-lg transition">
      Subscribe
    </button>
  </div>
</div>
```

---

## Quick Copy-Paste Template

Use this as a base for all nonprofit components:

```html
<!-- Component Template with Dark Mode -->
<div class="bg-white dark:bg-neutral-800
            text-neutral-900 dark:text-neutral-100
            border border-gray-200 dark:border-neutral-700
            rounded-lg shadow-sm dark:shadow-lg
            p-6 hover:shadow-md dark:hover:shadow-xl
            transition">

  <h3 class="text-lg font-bold text-blue-600 dark:text-cyan-400 mb-3">
    Component Title
  </h3>

  <p class="text-gray-700 dark:text-gray-300 mb-4">
    Description text.
  </p>

  <button class="bg-blue-600 dark:bg-cyan-600
                 hover:bg-blue-700 dark:hover:bg-cyan-500
                 text-white px-4 py-2 rounded-lg
                 transition">
    Call to Action
  </button>
</div>
```

---

## Testing Dark Mode

### Browser DevTools
- **Chrome/Edge**: F12 → Three dots → More tools → Rendering → Emulate CSS media feature `prefers-color-scheme`
- **Firefox**: about:config → `ui.systemUsesDarkTheme = 1`
- **Safari**: Preferences → Advanced → Web Inspector

### System Settings
- **macOS**: System Preferences → General → Appearance → Dark
- **Windows 11**: Settings → Personalization → Colors → Dark
- **iOS**: Settings → Display & Brightness → Dark
- **Android**: Settings → Display → Dark theme

### Automated Testing
```bash
# Test with Cypress
cy.viewport('iphone-x')
cy.visit('https://yoursite.com')
cy.get('html').should('have.class', 'dark')
```

---

## Nonprofit-Specific Dark Mode Guidance

✅ **Impact Stats**: Always high-contrast in both modes (Blue light, Cyan dark)
✅ **Donation Buttons**: Gold in light mode → Lighter gold in dark mode
✅ **Story Images**: Add subtle gradient overlay in dark mode for text readability
✅ **Newsletter Section**: Light blue background (light) → Dark neutral (dark)
✅ **Forms**: Light backgrounds in light mode → Dark backgrounds in dark mode with visible borders
✅ **Links**: Blue in light → Cyan in dark, always underlined on hover
✅ **Accessibility**: All text passes 4.5:1 contrast (WCAG AA) in BOTH modes

---

## Reference Implementation Files

These components are implemented in detail in:
- **education/IMPLEMENTATION-GUIDE.md** - Accessible component patterns
- **DARK-MODE-IMPLEMENTATION.md** - Complete dark mode setup guide
- **branding-colors-template.md** - Color accessibility testing

---

**Estimated Component Count**: 15–20 reusable components
**Dark Mode Support**: 100% of components
**Accessibility Level**: WCAG 2.2 AA+ in both light and dark modes
**Framework**: Astro + Tailwind CSS v4 + Alpine.js
