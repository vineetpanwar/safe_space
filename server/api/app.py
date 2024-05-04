import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, jsonify, request
from services.DoctorsService import fetch_doctors_based_on_location
# from services.AssessmentService import getAssessment, createAssessment, deleteAssessment, updateAssessment
# from services.ResourceService import getResources
from flask_cors import CORS
from services.healthcare_professional_service import HealthcareProfessional
from services.user_service import User
from werkzeug.security import check_password_hash
from services.AssessmentService import assessment_instance
from services.ResourceService import resource_instance
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST","PUT","DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})

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


@app.route("/assessment")
def get_assessment_route():
    try:
        test_id = request.args.get("id")  # Retrieve testId from query parameters
        assessment_data = assessment_instance.getAssessment(test_id)
        if assessment_data:
            return jsonify(assessment_data), 200
        else:
            return jsonify({"error": "Assessment not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# @app.route("/assessment")
# def get_assessment_route(testId):
#     try:
#         assessment_name = request.args.get("id")
#         # assessment_data = assessment_instance.getAssessment(testId)
#         # if assessment_name in assessment_data:
#         return jsonify(assessment_name), 200
#         # else:
#         #     return jsonify({"error": "Assessment not found"}), 404
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500
    

@app.route("/assessment", methods=["POST"])
def create_assessment_route():
    try:
        # Extract parameters from the request data
        data = request.json
        database_name = data.get('database_name')
        # set_name = data.get('set_name')
        question_text = data.get('question_text')
        options = data.get('options')

        # Call the createAssessment function
        result = assessment_instance.createAssessment(database_name, question_text, options)

        # Return the result as JSON response
        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    

@app.route("/assessment", methods=["DELETE"])
def delete_assessment_route():
    try:
        # Extract parameters from the request data
        data = request.json
        database_name = data.get('database_name')
        question_id = data.get('question_id')

        # Call the deleteQuestion function
        result = assessment_instance.deleteAssessment(database_name, question_id)

        # Return the result as JSON response
        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/assessment", methods=["PUT"])
def update_assessment_route():
    try:
        # Extract parameters from the request data
        data = request.json
        database_name = data.get('database_name')
        question_id = data.get('question_id')
        updated_question_text = data.get('updated_question_text')
        updated_options = data.get('updated_options')

        # Call the updateQuestion function
        result = assessment_instance.updateAssessment(database_name, question_id, updated_question_text, updated_options)

        # Return the result as JSON response
        return jsonify(result)

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/evaluate-score/<testId>", methods=["POST"])
def evaluate_score_route(testId):
    try:
        # Get the recorded options from the request JSON
        recorded_options = request.json.get(testId)
        
        # Call the evaluateScore method to calculate the mental health score
        result = assessment_instance.evaluateScore(recorded_options)
        
        # Return the result as JSON response
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500





@app.route("/resource")
def get_resource_route():
    try:
          # Retrieve testId from query parameters
        resource_data = resource_instance.getResources()
        if resource_data:
            return jsonify(resource_data), 200
        else:
            return jsonify({"error": "Resource not found"}), 404
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/resource", methods=["POST"])
def create_resource_route():
    try:
        # Extract parameters from the request data
        data = request.json
        # set_name = data.get('set_name')
        title = data.get('title')
        summary = data.get('summary')
        imageUrl = data.get('imageUrl')
        href = data.get('href')

        # Call the createAssessment function
        result = resource_instance.createResource(title, summary,imageUrl,href)

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

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        # Authenticate user
        user = HealthcareProfessional.login(email, password)

        # If authentication is successful, proceed to login.
        if user:
            return jsonify({"message": "Login successful"}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 401
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        professional_id = data['professional_id']
        qualifications = data['qualifications']
        work_schedule = data['work_schedule']

        # Register new healthcare professional
        user = HealthcareProfessional.signup(username, password, professional_id, qualifications, work_schedule)

        # If signup is successful, proceed to create user.
        if user:
            return jsonify({"message": "Signup successful"}), 201
        else:
            return jsonify({"message": "Signup failed"}), 400
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
    
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({"status": 404, "message": "Not Found"}), 404
