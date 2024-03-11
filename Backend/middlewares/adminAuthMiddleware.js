// adminAuthMiddleware.js
const adminAuthMiddleware = (req, res, next) => {
  const user = req.user;

  console.log('User Role:', user.role);  // Add this line

  if (user && user.role === 'admin') {
      next();
  } else {
      res.status(403).json({ message: 'Unauthorized' });
  }
};

  
  module.exports = adminAuthMiddleware;
  