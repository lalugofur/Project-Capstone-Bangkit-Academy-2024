const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('./handler'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('image'), uploadImage); 

module.exports = router;
