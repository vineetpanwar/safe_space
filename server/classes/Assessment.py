from flask import Flask, jsonify
from tinydb import TinyDB, Query
from server.classes import Assessment
import json

class Assessment:
    assessment_file = 'server/db/assessment.json'  # File path
    
    def __init__(self):
        pass
        
    def getAssessment(self,testId):
        try:
            with open(self.assessment_file, 'r') as file:
                data = json.load(file)
            result = data.get(testId,None)
            return result
        except Exception as e:
            return {"success": False, "error": str(e)}
        

    def createAssessment(self,set_name, question_text, options):
        try:
        # Load existing data from assessment.json
            with open(self.assessment_file, 'r') as file:
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
            with open(self.assessment_file, 'w') as file:
                json.dump(data, file, indent=4)

            return {"success": True, "message": "Question added successfully", "QID": next_qid}

        except Exception as e:
            return {"success": False, "error": str(e)}
        



    def deleteAssessment(self,set_name, question_id):
        try:
            # Load existing data from assessment.json
            with open(self.assessment_file, 'r') as file:
                data = json.load(file)
            
            # Get the set
            assessment_set = data.get(set_name, {})


       # Check if the question exists
            if question_id in assessment_set:
                # Delete the question
                del assessment_set[question_id]
                
                # Update the data with the modified assessment set
                data[set_name] = assessment_set


                # Write the updated data back to assessment.json
                with open(self.assessment_file, 'w') as file:
                    json.dump(data, file, indent=4)


                return {"success": True, "message": "Question deleted successfully"}


            else:
                return {"success": False, "error": "Question not found"}


        except Exception as e:
            return {"success": False, "error": str(e)}




    def updateAssessment(self, set_name, question_id, new_question_text, new_options):
        try:
            # Load existing data from assessment.json
            with open(self.assessment_file, 'r') as file:
                data = json.load(file)
            
            # Get the set
            assessment_set = data.get(set_name, {})


            # Check if the question exists
            if question_id in assessment_set:
                # Update the question
                if not new_question_text is "":
                    assessment_set[question_id]["QuestionText"] = new_question_text
                if not new_options is "":
                    assessment_set[question_id]["Options"] = new_options
                
                # Update the data with the modified assessment set
                data[set_name] = assessment_set


                # Write the updated data back to assessment.json
                with open(self.assessment_file, 'w') as file:
                    json.dump(data, file, indent=4)


                return {"success": True, "message": "Question updated successfully"}


            else:
                return {"success": False, "error": "Question not found"}


        except Exception as e:
            return {"success": False, "error": str(e)}



    
    def evaluateScore(self):
        try:
            with open(self.assessment_file, 'r') as file:
                data = json.load(file)
            
            
    