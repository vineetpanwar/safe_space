import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from user_service import User
from classes.Patient import Patient

patient_instance = Patient(7,'lucasgrimm')