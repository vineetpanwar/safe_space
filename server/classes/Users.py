from pydantic import BaseModel,EmailStr
from typing import Optional, List
import hashlib
import json

class Users(BaseModel):

    UserID: int
    UserName: str
    email: EmailStr
    _score: Optional[float] = None  # private attribute with leading underscore (Encapsulation)

    credentials_file = '../db/login_credentials.json'  # File path
    
    def __init__(self, user_id, username):
        self._user_id = user_id
        self._username = username

    def _hash_password(self, password):
        # Simple hash function 
        return hashlib.sha256(password.encode('utf-8')).hexdigest()
    
    def _load_credentials(self):
        with open(self.credentials_file, 'r') as file:
            return json.load(file)

    def _save_credentials(self, credentials):
        with open(self.credentials_file, 'w') as file:
            json.dump(credentials, file, indent=4)

    
    @property
    def score(self) -> Optional[float]:
        #Public getter method for score.
        return self._score

    @score.setter
    def score(self, value: float):
        #Public setter method for score with validation.
        if not 0 <= value <= 100:
            raise ValueError("Score must be between 0 and 100.")
        self._score = value

    def get_name(self) -> str:
        return self.UserName   #Polymorphism
    
    def fetchScore(self):
        return self._score  # _score is a protected member of User