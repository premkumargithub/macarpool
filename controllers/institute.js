var carpoolService = require('../libs/carpoolService');

module.exports.serveNetwork = function(req, res, next){
	res.render('network');
};

module.exports.searchInstitutes = function (req, res, next) {
	
	carpoolService.searchInstitutes(req.query, function(err, institutes){
		if(err){
			res.send(err);
		}else{
			res.send(institutes);
		}
	});
};

module.exports.updateInstituteById = function (req, res, next) {
	
	carpoolService.updateInstituteById(req.params.institute_id, req.body,function(err, institute){
		if(err){
			res.send(err);
		}else{
			res.send(institute);
		}
	});
};

module.exports.addInstitute = function (req, res, next) {
	
	carpoolService.addInstitute( req.body,function(err, institute){
		if(err){
			res.send(err);
		}else{
			res.send(institute);
		}
	});
};

module.exports.getInstituteById = function(req, res, next){
	carpoolService.getInstituteById( req.params.institute_id,function(err, institute){
		if(err){
			res.send(err);
		}else{
			res.send(institute);
		}
	});
};