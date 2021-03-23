const mongoose = require('mongoose');

const validatePhoneNumber = (ph) => {
    // matches anything that starts with '+' and contains only numbers for the rest of the characters
    const regex = new RegExp('^\\+[0-9]+$');
    return regex.test(ph);
}

const contactSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String
        }
    },
    contactTitle: {
        type: String
    },
    contactEmail: {
        type: String
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    contactPhone: {
        mobile: {
            type: String,
            required: true,
            validate: {
                validator: validatePhoneNumber,
                message: "Please enter phone with the `+` format (do not add space)"
            }
        },
        work: {
            type: String,
            validate: {
                validator: validatePhoneNumber,
                message: "Please enter phone with the `+` format (do not add space)"
            }
        },
        office: {
            type: String,
            validate: {
                validator: validatePhoneNumber,
                message: "Please enter phone with the `+` format (do not add space)"
            }
        }
    },
    lastModified: {
        type: Date,
        required: true,
        default: new Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Contact', contactSchema);