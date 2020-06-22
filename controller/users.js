const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { db } = require('../models/user');
const dbOps = {}

module.exports = {
    addUser: function (req, res, next) {
        const { name, phone, address, email, password } = req.body;
        if (name && phone && address && email && password) {
            dbOps.findOne(req.body)
                .then(userInfo => {
                    if (userInfo) {
                        res.json({ status: false, message: "User Already Added", data: null });
                    } else {
                        dbOps.createUser(req.body)
                            .then(user => {
                                res.json({ status: true, message: "User added successfully!!!", data: user });
                            }).catch(err => {
                                res.json({ status: false, message: "There is some error processing your request.", data: null });
                            })
                    }
                }).catch(err => {
                    next(err);
                })
        } else {
            res.json({ status: false, message: "Requried Fields Missing!!", data: null });
        }
    },
    getAllUsers: function (req, res, next) {
        userModel.find()
            .then(users => {
                if (users) {
                    res.json({ status: false, message: "Users List", data: users });
                } else {
                    res.json({ status: false, message: "No Records Found", data: users });
                }
            }).catch(err => {
                res.json({ status: false, message: "There is some error processing your request.", data: null });
            })
    },

    getOneUser: function (req, res, next) {
        userModel.findById(req.params.id)
            .then(user => {
                if (user) {
                    res.json({ status: false, message: "Success", data: user });
                } else {
                    res.json({ status: false, message: "No Records Found", data: user });
                }
            }).catch(err => {
                res.json({ status: false, message: "There is some error processing your request.", data: null });
            })
    },

    updateOneUser: function (req, res, next) {
        if (req.body && req.body.email || req.body && req.body.password) {
            res.json({ status: false, message: "User Email/Password can not be updated!", data: null });
        } else {
            userModel.findByIdAndUpdate(req.params.id, { $set: req.body })
                .then(user => {
                    if (user) {
                        res.json({ status: false, message: "Success", data: user });
                    } else {
                        res.json({ status: false, message: "No Records Found", data: user });
                    }
                }).catch(err => {
                    res.json({ status: false, message: "There is some error processing your request.", data: null });
                })
        }
    },

    deleteOneUser: function (req, res, next) {
        userModel.findByIdAndRemove(req.params.id)
            .then(user => {
                if (user) {
                    res.json({ status: false, message: "User Record Removed Successfully..", data: user });
                } else {
                    res.json({ status: false, message: "No Records Found", data: users });
                }
            }).catch(err => {
                res.json({ status: false, message: "There is some error processing your request.", data: null });
            })
    },

    login: function (req, res, next) {
        dbOps.findOne(req.body)
            .then(userInfo => {
                if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {

                    const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });

                } else {

                    res.json({ status: "error", message: "Invalid email/password!!!", data: null });

                }
            }).catch(err => {
                next(err);
            })
    }

}

dbOps.findOne = async (params) => {
    try {
        let resp = await userModel.findOne({ email: params.email });
        return Promise.resolve(resp);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

dbOps.createUser = async (params) => {
    try {
        let resp = await userModel.create(params);
        return Promise.resolve(resp);
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
}