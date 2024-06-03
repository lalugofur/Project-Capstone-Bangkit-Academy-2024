const { Firestore } = require('@google-cloud/firestore');

// Inisialisasi Firestore dengan pengaturan default
const firestore = new Firestore();

module.exports = firestore;
