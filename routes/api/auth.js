const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/auth');

//user model
const User = require('../../models/User');

//@route POST api/auth
//@desc authenticates
//@access public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'all fields required auth' });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'user does not exists' });

    //validate pw
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

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

//@route GET api/auth/user
//@desc authenticates
//@access private
router.get('/user', authMiddleware, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
