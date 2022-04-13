const secreteToken = require('./secreteToken');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Token not found' });
  }
  try {
    const decoded = secreteToken(authorization);
    req.user = decoded.data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};