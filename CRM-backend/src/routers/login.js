const User = require('../models/user');
var jwt = require('jsonwebtoken');

export default function login (req, res) {
    const userCredentials = req.body;
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