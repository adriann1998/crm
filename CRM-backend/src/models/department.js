const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: {
        type: String,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        
    },
    employeeCount: {
        type: Number,
        required: true,
        validate: {
            validator: (n) => n >= 0,
            message: "Employee count must greater than -1"
        }
    }
});

module.exports = mongoose.model('Department', departmentSchema);