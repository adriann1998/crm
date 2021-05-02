const mongoose = require("mongoose");
const Department = require("./department");

const validatePhoneNumber = (ph) => {
  const regex = new RegExp("^\\+[0-9]+$");
  return ph === "" ? true : regex.test(ph);
};

const validatePostcode = (postcode) => {
  const regex = new RegExp("^[1-9][0-9]+$");
  return regex.test(postcode);
};

const validateEmail = (email) => {
  const regex = new RegExp(
    "^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$"
  );
  return regex.test(String(email).toLowerCase());
};

const validateName = (name) => {
  if (name === undefined || name === null || name === "") {
    return true;
  }
  const regex = new RegExp("^[a-zA-Z]+$");
  return regex.test(name);
};

const validateNIK = (nik) => {
  const regex = new RegExp("^[0-9]{11}");
  return regex.test(nik);
};

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    userEmail: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: validateEmail,
        message: "Please enter a valid email",
      },
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
        message: "NIK must be exactly 11 digits",
      },
    },
    name: {
      firstName: {
        type: String,
        required: true,
        validate: {
          validator: validateName,
          message: "Please enter a valid first name",
        },
      },
      middleName: {
        type: String,
        validate: {
          validator: validateName,
          message: "Please enter a valid middle name",
        },
      },
      lastName: {
        type: String,
        validate: {
          validator: validateName,
          message: "Please enter a valid last name",
        },
      },
    },
    userDOB: {
      type: Date,
      required: true,
      default: new Date("1970-01-01"),
    },
    userPhone: {
      mobile1: {
        type: String,
        required: true,
        validate: {
          validator: validatePhoneNumber,
          message: "Please enter phone with the `+` format (do not add space)",
        },
      },
      mobile2: {
        type: String,
        validate: {
          validator: validatePhoneNumber,
          message: "Please enter phone with the `+` format (do not add space)",
        },
      },
      work: {
        type: String,
        validate: {
          validator: validatePhoneNumber,
          message: "Please enter phone with the `+` format (do not add space)",
        },
      },
    },
    userPosition: {
      type: String,
      enum: ["director", "bm", "am"],
      required: true,
    },
    reportTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    superiorHierarchy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department"
    },
    userAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postcode: {
        type: String,
        required: true,
        validate: {
          validator: validatePostcode,
          message: "Please enter a valid postcode",
        },
      },
    },
    userStatus: {
      type: Boolean,
      default: true,
      required: true,
    },
    access: {
      type: String,
      enum: ['regular', 'admin'],
      required: true
    }
  },
  // Schema Options
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  this.userPosition = this.userPosition.toLowerCase();
  next();
});

module.exports = mongoose.model("User", userSchema);
