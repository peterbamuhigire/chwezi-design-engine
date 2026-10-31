# README kaizen record, 2026-10-31

A scoped Portfolio Kaizen micro-cycle (Observe, Baseline, Select, Experiment, Check, Standardise, Teach, Re-measure) on one file: the repository `README.md`. Peter Bamuhigire asked for READMEs that read "smarter and better overall". The cycle changed documents only. It touched no skill body, script, test, doctrine file, detector file or font file. **It publishes no score.** The audit score of the October cycles (raw 60.3 out of 100, see [pass-2 final report](../2026-10-engine-kaizen-pass-2/05-final-report.md)) is neither re-measured nor changed here.

Starting point: branch `main` at `8976b0e`, clean working tree. Work branch: `kaizen/2026-10-readme-kaizen`.

## 1. Observe

The README was one reference document of 8,666 words with five top-level sections and no contents list. The front door was two paragraphs of 188 and 158 words. The first runnable command was at line 15. The skill table (102 rows, about 1,600 words) and the reference list (162 entries, about 2,200 words) made up about 43 percent of all words. The October improvement account sat as a subsection inside "Quality and improvement", so that one H2 section held 2,462 words.

Baseline measured with a read-only helper on the starting commit (the helper is not in this repository; each measure is defined below):

| Measure | Meaning | Baseline |
|---|---|---:|
| `words` | Words outside code fences | 8,666 |
| `h2` | Second-level headings | 5 |
| `toc` | 1 if an in-page contents list comes before the third H2 | 0 |
| `first_cmd` | Line of the first fenced code block | 15 |
| `longest_sec` | Words in the longest H2 section | 2,462 |
| `long_lines` | Lines over 300 characters | 41 |
| `max_line` | Longest line, in characters | 1,297 |
| `sent_len` | Mean words per sentence in paragraphs | 16.9 |
| `fre` | Flesch reading ease of paragraphs (higher is easier) | 47 |

Readers had four problems. They met a long definition before any command. They had no contents list. The two bulky lists sat between the capabilities table and the quality section. The figures in the improvement account were buried in 14 numbered paragraphs of 100 to 200 words each.

Validators ran on a clone of the starting commit before any edit: 24 runs, all exit 0 (list in section 4).

## 2. Select

| Item | Decision | Reason |
|---|---|---|
| R1 Front door | Applied | Purpose, audience, "At a glance" (six measured facts) and "Start here" (three numbered steps with exact commands) now fill the first 35 lines |
| R2 Contents | Applied | A contents list of the H2 sections follows the opening; the preservation check resolves every in-page link |
| R3 Structure | Applied | No H2 section is over 1,200 words. The improvement account became two H2 sections; Validation and Install gained H3 subsections |
| R4 Find the right skill | Applied | A 12-row task table. Each skill exists on disk, and each is the expected skill of a prompt in `tests/routing-fixtures.yml` |
| R5 No walls of text | Applied | Paragraphs split, table cells kept to 35 words or fewer, nested bullets used for evidence lines |
| R6 Plain English | Applied | Shorter sentences; terms defined at first use ("slop"); British English; no marketing language |
| R7 Say it once | Applied | The banned-font list appears once (section "Font doctrine in brief"); skill-count mentions cut; the improvement account tightened. Process narrative was already in the evidence records |
| R8 Relocate bulk | Applied to two blocks | See below |
| "What it does not cover" | Added | The engine tour in `chwezi-engine-agents` says the README states what the engine does not cover. It did not, so a short section now says it, using only statements the router and the open findings already make |
| Contributing, author, licence | Added | The skeleton asks for it; each line was checked against `CONTRIBUTING.md`, `LICENSE` and `.claude-plugin/plugin.json` |

**R8 conditions, checked before moving anything.** No script, test, manifest, router or workflow reads the README (`git grep` for the README path and for the section names across `scripts/`, `tests/`, `hooks/`, `tools/`, `.github/`, `.skills-engine/`, `.claude-plugin/` and `governance/` found only unrelated `README.md` mentions of other folders). No file links to a README anchor (`README.md#...`: no matches). Prose in `AGENTS.md`, `CONTRIBUTING.md` and `docs/RESUME.md` cites the section names "Validation" and "Quality and improvement"; both headings are kept. `CONTRIBUTING.md` named the README router table, so it was updated in the same change.

**Moved:**

