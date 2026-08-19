import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle } from '../src/server.js';

const HEX = /^[0-9a-f]{6}$/;

test('CU-86eyp5fw1 AC-1: GET /api/v1/color 200 va 6 belgili kichik hex qaytaradi', () => {
  const res = handle('/api/v1/color', 'GET');
  assert.equal(res.status, 200);
  assert.match(res.body.color, HEX);
});

test('CU-86eyp5fw1 AC-1: 200 chaqiruvning hammasi naqshga mos', () => {
  // Tasodifiy qiymat: bitta chaqiruv yetarli emas. Masalan `toString(16)`
  // boshidagi nollarni tushirib qoldirsa, xato faqat ba'zan chiqadi.
  for (let i = 0; i < 200; i++) {
    const res = handle('/api/v1/color', 'GET');
    assert.match(res.body.color, HEX, `${i}-chaqiruv: ${res.body.color}`);
  }
});

test('CU-86eyp5fw1 AC-2: 50 chaqiruv kamida ikki xil qiymat beradi', () => {
  const seen = new Set();
  for (let i = 0; i < 50; i++) seen.add(handle('/api/v1/color', 'GET').body.color);
  assert.ok(seen.size >= 2, `faqat ${seen.size} xil qiymat keldi`);
});

test('CU-86eyp5fw1 AC-3: POST /api/v1/color 404 not_found qaytaradi', () => {
  const res = handle('/api/v1/color', 'POST', '{}');
  assert.equal(res.status, 404);
  assert.equal(res.body.error, 'not_found');
});
