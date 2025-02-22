const jwt = require("jsonwebtoken");

/**
 * @desc Generates a JWT token for user authentication
 * @param {String} userId - User ID to encode in the token
 * @returns {String} - JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = generateToken;