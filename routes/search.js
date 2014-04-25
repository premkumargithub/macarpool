var adminPolicy = require('../policies').admin;
var searchCtl = require('../controllers').search;

module.exports.setup = function (app) {
	app.get('/search', adminPolicy.isLoggedIn, searchCtl.serveSearchPage);
	app.get('/search/do', adminPolicy.isLoggedIn, searchCtl.performSearch);
};