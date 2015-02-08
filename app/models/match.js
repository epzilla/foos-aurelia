var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  team1: { type: Schema.Types.ObjectId, ref: 'Team'},
  team2: { type: Schema.Types.ObjectId, ref: 'Team'},
  scores: [{
    team1: Number,
    team2: Number
  }],
  startTime: Date,
  gameStartTime: Date,
  gameNum: Number,
  active: Boolean
});

module.exports = mongoose.model('Match', MatchSchema);