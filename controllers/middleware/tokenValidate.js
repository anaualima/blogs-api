const secreteToken = require('./secreteToken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Token not found' });
  }
  console.log('aqui', authorization);
  try {
    const decoded = secreteToken(authorization);
    req.user = decoded.data;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};