// Proves every flag fixture is rule-specific: (1) --disable-rule <id> removes the
// rule's finding; (2) replacing the rule's check function with a no-op removes it
// too, so deleting any check function makes this suite fail.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { runDetector } from '../lib/detector.mjs';
import { loadRegistry } from '../lib/registry.mjs';
import { CHECKS } from '../lib/checks.mjs';
import { DRIFT_CHECKS } from '../lib/drift.mjs';
import { ROOT } from './helpers.mjs';

const staticRules = loadRegistry().rules.filter((r) => r.tier !== 'browser');
const has = (report, id) => report.findings.some((f) => f.rule === id);

for (const rule of staticRules) {
  test(`${rule.id}: finding comes from its own check`, async () => {
    const flag = path.join(ROOT, rule.fixtures.flag);
    const base = await runDetector({ paths: [flag], cwd: ROOT });
    assert.ok(has(base.report, rule.id), 'flag fixture does not report the rule');

    const disabled = await runDetector({ paths: [flag], cwd: ROOT, disableRule: [rule.id] });
    assert.ok(!has(disabled.report, rule.id), '--disable-rule did not remove the finding');

    const table = rule.check.kind === 'drift' ? DRIFT_CHECKS : CHECKS;
    const original = table[rule.check.name];
    table[rule.check.name] = () => [];
    try {
      const mutated = await runDetector({ paths: [flag], cwd: ROOT });
      assert.ok(!has(mutated.report, rule.id), 'finding survived deletion of the check function');
    } finally {
      table[rule.check.name] = original;
    }
  });
}
