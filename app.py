import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Sample Data
data = {
    "Symptoms": [
        "Fever, Cough",
        "Joint Pain",
        "Acidity, Heartburn",
        "Skin Rashes",
        "Fatigue, Weakness",
        # Add more entries here
    ],
    "Disease": [
        "Flu",
        "Arthritis",
        "GERD",
        "Eczema",
        "Anemia",
        # Corresponding diseases
    ],
    "Cure": [
        "Tulsi and Giloy decoction",
        "Warm sesame oil massage",
        "Amla and licorice root",
        "Neem and turmeric paste",
        "Ashwagandha and almond milk",
        # Corresponding cures
    ],
}

# Create DataFrame
df = pd.DataFrame(data)

# Feature Engineering
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(df["Symptoms"])
y = df["Disease"]

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


# Train a Random Forest model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy}")

from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask App
app = Flask(__name__)

CORS(app)


# Endpoint to Predict Disease
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(data)
    symptoms = data.get("symptoms")
    
    # Vectorize symptoms
    symptoms_vector = vectorizer.transform([symptoms])
    
    # Predict Disease
    predicted_disease = model.predict(symptoms_vector)[0]
    
    # Find the Cure
    cure = df[df["Disease"] == predicted_disease]["Cure"].values[0]
    # print(jsonify({"Disease": predicted_disease, "Cure": cure}))
    return jsonify({"Disease": predicted_disease, "Cure": cure})

# Run the App
if __name__ == "__main__":
    app.run(debug=True)




