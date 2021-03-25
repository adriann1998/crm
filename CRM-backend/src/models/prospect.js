const mongoose = require('mongoose');

const greaterThanZero = (n) =>{ 
    return n > 0
};

const prospectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prospectName: {
        type: String,
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    prospectAmount: {
        type: Number,
        required: true,
        // validate: {
        //     validator: function (n) {return n > 0} ,
        //     message: "Amount must be greater than zero" 
        // }
    },
    endUser: {
        type: String
    },
    GPM: {
        type: Number,
        // validate: {
        //     validator: function (n) {return n > 0 && n <= 100},
        //     message: "GPM range must be [0,100]"
        // }
    },
    expectedDuration: {
        tpye: Number,
        // validate: {
        //     validator: greaterThanZero,
        //     message: "Expected duration must be greater than zero"
        // }
    },
    desc: {
        type: String
    },
    isClosed: {
        type: Boolean,
        required: true,
        default: false
    }
},
// Schema Options
{
    timestamps: true
}
);

module.exports = mongoose.model('Prospect', prospectSchema);