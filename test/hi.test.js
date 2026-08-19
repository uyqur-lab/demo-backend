import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handle } from '../src/server.js';

const post = (body) => handle('/api/v1/hi', 'POST', body);

test('CU-86eyp4nmg AC-1: name berilganda 200 va "hi {name}" qaytadi', () => {
  const res = post(JSON.stringify({ name: 'Alisher' }));
  assert.equal(res.status, 200);
  assert.equal(res.body.message, 'hi Alisher');
});

test('CU-86eyp4nmg AC-2: bo`sh ism xato emas — 200 va "hi " qaytadi', () => {
  const res = post(JSON.stringify({ name: '' }));
  assert.equal(res.status, 200);
  // Orqasidagi bo'shliq ataylab: javob har doim "hi " + name formulasi bilan
  // quriladi (doc.md, PM qarori 1). Klientlar uni trim qilmaydi.
  assert.equal(res.body.message, 'hi ');
});

test('CU-86eyp4nmg AC-3: name maydoni yo`q — 400 name_required', () => {
  const res = post(JSON.stringify({}));
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'name_required');
});

test('CU-86eyp4nmg AC-3: name null — 400 name_required', () => {
  const res = post(JSON.stringify({ name: null }));
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'name_required');
});

test('CU-86eyp4nmg AC-3: tana umuman yo`q — 400 name_required', () => {
  const res = post(null);
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'name_required');
});

test('CU-86eyp4nmg AC-4: buzilgan JSON — 400 invalid_body', () => {
  const res = post('{buzilgan');
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'invalid_body');
});

test('CU-86eyp4nmg AC-4: JSON obyekt emas — 400 invalid_body', () => {
  const res = post('"shunchaki matn"');
  assert.equal(res.status, 400);
  assert.equal(res.body.error, 'invalid_body');
});
