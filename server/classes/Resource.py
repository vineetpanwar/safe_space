from flask import Flask, jsonify
from tinydb import TinyDB, Query
# from server.classes import Resource
import json

class Resource:
    resource_file = 'server/db/resources_updated.json'  # File path
    
    def __init__(self):
        pass
        

    def getResources(self):
            try:
                with open(self.resource_file, 'r') as file:
                    data = json.load(file)
                return data
            except Exception as e:
                return {"success": False, "error": str(e)}
    

    def createResource(self,title, summary, imageUrl, href):
        try:
        # Load existing data from resource.json
            with open(self.resource_file, 'r') as file:
                data = json.load(file)
            
            highest_res = max([int(num) for num in data.keys()] or [0])
            next_res_num = str(highest_res + 1)

            # Construct the new resource object
            new_res = {
                "title":title,
                "summary":summary,
                "imageUrl":imageUrl,
                "href": href
            }

            # Add the new question to the set
            data[next_res_num] = new_res

            with open(self.resource_file, 'w') as file:
                json.dump(data, file, indent=4)

            return {"success": True, "message": "Question added successfully", "title": title}

        except Exception as e:
            return {"success": False, "error": str(e)}
        
    
    