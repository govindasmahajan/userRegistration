const express = require('express');
const logger = require('morgan');
const employee = require('./routes/employee');
const users = require('./routes/users');
const files = require('./routes/fileOperations');
const bodyParser = require('body-parser');
const mongoose = require('./config/dbConnect');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.set('secretKey', 'nodeRestApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use('/downloads', express.static('downloads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Setting up views engine as EJS */
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use('/', require('./routes/index.js'));

app.get('/health-check', function (req, res) {
    res.json({ "Assignment": "Build REST API For User Login & Employee" });
});

app.use('/user', users);
app.use('/employee', employee);
app.use('/file', files);

/* Handle 404 Error */
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* Handle Errors */
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });

});

app.listen(3000, function () {
    console.log('Server listening on port : 3000');
});
