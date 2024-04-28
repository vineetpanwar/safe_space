from classes.User import User  # Importing User class for inheritance

class Patient(User):
    PatientID: int
    AssessmentResults: float
    pass