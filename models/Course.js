const mongoose = require('mongoose');
const { BlockSchema } = require('./Block');

const CourseSchema = new mongoose.Schema({
    heading: {
        type: String, 
        required: [true, "Please provide a heading of the Course"]
    },
    description: {
        type: String,
        required: [true, "Please provide Course's decription"]
    },
    creatorsId: {
        type: String,
        required: [true, "No creators ID was sent"]
    },
    creatorsFullName: {
        type: String,
        required: [true, "No creators Name was sent"]
    },
    tests: [{ 
        testId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Test'}, 
        testTitle: String,
        enable: Boolean 
    }],
    blocks: [BlockSchema]
});

const Course =  mongoose.model('Course', CourseSchema);

exports.Course = Course;
exports.CourseSchema = CourseSchema;
