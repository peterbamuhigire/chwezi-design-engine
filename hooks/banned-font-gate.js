#!/usr/bin/env node
/**
 * banned-font-gate.js — PreToolUse hook. Blocks a Write/Edit/MultiEdit that
 * would set a banned AI-slop font as a primary typeface.
 *
 * Enforces doctrine/references/ai-slop-banned-fonts.md (via its machine
 * sidecar, ai-slop-banned-fonts.json) mechanically instead of by hoping the
 * model remembers it. Rationale, per the ECC audit that recommended this:
 * skills fire probabilistically; hooks fire deterministically. This is the
 * highest-value single enforcement item identified for this engine because
 * the font ban is otherwise the most load-bearing rule in the doctrine with
 * the least mechanical backing.
 *
 * Contract (Claude Code PreToolUse hook): reads a JSON payload on stdin
 * describing the pending tool call, inspects the content the tool is about
 * to write, and either exits 0 (allow) or exits 2 with a reason on stderr
 * (block). This script has been unit-tested directly against representative
 * payload shapes (see hooks/test-banned-font-gate.js) but has NOT been
 * exercised inside a live Claude Code session — verify the exact stdin
 * field names against the installed Claude Code version before relying on
 * it, and widen INPUT FIELD EXTRACTION below if a real payload uses a field
 * this script doesn't check.
 *
 * Graduated controls (mirrors ECC's gateguard pattern):
 *   CHWEZI_FONT_GATE=off              — disable entirely for the session
 *   CHWEZI_FONT_EXEMPT_GLOBS=a,b,c    — comma-separated globs (matched
 *                                       against the project-relative target
 *                                       path) that skip the gate — vendored
 *                                       CSS, node_modules, third-party themes
 *
 * Fails open: if the doctrine sidecar can't be read, or the payload can't be
 * parsed, the hook allows the operation and prints a warning to stderr
 * rather than blocking on its own malfunction.
 */

'use strict';

if (!require('./plugin-hook-config').isEnabled()) process.exit(0);

const fs = require('fs');
const path = require('path');

const DOCTRINE_PATH = path.join(__dirname, '..', 'doctrine', 'references', 'ai-slop-banned-fonts.json');
const FULL_DENIAL_DOC = 'doctrine/references/ai-slop-banned-fonts.md';
const RELEVANT_EXTENSIONS = new Set([
  '.css', '.scss', '.sass', '.less', '.html', '.htm',
  '.tsx', '.jsx', '.ts', '.js', '.vue', '.svelte',
  '.py', // python-docx / python-pptx font assignment
  // Diagram files (M10-07, AR-13): SVG exports, Mermaid sources and JSON
  // configs (Mermaid config, figure IR, theme files). For .json only the
  // "fontFamily" key is inspected, so manifests and data files are not
  // scanned for CSS-shaped text.
  '.svg', '.mmd', '.json',
]);
const DIAGRAM_EXTENSIONS = new Set(['.svg', '.mmd']);

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch (e) {
    return '';
  }
}

