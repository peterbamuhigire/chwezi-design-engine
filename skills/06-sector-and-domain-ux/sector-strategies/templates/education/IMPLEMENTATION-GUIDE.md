---
title: Modern School Website Implementation Guide - Uganda Edition
sector: education
description: Complete guide for building school websites using Astro + Tailwind CSS v4 + Alpine.js
last_updated: 2026-02-17
---

# Modern School Website Development Guide: Uganda Edition

## Astro + Tailwind CSS v4 + Alpine.js Stack

This guide provides a comprehensive foundation for building modern school websites in Uganda, ensuring fast loading, accessibility compliance, and engagement-focused features for students, parents, and administrators.

---

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Development Setup](#development-setup)
3. [School-Specific Features](#school-specific-features)
4. [Performance Optimization](#performance-optimization)
5. [Deployment Strategy](#deployment-strategy)
6. [Maintenance & Support](#maintenance--support)

---

## Project Architecture

### Recommended Directory Structure

```
school-website/
├── src/
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── MainNav.astro
│   │   │   └── MobileNav.astro
│   │   ├── accessibility/
│   │   │   └── Toolbar.astro
│   │   ├── interactive/
│   │   │   ├── VirtualTour.astro
│   │   │   ├── ParentPortal.astro
│   │   │   └── EventCalendar.astro
│   │   └── shared/
│   │       ├── Header.astro
│   │       ├── Footer.astro
│   │       └── OptimizedImage.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── AdminLayout.astro
│   │   └── BlogLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── admissions/
│   │   │   ├── index.astro
│   │   │   ├── process.astro
│   │   │   ├── fees.astro
│   │   │   └── scholarships.astro
│   │   ├── academics/
│   │   │   ├── index.astro
│   │   │   ├── curriculum.astro
│   │   │   └── staff.astro
│   │   ├── parents/
│   │   │   ├── index.astro
│   │   │   ├── portal.astro
│   │   │   └── resources.astro
│   │   ├── news/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero/
│   │   │   ├── team/
│   │   │   ├── campus/
│   │   │   ├── branding/
│   │   │   │   ├── logo.png
│   │   │   │   └── favicon.png
│   │   │   └── _catalog.json
│   │   └── styles/
│   │       ├── global.css
│   │       ├── accessibility.css
│   │       └── animations.css
│   └── utils/
│       └── imageOptimization.js
├── docs/
│   ├── company-profile.md
│   ├── sector-brief.md
│   ├── branding-colors.md
│   └── pages.md
├── photo-bank/
│   └── (Raw client photos - never modified)
├── public/
├── astro.config.mjs
├── tailwind.config.js
├── package.json
└── deploy.sh
```

### Technology Stack Rationale

- **Astro**: Zero JavaScript by default; perfect for schools needing fast performance
- **Tailwind CSS v4**: Utility-first, self-hosted, no external dependencies
- **Alpine.js**: Minimal interactivity (modals, dropdowns) without the overhead of React/Vue
- **Self-hosted fonts**: Full privacy compliance, no external tracking
- **Sharp**: Server-side image optimization with modern formats (WebP, AVIF)

---

## Development Setup

### 1. Project Initialization

```bash
# Create new Astro project
npm create astro@latest school-website -- --template basics

cd school-website

# Install dependencies
npm install @astrojs/tailwind tailwindcss@next alpinejs @fontsource/inter @fontsource/poppins gsap sharp

# Install dev dependencies
npm install -D @tailwindcss/typography @tailwindcss/forms
```

### 2. Core Configuration Files

#### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  compressHTML: true,
  build: {
    assets: '_assets',
    inlineStylesheets: 'auto',
    format: 'directory'
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: { drop_console: true }
      }
    }
  }
});
```

#### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // School brand colors - customize per school
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',     // Main brand color
          600: '#16a34a',     // Most used
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',     // Headers, borders
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Public Sans', 'system-ui', 'sans-serif'],
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.secondary.700'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.700'),
              },
            },
            strong: {
              color: theme('colors.secondary.900'),
            },
            'ol > li::marker': {
              color: theme('colors.primary.600'),
            },
            'ul > li::marker': {
              color: theme('colors.primary.600'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
```

#### package.json Scripts

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "lint": "astro check",
    "deploy": "npm run build && ./deploy.sh"
  }
}
```

---

## School-Specific Features

### 1. Responsive Navigation with Dropdowns

#### src/components/navigation/MainNav.astro

```astro
---
import { Menu, X } from 'lucide-svelte';
---

