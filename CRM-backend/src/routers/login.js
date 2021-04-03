const User = require('../models/user');
const jwt = require('jsonwebtoken');
import hash from '../utils/hash';

export default function login(req, res) {
    let userCredentials = req.body;
    userCredentials.password = hash(userCredentials.password);
    const token = jwt.sign(userCredentials, 'secretkey');;
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