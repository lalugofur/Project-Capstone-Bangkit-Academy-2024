const admin = require('firebase-admin');

const getSymptoms = async (req, res) => {
    try {
        const snapshot = await admin.database().ref('symptomps').once('value');
        const symptoms = snapshot.val();

        if (symptoms) {
            res.status(200).json(symptoms);
        } else {
            res.status(404).json({ error: 'Data symptoms tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching symptoms:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

const getSymptomById = async (req, res) => {
    try {
        const { id } = req.params;
        const snapshot = await admin.database().ref(`symptomps/${id}`).once('value');
        const symptom = snapshot.val();

        if (symptom) {
            res.status(200).json(symptom);
        } else {
            res.status(404).json({ error: `Symptom with ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error fetching symptom by ID:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

module.exports = { getSymptoms, getSymptomById };
