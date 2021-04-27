const mongoose = require("mongoose");
const Prospect = require("../models/prospect");
const { filterProspects } = require("./permissions/prospect");

module.exports = {
  getAll: function (req, res) {
    Prospect.find({})
      .populate("account", "accName accAlias")
      .populate("prospectHolder", "name userEmail userPosition superiorHierarchy NIK")
      .exec(function (err, prospects) {
        if (err) return res.status(404).json(err);
        res.json(filterProspects(req, prospects));
      });
  },
  createOne: function (req, res) {
    let newProspectDetails = req.body;
    newProspectDetails._id = new mongoose.Types.ObjectId();
    let prospect = new Prospect(newProspectDetails);
    prospect.save(function (err) {
      if (err) return res.status(500).json(err);
      res.json(prospect);
    });
  },
  getOne: function (req, res) {
    Prospect.findOne({ _id: req.params.id })
      .populate("account", "accName accAlias")
      .exec(function (err, prospect) {
        if (err) return res.status(400).json(err);
        if (!prospect) return res.status(404).json();
        res.json(prospect);
      });
  },
  updateOne: function (req, res) {
    Prospect.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, prospect) {
        if (err) return res.status(400).json(err);
        if (!prospect) return res.status(404).json();
        res.json(prospect);
      }
    );
  },
  deleteOne: function (req, res) {
    Prospect.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.status(204).json({});
    });
  },
};
