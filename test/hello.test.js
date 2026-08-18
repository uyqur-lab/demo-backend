import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle } from '../src/server.js';

test('CU-DEMO101 AC-1: /api/hello 200 va message qaytaradi', () => {
  const res = handle('/api/hello');
  assert.equal(res.status, 200);
  assert.equal(res.body.message, 'Hello, Uyqur!');
});

test('CU-DEMO101 AC-2: noma`lum yo`lda 404 va error qaytadi', () => {
  const res = handle('/api/yoq');
  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'not_found');
});
