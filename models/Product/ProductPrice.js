const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productPriceSchema = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    product_discount: {
        type: Number
    },
    product_price: {
        type: Number,
        required: [true, 'price is required']
    }
})


module.exports = mongoose.model('ProductPrice', productPriceSchema)