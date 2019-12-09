const express = require('express')
const cartController = require('../controllers/cartController')
const router = express.Router()


router.post('/view-cart-n-checkout', cartController.viewCartnCheckout);
router.post('/view-checkout', cartController.viewCheckout);

module.exports = router