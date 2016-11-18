const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
  title:  String
});

const ProductType = mongoose.model('ProductType', productTypeSchema);

module.exports = ProductType;
