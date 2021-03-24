const mongoose = require('mongoose');
const { QuestionSchema } = require('./Question');

const TestSchema = new mongoose.Schema({
    questions: [QuestionSchema]
});

const Test =  mongoose.model('Test', TestSchema);

exports.Test = Test;
exports.TestSchema = TestSchema;
