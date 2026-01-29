const crypto = require('crypto');

/**
 * NOTE: For production, use bcrypt library
 * Install: npm install bcrypt
 * Then use bcrypt.hash() and bcrypt.compare()
 * 
 * This is a simple crypto-based hashing for development/testing only
 */

/**
 * Hash password using crypto (development only)
 * For production, use bcrypt instead
 */
const hashPassword = (password) => {
  // Simple hash - NOT for production use
  return crypto
    .createHash('sha256')
    .update(password + process.env.PASSWORD_SALT || 'salt')
    .digest('hex');
};

/**
 * Verify password
 * For production, use bcrypt.compare() instead
 */
const verifyPassword = (password, hash) => {
  return hashPassword(password) === hash;
};

module.exports = {
  hashPassword,
  verifyPassword,
};

/**
 * PRODUCTION RECOMMENDATION:
 * 
 * Install bcrypt:
 * npm install bcrypt
 * 
 * Then use:
 * 
 * const bcrypt = require('bcrypt');
 * 
 * const hashPassword = async (password) => {
 *   const salt = await bcrypt.genSalt(10);
 *   return await bcrypt.hash(password, salt);
 * };
 * 
 * const verifyPassword = async (password, hash) => {
 *   return await bcrypt.compare(password, hash);
 * };
 */
