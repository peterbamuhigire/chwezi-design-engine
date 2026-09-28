---
name: email-and-newsletter-design
description: Use when designing, building, or debugging purpose-specific HTML email and newsletters across Outlook, Gmail, Apple Mail, dark mode, mobile, image-off, and limited-CSS conditions; use ux-writing-and-microcopy for message wording.
metadata:
  portable: true
  category: 13-presentations-and-documents
  compatible_with:
  - claude-code
  - codex
---

# Email & Newsletter Design (Bulletproof, Client-Resilient HTML Email)

HTML email is the most constrained rendering target a designer touches. It is **not the web**:
the most common rendering engine in the world for email is *Microsoft Word* (desktop Outlook),
flexbox and grid do not exist, `<style>` blocks are stripped or partially honoured, webfonts
silently fail in most clients, and the same file is re-coloured without warning by dark mode.
Designing email is the discipline of building a layout that **degrades into a still-correct
layout** in every client, because you cannot control which one renders it.

Per [`doctrine/design-doctrine.md`](../../../doctrine/design-doctrine.md) §0–2, the moat is
output that looks **authored** — but in email the authored choice must survive a client that
strips half of it. The craft here is not "use a clever font"; it is "choose a face whose
**fallback still carries the design** when the webfont is dropped," and to build structure that
holds when CSS is ignored. Restraint plus one strong, intentional choice that *survives
degradation* beats five choices that only render in one client.

<!-- dual-compat-start -->
## Use When
- Building any **HTML email**: marketing campaign, newsletter/digest, transactional (receipt,
  password reset, invite), or announcement, that must render across many clients.
- An email **renders correctly in one client and breaks in another** — collapsed columns in
  Outlook, stripped styles in Gmail, inverted colours in dark mode, missing button, blank where
  images were blocked.
- Deciding the **responsive strategy for email** (fluid, hybrid/spongy, or mobile-first stacking)
  given that container queries and most modern CSS are unavailable.
- Building a **bulletproof button** that is clickable and correctly sized even in Outlook/Word and
  with images off.
- Handling **dark mode** in email (Apple Mail / Outlook full inversion vs Gmail partial) without
  the logo, text, or button disappearing.
- Choosing **type for email**: a web-safe stack, or a webfont with a deliberate web-safe fallback
  (the fallback is the real design, because most clients strip the webfont).
- Writing the **preheader** (the inbox preview text) and ensuring **image-off / alt-text**
  resilience and **accessible, semantic** structure.

## Do Not Use When
- The artifact is a **web page / web app / landing page** rendered in a real browser — use
  `14-conversion-and-web-page-patterns/landing-page-and-conversion-design` and
  `03-layout-grid-and-composition/responsive-and-adaptive-layout` (modern CSS is available there;
  none of the email constraints apply). This skill is *only* for the email client target.
- You are choosing the **subject line, preheader wording, button label, or any in-message copy**
  as a *writing* task → `04-web-and-ui-design`/`10-content-design-and-ux-writing`'s
  `ux-writing-and-microcopy` owns the words; this skill owns where the preheader/button *lives*
  in the markup and how it renders.
- You need **deliverability/authentication ops** (SPF, DKIM, DMARC, list hygiene, ESP config,
  send reputation) — that is mail-infra, not design. This skill covers only the *design-adjacent*
  craft that affects inbox rendering and the image-off impression (preheader, alt text, weight,
  text-to-image balance); it does not configure sending.
- The general **responsive model** (breakpoints, container queries, fluid `clamp()` type for the
  web) is the question → `responsive-and-adaptive-layout`. This skill *borrows* its mobile-first
  and fluid ideas but constrains them to what email clients actually support.
- The deliverable is a **document or slide** (DOCX/PPTX/PDF) — different format, different
  embedding rules (`doctrine/references/embedding-by-format.md`).

## Required Inputs
| Input | Source | Required? | Evidence |
|---|---|---|---|
| Email type, audience, goal, sender, and content | Campaign or product owner | yes | Approved brief and copy |
| Client support matrix and delivery platform | Engineering/marketing operations | yes | Target-client list |
| Brand assets, links, consent, legal footer, and tracking rules | Brand and compliance owners | yes | Asset and compliance register |
- The **target client matrix** and rough audience split (e.g. "B2B → assume heavy desktop Outlook";
  "consumer → Gmail app + Apple Mail dominate"). The matrix decides how defensive to be.
