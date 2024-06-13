const admin = require('firebase-admin');
const axios = require('axios');

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userRecord = await admin.auth().createUser({ email, password });
        res.status(201).json({ message: 'Pengguna berhasil didaftarkan', user: userRecord });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_API_KEY}`;
        const payload = { email, password, returnSecureToken: true };
        const response = await axios.post(url, payload);
        const idToken = response.data.idToken;
        res.json({ token: `Bearer ${idToken}` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { registerUser, loginUser };
