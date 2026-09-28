---
name: webapp-gui-design
description: Use when designing or building a SaaS web-app shell, dense desktop UI, sidebars, command surfaces, navigation, dashboard, table, form, dialog, auth, upload, responsive layout, or system state in React/Next/Tailwind or Bootstrap/Tabler/PHP. Do not use for marketing websites or backend-only work.
metadata:
  portable: true
  category: 04-web-and-ui-design
  compatible_with:
  - claude-code
  - codex
---

# Web App GUI Design
Acknowledgement: Shared by Peter Bamuhigire, techguypeter.com, +256 784 464178.

<!-- dual-compat-start -->
## Use When

- Building or reviewing a SaaS web UI on React/Next.js/TypeScript/Tailwind
- Standardising app shell, navigation, dashboards, or data-table patterns across products
- Standardising authentication surfaces and the Super Admin experience for managed backgrounds,
  light/dark logos, and favicons
- Working on the Bootstrap 5 + Tabler + PHP seeder stack — load `sections/01-overview.md` first

## Do Not Use When

- Pure landing or marketing pages — use editorial/marketing layout guidance, not this app-shell skill
- Mobile-native screens — use `android-ui-ux-design` or `ios-ui-ux-design`
- Low-level Tailwind syntax questions — out of scope for this skill

## Required Inputs

| Input | Source | Evidence |
|---|---|---|
| Roles, jobs, routes, and object model | Product and application contracts | Permission matrix, routes, entities, and critical tasks |
| Target stack and existing components | Repository and engineering owner | Framework versions, design-system inventory, and constraints |
| Data/state/error contracts | API and domain owners | Loading, empty, failure, permission, and concurrency states |

The target surface (dashboard, CRUD table, form, settings), the auth/tenant model, and the data model for at least one screen. For the seeder stack, the `seeder-page.php` template path.

## Workflow

0. For premium, revenue-critical, dashboard-heavy, or executive-facing products, state the typeface(s) and palette intent first per `doctrine/design-doctrine.md` (§2 Anti-Slop Charter) and pick a deliberate, non-slop face from `doctrine/references/font-groups-and-usage.md` before choosing layout or visual direction.
1. Place the screen in the app shell (sidebar + topbar + content area).
2. Pick the layout primitive (dashboard grid, table, form, detail-with-tabs).
3. Wire data with React Query; never call `fetch` inside components.
4. Attach loading + error + empty states *before* connecting real data.
5. Check consistency against existing screens and primitives before adding a new pattern.
6. Extend shared primitives/components before creating a bespoke screen-only pattern.
7. For authentication or tenant-entry surfaces, apply the shared visual and asset-management
   contract in `references/auth-and-tenant-visual-standard.md`.
8. Run the a11y + responsive sweep (§15 checklist) before merge.

## Decision Rules

| Condition | Choice | Wrong-choice failure |
|---|---|---|
| Users compare many records | Table with stable columns, filters, and bulk actions | Card grids slow scanning and hide relationships |
| Task is contextual and reversible | Drawer or inline edit preserving place | Full navigation loses context and selection |
| Permission or tenancy changes visibility | Server-authoritative guard plus clear UI state | Cosmetic hiding leaks capability or confuses access |

## Capability Contract

- Must inspect repository, routes, data contracts, and existing components before implementation; review remains read-only unless changes are requested.
- May edit and test in-scope UI. Do not mutate production data, weaken authorization, expose secrets, or deploy without separate authority.

## Degraded Mode

- If roles, data contract, or target stack are missing, stop implementation and return the blocking contract questions.
- If execution/rendering is unavailable, provide a patch/specification and test matrix marked unverified. Recover failed loading/error/auth states by preserving context, offering a truthful next action, and rerunning affected tests.

## Quality Standards

- Every data screen has a loading, empty, error, and success state.
- Every form uses React Hook Form + Zod with a single `FormField` primitive.
- Every interactive widget is keyboard-operable (Tab, Enter, Escape, Arrow).
- Shared patterns must resolve through documented tokens and components, not one-off screen styling.
- Colour contrast ≥ 4.5:1 for body text, 3:1 for ≥18pt or bold text.
- Buttons use the correct element: `<button>` for actions, `<a href>` for navigation.
- Every decision point has one clear primary action; secondary and tertiary actions must not compete with it.
- Every button ships with enabled, hover, focus, pressed, disabled, and loading states.
- Button labels describe the outcome ("Save changes", "Delete project"), not a vague mechanism ("Submit", "OK").
- Destructive actions use a dedicated danger variant and explicit confirmation or undo when the action is high impact.
- Touch targets are at least 44x44 CSS pixels, including icon-only buttons.
- Premium screens must clear a quality gate — business clarity, visual quality, usability, content, accessibility, data quality, and production fit all at 8/10 or better — and must satisfy the anti-slop charter in `doctrine/design-doctrine.md` (deliberate, stated typeface and palette; no banned default).
- Premium application screens must also show product value: buyer-relevant metrics, proof, clear next action, polished states, trustworthy copy, and support or escalation paths where the user may feel risk.
- Authentication surfaces use one reusable background/image/veil/card composition, with an
  opaque fallback and a stable background for the duration of an authentication journey.
