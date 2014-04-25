var Schema = require('mongoose').Schema;
var validator = require('validator');

var admin_schema = new Schema(
	{
		first_name: {type: String, required: true},
		last_name : {type: String, required: true},
		email     : {type: String, required: true, validate: validator.isEmail},
		password  : {type: String, required: true}
	}
);

module.exports = admin_schema;