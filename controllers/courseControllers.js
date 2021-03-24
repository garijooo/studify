
const { Course } = require('../models/Course');
const HandyStorage = require('handy-storage');
const storage = new HandyStorage('./config/state.json');
const User = require('../models/User');

exports.createCourse = async (req, res, next) => {
    const { heading, description, creatorsId, creatorsFullName } = req.body;
    try {
        const course = await Course.create({
            heading, creatorsId, description, creatorsFullName
        });
        try {
            storage.setState({"collectionChangeDate": new Date()});
            res.status(201).json({
                success: true, 
                course
            });
        } catch(e){
            next(e);
        }
    } catch(e){
        next(e);
    }
}
exports.deleteCourse = async (req, res, next) => {
    const _id  = req.params.id;
    try {   
        await Course.deleteOne({ _id });
        try {
            storage.setState({"collectionChangeDate": new Date()});
            res.status(200).json({
                success: true
            });
        } catch(e) {
            next(e);
        } 
    } catch (e) {
        next(e);
    }
}
exports.updateCourse = async (req, res, next) => {
    const { id } = req.params;
    const { blocks } = req.body;
    try {
        const course = await Course.findById(id);
        course.blocks = [ ...blocks ];
        course.save();
        try {
            storage.setState({"collectionChangeDate": new Date()});
            res.status(200).json({
                success: true,
                course
            });
        } catch (err) {
            next(err);
        }
    } catch(e) {
        next(e);    
    }
}
exports.fetchCourse = async (req, res, next) => {
    const { id } = req.params;
    try{
        const course = await Course.findById(id);
        res.status(200).json({
            success: true, 
            course
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
exports.fetchCoursesByCreator = async (req, res, next) => {
    try {
        const courses = await Course.find({ creatorsId: req.params.id });
        if(courses === []) return res.status(204).json({ success: true, courses });

        res.status(200).json({
            success: true, 
            courses
        });
    } catch(e) {    
        next(e);
    }
}
exports.fetchCoursesByLearner = async (req, res, next) => {
    try {
        const { id } = req.params;
        //User.learner.courses
        //const courses = await Course.find({ learners: req.params.id });
        //if(courses === []) return res.status(204).json({ success: true, courses });

        //res.status(200).json({
        //    success: true, 
        //    courses
        //});
        const user = await User.findById(id).populate('learner.courses');
        res.status(200).json({
            success: true,
            courses: user.learner.courses
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


