const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const routes = require('./routes');
const path = require('path');

dotenv.config();

const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const serviceAccount = require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});


let latestId = 0;

const initializeLatestId = async () => {
    try {
        const latestIdRef = admin.database().ref('latest_id');
        const snapshot = await latestIdRef.once('value');
        latestId = snapshot.val() || 0;
        console.log(`Initialized latest ID: ${latestId}`);
    } catch (error) {
        console.error('Error initializing latest ID:', error);
    }
};

initializeLatestId();

app.use('/api', (req, res, next) => {
    req.latestId = latestId;
    next();
}, routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

