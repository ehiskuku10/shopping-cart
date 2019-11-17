const authController = require('../controllers/authController')
const adminController = require('../controllers/adminController')
const { catchErrors } = require('../handlers/errorHandlers')
const express = require ('express')
const router = express.Router()


router.get('/add', 
  authController.isLoggedIn, 
  catchErrors(authController.isAdmin), 
  catchErrors(adminController.addProduct)
)

router.post('/add', 
  authController.isLoggedIn, 
  catchErrors(authController.isAdmin), 
  adminController.upload, 
  catchErrors(adminController.resize),
  catchErrors(adminController.createProduct)
)

router.get('/dashboard', authController.isLoggedIn, authController.isAdmin, adminController.getDashboard)


module.exports = router