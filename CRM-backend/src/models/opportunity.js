const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    oppName: {
        type: String,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    oppAmount: {
        type: Number,
        required: true,
        validate: {
            validator: (n) => n > 0,
            message: "Amount must be greater than zero" 
        }
    },
    endUser: {
        type: String
    },
    GPM: {
        type: Number,
        validate: {
            validator: (n) => n >= 0 && n <= 100,
            message: "GPM range must be [0,100]"
        }
    },
    expectedDuration: {
        tpye: Number,
        validate: {
            validator: (n) => n > 0,
            message: "Expected duration must be greater than zero"
        }
    },
    desc: {
        type: String
    },
    dateEntered: {
        type: Date,
        required: true,
        default: new Date
    },
    lastModified: {
        type: Date,
        required: true,
        default: new Date
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);