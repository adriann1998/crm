const mongoose = require("mongoose");
const Account = require("../models/account");
const { filterAccounts } = require("./permissions/account")

module.exports = {
  getAll: function (req, res) {
    Account.find({})
      .populate('accHolder', 'userEmail userPosition superiorHierarchy')
      .exec(function (err, accounts) {
        if (err) return res.status(404).json(err);
        res.json(filterAccounts(req, accounts));
      });
  },
  createOne: function (req, res) {
    let newAccountDetails = req.body;
    newAccountDetails._id = new mongoose.Types.ObjectId();
    let account = new Account(newAccountDetails);
    account.save(function (err) {
      if (err) return res.status(500).json(err);
      account.populate('accHolder', 'userEmail userPosition superiorHierarchy')
             .execPopulate((err) => {
                if (err) return res.status(500).json(err);
                res.json(account);
             })
    });
  },
  getOne: function (req, res) {
    Account.findOne({ _id: req.params.id })
      .populate('accHolder', 'name userPosition')
      .exec(function (err, account) {
        if (err) return res.status(400).json(err);
        if (!account) return res.status(404).json();
        res.json(account);
      });
  },
  updateOne: function (req, res) {
    Account.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, account) {
        if (err) return res.status(400).json(err);
        if (!account) return res.status(404).json();
        account.populate('accHolder', 'userEmail userPosition superiorHierarchy')
              .execPopulate((err) => {
                if (err) return res.status(500).json(err);
                res.json(account);
              })
      }
    );
  },
  deleteOne: function (req, res) {
    Account.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.status(204).json({});
    });
  },
};
