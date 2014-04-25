/**
 * Module dependencies.
 */
var express = require('express');
var connectMultiparty = require('connect-multiparty');
var MongoStore = require('connect-mongo')(express);
var expressValidator = require('express-validator');
var http = require('http');
var path = require('path');
var lusca = require('lusca');
var logger = require('./libs').logger;
var mongoose = require('mongoose');
var routes = require('./routes');

var config = require('./config');

var dbUrl = config.mongoUrl;
mongoose.connect(dbUrl);

var app = express();

// all environments
app.set('host', config.host);
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser('yRRcDbkR82Osu2oPP1IEOChyiX5VanV'));
app.use(express.session({store: new MongoStore({url: dbUrl})}));
app.use(express.json());
app.use(express.urlencoded());
app.use(connectMultiparty());
app.use(expressValidator());


// karken's lusca security
//app.use(lusca({
//    csrf: true,
//    csp: {/* ... */},
//    xframe: 'SAMEORIGIN',
//    p3p: 'ABCDEF',
//    hsts: {maxAge: 31536000, includeSubDomains: true},
//    xssProtection: true
//}));


//routes
app.use(app.router);
routes.setup(app);

if (config.mode !== 'prod') {
	app.use(express.errorHandler());
}


// init
http.createServer(app).listen(app.get('port'), app.get('host'), function (err) {
	if (err) {
		throw err;
	} else {
		console.log('Server listening on %s:%s', app.get('host'), app.get('port'));
	}
});

//--export--
module.exports = app;

//TODO -- Test User, Remove on release--
require('./models').Admin.remove({});
require('./models').Admin.register('testuser', 'user', 'test@test.com', 'testpass', function () {
});


