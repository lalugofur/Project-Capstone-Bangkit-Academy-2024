const { Storage } = require('@google-cloud/storage');
const axios = require('axios');
require('dotenv').config();
const admin = require('firebase-admin'); // Added Firebase Admin SDK

const keyFilename = process.env.KEY_FILENAME;
const projectId = process.env.PROJECT_ID;

// Google Cloud Storage Service Account
const storage = new Storage({
    projectId,
    keyFilename
});

// Google Cloud Storage bucket name
const bucketName = process.env.BUCKET_NAME;

// Initialize Firebase Admin SDK with service account credentials
const serviceAccount = require('/Users/ADMIN/Documents/GitHub/Capstone/key.json'); // Path to your Firebase service account key file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://cat-breed-a70db-default-rtdb.asia-southeast1.firebasedatabase.app' // Your Firebase database URL
});

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Gambar tidak ditemukan!' });
        }

        const wasteImage = req.file;
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const filename = `images/${currentDate}.jpg`;

        await storage.bucket(bucketName).file(filename).save(wasteImage.buffer, {
            metadata: {
                contentType: 'image/jpeg',
            },
        });

        const imageUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

        // Call Flask API for classification
        const response = await axios.post('http://127.0.0.1:3000/classify', { imageUrl });
        
        // Mengambil data klasifikasi dari respons Flask
        const classificationResult = response.data;

        // Data to be saved to Firebase
        const data = {
            imageUrl,
            classificationResult
        };

        // Save classification data to Firebase under "classification"
        const classificationRef = admin.database().ref('Cat').push();
        await classificationRef.set(classificationResult);

        res.status(200).json({ imageUrl, classificationResult });

    } catch (error) {
        // Menangani kesalahan saat mengirimkan permintaan ke server Flask
        console.error(error);
        res.status(500).json({ error: 'Kesalahan internal server upload' });
    }
};

module.exports = {
    uploadImage
};
