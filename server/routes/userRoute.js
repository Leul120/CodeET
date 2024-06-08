const express=require('express')
const { postUser, getUsers, getUser } = require('../controllers/userController')
const { signup,login, logout, forgetPassword, resetPassword, updateForgottenPassword, verifyEmail } = require('../controllers/authController')
const router=express.Router()

router.route('/users').post(postUser).get(getUsers)
router.route('/users/:userID').get(getUser)
router.route('/users/signup').post(signup)
router.route('/users/login').post(login)
router.route('/users/forget-password').post(login)
router.route('/users/logout/:userID').get(logout)
router.route('/users/forgetPassword').post(forgetPassword)
router.route('/users/resetPassword/:resetToken').get(resetPassword)
router.route('/users/updatePassword').post(updateForgottenPassword)
router.route('/users/verifyEmail/:emailToken').post(verifyEmail)
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the User API!'
  });
});
module.exports=router
