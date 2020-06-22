
const empModel = require('../models/employee');

module.exports = {

    addEmployee: function (req, res, next) {
        const { name, email, password } = req.body;
        if (name && email && password) {
            empModel.findOne({ email: email }, (err, result) => {
                if (err) { next(err); }
                else {
                    if (result) {
                        res.json({ status: false, message: "Employee Already Exists...", data: null });
                    } else {
                        empModel.create(req.body,
                            function (err, result) {
                                if (err) { next(err); }
                                else {
                                    res.json({ status: true, message: "Employee Added...", data: result });
                                }
                            })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "Required fields are missing.", data: null })
        }
    },

    getAllEmployees: function (req, res, next) {
        empModel.find({}, function (err, empData) {
            if (err) {
                next(err);
            } else {
                res.json({ status: true, message: "List of Employees", data: empData });
            }
        });
    },
    findByEmail: function (req, res, next) {
        empModel.findOneAndUpdate({ email: req.body.email }, { $push: { url: req.file.path } }, function (err, empData) {
            if (err) {
                next(err);
            } else {
                console.log('empData => ', empData);
                res.json({ status: true, message: "List of Employees", data: empData });
            }
        });
    },
    getById: function (req, res, next) {
        empModel.findById(req.params.empId, function (err, empInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: true, message: "Employee records fetched..", data: empInfo });
            }
        });
    },

    updateById: function (req, res, next) {
        empModel.findByIdAndUpdate(req.params.empId, req.body, function (err, empInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: true, message: "Employee updated successfully!!!", data: empInfo });
            }
        });
    },

    deleteById: function (req, res, next) {
        empModel.findByIdAndRemove(req.params.empId, function (err, empInfo) {
            if (err)
                next(err);
            else {
                res.json({ status: true, message: "Employee deleted successfully!!!", data: empInfo });
            }
        });
    },


}					