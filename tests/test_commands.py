import unittest
from chatbot.commands.faq_command import FAQCommand
from chatbot.handlers.faq_handler import FAQHandler

class TestFAQCommand(unittest.TestCase):
    def test_faq_command_execution(self):
        handler = FAQHandler("TestFAQBot")
        command = FAQCommand(handler, "How do I reset my password?")
        response = command.execute()
        self.assertIn("reset your password", response)  # Adjust assertion based on actual implementation

if __name__ == '__main__':
    unittest.main()