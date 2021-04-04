const mongoose = require("mongoose");
const Quote = require("../models/quote");
module.exports = {
  getAll: function (req, res) {
    Quote.find({})
      .populate("prospect", "prospectName")
      .populate("user", ["userEmail", "name"])
      .exec(function (err, quotes) {
        if (err) return res.status(404).json(err);
        res.json(quotes);
      });
  },
  createOne: function (req, res) {
    let newQuoteDetails = req.body;
    newQuoteDetails._id = new mongoose.Types.ObjectId();
    let quote = new Quote(newQuoteDetails);
    quote.save(function (err) {
      if (err) return res.status(500).json(err);
      res.json(quote);
    });
  },
  getOne: function (req, res) {
    Quote.findOne({ _id: req.params.id })
      .populate("prospect", "prospectName")
      .populate("user", ["userEmail", "name"])
      .exec(function (err, quote) {
        if (err) return res.status(400).json(err);
        if (!quote) return res.status(404).json();
        res.json(quote);
      });
  },
  updateOne: function (req, res) {
    Quote.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      function (err, quote) {
        if (err) return res.status(400).json(err);
        if (!quote) return res.status(404).json();
        res.json(quote);
      }
    );
  },
  deleteOne: function (req, res) {
    Quote.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.status(204).json({});
    });
  },
};
