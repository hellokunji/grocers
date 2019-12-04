'use strict';

require('./conf').buildEnvironment();

const express = require('express'),
  bodyParser = require('body-parser');

let app = express();
console.log("Initializing Grocers Web Application!");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set Application routes and their handlers
require('./routes/index')(app);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(require('errorhandler')());
}

module.exports = app;
