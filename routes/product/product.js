const productController = require('../../controllers/productController')
const { catchErrors } = require('../../handlers/errorHandlers')
const express = require ('express')
const router = express.Router()


// router.get('/all', catchErrors(productController.getProduct))
// router.get('/daily-deals', catchErrors(productController.getProduct))
// router.get('/top-selling', catchErrors(productController.getProduct))
// router.get('/warm-bath', catchErrors(productController.getProduct))
router.get('/:id', catchErrors(productController.getOneProduct))


module.exports = router