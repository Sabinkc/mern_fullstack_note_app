const jwt = require("jsonwebtoken");

async function authMiddlewareUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: "Unable to createNote",
    });
  }
}

module.exports = {
  authMiddlewareUser,
};
