const mongoose = require("mongoose");
const Quote = require("../models/quote");
const { toFileObjects } = require("./utils/file");
const { filterQuotes } = require("./permissions/quote")

const prospectPopulateFields = { 
  path: 'prospect',
  select: 'prospectName',
  populate: [{
    path: 'prospectHolder',
    select: 'name superiorHierarchy'
  }, {
    path: 'account',
    select: 'accName accAlias'
  }]
}

module.exports = {
  getAll: function (req, res) {
    try{
      Quote.find({})
        .populate(prospectPopulateFields)
        .exec(function (err, quotes) {
          if (err) return res.status(404).json(err);
          res.json(filterQuotes(req, quotes));
        });
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },
  createOne: async function (req, res) {
    try{
      let newQuoteDetails = req.body;
      newQuoteDetails.files = toFileObjects(req.files);
      newQuoteDetails._id = new mongoose.Types.ObjectId();
      let quote = new Quote(newQuoteDetails);
      quote.save(function (err) {
        if (err) return res.status(500).json(err);
        res.json(quote);
      });
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },
  getOne: function (req, res) {
    try{
      Quote.findOne({ _id: req.params.id })
        .populate(prospectPopulateFields)
        .exec(function (err, quote) {
          if (err) return res.status(400).json(err);
          if (!quote) return res.status(404).json();
          res.json(quote);
        });
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateOne: function (req, res) {
    try{
      let updateDetails = req.body;
      updateDetails.files = toFileObjects(req.files);
      Quote.findOneAndUpdate({ _id: req.params.id }, updateDetails, {new: true, useFindAndUpdate: false}, function (err, quote) {
          if (err) return res.status(400).json(err);
          if (!quote) return res.status(404).json();
          quote.populate(prospectPopulateFields)
              .execPopulate((err) => {
                res.status(500).json(err);
                res.json(quote);
              })
        }
      );
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },
  deleteOne: function (req, res) {
    try{
      Quote.findOneAndRemove({ _id: req.params.id }, function (err) {
        if (err) return res.status(400).json(err);
        res.status(204).json({});
      });
    }
    catch(err){
      console.log(err);
      res.status(500).json(err);
    }
  },
};
