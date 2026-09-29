# Accessibility & Contrast Requirements

Web accessibility is not optional. Colors must meet WCAG (Web Content Accessibility Guidelines) standards to ensure all users can read and interact with your site, including those with:
- Low vision
- Color blindness (8% of males, 0.4% of females)
- Age-related vision loss
- Using high-contrast modes
- Viewing on low-quality screens

## WCAG Contrast Standards

### Standard Text (Normal size, 12-17pt)
**Requirement**: 4.5:1 contrast ratio minimum (AA standard)
**Enhanced**: 7:1 contrast ratio (AAA standard)

### Large Text (18pt or 14pt bold+)
**Requirement**: 3:1 contrast ratio minimum (AA standard)
**Enhanced**: 4.5:1 contrast ratio (AAA standard)

### UI Components (Buttons, Icons, Borders)
**Requirement**: 3:1 contrast ratio against adjacent colors
**Example**: Button border must be 3:1 against background

### Graphical Objects & Infographics
**Requirement**: 3:1 contrast for essential components
**Example**: Chart lines, infographic icons must be distinguishable

---

## Contrast Ratio Calculation

Contrast ratio formula (WCAG):
```
(L1 + 0.05) / (L2 + 0.05)
```

Where L = relative luminance:
- For sRGB colors: convert RGB to 0-1, apply gamma correction, then:
  - If value ≤ 0.03928: L = value/12.92
  - If value > 0.03928: L = ((value+0.055)/1.055)^2.4

**Practical simplified approach**: Use online contrast checkers (see tools below).

---

## Quick Reference: Common Ratios

