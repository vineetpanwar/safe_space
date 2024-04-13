import json
import requests

def fetch_doctors_based_on_location(latitude, longitude, searchText):
    try:
        places_api_url = ' https://places.googleapis.com/v1/places:searchText'

        places_api_body = {
             "textQuery" : searchText,
             "maxResultCount": 20,
             "locationBias": {
                "circle": {
                    "center": {"latitude": latitude, "longitude": longitude},
                    "radius": 500.0
                }
             }  
        }

        places_api_headers = {'Content-Length': str(len(json.dumps(places_api_body))),
            'Host': 'places.googleapis.com','Content-Type': 'application/json', 'X-Goog-Api-Key': 'AIzaSyA1faM_b2f-X5V_VFze6w5KEd37iwQHtOE', 'X-Goog-FieldMask': '*'}

        # Sending a GET request to the API
        response = requests.post(places_api_url, json=places_api_body, headers=places_api_headers)
        
        # Checking if the request was successful (status code 200)
        if response.status_code == 200:
            # Returning the JSON response from the API
            return response.json()
        else:
            print(response.text)
            # If the request was not successful, return None
            return None
    
    except Exception as e:
        # Handling exceptions
        print(f"Error: {e}")
        return None