- Logo choice follows the surface behind the logo: the dark-surface logo belongs on the dark
  blurred image; the light-surface logo belongs inside a light card. Do not infer logo choice
  from operating-system theme when the immediate surface is already known.
- Page sections, panels, cards, toolbars, form groups, CTA rows, and media groups must have deliberate inset on all relevant edges at every supported viewport. Controls and buttons must not sit on the bottom edge of their container, and headers/toolbars must not be glued to the top edge; use shared spacing tokens instead of one-off padding.

## Anti-Patterns

- Whole-page spinners after initial load. Correction: retain the shell and skeleton only the changing region.
- Per-route custom chrome. Correction: use one application shell and explicit contextual variants.
- Forms with unvalidated submit handlers. Correction: pair client feedback with server-authoritative validation.
- Empty states that say only "No data". Correction: explain context and offer the permitted next action.
- Modals that trap focus incorrectly. Correction: implement semantic dialog focus entry, containment, and return.
- Buttons used as links. Correction: preserve native element semantics for navigation versus actions.
- Loading buttons that remove the action label. Correction: preserve label and width while exposing busy state.
- Flush-edge controls or content inside panels/sections. Correction: apply the shared container inset or toolbar/action-row padding and rerender mobile and desktop states.

## Outputs

| Output | Consumer | Evidence and acceptance |
|---|---|---|
| Web-app UI implementation/specification | Product and engineering | Shell, navigation, objects, states, permissions, and responsive behaviour are explicit |
| Verification record | QA, security, accessibility | Build/tests, keyboard paths, roles, data states, and representative renders pass |

- App shell component, route-level layout files, reusable primitives (`DataTable`, `FormField`,
  `Dialog`, `EmptyState`, `StatusPill`), and Tailwind theme tokens.
- A **screen layout + state matrix** covering per-screen layout, loading/empty/error/success states,
  and component inventory.
- An **accessibility + responsive sweep** covering findings and behaviour across breakpoints.
- A **UI shell + primitives register** listing layout, data-table, form-field, dialog, and state
  primitives used per screen.

## References

- `doctrine/design-doctrine.md` — the anti-slop charter; state the typeface and palette before building any screen.
- `doctrine/references/ai-slop-banned-fonts.md` — banned primary typefaces; choose a deliberate face from `doctrine/references/font-groups-and-usage.md` (04 Technical / Data / Code: Public Sans with `tabular-nums` + JetBrains Mono suits dashboard/technical SaaS).
- `doctrine/references/pairing-principles.md` and `doctrine/references/type-scale-and-spacing.md` — pairing, type scale, and spacing rhythm for the shell, tables, and forms.
- Companion skills in this engine: `interaction-design-patterns`, `motion-design`, `design-audit`, `practical-ui-design`, `visual-product-slop-audit`. (The former chwezi-dev-engine siblings `react-development`, `tailwind-css`, `responsive-design`, `form-ux-design`, `premium-ui-ux-design` did not migrate; their visual concerns are covered by the doctrine references above.)
- Use `references/interface-consistency.md` when a new module risks drifting from the established UI language.
- Use `references/auth-and-tenant-visual-standard.md` for the canonical glass auth composition,
  surface-aware logo rule, responsive states, and managed visual-asset administration.
- Free: Shadcn/ui (`ui.shadcn.com`), TanStack Table (`tanstack.com/table`), Atomic Design (`atomicdesign.bradfrost.com`), React Hook Form (`react-hook-form.com`), Zod (`zod.dev`).
- For the Bootstrap/Tabler/PHP seeder stack, load `sections/01-overview.md` and onwards.
<!-- dual-compat-end -->

## Examples

