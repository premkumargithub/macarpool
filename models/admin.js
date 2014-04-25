//--required--
var mongoose = require('mongoose');
var admin_schema = require('./schemas/admin');
var passwordHash = require('password-hash');
var async = require('async');

//--enable multi set plugin--
admin_schema.plugin(require('mongoose-multi-set'));

//--statics--

/**
 * Register an admin.
 * @param firstName admin first name.
 * @param lastName admin last name.
 * @param email admin email.
 * @param password admin password.
 * @param callback function(err,admin)
 */
admin_schema.statics.register = function (firstName, lastName, email, password, callback) {
	var self = this;
	self.create({
		first_name: firstName,
		last_name : lastName,
		email     : email,
		password  : passwordHash.generate(password)
	}, callback);
};

/**
 * Check whether an admin with given credentials exists. Callback will have admin if found.
 * @param email admin email.
 * @param password admin password.
 * @param callback function(err,admin)
 */
admin_schema.statics.matchCredentials = function (email, password, callback) {
	var self = this;
	async.waterfall(
		[
			function (cb) {
				self.findOne({email: email}, function (err, admin) {
					cb(err, admin);
				});
			},

			function (admin, cb) {
				if (admin) {
					if (passwordHash.verify(password, admin.password)) {
						cb(null, admin);
					} else {
						cb(null, null);
					}
				} else {
					cb(null, null);
				}
			}

		], callback
	);
};

/**
 * Get an admin by id.
 * @param id admin id.
 * @param callback function(err,admin)
 */
admin_schema.statics.getById = function (id, callback) {
	var self = this;
	self.findOne({_id: id}, callback);
};

/**
 * Update an admin by values from data parameter.
 * @param id admin id.
 * @param data data to update from.
 * @param callback function(err,admin)
 */
admin_schema.statics.updateById = function (id, data, callback) {
	var self = this;
	async.waterfall(
		[
			function (cb) {
				self.findOne({_id: id}, function (err, admin) {
					cb(err, admin);
				});
			},

			function (admin, cb) {
				admin.multiSet(data, ['first_name', 'last_name']);
				admin.save(function (err, saved) {
					cb(err, saved);
				});
			}
		], callback
	);
};

//--methods--


//--export--
module.exports = mongoose.model('admins', admin_schema);


