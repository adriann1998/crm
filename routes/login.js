const User = require("../models/user");
const jwt = require("jsonwebtoken");
const hash = require("./utils/hash");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, { expiresIn: "1800s" });
}

export function login(req, res) {
  let userCredentials = req.body;
  let token;
  if ( userCredentials.userEmail === process.env.ADMIN_EMAIL && userCredentials.password === process.env.ADMIN_PASSWORD) {
    userCredentials.role = "admin";
    token = generateAccessToken(userCredentials);
    res.send({
      token: token,
      user: {
        access: "admin",
      },
    });
  } else {
    userCredentials.password = hash(userCredentials.password);
    User.findOne(userCredentials, (err, user) => {
      if (!user) {
        res.send({
          token: undefined,
        });
        return;
      }
      userCredentials._id = user._id;
      userCredentials.role = user.userPosition;
      token = generateAccessToken(userCredentials);
      res.send({
        token: token,
        user: user,
      });
    });
  }
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["cookie"];
  const token = authHeader && authHeader.split("=")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};