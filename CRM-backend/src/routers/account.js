const mongoose = require('mongoose');
const Account = require('../models/account');
module.exports = {
    getAll: function (req, res) {
        Account.find({})
            .exec(function (err, accounts) {
                if (err) return res.status(404).json(err);
                res.json(accounts);
            });
    },
    createOne: function (req, res) {
        let newAccountDetails = req.body;
        newAccountDetails._id = new mongoose.Types.ObjectId();
        let account = new Account(newAccountDetails);
        account.save(function (err) {
            if (err) return res.status(500).json(err);
            res.json(account);
        });
    },
    getOne: function (req, res) {
        Account.findOne({ _id: req.params.id })
            .exec(function (err, account) {
                if (err) return res.status(400).json(err);
                if (!account) return res.status(404).json();
                res.json(account);
            });
    },
    updateOne: function (req, res) {
        Account.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, account) {
            if (err) return res.status(400).json(err);
            if (!account) return res.status(404).json();
            res.json(account);
        });
    },
    deleteOne: function (req, res) {
        Account.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.status(204).json({});
        });
    }
};