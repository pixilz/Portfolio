var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

require('dotenv').config();

//Routes
var routes = {
    index: require('./routes/index'),
    contact: require('./routes/contact')
};
/*
var testPage = require('./routes/test');
var pluginTest = require('./routes/pluginTest');
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//views
app.use('/', routes.index);
app.use('/Contact', routes.contact);
//app.use('/test', testPage);
//app.use('/pluginTest', pluginTest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

app.use(function(err, req, res, next) {
    // development error handler will print stacktrace
    var errParam = process.env.NODE_ENV === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error', {
        status: err.status,
        title: `${err.status} Error - Zoë Clarno`,
        error: errParam
    });
});


module.exports = app;
