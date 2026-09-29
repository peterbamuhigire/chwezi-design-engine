# chwezi-slop: the design engine's deterministic slop detector

`chwezi-slop` turns the design engine's anti-slop doctrine into rules a machine can check. Rules
are data rows in `rules/registry.json`, keyed to the K5 AS1-AS7 overlay
(`doctrine/references/ai-slop-taxonomy.md`). Each row has an authority record, a provenance line,
a severity, a tier and a pair of fixtures. The detector enforces Chwezi doctrine, not
Impeccable's; see `THIRD_PARTY_NOTICES.md` at the engine root.

The static tier is Node ESM with no dependencies and makes no network calls. The browser tier
uses the consuming project's own locked Playwright and installs nothing.

## CLI contract (frozen for website M10-11 and dev M10-06)

```
node tools/slop-detector/cli.mjs [options] <file|dir|url>...
```

| Flag | Meaning |
|---|---|
| `--json` | Print the JSON report on stdout |
| `--tier immediate\|deep\|browser\|all` | `immediate`: block-severity mechanical rules. `deep` (default): all static rules. `browser`: rendered-page rules. `all`: both |
| `--rule <id>` / `--disable-rule <id>` | Run only, or skip, the named rules (repeatable or comma-separated) |
| `--mode persuade\|operate\|read\|experience` | Run only the rules whose `modes` include the mode (the same four values M10-10 binds to) |
| `--tokens <path>` | Token file for the drift rules |
| `--fail-on block\|warning` | Severity that fails the run (default `block`) |
| `--no-waivers` | Ignore every waiver |
| `--extra-rules <json>` | Load a data-only rule pack (repeatable) |
| `--allow-remote` | Allow non-local URLs in the browser tier |
| `--out <file>` | Also write the JSON report to a file |
| `--validate-registry` | Check the registry: schema, unique ids, implemented checks, fixtures, doctrine anchors |
| `--doctrine-consistency` | Font doctrine self-check (see below) |
| `--list-rules` | List the registered rules |

**Exit codes.** `0` means no failing findings. `2` means failing findings. `1` means an
operational failure, such as an unreadable target, an invalid waiver, an unknown rule or an
invalid pack. `1` takes precedence over `2`. Advisory findings never fail a run. Warnings fail
only with `--fail-on warning`.

**Report shape.**

```json
{
  "tool": "chwezi-slop", "version": "1.0.0", "registry_sha256": "…",
  "findings": [{ "rule": "gradient-text", "as_overlay": "AS4", "severity": "block",
                 "evidence_mode": "cli", "file": "src/app.css", "line": 12,
                 "snippet": "…", "message": "…" }],
  "not_assessed": [{ "rule": "design-system-color", "reason": "…" }],
  "waived": [{ "…finding…": "…", "waiver": { "source": "inline", "reason": "Peter Bamuhigire: …" } }],
  "errors": [], "summary": { "…": "…" }, "exit_code": 2
}
```

Browser findings carry `"evidence_mode": "browser"` and `"line": null`.

## Evidence modes

- **`cli`**: a static finding from source text: CSS, SCSS, LESS, HTML, Vue, Svelte, JSX and TSX,
  Tailwind class lists, CSS-in-JS template literals, `.py` font assignments, and the code fences
  inside Markdown. A `cli` finding is `MEASURED` evidence that the pattern is present in the source.
- **`browser`**: a finding from a rendered page at 390x844 and 1440x900.
- **`not_assessed`**: the rule could not run, for example no token source or no locked
  Playwright. It is never a pass.

AS6 (copy) has no built-in rule, because Digital Research owns written-copy slop. Copy rules load
as an `--extra-rules` pack that points at DRE or website phrase lists (M10-11).

## Severity ladder

- `block` needs a standard (a WCAG 2.2 success criterion), an engine doctrine line, or a dated
  house ruling. The schema rejects a `block` row that has none of these.
- `warning` needs an engine doctrine line.
- `advisory` covers rules whose only support is AI-tool ban evidence. They are reported and never
  fail a run.

## Waivers

Every waiver needs a reason in the form `<who>: <evidence>`. The reason must match
`^[^:\n]{2,80}: \S.{9,}$`. An invalid waiver makes the run exit `1`.

Inline waivers work in any comment syntax. In Markdown they count only inside code fences.

```css
/* chwezi-slop-disable-next-line decorative-side-stripe -- Peter Bamuhigire: status encoding paired with a text label */
/* chwezi-slop-disable-line <rule> -- <who>: <evidence> */
/* chwezi-slop-disable <rule>[,<rule>] -- <who>: <evidence> */  …  /* chwezi-slop-enable <rule> */
```

For a project file, create `.chwezi/slop.json`. The detector finds it by walking up from each
target and stops at the repository root.

