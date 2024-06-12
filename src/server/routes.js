const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, getCatBreeds, getCatBreedById, getSymptoms, getSymptomById } = require('./handler'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('image'), uploadImage); 
router.get('/catbreeds', getCatBreeds);
router.get('/catbreeds/:id', getCatBreedById);
router.get('/symptoms', getSymptoms);
router.get('/symptoms/:id', getSymptomById);

module.exports = router;
