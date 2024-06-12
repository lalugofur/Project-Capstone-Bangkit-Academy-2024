const { Storage } = require('@google-cloud/storage');
const axios = require('axios');
require('dotenv').config();
const admin = require('firebase-admin');

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
const serviceAccount = require('/Users/ADMIN/Documents/GitHub/Capstone/key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cat-breed-a70db-default-rtdb.asia-southeast1.firebasedatabase.app'
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
        const latestIdRef = admin.database().ref('latest_id');

        // Transaction to get and increment the latest_id
        const newId = await latestIdRef.transaction((currentId) => {
            return (currentId || 0) + 1;
        });

        const data = {
            id: newId.snapshot.val(),
            imageUrl,
            classificationResult,
            created_at: new Date().toISOString()
        };

        // Save classification data to Firebase under "Cat" with the newId as key
        await admin.database().ref(`Cat-Prediction/${newId.snapshot.val()}`).set(data);

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kesalahan internal server upload' });
    }
};

const getCatBreeds = async (req, res) => {
    try {
        const snapshot = await admin.database().ref('cat-breeds').once('value');
        const catBreeds = snapshot.val();

        if (catBreeds) {
            res.status(200).json(catBreeds);
        } else {
            res.status(404).json({ error: 'Data catbreeds tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

const getCatBreedById = async (req, res) => {
    try {
        const { id } = req.params;
        const snapshot = await admin.database().ref(`cat-breeds/${id}`).once('value');
        const catBreed = snapshot.val();

        if (catBreed) {
            res.status(200).json(catBreed);
        } else {
            res.status(404).json({ error: `Cat breed with ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error fetching cat breed by ID:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

const getSymptoms = async (req, res) => {
    try {
        const snapshot = await admin.database().ref('symptomps').once('value');
        const symptoms = snapshot.val();

        if (symptoms) {
            res.status(200).json(symptoms);
        } else {
            res.status(404).json({ error: 'Data symptoms tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching symptoms:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

const getSymptomById = async (req, res) => {
    try {
        const { id } = req.params;
        const snapshot = await admin.database().ref(`symptomps/${id}`).once('value');
        const symptom = snapshot.val();

        if (symptom) {
            res.status(200).json(symptom);
        } else {
            res.status(404).json({ error: `Symptom with ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error fetching symptom by ID:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

module.exports = {
    uploadImage,
    getCatBreeds,
    getCatBreedById,
    getSymptoms,
    getSymptomById
};
