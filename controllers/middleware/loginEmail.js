module.exports = (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).send({
      message: '"email" is required',
    });
  }
  if (email === '') {
    return res.status(400).send({
      message: '"email" is not allowed to be empty',
    });
  }
  next();
};