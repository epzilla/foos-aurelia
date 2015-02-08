/*jshint globalstrict: true*/
'use strict';

var Team = require('../../models/team');
var Player = require('../../models/player');

var createNewTeam = function (playerIDs, cb) {
  var title = '';

  Player.find({ '_id': { $in: playerIDs}}, function (err, players) {
    if (err) {
      cb(err, null);
    }

    var nameArray = players[0].name.split(' ');
    title += nameArray[nameArray.length - 1];
    
    for (var i = 1; i < players.length; i++) {
      nameArray = players[i].name.split(' ');
      title += (' / ' + nameArray[nameArray.length - 1]);
    }

    var team = new Team({
      players: playerIDs,
      title: title,
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

    cb(null, team);
  });
};

module.exports = {

  create: function (req, res) {
    var team = createNewTeam(req.body.players);

    team.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Team created!' });
    });
  },

  findAll: function (req, res) {
    Team.find(function (err, teams) {
      if (err) {
        res.send(err);
      }
      res.json(teams);
    });
  },

  find: function (req, res) {
    Team.findById(req.params.teamId, function (err, team) {
      if (err) {
        res.send(err);
      }
      res.json(team);
    });
  },

  update: function (req, res) {
    Team.findById(req.params.teamId, function (err, team) {
      if (err) {
        res.send(err);
      }

      var newVals = req.body;
      for (var prop in newVals) {
        if (newVals.hasOwnProperty(prop)) {
          if (team[prop] !== undefined) {
            team[prop] = newVals[prop];
          }
        }
      }

      team.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Team updated!' });
      });
    });
  },

  getOrCreate: function (info, cb) {
    Team.find({ players: { $all: info}})
      .populate('players')
      .exec(function (err, team) {
        if (err){
          cb(err, null);
        }
        
        if (team && team.length > 0) {
          // Found a team
          cb(null, team[0]);
        } else {
          // Need to create a team
          createNewTeam(info, function (err, newTeam) {
            newTeam.save(function (err, createdTeam) {
              if (err) {
                cb(err, null);
              }
              
              Team.findById(createdTeam._id)
                .populate('players')
                .exec(function (err, finalTeam) {
                  if (err) {
                    cb (err, null);
                  }
                  cb (null, finalTeam);
                });
            });
          });
        }
    });
  },

  updateTeamStats: function (match, cb) {
    cb();
  }
};