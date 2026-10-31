# Integration Plan — chwezi-design-engine

How the domain engines connect to this one, and the log of design skills migrated in.

**Model: reference, not mirror.** Nothing is copied into the domain engines. Each one gets a
single trigger block pointing here, and design skills are *moved out* of the domain engines
into this repo (lowering their skill counts). This engine is cloned on every device so the
reference always resolves.

---

## 1. The trigger block (paste into each engine's AGENTS.md)

Add this to the routing/engine-table section of each consumer engine's `AGENTS.md`. Each engine's
`CLAUDE.md` is a thin bridge that imports `AGENTS.md`, so it carries no copy. The block names no
path, so nothing needs adapting per device.

```markdown
<!-- chwezi-design-engine:trigger v4 -->
### Design / typography / UI/UX (cross-cutting — consult IN ADDITION)

Any work touching how an artifact LOOKS — font/typeface choice, type scale, colour, layout/grid,
visual identity, web/desktop/mobile UI screens, or the visual formatting of a DOCX/PPTX/PDF/XLSX
— routes to the **`chwezi-design-engine`** engine, the single home for ALL design/UI/UX skills
and the anti-AI-slop doctrine.

**Resolve its location on THIS device from the active runner's global engine-routing table or
`AGENTS.md`** — never assume an absolute path; it varies per machine. Then read its
`README.md` → `doctrine/design-doctrine.md` → glob `skills/**/SKILL.md` fresh and route by
frontmatter (read SKILL.md directly, not via the Skill tool). Content and structure stay in THIS
engine; presentation comes from chwezi-design-engine. Hard rule: never use a banned AI-slop font
as primary type — hard ban: Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces, IBM Plex (all
faces); secondary ban: Space Grotesk, Instrument Serif, Instrument Sans, Poppins, Montserrat, Nunito, Nunito Sans, Newsreader, Cormorant (all cuts), Crimson Pro, Plus Jakarta Sans, DM Sans, Outfit, Playfair Display, Lora, Space Mono;
Roboto Mono and IBM Plex Mono are banned as monospace choices; Source Sans 3 only as a paired
body face; no bare system stacks alone. State the chosen typeface and reason before producing
any artifact.
<!-- /chwezi-design-engine:trigger -->
```

The `<!-- chwezi-design-engine:trigger v4 -->` marker makes the block idempotent (re-runs detect
it) and lets a future version be found and replaced cleanly. The canonical text is
`integration/trigger-block.md`; every engine copy must be byte-identical to it.

Version history:
- `v1` (2026-06-21): first block; the 2026-09-29 house ruling added Fraunces and IBM Plex to its
  ban list without changing the marker.
- `v2` (2026-09-29, M10-01-T13): marker bumped; adopts the runner-neutral location wording
  ("the active runner's global engine-routing table or `AGENTS.md`") first used by linux-skills,
  so the block no longer names a Claude-specific path. Engine-specific notes (for example the
  chwezi-dev-engine migration status) sit after the closing marker, never inside the block.
- `v3` (commit `7a2ab6b`): the font-watchlist ruling moved ten faces to the secondary ban.
- `v4` (2026-09-29): marker and engine name follow the repository rename to `chwezi-design-engine`;
  the guidance itself is unchanged from `v3`.

### Consumer engines (where the block goes)

Measured on 2026-10-31 by extracting the block from each engine's `AGENTS.md` and comparing it
with `integration/trigger-block.md`: every engine below carries the `v4` block and every copy is
byte-identical to the canonical text. No engine's `CLAUDE.md` carries a copy.

| Engine | Repository (resolve the checkout through the workspace map) | Block in `AGENTS.md` |
|---|---|---|
| business-plan-skills | `business-plan-skills` | `v4`, identical |
| chwezi-accounting-doctrine | `chwezi-accounting-doctrine` | `v4`, identical |
| chwezi-engine-agents | `chwezi-engine-agents` | `v4`, identical |
| chwezi-sdlc-documentation | `chwezi-sdlc-documentation` | `v4`, identical |
| proposal-skills | `proposal-skills` | `v4`, identical |
| website-skills | `website-skills` | `v4`, identical |
| social-media-skills | `social-media-skills` | `v4`, identical |
| chwezi-dev-engine | `chwezi-dev-engine` | `v4`, identical (migration note kept after the block) |
| Digital Research Engine | catalogue id `digital-research-skills` | `v4`, identical |
| linux-skills | `linux-skills` | `v4`, identical (the runner-neutral variant, now canonical) |
| windows-admin-engine-skills | `windows-admin-engine-skills` | `v4`, identical |

Earlier versions of this table recorded that accounting, windows-admin and engine-agents held no
block; that is no longer true.

> A runner's global engine-routing table should also list chwezi-design-engine as a cross-cutting
> engine (alongside the finance engine note).

---

## 2. Migration log (design skills moved INTO this engine)

Populated after the read-only migration-candidate scan is approved. **No skill is moved until
the manifest below is approved and the source engine is `git pull`-ed.** Blended skills (content
+ styling) are SPLIT — content stays in the domain engine, styling extracts here — not moved
wholesale.

| Source engine | Source skill (path) | Disposition (move / split / leave) | Destination group here | Done? |
|---|---|---|---|---|
| _(to be filled by the candidate scan)_ | | | | |

### Migration safety rules

1. `git pull --ff-only` the source engine immediately before touching it.
2. Show the full manifest and get explicit approval before any move/delete (never-destructive rule).
3. Move with history where practical; otherwise copy-then-remove in a reviewed commit.
4. For each move, leave a one-line pointer/stub in the source engine's router noting the skill
   now lives in chwezi-design-engine (so old references resolve).
5. Update this log and the source engine's skill count after each batch.

---

## 3. Changelog

- 2026-08-05 — standardised SaaS authentication and tenant-entry visuals in
  `webapp-gui-design`: shared blurred-image composition, immediate-surface logo selection,
  responsive/accessibility evidence, and the Super Admin managed visual-asset experience.
- v0.1.0 — engine created; typography group + doctrine + font taxonomy seeded; trigger block
  defined; migration log opened (empty).
