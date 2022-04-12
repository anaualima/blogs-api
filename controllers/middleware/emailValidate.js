module.exports = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?$/i;
  const validateEmail = regexEmail.test(String(email).toLowerCase());
  if (!email) {
    return res.status(400).send({ message: '"email" is required' });
  }
  if (!validateEmail) {
    return res.status(400).send({ message: '"email" must be a valid email' });
  }
  next();
};