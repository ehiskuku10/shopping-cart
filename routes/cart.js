const express = require('express')
const cartController = require('../controllers/cartController')
const authController = require('../controllers/authController')
const router = express.Router()


router.post('/view-cart-n-checkout', cartController.viewCartnCheckout);
router.post('/calculate-subtotal', authController.isLoggedIn, cartController.calcSubTotal);

module.exports = router