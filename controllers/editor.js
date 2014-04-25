var carpoolService = require('../libs/carpoolService');
var _ = require('underscore');
var email = require('../libs/email');
var async = require('async');


module.exports.serveEditorPage = function (req, res, next) {
	
	res.render('editor');
};


module.exports.getUserDetails = function (req, res, next) {
	
	carpoolService.getCarpoolUserById(req.params.user_id, function(err, user){
		if(err){
			res.send(err);
		}else{
			res.send(user);
		}
	});
};

module.exports.searchCarpoolUsers = function(req, res, next){
	carpoolService.searchCarpoolUsers(req.query, function(err, user){
		if(err){
			res.send(err);
		}else{
			res.send(user);
		}
	});
};


module.exports.updateUserById = function (req, res, next) {
	
	carpoolService.updateCarpoolUserById(req.params.user_id, req.body, function(err, user){
		if(err){
			console.dir(err);
			res.send(err);
		}else{
			res.send(user);
		}
	});
};

module.exports.searchVehicles = function(req, res, next){
	carpoolService.searchCarpoolVehicles(req.query, function(err, vehicle){
		if(err){
			res.send(err);
		}else{
			res.send(vehicle);
		}
	});
};


module.exports.getUserVehicles = function (req, res, next) {
	
	carpoolService.getUserVehicles(req.params.user_id, function(err, vehicles){
		if(err){
			res.send(err);
		}else{
			res.send(vehicles);
		}
	});
};

module.exports.getVehicleById = function (req, res, next) {
	
	carpoolService.getVehicleById(req.params.vehicle_id, function(err, vehicle){
		if(err){
			res.send(err);
		}else{
			res.send(vehicle);
		}
	});
};

module.exports.updateVehicleById = function (req, res, next) {
	
	
	carpoolService.updateVehicleById(req.params.vehicle_id, req.body, function(err, vehicle){
		if(err){
			console.dir(err);
			res.send(err);
		}else{
			res.send(vehicle);
		}
	});
};

function getAttachedFiles(req) {
	var files = [];
	if (_.has(req, 'files')) {
		files = _.values(req.files);
	}
	return files;
}

module.exports.uploadFile = function (req, res, next) {
	var files = getAttachedFiles(req);
	if(files.length < 1){
		res.send(new Error('No file attached.'));
	}else{
		carpoolService.uploadFile(files[0].originalFilename,files[0].path, function(err, data){
			console.log("error" + err);
			console.log("data"+data);
			if(err){
				res.send(err);
			}else{
				res.send(data);
			}
		});
	}
};

module.exports.downloadTempFile = function (req, res, next) {
	carpoolService.downloadTempFile(req.params.file_id,res);
};

module.exports.downloadFile = function (req, res, next) {
	carpoolService.downloadFile(req.params.file_id,res);
};

module.exports.sendVehicleStatus = function(req, res, next){
	
	
	var steps = [];
	
	steps.push(function(cb){
		carpoolService.updateVehicleById(req.body.vehicleId, req.body, cb);
	});
	
	steps.push(function(vehicle,cb){
		carpoolService.getCarpoolUserById(req.body.userId,cb);
	});
	
	steps.push(function(user,cb){
		email.sendStatus(user.email, req.body.admin_status, req.body.comment, function(err){
			if(err){
				res.send({emailSent : false});
			}else{
				res.send({emailStatus : true});
			}
		});
	});
	
	async.waterfall(steps, function(err){
		if(err){
			res.send({emailsent: false});
			console.log(err);
		}
	});

};

module.exports.sendUserStatus = function(req, res, next){
	
	
	var steps = [];
	
	steps.push(function(cb){
		carpoolService.updateCarpoolUserById(req.body.userId, req.body, cb);
	});
	
	steps.push(function(user,cb){
		email.sendStatus(user.email, req.body.admin_status, req.body.comment, function(err){
			if(err){
				res.send({emailSent : false});
			}else{
				res.send({emailStatus : true});
			}
		});
	});
	
	async.waterfall(steps, function(err){
		if(err){
			res.send({emailsent: false});
			console.log(err);
		}
	});

};