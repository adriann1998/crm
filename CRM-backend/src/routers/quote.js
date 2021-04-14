const mongoose = require("mongoose");
const Quote = require("../models/quote");
import { fileSizeFormatter } from "./utils/file";

module.exports = {
  getAll: function (req, res) {
    Quote.find({})
      .populate("prospect", "prospectName")
      .populate("user", "userEmail name")
      .exec(function (err, quotes) {
        if (err) return res.status(404).json(err);
        res.json(quotes);
      });
  },
  createOne: async function (req, res) {
    let newQuoteDetails = req.body;
    console.log(req.body.files[0])
    newQuoteDetails.files = req.body.files.map((f) => ({
      fileName: f.originalname,
      filePath: f.path,
      fileType: f.mimetype,
      fileSize: fileSizeFormatter(f.size, 2)
    }));
    newQuoteDetails._id = new mongoose.Types.ObjectId();
    let quote = new Quote(newQuoteDetails);
    quote.save(function (err) {
      if (err) return res.status(500).json(err);
      quote.populate("prospect", "prospectName")
           .populate("user", "userEmail name")
           .execPopulate(function(err){
              if (err) return res.status(500).json(err);
              res.json(quote);
            });
    });
  },
  getOne: function (req, res) {
    Quote.findOne({ _id: req.params.id })
      .populate("prospect", "prospectName")
      .populate("user", "userEmail name")
      .exec(function (err, quote) {
        if (err) return res.status(400).json(err);
        if (!quote) return res.status(404).json();
        res.json(quote);
      });
  },
  updateOne: function (req, res) {
    let updateDetails = req.body;
    console.log(req.body.files)
    updateDetails.files = req.body.files.map((f) => ({
      fileName: f.originalname,
      filePath: f.path,
      fileType: f.mimetype,
      fileSize: fileSizeFormatter(f.size, 2)
    }));
    Quote.findOneAndUpdate({ _id: req.params.id }, updateDetails, {new: true, useFindAndUpdate: false}, function (err, quote) {
        if (err) return res.status(400).json(err);
        if (!quote) return res.status(404).json();
        quote.populate("user", "userEmail name")
            .populate("prospect", "prospectName")
            .execPopulate(function(err){
              if (err) return res.status(500).json(err);
              res.json(quote);
            });
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
