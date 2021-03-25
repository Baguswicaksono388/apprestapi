const dbConfig = require('../config/connections/auth.config');

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

db.roles = require("./auth/roles")(sequelize, Sequelize);
db.has_model_roles = require("./auth/has_model_roles")(sequelize, Sequelize);
db.role_user = require('./auth/role_user')(sequelize, Sequelize);

module.exports = db;