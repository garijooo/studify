const express = require('express');
const router = express.Router();

const { createTest, addQuestion, getTest, submitTest, getResult } = require('../controllers/testControllers');

router.route('/create').post(createTest);
router.route('/add/:id').patch(addQuestion);
router.route('/get/:id').get(getTest);
router.route('/submit/:id').post(submitTest);
router.route('/result/get/:id').post(getResult);

module.exports = router;