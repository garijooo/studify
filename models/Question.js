const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    type: String,
    text: String,
    variants: [String],
    answer: String
});


const Question =  mongoose.model('Question', CourseSchema);
exports.Question = Question;
exports.QuestionSchema = QuestionSchema;