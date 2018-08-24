const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

app.use(bodyParser.urlencoded({ extended: true }))
const client_id = '593539d2f886b1fa5907'; // Need to set it in env variable
const client_secret = 'fc659ebd86013c2dd7d8c6b0414c7ef9cc0c5099';
global.globalCacheObject = {};

app.use(bodyParser.json())

 app.use(passport.initialize());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


passport.use(new GithubStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: 'http://localhost:3000/auth/github/callback'
}, function (accessToken, refreshToken, profile, done) {

    console.log(profile, accessToken);
    globalCacheObject[profile.username] = accessToken;
    done(null, {
        accessToken: accessToken,
        profile: profile
    });
}));

passport.serializeUser(function (user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    // placeholder for custom user deserialization.
    // maybe you are getoing to get the user from mongo by id?
    // null is for errors
    done(null, user);
});


app.get('/auth', passport.authenticate('github'));

app.get('/auth/error', function (req, res) {
    res.send('Login Failed');
});

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/auth/error' }),
    function (req, res) {
        // In the real application you might need to check 
        // whether the user exits and if exists redirect 
        // or if not you many need to create user.
        res.redirect('/');
    }
);

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;




mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});



app.get('/', (req, res) => {
    res.json({ "message": "Welcome to github app" });
});

require('./app/routes/repo.routes.js')(app);


app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});