const admin = require('firebase-admin');

const getCatBreeds = async (req, res) => {
    try {
        const snapshot = await admin.database().ref('cat-breeds').once('value');
        const catBreeds = snapshot.val();

        if (catBreeds) {
            res.status(200).json(catBreeds);
        } else {
            res.status(404).json({ error: 'Data catbreeds tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

const getCatBreedById = async (req, res) => {
    try {
        const { id } = req.params;
        const snapshot = await admin.database().ref(`cat-breeds/${id}`).once('value');
        const catBreed = snapshot.val();

        if (catBreed) {
            res.status(200).json(catBreed);
        } else {
            res.status(404).json({ error: `Cat breed with ID ${id} not found` });
        }
    } catch (error) {
        console.error('Error fetching cat breed by ID:', error);
        res.status(500).json({ error: 'Kesalahan internal server' });
    }
};

module.exports = { getCatBreeds, getCatBreedById };
