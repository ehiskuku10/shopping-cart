// Import dotenv package and make environment 
// variables available to the start.js file
require('dotenv').config({
    path: 'variables.env'
})

// import mongoose connection file to 
// make mongodb server available to start.js
require('./db/connection')

// import all of our models
require('./models/User')
require('./models/Product/Product')
require('./models/Product/ProductSize')

// start the application
const app = require('./app')
app.set('port', process.env.PORT || 7777)
const server = app.listen(app.get('port'), () => {
    console.log(`Express running -> PORT ${server.address().port}`)
})

