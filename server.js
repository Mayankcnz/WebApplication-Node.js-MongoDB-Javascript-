const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');
const passport = require('passport');
const db = require('./src/db')

const routes = require('./routes');

const dotenv = require('dotenv');
dotenv.config();



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
    console.log('info', `User ${profile.id} logged in.`);
    return done(null, profile);
  });
}));

const app = express();

const MongoDBStore = require('connect-mongodb-session')(session);

app.use(helmet());

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
    maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
  },
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);

db.connectToServer().then(() => {
  console.log('Connected to database ');
  app.listen(3000, () => {
    console.log('Listening on 3000');
  });
}).catch((error) =>{
  console.log('could not connect to the database');
  console.log(error);
});


module.exports = app;