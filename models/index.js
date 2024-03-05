'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require("../config");
const db = {};

let sequelize = new Sequelize(config.dbDatabase, config.dbUsername, config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    dialect: config.dbDialect
});

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;

module.exports = db;

exports.sequelize = sequelize