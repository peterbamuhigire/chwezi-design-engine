# Practical Application: Using Color Palettes in Web Design

Taking a color palette from theory to real website implementation requires understanding how colors function in specific UI contexts.

## UI Component Color Assignment

### Primary Brand Color (60% rule)
Used for:
- Large background areas
- Hero sections
- Primary surfaces
- Main navigation
- Brand identity elements

```css
:root {
  --color-primary: #3B82F6;  /* Brand blue */
}

.hero {
  background-color: var(--color-primary);  /* 60% dominance */
}

.nav {
  background-color: var(--color-primary);
}

.section-header {
  color: var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
}
```

### Secondary Color (30% rule)
Used for:
- Supporting elements
- Section backgrounds
- Borders and dividers
- Secondary buttons
- Lighter sections balancing primary

```css
:root {
  --color-secondary: #F3F4F6;  /* Light gray */
}

.card {
  background-color: var(--color-secondary);  /* Balanced secondary */
  border: 1px solid var(--color-secondary);
}

.section-alternate {
  background-color: var(--color-secondary);  /* Alternating rhythm */
}

.button-secondary {
  background-color: var(--color-secondary);
  color: var(--color-text);  /* Dark text for contrast */
  border: 2px solid var(--color-primary);
}
```

### Accent Color (10% rule)
Used for:
- Call-to-action buttons
- Important alerts
- Links and hover states
- Interactive highlights
- Critical UI elements

```css
:root {
  --color-accent: #DC2626;  /* Bold red */
}

.button-primary {
  background-color: var(--color-accent);
  color: white;  /* Must have 4.5:1 contrast */
}

.link {
  color: var(--color-accent);
}

.link:hover {
  color: darken(var(--color-accent), 10%);
  text-decoration: underline;
}

.badge-featured {
  background-color: var(--color-accent);
  color: white;
}
```

---

## Semantic Color Usage

Beyond 60-30-10, use colors semantically for user feedback:

```css
:root {
  /* Brand colors */
  --color-primary: #3B82F6;
  --color-secondary: #F3F4F6;
  --color-accent: #DC2626;

  /* Semantic feedback colors */
  --color-success: #10B981;     /* Green - positive feedback */
  --color-warning: #F59E0B;     /* Amber - caution */
  --color-error: #EF4444;        /* Red - destructive/error */
  --color-info: #3B82F6;         /* Blue - informational */

  /* Neutral colors */
  --color-text-primary: #1F2937;   /* Dark gray - main text */
  --color-text-secondary: #6B7280; /* Medium gray - secondary text */
  --color-border: #E5E7EB;         /* Light gray - borders */
  --color-background: #FFFFFF;     /* White - primary background */
}

/* Success state */
.form-success {
  border: 2px solid var(--color-success);
  background: linear-gradient(
    to right,
    rgba(16, 185, 129, 0.1) 0%,
    transparent 100%
  );
  color: var(--color-text-primary);
}

.form-success::before {
  content: "✓ ";
  color: var(--color-success);
  font-weight: bold;
}

/* Error state */
.form-error {
  border: 2px solid var(--color-error);
  background: linear-gradient(
    to right,
    rgba(239, 68, 68, 0.1) 0%,
    transparent 100%
  );
  color: var(--color-text-primary);
}

/* Warning state: tint + 1px full border + icon + text label */
.alert-warning {
  background-color: color-mix(in oklch, var(--color-warning) 14%, white);
  border: 1px solid color-mix(in oklch, var(--color-warning) 55%, black);
  color: var(--color-text-primary);
}
.alert-warning::before {
  content: "⚠ Warning: ";  /* icon + text label, so colour is never the only signal */
  font-weight: 600;
}

/* Info state: tint + icon + text label */
.notification {
  background-color: color-mix(in oklch, var(--color-info) 12%, white);
  border: 1px solid color-mix(in oklch, var(--color-info) 40%, white);
  color: var(--color-text-primary);
}
.notification::before {
  content: "ℹ Note: ";
  font-weight: 600;
}
```

Status callouts use a background tint, a 1px full border, an icon and a text label. A coloured
`border-left` stripe wider than 1px on cards, callouts, alerts or list items is a decorative
slop tell (side-stripe ruling, Option A, 29 Sep 2026; detector rule `decorative-side-stripe`).
Stripes are kept only as a genuine status encoding paired with a text marker, with the reason
recorded.

---

## Responsive Color Adjustment

### Light Mode (Default)
```css
:root {
  --color-primary: #3B82F6;           /* Bright blue */
  --color-primary-dark: #1E40AF;      /* Darker for hover/active */
  --color-primary-light: #DBEAFE;     /* Lighter for backgrounds */

  --color-text: #1F2937;              /* Dark text on light */
  --color-background: #FFFFFF;        /* White background */
  --color-border: #E5E7EB;            /* Light border */
}

button {
  background-color: var(--color-primary);
  color: white;
  transition: background-color 0.2s;
}

button:hover {
  background-color: var(--color-primary-dark);
}
```