- The **email type and single primary goal** (one campaign = one main CTA). Transactional vs
  marketing changes the structure and the image/text ratio.
- The **brand colour + type intent** from `02-color-brand-and-visual-identity` /
  `01-typography-and-fonts` — *plus* a committed **web-safe fallback** for the body face, because
  the webfont will be dropped in most clients (see Workflow §5).
- The **content inventory in priority order** (what must be readable with images off and the
  webfont gone), and the **preheader text** intent.
- Whether **dark mode** is in scope for the audience (Apple Mail / iOS, Outlook, and the
  partial-inversion behaviour of Gmail) — almost always yes in 2026.
- Light and dark versions of the **logo/key images** (a dark-mode logo swap is often required).

## Workflow
0. **Design the message before the markup.** Derive hierarchy from the audience, event, decision,
   content priority, brand voice, and image-off reading order. Choose one focal message, one primary
   action where an action exists, supporting proof or transaction detail, and recovery or legal
   controls. Do not select or imitate a prebuilt layout; compose the structure for this message and
   record why each retained block earns its space.

1. **Accept the constrained model before writing markup.** Email is built with **HTML tables for
   layout** (not divs/flex/grid), **inline CSS on every element** (a `<style>` head block is a
   progressive *enhancement*, not the foundation, because Gmail and others strip or partially
   honour it), a single root table at a fixed max width (typically **600px**), and presentational
   attributes (`role="presentation"`, `cellpadding`, `cellspacing`, `border="0"`,
   `align`/`valign`) that Word-engine Outlook still needs. State this constraint, then design
   *within* it — do not design a web layout and hope. See `references/email-bulletproof-patterns.md`
   §1 (the model) and §2 (the document foundation pattern with Outlook MSO conditionals and
   meta tags).

2. **Build the responsive layout as fluid or hybrid, not container-query-driven.** Email cannot
   use the container queries that `responsive-and-adaptive-layout` centres on. Choose one:
   (a) **Fluid** — a single `width:100%; max-width:600px` table that simply narrows; simplest, but
   multi-column content squeezes. (b) **Hybrid / "spongy"** — columns built as
   `display:inline-block` cells wrapped in MSO `<td>` ghost tables so Outlook holds the columns
   while non-Outlook clients let them wrap and stack with no media query at all; the most robust
   responsive email pattern, since **Gmail strips `@media` in several configurations**. (c)
   **Mobile-first media queries** as a *progressive enhancement* on top, never the load-bearing
   layer. Carry the doctrine principle from `responsive-and-adaptive-layout` §8 — re-decide the
   focal point at narrow width; never let the email collapse into an undifferentiated stack — but
   implement it with stacking cells, not grid. Patterns in
   `references/email-bulletproof-patterns.md` §3.

3. **Write the preheader first, and hide it correctly.** The preheader is the preview text the
   inbox shows after the subject — prime real estate that decides opens. Place a hidden inline
   element as the **first node inside `<body>`**, before any visible content, then pad it with
   a zero-width-space + non-breaking-space run so the client does not pull the first body copy
   ("View in browser…") into the preview. Hide it with the combined
   `display:none; max-height:0; overflow:hidden; mso-hide:all;` + the entity padding pattern. The
   wording is a `ux-writing-and-microcopy` decision; the *placement and hiding* is this skill.
   See `references/email-bulletproof-patterns.md` §4.

4. **Build bulletproof buttons — not an image, not a bare styled `<a>`.** A button must be
   clickable, correctly sized, and visible even in Word-engine Outlook (which ignores
   `padding`/`border-radius` on links) and with images off. Use the **padded-table / anchor
   pattern**: an `<a>` with inline background-colour, padding, and `mso-padding-alt`, wrapped so
   Outlook honours the hit area; for rounded/filled buttons in Outlook add the **VML roundrect**
   conditional (`<v:roundrect>`). Never make the button a background-less image (it vanishes when
   images are blocked) and never rely on CSS padding alone (Outlook drops it). Give it a real text
   label (image-off safe) and ≥ **44×44px** touch target per
   [`doctrine/references/wcag-2.2-criteria.md`](../../../doctrine/references/wcag-2.2-criteria.md)
   §2.5.8. Full VML + anchor recipe in `references/email-bulletproof-patterns.md` §5.

