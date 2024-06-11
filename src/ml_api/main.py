from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
import requests

app = Flask(__name__)

# Load the model
model = tf.keras.models.load_model('model.h5', compile=False)

# Update class names
class_names = [
    'Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'Bengal',
     'Birman','Bombay','British Shorthair', 'Egyptian Mau', 'Exotic Shorthair', 'Maine Coon',
     'Manx', 'Norwegian Forest', 'Persian', 'Ragdoll', 'Russian Blue', 'Scottish Fold',
    'Siamese', 'Sphynx', 'Turkish Angora'
]

@app.route('/classify', methods=['POST'])
def classify_image():
    try:
        if 'imageUrl' not in request.json:
            return jsonify({'error': 'No image URL provided'}), 400

        image_url = request.json['imageUrl']
        image = Image.open(requests.get(image_url, stream=True).raw)

        # Resize image to the expected input size of the model
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Make predictions
        predictions = model.predict(image_array)
        predicted_class_index = np.argmax(predictions)
        
        if predicted_class_index >= len(class_names):
            return jsonify({'error': 'Invalid predicted class index'}), 500
        
        predicted_class = class_names[predicted_class_index]
        confidence = np.max(predictions)
        
        # Create result
        result = {
            'predictions': {},
            'prediction_label': int(predicted_class_index),
            'cat_breed': predicted_class,
            'confidence': float(confidence)
        }

        # Menambahkan nama kelas ke prediksi
        for i in range(len(class_names)):
            class_name = class_names[i]
            class_probability = float(predictions[0][i])  
            result['predictions'][class_name] = class_probability

        return jsonify({'classificationResult': result}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)