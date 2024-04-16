from flask import Flask, jsonify
from tinydb import TinyDB, Query

app = Flask(__name__)

# Sample data
data = {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}

def getAssessment():
    try:
        assessmentDB = TinyDB('../db/assessment.json')
        # Print the depressionSet database and its contents
        depression_set_table = assessmentDB.table('depressionSetA')
        # depression_set_table.insert({'foo': 'bar'})
        print("Database: depressionSet")
        print(depression_set_table.all())
 
    except Exception as e:
        # Handling exceptions
        print(f"Error: {e}")
        return None


# # Route to return JSON data
# @app.route('/api/data', methods=['GET'])
# def get_data():
#     return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
