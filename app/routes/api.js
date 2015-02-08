/*jshint globalstrict: true*/
'use strict';

var router = require('express').Router();
var players = require('./services/players');
var matches = require('./services/matches');

var init = function(socket) {
  matches.init(socket);
};

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin, Access-Control-Allow-Methods');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Players
router.post('/players', players.create);
router.get('/players', players.findAll);
router.get('/players/:playerId', players.find);
router.put('/players/:playerId', players.update);

// Matches
router.post('/matches', matches.create);
router.get('/matches', matches.findAll);
router.get('/matches/current', matches.getCurrentMatch);
router.get('/matches/:matchId', matches.find);
router.put('/matches/:matchId', matches.update);
router.put('/matches/changeScore', matches.changeScore);
router.put('/matches/end/:matchId', matches.endMatch);

module.exports = {
  router: router,
  init: init
};