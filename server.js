/*
|------------------------------------------------------------
| Socketcluster Dependencies
|------------------------------------------------------------
|
|	Socketcluster default configuration settings
|
*/

var SocketCluster = require('socketcluster').SocketCluster
require('node-env-file')(__dirname+'/.env')

/*
|------------------------------------------------------------
| Socketcluster General Configuration
|------------------------------------------------------------
|
|	Socketcluster default configuration settings
|
*/

var sc_config = {
	workers 				: 	require('os').cpus().length	,
    brokers 				: 	1							,
    port 					: 	process.env.PORT || 3000	,
    appName					: 	'fusionv3'					,
	logLevel				: 	2							,
	protocol 				: 	'http'						,
	workerController		: 	__dirname + '/worker.js'	,
	brokerController		: 	__dirname + '/broker.js'	,
	socketEventLimit		: 	500							,
	rebootWorkerOnCrash		: 	true
}

/*
|------------------------------------------------------------
| Production Setup
|------------------------------------------------------------
|
|	Socketcluster production configuration settings
|
*/

if (process.env.ENV == 'production') {
	sc_config.logLevel = 1
	sc_config.protocol = 'https'
	sc_config.protocolOptions = {
		ca: fs.readFileSync(process.env.CA_PATH,'utf8'),
		key: fs.readFileSync(process.env.KEY_PATH,'utf8'),
		cert: fs.readFileSync(process.env.CRT_PATH,'utf8'),
		passphrase: '3v4b6b6r432vt543tb43wb5556'
	}
}

/*
|------------------------------------------------------------
| Build Client-Side Templates
|------------------------------------------------------------
*/

require('templatizer')(__dirname+'/Templates',__dirname+'/Public/js/modules/templates.js',{},function(err,templates) { console.log(err || 'Successfully created client-side templates.') })

/*
|------------------------------------------------------------
| Starting Socketcluster
|------------------------------------------------------------
|
|	Now, we start socketcluster based on the enviroment which
|	is setup in the environmental file (.env) and the config
|	object.
|
*/

console.log("   Starting in "+process.env.ENV+" mode.")
socketCluster = new SocketCluster(sc_config)