- The skill table (102 rows) to [`docs/skill-catalogue.md`](../../skill-catalogue.md). Each name now links to its `SKILL.md`.
- The References section (110 books, 15 repositories, 19 standards and 18 website groups) to [`docs/references.md`](../../references.md), unchanged.

**Left in the README, with reasons:** the category table (16 rows, short, and it carries the total), the validation table (a validated, dated record that other documents cite) and the whole of the improvement account (Peter asked for it).

## 3. Experiment

Changes by theme. Commit hashes are in section 4.

1. **Relocation targets.** `docs/skill-catalogue.md` and `docs/references.md` created from the old README text.
2. **Supporting documents.** `CONTRIBUTING.md` step 5 and the "new group" paragraph now name the catalogue. `docs/README.md` lists the two new pages and this record, and its closing paragraph names the two README sections that hold the October account.
3. **README structure, front door and plain English.** One rewrite, section by section, because each section was restructured and reworded together. Structure: front door, contents, task table, four-step "How it works", subsections for install, tools, validation and quality. Plain English: one claim per sentence, evidence lines as nested bullets (Found, Fixed, Re-run, Limits), numbered improvements kept so cross-references ("item 9") still work.

Commits on `kaizen/2026-10-readme-kaizen`, made from `main` at `8976b0e` (one per theme; the structure and plain-English work share one commit because each section was restructured and reworded together):

| Commit | Theme |
|---|---|
| `b31f17e` | Relocation targets: `docs/skill-catalogue.md` and `docs/references.md` |
| `bdb4a64` | This record, the index lines in `docs/README.md` and the `CONTRIBUTING.md` update |
| `89c9e6e` | README structure, front door and plain English, including the move of the two lists out of the README |
| `999ac70` | `CHANGELOG.md` entry |

**Deliberate corrections (facts changed on purpose):**

- `./install.sh --scope project` became `bash install.sh --scope project`. The file is committed with mode 100644. In a fresh clone `./install.sh` fails with `Permission denied`, and `bash install.sh --scope project --dry-run` runs (634 files planned). The README now says so. Making the file executable is a script change and out of scope; it is logged in the next-cycle items below.
- "196 passed in 38 s" became "196 passed". A re-run on the same day took 29.7 s, so the duration varies.
- A "Conditional" bullet for Source Sans 3 and Source Sans Pro was added to "Font doctrine in brief". The old README stated this rule only in its opening paragraph, which no longer carries the font list. The wording follows section 3 of `doctrine/references/ai-slop-banned-fonts.md` and the sidecar's `conditionalPrimaryOnly` entry.
- "behavior" became "behaviour" (British English).
- The hook-test row of the validation table became two rows, so no row is over 300 characters. Commands and results are unchanged.
- The "Latest published score" paragraph became a list. The figures are unchanged.
- Headings renamed: "Installation" to "Install and update", "Capabilities" to "What is inside", "References" to "Sources". "Validation" and "Quality and improvement" are unchanged. The improvement account moved from an H3 under "Quality and improvement" to two H2 sections, "What the October 2026 kaizen improved" and "What the October 2026 kaizen added". The dated CHANGELOG entry for `e07fe86` still says "subsection ... under Quality and improvement"; dated entries are not rewritten.

## 4. Check

**Validators, before and after.** The 24 runs below are the commands the README's validation table lists, plus the cross-engine check run with a map for the two renamed siblings. "Before" ran on a clone of `main` at `8976b0e`. "After" ran on a clone of the branch head `999ac70`. The only later edit is the commit table in section 3 of this record, and the portability gate and engine validator were run once more after it (exit 0 each). The pytest run used an existing virtual environment (pytest 9.0.3, PyYAML 6.0.3) from a clone with a real `.git` directory. Nothing was installed.

