const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const admin = require('firebase-admin');
const routes = require('./routes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const serviceAccount = require('/Users/ADMIN/Documents/GitHub/Capstone/key.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://cat-breed-a70db-default-rtdb.asia-southeast1.firebasedatabase.app'
});

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
