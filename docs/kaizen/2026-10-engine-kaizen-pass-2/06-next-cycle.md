# 06 — Next cycle (pass 2)

Written during the cycle and completed at the end; see `05-final-report.md` once it exists. Items below are the open findings and decisions known so far.

## Decisions needed from Peter

1. **Doctrine header and promises** (`doctrine/design-doctrine.md`): the header is v0.2.0 (line 3) although section 6 says ban changes bump the minor version; section 3 promises `doctrine/examples/`, which does not exist (line 104); section 5 (line 161) names a Windows web-root checkout path. Canonical doctrine, so not edited. The portability allowlist carries the line-161 exception with this reason until you decide.
2. **Public history.** The source register that listed local download paths and acquisition-site file names (finding H-1) is repaired in the working tree, but earlier commits on a public repository still contain it. Rewriting history is outside this pass's permissions. Decide whether to rewrite or accept the exposure.
3. **Font licence files** (29 files under `fonts/*/LICENSE.txt`) carry a local drive origin line. They are your provenance records, so they are allowlisted, not edited.
