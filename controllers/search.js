var carpoolService = require('../libs/carpoolService');

/**
 * Serve the search page.
 * @param req request.
 * @param res response.
 * @param next next in chain.
 */
module.exports.serveSearchPage = function (req, res, next) {
	res.render('search');
};


/**
 * Perform a search and render search page with results. Also returns query parameters that were used for the search.
 * @param req
 * @param res
 * @param next
 */
module.exports.performSearch = function (req, res, next) {
	
	req.query.first_name = req.query.name;
	req.query.last_name = req.query.name;
	
	carpoolService.searchCarpoolUsers(req.query, function (err, results) {
		var data = {};
		console.dir(err);
		if(err){
			data.err_messages = err.message;
		}
		if(results && results.length > 0){
			data.results = results;
		}
		
		res.send(data);
	});
};