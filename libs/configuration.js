var fse = require('fs-extended');
var S = require('string');
var path = require('path');

/**
 * Loads all json files as objects and non json files as paths from configureation folders.
 * 'dev' directory is loaded first.
 * If 'test' directory exists, config is overwritten with files from test directory.
 * finally, If 'prod' directory exists, config is overwritten with files from prod directory.
 * @returns {{json: {}, files: {}}}
 */
function load() {

	var config = {json: {}, files: {}};

	//--directories for dev and prod configuration--
	var configPathDev = path.resolve(__dirname, '../config/dev');
	var configPathTest = path.resolve(__dirname, '../config/test');
	var configPathProd = path.resolve(__dirname, '../config/prod');


	//--load jsons and files from dev--
	var devFiles = fse.listFilesSync(configPathDev);

	if (devFiles) {
		devFiles.forEach(function (file) {
			if (S(file).endsWith('.json')) {
				config.json[S(file).chompRight('.json')] =
					fse.readJSONSync(path.join(configPathDev, file));
			} else {
				config.files[file] = path.join(configPathDev, file);
			}
		});
	}

	//--check if test exists--
	var testFiles = fse.existsSync(configPathTest) ? fse.listFilesSync(configPathTest) : null;

	//--load jsons and files from test if exists--
	if (testFiles) {
		testFiles.forEach(function (file) {
			if (S(file).endsWith('.json')) {
				config.json[S(file).chompRight('.json')] =
					fse.readJSONSync(path.join(configPathTest, file));
			} else {
				config.files[file] = path.join(configPathTest, file);
			}
		});
	}

	//--check if prod exists--
	var prodFiles = fse.existsSync(configPathProd) ? fse.listFilesSync(configPathProd) : null;

	//--load jsons and files from prod if exists--
	if (prodFiles) {
		prodFiles.forEach(function (file) {
			if (S(file).endsWith('.json')) {
				config.json[S(file).chompRight('.json')] =
					fse.readJSONSync(path.join(configPathProd, file));
			} else {
				config.files[file] = path.join(configPathProd, file);
			}
		});
	}

	//--set configuration level--
	config.level = prodFiles ? 'prod' : (testFiles ? 'test' : 'dev');

	return config;
}

module.exports = load();