# chatbot/commands/command_history.py

class CommandHistory:
    def __init__(self):
        self.history = []

    def add_command(self, command):
        self.history.append(command)

    def undo_last_command(self):
        if self.history:
            command = self.history.pop()
            command.undo()
        else:
            print("No commands to undo.")
