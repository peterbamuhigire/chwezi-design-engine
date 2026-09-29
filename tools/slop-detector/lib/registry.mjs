// Registry loading and validation (schema + semantic checks).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { validate } from './schema.mjs';
import { CHECKS, PACK_CHECKS } from './checks.mjs';
import { DRIFT_CHECKS } from './drift.mjs';
import { BROWSER_CHECK_NAMES } from './browser-rules.mjs';

export const TOOL_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ENGINE_ROOT = path.resolve(TOOL_DIR, '..', '..');
export const REGISTRY_PATH = path.join(TOOL_DIR, 'rules', 'registry.json');
export const SCHEMA_PATH = path.join(TOOL_DIR, 'rules', 'registry.schema.json');

export function checkExists(rule) {
  const { kind, name } = rule.check;
  if (kind === 'named') return name in CHECKS;
  if (kind === 'drift') return name in DRIFT_CHECKS;
  if (kind === 'browser') return BROWSER_CHECK_NAMES.includes(name);
  return kind in PACK_CHECKS;
}

/** GitHub-style heading slug. */
export function slugify(heading) {
  return heading.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
}

export function anchorsOf(markdown) {
  const anchors = new Set();
  const markers = new Set();
  for (const line of markdown.split(/\r?\n/)) {
    const h = /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(line);
    if (h) anchors.add(slugify(h[1]));
    const re = /<!--\s*rule:([^\s>]+)\s*-->/g;
    let m;
    while ((m = re.exec(line))) markers.add(m[1]);
  }
  return { anchors, markers };
}

/**
 * Validates a registry object. Returns an array of error strings (empty = valid).
 * opts.root: engine root for fixture and doctrine resolution; opts.pack: data-only pack rules.
 */
export function validateRegistry(registry, opts = {}) {
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8'));
  const errors = validate(registry, schema);
  if (errors.length) return errors;
  const seen = new Set(opts.existingIds || []);
  const docCache = new Map();
  for (const rule of registry.rules) {
    if (seen.has(rule.id)) errors.push(`${rule.id}: duplicate rule id`);
    seen.add(rule.id);
    if (opts.pack && !['regex', 'phrase-list'].includes(rule.check.kind)) errors.push(`${rule.id}: rule packs are data-only (check.kind regex or phrase-list)`);
    if (!checkExists(rule)) errors.push(`${rule.id}: check ${rule.check.kind}/${rule.check.name} is not implemented`);
    if (opts.pack) continue;
    const root = opts.root || ENGINE_ROOT;
    for (const f of [rule.fixtures.flag, rule.fixtures.pass]) {
      if (!fs.existsSync(path.join(root, f))) errors.push(`${rule.id}: fixture missing ${f}`);
    }
    const [docPath, anchor] = rule.doctrine_ref.split('#');
    const abs = path.join(root, docPath);
    if (!fs.existsSync(abs)) { errors.push(`${rule.id}: doctrine_ref file missing ${docPath}`); continue; }
    if (!docCache.has(abs)) docCache.set(abs, anchorsOf(fs.readFileSync(abs, 'utf8')));
    const { anchors, markers } = docCache.get(abs);
    const ok = anchor.startsWith('rule:') ? markers.has(anchor.slice(5)) : anchors.has(anchor);
    if (!ok) errors.push(`${rule.id}: doctrine_ref anchor #${anchor} not found in ${docPath}`);
    for (const pattern of rule.doctrine_markers || []) {
      const re = new RegExp(`^${pattern.replace(/\./g, '\\.').replace(/\*/g, '[a-z0-9.-]+')}$`);
      if (![...markers].some((m) => re.test(m))) errors.push(`${rule.id}: no doctrine marker matches ${pattern} in ${docPath}`);
    }
  }
  return errors;
}

export function registrySha256(file = REGISTRY_PATH) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

export function loadRegistry(file = REGISTRY_PATH) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** Loads a data-only rule pack: {"schema":1,"tool":"chwezi-slop","rules":[...]}. Throws on invalid packs. */
export function loadPack(file, existingIds) {
  const pack = JSON.parse(fs.readFileSync(file, 'utf8'));
  const errors = validateRegistry(pack, { pack: true, existingIds });
  if (errors.length) throw new Error(`rule pack ${file} is invalid:\n  ${errors.join('\n  ')}`);
  return pack.rules.map((r) => ({ ...r, pack: file }));
}
