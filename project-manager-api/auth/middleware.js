const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (token == null) {
    res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.TOKEN_KEY, function (e, user) {
    if (e) {
      console.log(e);
      return res.status(403).send("invalid token");
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = {
  authenticateToken,
};
