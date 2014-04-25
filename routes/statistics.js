var statisticsCtrl = require('../controllers').statistics;
var adminPolicy = require('../policies').admin;


module.exports.setup = function (app) {
	
	app.get('/getstatistics', adminPolicy.isLoggedIn, statisticsCtrl.getStatistics);

};