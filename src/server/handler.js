const mockDiagnosis = (symptoms) => {
  const possibleDiseases = [
    { name: "Flu Kucing", treatment: "Istirahat dan banyak minum air" },
    { name: "Infeksi Kulit", treatment: "Salep antibiotik dan mandi rutin" },
    { name: "Gangguan Pencernaan", treatment: "Diet khusus dan obat pencernaan" }
  ];
  return possibleDiseases[Math.floor(Math.random() * possibleDiseases.length)];
};

const saveDiagnosisToDatabase = async (db, symptoms, diagnosis) => {
  try {
    const newDiagnosisRef = db.ref('diagnoses').push();
    await newDiagnosisRef.set({
      symptoms: symptoms,
      diagnosis: diagnosis.name,
      treatment: diagnosis.treatment,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    throw new Error("Error saving to database");
  }
};

const diagnoseHandler = async (req, res) => {
  const symptoms = req.body.symptoms;

  if (!symptoms || symptoms.length === 0) {
    return res.status(400).json({ error: "No symptoms provided" });
  }

  const diagnosis = mockDiagnosis(symptoms);
  const db = req.db;

  try {
    await saveDiagnosisToDatabase(db, symptoms, diagnosis);
    res.json(diagnosis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = diagnoseHandler;
