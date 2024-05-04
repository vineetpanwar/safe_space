from typing import List
from classes.HealthcareProfessional import HealthcareProfessional
from classes.Patient import Patient  # Importing for inheritance
# from services.DoctorsService import fetch_doctors_based_on_location

class Doctor(HealthcareProfessional):
    def __init__(self, user_id, username, professional_id, qualifications, address, phno, specialty, patients_list=None):
        super().__init__(user_id, username, professional_id, qualifications)
        self.address = address
        self.specialty = specialty
        self.patients_list = patients_list if patients_list else []
    
    def filter_doctor_details(response):
        # Extract only the necessary details from the response
        try:
            filtered_data = [
                {"formattedAddress": doctor["address"], "internationalPhoneNumber": doctor.get("phone", "Not available")}
                for doctor in response.get("results", [])
                if "address" in doctor
            ]
            return filtered_data
        except KeyError:
            print("Error: Invalid response format.")
            return []

