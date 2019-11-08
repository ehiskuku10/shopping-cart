const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productInventorySchema = new Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    new_stock_added: {
        type: Number
    },
    date: {
        type: String,
    }
})


module.exports = mongoose.model( 'ProductInventory', productInventorySchema)