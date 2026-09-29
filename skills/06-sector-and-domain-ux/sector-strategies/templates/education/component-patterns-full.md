---
title: Education Component Patterns with Reference Site Inspiration
sector: education
---

# Education: Component Patterns

HTML/Tailwind patterns inspired by top university websites. Implemented with Astro + Tailwind CSS v4 + Alpine.js.

## Premium CTA Buttons (Alverno, Virginia Commonwealth, Oberlin)

```html
<!-- Primary CTA: Apply / Enroll -->
<button class="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
  Apply Now
</button>

<!-- Secondary CTA: Tour / Visit -->
<button class="px-8 py-3 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold rounded-lg transition">
  Schedule a Tour
</button>

<!-- Tertiary CTA: Info -->
<button class="px-8 py-3 bg-secondary-100 hover:bg-secondary-200 text-secondary-900 font-semibold rounded-lg transition">
  Request Information
</button>

<!-- Donation CTA: Gold/Accent -->
<button class="px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg shadow-md transition">
  Support Our Mission
</button>
```

## Full-Screen Video Hero (Dakota Wesleyan, Howard University)

```html
<section class="relative h-screen bg-black overflow-hidden">
  <!-- Video Background -->
  <video
    autoplay
    muted
    loop
    playsinline
    class="absolute inset-0 w-full h-full object-cover"
    poster="/images/hero-poster.jpg"
  >
    <source src="/videos/campus-life.mp4" type="video/mp4" />
  </video>

  <!-- Dark Overlay (optional) -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>

  <!-- Content Overlay -->
  <div class="relative h-full flex items-center justify-center text-center text-white px-4">
    <div class="max-w-3xl">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight">
        Discover Your Future
      </h1>
      <p class="text-xl md:text-2xl text-gray-100 mb-8 leading-relaxed">
        Join thousands of students transforming lives through education
      </p>

      <!-- CTA Group -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-lg transition transform hover:scale-105">
          Apply Now
        </button>
        <button class="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-lg border border-white backdrop-blur-sm transition">
          Virtual Tour
        </button>
      </div>
    </div>
  </div>

  <!-- Scroll Indicator (static: a bouncing arrow is the bounce tell, see doctrine/references/ai-slop-taxonomy.md) -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
    <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  </div>
</section>
```

## Trust Stats Banner (Alverno, Princeton)

```html
<section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      <div class="transform hover:scale-110 transition">
        <p class="text-4xl md:text-5xl font-bold leading-tight">100%</p>
        <p class="text-sm md:text-base mt-2 text-gray-100">Internship Placement</p>
      </div>
      <div class="transform hover:scale-110 transition">
        <p class="text-4xl md:text-5xl font-bold leading-tight">95%</p>
        <p class="text-sm md:text-base mt-2 text-gray-100">Student Satisfaction</p>
      </div>
      <div class="transform hover:scale-110 transition">
        <p class="text-4xl md:text-5xl font-bold leading-tight">50+</p>
        <p class="text-sm md:text-base mt-2 text-gray-100">Academic Programs</p>
      </div>
      <div class="transform hover:scale-110 transition">
        <p class="text-4xl md:text-5xl font-bold leading-tight">2K+</p>
        <p class="text-sm md:text-base mt-2 text-gray-100">Alumni Network</p>
      </div>
    </div>
  </div>
</section>
```

## Student Testimonial Card (Wheaton College, Juniata)

```html
<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 border border-primary-600/20">
  <!-- Star Rating -->
  <div class="flex gap-1 mb-4">
    <span class="text-yellow-400 text-lg">★★★★★</span>
  </div>

  <!-- Quote -->
  <p class="font-serif text-lg italic text-secondary-700 mb-4 leading-relaxed">
    "The faculty genuinely cares about student success. I went from unsure about my major to landing my dream internship before graduation."
  </p>

  <!-- Attribution -->
  <div class="flex items-center gap-3 pt-4 border-t border-secondary-200">
    <img
      src="/images/testimonials/student-1.jpg"
      alt="Maria Santos"
      class="h-12 w-12 rounded-full object-cover"
    />
    <div>
      <p class="font-semibold text-secondary-900">Maria Santos</p>
      <p class="text-sm text-secondary-500">Class of 2024 • Business & Marketing</p>
    </div>
  </div>
</div>
```

## Program/Course Card (Muhlenberg, RISD)

