# chatbot/utils/logger.py

import threading

class Logger:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls, *args, **kwargs):
        with cls._lock:
            if cls._instance is None:
                cls._instance = super(Logger, cls).__new__(cls)
                cls._instance.initialize(*args, **kwargs)
        return cls._instance

    def initialize(self, log_file=None):
        self.log_file = log_file

    def log(self, message, level="INFO"):
        log_message = f"[{level}] {message}"
        if self.log_file:
            with open(self.log_file, "a") as file:
                file.write(log_message + "\n")
        else:
            print(log_message)
