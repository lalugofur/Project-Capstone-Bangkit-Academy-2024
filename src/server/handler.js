const { readFileSync } = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');

// Mendefinisikan path ke dataset
const datasetPath = path.join(__dirname, 'modified_dataset.csv');

// Membaca file CSV
const dataset = readFileSync(datasetPath, 'utf8')
  .split('\n')
  .slice(1)
  .map(line => line.split(','))
  .map(([name, deskripsi, deskripsi_translated]) => ({
    name,
    deskripsi,
    deskripsi_translated,
    combined_description: `${deskripsi} ${deskripsi_translated}`
  }));

// Inisialisasi TF-IDF Vectorizer
const vectorizer = {
  fit: function (docs) {
    this.vocabulary = [...new Set(docs.join(' ').split(' '))];
    this.idf = this.vocabulary.map(term => {
      const docCount = docs.filter(doc => doc.includes(term)).length;
      return Math.log(docs.length / (1 + docCount));
    });
  },
  transform: function (docs) {
    return docs.map(doc => {
      const tf = this.vocabulary.map(term => {
        const termCount = doc.split(' ').filter(word => word === term).length;
        return termCount / doc.split(' ').length;
      });
      return tf.map((termTf, idx) => termTf * this.idf[idx]);
    });
  }
};

const descriptions = dataset.map(item => item.combined_description);
vectorizer.fit(descriptions);
const tfidfMatrix = vectorizer.transform(descriptions);

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, val, idx) => acc + val * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Fungsi diagnosis menggunakan model machine learning
function diagnose(symptoms) {
  const queryVec = vectorizer.transform([symptoms])[0];
  const similarityScores = tfidfMatrix.map(docVec => cosineSimilarity(queryVec, docVec));
  const topIndices = similarityScores
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(item => item.index);
  const topDiseases = topIndices.map(index => dataset[index]);
  return topDiseases.map(({ name, deskripsi_translated }) => ({ name, deskripsi_translated }));
}

// Handler untuk diagnosis penyakit
const diagnoseHandler = (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms) {
    return res.status(400).json({ error: 'Please provide symptoms' });
  }
  const diagnosisResults = diagnose(symptoms);
  res.json(diagnosisResults);
};

module.exports = {
  diagnoseHandler
};
