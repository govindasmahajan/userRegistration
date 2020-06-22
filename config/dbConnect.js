const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/crudOps_Assignment';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

module.exports = mongoose;
