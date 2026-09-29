# Reference: Bulletproof HTML Email Patterns

The pattern library for `email-and-newsletter-design`. Email's rendering environment is hostile and
inconsistent: the single most common desktop engine (Windows Outlook 2007–2024) renders with
**Microsoft Word**, Gmail strips/scopes CSS and force-inverts dark mode, and webfonts fail silently
in most clients. Every pattern below is built to **degrade into a still-correct layout**. Grounds in
human/email-standards authority per [`doctrine/design-doctrine.md`](../../../../doctrine/design-doctrine.md)
§2 (Litmus, Email on Acid, Campaign Monitor, Rémi Parmentier, Stig Morten Myre; support data from
caniemail.com), never an AI tool's email suggestions.

---

## 1. The constrained model (what email actually supports)

Design *within* these, do not fight them:

- **Layout = nested HTML `<table>`s**, not `div` + flexbox/grid (none of which Outlook supports).
- **CSS = inline on every element.** A `<style>` head block is **enhancement only** — Gmail strips
  or scopes it, several clients ignore it. Anything that must render goes inline.
- **One root container** at a fixed max width — **600px** is the safe convention (fits the Outlook
  reading pane and mobile). Center it with an outer 100%-width table.
- **Presentational attributes still matter:** `role="presentation"`, `cellpadding="0"`,
  `cellspacing="0"`, `border="0"`, `align`, `valign`, explicit `width` on `<td>`. Outlook's Word
  engine relies on these, not on CSS box-model.
- **No:** flexbox, grid, `position`, float-based columns, background-image without VML fallback,
  external/JS, form elements you depend on, most pseudo-classes, `rem`/`vw` units (use `px`).
- **Partial:** `@media` (Gmail strips in several configs), `@font-face` (most clients drop),
  `border-radius`/`box-shadow` (ignored by Outlook), `padding` on `<a>` (ignored by Outlook).

---

## 2. Document foundation pattern (MSO conditionals + meta)

```html
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml"
      xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!-- Opt in to dark mode and tell clients which schemes you actually support -->
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings>
    <o:PixelsPerInch>96</o:PixelsPerInch>   <!-- fixes Outlook DPI image scaling -->
  </o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style>
    /* ENHANCEMENT ONLY — never the load-bearing layer. */
    body{margin:0;padding:0;width:100%!important;-webkit-text-size-adjust:100%;}
    img{border:0;line-height:100%;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
    table{border-collapse:collapse!important;}
    /* Mobile enhancement (Gmail may strip — do not depend on it) */
    @media screen and (max-width:600px){
      .col{display:inline-block!important;width:100%!important;}
      .px-24{padding-left:16px!important;padding-right:16px!important;}
    }
  </style>
</head>
```

`PixelsPerInch=96` is the canonical fix for Outlook scaling images up. `mso` conditionals are how
you feed Outlook-only or hide-from-Outlook markup.

---

## 3. Responsive: fluid vs hybrid/spongy (pick the model)

**Hybrid / "spongy"** is the most robust because it does **not** depend on `@media` (which Gmail
strips). Columns are `inline-block` cells that wrap naturally on narrow screens, while Outlook is
fed fixed-width **ghost `<td>`s** inside MSO conditionals so it keeps the columns side by side.

```html
<!-- Outer centering table -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background:#f4f2ee;">
  <tr><td align="center" style="padding:24px;">
    <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
           style="max-width:600px;margin:0 auto;background:#ffffff;">
      <tr><td style="font-size:0;text-align:center;">
        <!-- Ghost columns hold Outlook; inline-block lets others stack -->
        <!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td width="300" valign="top"><![endif]-->
        <div class="col" style="display:inline-block;width:300px;max-width:300px;vertical-align:top;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:#1a1a1a;">
              Left column. On a phone this cell drops below the right one; in Outlook the ghost
              table keeps both side by side.
            </td></tr>
          </table>
        </div>
        <!--[if mso]></td><td width="300" valign="top"><![endif]-->
        <div class="col" style="display:inline-block;width:300px;max-width:300px;vertical-align:top;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="padding:24px;font-family:Georgia,'Times New Roman',serif;font-size:16px;line-height:1.5;color:#1a1a1a;">
              Right column.
            </td></tr>
          </table>
        </div>
        <!--[if mso]></td></tr></table><![endif]-->
      </td></tr>
    </table>
    <!--[if mso]></td></tr></table><![endif]-->
  </td></tr>
</table>
```

- **Fluid** (single `width:100%; max-width:600px` table) is simplest — use for one-column
  newsletters and transactional email.
- **Mobile-first `@media`** stacking (`.col{width:100%!important}`) is a fine *enhancement* on top
  of the hybrid structure but must never be the only thing making it responsive.
- `font-size:0` on the wrapping cell removes the whitespace gap between inline-block columns;
  reset `font-size` inside each cell. Carry the focal-point discipline from
  `responsive-and-adaptive-layout` §8 — order cells so the stacked single column reads correctly
  and still leads with the primary block.

---

## 4. The hidden preheader (inbox preview text)

