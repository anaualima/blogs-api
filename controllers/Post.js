const express = require('express');
const { BlogPost, Category, User } = require('../models');
const tokenValidate = require('./middleware/tokenValidate');
const titlePost = require('./middleware/titlePost');
const contentPost = require('./middleware/contentPost');
const categoryPost = require('./middleware/categoryIds');

const router = express.Router();

router.post('/', tokenValidate, titlePost, contentPost, categoryPost, async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;

    const categoryNotExist = categoryIds.map((e) => Category.findByPk(e));
    const resolvePromise = await Promise.all(categoryNotExist);
    if (resolvePromise.some((e) => e === null)) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    console.log(categoryNotExist);
    const create = await BlogPost.create({ 
      userId: id, title, content,
    });

    return res.status(201).json({ id: create.id, userId: id, title, content });
  } catch (e) {
    console.log(e.message);
    return res.status(500).end();
  }
});

router.get('/', tokenValidate, async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

module.exports = router;