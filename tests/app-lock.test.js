const test = require('node:test');
const assert = require('node:assert/strict');
const { createPasswordRecord, verifyPassword } = require('../src/app-lock');

test('creates salted hashes and verifies only the correct password', async () => {
  const password = 'prueba-local-123';
  const record = await createPasswordRecord(password, password);
  const other = await createPasswordRecord(password, password);
  assert.notEqual(record.hash, other.hash);
  assert.notEqual(record.salt, other.salt);
  assert.equal(JSON.stringify(record).includes(password), false);
  assert.equal(await verifyPassword(password, record), true);
  assert.equal(await verifyPassword('incorrecta-123', record), false);
});

test('rejects missing, mismatched, too short and oversized passwords', async () => {
  for (const password of [undefined, null, 123, '', 'corta', 'a'.repeat(1025)]) {
    await assert.rejects(createPasswordRecord(password, password));
  }
  await assert.rejects(createPasswordRecord('contraseña-segura', 'distinta'));
});

test('fails closed on invalid credentials or malformed records', async () => {
  for (const record of [undefined, {}, { mode: 'biometric' },
    { mode: 'password', salt: 'bad', hash: 'bad' },
    { mode: 'password', salt: 'a'.repeat(64), hash: 'z'.repeat(128) }]) {
    assert.equal(await verifyPassword('contraseña-segura', record), false);
  }
  const record = await createPasswordRecord('contraseña-segura', 'contraseña-segura');
  assert.equal(await verifyPassword(null, record), false);
});
