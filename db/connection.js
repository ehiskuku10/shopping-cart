//import mongoose (mongodb driver)
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.Promise = global.Promise
mongoose.connection.on('error', (err) => {
    console.log(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`)
})

module.exports = mongoose