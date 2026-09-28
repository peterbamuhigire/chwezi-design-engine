# Integration Plan — design-system-skills

How the domain engines connect to this one, and the log of design skills migrated in.

**Model: reference, not mirror.** Nothing is copied into the domain engines. Each one gets a
single trigger block pointing here, and design skills are *moved out* of the domain engines
into this repo (lowering their skill counts). This engine is cloned on every device so the
reference always resolves.

---

## 1. The trigger block (paste into each engine's CLAUDE.md and AGENTS.md)

Add this to the routing/engine-table section of each consumer engine. Adapt the relative path
if the engine lives elsewhere on a given device.

```markdown
<!-- design-system-skills:trigger v1 -->
### Design / typography / UI/UX (cross-cutting — consult IN ADDITION)

Any work touching how an artifact LOOKS — font/typeface choice, type scale, colour, layout/grid,
visual identity, web/desktop/mobile UI screens, or the visual formatting of a DOCX/PPTX/PDF/XLSX
— routes to the **`design-system-skills`** engine, the single home for ALL design/UI/UX skills
and the anti-AI-slop doctrine.

**Resolve its location on THIS device from your global engine-routing table** (`~/.claude/CLAUDE.md`,
or `AGENTS.md` for Codex) — never assume an absolute path; it varies per machine. Then read its
`README.md` → `doctrine/design-doctrine.md` → glob `skills/**/SKILL.md` fresh and route by
frontmatter (read SKILL.md directly, not via the Skill tool). Content and structure stay in THIS
engine; presentation comes from design-system-skills. Hard rule: never use a banned AI-slop font
as primary type — hard ban: Inter, Geist, Roboto, Open Sans, Lato, Arial, Fraunces, IBM Plex (all
faces); secondary ban: Space Grotesk, Instrument Serif, Poppins, Montserrat, Nunito, Nunito Sans;
Roboto Mono and IBM Plex Mono are banned as monospace choices; Source Sans 3 only as a paired
body face; no bare system stacks alone. State the chosen typeface and reason before producing
any artifact.
<!-- /design-system-skills:trigger -->
```

The `<!-- design-system-skills:trigger v1 -->` marker makes the block idempotent (re-runs detect
it) and lets a future version be found and replaced cleanly.

### Consumer engines (where the block goes)

| Engine | Path | Block added? |
|---|---|---|
| business-plan-skills | `C:\wamp64\www\business-plan-skills` | ✅ 2026-06-21 |
| srs-skills | `C:\wamp64\www\srs-skills` | ✅ 2026-06-21 |
| proposal-skills | `C:\wamp64\www\proposal-skills` | ✅ 2026-06-21 |
| website-skills | `C:\wamp64\www\website-skills` | ✅ 2026-06-21 |
| social-media-skills | `C:\wamp64\www\social-media-skills` | ✅ 2026-06-21 |
| engineering-catalog (`~/.claude/skills`) | `C:\Users\Peter\.claude\skills` | ✅ 2026-06-21 |
| digital-research-engine | `C:\Users\Peter\Documents\Claude Projects\digital-research-engine` | ✅ 2026-06-21 |

> The user's global `~/.claude/CLAUDE.md` engine-routing table should also gain a row for
> design-system-skills as a cross-cutting engine (alongside the finance engine note).

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
   now lives in design-system-skills (so old references resolve).
5. Update this log and the source engine's skill count after each batch.

---

## 3. Changelog

- 2026-08-05 — standardised SaaS authentication and tenant-entry visuals in
  `webapp-gui-design`: shared blurred-image composition, immediate-surface logo selection,
  responsive/accessibility evidence, and the Super Admin managed visual-asset experience.
- v0.1.0 — engine created; typography group + doctrine + font taxonomy seeded; trigger block
  defined; migration log opened (empty).
