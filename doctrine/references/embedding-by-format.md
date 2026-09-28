# Reference: Loading & Embedding Fonts by Output Format

How to actually get the chosen font into each artifact so it renders as designed everywhere.

---

## Websites (HTML / CSS)

- Self-host or use Google Fonts. For artifacts that render inline in a chat/preview,
  base64-embed the `@font-face` source or pull from the Google Fonts CDN — external local paths
  may not resolve.
- Declare with `@font-face` (or a Google Fonts `<link>`), then apply via `font-family` with the
  fallback listed **after** the chosen face — the fallback is a safety net, not the design.
- Prefer **woff2** (smallest). Use a **variable font** where available — one file, all weights,
  enables the weight extremes the doctrine calls for.

```css
@font-face {
  font-family: "Andada Pro";
  src: url("/fonts/AndadaPro-Variable.woff2") format("woff2");
  font-weight: 400 840;
  font-display: swap;
}
:root { --font-display: "Andada Pro", Georgia, serif; }
```

## DOCX

- Set the chosen font by name throughout.
- **Embed** the font so it renders on machines that lack it (Word → File → Options → Save →
  "Embed fonts in the file"). Without embedding the recipient sees a substitute.
- Turn on **"Embed only the characters used"** (subsetting) — can cut a 250 KB font to 20–50 KB.
- Embed only fonts whose licence permits it (see `licensing-and-embedding.md`).

## PPTX

- Same as DOCX: apply by name, embed for portability, subset to control size. (File → Options →
  Save → "Embed fonts in the file.")

## PDF

- PDFs embed fonts by default at generation time — identical output everywhere. **Best format
  for guaranteed typographic fidelity** in client deliverables.
- Confirm the generating library actually embeds rather than referencing system fonts.

## XLSX

- Apply by name. Excel does **not** support true embedding — it references by name with
  fallback. For pixel-perfect branded output, deliver as **PDF** instead.

---

## File-size budget (embedded documents)

- Embedding adds ~the font's on-disk size **per weight/style**, not per family.
- A four-style family (~150 KB each) adds ~600 KB unsubsetted; subsetting typically cuts this
  80–90%. For one or two custom weights in a branded document, a few hundred KB is negligible.
- Variable fonts and subsetting are the two levers; use both.
