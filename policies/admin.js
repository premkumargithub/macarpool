/**
 * Checks if admin has valid login. i.e. session.admin_id exists. Redirects to /login if it does not exists.
 * @param req
 * @param res
 * @param next
 */
module.exports.isLoggedIn = function (req, res, next) {
	if (req.session && req.session.admin_id) {
		next();
	} else {
		res.redirect('/login');
	}
};