| Text Color | Background | Ratio | WCAG AA | WCAG AAA |
|-----------|-----------|-------|---------|----------|
| Black (#000) | White (#fff) | 21:1 | ✅ | ✅ |
| Dark Gray (#333) | White (#fff) | 12.6:1 | ✅ | ✅ |
| Dark Gray (#666) | White (#fff) | 5.9:1 | ✅ | ✗ |
| Medium Gray (#999) | White (#fff) | 3.4:1 | ✓ large only | ✗ |
| Blue (#0066cc) | White (#fff) | 5.9:1 | ✅ | ✗ |
| Blue (#0066cc) | #f0f8ff light | 3.1:1 | ✓ large only | ✗ |
| Green (#008000) | White (#fff) | 6.26:1 | ✅ | ✗ |
| Green (#00cc00) | White (#fff) | 4.54:1 | ✅ | ✗ |
| Red (#cc0000) | White (#fff) | 5.3:1 | ✅ | ✗ |
| Red (#ff0000) | White (#fff) | 3.99:1 | ✓ large only | ✗ |

---

## Making Colors Accessible

### Method 1: Darken the Text Color

Reduce lightness of text color until contrast meets requirements:

```
Original: hsl(240, 80%, 40%)    // Ratio: 3.2:1 (fails normal text)
Adjusted: hsl(240, 80%, 25%)    // Ratio: 4.5:1 (passes normal text)
Further:  hsl(240, 80%, 15%)    // Ratio: 7:1 (passes AAA)
```

### Method 2: Lighten the Background

Increase lightness of background until contrast meets requirements:

```
Original: hsl(240, 80%, 80%)    // Ratio: 3.2:1 (fails)
Adjusted: hsl(240, 80%, 90%)    // Ratio: 4.8:1 (passes normal text)
Further:  hsl(240, 80%, 95%)    // Ratio: 6.2:1 (passes AAA)
```

### Method 3: Increase Saturation

Higher saturation can improve perceived contrast:

```
Original: hsl(240, 50%, 60%)    // Lower saturation, less contrast
Adjusted: hsl(240, 80%, 60%)    // Higher saturation, more apparent contrast
```

### Method 4: Use Neutral Text Instead

Replace colored text with neutral gray; keep color as accent only:

```
❌ FAIL: Blue text (#0066cc) on light blue background (#e6f2ff) — 2.1:1
✅ PASS: Dark gray text (#333) on light blue background (#e6f2ff) — 14:1

Use blue color for: Buttons, borders, emphasis, not text
```

---

## Testing for Color Blindness

~8% of males have color vision deficiency (CVD). Three main types:

### Red-Green Blindness (Protanopia, most common)
- Cannot distinguish red from green
- Test: Don't combine red + green without text labels or patterns
- Solution: Add texture, pattern, or text in addition to color

### Green Blindness (Deuteranopia)
- Similar to red-green but shifted
- Solution: Avoid red-green distinction as only indicator

### Blue-Yellow Blindness (Tritanopia, rare)
- Cannot distinguish blue from yellow
- Solution: Ensure blue-yellow combinations use strong contrast or text labels

### Testing Tools:
- [Coblis Color Blindness Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
- [Color Blindness Simulator by Vischeck](https://www.vischeck.com/)
- Upload screenshot and preview how colorblind users see your site

### Design Rule:
**Never rely on color alone to convey meaning.** Always use:
- Text labels ("Error", "Success", "Warning")
- Icons or symbols
- Patterns or textures
- Borders or outlines

---

## Color Combination Chart: Accessible Pairs

This chart shows which colors work as text + background pairs for 4.5:1 minimum (normal text):

### Safe Combinations for Normal Text (4.5:1+)

**Dark text on light background**:
- Black on white ✅ (21:1)
- Dark gray (#333) on white ✅ (12.6:1)
- Dark blue (#003366) on white ✅ (8.5:1)
- Dark green (#003300) on white ✅ (7.2:1)
- Dark purple (#330033) on white ✅ (6.8:1)
- Dark red (#330000) on white ✅ (5.2:1)

**Dark text on colored backgrounds**:
- Black on yellow ✅ (19.56:1)
- Black on cyan ✅ (10.35:1)
- Dark blue (#003366) on yellow ✅ (11.74:1)
- Dark green (#003300) on yellow ✅ (9.5:1)
- Dark gray (#333) on cyan ✅ (7.5:1)

**Light text on dark background**:
- White on black ✅ (21:1)
- White on dark blue (#000033) ✅ (12:1)
- White on dark green (#003300) ✅ (7.5:1)
- White on dark red (#330000) ✅ (5.8:1)
- Light gray (#ccc) on black ✅ (7:1)

**Light text on colored backgrounds** (dark colors):
- White on dark blue ✅ (8:1+)
- White on navy (#001a4d) ✅ (10:1)
- Light gray on dark blue ✅ (6:1+)

### Combinations to Avoid (Color blindness failures)

**Never rely solely on color distinction**:
- ❌ Red text on white background to indicate errors (red-green colorblind users can't distinguish)
- ❌ Green checkmark to indicate success without text
- ❌ Red/green pie chart without labels
- ❌ Blue text on purple background (hard to distinguish)
- ❌ Medium gray text on light gray background (low contrast)

---

## Testing Your Color Palette

### Step 1: Automated Contrast Check
Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/):
1. Enter foreground color (hex or RGB)
2. Enter background color
3. Verify 4.5:1 ratio for normal text
4. Verify 3:1 ratio for large text/UI

### Step 2: Colorblindness Simulation
1. Take screenshot of site with colors applied
2. Upload to [Coblis simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/)
3. View all three types of colorblindness
4. Verify information is still understandable

### Step 3: Real Device Testing
1. **Different monitors**: Colors appear different on different displays
2. **Mobile devices**: Brightness, screen type affects perception
3. **Dark mode**: Test how colors look in dark mode
4. **High contrast mode**: Windows High Contrast mode reverses some colors

### Step 4: User Testing
- Ask users with color blindness to review
- Test with screen reader users (colors less important, but affects button/link identification)
- Ask older adults to verify legibility

---

## Dark Mode Considerations

Colors need different contrast strategies for dark mode:

### Light Text on Dark Background (Dark Mode)
```
Foreground: White or very light gray
Background: Dark gray or black

Example:
Text:       hsl(0, 0%, 95%)     // Near-white
Background: hsl(0, 0%, 15%)     // Very dark gray
Ratio:      12:1 (exceeds AAA requirement)
```

### Applying Brand Colors in Dark Mode

Original light mode:
```
Text color:       hsl(240, 100%, 35%)   // Dark blue
Background:       hsl(0, 0%, 100%)      // White
Contrast:         8:1 ✅
```

Dark mode equivalent:
```
Text color:       hsl(240, 100%, 85%)   // Light blue
Background:       hsl(0, 0%, 10%)       // Near-black
Contrast:         9:1 ✅
```

**Strategy**: Invert the lightness percentage for dark mode:
- Light mode: hsl(H, S, L%)
- Dark mode: hsl(H, S, 100-L%)

---

## Common Accessibility Mistakes

❌ **Low contrast gray text** ("looks elegant") — fails accessibility
❌ **Light gray placeholder text** on white input — invisible to users
❌ **Color-only form errors** (red border, no text) — colorblind users miss errors
❌ **Disabled buttons that are only gray** — indistinguishable from enabled
❌ **Blue underlinks on purple text** — fails for colorblind users and blue-purple distinguishment
❌ **No focus indicators** on buttons — keyboard users can't see where they are
❌ **White text on light colored background** — fails basic contrast

---

## Accessible Component Examples

### Buttons
```css
/* Good: High contrast, clear focus indicator */
button {
  background-color: hsl(240, 100%, 45%);  /* Dark blue */
  color: white;                            /* White text */
  border: 2px solid transparent;
  /* 9.5:1 contrast ✅ */
}

button:focus-visible {
  outline: 3px solid hsl(60, 100%, 50%);   /* Yellow outline on focus */
}
```

### Form Inputs
```css
input {
  border: 2px solid hsl(0, 0%, 60%);      /* Medium gray border */
  background: white;
  color: hsl(0, 0%, 20%);                 /* Dark gray text */
  /* 8.5:1 text contrast ✅ */
}

input:invalid {
  border-color: hsl(0, 70%, 40%);         /* Dark red */
  background: hsl(0, 70%, 96%);           /* Very light red background */
}

input:invalid::after {
  content: "Error: ";                     /* Text label + color */
  color: hsl(0, 70%, 40%);
}
```

### Alerts
```css
.alert-success {
  background: hsl(120, 70%, 92%);         /* Very light green tint */
  border: 1px solid hsl(120, 70%, 35%);   /* 1px full border, not a side stripe */
  color: hsl(0, 0%, 20%);                 /* Dark grey text */
}

.alert-success::before {
  content: "✓ Success: ";                 /* Icon + text label */
  color: hsl(120, 70%, 30%);              /* Dark green */
}
```

The tint, icon and text label carry the status; a thick coloured `border-left` stripe is a
decorative slop tell under the 29 Sep 2026 side-stripe ruling (Option A).

---

## WCAG Guidelines Summary

| Element | AA Minimum | AAA Minimum |
|---------|-----------|------------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18pt+) | 3:1 | 4.5:1 |
| UI components | 3:1 | 4.5:1 |
| Graphics/infographics | 3:1 | 4.5:1 |

---

**Key Takeaway**: Accessibility isn't a luxury feature — it's a baseline requirement. Test all color combinations before launch. Use online tools to verify, and always include text labels or patterns in addition to color distinction.
