const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podSchema = new Schema({
  title: String,
  sku: String,
  product_type: { type: Schema.Types.ObjectId, ref: 'ProductType' },
  flavor: { type: Schema.Types.ObjectId, ref: 'Flavor' },
  size: Number
});

const Pod = mongoose.model('Pod', podSchema);

module.exports = Pod;
