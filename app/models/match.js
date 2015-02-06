var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  heads: [{ type: Schema.Types.ObjectId, ref: 'Player'}],
  tails: [{ type: Schema.Types.ObjectId, ref: 'Player'}],
  scores: [{
    heads: Number,
    tails: Number
  }],
  startTime: Date,
  gameStartTime: Date,
  gameNum: Number,
  active: Boolean
});

module.exports = mongoose.model('Match', MatchSchema);