module.exports = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({
      message: '"name" is required',
    });
  }
  next();
};