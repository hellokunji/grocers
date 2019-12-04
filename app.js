'use strict';

require('./server/conf').buildEnvironment();

const express = require('express'),
    bodyParser = require('body-parser');

let app = express();
console.log("Initializing Grocers Application!");

app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));

require('./server/routes/index')(app); // Set Application routes and their handlers

if (process.env.NODE_ENV === 'development') {
    // only use in development
    app.use(require('errorhandler')());
}

module.exports = app;
