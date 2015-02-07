/*jshint globalstrict: true*/
'use strict';

var Match = require('../../models/match');
var moment = require('moment');

var MatchService = {};

MatchService.init = function (sock) {
  MatchService.io = sock;
  MatchService.io.on('connection', function (socket) {
    console.log('connected to matchService');
    socket.on('scoreChange', function (data) {
      MatchService.changeScore(socket, data);
    });

    socket.on('asdf', function (data) {
      console.log(data);
    });

  });
};

MatchService.create = function (req, res) {
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

    Match.findById(newMatch._id)
      .populate('heads tails')
      .exec(function (err, match) {
        if (err) {
          res.send(err);
        }
        MatchService.io.emit('matchUpdate', {
          status: 'new',
          updatedMatch: match
        });
        res.json(match);
    });
  });
};


MatchService.findAll = function (req, res) {
  Match.find()
    .populate('heads tails')
    .exec(function (err, matches) {
      if (err) {
        res.send(err);
      }
      res.json(matches);
    });
};

MatchService.find = function (req, res) {
  Match.findById(req.params.matchId)
    .populate('heads tails')
    .exec(function (err, match) {
      if (err) {
        res.send(err);
      }
      res.json(match);
    });
};

MatchService.update = function (req, res) {
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
};

MatchService.getCurrentMatch = function (req, res) {
  Match.find({ active: true})
    .populate('heads tails')
    .exec(function (err, match) {
      if (err) {
        res.send(err);
      }
      res.json(match);
    });
};

MatchService.endMatch = function (sock, match) {
  var newScore = match.score || {heads: 0, tails: 0};
  var gameNum = match.gameNum || 3;
  var matchOver = gameNum === 3;

  Match.findById(match._id, function (err, match) {
    if (err) {
      sock.emit('matchError', {
        status: 'matchNotFound',
        err: err
      });
    }

    match.scores.push(newScore);
    match.gameNum = gameNum;

    if (matchOver) {
      match.active = false;
    }

    match.save(function (err, updatedMatch) {
      if (err) {
        sock.emit('matchError', {
          status: 'matchUpdateFailed',
          rollback: match,
          err: err
        });
      }

      if (matchOver) {
        MatchService.io.emit('matchUpdate', {status: 'finished'});
      } else {
        MatchService.io.emit('matchUpdate', {
          status: 'ok',
          updatedMatch: updatedMatch
        });
      }
    });
  });
};

MatchService.changeScore = function (sock, data) {

  Match.findById(data.id, function (err, match) {
    if (err) {
      sock.emit('matchError', {
        status: 'matchNotFound',
        err: err
      });
    }

    var team = [data.team];
    var rollbackScore = match.scores[match.gameNum - 1][team];

    // Increment or decrement the specified team's score
    if (data.plusMinus === 'plus') {
      match.scores[match.gameNum - 1][team]++;
    } else {
      match.scores[match.gameNum - 1][team]--;
    }

    // If it's the last game, end it; otherwise, move to the next game
    if (match.scores[match.gameNum - 1][team] === 10) {
      if (match.gameNum === 3) {
        match.active = false;
      } else {
        match.gameNum++;
        match.scores.push({
          heads: 0,
          tails: 0
        });
      }
    }

    match.save(function (err, updatedMatch) {
      // If there was an error, roll back the score
      if (err) {
        sock.emit('matchError', {
          status: 'matchUpdateFailed',
          rollback: {
            team: team,
            score: rollbackScore
          },
          err: err
        });
      }

      // Otherwise, broadcast the update
      if (!updatedMatch.active) {
        MatchService.io.emit('matchUpdate', {status: 'finished'});
      } else {
        MatchService.io.emit('matchUpdate', {
          status: 'ok',
          updatedMatch: updatedMatch
        });
      }
    });
  });
};

module.exports = MatchService;
