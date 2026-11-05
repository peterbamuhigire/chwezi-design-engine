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

// -- DG6 (2026-11): a quoted banned name counts only when it is used as a font ------
// Several family names are ordinary words or terms of art, so a bare quoted literal
// proves nothing. The payloads below are built from fragments, so this file holds no
// quoted family name and these tests do not trip the gate they test. Every expectation
// is a literal exit code chosen from the gate's contract, not a value computed by the
// code under test.
const part = (...p) => p.join('');
const dq = (s) => '"' + s + '"';
const sq = (s) => "'" + s + "'";
const LORA = part('Lo', 'RA'); // the model-adaptation term; also a banned family name
const LORA_MIXED = part('Lo', 'ra');
const ROBOTO = part('Ro', 'boto');
const INTER = part('In', 'ter');
const POPPINS = part('Pop', 'pins');
const OUTFIT = part('Out', 'fit');
const ARIAL = part('Ar', 'ial');
const MONTSERRAT = part('Mont', 'serrat');
const PLEX_PREFIX = part('IB', 'M Pl', 'ex ');
const PLEX_SERIF = part(PLEX_PREFIX, 'Ser', 'if');
const PLEX_TAMIL = part(PLEX_PREFIX, 'Sans ', 'Tamil');

// Not a font assignment: the gate must allow each (exit 0).
const NOT_A_FONT = [
  ['Python list holding the upper-case adaptation tag', 'w.py', 'tags = [' + dq('SYNTH') + ', ' + dq(LORA) + ']'],
  ['Python assignment of the mixed-case term', 'w.py', 'x = ' + dq(LORA_MIXED)],
  ['Python replace chain with placeholder digits', 'w.py', 'def fix(x): return x.replace(' + dq('L0RA') + ', ' + dq(LORA) + ').replace(' + dq('L0ra') + ', ' + dq(LORA_MIXED) + ')'],
  ['JavaScript constant', 'w.js', 'const adapter = ' + dq(LORA) + ';'],
  ['TypeScript tags array', 'w.ts', 'const tags: string[] = [' + dq('SYNTH') + ', ' + dq(LORA) + '];'],
  ['TSX constant in single quotes', 'w.tsx', 'export const kind = ' + sq(LORA_MIXED) + ';'],
  ['ordinary-word category in Python', 'w.py', 'category = ' + dq(OUTFIT)],
  ['multi-line list of adapter kinds', 'w.py', 'ADAPTERS = [\n    ' + dq(LORA) + ',\n    ' + dq('QLoRA') + ',\n]'],
  ['comparison, not an assignment', 'w.py', 'if model.kind == ' + dq(LORA_MIXED) + ':\n    pass'],
  ['HTML data attribute', 'w.html', '<span data-kind=' + dq(LORA) + '>x</span>'],
  ['CSS content string', 'w.css', '.note::after { content: ' + dq(INTER) + '; }'],
  ['keyword argument of an unrelated call', 'w.py', 'registry.register(name=' + dq(LORA) + ', kind=' + dq('adapter') + ')'],
  ['keyword argument named method', 'w.py', '# font gate note\ntrain(method=' + dq(LORA) + ')'],
  ['later key on a line whose first key is font-named', 'w.py', 'd = {' + dq('font_name') + ': ' + dq('Calibri') + ', ' + dq('tag') + ': ' + dq(LORA) + '}'],
  ['second statement after a semicolon', 'w.py', 'fonts_dir = ' + dq('/tmp/fonts') + '; tag = ' + dq(LORA)],
  ['trailing comment mentions a font', 'w.py', 'x = ' + dq(LORA_MIXED) + '  # font adapter'],
  ['adaptation tag beside an approved face', 'w.py', 'tags = [' + dq(LORA) + ']\nrun.font.name = ' + dq('Public Sans')],
  ['default of an unrelated parameter', 'w.py', 'def load(kind=' + dq(LORA_MIXED) + '):\n    return kind'],
  ['Vue component prop', 'w.vue', '<Badge label=' + dq(OUTFIT) + ' />'],
];
// A real font assignment: the gate must still block each (exit 2).
const FONT_ASSIGNMENTS = [
  ['python-docx run font, mixed-case face', 'a.py', 'run.font.name = ' + dq(LORA_MIXED)],
  ['python-docx run font, single quotes', 'a.py', 's.font.name = ' + sq(ROBOTO)],
  ['python-docx run font, value on the next line', 'a.py', 'run.font.name = (\n    ' + dq(ROBOTO) + '\n)'],
  ['python-docx style font through a subscript', 'a.py', 'doc.styles[' + dq('Normal') + '].font.name = ' + dq(ROBOTO)],
  ['python-docx font object assignment', 'a.py', 'font = run.font\nfont.name = ' + dq(ROBOTO)],
  ['python-pptx font name, secondary-ban face', 'a.py', 'p.font.name = ' + dq(MONTSERRAT)],
  ['python-pptx font name, listed prefix-ban face', 'a.py', 'run.font.name = ' + dq(PLEX_SERIF)],
  ['python-pptx font name, unlisted prefix-ban face', 'a.py', 'run.font.name = ' + dq(PLEX_TAMIL)],
  ['python-docx east-asian run font through qn', 'a.py', 'rPr.rFonts.set(qn(' + dq('w:eastAsia') + '), ' + dq(ROBOTO) + ')'],
  ['python-docx run-font attribute in XML text', 'a.py', "xml = '<w:rFonts w:ascii=" + dq(ROBOTO) + " w:hAnsi=" + dq(ROBOTO) + "/>'"],
  ['python-docx run-font attribute map', 'a.py', 'rfonts.attrib[qn(' + dq('w:ascii') + ')] = ' + dq(ROBOTO)],
  ['openpyxl Font with a name keyword', 'a.py', 'ws[' + dq('A1') + '].font = Font(name=' + dq(ROBOTO) + ', size=11)'],
  ['openpyxl Font with the name on its own line', 'a.py', 'cell.font = Font(\n    name=' + dq(ROBOTO) + ',\n    size=11,\n)'],
  ['openpyxl Font with a positional name', 'a.py', 'f = Font(' + dq(INTER) + ', bold=True)'],
  ['openpyxl Font after another keyword', 'a.py', 'ws.cell(row=1, column=1).font = Font(color=' + dq('FF0000') + ', name=' + dq(ROBOTO) + ')'],
  ['openpyxl named style', 'a.py', 'st = NamedStyle(name=' + dq('h') + ', font=Font(name=' + dq(ROBOTO) + '))'],
  ['xlsxwriter format with a font_name key', 'a.py', 'fmt = wb.add_format({' + dq('font_name') + ': ' + dq(ROBOTO) + ', ' + dq('bold') + ': True})'],
  ['xlsxwriter set_font_name call', 'a.py', 'fmt.set_font_name(' + dq(ROBOTO) + ')'],
  ['reportlab setFont call', 'a.py', 'c.setFont(' + dq(ROBOTO) + ', 12)'],
  ['reportlab registerFont with TTFont', 'a.py', 'pdfmetrics.registerFont(TTFont(' + dq(INTER) + ', ' + dq('x.ttf') + '))'],
  ['reportlab ParagraphStyle fontName', 'a.py', 'style = ParagraphStyle(' + dq('body') + ', fontName=' + dq(ROBOTO) + ')'],
  ['reportlab font family registration', 'a.py', 'registerFontFamily(' + dq('Brand') + ', normal=' + dq(ROBOTO) + ', bold=' + dq(ROBOTO) + ')'],
  ['fpdf set_font call', 'a.py', 'pdf.set_font(' + dq(ROBOTO) + ', size=12)'],
  ['Pillow ImageFont.truetype', 'a.py', 'f = ImageFont.truetype(' + dq(ROBOTO) + ', 12)'],
  ['font-named constant', 'a.py', 'HEADING_FONT = ' + dq(INTER)],
  ['typeface-named constant', 'a.py', 'TYPEFACE = ' + dq(ROBOTO)],
  ['font table keyed by role', 'a.py', 'FONTS = {' + dq('heading') + ': ' + dq(ROBOTO) + ', ' + dq('body') + ': ' + dq('Public Sans') + '}'],
  ['font table over several lines', 'a.py', 'FONTS = {\n    ' + dq('heading') + ': ' + dq(ROBOTO) + ',\n}'],
  ['font stack list, banned face second', 'a.py', 'font_stack = [' + dq('Public Sans') + ', ' + dq(INTER) + ']'],
  ['font-named subscript assignment', 'a.py', 'fonts[' + dq('heading') + '] = ' + dq(ROBOTO)],
  ['nested font key', 'a.py', 'cfg = {' + dq('font') + ': {' + dq('name') + ': ' + dq(ROBOTO) + '}}'],
  ['matplotlib rcParams font.family', 'a.py', 'plt.rcParams[' + dq('font.family') + '] = ' + dq(ROBOTO)],
  ['matplotlib rcParams font.sans-serif list', 'a.py', 'plt.rcParams[' + dq('font.sans-serif') + '] = [' + dq(INTER) + ', ' + dq('DejaVu Sans') + ']'],
  ['matplotlib rc with a font group', 'a.py', 'plt.rc(' + dq('font') + ', family=' + dq(ROBOTO) + ')'],
  ['plotly nested font dict', 'a.py', 'fig.update_layout(font=dict(family=' + dq(ROBOTO) + '))'],
  ['plotly font_family keyword', 'a.py', 'fig.update_layout(font_family=' + dq(ROBOTO) + ')'],
  ['font keyword of a plotting call', 'a.py', 'sns.set(font=' + dq(ROBOTO) + ')'],
  ['adaptation tag and a real assignment in one file', 'a.py', 'tags = [' + dq(LORA) + ']\nrun.font.name = ' + dq(ROBOTO)],
  ['real assignment after a statement separator', 'a.py', 'label = ' + dq(LORA) + '; run.font.name = ' + dq(ROBOTO)],
  ['JavaScript style fontFamily setter', 'a.js', 'el.style.fontFamily = ' + dq(INTER) + ';'],
  ['JavaScript fontFamily constant', 'a.js', 'const fontFamily = ' + dq(INTER) + ';'],
  ['JavaScript theme fontFamily with inner quotes', 'a.js', 'theme.typography.fontFamily = ' + sq(dq(ROBOTO)) + ';'],
  ['JavaScript canvas font shorthand with a quoted face', 'a.js', 'ctx.font = ' + sq('16px ' + dq(INTER)) + ';'],
  ['JavaScript docx TextRun font', 'a.js', 'new TextRun({ text: ' + dq('Hi') + ', font: ' + dq(ROBOTO) + ' })'],
  ['JavaScript pptxgenjs fontFace', 'a.js', 'slide.addText(' + dq('Hi') + ', { fontFace: ' + dq(ARIAL) + ' });'],
  ['JavaScript object font key', 'a.js', 'export const display = { font: ' + dq(POPPINS) + ' };'],
  ['JavaScript jsPDF setFont', 'a.js', 'doc.setFont(' + dq(ROBOTO) + ');'],
  ['JavaScript setFontFamily', 'a.js', 'setFontFamily(' + sq(INTER) + ');'],
  ['JavaScript Font constructor', 'a.js', 'const f = new Font(' + dq(ROBOTO) + ');'],
  ['JavaScript ExcelJS font object', 'a.js', 'ws.getCell(' + dq('A1') + ').font = { name: ' + dq(ROBOTO) + ' };'],
  ['JavaScript ExcelJS font object over lines', 'a.js', 'cell.font = {\n  name: ' + sq(ROBOTO) + ',\n  size: 12\n};'],
  ['TypeScript ExcelJS font object', 'a.ts', 'cell.font = { name: ' + sq(ROBOTO) + ', size: 12 };'],
  ['TypeScript typeface constant', 'a.ts', 'const typeface = ' + sq(INTER) + ';'],
  ['TSX font prop', 'a.tsx', '<Text font=' + dq(ROBOTO) + ' />'],
  ['TSX inline style fontFamily', 'a.tsx', 'const s = <div style={{ fontFamily: ' + dq(POPPINS) + ' }} />;'],
  ['Svelte font-family attribute', 'a.svelte', '<p style:font-family=' + dq(INTER) + '>x</p>'],
  ['Vue SVG font-family attribute', 'a.vue', '<text font-family=' + dq(INTER) + '>x</text>'],
  ['HTML font tag face attribute', 'a.html', '<font face=' + dq(INTER) + '>x</font>'],
  ['HTML Tailwind arbitrary font class', 'a.html', '<div class="font-[' + sq(ROBOTO) + ']">x</div>'],
  ['CSS font shorthand with a quoted face', 'a.css', 'h1 { font: 700 2rem ' + dq(INTER) + ', sans-serif; }'],
  ['CSS font shorthand after another property', 'a.css', 'a { color: red; font: 12px ' + dq(INTER) + '; }'],
  ['CSS font shorthand with a size and line height', 'a.css', 'h1 { font: bold 24px/1.2 ' + dq(ROBOTO) + ', serif }'],
  ['CSS font-family declaration', 'a.css', 'body { font-family: ' + INTER + ', sans-serif; }'],
  ['CSS font-family declaration with a quoted face', 'a.css', 'body { font-family: ' + dq(POPPINS) + ', sans-serif; }'],
];
for (const [name, file, content] of NOT_A_FONT) {
  cases.push({ name: 'DG6 not a font, ALLOW: ' + name, payload: { tool_input: { file_path: '/proj/src/' + file, content } }, expect: 0 });
}
for (const [name, file, content] of FONT_ASSIGNMENTS) {
  cases.push({ name: 'DG6 font assignment, BLOCK: ' + name, payload: { tool_input: { file_path: '/proj/src/' + file, content } }, expect: 2 });
}
cases.push(
  { name: 'DG6 an existing exemption glob still allows a real assignment', payload: { tool_input: { file_path: '/proj/vendor/gen.py', content: 'run.font.name = ' + dq(ROBOTO) } }, env: { CHWEZI_FONT_EXEMPT_GLOBS: '**/vendor/**' }, expect: 0 },
  { name: 'DG6 a document-generator literal in a MultiEdit is still checked', payload: { tool_input: { file_path: '/proj/gen/report.py', edits: [{ new_string: 'tags = [' + dq(LORA) + ']' }, { new_string: 'run.font.name = ' + dq(ROBOTO) }] } }, expect: 2 },
  { name: 'DG6 a MultiEdit with only the adaptation tag is allowed', payload: { tool_input: { file_path: '/proj/gen/report.py', edits: [{ new_string: 'tags = [' + dq(LORA) + ']' }] } }, expect: 0 },
);

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
