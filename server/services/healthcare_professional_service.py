import json
import uuid
from services.user_service import User
from werkzeug.security import generate_password_hash, check_password_hash

class HealthcareProfessional(User):

    def __init__(self, user_id, username, professional_id, qualifications, work_schedule):
        super().__init__(user_id, username)  # Correctly calling the superclass init
        self._professional_id = professional_id
        self._qualifications = qualifications
        self._work_schedule = work_schedule

    @classmethod
    def signup(cls, username, password, professional_id, qualifications, work_schedule):
        # Generate a unique user_id here (e.g., using a UUID or similar)
        user_id = str(uuid.uuid4())
        hashed_password = generate_password_hash(password)

        # Load existing credentials
        with open('G:/OOD_Project/safe_space/server/db/login_credentials.json', 'r') as file:
            credentials = json.load(file)
        
        for hp in credentials.get('healthcare_professionals', []):
            if hp['username'] == username:
                raise ValueError("Username already exists")


        # Add new healthcare professional credentials
        credentials['healthcare_professionals'].append({
            "username": username,
            "password": hashed_password,
            "user_id": user_id,
            "professional_id": professional_id,
            "qualifications": qualifications,
            "work_schedule": work_schedule
        })

        # Save credentials back to the file
        with open('G:/OOD_Project/safe_space/server/db/login_credentials.json', 'w') as file:
            json.dump(credentials, file, indent=4)
        
        return cls(user_id, username, professional_id, qualifications, work_schedule)

    @classmethod
    def login(cls, username, password):
        # Load existing credentials
        with open('G:/OOD_Project/safe_space/server/db/login_credentials.json', 'r') as file:
            credentials = json.load(file)

        # Find the user by username
        user = next((u for u in credentials['healthcare_professionals'] if u['username'] == username), None)

        # Check the provided password against the stored hash
        if user and check_password_hash(user['password'], password):
            return cls(user['user_id'], username, user['professional_id'], user['qualifications'], user['work_schedule'])
        else:
            raise ValueError("Invalid username or password")