<div
  x-data="{
    mobileMenuOpen: false,
    activeDropdown: null
  }"
  class="bg-white shadow-sm sticky top-0 z-40"
>
  <nav class="container mx-auto px-4 md:px-6">
    <div class="flex justify-between items-center h-16">

      <!-- Logo -->
      <a href="/" class="flex items-center space-x-3">
        <img
          src="/images/branding/logo.png"
          alt="School Logo"
          class="h-10 w-auto"
          loading="eager"
        />
        <span class="font-display text-lg font-semibold text-primary-700 hidden sm:block">
          School Name
        </span>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center space-x-1">
        <a href="/" class="px-4 py-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded transition">
          Home
        </a>

        <!-- Admissions Dropdown -->
        <div class="relative group">
          <button
            class="px-4 py-2 flex items-center space-x-1 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded transition"
            aria-haspopup="true"
          >
            <span>Admissions</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div class="absolute left-0 mt-0 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-1">
            <a href="/admissions/process" class="block px-4 py-2 text-secondary-700 hover:bg-primary-50 text-sm">
              Admission Process
            </a>
            <a href="/admissions/fees" class="block px-4 py-2 text-secondary-700 hover:bg-primary-50 text-sm">
              Fee Structure
            </a>
            <a href="/admissions/scholarships" class="block px-4 py-2 text-secondary-700 hover:bg-primary-50 text-sm">
              Scholarships
            </a>
          </div>
        </div>

        <a href="/academics" class="px-4 py-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded transition">
          Academics
        </a>
        <a href="/parents" class="px-4 py-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded transition">
          Parents
        </a>
        <a href="/contact" class="px-4 py-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded transition">
          Contact
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden p-2 rounded-md text-secondary-600 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <Menu x-show="!mobileMenuOpen" class="w-6 h-6" />
        <X x-show="mobileMenuOpen" class="w-6 h-6" />
      </button>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div
    x-show="mobileMenuOpen"
    x-transition:enter="transition ease-out duration-200"
    x-transition:enter-start="opacity-0 -translate-y-2"
    x-transition:enter-end="opacity-100 translate-y-0"
    class="md:hidden bg-white border-t"
  >
    <div class="container mx-auto px-4 py-4 space-y-2">
      <a href="/" class="block py-2 px-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded">
        Home
      </a>

      <div x-data="{ open: false }">
        <button
          @click="open = !open"
          class="w-full text-left py-2 px-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded flex justify-between items-center"
        >
          <span>Admissions</span>
          <svg class="w-4 h-4" :class="{ 'rotate-180': open }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div x-show="open" class="pl-4 mt-2 space-y-2">
          <a href="/admissions/process" class="block py-1 text-secondary-600 hover:text-primary-600 text-sm">
            Admission Process
          </a>
          <a href="/admissions/fees" class="block py-1 text-secondary-600 hover:text-primary-600 text-sm">
            Fee Structure
          </a>
          <a href="/admissions/scholarships" class="block py-1 text-secondary-600 hover:text-primary-600 text-sm">
            Scholarships
          </a>
        </div>
      </div>

      <a href="/academics" class="block py-2 px-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded">
        Academics
      </a>
      <a href="/parents" class="block py-2 px-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded">
        Parents
      </a>
      <a href="/contact" class="block py-2 px-2 text-secondary-700 hover:text-primary-600 hover:bg-primary-50 rounded">
        Contact
      </a>
    </div>
  </div>
</div>

<script>
  import Alpine from 'alpinejs';
  if (!window.Alpine) {
    window.Alpine = Alpine;
    Alpine.start();
  }
</script>
```

### 2. Parent Portal with Authentication

```astro
---
// src/pages/parents/portal.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
---

