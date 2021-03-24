const express = require('express');
const router = express.Router();
const { add } = require('../controllers/learnerControllers');

router.route('/add/:id').patch(add);

module.exports = router;