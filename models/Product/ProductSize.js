const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSizeSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: [true]
  }
})

module.exports = mongoose.model('ProductSize', productSizeSchema)