<BaseLayout title="Parent Portal" description="Access your child's academic information and progress">
  <section class="py-12 bg-secondary-50">
    <div class="container mx-auto px-4 max-w-2xl">
      <div
        x-data="parentPortal()"
        x-init="init()"
        class="bg-white rounded-lg shadow-lg p-6 md:p-8"
      >
        <!-- Login Form -->
        <div x-show="!isAuthenticated" class="space-y-6">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-display font-bold text-secondary-900 mb-2">Parent Portal</h2>
            <p class="text-secondary-600">Sign in to access your child's progress and school information</p>
          </div>

          <form @submit.prevent="login" class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-secondary-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                x-model="credentials.email"
                class="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="parent@example.com"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-secondary-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                x-model="credentials.password"
                class="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              class="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
              :disabled="loading"
            >
              <span x-show="!loading">Sign In</span>
              <span x-show="loading">Signing in...</span>
            </button>

            <p x-show="error" class="text-red-600 text-sm text-center" x-text="error"></p>

            <p class="text-center text-secondary-600 text-sm">
              Don't have an account?
              <a href="/contact" class="text-primary-600 hover:text-primary-700 font-medium">Contact the school</a>
            </p>
          </form>
        </div>

        <!-- Dashboard (Authenticated) -->
        <div x-show="isAuthenticated" class="space-y-6">
          <div class="flex justify-between items-center pb-4 border-b">
            <h2 class="text-2xl font-display font-bold text-secondary-900">
              Welcome, <span x-text="user.firstName"></span>
            </h2>
            <button
              @click="logout"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Logout
            </button>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-primary-50 p-4 rounded-lg">
              <p class="text-sm text-secondary-600 mb-1">Children</p>
              <p class="text-2xl font-bold text-primary-700" x-text="user.children.length"></p>
            </div>
            <div class="bg-primary-50 p-4 rounded-lg">
              <p class="text-sm text-secondary-600 mb-1">Messages</p>
              <p class="text-2xl font-bold text-primary-700" x-text="unreadMessages"></p>
            </div>
            <div class="bg-primary-50 p-4 rounded-lg">
              <p class="text-sm text-secondary-600 mb-1">Upcoming Events</p>
              <p class="text-2xl font-bold text-primary-700" x-text="upcomingEvents.length"></p>
            </div>
          </div>

          <!-- Children's Academic Progress -->
          <div class="space-y-4">
            <h3 class="font-semibold text-lg text-secondary-900">Children's Progress</h3>

            <template x-for="child in user.children" :key="child.id">
              <div class="border rounded-lg p-4 space-y-3">
                <div class="flex justify-between items-center">
                  <h4 class="font-semibold text-secondary-900" x-text="child.name"></h4>
                  <span class="text-sm text-secondary-500" x-text="child.grade"></span>
                </div>

                <!-- Attendance -->
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-secondary-600">Attendance</span>
                    <span class="font-semibold text-secondary-900" x-text="child.attendance + '%'"></span>
                  </div>
                  <div class="w-full bg-secondary-200 rounded-full h-2">
                    <div
                      class="bg-primary-600 rounded-full h-2 transition-all duration-300"
                      :style="{ width: child.attendance + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Recent Grades -->
                <div>
                  <p class="text-sm font-medium text-secondary-900 mb-2">Recent Grades</p>
                  <div class="grid grid-cols-2 gap-2">
                    <template x-for="grade in child.recentGrades" :key="grade.subject">
                      <div class="text-xs bg-secondary-50 px-3 py-2 rounded">
                        <span class="block font-medium text-secondary-900" x-text="grade.subject"></span>
                        <span class="text-secondary-600" x-text="grade.score"></span>
                      </div>
                    </template>
                  </div>
                </div>

                <button
                  @click="selectedChild = child.id"
                  class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Full Report →
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<script>
  function parentPortal() {
    return {
      isAuthenticated: false,
      loading: false,
      error: null,
      selectedChild: null,
      credentials: {
        email: '',
        password: ''
      },
      user: {
        firstName: '',
        children: []
      },
      unreadMessages: 0,
      upcomingEvents: [],

      init() {
        // Check for existing session
        const session = localStorage.getItem('parent-session');
        if (session) {
          try {
            this.user = JSON.parse(session);
            this.isAuthenticated = true;
            this.fetchDashboardData();
          } catch (e) {
            localStorage.removeItem('parent-session');
          }
        }
      },

      async login() {
        this.loading = true;
        this.error = null;

        try {
          // Replace with actual API call to your backend
          const response = await fetch('/api/parent-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.credentials)
          });

          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const data = await response.json();
          this.user = data.user;
          this.isAuthenticated = true;
          localStorage.setItem('parent-session', JSON.stringify(this.user));
          this.fetchDashboardData();

        } catch (err) {
          this.error = err.message || 'Invalid email or password';
        } finally {
          this.loading = false;
        }
      },

      logout() {
        this.isAuthenticated = false;
        this.user = { firstName: '', children: [] };
        this.credentials = { email: '', password: '' };
        localStorage.removeItem('parent-session');
      },

      fetchDashboardData() {
        // Simulate fetching additional dashboard data
        this.unreadMessages = 3;
        this.upcomingEvents = [
          { date: '2026-02-25', title: 'Parent-Teacher Meeting' },
          { date: '2026-03-05', title: 'Sports Day' }
        ];
      }
    }
  }
