import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, jsonify, request
from services.DoctorsService import fetch_doctors_based_on_location

from services.AssessmentService import getAssessment, createAssessment
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST"], "allow_headers": ["Content-Type"]}})

data = {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}


@app.route("/data")
def data():
    return jsonify({
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}),200

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

@app.route("/foo")
def foo():
    return jsonify({ 'foo': 'bar'}), 200

@app.route("/get_assessment")
def assessment():
    getAssessment()
    return jsonify({ 'abc': 'def1'}), 200

@app.route("/create_assessment", methods=["POST"])
def create_assessment_route():
    try:
        # Extract parameters from the request data
        data = request.json
        database_name = data.get('database_name')
        set_name = data.get('set_name')
        question_text = data.get('question_text')
        options = data.get('options')

        # Call the createAssessment function
        result = createAssessment(database_name, set_name, question_text, options)

        # Return the result as JSON response
        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    



@app.route("/doctors")
def docs():
    return jsonify({ 'doctors': 'hello'}), 200

@app.route("/")
def home():
    return "Flask Vercel Example - Hello World", 200


@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404
