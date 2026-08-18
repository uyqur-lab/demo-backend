import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle } from '../src/server.js';

test('CU-86eynqgxa AC-1: /api/status sog`lom serverda 200 va status=ok qaytaradi', () => {
  const res = handle('/api/status', () => ({ ok: true }));
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, { state: 'ok' });
});

test('CU-86eynqgxa AC-2: sog`liq tekshiruvi false bo`lsa 503 va status=down', () => {
  const res = handle('/api/status', () => ({ ok: false }));
  assert.equal(res.status, 503);
  assert.deepEqual(res.body, { state: 'down' });
});

test('CU-86eynqgxa AC-2: sog`liq tekshiruvi istisno tashlasa ham 503 va status=down', () => {
  const res = handle('/api/status', () => { throw new Error('db yiqildi'); });
  assert.equal(res.status, 503);
  assert.deepEqual(res.body, { state: 'down' });
});
