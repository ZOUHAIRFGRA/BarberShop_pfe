const jwt = require("jsonwebtoken");

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Update the authenticateUser middleware
function authenticateUser(req, res, next) {
  // Extract the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded Token:', decoded);  // Add this line
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = authenticateUser;