function loadDoctrine() {
  try {
    return JSON.parse(fs.readFileSync(DOCTRINE_PATH, 'utf8'));
  } catch (e) {
    return null;
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
  const raw = process.env.CHWEZI_FONT_EXEMPT_GLOBS;
  if (!raw) return false;
  const normalized = targetPath.split(path.sep).join('/').toLowerCase();
  return raw
    .split(',')
    .map((g) => g.trim())
    .filter(Boolean)
    .some((glob) => globToRegExp(glob).test(normalized));
}

/**
 * Extracts the text content a Write/Edit/MultiEdit call is about to
 * introduce, from whichever field the payload actually uses. Concatenates
 * everything found so a MultiEdit's several new_string values are all
 * checked, not just the first.
 */
function extractWrittenText(toolInput) {
  if (!toolInput || typeof toolInput !== 'object') return '';
  const parts = [];
  if (typeof toolInput.content === 'string') parts.push(toolInput.content);
  if (typeof toolInput.new_string === 'string') parts.push(toolInput.new_string);
  if (typeof toolInput.file_text === 'string') parts.push(toolInput.file_text);
  if (Array.isArray(toolInput.edits)) {
    for (const e of toolInput.edits) {
      if (e && typeof e.new_string === 'string') parts.push(e.new_string);
      if (e && typeof e.newText === 'string') parts.push(e.newText);
    }
  }
  return parts.join('\n');
}

function extractTargetPath(toolInput) {
  if (!toolInput) return '';
  return toolInput.file_path || toolInput.path || toolInput.filePath || '';
}

/**
 * Checks CSS-style font-family declarations for a banned family in the
 * PRIMARY (first) position of the stack — a banned face named later as a
 * fallback is not what this gate exists to catch, since the doctrine bans
 * banned-as-PRIMARY, not banned-as-anywhere-in-a-fallback-chain.
 */
function findBannedInCssFontFamily(text, bannedNames, bannedPrefixes = []) {
  const hits = [];
  const re = /font-family\s*:\s*([^;}"']+)/gi;
  let m;
  while ((m = re.exec(text))) {
    const stack = m[1].split(',')[0].trim().replace(/["']/g, '');
    for (const name of bannedNames) {
      if (stack.toLowerCase() === name.toLowerCase()) {
        hits.push({ family: name, context: m[0].trim() });
      }
    }
    for (const prefix of bannedPrefixes) {
      if (stack.toLowerCase().startsWith(prefix.toLowerCase())) {
        hits.push({ family: stack, context: m[0].trim() });
      }
    }
  }
  return hits;
}

/**
 * Checks for a banned family name inside a quoted string literal anywhere
 * in the text — the fallback check for document-generation code
 * (python-docx `run.font.name = "Inter"`, pptx equivalents, JS font-name
 * assignment) where there is no CSS-shaped declaration to anchor on.
 */
function findBannedInQuotedLiteral(text, bannedNames) {
  const hits = [];
  for (const name of bannedNames) {
    const re = new RegExp(`["'\`]${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'\`]`, 'g');
    if (re.test(text)) hits.push({ family: name, context: `quoted literal "${name}"` });
  }
  return hits;
}

/**
 * Whole-superfamily bans (doctrine.hardBanFamilyPrefixes, e.g. "IBM Plex"):
 * any quoted family name that begins with the prefix — "IBM Plex Sans",
 * "IBM Plex Sans Arabic", a future Plex cut — is caught, not only the
 * exact names enumerated in hardBan.
 */
function findBannedPrefixInQuotedLiteral(text, bannedPrefixes) {
  const hits = [];
  for (const prefix of bannedPrefixes) {
    const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`["'\`](${escaped}[^"'\`\\n]{0,40})["'\`]`, 'g');
    let m;
    while ((m = re.exec(text))) {
      hits.push({ family: m[1], context: `quoted literal "${m[1]}"` });
    }
  }
  return hits;
}

function stackFamilies(stack) {
  return stack
    .split(',')
    .map((f) => f.replace(/\\/g, '').replace(/["'`]/g, '').trim())
    .filter(Boolean);
}

function isBannedFamily(family, bannedNames, bannedPrefixes) {
  const low = family.toLowerCase();
  return bannedNames.some((n) => n.toLowerCase() === low) ||
    bannedPrefixes.some((p) => low.startsWith(p.toLowerCase()));
}

/**
 * Diagram-file font stacks (M10-07, AR-13):
 *   - SVG attribute   font-family="Arial, sans-serif"  or  font-family='…'
 *   - Mermaid / JSON  "fontFamily": "Inter"  (JSON form, including inside a
 *                     %%{init: …}%% directive) and 'fontFamily': 'Inter' or
 *                     fontFamily: 'Inter' (single-quoted directive form)
 * Returns { hits, fallbacks }: hits are banned PRIMARY families (block);
 * fallbacks are banned families later in the stack (warn only, because
 * renderers fall back silently when the primary face is missing).
 */
function findBannedInDiagramStacks(text, bannedNames, bannedPrefixes, { svgAttr, fontFamilyKey, cssStack }) {
  const hits = [];
  const fallbacks = [];
  const patterns = [];
  if (svgAttr) patterns.push({ re: /font-family\s*=\s*(["'])(.*?)\1/gi, group: 2 });
  if (cssStack) {
    // CSS inside <style>, style="…" or a Mermaid themeCSS string, including
    // quoted stacks the plain CSS matcher stops at
    // (font-family:"trebuchet ms",verdana,arial).
    patterns.push({ re: /font-family\s*:\s*([^;}<>]+)/gi, group: 1 });
  }
  if (fontFamilyKey) {
    patterns.push({ re: /(["']?)fontFamily\1\s*:\s*"((?:\\.|[^"\\])*)"/g, group: 2 });
    patterns.push({ re: /(["']?)fontFamily\1\s*:\s*'((?:\\.|[^'\\])*)'/g, group: 2 });
  }
  for (const { re, group } of patterns) {
    let m;
    while ((m = re.exec(text))) {
      const families = stackFamilies(m[group]);
      families.forEach((family, idx) => {
        if (!isBannedFamily(family, bannedNames, bannedPrefixes)) return;
        const rec = { family, context: m[0].trim().slice(0, 120) };
        if (idx === 0) hits.push(rec);
        else fallbacks.push(rec);
      });
    }
  }
  return { hits, fallbacks };
}

function main() {
  if (['off', '0', 'false', 'disabled', 'disable'].includes((process.env.CHWEZI_FONT_GATE || '').toLowerCase())) {
    process.exit(0);
  }

  const raw = readStdin();
  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (e) {
    // Can't parse the payload — fail open, this hook must never be the
    // reason a legitimate edit is blocked by its own malfunction.
    process.exit(0);
  }

  const toolInput = payload.tool_input || payload.toolInput || payload.input || {};
  const targetPath = extractTargetPath(toolInput);
  const ext = path.extname(targetPath).toLowerCase();
  if (!RELEVANT_EXTENSIONS.has(ext)) process.exit(0);
  if (isExempt(targetPath)) process.exit(0);

  const doctrine = loadDoctrine();
  if (!doctrine) {
    console.error('[chwezi:banned-font-gate] Could not load doctrine sidecar — allowing (fail-open). Check doctrine/references/ai-slop-banned-fonts.json.');
    process.exit(0);
  }

  const bannedPrimaryOnly = []
    .concat((doctrine.hardBan || []).map((f) => f.family))
    .concat((doctrine.secondaryBan || []).map((f) => f.family))
    .concat((doctrine.conditionalPrimaryOnly || []).map((f) => f.family));

  const bannedPrefixes = (doctrine.hardBanFamilyPrefixes || [])
    .map((f) => f.prefix)
    .filter(Boolean);

  const text = extractWrittenText(toolInput);
  if (!text) process.exit(0);

  const isJson = ext === '.json';
  const isDiagram = DIAGRAM_EXTENSIONS.has(ext);
  const diagram = (isJson || isDiagram)
    ? findBannedInDiagramStacks(text, bannedPrimaryOnly, bannedPrefixes, {
      svgAttr: ext === '.svg',
      fontFamilyKey: true,
      cssStack: isDiagram,
    })
    : { hits: [], fallbacks: [] };

  let hits;
  if (isJson) {
    hits = diagram.hits; // .json: only the fontFamily key form is inspected
  } else if (isDiagram) {
    // Diagram files: stack-aware matchers only, so a banned face named as a
    // fallback warns instead of tripping the bare quoted-literal check.
    hits = [...findBannedInCssFontFamily(text, bannedPrimaryOnly, bannedPrefixes), ...diagram.hits];
  } else {
    hits = [
      ...findBannedInCssFontFamily(text, bannedPrimaryOnly, bannedPrefixes),
      ...findBannedInQuotedLiteral(text, bannedPrimaryOnly),
      ...findBannedPrefixInQuotedLiteral(text, bannedPrefixes),
    ];
  }

  if (isDiagram && diagram.fallbacks.length > 0) {
    const names = [...new Set(diagram.fallbacks.map((f) => f.family))].join(', ');
    console.error(
      `[chwezi:banned-font-gate] WARNING — banned font(s) named as a fallback in a diagram stack: ${names}. ` +
      'Renderers fall back silently when the primary face is missing; load the approved face explicitly ' +
      'and record a font-substitution check (see diagram-visual-standards.md). Not blocked.'
    );
  }

  if (hits.length === 0) process.exit(0);

  const unique = [...new Map(hits.map((h) => [h.family, h])).values()];
  const names = unique.map((h) => h.family).join(', ');

  console.error(
    `BLOCKED — banned AI-slop font used as primary type: ${names}\n` +
    `Chwezi doctrine requires a stated typeface choice with rationale traceable to human design\n` +
    `authority (typographer, foundry, or design literature) — never an AI tool's own recommendation.\n` +
    `See ${FULL_DENIAL_DOC} for the full list and the reasoning behind each ban.\n` +
    `If this project has an explicit client brand guideline mandating this font, state that\n` +
    `explicitly and record it — the doctrine's edge-case exception covers that, not a silent skip.\n` +
    `Override for this session only: CHWEZI_FONT_GATE=off (use sparingly and never by default).`
  );
  process.exit(2);
}

main();
