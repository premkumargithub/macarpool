var Admin = require('../models').Admin;

/**
 * Serve the login page. forwards to home page if already logged in.
 * @param req request.
 * @param res response.
 * @param next next in chain.
 */
module.exports.serveLoginPage = function (req, res, next) {
	if (req.session && req.session.Admin_id) {
		res.redirect('/');
	} else {
		res.render('login', {});
	}
};

/**
 * Perform agent login. "session.Admin_id" will be available in requests.
 * @param req request.
 * @param res response.
 * @param next next in chain.
 */
module.exports.doLogin = function (req, res, next) {
	Admin.matchCredentials(req.body.email, req.body.password, function (err, admin) {
		if (err) {
			next(err);
		} else if (admin) {
			req.session.regenerate(function () {
				req.session.admin_id = admin._id.toString();
				res.redirect('/');
			});
		} else {
			req.session.destroy(function () {
				req.session = null;
				res.render('login', {err_messages: ['Login failed.']});
			});

		}
	});
};

/**
 * Perform agent logout. Clears current session.
 * @param req request.
 * @param res response.
 * @param next next in chain.
 */
module.exports.doLogout = function (req, res, next) {
	req.session.destroy(function () {
		req.session = null;
		res.redirect('/login');
	});
};