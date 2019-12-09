const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const cartSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: "You must supply a buyer ID"
  },
  user_cart: [{
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: 'You must supply a product ID'
    },
    name: {
      type: String,
      required: "Item name is required",
    },
    size: {
      type: String
    },
    qty: {
      type: Number,
      required: "You must specify a quantity"
    },
    subtotal: {
      type: Number,
      required: "You supply a subtotal"
    }
  }]
});

module.exports = mongoose.model('Cart', cartSchema);