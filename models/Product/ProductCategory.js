const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productCategorySchema = new Schema({
    category_title: {
        type: String,
        required: [true, 'category title is required']
    },
    category_description: {
        type: String,
        required: [true, 'description is required']
    }
})


module.exports = mongoose.model('ProductCategory', productCategorySchema)