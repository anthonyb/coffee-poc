const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packSizeSchema = new Schema({
  size:  Number // in dozens
});

module.exports = mongoose.model('PackSize', packSizeSchema);;
