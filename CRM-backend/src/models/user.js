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
    const regex = new RegExp('^[1-9][0-9]+$');
    return regex.test(postcode)
}

const validateEmail = (email) => {
    const regex = new RegExp('^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$');
    return regex.test(String(email).toLowerCase());
}

const validateName = (name) => {
    const regex = new RegExp('^[a-zA-Z]+$');
    return regex.test(name);
}

const validateNIK = (nik) => {
    const regex = new RegExp('^[0-9]{11}');
    return regex.test(nik);
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
    password: { 
        type: String,
        required: true,
    },
    NIK: { 
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validateNIK,
            message: "NIK must be exactly 11 digits"
        }
    },
    name: {
        firstName: { 
            type: String,
            required: true,
            validate: {
                validator: validateName,
                message: "Please enter a valid first name"
            }
        },
        middleName: { 
            type: String,
            validate: {
                validator: validateName,
                message: "Please enter a valid middle name"
            }
        },
        lastName: { 
            type: String,
            validate: {
                validator: validateName,
                message: "Please enter a valid last name"
            }
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