var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PlayerSchema = new Schema({
  name: String,
  matches: Number,
  games: Number,
  matchesWon: Number,
  matchesLost: Number,
  gamesWon: Number,
  gamesLost: Number,
  pct: Number,
  ptsFor: Number,
  ptsAgainst: Number,
  avgPtsFor: Number,
  avgPtsAgainst: Number
});

module.exports = mongoose.model('Player', PlayerSchema);