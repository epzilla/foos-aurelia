/*jshint globalstrict: true*/
'use strict';

var Player = require('../../models/player');
var _ = require('lodash');

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
    Player.find().sort({'name': 'asc'}).exec(function (err, players) {
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

  updatePlayerStats: function (match, teams, statPack, cb) {
    var team1, team2;

    // Create one master list of players from the two teams
    var playerIdList = teams[0].players.slice();
    var teams0StringIDList = [];
    
    playerIdList.forEach(function (objId) {
      teams0StringIDList.push(objId.toString());
    });
    
    playerIdList.push.apply(playerIdList, teams[1].players);

    //Match up the teams
    if (teams[0]._id.equals(match.team1)) {
      team1 = teams[0];
      team2 = teams[1];
    } else {
      team1 = teams[1];
      team2 = teams[0];
    }
    
    Player.find({ _id: { $in: playerIdList } }, function (err, players) {
      if (err) {
        cb (err, null);
        return;
      }
      
      players.forEach(function(player) {
        var plTeam;
        var oppTeam;
        player.matches++;
        player.games += match.scores.length;

        if (_.contains(teams0StringIDList, player._id.toString())) {
          // This player was on team 1
          plTeam = statPack.team1;
          oppTeam = statPack.team2;
        } else {
          plTeam = statPack.team2;
          oppTeam = statPack.team1;
        }

        player.gamesWon += plTeam.gameWins;
        player.gamesLost += oppTeam.gameWins;
        player.ptsFor += plTeam.pts;
        player.ptsAgainst += oppTeam.pts;
        
        if (plTeam.isWinner) {
          player.matchesWon++;
        } else {
          player.matchesLost++;
        }

        player.pct = parseFloat((player.matchesWon / player.matches).toFixed(3));
        player.avgPtsFor = parseFloat((player.ptsFor / player.games).toFixed(2));
        player.avgPtsAgainst = parseFloat((player.ptsAgainst / player.games).toFixed(2));
      });

      // Hack for now, because mongoose doesn't support batch updates
      // We know there are 4 players, so we're just going to
      // hard-code a pyramid of doom
      if (players.length === 4) {
        players[0].save(function (err) {
          if (err) {
            cb(err, null);
          }
          players[1].save(function (err) {
            if (err) {
              cb(err, null);
            }
            players[2].save(function (err) {
              if (err) {
                cb(err, null);
              }
              players[3].save(function (err) {
                if (err) {
                  cb(err, null);
                }
                cb();
              });
            });
          });
        });
      }

    });
  },

  resetAll: function (req, res) {
    Player.find(function (err, players) {
      if (err) {
        res.send(err);
      }
      var numPlayers = players.length;
      var plNum = 0;
      players.forEach(function (pl) {
        pl.avgPtsFor = 0.0;
        pl.avgPtsAgainst = 0.0;
        pl.games = 0;
        pl.gamesLost = 0;
        pl.gamesWon = 0;
        pl.matches = 0;
        pl.matchesLost = 0;
        pl.matchesWon = 0;
        pl.pct = 0.000;
        pl.ptsFor = 0;
        pl.ptsAgainst = 0;

        pl.save(function (err) {
          if (err) {
            res.status(500).send();
          }
          plNum++;
          if (plNum === numPlayers) {
            res.status(200).send();
          }
        });
      });
    });
  }
};