var request = require('supertest');
var app = require('../app');

var shared ={
	app : app
};
var user_id = '533ea67c683bc6461f552948';
var vehicle_id = null;
var file_id = null;
var Cookies = null;

module.exports = {
		setUp: function (callback) {
			request(shared.app)
			.post('/login')
			.send({email: 'test@test.com', password: 'testpass'})
			.expect(200)
			.end(function(err,res){
				Cookies = res.headers['set-cookie'].pop().split(';')[0];
				console.dir(Cookies);
				callback();
			});
		},
		test_editor_page : function(test){
			var req = request(shared.app).get('/editor/'+user_id).cookies = Cookies;
			req
			.expect(200)
			.end(function (err, res) {
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'unable to get the editor page.');
				console.log(res.body);
				console.log("*****************************************************************************************");
				test.done();
			});
		},
		test_user_details : function(test){
			request(shared.app)
			.get('/user/'+ user_id +'/details')
			.expect(200)
			.end(function (err, res) {
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body._id === id, 'User details were not fetched.');
				console.log(res.body);
				console.log("*****************************************************************************************");
				test.done();
			});
		},
		test_user_vehicles : function(test){
			request(shared.app)
			.get('/user/'+ user_id +'/vehicles')
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'vehicles should be returned');
				console.log(res.body);
				console.log("*****************************************************************************************");
				vehicle_id = res.body.files;
			});
		},
		test_get_vehicle : function(test){
			request(shared.app)
			.get('/vehicle/'+ vehicle_id +'/details')
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'vehicle details should be returned');
				console.log(res.body);
				console.log("*****************************************************************************************");
			});
		},
		test_upload_file : function(test){
			request(shared.app)
			.post('/files/')
			.attach('car_image','./fixtures/rsz_1rsz_img_capture.png')
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'the file could not get uploaded.');
				console.log(res.body);
				console.log("*****************************************************************************************");
				file_id = res.body.fileId;
			});
		},
		test_download_temp_file : function(test){
			request(shared.app)
			.get('/files/temp/' + fileId)
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'the temparary file could not get downloaded');
				console.log(res.body);
				console.log("*****************************************************************************************");
			});
		},
		test_update_vehicle : function(test){
			request(shared.app)
			.get('/vehicle/'+ vehicle_id +'/update')
			.send('file_id_vehicle_img', file_id)
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'vehicle details were not updated');
				console.log(res.body);
				console.log("*****************************************************************************************");
				file_id = res.body.file_id_vehicle_img;
			});
		},
		test_download_file : function(test){
			request(shared.app)
			.get('/files/' + file_id)
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'the file could not get downloaded');
				console.log(res.body);
				console.log("*****************************************************************************************");
			});
		},
		test_delete_vehicle : function(test){
			request(shared.app)
			.get('/vehicle/'+ vehicle_id +'/details')
			.expect(200)
			.end(function(err,res){
				test.expect(2);
				test.ifError(err);
				test.ok(res && res.body, 'vehicle details should be returned');
				console.log(res.body);
				console.log("*****************************************************************************************");
			});
		}
};