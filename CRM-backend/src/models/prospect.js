const mongoose = require("mongoose");
const Account = require("../models/account");
const FKHelper = require("./utils/foreignKeyUtil");

const validateAccountFK = (id) => {
  return FKHelper(Account, id);
};

const prospectSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    prospectName: {
      type: String,
      required: true,
    },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Account",
      validate: validateAccountFK,
    },
    prospectAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    endUser: {
      type: String,
    },
    GPM: {
      type: Number,
      min: 0,
      max: 100,
    },
    expectedDuration: {
      type: Number,
      min: 0,
    },
    desc: {
      type: String,
    },
    isClosed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  // Schema Options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Prospect", prospectSchema);
