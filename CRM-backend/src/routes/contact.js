const mongoose = require("mongoose");
const Contact = require("../models/contact");
const { filterContacts } = require("./permissions/contact")

const populateFields = { 
  path: 'account',
  select: 'accName accAlias',
  populate: {
    path: 'accHolder',
    select: 'name superiorHierarchy'
  } 
}

module.exports = {
  getAll: function (req, res) {
    Contact.find({})
      .populate(populateFields)
      .exec(function (err, contacts) {
        if (err) return res.status(404).json(err);
        res.json(filterContacts(req, contacts));
      });
  },
  createOne: function (req, res) {
    let newContactDetails = req.body;
    newContactDetails._id = new mongoose.Types.ObjectId();
    let contact = new Contact(newContactDetails);
    contact.save(function (err) {
      if (err) return res.status(500).json(err);
      res.json(contact);
    });
  },
  getOne: function (req, res) {
    Contact.findOne({ _id: req.params.id })
      .exec(function (err, contact) {
        if (err) return res.status(400).json(err);
        if (!contact) return res.status(404).json();
        res.json(contact);
      });
  },
  updateOne: function (req, res) {
    Contact.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, contact) {
        if (err) return res.status(400).json(err);
        if (!contact) return res.status(404).json();
        res.json(contact);
      }
    );
  },
  deleteOne: function (req, res) {
    Contact.findOneAndRemove({ _id: req.params.id }, function (err) {
      if (err) return res.status(400).json(err);
      res.status(204).json({});
    });
  },
};
