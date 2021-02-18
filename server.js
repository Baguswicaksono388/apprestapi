const express = require('express'); //call library expressjs
const bodyParser = require('body-parser');
const app = express(); //function to call expressjs

// parse aplication/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//call routes
var routes = require('./routes');
routes(app); //call function app at routes

app.listen(3000, () => {
    console.log(`Server started on port`);
});