```html
<div class="group bg-white rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all">
  <!-- Image -->
  <div class="h-48 bg-gradient-to-br from-primary-400 to-secondary-400 overflow-hidden">
    <img
      src="/images/programs/engineering.jpg"
      alt="Engineering Program"
      class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
    />
  </div>

  <!-- Content -->
  <div class="p-6">
    <!-- Badge -->
    <span class="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full mb-3">
      STEM
    </span>

    <!-- Title -->
    <h3 class="text-xl font-semibold text-secondary-900 mb-2">
      Bachelor of Science in Engineering
    </h3>

    <!-- Description -->
    <p class="text-secondary-600 text-sm mb-4 line-clamp-3">
      Develop practical skills in mechanical, electrical, and civil engineering with hands-on laboratory experience.
    </p>

    <!-- Meta Info -->
    <div class="flex justify-between items-center text-sm mb-4 pb-4 border-b border-secondary-200">
      <span class="text-secondary-500">4 Years</span>
      <span class="text-secondary-500">120 Credits</span>
    </div>

    <!-- CTA -->
    <a href="/programs/engineering" class="flex items-center justify-center w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition">
      Learn More →
    </a>
  </div>
</div>
```

## Faculty Profile Card (Georgetown, MIT)

```html
<div class="text-center group">
  <!-- Photo -->
  <div class="relative mb-4 overflow-hidden rounded-lg">
    <img
      src="/images/faculty/prof-johnson.jpg"
      alt="Dr. James Johnson"
      class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
    />
    <!-- Social Links (hover) -->
    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-4">
      <a href="#" class="text-white hover:text-primary-300">
        <i class="fab fa-linkedin-in"></i>
      </a>
      <a href="mailto:j.johnson@school.edu" class="text-white hover:text-primary-300">
        <i class="fas fa-envelope"></i>
      </a>
    </div>
  </div>

  <!-- Name & Title -->
  <h3 class="font-semibold text-lg text-secondary-900">Dr. James Johnson</h3>
  <p class="text-primary-600 font-medium mb-2">Professor of Physics</p>

  <!-- Credentials -->
  <p class="text-sm text-secondary-600 mb-3">
    PhD Physics, MIT • 15+ Years Research
  </p>

  <!-- Bio -->
  <p class="text-sm text-secondary-600 mb-4 leading-relaxed">
    Specializes in quantum mechanics and experimental physics. Advisor to 40+ graduate students.
  </p>

  <!-- Office Hours Link -->
  <a href="#" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
    Schedule Office Hours →
  </a>
</div>
```

## Audience Segmentation Tabs (Georgetown, University of Chicago)

