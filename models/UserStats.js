const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userStatsSchema = new Schema({
  words_written_today: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('UserStats', userStatsSchema);
