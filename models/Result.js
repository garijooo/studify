const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    index: Number,
    status: Boolean
});

const ResultSchema = new mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    lastExamination: String,
    answers: [AnswerSchema]
});

const Result =  mongoose.model('Result', ResultSchema);

exports.Result = Result;
exports.ResultSchema = ResultSchema;
