import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

export const TOOL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const ROOT = path.resolve(TOOL, '..', '..');
export const CLI = path.join(TOOL, 'cli.mjs');
export const FIX = path.join(ROOT, 'tests', 'fixtures');

export function cli(args, opts = {}) {
  const r = spawnSync(process.execPath, [CLI, ...args], { cwd: opts.cwd || ROOT, encoding: 'utf8', env: { ...process.env, ...(opts.env || {}) } });
  let json = null;
  try { json = JSON.parse(r.stdout); } catch { /* not JSON */ }
  return { code: r.status, stdout: r.stdout, stderr: r.stderr, json };
}
