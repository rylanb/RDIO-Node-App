/**
 * Module dependencies.
 */

var express = require('express'),
  ct = require('./app/setup.js'),
  OAuth = require('oauth').OAuth,
  querystring = require('querystring');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "98yKGKgkdrg94tnkfdh"
  }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.dynamicHelpers({
  base: function(){
    return '/' == app.route ? '' : app.route;
  },
  session: function(req, res){
    return req.session;
  }
});

// Middleware
app.configure(function(){
  app.use(express.logger('\x1b[33m:method\x1b[0m \x1b[32m:url\x1b[0m :response-time'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// app.configure('development', function(){
//   app.set('view options', {pretty:true});
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
// });

// app.configure('production', function(){
//   app.use(express.errorHandler());
// });

//RDIO
var rdio = require('rdio')({
  rdio_api_key: ct.config.rdio_api_key,
  rdio_api_shared: ct.config.rdio_api_shared,
  callback_url: ct.config.host+":"+ct.config.port+"/oauth/callback"
});

// Routes
require('./routes/site')(app, rdio);

//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log('Server started on port '+ct.config.port);
}
