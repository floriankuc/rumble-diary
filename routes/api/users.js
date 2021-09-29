const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

//@route POST api/users
//@desc Registers new user
//@access public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  bcrypt.genSalt(10, async (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) res.send({ msg: err });
      newUser.password = hash;
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET, { expiresIn: 3600 });
      res.json({
        token,
        user: {
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
        },
      });
    });
  });
});

module.exports = router;
