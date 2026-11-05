# DG6: the banned-font gate counts a quoted family name only where it is used as a font

Date: 6 November 2026. Branch `kaizen/2026-11`. Changes: `0398cdf` (matcher, gate comments, tests) and `afbce48` (a bounded search). Every figure below was measured on Linux with Node 22.23.1, Python 3.14.10, pytest 9.2.0 and PyYAML 6.0.2, from the repository root.

## Why

Five times on 5 November 2026, agent sessions that wrote scripts about model adaptation were blocked by `hooks/banned-font-gate.js`. The scripts quoted the term LoRA, which is also the name of a banned family. The writing followed a 2026 reading of CODE Magazine articles. One agent worked around the block by writing a placeholder with a zero in place of the letter O and replacing it afterwards.

The cause is `findBannedQuotedLiterals` in `hooks/lib/font-matcher.js`. Its own comment says it covers python-docx, python-pptx, openpyxl and JavaScript font-name setters. It matched any quoted literal equal to a banned family name, ignoring case, in every scanned file that is not a diagram or JSON file.

## Baseline (main at `6942ac7`, before any change)

| Measure | Result |
|---|---|
| Neutral payloads that are only a quoted term, not a font (14: nine Python, one each JavaScript, TypeScript, TSX, HTML, CSS) | 14 of 14 exit 2 (blocked) |
| A second batch of look-alikes (12) | 12 of 12 exit 2 |
| Real font assignments (36 in the first batch, 48 in the second) | 84 of 84 exit 2 |
| Control payloads that were already allowed (comment, longer string, URL, dict key, `.md` file, an approved face) | 7 of 7 exit 0 |
| `node hooks/test-banned-font-gate.js` | 45 of 45 |
| README validation commands, all 23 | exit 0 each |

So the false block is not limited to Python. It reproduced in `.js`, `.ts`, `.tsx`, `.html` and `.css`, for a comparison (`kind == "X"`), for a keyword argument of an unrelated call, and for a CSS `content:` string.

## The change

`findBannedQuotedLiterals` now reports a literal only when `isFontAssignmentContext` says the literal is used as a font. The contexts that count:

| | Context | Example, with X a banned family |
|---|---|---|
| A | The value of a font-named key, property or constant on the same line, including a font-named target with a subscript or call | `run.font.name = "X"`, `HEADING_FONT = "X"`, `{"font_name": "X"}`, `fontFace: "X"`, `font: 700 2rem "X"`, `ctx.font = '16px "X"'`, `rfonts.attrib[qn("w:ascii")] = "X"` |
| B | A literal inside the nearest named call, object or list, when that name contains font or typeface; also `rc("font", family=...)` | `Font(name="X")`, `font: { name: 'X' }`, `setFont("X")`, `registerFont(TTFont("X", f))`, `font=dict(family="X")`, `font_stack = [..., "X"]` |
| C | A WordprocessingML run-font attribute | `w:ascii="X"`, `qn("w:eastAsia"), "X"` |
| D | The face attribute of an HTML font tag | `<font face="X">` |

A literal anywhere else is not reported by this path. The CSS declaration check, the script and Tailwind stack check, the diagram and JSON handling, the ban list and the exemption globs are unchanged. No path exemption is used.

The scan is bounded: 300 characters back on the same line and 600 characters for the enclosing brackets. The second commit bounded the line search, which the first left unbounded.

## After

| Measure | Before | After |
|---|---|---|
| Neutral payloads blocked (26: 14 plus 12) | 26 of 26 | 0 of 26 |
| Real font assignments blocked (84) | 84 of 84 | 84 of 84 |
| Controls allowed (7) | 7 of 7 | 7 of 7 |
| `node hooks/test-banned-font-gate.js` | 45 of 45 | 131 of 131 |
| The 131-test file run against the original code | not applicable | 111 of 131: the 19 look-alike cases and one MultiEdit case fail, all 64 real-assignment cases pass |
| README validation commands (23) | all exit 0 | all exit 0 |

