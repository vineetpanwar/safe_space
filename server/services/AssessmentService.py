from flask import Flask, jsonify
from tinydb import TinyDB, Query

app = Flask(__name__)


def getAssessment():
    try:
        assessmentDB = TinyDB('../db/assessment.json')
        # Print the depressionSet database and its contents
        anxiety_set_table = assessmentDB.table('anxietySet')
        # depression_set_table.insert({'foo': 'bar'})
        print("Database: anxietySet")
        print(anxiety_set_table.all())

        mooddisorder_set_table = assessmentDB.table('moodDisorderSet')
        # depression_set_table.insert({'foo': 'bar'})
        print("Database: moodDisorderSet")
        print(mooddisorder_set_table.all())

        psychoticDisorder_set_table = assessmentDB.table('psychoticDisorderSet')
        # depression_set_table.insert({'foo': 'bar'})
        print("Database: psychoticDisorderSet")
        print(psychoticDisorder_set_table.all())


        personalityDisorder_set_table = assessmentDB.table('personalityDisorderSet')
        # depression_set_table.insert({'foo': 'bar'})
        print("Database: personalityDisorderSet")
        print(personalityDisorder_set_table.all())

    except Exception as e:
        return {"success": False, "error": str(e)}

    



# def createAssessment(set_name, question_text, options):
#     try:
#         # Load existing data from assessment.json
#         with open('assessment.json', 'r') as file:
#             data = json.load(file)
        
#         # Get the set
#         assessment_set = data.get(set_name, {})

#         # Find the highest QID and increment by 1 to get the next QID
#         highest_qid = max([int(qid) for qid in assessment_set.keys()] or [0])
#         next_qid = str(highest_qid + 1)

#         # Construct the new question object
#         new_question = {
#             "QID": next_qid,
#             "QuestionText": question_text,
#             "Options": options,
#             "recordedOption": ""  # Initially recorded option is empty
#         }

#         # Add the new question to the set
#         assessment_set[next_qid] = new_question

#         # Update the data with the new assessment set
#         data[set_name] = assessment_set

#         # Write the updated data back to assessment.json
#         with open('assessment.json', 'w') as file:
#             json.dump(data, file, indent=4)

#         return {"success": True, "message": "Question added successfully", "QID": next_qid}

#     except Exception as e:
#         return {"success": False, "error": str(e)}



def createAssessment(set_name, question_text, options):
    try:
        # Load existing data from assessment.json
        with open('../db/assessment.json', 'r') as file:
            data = json.load(file)
        
        # Get the set
        assessment_set = data.get(set_name, {})

        # Find the highest QID and increment by 1 to get the next QID
        highest_qid = max([int(qid) for qid in assessment_set.keys()] or [0])
        next_qid = str(highest_qid + 1)

        # Construct the new question object
        new_question = {
            "QID": next_qid,
            "QuestionText": question_text,
            "Options": options,
            "recordedOption": ""  # Initially recorded option is empty
        }

        # Add the new question to the set
        assessment_set[next_qid] = new_question

        # Update the data with the new assessment set
        data[set_name] = assessment_set

        # Write the updated data back to assessment.json
        with open('../db/assessment.json', 'w') as file:
            json.dump(data, file, indent=4)

        return {"success": True, "message": "Question added successfully", "QID": next_qid}

    except Exception as e:
        return {"success": False, "error": str(e)}



if __name__ == '__main__':
    app.run(debug=True)
