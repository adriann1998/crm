"use strict";
const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb://localhost:27017/CRM",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    function (err) {
      if (err) {
        return console.log("Mongoose - connection error:", err);
      }
      console.log("Connected to database Successfully");
    }
  );
};
