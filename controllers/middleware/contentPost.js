module.exports = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).send({
      message: '"content" is required',
    });
  }
  next();
};