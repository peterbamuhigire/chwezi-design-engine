#!/usr/bin/env node
/**
 * token-file-gate.js — PreToolUse hook on Write. Fact-forcing gate for a
 * NEW design-token file (design-tokens.json, tokens/*.json, *.tokens.json,
 * a fresh tokens.css, etc.).
 *
 * Modelled on the DENY -> FORCE -> ALLOW pattern documented in the ECC
 * audit's gateguard skill (C:\Users\Peter\Downloads\ECC-main\skills\
 * gateguard\SKILL.md, "Write Gate (first new file creation)"): the first
 * attempt to create a token file is denied with a demand for four concrete
 * facts; a repeated Write to the SAME path is allowed, on the theory that
 * presenting those facts is itself what changes the outcome, not a second
 * automated check.
 *
 * Why a token file specifically: this engine already treats font choice as
 * mechanically gated (banned-font-gate.js) because doctrine says it is too
 * easy to default into a generic choice under a competing prompt. A new
 * token set has the same failure mode one layer up — it is easy to invent
 * a second, uncoordinated colour/spacing/type-scale source of truth next to
 * one that already exists, or to invent values with no measurement basis
 * (exactly what `measured-style-pack` exists to prevent). The four facts
 * below are the Write-gate shape from gateguard, specialised for tokens:
 *   1. What consumes this token set (which build, component, or export).
 *   2. Whether an existing token set already serves the same purpose.
 *   3. The source/measurement basis of the values — tie to
 *      `measured-style-pack` when a reference exists; state explicitly if
 *      the values are newly designed rather than measured.
 *   4. The user's instruction, quoted verbatim.
 *
 * Contract (Claude Code PreToolUse hook): reads a JSON payload on stdin
 * describing the pending Write, and either exits 0 (allow) or exits 2 with
 * a reason on stderr (block). Unit-tested directly against representative
 * payload shapes (see hooks/test-token-file-gate.js) but NOT exercised
 * inside a live Claude Code session — verify the exact stdin field names
 * against the installed Claude Code version before relying on it in
 * production, same caveat as the other two hooks in this directory.
 *
 * Graduated controls (matches banned-font-gate.js / destructive-bash-gate.js):
 *   CHWEZI_TOKEN_GATE=off                 — disable entirely for the session
 *   CHWEZI_TOKEN_EXEMPT_GLOBS=a,b,c       — comma-separated globs (matched
 *                                           against the project-relative
 *                                           target path) that skip the gate
 *                                           — vendored/third-party token
 *                                           files, generated build output
 *   CHWEZI_TOKEN_GATE_STATE_DIR=<path>    — override the state directory
 *   CHWEZI_TOKEN_GATE_STATE_TTL_HOURS=<n> — deny-once TTL window (default 8)
 *
 * Fails open: if the payload can't be parsed, or state can't be persisted,
 * the hook allows the operation and prints a warning to stderr rather than
 * blocking on its own malfunction.
 */

'use strict';

if (!require('./plugin-hook-config').isEnabled()) process.exit(0);

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

// Matches: any path with a /tokens/ (or \tokens\) directory segment,
// *.tokens.json / *.tokens.js / *.tokens.css, or a design-tokens.* file at
// any depth. Deliberately broad — a false positive here costs one
// fact-force prompt; a false negative lets an uncoordinated token set
// through silently.
const TOKEN_FILE_PATTERNS = [
  /(^|[\\/])tokens[\\/]/i,                 // .../tokens/...
  /\.tokens\.(json|js|ts|css|yaml|yml)$/i, // *.tokens.json etc.
  /(^|[\\/])design-tokens\.[a-z0-9]+$/i,   // design-tokens.json / .css / .js
];

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (e) {
    return '';
  }
}

function globToRegExp(glob) {
  const escaped = glob
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '\u0000')
    .replace(/\*/g, '[^/]*')
    .replace(/\u0000/g, '.*')
    .replace(/\?/g, '.');
  return new RegExp('^' + escaped + '$', 'i');
}

function isExempt(targetPath) {
  const raw = process.env.CHWEZI_TOKEN_EXEMPT_GLOBS;
  if (!raw) return false;
  const normalized = targetPath.split(path.sep).join('/').toLowerCase();
  return raw
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)
    .some((glob) => globToRegExp(glob).test(normalized));
}

