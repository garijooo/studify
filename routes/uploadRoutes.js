const express = require('express');
const router = express.Router();
const { uploadImage } = require('../controllers/uploadControllers');

router.route('/images').post(uploadImage);

module.exports = router;