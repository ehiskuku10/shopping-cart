const mongoose = require('mongoose')
const Schema = mongoose.Schema

const privilegeSchema = Schema({
    label: {
        type: String,
        required: "Must provide a label"
    }
})

module.exports = mongoose.model('Privilege', privilegeSchema)