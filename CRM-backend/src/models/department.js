const mongoose = require("mongoose");
const User = require("./user");

const validateDirector = (id) => {
  if (id === null || id === undefined) {
    return true;
  }
  return new Promise((resolve, reject) => {
    User.findOne({ _id: id }, (err, result) => {
      if (result) {
        return result.userPosition === "director"
          ? resolve(true)
          : resolve(false);
      } else
        return reject(
          new Error(
            `FK Constraint 'checkObjectsExists' for '${id.toString()}' failed`
          )
        );
    });
  });
};

const departmentSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    departmentName: {
      type: String,
      unique: true,
      required: true,
    },
    director: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      validate: validateDirector,
    },
  },
  // Schema Options
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);