5. **Choose type knowing the webfont will usually be dropped — so the fallback IS the design.**
   Email webfont support is partial and uneven: Apple Mail, iOS Mail, and Outlook.app can load a
   linked/`@font-face` webfont, but **Gmail (all platforms), Outlook desktop, Yahoo, and many
   others strip it** and fall straight to your fallback. Therefore design the email so it looks
   *right in the web-safe fallback first*, then layer the webfont as an enhancement for the
   clients that honour it. Pick a non-banned brand webfont per `doctrine/design-doctrine.md` §2 and
   `references/ai-slop-banned-fonts.md` (e.g. an **Andada Pro** display face or a **Source Serif /
   Spectral** body face — never Inter, Roboto, Open Sans, Lato, Arial, Geist, Space Grotesk), but
   **commit a real web-safe stack** that carries the same voice when it loads instead: a
   serif-voiced email falls back to `Georgia, 'Times New Roman', serif`; a grotesque-voiced one to
   `'Helvetica Neue', Helvetica, Arial, sans-serif` (Arial is acceptable *as a fallback tier*, not
   as the stated primary). Declare the webfont with an `@media`-guarded `@font-face` *and* an MSO
   conditional that forces Outlook to the fallback, so Outlook never tries to render the webfont and
   reflow. Web-safe options, the fallback-pairing table, and the Outlook-guard snippet are in
   `references/email-bulletproof-patterns.md` §6.

6. **Plan for dark mode explicitly — colours get rewritten under you.** Three behaviours coexist:
   Apple Mail / iOS may **fully invert** the palette; Outlook (Windows/Mac/app) often **fully
   inverts**; **Gmail does a partial/forced inversion** of light backgrounds you cannot fully
   control. Design a dark-mode treatment: use `@media (prefers-color-scheme: dark)` with
   `[data-ostype]`/`color-scheme` and `<meta name="color-scheme" content="light dark">` +
   `supported-color-schemes` to opt in; provide a **dark logo swap** (a transparent PNG with a
   light mark, shown via the dark media query) because a dark logo on an inverted dark background
   vanishes; never rely on a transparent PNG icon that disappears on dark — give it a safe halo or
   a background plate; and check that **button fill keeps ≥ 4.5:1 / 3:1 contrast**
   (`wcag-2.2-criteria.md` §1.4.3/1.4.11) after inversion. Patterns and the logo-swap recipe in
   `references/email-bulletproof-patterns.md` §7.

7. **Make it resilient with images off.** Many clients block images by default until the reader
   opts in, so the email must communicate with **zero images loaded**. Every `<img>` gets
   meaningful **`alt` text** (a decorative spacer gets `alt=""`), styled alt text where the client
   honours it (inline colour/size on the `<img>` shows readable text in the broken-image box), a
   **live HTML text** version of any headline or CTA that currently lives in an image (never put
   the only copy of the headline or the button label inside an image), and a sensible
   **background colour** on image containers so the layout does not collapse to white boxes. Keep a
   healthy **text-to-image ratio** (heavily image-only emails read as broken and hurt the inbox
   impression). See `references/email-bulletproof-patterns.md` §8.

8. **Make the markup semantic and accessible.** Set `lang` on `<html>`, `role="presentation"` on
   every layout table so screen readers skip the scaffolding (and announce real content in reading
   order), use real heading tags for hierarchy, keep a **logical source order** (mobile reads the
   DOM top-to-bottom — order the cells so the stacked single column reads correctly), ensure body
   text ≥ **4.5:1** and large text/UI ≥ **3:1** contrast per `wcag-2.2-criteria.md` §1.4.3/1.4.11,
   give links discernible names (not "click here"), and size touch targets ≥ 44px. Provide a
   visible **"View in browser"** and (for marketing) **unsubscribe** link. Accessibility checklist
   in `references/email-bulletproof-patterns.md` §9.

9. **Run the email anti-slop + render checklist** (below), then **test on real clients** — at
   minimum desktop Outlook (Word engine), Gmail web + app, Apple Mail (light **and** dark), and one
   mobile webview — plus an images-off pass and an inbox-preview (preheader) check. Automated
   render previews catch layout; only a real Outlook and a real dark-mode pass catch the two
   things that break most often.

