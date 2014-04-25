'use strict';

var nodeMailer = require('nodemailer');
var config = require('../config');

var smtpTransport = nodeMailer.createTransport("SMTP", {
	service: "Gmail",
	auth   : {
		user: config.gmail.user,
		pass: config.gmail.pass
	}
});

module.exports.sendStatus = function (emailAddress, status, comment, callback) {
	var mailOptions = {
		from   : config.gmail.user, // sender address
		to     : emailAddress, // list of receivers
		subject: "MiAguila Registration : Status", // subject line
		text   : "Hello,\n\nYour registration status with MiAguila is : " + status + ".\nComment: "+comment, // plaintext body
		html   : "<p>Hello,\n\nYour registration status with MiAguila is : " + status + ".</p><p>Comment: "+comment+"</p>"  // html body
	};

	//TODO--Test code--
	if (config.gmail.toAddressOverride) {
		mailOptions.to = config.gmail.toAddressOverride;
	}

	smtpTransport.sendMail(mailOptions, function (err, response) {
		if (err) {
			callback(err);
		} else {
			console.log('EMAIL SENT', JSON.stringify(response));
			callback();
		}
	});
};