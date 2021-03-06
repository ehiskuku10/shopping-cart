const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.Promise = global.Promise;


const productSchema = new Schema({
  short_description: {
    type: String,
    required: [true, 'short description is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  gender: {
    type: Boolean,
    required: [true, "Must specify a gender"]
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'You have to specify a brand']
  },
  colors:[{
    type: String
  }],
  product_price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductPrice"
  },
  product_size: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductSize"
  },
  forecast_no: {
    type: Number,
    unique: true
  },
  product_image: [{
    type: String,
    required: [true, 'image is required for this product']
  }],
  tags:[String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory"
  },
  product_in_stock_count: {
    type: Number,
    default: 0
  },
  items_sold : {
    type: Number,
    default: 0
  }
})

// productSchema.statics.getTopSelling = function() {
//   return this.aggregate([
//     { $group: { _id: '$category', itemSold: { $addToSet: '$items_sold' }, iDs: { $addToSet: '$_id' } } }
//   ]);
// };


module.exports = mongoose.model('Product', productSchema)