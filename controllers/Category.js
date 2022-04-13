const express = require('express');
const { Category } = require('../models');

const nameCategory = require('./middleware/nameCategory');
const tokenValidate = require('./middleware/tokenValidate');

const router = express.Router();

router.post('/', nameCategory, tokenValidate, async (req, res) => {
  try {
    const { name } = req.body;

    const create = await Category.create({ name });

    return res.status(201).json({ id: create.id, name });
  } catch (e) {
    console.log(e.message);
    return res.status(500).end();
  }
});

router.get('/', tokenValidate, async (req, res) => {
  try {
    const categories = await Category.findAll();
    console.log(categories, 'AQUI');
    return res.status(200).send(categories);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

module.exports = router;