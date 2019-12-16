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
    name: String,
    size: String,
    imgURL: String,
    price: Number,
    qty: {
      type: Number,
      default: 1
    },
    subtotal: {
      type: Number
    }
  }],
  total_cost: {
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Cart', cartSchema);