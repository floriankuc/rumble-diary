const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) return res.status(401).json({ msg: 'No token, authorization denied.' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

module.exports = authMiddleware;
