const express = require('express');
const { User } = require('../models');

const router = express.Router();

const displayNameValidate = require('./middleware/displayNameValidate');
const emailValidate = require('./middleware/emailValidate');
const passwordValidate = require('./middleware/passwordValidate');
const token = require('./middleware/token');
const tokenValidate = require('./middleware/tokenValidate');

router.post('/',
  displayNameValidate,
  emailValidate,
  passwordValidate,
  async (req, res) => {
    try {
      const {
        displayName,
        email,
        password,
        image,
      } = req.body;

      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res.status(409).send({ message: 'User already registered' });
      }
      await User.create({ displayName, email, password, image });

      return res.status(201).json({ token: token(email) });
    } catch (e) {
      console.log(e.message);
      return res.status(500).end();
    }
});

router.get('/', tokenValidate, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: 'password' } });
    console.log(users, 'AQUI');
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

router.get('/:id', tokenValidate, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
});

module.exports = router;
