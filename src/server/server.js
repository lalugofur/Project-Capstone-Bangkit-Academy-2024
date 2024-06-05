const express = require('express');
const bodyParser = require('body-parser');
const firebaseMiddleware = require('./middleware');
const diagnosisRoute = require('./routes');

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());

// Menambahkan middleware Firebase
app.use(firebaseMiddleware);

// Menambahkan route
app.use('/diagnose', diagnosisRoute);

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
