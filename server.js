const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost/login', { useMongoClient: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected to db");
});

app.get('/', (req, res, next) => {
    res.sendFile('public/index.html');
});

app.post('/submitUser', (req, res, next)=> {
    let userInfo = req.body;
    console.log(userInfo);
    User.findOne({username: userInfo.username}, function(error, user) {
        if(user) {
            res.redirect('/profile')
            return console.log("User exists!");
        } else {
            return console.log('no user found');
        }
    });
});

app.post('/newUser', (req, res, next)=> {
    let newUserInfo = req.body;
    console.log(newUserInfo);
    res.status(200).send(newUserInfo);
    let newUser = new User({username: newUserInfo.newUsername, password: newUserInfo.newPassword});
    User.findOne({username: newUser.username}, function(error, user) {
        if(user) {
            return console.log("user already exists");
        } else {
            newUser.save((err)=> {
                // console.log(newUser);
                if (err) return console.log(err);
                console.log("user saved successfully!");
            });
        }
    });
});

app.get('/allUsers', (req, res, next)=> {
    User.find(function(err, user) {
        if (err) return console.error(err);
        res.send(user);
        console.log(user);
    });
});

app.get('/profile', (req, res, next)=> {
    res.send("user recognized");
});

app.listen(port, ()=> {
    console.log("App listening on port: " + port);
});
