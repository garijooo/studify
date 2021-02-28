
const { Course } = require('../models/Course');
const HandyStorage = require('handy-storage');
const storage = new HandyStorage('./config/state.json');

exports.createCourse = async (req, res, next) => {
    const { heading, teachersId } = req.body;
    try {
        const course = await Course.create({
            heading, teachersId
        });
        try {
            storage.setState({"collectionChangeDate": new Date()});
            res.status(201).json({
                success: true, 
                course,
                collectionChangeDate: storage.state.collectionChangeDate
            });
        } catch (err) {
            next(err);
        }
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
exports.changeCheck = (req, res, next) => {
    try {
        if(storage.state.collectionChangeDate === null) {
            storage.setState({"collectionChangeDate": new Date()}).then(() => {
                res.status(200).json({
                    success: true, 
                    collectionChangeDate: storage.state.collectionChangeDate
                });
            }).catch(e => {
                next(e);
            });
        }
        res.status(200).json({
            success: true, 
            collectionChangeDate: storage.state.collectionChangeDate
        });
    } catch(err) {
        next(err);
    }
}


