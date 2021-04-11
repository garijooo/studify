const express = require('express');
const router = express.Router();

const { createTest, addQuestion, getTest, submitTest, getResult, changeVisibility } = require('../controllers/testControllers');

router.route('/create').post(createTest);
router.route('/add/:id').patch(addQuestion);
router.route('/get/:id').get(getTest);
router.route('/submit/:id').post(submitTest);
router.route('/result/get/:id').post(getResult);
router.route('/visibility/change/:id').patch(changeVisibility);

module.exports = router;