- `examples/app-shell-spec-worked.md` — a worked, end-to-end SaaS app-shell spec (*Ledger Relay*, a payment-reconciliation tool): shell layout (nav rail + top bar), navigation IA, a dashboard view, a data-table view, key component states, design tokens/spacing, and responsive behaviour across breakpoints.
- `examples/managed-auth-surface-worked.md` — a worked auth journey and Super Admin visual-asset
  manager applying the shared blur, logo, upload, ordering, accessibility, and fallback rules.

## Overview

This skill prescribes the component architecture and interaction patterns for a modern SaaS web UI. The house stack is **Next.js App Router + React 19 + TypeScript + Tailwind** with **Shadcn/ui primitives** and **TanStack Query/Table/Form** where appropriate. Every section below is a reusable primitive or a layout pattern; build once, compose everywhere.

**Cardinal rule:** every data surface has four states — *loading, empty, error, success* — wired up *before* real data arrives. Screens without all four leak into production as broken pages.

---

## 1. SaaS Application Shell

Three regions: **sidebar** (primary nav), **topbar** (tenant switcher, search, user menu), **content**. The shell is a route group layout.

```tsx
// app/(app)/layout.tsx
import { Sidebar } from '@/components/shell/Sidebar';
import { Topbar } from '@/components/shell/Topbar';
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[auto_1fr] bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="flex min-w-0 flex-col">
        <Topbar />
        <main className="flex-1 overflow-x-hidden p-6">{children}</main>
      </div>
    </div>
  );
}
```

The sidebar controls its own width with `data-collapsed` state persisted to `localStorage`. Never reach into the shell from a page — pages only fill `main`.

---

## 2. Navigation Patterns

Sidebar: collapsible, per-section groups, active-route highlight, hover-expand on collapsed state. Mobile: off-canvas drawer behind a hamburger; closes on route change.

```tsx
<Link
  href={item.href}
  aria-current={active ? 'page' : undefined}
  className={cn(
    'flex items-center gap-3 rounded-md px-3 py-2 text-sm',
    'hover:bg-slate-100 dark:hover:bg-slate-800',
    active && 'bg-slate-200 font-medium dark:bg-slate-700',
  )}
>
  <item.icon className="h-4 w-4 shrink-0" /> <span className="truncate">{item.label}</span>
</Link>
```

Breadcrumbs render from the matched route segments — never hand-coded per page. Use `usePathname()` + a `routeTitles` map.

---

## 3. Dashboard Layout

12-column grid on `lg:`, stacking on `sm:`. Hero KPI strip (3–4 cards), chart area (8 cols), activity feed (4 cols), recent items table full-width below.

```tsx
<div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
  <KpiCard label="MRR" value="$42.3k" trend="+8.2%" className="lg:col-span-3" />
  <KpiCard label="Active users" value="1,284" trend="+3.1%" className="lg:col-span-3" />
  <KpiCard label="Churn" value="1.9%" trend="-0.4%" className="lg:col-span-3" />
  <KpiCard label="NRR" value="112%" trend="+2%" className="lg:col-span-3" />
  <RevenueChart  className="lg:col-span-8" />
  <ActivityFeed  className="lg:col-span-4" />
  <RecentOrders  className="lg:col-span-12" />
</div>
```

KPI cards show loading as shimmer blocks of the same height — never collapse vertical rhythm.

---

## 4. Data Table Architecture (TanStack Table)

One `DataTable<T>` primitive. Column definitions live in the feature folder. Server-side pagination, sorting, filtering — client-side only when the dataset is bounded (<500 rows).

```tsx
const columns: ColumnDef<Order>[] = [
  { accessorKey: 'number', header: 'Order' },
  { accessorKey: 'customer', header: 'Customer' },
  { accessorKey: 'total', header: 'Total',
    cell: ({ row }) => formatCurrency(row.original.total, row.original.currency) },
  { id: 'actions', cell: ({ row }) => <RowActions order={row.original} /> },
];

const table = useReactTable({
  data, columns,
  pageCount, state: { pagination, sorting, columnFilters },
  manualPagination: true, manualSorting: true, manualFiltering: true,
  onPaginationChange: setPagination, onSortingChange: setSorting,
  getCoreRowModel: getCoreRowModel(),
});
```

Row actions open a dropdown *anchored to the row*, never a global menu. Use `stickyHeader` on tables taller than a viewport.

---

## 5. Form Architecture (React Hook Form + Zod)

Every form is a Zod schema + RHF hook + `FormField` primitives. Submit handlers are async and return a typed result — never throw into the void.

