/*jshint globalstrict: true*/
'use strict';

var Player = require('../../models/player');

module.exports = {

  create: function (req, res) {
    var player = new Player({
      name: req.body.name,
      matches: 0,
      games: 0,
      matchesWon: 0,
      matchesLost: 0,
      gamesWon: 0,
      gamesLost: 0,
      pct: 0,
      ptsFor: 0,
      ptsAgainst: 0
    });

    player.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Player created!' });
    });
  },

  findAll: function (req, res) {
    Player.find(function (err, players) {
      if (err) {
        res.send(err);
      }
      res.json(players);
    });
  },

  find: function (req, res) {
    Player.findById(req.params.playerId, function (err, player) {
      if (err) {
        res.send(err);
      }
      res.json(player);
    });
  },

  update: function (req, res) {
    Player.findById(req.params.playerId, function (err, player) {
      if (err) {
        res.send(err);
      }

      var newVals = req.body;
      for (var prop in newVals) {
        if (newVals.hasOwnProperty(prop)) {
          if (player[prop] !== undefined) {
            console.log('**** Found prop: ' + prop + ' *****');
            player[prop] = newVals[prop];
          }
        }
      }

      player.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Player updated!' });
      });
    });
  },

  updatePlayerStats: function (match, cb) {
    cb();
  }
};