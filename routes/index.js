const express = require ('express')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')
const router = express.Router()

const { catchErrors } = require('../handlers/errorHandlers')

router.get('/', 
  catchErrors(productController.showCase)
)

module.exports = router;