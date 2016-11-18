const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flavorSchema = new Schema({
  title:  String
});

const Flavor = mongoose.model('Flavor', flavorSchema);

module.exports = Flavor;
