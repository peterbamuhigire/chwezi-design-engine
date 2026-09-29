---
title: Tour & Travel Component Patterns
sector: tour-travel
---

# Tour & Travel: Component Patterns

HTML/Tailwind patterns optimized for tour & travel websites. Use these as reference when building custom components during the page-builder step.

## Destination Card (Hover Lift)

```html
<div class="group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-xl transition-shadow duration-200">
  <!-- Image Container -->
  <div class="relative h-56 overflow-hidden bg-gray-200">
    <img
      src="destination.jpg"
      alt="Serengeti Safari"
      class="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <!-- Badge -->
    <div class="absolute top-3 right-3 bg-yellow-500 text-charcoal px-3 py-1 rounded-full text-sm font-semibold">
      Featured
    </div>
  </div>

  <!-- Content -->
  <div class="p-6">
    <h3 class="font-serif text-xl font-semibold text-charcoal mb-2">
      Serengeti Wildlife Safari
    </h3>
    <p class="text-stone-gray text-sm mb-4">
      7 days of authentic wildlife tracking and game drives across East Africa's most pristine ecosystem.
    </p>

    <!-- Details -->
    <div class="flex items-center justify-between text-sm mb-4">
      <span class="flex items-center text-stone-gray">
        📅 14 days
      </span>
      <span class="flex items-center text-stone-gray">
        👥 Max 8 travelers
      </span>
    </div>

    <!-- CTA -->
    <a href="#" class="block w-full bg-forest-green text-white text-center py-2 rounded font-semibold hover:bg-opacity-90 transition">
      Learn More
    </a>
  </div>
</div>
```

## Itinerary Timeline

```html
<div class="space-y-6">
  <!-- Day Item -->
  <div class="flex gap-4">
    <!-- Timeline marker -->
    <div class="flex flex-col items-center">
      <div class="h-12 w-12 rounded-full bg-terracotta text-white flex items-center justify-center font-semibold">
        1
      </div>
      <div class="h-12 w-1 bg-terracotta mt-2 mb-2"></div>
    </div>

    <!-- Content -->
    <div class="pt-2 pb-6">
      <h4 class="font-serif text-lg font-semibold text-charcoal mb-2">
        Arrival in Arusha
      </h4>
      <p class="text-stone-gray text-sm leading-relaxed mb-3">
        Arrive at Kilimanjaro International Airport. Our guides will meet you and transfer to your lodge. Afternoon safari orientation and welcome dinner.
      </p>
      <!-- Optional: meals/activity icons -->
      <div class="flex gap-2 text-xs text-terracotta font-medium">
        <span>🍽️ Breakfast</span>
        <span>🍽️ Lunch</span>
        <span>🍽️ Dinner</span>
      </div>
    </div>
  </div>

  <!-- Repeat Day 2, 3, etc. -->
</div>
```

## Testimonial Card

```html
<div class="bg-cream rounded-lg p-8 border border-terracotta/25 shadow-sm">
  <!-- Stars -->
  <div class="flex gap-1 mb-3">
    ⭐⭐⭐⭐⭐
  </div>

  <!-- Quote -->
  <p class="font-serif text-charcoal text-lg italic mb-4">
    "The most authentic safari experience I've ever had. Our guides truly cared about conservation and sharing knowledge, not just hitting checkboxes."
  </p>

  <!-- Attribution -->
  <div class="flex items-center gap-3">
    <img src="avatar.jpg" alt="Sarah Chen" class="h-10 w-10 rounded-full object-cover" />
    <div>
      <p class="font-semibold text-charcoal text-sm">Sarah Chen</p>
      <p class="text-stone-gray text-xs">Serengeti Safari, June 2024</p>
    </div>
  </div>
</div>
```

## Booking CTA Section

```html
<section class="relative py-16 bg-gradient-to-r from-terracotta to-forest-green text-white">
  <!-- Decorative element -->
  <div class="absolute inset-0 opacity-10 bg-pattern"></div>

  <div class="relative max-w-2xl mx-auto text-center px-6">
    <h2 class="font-serif text-4xl font-bold mb-4">
      Ready for Your Adventure?
    </h2>
    <p class="text-lg mb-8 opacity-90">
      Check our available dates and customize your perfect journey.
    </p>

    <!-- Button Group -->
    <div class="flex flex-col sm:flex-row gap-3 justify-center">
      <button class="px-8 py-3 bg-white text-terracotta font-semibold rounded hover:shadow-lg transition">
        View Available Dates
      </button>
      <button class="px-8 py-3 bg-white bg-opacity-20 border border-white text-white font-semibold rounded hover:bg-opacity-30 transition">
        Request Custom Itinerary
      </button>
    </div>
  </div>
</section>
```