```html
<div x-data="{ activeTab: 'prospective' }" class="mb-12">
  <!-- Tab Buttons -->
  <div class="flex flex-wrap border-b-2 border-secondary-200">
    <button
      @click="activeTab = 'prospective'"
      class="px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap"
      :class="activeTab === 'prospective'
        ? 'border-primary-600 text-primary-600'
        : 'border-transparent text-secondary-600 hover:text-primary-600'"
    >
      Prospective Students
    </button>
    <button
      @click="activeTab = 'current'"
      class="px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap"
      :class="activeTab === 'current'
        ? 'border-primary-600 text-primary-600'
        : 'border-transparent text-secondary-600 hover:text-primary-600'"
    >
      Current Students
    </button>
    <button
      @click="activeTab = 'parents'"
      class="px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap"
      :class="activeTab === 'parents'
        ? 'border-primary-600 text-primary-600'
        : 'border-transparent text-secondary-600 hover:text-primary-600'"
    >
      Parents & Families
    </button>
    <button
      @click="activeTab = 'alumni'"
      class="px-6 py-3 font-semibold border-b-2 transition whitespace-nowrap"
      :class="activeTab === 'alumni'
        ? 'border-primary-600 text-primary-600'
        : 'border-transparent text-secondary-600 hover:text-primary-600'"
    >
      Alumni
    </button>
  </div>

  <!-- Tab Content -->
  <div class="mt-8">
    <!-- Prospective Students -->
    <div x-show="activeTab === 'prospective'" x-transition class="space-y-6">
      <div>
        <h3 class="text-2xl font-bold text-secondary-900 mb-4">Start Your Journey</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <a href="/admissions" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Explore Programs</p>
            <p class="text-sm text-secondary-600">Learn about 50+ academic programs</p>
          </a>
          <a href="/campus-tour" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Virtual Campus Tour</p>
            <p class="text-sm text-secondary-600">Explore campus from your home</p>
          </a>
          <a href="/events" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Upcoming Events</p>
            <p class="text-sm text-secondary-600">Open houses & info sessions</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Current Students -->
    <div x-show="activeTab === 'current'" x-transition class="space-y-6">
      <div>
        <h3 class="text-2xl font-bold text-secondary-900 mb-4">Student Resources</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <a href="/student-portal" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Student Portal</p>
            <p class="text-sm text-secondary-600">Grades, registration, billing</p>
          </a>
          <a href="/library" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Library</p>
            <p class="text-sm text-secondary-600">Research databases & tutoring</p>
          </a>
          <a href="/student-life" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Campus Life</p>
            <p class="text-sm text-secondary-600">Clubs, events, housing</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Parents & Families -->
    <div x-show="activeTab === 'parents'" x-transition class="space-y-6">
      <div>
        <h3 class="text-2xl font-bold text-secondary-900 mb-4">Parent Resources</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <a href="/parent-portal" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Parent Portal</p>
            <p class="text-sm text-secondary-600">Access student progress & info</p>
          </a>
          <a href="/admissions/costs" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Financial Aid</p>
            <p class="text-sm text-secondary-600">Tuition, aid packages, FAFSA</p>
          </a>
          <a href="/contact" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Contact Us</p>
            <p class="text-sm text-secondary-600">Questions? We're here to help</p>
          </a>
        </div>
      </div>
    </div>

    <!-- Alumni -->
    <div x-show="activeTab === 'alumni'" x-transition class="space-y-6">
      <div>
        <h3 class="text-2xl font-bold text-secondary-900 mb-4">Alumni Community</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <a href="/alumni" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Alumni Portal</p>
            <p class="text-sm text-secondary-600">Connect with classmates</p>
          </a>
          <a href="/alumni-events" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Events & Reunions</p>
            <p class="text-sm text-secondary-600">Stay connected to campus</p>
          </a>
          <a href="/support" class="group block p-4 border-2 border-secondary-200 hover:border-primary-600 rounded-lg transition">
            <p class="font-semibold text-secondary-900 mb-2 group-hover:text-primary-600">Support the Mission</p>
            <p class="text-sm text-secondary-600">Make a philanthropic impact</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Interactive Campus Map (George Washington University)

```html
<div class="bg-secondary-50 py-12">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8 text-center">Explore Our Campus</h2>

    <div class="grid md:grid-cols-3 gap-8">
      <!-- Map (Left/Main) -->
      <div class="md:col-span-2 border-2 border-secondary-300 rounded-lg overflow-hidden bg-white">
        <img
          src="/images/campus-map.svg"
          alt="Interactive campus map"
          class="w-full h-auto"
          usemap="#campus-map"
        />
        <map name="campus-map">
          <area shape="circle" coords="100,100,30" href="/about/library" alt="Main Library" title="Main Library" />
          <area shape="circle" coords="200,150,30" href="/about/quad" alt="Central Quad" title="Central Quad" />
          <area shape="circle" coords="300,200,30" href="/about/sports" alt="Sports Complex" title="Sports Complex" />
        </map>
      </div>

      <!-- Legend & Info (Right) -->
      <div class="space-y-4">
        <h3 class="font-bold text-lg text-secondary-900">Key Locations</h3>

        <!-- Location Items -->
        <div class="space-y-3">
          <div class="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition cursor-pointer" onclick="document.location='/about/library'">
            <div class="w-4 h-4 bg-primary-600 rounded-full flex-shrink-0"></div>
            <div>
              <p class="font-semibold text-secondary-900 text-sm">Main Library</p>
              <p class="text-xs text-secondary-600">Research & study spaces</p>
            </div>
          </div>

          <div class="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition cursor-pointer" onclick="document.location='/about/quad'">
            <div class="w-4 h-4 bg-secondary-600 rounded-full flex-shrink-0"></div>
            <div>
              <p class="font-semibold text-secondary-900 text-sm">Central Quad</p>
              <p class="text-xs text-secondary-600">Student gathering space</p>
            </div>
          </div>

          <div class="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition cursor-pointer" onclick="document.location='/about/sports'">
            <div class="w-4 h-4 bg-accent-600 rounded-full flex-shrink-0"></div>
            <div>
              <p class="font-semibold text-secondary-900 text-sm">Sports Complex</p>
              <p class="text-xs text-secondary-600">Athletic & fitness facilities</p>
            </div>
          </div>
        </div>

        <!-- Download Button -->
        <button class="w-full mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition">
          Download Full Map
        </button>
      </div>
    </div>
  </div>
