var db = require('../models');
var passport = require('../config/passport');

module.exports = function(app) {
    app.post('/api/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
            res.redirect('/members');
        },
    );

    app.post('/api/signup', function(req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            fullname: req.body.fullname || '',
            password: req.body.password,
        })
        .then(function() {
            res.redirect(307, '/api/login');
        })
        .catch(function(err) {
            console.log(err);
            res.json(err);
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/user_data', function(req, res) {
        console.log(req.session)
        if (!req.user) {
            res.json({});
        } else {
            res.json(req.user);
        }
    });
}