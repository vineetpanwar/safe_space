# tests/test_faq_handler.py

import unittest
from chatbot.handlers.faq_handler import FAQHandler

class TestFAQHandler(unittest.TestCase):
    def setUp(self):
        self.handler = FAQHandler("TestFAQBot")

    def test_response(self):
        input_question = "How do I reset my password?"
        response = self.handler.get_response(input_question)
        self.assertIn("reset your password", response)

if __name__ == '__main__':
    unittest.main()
