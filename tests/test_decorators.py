# tests/test_decorators.py

import unittest
from chatbot.handlers.logging_decorator import LoggingDecorator

class MockHandler:
    def get_response(self, input):
        return "Mock response"

class TestLoggingDecorator(unittest.TestCase):
    def test_logging_decorator(self):
        handler = MockHandler()
        decorated = LoggingDecorator(handler)
        response = decorated.get_response("Test input")
        self.assertEqual(response, "Mock response")  # Also, ensure logging occurred if possible

if __name__ == '__main__':
    unittest.main()
