const express = require('express');
const router = express.Router();
const handler = require('./handler');

// Endpoint untuk mendapatkan daftar penyakit
router.get('/penyakit', handler.getPenyakit);

// Endpoint untuk mendapatkan ciri-ciri penyakit
router.get('/ciri-ciri', handler.getCiriCiri);

// Endpoint untuk mendapatkan daftar dokter
router.get('/dokter', handler.getDokter);

// Endpoint untuk diagnosis penyakit
router.post('/diagnose', handler.diagnoseHandler);

module.exports = router;
