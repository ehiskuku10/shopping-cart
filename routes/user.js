const express = require('express')
const router = express.Router()
const regloginValidate = require('../handlers/validator/inputValidator')
const userController = require('../controllers/userController')

router.get('/register', userController.getRegistrationForm)
router.post('/register', regloginValidate, userController.registerNewUser)
router.get('/login', userController.loginForm)

module.exports = router