var vehiclesCtrl = require('../controllers').vehicles;
var adminPolicy = require('../policies').admin;


module.exports.setup = function (app) {
	app.get('/vehicles', adminPolicy.isLoggedIn, vehiclesCtrl.serveVehicles);
	app.get('/vehicledetails/:vehicle_id', adminPolicy.isLoggedIn, vehiclesCtrl.serveVehicleDetails);
};
