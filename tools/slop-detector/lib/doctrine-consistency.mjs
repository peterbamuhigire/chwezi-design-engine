// --doctrine-consistency (M10-09-T13): a family must not be both an approved
// baseline (font-groups-and-usage.md baseline lines and quick chooser,
// pairing-principles.md default pairings, pairing-catalog.md pairing rows) and
// on a ban list in ai-slop-banned-fonts.json (hard, secondary, monospace or a
// prefix ban). The conditional list (Source Sans, body-only) and the watchlist
// are not bans. Font folders of banned families are listed as a REPORT ONLY:
// deleting them is destructive and needs Peter's per-operation confirmation.
import fs from 'node:fs';
import path from 'node:path';

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

function baselineLines(file) {
  if (!fs.existsSync(file)) return [];
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const out = [];
  const base = path.basename(file);
  let inChooser = false;
  let inDefaults = false;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (/^##\s/.test(l)) {
      inChooser = /quick chooser/i.test(l);
      inDefaults = /default pairings/i.test(l);
    }
    if (/\*\*Baseline faces:\*\*/.test(l)) {
      let text = l;
      for (let j = i + 1; j < lines.length && lines[j].trim() && !/^\*\*|^#/.test(lines[j]); j++) text += ` ${lines[j]}`;
      out.push({ file: base, line: i + 1, text: text.replace(/.*\*\*Baseline faces:\*\*/, '') });
    } else if ((inChooser || inDefaults) && /^\|/.test(l) && !/^\|\s*-/.test(l)) {
      out.push({ file: base, line: i + 1, text: l });
    } else if (base === 'pairing-catalog.md' && /^\|\s*[A-Z]\d+\s*\|/.test(l)) {
      out.push({ file: base, line: i + 1, text: l });
    }
  }
  return out;
}

export function doctrineConsistency(root) {
  const json = JSON.parse(fs.readFileSync(path.join(root, 'doctrine/references/ai-slop-banned-fonts.json'), 'utf8'));
  const banned = [
    ...(json.hardBan || []).map((f) => ({ family: f.family, list: 'hardBan' })),
    ...(json.secondaryBan || []).map((f) => ({ family: f.family, list: 'secondaryBan' })),
    ...(json.monospaceBanned || []).map((f) => ({ family: f.family, list: 'monospaceBanned' })),
  ];
  const prefixes = (json.hardBanFamilyPrefixes || []).map((p) => p.prefix).filter(Boolean);
  const sources = [
    path.join(root, 'doctrine/references/font-groups-and-usage.md'),
    path.join(root, 'doctrine/references/pairing-principles.md'),
    path.join(root, 'skills/01-typography-and-fonts/font-selection-and-pairing/references/pairing-catalog.md'),
  ];
  const conflicts = [];
  for (const src of sources) {
    for (const bl of baselineLines(src)) {
      // Text after an explicit "not"/"never"/"avoid" marker is guidance, not an approval.
      const text = bl.text.replace(/\b(never|avoid|not|banned|instead of|replaces?|replaced)\b.*$/i, '');
      for (const b of banned) {
        if (new RegExp(`(^|[^A-Za-z])${esc(b.family)}(?![A-Za-z])`, 'i').test(text)) conflicts.push({ family: b.family, list: b.list, file: bl.file, line: bl.line });
      }
      for (const p of prefixes) {
        const m = new RegExp(`(^|[^A-Za-z])(${esc(p)}[A-Za-z0-9 ]*)`, 'i').exec(text);
        if (m && !conflicts.some((c) => c.file === bl.file && c.line === bl.line && c.family.toLowerCase().startsWith(p.toLowerCase()))) conflicts.push({ family: m[2].trim(), list: `hardBanFamilyPrefixes:${p}`, file: bl.file, line: bl.line });
      }
    }
  }
  const folders = [];
  const fontsDir = path.join(root, 'fonts');
  if (fs.existsSync(fontsDir)) {
    const bannedSlugs = banned.map((b) => ({ slug: slug(b.family), family: b.family }));
    for (const group of fs.readdirSync(fontsDir)) {
      const gdir = path.join(fontsDir, group);
      if (!fs.statSync(gdir).isDirectory()) continue;
      for (const fam of fs.readdirSync(gdir)) {
        if (!fs.statSync(path.join(gdir, fam)).isDirectory()) continue;
        const s = slug(fam);
        const hit = bannedSlugs.find((b) => b.slug === s) || prefixes.map((p) => ({ slug: slug(p), family: `${p}*` })).find((p) => s.startsWith(p.slug));
        if (hit) folders.push({ folder: `fonts/${group}/${fam}/`, family: hit.family, action: 'REPORT ONLY - removal needs Peter\'s per-operation confirmation' });
      }
    }
  }
  return { conflicts, folders, ok: conflicts.length === 0 };
}
