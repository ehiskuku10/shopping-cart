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
      ref: 'Product'
    },
    name: String,
    size: String,
    price: Number,
    qty: {
      type: Number,
      required: "You must specify a quantity",
      default: 0
    },
    subtotal: {
      type: Number,
      required: "You supply a subtotal",
      default: 0
    }
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Cart', cartSchema);