| Check | Exit before | Exit after | Result after |
|---|---:|---:|---|
| `validate_engine.py --baseline tests/quality-baseline.json` | 0 | 0 | 102 of 102 compliant, 51 rules, 102 fixtures, portability findings 0 |
| `validate_portability.py` | 0 | 0 | PASS; no link leaves the repository or breaks |
| `routing_smoke_test.py --min-rank1 92 --lint-fixtures` | 0 | 0 | 94 fixtures, precision@1 95%, owned negatives 46/46, lint 0 |
| `validate_route_existence.py` | 0 | 0 | PASS |
| `validate_design_delivery_evidence.py` (shipped manifest) | 0 | 0 | PASS; verdict `CONDITIONAL` |
| `validate_token_example.py` (shipped example) | 0 | 0 | PASS |
| `validate_design_catalog.py` | 0 | 0 | PASS; 0 stale records |
| `check_file_count.py` (checkout and package) | 0, 0 | 0, 0 | PASS both |
| `generate-plugin-manifest.js --check` | 0 | 0 | current, 102 skills |
| Detector `--validate-registry`, `--doctrine-consistency` | 0, 0 | 0, 0 | 51 rules; 0 conflicts |
| `node --test tools/slop-detector/test/` | 0 | 0 | 119 tests, 118 pass, 1 skipped |
| Seven hook test files | 0 each | 0 each | 45/45, 73/73, 10/10, 61/61, 7/7, 12/12, 10/10 |
| `node --test tests/file-count.test.js` | 0 | 0 | 4 pass |
| `test_design_agent_contract.py` | 0 | 0 | PASS |
| `validate_cross_engine_routes.py` with `--map` for the two renamed siblings | 0 | 0 | all handoffs resolve |
| `python3 -X utf8 -m pytest -q -p no:cacheprovider` | 0 | 0 | 196 passed |

Exit codes are identical, 24 of 24. No validator reads the README, so none could trip on it; the portability gate does scan the new pages and passed.

`NOT_ASSESSED`: `install.ps1` and the PowerShell forms (no `pwsh` on this host); the detector's browser acceptance test (no locked Playwright project); the `examples/p18-synthetic-output-pack/` rebuild scripts (Python document libraries and LibreOffice absent). A rendered view on GitHub was not checked: in-page anchors were resolved with a GitHub-style slug function, not in a browser. Readability was measured with a proxy formula; no reader test was run.

**Preservation check** (`readme-preserve-check`, base `main`, new `kaizen/2026-10-readme-kaizen`):

```text
links: old README 44 targets; new README 21; moved to docs 29; LOST 0
commands: old README 28; kept in README 27; moved to docs 0; LOST 1
  LOST command: ./install.sh --scope project # macOS, Linux, Git Bash
anchors: 0 anchor links into the README from tracked files; BROKEN 0
in-page links: 16 anchors used; BROKEN 0
```

