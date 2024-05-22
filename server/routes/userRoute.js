const express=require('express')
const { postUser, getUsers, getUser } = require('../controllers/userController')
const { signup,login, verifyEmail } = require('../controllers/authController')
const router=express.Router()

router.route('/users').post(postUser).get(getUsers)
router.route('/users/:userID').get(getUser)
router.route('/users/signup').post(signup)
router.route('/users/login').post(login)
router.route('/users/forget-password').post(login)
router.route('/verify-email').post(verifyEmail)
module.exports=router