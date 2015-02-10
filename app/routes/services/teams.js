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

/*
 * This function would be used to update stats from a match if
 * we were calling it as a separate route, not calling it from
 * the "matches" module, where we've already done some of the
 * calculations
 */
var updateStatsFromMatch = function (match, teams, cb) {
  var team1, team2;
  var team1wins = 0;
  var team2wins = 0;
  var team1pts = 0;
  var team2pts = 0;
  
  teams.forEach(function (team) {
    team.games++;
    team.matches++;
  });

  console.log('teams[0]._id: ' + teams[0]._id);
  console.log('teams[1]._id: ' + teams[1]._id);
  console.log('match.team1' + match.team1);
  console.log('match.team2' + match.team2);

  if (teams[0]._id.equals(match.team1)) {
    team1 = teams[0];
    team2 = teams[1];
  } else {
    team1 = teams[1];
    team2 = teams[0];
  }
  
  match.scores.forEach(function (score) {
    if (score.team1 > score.team2) {
      team1wins++;
    } else {
      team2wins++;
    }

    team1pts += score.team1;
    team2pts += score.team2;
  });
  
  if (team1wins > team2wins) {
    match.winner = match.team1;
    team1.matchesWon++;
    team2.matchesLost++;
  } else {
    match.winner = match.team2;
    team2.matchesWon++;
    team1.matchesLost++;
  }
  
  team1.gamesWon += team1wins;
  team2.gamesWon += team2wins;
  team1.gamesLost += team2wins;
  team2.gamesLost += team1wins;
  team1.ptsFor += team1pts;
  team2.ptsFor += team2pts;
  team1.ptsAgainst += team2pts;
  team2.ptsAgainst += team1pts;

  team1.pct = parseFloat((team1.matchesWon / team1.matches).toFixed(3));
  team2.pct = parseFloat((team2.matchesWon / team2.matches).toFixed(3));

  team1.save(function (err) {
    if (err) {
      cb(err, null);
    }
    team2.save(function (err) {
      if (err) {
        cb(err, null);
      } else {
        cb();
      }
    });
  });
};

/*
 * This function is the one currently in use, being called from the
 * "matches" module, when a match ends, and after some of the stat
 * calculations have already been done. We simply pass those stats in,
 * so we don't need to do them twice.
 */
var updateUsingStatPack = function (match, teams, statPack, cb) {
  var team1, team2;
  
  teams.forEach(function (team) {
    team.games++;
    team.matches++;
  });

  console.log('teams[0]._id: ' + teams[0]._id);
  console.log('teams[1]._id: ' + teams[1]._id);
  console.log('match.team1' + match.team1);
  console.log('match.team2' + match.team2);

  if (teams[0]._id.equals(statPack.team1.id)) {
    team1 = teams[0];
    team2 = teams[1];
  } else {
    team1 = teams[1];
    team2 = teams[0];
  }
  
  if (statPack.team1.isWinner) {
    team1.matchesWon++;
    team2.matchesLost++;
  } else {
    team2.matchesWon++;
    team1.matchesLost++;
  }
  
  team1.gamesWon += statPack.team1.gameWins;
  team2.gamesWon += statPack.team2.gameWins;
  team1.gamesLost += statPack.team2.gameWins;
  team2.gamesLost += statPack.team1.gameWins;
  team1.ptsFor += statPack.team1.pts;
  team2.ptsFor += statPack.team2.pts;
  team1.ptsAgainst += statPack.team2.pts;
  team2.ptsAgainst += statPack.team1.pts;

  team1.pct = parseFloat((team1.matchesWon / team1.matches).toFixed(3));
  team2.pct = parseFloat((team2.matchesWon / team2.matches).toFixed(3));

  team1.save(function (err, updatedTeam1) {
    if (err) {
      cb(err, null);
    }
    team2.save(function (err, updatedTeam2) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, [updatedTeam1, updatedTeam2]);
      }
    });
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

  updateTeamStats: function (match, statPack, cb) {
    var args = arguments;
    Team.find({ _id: { $in: [match.team1, match.team2] } }, function (err, teams) {
      if (err) {
        cb(err);
      } else if (args.length === 2) {
        updateStatsFromMatch(match, teams, cb);
      } else {
        updateUsingStatPack(match, teams, statPack, cb);
      }
    });
  }
};