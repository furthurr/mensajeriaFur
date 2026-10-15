const crypto = require('node:crypto');
const { promisify } = require('node:util');

const scrypt = promisify(crypto.scrypt);

function validPassword(value) {
  return typeof value === 'string' && value.length >= 8 && value.length <= 1024;
}

async function createPasswordRecord(password, confirmation) {
  if (!validPassword(password)) throw new Error('Usa una contraseña de entre 8 y 1024 caracteres.');
  if (password !== confirmation) throw new Error('Las contraseñas no coinciden.');
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return { mode: 'password', salt, hash: hash.toString('hex') };
}

async function verifyPassword(password, record) {
  if (!validPassword(password) || record?.mode !== 'password' ||
      !/^[a-f0-9]{64}$/.test(record.salt) || !/^[a-f0-9]{128}$/.test(record.hash)) return false;
  const hash = await scrypt(password, record.salt, 64);
  return crypto.timingSafeEqual(hash, Buffer.from(record.hash, 'hex'));
}

module.exports = { createPasswordRecord, verifyPassword };
