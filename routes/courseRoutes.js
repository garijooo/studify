const express = require('express');
const router = express.Router();

const { 
    createCourse, 
    fetchCourses, 
    fetchCoursesById, 
    fetchCourse, 
    changeCheck, 
    deleteCourse, 
    updateCourse 
} = require('../controllers/courseControllers');

router.route('/create').post(createCourse);
router.route('/delete/:id').delete(deleteCourse);
router.route('/update/course/:id').patch(updateCourse);
router.route('/fetch/courses/:id').get(fetchCoursesById);
router.route('/fetch/courses').get(fetchCourses);
router.route('/fetch/course/:id').get(fetchCourse);
router.route('/changed').get(changeCheck);

module.exports = router;