### Dark Mode
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-primary: #60A5FA;         /* Lighter blue for dark bg */
    --color-primary-dark: #3B82F6;    /* Less dark for dark mode */
    --color-primary-light: #1E3A8A;   /* Darker for dark bg "light" */

    --color-text: #F3F4F6;            /* Light text on dark */
    --color-background: #111827;      /* Very dark background */
    --color-border: #374151;          /* Dark border */
  }

  /* Automatically applies to all components using CSS variables */
}
```

**Principle**: Adjust lightness values for dark mode; same hue, opposite lightness:
- Light mode: hsl(240, 100%, 50%)
- Dark mode: hsl(240, 100%, 65%)  ← Lightened by ~15%

---

## Real-World Component Examples

### Navigation Bar
```html
<nav class="navbar">
  <div class="navbar-brand">Logo</div>
  <ul class="navbar-menu">
    <li><a href="/" class="navbar-link">Home</a></li>
    <li><a href="/about" class="navbar-link">About</a></li>
    <li><a href="/contact" class="navbar-link navbar-link-cta">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  background-color: var(--color-primary);  /* 60% rule */
  padding: 1rem;
}

.navbar-brand {
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
}

.navbar-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
}

.navbar-link:hover {
  color: white;
}

.navbar-link-cta {
  background-color: var(--color-accent);  /* 10% rule */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}
```

### Hero Section
```html
<section class="hero">
  <h1>Welcome to Our Site</h1>
  <p>This is a hero section with primary color background</p>
  <button class="button-primary">Get Started</button>
</section>
```

```css
.hero {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    lighten(var(--color-primary), 10%) 100%
  );
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;  /* Slightly transparent for depth */
}

.button-primary {
  background-color: var(--color-accent);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.button-primary:hover {
  background-color: darken(var(--color-accent), 10%);
}
```

### Card Components
```html
<div class="card">
  <div class="card-header">
    <h3>Feature Title</h3>
  </div>
  <div class="card-body">
    <p>Card description and content here.</p>
  </div>
  <div class="card-footer">
    <button class="button-secondary">Learn More</button>
  </div>
</div>
```

```css
.card {
  background-color: white;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  background-color: var(--color-primary-light);  /* 30% rule */
  color: var(--color-text-primary);
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
}

.card-body {
  padding: 1.5rem;
  color: var(--color-text-secondary);
}

.card-footer {
  padding: 1rem 1.5rem;
  background-color: var(--color-secondary);
  border-top: 1px solid var(--color-border);
}
```

### Form Inputs
```html
<form class="form">
  <div class="form-group">
    <label for="name">Full Name</label>
    <input
      type="text"
      id="name"
      class="form-input"
      placeholder="Enter your name"
    />
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="email"
      class="form-input form-input-error"
      placeholder="Enter your email"
      value="invalid-email"
    />
    <span class="form-error-message">Please enter a valid email address</span>
  </div>

  <button class="button-primary">Submit</button>
</form>
```

```css
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--color-border);
  border-radius: 0.25rem;
  font-size: 1rem;
  transition: border-color 0.2s;
  color: var(--color-text-primary);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input-error {
  border-color: var(--color-error);
}

.form-input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-error-message {
  display: block;
  color: var(--color-error);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

---

## Gradients Using Brand Colors

Gradients add depth using your color palette:

```css
/* Primary gradient */
.gradient-primary {
  background: linear-gradient(
    135deg,
    var(--color-primary) 0%,
    darken(var(--color-primary), 15%) 100%
  );
}

/* Accent gradient */
.gradient-accent {
  background: linear-gradient(
    to right,
    var(--color-primary) 0%,
    var(--color-accent) 100%
  );
}

/* Subtle gradient (for backgrounds) */
.gradient-subtle {
  background: linear-gradient(
    to bottom,
    var(--color-background) 0%,
    var(--color-secondary) 100%
  );
}

/* Hover gradient effect */
.gradient-hover {
  background: linear-gradient(
    90deg,
    var(--color-primary) 0%,
    var(--color-accent) 100%
  );
  background-size: 200% 200%;
  transition: background-position 0.3s;
}

.gradient-hover:hover {
  background-position: 100% 100%;
}
```

---

## Animation with Colors

Colors can enhance micro-interactions:

```css
/* Fade between colors on hover */
.color-transition {
  background-color: var(--color-secondary);
  transition: background-color 0.3s ease-in-out;
}

.color-transition:hover {
  background-color: var(--color-primary-light);
}

/* Loading animation with brand color */
@keyframes loading {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.loading {
  background: linear-gradient(
    to right,
    var(--color-secondary) 0%,
    var(--color-primary-light) 50%,
    var(--color-secondary) 100%
  );
  background-size: 1000px 100%;
  animation: loading 2s infinite;
}

/* Success pulse animation */
@keyframes pulse-success {
  0% {
    box-shadow: 0 0 0 0 var(--color-success);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

.success-pulse {
  animation: pulse-success 2s infinite;
}
```

---

## Accessibility Considerations in Implementation

### High Contrast Mode
Windows High Contrast Mode overrides some colors:

```css
/* Fallback for high-contrast mode */
@media (prefers-contrast: more) {
  .button-primary {
    border: 2px solid;  /* Adds outline for contrast */
    box-shadow: 0 0 0 2px var(--color-background);
  }

  .card {
    border-width: 2px;  /* Thicker borders */
  }
}
```

### Reduced Motion
Respect user preferences for animations:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

**Key Takeaway**: Well-designed color palettes translate smoothly to components through semantic CSS variables and the 60-30-10 rule. Test across light/dark modes and different screen sizes to ensure consistency.
