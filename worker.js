module.exports.run = function (worker) {
    console.log('   >> Worker PID:', process.pid)

    /*
    |--------------------------------------------------------------------------
    | Worker Dependencies
    |--------------------------------------------------------------------------
    */


    var SessionMiddleware = new require('./Classes/Middleware/SessionMiddleware'),
        SocketServer = new require('./Classes/SocketServer'),
        serve_static = require('serve-static'),
        sessions = require('client-sessions'),
        http_server = worker.httpServer,
        sc_exchange = worker.exchange,
        express = require('express'),
        sc_server = worker.scServer,
        path = require('path'),
        fs = require('fs'),
        app = express()

    /*
    |--------------------------------------------------------------------------
    | Database Setup
    |--------------------------------------------------------------------------
    |
    | Here you can setup the database pool connection. Currently, it's
    | defaulted to MySQL. 
    |
    */
   
    var pool = require('mysql').createPool({
      host            : process.env.DB_HOST,
      user            : process.env.DB_USERNAME,
      password        : process.env.DB_PASSWORD,
      database        : process.env.DB_DATABASE,
      debug           : (process.env.ENV == 'production' ? false : true),
      connectionLimit : 500
    })

    /*
    |--------------------------------------------------------------------------
    | View Engine Setup
    |--------------------------------------------------------------------------
    |
    | Sets up the view engine the worker will use for serving static files.
    | Some example engine types are jade and ejs. If html is the engine
    | you like, then just comment out the two items below and put the
    | index.html in the public folder. You can also set where the
    | files are stored.
    |
    */
   
    app.set('views', __dirname+'/Views');
    app.set('view engine', 'jade');

    /*
    |--------------------------------------------------------------------------
    | Asset Folder Setup
    |--------------------------------------------------------------------------
    |
    | You can designate the folder where assets like javascript and css files
    | will be served from.
    |
    */

    app.use(serve_static(path.resolve(__dirname, 'Public')))

    /*
    |--------------------------------------------------------------------------
    | Session Setup
    |--------------------------------------------------------------------------
    |
    | Now we set the session name (cookieName), the secret passkey, and the
    | time the session is active (duration) (in milliseconds). We also
    | attach the session middleware here.
    |
    */

    app.use(sessions({
        cookieName: 'session',
        secret: process.env.SESSION_SECRET || "keyboard-cat",
        duration: 1 * 24 * 60 * 60 * 1000  // 1 Day
    }));

    /*
    |--------------------------------------------------------------------------
    | Request Setup
    |--------------------------------------------------------------------------
    |
    | This is where the app is attached to the main server. You probably
    | shouldn't change this because there isn't really any other option.
    |
    */
   
    http_server.on('request', app)

    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | This is where you attach express routes to the http server
    |
    */

    app.get('/',require('./Routes/HomeRoute'))

    /*
    |--------------------------------------------------------------------------
    | Socketcluster Client Connections
    |--------------------------------------------------------------------------
    */

    sc_server.on('connection', function (socket) {

        /*
        |--------------------------------------------------------------------------
        | Socket Connections
        |--------------------------------------------------------------------------
        |
        | Lets handle connections
        |
        */

        SocketServer.connect(socket.id,worker.id)
        socket.on('disconnect',function() { 
          SocketServer.disconnect(socket.id,worker.id) 
        })

        /*
        |--------------------------------------------------------------------------
        | Socket Events
        |--------------------------------------------------------------------------
        |
        | This is where the socket events are handled
        |
        */

        socket.on('controllers',function(data,respond) {
            
        })

    })

};
