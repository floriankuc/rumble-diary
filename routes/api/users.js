const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//user model
const User = require('../../models/User');

//@route POST api/users
//@desc registers
//@access public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.log('wrt');
    return res.status(400).json({ msg: 'all fields required user' });
  }

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    } else {
      const newUser = new User({
        name,
        email,
        password,
      });

      //create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) res.send({ msg: err });
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
              if (err) console.log(err);

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            });
          });
        });
      });
    }
  });
});

module.exports = router;
