const express=require('express')
const { postUser, getUsers, getUser } = require('../controllers/userController')
const { signup,login, verifyEmail, logout } = require('../controllers/authController')
const router=express.Router()

router.route('/users').post(postUser).get(getUsers)
router.route('/users/:userID').get(getUser)
router.route('/users/signup').post(signup)
router.route('/users/login').post(login)
router.route('/users/forget-password').post(login)
router.route('/verify-email').post(verifyEmail)
router.route('/users/logout/:userID').get(logout)
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the User API!'
  });
});
module.exports=router
