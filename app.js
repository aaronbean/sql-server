/**
 * Main app control
 */

var bodyParser = require('body-parser');
var config = require('config');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
var dust = require('dustjs-linkedin');
var errorHandler = require('errorhandler');
var express = require('express');
var favicon = require('static-favicon');
var methodOverride = require('method-override');
var morgan = require('morgan');
var path = require('path');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var webhook = require('express-ifttt-webhook');

var app = global.app = express();

app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', path.join(__dirname, '/views'));

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(webhook(require('./lib/ifttt')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.session.secret,
    store: new RedisStore(config.redis)
}));

app.mute = false;

require('./routes')(app); // setup routes

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
}
