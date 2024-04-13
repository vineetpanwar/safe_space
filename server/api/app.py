import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, jsonify, request
from flask_cors import CORS

from services.DoctorsService import fetch_doctors_based_on_location
from services.MentalHealthService import get_mental_health_response  # Import the chat service


app = Flask(__name__)
CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(app)
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
    
    
@app.route("/chat", methods=["POST"])
def chat():
    response = jsonify({"response": "Hello from Flask!"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response
    # return jsonify({"response": "Static test response"}), 200
    # user_input = request.json.get('message')
    # print("Received message:", user_input)  # Debug print
    # if not user_input:
    #     return jsonify({"error": "No message provided"}), 400

    # response = get_mental_health_response(user_input)
    # print("Sending response:", response)  # Debug print
    # return jsonify({"response": response})

# @app.route("/chat", methods=["OPTIONS"])
# def chat_options():
#     return _build_cors_preflight_response()

# def _build_cors_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
#     response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
#     return response


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


if __name__ == "__main__":
    app.run(debug=True)