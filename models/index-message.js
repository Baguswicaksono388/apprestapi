const dbConfig = require('../config/connections/message.config');

const Sequelize = require('sequelize');
// const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }

    //logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.message = require('./message/message')(sequelize, Sequelize);
db.package = require('./message/package')(sequelize, Sequelize);

module.exports = db;