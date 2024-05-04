import os
import sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from user_service import User

class Patient(User):
    def __init__(self, user_id, username, profile_information):
        super().__init__(user_id, username)
        # Assuming profile_information is a dictionary
        self._profile_information = profile_information or {}
    
    @property
    def profile_information(self):
        return self._profile_information

    def update_profile(self, new_info):
        # Update the profile information with the new_info dictionary
        self._profile_information.update(new_info)