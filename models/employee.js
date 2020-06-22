const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: {
        type: String, required: true,
    },
    email: {
        type: String, required: true
    },
    location: {
        type: String, required: false
    },
    designation: {
        type: String, required: false
    },
    password: {
        type: String, required: true
    },
    url: {
        type: Array, required: false
    }
});

EmployeeSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('Employee', EmployeeSchema);