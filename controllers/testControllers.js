const { Course } = require('../models/Course');
const { Test } = require('../models/Test');
const User = require('../models/User');

exports.createTest = async (req, res, next) => {
    const { title, courseId } = req.body;
    try {
        const test = await Test.create({
            title, questions: []
        });
        const course = await Course.findById(courseId);
        course.tests = [ ...course.tests, { testId: test._id, testTitle: title, enable: true } ];
        course.save();
        res.status(200).json({
            success: true,
            id: course._id
        });
    } catch(err) {
        next(err);
    }
}
exports.getTest = async (req, res, next) => {
    const { id } = req.params;
    try {
        const test = await Test.findById(id);
        res.status(200).json({
            success: true,
            test
        });
    } catch(err) {
        console.log(err);
    }
}

exports.addQuestion = async (req, res, next) => {
    const { question } = req.body;
    console.log(question);
    const { id } = req.params;
    try {
        const test = await Test.findById(id);
        console.log(test.questions);
        test.questions = [...test.questions, question];
        console.log(test.questions);
        test.save();
        res.status(200).json({
            success: true,
            test
        });
    } catch(err) {
        next(err);
    }
}

exports.submitTest = async (req, res, next) => {
    const { testId, lastExamination, answers } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        let list = [...user.learner.results]
        let status = false;
        list.map((result, index) => {
            if(result.testId == testId) {
                status = true;
                let answ = [...answers];
                list[index] = {testId, lastExamination, answers: answ};
            }
        });
        if(status) user.learner.results = [...list];
        else  user.learner.results = [...user.learner.results, {testId, lastExamination, answers}];
        const result = {
            testId, 
            lastExamination,
            answers 
        }
        user.save();
        res.status(200).json({
            success: true,
            result
        });
    } catch(err) {
        next(err);
    }
}

exports.getResult = async (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    const { testId } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        console.log(id)
        let gotResult = null;
        console.log(user.learner.results);
        user.learner.results.map((result, index) => {
            console.log(index);
            console.log(result.testId);
            console.log(testId);
            if(result.testId == testId) gotResult = result;
        });
        console.log(gotResult)
        res.status(200).json({
            success: true,
            gotResult
        })
    } catch (err) {
        next(err);
    }
}

exports.changeVisibility = async (req, res, next) => {
    const { id } = req.params;
    const { courseId } = req.body;
    try {
        const course = await Course.findById(courseId);
        let tests = [...course.tests];

        course.tests.map((test, index) => {
            if(test.testId == id) {
                tests[index].enable = !tests[index].enable;
                console.log(tests[index].enable);
            }
        });
        course.tests = [...tests];
        course.save();
        res.status(200).json({
            success: true
        });
    } catch(err) {
        next(err);
    }
}