```json
{
  "schema": 1,
  "tokens": "design/design-tokens.json",
  "waivers": [
    { "rule": "ai-beige-ground", "scope": "value", "value": "#f5f0e8",
      "reason": "Claude agent: paper colour matches the printed brand stock, brand book 2026",
      "granted_by": "agent", "date": "2026-09-29", "recheck_due": "2026-12-29" }
  ]
}
```

`scope` is `value` (the finding's snippet contains `value`), `rule-in-file`, `file` or `project`.
**Agents may grant `value` waivers only.** Any wider scope needs `"granted_by": "human"`. List
waivers in `templates/design-delivery-evidence.md`.

## Drift rules

The four drift rules are `design-system-font` (block), `design-system-color`,
`design-system-radius` and `design-system-font-size` (all advisory). They compare values with the
project's own tokens. The detector looks for the token source in this order:

1. `--tokens`
2. `"tokens"` in `.chwezi/slop.json`
3. the nearest `design-tokens.json`, in the website artefact shape
   `{"artifact":"design-tokens","tokens":{…}}`
4. the nearest DTCG file (`tokens.json` or `*.tokens.json`) with `$value` and `$type`

Colours match within a CIEDE2000 difference of 2.0, so OKLCH and hex round-trips and declared
neutrals do not flag. With no token source, the drift rules are reported as `not_assessed`.

## Browser tier

`--tier browser` resolves `playwright` or `@playwright/test` from the consuming project
(`<cwd>/package.json`). The package must pass the lock rule of website-skills
`scripts/require-locked-qa-tools.mjs`, reimplemented here:

- it is a direct dependency at an exact version;
- `package-lock.json` records it at that version;
- `node_modules` holds that version.

The tier applies these rules: `horizontal-overflow`, `clipped-positioned-child`, `text-occlusion`,
`content-hidden-at-rest`, `script-error`, `low-contrast-computed` and
`first-viewport-column-overflow`. It accepts local files, `file://` URLs and `http://localhost`
URLs. Remote URLs need `--allow-remote`, and without that flag requests to other hosts are
aborted.

## Hooks (Claude Code)

- `hooks/slop-immediate.js` runs on `PostToolUse` for `Write|Edit|MultiEdit`, with a 5-second
  timeout. It runs the `immediate` tier (block-severity rules only) on the edited file. When it
  finds a problem it exits `2`, so the model sees the finding and can fix the file in the same
  turn. Markdown files are only recorded for the deep pass, because their code fences often quote
  counter-examples.
- `hooks/slop-deep-pass.js` runs on `Stop`, with a 30-second timeout. It runs every static rule
  over the files edited in the session, skipping findings the immediate hook already reported
  (matched on rule, file and line). It blocks at most once per session and returns at once when
  `stop_hook_active` is true.
- Both hooks honour the plugin `hooks_enabled` setting and `CHWEZI_SLOP_HOOKS=off`, and fail open.
  The session ledger lives at `os.tmpdir()/chwezi-slop/<session_id>.json`. The PreToolUse
  `banned-font-gate.js` still runs first and still blocks. It shares `hooks/lib/font-matcher.js`
  with the detector's `banned-primary-font` rule.
- Codex and other runners have no hook runtime. They run the CLI from the skills' verification
  steps (degraded mode).

## Other commands

`--doctrine-consistency` fails when a family is both an approved baseline and banned. The
baselines are the `font-groups-and-usage.md` baseline lines and quick chooser, the
`pairing-principles.md` default pairings and the `pairing-catalog.md` pairing rows. A family
counts as banned if it is on a hard, secondary, monospace or prefix ban in
`ai-slop-banned-fonts.json`. The command also lists `fonts/<group>/<family>/` folders of banned
families, as a report only: removing a folder needs Peter's confirmation for each operation.

## Adding a rule

1. Add a registry row. Cite a doctrine line (`doctrine_ref`, using a heading anchor or a
   `rule:<id>` marker), the human authority, and any ban evidence. Give Impeccable ideas their
   commit.
2. Implement the check in `lib/checks.mjs`, or in `lib/drift.mjs` or `lib/browser-rules.mjs`.
3. Add `tests/fixtures/slop/<id>.flag.<ext>` and `.pass.<ext>`.
4. Run the checks:

```
node tools/slop-detector/cli.mjs --validate-registry
node --test tools/slop-detector/test/
python -X utf8 scripts/validate_engine.py --baseline tests/quality-baseline.json
```

`tests/quality-baseline.json` holds regression-only floors: `slop_rules` and `slop_fixtures`.

## Vendoring (website M10-11)

`tools/slop-detector/` depends on only two files outside itself:

- `hooks/lib/font-matcher.js`
- `doctrine/references/ai-slop-banned-fonts.json`

A vendored copy must keep those two paths relative to the tool. It must also record
`registry_sha256` so drift from the design engine can be detected.
