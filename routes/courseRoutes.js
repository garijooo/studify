const express = require('express');
const router = express.Router();

const { createCourse, fetchCourses, fetchCoursesById, fetchCourseById } = require('../controllers/courseControllers');

router.route('/create').post(createCourse);
router.route('/fetch/courses/:id').get(fetchCoursesById);
router.route('/fetch/courses').get(fetchCourses);
router.route('/fetch/course/:id').get(fetchCourseById);

module.exports = router;