function extractTargetPath(toolInput) {
  if (!toolInput) return '';
  return toolInput.file_path || toolInput.path || toolInput.filePath || '';
}

function isTokenFilePath(targetPath) {
  if (!targetPath) return false;
  const normalized = targetPath.split(path.sep).join('/');
  return TOKEN_FILE_PATTERNS.some((re) => re.test(normalized));
}

function stateDir() {
  return process.env.CHWEZI_TOKEN_GATE_STATE_DIR || path.join(os.tmpdir(), 'chwezi-token-gate-state');
}

function ttlMs() {
  const hours = Number(process.env.CHWEZI_TOKEN_GATE_STATE_TTL_HOURS) || 8;
  return hours * 60 * 60 * 1000;
}

function pathHash(targetPath) {
  return crypto.createHash('sha256').update(targetPath.trim().toLowerCase()).digest('hex').slice(0, 24);
}

/**
 * Returns true if a Write to this exact path was already denied within the
 * TTL window (i.e. this is a retry that should now be allowed), and marks
 * it as seen for next time either way. Returns true (fail open, allow) if
 * the state directory itself is unusable — matching destructive-bash-gate's
 * fail-open discipline: a broken state dir must never turn into an infinite
 * deny-loop.
 */
function alreadyDeniedRecently(targetPath) {
  const dir = stateDir();
  const file = path.join(dir, pathHash(targetPath) + '.json');
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    console.error(`[chwezi:token-file-gate] Could not create state dir ${dir} — allowing (fail-open).`);
    return true;
  }

  let previouslyDenied = false;
  try {
    const stat = fs.statSync(file);
    const age = Date.now() - stat.mtimeMs;
    if (age < ttlMs()) previouslyDenied = true;
  } catch (e) {
    previouslyDenied = false;
  }

  try {
    fs.writeFileSync(file, JSON.stringify({ deniedAt: new Date().toISOString(), path: targetPath }));
  } catch (e) {
    console.error(`[chwezi:token-file-gate] Could not write state file — allowing (fail-open).`);
    return true;
  }

  return previouslyDenied;
}

function main() {
  if (['off', '0', 'false', 'disabled', 'disable'].includes((process.env.CHWEZI_TOKEN_GATE || '').toLowerCase())) {
    process.exit(0);
  }

  const raw = readStdin();
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    // Can't parse the payload — fail open, same discipline as the other
    // two gates in this directory.
    process.exit(0);
  }

  const toolInput = payload.tool_input || payload.toolInput || payload.input || {};
  const targetPath = extractTargetPath(toolInput);
  if (!targetPath) process.exit(0);
  if (!isTokenFilePath(targetPath)) process.exit(0);
  if (isExempt(targetPath)) process.exit(0);

  if (alreadyDeniedRecently(targetPath)) {
    // This exact path was already fact-forced once in the recent past —
    // allow the retry rather than deny-looping on it forever.
    process.exit(0);
  }

  console.error(
    `BLOCKED (new design-token file) — before creating "${targetPath}", present these four facts:\n\n` +
    `1. What consumes this token set — which build step, component library, or export target\n` +
    `   reads it.\n` +
    `2. Whether an existing token set already serves the same purpose — search the tree\n` +
    `   (Glob/Grep for "tokens", "design-tokens", "*.tokens.*") and confirm none does before\n` +
    `   adding a second, uncoordinated source of truth.\n` +
    `3. The source/measurement basis of the values — was this measured from an approved\n` +
    `   reference via the \`measured-style-pack\` skill (cite the pack), or newly designed\n` +
    `   (state that explicitly and name the design rationale)? Values with no stated basis are\n` +
    `   exactly the failure mode this gate exists to catch.\n` +
    `4. Quote the user's current instruction verbatim.\n\n` +
    `Retrying the exact same Write after presenting these facts will be allowed.\n` +
    `Override for this session: CHWEZI_TOKEN_GATE=off (use only when you have already\n` +
    `confirmed the token set's basis with the user through another channel).`
  );
  process.exit(2);
}

main();