## The Email Render Checklist (run every time)
1. Table-based layout, **inline CSS on every element**, `role="presentation"` on layout tables,
   single 600px-max root — `<style>` head treated as enhancement only.
2. Responsive via **fluid or hybrid/spongy** stacking (MSO ghost tables for Outlook columns), not
   container queries; `@media` is enhancement because Gmail may strip it.
3. **Preheader** is the first body node, hidden correctly, padded so no stray copy leaks into
   preview; wording is on-voice (`ux-writing-and-microcopy`).
4. Every CTA is a **bulletproof button** (padded anchor + VML roundrect for Outlook), real text
   label, ≥ 44×44px — not a bare styled link, not a background-less image.
5. Type designed **fallback-first**: a committed web-safe stack carries the voice; webfont is an
   `@media`/MSO-guarded enhancement; no banned face as the stated primary.
6. **Dark mode** handled: `color-scheme` meta + `prefers-color-scheme`, dark logo swap, no
   vanishing transparent marks, button/text contrast still ≥ 4.5:1 / 3:1 after inversion.
7. **Images-off** safe: meaningful alt on every img (decorative `alt=""`), no headline/CTA living
   only inside an image, container background colours set, healthy text-to-image ratio.
8. Semantic + accessible: `lang`, real headings, logical source order for the stacked column,
   AA contrast, discernible link names, View-in-browser + unsubscribe present.
9. Tested on **real** Outlook (Word), Gmail web+app, Apple Mail **light + dark**, one mobile
   webview, plus images-off and inbox-preview passes — not previews alone.

## Anti-Patterns (the email AI-slop / breakage tells)
- **Designing it as a web page:** divs + flexbox/grid + a `<style>` block with no inline CSS —
  renders fine in the preview, collapses in Outlook and loses styling in Gmail.
- **Relying on `@media` for the core layout:** Gmail strips it in common configs, so the "mobile"
  layout never fires and the desktop layout squeezes onto the phone.
- **Image-only email:** the whole message (headline, body, button) baked into one big image —
  blank with images off, terrible for accessibility and the inbox impression.
- **CSS-only buttons:** a styled `<a>` with `padding`/`border-radius` and no VML — Outlook drops
  the padding and the button shrinks to bare underlined text with a tiny hit area.
- **Webfont as the design, no fallback plan:** the email only looks right in Apple Mail; Gmail and
  Outlook readers (the majority) get an unconsidered default because no real fallback was chosen.
- **Ignoring dark mode:** dark logo on inverted dark background disappears; black text on a
  now-dark panel becomes unreadable; button contrast collapses.
- **No / leaked preheader:** the inbox preview shows "View in browser | Unsubscribe" or raw URL
  fragments instead of a written hook.
- **Stacking that loses hierarchy:** multi-column desktop email that collapses into an
  undifferentiated single stack on mobile with no re-decided focal point (the email cousin of the
  responsive slop tell in `responsive-and-adaptive-layout`).
- **Banned primary face:** stating Inter / Roboto / Geist / Space Grotesk etc. as the email's
  typeface (per `references/ai-slop-banned-fonts.md`) — doubly pointless since most clients drop it
  anyway, so the *fallback* is what readers see.

## Sourcing authority (the asymmetry rule)
Grounds only in human design and email-standards authority — never an AI tool's email suggestions,
per `doctrine/design-doctrine.md` §2. Canonical sources for this skill:
- **Campaign Monitor / Litmus / Email on Acid** render-compatibility research and the
  long-standing **bulletproof-button** and **hybrid/spongy** community patterns (Stig Morten
  Myre, Rémi Parmentier "Mailgun/HTeuMeuLeu" Outlook/VML and dark-mode work, Fabio Carneiro / MailChimp).
- **The CSS / HTML email support data** (caniemail.com) as the standards-and-support basis —
  admissible as support evidence, not as AI endorsement.
- **WCAG 2.2** for the accessibility floor (`doctrine/references/wcag-2.2-criteria.md`).
- Borrows the responsive philosophy of `03-layout-grid-and-composition/responsive-and-adaptive-layout`
  (mobile-first, re-decide focal point, fluid sizing) and constrains it to email-client reality.

