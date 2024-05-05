import os
import sys
# sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from flask import Flask, jsonify
from tinydb import TinyDB, Query
import json

class Resource:
    # Get the directory of the current Python script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Navigate up one directory level
    parent_dir = os.path.dirname(script_dir)
    
    # Relative path to the resource file
    resource_file = os.path.join(parent_dir, 'db/resources_updated.json')
    
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
        
    
    def deleteResource(self,resource_number):
       try:
           # Load existing data from assessment.json
           with open(self.resource_file, 'r') as file:
               data = json.load(file)
           res_data =data.get(resource_number, {})
      
           if res_data:
               del data[resource_number]
           else:
               return {"success": False, "message": "Resource Does not exist"}


           with open(self.resource_file, 'w') as file:
                   json.dump(data, file, indent=4)


           return {"success": True, "message": "Resource deleted successfully"}
      
       except Exception as e:
           return {"success": False, "error": str(e)}






    def updateResource(self, resource_number, new_title, new_summary, new_imageUrl, new_href):
       try:
           # Load existing data from assessment.json
           with open(self.resource_file, 'r') as file:
               data = json.load(file)
          
           # Get the set
           resource_set = data.get(resource_number, {})


  
           # Check if the question exists
           if resource_set:
                resource_set["title"] = new_title
                resource_set["summary"] = new_summary
                resource_set["imageUrl"] = new_imageUrl
                resource_set["href"] = new_href
                  
               # Update the data with the modified assessment set
                data[resource_number] = resource_set




           # Write the updated data back to assessment.json
                with open(self.resource_file, 'w') as file:
                    json.dump(data, file, indent=4)




                return {"success": True, "message": "Question updated successfully"}
           
           else:
                return {"success": False, "error": "Question not found"}
           
           

       except Exception as e:
           return {"success": False, "error": str(e)}


