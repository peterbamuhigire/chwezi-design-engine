# Third-Party Notices

This engine is MIT-licensed (see `LICENSE`). The notices below record third-party ideas that
shaped parts of it.

## Impeccable

Rule ideas and numeric thresholds adapted in paraphrase from Impeccable,
https://github.com/pbakaus/impeccable, Copyright 2025 Paul Bakaus, Apache-2.0, commit 114ea1d.
No source code or fixture files were copied.

Where this applies:

- `tools/slop-detector/` (`chwezi-slop`): the rule registry, the static and browser checks, the
  waiver model and the hook tiers. Every registry row that draws on Impeccable cites
  `impeccable@114ea1d:<rule>` in `authority.ban_evidence` and names the licence and commit in
  `provenance`.
- `doctrine/references/ai-slop-banned-fonts.md` and the font watchlist record: Impeccable's font
  lists are used as evidence for bans only, never as approvals.

Impeccable's `NOTICE` file covers files derived from third-party iOS and Android material. None
of those files, and no other Impeccable file, is included here.