</div>
```

## News Blog Grid (Stanford University, MIT)

```html
<section class="py-12">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold mb-8">Latest News & Updates</h2>

    <div class="grid md:grid-cols-3 gap-6">
      <!-- Featured Article (Large) -->
      <div class="md:col-span-2 group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
        <img
          src="/images/news/featured.jpg"
          alt="Article thumbnail"
          class="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div class="p-6 bg-white">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-xs font-semibold text-primary-600 uppercase">Featured</span>
            <span class="text-xs text-secondary-600">Feb 15, 2026</span>
          </div>
          <h3 class="text-2xl font-bold text-secondary-900 mb-3 group-hover:text-primary-600 transition">
            New STEM Center Opens on Campus
          </h3>
          <p class="text-secondary-700 mb-4">
            State-of-the-art facility equipped with 40 new research laboratories opens to students and faculty...
          </p>
          <a href="#" class="text-primary-600 hover:text-primary-700 font-semibold text-sm">
            Read Full Story →
          </a>
        </div>
      </div>

      <!-- Recent Articles (Small Stack) -->
      <div class="space-y-4">
        <div class="bg-white rounded-lg shadow hover:shadow-md transition p-4 group cursor-pointer">
          <div class="text-xs text-secondary-600 mb-2">Feb 10, 2026</div>
          <h4 class="font-bold text-secondary-900 group-hover:text-primary-600 transition line-clamp-2">
            Admissions Application Deadline Extended
          </h4>
          <p class="text-xs text-secondary-600 mt-2">New deadline for Spring 2026 admission...</p>
        </div>

        <div class="bg-white rounded-lg shadow hover:shadow-md transition p-4 group cursor-pointer">
          <div class="text-xs text-secondary-600 mb-2">Feb 5, 2026</div>
          <h4 class="font-bold text-secondary-900 group-hover:text-primary-600 transition line-clamp-2">
            Alumni Spotlight: Tech Entrepreneur's Success Story
          </h4>
          <p class="text-xs text-secondary-600 mt-2">Class of 2015 graduate launches startup...</p>
        </div>

        <div class="bg-white rounded-lg shadow hover:shadow-md transition p-4 group cursor-pointer">
          <div class="text-xs text-secondary-600 mb-2">Jan 30, 2026</div>
          <h4 class="font-bold text-secondary-900 group-hover:text-primary-600 transition line-clamp-2">
            Spring Event Calendar Announced
          </h4>
          <p class="text-xs text-secondary-600 mt-2">30+ events planned for campus community...</p>
        </div>

        <a href="/news" class="block text-center px-4 py-2 bg-secondary-100 hover:bg-secondary-200 rounded-lg font-semibold text-secondary-900 transition">
          View All News
        </a>
      </div>
    </div>
  </div>
</section>
```

---

## UI/UX Patterns Reference Table

| Pattern | Reference Site | Key Feature | Use Case |
|---------|---|---|---|
| **Full-Screen Video Hero** | Dakota Wesleyan, Howard | Autoplay + muted, creates emotional connection | Homepage above fold |
| **Trust Stats** | Alverno, Princeton | High-contrast colors, large numbers | Credibility builder |
| **Student Testimonials** | Wheaton, Juniata | Real photos + quotes, star ratings | Social proof section |
| **Program Cards** | Muhlenberg, RISD | Hover effects, clear descriptions | Academic browsing |
| **Faculty Directory** | Georgetown, MIT | Professional photos, contact info | Expertise showcase |
| **Audience Tabs** | Chicago, Georgetown | Segmented content per user type | Navigation organization |
| **Campus Map** | GWU, Stanford | Interactive hotspots, legend | Virtual exploration |
| **News Blog** | Stanford, MIT | Featured + recent grid | Content engagement |
| **Bold CTAs** | VCU, Oberlin | Primary color, large buttons | Conversion optimization |
| **Video Testimonials** | Howard | Autoplay, engaging content | Trust & engagement |

---

These patterns work across all devices and maintain WCAG 2.2 AA accessibility standards.

See **tour-travel/component-patterns.md** for additional Tailwind utility patterns and responsive design techniques.
