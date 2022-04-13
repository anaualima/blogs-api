require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (token) => {
  const SECRET = process.env.JWT_SECRET;
  return jwt.verify(token, SECRET);
};
