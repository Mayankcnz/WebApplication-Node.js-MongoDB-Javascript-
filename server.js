const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('./src/db')
const routes = require('./routes');
const User = require('./models/user');
const utils = require('./src/utils');

const dotenv = require('dotenv');
dotenv.config();


const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
  clientID: process.env['FACEBOOK_CLIENT_ID'],
  clientSecret: process.env['FACEBOOK_CLIENT_SECRET'],
  callbackURL: '/auth/login/facebook/callback',
  profileFields: ['id', 'displayName', 'email']
},
(accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    // create user, profile.json.displayname, profile.json.email
    User.findOne({email: profile.emails[0].value}).then((output) => {
      if(output) return done(null, output); // user exists
      User.create({name: profile.displayName, email: profile.emails[0].value, authType: 'facebook'}).then((output) => {
        return done(null, output);
      }).catch((error) => {
        utils.log('error', error);
        return done(error, false);
      });
    }).catch((error) => {
      utils.log('error', error);
      return done(error, false);
    });
    utils.log('info', `User ${profile.emails[0].value} logged in.`);
  });
}));

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({email: username}).then((output) => {
      if (!output) { return done(null, false); } // user doesnt exist
      bcrypt.compare(password, output.password, (err, res) => {
        if (output) return done(null, output); // valid password
        return done(null, false);
      });
    }).catch((error) => {
      utils.log('error', error);
      return done(error, null)
    });
  }
));

const app = express();

const MongoDBStore = require('connect-mongodb-session')(session);

app.use(helmet());

app.use((req, res, next) => {
  utils.log('info', `${new Date().toUTCString()} - ${req.ip} : ${req.url}`);
  next();
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const store = new MongoDBStore({
  uri: process.env.DATABASE_URL || 'mongodb://localhost:27017/shoeshop',
  collection: 'sessions',
});

app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  store,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

db.connectToServer().then(() => {
  utils.log('info', 'Connected to database ');
  app.listen(process.env.PORT || 3000, () => {
    utils.log('info', 'Listening on 3000');
  });
}).catch((error) =>{
  utils.log('error', 'could not connect to the database');
  utils.log('error', error);
});


module.exports = app;
