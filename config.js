var extend = require('extend');
var clone = require('clone');

var prod = {
		host                        : '0.0.0.0',
		port                        : 80,
		mongoUrl                    : 'mongodb://localhost:27017/admin_service',
		
		isvc:{
			
			selfAccessKey           : 'VSrSjRrlOYOSgA2qeqfPQFt9aTI4VUA4j6DG5fO8yoaqzLLo4oN8qeoefTjEPJF2',
			carpoolService          : {
				                          url:'http://54.84.9.214:80',
				                          accessKey:'127bUVjCmGC064BpPZZtoYyg3ziMsQBBQCh77PFpwTxYGQzEjuTb9sDOztTMHJDH'
			                          }
		},
		
		gmail: {
			user: 'info@miaguila.com',
			pass: 'p0387EB7w24zSeJ'
		}
		
};

var test = {
		port : 8080,
		mongoUrl: 'mongodb://localhost:27017/admin_service_test',
		
		isvc:{
			carpoolService          : {
				                          url:'http://54.84.9.214:8080'
			                          }
		},
		
		gmail: {
			toAddressOverride: 'info@miaguila.com'
		}
};

var dev = {
		host                        : '127.0.0.3',
		mongoUrl                    : 'mongodb://localhost:27017/admin_service_dev',
		
		/* isvc:{
			carpoolService          : {
				                          url:'http://127.0.0.1:8080'
			                          }
		} */
};

var mode = process.env.MODE || process.argv[2];

if(mode === 'prod'){
	module.exports = prod;
}else if(mode === 'test'){
	module.exports = extend(true,clone(prod),test);
}else if(mode === 'dev'){
	module.exports = extend(true, clone(prod), clone(test), dev);
}else{
	console.error('ERROR : Configuration parameter \'prod\', \'test\' or \'dev\' is required. ' +
			'Either as first arg to node process, ' +
			'or set via \'MODE\' environment variable.');
	process.exit(1);
}

module.exports.mode = mode;
console.log('Config : %s', mode);