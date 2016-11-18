const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const machineSchema = new Schema({
  title: String,
  sku: String,
  product_type: { type: Schema.Types.ObjectId, ref: 'ProductType' }
  model: String,
  water_line_compatible: Boolean
});

const Machine = mongoose.model('Machine', machineSchema);

module.exports = Machine;
