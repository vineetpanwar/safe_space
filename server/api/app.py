import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, jsonify, request, make_response
from flask_cors import CORS

from services.DoctorsService import fetch_doctors_based_on_location
from services.MentalHealthService import get_mental_health_response  # Import the chat service


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
@app.route("/getdoctorsnearby", methods=["POST"])
def get_doctors_nearby_route():

    post_request_data = request.json

    if 'latitude' in post_request_data and 'longitude' in post_request_data and 'searchText' in post_request_data:
        latitude = post_request_data['latitude']
        longitude = post_request_data['longitude']
        searchText = post_request_data['searchText']
    else:
        return jsonify({"error": "Pass valid Latitude and/or longitude and or searchText in request body"}), 400

    doctors = fetch_doctors_based_on_location(latitude, longitude, searchText)

    if doctors:
        return jsonify({'doctors': doctors}), 200
    else:
        return jsonify({'error': 'Failed to fetch nearby doctors'}), 500
    
    
@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS", "GET")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response
    elif request.method == "POST":
        user_input = request.json.get('message', '')
        response = get_mental_health_response(user_input)
        response_data = jsonify({"response": response})
        response_data.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response_data.headers.add("Access-Control-Allow-Credentials", "true")
        return response_data


@app.route("/foo")
def foo():
    return jsonify({ 'foo': 'bar'}), 200

@app.route("/doctors")
def docs():
    return jsonify({ 'doctors': 'hello'}), 200

@app.route("/")
def home():
    return "Flask Vercel Example - Hello World", 200


@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404

def _build_cors_preflight_response():
    response = jsonify({'status': 'ok'})  # You can send any response or even empty one.
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    return response

if __name__ == "__main__":
    app.run(debug=True, port=5000)