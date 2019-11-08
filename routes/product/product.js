const authController = require('../controllers/authController')



router.get('/create',authController.isLoggedIn, middleware.adminIsLoggedIn, controller.getCreateProduct)

router.post('/create',middleware.adminIsLoggedIn, productImage, controller.createProduct)

router.get('/view', controller.getViewProduct)

router.get('/view/:category_id', controller.getViewSingleProduct)

router.get('/admin-view',middleware.isLoggedIn, middleware.adminIsLoggedIn, controller.getAdminViewProduct)

router.get('/admin-view/:category_id', middleware.isLoggedIn, middleware.adminIsLoggedIn, controller.getAdminViewSingleProduct)

router.put('/:product_id/update',middleware.isLoggedIn, middleware.adminIsLoggedIn, productImage, controller.updateProduct)

//add inventories
router.post('/inventory/create',middleware.adminIsLoggedIn, Validation.inventoryValidation, controller.createProductInventories)

router.get('/delete/:product_id/:product_title',middleware.isLoggedIn, middleware.adminIsLoggedIn, controller.deleteProduct)


module.exports = router