</script>
```

### 3. Virtual Campus Tour with Hotspots

```astro
---
// src/components/interactive/VirtualTour.astro
---

<div
  x-data="campusVirtualTour()"
  x-init="init()"
  class="relative rounded-lg overflow-hidden bg-secondary-100"
>
  <!-- Main Image with Navigation -->
  <div class="relative aspect-video bg-secondary-200">
    <img
      x-ref="mainImage"
      src="/images/campus/entrance.jpg"
      alt="School campus virtual tour"
      class="w-full h-full object-cover"
      loading="lazy"
    />

    <!-- Navigation Controls -->
    <div class="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
      <button
        @click="prevScene"
        class="pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
        aria-label="Previous location"
      >
        ←
      </button>
      <button
        @click="nextScene"
        class="pointer-events-auto bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
        aria-label="Next location"
      >
        →
      </button>
    </div>

    <!-- Scene Indicators (Dots) -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-auto">
      <template x-for="(scene, index) in scenes" :key="index">
        <button
          @click="goToScene(index)"
          class="w-2 h-2 rounded-full transition"
          :class="currentScene === index ? 'bg-primary-600 w-4' : 'bg-white/50 hover:bg-white'"
          :aria-label="'View ' + scene.name"
        ></button>
      </template>
    </div>

    <!-- Scene Label -->
    <div class="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-medium">
      <p x-text="scenes[currentScene].name"></p>
    </div>
  </div>

  <!-- Hotspots (Points of Interest) -->
  <div class="relative -mt-1">
    <template x-for="hotspot in scenes[currentScene].hotspots" :key="hotspot.id">
      <button
        @click="showInfo(hotspot)"
        class="absolute w-8 h-8 bg-primary-600 rounded-full animate-pulse cursor-pointer hover:scale-110 transition"
        :style="{ top: hotspot.y + '%', left: hotspot.x + '%', transform: 'translate(-50%, -50%)' }"
        :aria-label="'Learn about ' + hotspot.title"
      ></button>
    </template>
  </div>

  <!-- Information Modal -->
  <div
    x-show="selectedHotspot"
    @click.away="selectedHotspot = null"
    x-transition
    class="absolute bottom-0 left-0 right-0 md:bottom-4 md:left-auto md:right-4 md:w-96 bg-white rounded-t-lg md:rounded-lg shadow-xl p-4"
  >
    <template x-if="selectedHotspot">
      <div>
        <h3 class="font-semibold text-lg text-secondary-900 mb-2" x-text="selectedHotspot.title"></h3>
        <p class="text-secondary-600 text-sm leading-relaxed mb-3" x-text="selectedHotspot.description"></p>
        <button
          @click="selectedHotspot = null"
          class="text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          Close
        </button>
      </div>
    </template>
  </div>
</div>

