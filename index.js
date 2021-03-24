const express = require('express');
const bodyParser = require('body-parser');  //mempermudah request yang dikirim oleh client
const cors = require('cors');

// const customMiddleware = (req, res, next) => {
//     const { authorization } = req.header;
//     if (!authorization) {
//         return res.status(401).send({
//             message: "You must be logged in"
//         });
//     }
// }

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

// app.use(customMiddleware);

// Sync database
db.sequelize.sync();
// dbQuestionBank.sequelize.sync();

// File Routes
require("./routes/routes")(app);
app.use(require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running');
})
