const mongoose = require("mongoose");
const Prospect = require("../models/prospect");
const User = require("../models/user");
const FKHelper = require("./utils/foreignKeyUtil");

const validateProspectFK = (id) => {
  return FKHelper(Prospect, id);
};

const validateUserFK = (id) => {
  return FKHelper(User, id);
};

const quoteSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    prospect: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Prospect",
      validate: validateProspectFK,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      validate: validateUserFK,
    },
    amountQuoted: {
      type: Number,
      required: true,
      min: 0,
    },
    descriptions: {
      type: String,
    },
  },
  // Schema Options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Quote", quoteSchema);
