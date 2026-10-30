const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
}

/**
 * Compare a plain text password with a hashed password
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} True if passwords match
 */
async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Password comparison failed');
  }
}

module.exports = {
  hashPassword,
  comparePassword
};
