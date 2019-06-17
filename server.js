var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// Setting up port
var PORT = process.env.PORT || 8080;

var db = require('./models');

// Creating express app and configuring middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//
app.get('/', function(req, res) {
    res.send('Welcome to Passport');
});

// Syncing our database and loggin a msg to the user upon success
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on PORT ${PORT}`);
    });
})

