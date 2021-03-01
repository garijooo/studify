const express = require('express');
const router = express.Router();

const { createCourse, fetchCourses, fetchCoursesById, fetchCourseById, changeCheck, deleteCourse } = require('../controllers/courseControllers');

router.route('/create').post(createCourse);
router.route('/delete/:id').delete(deleteCourse);
router.route('/fetch/courses/:id').get(fetchCoursesById);
router.route('/fetch/courses').get(fetchCourses);
router.route('/fetch/course/:id').get(fetchCourseById);
router.route('/changed').get(changeCheck);
module.exports = router;