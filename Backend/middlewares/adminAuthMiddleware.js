const User = require('../models/userModel');
const adminAuthMiddleware = async (req, res, next) => {
  try {
    // Assuming the decoded token contains userId
    const userId = req.user.id;

    // Check if the user is an admin
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Only admins can perform this action' });
    }

    // Attach the user object to the request for further use in controller
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
  module.exports = adminAuthMiddleware;
  