When an AI tool emits "a div-based responsive email with flexbox and an Inter webfont," treat
that as the convergent mean to *avoid* — it will break in Outlook and lose its font in Gmail.

## Decision Rules
| Condition | Email implementation choice | Wrong-choice failure |
|---|---|---|
| Outlook desktop is supported | Table layout and bulletproof fallback | Modern CSS silently breaks |
| Critical meaning is in an image | Recreate it in live text and alt text | Image blocking removes the message |
| Dark-mode inversion is likely | Test explicit colours and resilient assets | Logos and contrast disappear |

## Capability Contract
Read and edit are required for source and assets; test sends, rendering, and link checks are required for production claims. Sending to recipients, changing lists, or publishing campaigns requires separate authority.

## Degraded Mode
Without client rendering, deliver HTML and a conditional compatibility matrix. Stop before send when consent, sender identity, links, unsubscribe/legal content, or priority-client evidence is missing.

## Anti-Patterns
- **Web-page CSS in email:** use tables and supported inline styles.
- **Image-only message:** provide live text, alt text, and image-off resilience.
- **Hidden or absent unsubscribe:** provide the required clear control.
- **Untested dark mode:** inspect logo, text, background, and CTA contrast.
- **Desktop-only width:** use a fluid/hybrid mobile path.

## Outputs
| Artefact | Consumer | Evidence and acceptance condition |
|---|---|---|
| Production HTML email and plain-text alternative | Delivery platform | Structure survives target clients and image blocking |
| Client, dark-mode, accessibility, and link test matrix | QA and campaign owner | Priority clients, links, alt text, focus, and contrast pass |
| Asset, consent, sender, and compliance record | Operations and legal owner | Provenance, permissions, footer, and unsubscribe are verified |
- A stated email decision **before** markup: target-client matrix and how defensive to be; the
  responsive approach (fluid vs hybrid/spongy); the type plan **named fallback-first** (web-safe
  stack + optional guarded webfont, no banned primary); the dark-mode treatment (and dark logo
  swap); and the preheader intent.
- The email HTML itself, composed for the approved message rather than selected from a template:
  table-structured, inline-CSS, bulletproof action where needed, hidden preheader, dark-mode handling,
  and image-off alt strategy.
- A completed Email Render Checklist plus the list of clients tested (incl. a real Outlook and a
  real dark-mode pass), consistent with the Mission in `doctrine/design-doctrine.md` §0 and the AA
  floor in `doctrine/references/wcag-2.2-criteria.md`.

## Examples

A security-alert email prioritises the affected account, observed event, time, immediate protective
action, and recovery/support path. It does not inherit the hierarchy of a newsletter or receipt.
Design its image-off reading order first, then select only the compatibility patterns required by its
content. This is a decision example, not reusable markup or a layout template.

## References
- [`doctrine/design-doctrine.md`](../../../doctrine/design-doctrine.md) — §0 Mission (the authored
  choice must survive degradation), §2 sourcing-authority asymmetry and the banned-font
  non-negotiable.
- [`doctrine/references/wcag-2.2-criteria.md`](../../../doctrine/references/wcag-2.2-criteria.md) —
  contrast 4.5:1 / 3:1 (1.4.3, 1.4.11), target size ≥24/44px (2.5.8), non-text alt (1.1.1),
  reading order and accessible names — the AA floor email must still meet.
- `doctrine/references/ai-slop-banned-fonts.md` — the faces that may not be the stated primary
  typeface (doubly relevant because email usually shows the *fallback*).
- `doctrine/references/embedding-by-format.md` — webfont loading by format; email's partial
  `@font-face` support and why the fallback is load-bearing here.
- `references/email-bulletproof-patterns.md` — compatibility patterns selected after the message
  structure is designed: constrained model + document foundation, hybrid/spongy responsive, hidden preheader, bulletproof VML/anchor button,
  fallback-first type, dark-mode + logo swap, image-off resilience, accessibility.
- Pairs with `03-layout-grid-and-composition/responsive-and-adaptive-layout` (responsive
  philosophy, constrained to email) and `10-content-design-and-ux-writing/ux-writing-and-microcopy`
  (subject, preheader, and CTA wording — this skill places and renders them).
<!-- dual-compat-end -->
