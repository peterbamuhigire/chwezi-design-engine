# Reference: Font Pairing Principles

A single font used for everything is a slop signal. Always pair: a distinctive display face
with a refined body face. This file distils the working rules from the design literature in the
Chwezi library so the choice is principled, not random.

**Sources:** Douglas N. Bonneville, *The Big Book of Font Combinations* (the 29 principles);
Ran Segall, *Complete Guide to Choosing Fonts* (Flux Academy); Massimo Vignelli's go-to set.

---

## The core moves

1. **Cross categories for contrast.** Pair serif with sans-serif. The farther apart the
   styles, the better — it draws the eye down the page and keeps sections distinct. (Bonneville
   1–3; Segall.)
2. **Don't pair two serifs or two sans-serifs** unless they are *radically* different. Two
   faces from the same category rarely give enough contrast. (Bonneville 2–3.)
3. **The golden combination:** a distinctive header sans against a neutral body serif (or
   vice-versa). One face is expressive, the other recedes. (Bonneville 25.)
4. **Match x-heights and glyph widths even across categories.** Futura + Times New Roman fails
   because the x-heights and widths clash. Check the lowercase `o` and `a`. (Bonneville 6–7.)
5. **Contrast weight, not just style.** Heavy display against light body reads as deliberate;
   two heavy faces (e.g. Didot + Rockwell) fight. Use weight *extremes* — 100/200 against
   800/900, never 400 against 600. (Bonneville 8; Chwezi rule.)
6. **Avoid the muddy middle.** Faces should either clearly contrast or clearly concord — never
   sit in the ambiguous zone where they merely clash. (Segall.)
7. **Don't mix moods.** A light-hearted Gill Sans won't sit with an all-business Didot. Either
   match moods or pair one personality face with one neutral. (Bonneville 26.)
8. **Assign distinct roles and commit.** Header / body / accent — never swap roles mid-design.
   (Bonneville 5, 21; Segall.)
9. **Two typefaces, many fonts.** Prefer using the weights/italics *within* two families
   (Regular, Medium, Bold, Black, italics = many "fonts") before adding a third typeface. Cap
   at three typefaces. (Bonneville 13, 21; Segall.)
10. **Make it obvious.** If the contrast isn't clear, the hierarchy breaks. When unsure, push
    the contrast further, not less. (Bonneville 28.)
11. **Don't mix monospace with proportional in the same role.** Monospace is for code/data/
    labels, not body. (Bonneville 24.)
12. **Test the pair at real sizes and on real devices.** A pair that fails at one size can work
    at another; a pair that works on desktop can fail on mobile. (Bonneville 17, 23; Segall.)

---

## The Chwezi default pairings (safe, non-slop starting points)

| Context | Display / Header | Body |
|---|---|---|
| Editorial document | Andada Pro (or Newsreader) | Source Serif 4 / Public Sans |
| Technical / dashboard | Public Sans (Bold) | Public Sans (Regular, `tabular-nums`) + JetBrains Mono accents |
| Startup / product | Clash Display (premium) or Bricolage Grotesque | Satoshi (premium) / Hanken Grotesk |
| App / web body layer | Bricolage Grotesque | Hanken Grotesk |

Always **state the pairing and the one-line reason** before producing the artifact, and confirm
neither face is on the banned list.
