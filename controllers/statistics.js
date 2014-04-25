var carpoolService = require('../libs/carpoolService');

module.exports.getStatistics = function (req, res, next) {
	
	carpoolService.getStatistics(function(err, statistics){
		if(err){
			res.send(err);
		}else{
			res.send(statistics);
		}
	});
};