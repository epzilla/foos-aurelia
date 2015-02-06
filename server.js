/*jshint globalstrict: true*/
'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var morgan       = require('morgan');
var path          = require('path');
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

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/foos');

server.listen(9000, function() {
  console.info('server listening on port 9000');
});

var socket = require('socket.io').listen(server);
socket.on('connection', function(){
  console.info('connected SocketIO');
  routes.init(socket);
  socket.emit('test', {testData: 'got it?'});
  socket.on('asdf', function (data) {
    console.log(data);
  });
});

// REGISTER OUR ROUTES -------------------------------
routes.init(socket);

app.use('/api', routes.router);
app.set('port', port);

app.get('/', function (req, res) {
  console.log('loading index file');
  res.render('index.html');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
