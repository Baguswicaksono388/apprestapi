const express = require('express');
const bodyParser = require('body-parser');  //mempermudah request yang dikirim oleh client
const cors = require('cors');

// Call Model
const db = require("./models"); //memanggil file index
const dbQuestionBank = require("./models/index-question-bank");

const app = express();

// Config buat cors
let whiteList = [
    'http://localhost:8081' //alamat ini milit clietnya
];
let corsOption = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

app.use(cors(corsOption));

// parse request dlm bentuk application/json x-www-form-urlencode(buat upload gambar didlm form)
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); //extended:true untuk bisa menampilkan nested json

// Sync database
db.sequelize.sync();
// dbQuestionBank.sequelize.sync();

// File Routes
require("./routes/routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running');
})
