const express = require('express');
const bodyParser = require('body-parser');  //mempermudah request yang dikirim oleh client
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

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
const dbAuth = require("./models/index-auth");
const dbMessage = require("./models/index-message");

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
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb',parameterLimit: 100000, extended: true })); //extended:true untuk bisa menampilkan nested json

// app.use(customMiddleware);

// Sync database
db.sequelize.sync();
// dbQuestionBank.sequelize.sync();
dbAuth.sequelize.sync();
dbMessage.sequelize.sync();

// File Routes
require("./routes/routes")(app);
require('./routes/auth')(app);
require('./routes/message')(app);
// app.use(require('./routes/auth'));

const PORT = process.env.PORT_API;
app.listen(PORT, () => {
    console.log('Server is running at', PORT);
})
