var loginValid = require('../validations').login;
var loginCtl = require('../controllers').login;
var adminPolicy = require('../policies').admin;


module.exports.setup = function (app) {

	app.get('/login', loginCtl.serveLoginPage);

	app.post('/login', loginValid.validLoginRequest, loginCtl.doLogin);

	app.get('/logout', loginCtl.doLogout);
};