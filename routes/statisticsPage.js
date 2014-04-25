var statisticsPageCtrl = require('../controllers').statisticsPage;
var adminPolicy = require('../policies').admin;


module.exports.setup = function (app) {
	
	app.get('/statistics', adminPolicy.isLoggedIn, statisticsPageCtrl.serveStatisticsPage);
};