# chatbot/commands/base_command.py

class Command:
    def execute(self):
        raise NotImplementedError("You must implement the execute method.")

    def undo(self):
        pass  # Optional implementation in subclasses
