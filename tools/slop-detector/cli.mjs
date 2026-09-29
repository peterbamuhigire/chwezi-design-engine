#!/usr/bin/env node
// chwezi-slop: deterministic slop detector for the Chwezi design engine (M10-09).
// Usage: node tools/slop-detector/cli.mjs [options] <file|dir|url>...
// See tools/slop-detector/README.md for the CLI contract, exit codes and waivers.
import fs from 'node:fs';
import path from 'node:path';
import { runDetector, formatText, VERSION } from './lib/detector.mjs';
import { loadRegistry, validateRegistry, registrySha256, REGISTRY_PATH, ENGINE_ROOT } from './lib/registry.mjs';
import { doctrineConsistency } from './lib/doctrine-consistency.mjs';

const HELP = `chwezi-slop ${VERSION}
Usage: node tools/slop-detector/cli.mjs [options] <file|dir|url>...

  --json                  JSON report on stdout
  --tier <t>              immediate | deep (default: all static rules) | browser | all
  --rule <id>             run only this rule (repeatable or comma-separated)
  --disable-rule <id>     skip this rule (repeatable or comma-separated)
  --mode <m>              persuade | operate | read | experience (rules whose modes include m)
  --tokens <path>         design token file for the drift rules
  --fail-on <sev>         block (default) | warning
  --no-waivers            ignore inline and .chwezi/slop.json waivers
  --extra-rules <json>    data-only rule pack (regex / phrase-list); repeatable
  --allow-remote          browser tier may load non-local URLs
  --out <file>            also write the JSON report to a file
  --validate-registry     validate rules/registry.json (schema, ids, checks, fixtures, doctrine refs)
  --doctrine-consistency  font doctrine self-check (baselines vs ban lists; banned font folders reported)
  --list-rules            list registered rules
  --version, --help

Exit codes: 0 no failing findings; 2 failing findings; 1 operational failure (takes precedence).
Advisory findings never fail; warning fails only with --fail-on warning.`;

function parseArgs(argv) {
  const o = { paths: [], rule: [], disableRule: [], extraRules: [] };
  const multi = (v) => v.split(',').map((s) => s.trim()).filter(Boolean);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => { if (i + 1 >= argv.length) throw new Error(`${a} needs a value`); return argv[++i]; };
    switch (a) {
      case '--json': o.json = true; break;
      case '--tier': o.tier = next(); break;
      case '--rule': o.rule.push(...multi(next())); break;
      case '--disable-rule': o.disableRule.push(...multi(next())); break;
      case '--mode': o.mode = next(); break;
      case '--tokens': o.tokens = next(); break;
      case '--fail-on': o.failOn = next(); if (!['block', 'warning'].includes(o.failOn)) throw new Error('--fail-on must be block or warning'); break;
      case '--no-waivers': o.noWaivers = true; break;
      case '--extra-rules': o.extraRules.push(next()); break;
      case '--allow-remote': o.allowRemote = true; break;
      case '--out': o.out = next(); break;
      case '--validate-registry': o.validate = true; break;
      case '--doctrine-consistency': o.consistency = true; break;
      case '--list-rules': o.list = true; break;
      case '--version': o.version = true; break;
      case '-h': case '--help': o.help = true; break;
      default:
        if (a.startsWith('--')) throw new Error(`unknown option ${a}`);
        o.paths.push(a);
    }
  }
  return o;
}

async function main() {
  let o;
  try { o = parseArgs(process.argv.slice(2)); } catch (e) { console.error(`chwezi-slop: ${e.message}`); return 1; }
  if (o.help) { console.log(HELP); return 0; }
  if (o.version) { console.log(VERSION); return 0; }

  if (o.validate) {
    let errors;
    let rules = [];
    try {
      const reg = loadRegistry();
      rules = reg.rules;
      errors = validateRegistry(reg, { root: ENGINE_ROOT });
    } catch (e) { errors = [e.message]; }
    const out = { registry: path.relative(process.cwd(), REGISTRY_PATH).split(path.sep).join('/'), sha256: fs.existsSync(REGISTRY_PATH) ? registrySha256() : null, rules: rules.length, static_rules: rules.filter((r) => r.tier !== 'browser').length, browser_rules: rules.filter((r) => r.tier === 'browser').length, errors };
    if (o.json) console.log(JSON.stringify(out, null, 2));
    else {
      for (const e of errors) console.log(`FAIL ${e}`);
      console.log(`${errors.length ? 'FAIL' : 'PASS'}: ${out.rules} rules (${out.static_rules} static, ${out.browser_rules} browser); sha256 ${out.sha256}`);
    }
    return errors.length ? 1 : 0;
  }

  if (o.consistency) {
    const res = doctrineConsistency(ENGINE_ROOT);
    if (o.json) console.log(JSON.stringify(res, null, 2));
    else {
      for (const c of res.conflicts) console.log(`CONFLICT ${c.family} (${c.list}) is an approved baseline at ${c.file}:${c.line}`);
      for (const f of res.folders) console.log(`REPORT ${f.folder} holds banned family ${f.family} (${f.action})`);
      console.log(`${res.ok ? 'PASS' : 'FAIL'}: ${res.conflicts.length} baseline/ban conflict(s); ${res.folders.length} banned font folder(s) reported`);
    }
    return res.ok ? 0 : 2;
  }

  if (o.list) {
    const reg = loadRegistry();
    for (const r of reg.rules) console.log(`${r.id.padEnd(38)} ${r.as_overlay} ${r.severity.padEnd(8)} ${r.tier.padEnd(9)} ${r.name || ''}`);
    return 0;
  }

  const { report, exitCode } = await runDetector({ ...o, cwd: process.cwd() });
  const json = JSON.stringify(report, null, 2);
  if (o.out) fs.writeFileSync(o.out, json + '\n');
  console.log(o.json ? json : formatText(report));
  return exitCode;
}

main().then((code) => { process.exitCode = code; }, (e) => { console.error(`chwezi-slop: operational failure: ${e.stack || e.message}`); process.exitCode = 1; });
