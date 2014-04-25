module.exports.setup = function (app) {

	//--sub routes--
	require('./home').setup(app);
	require('./login').setup(app);
	require('./search').setup(app);
	require('./editor').setup(app);
	require('./passenger').setup(app);
	require('./institute').setup(app);
	require('./statisticsPage').setup(app);
	require('./vehicle').setup(app);
	require('./statistics').setup(app);
};