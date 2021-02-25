const express = require('express');
const router = express.Router();

const { createCourse, fetchAllCourses, fetchCourseById } = require('../controllers/courseControllers');

router.route('/create').post(createCourse);
router.route('/fetch/all').get(fetchAllCourses);
router.route('/fetch/:id').get(fetchCourseById)

module.exports = router;