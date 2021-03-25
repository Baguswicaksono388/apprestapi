const dbConfig = require("../config/db.config.js");

const Sequilize = require('sequelize'); //import Sequilize
const { Sequelize } = require("sequelize");
//memakai objek nya
const sequelize = new Sequilize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.min,
        idle: dbConfig.pool.idle
    }

    // logging: false
});

const db = {};

db.Sequilize = Sequilize;
db.sequelize = sequelize;

db.post = require("./post.models.js")(sequelize, Sequilize);
db.registration = require("./registration.models")(sequelize, Sequelize);
// db.role = require("./role.models")(sequelize, Sequelize);


module.exports = db;
