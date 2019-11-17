const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productPriceSchema = new Schema({
    product_discount: {
        type: Number
    },
    current_price: {
        type: Number,
        required: [true, 'current  price is required'],
        default: 0
    },
    old_price: {
      type: Number,
      default: 0
    }
})


module.exports = mongoose.model('ProductPrice', productPriceSchema)