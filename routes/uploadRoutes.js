const express = require('express');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { uploadImages, uploadImage, uploadVideo, uploadAnimation } = require('../controllers/uploadControllers');

//router.route('/images').post(uploadImages);
//router.route('/image').post(uploadImage);

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootPath = path.join(__dirname, '../');
        const uploadPath = `${rootPath}public\\images`;
        cb(null, uploadPath);
      },
    filename: function(req, file, cb){
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single("asset");

router.post('/image', function (req, res) {
    upload(req, res, function(err) {
        console.log("FILES ---", req.files);
        console.log("Request ---", req.body);
        console.log("Request file ---", req.file);
        if(!err) return res.send(200).end();   
    });
});
*/

router.route('/image').post(uploadImage);


router.route('/video').post(uploadVideo);
router.route('/animation').post(uploadAnimation);


module.exports = router;