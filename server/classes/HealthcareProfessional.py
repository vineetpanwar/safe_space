from classes.Users import Users  # Importing User class for inheritance

class HealthcareProfessional(Users):
    ProfessionalID: str
    Qualifications: str
    WorkSchedule: str

    def fetchScore(self, id: int):
        patient = self.get_patient_by_id(id)
        return patient.fetchScore()
    
    def get_patient_by_id(self, id: int) -> Users:
        return Users.UserID  #Using Inheritence