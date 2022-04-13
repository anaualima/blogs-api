module.exports = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(400).send({
      message: '"categoryIds" is required',
    });
  }
  next();
};