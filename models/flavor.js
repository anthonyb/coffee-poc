const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flavorSchema = new Schema({
  title:  String
});

module.exports = mongoose.model('Flavor', flavorSchema);
