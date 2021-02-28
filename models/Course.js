const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    heading: {
        type: String, 
        required: [true, "Please provide a heading of the Course"]
    },
    description: {
        type: String,
        required: [true, "Please provide Course's decription"]
    },
    teachersId: {
        type: String,
        required: [true, "No teachers ID was sent"]
    },
    blocks: [
        {
            type: String,
            title: String,
            text: String,
            url: String
        }
    ]
});

const Course =  mongoose.model('Course', CourseSchema);

exports.Course = Course;
exports.CourseSchema = CourseSchema;
