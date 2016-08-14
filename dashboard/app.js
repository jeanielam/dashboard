
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');

var app = express();
app.locals.moment = require('moment');
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.methodOverride());
//app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
function errorNotification(err, str, req) {
    var title = 'Error in ' + req.method + ' ' + req.url;
    notifier.notify({
        title: title,
        message: str
    });
}
// development only
if ('development' == app.get('env')) {
    app.use(errorHandler({log: errorNotification}));
}

app.get('/', routes.index);
app.get('/transit', routes.transit)
app.get('/stats', routes.stats)
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
