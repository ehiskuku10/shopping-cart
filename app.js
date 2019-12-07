const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
const flash = require('connect-flash')
const expressValidator = require('express-validator')
const index = require('./routes/index')
const user = require('./routes/user')
const product = require('./routes/product/product')
const admin = require('./routes/admin')
const cart = require('./routes/cart')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')
require('./handlers/passport')

// create our Express app
const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views')) // this is fold where we keep our pug files
app.set('view engine', 'pug') // we are setting the pug templating engine to render pug files

// we are telling express to serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')))

// we are simply telling to make raw requests into properties that will be available on the 
// request.body object
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Exposes a bunch of methods for validating data. 
app.use(expressValidator())

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}))

// // Passport JS is what we use to handle our logins
app.use(passport.initialize())
app.use(passport.session())

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash())

// pass variables to our template + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// After allllll that above middleware, we finally handle our own routes!
app.use('/home', index);
app.use('/user', user);
app.use('/product', product);
app.use('/admin', admin);
app.use('/cart', cart);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;