First node inside `<body>`, before any visible content. Hide it, then **pad** with
zero-width-non-joiner + non-breaking-space entities so the client does not pull the next visible
line ("View in browser…") into the preview.

```html
<body style="margin:0;padding:0;background:#f4f2ee;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;
              font-size:1px;line-height:1px;color:#f4f2ee;opacity:0;">
    Your March field notes: three soil-moisture findings from the Mbarara trial &mdash; and the
    one that surprised us.
    &#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;
  </div>
  <!-- visible content follows -->
```

`mso-hide:all` hides it from Outlook; `display:none;max-height:0;overflow:hidden` covers the rest.
The wording is a `ux-writing-and-microcopy` decision (a written hook, not a label dump); this
pattern only governs placement and hiding.

---

## 5. The bulletproof button (padded anchor + VML for Outlook)

A button must be clickable, correctly sized, and visible with images off. Use a real text anchor
(never a background-less image) with inline background + padding, and add a **VML roundrect** for
Outlook (which ignores `padding` and `border-radius` on links).

```html
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr><td align="center">
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
      href="https://example.org/read" style="height:48px;v-text-anchor:middle;width:240px;"
      arcsize="12%" strokecolor="#0b5d4a" fillcolor="#0b5d4a">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;">
        Read the field notes
      </center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-- -->
    <a href="https://example.org/read"
       style="display:inline-block;background:#0b5d4a;color:#ffffff;
              font-family:Helvetica,Arial,sans-serif;font-size:16px;font-weight:bold;
              line-height:48px;text-align:center;text-decoration:none;
              min-width:200px;padding:0 20px;border-radius:6px;mso-padding-alt:0;">
      Read the field notes
    </a>
    <!--<![endif]-->
  </td></tr>
</table>
```

- The `line-height:48px` + `min-width:200px` + `padding` gives a ≥ **44×44px** target per
  [`wcag-2.2-criteria.md`](../../../../doctrine/references/wcag-2.2-criteria.md) §2.5.8.
- The VML `fillcolor`/`arcsize` reproduces the rounded fill in Outlook; `<w:anchorlock/>` keeps the
  text fixed.
- Button fill must keep **≥ 4.5:1** text contrast and **≥ 3:1** against its surround (§1.4.3/1.4.11)
  — re-check after dark-mode inversion (§7).
- A real text label means the button still reads with images off.

---

## 6. Type: fallback-first (the webfont will usually be dropped)

**Support reality:** Apple Mail, iOS Mail, and the Outlook *app* can load an `@font-face`/linked
webfont; **Gmail (all platforms), Windows/Mac Outlook desktop, Yahoo, AOL and many others strip
it** and render your fallback. So the email must look right in the **web-safe stack first**, with
the webfont layered as an enhancement.

**Pick a non-banned brand webfont** per [`design-doctrine.md`](../../../../doctrine/design-doctrine.md)
§2 / `ai-slop-banned-fonts.md` — never Inter, Roboto, Open Sans, Lato, Arial-as-primary, Geist,
Space Grotesk, Montserrat, Poppins. Then commit a web-safe fallback that **carries the same voice**:

| Voice | Brand webfont (enhancement) | Committed web-safe fallback stack (the real design in most clients) |
|---|---|---|
| Editorial / literary serif | Andada Pro, Spectral, Source Serif 4 | `Georgia, 'Times New Roman', Times, serif` |
| Formal / institutional serif | Source Serif 4, Libre Caslon Text | `Georgia, Cambria, 'Times New Roman', serif` |
| Modern product grotesque | (non-banned grotesque, e.g. Work Sans/Public Sans) | `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| Friendly humanist sans | (non-banned humanist) | `Tahoma, Verdana, Segoe, sans-serif` |
| Technical / data / mono | JetBrains Mono, Fira Code | `'Courier New', Courier, monospace` |

Arial/Helvetica/Georgia/Verdana/Tahoma/Courier are acceptable **as fallback tiers** — they are the
universally installed email-safe faces — but never stated as the *primary* design face.

**Declare it so Outlook never tries the webfont** (Outlook + webfont = reflow bugs):

```html
<!--[if !mso]><!-->
<style>
  @media screen {
    @font-face {
      font-family:'Andada Pro';
      font-style:normal; font-weight:400;
      src:url('https://example.org/fonts/AndadaPro.woff2') format('woff2');
    }
  }
  .display{font-family:'Andada Pro',Georgia,'Times New Roman',serif!important;}
