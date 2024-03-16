const jwt = require("jsonwebtoken");

const sendCookie = (user = {}, statusCode, res) => {
  const expiresInSeconds = parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: expiresInSeconds,
  });
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
  });
};

module.exports = sendCookie;