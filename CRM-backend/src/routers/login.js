const User = require('../models/user');
const jwt = require('jsonwebtoken');
const hash = require('./utils/hash');

function generateAccessToken(userCredentials) {
    return jwt.sign(userCredentials, process.env.JWT_SECRET_KEY, { expiresIn: '10s' });
}

export function login(req, res) {
    let userCredentials = req.body;
    userCredentials.password = hash(userCredentials.password);
    const token = generateAccessToken(userCredentials);
    User.findOne(userCredentials, (err, result) => {
        if (!result) {
            res.send({
                token: undefined
            });
            return;
        }
        res.send({
            token: token
        });
    });
};

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['cookie']
    const token = authHeader && authHeader.split('=')[1]
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}