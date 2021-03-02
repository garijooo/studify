const express = require('express');
const router = express.Router();
const { uploadImages, uploadImage, uploadVideo, uploadAnimation } = require('../controllers/uploadControllers');

//router.route('/images').post(uploadImages);

router.route('/image').post(uploadImage);
router.route('/video').post(uploadVideo);
router.route('/animation').post(uploadAnimation);

module.exports = router;