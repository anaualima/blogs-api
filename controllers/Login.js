const express = require('express');
const { User } = require('../models');

const router = express.Router();

const loginEmail = require('./middleware/loginEmail');
const loginPassword = require('./middleware/loginPassword');
const token = require('./middleware/token');

router.post('/',
  loginEmail,
  loginPassword,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const userExist = await User.findOne({ where: { email } });
      if (!userExist) {
        return res.status(400).send({ message: 'Invalid fields' });
      }
      await User.create({ email, password });

      return res.status(200).json({ token: token(email) });
    } catch (e) {
      console.log(e.message);
      return res.status(500).end();
    }
  });

module.exports = router;