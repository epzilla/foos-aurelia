/*jshint globalstrict: true*/
'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var morgan       = require('morgan');
var path         = require('path');
var conf         = require('./app/config');
var routes       = require('./app/routes/api');
var server       = require('http').createServer(app);

// configure app
app.use(morgan('dev'));

// configure body parser
app.use(bodyParser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, '.')));
app.set('views', path.join(__dirname, '.'));

if (conf.ENVIRONMENT === 'dev') {
  app.use(require('connect-livereload')({
    port: 35729
  }));
}

var port = process.env.PORT || conf.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/foos');

// SET UP SOCKETS =========================================
var socket_port = conf.SOCKET_PORT || 9000;
server.listen(socket_port, function() {
  console.info('server listening on port ' + socket_port);
});

var io = require('socket.io').listen(server);
routes.init(io);

// REGISTER ROUTES ========================================
app.use('/api', routes.router);
app.set('port', port);

app.get('/', function (req, res) {
  console.log('loading index file');
  res.render('index.html');
});

// START THE SERVER
// ========================================================
app.listen(port);
console.log('Magic happens on port ' + port);
