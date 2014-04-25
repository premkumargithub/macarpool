/**
 * Serve the home page.For now, redirects to search page.
 * @param req request.
 * @param res response.
 * @param next next in chain.
 */
module.exports.serveSearchPage = function (req, res, next) {
	res.redirect('/search');
};
