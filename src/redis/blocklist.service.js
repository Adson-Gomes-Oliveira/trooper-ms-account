const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const blocklist = require('./blocklist');

const generateTokenHash = (token) => crypto.createHash('sha256').update(token).digest('hex');

const addToken = async (token) => {
  const tokenExpirationDate = JWT.decode(token).exp;
  const tokenHash = generateTokenHash(token);
  await blocklist.set(tokenHash, '');
  const tokenExists = await blocklist.exists(tokenHash);
  console.log(tokenHash);
  console.log(tokenExists);
  await blocklist.expireAt(tokenHash, tokenExpirationDate);
};

const verifyTokenInBlocklist = async (token) => {
  const tokenHash = generateTokenHash(token);
  const tokenExists = await blocklist.exists(tokenHash);
  console.log(tokenHash);
  console.log(tokenExists);
  return tokenExists;
};

module.exports = {
  addToken,
  verifyTokenInBlocklist,
};
