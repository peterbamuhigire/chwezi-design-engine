// Entry point so that `node --test tools/slop-detector/test/` works on Node 22+,
// where a bare directory argument is resolved as a module (package.json "main").
// On Node 20, `node --test <dir>` already discovers every file in this folder,
// including this one; the guard below stops it importing the suites twice.
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from 'node:fs';

const here = path.dirname(fileURLToPath(import.meta.url));
const entry = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (entry !== fileURLToPath(import.meta.url)) {
  for (const f of fs.readdirSync(here).filter((n) => n.endsWith('.test.mjs')).sort()) {
    await import(pathToFileURL(path.join(here, f)).href);
  }
}
