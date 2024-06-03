const express = require('express');
const app = express();
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan routes dari routes.js
app.use('/api', routes);

// Tangani kesalahan jika ada
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Jalankan server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Tangani kesalahan ketika server gagal berjalan
server.on('error', (err) => {
  console.error('Server failed to start:', err);
});
