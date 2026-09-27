# Worked example: Co-operative market-day newsletter

> Fictional sample: the co-operative, venue, date, event details, and copy below
> are invented for design illustration. Replace and verify all organization,
> location, date, contact, and campaign details before real use.

## Brief

Send a monthly update to members of a regional growers' co-operative. The email should help members find the next market day and understand what to bring. Assume readers may use a phone, have images disabled, or use an email client that ignores embedded styles.

## Before markup: design decision

- **Target clients:** Gmail web and app, Outlook desktop, and Apple Mail on iPhone. No client rendering has been run for this example; it is a design handoff, not a production-ready or tested email.
- **Layout:** one 600 px maximum-width, table-based column that becomes fluid on narrow screens. The main message and action stay in live text.
- **Type:** Fraunces for an optional display enhancement, with Georgia as the committed serif fallback for headings and body copy. The fallback carries the intended warm, editorial voice when a client drops the webfont. Arial appears only in the final generic sans-serif fallback tier for interface labels.
- **Colour:** deep forest `#183B32` for headings and the action button, warm paper `#FFF9EF` for the canvas, and dark ink `#252923` for body text. Recheck contrast after rendering, including dark mode.
- **Dark mode:** provide a dark logo asset if a logo is added; keep the heading and action as live text with explicit colours and inspect how each target client rewrites them.
- **Preheader:** name the useful detail rather than repeat the subject.

## Inbox copy

**Subject:** Bring your harvest to Saturday's market

**Preheader:** Stall setup begins at 7:30 a.m.; here is the short checklist.

## Email content and order

1. A visible “View this email in your browser” link.
2. Co-operative name in live text; no logo is required to understand the sender.
3. Heading: **Saturday market: your five-minute checklist**
4. Intro: “The next members' market is Saturday, 17 October, at the Kijani Community Hall. Stall setup opens at 7:30 a.m.”
5. Checklist:
   - Bring your produce labels and current price list.
   - Pack a table covering and reusable bags.
   - Arrive by 8:15 a.m. if you need help unloading.
6. A text-labelled action button: **Read the market-day guide**. The destination must be a verified, working link before send.
7. Contact line: “Questions? Reply to this email or call the co-operative office.” Add the verified phone number at production time.
8. Footer with the co-operative's postal address and a clear unsubscribe link.

## Compatibility handoff

Build the content with presentation tables, inline styles, a fluid outer container, and a padded text link for the action. Keep the subject's promise, event time, checklist, and contact path available as text when images are blocked. The sample contains no live campaign URL, sender address, or phone number; those are unresolved production inputs.

| Check | Example status |
|---|---|
| Reading order and image-off copy | Specified; inspect in the rendered message |
| Gmail and Outlook rendering | Not run |
| Apple Mail light and dark mode | Not run |
| Button destination and contact details | Unresolved; verify before send |
| Consent, sender identity, and unsubscribe destination | Unresolved; verify before send |

This example demonstrates the design handoff only. It does not claim that a campaign was rendered, tested, sent, or approved.
