const express = require('express');
const fs = require('fs');

const path = require('path');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');


var env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];


require('./config/passport')(passport, config);

var app = express();

app.set('port', config.port);
app.set('views', __dirname + '\\app\\views');
app.set('view engine', 'jade');
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session(
  {
    resave: true,
    saveUninitialized: true,
    secret: 'secretSecretSecretSecretSuperSecret!!'
  }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/routes')(app, config, passport);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
