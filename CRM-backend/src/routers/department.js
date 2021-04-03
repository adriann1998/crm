const mongoose = require('mongoose');
const Department = require('../models/department');
module.exports = {
    getAll: function (req, res) {
        Department.find({})
            .lean().populate('director', 'name')
            .exec(function (err, departments) {
                if (err) return res.status(404).json(err);
                res.json(departments);
            });
    },
    createOne: function (req, res) {
        let newDepartmentDetails = req.body;
        newDepartmentDetails._id = new mongoose.Types.ObjectId();
        let department = new Department(newDepartmentDetails);
        department.save(function (err) {
            if (err) return res.status(500).json(err);
            res.json(department);
        });
    },
    getOne: function (req, res) {
        Department.findOne({ _id: req.params.id })
            .lean().populate('director', 'name')
            .exec(function (err, department) {
                if (err) return res.status(400).json(err);
                if (!department) return res.status(404).json();
                res.json(department);
            });
    },
    updateOne: function (req, res) {
        Department.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, department) {
            if (err) return res.status(400).json(err);
            if (!department) return res.status(404).json();
            res.json(department);
        });
    },
    deleteOne: function (req, res) {
        Department.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) return res.status(400).json(err);
            res.status(204).json({});
        });
    }
};