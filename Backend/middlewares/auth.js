const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Unauthorized - No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized - Invalid token' });
  }
};

module.exports = { authenticateUser };
