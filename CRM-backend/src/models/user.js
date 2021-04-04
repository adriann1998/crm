const mongoose = require("mongoose");
const Department = require("../models/department");
const FKHelper = require("./utils/foreignKeyUtil");

const validatePhoneNumber = (ph) => {
  const regex = new RegExp("^\\+[0-9]+$");
  return regex.test(ph);
};

const validateUserPosition = (pos) => {
  const positions = ["director", "bm", "am"];
  return positions.includes(String(pos).toLowerCase());
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
  const regex = new RegExp("^[a-zA-Z]+$");
  return regex.test(name);
};

const validateNIK = (nik) => {
  const regex = new RegExp("^[0-9]{11}");
  return regex.test(nik);
};

const validateDepartmentFK = (id) => {
  return FKHelper(Department, id);
};

const validateUserFK = (id) => {
  if (id === null || id === undefined) {
    return true;
  }
  userSchema.findOne({ _id: id }, (err, result) => {
    if (result) {
      return result.userPosition === "director" || result.userPosition === "bm"
        ? resolve(true)
        : resolve(false);
    } else
      return reject(
        new Error(
          `FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`
        )
      );
  });
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
      required: true,
      validate: {
        validator: validateUserPosition,
        message: "Please enter the correct position",
      },
    },
    reportTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // default: null,
      // validate: validateUserFK,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Department",
      // validate: validateDepartmentFK,
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
  },
  // Schema Options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
