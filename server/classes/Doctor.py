from typing import List
from classes.HealthcareProfessional import HealthcareProfessional
from classes.Patient import Patient  # Importing for inheritance

class Doctor(HealthcareProfessional):
    Specialty: str
    PatientsList: List[Patient.PatientID] 