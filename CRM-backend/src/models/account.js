const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    accName: {
        type: String,
        required: true,
        unique: true
    },
    accAlias: {
        type: String,
    }
},
// Schema Options
{
    timestamps: true
}
);

module.exports = mongoose.model('Account', accountSchema);