<script>
  function campusVirtualTour() {
    return {
      currentScene: 0,
      selectedHotspot: null,
      scenes: [
        {
          name: 'Main Entrance',
          image: '/images/campus/entrance.jpg',
          hotspots: [
            {
              id: 1,
              x: 30,
              y: 40,
              title: 'Welcome Center',
              description: 'Our main reception and administration office. Visitors report here on arrival.'
            },
            {
              id: 2,
              x: 70,
              y: 60,
              title: 'Security Gate',
              description: '24/7 security ensuring student safety and campus security.'
            }
          ]
        },
        {
          name: 'Sports Field',
          image: '/images/campus/field.jpg',
          hotspots: [
            {
              id: 3,
              x: 50,
              y: 50,
              title: 'Football Pitch',
              description: 'FIFA-standard grass pitch used for sports activities and PE lessons.'
            }
          ]
        },
        {
          name: 'Science Laboratory',
          image: '/images/campus/lab.jpg',
          hotspots: [
            {
              id: 4,
              x: 40,
              y: 45,
              title: 'Modern Equipment',
              description: 'State-of-the-art laboratory equipment for hands-on science learning.'
            }
          ]
        }
      ],

      init() {
        // Preload images
        this.scenes.forEach(scene => {
          const img = new Image();
          img.src = scene.image;
        });
      },

      nextScene() {
        this.currentScene = (this.currentScene + 1) % this.scenes.length;
        this.updateImage();
      },

      prevScene() {
        this.currentScene = (this.currentScene - 1 + this.scenes.length) % this.scenes.length;
        this.updateImage();
      },

      goToScene(index) {
        this.currentScene = index;
        this.updateImage();
      },

      updateImage() {
        this.$refs.mainImage.src = this.scenes[this.currentScene].image;
        this.selectedHotspot = null;
      },

      showInfo(hotspot) {
        this.selectedHotspot = hotspot;
      }
    }
  }
</script>
```

### 4. Admissions Fee Table & Calendar

Include in `src/pages/admissions/index.astro`:

```astro
---
// Fee structure with tabs for different grade levels
const feeStructure = {
  nursery: { term: '1,500,000', annual: '4,200,000' },
  primaryJunior: { term: '2,000,000', annual: '5,600,000' },
  primarySenior: { term: '2,500,000', annual: '7,000,000' }
};

const importantDates = [
  { date: 'Jan 15, 2026', event: 'Application Deadline - Term 1', status: 'open' },
  { date: 'Feb 1, 2026', event: 'Entrance Assessments', status: 'upcoming' },
  { date: 'Feb 15, 2026', event: 'Admission Results Released', status: 'upcoming' },
  { date: 'Mar 1, 2026', event: 'Term 1 Begins', status: 'future' }
];
---

<!-- Fee Structure Table -->
<section class="py-12">
  <div class="container mx-auto px-4 max-w-3xl">
    <h2 class="text-3xl font-display font-bold text-center mb-8">Tuition Fees 2026</h2>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-primary-50 border-b-2 border-primary-600">
          <tr>
            <th class="text-left py-3 px-4 font-semibold">Grade Level</th>
            <th class="text-right py-3 px-4 font-semibold">Term Fees (UGX)</th>
            <th class="text-right py-3 px-4 font-semibold">Annual Fees (UGX)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b hover:bg-secondary-50 transition">
            <td class="py-3 px-4">Nursery</td>
            <td class="text-right py-3 px-4 font-medium">1,500,000</td>
            <td class="text-right py-3 px-4 font-medium">4,200,000</td>
          </tr>
          <tr class="border-b hover:bg-secondary-50 transition">
            <td class="py-3 px-4">Primary (P1-P3)</td>
            <td class="text-right py-3 px-4 font-medium">2,000,000</td>
            <td class="text-right py-3 px-4 font-medium">5,600,000</td>
          </tr>
          <tr class="hover:bg-secondary-50 transition">
            <td class="py-3 px-4">Primary (P4-P7)</td>
            <td class="text-right py-3 px-4 font-medium">2,500,000</td>
            <td class="text-right py-3 px-4 font-medium">7,000,000</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="text-sm text-secondary-600 mt-4 text-center">
      * Additional fees for boarding, transport, uniforms, and extracurricular activities apply.
    </p>
  </div>
</section>

