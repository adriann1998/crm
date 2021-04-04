const mongoose = require("mongoose");
const Account = require("../models/account");
const FKHelper = require("./utils/foreignKeyUtil");

const validatePhoneNumber = (ph) => {
  const regex = new RegExp("^\\+[0-9]+$");
  return regex.test(ph);
};

const validateName = (name) => {
  const regex = new RegExp("^[a-zA-Z]+$");
  return regex.test(name);
};

const validateAccountFK = (id) => {
  return FKHelper(Account, id);
};

const contactSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      firstName: {
        type: String,
        required: true,
        validate: {
          validator: validateName,
          message: "Please enter a valid first name",
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
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
      validate: validateAccountFK,
    },
    contactTitle: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      mobile: {
        type: String,
        required: true,
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
      office: {
        type: String,
        validate: {
          validator: validatePhoneNumber,
          message: "Please enter phone with the `+` format (do not add space)",
        },
      },
    },
  },
  // Schema Options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
