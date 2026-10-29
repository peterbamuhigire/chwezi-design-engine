# Example: service decision path diagram specification

**Status:** illustrative specification; no project or client facts are asserted.

## Reader question

What are the review steps from a confirmed need to a decision?

## Nodes and supported relationships

| Order | Node | Relationship | Evidence status |
|---:|---|---|---|
| 1 | Confirm need | Leads to prepare options | Example sequence supplied in this specimen only |
| 2 | Prepare options and risks | Leads to review | Example sequence supplied in this specimen only |
| 3 | Review decision | Ends in approve or revise | Example outcome supplied in this specimen only |

## Visual and accessibility decisions

- Use a left-to-right three-step sequence on wide screens and a vertical sequence at narrow widths.
- Label each step with a number and verb; use arrows to show order.
- Keep each step as text plus a token-based border and accent; colour is not the only cue.
- Add a text equivalent: “Confirm need, prepare options and risks, then review for approval or revision.”

## Handoff checks

- Attach the editable SVG source and the exported output.
- Render at the target page width and inspect text, arrow direction, clipping, and contrast.
- Verify that the domain owner approves the sequence before production; otherwise mark production use `NOT ASSESSED`.
