const path = require('path');

exports.uploadAnimation = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, data: "No files were uploaded." });
    }
    animation = req.files.data;
    const rootPath = path.join(__dirname, '../');
    const uploadPath = `${rootPath}public\\images\\${animation.name}`;
}

exports.uploadVideo = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, data: "No files were uploaded." });
    }
    video = req.files.data;
    const rootPath = path.join(__dirname, '../');
    const uploadPath = `${rootPath}public\\videos\\${video.name}`;
}

exports.uploadImage = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, data: "No files were uploaded." });
    }
    image = req.files.data;
    ///const rootPath = path.join(__dirname, '../');
    //const uploadPath = `${rootPath}public\\images\\${image.name}`;
}





exports.uploadImages = async (req, res, next) => {
    console.log(123);
    console.log(req.files);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, data: "No files were uploaded." });
    }

    image = req.files.data;
    const rootPath = path.join(__dirname, '../');
    const uploadPath = `${rootPath}public\\images\\${image.name}`;

    console.log(uploadPath);

    await image.mv(uploadPath, err => {
        //console.log(111);
        if(err) return res.status(500).json({ success: false, data: err });
        //console.log(222);
        res.status(200).json({ success: true, data: "File uploaded!" });
    });
    
}