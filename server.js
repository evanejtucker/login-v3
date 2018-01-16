const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
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

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //if user is looged in, req.isAuthenticated() will return true 
        console.log('user authenticated');
        next();
    } else{
        console.log("user not authenticated");
        res.redirect("/failure");
    }
}

const logoutUser = (req,res,next)=> {
    if(req.isAuthenticated()){
        req.logout();
        console.log('user logged out');
        next();
    } else {
        console.log('user not logged in');
        next();
    }
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) { return console.log(err); }
        if (!user) {
            console.log("no user found");
            return done(null, false, { message: 'no user found.' }); 
        }
        if(user) {
            if(user.password === password) {
                console.log("password correct");
                return done(null, user);
            } else {
                console.log('password Incorrect');
                return done(null, false);
            }
        }
      });
  }
));

app.get('/', (req, res, next) => {
    res.sendFile('public/index.html');
});

app.post('/submitUser', 
  passport.authenticate('local', { failureRedirect: '/failure' }),
  function(req, res) {
    res.redirect('/profile');
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/profile',
                                   failureRedirect: '/failure',
                                   failureFlash: true })
);

app.post('/newUser', (req, res, next)=> {
    let info = req.body;
    console.log(info);
    User.findOne({username: info.newUsername}, (err, user)=> {
        if (user) {
            res.send('user already exists');
        } else {
            let newUser = new User({username: info.newUsername, password: info.confirmNewPassword});
            newUser.save((error)=> {
                if (error) return console.log(error);
                console.log('user saved successfully');
            });
            // res.send(newUser);
            res.redirect('/');
        }
    })
});

app.get('/allUsers', (req, res, next)=> {
    User.find(function(err, user) {
        if (err) return console.error(err);
        res.send(user);
        console.log(user);
    });
});

app.get('/profile', checkAuthentication, (req, res, next)=> {
    res.sendFile('/profile.html', { root: path.join(__dirname, 'public') });
});

app.get('/failure', (req, res, next)=> {
    console.log("somethng went wrong");
    req.flash('info', 'something went wrong');
    res.redirect('/');
});

app.get('/logout', logoutUser, (req, res, next)=> {
    res.redirect('/');
});

app.listen(port, ()=> {
    console.log("App listening on port: " + port);
});
