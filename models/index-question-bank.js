const dbConfig = require("../config/connections/question-bank.config");

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

db.practice_study_sd = require("./question-bank/practice_study_sd.models")(sequelize, Sequilize);
db.question_bank_sd = require("./question-bank/question-bank-sd.models")(sequelize, Sequilize);

module.exports = db;