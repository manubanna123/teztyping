require('rootpath')();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helper/jwt');
const errorHandler = require('./helper/error-handler');
const routes = require('./routes/routes');
var path = require('path');
const express = require('express');
var fileupload = require('express-fileupload');
const app = express();
// app.use(express.static(path.join(__dirname, '../documents')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileupload());
app.use('/documents',express.static(path.join(__dirname, './documents')));

// console.log(path.join(__dirname, './documents'));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/api', routes);

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});