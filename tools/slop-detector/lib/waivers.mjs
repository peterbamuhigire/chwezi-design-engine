// Waiver handling (M10-09-T07). Two forms, both requiring a "<who>: <evidence>" reason.
//
// Inline (in any comment syntax):
//   chwezi-slop-disable-next-line <rule>[,<rule>] -- <who>: <evidence>
//   chwezi-slop-disable-line <rule> -- <who>: <evidence>
//   chwezi-slop-disable <rule> -- <who>: <evidence>   ...   chwezi-slop-enable <rule>
//
// Project file .chwezi/slop.json:
//   { "schema": 1, "tokens"?: "<path>", "waivers": [ { "rule", "scope": "value"|"rule-in-file"|"file"|"project",
//     "value"?, "file"?, "reason", "granted_by": "human"|"agent", "date": "YYYY-MM-DD", "recheck_due"? } ] }
// Agents may self-serve value-scope waivers only (adapted in paraphrase from Impeccable's
// "self-serve stops at ignore-value" hook rule; Apache-2.0, commit 114ea1d).
import fs from 'node:fs';
import path from 'node:path';

export const REASON_RE = /^[^:\n]{2,80}: \S.{9,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SCOPES = ['value', 'rule-in-file', 'file', 'project'];

export class WaiverError extends Error {}

/** Parses inline waiver comments in a document. Throws WaiverError on a malformed waiver. */
export function parseInlineWaivers(doc, knownRules) {
  const out = [];
  const open = new Map();
  const re = /chwezi-slop-(disable-next-line|disable-line|disable|enable)\b([^\n]*)/;
  doc.lines.forEach((raw, idx) => {
    const m = re.exec(raw);
    if (!m) return;
    const line = idx + 1;
    const kind = m[1];
    const rest = m[2].replace(/\s*(\*\/|-->|\}\}|#\}|%\})\s*$/, '').trim();
    const sep = rest.indexOf(' -- ');
    const rulesPart = (sep >= 0 ? rest.slice(0, sep) : rest).trim();
    const reason = sep >= 0 ? rest.slice(sep + 4).trim() : '';
    if (/<[^>]*>/.test(rulesPart)) return; // documented placeholder, e.g. <rule>
    if (doc.fenceLines && !doc.fenceLines.has(line)) return; // Markdown: only waivers inside code fences count
    const rules = rulesPart.split(/[\s,]+/).filter(Boolean);
    if (rules.length === 0) throw new WaiverError(`${doc.file}:${line}: waiver names no rule`);
    for (const r of rules) if (!knownRules.has(r)) throw new WaiverError(`${doc.file}:${line}: waiver names unknown rule "${r}"`);
    if (kind === 'enable') {
      for (const r of rules) {
        const w = open.get(r);
        if (w) { w.end = line; open.delete(r); }
      }
      return;
    }
    if (!REASON_RE.test(reason)) throw new WaiverError(`${doc.file}:${line}: waiver reason must read "<who>: <evidence>" (got "${reason}")`);
    const w = { kind, rules, line, reason, end: Infinity, source: 'inline' };
    out.push(w);
    if (kind === 'disable') for (const r of rules) open.set(r, w);
  });
  return out;
}

export function inlineWaiverFor(finding, waivers) {
  for (const w of waivers) {
    if (!w.rules.includes(finding.rule)) continue;
    if (w.kind === 'disable-next-line' && finding.line === w.line + 1) return w;
    if (w.kind === 'disable-line' && finding.line === w.line) return w;
    if (w.kind === 'disable' && finding.line > w.line && finding.line < w.end) return w;
  }
  return null;
}

/** Finds .chwezi/slop.json walking up from startDir (stops at a .git directory). */
export function findConfig(startDir) {
  let dir = path.resolve(startDir);
  for (;;) {
    const f = path.join(dir, '.chwezi', 'slop.json');
    if (fs.existsSync(f)) return f;
    if (fs.existsSync(path.join(dir, '.git'))) return null;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/** Loads and validates a config file. Throws WaiverError when invalid. */
export function loadConfig(file, knownRules) {
  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { throw new WaiverError(`${file}: not valid JSON (${e.message})`); }
  if (data.schema !== 1) throw new WaiverError(`${file}: "schema" must be 1`);
  if (data.tokens !== undefined && typeof data.tokens !== 'string') throw new WaiverError(`${file}: "tokens" must be a path string`);
  const waivers = data.waivers ?? [];
  if (!Array.isArray(waivers)) throw new WaiverError(`${file}: "waivers" must be an array`);
  waivers.forEach((w, i) => {
    const at = `${file}: waivers[${i}]`;
    if (!w || typeof w !== 'object') throw new WaiverError(`${at}: must be an object`);
    if (!knownRules.has(w.rule)) throw new WaiverError(`${at}: unknown rule "${w.rule}"`);
    if (!SCOPES.includes(w.scope)) throw new WaiverError(`${at}: scope must be one of ${SCOPES.join(', ')}`);
    if (w.scope === 'value' && (typeof w.value !== 'string' || !w.value)) throw new WaiverError(`${at}: value scope needs "value"`);
    if ((w.scope === 'rule-in-file' || w.scope === 'file') && (typeof w.file !== 'string' || !w.file)) throw new WaiverError(`${at}: ${w.scope} scope needs "file"`);
    if (typeof w.reason !== 'string' || !REASON_RE.test(w.reason)) throw new WaiverError(`${at}: reason must read "<who>: <evidence>"`);
    if (!['human', 'agent'].includes(w.granted_by)) throw new WaiverError(`${at}: granted_by must be "human" or "agent"`);
    if (w.granted_by === 'agent' && w.scope !== 'value') throw new WaiverError(`${at}: agents may grant value-scope waivers only (scope "${w.scope}" needs a human)`);
    if (typeof w.date !== 'string' || !DATE_RE.test(w.date)) throw new WaiverError(`${at}: date must be YYYY-MM-DD`);
    if (w.recheck_due !== undefined && !DATE_RE.test(String(w.recheck_due))) throw new WaiverError(`${at}: recheck_due must be YYYY-MM-DD`);
  });
  return { path: file, root: path.dirname(path.dirname(file)), data: { ...data, waivers } };
}

function globToRe(glob) {
  const esc = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*').replace(/\?/g, '.');
  return new RegExp(`^${esc}$`, 'i');
}

export function configWaiverFor(finding, config) {
  if (!config) return null;
  const rel = path.relative(config.root, path.resolve(finding.absFile || finding.file)).split(path.sep).join('/');
  for (const w of config.data.waivers) {
    if (w.rule !== finding.rule && w.scope !== 'file') continue;
    const fileOk = !w.file || globToRe(w.file.replace(/^\.\//, '')).test(rel);
    if (w.scope === 'project' && w.rule === finding.rule) return w;
    if (w.scope === 'file' && fileOk && w.file) return w;
    if (w.scope === 'rule-in-file' && w.rule === finding.rule && fileOk) return w;
    if (w.scope === 'value' && w.rule === finding.rule && fileOk) {
      const hay = `${finding.snippet} ${finding.message}`.toLowerCase();
      if (hay.includes(w.value.toLowerCase())) return w;
    }
  }
  return null;
}
