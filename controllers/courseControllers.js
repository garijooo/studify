
const { Course } = require('../models/Course');

exports.createCourse = async (req, res, next) => {
    const { heading, teachersId } = req.body;
    try {
        const course = await Course.create({
            heading, teachersId
        });
        res.status(201).json({
            success: true, 
            course
        });
    } catch(e){
        next(e);
    }
}

exports.fetchCourseById = async (req, res, next) => {
    const { teachersId } = req.body;
    try{
        const courses = await Course.find({ teachersId });
        if(courses === []) return res.status(204).json({ success: true });
        
        res.status(200).json({
            success: true, 
            courses
        });
    } catch(e) {
        next(e);
    }
}

exports.fetchAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({});
        if(courses === []) return res.status(204).json({ success: true, courses });

        res.status(200).json({
            success: true, 
            courses
        });
    } catch(e) {    
        next(e);
    }
}