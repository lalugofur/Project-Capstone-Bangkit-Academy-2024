const express = require('express');
const router = express.Router();
const multer = require('multer');
const { registerUser, loginUser } = require('./handlers/authHandler');
const { uploadImage } = require('./handlers/imageHandler');
const { getCatBreeds, getCatBreedById } = require('./handlers/catBreedHandler');
const { getSymptoms, getSymptomById } = require('./handlers/symptomHandler');
const authenticate = require('./middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/upload-image', authenticate, upload.single('image'), uploadImage); 
router.get('/catbreeds', authenticate, getCatBreeds);
router.get('/catbreeds/:id', authenticate, getCatBreedById);
router.get('/symptoms', authenticate, getSymptoms);
router.get('/symptoms/:id', authenticate, getSymptomById);

module.exports = router;
