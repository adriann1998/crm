const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: {
        type: String,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Department', departmentSchema);