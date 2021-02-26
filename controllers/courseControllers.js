
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
    const { _id } = req.params.id;
    try{
        const courses = await Course.findById(_id);
        if(courses === []) return res.status(204).json({ success: true });
        
        res.status(200).json({
            success: true, 
            courses
        });
    } catch(e) {
        next(e);
    }
}

exports.fetchCourses = async (req, res, next) => {
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
exports.fetchCoursesById = async (req, res, next) => {
    try {
        const courses = await Course.find({ teachersId: req.params.id });
        if(courses === []) return res.status(204).json({ success: true, courses });

        res.status(200).json({
            success: true, 
            courses
        });
    } catch(e) {    
        next(e);
    }
}


