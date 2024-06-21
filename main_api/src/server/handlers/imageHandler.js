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

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Gambar tidak ditemukan!' });
        }

        const wasteImage = req.file;
        const currentDate = new Date().toISOString().replace(/:/g, '-');
        const filename = `images/${currentDate}.jpg`;

        await storage.bucket(bucketName).file(filename).save(wasteImage.buffer, {
            metadata: { contentType: 'image/jpeg' },
        });

        const imageUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;

        const response = await axios.post('http://127.0.0.1:8080/classify', { imageUrl });
        const classificationResult = response.data.classificationResult;

        if (classificationResult === 'Bukan Kucing') {
            const latestIdRef = admin.database().ref('latest_id');
            const newId = await latestIdRef.transaction((currentId) => (currentId || 0) + 1);

            const data = {
                id: newId.snapshot.val(),
                imageUrl,
                classificationResult,
                created_at: new Date().toISOString()
            };

            await admin.database().ref(`NonCat-Prediction/${newId.snapshot.val()}`).set(data);

            return res.status(200).json(data);
        }

        const predictedLabel = classificationResult.prediction_label;
        const breedSnapshot = await admin.database().ref(`cat-breeds/${predictedLabel}`).once('value');
        const breedDetails = breedSnapshot.val();

        if (!breedDetails) {
            return res.status(404).json({ error: `Details for breed with label ${predictedLabel} not found` });
        }

        classificationResult.description = breedDetails.Definisi || 'Description not available';
        classificationResult.diseases = breedDetails.list_penyakit || 'Diseases not available';

        const latestIdRef = admin.database().ref('latest_id');
        const newId = await latestIdRef.transaction((currentId) => (currentId || 0) + 1);

        const data = {
            id: newId.snapshot.val(),
            imageUrl,
            classificationResult,
            created_at: new Date().toISOString()
        };

        await admin.database().ref(`Cat-Prediction/${newId.snapshot.val()}`).set(data);

        res.status(200).json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Kesalahan internal server upload' });
    }
};

module.exports = { uploadImage };
