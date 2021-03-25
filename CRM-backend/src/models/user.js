const mongoose = require('mongoose');

const validatePhoneNumber = (ph) => {
    // matches anything that starts with '+' and contains only numbers for the rest of the characters
    const regex = new RegExp('^\\+[0-9]+$');
    return regex.test(ph);
}

const validateUserPosition = (pos) => {
    const positions = ['director', 'bm', 'am'];
    return positions.includes(String(pos).toLowerCase());
}

const validatePostcode = (postcode) => {
    const regex = new RegExp('^[1-9]+$');
    return regex.test(String(postcode))
}

const validateEmail = (email) => {
    const regex = new RegExp('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$');
    return regex.test(String(email).toLowerCase());
}

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userEmail: { 
        type: String, 
        unique: true,
        required: true,
        validate: {
            validator: validateEmail,
            message: "Please enter a valid email"
        }
    },
    name: {
        firstName: { 
            type: String,
            required: true
        },
        middleName: { 
            type: String
        },
        lastName: { 
            type: String
        }
    },
    userDOB: { 
        type: Date,
        required: true,
        default: new Date('1970-01-01')
    },
    userPhone: { 
        mobile1: { 
            type: String,
            required: true,
            validate: {
                validator: validatePhoneNumber,
                message: "Please enter phone with the `+` format (do not add space)"
            }
        },
        mobile2: { 
            type: String,
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
        }
    },
    userPosition: {
        type: String,
        required: true,
        validate: {
            validator: validateUserPosition,
            message: "Please enter the correct position"
        },
    },
    reportTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    userAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postcode: {
            type: String,
            required: true,
            validate: {
                validator: validatePostcode,
                message: "Please enter a valid postcode"
            },
        }
    },
    userStatus: {
        type: Boolean,
        default: true,
        required: true
    }
},
// Schema Options
{
    timestamps: true
}
);

module.exports = mongoose.model('User', userSchema);