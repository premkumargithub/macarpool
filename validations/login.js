var util = require('util');
var _ = require('underscore');

/**
 * Checks whether login request has all required data.
 * @param req request
 * @param res response
 * @param next next middleware
 */
module.exports.validLoginRequest = function (req, res, next) {
	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('password', 'password is required').notEmpty();

	var errors = req.validationErrors();
	var err_messages = [];
	if (errors) {
		errors.forEach(function (element) {
			err_messages.push(element.msg);
		});
		res.render('login', {
			err_messages: err_messages
		});
	} else {
		next();
	}
};