The one flagged command is the deliberate replacement described in section 3: `bash install.sh --scope project`, with the reason stated in the README. The tool treats a changed command as lost; nothing else was lost. (The anchor line above is shortened from the tool's own wording.) The 29 moved link targets are the reference-list URLs and the catalogue links, now in `docs/references.md` and `docs/skill-catalogue.md`.

**Independent content checks** (ad hoc scripts, not stored in the repository):

- Every 7-character commit hash, ISO date and long-form date in the old README is present in the new README or the two new pages. Every number is too, except "38" (the dropped "38 s" test duration, a deliberate correction). All 39 hashes were also checked with `git cat-file` and `git merge-base --is-ancestor main`: the 30 engine commits are on `main`, and the other 9 are pins of external repositories.
- The 12 skills in the task table exist on disk, and each is the expected skill of a prompt in `tests/routing-fixtures.yml`.
- The skill catalogue has 102 rows. Its set of names equals the set of `SKILL.md` folders on disk, every link resolves, and each row's category matches its folder's category in the README table. The category table counts equal the `SKILL.md` counts per folder (total 102).
- The README font list has every family in the `hardBan` prefixes, `secondaryBan` (17), `monospaceBanned`, `monospaceApproved` and `watchlist` entries of `ai-slop-banned-fonts.json`. The doctrine and font files were read and not edited.
- Numbers touched were re-measured on 2026-10-31: 102 skills, 51 rules (43 and 8), 94 fixtures, 196 tests, 66 catalogue records, the 17 and 14 findings of `tokens-from-pack.json`, and the default cross-engine run (exit 1, six routes `NOT ASSESSED` in the live checkout).

**Metrics, before and after** (read-only helper, same definitions as section 1):

| Measure | Before | After | Target | Met |
|---|---:|---:|---|---|
| `words` | 8,666 | 5,832 | at most +5%, aim -10% | Yes (-32.7%; about 3,800 words moved to two docs pages, the rest tightened) |
| `h2` | 5 | 14 | none | n/a |
| `toc` | 0 | 1 | 1 | Yes |
| `first_cmd` | 15 | 22 | 40 or less | Yes |
| `longest_sec` | 2,462 | 1,154 | 1,500 or less, 1,200 preferred | Yes |
| `long_lines` | 41 | 6 | cut by half | Yes |
| `max_line` | 1,297 | 377 | 700 or less | Yes |
| `sent_len` | 16.9 | 11.8 | 16.5 or less | Yes, with a caveat |
| `fre` | 47 | 55 | no lower, aim +5 | Yes (+8) |

Caveat on `sent_len` and `fre`: the helper reads paragraph lines only and skips bullets and tables. Moving enumerations into bullets and splitting paragraphs lowers both figures by construction, so the 11.8 overstates the gain in sentence length. The comparison is still fair in direction, because the old README also kept its long sentences in paragraphs. The six lines still over 300 characters are the opening paragraph (357), the font-doctrine intro (377), the "What is inside" intro (376), one token-validator bullet (337), the "Unresolved follow-up" paragraph (307) and one records bullet (359); none is over 400. No paragraph is over 70 words, and no table cell is over 35 words.

## 5. Standardise: README conventions for this engine

Skeleton, in this order:

1. Title and a short purpose in plain sentences, then who it is for.
2. "At a glance" (five or six measured facts) with "Start here" (three numbered steps and exact commands) inside it, all within the first 40 lines.
3. "Contents" listing every H2 section.
4. "When to use it and find the right skill": when to use, what it does not cover, a task table of 6 to 12 rows.
5. "How it works", then "Font doctrine in brief".
6. "What is inside", then "Install and update", "Run the tools" and "Validation".
7. "Quality and improvement", then the two October accounts.
8. "Sources" and "Contributing, author and licence".

Limits to hold when editing:

- No H2 section over 1,200 words; split into H2 or H3 sections of 600 words or fewer.
- No paragraph over 90 words, no table cell over 35 words, and no line over 300 characters except a link-heavy table row.
- Mean sentence length 16 words or fewer. Define a term at first use.
- Put a fact in one place. The banned-font list lives only in "Font doctrine in brief" and must match `doctrine/references/ai-slop-banned-fonts.json`.
- Keep the headings "Validation" and "Quality and improvement". `AGENTS.md`, `CONTRIBUTING.md` and `docs/RESUME.md` cite them by name.
- A table of more than about 50 rows goes to `docs/`, with a summary and a link in the README. Adding a skill means updating `docs/skill-catalogue.md`, the category table and the counts listed in `CONTRIBUTING.md`.
- Re-measure every number you touch. Mark each result as re-run or recorded.

## 6. Teach: three lines for the next editor

1. Write the front door last and keep it to 40 lines: purpose, six facts, three commands.
2. Move bulk to `docs/` and leave a sentence and a link; never move the validation table or the font list.
3. After every edit, count (words, longest section, long lines), check that every number and link still holds, and rerun the validators.

## 7. Re-measure and next cycle

This was a scoped cycle and publishes no score. The README now carries the same facts in about two thirds of the words and a front door that reaches a runnable command at line 22.

Open items for the next cycle (none was done here, because each needs a script, router or other-repository change):

1. **`install.sh` is committed as mode 100644.** `./install.sh` fails with `Permission denied` in a fresh clone. Set the executable bit in git (`git update-index --chmod=+x install.sh`, a change to a script file) and return the README command to `./install.sh`.
2. **No check ties the README and the catalogue to the disk.** Nothing compares `docs/skill-catalogue.md`, the README category table or the "At a glance" figures to the 102 skills on disk or to the validator output. This cycle checked them with throwaway scripts. A small test over the plugin manifest and the catalogue would keep them honest.
3. **`AGENTS.md` still says "The README table is a hint only".** It now means the task table and the catalogue. `AGENTS.md` carries portfolio-managed router text, so it was not edited; the owner can change the wording.
4. **The dated CHANGELOG entry for `e07fe86`** calls the October account a subsection of "Quality and improvement". It is now two H2 sections. Dated entries are not rewritten, so the new entry says so.
5. **The two helper scripts** (metrics and preservation check) live outside the repository. If Peter wants the README limits enforced, a small script and a test under `scripts/` and `tests/` would do it.
6. The existing date gates are unchanged: 2026-12-20, 2026-12-29 and 2027-01-27, all still in the README.

Cross-engine note: `chwezi-engine-agents/docs/engine-tours/chwezi-design-engine.json` says the README states what the engine does not cover. That is now true. No edit is needed there.

One small experiment for next time: have a reader who has never used the engine follow "Start here" cold and time how long it takes to reach the first useful result.
