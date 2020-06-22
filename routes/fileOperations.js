const express = require('express');
const router = express.Router();
const fileUpload = require('../controller/fileUpload');
const multer = require('multer');
const empController = require('../controller/employees');

/* Setting file upload directory */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

/* Restricting file formats : jpg/jpeg/png*/

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/* Setting upload strategy with 5MB max size  */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post('/upload', upload.single('imageName'), fileUpload.upload, empController.findByEmail);
router.post('/download', fileUpload.download);

module.exports = router;