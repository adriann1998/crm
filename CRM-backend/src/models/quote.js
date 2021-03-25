const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prospect: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Prospect'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amountQuoted: {
        type: Number,
        required: true,
        validate: {
            validator: (n) => n > 0,
            message: "Please enter an amount greater than zero"
        }
    },
    descriptions:{
        type: String
    }
}, 
// Schema Options
{ 
    timestamps: true
});

module.exports = mongoose.model('Quote', quoteSchema);