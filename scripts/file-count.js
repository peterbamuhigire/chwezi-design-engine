'use strict';

const fs = require('fs');
const path = require('path');

const LIMIT = 5000;
const PACKAGE_EXCLUDES = new Set(['.git', '.cache', 'cache', '__pycache__', 'node_modules', '.venv', 'venv']);

function countEntries(root, mode = 'checkout') {
  let count = 0;
  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (mode === 'package' && PACKAGE_EXCLUDES.has(entry.name)) continue;
        visit(full);
      } else {
        count += 1;
      }
    }
  }
  visit(root);
  return count;
}

function assertWithinLimit(root) {
  for (const mode of ['checkout', 'package']) {
    const count = countEntries(root, mode);
    if (count > LIMIT) throw new Error(`${mode} has ${count} entries; maximum is ${LIMIT}`);
  }
}

module.exports = { LIMIT, countEntries, assertWithinLimit };
