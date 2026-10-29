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

## Source and layout contract

- Keep the source as SVG for this simple fixed diagram. Use a separate source file rather than embedding a raster screenshot in the report.
- Set a descriptive title and description in the SVG and provide equivalent nearby text in the document. The figure caption identifies it as illustrative.
- Align the three nodes on one horizontal axis. Use equal node dimensions and spacing so that the connectors read as sequence rather than rank or measured duration.
- At a narrow viewport, stack the nodes vertically and rotate connectors downward. Preserve the order and keep every label visible without horizontal scrolling.
- Use one accent border for the middle “prepare” step. Numbered step labels and arrow direction also communicate sequence, so the accent colour is not the sole cue.

## Review record

| Check | Evidence to attach | Result for this example |
|---|---|---|
| Meaning and ownership | Approved step list and named process owner | `NOT_ASSESSED`; the sequence is only an example |
| Source and renderer | SVG source and renderer/version record | SVG source is required; renderer record must be added at production time |
| Legibility | Desktop and narrow-width renders | Must be inspected after the actual page width is selected |
| Accessibility | Text equivalent, title/description, contrast, and focus order if interactive | Text equivalent is drafted; contrast and interaction checks remain pending |
| Export | Final document or interface preview | `NOT_ASSESSED` until tested in the target application |

Do not fill the owner-approval gap by inventing durations, accountable roles, service-level commitments, or decision authority. If the process owner changes the order or adds a condition, update both the source nodes and the text equivalent, then render and review again. If the diagram becomes dense, break it into two views or use a concise table before reducing label size. The handoff is complete only when the receiving implementer can identify the source, target medium, missing evidence, and the review needed before publication.
