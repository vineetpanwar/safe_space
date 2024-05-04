from classes.Users import Users  # Importing User class for inheritance

class Patient(Users):
    PatientID: int
    AssessmentResults: float
    
    
def get_name(self) -> str:
    #Overridden method to get the patient's name
    return "Patient: " + super()  # Calls the get_name method from User class