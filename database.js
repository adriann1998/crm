"use strict";
const mongoose = require("mongoose");

module.exports = () => {
  const dbName = 'CRM';
  mongoose.connect(
    `mongodb+srv://admin:admin@cluster0.pcl3y.mongodb.net/${dbName}?retryWrites=true`,
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
