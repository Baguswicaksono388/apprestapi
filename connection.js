var mysql = require('mysql');

//create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'res_api'
});

connection.connect((err) => {
    if (err) throw err; //jika error
    console.log('Mysql terkoneksi');
})

module.exports = connection;