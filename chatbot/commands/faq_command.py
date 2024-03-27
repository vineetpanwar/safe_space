# chatbot/commands/faq_command.py
from .base_command import Command

class FAQCommand(Command):
    def __init__(self, handler, question):
        self.handler = handler
        self.question = question
        self.last_response = None  # To hold the last response if needed for undoing

    def execute(self):
        try:
            self.last_response = self.handler.get_response(self.question)
            return self.last_response
        except Exception as e:
            return f"Failed to execute FAQCommand: {e}"

    def undo(self):
        # Example undo functionality, depending on what undo means for a FAQ command
        print(f"Undoing FAQCommand: {self.question}")
        self.last_response = None