The 86 added tests are 19 not-a-font cases that must pass, 64 real font assignments that must still block, and 3 for the exemption glob and MultiEdit. The family names in those payloads are assembled from fragments, so the test file holds no quoted family name and does not trip the gate it tests. Each expectation is a literal exit code, not a value computed from the code under test.

Other results, before and after: the detector suite 119 tests (118 pass, 1 skipped), pytest 196 passed, the other six hook test files 73, 10, 61, 7, 12 and 10, the engine gate 102 of 102 skills, routing 94 fixtures at precision@1 95%, and the plugin manifest current.

### Time on large inputs

The hook has a 5-second timeout. Same inputs, original code then this code:

| Input | Original | Now |
|---|---|---|
| 20,000 quoted literals on one line | 10.13 s | 0.44 s |
| 100,000 quoted literals in a 1.3 MB one-line file | over 120 s (timed out) | 1.27 s |
| 50,000 lines, each a neutral literal | 52.51 s | 0.59 s |
| 10,000 real font assignments (many hits) | 5.75 s | 3.75 s |

## Acceptance

1. A quoted upper-case LoRA tag in a `.py` file is allowed: yes, fixtures `n02` and the test "Python list holding the upper-case adaptation tag".
2. The same in `.js` and `.ts` is allowed: yes. The false positive was reproduced for both, so the narrowing applies to every file type the path scans. No file-type carve-out was needed.
3. A python-docx font name, an openpyxl font name and a JavaScript font setter naming a banned family still block: yes, with 64 real-assignment tests and 84 probe payloads, all blocked before and after.
4. A real CSS `font-family` declaration still blocks: yes, in the existing tests and in two new ones.
5. The existing 45 hook tests still pass: yes, 45 of 45 unchanged inside the 131.

The stop condition did not fire. A second batch of 60 payloads (48 real forms and 12 look-alikes) was written after the first implementation to find a real assignment that slips through, and none did. Drafting that batch exposed gaps in the first version: a keyword that is not font-named inside a font-named call, a font-named keyword before a nested call, and a font-named target with a subscript. They were closed before the batch was run and before the commit. In total 117 probe payloads were run against both versions of the code.

## Limits

- A banned name assigned to a variable or keyword that is not font-named and is not inside a font-named call, for example `family = "X"` or `face = "X"`, is no longer reported by this path. The stack-aware checks still see CSS, `fontFamily` keys and Tailwind configuration.
- A condition that names a font on the same line as a quoted term can still block it, for example a ternary on `isFont`.
- Names built at run time, and unquoted names inside a longer string such as `ctx.font = "16px X"`, were not seen before and are not seen now.
- Matching is textual. Brackets inside string literals are not tracked.
- A file with tens of thousands of real hits still exceeds the 5-second timeout, because the original code counts lines from the start of the text for each hit. This is unchanged and was not part of DG6.
- The slop detector calls the same function for document-generator font assignments. It has no fixture for that path, so the change is covered only through the hook tests.
- `website-skills` carries a registered byte copy of `hooks/lib/font-matcher.js` (`scripts/vendor/chwezi-slop`). It differs from this file until it is re-vendored with `check-vendored-detector.py --sync-from`, and the portfolio drift check will report the byte drift.
- The installed plugin copy keeps the old matcher until the plugin is updated.
- The engine's post-edit slop hook reports banned-family findings on the existing fixtures of the test file, because they name banned families on purpose. None of the findings is in the added block.

## NOT_ASSESSED

Behaviour inside a live Claude Code session with the updated plugin, behaviour in other runners, and the false-negative rate on a real corpus of document-generation scripts.

## Rollback and review

Revert `afbce48` and `0398cdf`. Keep the new test cases as expected failures. Review when a banned family that is an ordinary word is added to the list, or when a document-generation library is added to the contexts.
