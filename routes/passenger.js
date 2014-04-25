var adminPolicy = require('../policies').admin;
var passengerCtl = require('../controllers').passenger;

module.exports.setup = function (app) {
	app.get('/passenger', adminPolicy.isLoggedIn, passengerCtl.servePassengerPage);
};