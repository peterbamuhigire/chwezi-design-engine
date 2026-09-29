# Design Delivery Evidence

Use this record for meaningful visual changes. Link evidence; do not replace it with assertions.

## Scope

- Artefact and audience:
- Surfaces and states:
- Selected skills and neighbour routes rejected:
- Approved design direction:

## Decisions

| Decision | Options considered | Choice and reason | Constraint or trade-off |
|---|---|---|---|
| | | | |

## Verification

| Gate | Evidence | Result | Residual risk or waiver owner |
|---|---|---|---|
| Design doctrine | | | |
| Typography and licence | | | |
| Accessibility | | | |
| Responsive/platform states | | | |
| Render or implementation parity | | | |
| Performance, where applicable | | | |
| Content and localisation | | | |
| Slop detector (`node tools/slop-detector/cli.mjs --json <path>`) | | | |

## Slop-detector waivers

List every `chwezi-slop` waiver this change adds or relies on. The machine format is
`.chwezi/slop.json` (`scope` is `value`, `rule-in-file`, `file` or `project`) or an inline
`chwezi-slop-disable-next-line <rule> -- <who>: <evidence>` comment; see
`tools/slop-detector/README.md`. The reason must read "<who>: <evidence>". An agent may grant a
`value` waiver only; every wider scope needs a named human.

| Rule | Scope and location | Reason (`<who>: <evidence>`) | Granted by (human or agent) | Date | Recheck due |
|---|---|---|---|---|---|
| | | | | | |

## Machine-readable stage evidence

If a delivery manifest is used, keep these stages independent. Do not infer one stage from
another; use `NOT ASSESSED` with a reason when the environment or target application was not
available.

| Stage | Result (`PASS`, `CONDITIONAL`, `FAIL`, or `NOT ASSESSED`) | Evidence or unavailable reason |
|---|---|---|
| Generation | | |
| Reopen | | |
| Render | | |
| Visual QA | | |
| Accessibility | | |

For a stage marked `PASS`, the machine-readable manifest must contain one or more retained
evidence records, each with an allowed type (`command-log`, `retained-artifact`, or
`independent-review`), a reference, and `AUTOMATED` or `INDEPENDENT` verification. An owner
statement alone is not evidence. A stage marked `NOT ASSESSED` must retain the reason instead.

## Handoff

- Files or specifications produced:
- Unverified checks:
- Owner and next action:
