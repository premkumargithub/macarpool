var adminPolicy = require('../policies').admin;
var homeCtl = require('../controllers').home;

module.exports.setup = function (app) {

	app.get('/', adminPolicy.isLoggedIn, homeCtl.serveSearchPage);

};