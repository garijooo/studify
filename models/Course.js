const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    heading: {
        type: String, 
        required: [true, "Please provide a heading of the Course"]
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
module.exports.CourseSchema;
module.exports.Course;