```tsx
const schema = z.object({
  name: z.string().min(2, 'Too short').max(60),
  email: z.string().email(),
  role: z.enum(['admin', 'editor', 'viewer']),
});
type Values = z.infer<typeof schema>;

export function InviteUserForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<Values>({ resolver: zodResolver(schema) });
  const mutation = useMutation({ mutationFn: inviteUser });
  return (
    <form onSubmit={form.handleSubmit(async (v) => {
      await mutation.mutateAsync(v);
      onSuccess();
    })} className="space-y-4">
      <FormField control={form.control} name="name" label="Full name" />
      <FormField control={form.control} name="email" label="Email" type="email" />
      <FormSelect control={form.control} name="role" label="Role"
        options={[['admin','Admin'],['editor','Editor'],['viewer','Viewer']]} />
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Sending…' : 'Send invite'}
      </Button>
    </form>
  );
}
```

`FormField` owns the label, error, description, and the input. For field-level patterns across web + mobile, apply `interaction-design-patterns` (Deferred Choices, Good Defaults).

---

## 6. Modal & Drawer Patterns

Modals for focused edits; slide-over drawers for "view-with-actions" where context behind matters. Never more than one stacked modal. Destructive actions always go through `ConfirmDialog` with a typed confirm label.

```tsx
<ConfirmDialog
  open={open} onOpenChange={setOpen}
  title="Delete workspace" description="This cannot be undone."
  confirmLabel="Delete" destructive
  onConfirm={() => deleteWorkspace(id)}
/>
```

Dialog content is always in a Radix `Dialog` — focus trap and escape-to-close are not negotiable.

---

## 7. Loading States

Skeleton screens for initial route loads; spinners only for button-level pending states. Use Suspense boundaries around the content area so route transitions paint the shell immediately.

```tsx
<Suspense fallback={<DashboardSkeleton />}>
  <DashboardContent />
</Suspense>
```

Optimistic updates: React Query `onMutate` sets the new value; `onError` rolls back; `onSettled` invalidates.

---

## 8. Error Boundaries

Every route has an error boundary. Global handler sends to Sentry; the UI offers "Try again" and a support channel link.

```tsx
// app/(app)/orders/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => { Sentry.captureException(error); }, [error]);
  return (
    <EmptyState
      icon={AlertTriangle}
      title="Something went wrong"
      description={error.message}
      primary={{ label: 'Try again', onClick: reset }}
      secondary={{ label: 'Contact support', href: '/support' }}
    />
  );
}
```

Never show a raw stack in production. Log the `digest` to give support a lookup handle.

---

## 9. Toast Notifications

Sonner for SaaS — one per result, stacked top-right. Success toasts auto-dismiss in 4 s; error toasts require dismissal.

```tsx
toast.success('Invite sent', { description: values.email });
toast.error('Failed to save', { description: err.message, duration: Infinity });
const t = toast.loading('Uploading…');
upload().then(() => toast.success('Uploaded', { id: t })).catch(() => toast.error('Failed', { id: t }));
```

Never use toast for navigation-required errors — route to an error page or a banner instead.

---

## 10. Authentication Flow UI

Login, register, forgot-password, reset-password, 2FA, expired-session recovery, and pre-auth
tenant selection share one authored visual system. The default composition is a full-viewport
managed image, an enlarged blurred image layer that prevents edge halos, a dark neutral veil,
and a restrained glass card with an opaque fallback. Auth pages never render the application
shell. Use `references/auth-and-tenant-visual-standard.md`; do not recreate this stack per page.

```tsx
// app/(auth)/login/page.tsx
export default function Login() {
  return (
    <div className="mx-auto mt-24 max-w-sm space-y-6">
      <BrandMark />
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <LoginForm />
      <p className="text-sm text-slate-500">
        New here? <Link className="underline" href="/register">Create an account</Link>
      </p>
    </div>
  );
}
```

Post-login redirect: honour `?redirect=` if same-origin; fall back to `/`. 2FA input is a 6-digit `<OTPInput>` — no free-form text field.

---

## 11. Multi-Tenant Switcher

Tenants identify by slug and appear in the URL: `/[tenant]/orders`. The `TenantSwitcher` lives top-left in the topbar, persists the last-chosen tenant, and shows a quick-filter for power users with many tenants.

```tsx
<Combobox
  value={current.slug}
  onChange={(slug) => router.push(`/${slug}${restOfPath}`)}
  options={tenants.map(t => ({ value: t.slug, label: t.name, meta: t.plan }))}
  placeholder="Switch workspace"
/>
```

