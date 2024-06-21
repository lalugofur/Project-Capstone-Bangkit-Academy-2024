const admin = require('firebase-admin');
const axios = require('axios');
const { body, validationResult } = require('express-validator');

// Validasi input
const validate = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        body('email').isEmail().withMessage('Email tidak valid'),
        body('password').isLength({ min: 6 }).withMessage('Password harus minimal 6 karakter'),
        body('username').notEmpty().withMessage('Username diperlukan')
      ];
    }
    case 'loginUser': {
      return [
        body('email').isEmail().withMessage('Email tidak valid'),
        body('password').exists().withMessage('Password diperlukan')
      ];
    }
  }
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, username } = req.body;
  
  // Memeriksa apakah username telah diisi
  if (!username) {
    return res.status(400).json({ error: 'Username diperlukan' });
  }

  try {
    // Buat pengguna baru
    const userRecord = await admin.auth().createUser({ email, password });
    
    // Simpan username di Realtime Database
    const db = admin.database();
    await db.ref('users/' + userRecord.uid).set({ username, email });

    res.status(201).json({ message: 'Pengguna berhasil didaftarkan', user: userRecord });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  console.log("Request received:", req.body);
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_API_KEY}`;
    const payload = { email, password, returnSecureToken: true };
    const response = await axios.post(url, payload);

    // Response dari Firebase
    const idToken = response.data.idToken;
    const refreshToken = response.data.refreshToken;
    
    // Mengirimkan token bearer dalam respons
    res.json({ token: `Bearer ${idToken}`, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error.message);
    res.status(400).json({ error: error.response ? error.response.data : error.message });
  }
};

module.exports = { registerUser, loginUser, validate };
