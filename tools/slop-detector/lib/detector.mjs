// Programmatic API behind cli.mjs and the hooks: runDetector(options) -> { report, exitCode }.
// Exit codes: 0 no failing findings; 2 failing findings; 1 operational failure (takes precedence).
import fs from 'node:fs';
import path from 'node:path';
import { readDocument, EXT_ENGINE, matcher } from './document.mjs';
import { CHECKS, PACK_CHECKS } from './checks.mjs';
import { DRIFT_CHECKS, resolveTokens } from './drift.mjs';
import { loadRegistry, validateRegistry, registrySha256, loadPack, REGISTRY_PATH, ENGINE_ROOT } from './registry.mjs';
import { parseInlineWaivers, inlineWaiverFor, findConfig, loadConfig, configWaiverFor, WaiverError } from './waivers.mjs';
import { snippetOf } from './util.mjs';

export const VERSION = '1.0.0';
export const MODES = ['persuade', 'operate', 'read', 'experience'];
export const TIERS = ['immediate', 'deep', 'browser', 'all'];
let registryCache = null;
const SKIP_DIRS =new Set(['node_modules', '.git', '__pycache__', '.venv', 'venv', '.pytest_cache']);

export function collectFiles(targets, cwd = process.cwd()) {
  const out = [];
  const walk = (p) => {
    let st;
    try { st = fs.statSync(p); } catch { throw new Error(`target not found: ${p}`); }
    if (st.isDirectory()) {
      for (const name of fs.readdirSync(p).sort()) {
        if (SKIP_DIRS.has(name) || name.startsWith('.trash-')) continue;
        walk(path.join(p, name));
      }
    } else if (EXT_ENGINE[path.extname(p).toLowerCase()]) out.push(p);
  };
  for (const t of targets) {
    if (/^[a-z]+:\/\//i.test(t)) continue; // URLs are browser-tier targets only
    walk(path.resolve(cwd, t));
  }
  return out;
}

function selectRules(all, o) {
  let rules = all;
  const tier = o.tier || (o.rule && o.rule.length ? 'all' : 'deep');
  if (tier === 'immediate') rules = rules.filter((r) => r.tier === 'immediate');
  else if (tier === 'deep') rules = rules.filter((r) => r.tier !== 'browser');
  else if (tier === 'browser') rules = rules.filter((r) => r.tier === 'browser');
  if (o.rule && o.rule.length) rules = rules.filter((r) => o.rule.includes(r.id));
  if (o.disableRule && o.disableRule.length) rules = rules.filter((r) => !o.disableRule.includes(r.id));
  if (o.mode) rules = rules.filter((r) => r.modes.includes(o.mode));
  if (o.severity && o.severity.length) rules = rules.filter((r) => o.severity.includes(r.severity));
  return rules;
}

function checkFn(rule) {
  const { kind, name } = rule.check;
  if (kind === 'named') return CHECKS[name];
  if (kind === 'drift') return DRIFT_CHECKS[name];
  return PACK_CHECKS[kind];
}

/**
 * options: { paths[], tier, rule[], disableRule[], mode, tokens, failOn ('block'|'warning'),
 *            noWaivers, extraRules[], cwd, allowRemote, severity[] }
 */
export async function runDetector(options = {}) {
  const o = { failOn: 'block', ...options };
  const cwd = o.cwd || process.cwd();
  const errors = [];
  const report = {
    tool: 'chwezi-slop', version: VERSION, registry_sha256: null, generated: new Date().toISOString(),
    options: { tier: o.tier || 'deep', mode: o.mode || null, fail_on: o.failOn, waivers: !o.noWaivers },
    scanned_files: 0, findings: [], not_assessed: [], waived: [], errors,
  };
  let rules;
  try {
    const sha = registrySha256(REGISTRY_PATH);
    if (!registryCache || registryCache.sha !== sha) {
      const registry = loadRegistry(REGISTRY_PATH);
      const structural = validateRegistry(registry, { root: ENGINE_ROOT }).filter((e) => !/fixture missing|doctrine_ref|doctrine marker/.test(e));
      if (structural.length) throw new Error(`registry invalid: ${structural.join('; ')}`);
      registryCache = { sha, registry };
    }
    report.registry_sha256 = sha;
    let all = registryCache.registry.rules;
    for (const pack of o.extraRules || []) all = all.concat(loadPack(path.resolve(cwd, pack), all.map((r) => r.id)));
    if (o.mode && !MODES.includes(o.mode)) throw new Error(`--mode must be one of ${MODES.join(', ')}`);
    if (o.tier && !TIERS.includes(o.tier)) throw new Error(`--tier must be one of ${TIERS.join(', ')}`);
    for (const id of [...(o.rule || []), ...(o.disableRule || [])]) if (!all.some((r) => r.id === id)) throw new Error(`unknown rule id "${id}"`);
    rules = selectRules(all, o);
    report.known_rules = all.length;
    report.rules_run = rules.map((r) => r.id);
    o._allIds = new Set(all.map((r) => r.id));
  } catch (e) {
    errors.push(e.message);
    return { report, exitCode: 1 };
  }

  const staticRules = rules.filter((r) => r.tier !== 'browser');
  const browserRules = rules.filter((r) => r.tier === 'browser');
  const driftRules = staticRules.filter((r) => r.check.kind === 'drift');
  let lists;
  try { lists = matcher.buildLists(matcher.loadDoctrine()); } catch (e) { errors.push(`cannot read banned-font doctrine: ${e.message}`); return { report, exitCode: 1 }; }

  const seen = new Set();
  let tokensSeen = false;
  const configCache = new Map();
  const configFor = (dir) => {
    if (configCache.has(dir)) return configCache.get(dir);
    const f = findConfig(dir);
    const cfg = f ? loadConfig(f, o._allIds) : null;
    configCache.set(dir, cfg);
    return cfg;
  };

  if (staticRules.length) {
    let files = [];
    try { files = collectFiles(o.paths && o.paths.length ? o.paths : ['.'], cwd); } catch (e) { errors.push(e.message); return { report, exitCode: 1 }; }
    report.scanned_files = files.length;
    for (const file of files) {
      let doc;
      try { doc = readDocument(file); } catch (e) { errors.push(`${file}: cannot read (${e.message})`); continue; }
      let inline = [];
      let config = null;
      try {
        if (!o.noWaivers) {
          inline = parseInlineWaivers(doc, o._allIds);
          config = configFor(path.dirname(file));
        } else if (o.tokens === undefined) {
          const f = findConfig(path.dirname(file));
          if (f) config = { path: f, data: JSON.parse(fs.readFileSync(f, 'utf8')) };
        }
      } catch (e) {
        errors.push(e instanceof WaiverError ? e.message : `${file}: ${e.message}`);
        continue;
      }
      let tokens = null;
      if (driftRules.length) {
        try { tokens = resolveTokens(file, { tokens: o.tokens ? path.resolve(cwd, o.tokens) : undefined, config }); } catch (e) { errors.push(`token source unreadable: ${e.message}`); }
        if (tokens) tokensSeen = true;
      }
      const ctx = { fontLists: lists, tokens, file };
      const rel = path.relative(cwd, file).split(path.sep).join('/');
      for (const rule of staticRules) {
        const fn = checkFn(rule);
        let hits;
        try { hits = fn(doc, rule.check.params || {}, ctx) || []; } catch (e) { errors.push(`${rel}: rule ${rule.id} failed (${e.message})`); continue; }
        for (const h of hits) {
          const key = `${rule.id}|${rel}|${h.line}`;
          if (seen.has(key)) continue;
          seen.add(key);
          const finding = {
            rule: rule.id, as_overlay: rule.as_overlay, severity: rule.severity, evidence_mode: 'cli',
            file: rel, line: h.line, snippet: snippetOf(doc.lines, h.line), message: h.message,
          };
          finding.absFile = file;
          let w = null;
          if (!o.noWaivers) {
            const iw = inlineWaiverFor(finding, inline);
            if (iw) w = { source: 'inline', kind: iw.kind, line: iw.line, reason: iw.reason };
            else {
              const cw = configWaiverFor(finding, config);
              if (cw) w = { source: 'config', file: path.relative(cwd, config.path).split(path.sep).join('/'), scope: cw.scope, value: cw.value, reason: cw.reason, granted_by: cw.granted_by, date: cw.date, recheck_due: cw.recheck_due };
            }
          }
          delete finding.absFile;
          if (w) report.waived.push({ ...finding, waiver: w });
          else report.findings.push(finding);
        }
      }
    }
    if (driftRules.length && !tokensSeen) {
      for (const r of driftRules) report.not_assessed.push({ rule: r.id, reason: 'no token source: pass --tokens, set "tokens" in .chwezi/slop.json, or add design-tokens.json / a DTCG tokens.json' });
    }
  }

  if (browserRules.length) {
    try {
      const { runBrowser } = await import('./browser.mjs');
      const targets = o.paths && o.paths.length ? o.paths : ['.'];
      const res = await runBrowser({ targets, rules: browserRules, cwd, allowRemote: !!o.allowRemote });
      report.browser_tool = res.tool;
      if (res.blocked_requests && res.blocked_requests.length) report.browser_blocked_requests = res.blocked_requests;
      report.not_assessed.push(...res.not_assessed);
      for (const f of res.findings) {
        const rule = browserRules.find((r) => r.id === f.rule);
        report.findings.push({ rule: f.rule, as_overlay: rule.as_overlay, severity: rule.severity, evidence_mode: 'browser', file: path.isAbsolute(f.file) ? path.relative(cwd, f.file).split(path.sep).join('/') : f.file, line: f.line, snippet: f.snippet, message: f.message });
      }
    } catch (e) {
      errors.push(e.message);
    }
  }

  const failing = new Set(o.failOn === 'warning' ? ['block', 'warning'] : ['block']);
  const bySev = { block: 0, warning: 0, advisory: 0 };
  const byRule = {};
  for (const f of report.findings) { bySev[f.severity]++; byRule[f.rule] = (byRule[f.rule] || 0) + 1; }
  report.summary = { findings: report.findings.length, waived: report.waived.length, not_assessed: report.not_assessed.length, by_severity: bySev, by_rule: byRule };
  const exitCode = errors.length ? 1 : report.findings.some((f) => failing.has(f.severity)) ? 2 : 0;
  report.exit_code = exitCode;
  return { report, exitCode };
}

export function formatText(report) {
  const lines = [];
  for (const f of report.findings) lines.push(`${f.file}:${f.line ?? '-'}  ${f.severity.padEnd(8)} ${f.rule} [${f.as_overlay}] ${f.message}`);
  for (const w of report.waived) lines.push(`${w.file}:${w.line ?? '-'}  waived   ${w.rule} (${w.waiver.reason})`);
  for (const n of report.not_assessed) lines.push(`NOT_ASSESSED ${n.rule}: ${n.reason}`);
  for (const e of report.errors) lines.push(`ERROR ${e}`);
  const s = report.summary || { findings: 0, waived: 0, by_severity: {} };
  lines.push(`chwezi-slop ${report.version}: ${report.scanned_files} file(s), ${s.findings} finding(s) (block ${s.by_severity.block || 0}, warning ${s.by_severity.warning || 0}, advisory ${s.by_severity.advisory || 0}), ${s.waived} waived, exit ${report.exit_code ?? 1}`);
  return lines.join('\n');
}
