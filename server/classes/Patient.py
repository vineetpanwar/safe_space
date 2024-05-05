from classes.Users import Users  # Importing User class for inheritance

class Patient(Users):
    PatientID: int
    AssessmentResults: float
    
def __init__(self, user_id, username):
    super(user_id, username)
    
def get_name(self) -> str:
    #Overridden method to get the patient's name
    return "Patient: " + super(user_id, username)  # Calls the get_name method from User class

@property
def profile_information(self):
    return self._profile_information

def get_patient_details(self):
    # Access properties from Users
    return {
        "user_id": self.user_id,
        "patient_id": self.patient_id,
        "name": self.get_name()
    }