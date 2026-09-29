#!/usr/bin/env node
/**
 * test-banned-font-gate.js — direct unit test of banned-font-gate.js.
 * Runs the hook as a child process with a synthesized stdin payload and
 * checks the exit code, since that's the actual contract Claude Code uses
 * (exit 0 = allow, exit 2 = block). Run: node hooks/test-banned-font-gate.js
 */

'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const HOOK = path.join(__dirname, 'banned-font-gate.js');

function run(payload, env = {}) {
  const result = spawnSync(process.execPath, [HOOK], {
    input: JSON.stringify(payload),
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });
  return { code: result.status, stderr: result.stderr };
}

const cases = [
  {
    name: 'CSS primary Inter — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: Inter, sans-serif; }' } },
    expect: 2,
  },
  {
    name: 'CSS primary Geist — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.scss', content: '.h1 { font-family: "Geist", sans-serif; }' } },
    expect: 2,
  },
  {
    name: 'CSS fallback-only Inter (not primary) — ALLOW',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: "Canela", Inter, sans-serif; }' } },
    expect: 0,
  },
  {
    name: 'Approved font Canela — ALLOW',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: "Canela", serif; }' } },
    expect: 0,
  },
  {
    name: 'python-docx quoted literal Roboto — BLOCK',
    payload: { tool_input: { file_path: '/proj/gen/report.py', content: 'run.font.name = "Roboto"' } },
    expect: 2,
  },
  {
    name: 'MultiEdit new_string with Poppins — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.tsx', edits: [{ new_string: 'fontFamily: "Poppins"' }] } },
    expect: 2,
  },
  {
    name: 'Non-relevant extension (.md) — ALLOW without even checking',
    payload: { tool_input: { file_path: '/proj/README.md', content: 'font-family: Inter' } },
    expect: 0,
  },
  {
    name: 'Exempt glob covers target — ALLOW despite banned font',
    payload: { tool_input: { file_path: '/proj/node_modules/theme/App.css', content: 'font-family: Inter;' } },
    env: { CHWEZI_FONT_EXEMPT_GLOBS: '**/node_modules/**' },
    expect: 0,
  },
  {
    name: 'CHWEZI_FONT_GATE=off — ALLOW despite banned font',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'font-family: Inter;' } },
    env: { CHWEZI_FONT_GATE: 'off' },
    expect: 0,
  },
  {
    name: 'Malformed stdin — fail open, ALLOW',
    payload: null, // handled specially below
    expect: 0,
  },
  {
    name: 'Source Sans 3 as primary — BLOCK (conditional-primary-only ban)',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'h1 { font-family: "Source Sans 3", sans-serif; }' } },
    expect: 2,
  },
  {
    name: 'CSS primary Fraunces (HOUSE ban 2026-09-29) — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'h1 { font-family: Fraunces, Georgia, serif; }' } },
    expect: 2,
  },
  {
    name: 'Quoted primary "Fraunces" — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'h1 { font-family: "Fraunces", serif; }' } },
    expect: 2,
  },
  {
    name: 'Quoted primary "IBM Plex Sans" (HOUSE ban) — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: "IBM Plex Sans", sans-serif; }' } },
    expect: 2,
  },
  {
    name: 'Unquoted primary IBM Plex Mono — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'code { font-family: IBM Plex Mono, monospace; }' } },
    expect: 2,
  },
  {
    name: 'python-docx "IBM Plex Serif" literal — BLOCK',
    payload: { tool_input: { file_path: '/proj/gen/report.py', content: 'run.font.name = "IBM Plex Serif"' } },
    expect: 2,
  },
  {
    name: 'Unlisted Plex cut "IBM Plex Sans Tamil" caught by prefix — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.tsx', content: 'fontFamily: "IBM Plex Sans Tamil"' } },
    expect: 2,
  },
  {
    name: 'Replacement faces Andada Pro + Public Sans + JetBrains Mono — ALLOW',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'h1 { font-family: "Andada Pro", serif; } body { font-family: "Public Sans", sans-serif; } code { font-family: "JetBrains Mono", monospace; }' } },
    expect: 0,
  },
  // -- Diagram files (M10-07, AR-13) ------------------------------------------
  {
    name: 'SVG attribute font-family="Arial" — BLOCK',
    payload: { tool_input: { file_path: '/proj/_figures/fig-1.svg', content: '<svg><text font-family="Arial" x="0">Label</text></svg>' } },
    expect: 2,
  },
  {
    name: "SVG attribute font-family='Inter, sans-serif' (single quotes) — BLOCK",
    payload: { tool_input: { file_path: '/proj/fig.svg', content: "<svg><g font-family='Inter, sans-serif'/></svg>" } },
    expect: 2,
  },
  {
    name: 'SVG <style> Mermaid default stack "trebuchet ms",verdana,arial — ALLOW with fallback warning (Trebuchet MS not banned; Arial only a fallback)',
    payload: { tool_input: { file_path: '/proj/fig.svg', content: '<svg><style>#m{font-family:"trebuchet ms",verdana,arial,sans-serif;}</style></svg>' } },
    expect: 0,
    stderrIncludes: 'fallback',
  },
  {
    name: 'SVG <style> quoted primary "Arial" — BLOCK',
    payload: { tool_input: { file_path: '/proj/fig.svg', content: '<svg><style>text{font-family:"Arial",sans-serif}</style></svg>' } },
    expect: 2,
  },
  {
    name: 'SVG with Public Sans primary — ALLOW',
    payload: { tool_input: { file_path: '/proj/fig.svg', content: '<svg><style>*{font-family:"Public Sans",sans-serif}</style><text font-family="Public Sans">A</text></svg>' } },
    expect: 0,
  },
  {
    name: 'Mermaid .mmd init directive "fontFamily":"Inter" — BLOCK',
    payload: { tool_input: { file_path: '/proj/_generated/FIG-001.mmd', content: '%%{init: {"themeVariables": {"fontFamily":"Inter"}}}%%\nflowchart LR\n  a --> b' } },
    expect: 2,
  },
  {
    name: "Mermaid .mmd single-quoted directive 'fontFamily': 'Roboto, sans-serif' — BLOCK",
    payload: { tool_input: { file_path: '/proj/fig.mmd', content: "%%{init: {'themeVariables': {'fontFamily': 'Roboto, sans-serif'}}}%%\nsequenceDiagram\n  A->>B: hi" } },
    expect: 2,
  },
  {
    name: 'Mermaid .mmd themeCSS quoted IBM Plex Sans (prefix ban) — BLOCK',
    payload: { tool_input: { file_path: '/proj/fig.mmd', content: '%%{init: {"themeCSS": "* { font-family: \'IBM Plex Sans\', sans-serif; }"}}%%\nflowchart LR\n  a --> b' } },
    expect: 2,
  },
  {
    name: 'Mermaid .mmd with JetBrains Mono — ALLOW',
    payload: { tool_input: { file_path: '/proj/fig.mmd', content: '%%{init: {"themeVariables": {"fontFamily": "JetBrains Mono, monospace"}}}%%\nerDiagram' } },
    expect: 0,
  },
  {
    name: 'Mermaid .mmd with Public Sans primary, Arial fallback — ALLOW with warning',
    payload: { tool_input: { file_path: '/proj/fig.mmd', content: '%%{init: {"themeVariables": {"fontFamily": "Public Sans, Arial, sans-serif"}}}%%\nflowchart LR' } },
    expect: 0,
    stderrIncludes: 'Arial',
  },
  {
    name: 'JSON "fontFamily": "Roboto" — BLOCK',
    payload: { tool_input: { file_path: '/proj/mermaid-config.json', content: '{\n  "theme": "neutral",\n  "fontFamily": "Roboto"\n}' } },
    expect: 2,
  },
  {
    name: 'JSON escaped-quote stack "fontFamily": "\\"Geist\\", sans-serif" — BLOCK',
    payload: { tool_input: { file_path: '/proj/theme.json', content: '{"fontFamily": "\\"Geist\\", sans-serif"}' } },
    expect: 2,
  },
  {
    name: 'JSON with Public Sans — ALLOW',
    payload: { tool_input: { file_path: '/proj/theme.json', content: '{"fontFamily": "Public Sans, sans-serif"}' } },
    expect: 0,
  },
  {
    name: 'JSON data file mentioning "Arial" outside a fontFamily key — ALLOW (only the key form is inspected in .json)',
    payload: { tool_input: { file_path: '/proj/data/fonts-seen.json', content: '{"observed": ["Arial", "Inter"], "note": "font-family: Inter"}' } },
    expect: 0,
  },
  // -- Gap closure (M10-09-T03): all five sidecar categories -----------------
  {
    name: '(a) bare system stack alone -apple-system, BlinkMacSystemFont, sans-serif — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }' } },
    expect: 2,
  },
  {
    name: '(a) bare system stack with "Segoe UI" quoted — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: system-ui, "Segoe UI", Roboto, sans-serif; }' } },
    expect: 2,
  },
  {
    name: '(a) deliberate face with system fallback "Andada Pro", system-ui, serif — ALLOW',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'h1 { font-family: "Andada Pro", system-ui, serif; }' } },
    expect: 0,
  },
  {
    name: '(a) system-ui first but a deliberate face layered in the same stack — ALLOW',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'body { font-family: system-ui, "Public Sans", sans-serif; }' } },
    expect: 0,
  },
  {
    name: '(b) monospaceBanned "Roboto Mono" first — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'code { font-family: "Roboto Mono"; }' } },
    expect: 2,
  },
  {
    name: '(b) unquoted Roboto Mono first in a stack — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.scss', content: 'pre { font-family: Roboto Mono, monospace; }' } },
    expect: 2,
  },
  {
    name: '(c) Source Sans 3 as body beneath an approved display face — ALLOW',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: 'h1 { font-family: "Andada Pro", serif; }\nbody { font-family: "Source Sans 3", sans-serif; }' } },
    expect: 0,
  },
  {
    name: '(c) python-docx body run "Source Sans 3" literal — ALLOW (no longer a quoted-literal false positive)',
    payload: { tool_input: { file_path: '/proj/gen/report.py', content: 'body_run.font.name = "Source Sans 3"' } },
    expect: 0,
  },
  {
    name: '(c) --font-display: "Source Sans 3" — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/tokens.css', content: ':root { --font-display: "Source Sans 3", sans-serif; }' } },
    expect: 2,
  },
  {
    name: '(c) Source Sans Pro first in .display-title — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/App.css', content: '.display-title { font-family: "Source Sans Pro", sans-serif; }' } },
    expect: 2,
  },
  {
    name: '(d) tailwind.config.cjs fontFamily.sans Inter — BLOCK',
    payload: { tool_input: { file_path: '/proj/tailwind.config.cjs', content: "module.exports = { theme: { extend: { fontFamily: { sans: ['Inter', 'sans-serif'] } } } };" } },
    expect: 2,
  },
  {
    name: '(d) tailwind.config.mjs with approved faces — ALLOW',
    payload: { tool_input: { file_path: '/proj/tailwind.config.mjs', content: "export default { theme: { fontFamily: { display: ['\"Andada Pro\"', 'serif'], sans: ['\"Public Sans\"', 'sans-serif'] } } };" } },
    expect: 0,
  },
  {
    name: '--font-sans custom property holding Geist — BLOCK',
    payload: { tool_input: { file_path: '/proj/src/globals.css', content: ':root { --font-sans: "Geist", sans-serif; --font-size-base: 1rem; }' } },
    expect: 2,
  },
];

let failures = 0;
for (const c of cases) {
  let result;
  if (c.payload === null) {
    const raw = spawnSync(process.execPath, [HOOK], { input: 'not json {{{', encoding: 'utf8' });
    result = { code: raw.status, stderr: raw.stderr };
  } else {
    result = run(c.payload, c.env || {});
  }
  const pass = result.code === c.expect &&
    (!c.stderrIncludes || (result.stderr || '').includes(c.stderrIncludes));
  console.log(`${pass ? 'PASS' : 'FAIL'} — ${c.name} (expected exit ${c.expect}, got ${result.code})`);
  if (!pass) {
    failures++;
    if (result.stderr) console.log(`       stderr: ${result.stderr.split('\n')[0]}`);
  }
}

console.log(`\n${cases.length - failures}/${cases.length} passed`);
process.exit(failures > 0 ? 1 : 0);
