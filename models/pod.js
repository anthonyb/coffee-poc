const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podSchema = new Schema({
  title: String,
  sku: String,
  product_type: { type: Schema.Types.ObjectId, ref: 'ProductType' },
  flavor: { type: Schema.Types.ObjectId, ref: 'Flavor' },
  pack_size: { type: Schema.Types.ObjectId, ref: 'PackSize' },
  size: Number //caching this size here
});

module.exports = mongoose.model('Pod', podSchema);
