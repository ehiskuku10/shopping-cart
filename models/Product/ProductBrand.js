const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productBrandSchema = new Schema ({
  label: {
    type: String,
    default: "Must specify a brand"
  }
})

module.exports = mongoose.model('ProductBrand', productBrandSchema)