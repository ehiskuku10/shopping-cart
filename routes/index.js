const express = require ('express')
const router = express.Router()

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', (req, res) => {
  res.render('index', {
    title: 'New Shopping Cart'
  })
})



module.exports = router;