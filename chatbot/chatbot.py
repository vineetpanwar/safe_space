# chatbot/chatbot.py

class Chatbot:
    def __init__(self, name):
        self.name = name

    def get_response(self, input):
        # Simplified response logic
        return f"Hello, I am {self.name}. You asked: {input}"