</style>
<!--<![endif]-->
```

Wrapping the `@font-face` in `<!--[if !mso]>` hides it from Outlook entirely; the inline
`font-family` on each element still lists the fallback after the webfont, so every client gets a
correct, voice-consistent result. **The fallback is the design** — judge the email in the fallback
before adding the webfont. See `doctrine/references/embedding-by-format.md` for the cross-format
webfont rules.

---

## 7. Dark mode (colours get rewritten under you)

Three coexisting behaviours: **Apple Mail / iOS** may fully invert; **Outlook (Win/Mac/app)** often
fully inverts; **Gmail** does a partial/forced inversion of light backgrounds you cannot fully
control. Opt in and defend the vulnerable elements:

```html
<style>
  :root { color-scheme: light dark; supported-color-schemes: light dark; }
  @media (prefers-color-scheme: dark) {
    .bg-page    { background:#11130f !important; }
    .bg-card    { background:#1b1d18 !important; }
    .text-body  { color:#eceae4 !important; }
    .text-muted { color:#b8b5ac !important; }
    /* keep button readable after inversion */
    .btn-bg     { background:#3ea17f !important; }
    /* swap logo: hide light-mode mark, show light-on-dark mark */
    .logo-light { display:none !important; }
    .logo-dark  { display:inline-block !important; max-height:none !important; }
  }
</style>
...
<a href="https://example.org">
  <img class="logo-light" src="logo-dark-ink.png"  width="160" alt="Maduuka Field Lab">
  <!--[if !mso]><!-->
  <img class="logo-dark"  src="logo-light-ink.png" width="160" alt="Maduuka Field Lab"
       style="display:none;max-height:0;overflow:hidden;">
  <!--<![endif]-->
</a>
```

Rules:
- **Swap the logo** — a dark-ink logo on an inverted dark panel disappears; show a light-ink
  version via the dark media query (and hide the light one).
- **No naked transparent marks** on dark — give icons a background plate or halo so they survive
  inversion.
- **Re-check contrast** of every text/button pair after inversion: body ≥ 4.5:1, large/UI ≥ 3:1
  per [`wcag-2.2-criteria.md`](../../../../doctrine/references/wcag-2.2-criteria.md) §1.4.3/1.4.11.
- Test on a **real device** in dark mode — previews do not reproduce Gmail/Outlook forced inversion.

---

## 8. Image-off resilience

Many clients block images until the reader opts in. The email must communicate with **zero images
loaded**:

- **Meaningful `alt` on every `<img>`**; decorative spacers get `alt=""` (so screen readers skip
  them). Style the alt where honoured (inline `color`/`font-size`/`font-family` on the `<img>`
  shows readable text in the broken-image box).
- **Never put the only copy of a headline or a button label inside an image.** Live HTML text for
  both — the bulletproof button (§5) already does this.
- **Background colours** on image containers so the layout does not collapse to white voids; for a
  hero background image, provide a `bgcolor` and (Outlook) a VML `<v:rect>`/`<v:fill>` fallback.
- **Healthy text-to-image ratio.** Image-heavy emails read as broken with images off and skew the
  inbox impression. Set explicit `width`/`height` on every image to reserve space and avoid reflow.

```html
<img src="hero-trial-plot.jpg" width="600" height="300" alt="Soil sensors staked across the Mbarara trial plot"
     style="display:block;width:100%;max-width:600px;height:auto;background:#dcd8cf;
            font-family:Georgia,serif;font-size:14px;color:#5a564d;" />
```

---

## 9. Accessibility checklist (the AA floor for email)

Per [`wcag-2.2-criteria.md`](../../../../doctrine/references/wcag-2.2-criteria.md):

- `lang` on `<html>`; charset + viewport meta set.
- `role="presentation"` on **every layout table** so screen readers skip scaffolding and read
  content in order.
- **Real heading tags** for hierarchy; do not fake headings with bold spans.
- **Logical source order** — the DOM order is the mobile single-column reading order; arrange cells
  so the stacked view reads correctly and leads with the primary block.
- **Contrast:** body text ≥ **4.5:1**, large text / UI ≥ **3:1** (1.4.3, 1.4.11) — in **both** light
  and dark.
- **Discernible link text** — "Read the field notes", never "click here"; links distinguishable by
  more than colour.
- **Touch targets ≥ 44×44px** (2.5.8) for every tappable link/button.
- **Meaningful alt** (1.1.1); decorative images `alt=""`.
- Visible **"View in browser"** and (marketing) **unsubscribe** link.
- Avoid conveying meaning by colour alone; do not rely on animated GIFs for essential content
  (first frame must carry it).

---

## 10. Pre-send render matrix (test on real clients)

| Client | Why it matters |
|---|---|
| **Outlook desktop (Windows, Word engine)** | The harshest target — VML buttons, ghost tables, no padding-on-link, DPI scaling. If it passes here it passes most places. |
| **Gmail web + Gmail app (iOS/Android)** | Strips `<style>`/`@media` in common configs; forced dark-mode inversion; clips overly large emails ("[Message clipped]"). |
| **Apple Mail + iOS Mail (light AND dark)** | Honours webfonts and full dark inversion — the dark-mode and logo-swap proof. |
| **Yahoo / Outlook.com / one mobile webview** | Catches remaining `@media` and inline-CSS edge cases. |
| **Images-off pass** | Confirms alt text, live-text headline/CTA, container backgrounds. |
| **Inbox preview pass** | Confirms the preheader shows and nothing leaks. |

Automated preview tools (Litmus / Email on Acid) catch layout regressions; only a **real Outlook**
and a **real dark-mode device** reliably catch the two things that break most often.
