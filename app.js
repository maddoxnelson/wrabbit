// Outside modules
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');

// Our defined modules
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');

const app = express();

app.set('views', path.join(__dirname, 'views')); // hooks up folder where our pug files will live

app.set('view engine', 'pug'); // specifies the engine as pug, although you could use something else like mustache

// serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Take raw requests and turn them into usable props on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Expose a bunch of methods for validating data (userController.validateRegister)
app.use(expressValidator());

// populate req.cookies with any cookies needed
app.use(cookieParser());

// Sessions let us store data on visitors from request to request. Lets us keep users logged in and lets us send flash messages.
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport JS is what we use to handle logins
app.use(passport.initialize());
app.use(passport.session());

// Flash middleware is very handy
app.use(flash());

// pass variables around to our templates and all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify any callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Handle our own routes:
app.use('/', routes);

// if our routes fail...
app.use(errorHandlers.notFound);

// one will check for simple validation errors
app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

// done, export it so it can be used in start.js
module.exports = app;
