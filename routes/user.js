const express = require('express')
const router = express.Router()
const regloginValidate = require('../handlers/validator/inputValidator')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.get('/register', userController.getRegistrationForm)
router.post('/register', regloginValidate, userController.registerNewUser)
router.get('/login', userController.loginForm)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


module.exports = router