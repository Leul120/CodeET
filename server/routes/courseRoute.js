const express = require('express');
const { getAllCourses, PostCourses, getCourse, updateCourse, deleteCourse, aliasTopCourses, getCourseStat,dashboard } = require('../controllers/courseController');
const {protect, restrictTo, checkEnrollment}=require('../controllers/authController');
const { getCheckoutSession, verifyPayment, pay, success } = require('../utils/payment');
// const attributes=/\b(_id|Title||lt)\b/g
// console.log(attributes)
const router = express.Router();
router.route('/Top-5-Courses').get(aliasTopCourses,getAllCourses)
router.route('/course-stat').get(getCourseStat)

router.route('/course').get(getAllCourses).post(PostCourses);
router.route('/:courseID').get(protect,getCourse).patch(updateCourse).delete(protect,restrictTo('admin'),deleteCourse);

router.route('/checkEnrollment/:courseID').get(checkEnrollment)
router.route('/dashboard/:userID').get(protect,dashboard)
router.route("/pay/:courseID/:userID").post(pay)
router.route("/verify-payment/:courseID/:userID/:id").get(verifyPayment)
router.route("/payment-success").get(success)
module.exports = router;