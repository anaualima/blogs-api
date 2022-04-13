module.exports = (req, res, next) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).send({
      message: '"title" is required',
    });
  }
  next();
};