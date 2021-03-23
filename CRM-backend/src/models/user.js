const mongoose = require('mongoose');

const validatePhoneNumber = (ph) => {
    // matches anything that starts with '+' and contains only numbers for the rest of the characters
    const regex = new RegExp('^\\+[0-9]+$');
    return regex.test(ph);
}

const validateUserPosition = (pos) => {
    const positions = ['director', 'BM', 'AM'];
    return positions.includes(pos);
}

const validatePostcode = (postcode) => {
    const regex = new RegExp('^[1-9]+$');
    return regex.test(postcode)
}

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userEmail: { 
        type: String, 
        unique: true,
        required: true 
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
        },
    },
    userDOB: { 
        type: Date,
        required: true,
        default: new Date('1970-01-01')
    },
    userPhone: { 
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
    },
    lastModified: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);