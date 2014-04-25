var adminPolicy = require('../policies').admin;
var editorCtl = require('../controllers').editor;

module.exports.setup = function (app) {
	
	//request for editor page
	app.get('/editor/:id', adminPolicy.isLoggedIn, editorCtl.serveEditorPage);
	
	//request for all the users
	app.get('/users/search', adminPolicy.isLoggedIn, editorCtl.getUserVehicles);
	
	//request for the user details
	app.get('/users/:user_id', adminPolicy.isLoggedIn, editorCtl.getUserDetails);
	
	//request for the update user details
	app.put('/users/:user_id', adminPolicy.isLoggedIn, editorCtl.updateUserById);
	
	//request for sending email on completion of user verification by admin
	app.post('/users/me/status',adminPolicy.isLoggedIn, editorCtl.sendUserStatus);
	
	//request for all the vehicles
	app.get('/vehicles/search', adminPolicy.isLoggedIn, editorCtl.searchVehicles);
	
	//request for the vehicles of a user
	app.get('/vehicles/of/:user_id', adminPolicy.isLoggedIn, editorCtl.getUserVehicles);
	
	//request for details of a vehicle
	app.get('/vehicles/:vehicle_id', adminPolicy.isLoggedIn, editorCtl.getVehicleById);
	
	//request for updating the vehicle details
	app.put('/vehicles/:vehicle_id', adminPolicy.isLoggedIn, editorCtl.updateVehicleById);
	
	//request for uploading images of the car
	app.post('/files/', adminPolicy.isLoggedIn, editorCtl.uploadFile);
	
	//request for downloading temporary images of the car
	app.get('/files/temp/:file_id', adminPolicy.isLoggedIn, editorCtl.downloadTempFile);
	
	//request for downloading images of the car
	app.get('/files/:file_id', adminPolicy.isLoggedIn, editorCtl.downloadFile);
	
	//request for sending email on completion of vehicle verification by admin
	app.post('/vehicles/status',adminPolicy.isLoggedIn, editorCtl.sendVehicleStatus);
	
};