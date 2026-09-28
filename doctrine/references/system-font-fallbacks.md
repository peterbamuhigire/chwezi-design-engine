# Reference: Non-Slop, Device-Common System Fonts (zero-embed fallback tier)

Fonts that ship **pre-installed** on most devices (no embedding needed) **and** read as a
deliberate professional choice rather than slop. Use this tier when you cannot embed (e.g.
XLSX, constrained email, or a no-CDN environment), or as the safety-net fallback *after* a
chosen face. Using the platform's own typography on purpose is itself an authored choice — the
opposite of slop.

**Evidence basis (T1 primary sources), verified via the digital-research engine 2026-06-21:**
- Windows 11 bundled fonts — Microsoft: learn.microsoft.com/typography/fonts/windows_11_font_list
- macOS (Sonoma) fonts — Apple: support.apple.com/en-us/108939
- Apple system fonts (SF Pro / New York) — developer.apple.com/fonts/system-fonts
- Android defaults (`serif` → Noto Serif, `sans-serif` → Roboto) — AOSP `fonts.xml`
- Office Cloud Fonts + Calibri→Aptos transition — Microsoft (2023)

---

## The flagship non-slop device-common serif: **Georgia**

Confirmed on Windows 11 (T1), macOS (T1), and Apple mobile, ~97–99% desktop install rate.
Designed for screens, reads as a deliberate editorial choice, and appears on **no** AI-tell
list. This is the best "professional default serif" when you can't embed Andada Pro et al.

## Borderline rulings (asked and answered)

- **Georgia** — best non-slop universal serif. Use freely as fallback or low-embed default.
- **Segoe UI** — credible deliberate sans **on Windows only** (the Windows system UI font; not
  an AI tell). Won't render on macOS/iOS/Android — use only inside a fallback chain.
- **Times New Roman** — not slop; reads as institutional/legal. Deliberate in formal/legal
  contexts, lazy elsewhere. Genuinely cross-platform.
- **Calibri** — not slop, but **dated**: Office default for ~17 years, now demoted in favour of
  **Aptos**. Signals "2010s corporate," not AI. Acceptable Windows/Office fallback only.
- **Aptos / Book Antiqua / Garamond** — **not** confirmed bundled across all OSes; use only when
  you control the environment, never as a universal fallback.

---

## Recommended tiered fallback stacks (only widely-installed, non-slop faces)

Each chains one credible face per ecosystem (Apple → Windows → Office → Android generic) and
ends with the CSS generic keyword so Android resolves to Noto Serif / Roboto.

**Editorial serif** (zero-embed flagship):
```css
font-family: Charter, "Iowan Old Style", Georgia, Cambria, "Noto Serif", "Times New Roman", serif;
```

**Neutral sans** (system-native, never an AI tell — deliberately avoids Inter/Geist/Poppins):
```css
font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

**Monospace** (code / tabular):
```css
font-family: "SF Mono", "Cascadia Code", Consolas, "Roboto Mono", "Courier New", monospace;
```

> These are the *fallback* tier. The **preferred** path is still a deliberate embedded face from
> `font-groups-and-usage.md` (Andada Pro, Public Sans, Clash Display, etc.). Reach for system fonts
> when embedding is impossible or as the safety net after the chosen face — never instead of a
> deliberate choice when embedding is available.

## Caveats (do not over-claim)

- Android does **not** ship Georgia/Times/Palatino as real files — it *aliases* them onto
  Roboto/Noto. Only the generic `serif`/`sans-serif` keywords reach real Android fonts; that's
  why each stack ends with a generic keyword.
- cssfontstack install percentages are community estimates (T4), directional only.
- The neutral-sans stack's `Roboto` link is the Android default — acceptable *inside a system
  chain* even though Roboto is banned as a *primary deliberate* choice; the chain is the
  authored decision, not the individual link.
