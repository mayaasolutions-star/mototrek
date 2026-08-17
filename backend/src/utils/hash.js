/**
 * Node.js Crypto PBKDF2 Password Hasher
 */
const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedFormat) {
  if (!storedFormat || !storedFormat.includes(':')) return false;
  const [salt, storedHash] = storedFormat.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(storedHash, 'hex'));
}

module.exports = {
  hashPassword,
  verifyPassword,
};
