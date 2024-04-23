class User:
    credentials_file = 'server/db/login_credentials.json'  # File path
    
    def __init__(self, user_id, username):
        self._user_id = user_id
        self._username = username

    def _hash_password(self, password):
        # Simple hash function (use bcrypt or similar in production)
        return hashlib.sha256(password.encode('utf-8')).hexdigest()
    
    def _load_credentials(self):
        with open(self.credentials_file, 'r') as file:
            return json.load(file)

    def _save_credentials(self, credentials):
        with open(self.credentials_file, 'w') as file:
            json.dump(credentials, file, indent=4)
            

