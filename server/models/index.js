'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = 'development';
const config = require(__dirname + '/../config.json')[env];
const db = {};
var pg = require('pg');
pg.defaults.ssl = true;

let sequelize = new Sequelize(config.database, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// load models
var models = [
  'Products',
  'CurrentProducts',
];
models.forEach(function (model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
