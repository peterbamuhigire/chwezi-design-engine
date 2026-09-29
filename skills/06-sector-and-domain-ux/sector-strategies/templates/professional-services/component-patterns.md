---
title: Professional Services Component Patterns
sector: professional-services
---

# Professional Services: Component Patterns

HTML/Tailwind patterns for professional service websites.

## Service Card
```html
<div class="p-8 border border-accent/25 rounded">
  <h3 class="font-serif text-2xl font-bold text-charcoal mb-3">Service Name</h3>
  <p class="text-gray-600 leading-relaxed">
    Clear description of service, outcomes, and ideal client fit.
  </p>
</div>
```

## Team Profile
```html
<div class="text-center">
  <img src="team.jpg" alt="Jane Smith" class="h-48 w-48 rounded mx-auto mb-4 object-cover" />
  <h3 class="font-bold text-lg">Jane Smith</h3>
  <p class="text-accent font-semibold text-sm">Senior Strategy Consultant</p>
  <p class="text-gray-600 text-sm mt-2">15+ years in digital transformation</p>
  <p class="text-gray-500 text-xs mt-1">MBA Stanford • PMP Certified</p>
</div>
```

## Case Study Card
```html
<div class="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition">
  <h4 class="font-bold text-lg mb-2">Project: Retail Transformation</h4>
  <p class="text-gray-600 text-sm mb-4">E-commerce platform migration for mid-market retailer.</p>
  <div class="text-accent font-bold mb-4">Result: 40% increase in online revenue</div>
  <button class="text-accent font-semibold text-sm">Read Case Study →</button>
</div>
```

## Testimonial
```html
<div class="border border-gold/40 bg-cream p-6 rounded">
  <p class="font-serif text-lg italic text-charcoal mb-4">
    "They brought strategic clarity and execution excellence. Results exceeded expectations."
  </p>
  <p class="font-bold text-charcoal">Jane Doe, Chief Marketing Officer</p>
  <p class="text-gray-600 text-sm">Global Tech Company</p>
</div>
```

---

See **tour-travel/component-patterns.md** for complete examples with full Tailwind implementation and responsive design patterns.
