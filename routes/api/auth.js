const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middleware/auth');
const User = require('../../models/User');

//@route POST api/auth
//@desc Authenticates login
//@access public
router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: 'User does not exist', id: 'LOGIN_FAIL' });

    //validate pw
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials', id: 'LOGIN_FAIL' });

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
//@desc Returns user
//@access private
router.get('/user', authMiddleware, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then((user) =>
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
      })
    );
});

module.exports = router;
