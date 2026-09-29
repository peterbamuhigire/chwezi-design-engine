// Browser tier (M10-09-T08). Playwright is resolved from the CONSUMING project
// (createRequire(<cwd>/package.json)) and must pass the lock rule that
// website-skills scripts/require-locked-qa-tools.mjs enforces: declared as a
// direct dependency at an exact version, recorded at that version in the root
// of package-lock.json, and installed at that version. Nothing is installed.
// Without it every browser rule is reported in not_assessed[] (never a pass).
// Targets: local files, file:// or http://localhost only unless --allow-remote.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import { pageProbe } from './browser-rules.mjs';

export const VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }];
const PACKAGES = ['playwright', '@playwright/test'];

/** Lock rule (four conditions of require-locked-qa-tools.mjs). Returns {ok, name, version, reason}. */
export function lockedPlaywright(cwd) {
  const manifestPath = path.join(cwd, 'package.json');
  const lockPath = path.join(cwd, 'package-lock.json');
  if (!fs.existsSync(manifestPath) || !fs.existsSync(lockPath)) return { ok: false, reason: `no package.json and package-lock.json in ${cwd}` };
  let manifest; let lock;
  try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); lock = JSON.parse(fs.readFileSync(lockPath, 'utf8')); } catch (e) { return { ok: false, reason: `unreadable manifest or lockfile: ${e.message}` }; }
  const reasons = [];
  for (const name of PACKAGES) {
    const declared = manifest.devDependencies?.[name] ?? manifest.dependencies?.[name];
    if (!declared) continue;
    if (!/^\d+\.\d+\.\d+$/.test(declared)) { reasons.push(`${name} is declared as ${declared}, not an exact version`); continue; }
    const rootEntry = lock.packages?.[''];
    const lockedRoot = rootEntry?.devDependencies?.[name] ?? rootEntry?.dependencies?.[name];
    const installed = path.join(cwd, 'node_modules', ...name.split('/'), 'package.json');
    const installedVersion = fs.existsSync(installed) ? JSON.parse(fs.readFileSync(installed, 'utf8')).version : null;
    if (lockedRoot !== declared) { reasons.push(`${name}@${declared} is not recorded at that version in package-lock.json`); continue; }
    if (installedVersion !== declared) { reasons.push(`${name}@${declared} is not installed at that version (found ${installedVersion ?? 'none'})`); continue; }
    return { ok: true, name, version: declared };
  }
  return { ok: false, reason: reasons.length ? reasons.join('; ') : 'playwright or @playwright/test is not a direct dependency of the consuming project' };
}

function isLocalUrl(u) {
  return u.protocol === 'file:' || (/^https?:$/.test(u.protocol) && ['localhost', '127.0.0.1', '[::1]'].includes(u.hostname));
}

/** Expands targets into URLs: .html files, directories of .html files, or URLs. Throws on a refused remote target. */
export function expandTargets(targets, allowRemote) {
  const urls = [];
  for (const t of targets) {
    if (/^[a-z]+:\/\//i.test(t)) {
      const u = new URL(t);
      if (u.protocol === 'file:') {
        const p = decodeURIComponent(u.pathname.replace(/^\/([A-Za-z]:)/, '$1'));
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) { urls.push(...expandTargets([p], allowRemote)); continue; }
      }
      if (!isLocalUrl(u) && !allowRemote) throw new Error(`browser tier: refusing remote target ${t} (use --allow-remote)`);
      urls.push({ url: t, file: t });
      continue;
    }
    const abs = path.resolve(t);
    if (!fs.existsSync(abs)) throw new Error(`browser tier: target not found ${t}`);
    if (fs.statSync(abs).isDirectory()) {
      for (const f of fs.readdirSync(abs).sort()) if (/\.html?$/i.test(f)) urls.push({ url: pathToFileURL(path.join(abs, f)).href, file: path.join(abs, f) });
    } else urls.push({ url: pathToFileURL(abs).href, file: abs });
  }
  return urls;
}

/**
 * Runs the browser rules. Returns { findings: [{rule, file, line, snippet, message}], not_assessed: [{rule, reason}], tool }.
 * `rules` are registry rows with tier "browser".
 */
export async function runBrowser({ targets, rules, cwd = process.cwd(), allowRemote = false }) {
  const lock = lockedPlaywright(cwd);
  if (!lock.ok) {
    return { findings: [], not_assessed: rules.map((r) => ({ rule: r.id, reason: `browser tier NOT_ASSESSED: ${lock.reason}` })), tool: null };
  }
  const urls = expandTargets(targets, allowRemote);
  const req = createRequire(path.join(cwd, 'package.json'));
  let chromium;
  try { ({ chromium } = req(lock.name)); } catch (e) {
    return { findings: [], not_assessed: rules.map((r) => ({ rule: r.id, reason: `browser tier NOT_ASSESSED: cannot load ${lock.name}: ${e.message}` })), tool: null };
  }
  let browser;
  try { browser = await chromium.launch(); } catch (e) {
    return { findings: [], not_assessed: rules.map((r) => ({ rule: r.id, reason: `browser tier NOT_ASSESSED: browser launch failed (${e.message.split('\n')[0]})` })), tool: `${lock.name}@${lock.version}` };
  }
  const byCheck = new Map(rules.map((r) => [r.check.name, r]));
  const findings = [];
  const seen = new Set();
  const blockedRequests = [];
  const push = (rule, file, viewport, entry) => {
    const key = `${rule.id}|${file}|${entry.selector}`;
    if (seen.has(key)) return;
    seen.add(key);
    findings.push({ rule: rule.id, file, line: null, snippet: entry.selector, message: `${entry.message} [${viewport.width}x${viewport.height}]` });
  };
  try {
    for (const { url, file } of urls) {
      for (const viewport of VIEWPORTS) {
        const page = await browser.newPage({ viewport });
        const errors = [];
        const blocked = [];
        page.on('pageerror', (e) => errors.push(e.message));
        page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
        if (!allowRemote) {
          await page.route('**/*', (route) => {
            const u = new URL(route.request().url());
            if (isLocalUrl(u) || u.protocol === 'data:' || u.protocol === 'blob:') return route.continue();
            blocked.push(u.href);
            return route.abort();
          });
        }
        await page.goto(url, { waitUntil: 'load' });
        await page.evaluate(async () => {
          const step = Math.max(200, Math.floor(window.innerHeight / 2));
          for (let y = 0; y < document.documentElement.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 700));
        });
        const result = await page.evaluate(pageProbe);
        for (const [check, entries] of Object.entries(result)) {
          const rule = byCheck.get(check);
          if (rule) for (const e of entries) push(rule, file, viewport, e);
        }
        const scriptRule = byCheck.get('scriptError');
        // Requests this tier aborted (remote hosts) surface as console errors; they are not page defects.
        const own = (msg) => blocked.length > 0 && /Failed to load resource: net::ERR_FAILED/.test(msg);
        blockedRequests.push(...blocked);
        if (scriptRule) for (const msg of errors.filter((m) => !own(m))) push(scriptRule, file, viewport, { selector: 'console', message: msg.slice(0, 160) });
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  return { findings, not_assessed: [], tool: `${lock.name}@${lock.version}`, blocked_requests: [...new Set(blockedRequests)] };
}
