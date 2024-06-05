require('dotenv').config(); // Mengimpor dan mengonfigurasi dotenv
var admin = require("firebase-admin");

var serviceAccount = require("/Users/ADMIN/Documents/GitHub/Capstone/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL // Menggunakan variabel lingkungan
});

const db = admin.database();

const firebaseMiddleware = (req, res, next) => {
  req.db = db;
  next();
};

module.exports = firebaseMiddleware;
