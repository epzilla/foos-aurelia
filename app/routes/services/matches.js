/*jshint globalstrict: true*/
'use strict';

var Match = require('../../models/match');
var TeamService = require('./teams');
var PlayerService = require('./players');
var moment = require('moment');

var MatchService = {};

MatchService.init = function (sock) {
  MatchService.io = sock;
  
  MatchService.io.on('connection', function (socket) {
    var clientIp = socket.request.connection.remoteAddress;
    var clientPort = socket.request.connection.remotePort;

    console.info('Socket connected : ' + clientIp + ':' + clientPort);

    socket.on('scoreChange', function (data) {
      MatchService.changeScore(socket, data);
    });

    socket.on('disconnect', function () {
      console.info('Socket disconnected : ' + clientIp + ':' + clientPort);
    });
  });
};

MatchService.create = function (req, res) {
  var now = moment();
  
  TeamService.getOrCreate(req.body.team1, function (err, team1) {
    if (err) {
      res.status(400).send(err);
    }

    TeamService.getOrCreate(req.body.team2, function (err, team2) {
      if (err) {
        res.status(400).send(err);
      }

      var match = new Match({
        team1: team1._id,
        team2: team2._id,
        winner: null,
        scores: [{ team1: 0, team2: 0}],
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
          .populate('team1 team2')
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
    });
  });
};


MatchService.findAll = function (req, res) {
  Match.find()
    .populate('team1 team2')
    .exec(function (err, matches) {
      if (err) {
        res.send(err);
      }
      res.json(matches);
    });
};

MatchService.find = function (req, res) {
  Match.findById(req.params.matchId)
    .populate('team1 team2')
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
    .populate('team1 team2')
    .exec(function (err, match) {
      if (err) {
        res.send(err);
      }
      res.json(match);
    });
};

MatchService.endMatch = function (sock, match) {
  var newScore = match.score || {team1: 0, team2: 0};
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
        MatchService.io.emit('matchUpdate', {
          status: 'finished',
          updatedMatch: updatedMatch
        });
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
    var gameOver = false;

    // Increment or decrement the specified team's score
    if (data.plusMinus === 'plus') {
      match.scores[match.gameNum - 1][team]++;
    } else {
      match.scores[match.gameNum - 1][team]--;
    }

    // If it's the last game, end it; otherwise, move to the next game
    if (match.scores[match.gameNum - 1][team] === 10) {
      gameOver = true;
      if (match.gameNum === 3) {
        var statPack = {
          team1: {
            id: match.team1,
            gameWins: 0,
            pts: 0,
            isWinner: false
          },
          team2: {
            id: match.team1,
            gameWins: 0,
            pts: 0,
            isWinner: false
          }
        };

        match.active = false;
        match.endTime = moment();
        
        // Loop through each game in the match and collect stats
        match.scores.forEach(function (score) {
          if (score.team1 > score.team2) {
            statPack.team1.gameWins++;
          } else {
            statPack.team2.gameWins++;
          }

          statPack.team1.pts += score.team1;
          statPack.team2.pts += score.team2;
        });
        
        // Determine the winner
        if (statPack.team1.gameWins > statPack.team2.gameWins) {
          match.winner = match.team1;
          statPack.team1.isWinner = true;
        } else {
          match.winner = match.team2;
          statPack.team2.isWinner = true;
        }
      } else {
        match.gameNum++;
        match.gameStartTime = moment();
        match.scores.push({
          team1: 0,
          team2: 0
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
        // Match is over
        TeamService.updateTeamStats(updatedMatch, statPack, function (err, teams, winnerID) {
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

          PlayerService.updatePlayerStats(updatedMatch, teams, statPack, function (err) {
            if (err) {
              sock.emit('matchError', {
                status: 'matchUpdateFailed',
                rollback: {
                  team: team,
                  score: rollbackScore
                },
                err: err
              });
            } else {
              var w = teams[0]._id.equals(winnerID) ? teams[0] : teams[1];
              MatchService.io.emit('matchUpdate', {
                status: 'finished',
                winner: w,
                updatedMatch: updatedMatch
              });
            }
          });
        });

      } else {
        // Match continues
        MatchService.io.emit('matchUpdate', {
          status: 'ok',
          updatedMatch: updatedMatch,
          whatChanged: {
            team: team[0],
            plusMinus: data.plusMinus,
            gameOver: gameOver
          }
        });
      }
    });
  });
};

module.exports = MatchService;
