const jwt = require("jsonwebtoken");

// Load JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

// Update the authenticateUser middleware
function authenticateUser(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  // Extract the token from "Bearer <token>"
  const tokenParts = token.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(tokenParts[1], JWT_SECRET);
    console.log('Decoded Token:', decoded);  // Add this line
    req.user = decoded;
    next();
} catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token' });
}

}





module.exports = authenticateUser;
