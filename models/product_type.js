const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
  title:  String
});

module.exports = mongoose.model('ProductType', productTypeSchema);
