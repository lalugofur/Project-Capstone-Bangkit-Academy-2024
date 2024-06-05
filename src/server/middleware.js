var admin = require("firebase-admin");

var serviceAccount = require("/Users/ADMIN/Documents/GitHub/Capstone/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://symptoms-82842-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

const firebaseMiddleware = (req, res, next) => {
  req.db = db;
  next();
};

module.exports = firebaseMiddleware;
