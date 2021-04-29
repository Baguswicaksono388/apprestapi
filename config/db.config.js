// configurasi untuk sequilize
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    HOST: process.env.HOST_API,
    USER: process.env.USER_API,
    PASSWORD: process.env.PASSWORD_API,
    DB: process.env.DB_API,
    dialect: "mysql", //ini akan memakai query nya dari siapa ?
    pool: { //ini seperti request time out / time limit misal ada error
        max: 5,
        min: 0,
        acquire: 30000, //satuannya second
        idle: 10000
    }
}