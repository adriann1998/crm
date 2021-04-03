const mongoose = require('mongoose');
const User = require('./user');

const validateDirector = (userId) => {
    User.findOne({_id: userId}, (err, user) => {
        if (err) { return false };
        if (!user) { return false };
        if (user.userPosition !== 'director') { return false};
        console.log(user.userPosition)
        return true;
    })
}

const departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: {
        type: String,
        unique: true,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: validateDirector,
            message: "The inputted User is either non-exist or non-director"
        }
    }
},
// Schema Options
{
    timestamps: true
}
);

module.exports = mongoose.model('Department', departmentSchema);