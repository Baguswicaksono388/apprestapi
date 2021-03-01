const express = require('express'); //call library expressjs
const bodyParser = require('body-parser');
var morgan = require('morgan');
const app = express(); //function to call expressjs

// parse aplication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

//call routes
var routes = require('./routes');
routes(app); //call function app at routes

// Daftarkan menu routes dari index
app.use('/auth', require('./middleware'));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});