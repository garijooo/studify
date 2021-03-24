const mongoose = require('mongoose');
const { ResultSchema } = require('./Result');

const LearnerSchema = new mongoose.Schema({
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    results: [ResultSchema]
});

const Learner = mongoose.model('Learner', LearnerSchema);

exports.Learner = Learner;
exports.LearnerSchema = LearnerSchema;