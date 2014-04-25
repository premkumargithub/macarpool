
module.exports.serveVehicles = function(req, res, next){
	res.render('vehicles');
};

module.exports.serveVehicleDetails = function(req, res, next){
	res.render('vehicledetail');
};