const express = require('express');
const { User } = require('../models');

const router = express.Router();

const displayNameValidate = require('./middleware/displayNameValidate');
const emailValidate = require('./middleware/emailValidate');
const passwordValidate = require('./middleware/passwordValidate');

router.post('/',
  displayNameValidate,
  emailValidate,
  passwordValidate,
  async (req, res) => {
    try {
      const {
        display,
        email,
        password,
        image,
      } = req.body;

      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res.status(409).send({ message: 'User already registered' });
      }
      const create = await User.create({ display, email, password, image });

      return res.status(201).send(create);
    } catch (e) {
      console.log(e.message);
      return res.status(500).end();
    }
  });

module.exports = router;