## Destination Gallery Grid

```html
<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  <!-- Gallery Item -->
  <div class="group relative overflow-hidden rounded-lg aspect-square cursor-pointer">
    <img
      src="destination-1.jpg"
      alt="Lake Victoria sunset"
      class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
      <div class="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <p class="font-semibold text-sm">Lake Victoria</p>
      </div>
    </div>
  </div>

  <!-- Repeat for each destination photo -->
</div>
```

## Hero Section (Adventure-Focused)

```html
<section class="relative h-screen bg-charcoal text-white overflow-hidden">
  <!-- Background video/image -->
  <div class="absolute inset-0">
    <img
      src="hero-bg.jpg"
      alt="Safari landscape"
      class="h-full w-full object-cover opacity-50"
    />
  </div>

  <!-- Overlay gradient -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20"></div>

  <!-- Content -->
  <div class="relative h-full flex items-center justify-center text-center px-6">
    <div class="max-w-2xl">
      <p class="text-yellow-500 font-semibold text-sm mb-2 tracking-widest">
        EXTRAORDINARY JOURNEYS
      </p>
      <h1 class="font-display text-6xl md:text-7xl font-bold mb-6 leading-tight">
        Discover Africa's Untamed Spirit
      </h1>
      <p class="text-xl text-gray-100 mb-8 leading-relaxed">
        Authentic safari experiences led by expert guides who bring the wild to life.
      </p>

      <!-- CTA -->
      <a href="#explore" class="inline-block px-8 py-4 bg-terracotta text-white font-semibold rounded hover:shadow-xl hover:translate-y-1 transition">
        Explore Tours →
      </a>
    </div>
  </div>
</section>
```

## Trust Section (Security/Credentials)

```html
<section class="bg-cream py-12 px-6">
  <div class="max-w-4xl mx-auto">
    <h2 class="font-serif text-3xl font-semibold text-charcoal text-center mb-10">
      Why Travelers Trust Us
    </h2>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Trust item -->
      <div class="text-center">
        <div class="inline-block h-16 w-16 bg-terracotta/20 rounded-full flex items-center justify-center mb-4">
          🏆
        </div>
        <h3 class="font-semibold text-charcoal mb-2">25+ Years Experience</h3>
        <p class="text-stone-gray text-sm">
          Trusted by 10,000+ travelers since 1999.
        </p>
      </div>

      <!-- Repeat for other trust signals -->
    </div>

    <!-- Badges -->
    <div class="flex justify-center gap-6 mt-12 flex-wrap">
      <img src="award-1.png" alt="Green Globe Award" class="h-16" />
      <img src="award-2.png" alt="Tourism Board Certified" class="h-16" />
      <img src="award-3.png" alt="Best Safari Operator 2024" class="h-16" />
    </div>
  </div>
</section>
```

## Mobile CTA Bar (Sticky)

```html
<!-- Sticky bottom on mobile only -->
<div class="fixed bottom-0 left-0 right-0 bg-forest-green text-white p-4 md:hidden shadow-xl">
  <div class="flex gap-3">
    <button class="flex-1 py-3 bg-white/20 rounded font-semibold hover:bg-white/30">
      📞 Call
    </button>
    <button class="flex-1 py-3 bg-terracotta rounded font-semibold hover:shadow-lg">
      Book Now →
    </button>
  </div>
</div>
```

---

**Usage Notes:**
- Replace color names with your actual hex values from `design-tokens.md`
- Adjust image aspect ratios based on photo catalog
- Test all animations on real mobile devices
- Use Alpine.js for interactive states (tabs, modals)
- Icons: Use Lucide SVG icons (self-hosted)

---

**Next step**: These patterns are reference only. The page-builder skill will generate your actual pages, using these as guidance for consistency and sector-appropriate UX.
