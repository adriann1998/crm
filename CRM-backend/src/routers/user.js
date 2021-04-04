const hash = require("./utils/hash");
const mongoose = require("mongoose");
const User = require("../models/user");
module.exports = {
  getAll: function (req, res) {
    User.find({})
      .populate("reportTo", ["name", "NIK"])
      .populate("department", "departmentName")
      .exec(function (err, users) {
        if (err) return res.status(404).json(err);
        res.json(users);
      });
  },
  createOne: function (req, res) {
    let newUserDetails = req.body;
    newUserDetails.password = hash(newUserDetails.password);
    newUserDetails._id = new mongoose.Types.ObjectId();
    let user = new User(newUserDetails);
    user.save(function (err) {
      if (err) return res.status(500).json(err);
      res.json(user);
    });
  },
  getOne: function (req, res) {
    User.findOne({ _id: req.params.id })
      .populate("reportTo", ["name", "NIK"])
      .populate("department", "departmentName")
      .exec(function (err, user) {
        if (err) return res.status(400).json(err);
        if (!user) return res.status(404).json();
        res.json(user);
      });
  },
  updateOne: function (req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      function (err, user) {
        if (err) return res.status(400).json(err);
        if (!user) return res.status(404).json();
        res.json(user);
      }
    );
  },
  deleteOne: function (req, res) {
    User.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.status(204).json({});
    });
  },
};
