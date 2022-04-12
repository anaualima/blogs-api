module.exports = (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).send({
      message: '"password" is required',
    });
  }
  if (password === '') {
    return res.status(400).send({
      message: '"password" is not allowed to be empty',
    });
  }
  next();
};