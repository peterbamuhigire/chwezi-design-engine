// IM-01 "zero network calls": (a) static scan of the static-tier modules for
// network imports and fetch(); (b) the full fixture suite runs with fetch and
// socket constructors replaced by throwing stubs.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import tls from 'node:tls';
import http from 'node:http';
import https from 'node:https';
import dgram from 'node:dgram';
import { TOOL, ROOT } from './helpers.mjs';

const LIB = path.join(TOOL, 'lib');
const NETWORK_IMPORT = /from\s+['"](node:)?(http|https|net|tls|dgram|http2)['"]|require\(\s*['"](node:)?(http|https|net|tls|dgram|http2)['"]\s*\)|import\(\s*['"](node:)?(http|https|net|tls|dgram|http2)['"]/;

test('static-tier modules import no network module and never call fetch', () => {
  const files = fs.readdirSync(LIB).filter((f) => f.endsWith('.mjs') && f !== 'browser.mjs');
  assert.ok(files.length >= 10);
  for (const f of files) {
    const src = fs.readFileSync(path.join(LIB, f), 'utf8');
    assert.ok(!NETWORK_IMPORT.test(src), `${f} imports a network module`);
    assert.ok(!/\bfetch\s*\(/.test(src), `${f} calls fetch()`);
  }
  for (const f of ['cli.mjs']) assert.ok(!NETWORK_IMPORT.test(fs.readFileSync(path.join(TOOL, f), 'utf8')), `${f} imports a network module`);
});

test('the fixture suite runs with network primitives stubbed to throw', async () => {
  const boom = () => { throw new Error('network call attempted'); };
  const saved = { fetch: globalThis.fetch, connect: net.connect, createConnection: net.createConnection, tlsConnect: tls.connect, httpRequest: http.request, httpsRequest: https.request, httpGet: http.get, httpsGet: https.get, createSocket: dgram.createSocket };
  globalThis.fetch = boom; net.connect = boom; net.createConnection = boom; tls.connect = boom; http.request = boom; https.request = boom; http.get = boom; https.get = boom; dgram.createSocket = boom;
  try {
    const { runDetector } = await import('../lib/detector.mjs');
    const { report } = await runDetector({ paths: [path.join(ROOT, 'tests', 'fixtures', 'slop')], cwd: ROOT });
    assert.deepEqual(report.errors, []);
    assert.ok(report.findings.length > 30);
  } finally {
    globalThis.fetch = saved.fetch; net.connect = saved.connect; net.createConnection = saved.createConnection; tls.connect = saved.tlsConnect;
    http.request = saved.httpRequest; https.request = saved.httpsRequest; http.get = saved.httpGet; https.get = saved.httpsGet; dgram.createSocket = saved.createSocket;
  }
});
