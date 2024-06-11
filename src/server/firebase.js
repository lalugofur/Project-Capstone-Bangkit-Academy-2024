const admin = require('firebase-admin');

const serviceAccount = require('/Users/ADMIN/Documents/GitHub/Capstone/key.json'); // Ganti dengan path ke service account key Firebase Anda

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://symptoms-82842-default-rtdb.asia-southeast1.firebasedatabase.app' // Ganti dengan URL Firebase Database Anda
});

const db = admin.database();

async function saveToFirebase(data) {
    try {
        const ref = db.ref('classifications');
        const newClassificationRef = ref.push();
        await newClassificationRef.set(data);
        console.log('Data berhasil disimpan di Firebase Realtime Database.');
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

module.exports = {
    saveToFirebase
};
