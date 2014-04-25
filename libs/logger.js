var winston = require('winston');
var config = require('../config');
var pkg = require('../package.json');
var path = require('path');
var fsExtended = require('fs-extended');

var logDir = path.join(path.dirname(__dirname), '/logs');

fsExtended.ensureDirSync(logDir);

var transports = [
	new winston.transports.File({
		filename: path.join(logDir, pkg.name + '.log'),
		maxsize : 10 * 1024 * 1024,
		maxFiles: 5
	})
];


if (config.mode !== 'prod') {
	transports.push(new winston.transports.Console({colorize: true}));
}


module.exports = new winston.Logger({
	transports: transports
});