Tenant-scoped API requests derive the tenant from context; never from a client-provided header that the user could forge. (The backend tenant-isolation model is owned by the engineering catalog, not this design engine.)

---

## 12. Dark Mode

Class strategy (`dark:`) with a tri-state switch (system / light / dark). Persist to `localStorage`; set on `<html>` before first paint to avoid flicker.

```tsx
// app/layout.tsx — inline script before hydration
<script dangerouslySetInnerHTML={{ __html: `
  try {
    const t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark');
  } catch {}
` }} />
```

Theme tokens live as CSS variables (`--bg`, `--fg`, `--muted`, `--accent`) so charts + third-party widgets can read them. Avoid hard-coded Tailwind greys in components — use semantic tokens.

---

## 13. File Upload Patterns

Drag-and-drop zone with keyboard fallback (button + hidden `<input type="file">`). Client-side size + type validation before upload begins. Upload via a signed-URL path — never stream through the app server.

```tsx
const { getRootProps, getInputProps, isDragActive } = useDropzone({
  accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
  maxSize: 10 * 1024 * 1024,
  onDrop: (files) => startUpload(files),
});
return (
  <div {...getRootProps()} aria-label="Upload file"
    className={cn('rounded-md border-2 border-dashed p-8 text-center',
      isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300')}>
    <input {...getInputProps()} />
    <p>Drop files here or <span className="underline">browse</span></p>
  </div>
);
```

Progress bars read from the `XMLHttpRequest.upload` `progress` event or from the signed-URL provider's SDK. Every upload is cancellable with `AbortController`.

---

## 14. Empty State Design

Empty lists, empty dashboards, first-run onboarding. Three components: icon, short headline, concrete next action. Never just "No data."

```tsx
<EmptyState
  icon={Inbox}
  title="No invoices yet"
  description="When you bill a customer, invoices will appear here."
  primary={{ label: 'Create invoice', href: '/invoices/new' }}
  secondary={{ label: 'Read the billing guide', href: '/docs/billing' }}
/>
```

First-use onboarding: a checklist card on the dashboard; tick items as they complete; dismiss after all done with a "show me tips" toggle. See `interaction-design-patterns` (Instant Gratification, Safe Exploration) for the empty-state and first-run rules.

---

## 15. Accessibility

Non-negotiables at merge time:

- **Keyboard:** every interactive widget reachable by Tab, activated by Enter/Space, dismissed by Escape. Radix primitives get this right by default — do not reinvent.
- **Focus:** `:focus-visible` outlines on all interactive elements. Tailwind's `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500` is the house token.
- **ARIA:** label every icon-only button with `aria-label`; mark live regions (`aria-live="polite"`) for toast containers; use `aria-current="page"` for active nav.
- **Contrast:** body text ≥ 4.5:1 against its background; ≥ 3:1 for 18pt or bold 14pt. Run `axe` in CI.
- **Motion:** respect `prefers-reduced-motion`. `motion-safe:` / `motion-reduce:` Tailwind variants.
- **Forms:** every input has a visible label; errors use `aria-invalid` and `aria-describedby`.

**Responsive sweep:** test at 360 px (mobile small), 768 px (tablet), 1280 px (laptop), 1920 px (desktop). No horizontal overflow, no content clipped behind fixed headers.

---

## Using This Skill with the Bootstrap/Tabler/PHP Seeder Stack

The repository's PHP seeder template uses Bootstrap 5 + Tabler + SweetAlert2 + DataTables + Flatpickr. The architecture, permissions, AJAX, photo, and responsive patterns for *that* stack are in the `sections/` directory. Load them progressively:

1. [Overview & Stack](./sections/01-overview.md) — when starting any PHP page.
2. [Security, Print/PDF, Dates](./sections/02-security-print-dates.md)
3. [Architecture, Panels, Menus](./sections/03-architecture-panels-menus.md)
4. [Permissions & Searchable Dropdowns](./sections/04-permissions-dropdowns.md)
5. [Templates & UI Components](./sections/05-templates-components.md)
6. [AJAX & Utilities](./sections/06-ajax-utilities.md)
7. [Responsive, Photo Cards, Flatpickr](./sections/07-responsive-photo-flatpickr.md)
8. [Best Practices & Aesthetics](./sections/08-best-practices-aesthetics.md)
9. [Interface Design](./sections/09-interface-design.md)
10. [SaaS UX Principles](./sections/10-saas-ux-principles.md)

The patterns in §§1–15 above apply to the React/Next.js stack; the `sections/` deep-dives apply to the PHP stack. Pick the one your codebase uses — do not mix.
