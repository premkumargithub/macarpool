var instituteCtrl = require('../controllers').institute;
var adminPolicy = require('../policies').admin;


module.exports.setup = function (app) {
	
	app.get('/network', adminPolicy.isLoggedIn, instituteCtrl.serveNetwork);
	app.get('/institutes/search', adminPolicy.isLoggedIn, instituteCtrl.searchInstitutes);
	app.get('/institutes/:institute_id', adminPolicy.isLoggedIn, instituteCtrl.getInstituteById);
	app.post('/institutes', adminPolicy.isLoggedIn, instituteCtrl.addInstitute);
	app.put('/institutes/:institute_id', adminPolicy.isLoggedIn, instituteCtrl.updateInstituteById);

};