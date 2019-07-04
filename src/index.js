var path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var passport = require('./config/passport');

// Setting up port
var PORT = process.env.PORT || 8080;
var db = require('./models');

// Creating express app and configuring middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// use sessions to keep track of our user's login status
app.use(session({
    secret: 'giambi9328nash',
    resave: false,
    cookie: {
        maxAge: 100 * 1000,
    },
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

// app.get('/', function(req, res) {
//     res.send('Welcome to Passport');
// });

// Syncing our database and loggin a msg to the user upon success
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log(`App listening on PORT ${PORT}`);
    });
});
