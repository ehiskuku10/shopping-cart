const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSizeSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory"
  }
})

module.exports = mongoose.model('ProductSize', productSizeSchema)