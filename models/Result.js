const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    testId: String,
    answer: [{
        variant: String,
        correct: Boolean 
    }]
});

const Result =  mongoose.model('Result', ResultSchema);

exports.Result = Result;
exports.ResultSchema = ResultSchema;
