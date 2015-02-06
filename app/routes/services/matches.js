/*jshint globalstrict: true*/
'use strict';

var Match = require('../../models/match');
var moment = require('moment');

var self = this;
module.exports = {

  init: function(socket) {
    self.io = socket;
  },

  create: function (req, res) {
    var now = moment();
    var match = new Match({
      heads: req.body.heads,
      tails: req.body.tails,
      scores: [{ heads: 0, tails: 0}],
      startTime: now,
      endTime: null,
      gameStartTime: now,
      gameNum: 1,
      active: true
    });

    match.save(function (err, newMatch) {
      if (err) {
        res.send(err);
      }
      res.json(newMatch);
    });
  },

  findAll: function (req, res) {
    Match.find()
      .populate('heads tails')
      .exec(function (err, matches) {
        if (err) {
          res.send(err);
        }
        res.json(matches);
      });
  },

  find: function (req, res) {
    Match.findById(req.params.matchId)
      .populate('heads tails')
      .exec(function (err, match) {
        if (err) {
          res.send(err);
        }
        res.json(match);
      });
  },

  update: function (req, res) {
    Match.findById(req.params.matchId, function (err, match) {
      if (err) {
        res.send(err);
      }

      var newVals = req.body;
      for (var prop in newVals) {
        if (newVals.hasOwnProperty(prop)) {
          if (match[prop] !== undefined) {
            match[prop] = newVals[prop];
          }
        }
      }

      match.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Match updated!' });
      });
    });
  },

  getCurrentMatch: function (req, res) {
    Match.find({ active: true})
      .populate('heads tails')
      .exec(function (err, match) {
        if (err) {
          res.send(err);
        }
        res.json(match);
      });
  },

  finishGame: function (req, res) {
    var newScore = req.body.score || {heads: 0, tails: 0};
    var gameNum = req.body.gameNum || 3;
    var matchOver = gameNum === 3;

    Match.findById(req.params.matchId, function (err, match) {
      if (err) {
        res.send(err);
      }

      match.scores.push(newScore);
      match.gameNum = gameNum;

      if (matchOver) {
        match.active = false;
      }

      match.save(function (err, updatedMatch) {
        if (err) {
          res.send(err);
        }
        if (matchOver) {
          self.io.emit('matchUpdate', {status: 'finished'});
        }
        res.json(updatedMatch);
      });
    });
  }
};