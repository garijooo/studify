const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    type: String,
    text: String,
    answer: String,
    variants: [String],
    answers: [String],
    dataRef: Number
});
const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please pass title of test"]
    },
    questions: [QuestionSchema]
});

const Test =  mongoose.model('Test', TestSchema);

exports.Test = Test;
exports.TestSchema = TestSchema;