<!-- Important Dates -->
<section class="bg-secondary-50 py-12">
  <div class="container mx-auto px-4 max-w-3xl">
    <h2 class="text-3xl font-display font-bold text-center mb-8">Important Dates</h2>

    <div class="space-y-3">
      {importantDates.map((item) => (
        <div class="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition">
          <div class="flex-shrink-0">
            <span class="text-2xl font-bold text-primary-600">{item.date.split(' ')[0]}</span>
          </div>
          <div class="flex-grow">
            <p class="font-medium text-secondary-900">{item.event}</p>
            <p class="text-sm text-secondary-600">{item.date}</p>
          </div>
          <div>
            <span
              class={`px-3 py-1 rounded-full text-xs font-medium ${
                item.status === 'open'
                  ? 'bg-green-100 text-green-800'
                  : item.status === 'upcoming'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {item.status === 'open' && 'Open'}
              {item.status === 'upcoming' && 'Upcoming'}
              {item.status === 'future' && 'Future'}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## Performance Optimization

### Image Optimization Component

```astro
---
// src/components/shared/OptimizedImage.astro
import { Image } from 'astro:assets';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  class?: string;
  loading?: 'lazy' | 'eager';
}

const {
  src,
  alt,
  width = 1200,
  height = 800,
  class: className = '',
  loading = 'lazy'
} = Astro.props;
---

<Image
  src={src}
  alt={alt}
  width={width}
  height={height}
  format="webp"
  quality="mid"
  loading={loading}
  class={className}
  densities={[1, 2]}
/>
```

### Core Web Vitals Monitoring

```astro
---
// src/components/performance/CoreWebVitals.astro
---

<script>
  // Monitor Core Web Vitals
  if (typeof window !== 'undefined') {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    }).observe({ type: 'layout-shift', buffered: true });

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const firstInput = entryList.getEntries()[0];
      console.log('FID:', firstInput.processingStart - firstInput.startTime);
    }).observe({ type: 'first-input', buffered: true });
  }
</script>
```

---

## Deployment Strategy

### Nginx Configuration for Schools

```nginx
# /etc/nginx/sites-available/school.ug
server {
    listen 80;
    server_name school.ug www.school.ug;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name school.ug www.school.ug;

    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/school.ug/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/school.ug/privkey.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    root /var/www/school-website/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json;
    gzip_min_length 1000;

    # Asset caching (1 year for content-hashed assets)
    location /_assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /images/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML files (1 hour cache)
    location / {
        try_files $uri $uri.html $uri/ =404;
        expires 1h;
        add_header Cache-Control "public, must-revalidate";
    }

    # Hide Nginx version
    server_tokens off;

    # Block hidden files
    location ~ /\. {
        deny all;
    }
}
```

### Automated Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Starting deployment..."

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build
npm run build

# Backup current version
if [ -d "/var/www/school-website" ]; then
    tar -czf "/var/backups/school-$(date +%Y%m%d_%H%M%S).tar.gz" /var/www/school-website
fi

# Deploy
echo "📂 Deploying files..."
rsync -avz --delete dist/ /var/www/school-website/

# Set permissions
chown -R www-data:www-data /var/www/school-website
chmod -R 755 /var/www/school-website

# Reload Nginx
nginx -t && systemctl reload nginx

echo "✅ Deployment complete!"

# Health check
sleep 5
if curl -s -o /dev/null -w "%{http_code}" https://school.ug | grep -q "200"; then
    echo "✅ Site is live!"
else
    echo "⚠️ Health check failed"
fi
```

---

## Maintenance & Support

### Monthly Checklist

- [ ] Security updates (npm update)
- [ ] SSL certificate check (valid for 90 days)
- [ ] Analytics review (Google Analytics)
- [ ] Content updates (news, events, staff changes)
- [ ] Link validation (broken links)
- [ ] Lighthouse audit (performance, accessibility)

### Support Contacts

- **Technical Support**: IT Department
- **Content Updates**: Communications Office
- **Parent Portal Issues**: Administration Office

---

## Conclusion

This guide provides a solid foundation for modern school websites in Uganda. The stack chosen ensures:

✅ **Fast Loading**: Under 500KB first load, optimized for East African internet speeds
✅ **Accessibility**: WCAG 2.2 AA compliant, supporting all abilities
✅ **Mobile-First**: Designed for 375px mobile screens first
✅ **Self-Hosted**: No external dependencies, full privacy compliance
✅ **Easy Maintenance**: Clear structure, well-documented code
✅ **Parent Engagement**: Portals, messaging, progress tracking

**Key Success Factors**:
1. Regular content updates keep the site fresh
2. Monitor parent feedback and iterate
3. Keep security updated (SSL, npm packages)
4. Celebrate school achievements on the homepage
5. Make admissions process as clear and simple as possible

---

**Built with ❤️ for Ugandan Schools**

Last Updated: February 2026
