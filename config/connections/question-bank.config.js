// configurasi untuk sequilize
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "agiato_question_bank",
    dialect: "mysql", //ini akan memakai query nya dari siapa ?
    pool: { //ini seperti request time out / time limit misal ada error
        max: 5,
        min: 0,
        acquire: 30000, //satuannya second
        idle: 10000
    }
}