var request = require('request');
var _ = require('underscore');
var config = require('../config');
var superAgent = require('superagent');

//------- user --------------------

/**
 * Contact carpool service and perform user search.
 * @param queryParams Object containing search parameters.
 * @param callback function(err,result).
 */
module.exports.searchCarpoolUsers = function (queryParams, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		json   : {},
		qs     : queryParams,
		url    : config.isvc.carpoolService.url + '/svc/users/search',
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};
	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * Contact carpool service and get user details.
 * @param carpoolUserId carpool user id.
 * @param callback function(err,result).
 */
module.exports.getCarpoolUserById = function (carpoolUserId, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		json   : {},
		url    : config.isvc.carpoolService.url + '/svc/users/' + carpoolUserId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * Contact carpool service and perform user update..
 * @param carpoolUserId carpool user id
 * @param update update object
 * @param callback callback
 */
module.exports.updateCarpoolUserById = function (carpoolUserId, update, callback) {
	var options = {
		timeout: 10000,
		method : 'PUT',
		json   : update,
		url    : config.isvc.carpoolService.url + '/svc/users/' + carpoolUserId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};
	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

//----------------statistics--------------------------------

/**
 * Contact carpool service and get statistics.
 * @param callback function(err,result).
 */
module.exports.getStatistics = function (callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		url    : config.isvc.carpoolService.url + '/svc/statistics',
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};
	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

//----------- vehicle -------------------

/**
 * Contact carpool service and perform vehicle search.
 * @param queryParams Object containing search parameters.
 * @param callback function(err,result).
 */
module.exports.searchCarpoolVehicles = function (queryParams, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		json   : {},
		qs     : queryParams,
		url    : config.isvc.carpoolService.url + '/svc/vehicles/search',
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};
	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * Contact carpool service and get user's vehicles.
 * @param carpoolUserId carpool user id.
 * @param callback function(err,result).
 */
module.exports.getUserVehicles = function (carpoolUserId, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		json   : {},
		url    : config.isvc.carpoolService.url + '/svc/vehicles/of/' + carpoolUserId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * Contact carpool service and get vehicle details.
 * @param carpoolVehicleId carpool vehicle id.
 * @param callback function(err,result).
 */
module.exports.getVehicleById = function (carpoolVehicleId, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		json   : {},
		url    : config.isvc.carpoolService.url + '/svc/vehicles/' + carpoolVehicleId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * Contact carpool service and perform vehicle update..
 * @param carpoolVehicleId carpool vehcile id
 * @param update update object
 * @param callback callback
 */
module.exports.updateVehicleById = function (carpoolVehicleId, update, callback) {
	var options = {
		timeout: 10000,
		method : 'PUT',
		json   : update,
		url    : config.isvc.carpoolService.url + '/svc/vehicles/' + carpoolVehicleId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};
	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not OK.'));
		} else {
			callback(null, body);
		}
	});
};


//------------ files ----------------------


/**
 * contact carpool service and upload temperary files to the server
 * @param vehicleId vehicle id of the vehicle
 * @param callback function(err, result)
 * */
module.exports.uploadFile = function (fileName, path, callback) {

	superAgent
		.post(config.isvc.carpoolService.url + '/svc/files')
		.set('access_key', config.isvc.carpoolService.accessKey)
		.set('Accept', 'application/json')
		.attach(fileName, path)
		.end(
		function (err, res) {
			if (err) {
				callback(err);
			} else if (res && res.status === 400) {
				callback(res.body);
			} else if (res && res.status !== 200) {
				callback(new Error('Error contacting carpool service. Response not Ok.'));
			} else {
				callback(null, res.body);
			}
		});

};

/**
 * contact carpool service and download temperary files from the server
 * @param fileId file id of the image of the vehicle
 * @param callback function(err, result)
 * */
module.exports.downloadTempFile = function (fileId, stream) {
	superAgent
		.get(config.isvc.carpoolService.url + '/svc/files/temp/' + fileId)
		.set('access_key', config.isvc.carpoolService.accessKey)
		.pipe(stream);
};

/**
 * contact carpool service and download stored files from the server
 * @param fileId file id of the image of the vehicle
 * @param callback function(err, result)
 * */
module.exports.downloadFile = function (fileId, stream) {
	superAgent
		.get(config.isvc.carpoolService.url + '/svc/files/' + fileId)
		.set('access_key', config.isvc.carpoolService.accessKey)
		.pipe(stream);
};


// ------------- institutes -------------------


/**
 * contact carpool service and search institutes
 * @param query search query
 * @param callback function(err, result)
 * */
module.exports.searchInstitutes = function (query, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		qs     : query,
		url    : config.isvc.carpoolService.url + '/svc/institutes/search',
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not Ok.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * contact carpool service and get institute by id
 * @param instituteId institute id.
 * @param callback function(err, result)
 * */
module.exports.getInstituteById = function (instituteId, callback) {
	var options = {
		timeout: 10000,
		method : 'GET',
		url    : config.isvc.carpoolService.url + '/svc/institutes/' + instituteId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not Ok.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * contact carpool service and update institute with provided Id
 * @param instituteId institute id
 * @param update update object.
 * @param callback function(err, result)
 * */
module.exports.updateInstituteById = function (instituteId, update, callback) {
	var options = {
		timeout: 10000,
		method : 'put',
		json   : update,
		url    : config.isvc.carpoolService.url + '/svc/institutes/' + instituteId,
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not Ok.'));
		} else {
			callback(null, body);
		}
	});
};

/**
 * contact carpool service and add new institute
 * @param data institute data.
 * @param callback function(err, result)
 * */
module.exports.addInstitute = function (data, callback) {
	var options = {
		timeout: 10000,
		method : 'POST',
		json   : data,
		url    : config.isvc.carpoolService.url + '/svc/institutes',
		headers: {access_key: config.isvc.carpoolService.accessKey}
	};

	request(options, function (err, response, body) {
		if (err) {
			callback(err);
		} else if (response && response.statusCode === 400) {
			callback(body);
		} else if (response && response.statusCode !== 200) {
			callback(new Error('Error contacting carpool service. Response not Ok.'));
		} else {
			callback(null, body);
		}
	});
};

